import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, screen, waitFor} from '@testing-library/react';

import {Datepicker, RangeDatepicker} from '.';

import type {RangeCalendarValue} from 'Calendar';

describe('Datepicker', () => {
  it('Datepicker', async () => {
    const name = 'input';
    const label = 'input-label';
    const onChange = vi.fn();

    const value = new Date('2020-02-01T00:00:00Z');

    render(<Datepicker required name={name} value={value} label={label} onChange={onChange} />);

    expect(screen.getByTestId('datepicker')).toBeDefined();
    expect(screen.getByTestId('datepicker-value').textContent).toBe('01.02.2020');
    expect(screen.getByText(label)).toBeDefined();
    expect(screen.queryByTestId('calendar')).toBeNull();

    fireEvent.click(screen.getByTestId('datepicker-toggle'));

    expect(screen.getByTestId('calendar')).toBeDefined();
    expect(screen.getByTestId('calendar-block-0-days-1:isViewMonth:isSelected')).toBeDefined();

    fireEvent.click(screen.getByTestId('calendar-block-0-days-2:isViewMonth'));

    await waitFor(() => {
      expect(screen.queryByTestId('calendar')).toBeNull();
    });

    expect(onChange).toBeCalledWith(new Date('2020-02-02T00:00:00Z'));
  });

  it('RangeDatepicker', async () => {
    const name = 'input';
    const label = 'input-label';
    const onChange = vi.fn();

    const value: RangeCalendarValue = [new Date('2020-02-01T00:00:00Z'), new Date('2020-02-05T00:00:00Z')];

    render(<RangeDatepicker required name={name} value={value} label={label} onChange={onChange} />);

    expect(screen.getByTestId('datepicker')).toBeDefined();
    expect(screen.getByTestId('datepicker-value').textContent).toBe('01.02.2020 — 05.02.2020');
    expect(screen.getByText(label)).toBeDefined();
    expect(screen.queryByTestId('calendar')).toBeNull();

    fireEvent.click(screen.getByTestId('datepicker-toggle'));

    expect(screen.getByTestId('calendar')).toBeDefined();
    expect(screen.getByTestId('calendar-block-0-days-1:isViewMonth:isRangeStart')).toBeDefined();
    expect(screen.getByTestId('calendar-block-0-days-4:isViewMonth:isRangeIn')).toBeDefined();
    expect(screen.getByTestId('calendar-block-0-days-5:isViewMonth:isRangeEnd')).toBeDefined();

    await fireEvent.click(screen.getByTestId('calendar-block-0-days-2:isViewMonth:isRangeIn'));

    expect(onChange).toBeCalledWith([new Date('2020-02-02T00:00:00Z'), undefined]);
  });
});
