import {useEffect} from 'react';
import {
  autoUpdate,
  flip,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import {Placement} from 'theme';
import {useClickAway} from 'common';

import {DropdownProps} from './types';

const targetSize = size({
  apply({rects, elements}) {
    elements.floating.style.width = `${rects.reference.width}px`;
  }
});

export const useDropdown = (props: DropdownProps) => {
  const {
    isOpen,
    setIsOpen,
    setFloating,
    targetRef,

    middleware = [
      props.width === 'target' ? targetSize : undefined,

      flip(),
      shift(),
    ],

    placement = Placement.bottomStart,
  } = props;

  const floating = useFloating({
    middleware,
    placement,

    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,

    elements: {reference: targetRef.current},
  });

  setFloating?.(floating);

  const interactions = useInteractions([useDismiss(floating.context)]);

  useClickAway(() => {
    setIsOpen(false);
  }, targetRef, floating.refs.floating);

  return {interactions, floating};
};