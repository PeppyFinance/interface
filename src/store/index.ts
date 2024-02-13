import { create } from 'zustand';
import { Market } from '../types.ts';

interface AppState {
  currentSymbol: Market;
}

export const useStore = create<AppState>()(set => ({
  currentSymbol: Symbol.BTCUSD,
  setCurrentSymbol: (newSymbol: Market) =>
    set(state => {
      return { ...state, currentSymbol: newSymbol };
    }),
}));

