import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputUIPropsType = React.ComponentProps<'input'>;

export function UIInput({ className, type, ...props }: InputUIPropsType) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-text-muted selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-brand-300  !text-base flex h-9 w-full min-w-0 rounded-md border bg-brand-400 px-3 py-1 text-text-secondary shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:ring-brand-200/50 focus-visible:ring-[1px] focus-visible:border-brand-300',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  );
}
