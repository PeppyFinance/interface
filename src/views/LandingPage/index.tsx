import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useSwipeable } from 'react-swipeable';

export const LandingPage = () => {
  const slides = [
    {
      index: 1,
        title: "PEPPY FINANCE",
        description: "Trade yourself to the moon with up to 100x leverage 🐸",
        image: "peppy.png"
    },
    {
      index: 2,
      title: "ALWAYS FUNDED",
      subtitle: "On-Chain Collateral",
      description: "Provides best assurance that funds are always therr to back the contracts",
      image: "funded.png"
    },
    {
      index: 3,
      title: "ALWAYS LOW FEE",
      subtitle: "Save on Costs",
      description: "Lowest Transaction fees combined with cheap borrowing rates",
      image: "save.png"
    },
    {
      index: 4,
      title: "ALWAYS IN CONTROL",
      subtitle: "Non-Custodial",
      description: "Users have full control over their assets. This minimizes the risk associated with centralization",
      image: "secure.png"
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Function to navigate to a specific slide
  const setCurrentSlide = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };

  // Navigate to the next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Navigate to the previous slide
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handlers = useSwipeable({
        onSwipedLeft: () => setCurrentSlide((prev) => (prev + 1) % slides.length),
        onSwipedRight: () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <Carousel {...handlers} className="flex-grow">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} active={index === activeIndex} onClick={() => setCurrentSlide(slide.index)}>
              <div className="p-8 flex h-full flex-col items-center">
                <div className="h-[120px]">
                  <p className={`text-wrap text-center text-shadow leading-[90%] ${slide.index === 1 ? 'text-[4rem] font-bold ' : 'text-[2.3rem]'}`}>
                  {slide.title}
                  </p>
                </div>
                <div className={`rounded-full overflow-hidden drop-shadow-3xl my-4 `}>
                  <img src={slide.image} alt={slide.title} className={`${slide.index === 1 ? 'h-[240px]' : 'h-[200px]'}`} />
                </div>
                <Card className="bg-darkGlass/30 w-full shadow-md md:w-[480px]">
                  <CardContent className="p-2 flex flex-col items-center text-lg text-center">
                    {slide.description}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="pb-5 w-full flex flex-col items-center">
        <div className="slide-indicators flex pb-5">
          {slides.map((_, index) => (
          <img
            key={index}
            src={index === activeIndex ? '/indi-on.png' : '/indi-off.png'}
            alt={index === activeIndex ? 'Active slide indicator' : 'Inactive slide indicator'}
            className="indicator"
            onClick={() => setCurrentSlide(index)}
            role="button"
            style={{ cursor: 'pointer' }}
          />
        ))}
        </div>
        <w3m-button></w3m-button>
      </div>
    </div>
  );
};
