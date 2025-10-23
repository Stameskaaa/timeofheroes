import { useEffect, useRef, type RefObject } from 'react';

export const useDimensions = (ref: RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref?.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, []);

  return dimensions.current;
};
