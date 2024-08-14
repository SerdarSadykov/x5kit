import {ReactElement, ReactNode} from 'react';
import {CSSObject} from '@emotion/react';
import {UseHoverProps} from '@floating-ui/react';

import {Placement} from 'theme';
import {QA} from 'common';

export type TooltipProps = {
  children: ReactElement;
  content: ReactNode;

  placement?: Placement;

  isOpen?: boolean;
  setIsOpen?: (newIsOpen: boolean) => void;

  isPortal?: boolean;
} & QA & Pick<UseHoverProps, 'delay'> & Pick<CSSObject, 'width' | 'zIndex' | 'color' | 'backgroundColor' | 'whiteSpace'>;
