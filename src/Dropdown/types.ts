import type {CSSProperties, PropsWithChildren, RefObject} from 'react';
import type {UseFloatingOptions, UseFloatingReturn} from '@floating-ui/react';

import type {Placement} from 'theme';
import type {QA} from 'common';

export type DropdownProps = {
  targetRef: RefObject<Element>;

  width?: string | 'target';
  placement?: Placement;

  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;

  isPortal?: boolean;
  isMounted?: boolean;

  setFloating?: (floating: UseFloatingReturn) => void;
} & QA &
  PropsWithChildren &
  Pick<CSSProperties, 'zIndex' | 'height' | 'maxHeight'> &
  Pick<UseFloatingOptions, 'middleware'>;

export type {UseFloatingOptions, UseFloatingReturn};
