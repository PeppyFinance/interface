import { collateralTokenAddress, liquidityPoolAddress } from '@/lib/addresses';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import LiquidityPoolAbi from '@/abi/LiquidityPool.abi.ts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { useMaskito } from '@maskito/react';
import { DollarMask } from '@/lib/masks';
import { useEffect, useMemo, useState } from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { erc20Abi } from 'viem';
import { useNavigate } from 'react-router-dom';

function parseDeposit(collateralString: string): bigint {
  return (
    BigInt(collateralString.replaceAll('$', '').replaceAll(',', '').replaceAll(' ', '')) *
    BigInt(1e18)
  );
}

export const Pool = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [deposit, setDeposit] = useState('$ 0');
  const [isDepositDrawerOpen, setDepositDrawerOpen] = useState<boolean>(false);
  const { writeContract: writeContractDeposit, status: statusDeposit } = useWriteContract();
  const { writeContract: writeContractAllowance, status: statusAllowance } = useWriteContract();
  const maskedInputRef = useMaskito({ options: DollarMask });

  // TODO: should probably allow reading pool stats
  if (address === undefined || !isConnected) {
    navigate('/');
    return;
  }

  const parsedDeposit = useMemo(() => parseDeposit(deposit), [deposit]);

  const { data: totalAssets, refetch: refetchTotalAssets } = useReadContract({
    address: liquidityPoolAddress,
    abi: LiquidityPoolAbi,
    functionName: 'totalAssets',
  });

  // TODO: this should be throttled, e.g. via debounce
  const { data: previewedAmountShares } = useReadContract({
    address: liquidityPoolAddress,
    abi: LiquidityPoolAbi,
    functionName: 'previewDeposit',
    args: [parsedDeposit],
  });

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
    args: [address, liquidityPoolAddress],
  });

  const maxDeposit = useMemo(() => {
    if (balance === undefined) return;
    return '$ ' + Intl.NumberFormat().format(Number(balance / BigInt(1e18)));
  }, [balance]);

  const setMaxDeposit = () => {
    if (maxDeposit === undefined) return;
    setDeposit(maxDeposit);
  };

  const hasSufficientDeposit = useMemo(() => parsedDeposit > 0n, [parsedDeposit]);

  const hasSufficientAllowance = useMemo(
    () => allowance !== undefined && allowance >= parsedDeposit,
    [allowance, parsedDeposit]
  );

  const hasSufficientBalance = useMemo(
    () => balance !== undefined && balance >= parsedDeposit,
    [balance, parsedDeposit]
  );

  const depositButtonText = useMemo(
    () =>
      !hasSufficientBalance
        ? 'Not enough funds'
        : !hasSufficientAllowance
          ? 'Approve'
          : !hasSufficientDeposit
            ? 'Insufficient Amount'
            : 'Deposit',
    [hasSufficientBalance, hasSufficientAllowance, hasSufficientDeposit]
  );

  const deployDeposit = async () => {
    if (!hasSufficientDeposit) {
      return;
    }

    if (!hasSufficientAllowance) {
      writeContractAllowance({
        address: collateralTokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [liquidityPoolAddress, parsedDeposit],
      });
    } else {
      writeContractDeposit({
        address: liquidityPoolAddress,
        abi: LiquidityPoolAbi,
        functionName: 'deposit',
        args: [parseDeposit(deposit)],
      });
    }
  };

  useEffect(() => {
    if (statusDeposit === 'success') {
      setDepositDrawerOpen(false);
      refetchTotalAssets();
      refetchBalance();
      refetchAllowance();
    }
  }, [statusDeposit]);

  useEffect(() => {
    if (statusAllowance === 'success') {
      refetchAllowance();
    }
  }, [statusAllowance]);

  return (
    <div className="flex flex-col items-center">
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
            {/* TODO: drawer does not close when clicking away */}
            <Drawer open={isDepositDrawerOpen}>
              <Button
                variant="default"
                size="default"
                fontWeight="heavy"
                fontSize="sm"
                onClick={() => setDepositDrawerOpen(true)}
              >
                Deposit
              </Button>
              <DrawerContent className="h-[70%]">
                <DrawerHeader>
                  <DrawerTitle>Deposit Liquidity</DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                  <div className="flex mb-1 justify-between">
                    <div className="flex">
                      <InfoCircledIcon className="mr-2" />
                      <p className="text-xs">Deposit in $USDC</p>
                    </div>
                    <div
                      className="underline underline-offset-2 decoration-dotted"
                      onClick={setMaxDeposit}
                    >
                      max: {maxDeposit}
                    </div>
                  </div>
                  <Input
                    ref={maskedInputRef}
                    className="font-bold"
                    value={deposit}
                    onInput={e => setDeposit(e.currentTarget.value)}
                  />
                  <div className="flex justify-between mt-6">
                    <p>Estimated Shares:</p>
                    <p>
                      {previewedAmountShares !== undefined
                        ? Number(previewedAmountShares / BigInt(1e18)).toLocaleString()
                        : '--'}{' '}
                      PLP
                    </p>
                  </div>
                </div>
                <DrawerFooter>
                  <Button
                    variant="primary"
                    size="lg"
                    fontWeight="heavy"
                    disabled={!hasSufficientDeposit || !hasSufficientBalance}
                    onClick={deployDeposit}
                  >
                    {depositButtonText}
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <Drawer>
              <DrawerTrigger>
                <Button variant="default" size="default" fontWeight="heavy" fontSize="sm">
                  Withdraw
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[70%]"></DrawerContent>
            </Drawer>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
