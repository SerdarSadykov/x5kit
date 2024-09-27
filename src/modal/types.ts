import {CSSProperties, HTMLAttributes, PropsWithChildren, ReactNode, RefObject} from 'react';
import {Placement, UseFloatingOptions, UseFloatingReturn} from 'dropdown';

import {SizeTokenValue} from 'theme';

export type ModalHeaderProps = {
  caption?: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
} & HTMLAttributes<HTMLDivElement>;

export type ModalContentProps = {
  noBorderScroll?: boolean;
} & HTMLAttributes<HTMLDivElement>;

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
} & PropsWithChildren & Pick<UseFloatingOptions, 'middleware'> & Pick<CSSProperties, 'zIndex'>;