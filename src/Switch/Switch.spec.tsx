import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, screen} from '@testing-library/react';

import {SizeTokenValue} from 'theme';

import {Switch} from '.';

describe('Switch', () => {
  it('Switch', async () => {
    const name = 'input';
    const label = 'input-label';
    const onChange = vi.fn();

    const comp = render(
      <Switch
        required
        error
        checked="halfOn"
        qa={name}
        name={name}
        label={label}
        size={SizeTokenValue.Small}
        onChange={onChange}
      />
    );

    expect(screen.getByTestId(name)).toBeDefined();
    expect(screen.getByText(label)).toBeDefined();

    fireEvent.click(screen.getByTestId(name));

    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][0].target.checked).toBeFalsy();

    fireEvent.keyDown(screen.getByTestId(`${name}-icon`), {code: 'Enter'});

    expect(onChange).toBeCalledTimes(2);

    comp.rerender(<Switch readOnly qa={name} name={name} label={label} onChange={onChange} />);

    fireEvent.click(screen.getByTestId(name));
    expect(onChange).toBeCalledTimes(2);

    comp.rerender(<Switch disabled checked qa={name} name={name} label={label} onChange={onChange} />);

    fireEvent.click(screen.getByTestId(name));
    expect(onChange).toBeCalledTimes(2);

    comp.rerender(<Switch disabled qa={name} name={name} label={label} onChange={onChange} />);

    fireEvent.click(screen.getByTestId(name));
    expect(onChange).toBeCalledTimes(2);

    comp.rerender(<Switch checked qa={name} name={name} label={label} onChange={onChange} />);

    fireEvent.click(screen.getByTestId(name));
    expect(onChange).toBeCalledTimes(3);

    comp.rerender(<Switch qa={name} name={name} label={label} onChange={onChange} />);

    fireEvent.click(screen.getByTestId(name));
    expect(onChange).toBeCalledTimes(4);

    fireEvent.click(screen.getByTestId(`${name}-label`));
    expect(onChange).toBeCalledTimes(5);

    comp.rerender(<Switch qa={name} name={name} onChange={onChange} />);
    expect(screen.queryByTestId(`${name}-label`)).toBeNull();
  });
});
