import { gql, useSubscription } from 'urql';
import { useAccount } from 'wagmi';
import { ClosedPosition } from './ClosedPosition';

const closedPositionsSubscription = gql`
  subscription UserPositions($owner: String!) {
    Position(where: { owner_id: { _eq: $owner }, isOpen: { _eq: false } }) {
      collateral
      direction
      entryVolume
      entryPrice
      entryTimestamp
      closePrice
      totalPnL
      pnl
      borrowFeeAmount
      fundingFeeAmount
      id
    }
  }
`;

export function ClosedPositionList() {
  const { address, status } = useAccount();

  const [result] = useSubscription({
    query: closedPositionsSubscription,
    variables: { owner: address },
  });

  if (status !== 'connected') {
    return <div>Connect your wallet to see your positions</div>;
  }

  const { data, fetching, error } = result;

  if (fetching) return <div>Loading...</div>;

  if (error) return <div>Error: {(error as BaseError).shortMessage || error.message || error}</div>;

  return (
    <div>
      <h1>Closed Positions / Trades</h1>
      <ul>
        {data.Position.map(position => (
          <ClosedPosition key={position.id} position={position} />
        ))}
      </ul>
    </div>
  );
}

