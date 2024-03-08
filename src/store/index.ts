import { create } from 'zustand';
import { Market } from '../types.ts';

interface MarketState {
  priceFeedId: string;
  currentPrice: number;
  confidence: number;
  publishTime: Date;
}

interface AppState {
  currentMarket: Market;
  marketsState: Record<Market, MarketState | null>;
  setMarketState: (market: Market, marketState: MarketState) => void;
  setCurrentMarket: (market: Market) => void;
}

export const useStore = create<AppState>()(set => ({
  currentMarket: Market.BTCUSD,
  marketsState: {
    BTCUSD: null,
    ETHUSD: null,
    LTCUSD: null,
    IOTAUSD: null,
    AVAXUSD: null,
    DOGEUSD: null,
    SHIBUSD: null,
  },
  setMarketState: (market: Market, marketState: MarketState) =>
    set(state => ({
      ...state,
      marketsState: {
        ...state.marketsState,
        [market]: marketState,
      },
    })),
  setCurrentMarket: (market: Market) =>
    set(state => {
      return { ...state, currentMarket: market };
    }),
}));
