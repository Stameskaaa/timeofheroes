import classNames from 'classnames';
import { CheckCheck, ChevronDown } from 'lucide-react';
import { Controller, type Control } from 'react-hook-form';
import { useState, useMemo, type HTMLAttributes } from 'react';
import { Text } from '../../typography/Text';
import { Button } from '@/components/ui/button';
import { FormMessage } from '../formMessage/FormMessage';
import { useElementWidth } from '@/hooks/useElementWidth';
import { SelectorDropdownIndex } from '@/constants/zIndex';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Option {
  id: string | number;
  value: string;
}

interface SelectorProps {
  name: string;
  control: Control<any>;
  options?: Option[];
  multiple?: boolean;
  placeholder?: string;
  label?: string;
  defaultValue?: string[] | string | number;
  contentProps?: React.ComponentProps<typeof PopoverContent>;
  triggerProps?: HTMLAttributes<HTMLButtonElement>;
  className?: string;
  message?: string;
  disabled?: boolean;
  onChangeAction?: (id: string | number) => void;
  required?: boolean;
  errorMessage?: string;
  disabledIds?: (string | number)[];
}

const maxVisible = 6;
const itemHeight = 36;
const paddingY = 8;
const paddingTop = 28;
const defaultWidth = 300;
const gap = 4;

export const Selector: React.FC<SelectorProps> = ({
  name,
  control,
  options,
  multiple = false,
  placeholder,
  label,
  defaultValue,
  contentProps,
  triggerProps,
  className,
  message,
  disabled,
  required,
  onChangeAction,
  errorMessage,
  disabledIds,
}) => {
  const [open, setOpen] = useState(false);
  const { elementRef, elementWidth } = useElementWidth();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: errorMessage || required }}
      defaultValue={
        multiple
          ? Array.isArray(defaultValue)
            ? defaultValue
            : []
          : defaultValue !== undefined && defaultValue !== null
          ? defaultValue
          : ''
      }
      render={({ field: { value, onChange }, fieldState }) => {
        const { error } = fieldState;
        const selectedIds = multiple ? (Array.isArray(value) ? value : []) : value;

        const toggleOption = (id: string | number) => {
          if (multiple) {
            const selectedArray = selectedIds as (string | number)[];
            if (selectedArray.includes(id)) {
              onChange(selectedArray.filter((x) => x !== id));
            } else {
              onChange([...selectedArray, id]);
            }
          } else {
            onChange(selectedIds === id ? null : id);
            setOpen(false);
          }
          onChangeAction?.(id);
        };

        const displayText = useMemo(() => {
          if (
            selectedIds === null ||
            selectedIds === undefined ||
            (Array.isArray(selectedIds) && selectedIds.length === 0)
          ) {
            return '';
          }
          const selectedArray = multiple ? (selectedIds as (string | number)[]) : [selectedIds];
          const selectedValues = options
            ?.filter((opt) => selectedArray.includes(opt.id))
            .map((opt) => opt.value);
          return multiple ? selectedValues?.join(', ') : selectedValues?.[0] ?? '';
        }, [selectedIds, options, multiple]);

        const length = options?.length || 1;

        return (
          <Popover open={open} onOpenChange={setOpen}>
            <div className={classNames('flex flex-col gap-1 w-full min-w-[250px]', className)}>
              {message && <FormMessage as="label">{message}</FormMessage>}
              <PopoverTrigger asChild>
                <Button
                  disabled={disabled}
                  ref={elementRef}
                  variant="default"
                  style={{ width: defaultWidth }}
                  {...triggerProps}
                  className={classNames(
                    'justify-between !h-[36px] !w-full truncate relative !pr-[30px]',
                    error && '!border-error ring-destructive/20',
                    displayText && '!border-brand-100',
                    triggerProps?.className,
                  )}>
                  <Text
                    as="span"
                    color={displayText !== '' ? 'text-secondary' : 'text-muted'}
                    className="min-w-0 overflow-hidden duration-300 text-ellipsis">
                    {displayText !== '' ? displayText : placeholder}
                  </Text>
                  <ChevronDown
                    className="transition-transform duration-300 absolute right-2"
                    style={open ? { transform: 'rotate(180deg)' } : {}}
                  />
                </Button>
              </PopoverTrigger>
              {error?.message && <FormMessage type="error">{error.message}</FormMessage>}
            </div>
            <PopoverContent
              className="w-full flex flex-col px-0 py-2 pt-0 contain-content gap-1 overscroll-contain"
              style={{
                maxHeight: maxVisible * (itemHeight + gap) + paddingY + paddingTop,
                overflowY: length > maxVisible ? 'auto' : 'visible',
                width: elementWidth || defaultWidth,
                zIndex: SelectorDropdownIndex,
              }}
              {...contentProps}>
              <Text color="text-muted" className="px-[18px] pt-2 select-none" size="sm">
                {label || 'Выберите значение'}
              </Text>

              {options?.map((opt) => {
                const active = multiple
                  ? (selectedIds as (string | number)[]).includes(opt.id)
                  : selectedIds === opt.id;
                const isDisabled = disabledIds?.includes(opt.id) && !active;
                return (
                  <Button
                    key={opt.id}
                    variant="ghost"
                    disabled={isDisabled}
                    className={classNames(
                      `h-[${itemHeight}px] justify-start border-l-2 border-transparent text-text-secondary truncate rounded-none duration-300 gap-0`,
                      active ? 'bg-brand-300 border-brand-100' : '',
                      isDisabled ? 'opacity-50 cursor-not-allowed' : '',
                    )}
                    onClick={() => toggleOption(opt.id)}>
                    {active && <CheckCheck className="mr-2" />}
                    {opt.value}
                  </Button>
                );
              })}
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
};
