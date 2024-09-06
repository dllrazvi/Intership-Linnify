'use client';

import * as React from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from './lib';

const sliderVariants = cva('absolute h-full', {
  variants: {
    variant: {
      default: 'bg-primary/60',
      primary: 'bg-primary',
      secondary: 'bg-secondary'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & VariantProps<typeof sliderVariants>
>(({ className, variant, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="bg-secondary relative h-2 w-full grow overflow-hidden rounded-full">
      <SliderPrimitive.Range className={cn(sliderVariants({ variant }))} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="border-primary bg-background ring-offset-background focus-visible:ring-ring block h-5 w-5 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
