import type {CSSProperties, PropsWithChildren, RefObject} from 'react';
import type {UseFloatingOptions, UseFloatingReturn} from '@floating-ui/react';

import type {Placement} from 'theme';
import type {QA} from 'common';

export type DropdownProps = {
  /** Элемент от которого */
  targetRef: RefObject<Element>;

  /** Ширина.
   *
   * target - ширина равна ширине элемента targetRef
   */
  width?: string | 'target';
  /** Расположение */
  placement?: Placement;

  /** Раскрыт или нет*/
  isOpen: boolean;
  /** Обработчик раскрытия */
  setIsOpen: (newIsOpen: boolean) => void;

  /** Рендер в root или рядом */
  isPortal?: boolean;
  /** Не анмаунтить компонент, скрывая через display: none */
  isMounted?: boolean;

  /** Коллбэк принимающий инстанс floating ui
   *
   * Используется в специфических ситуациях
   */
  setFloating?: (floating: UseFloatingReturn) => void;
} & QA &
  PropsWithChildren &
  Pick<CSSProperties, 'zIndex' | 'height' | 'maxHeight'> &
  Pick<UseFloatingOptions, 'middleware'>;

export type {UseFloatingOptions, UseFloatingReturn};
