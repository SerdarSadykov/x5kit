import {useEffect, RefObject} from 'react';

export const useClickAway = (handler: EventListener, ...refs: Array<RefObject<Element>>): void => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      for (const ref of refs) {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }
      }

      handler(event);
    };

    document.addEventListener('click', listener, true);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [handler]);
}

