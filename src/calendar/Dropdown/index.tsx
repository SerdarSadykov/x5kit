import {MouseEventHandler, useEffect, useRef, useState} from 'react';
import {usePopper} from 'react-popper';
import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';
import {ArrowDown, ArrowUp} from 'icons';

const Container = styled.div``;

const DropdownButton = styled.button<DropdownButtonStyle>`
  position: relative;
  width: ${props => props.width}px;
  height: 32px;
  font-family: ${theme.typography.base.fontFamily};
  font-size: ${theme.spaces.x8}px;
  text-transform: capitalize;
  color: ${theme.colors.grey[100]};
  background: none;
  border-style: solid;
  border-width: 2px;
  border-color: ${props => props.isOpen ? theme.colors.accent[90] : 'transparent'};
  border-radius: 4px;
  cursor: pointer;

  &:hover{
    border-color: ${theme.colors.grey[40]};
  }

  & svg {
    position: absolute;
    right: 0;
    top: 5px;
    color: ${theme.colors.grey[60]};
  }
`;

const List = styled.div<DropdownStyle>`
  width: ${props => props.width}px;
  max-height: 240px;
  padding-top: 8px;
  z-index: ${theme.sizes.zIndex.dropdown};
  background-color: ${theme.colors.white};
  border-radius: 8px;
  box-shadow: ${theme.shadows.small};
  overflow-y: auto;
  overflow-x: hidden;

  &[hidden] {
    display: none;
  }
`;

const ListItem = styled.button`
  display: block;
  min-width: 100%;
  height: 32px;
  padding: 0 12px;
  font-size: ${theme.spaces.x8}px;
  background: none;
  border: none;
  outline: none;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

  &:hover {
    color: ${theme.colors.white};
    background-color: ${theme.colors.accent[90]};
  }
`;

export type DropdownItem = {
  name: string;
  value: number;
  disabled: boolean;
};

type DropdownStyle = {
  width: number;
};

type DropdownButtonStyle = DropdownStyle & {
  isOpen: boolean;
}

export type DropdownProps = DropdownStyle & {
  items: DropdownItem[];
  value: DropdownItem;
  onChange: (newItem: DropdownItem) => void;
};

export type DropdownListItemProps = Pick<DropdownProps, 'onChange'> & {item: DropdownItem};

const DropdownListItem: React.FC<DropdownListItemProps> = ({onChange, item}) => {
  const {name, disabled} = item;

  return (
    <ListItem onClick={() => onChange(item)} disabled={disabled}>
      {name}
    </ListItem>
  );
};

export const Dropdown: React.FC<DropdownProps> = ({items, value, onChange, width}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [btnRef, setBtnRef] = useState<HTMLButtonElement | null>(null);
  const [listRef, setListRef] = useState<HTMLDivElement | null>(null);

  const popper = usePopper(btnRef, listRef, {placement: 'bottom-start'});

  const onToggle = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      popper.update?.();
    }
  };

  const onClickContainer: MouseEventHandler = e => {
    e.stopPropagation();
  };

  const onClickItem: DropdownProps['onChange'] = newItem => {
    setIsOpen(false);
    onChange(newItem);
  };

  useEffect(() => {
    const listner = () => setIsOpen(false);

    document.body.addEventListener('click', listner);

    return () => document.body.removeEventListener('click', listner);
  }, [setIsOpen]);

  const listItems = items.map(item => <DropdownListItem key={item.value} item={item} onChange={onClickItem} />);

  const Chevron = isOpen ? ArrowUp : ArrowDown;

  return (
    <Container onClick={onClickContainer}>
      <DropdownButton ref={setBtnRef} width={width} isOpen={isOpen} onClick={onToggle}>
        {value.name}
        <Chevron size={SizeTokenValue.Small} />
      </DropdownButton>

      <List ref={setListRef} width={width} hidden={!isOpen} style={popper.styles.popper} {...popper.attributes.popper}>
        {listItems}
      </List>
    </Container>
  );
};
