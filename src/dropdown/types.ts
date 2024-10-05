import type {CSSProperties, ReactElement, RefObject} from 'react';
import type {UseFloatingOptions, UseFloatingReturn} from '@floating-ui/react';

import type {Placement} from 'theme';
import type {QA} from 'common';

export type DropdownProps = {
  children: ReactElement;
  targetRef: RefObject<Element>;

  width?: string | 'target';
  placement?: Placement;

  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;

  isPortal?: boolean;
  isMounted?: boolean;

  setFloating?: (floating: UseFloatingReturn) => void;
} & QA &
  Pick<CSSProperties, 'zIndex' | 'height' | 'maxHeight'> &
  Pick<UseFloatingOptions, 'middleware'>;
