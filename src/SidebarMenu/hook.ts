import {useState} from 'react';

import type {SidebarMenuContextProps, SidebarMenuProps} from './types';

export const useSidebarMenu = (props: SidebarMenuProps) => {
  const [isExpandedIn, setIsExpandedIn] = useState<boolean>(props.isExpanded ?? false);
  const isExpanded = props.isExpanded ?? isExpandedIn;
  const setIsExpanded = props.setIsExpanded ?? setIsExpandedIn;

  const onClick: SidebarMenuContextProps['onClick'] = item => e => {
    if (item.disabled) {
      e.preventDefault();
      return;
    }

    if (props.onChange) {
      if (item.href && (!item.target || item.target === '_self')) {
        e.preventDefault();
      }

      props.onChange(item);
    }

    item.onClick?.(e);
  };

  const isSelected: SidebarMenuContextProps['isSelected'] = item => {
    if (!props.selected) {
      return false;
    }

    return (
      item.id === props.selected || (!!item.childs && item.childs.findIndex(subItem => isSelected(subItem)) !== -1)
    );
  };

  const context = {isSelected, onClick, isExpanded, setIsExpanded};

  return {context, isExpanded};
};
