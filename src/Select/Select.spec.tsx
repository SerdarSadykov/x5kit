import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, screen} from '@testing-library/react';

import {Select, SingleSelect} from './Select';

import {SelectFooter} from './SelectFooter';
import {SelectHeader} from './SelectHeader';

import type {SelectOption} from './types';

const getOptions = (i): SelectOption[] => [
  {
    label: `Andreev${i}`,
    value: `davletshin${i}`,
    disabled: false,
    icon: <div data-qa="icon" />,
    childs: [
      {
        label: 'child1',
        value: 'child1',
      },
    ],
  },
  {label: `Glebov${i}`, value: `glebov${i}`, disabled: false, icon: <div data-qa="icon" />},
  {label: `Sevostyanov${i}`, value: `sevostyanov${i}`, disabled: false},
];

describe('Select', () => {
  it('SingleSelect', async () => {
    const options = getOptions(1);
    const onChange = vi.fn();

    const comp = render(<SingleSelect name="select" options={options} onChange={onChange} value={undefined} />);

    expect(screen.getByTestId('select-input')).toBeDefined();
    expect(screen.getByTestId('select-input').getAttribute('value')).toBe('');

    fireEvent.focus(screen.getByTestId('select-input'));

    expect(screen.getByTestId('select-dropdown')).toBeDefined();

    comp.rerender(<SingleSelect options={options} onChange={onChange} value={options[0].value} />);

    expect(screen.getByTestId('select-input').getAttribute('value')).toBe(options[0].label);
  });

  it('Select', async () => {
    const options = getOptions(1);
    const onChange = vi.fn();

    const footer = <SelectFooter>footer</SelectFooter>;
    const header = <SelectHeader>header</SelectHeader>;

    const comp = render(
      <Select options={options} onChange={onChange} value={[]} components={{footer, hint: 'hint'}} />
    );

    expect(screen.getByTestId('select-input')).toBeDefined();
    expect(screen.getByTestId('select-input').getAttribute('value')).toBe('');

    fireEvent.focus(screen.getByTestId('select-input'));

    expect(screen.getByTestId('select-dropdown')).toBeDefined();
    expect(screen.getByText('footer')).toBeDefined();
    expect(screen.getByText('hint')).toBeDefined();

    comp.rerender(
      <Select
        multiple
        name="select"
        options={options}
        onChange={onChange}
        value={[options[0].value, options[2].value]}
        components={{header}}
      />
    );

    expect(screen.getByText('2')).toBeDefined();
    expect(screen.getByText('header')).toBeDefined();

    comp.rerender(<Select loading name="select" options={options} onChange={onChange} value={[]} />);
    expect(screen.getByTestId('loader')).toBeDefined();
  });
});
