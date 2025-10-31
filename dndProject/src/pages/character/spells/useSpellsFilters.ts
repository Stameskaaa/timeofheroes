import { useForm } from 'react-hook-form';
import { useDebounce } from '@/hooks/useDebounce';
import { schoolList } from '@/mock/mock';
import { useClassesData } from '@/hooks/useClassesData';

const spellLevels = [
  'Заговор',
  '1 круг',
  '2 круг',
  '3 круг',
  '4 круг',
  '5 круг',
  '6 круг',
  '7 круг',
  '8 круг',
  '9 круг',
];

const spellLevelsOptions = spellLevels.map((value, id) => ({
  id,
  value,
}));

export const useSpellsFilters = () => {
  const { control, watch } = useForm<{
    name: string;
    worldId: number;
    spellSchool: number;
    spellCircle: number;
    spellClass: number;
  }>();
  const name = watch('name');
  const worldId = watch('worldId');
  const schoolId = watch('spellSchool');
  const level = watch('spellCircle');
  const characterClassId = watch('spellClass');
  const { classes, isLoading } = useClassesData();
  const debouncedName = useDebounce(name);

  const spellSelectors = [
    {
      name: 'spellSchool',
      placeholder: 'Выберите школу',
      label: 'Школы магии',
      multiple: false,
      options: schoolList.map(({ id, title }) => ({ id, value: title })),
    },
    {
      name: 'spellCircle',
      placeholder: 'Выберите круг',
      label: 'Круги',
      multiple: false,
      options: spellLevelsOptions,
    },
    {
      name: 'spellClass',
      label: 'Классы',
      placeholder: 'Выберите класс',
      multiple: false,
      options: classes?.map(({ id, name }) => ({
        id,
        value: name,
      })),
      disabled: classes?.length === 0 || isLoading,
    },
  ];

  return {
    query: debouncedName,
    worldId: Number(worldId) || undefined,
    schoolId,
    level,
    characterClassId,
    control,
    spellSelectors,
  };
};
