import {useState} from 'react';
import styled from '@emotion/styled';

import {Item} from './Item';
import {CheckboxTreeOptionValue, CheckboxTreeProps} from './types';

const Container = styled.div``;

export const CheckboxTree: React.FC<CheckboxTreeProps> = props => {
  const {options, disabled, readOnly, onChange, values = []} = props;

  const [openedValue, toggleOpenedValue] = useState<CheckboxTreeOptionValue[]>([]);

  let toggleOpened = props.toggleOpened;

  toggleOpened ??= (value: CheckboxTreeOptionValue) => {
    const newToggled = openedValue.includes(value)
      ? openedValue.filter(item => item !== value)
      : [...openedValue, value];

    toggleOpenedValue(newToggled);
  };

  const itemProps = {
    values,
    onChange,
    toggleOpened,

    opened: props.opened ?? openedValue,
  };

  const child = options.map(option => (
    <Item key={option.value} option={{disabled, readOnly, ...option}} {...itemProps} />
  ));

  return <Container>{child}</Container>;
};
