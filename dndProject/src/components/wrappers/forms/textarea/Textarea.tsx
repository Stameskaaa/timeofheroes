import { cn } from '@/lib/utils';
import { Controller, type Control } from 'react-hook-form';
import { FormMessage } from '../formMessage/FormMessage';

export interface TextareaProps extends React.ComponentProps<'textarea'> {
  control: Control<any>;
  name: string;
  message?: string;
  placeholder?: string;
  hasMd?: boolean;
  required?: boolean;
  errorMessage?: string;
  actions?: React.ReactNode[];
}

export const Textarea: React.FC<TextareaProps> = ({
  control,
  name,
  message,
  placeholder,
  className,
  hasMd,
  required,
  errorMessage,
  actions,
  ...props
}) => {
  return (
    <Controller
      name={name}
      rules={{ required: errorMessage || required }}
      control={control}
      defaultValue=""
      render={({ field, fieldState }) => {
        const { value, onChange, onBlur } = field;
        const { error } = fieldState;
        return (
          <div className="flex flex-col w-full gap-1 relative">
            {message && <FormMessage as="label">{message}</FormMessage>}
            {actions && <div className="flex flex-col gap-1 absolute right-0 m-3">{actions}</div>}
            <textarea
              {...props}
              value={value || ''}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              data-slot="textarea"
              className={cn(
                'border-brand-300 !bg-brand-400 text-text-secondary placeholder:text-text-muted focus-visible:ring-brand-200/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                'aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-md shadow-xs transition-[color,box-shadow]',
                'outline-none overscroll-contain focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
                error && '!border-error ring-destructive/20',
                className,
              )}
            />
            {error?.message && <FormMessage type="error">{error?.message}</FormMessage>}
          </div>
        );
      }}
    />
  );
};
