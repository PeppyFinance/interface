import { useAccount } from 'wagmi';

export function OpenPositionForm() {
  const { status } = useAccount();

  if (status !== 'connected') {
    return <div>Connect your wallet to open a position.</div>;
  }

  return (
    <div>
      <h1>Open Position</h1>
    </div>
  );
}

