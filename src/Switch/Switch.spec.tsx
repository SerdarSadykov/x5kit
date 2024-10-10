import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, screen} from '@testing-library/react';

import {Switch} from '.';

describe('Switch', () => {
  it('Switch', async () => {
    const name = 'input';
    const label = 'input-label';
    const onChange = vi.fn();

    const comp = render(<Switch required checked qa={name} name={name} label={label} onChange={onChange} />);

    expect(screen.getByTestId(name)).toBeDefined();
    expect(screen.getByText(label)).toBeDefined();

    fireEvent.click(screen.getByTestId(name));

    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][0].target.checked).toBeTruthy();

    comp.rerender(<Switch readOnly qa={name} name={name} label={label} onChange={onChange} />);

    fireEvent.click(screen.getByTestId(name));
    expect(onChange).toBeCalledTimes(1);

    comp.rerender(<Switch disabled qa={name} name={name} label={label} onChange={onChange} />);

    fireEvent.click(screen.getByTestId(name));
    expect(onChange).toBeCalledTimes(1);
  });
});
