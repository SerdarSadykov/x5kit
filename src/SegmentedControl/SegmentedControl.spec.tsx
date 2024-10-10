import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, screen} from '@testing-library/react';

import {SegmentedControl} from '.';

import type {SegmentedControlOption} from '.';

const options: SegmentedControlOption[] = [
  {
    label: 'Один',
    value: '1',
    qa: 'one',
  },
  {
    label: 'Два',
    value: '2',
    disabled: true,
    qa: 'two-disabled',
  },
  {
    label: 'Три',
    value: '3',
    readOnly: true,
  },
  {
    label: 'Четыре',
    value: '4',
  },
  {
    label: 'Пять',
    value: '5',
  },
  {
    label: 'Шесть',
    value: '6',
  },
];

describe('SegmentedControl', () => {
  it('SegmentedControl', async () => {
    const onChange = vi.fn();

    render(<SegmentedControl value={undefined} onChange={onChange} options={options} />);

    expect(screen.getByTestId('segmented')).toBeDefined();

    fireEvent.click(screen.getByTestId('two-disabled'));

    expect(onChange).not.toBeCalledWith();

    fireEvent.click(screen.getByTestId('one'));
    expect(onChange).not.toBeCalledWith('one');
  });
});
