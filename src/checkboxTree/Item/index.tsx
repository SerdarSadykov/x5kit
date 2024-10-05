import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';
import {ChevronDown, ChevronRight} from 'icons';

import {Checkbox} from 'checkbox';

import {useParentItem} from './hook';

import type {CheckboxProps} from 'checkbox';

import type {ItemProps} from './hook';

const Container = styled.div`
  mark {
    color: ${theme.colors.accent[80]};
    background-color: transparent;
  }
`;

const CheckboxContainer = styled.div<Pick<ItemProps, 'depth'>>`
  label {
    display: block;
    padding: 6px 12px;
    padding-left: ${props => props.depth * 24 + 12}px;
  }
`;

const Button = styled.button`
  width: 16px;
  height: 20px;
  padding: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  outline: none;
  border: 0;
  background: transparent;
  line-height: 0;
  cursor: pointer;

  color: ${theme.colors.grey[60]};

  :hover {
    color: ${theme.colors.grey[80]};
  }
`;

const ButtonPlaceholder = styled.div`
  width: 16px;
  flex-shrink: 0;
`;

const ParentItem: React.FC<ItemProps> = props => {
  const {disabled, readOnly} = props.option;
  const {option, childs, isOpen, itemProps, checkboxProps, onToggle, depth} = useParentItem(props);

  const items =
    isOpen &&
    childs.map(child => (
      <Item key={`${option.value}-${child.value}`} option={{disabled, readOnly, ...child}} {...itemProps} />
    ));

  const Icon = isOpen ? ChevronDown : ChevronRight;

  const startAdornment = (
    <Button type="button" onClickCapture={onToggle}>
      <Icon size={SizeTokenValue.Small} />
    </Button>
  );

  return (
    <Container>
      <CheckboxContainer depth={depth}>
        <Checkbox {...checkboxProps} startAdornment={startAdornment} />
      </CheckboxContainer>

      {items}
    </Container>
  );
};

export const Item: React.FC<ItemProps> = props => {
  if (props.option.childs?.length) {
    return <ParentItem {...props} />;
  }

  const {option, value, depth, hasChildsInDepth} = props;

  const checked = value.includes(option.value);

  const onChange: CheckboxProps['onChange'] = e => {
    const newValues = checked ? value.filter(value => value !== option.value) : [...value, option.value];

    props.onChange(newValues, option, e);
  };

  const startAdornment = hasChildsInDepth || depth > 0 ? <ButtonPlaceholder /> : undefined;

  const optionProps = {...option, checked, onChange, startAdornment};

  return (
    <Container>
      <CheckboxContainer depth={depth}>
        <Checkbox {...optionProps} />
      </CheckboxContainer>
    </Container>
  );
};
