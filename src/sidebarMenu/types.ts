import {AnchorHTMLAttributes, CSSProperties, MouseEventHandler, ReactNode} from 'react';

import {QA} from 'common';

export type SidebarMenuItemProps = {
  id: string;

  label: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  tooltip?: ReactNode;
  disabled?: boolean;

  childs?: SidebarMenuItemProps[];

  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
} & QA & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>;

export type SidebarMenuProps = {
  items: SidebarMenuItemProps[];
  selected: string | undefined;
  onChange?: (newSelected: SidebarMenuItemProps) => void;
  
  isExpanded?: boolean;
  setIsExpanded?: (newIsExpanded: boolean) => void;
} & QA & Pick<CSSProperties, 'width'>;

export type SidebarMenuContextProps = {
  onClick: (item: SidebarMenuItemProps) => MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
  isSelected: (item: SidebarMenuItemProps) => boolean;
} & Required<Pick<SidebarMenuProps, 'isExpanded' | 'setIsExpanded'>>;

export type SidebarMenuItemStyles = {isSelected: boolean;} & Pick<SidebarMenuItemProps, 'disabled'>;