import * as React from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import { cn } from './lib';

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-5',
  {
    variants: {
      variant: {
        default: 'border-input',
        primary: 'focus:border-primary',
        secondary: 'focus:border-secondary',
        destructive: 'border-destructive'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        <input
          type={type}
          className={cn(inputVariants({ variant, className }))}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
