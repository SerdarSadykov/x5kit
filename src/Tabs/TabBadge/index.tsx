import {useContext} from 'react';

import {Badge, BadgeVariant} from 'Badge';

import {TabsValueContext} from '../Tabs';

import type {TabProps} from '../types';

export const TabBadge: React.FC<Pick<TabProps, 'value' | 'badge' | 'disabled'>> = ({value, badge, disabled}) => {
  const curValue = useContext(TabsValueContext);

  if (!badge) {
    return null;
  }

  let variant = curValue === value ? BadgeVariant.accent : BadgeVariant.grey;

  if (disabled) {
    variant = BadgeVariant.disabled;
  }

  return (
    <Badge data-badge variant={variant}>
      {badge}
    </Badge>
  );
};
