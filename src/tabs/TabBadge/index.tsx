import {Badge, BadgeVariant} from 'badge';

import {TabProps} from '../types';

export const TabBadge: React.FC<Pick<TabProps, 'badge' | 'disabled'>> = ({badge, disabled}) => {
  if (!badge) {
    return null;
  }

  let variant = BadgeVariant.accent;

  if (disabled) {
    variant = BadgeVariant.disabled;
  }

  return <Badge variant={variant}>{badge}</Badge>;
};
