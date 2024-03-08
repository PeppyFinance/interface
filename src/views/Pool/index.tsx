import { liquidityPoolAddress } from '@/lib/addresses';
import { useAccount, useReadContract } from 'wagmi';
import LiquidityPoolAbi from '@/abi/LiquidityPool.abi.ts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Pool = () => {
  const { address } = useAccount();

  const { data: totalAssets } = useReadContract({
    address: liquidityPoolAddress,
    abi: LiquidityPoolAbi,
    functionName: 'totalAssets',
  });

  return (
    <div className="h-full flex flex-col items-center">
      <Card className="my-6 bg-glass/30 backdrop-blur-md rounded-md w-[90%]">
        <CardHeader className="pb-6">
          <CardTitle>Liquidity Pool Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <p>Total Assets:</p>
                <p>{totalAssets?.toString()}</p>
              </div>
              <div className="flex justify-between">
                <p>Owned Assets:</p>
                <p>{totalAssets?.toString()}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p>Total LP Shares:</p>
                <p>{totalAssets?.toString()}</p>
              </div>
              <div className="flex justify-between">
                <p>Owned LP Shares:</p>
                <p>{totalAssets?.toString()}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p>Borrow Rate:</p>
                <p>0% / h</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex space-x-3">
            <Button variant="default" size="default" fontSize="sm">
              Deposit
            </Button>
            <Button variant="default" size="default" fontSize="sm">
              Withdraw
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
