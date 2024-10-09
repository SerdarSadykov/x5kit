import {expect, it, describe, vi, beforeEach, afterEach} from 'vitest';

import {fireEvent, render, screen, waitFor} from '@testing-library/react';

import {SelectContext} from 'Select/Select';
import {SelectState} from 'Select/types';

import {SelectInput} from '.';

import type {SelectContextProps, SelectOption} from 'Select/types';

const options: SelectOption[] = [
  {label: 'Andreev', value: 'davletshin', disabled: false, tooltip: 'Вот такой тултип'},
  {label: 'Glebov', value: 'glebov', disabled: false},
  {label: 'Sevostyanov', value: 'sevostyanov', disabled: false},
];

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('SelectInput', () => {
  it('SelectInput', async () => {
    const context = {
      options,
      name: 'select',
      value: [options[0].value],
    } as SelectContextProps;

    const comp = render(
      <SelectContext.Provider value={context}>
        <SelectInput qa="select-input" name="select" />
      </SelectContext.Provider>
    );

    expect(screen.getByTestId('select-input')).toBeDefined();
    expect(screen.getByTestId('select-input').getAttribute('value')).toBe(options[0].label);

    context.multiple = true;
    context.value = [options[0].value, options[1].value, options[2].value];

    comp.rerender(
      <SelectContext.Provider value={context}>
        <SelectInput qa="select-input" name="select" />
      </SelectContext.Provider>
    );

    expect(screen.getByTestId('select-input').getAttribute('value')).toBe('');

    expect(screen.getByText('3')).toBeDefined();
  });

  it('wrap', async () => {
    const context = {
      options,
      name: 'select',
      value: [options[0].value],
      wrap: true,
    } as SelectContextProps;

    const comp = render(
      <SelectContext.Provider value={context}>
        <SelectInput qa="select" name="select" />
      </SelectContext.Provider>
    );

    expect(screen.getByTestId('select-input-div')).toBeDefined();
    expect(screen.getByTestId('select-input-div').textContent).toBe(options[0].label);

    context.multiple = true;
    context.value = [options[0].value, options[1].value, options[2].value];

    comp.rerender(
      <SelectContext.Provider value={context}>
        <SelectInput qa="select-input" name="select" />
      </SelectContext.Provider>
    );

    expect(screen.getByTestId('select-input').textContent).toBe('');

    expect(screen.getByText('3')).toBeDefined();
  });

  it('editable', async () => {
    const context = {
      options,
      name: 'select',
      filter: {cb: vi.fn()} as SelectContextProps['filter'],
      value: [options[0].value],
      setState: vi.fn() as SelectContextProps['setState'],
      setIsOpen: vi.fn() as SelectContextProps['setIsOpen'],
    } as SelectContextProps;

    const comp = render(
      <SelectContext.Provider value={context}>
        <SelectInput qa="select-input" name="select" />
      </SelectContext.Provider>
    );

    expect(screen.getByTestId('select-input')).toBeDefined();
    expect(screen.getByTestId('select-input').textContent).toBe('');

    fireEvent.focus(screen.getByTestId('select-input'));

    expect(context.setIsOpen).toBeCalledWith(true);
    expect(context.setState).toBeCalledWith(SelectState.default, []);

    fireEvent.change(screen.getByTestId('select-input'), {target: {value: 'test'}});

    waitFor(() => {
      expect(context.filter?.cb).toBeCalledWith('test');
    });

    fireEvent.blur(screen.getByTestId('select-input'));

    expect(context.setIsOpen).toBeCalledWith(true);
    expect(context.setState).toBeCalledWith(SelectState.default, []);

    context.multiple = true;
    context.value = [options[0].value, options[1].value, options[2].value];

    comp.rerender(
      <SelectContext.Provider value={context}>
        <SelectInput qa="select-input" name="select" />
      </SelectContext.Provider>
    );

    expect(screen.getByTestId('select-input').textContent).toBe('');

    expect(screen.getByText('3')).toBeDefined();
  });
});
