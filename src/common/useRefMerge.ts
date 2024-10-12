import {useEffect, useRef} from 'react';

import type {Ref} from 'react';

/** Объединение ref.
 *
 *  Возвращает тот же ref если передан RefObject
 */
export const useRefMerge = <T>(baseRef?: Ref<T>) => {
  const innerRef = useRef<T>(null);

  const ref = baseRef && typeof baseRef !== 'function' ? baseRef : innerRef;

  useEffect(() => {
    if (typeof baseRef === 'function') {
      baseRef(innerRef.current ?? null);
    }
  }, [baseRef]);

  return ref;
};
