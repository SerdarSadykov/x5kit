import {CSSProperties, ReactElement, ReactNode} from 'react';
import {UseHoverProps} from '@floating-ui/react';

import {QA} from 'common';

export enum TooltipPlacement {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
  topStart = 'top-start',
  topEnd = 'top-end',
  rightStart = 'right-start',
  rightEnd = 'right-end',
  bottomStart = 'bottom-start',
  bottomEnd = 'bottom-end',
  leftStart = 'left-start',
  leftEnd = 'left-end',
}

export type TooltipProps = {
  children: ReactElement;
  content: ReactNode;

  width?: number;
  zIndex?: number;
  placement?: TooltipPlacement;

  isOpen?: boolean;
  setIsOpen?: (newIsOpen: boolean) => void;

  isPortal?: boolean;
} & QA & Pick<UseHoverProps, 'delay'> & Pick<CSSProperties, 'color' | 'backgroundColor' | 'whiteSpace'>;
