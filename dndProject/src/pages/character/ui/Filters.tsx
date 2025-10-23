import React from 'react';
import type { Control } from 'react-hook-form';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Selector } from '@/components/wrappers/forms/selector/Selector';

interface SelectConfig {
  name: string;
  label: string;
  placeholder?: string;
  multiple?: boolean;
  options: { id: string | number; value: string }[];
}

interface FilterProps {
  control: Control<any>;
  inputName: string;
  selectors?: SelectConfig[];
}

export const worldSelector = {
  name: 'worldId',
  placeholder: 'Выберите мир',
  multiple: false,
  label: 'Миры',
  options: [
    { id: '1', value: 'Долина Гурван-Гол' },
    { id: '2', value: 'Долина Хан-Тенгри' },
    { id: '3', value: 'Долина Хан-Тенгри' },
    { id: '4', value: 'Долина Хан-Тенгри' },
  ],
};

export const Filters: React.FC<FilterProps> = ({ control, inputName, selectors = [] }) => {
  return (
    <div className="flex gap-3 pt-3 pb-6 flex-wrap">
      <Input
        placeholder="Поиск на названию"
        className="min-w-[300px] flex-2 w-auto"
        control={control}
        name={inputName}
      />
      {[...selectors, worldSelector]?.map(({ name, label, placeholder, multiple, options }) => (
        <Selector
          className="min-w-[250px] !w-auto flex-1"
          label={label}
          key={name}
          control={control}
          name={name}
          placeholder={placeholder}
          multiple={multiple}
          options={options}
        />
      ))}
    </div>
  );
};
