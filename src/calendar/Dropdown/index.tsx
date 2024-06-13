import {MouseEventHandler, useEffect, useRef, useState} from 'react';
import {usePopper} from 'react-popper';
import styled from '@emotion/styled';

import {theme} from 'tokens';

const Container = styled.div``;

const DropdownButton = styled.button`
  position: relative;
  width: ${(props: DropdownStyle) => props.width}px;
  font-family: ${theme.typography.base.fontFamily};
  font-size: ${theme.spaces.x8}px;
  cursor: pointer;
`;

const List = styled.div`
  width: ${(props: DropdownStyle) => props.width}px;
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

  return (
    <Container onClick={onClickContainer}>
      <DropdownButton ref={setBtnRef} width={width} onClick={onToggle}>
        {value.name}
      </DropdownButton>

      <List ref={setListRef} width={width} hidden={!isOpen} style={popper.styles.popper} {...popper.attributes.popper}>
        {listItems}
      </List>
    </Container>
  );
};
