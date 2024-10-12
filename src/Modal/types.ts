import type {CSSProperties, HTMLAttributes, PropsWithChildren, ReactNode, RefObject} from 'react';

import type {QA} from 'common';
import type {Placement, SizeTokenValue} from 'theme';
import type {UseFloatingOptions, UseFloatingReturn} from 'Dropdown';

export type ModalHeaderProps = {
  /** Подпись */
  caption?: ReactNode;
  /** Иконка */
  icon?: ReactNode;
  /** Обработчик закрытия
   *
   * Показывает крестик при передаче
   */
  onClose?: () => void;
} & QA &
  HTMLAttributes<HTMLDivElement>;

export type ModalContentProps = {
  /** Не показывать границы между header и footer при overflow */
  noBorderScroll?: boolean;
} & QA &
  HTMLAttributes<HTMLDivElement>;

export type ModalProps = {
  /** Открыто */
  isOpen: boolean;

  /** Обработчик закрытия */
  onClose?: () => void;

  /** Рендер в root или рядом */
  isPortal?: boolean;

  /** Размер
   *
   * SizeTokenValue или кастомный
   */
  size?: SizeTokenValue | CSSProperties['width'];

  /** Закрывать по нажатию Esc */
  closeOnEscape?: boolean;
  /** Закрывать по нажатию на бэкграунд */
  closeOnOverlay?: boolean;

  /** Расположение */
  placement?: Placement;
  /** Элемент от которого показывать модалку
   *
   * При передаче модалка откроется без layout, в положении placement
   */
  targetRef?: RefObject<Element>;

  /** Коллбэк принимающий инстанс floating ui
   *
   * Используется в специфических ситуациях
   */
  setFloating?: (floating: UseFloatingReturn) => void;
} & QA &
  PropsWithChildren &
  Pick<UseFloatingOptions, 'middleware'> &
  Pick<CSSProperties, 'zIndex'>;
