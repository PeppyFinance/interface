import { TradingViewChart } from '@/components/TradingView';
import { TradingBox } from '@/components/TradingBox';

export const Exchange = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-4 pt-5">
      <div className="hidden md:col-span-4 lg:col-span-6 md:block p-2 md:min-h-[720px]">
        <div className="bg-[#ffffff10] md:shadow-inner shadow-md p-3 bg-opacity-10 rounded-md md:block md:h-[680px]">
          <TradingViewChart/>
        </div>
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-2 p-2 overflow-auto  ">
        <div className="md:bg-[#ffffff10]  md:shadow-inner p-3 rounded-md md:block min-h-[680px]">
          <TradingBox/>
        </div>
      </div>
    </div>
  );
};

