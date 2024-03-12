import { tradePairAddress } from '@/lib/addresses';
import { encodeAbiParameters, formatEther } from 'viem';
import * as tradePairAbi from '@/abi/TradePair.json';
import { useBlock, useWriteContract } from 'wagmi';
import { useEffect } from 'react';
import { useMarketStore } from '@/store';

export function OpenPosition(props) {
  const { error, failureReason, writeContract } = useWriteContract();

  const block = useBlock();

  const { marketsState, currentMarket } = useMarketStore();

  const currentMarketState = marketsState[currentMarket];

  useEffect(() => {
    if (error) {
      console.error(error);
      console.error(failureReason);
    }
  });

  const handleClose = async () => {
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
              id: '0x' + currentMarketState.priceFeedId,
              price: {
                price: currentMarketState.price,
                conf: currentMarketState.confidence,
                expo: currentMarketState.expo,
                publishTime: timestamp,
              },
              emaPrice: {
                price: currentMarketState.price,
                conf: currentMarketState.confidence,
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

    await writeContract({
      address: tradePairAddress,
      abi: tradePairAbi.abi,
      functionName: 'closePosition',
      args: [props.position.id, priceFeedUpdateData],
      value: 1n,
    });
  };

  return (
    <div key={props.position.id} className="border-solid border-2 border-sky-500 mb-3 p-3">
      <div>Size: {formatEther(props.position.entryVolume)} USDC</div>
      <div>Collateral: {formatEther(props.position.collateral)} USDC</div>
      <div>Entry Price: {formatEther(props.position.entryPrice)} USDC</div>
      <button onClick={handleClose} className="bg-sky-500 text-white px-2 py-1 rounded-md">
        Close
      </button>
    </div>
  );
}

