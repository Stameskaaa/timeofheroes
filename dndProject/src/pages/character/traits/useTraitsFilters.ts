import { useForm } from 'react-hook-form';
import { traitTypes } from '@/features/traits/constant';
import { useDebounce } from '@/hooks/useDebounce';

const traitSelector = {
  name: 'featureTypeId',
  label: 'Черты',
  placeholder: 'Выберите черту',
  options: traitTypes.map(({ id, name }) => ({ id, value: name })),
};

export const useTraitsFilters = () => {
  const { control, watch } = useForm<{ name: string; worldId: number; featureTypeId: number }>();
  const name = watch('name');
  const world = watch('worldId');
  const featureTypeId = watch('featureTypeId');
  const debouncedName = useDebounce(name);

  return {
    traitSelector,
    featureTypeId,
    worldId: Number(world) || undefined,
    query: debouncedName,
    control,
  };
};
