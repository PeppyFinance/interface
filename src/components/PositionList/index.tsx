import { gql, useQuery } from 'urql';

const UserPositionsQuery = gql`
  query UserPositions {
    User {
      id
      positions {
        id
        collateral
        direction
        entryTimestamp
      }
      address
    }
  }
`;

export function PositionList() {
  const [result] = useQuery({
    query: UserPositionsQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <div>Loading...</div>;

  if (error) return <div>Error: {(error as BaseError).shortMessage || error.message || error}</div>;

  console.log(data);

  return <div>data: {data?.toString()}</div>;
}

