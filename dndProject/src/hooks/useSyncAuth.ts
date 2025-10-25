import { useEffect } from 'react';
import { useAppSelector } from './reduxHooks';
import { useLazyGetProfileQuery } from '@/features/profile/api';
import { usePageTransitionLoading } from '@/features/pageTransition/hooks';

export const useAuthSync = () => {
  const token = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.profile);

  const [getProfile, { isLoading }] = useLazyGetProfileQuery();
  usePageTransitionLoading(isLoading);

  useEffect(() => {
    if (token && !user && !isLoading) {
      getProfile();
    }
  }, [token]);

  return {
    isAuthLoading: isLoading,
    isAuthenticated: !!token,
    user,
  };
};
