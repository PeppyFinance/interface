import { AssetSelector } from '@/components/AssetButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useEffect, useMemo, useState } from 'react';
import { useMaskito } from '@maskito/react';
import { collateralTokenAddress, liquidityPoolAddress } from '@/lib/addresses';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { erc20Abi, parseEther, formatEther } from 'viem';
import TradePairAbi from '@/abi/TradePair.abi';
import { connection, subscribeToPriceFeeds, unsubscribeToPriceFeeds } from '@/lib/pyth';
import { formatPrice, mapMarketToTradePairAddress } from '@/lib/utils';
import { useMarketStore } from '@/store';
import { DollarMask } from '@/lib/masks';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { Rate } from '@/components/Rate';
import LiquidityPoolAbi from '@/abi/LiquidityPool.abi';

const LEVERAGE_PRECISION = 1e1;

function parseCollateral(collateralString: string): bigint {
  return BigInt(collateralString.replaceAll('$', '').replaceAll(',', '').replaceAll(' ', ''));
}

function formatPositionSize(positionSize: bigint): string {
  return new Intl.NumberFormat()
    .format(
      BigInt(formatEther(positionSize * BigInt(LEVERAGE_PRECISION))) / BigInt(LEVERAGE_PRECISION)
    )
    .toString();
}

