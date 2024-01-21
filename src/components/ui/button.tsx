import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-default tracking-widest',
  {
    variants: {
      variant: {
        default:
          'bg-glass/50 text-foreground backdrop-blur-sm hover:bg-glass/60 active:bg-glass/70',
        destructive:
          'bg-destructive/80 text-destructive-foreground hover:bg-destructive/90 active:bg-destructive',
        constructive:
          'bg-constructive/70 text-constructive-foreground hover:bg-constructive/80 active:bg-constructive/90',
        primary: 'bg-primary/80 text-foreground hover:bg-primary/90 active:bg-primary',
      },
      size: {
        default: 'h-[2rem] px-5 py-2',
        sm: 'h-[1.75rem] px-4',
        lg: 'h-[2.25rem] px-6',
      },
      fontWeight: {
        default: 'font-normal',
        light: 'font-light',
        medium: 'font-normal',
        heavy: 'font-bold',
      },
      fontSize: {
        default: 'text-xl',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fontWeight: 'default',
      fontSize: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fontWeight, fontSize, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fontWeight, fontSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
