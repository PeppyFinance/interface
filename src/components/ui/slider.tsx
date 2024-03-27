import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const sliderVariants = cva(
  'appearance-none w-full h-2 rounded-full bg-gray-200 outline-none transition-opacity hover:opacity-75',
  {
    variants: {
      variant: {
        default: 'bg-gray-200',
        destructive: 'bg-red-500',
        constructive: 'bg-green-500',
        primary: 'bg-blue-500',
      },
      size: {
        default: 'h-2',
        sm: 'h-1',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
// @ts-ignore-error
export interface SliderProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof sliderVariants> {
  asChild?: boolean;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'input';
    return (
      <Comp
        type="range"
        // @ts-ignore-error
        className={cn(sliderVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Slider.displayName = 'Slider';

export { Slider, sliderVariants };
