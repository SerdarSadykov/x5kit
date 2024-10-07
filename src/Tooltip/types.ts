import type {CSSProperties, ReactElement, ReactNode} from 'react';
import type {UseHoverProps} from '@floating-ui/react';

import type {Placement} from 'theme';
import type {QA} from 'common';

export type TooltipProps = {
  children: ReactElement;
  content: ReactNode;

  placement?: Placement;

  isOpen?: boolean;
  setIsOpen?: (newIsOpen: boolean) => void;

  isPortal?: boolean;
} & QA &
  Pick<UseHoverProps, 'enabled' | 'delay'> &
  Pick<CSSProperties, 'width' | 'zIndex' | 'color' | 'backgroundColor' | 'whiteSpace'>;
