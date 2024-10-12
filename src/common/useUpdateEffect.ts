import {useEffect, useRef} from 'react';

/** Обработчик изменения deps, вне первого рендера */
export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
