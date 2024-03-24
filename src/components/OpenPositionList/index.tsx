import { useSubscription } from 'urql';
import { useAccount, useBlock, useWriteContract } from 'wagmi';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import classNames from 'classnames';
import { graphql } from '@/graphql';
import { useMarketStore } from '@/store';
import { Hex, encodeAbiParameters, formatEther } from 'viem';
import { connection } from '@/lib/pyth';
import * as tradePairAbi from '@/abi/TradePair.json';
import { Button } from '../ui/button';
import { formatDynamicPrecisionPrice, mapMarketToTradePairAddress } from '@/lib/utils';
import { useMemo } from 'react';

const PRICE_PRECISION = 1e30;

function formatUSD(value: bigint): string {
  return (
    '$' +
    Intl.NumberFormat()
      .format(BigInt(formatEther(value)))
      .toString()
  );
}

const openPositionsSubscription = graphql(/* GraphQL */ `
  subscription getPositions($owner: String!) {
    Position(where: { owner: { address: { _eq: $owner } }, isOpen: { _eq: true } }) {
      collateral
      direction
      entryVolume
      entryPrice
      entryTimestamp
      id
    }
  }
`);

interface PositionProps {
  id: string;
  size: string;
  collateral: string;
  entryPrice: string;
  isLong: boolean;
}

const Position = ({ id, size, collateral, entryPrice, isLong }: PositionProps) => {
  const { writeContract } = useWriteContract();
  const block = useBlock();
  const { marketsState, currentMarket } = useMarketStore();

  const leverage = Number(size) / Number(collateral);

  const tradePairAddress = useMemo(
    () => mapMarketToTradePairAddress(currentMarket),
    [currentMarket]
  );

  const handleClose = async () => {
    const currentMarketState = marketsState[currentMarket];

    if (currentMarketState === null) {
      // TODO: probably should log here
      return;
    }

    let priceFeedUpdateData;
    const timestamp = block.data?.timestamp;
    if (import.meta.env.MODE === 'anvil') {
      // on a local anvil chain, we use MockPyth and have to encode the data ourselves
      priceFeedUpdateData = [
        encodeAbiParameters(
          [
            {
              components: [
                {
                  internalType: 'bytes32',
                  name: 'id',
                  type: 'bytes32',
                },
                {
                  components: [
                    {
                      internalType: 'int64',
                      name: 'price',
                      type: 'int64',
                    },
                    {
                      internalType: 'uint64',
                      name: 'conf',
                      type: 'uint64',
                    },
                    {
                      internalType: 'int32',
                      name: 'expo',
                      type: 'int32',
                    },
                    {
                      internalType: 'uint64',
                      name: 'publishTime',
                      type: 'uint64',
                    },
                  ],
                  name: 'price',
                  type: 'tuple',
                },
                {
                  components: [
                    {
                      internalType: 'int64',
                      name: 'price',
                      type: 'int64',
                    },
                    {
                      internalType: 'uint64',
                      name: 'conf',
                      type: 'uint64',
                    },
                    {
                      internalType: 'int32',
                      name: 'expo',
                      type: 'int32',
                    },
                    {
                      internalType: 'uint64',
                      name: 'publishTime',
                      type: 'uint64',
                    },
                  ],
                  name: 'emaPrice',
                  type: 'tuple',
                },
              ],
              name: 'PriceFeed',
              type: 'tuple',
            },
          ],
          [
            {
              id: ('0x' + currentMarketState.priceFeedId) as Hex,
              price: {
                price: BigInt(currentMarketState.price),
                conf: BigInt(currentMarketState.confidence),
                expo: currentMarketState.expo,
                publishTime: timestamp,
              },
              emaPrice: {
                price: BigInt(currentMarketState.price),
                conf: BigInt(currentMarketState.confidence),
                expo: currentMarketState.expo,
                publishTime: timestamp,
              },
            },
          ]
        ),
      ];
    } else {
      priceFeedUpdateData = await connection.getPriceFeedsUpdateData([
        currentMarketState.priceFeedId,
      ]);
    }

    writeContract({
      address: tradePairAddress,
      abi: tradePairAbi.abi,
      functionName: 'closePosition',
      args: [id, priceFeedUpdateData],
      value: 1n,
    });
  };

  return (
    <Card className="bg-glass/20 backdrop-blur-md rounded-md">
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
          <div className="flex justify-between">
            <p>Collateral:</p>
            <p>{formatUSD(BigInt(collateral))}</p>
          </div>
          <div className="flex justify-between">
            <p>Leverage:</p>
            <p>{leverage}x</p>
          </div>
          <div className="flex justify-between">
            <p>Size:</p>
            <p>{formatUSD(BigInt(size))}</p>
          </div>
          <div className="flex justify-between">
            <p>Entry Price:</p>
            <p>${formatDynamicPrecisionPrice(Number(entryPrice) / PRICE_PRECISION)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="default" fontSize="sm" onClick={handleClose}>
          Close
        </Button>
      </CardFooter>
    </Card>
  );
};

export function OpenPositionList() {
  const { address, status } = useAccount();

  const [result] = useSubscription({
    query: openPositionsSubscription,
    variables: { owner: address || '' },
    pause: !address,
  });

  if (status !== 'connected') {
    return (
      <div className="flex justify-center px-6 pt-8">
        Connect your wallet to see your open positions.
      </div>
    );
  }

  const { data, fetching } = result;

  if (fetching) return <div>Loading...</div>;

  return (
    <div className="h-full p-6">
      <div className="flex flex-col space-y-4">
        {data && data.Position.length !== 0 ? (
          data.Position.map(position => (
            <Position
              key={position.id}
              id={position.id}
              size={position.entryVolume}
              collateral={position.collateral}
              entryPrice={position.entryPrice}
              isLong={position.direction === '1'}
            />
          ))
        ) : (
          <div className="px-4 py-8">No open positions.</div>
        )}
      </div>
    </div>
  );
}
