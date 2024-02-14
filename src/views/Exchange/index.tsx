import { AssetSelector } from '@/components/AssetButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InfoCircledIcon } from '@radix-ui/react-icons';

export const Exchange = () => {
  return (
    <div className="px-3 py-2 h-full flex flex-col">
      <div className="flex justify-between">
        <div>
          <h1 className="font-medium">History</h1>
          <h2>Buy Position</h2>
        </div>
        <div className="space-x-2">
          <a className="font-thin underline">History</a>
          <a className="font-thin underline">Orders</a>
        </div>
      </div>
      <div className="pt-2">
        <AssetSelector />
      </div>
      <div className="pt-2">
        <p className="text-xxs">Type of Position</p>
        <div className="flex">
          <Button className="w-full mr-2" fontWeight="heavy" size="lg" variant="default">
            TRADE
          </Button>
          <Button className="w-full" fontWeight="heavy" size="lg" variant="default">
            LIMIT
          </Button>
        </div>
      </div>
      <div className="pt-2">
        <p className="text-xxs">Type of Speculation</p>
        <div className="flex">
          <Button
            className="w-full mr-2"
            fontSize="default"
            fontWeight="medium"
            size="sm"
            variant="destructive"
          >
            SHORT
          </Button>
          <Button
            className="w-full"
            fontSize="default"
            fontWeight="medium"
            size="sm"
            variant="constructive"
          >
            LONG
          </Button>
        </div>
      </div>
      <div className="pt-2">
        <div>
          <p className="text-xxs">Venture Parameters</p>
        </div>
        <div>
          <div className="flex mb-1">
            <InfoCircledIcon className="mr-2" />
            <p className="text-xs">Collateral in $USDC</p>
          </div>
          <Input className="font-bold" />
        </div>
      </div>
      <div className="pt-2">
        <div className="flex justify-between">
          <div>
            <div className="flex mb-1">
              <InfoCircledIcon className="mr-2" />
              <span className="text-xs">Leverage</span>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                className="w-full mr-2 px-1"
                fontSize="default"
                fontWeight="medium"
                size="sm"
                variant="default"
              >
                <img src="/rocket.svg" alt="rocket" />
                <span className="text-xs font-bold ml-2">20x</span>
              </Button>
              <Button
                className="w-full mr-2 px-1"
                fontSize="default"
                fontWeight="medium"
                size="sm"
                variant="default"
              >
                <img src="/truck.svg" alt="rocket" />
                <span className="text-xs font-bold ml-2">10x</span>
              </Button>
              <Button
                className="w-full mr-2 px-1"
                fontSize="default"
                fontWeight="medium"
                size="sm"
                variant="default"
              >
                <img src="/bike.svg" alt="rocket" />
                <span className="text-xs font-bold ml-2">5x</span>
              </Button>
              <Button
                className="w-full mr-2 px-1"
                fontSize="default"
                fontWeight="medium"
                size="sm"
                variant="default"
              >
                <img src="/function.svg" alt="rocket" />
                <span className="text-xs font-bold ml-2">custom</span>
              </Button>
            </div>
          </div>
          <div>
            <div className="flex mb-1">
              <InfoCircledIcon className="mr-2" />
              <span className="text-xs">Take Profit</span>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                className="w-full mr-2 px-1"
                fontSize="default"
                fontWeight="medium"
                size="sm"
                variant="default"
              >
                <img src="/trending-up.svg" alt="rocket" />
                <span className="text-xs font-bold ml-2">900%</span>
              </Button>
              <Button
                className="w-full mr-2 px-1"
                fontSize="default"
                fontWeight="medium"
                size="sm"
                variant="default"
              >
                <img src="/dollar-sign.svg" alt="rocket" />
                <span className="text-xs font-bold ml-2">400%</span>
              </Button>
              <Button
                className="w-full mr-2 px-1"
                fontSize="default"
                fontWeight="medium"
                size="sm"
                variant="default"
              >
                <img src="/piggy-bank.svg" alt="rocket" />
                <span className="text-xs font-bold ml-2">100%</span>
              </Button>
              <Button
                className="w-full mr-2 px-1"
                fontSize="default"
                fontWeight="medium"
                size="sm"
                variant="default"
              >
                <img src="/function.svg" alt="rocket" />
                <span className="text-xs font-bold ml-2">custom</span>
              </Button>
            </div>
          </div>
          <div>
            <div className="flex mb-1">
              <InfoCircledIcon className="mr-2" />
              <span className="text-xs">Stop Loss</span>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                className="w-full mr-2 px-1"
                fontSize="default"
                fontWeight="medium"
                size="sm"
                variant="default"
              >
                <img src="/unlock.svg" alt="rocket" />
                <span className="text-xs font-bold ml-2">NONE</span>
              </Button>
              <Button
                className="w-full mr-2 px-1"
                fontSize="default"
                fontWeight="medium"
                size="sm"
                variant="default"
              >
                <img src="/lock.svg" alt="rocket" />
                <span className="text-xs font-bold ml-2">-25%</span>
              </Button>
              <Button
                className="w-full mr-2 px-1"
                fontSize="default"
                fontWeight="medium"
                size="sm"
                variant="default"
              >
                <img src="/landmark.svg" alt="rocket" />
                <span className="text-xs font-bold ml-2">-50%</span>
              </Button>
              <Button
                className="w-full mr-2 px-1"
                fontSize="default"
                fontWeight="medium"
                size="sm"
                variant="default"
              >
                <img src="/function.svg" alt="rocket" />
                <span className="text-xs font-bold ml-2">custom</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-3 min-h-[16rem]">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-sm">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <p>Estimated Profit</p>
              <p>200$</p>
            </div>
            <div className="flex justify-between">
              <p>Entry Price</p>
              <p>3,000$</p>
            </div>
            <div className="flex justify-between">
              <p>Liquidation Price</p>
              <p>2,000$</p>
            </div>
            <div className="flex justify-between">
              <p>Take Profit At</p>
              <p>3,500$</p>
            </div>
            <div className="flex justify-between">
              <p>Fees</p>
              <p>4.50$</p>
            </div>
            <div className="mt-1">
              <p className="underline">More</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full mr-2" fontWeight="heavy" size="lg" variant="primary">
              OPEN POSITION
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
