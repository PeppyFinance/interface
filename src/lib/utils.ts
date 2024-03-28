import { PositionValues, Market } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Address, formatEther } from 'viem';
import {
  tradePairBtcUsdAddress,
  tradePairEthUsdAddress,
  tradePairIotaUsdAddress,
} from './addresses';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDynamicPrecisionPrice(price: number): string {
  if (price <= 0) {
    return '0.00';
  } else if (price < 1) {
    // Count leading zeros and adjust for non-zero decimals
    const leadingZeros = Math.ceil(-Math.log10(price));
    // Determine additional non-zero digits needed
    let additionalDigits = 0;
    let tempPrice = price * Math.pow(10, leadingZeros);
    while (additionalDigits < 4 && tempPrice < Math.pow(10, 4)) {
      tempPrice *= 10;
      additionalDigits++;
    }
    const decimalPlaces = leadingZeros + additionalDigits - 1;
    return price.toFixed(decimalPlaces);
  } else {
    // For numbers >= 1, adjust decimal places based on the number itself
    const integerDigits = Math.floor(price).toString().length;
    const decimalPlaces = integerDigits < 2 ? 3 : 2;
    return price.toFixed(decimalPlaces);
  }
}

export function formatPrice(price: number): string {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 20,
  }).format(Number(formatDynamicPrecisionPrice(price)));
}

export function formatUSD(value: bigint): string {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(formatEther(value)));
}

export function mapMarketToTradePairAddress(market: Market): Address {
  const _map: Record<Market, Address> = {
    [Market.BTCUSD]: tradePairBtcUsdAddress,
    [Market.ETHUSD]: tradePairEthUsdAddress,
    [Market.IOTAUSD]: tradePairIotaUsdAddress,
  };

  return _map[market];
}

export function mapTradePairAddressToMarket(address: Address): Market {
  const _map: Record<Address, Market> = {
    [tradePairBtcUsdAddress]: Market.BTCUSD,
    [tradePairEthUsdAddress]: Market.ETHUSD,
    [tradePairIotaUsdAddress]: Market.IOTAUSD,
  };

  return _map[address];
}

export function mapMarketToAssetPath(market: Market): string {
  const _map: Record<Market, string> = {
    [Market.BTCUSD]: 'btc',
    [Market.ETHUSD]: 'eth',
    [Market.IOTAUSD]: 'iota',
  };

  return _map[market];
}

export function mapMarketToPriceFeedId(market: Market): string {
  const _map: Record<Market, string> = {
    [Market.BTCUSD]: 'e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
    [Market.ETHUSD]: 'ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    [Market.IOTAUSD]: 'c7b72e5d860034288c9335d4d325da4272fe50c92ab72249d58f6cbba30e4c44',
  };

  return _map[market];
}

export function liquidationPriceCalculation(position: PositionValues): number {
  const result: number = position.entryPrice * (1 + (position.isLong ? -1 : 1) * position.collateral / position.size);

  if(!Number.isNaN(result) && result > 0) return result
  return 0
}
