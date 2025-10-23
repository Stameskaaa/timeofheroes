import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/reduxHooks';

export const PrivateWrapper = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector((state) => state.auth.accessToken);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};
