import {VariableSizeListProps} from 'react-window';

import {SelectMultipleValue, SelectItemsProps, SelectOption} from 'select/types';

export const getItemSize = (props: SelectItemsProps): VariableSizeListProps['itemSize'] => {
  return index => {
    let clientWidth = props.clientWidth;

    if (!clientWidth || props.whiteSpace === 'nowrap') {
      return 32;
    }

    clientWidth -= props.multiple ? 65 : 24;

    const labelWidth = props.options[index].label.length * 8.625;

    return 20 * Math.ceil(labelWidth / clientWidth) + 12;
  };
};

export const getValues = (option: SelectOption): SelectMultipleValue => {
  return option.childs ? [option.value, ...option.childs.flatMap(getValues)] : [option.value];
};