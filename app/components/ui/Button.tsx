import type {VariantProps} from 'class-variance-authority';

import {Slot} from '@radix-ui/react-slot';
import {cva} from 'class-variance-authority';
import * as React from 'react';

import {cn} from '~/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center select-none justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-11 rounded-md px-8',
        primitive: 'h-auto p-0',
        sm: 'h-9 rounded-md px-3',
      },
      variant: {
        default:
          'bg-primary text-primary-foreground notouch:hover:bg-primary/90 touch:active:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground notouch:hover:bg-destructive/90 touch:active:bg-destructive/90',
        ghost:
          'notouch:hover:bg-accent notouch:hover:text-accent-foreground touch:active:bg-accent touch:active:text-accent-foreground',
        link: 'text-primary underline-offset-4 notouch:hover:underline touch:active:underline',
        outline:
          'border border-input bg-background notouch:hover:bg-accent touch:active:bg-accent notouch:hover:text-accent-foreground touch:active:text-accent-foreground',
        primitive: '',
        secondary:
          'bg-secondary text-secondary-foreground notouch:hover:bg-secondary/80 touch:active:bg-secondary/80',
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({asChild = false, className, size, variant, ...props}, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({className, size, variant}))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export {Button, buttonVariants};
