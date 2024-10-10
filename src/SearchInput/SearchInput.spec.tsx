import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, screen} from '@testing-library/react';

import {SearchInput} from '.';

describe('SearchInput', () => {
  it('SearchInput', async () => {
    const name = 'input';
    const value = 'input-value';
    const label = 'input-label';
    const onChange = vi.fn();

    render(<SearchInput required qa={name} name={name} value={value} label={label} onChange={onChange} />);

    expect(screen.getByTestId(name)).toBeDefined();
    expect(screen.getByDisplayValue(value)).toBeDefined();
    expect(screen.getByText(label)).toBeDefined();

    fireEvent.change(screen.getByTestId(name), {target: {value: 'new'}});

    expect(onChange).toBeCalled();
  });
});
