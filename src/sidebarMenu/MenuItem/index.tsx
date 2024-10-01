import {MouseEventHandler, useContext, useState} from 'react';

import {MenuItemContent} from '../MenuItemContent';
import {SidebarMenuContext} from '../SidebarMenu';
import {SidebarMenuItemProps} from '../types';

type MenuItemProps = {level: number} & SidebarMenuItemProps;

const isSelected = (item: SidebarMenuItemProps, selected: string | undefined): boolean => {
  if (!selected) {
    return false;
  }

  if (item.id === selected) {
    return true;
  }

  return !!item.childs && item.childs.findIndex(subItem => isSelected(subItem, selected)) !== -1;
};

const MenuItem: React.FC<MenuItemProps> = props => {
  const context = useContext(SidebarMenuContext);

  const {childs, level, href, target} = props;

  const isActive = isSelected(props, context.selected);

  const onClick: MouseEventHandler<HTMLAnchorElement | HTMLDivElement> = e => {
    if (context.onChange) {
      if (href && (!target || target === '_self')) {
        e.preventDefault();
      }

      context.onChange(props);
    }

    props.onClick?.(e);
  };

  const contentProps = {isActive, onClick, ...props};

  const child = isActive ? childs?.map(getMenuItem(level + 1)) : undefined;

  return (
    <div>
      <MenuItemContent {...contentProps} />
      {child}
    </div>
  );
};

export const getMenuItem = (level: number) => (props: SidebarMenuItemProps) => (
  <MenuItem {...props} key={props.id} level={level} />
);
