import { formatEther } from 'viem';

export function OpenPosition(props) {
  // define prop position

  return (
    <div key={props.position.id} className="border-solid border-2 border-sky-500 mb-3 p-3">
      <div>Size: {formatEther(props.position.entryVolume)} USDC</div>
      <div>Collateral: {formatEther(props.position.collateral)} USDC</div>
      <div>Entry Price: {formatEther(props.position.entryPrice)} USDC</div>
    </div>
  );
}

