import {useContext, useRef, useState} from 'react';
import {usePopper} from 'react-popper';
import styled from '@emotion/styled';

const DropdownButton = styled.button`
  position: relative;
`;

const DropdownList = styled.div`
  &[hidden] {
    display: none;
  }
`;

export type DropdownItem = {
  name: string;
  value: number;
  disabled: boolean;
};

export type DropdownProps = {
  items: DropdownItem[];
  value: DropdownItem;
  onChange: (newItem: DropdownItem) => void;
};

export type DropdownListItemProps = Pick<DropdownProps, 'onChange'> & {item: DropdownItem};

const ListItem = styled.button``;

const DropdownListItem: React.FC<DropdownListItemProps> = ({onChange, item}) => {
  const {name, disabled} = item;

  return (
    <ListItem onClick={() => onChange(item)} disabled={disabled}>
      {name}
    </ListItem>
  );
};

export const Dropdown: React.FC<DropdownProps> = ({items, value, onChange}) => {
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

  return (
    <>
      <DropdownButton ref={setBtnRef} onClick={onToggle}>
        {value.name}
      </DropdownButton>
      <DropdownList ref={setListRef} hidden={!isOpen} style={popper.styles.popper} {...popper.attributes.popper}>
        {items.map(item => (
          <DropdownListItem key={item.value} item={item} onChange={onChange} />
        ))}
      </DropdownList>
    </>
  );
};
