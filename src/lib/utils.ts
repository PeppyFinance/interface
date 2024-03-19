import { Market } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Address } from 'viem';
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
    maximumFractionDigits: 99,
  }).format(Number(formatDynamicPrecisionPrice(price)));
}

export function mapMarketToTradePairAddress(market: Market): Address {
  const _map: Record<Market, Address> = {
    [Market.BTCUSD]: tradePairBtcUsdAddress,
    [Market.ETHUSD]: tradePairEthUsdAddress,
    [Market.IOTAUSD]: tradePairIotaUsdAddress,
  };

  return _map[market];
}
