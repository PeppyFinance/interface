import { create } from 'zustand';
import { Symbol } from '../types.ts';

interface AppState {
  currentSymbol: Symbol;
}

export const useStore = create<AppState>()(set => ({
  currentSymbol: Symbol.BTCUSD,
  setCurrentSymbol: (newSymbol: Symbol) =>
    set(state => {
      return { ...state, currentSymbol: newSymbol };
    }),
}));
