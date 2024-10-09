/* eslint-disable  @typescript-eslint/no-explicit-any */

import {expect, it, describe} from 'vitest';

import {fireEvent, render, screen} from '@testing-library/react';

import {SelectContext} from 'Select/Select';

import {WrapInput, WrapInputEditable} from '.';

import type {SelectContextProps, SelectOption} from 'Select/types';

const options: SelectOption[] = [
  {label: 'Andreev', value: 'davletshin', disabled: false},
  {label: 'Glebov', value: 'glebov', disabled: false},
  {label: 'Sevostyanov long long text \n with new line', value: 'sevostyanov', disabled: false},
];

describe('WrapInput', () => {
  it('WrapInput', async () => {
    const context = {
      options,
      multiple: true,
      value: [options[2].value],
    } as SelectContextProps;

    render(
      <SelectContext.Provider value={context}>
        <WrapInput qa="select" value={String(options[2].label)} style={{} as any} />
      </SelectContext.Provider>
    );

    expect(screen.getByTestId('select-input-div').textContent).toBe(options[2].label);

    fireEvent.focus(screen.getByTestId('select-input-div'));

    expect(screen.getByTestId('select-input-div').textContent).toBe(options[2].label);
  });

  it('WrapInputEditable', async () => {
    const context = {
      options,
      multiple: true,
      value: [options[2].value],
    } as SelectContextProps;

    render(
      <SelectContext.Provider value={context}>
        <WrapInputEditable qa="select" value={String(options[2].label)} style={{} as any} />
      </SelectContext.Provider>
    );

    expect(screen.getByTestId('select-input-div').textContent).toBe(options[2].label);

    fireEvent.focus(screen.getByTestId('select-input-div'));

    expect(screen.getByTestId('select-input').textContent).toBe('');
  });
});
