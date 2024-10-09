import {act} from 'react';
import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, renderHook, screen} from '@testing-library/react';

import {Calendar} from './Calendar';
import {useCalendar} from './hook';
import {CalendarMode} from './types';

import type {BaseCalendarValue, CalendarProps} from './types';

describe('useCalendar', () => {
  it('viewDate', () => {
    const viewDate = new Date('2020-02-28T00:00:00');

    const onChange = vi.fn();
    const value: BaseCalendarValue = [undefined, undefined];

    const {result} = renderHook(() => useCalendar({mode: CalendarMode.single, viewDate, onChange, value}));

    expect(result.current.viewDate).toEqual(viewDate);
    expect(result.current.value).toEqual(value);

    const newViewDate = new Date('2020-01-01T:00:00:00');
    const newValue: BaseCalendarValue = [new Date('2020-01-01'), undefined];

    act(() => result.current.onChangeViewDate(newViewDate));

    act(() => result.current.onChange(newValue));

    expect(result.current.viewDate).toEqual(newViewDate);
    expect(onChange).toBeCalledWith(newValue);
  });
});

describe('Calendar', () => {
  it('viewDate', () => {
    const viewDate = new Date('2020-02-28');

    render(<Calendar viewDate={viewDate} onChange={vi.fn()} value={undefined} />);

    expect(screen.getByTestId('calendar-block-0-header-month').querySelector('button')?.textContent).toBe('февраль');
    expect(screen.getByTestId('calendar-block-0-header-year').querySelector('button')?.textContent).toBe('2020');
  });

  it('viewDateMin', () => {
    const viewDate = new Date('2020-02-28');
    const minDate = new Date('2020-03-02');

    render(<Calendar viewDate={viewDate} onChange={vi.fn()} value={undefined} minDate={minDate} />);

    expect(screen.getByTestId('calendar-block-0-header-month').querySelector('button')?.textContent).toBe('март');
  });

  it('viewDateMax', () => {
    const viewDate = new Date('2020-03-28');
    const maxDate = new Date('2020-02-27');

    render(<Calendar viewDate={viewDate} onChange={vi.fn()} value={undefined} maxDate={maxDate} />);

    expect(screen.getByTestId('calendar-block-0-header-month').querySelector('button')?.textContent).toBe('февраль');
  });

  it('arrows', () => {
    const props: CalendarProps = {
      viewDate: new Date('2020-03-28'),
      onChange: vi.fn(),
      value: undefined,
    };

    const comp = render(<Calendar {...props} />);

    fireEvent.click(screen.getByTestId('calendar-block-0-header-previous'));

    expect(screen.getByTestId('calendar-block-0-header-month').querySelector('button')?.textContent).toBe('февраль');

    props.minDate = new Date('2020-03-01');
    props.maxDate = new Date('2020-04-28');

    comp.rerender(<Calendar {...props} />);

    expect(screen.getByTestId('calendar-block-0-header-previous').hasAttribute('disabled')).toBeTruthy();
    expect(screen.getByTestId('calendar-block-0-header-next').hasAttribute('disabled')).toBeFalsy();

    fireEvent.click(screen.getByTestId('calendar-block-0-header-next'));

    expect(screen.getByTestId('calendar-block-0-header-next').hasAttribute('disabled')).toBeTruthy();
  });

  it('value', () => {
    const props: CalendarProps = {
      viewDate: new Date('2020-03-28'),
      onChange: vi.fn(),
      value: new Date('2020-03-03'),
      disabledDates: date => date.getDate() === 12,
    };

    render(<Calendar {...props} />);

    expect(screen.getByTestId('calendar-block-0-days-3:isViewMonth:isSelected')).toBeDefined();
    expect(screen.getByTestId('calendar-block-0-days-12:isViewMonth:isDisabled')).toBeDefined();

    fireEvent.click(screen.getByTestId('calendar-block-0-days-12:isViewMonth:isDisabled'));

    expect(screen.getByTestId('calendar-block-0-days-3:isViewMonth:isSelected')).toBeDefined();

    fireEvent.click(screen.getByTestId('calendar-block-0-days-4:isViewMonth'));

    expect(props.onChange).toBeCalledWith(new Date('2020-03-04T00:00:00'));
  });
});
