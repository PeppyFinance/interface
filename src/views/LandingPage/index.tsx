import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full overflow-hidden">
        <Carousel className="flex-grow">
          <CarouselContent>
            {Array.from({ length: 1 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-8 flex h-full flex-col items-center">
                  <p className="text-[4.125rem] font-bold text-wrap text-center text-shadow leading-[90%]">
                    PEPPY FINANCE
                  </p>
                  <div className="rounded-full overflow-hidden drop-shadow-3xl my-4">
                    <img src="/peppy.png" alt="Peppy Logo" className="h-[240px]" />
                  </div>
                  <Card className="bg-darkGlass/30 w-full shadow-md mt-6">
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
    </>
  );
};
