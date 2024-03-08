import { maskitoNumberOptionsGenerator } from '@maskito/kit';

export const DollarMask = maskitoNumberOptionsGenerator({
  precision: 0,
  thousandSeparator: ',',
  prefix: '$ ',
  max: 1_000_000_000,
  min: 0,
});

export const LpMask = maskitoNumberOptionsGenerator({
  precision: 0,
  thousandSeparator: ',',
  postfix: ' PLP',
  max: 1_000_000_000,
  min: 0,
});
