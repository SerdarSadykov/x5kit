import {SelectFilter, SelectOption} from '../types';

const callback: SelectFilter['callback'] = async (query, options) => {
  if (!query) {
    return [...options];
  }

  const newOptions: SelectOption[] = [];

  for (const option of options) {
    const label = option.label;

    if (typeof label !== 'string') {
      continue;
    }

    const startIndex = label.toLowerCase().indexOf(query.toLowerCase());
    if (startIndex === -1) {
      continue;
    }

    const endIndex = startIndex + query.length;
    const newLabel = (
      <>
        {label.slice(0, startIndex)}
        <mark>{label.slice(startIndex, endIndex)}</mark>
        {label.slice(endIndex)}
      </>
    );

    newOptions.push({...option, label: newLabel});
  }

  return newOptions;
};

export const containsFilter: SelectFilter = {callback, delay: 50};
