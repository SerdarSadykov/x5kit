import styled from '@emotion/styled';

import {SizeTokenValue} from 'theme';
import {ArrowDown, ArrowUp} from 'icons';
import {ButtonVariant, IconButton} from 'button';
import {Badge as BaseBadge, BadgeVariant} from 'badge';

import {MenuItemContentProps, MenuItemContentStyles} from '../types';

type RightProps = MenuItemContentStyles & Pick<MenuItemContentProps, 'badge' | 'childs'>;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Arrow: React.FC<RightProps> = ({childs, isActive}) => {
  if (!childs?.length) {
    return null;
  }

  const Component = isActive ? ArrowUp : ArrowDown;

  return (
    <IconButton variant={ButtonVariant.innerInput} size={SizeTokenValue.XXSmall}>
      <Component size={SizeTokenValue.Small} />
    </IconButton>
  );
};

export const Badge: React.FC<RightProps> = ({disabled, badge, isActive}) => {
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
  } else if (isActive) {
    variant = BadgeVariant.accent;
  }

  return <BaseBadge variant={variant}>{badge}</BaseBadge>;
};

export const Right: React.FC<RightProps> = props => {
  if (!props.badge && !props.childs?.length) {
    return null;
  }

  return (
    <Container>
      <Badge {...props} />
      <Arrow {...props} />
    </Container>
  );
};
