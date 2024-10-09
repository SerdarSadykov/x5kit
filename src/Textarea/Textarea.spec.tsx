import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, screen} from '@testing-library/react';

import {Textarea} from '.';

describe('Textarea', () => {
  it('Textarea', async () => {
    const name = 'Textarea';
    const value = 'Textarea-value';
    const label = 'Textarea-label';
    const onChange = vi.fn();

    render(<Textarea qa={name} name={name} value={value} label={label} onChange={onChange} />);

    expect(screen.getByTestId(name)).toBeDefined();
    expect(screen.getByDisplayValue(value)).toBeDefined();
    expect(screen.getByText(label)).toBeDefined();

    fireEvent.change(screen.getByTestId(name), {target: {value: 'new'}});

    expect(onChange).toBeCalled();
  });
});
