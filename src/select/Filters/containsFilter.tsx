import {ReactNode} from 'react';
import {LastResult, SelectFilter, SelectOption} from '../types';

const search = async (query: string, options: SelectOption[]) => {
  if (!query) {
    return [...options];
  }

  const newOptions: SelectOption[] = [];

  for (const option of options) {
    const label = option.label;

    if (typeof label !== 'string') {
      continue;
    }

    let children: ReactNode;
    const startIndex = label.toLowerCase().indexOf(query.toLowerCase());

    if (startIndex !== -1) {
      const endIndex = startIndex + query.length;
      children = (
        <>
          {label.slice(0, startIndex)}
          <mark>{label.slice(startIndex, endIndex)}</mark>
          {label.slice(endIndex)}
        </>
      );
    }

    const newChilds = await search(query, option.childs ?? []);

    if (children || newChilds.length) {
      newOptions.push({
        ...option,

        children,
        childs: newChilds,
      });
    }
  }

  return newOptions;
};

export const containsFilter: SelectFilter<LastResult> = {
  delay: 50,
  cb: (query, allOptions) => search(query, allOptions).then(options => ({options})),
};
