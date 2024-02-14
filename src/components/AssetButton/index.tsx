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

const TriggerButton = () => {
  return (
    <div className="flex w-full h-16 justify-between px-4">
      <div className="flex">
        <div className="mr-2 p-2 flex items-center w-16 h-full">
          <img
            src="/coins/eth.svg"
            alt="eth"
            className="p-[1px] rounded-full w-16 border-2 border-foreground"
          />
        </div>
        <div className="flex items-center text-xl font-bold">
          ETH
          <ChevronDown className="ml-2" />
        </div>
      </div>
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
