import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, screen} from '@testing-library/react';

import {Radio} from '.';

describe('Radio', () => {
  it('Radio', async () => {
    const name = 'input';
    const label = 'input-label';
    const onChange = vi.fn();

    const comp = render(<Radio required value="radio" name={name} label={label} onChange={onChange} />);

    expect(screen.getByTestId('radio')).toBeDefined();
    expect(screen.getByText(label)).toBeDefined();

    fireEvent.click(screen.getByTestId('radio'));

    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][0].target.checked).toBeTruthy();

    comp.rerender(<Radio readOnly qa={name} name={name} label={label} onChange={onChange} />);

    fireEvent.click(screen.getByTestId(name));
    expect(onChange).toBeCalledTimes(1);

    comp.rerender(<Radio disabled qa={name} name={name} label={label} onChange={onChange} />);

    fireEvent.click(screen.getByTestId(name));
    expect(onChange).toBeCalledTimes(1);
  });
});
