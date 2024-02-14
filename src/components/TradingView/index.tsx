import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import { useStore } from '@/store';

export const TradingViewChart = () => {
  const market = useStore(state => state.currentMarket);

  return (
    <AdvancedRealTimeChart
      theme="dark"
      autosize
      allow_symbol_change={false}
      symbol={`PYTH:${market.toString()}`}
      locale="en"
    />
  );
};
