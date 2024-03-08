import { graphql } from '@/graphql/generated';
import { GetPositionsSubscription } from '@/graphql/generated/graphql';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from 'urql';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import classNames from 'classnames';

const newPositionsSubscription = graphql(/* GraphQL */ `
  subscription getPositions($owner: String!) {
    Position(where: { owner: { address: { _eq: $owner } } }) {
      collateral
      assets
      direction
      entryTimestamp
      id
    }
  }
`);

interface PositionProps {
  collateral: bigint;
  assets: bigint;
  isLong: boolean;
}

const Position = ({ collateral, assets, isLong }: PositionProps) => {
  return (
    <Card className="my-6 bg-glass/20 backdrop-blur-md rounded-md ">
      <CardHeader
        className={classNames('rounded-t-md p-0', {
          'bg-constructive/70': isLong,
          'bg-destructive/70': !isLong,
        })}
      >
        <p className="ml-4">{isLong ? 'long' : 'short'}</p>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export function PositionList() {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const [result] = useSubscription<GetPositionsSubscription>({
    query: newPositionsSubscription,
    variables: { owner: address },
  });

  if (address === undefined || !isConnected) {
    navigate('/');
  }

  const { data, fetching, error } = result;
  console.log(data);

  if (fetching) return <div>Loading...</div>;

  return (
    <div className="flex justify-center">
      <ScrollArea className="w-[90%]">
        {data
          ? data.Position.map(position => (
            <Position
              key={position.id}
              collateral={position.collateral}
              assets={position.assets}
              isLong={position.direction === '1'}
            />
          ))
          : []}
      </ScrollArea>
    </div>
  );
}
