import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
