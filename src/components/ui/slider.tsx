import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const StyleSheet = {
  background: `linear-gradient(to right,blue 0%, blue 50% #ddd 50%, #ddd 100%) !important`
};

const sliderVariants = cva(
  'appearance-none w-full h-2 rounded-full bg-yellow-200 outline-none transition-opacity hover:opacity-75',
  {
    variants: {
      variant: {
        default: 'bg-blue-200',
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
// @ts-expect-error not an element
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
        // @ts-expect-error not assignable
        className={cn(sliderVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        style={StyleSheet}
      />
    );
  }
);
Slider.displayName = 'Slider';

export { Slider, sliderVariants };
