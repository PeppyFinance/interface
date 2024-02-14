import { create } from 'zustand';
import { Market } from '../types.ts';

interface AppState {
  currentMarket: Market;
}

export const useStore = create<AppState>()(set => ({
  currentMarket: Market.BTCUSD,
  setCurrentMarket: (newMarket: Market) =>
    set(state => {
      return { ...state, currentMarket: newMarket };
    }),
}));