export const TradingBox = () => {
  const { marketsState, currentMarket } = useMarketStore();
  const { address, status: statusAccount } = useAccount();

  const sliderStyle = {
    background: `linear-gradient(to-right, yellow {value}%, yellow {100}%)`
  };

  const {
    writeContract: writeContractOpenPosition,
    data: hashOpenPosition,
    status: statusOpenPosition,
  } = useWriteContract();
  const {
    writeContract: writeContractApprove,
    data: hashApproval,
    status: statusApproval,
  } = useWriteContract();

  const {
    isLoading: isConfirmingOpenPosition,
    isSuccess: openPositionConfirmed,
    isError: openPositionNotConfirmed,
  } = useWaitForTransactionReceipt({
    hash: hashOpenPosition,
  });
  const {
    isLoading: isConfirmingApproval,
    isSuccess: approvalConfirmed,
    isError: approvalNotConfirmed,
  } = useWaitForTransactionReceipt({
    hash: hashApproval,
  });

  const maskedInputRef = useMaskito({ options: DollarMask });

  const [collateral, setCollateral] = useState<string>('$ 0');
  const [leverage, setLeverage] = useState<number>(2);
  const [direction, setDirection] = useState<1 | -1>(1);

  const isLong = direction === 1;

  const tradePairAddress = useMemo(
    () => mapMarketToTradePairAddress(currentMarket),
    [currentMarket]
  );

  const parsedCollateral = useMemo(
    () => parseEther(String(parseCollateral(collateral))),
    [collateral]
  );
  const positionSize = useMemo(
    () => (parsedCollateral * BigInt(leverage * LEVERAGE_PRECISION)) / BigInt(LEVERAGE_PRECISION),
    [parsedCollateral, leverage]
  );

  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: collateralTokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    // @ts-expect-error not assignable
    args: [address],
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: collateralTokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    // @ts-expect-error not assignable
    args: [address, tradePairAddress],
  });

  const { data: fundingRate, refetch: refetchFundingRate } = useReadContract({
    address: tradePairAddress,
    abi: TradePairAbi,
    functionName: 'getFundingRate',
  });

  const { data: borrowRate, refetch: refetchBorrowRate } = useReadContract({
    address: tradePairAddress,
    abi: TradePairAbi,
    functionName: 'getBorrowRate',
  });

  const { data: totalLiquidity, refetch: refetchTotalLiqudity } = useReadContract({
    address: liquidityPoolAddress,
    abi: LiquidityPoolAbi,
    functionName: 'totalAssets',
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

  const handleLeverageInput = (e: string) => {
    const value = Number(e);

    // Check if the value is a number and is not NaN before setting the state
    if (!isNaN(value) && Number.isInteger(value)) {
      if (value > 100) { setLeverage(100); } else { setLeverage(value); }
    }
  };


  const buttonText = useMemo(
    () =>
      statusAccount !== 'connected'
        ? 'Wallet not connected'
        : !hasSufficientSize
          ? 'Insufficient size'
          : !hasEnoughBalance
            ? 'Not enough funds'
            : !hasEnoughAllowance
              ? 'Approve'
              : 'Open Position',
    [hasSufficientSize, hasEnoughBalance, hasEnoughAllowance, statusAccount]
  );

  const showSpinner = useMemo(
    () =>
      statusApproval === 'pending' ||
      statusOpenPosition === 'pending' ||
      isConfirmingApproval ||
      isConfirmingOpenPosition,
    [statusApproval, statusOpenPosition, isConfirmingApproval, isConfirmingOpenPosition]
  );

  const isButtonDisabled = useMemo(
    () => !hasEnoughBalance || !hasSufficientSize || statusAccount !== 'connected' || showSpinner,
    [hasEnoughBalance, hasSufficientSize, statusAccount, showSpinner]
  );

  const isInputDisabled = useMemo(() => showSpinner, [showSpinner]);

  const currentMarketState = marketsState[currentMarket];

  const liquidationPrice = useMemo(() => {
    if (!currentMarketState || positionSize === 0n) {
      return 0;
    }

    const entryPrice = currentMarketState.currentPrice;
    return entryPrice * (1 + ((isLong ? -1 : 1) * Number(parsedCollateral)) / Number(positionSize));
  }, [currentMarketState, parsedCollateral, leverage]);

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
      const priceFeedUpdateData = await connection.getPriceFeedsUpdateData([
        currentMarketState.priceFeedId,
      ]);

      writeContractOpenPosition({
        address: tradePairAddress,
        abi: TradePairAbi,
        functionName: 'openPosition',
        args: [
          parsedCollateral,
          BigInt(Math.round(leverage * 1_000_000)),
          direction,
          // @ts-expect-error not assignable
          priceFeedUpdateData,
        ],
        value: 1n,
        // TODO: fix manual gas limit
        gas: 380_000n,
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
    if (openPositionConfirmed) {
      refetchBalance();
      refetchAllowance();
      refetchBorrowRate();
      refetchFundingRate();
      refetchTotalLiqudity();
      toast.success('Position confirmed');
    }
  }, [openPositionConfirmed]);

  useEffect(() => {
    if (openPositionNotConfirmed) {
      toast.error('Position not confirmed', { description: 'Something went wrong.' });
    }
  }, [openPositionNotConfirmed]);

  useEffect(() => {
    if (approvalConfirmed) {
      refetchAllowance();
      toast.success('Allowance confirmed.');
    }
  }, [approvalConfirmed]);

  useEffect(() => {
    if (approvalNotConfirmed) {
      toast.error('Allowance not confirmed', { description: 'Something went wrong.' });
    }
  }, [approvalNotConfirmed]);

  useEffect(() => {
    if (statusApproval === 'success') {
      toast.info('Increase Allowance', { description: 'Waiting for confirmation.' });
    } else if (statusApproval === 'error') {
      toast.error('Cannot increase allowance', { description: 'Something went wrong.' });
    }
  }, [statusApproval]);

  useEffect(() => {
    if (statusOpenPosition === 'success') {
      toast.info('Open Position', { description: 'Waiting for confirmation.' });
    } else if (statusOpenPosition === 'error') {
      toast.error('Cannot open position', { description: 'Something went wrong.' });
    }
  }, [statusOpenPosition]);

  useEffect(() => {
    const id = setInterval(() => {
      refetchBorrowRate();
      refetchFundingRate();
      refetchTotalLiqudity();
    }, 10000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="px-1 flex flex-col">
      <div className="pt-3">
        <AssetSelector />
      </div>
      <div className="pt-3">
        <p className="text-xxs pb-1">Type of Position</p>
        <div className="flex bg-[#5f5f5f90] rounded p-3">
          <Button className="w-full mr-2" fontWeight="heavy" size="default" variant="default">
            TRADE
          </Button>
          <Button disabled className="w-full" fontWeight="heavy" size="default" variant="default">
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
              size="default"
              variant={!isLong ? 'destructive' : 'default'}
              onClick={() => setDirection(-1)}
            >
              SHORT
            </Button>
            <Button
              className="w-full"
              fontSize="default"
              fontWeight="medium"
              size="default"
              variant={isLong ? 'constructive' : 'default'}
              onClick={() => setDirection(1)}
            >
              LONG
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
            disabled={isInputDisabled}
            ref={maskedInputRef}
            className="font-bold"
            value={collateral}
            onSubmit={e => setCollateral(e.currentTarget.value)}
          />
        </div>
      </div>
      <div className="pt-3">
        <div className="flex mb-1 justify-between">
          <Input
              disabled={isInputDisabled}
              className="font-bold max-w-[70px]"
              value={leverage}
              onInput={e => handleLeverageInput(e.currentTarget.value)}
            />
          <div className="flex mb-1">
            <span className="text-xl underline decoration-dotted px-5 py-1">Leverage</span>
          </div>
        </div>
        <Slider
          value={leverage}
          step={1 / LEVERAGE_PRECISION}
          min={1.1}
          max={100}
          onChange={e => setLeverage(Number(e.target.value))}
          className='RangeSlider'
        />
      </div>
      <div className="pt-1">
        <div className="flex mb-1 justify-between">
          <span>1x</span>
          <span>50x</span>
          <span>100x</span>
        </div>
      </div>
      <div className="pt-3 min-h-[16rem]">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-sm">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 pt-4">
              <div className="flex justify-between">
                <p>Leverage</p>
                <p>{leverage}x</p>
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
                <p>{liquidationPrice ? formatPrice(liquidationPrice) : '-'}</p>
              </div>
              <div className="flex justify-between">
                <p>Borrow Rate:</p>
                <p>
                  <Rate value={borrowRate} />
                </p>
              </div>
              <div className="flex justify-between">
                <p>Funding Rate:</p>
                <p>
                  <Rate value={fundingRate} />
                </p>
              </div>
              <div className="flex justify-between">
                <p>Available Liquidity</p>
                <p>
                  {totalLiquidity !== undefined
                    ? '$' + (totalLiquidity / BigInt(1e18)).toLocaleString()
                    : '-'}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={isButtonDisabled}
              className="w-full mr-2"
              fontWeight="heavy"
              size="lg"
              variant={isLong ? 'constructive' : 'destructive'}
              onClick={handleOpenPosition}
            >
              {showSpinner && <Spinner size="small" className="mr-2 text-foreground" />}
              {buttonText}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
