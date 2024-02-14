import { useReadContract } from 'wagmi';
import { collateralTokenAddress } from '@/lib/addresses';
import { useAccount } from 'wagmi';

export function BalanceDisplay() {
  const { address, status } = useAccount();

  const {
    data: balance,
    error,
    isPending,
  } = useReadContract({
    address: collateralTokenAddress,
    functionName: 'balanceOf',
    args: [address],
  });

  if (status !== 'connected') {
    return <div>Connect your wallet to see your balance</div>;
  }

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {(error as BaseError).shortMessage || error.message}</div>;

  return <div>Balance: {balance?.toString()}</div>;
}

