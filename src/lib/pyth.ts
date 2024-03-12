import { useMarketStore } from '@/store';
import { Market } from '@/types';
import { EvmPriceServiceConnection, PriceFeed } from '@pythnetwork/pyth-evm-js';

export const connection = new EvmPriceServiceConnection('https://hermes.pyth.network');

const priceFeedIdToMarketMap: Record<string, Market> = {
  e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43: Market.BTCUSD,
  ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace: Market.ETHUSD,
  '6e3f3fa8253588df9326580180233eb791e03b443a3ba7a1d892e73874e19a54': Market.LTCUSD,
  c7b72e5d860034288c9335d4d325da4272fe50c92ab72249d58f6cbba30e4c44: Market.IOTAUSD,
  '93da3352f9f1d105fdfe4971cfa80e9dd777bfc5d0f683ebb6e1294b92137bb7': Market.AVAXUSD,
  dcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c: Market.DOGEUSD,
  f0d57deca57b3da2fe63a493f4c25925fdfd8edf834b20f93e1f84dbd1504d4a: Market.SHIBUSD,
};

function storePrice(priceFeed: PriceFeed) {
  // TODO: not sure if unchecked is a good option here
  const priceStruct = priceFeed.getPriceUnchecked();
  const price = Number(priceStruct.price) * 10 ** priceStruct.expo;

  useMarketStore.getState().setMarketState(priceFeedIdToMarketMap[priceFeed.id.toLowerCase()], {
    priceFeedId: priceFeed.id,
    currentPrice: price,
    confidence: Number(priceStruct.conf),
    publishTime: new Date(priceStruct.publishTime),
    price: priceStruct.price,
    expo: priceStruct.expo,
  });
}

export function subscribeToPriceFeeds() {
  connection.subscribePriceFeedUpdates(Object.keys(priceFeedIdToMarketMap), storePrice);
}

export function unsubscribeToPriceFeeds() {
  connection.unsubscribePriceFeedUpdates(Object.keys(priceFeedIdToMarketMap));
}
