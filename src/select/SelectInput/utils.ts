import {SelectInternalValue, SelectOption} from 'select/types';

export const findOptions = (options: SelectOption[], value: SelectInternalValue): SelectOption[] => {
  const result: SelectOption[] = [];

  for (const option of options) {
    if (value.includes(option.value)) {
      result.push(option);
    }

    if (option.childs) {
      result.push(...findOptions(option.childs, value));
    }

    if (result.length === value.length) {
      break;
    }
  }

  return result;
};

export const findOptionByLabel = (options: SelectOption[], label: string): SelectOption | undefined => {
  for (const option of options) {
    if (option.label.toLowerCase() === label) {
      return option;
    }

    if (option.childs) {
      const childOption = findOptionByLabel(option.childs, label);
      if (childOption) {
        return childOption;
      }
    }
  }
};