import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { addBlocker, removeBlocker } from '@/features/scroll/scrollSlice';

export const useScrollLock = (id: string, enabled = true) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (enabled) {
      dispatch(addBlocker(id));
    } else {
      dispatch(removeBlocker(id));
    }

    return () => {
      dispatch(removeBlocker(id));
    };
  }, [dispatch, id, enabled]);
};
