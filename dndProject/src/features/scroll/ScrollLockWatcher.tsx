import { useAppSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';

export function ScrollLockWatcher() {
  const blockers = useAppSelector((state) => state.scrollLock.blockers);

  useEffect(() => {
    if (blockers.length === 0) return;
    const scrollY = window.scrollY;
    const body = document.body;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';
    body.style.width = '100%';

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.overflow = '';
      body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [blockers]);

  return null;
}
