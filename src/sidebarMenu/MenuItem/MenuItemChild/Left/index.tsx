import styled from '@emotion/styled';

import {theme} from 'theme';

import {SidebarMenuItemProps, SidebarMenuItemStyles} from 'sidebarMenu/types';

const Container = styled.div<SidebarMenuItemStyles>`
  display: flex;
  align-items: center;
  gap: 8px;

  color: ${({isSelected, disabled}) => {
    if (disabled) {
      return theme.colors.grey[40];
    }

    return isSelected ? theme.colors.accent[90] : theme.colors.grey[60];
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

export const Left: React.FC<SidebarMenuItemStyles & Partial<SidebarMenuItemProps>> = ({label, icon, ...styles}) => {
  return (
    <Container {...styles}>
      {!!icon && <Icon {...styles}>{icon}</Icon>}

      <Label>{label}</Label>
    </Container>
  );
};
