import React, { ReactNode } from 'react';
import { ShadowText } from '../typography/ShadowText';
import { Spinner } from '@/components/wrappers/loaders/spinner/Spinner';

interface AsyncWrapperProps {
  isLoading?: boolean;
  isError?: boolean;
  children: ReactNode;
}

export const AsyncWrapper: React.FC<AsyncWrapperProps> = ({ isLoading, isError, children }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center w-full h-screen items-center p-4">
        <Spinner size={35} className="m-auto text-brand-100!" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex text-center justify-center w-full h-screen items-center p-4">
        <ShadowText text={`При загрузке произошла ошибка`} />
      </div>
    );
  }

  return <>{children}</>;
};
