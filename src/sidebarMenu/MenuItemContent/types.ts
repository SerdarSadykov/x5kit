import {SidebarMenuItemProps} from '../types';

export type MenuItemContentProps = {
  isActive: boolean;
  level: number;
} & SidebarMenuItemProps;

export type MenuItemContentStyles = Pick<MenuItemContentProps, 'disabled' | 'level' | 'isActive'>;
