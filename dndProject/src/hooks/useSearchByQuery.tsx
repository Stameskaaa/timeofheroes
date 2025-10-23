import { useForm } from 'react-hook-form';
import { useDebounce } from './useDebounce';

export function useSearchByQuery() {
  const { control, watch } = useForm<{ name: string }>();
  const name = watch('name');
  const debouncedName = useDebounce(name);

  return { control, debouncedName };
}
