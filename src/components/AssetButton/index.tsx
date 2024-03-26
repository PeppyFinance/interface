import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ChevronDown } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { ScrollArea } from '../ui/scroll-area';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Market } from '@/types';
import { useMarketStore } from '@/store';
import { formatPrice } from '@/lib/utils';
import { Asset } from '../Asset';
import { TradingViewChart } from '../TradingView';

const assets = [
  {
    key: 'iota',
    value: 'IOTA',
    market: Market.IOTAUSD,
  },
  {
    key: 'eth',
    value: 'ETH',
    market: Market.ETHUSD,
  },
  {
    key: 'btc',
    value: 'BTC',
    market: Market.BTCUSD,
  },
  // {
  //   key: 'ltc',
  //   value: 'LTC',
  //   market: Market.LTCUSD,
  // },
  // {
  //   key: 'avax',
  //   value: 'AVAX',
  //   market: Market.AVAXUSD,
  // },
  // {
  //   key: 'doge',
  //   value: 'DOGE',
  //   market: Market.DOGEUSD,
  // },
  // {
  //   key: 'shib',
  //   value: 'SHIB',
  //   market: Market.SHIBUSD,
  // },
];

const TriggerButton = () => {
  const { marketsState, setCurrentMarket } = useMarketStore();
  const [selectedAsset, setSelectedAsset] = useState<{
    key: string;
    value: string;
    market: Market;
  } | null>(null);

  // TODO: this should be dispatched to the global store, so other
  // components can consume the current price of current asset.
  const [chosenAsset, setChosenAsset] = useState<{ key: string; value: string; market: Market }>({
    key: 'iota',
    value: 'IOTA',
    market: Market.IOTAUSD,
  });

  const assetPrice = marketsState[chosenAsset.market]?.currentPrice;

  // TODO: this is just a quick hack to update global store. See above.
  useEffect(() => {
    setCurrentMarket(chosenAsset.market);
  }, [chosenAsset]);

  return (
    <div className="flex w-full h-16 justify-between px-4">
      <Drawer>
        <DrawerTrigger>
          <Asset path={chosenAsset.key} asset={chosenAsset}>
            <ChevronDown className="ml-2" />
          </Asset>
        </DrawerTrigger>
        <DrawerContent className="h-[80%]">
          <DrawerHeader>
            <DrawerTitle>Select Asset</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="mx-4">
            {assets.map(asset => (
              <div
                key={asset.key}
                className={classNames('flex', {
                  'bg-glass/20 border rounded-lg': asset.key === selectedAsset?.key,
                })}
                onClick={() => setSelectedAsset(asset)}
              >
                <Asset asset={asset} path={asset.key} />
              </div>
            ))}
          </ScrollArea>
          <DrawerFooter>
            <DrawerClose>
              <Button
                className="w-full"
                size="lg"
                variant="primary"
                fontWeight="heavy"
                onClick={() => selectedAsset && setChosenAsset(selectedAsset)}
              >
                Confirm
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer>
        <DrawerTrigger>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{assetPrice ? formatPrice(assetPrice) : '$ ...'}</p>
            <p className="text-xxs underline md:hidden lg:hidden">observe in graph</p>
          </div>
        </DrawerTrigger>
        <DrawerContent className="h-[80%]">
          <DrawerHeader className="p-2" />
          <TradingViewChart />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export const AssetSelector = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TriggerButton />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
