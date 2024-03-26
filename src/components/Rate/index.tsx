export const Rate = ({ value }: { value: bigint | undefined }) => {
  // Assuming 1e6 is equivalent to 100%
  const hundredPercent = 1e6;
  const percentage = (Number(value) / hundredPercent) * 100;

  return (
    <span>
      {value === undefined ? (
        <span>...</span>
      ) : (
        <span className="text-destructive">{'-' + percentage.toFixed(4) + ' %/h'}</span>
      )}
    </span>
  );
};
