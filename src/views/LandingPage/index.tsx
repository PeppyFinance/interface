import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();

  const onWalletConnect = async () => {
    await open();
  };

  useEffect(() => {
    if (isConnected) {
      navigate('/exchange');
    }
  }, [isConnected]);

  return (
    <>
      <div className="flex flex-col w-full">
        <Carousel className="flex-grow">
          <CarouselContent>
            {Array.from({ length: 4 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-8 flex h-full flex-col items-center">
                  <p className="text-[4.125rem] font-bold text-wrap text-center text-shadow leading-[90%]">
                    PEPPY FINANCE
                  </p>
                  <div className="rounded-full overflow-hidden drop-shadow-3xl my-4">
                    <img src="/peppy.png" alt="Peppy Logo" className="h-[240px]" />
                  </div>
                  <Card className="bg-darkGlass/30 w-full shadow-md">
                    <CardContent className="p-4 flex items-center text-lg font-bold">
                      A cool Slogan that descibes Peppy in less than 10 Words.
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="absolute bottom-[24px] flex w-full justify-center">
        <Button variant="primary" size="lg" onClick={onWalletConnect}>
          <p className="font-bold">CONNECT WALLET</p>
        </Button>
      </div>
    </>
  );
};
