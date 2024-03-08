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
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { useMaskito } from '@maskito/react';
import { DollarMask, LpMask } from '@/lib/masks';
import { useEffect, useMemo, useState } from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { erc20Abi } from 'viem';
import { useNavigate } from 'react-router-dom';

function parseUsdString(str: string): bigint {
  return BigInt(str.replaceAll('$', '').replaceAll(',', '').replaceAll(' ', '')) * BigInt(1e18);
}

function parseLpString(str: string): bigint {
  return BigInt(str.replaceAll('PLP', '').replaceAll(',', '').replaceAll(' ', '')) * BigInt(1e18);
}

export const Pool = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [depositAmount, setDepositAmount] = useState<string>('$ 0');
  const [redemptionAmount, setRedemptionAmount] = useState<string>('0 PLP');
  const [isDepositDrawerOpen, setDepositDrawerOpen] = useState<boolean>(false);
  const [isRedeemDrawerOpen, setRedeemDrawerOpen] = useState<boolean>(false);
  const { writeContract: writeContractDeposit, status: statusDeposit } = useWriteContract();
  const { writeContract: writeContractRedeem, status: statusRedeem } = useWriteContract();
  const { writeContract: writeContractAllowance, status: statusAllowance } = useWriteContract();

  const dollarMaskedInputRef = useMaskito({ options: DollarMask });
  const lpMaskedInputRef = useMaskito({ options: LpMask });

  // TODO: should probably allow reading pool stats
  if (address === undefined || !isConnected) {
    navigate('/');
    return;
  }

  const parsedDepositAmount = useMemo(() => parseUsdString(depositAmount), [depositAmount]);
  const parsedRedemptionAmount = useMemo(() => parseLpString(redemptionAmount), [redemptionAmount]);

  const { data: totalAssets, refetch: refetchTotalAssets } = useReadContract({
    address: liquidityPoolAddress,
    abi: LiquidityPoolAbi,
    functionName: 'totalAssets',
  });

  const { data: totalShares, refetch: refetchTotalShares } = useReadContract({
    address: liquidityPoolAddress,
    abi: LiquidityPoolAbi,
    functionName: 'totalSupply',
  });

  const { data: ownedShares, refetch: refetchOwnedShares } = useReadContract({
    address: liquidityPoolAddress,
    abi: LiquidityPoolAbi,
    functionName: 'balanceOf',
    args: [address],
  });

  // TODO: this should be throttled, e.g. via debounce
  const { data: previewedAmountOnDeposit } = useReadContract({
    address: liquidityPoolAddress,
    abi: LiquidityPoolAbi,
    functionName: 'previewDeposit',
    args: [parsedDepositAmount],
  });

  // TODO: this should be throttled, e.g. via debounce
  const { data: previewedAmountOnRedeem } = useReadContract({
    address: liquidityPoolAddress,
    abi: LiquidityPoolAbi,
    functionName: 'previewRedeem',
    args: [parsedRedemptionAmount],
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

  const maxDepositAmount = useMemo(() => {
    if (balance === undefined) return;
    return '$ ' + Intl.NumberFormat().format(Number(balance / BigInt(1e18)));
  }, [balance]);

  const setMaxDepositAmount = () => {
    if (maxDepositAmount === undefined) return;
    setDepositAmount(maxDepositAmount);
  };

  const maxRedemptionAmount = useMemo(() => {
    if (ownedShares === undefined) return;
    return Intl.NumberFormat().format(Number(ownedShares / BigInt(1e18))) + ' PLP';
  }, [ownedShares]);

  const setMaxRedemptionAmount = () => {
    if (maxRedemptionAmount === undefined) return;
    setRedemptionAmount(maxRedemptionAmount);
  };

  const hasSufficientDepositAmount = useMemo(() => parsedDepositAmount > 0n, [parsedDepositAmount]);

  const hasSufficientRedemptionAmount = useMemo(
    () => parsedRedemptionAmount > 0n,
    [parsedRedemptionAmount]
  );

  const hasSufficientAllowance = useMemo(
    () => allowance !== undefined && allowance >= parsedDepositAmount,
    [allowance, parsedDepositAmount]
  );

  const hasSufficientBalance = useMemo(
    () => balance !== undefined && balance >= parsedDepositAmount,
    [balance, parsedDepositAmount]
  );

  const hasSufficientShares = useMemo(
    () => ownedShares !== undefined && ownedShares >= parsedRedemptionAmount,
    [ownedShares, parsedRedemptionAmount]
  );

  const depositButtonText = useMemo(
    () =>
      !hasSufficientBalance
        ? 'Not enough funds'
        : !hasSufficientAllowance
          ? 'Approve'
          : !hasSufficientDepositAmount
            ? 'Insufficient Amount'
            : 'Deposit',
    [hasSufficientBalance, hasSufficientAllowance, hasSufficientDepositAmount]
  );

  const redeemButtonText = useMemo(
    () =>
      !hasSufficientShares
        ? 'Not enough shares'
        : !hasSufficientRedemptionAmount
          ? 'Insufficient Amount'
          : 'Redeem',
    [hasSufficientShares, hasSufficientRedemptionAmount]
  );

  const deposit = () => {
    if (!hasSufficientDepositAmount) {
      return;
    }

    if (!hasSufficientAllowance) {
      writeContractAllowance({
        address: collateralTokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [liquidityPoolAddress, parsedDepositAmount],
      });
    } else {
      writeContractDeposit({
        address: liquidityPoolAddress,
        abi: LiquidityPoolAbi,
        functionName: 'deposit',
        args: [parsedDepositAmount],
      });
    }
  };

  const redeem = () => {
    if (!hasSufficientRedemptionAmount) {
      return;
    }

    writeContractRedeem({
      address: liquidityPoolAddress,
      abi: LiquidityPoolAbi,
      functionName: 'redeem',
      args: [parsedRedemptionAmount],
    });
  };

  useEffect(() => {
    if (statusDeposit === 'success') {
      setDepositDrawerOpen(false);
      refetchTotalAssets();
      refetchBalance();
      refetchAllowance();
      refetchOwnedShares();
      refetchTotalShares();
      setDepositAmount('$ 0');
    }
  }, [statusDeposit]);

  useEffect(() => {
    if (statusRedeem === 'success') {
      setRedeemDrawerOpen(false);
      refetchTotalAssets();
      refetchBalance();
      refetchAllowance();
      refetchOwnedShares();
      refetchTotalShares();
      setRedemptionAmount('0 PLP');
    }
  }, [statusRedeem]);

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
                <p>Total Liquidity:</p>
                <p>
                  {totalAssets !== undefined
                    ? '$' + (totalAssets / BigInt(1e18)).toLocaleString()
                    : '-'}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Owned Liquidity:</p>
                <p>???</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p>Total LP Shares:</p>
                <p>
                  {totalShares !== undefined ? (totalShares / BigInt(1e18)).toLocaleString() : '-'}{' '}
                  PLP
                </p>
              </div>
              <div className="flex justify-between">
                <p>Owned LP Shares:</p>
                <p>
                  {ownedShares !== undefined ? (ownedShares / BigInt(1e18)).toLocaleString() : '-'}{' '}
                  PLP
                </p>
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
            <Drawer open={isDepositDrawerOpen} onOpenChange={open => setDepositDrawerOpen(open)}>
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
                      onClick={setMaxDepositAmount}
                    >
                      max: {maxDepositAmount || '--'}
                    </div>
                  </div>
                  <Input
                    ref={dollarMaskedInputRef}
                    className="font-bold"
                    value={depositAmount}
                    onInput={e => setDepositAmount(e.currentTarget.value)}
                  />
                  <div className="flex justify-between mt-6">
                    <p>Estimated Shares:</p>
                    <p>
                      {previewedAmountOnDeposit !== undefined
                        ? Number(previewedAmountOnDeposit / BigInt(1e18)).toLocaleString()
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
                    disabled={!hasSufficientDepositAmount || !hasSufficientBalance}
                    onClick={deposit}
                  >
                    {depositButtonText}
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <Drawer open={isRedeemDrawerOpen} onOpenChange={open => setRedeemDrawerOpen(open)}>
              <Button
                variant="default"
                size="default"
                fontWeight="heavy"
                fontSize="sm"
                onClick={() => setRedeemDrawerOpen(true)}
              >
                Withdraw
              </Button>
              <DrawerContent className="h-[70%]">
                <DrawerHeader>
                  <DrawerTitle>Redeem Shares</DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                  <div className="flex mb-1 justify-between">
                    <div className="flex">
                      <InfoCircledIcon className="mr-2" />
                      <p className="text-xs">Redeem as $USDC</p>
                    </div>
                    <div
                      className="underline underline-offset-2 decoration-dotted"
                      onClick={setMaxRedemptionAmount}
                    >
                      max: {maxRedemptionAmount || '--'}
                    </div>
                  </div>
                  <Input
                    ref={lpMaskedInputRef}
                    className="font-bold"
                    value={redemptionAmount}
                    onInput={e => setRedemptionAmount(e.currentTarget.value)}
                  />
                  <div className="flex justify-between mt-6">
                    <p>Estimated Amount:</p>
                    <p>
                      ${' '}
                      {previewedAmountOnRedeem !== undefined
                        ? Number(previewedAmountOnRedeem / BigInt(1e18)).toLocaleString()
                        : '--'}
                    </p>
                  </div>
                </div>
                <DrawerFooter>
                  <Button
                    variant="primary"
                    size="lg"
                    fontWeight="heavy"
                    disabled={!hasSufficientRedemptionAmount || !hasSufficientShares}
                    onClick={redeem}
                  >
                    {redeemButtonText}
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
