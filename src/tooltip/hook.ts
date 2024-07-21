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

import {getQAAttribute} from 'common';

import {TooltipProps} from './types';


export const useTooltip = (props: TooltipProps) => {
  const {
    children,
    placement,
    qa = 'tooltip',

    delay = {open: 330, close: 100},
  } = props;

  const [isOpenIn, setIsOpenIn] = useState<boolean>(false);
  const isOpen = props.isOpen ?? isOpenIn;
  const setIsOpen = props.setIsOpen ?? setIsOpenIn;

  const getQA = getQAAttribute(qa);

  const arrowRef = useRef(null);

  const popper = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,

    placement: placement,
    middleware: [offset(8), !placement ? autoPlacement() : flip(), shift(), arrow({element: arrowRef})],
  });

  const interactions = useInteractions([
    useHover(popper.context, {move: false, delay}),
    useDismiss(popper.context)
  ]);

  const {isMounted, styles} = useTransitionStyles(popper.context);

  const ref = useMergeRefs([popper.refs.setReference, children['ref']]);

  const child = cloneElement(children, interactions.getReferenceProps({...children.props, ref}));

  return {isMounted, getQA, popper, interactions, arrowRef, styles, child};
};