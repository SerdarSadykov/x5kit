import type {AnchorHTMLAttributes, CSSProperties, HTMLAttributes, MouseEventHandler, ReactNode} from 'react';

import type {QA} from 'common';

/** Пункт меню */
export type SidebarMenuItemProps = {
  /** Обязательный идентификатор
   *
   * Можно использовать любой уникальный в рамках меню int|string|uuid
   */
  id: string;

  /** Текст */
  label: ReactNode;

  /** Иконка */
  icon?: ReactNode;

  /** Значок
   *
   * При передаче string | number будет показат Badge
   *
   * При передаче кастомного компонента, он будет отрендерен как есть
   */
  badge?: ReactNode;
  /** Всплывающая подскаска при свернутом меню */
  tooltip?: ReactNode;
  /** Отключено
   *
   * Не позволяет переход по пункту
   */
  disabled?: boolean;

  /** Дочерние пункты
   *
   * Максимальная глубина меню = 2 уровня
   * т.е. childs[N].childs не будет отрендерен
   */
  childs?: SidebarMenuItemProps[];

  /** Обработчик нажания на пункт */
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
} & QA &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>;

export type SidebarMenuProps = {
  /** Пункты меню */
  items: SidebarMenuItemProps[];
  /** Выбранный пункт */
  selected?: string;
  /** Обработчик перехода по пункту */
  onChange?: (newSelected: SidebarMenuItemProps) => void;

  /** Принудительная установка состояния раскрыт | свернут */
  isExpanded?: boolean;
  /** Обработчик события раскрытия | сворачивания */
  setIsExpanded?: (newIsExpanded: boolean) => void;
} & QA &
  Pick<CSSProperties, 'width' | 'zIndex' | 'top'> &
  Pick<HTMLAttributes<HTMLDivElement>, 'style'>;

export type SidebarMenuContextProps = {
  onClick: (item: SidebarMenuItemProps) => MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
  isSelected: (item: SidebarMenuItemProps) => boolean;
} & Required<Pick<SidebarMenuProps, 'isExpanded' | 'setIsExpanded'>>;

export type SidebarMenuItemStyles = {isSelected: boolean} & Pick<SidebarMenuItemProps, 'disabled'>;
