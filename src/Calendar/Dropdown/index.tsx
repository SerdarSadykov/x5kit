import styled from '@emotion/styled';

import {Placement, SizeTokenValue, theme} from 'theme';
import {ArrowDown, ArrowUp} from 'icons';
import {Tooltip} from 'Tooltip';

import {useDropdown} from './hook';

import type {DropdownButtonStyle, DropdownListItemProps, DropdownStyle, DropdownProps, ListItemStyle} from './types';

const Container = styled.div(theme.typography.base);

const DropdownButton = styled.button<DropdownButtonStyle>`
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  gap: 6px;
  padding: 0 10px;
  text-transform: capitalize;
  text-align: left;
  color: ${theme.colors.grey[100]};
  background: none;
  border-style: solid;
  border-width: 2px;
  border-color: ${props => (props.isOpen ? theme.colors.accent[90] : 'transparent')};
  border-radius: 4px;
  cursor: pointer;

  ${theme.typography.p1}

  :hover {
    border-color: ${theme.colors.grey[40]};
  }

  & svg {
    color: ${theme.colors.grey[60]};
  }
`;

const List = styled.div<DropdownStyle>`
  width: ${props => props.width}px;
  max-height: 240px;
  padding-top: 8px;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  box-shadow: ${theme.shadows.medium};
  overflow-y: auto;
  overflow-x: hidden;
  z-index: ${theme.sizes.zIndex.dropdown};

  &[hidden] {
    display: none;
  }

  ${theme.scroll}
`;

const ListItem = styled.button<ListItemStyle>`
  display: block;
  min-width: 100%;
  height: 32px;
  padding: 0 12px;
  text-transform: capitalize;
  text-align: left;
  background: none;
  border: none;
  outline: none;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

  ${theme.typography.p1}

  :hover {
    color: ${theme.colors.grey[100]};
    background-color: ${theme.colors.grey[20]};
  }

  ${props => {
    if (props.isSelected) {
      return {
        color: theme.colors.white,
        backgroundColor: theme.colors.accent[90],
      };
    }
  }}
`;

const DropdownListItem: React.FC<DropdownListItemProps> = ({onChange, item, isSelected}) => {
  const {name, disabled} = item;

  return (
    <ListItem onClick={() => onChange(item)} disabled={disabled} isSelected={isSelected}>
      {name}
    </ListItem>
  );
};

export const Dropdown: React.FC<DropdownProps> = props => {
  const {items, value, isOpen, tooltip, width, qa} = props;
  const {floating, isTooltipOpen, onToggle, onClickContainer, onClickItem} = useDropdown(props);

  const listItems = items.map(item => (
    <DropdownListItem key={item.value} item={item} isSelected={item.value === value.value} onChange={onClickItem} />
  ));

  const Chevron = isOpen ? ArrowUp : ArrowDown;

  return (
    <Container data-qa={qa} onClick={onClickContainer}>
      <Tooltip placement={Placement.bottom} content={tooltip} isOpen={isTooltipOpen}>
        <DropdownButton ref={floating.refs.setReference} isOpen={isOpen} onClick={onToggle}>
          {value.name}
          <Chevron size={SizeTokenValue.Small} />
        </DropdownButton>
      </Tooltip>

      <List ref={floating.refs.setFloating} width={width} hidden={!isOpen} style={floating.floatingStyles}>
        {listItems}
      </List>
    </Container>
  );
};
