import {ReactNode} from 'react';
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

    let newLabel: ReactNode;
    const startIndex = label.toLowerCase().indexOf(query.toLowerCase());

    if (startIndex !== -1) {
      const endIndex = startIndex + query.length;
      newLabel = (
        <>
          {label.slice(0, startIndex)}
          <mark>{label.slice(startIndex, endIndex)}</mark>
          {label.slice(endIndex)}
        </>
      );
    }

    const newChilds = await callback(query, option.childs ?? []);

    if (newLabel || newChilds.length) {
      newOptions.push({
        ...option,

        label: newLabel ?? label,
        childs: newChilds,
      });
    }
  }

  return newOptions;
};

export const containsFilter: SelectFilter = {callback, delay: 50};
