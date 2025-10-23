import { useState, useEffect } from 'react';

export function useWindowWidth(delay = 200) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    function handleResize() {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, delay);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [delay]);

  return width;
}
