import {ElementType, useContext} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {SidebarMenuContext} from 'sidebarMenu/SidebarMenu';
import {SidebarMenuItemStyles, SidebarMenuItemProps} from 'sidebarMenu/types';

import {MenuItemBadge} from '../MenuItemBadge';

import {Left} from './Left';

const Container = styled.div`
  position: absolute;
  top: 4px;
  left: calc(100% - 4px);
  min-width: 126px;
  max-width: 228px;
  border-radius: 0 8px 8px 8px;
  background-color: ${theme.colors.white};
  box-shadow: ${theme.shadows.medium};
`;

const Title = styled.div`
  padding: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${theme.typography.h4}
`;

const ItemContainer = styled.div<SidebarMenuItemStyles>`
  position: relative;
  display: block;
  padding: 4px;
  text-decoration: none;

  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px;
    border-radius: 4px;
  }

  :hover > div {
    background-color: ${props => (!props.isSelected ? theme.colors.grey[10] : undefined)};
  }
`;

const DropdownItem: React.FC<SidebarMenuItemProps> = props => {
  const {isSelected, onClick} = useContext(SidebarMenuContext);

  const {label, icon, badge, disabled, qa, href, target} = props;

  const styles = {disabled, isSelected: isSelected(props)};

  const anchorProps = href ? {href, target, as: 'a' as ElementType} : undefined;

  const containerProps = {
    ...styles,
    ...anchorProps,

    onClick: onClick(props),

    'data-qa': qa,
  };

  const leftProps = {...styles, label, icon};
  const rightProps = {...styles, badge};

  return (
    <div>
      <ItemContainer {...containerProps}>
        <div>
          <Left {...leftProps} />
          <MenuItemBadge {...rightProps} />
        </div>
      </ItemContainer>
    </div>
  );
};

export const Dropdown: React.FC<Pick<SidebarMenuItemProps, 'label' | 'childs'>> = ({label, childs}) => {
  const child = childs?.map(item => <DropdownItem key={item.id} {...item} />);

  return (
    <Container>
      <Title>{label}</Title>
      {child}
    </Container>
  );
};
