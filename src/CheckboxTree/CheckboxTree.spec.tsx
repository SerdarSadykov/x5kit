import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, screen} from '@testing-library/react';

import {CheckboxTree} from '.';

import type {CheckboxTreeOption} from '.';

const options: CheckboxTreeOption[] = [
  {
    label: 'opt1',
    value: 'opt1-value',
    qa: 'opt1',

    childs: [
      {
        label: 'sub1',
        value: 'sub1-value',
        qa: 'sub1',
        childs: [
          {
            label: 'subsub1',
            value: 'subsub1-value',
            qa: 'subsub1',
          },
        ],
      },
      {
        label: 'sub2',
        value: 'sub2-value',
        qa: 'sub2',
      },
    ],
  },
  {
    label: 'opt2',
    value: 'opt2-value',
  },
];

describe('CheckboxTree', () => {
  it('CheckboxTree', async () => {
    const name = 'input';
    const onChange = vi.fn();

    const comp = render(<CheckboxTree value={['sub1', 'subsub1']} name={name} onChange={onChange} options={options} />);

    expect(screen.getByTestId('checkbox-tree')).toBeDefined();
    expect(screen.getByTestId('opt1')).toBeDefined();

    expect(screen.queryByTestId('sub1')).toBeNull();

    expect(screen.findByTestId('opt1-toggle')).toBeDefined();

    fireEvent.click(screen.getByTestId('opt1-toggle'));

    expect(screen.getByTestId('sub1')).toBeDefined();

    fireEvent.click(screen.getByTestId('sub1-toggle'));

    expect(screen.getByTestId('subsub1')).toBeDefined();
    // expect(onChange).toBeCalled();
    // expect(onChange.mock.calls[0][0].target.checked).toBeTruthy();
  });
});
