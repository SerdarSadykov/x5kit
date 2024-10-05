export type DropdownItem = {
  name: string;
  value: number;
  disabled: boolean;
};

export type DropdownStyle = {
  width: number;
};

export type DropdownButtonStyle = {
  isOpen: boolean;
};

export type DropdownOpenProps = {
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
};

export type DropdownProps = {
  items: DropdownItem[];
  value: DropdownItem;
  onChange: (newItem: DropdownItem) => void;
} & DropdownStyle &
  DropdownOpenProps;

export type ListItemStyle = {
  isSelected: boolean;
};

export type DropdownListItemProps = Pick<DropdownProps, 'onChange'> & ListItemStyle & {item: DropdownItem};
