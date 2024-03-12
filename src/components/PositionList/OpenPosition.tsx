import { tradePairAddress } from '@/lib/addresses';
import { formatEther } from 'viem';
import * as tradePairAbi from '@/abi/TradePair.json';
import { useWriteContract } from 'wagmi';
import { useEffect } from 'react';

export function OpenPosition(props) {
  const { error, failureReason, writeContract } = useWriteContract();

  useEffect(() => {
    if (error) {
      console.error(error);
      console.error(failureReason);
    }
  });

  const handleClose = async () => {
    await writeContract({
      address: tradePairAddress,
      abi: tradePairAbi.abi,
      functionName: 'closePosition',
      args: [props.position.id, []],
    });
  };

  return (
    <div key={props.position.id} className="border-solid border-2 border-sky-500 mb-3 p-3">
      <div>Size: {formatEther(props.position.entryVolume)} USDC</div>
      <div>Collateral: {formatEther(props.position.collateral)} USDC</div>
      <div>Entry Price: {formatEther(props.position.entryPrice)} USDC</div>
      <button onClick={handleClose} className="bg-sky-500 text-white px-2 py-1 rounded-md">
        Close
      </button>
    </div>
  );
}

