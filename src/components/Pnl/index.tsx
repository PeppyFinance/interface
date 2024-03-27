import { formatUSD } from '@/lib/utils';
import classNames from 'classnames';

interface PnlProps {
  value: bigint;
}

export const Pnl = ({ value }: PnlProps) => {
  const isNegative = value < 0n;
  const pnl = formatUSD(value);

  return (
    <span
      className={classNames({
        'text-constructive': !isNegative,
        'text-destructive': isNegative,
      })}
    >
      {pnl}
    </span>
  );
};
