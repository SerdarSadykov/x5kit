import {CheckboxProps} from 'checkbox/types';

import {CheckboxTreeOption, CheckboxTreeOptionValue, CheckboxTreeProps} from '../types';

export type ItemProps = {
  option: CheckboxTreeOption;
  value: CheckboxTreeOptionValue[];
}
  & Required<Pick<CheckboxTreeProps, 'onChange' | 'opened' | 'toggleOpened'>>;

const getValues = (option: CheckboxTreeOption): CheckboxTreeOptionValue[] => {
  return option.childs ? [option.value, ...option.childs.flatMap(getValues)] : [option.value];
};

export const useParentItem = (props: ItemProps) => {
  const {option, opened, toggleOpened, value} = props;
  const {childs = [], ...optionProps} = option;

  const checked = ((): CheckboxProps['checked'] => {
    if (value.includes(option.value)) {
      return true;
    }

    const allValues = childs.flatMap(getValues);
    const isChildsChecked = value.findIndex(value => allValues.includes(value)) !== -1;

    return isChildsChecked ? 'halfOn' : false;
  })();

  const isOpen = opened.includes(option.value);

  const onToggle = () => toggleOpened(option.value);

  const onChange: CheckboxProps['onChange'] = e => {
    const allValues = getValues(option);
    const newValues = checked ? value.filter(value => !allValues.includes(value)) : [...value, ...allValues];

    props.onChange(newValues, option, e);
  };

  const onOptionChange: ItemProps['onChange'] = (newValues, target, e) => {
    const newValueExcept = newValues.filter(value => value !== option.value);

    const allValues = childs.flatMap(getValues);
    const allChildsChecked = allValues.findIndex(value => !newValues.includes(value)) === -1;

    const resultValues = allChildsChecked ? [...newValueExcept, option.value] : newValueExcept;

    props.onChange(resultValues, target, e);
  };

  const itemProps = {
    value,
    opened,
    toggleOpened,
    onChange: onOptionChange,
  };

  const checkboxProps = {...optionProps, checked, onChange};

  return {
    option,
    childs,
    isOpen,
    itemProps,
    checkboxProps,
    onToggle,
  };
};