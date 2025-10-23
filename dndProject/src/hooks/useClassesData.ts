import { useEffect, useState } from 'react';
import { Class } from '@/features/classes/types';
import { useLazyGetClassListQuery } from '@/features/classes/api';
import { useAppSelector } from './reduxHooks';

export const useClassesData = () => {
  const classes = useAppSelector((state) => state.classes.classData);
  const [loading, setLoading] = useState<boolean>(true);

  const [fetchClasses] = useLazyGetClassListQuery();

  useEffect(() => {
    if (classes === null) {
      fetchClasses();
    } else {
      setLoading(false);
    }
  }, [classes, fetchClasses]);

  useEffect(() => {
    if (classes !== null) setLoading(false);
  }, [classes]);

  const getClassById = (id: string | number): Class | undefined => {
    return classes?.find((c) => c.id === id);
  };

  return {
    classes: classes ?? [],
    isLoading: loading,
    getClassById,
  };
};
