import styled from '@emotion/styled';

import {theme} from 'theme';

import {SidebarMenuItemStyles, SidebarMenuItemProps} from 'sidebarMenu/types';

import {MenuItemBadge} from '../MenuItemBadge';

const Container = styled.div<SidebarMenuItemStyles>`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;

  color: ${({disabled}) => {
    if (disabled) {
      return theme.colors.grey[40];
    }

    return theme.colors.grey[60];
  }};
`;

const Icon = styled.div<SidebarMenuItemStyles>`
  display: flex;
  flex-shrink: 0;

  color: ${props => {
    if (props.disabled) {
      return theme.colors.grey[40];
    }

    return props.isSelected ? theme.colors.accent[90] : theme.colors.grey[60];
  }};
`;

const Label = styled.div`
  padding: 2px 4px 2px 0;

  ${theme.typography.p1compact}
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`;

export const Left: React.FC<SidebarMenuItemStyles & Partial<SidebarMenuItemProps>> = props => {
  const {label, icon, badge, ...styles} = props;

  return (
    <Container {...styles}>
      {!!icon && <Icon {...styles}>{icon}</Icon>}

      {!!label && <Label>{label}</Label>}

      {!!badge && (
        <BadgeContainer>
          <MenuItemBadge {...styles} hasStroke={styles.isSelected} badge={badge} />
        </BadgeContainer>
      )}
    </Container>
  );
};
