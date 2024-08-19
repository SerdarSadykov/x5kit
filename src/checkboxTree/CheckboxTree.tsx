import {forwardRef, useState} from 'react';

import {Item} from './Item';
import {CheckboxTreeOptionValue, CheckboxTreeProps} from './types';

export const CheckboxTree = forwardRef<HTMLDivElement, CheckboxTreeProps>((props, ref) => {
  const {options, disabled, readOnly, onChange, value = []} = props;

  const [openedValue, toggleOpenedValue] = useState<CheckboxTreeOptionValue[]>([]);

  let toggleOpened = props.toggleOpened;

  toggleOpened ??= (toggleValue: CheckboxTreeOptionValue) => {
    const newToggled = openedValue.includes(toggleValue)
      ? openedValue.filter(item => item !== toggleValue)
      : [...openedValue, toggleValue];

    toggleOpenedValue(newToggled);
  };

  const itemProps = {
    value,
    onChange,
    toggleOpened,

    opened: props.opened ?? openedValue,
  };

  const child = options.map(option => (
    <Item key={option.value} option={{disabled, readOnly, ...option}} {...itemProps} />
  ));

  return <div ref={ref}>{child}</div>;
});
