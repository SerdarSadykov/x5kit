import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, screen} from '@testing-library/react';

import {Checkbox} from '.';

describe('Checkbox', () => {
  it('Checkbox', async () => {
    const name = 'input';
    const label = 'input-label';
    const onChange = vi.fn();

    const comp = render(<Checkbox required checked qa={name} name={name} label={label} onChange={onChange} />);

    expect(screen.getByTestId(name)).toBeDefined();
    expect(screen.getByText(label)).toBeDefined();

    fireEvent.click(screen.getByTestId(name));

    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][0].target.checked).toBeTruthy();

    comp.rerender(<Checkbox readOnly qa={name} name={name} label={label} onChange={onChange} />);

    fireEvent.click(screen.getByTestId(name));
    expect(onChange).toBeCalledTimes(1);

    comp.rerender(<Checkbox disabled qa={name} name={name} label={label} onChange={onChange} />);

    fireEvent.click(screen.getByTestId(name));
    expect(onChange).toBeCalledTimes(1);
  });
});
