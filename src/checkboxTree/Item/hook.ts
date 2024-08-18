import {CheckboxProps} from 'checkbox/types';

import {CheckboxTreeOption, CheckboxTreeOptionValue, CheckboxTreeProps} from '../types';

export type ItemProps = {
  option: CheckboxTreeOption;
  values: CheckboxTreeOptionValue[];
}
  & Required<Pick<CheckboxTreeProps, 'onChange' | 'opened' | 'toggleOpened'>>;

const getValues = (option: CheckboxTreeOption): CheckboxTreeOptionValue[] => {
  return option.childs ? [option.value, ...option.childs.flatMap(getValues)] : [option.value];
};

export const useParentItem = (props: ItemProps) => {
  const {option, opened, toggleOpened, values} = props;
  const {childs = [], ...optionProps} = option;

  const checked = ((): CheckboxProps['checked'] => {
    if (values.includes(option.value)) {
      return true;
    }

    const allValues = childs.flatMap(getValues);
    const isChildsChecked = values.findIndex(value => allValues.includes(value)) !== -1;

    return isChildsChecked ? 'halfOn' : false;
  })();

  const isOpen = opened.includes(option.value);

  const onToggle = () => toggleOpened(option.value);

  const onChange: CheckboxProps['onChange'] = e => {
    const allValues = getValues(option);
    const newValues = checked ? values.filter(value => !allValues.includes(value)) : [...values, ...allValues];

    props.onChange(newValues, e);
  };

  const onOptionChange: ItemProps['onChange'] = (newValues, e) => {
    const newValueExcept = newValues.filter(value => value !== option.value);

    const allValues = childs.flatMap(getValues);
    const allChildsChecked = allValues.findIndex(value => !newValues.includes(value)) === -1;

    const resultValues = allChildsChecked ? [...newValueExcept, option.value] : newValueExcept;

    props.onChange(resultValues, e);
  };

  const itemProps = {
    values,
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