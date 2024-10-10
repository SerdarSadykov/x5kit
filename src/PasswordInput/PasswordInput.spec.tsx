import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, screen} from '@testing-library/react';

import {PasswordInput} from '.';

describe('PasswordInput', () => {
  it('PasswordInput', async () => {
    const name = 'input';
    const value = 'input-value';
    const label = 'input-label';
    const onChange = vi.fn();

    render(<PasswordInput required name={name} value={value} label={label} onChange={onChange} />);

    expect(screen.getByTestId('password')).toBeDefined();
    expect(screen.getByTestId('password').getAttribute('type')).toBe('password');
    expect(screen.getByDisplayValue(value)).toBeDefined();
    expect(screen.getByText(label)).toBeDefined();

    fireEvent.click(screen.getByTestId('password-toggle'));

    expect(screen.getByTestId('password').getAttribute('type')).toBe('text');

    fireEvent.change(screen.getByTestId('password'), {target: {value: 'new'}});

    expect(onChange).toBeCalled();
  });
});
