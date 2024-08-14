import {CSSProperties, ReactElement, RefObject} from 'react';
import {UseFloatingOptions, UseFloatingReturn} from '@floating-ui/react';

import {Placement} from 'theme';
import {QA} from 'common';

export type DropdownProps = {
  children: ReactElement;
  targetRef: RefObject<Element>;

  width?: string | 'target',
  placement?: Placement;

  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;

  isPortal?: boolean;
  isMounted?: boolean;

  setFloating?: (floating: UseFloatingReturn) => void;
} & QA & Pick<CSSProperties, 'zIndex'> & Pick<UseFloatingOptions, 'middleware'>;
