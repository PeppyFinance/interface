import {
  collateralTokenAddress,
  liquidityPoolAddress,
  tradePairBtcUsdAddress,
  tradePairEthUsdAddress,
  tradePairIotaUsdAddress,
} from '@/lib/addresses';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import LiquidityPoolAbi from '@/abi/LiquidityPool.abi.ts';
import TradePairAbi from '@/abi/TradePair.abi';
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
import { useWaitForTransactionReceipt } from 'wagmi';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { Asset } from '@/components/Asset';
import { mapMarketToAssetPath } from '@/lib/utils';
import { Market } from '@/types';
import { Rate } from '@/components/Rate';

function parseUsdString(str: string): bigint {
  return BigInt(str.replaceAll('$', '').replaceAll(',', '').replaceAll(' ', '')) * BigInt(1e18);
}

function parseLpString(str: string): bigint {
  return BigInt(str.replaceAll('PLP', '').replaceAll(',', '').replaceAll(' ', '')) * BigInt(1e18);
}

export const Pool = () => {
  const { address, status: statusAccount } = useAccount();
  const [depositAmount, setDepositAmount] = useState<string>('$ 0');
  const [redemptionAmount, setRedemptionAmount] = useState<string>('0 PLP');
  const [isDepositDrawerOpen, setDepositDrawerOpen] = useState<boolean>(false);
  const [isRedeemDrawerOpen, setRedeemDrawerOpen] = useState<boolean>(false);

  const {
    writeContract: writeContractDeposit,
    data: hashDeposit,
    status: statusDeposit,
  } = useWriteContract();
  const {
    writeContract: writeContractRedeem,
    data: hashRedeem,
    status: statusRedeem,
  } = useWriteContract();
  const {
    writeContract: writeContractAllowance,
    data: hashAllowance,
    status: statusAllowance,
  } = useWriteContract();

  const {
    isLoading: isConfirmingDeposit,
    isSuccess: depositConfirmed,
    isError: depositNotConfirmed,
  } = useWaitForTransactionReceipt({
    hash: hashDeposit,
  });
  const {
    isLoading: isConfirmingRedeem,
    isSuccess: redemptionConfirmed,
    isError: redemptionNotConfirmed,
  } = useWaitForTransactionReceipt({
    hash: hashRedeem,
  });
  const {
    isLoading: isConfirmingAllowance,
    isSuccess: allowanceConfirmed,
    isError: allowanceNotConfirmed,
  } = useWaitForTransactionReceipt({
    hash: hashAllowance,
  });

  const dollarMaskedInputRef = useMaskito({ options: DollarMask });
  const lpMaskedInputRef = useMaskito({ options: LpMask });

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

  const { data: ownedLiquidity } = useReadContract({
    address: liquidityPoolAddress,
    abi: LiquidityPoolAbi,
    functionName: 'previewRedeem',
    args: [ownedShares],
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

  // TODO: batch this up via multicall or serve via custom API
  const { data: iotaFundingRate, refetch: refetchIotaFundingRate } = useReadContract({
    address: tradePairIotaUsdAddress,
    abi: TradePairAbi,
    functionName: 'getFundingRate',
  });
  const { data: btcFundingRate, refetch: refetchBtcFundingRate } = useReadContract({
    address: tradePairBtcUsdAddress,
    abi: TradePairAbi,
    functionName: 'getFundingRate',
  });
  const { data: ethFundingRate, refetch: refetchEthFundingRate } = useReadContract({
    address: tradePairEthUsdAddress,
    abi: TradePairAbi,
    functionName: 'getFundingRate',
  });
  const { data: iotaBorrowRate, refetch: refetchIotaBorrowRate } = useReadContract({
    address: tradePairIotaUsdAddress,
    abi: TradePairAbi,
    functionName: 'getBorrowRate',
  });
  const { data: btcBorrowRate, refetch: refetchBtcBorrowRate } = useReadContract({
    address: tradePairBtcUsdAddress,
    abi: TradePairAbi,
    functionName: 'getBorrowRate',
  });
  const { data: ethBorrowRate, refetch: refetchEthBorrowRate } = useReadContract({
    address: tradePairEthUsdAddress,
    abi: TradePairAbi,
    functionName: 'getBorrowRate',
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
      statusAccount !== 'connected'
        ? 'Wallet not connected'
        : !hasSufficientBalance
          ? 'Not enough funds'
          : !hasSufficientAllowance
            ? 'Approve'
            : !hasSufficientDepositAmount
              ? 'Insufficient Amount'
              : 'Deposit',
    [hasSufficientBalance, hasSufficientAllowance, hasSufficientDepositAmount, statusAccount]
  );

  const redeemButtonText = useMemo(
    () =>
      statusAccount !== 'connected'
        ? 'Wallet not connected'
        : !hasSufficientShares
          ? 'Not enough shares'
          : !hasSufficientRedemptionAmount
            ? 'Insufficient Amount'
            : 'Redeem',
    [hasSufficientShares, hasSufficientRedemptionAmount, statusAccount]
  );

  const showSpinner = useMemo(
    () =>
      statusAllowance === 'pending' ||
      statusDeposit === 'pending' ||
      statusRedeem === 'pending' ||
      isConfirmingAllowance ||
      isConfirmingRedeem ||
      isConfirmingDeposit,
    [
      statusAllowance,
      statusDeposit,
      statusRedeem,
      isConfirmingAllowance,
      isConfirmingRedeem,
      isConfirmingDeposit,
    ]
  );

  const isDepositButtonDisabled = useMemo(
    () =>
      !hasSufficientDepositAmount ||
      !hasSufficientBalance ||
      statusAccount !== 'connected' ||
      showSpinner,
    [hasSufficientDepositAmount, hasSufficientBalance, statusAccount, showSpinner]
  );

  const isRedeemButtonDisabled = useMemo(
    () =>
      !hasSufficientRedemptionAmount ||
      !hasSufficientShares ||
      statusAccount !== 'connected' ||
      showSpinner,
    [hasSufficientRedemptionAmount, hasSufficientShares, statusAccount, showSpinner]
  );

  const isDepositInputDisabled = useMemo(() => showSpinner, [showSpinner]);

  const isRedeemInputDisabled = useMemo(() => showSpinner, [showSpinner]);

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
    if (depositConfirmed) {
      setDepositDrawerOpen(false);
      refetchTotalAssets();
      refetchBalance();
      refetchAllowance();
      refetchOwnedShares();
      refetchTotalShares();
      setDepositAmount('$ 0');

      toast.success('Deposit confirmed');
    }
  }, [depositConfirmed]);

  useEffect(() => {
    if (depositNotConfirmed) {
      toast.error('Deposit not confirmed', { description: 'Something went wrong.' });
    }
  }, [depositNotConfirmed]);

  useEffect(() => {
    if (redemptionConfirmed) {
      setRedeemDrawerOpen(false);
      refetchTotalAssets();
      refetchBalance();
      refetchAllowance();
      refetchOwnedShares();
      refetchTotalShares();
      setRedemptionAmount('0 PLP');

      toast.success('Redemption confirmed');
    }
  }, [redemptionConfirmed]);

  useEffect(() => {
    if (redemptionNotConfirmed) {
      toast.error('Redemption not confirmed', { description: 'Something went wrong.' });
    }
  }, [redemptionNotConfirmed]);

  useEffect(() => {
    if (allowanceConfirmed) {
      refetchAllowance();

      toast.success('Allowance confirmed');
    }
  }, [allowanceConfirmed]);

  useEffect(() => {
    if (allowanceNotConfirmed) {
      toast.error('Allowance not confirmed', { description: 'Something went wrong.' });
    }
  }, [allowanceNotConfirmed]);

  useEffect(() => {
    if (statusAllowance === 'success') {
      toast.info('Increase Allowance', { description: 'Waiting for confirmation' });
    } else if (statusAllowance === 'error') {
      toast.error('Cannot increase allowance', { description: 'Something went wrong.' });
    }
  }, [statusAllowance]);

  useEffect(() => {
    if (statusDeposit === 'success') {
      toast.info('Deposit Liquidity', { description: 'Waiting for confirmation' });
    } else if (statusDeposit === 'error') {
      toast.error('Cannot deposit liquidity', { description: 'Something went wrong.' });
    }
  }, [statusDeposit]);

  useEffect(() => {
    if (statusRedeem === 'success') {
      toast.info('Redeem Liquidity', { description: 'Waiting for confirmation' });
    } else if (statusRedeem === 'error') {
      toast.error('Cannot redeem liquidity', { description: 'Something went wrong.' });
    }
  }, [statusRedeem]);

  useEffect(() => {
    const id = setInterval(() => {
      refetchIotaBorrowRate();
      refetchIotaFundingRate();
      refetchBtcBorrowRate();
      refetchBtcFundingRate();
      refetchEthFundingRate();
      refetchEthBorrowRate();
    }, 10000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center my-6 space-y-4">
      <Card className="bg-glass/20 backdrop-blur-md rounded-md w-[90%]">
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
                <p>
                  <p>
                    $
                    {ownedLiquidity !== undefined
                      ? Number(ownedLiquidity / BigInt(1e18)).toLocaleString()
                      : '--'}
                  </p>
                </p>
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
                    disabled={isDepositInputDisabled}
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
                    disabled={isDepositButtonDisabled}
                    onClick={deposit}
                  >
                    {showSpinner && <Spinner size="small" className="mr-2 text-foreground" />}
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
                    disabled={isRedeemInputDisabled}
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
                    disabled={isRedeemButtonDisabled}
                    onClick={redeem}
                  >
                    {showSpinner && <Spinner size="small" className="mr-2 text-foreground" />}
                    {redeemButtonText}
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </CardFooter>
      </Card>
      <Card className="bg-glass/20 backdrop-blur-md rounded-md w-[90%]">
        <CardHeader className="pb-6">
          <CardTitle>Trade Pair Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="space-y-4">
            <div>
              <Asset
                asset={{ key: 'iota', value: 'IOTA' }}
                path={mapMarketToAssetPath(Market.IOTAUSD)}
              />
              <div>
                <div className="flex justify-between">
                  <p>Borrow Rate:</p>
                  <p>
                    <Rate value={iotaBorrowRate} />
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Funding Rate:</p>
                  <p>
                    <Rate value={iotaFundingRate} />
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Asset
                asset={{ key: 'btc', value: 'BTC' }}
                path={mapMarketToAssetPath(Market.BTCUSD)}
              />
              <div>
                <div className="flex justify-between">
                  <p>Borrow Rate:</p>
                  <p>
                    <Rate value={btcBorrowRate} />
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Funding Rate:</p>
                  <p>
                    <Rate value={btcFundingRate} />
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Asset
                asset={{ key: 'eth', value: 'ETH' }}
                path={mapMarketToAssetPath(Market.ETHUSD)}
              />
              <div>
                <div className="flex justify-between">
                  <p>Borrow Rate:</p>
                  <p>
                    <Rate value={ethBorrowRate} />
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Funding Rate:</p>
                  <p>
                    <Rate value={ethFundingRate} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
