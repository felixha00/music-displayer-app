import { useRef, useEffect, useState, useCallback } from 'react';

export const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};


export const useBass = () => {
  const [bass, setBass] = useState<number>(0);

  const handleSetBass = useCallback((n: number) => {
    setBass(n);
  }, []);

  useEffect(() => {
    setBass(bass);
  }, [bass]);
  return [bass, handleSetBass] as const;
};

export const useModal = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  function setShow(bool: boolean) {
    return setIsShowing(bool);
  }

  return [isShowing, setShow] as const;
};

export const usePageVisible = (): boolean => {
  // if (typeof window === "undefined") {
  //     return false;
  // }
  const [visible, setVisible] = useState(!document.hidden);

  useEffect(() => {
    const onVisibilityChange = () =>
      setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  return visible;
};

export default {};
