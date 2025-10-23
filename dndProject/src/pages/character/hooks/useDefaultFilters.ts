import { useForm } from 'react-hook-form';
import { useDebounce } from '@/hooks/useDebounce';

export const useDefaultFilters = () => {
  const { control, watch } = useForm<{ name: string; worldId: number }>();
  const name = watch('name');
  const world = watch('worldId');
  const debouncedName = useDebounce(name);

  return { control, worldId: Number(world) || undefined, debouncedName };
};
