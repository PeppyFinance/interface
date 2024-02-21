import { useAccount } from 'wagmi';
import { Button } from '../../components/ui/button';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { AssetSelector } from '../../components/AssetButton';
import { Slider } from '../../components/ui/slider';
import { useEffect, useState } from 'react';
import { useWriteContract } from 'wagmi';

import { collateralTokenAddress, tradePairAddress } from '@/lib/addresses';
import * as tradePairAbi from '@/abi/TradePair.json';
import { parseAbi, parseEther } from 'viem';

export function OpenPositionForm() {
  const { status } = useAccount();
  const [direction, setDirection] = useState<-1 | 1>(1);
  const [collateral, setCollateral] = useState<number>(0);
  const [leverage, setLeverage] = useState<number>(5);

  const { error, failureReason, writeContract } = useWriteContract();

  const handleOpenPosition = async () => {
    // const tx = await writeContract({
    //   address: collateralTokenAddress,
    //   abi: parseAbi(['function mint(uint256 amount) external']),
    //   functionName: 'mint',
    //   args: [parseEther(collateral) * BigInt(leverage)],
    // });

    // await writeContract({
    //   address: collateralTokenAddress,
    //   abi: parseAbi(['function approve(address spender, uint256 amount) external returns (bool)']),
    //   functionName: 'approve',
    //   args: [tradePairAddress, parseEther(collateral) * BigInt(leverage)],
    // });

    await writeContract({
      address: tradePairAddress,
      abi: tradePairAbi.abi,
      functionName: 'openPosition',
      args: [parseEther(collateral), leverage * 1000000, direction, []],
    });
  };

  useEffect(() => {
    if (error) {
      console.error(error);
      console.error(failureReason);
    }
  });

  if (status !== 'connected') {
    return <div>Connect your wallet to open a position.</div>;
  }

  return (
    <div>
      <div>
        <h1 className="font-medium">History</h1>
        <h2>Buy Position</h2>
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
          <Button className="w-full" fontWeight="heavy" size="lg" variant="default">
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
            fontWeight={direction === -1 ? 'heavy' : 'light'}
            size="sm"
            variant="destructive"
            onClick={() => setDirection(-1)}
          >
            SHORT
          </Button>
          <Button
            className="w-full"
            fontSize="default"
            fontWeight={direction === 1 ? 'heavy' : 'light'}
            size="sm"
            variant="constructive"
            onClick={() => setDirection(1)}
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
            className="font-bold"
            value={collateral}
            onChange={e => setCollateral(e.target.value)}
          />
        </div>
      </div>
      <div className="pt-2">
        <div>
          <p className="text-xxs">Leverage</p>
        </div>
        <div>
          <Slider
            min={1}
            max={100}
            value={leverage}
            onChange={e => setLeverage(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="pt-3 min-h-[16rem]">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-sm">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <p>Estimated Profit</p>
              <p>200$</p>
            </div>
            <div className="flex justify-between">
              <p>Entry Price</p>
              <p>3,000$</p>
            </div>
            <div className="flex justify-between">
              <p>Liquidation Price</p>
              <p>2,000$</p>
            </div>
            <div className="flex justify-between">
              <p>Take Profit At</p>
              <p>3,500$</p>
            </div>
            <div className="flex justify-between">
              <p>Fees</p>
              <p>4.50$</p>
            </div>
            <div className="mt-1">
              <p className="underline">More</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full mr-2"
              fontWeight="heavy"
              size="lg"
              variant="primary"
              onClick={handleOpenPosition}
            >
              OPEN POSITION
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

