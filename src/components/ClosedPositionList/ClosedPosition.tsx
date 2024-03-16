import { formatEther } from 'viem';

export function ClosedPosition(props) {
  return (
    <div key={props.position.id} className="border-solid border-2 border-sky-500 mb-3 p-3">
      <div>Size: {formatEther(props.position.entryVolume)} USDC</div>
      <div>Collateral: {formatEther(props.position.collateral)} USDC</div>
      <div>Entry Price: {formatEther(props.position.entryPrice)} USDC</div>
      <div>Close Price: {formatEther(props.position.closePrice)} USDC</div>
      <div>Total PnL: {formatEther(props.position.totalPnL)} USDC</div>
      <div>PnL: {formatEther(props.position.pnl)} USDC</div>
      <div>Borrow Fee: {formatEther(props.position.borrowFeeAmount)} USDC</div>
      <div>Funding Fee: {formatEther(props.position.fundingFeeAmount)} USDC</div>
    </div>
  );
}

