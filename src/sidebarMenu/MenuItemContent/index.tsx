import {ElementType} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {Left} from './Left';
import {Right} from './Right';
import {MenuItemContentProps, MenuItemContentStyles} from './types';

const Container = styled.div<MenuItemContentStyles>`
  display: block;
  padding: 4px;
  cursor: pointer;
  pointer-events: ${props => (props.disabled ? 'none' : undefined)};
  text-decoration: none;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    border-radius: 4px;
  }

  ${({level, isActive}) => {
    if (level === 0) {
      return {
        '> div': {
          padding: '12px 8px 12px 12px',
          backgroundColor: isActive ? theme.colors.white : undefined,
        },

        ':hover > div': {
          backgroundColor: !isActive ? theme.colors.grey[20] : undefined,
        },
      };
    }

    return {
      '> div': {
        padding: `8px 8px 8px ${34 + level * 8}px`,
      },

      ':hover > div': {
        backgroundColor: !isActive ? theme.colors.grey[20] : undefined,
      },
    };
  }}
`;

export const MenuItemContent: React.FC<MenuItemContentProps> = ({
  label,
  icon,
  badge,
  disabled,
  childs,
  level,
  qa,
  href,
  target,
  isActive,
  onClick,
  tooltip,
}) => {
  const styles = {disabled, level, isActive};

  const leftProps = {...styles, label, icon};
  const rightProps = {...styles, badge, childs};

  const containerProps = {
    ...styles,

    href,
    target,
    onClick,

    'data-qa': qa,

    as: href ? ('a' as ElementType) : undefined,
  };

  return (
    <Container {...containerProps}>
      <div>
        <Left {...leftProps} />
        <Right {...rightProps} />
      </div>
    </Container>
  );
};
