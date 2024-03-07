import { config } from './lib/wagmiConfig';

export enum Market {
  BTCUSD = 'BTCUSD',
  ETHUSD = 'ETHUSD',
  LTCUSD = 'LTCUSD',
  IOTAUSD = 'IOTAUSD',
  AVAXUSD = 'AVAXUSD',
  DOGEUSD = 'DOGEUSD',
  SHIBUSD = 'SHIBUSD',
}

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
