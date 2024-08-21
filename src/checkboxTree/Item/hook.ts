import {CheckboxProps} from 'checkbox/types';

import {CheckboxTreeOption, CheckboxTreeOptionValue, CheckboxTreeProps} from '../types';
import {MouseEventHandler} from 'react';

export type ItemProps = {
  option: CheckboxTreeOption;
  value: CheckboxTreeOptionValue[];
  depth: number;
  hasChildsInDepth: boolean;
}
  & Required<Pick<CheckboxTreeProps, 'onChange' | 'opened' | 'toggleOpened'>>;

const getValues = (options: CheckboxTreeOption[], enabledOnly: boolean): CheckboxTreeOptionValue[] => {
  const traverse = (option: CheckboxTreeOption) => {
    if (enabledOnly && (option.disabled || option.readOnly)) {
      return [];
    }

    return option.childs ? [option.value, ...option.childs.flatMap(traverse)] : [option.value];
  };

  return options.flatMap(traverse);
};

export const useParentItem = (props: ItemProps) => {
  const {option, opened, toggleOpened, value, depth} = props;
  const {childs = [], ...optionProps} = option;

  const checked = ((): CheckboxProps['checked'] => {
    if (value.includes(option.value)) {
      return true;
    }

    const childValues = getValues(childs, false);
    const isAnyChildChecked = value.findIndex(value => childValues.includes(value)) !== -1;

    return isAnyChildChecked ? 'halfOn' : false;
  })();

  const isOpen = opened.includes(option.value);

  const hasChildsInDepth = childs.findIndex(item => !!item.childs?.length) !== -1;

  const onToggle: MouseEventHandler = e => {
    e.stopPropagation();
    e.preventDefault();
    toggleOpened(option.value);
  };

  const onChange: CheckboxProps['onChange'] = e => {
    const childValues = getValues(childs, false);

    let newValue: CheckboxTreeOptionValue[] = [];

    if (checked) {
      newValue = value.filter(value => value !== option.value && !childValues.includes(value));
    } else {
      const childEnabledValues = getValues(childs, true);

      newValue = [...value, ...childEnabledValues];

      if (childValues.length === childEnabledValues.length) {
        newValue.push(option.value);
      }
    }

    props.onChange(newValue, option, e);
  };

  const onOptionChange: ItemProps['onChange'] = (newValue, target, e) => {
    const newValueExceptThis = newValue.filter(value => value !== option.value);

    const allChildsChecked = getValues(childs, false).findIndex(value => !newValue.includes(value)) === -1;

    const resultValues = allChildsChecked ? [...newValueExceptThis, option.value] : newValueExceptThis;

    props.onChange(resultValues, target, e);
  };

  const itemProps = {
    value,
    opened,
    toggleOpened,
    hasChildsInDepth,
    onChange: onOptionChange,
    depth: depth + 1,
  };

  const checkboxProps = {...optionProps, checked, onChange};

  return {
    option,
    childs,
    isOpen,
    itemProps,
    checkboxProps,
    onToggle,
    depth,
  };
};