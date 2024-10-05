import {flip, offset, shift, useDismiss, useFloating, useInteractions, useRole} from '@floating-ui/react';

import type {ModalProps} from './types';

export const useModal = (props: ModalProps) => {
  const targetRef = props.targetRef?.current;
  const hasTarget = !!targetRef;

  const middleware = props.middleware ?? (hasTarget ? [flip(), shift(), offset(10)] : undefined);

  const floating = useFloating({
    middleware,

    onOpenChange: open => !open && props.onClose?.(),
    open: props.isOpen,
    placement: props.placement,
    elements: {reference: targetRef},
  });

  props.setFloating?.(floating);

  const floatingI = useInteractions([
    useRole(floating.context),

    useDismiss(floating.context, {
      escapeKey: props.closeOnEscape,
      outsidePress: props.closeOnOverlay,
      outsidePressEvent: 'click',
    }),
  ]);

  return {floating, floatingI, hasTarget};
};
