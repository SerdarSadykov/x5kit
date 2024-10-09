import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, screen} from '@testing-library/react';

import {Input} from '.';

describe('Input', () => {
  it('Input', async () => {
    const name = 'input';
    const value = 'input-value';
    const label = 'input-label';
    const onChange = vi.fn();

    render(<Input qa={name} name={name} value={value} label={label} onChange={onChange} />);

    expect(screen.getByTestId(name)).toBeDefined();
    expect(screen.getByDisplayValue(value)).toBeDefined();
    expect(screen.getByText(label)).toBeDefined();

    fireEvent.change(screen.getByTestId(name), {target: {value: 'new'}});

    expect(onChange).toBeCalled();
  });
});
