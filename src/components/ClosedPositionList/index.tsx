import { useSubscription } from 'urql';
import { useAccount } from 'wagmi';
import { graphql } from '@/graphql';
import { Card, CardContent, CardHeader } from '../ui/card';
import classNames from 'classnames';
import { Address, formatEther } from 'viem';
import {
  formatDynamicPrecisionPrice,
  mapMarketToAssetPath,
  mapTradePairAddressToMarket,
} from '@/lib/utils';
import { Market } from '@/types';
import { Asset } from '../Asset';
import { PRICE_PRECISION } from '@/lib/constants';

function formatUSD(value: bigint): string {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(formatEther(value)));
}

const PNL = ({ value }: { value: bigint }) => {
  const isNegative = value < 0n;
  const pnl = formatUSD(value);

  return (
    <span
      className={classNames({
        'text-constructive': !isNegative,
        'text-destructive': isNegative,
      })}
    >
      {pnl}
    </span>
  );
};

const closedPositionsSubscription = graphql(/* GraphQL */ `
  subscription UserPositions($owner: String!) {
    Position(where: { owner_id: { _eq: $owner }, isOpen: { _eq: false } }) {
      collateral
      direction
      entryVolume
      entryPrice
      closePrice
      entryTimestamp
      closePrice
      pnl
      borrowFeeAmount
      fundingFeeAmount
      totalPnL
      id
      tradePair_id
      tradePair {
        name
      }
    }
  }
`);

interface PositionProps {
  size: number;
  collateral: number;
  entryPrice: number;
  closingPrice: number;
  pnl: number;
  totalPnL: number;
  borrowFee: number;
  fundingFee: number;
  isLong: boolean;
  market: Market;
  pairName: string;
}

const Position = ({
  size,
  collateral,
  entryPrice,
  closingPrice,
  pnl,
  totalPnL,
  borrowFee,
  fundingFee,
  isLong,
  pairName,
  market,
}: PositionProps) => {
  return (
    <Card className="bg-glass/20 backdrop-blur-md rounded-md ">
      <CardHeader
        className={classNames('rounded-t-md p-0', {
          'bg-constructive/70': isLong,
          'bg-destructive/70': !isLong,
        })}
      >
        <p className="ml-4">{isLong ? 'long' : 'short'}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 pt-6">
          <div className="mb-4">
            <Asset asset={{ key: pairName, value: pairName }} path={mapMarketToAssetPath(market)} />
          </div>
          <div className="flex justify-between">
            <p>Size:</p>
            <p>{formatUSD(BigInt(size))}</p>
          </div>
          <div className="flex justify-between">
            <p>Collateral:</p>
            <p>{formatUSD(BigInt(collateral))}</p>
          </div>
          <div className="flex justify-between">
            <p>Entry Price:</p>
            <p>${formatDynamicPrecisionPrice(Number(entryPrice) / PRICE_PRECISION)}</p>
          </div>
          <div className="flex justify-between">
            <p>Closing Price:</p>
            <p>${formatDynamicPrecisionPrice(Number(closingPrice) / PRICE_PRECISION)}</p>
          </div>
        </div>
        <div className="space-y-1 pt-6">
          <div className="flex justify-between">
            <p>PnL:</p>
            <p>{<PNL value={BigInt(pnl)} />}</p>
          </div>
          <div className="flex justify-between">
            <p>Funding fees:</p>
            <p>{<PNL value={BigInt(-fundingFee)} />}</p>
          </div>
          <div className="flex justify-between">
            <p>Borrow fees:</p>
            <p>{<PNL value={BigInt(-borrowFee)} />}</p>
          </div>
        </div>
        <div className="space-y-1 pt-6">
          <div className="flex justify-between">
            <p>Net PnL:</p>
            <p>{<PNL value={BigInt(totalPnL)} />}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function ClosedPositionList() {
  const { address, status } = useAccount();

  const [result] = useSubscription({
    query: closedPositionsSubscription,
    variables: { owner: address || '' },
    pause: !address,
  });

  if (status !== 'connected') {
    return (
      <div className="flex justify-center px-6 pt-8">
        Connect your wallet to see your closed positions.
      </div>
    );
  }

  const { data, fetching } = result;

  if (fetching) return <div>Loading...</div>;

  return (
    <div className="h-full p-6">
      <div className="flex flex-col space-y-4">
        {data && data?.Position.length !== 0 ? (
          data.Position.map(position => (
            <Position
              key={position.id}
              size={position.entryVolume}
              collateral={position.collateral}
              entryPrice={position.entryPrice}
              closingPrice={position.closePrice || 0}
              pnl={position.pnl || 0}
              totalPnL={position.totalPnL || 0}
              borrowFee={position.borrowFeeAmount || 0}
              fundingFee={position.fundingFeeAmount || 0}
              isLong={position.direction === 1}
              market={mapTradePairAddressToMarket(position.tradePair_id as Address)}
              pairName={position.tradePair?.name || ''}
            />
          ))
        ) : (
          <div className="px-4 py-8">No closed positions.</div>
        )}
      </div>
    </div>
  );
}
