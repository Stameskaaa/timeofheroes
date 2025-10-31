import React from 'react';
import classNames from 'classnames';
import { type Control, useWatch, useController, useForm } from 'react-hook-form';
import { useGetCharacteristicListQuery } from '@/features/characteristic/api';
import { Text } from '@/components/wrappers/typography/Text';
import { Spinner } from '@/components/wrappers/loaders/spinner/Spinner';
import { Selector } from '@/components/wrappers/forms/selector/Selector';

interface CharacteristicItem {
  id: number;
  value: number;
}

interface CharacteristicFormProps {
  title: string;
  control: Control<any>;
  name: string;
  className?: string;
}

export const CharacteristicForm: React.FC<CharacteristicFormProps> = ({
  control,
  name,
  title,
  className,
}) => {
  const { data, isLoading } = useGetCharacteristicListQuery();
  const { field } = useController({ name, control });
  const currentValue = useWatch({ control, name }) as CharacteristicItem[] | undefined;
  const { control: fakeControl } = useForm();

  const handleChange = (id: number, value: number) => {
    const updated = currentValue ? [...currentValue] : [];
    const index = updated.findIndex((x) => x.id === id);
    if (index >= 0) updated[index] = { id, value };
    else updated.push({ id, value });
    field.onChange(updated);
  };

  return (
    <div
      className={classNames(
        'flex flex-col gap-2 flex-1 border border-brand-200 p-3 rounded-md shrink',
        className,
      )}>
      <Text color="brand-100" size="lg">
        {title}
      </Text>

      {isLoading ? (
        <Spinner className="m-auto" />
      ) : (
        data?.data?.map(({ id, name: characteristicName }) => {
          const selectedValue =
            (Array.isArray(currentValue) ? currentValue : [])
              ?.find((x) => x.id === id)
              ?.value?.toString() ?? '';
          return (
            <div key={id} className="flex flex-col gap-1 shrink">
              <Text>{characteristicName}</Text>
              <Selector
                control={fakeControl}
                className="min-w-0! shrink"
                required
                placeholder="40"
                name={`${name}-temp-${id}`}
                defaultValue={selectedValue}
                onChangeAction={(val) => handleChange(id, Number(val))}
                options={Array.from({ length: 50 }).map((_, i) => ({
                  id: `${i + 1}`,
                  value: `${i + 1}`,
                }))}
              />
            </div>
          );
        })
      )}
    </div>
  );
};
