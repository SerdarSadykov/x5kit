import {expect, it, describe} from 'vitest';

import {containsFilter} from '.';

import type {SelectOption} from 'Select/types';

const getOptions = (i): SelectOption[] => [
  {
    label: `Andreev${i}`,
    value: `davletshin${i}`,
    disabled: false,
    childs: [
      {
        label: 'child1',
        value: 'child1',
      },
    ],
  },
  {label: `Glebov${i}`, value: `glebov${i}`, disabled: false},
  {label: `Sevostyanov${i}`, value: `sevostyanov${i}`, disabled: false},
];

describe('containsFilter', () => {
  it('cb', async () => {
    const options = getOptions(1);

    const foundOptions = await containsFilter.cb('Andre', options);

    expect(foundOptions.options.length).toBe(1);
    expect(foundOptions.options[0].value).toBe(options[0].value);
  });
});
