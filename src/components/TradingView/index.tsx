import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import { useMarketStore } from '@/store';

export const TradingViewChart = () => {
  const market = useMarketStore(state => state.currentMarket);

  return (
    <AdvancedRealTimeChart
      theme="dark"
      autosize
      allow_symbol_change={false}
      symbol={`PYTH:${market.toString()}`}
      locale="en"
      hide_side_toolbar={true}
    />
  );
};
