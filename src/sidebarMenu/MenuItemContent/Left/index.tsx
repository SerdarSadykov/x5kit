import styled from '@emotion/styled';

import {theme} from 'theme';

import {MenuItemContentProps, MenuItemContentStyles} from '../types';

const Container = styled.div<MenuItemContentStyles>`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({level, isActive, disabled}) => {
    if (disabled) {
      return {
        color: theme.colors.grey[40],
      };
    }

    if (isActive) {
      return {
        color: level === 0 ? theme.colors.grey[60] : theme.colors.accent[90],
      };
    }

    return {
      color: theme.colors.grey[60],
    };
  }};
`;

const Icon = styled.div<MenuItemContentStyles>`
  display: flex;
  flex-shrink: 0;

  color: ${props => {
    if (props.disabled) {
      return theme.colors.grey[40];
    }

    if (props.isActive) {
      return theme.colors.accent[90];
    }

    return theme.colors.grey[60];
  }};
`;

const Label = styled.div`
  padding: 2px 4px 2px 0;

  ${theme.typography.p1compact}
`;

type LeftProps = MenuItemContentStyles & Pick<MenuItemContentProps, 'label' | 'icon'>;

export const Left: React.FC<LeftProps> = ({label, icon, ...styles}) => {
  return (
    <Container {...styles}>
      {!!icon && <Icon {...styles}>{icon}</Icon>}

      <Label>{label}</Label>
    </Container>
  );
};
