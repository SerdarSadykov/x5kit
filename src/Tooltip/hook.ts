import {cloneElement, useRef, useState} from 'react';
import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useMergeRefs,
  useTransitionStyles,
} from '@floating-ui/react';

import type {TooltipProps} from './types';

export const useTooltip = (props: TooltipProps) => {
  const {
    children,
    placement,
    enabled,

    delay = {open: 330, close: 100},
  } = props;

  const [isOpenIn, setIsOpenIn] = useState<boolean>(false);
  const isOpen = props.isOpen ?? isOpenIn;
  const setIsOpen = props.setIsOpen ?? setIsOpenIn;

  const arrowRef = useRef(null);

  const floating = useFloating({
    placement,

    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,

    middleware: [offset(8), !placement ? autoPlacement() : flip(), shift(), arrow({element: arrowRef})],
  });

  const interactions = useInteractions([
    useHover(floating.context, {enabled, delay, move: false}),
    useDismiss(floating.context, {enabled}),
  ]);

  const {isMounted, styles} = useTransitionStyles(floating.context);

  const ref = useMergeRefs([floating.refs.setReference, children['ref']]);

  const child = cloneElement(children, interactions.getReferenceProps({...children.props, ref}));

  return {isMounted, floating, interactions, arrowRef, styles, child};
};
