export enum Market {
  BTCUSD = 'BTCUSD',
  ETHUSD = 'ETHUSD',
}

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

