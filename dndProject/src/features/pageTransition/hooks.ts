import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setPageTransitionDuration } from './pageTransitionSlice';

export function usePageTransitionLoading(isLoading: boolean) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPageTransitionDuration(isLoading));
  }, [isLoading]);
  return null;
}
