import * as React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Spinner } from '../wrappers/loaders/spinner/Spinner';

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-brand-100 focus-visible:ring-brand-200/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: `
          bg-brand-400 border border-brand-300 text-text-primary
          hover:bg-brand-500 
          active:bg-brand-300
        `,
        secondary: `
          bg-brand-200 text-text-primary 
          hover:bg-brand-300 
          active:bg-brand-300/60
        `,
        tonal: `
          bg-brand-100 text-text-primary 
          hover:bg-brand-200 
          active:bg-brand-300
        `,
        destructive: `
          bg-error text-white 
          hover:bg-error/90 
          active:bg-error/80 
          focus-visible:ring-error/40
        `,
        success: `
          bg-success text-white 
          hover:bg-success/90 
          active:bg-success/80 
          focus-visible:ring-success/40
        `,
        outline: `
          border border-brand-100 text-brand-100 
          bg-transparent 
          hover:bg-brand-200/40 
          active:bg-brand-400/60 
          focus-visible:ring-brand-200/40
        `,
        ghost: `
          text-brand-100
          hover:bg-brand-300/70 
          active:bg-brand-200/20
        `,
        link: `
          text-brand-100 underline-offset-4 
          hover:underline 
          active:text-brand-100/60
        `,
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-8',
      },
      shadow: {
        true: 'shadow-xs',
        false: 'shadow-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shadow: true,
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

function Button({
  className,
  variant,
  size,
  isLoading,
  asChild = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      disabled={disabled || isLoading}>
      {isLoading && <Spinner />}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
