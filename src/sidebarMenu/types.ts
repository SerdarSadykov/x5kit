import {AnchorHTMLAttributes, CSSProperties, MouseEventHandler, ReactNode} from 'react';

import {QA} from 'common';

export type SidebarMenuItemProps = {
  id: string;

  label?: ReactNode;
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
} & QA & Pick<CSSProperties, 'width'>;

export type SidebarMenuContextProps = Pick<SidebarMenuProps, 'selected' | 'onChange' | 'width'>;
