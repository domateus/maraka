import { useMemo, useRef, useState } from "react";

export const useObserver = (payload: {
  onVisible: () => void;
  onHidden: () => void;
}) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const refIntersecting = useRef(false);
  const isObserving = useRef(false);

  const observer = useMemo(() => {
    return new IntersectionObserver(([entry]) => {
      // sourcery because setting state takes a while, so onHidden is called on the place of onVisible :()
      if (entry.isIntersecting && !refIntersecting.current) payload.onHidden();
      if (!entry.isIntersecting && refIntersecting.current) payload.onVisible();
      refIntersecting.current = entry.isIntersecting;
      setIntersecting(entry.isIntersecting);
    });
  }, [payload]);

  return {
    observe: (e: Element) => {
      if (isObserving.current) return;
      isObserving.current = true;
      observer.observe(e);
    },
    isVisible: isIntersecting,
    disconnect: () => {
      if (!isObserving.current) return;
      isObserving.current = false;
      observer.disconnect();
    },
  };
};
