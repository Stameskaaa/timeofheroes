import { useEffect, useRef, useState } from 'react';

export function useElementWidth() {
  const triggerRef = useRef<any>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);

  useEffect(() => {
    if (!triggerRef.current) return;

    setTriggerWidth(triggerRef.current.offsetWidth);

    const resizeObserver = new ResizeObserver(() => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth);
      }
    });

    resizeObserver.observe(triggerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return { elementRef: triggerRef, elementWidth: triggerWidth };
}
