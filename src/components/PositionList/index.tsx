import { gql, useSubscription } from 'urql';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';

const newPositionsSubscription = gql`
  subscription UserPositions($owner: String!) {
    Position(where: { owner: { _eq: $owner } }) {
      collateral
      direction
      entryTimestamp
      id
    }
  }
`;

export function PositionList() {
  const { address, status } = useAccount();

  const [result] = useSubscription({
    query: newPositionsSubscription,
    variables: { owner: address },
  });

  if (status !== 'connected') {
    return <div>Connect your wallet to see your positions</div>;
  }

  const { data, fetching, error } = result;
  console.log(data);

  if (fetching) return <div>Loading...</div>;

  if (error) return <div>Error: {(error as BaseError).shortMessage || error.message || error}</div>;

  return (
    <div>
      <h1>Positions</h1>
      <ul>
        {data.Position.map(position => (
          <li key={position.id}>{formatEther(position.collateral)} USDC</li>
        ))}
      </ul>
    </div>
  );
}

