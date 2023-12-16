import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import { useStore } from '@/store';

export const TradingViewChart = () => {
  const symbol = useStore(state => state.currentSymbol);

  return (
    <AdvancedRealTimeChart
      theme="dark"
      autosize
      allow_symbol_change={false}
      symbol={`PYTH:${symbol.toString()}`}
      locale="en"
    />
  );
};
