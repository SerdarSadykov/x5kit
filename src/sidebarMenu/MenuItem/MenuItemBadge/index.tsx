import {Badge, BadgeProps, BadgeVariant} from 'badge';

import {SidebarMenuItemStyles, SidebarMenuItemProps} from 'sidebarMenu/types';

type MenuItemBadgeProps = SidebarMenuItemStyles & Pick<SidebarMenuItemProps, 'badge'> & Pick<BadgeProps, 'hasStroke'>;

export const MenuItemBadge: React.FC<MenuItemBadgeProps> = ({disabled, badge, isSelected, hasStroke}) => {
  if (typeof badge === 'undefined' || badge === null) {
    return null;
  }

  const type = typeof badge;

  if (type === 'function' || type === 'object') {
    return badge;
  }

  let variant = BadgeVariant.grey;

  if (disabled) {
    variant = BadgeVariant.disabled;
  } else if (isSelected) {
    variant = BadgeVariant.accent;
  }

  return (
    <Badge variant={variant} hasStroke={hasStroke}>
      {badge}
    </Badge>
  );
};
