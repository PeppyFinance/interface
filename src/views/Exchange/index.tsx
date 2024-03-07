import { AssetSelector } from '@/components/AssetButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useMemo, useState } from 'react';
import { useMaskito } from '@maskito/react';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { collateralTokenAddress, tradePairAddress } from '@/lib/addresses';
import { useAccount, useReadContract } from 'wagmi';
import { erc20Abi, parseEther } from 'viem';
import { useNavigate } from 'react-router-dom';

const DollarMask = maskitoNumberOptionsGenerator({
  precision: 0,
  thousandSeparator: ',',
  prefix: '$ ',
  max: 1_000_000_000,
  min: 0,
});

function parseCollateral(collateralString: string): bigint {
  return BigInt(collateralString.replaceAll('$', '').replaceAll(',', '').replaceAll(' ', ''));
}

function formatPositionSize(positionSize: bigint): string {
  return new Intl.NumberFormat().format(positionSize).toString();
}

export const Exchange = () => {
  const navigate = useNavigate();
  const { address } = useAccount();

  if (address === undefined) {
    navigate('/');
    return;
  }

  const [collateral, setCollateral] = useState<string>('$ 0');
  const [leverage, setLeverage] = useState<number>(2);

  const { data: balance } = useReadContract({
    address: collateralTokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
  });

  const { data: allowance } = useReadContract({
    address: collateralTokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, tradePairAddress],
  });

  const hasEnoughBalance = useMemo(
    () => balance !== undefined && balance < parseEther(collateral),
    [balance, collateral]
  );

  const hasEnoughAllowance = useMemo(
    () => allowance !== undefined && allowance < parseEther(collateral),
    [allowance, collateral]
  );

  const buttonText = useMemo(
    () =>
      !hasEnoughBalance
        ? 'Not enough funds'
        : !hasEnoughAllowance
          ? 'Allowance to low'
          : 'Open Position',
    [hasEnoughBalance, hasEnoughAllowance]
  );

  const positionSize = useMemo(
    () => parseCollateral(collateral) * BigInt(leverage),
    [collateral, leverage]
  );

  const maskedInputRef = useMaskito({ options: DollarMask });

  return (
    <div className="px-3 py-2 h-full flex flex-col">
      <div className="flex justify-between">
        <div>
          <h1 className="font-medium">Trading</h1>
          <h2>Buy Position</h2>
        </div>
        <div className="space-x-2">
          <a className="font-thin underline">History</a>
          <a className="font-thin underline">Orders</a>
        </div>
      </div>
      <div className="pt-2">
        <AssetSelector />
      </div>
      <div className="pt-2">
        <p className="text-xxs">Type of Position</p>
        <div className="flex">
          <Button className="w-full mr-2" fontWeight="heavy" size="lg" variant="default">
            TRADE
          </Button>
          <Button disabled className="w-full" fontWeight="heavy" size="lg" variant="default">
            LIMIT
          </Button>
        </div>
      </div>
      <div className="pt-2">
        <p className="text-xxs">Type of Speculation</p>
        <div className="flex">
          <Button
            className="w-full mr-2"
            fontSize="default"
            fontWeight="medium"
            size="sm"
            variant="destructive"
          >
            SHORT
          </Button>
          <Button
            className="w-full"
            fontSize="default"
            fontWeight="medium"
            size="sm"
            variant="constructive"
          >
            LONG
          </Button>
        </div>
      </div>
      <div className="pt-2">
        <div>
          <p className="text-xxs">Venture Parameters</p>
        </div>
        <div>
          <div className="flex mb-1">
            <InfoCircledIcon className="mr-2" />
            <p className="text-xs">Collateral in $USDC</p>
          </div>
          <Input
            ref={maskedInputRef}
            className="font-bold"
            value={collateral}
            onInput={e => setCollateral(e.currentTarget.value)}
          />
        </div>
      </div>
      <div className="pt-2">
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
              <p>$3,000</p>
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
              disabled={!hasEnoughBalance || !hasEnoughAllowance}
              className="w-full mr-2"
              fontWeight="heavy"
              size="lg"
              variant="primary"
            >
              {buttonText}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
