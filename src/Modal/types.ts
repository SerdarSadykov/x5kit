import type {CSSProperties, HTMLAttributes, PropsWithChildren, ReactNode, RefObject} from 'react';

import type {QA} from 'common';
import type {Placement, SizeTokenValue} from 'theme';
import type {UseFloatingOptions, UseFloatingReturn} from 'Dropdown';

export type ModalHeaderProps = {
  caption?: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
} & QA &
  HTMLAttributes<HTMLDivElement>;

export type ModalContentProps = {
  noBorderScroll?: boolean;
} & QA &
  HTMLAttributes<HTMLDivElement>;

export type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;

  isPortal?: boolean;

  size?: SizeTokenValue | CSSProperties['width'];

  closeOnEscape?: boolean;
  closeOnOverlay?: boolean;

  placement?: Placement;
  targetRef?: RefObject<Element>;

  setFloating?: (floating: UseFloatingReturn) => void;

  // maxWidth?: string | number
  // minWidth?: string | number
  // showCloseButton?: boolean
} & QA &
  PropsWithChildren &
  Pick<UseFloatingOptions, 'middleware'> &
  Pick<CSSProperties, 'zIndex'>;
