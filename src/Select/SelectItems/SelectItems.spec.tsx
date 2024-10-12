/* eslint-disable  @typescript-eslint/no-explicit-any */

import {expect, it, describe, vi} from 'vitest';

import {render, screen} from '@testing-library/react';

import {SelectItems} from '.';

import type {SelectOption, SelectItemsProps, SelectMultipleValue} from 'Select/types';

const options: SelectOption[] = [
  {label: 'Andreev', value: 'davletshin', disabled: false, tooltip: 'Вот такой тултип'},
  {label: 'Glebov', value: 'glebov', disabled: false},
  {label: 'Sevostyanov', value: 'sevostyanov', disabled: false},
];

describe('SelectItems', () => {
  const props = {
    options,
    height: 200,
    clientWidth: 200,
    qa: 'select',
    value: [] as SelectMultipleValue,
  } as SelectItemsProps;

  it('single', async () => {
    render(<SelectItems {...props} />);

    expect(screen.getByDisplayValue(options[0].value)).toBeDefined();
    expect(screen.getByText(options[2].label)).toBeDefined();
    expect(screen.getByDisplayValue(options[2].value).getAttribute('type')).toBe('radio');
  });

  it('multiple', async () => {
    render(<SelectItems {...props} multiple />);

    expect(screen.getByDisplayValue(options[0].value)).toBeDefined();
    expect(screen.getByText(options[2].label)).toBeDefined();
    expect(screen.getByDisplayValue(options[2].value).getAttribute('type')).toBe('checkbox');
  });

  it('virtualize', async () => {
    const loadMore = vi.fn();

    const comp = render(<SelectItems {...props} loadMore={loadMore} virtualize />);

    expect(screen.getByDisplayValue(options[0].value)).toBeDefined();
    expect(screen.getByText(options[2].label)).toBeDefined();
    expect(screen.getByDisplayValue(options[2].value).getAttribute('type')).toBe('radio');
    expect(loadMore).toBeCalledTimes(1);

    comp.rerender(<SelectItems {...props} loadMore={loadMore} virtualize multiple />);

    expect(screen.getByDisplayValue(options[0].value)).toBeDefined();
    expect(screen.getByText(options[2].label)).toBeDefined();
    expect(screen.getByDisplayValue(options[2].value).getAttribute('type')).toBe('checkbox');
    expect(loadMore).toBeCalledTimes(2);
  });
});
