import classNames from 'classnames';

export const Rate = ({ value }: { value: bigint | undefined }) => {
  // Assuming 1e6 is equivalent to 100%
  const hundredPercent = 1e6;
  const percentage = -1 * ((Number(value) / hundredPercent) * 100);

  const isLongSkewed = percentage >= 0;

  return (
    <span>
      {value === undefined ? (
        <span>...</span>
      ) : (
        <span
          className={classNames({
            'text-constructive': isLongSkewed,
            'text-destructive': !isLongSkewed,
          })}
        >
          {percentage.toFixed(4) + ' %/h'}
        </span>
      )}
    </span>
  );
};
