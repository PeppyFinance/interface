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
import { ReactNode, useMemo, useState } from 'react';
import classNames from 'classnames';

interface Asset {
  key: string;
  value: string;
}

interface AssetProps {
  children?: ReactNode | ReactNode[];
  asset: Asset;
  path: string;
  onClick?: (asset: Asset) => void;
}

const Asset = (props: AssetProps) => {
  return (
    <div onClick={() => props.onClick && props.onClick(props.asset)} className="flex">
      <div className="mr-2 p-2 flex items-center w-16 h-full">
        <img
          src={`/coins/${props.path}.svg`}
          alt={props.path}
          className="p-[1px] rounded-full w-16 border-2 border-foreground"
        />
      </div>
      <div className="flex items-center text-xl font-bold">
        {props.asset.value}
        {props.children}
      </div>
    </div>
  );
};

const assets = [
  {
    key: 'eth',
    value: 'ETH',
  },
  {
    key: 'btc',
    value: 'BTC',
  },
  {
    key: 'ltc',
    value: 'LTC',
  },
  {
    key: 'iota',
    value: 'IOTA',
  },
  {
    key: 'avax',
    value: 'AVAX',
  },
  {
    key: 'doge',
    value: 'DOGE',
  },
  {
    key: 'shib',
    value: 'SHIB',
  },
];

const TriggerButton = () => {
  const [selectedAsset, setSelectedAsset] = useState<{ key: string; value: string } | null>(null);
  const [chosenAsset, setChosenAsset] = useState<{ key: string; value: string }>({
    key: 'eth',
    value: 'ETH',
  });

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
                className={classNames('flex', {
                  'bg-white/25 border rounded-lg': asset.key === selectedAsset?.key,
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
                onClick={() => selectedAsset && setChosenAsset(selectedAsset)}
              >
                Confirm
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg">3,000 $</p>
        <p className="text-xxs underline">observe in graph</p>
      </div>
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
