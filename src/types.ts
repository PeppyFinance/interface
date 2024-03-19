import { config } from './lib/wagmiConfig';

export enum Market {
  IOTAUSD = 'IOTAUSD',
  BTCUSD = 'BTCUSD',
  ETHUSD = 'ETHUSD',
  // LTCUSD = 'LTCUSD',
  // AVAXUSD = 'AVAXUSD',
  // DOGEUSD = 'DOGEUSD',
  // SHIBUSD = 'SHIBUSD',
}

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
