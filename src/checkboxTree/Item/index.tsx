import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';
import {ChevronDown, ChevronRight} from 'icons';
import {Checkbox, CheckboxProps} from 'checkbox';

import {ItemProps, useParentItem} from './hook';

const Container = styled.div`
  margin-bottom: 12px;

  :last-child {
    margin-bottom: 0;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ChildsContainer = styled.div`
  padding: 12px 0 0 48px;
`;

const Button = styled.button`
  width: 16px;
  height: 20px;
  padding: 0;
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

const ParentItem: React.FC<ItemProps> = props => {
  const {disabled, readOnly} = props.option;
  const {option, childs, isOpen, itemProps, checkboxProps, onToggle} = useParentItem(props);

  const items = childs.map(child => (
    <Item key={`${option.value}-${child.value}`} option={{disabled, readOnly, ...child}} {...itemProps} />
  ));

  const Icon = isOpen ? ChevronDown : ChevronRight;

  const children = isOpen && <ChildsContainer>{items}</ChildsContainer>;

  return (
    <Container>
      <CheckboxContainer>
        <Button onClick={onToggle}>
          <Icon size={SizeTokenValue.Small} />
        </Button>

        <Checkbox {...checkboxProps} />
      </CheckboxContainer>

      {children}
    </Container>
  );
};

export const Item: React.FC<ItemProps> = props => {
  if (props.option.childs?.length) {
    return <ParentItem {...props} />;
  }

  const {option, values} = props;

  const checked = values.includes(option.value);

  const onChange: CheckboxProps['onChange'] = e => {
    const newValues = checked ? values.filter(value => value !== option.value) : [...values, option.value];

    props.onChange(newValues, e);
  };

  const optionProps = {...option, checked, onChange};

  return (
    <Container>
      <Checkbox {...optionProps} />
    </Container>
  );
};
