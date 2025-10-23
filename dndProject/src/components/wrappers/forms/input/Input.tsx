import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useId, useState } from 'react';
import { Controller, type Control } from 'react-hook-form';
import { Text } from '../../typography/Text';
import { FormMessage } from '../formMessage/FormMessage';
import { UIInput, type InputUIPropsType } from '@/components/ui/input';

interface FormInputProps extends InputUIPropsType {
  control: Control<any>;
  name: string;
  inputClassName?: string;
  message?: string;
  required?: boolean;
  errorMessage?: string;
}

export const Input = ({
  control,
  name,
  className,
  style,
  placeholder,
  required,
  onFocus,
  onBlur,
  inputClassName,
  errorMessage,
  message,
  ...props
}: FormInputProps) => {
  const [focus, setFocus] = useState(false);
  const id = useId();

  return (
    <div className={classNames(className, 'relative flex flex-col w-full gap-1')} style={style}>
      {message && (
        <FormMessage as="label" htmlFor={id}>
          {message}
        </FormMessage>
      )}

      <Controller
        rules={{ required: errorMessage || required }}
        control={control}
        name={name}
        defaultValue=""
        render={({ field, fieldState }) => {
          const { value } = field;
          const { error } = fieldState;
          const isActive = focus || value;

          return (
            <>
              <UIInput
                {...field}
                value={field.value || ''}
                onBlur={(e) => {
                  onBlur?.(e);
                  setFocus(false);
                }}
                onFocus={(e) => {
                  onFocus?.(e);
                  setFocus(true);
                }}
                placeholder={message ? placeholder : undefined}
                className={classNames(inputClassName, error && '!border-error ring-destructive/20')}
                {...props}
                id={id}
              />

              {!message && placeholder && (
                <motion.span
                  initial={'rest'}
                  className={'absolute inset-0 leading-[16px] truncate pointer-events-none'}
                  animate={isActive ? 'active' : 'rest'}
                  variants={{
                    rest: { y: 6, x: 12 },
                    active: { y: -24, x: 5 },
                  }}>
                  <Text
                    className="duration-300"
                    color={isActive ? 'brand-100' : 'text-muted'}
                    as="span">
                    {placeholder}
                  </Text>
                </motion.span>
              )}

              {error?.message && <FormMessage type="error">{error.message}</FormMessage>}
            </>
          );
        }}
      />
    </div>
  );
};
