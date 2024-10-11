import type {AnchorHTMLAttributes, CSSProperties, HTMLAttributes, MouseEventHandler, ReactNode} from 'react';

import type {QA} from 'common';

export type SidebarMenuItemProps = {
  id: string;

  label: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  tooltip?: ReactNode;
  disabled?: boolean;

  childs?: SidebarMenuItemProps[];

  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
} & QA &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>;

export type SidebarMenuProps = {
  items: SidebarMenuItemProps[];
  selected?: string;
  onChange?: (newSelected: SidebarMenuItemProps) => void;

  isExpanded?: boolean;
  setIsExpanded?: (newIsExpanded: boolean) => void;
} & QA &
  Pick<CSSProperties, 'width' | 'zIndex' | 'top'> &
  Pick<HTMLAttributes<HTMLDivElement>, 'style'>;

export type SidebarMenuContextProps = {
  onClick: (item: SidebarMenuItemProps) => MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
  isSelected: (item: SidebarMenuItemProps) => boolean;
} & Required<Pick<SidebarMenuProps, 'isExpanded' | 'setIsExpanded'>>;

export type SidebarMenuItemStyles = {isSelected: boolean} & Pick<SidebarMenuItemProps, 'disabled'>;
