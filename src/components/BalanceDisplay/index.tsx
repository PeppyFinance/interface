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
    account: address,
    args: [address],
    abi: [
      {
        constant: true,
        inputs: [{ name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ],
  });

  if (status !== 'connected') {
    return <div>Connect your wallet to see your balance</div>;
  }

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {(error as BaseError).shortMessage || error.message}</div>;

  return <div>Balance: {balance?.toString()}</div>;
}

