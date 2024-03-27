import PeppyUsdcAbi from '@/abi/PeppyUsdc.abi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { collateralTokenAddress } from '@/lib/addresses';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

export const GetStartedPage = () => {
  const { address, status: statusAccount } = useAccount();

  const { data: minted, refetch: refetchMinted } = useReadContract({
    address: collateralTokenAddress,
    abi: PeppyUsdcAbi,
    functionName: 'minted',
    args: [address],
  });

  const maxMintable = 100_000;

  const parsedMinted = minted !== undefined ? (minted / BigInt(1e18)).toLocaleString() : '...';

  const parsedMaxMintable = maxMintable.toLocaleString();

  const remainingMintable = minted !== undefined ? BigInt(maxMintable) - minted / BigInt(1e18) : 0n;

  const {
    writeContract: mintTokens,
    data: hashMintTokens,
    status: statusMintTokens,
  } = useWriteContract();

  const {
    isLoading: isConfirmingMint,
    isSuccess: mintConfirmed,
    isError: mintNotConfirmed,
  } = useWaitForTransactionReceipt({
    hash: hashMintTokens,
  });

  const mintButtonText = useMemo(
    () =>
      statusAccount !== 'connected'
        ? 'Wallet not connected'
        : remainingMintable === 0n
          ? 'Maximum reached'
          : 'Mint Tokens',
    [statusAccount, remainingMintable]
  );

  const handleMintTokens = () => {
    if (remainingMintable === 0n) {
      return;
    }

    mintTokens({
      address: collateralTokenAddress,
      abi: PeppyUsdcAbi,
      functionName: 'mint',
      args: [remainingMintable * BigInt(1e18)],
    });
  };

  const showSpinner = useMemo(
    () => statusMintTokens === 'pending' || isConfirmingMint,
    [statusMintTokens, isConfirmingMint]
  );

  const isMintButtonDisabled = useMemo(
    () => statusAccount !== 'connected' || remainingMintable === 0n || showSpinner,
    [statusAccount, remainingMintable]
  );

  useEffect(() => {
    if (mintConfirmed) {
      refetchMinted();
      toast.success('Tokens minted');
    }
  }, [mintConfirmed]);

  useEffect(() => {
    if (mintNotConfirmed) {
      toast.error('Tokens not minted', { description: 'Something went wrong.' });
    }
  }, [mintNotConfirmed]);

  useEffect(() => {
    if (statusMintTokens === 'success') {
      toast.info('Mint tokens', { description: 'Waiting for confirmation.' });
    }
  }, [statusMintTokens]);

  return (
    <div className="flex flex-col items-center my-6 space-y-4">
      <Card className="bg-glass/20 backdrop-blur-md rounded-md w-[90%]">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="space-y-2">
            <p>In order to get started with trading you need to need capital.</p>
            <p>Here you can mint yourself up to 100,000 test tokens.</p>
            <p>
              You have so far minted {parsedMinted} / {parsedMaxMintable} tokens.
            </p>
          </p>
        </CardContent>
        <CardFooter>
          <Button disabled={isMintButtonDisabled} variant="constructive" onClick={handleMintTokens}>
            {mintButtonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
