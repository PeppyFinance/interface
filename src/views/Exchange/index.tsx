import { AssetSelector } from '@/components/AssetButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useEffect, useMemo, useState } from 'react';
import { useMaskito } from '@maskito/react';
import { collateralTokenAddress, tradePairAddress } from '@/lib/addresses';
import { useAccount, useReadContract, useWriteContract, useBlock } from 'wagmi';
import { erc20Abi, parseEther, formatEther, encodeAbiParameters, Hex } from 'viem';
import { useNavigate } from 'react-router-dom';
import * as tradePairAbi from '@/abi/TradePair.json';
import { connection, subscribeToPriceFeeds, unsubscribeToPriceFeeds } from '@/lib/pyth';
import { formatPrice } from '@/lib/utils';
import { useMarketStore } from '@/store';
import { DollarMask } from '@/lib/masks';

function parseCollateral(collateralString: string): bigint {
  return BigInt(collateralString.replaceAll('$', '').replaceAll(',', '').replaceAll(' ', ''));
}

function formatPositionSize(positionSize: bigint): string {
  return new Intl.NumberFormat().format(BigInt(formatEther(positionSize))).toString();
}

export const Exchange = () => {
  const { marketsState, currentMarket } = useMarketStore();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { writeContract: writeContractOpenPosition, status: statusOpenPosition } =
    useWriteContract();
  const { writeContract: writeContractApprove, status: statusApprove } = useWriteContract();
  const maskedInputRef = useMaskito({ options: DollarMask });

  if (address === undefined || !isConnected) {
    navigate('/');
    return;
  }

  const [collateral, setCollateral] = useState<string>('$ 0');
  const [leverage, setLeverage] = useState<number>(2);
  const [direction, setDirection] = useState<1 | -1>(1);

  const block = useBlock();

  const parsedCollateral = useMemo(
    () => parseEther(String(parseCollateral(collateral))),
    [collateral]
  );
  const positionSize = useMemo(
    () => parsedCollateral * BigInt(leverage),
    [parsedCollateral, leverage]
  );

  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: collateralTokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: collateralTokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, tradePairAddress],
  });

  const hasEnoughBalance = useMemo(
    () => balance !== undefined && balance >= parsedCollateral,
    [balance, parsedCollateral]
  );

  const hasEnoughAllowance = useMemo(
    () => allowance !== undefined && allowance >= parsedCollateral,
    [allowance, parsedCollateral]
  );

  const hasSufficientSize = useMemo(() => positionSize > 0n, [positionSize]);

  const buttonText = useMemo(
    () =>
      !hasSufficientSize
        ? 'Insufficient size'
        : !hasEnoughBalance
          ? 'Not enough funds'
          : !hasEnoughAllowance
            ? 'Approve'
            : 'Open Position',
    [hasSufficientSize, hasEnoughBalance, hasEnoughAllowance]
  );

  const currentMarketState = marketsState[currentMarket];

  const handleOpenPosition = async () => {
    if (!currentMarketState) {
      return;
    }

    if (!hasEnoughAllowance) {
      writeContractApprove({
        address: collateralTokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [tradePairAddress, parsedCollateral],
      });
    } else {
      let priceFeedUpdateData;
      const timestamp = block.data?.timestamp;
      if (import.meta.env.MODE === 'anvil') {
        // on a local anvil chain, we use MockPyth and have to encode the data ourselves
        priceFeedUpdateData = [
          encodeAbiParameters(
            [
              {
                components: [
                  {
                    internalType: 'bytes32',
                    name: 'id',
                    type: 'bytes32',
                  },
                  {
                    components: [
                      {
                        internalType: 'int64',
                        name: 'price',
                        type: 'int64',
                      },
                      {
                        internalType: 'uint64',
                        name: 'conf',
                        type: 'uint64',
                      },
                      {
                        internalType: 'int32',
                        name: 'expo',
                        type: 'int32',
                      },
                      {
                        internalType: 'uint64',
                        name: 'publishTime',
                        type: 'uint64',
                      },
                    ],
                    name: 'price',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'int64',
                        name: 'price',
                        type: 'int64',
                      },
                      {
                        internalType: 'uint64',
                        name: 'conf',
                        type: 'uint64',
                      },
                      {
                        internalType: 'int32',
                        name: 'expo',
                        type: 'int32',
                      },
                      {
                        internalType: 'uint64',
                        name: 'publishTime',
                        type: 'uint64',
                      },
                    ],
                    name: 'emaPrice',
                    type: 'tuple',
                  },
                ],
                name: 'PriceFeed',
                type: 'tuple',
              },
            ],
            [
              {
                id: ('0x' + currentMarketState.priceFeedId) as Hex,
                price: {
                  price: BigInt(currentMarketState.price),
                  conf: BigInt(currentMarketState.confidence),
                  expo: currentMarketState.expo,
                  publishTime: timestamp,
                },
                emaPrice: {
                  price: BigInt(currentMarketState.price),
                  conf: BigInt(currentMarketState.confidence),
                  expo: currentMarketState.expo,
                  publishTime: timestamp,
                },
              },
            ]
          ),
        ];
      } else {
        priceFeedUpdateData = await connection.getPriceFeedsUpdateData([
          currentMarketState.priceFeedId,
        ]);
      }

      writeContractOpenPosition({
        address: tradePairAddress,
        abi: tradePairAbi.abi,
        functionName: 'openPosition',
        // TODO: place price data in here
        args: [parsedCollateral, leverage * 1_000_000, direction, priceFeedUpdateData],
        value: 1n,
      });
    }
  };

  const maxCollateral = useMemo(() => {
    if (balance === undefined) return;
    return '$ ' + Intl.NumberFormat().format(Number(balance / BigInt(1e18)));
  }, [balance]);

  const setMaxCollateral = () => {
    if (maxCollateral === undefined) return;
    setCollateral(maxCollateral);
  };

  useEffect(() => {
    subscribeToPriceFeeds();
    // NOTE: clean up on unmount
    return unsubscribeToPriceFeeds;
  }, []);

  useEffect(() => {
    if (statusOpenPosition === 'success') {
      refetchBalance();
      refetchAllowance();
    }
  }, [statusOpenPosition]);

  useEffect(() => {
    if (statusApprove === 'success') {
      refetchAllowance();
    }
  }, [statusApprove]);

  return (
    <div className="px-3 flex flex-col">
      <div className="pt-3">
        <AssetSelector />
      </div>
      <div className="pt-3">
        <p className="text-xxs pb-1">Type of Position</p>
        <div className="flex">
          <Button className="w-full mr-2" fontWeight="heavy" size="lg" variant="default">
            TRADE
          </Button>
          <Button disabled className="w-full" fontWeight="heavy" size="lg" variant="default">
            LIMIT
          </Button>
        </div>
      </div>
      <div className="pt-3">
        <p className="text-xxs pb-1">Type of Speculation</p>
        <div className="flex space-x-2">
          <Button
            className="w-full"
            fontSize="default"
            fontWeight="medium"
            size="lg"
            variant={direction === 1 ? 'constructive' : 'default'}
            onClick={() => setDirection(1)}
          >
            LONG
          </Button>
          <Button
            className="w-full"
            fontSize="default"
            fontWeight="medium"
            size="lg"
            variant={direction === -1 ? 'destructive' : 'default'}
            onClick={() => setDirection(-1)}
          >
            SHORT
          </Button>
        </div>
      </div>
      <div className="pt-3">
        <div>
          <p className="text-xxs pb-1">Venture Parameters</p>
        </div>
        <div>
          <div className="flex mb-1 justify-between">
            <div className="flex">
              <InfoCircledIcon className="mr-2" />
              <p className="text-xs">Collateral in $USDC</p>
            </div>
            <div
              className="underline underline-offset-2 decoration-dotted"
              onClick={setMaxCollateral}
            >
              max: {maxCollateral || '--'}
            </div>
          </div>
          <Input
            ref={maskedInputRef}
            className="font-bold"
            value={collateral}
            onInput={e => setCollateral(e.currentTarget.value)}
          />
        </div>
      </div>
      <div className="pt-3">
        <div className="flex mb-1">
          <InfoCircledIcon className="mr-2" />
          <span className="text-xs">Leverage</span>
        </div>
        <Slider
          value={leverage}
          step={1}
          max={100}
          onChange={e => setLeverage(Number(e.target.value))}
        />
      </div>
      <div className="pt-3 min-h-[16rem]">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-sm">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <p>Leverage</p>
              <p>{leverage}.0x</p>
            </div>
            <div className="flex justify-between">
              <p>Position Size</p>
              <p>${formatPositionSize(positionSize)}</p>
            </div>
            <div className="flex justify-between">
              <p>Entry Price</p>
              <p>{currentMarketState ? formatPrice(currentMarketState.currentPrice) : '$...'}</p>
            </div>
            <div className="flex justify-between">
              <p>Liquidation Price</p>
              <p>$2,000</p>
            </div>
            <div className="flex justify-between">
              <p>Take Profit At</p>
              <p>$3,500</p>
            </div>
            <div className="flex justify-between">
              <p>Fees</p>
              <p>$4.50</p>
            </div>
            <div className="mt-1">
              <p className="underline">More</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={!hasEnoughBalance || !hasSufficientSize}
              className="w-full mr-2"
              fontWeight="heavy"
              size="lg"
              variant={direction === 1 ? 'constructive' : 'destructive'}
              onClick={handleOpenPosition}
            >
              {buttonText}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
