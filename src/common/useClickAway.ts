import {useEffect} from 'react';

import type {RefObject} from 'react';

/** Обработчик нажатия вне refs */
export const useClickAway = (handler: EventListener, ...refs: Array<RefObject<Element>>): void => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) {
        return;
      }

      for (const ref of refs) {
        if (!ref.current || ref.current.contains(e.target)) {
          return;
        }
      }

      handler(e);
    };

    document.addEventListener('click', listener, true);

    return () => {
      document.removeEventListener('click', listener);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler]);
};
