/* eslint-disable  @typescript-eslint/no-explicit-any */

import {expect, it, describe} from 'vitest';

import {render, screen} from '@testing-library/react';

import {SelectContext} from 'Select/Select';

import {Chips} from '.';

import type {SelectContextProps, SelectOption} from 'Select/types';

const options: SelectOption[] = [
  {label: 'Andreev', value: 'davletshin', disabled: false, tooltip: 'Вот такой тултип'},
  {label: 'Glebov', value: 'glebov', disabled: false},
  {label: 'Sevostyanov', value: 'sevostyanov', disabled: false},
];

describe('Chips', () => {
  it('Chips', async () => {
    const context = {
      options,
      name: 'select',
      multiple: true,
      value: [options[0].value, options[1].value, options[2].value],
    } as SelectContextProps;

    const comp = render(
      <SelectContext.Provider value={context}>
        <Chips />
      </SelectContext.Provider>
    );

    expect(screen.getByText('3')).toBeDefined();

    context.multiple = true;
    context.showChips = 2;

    comp.rerender(
      <SelectContext.Provider value={context}>
        <Chips />
      </SelectContext.Provider>
    );

    expect(screen.getByText(options[0].label)).toBeDefined();
    expect(screen.getByText(options[1].label)).toBeDefined();
    expect(screen.getByText('+1')).toBeDefined();
  });
});
