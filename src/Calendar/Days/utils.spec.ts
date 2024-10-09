/* eslint-disable  @typescript-eslint/no-explicit-any */

import {expect, it, describe} from 'vitest';

import {CalendarFreezeRange, CalendarMode} from 'Calendar/types';

import {getNewHoverDate, getNewRange} from './utils';

import type {CalendarContextProps} from 'Calendar/types';

describe('getNewRange', () => {
  it('range', () => {
    const date = new Date('2020-02-20T00:00:00Z');

    const context = {
      mode: CalendarMode.single,
      value: [new Date('2020-02-19T00:00:00Z'), undefined],
    } as any as CalendarContextProps;

    let range = getNewRange(date, context);

    expect(range[0]).toBe(date);
    expect(range[1]).toBeUndefined();

    context.mode = CalendarMode.range;

    range = getNewRange(date, context);

    expect(range[0]).toBe(context.value[0]);
    expect(range[1]).toBe(date);

    context.value = [new Date('2020-02-19T00:00:00Z'), undefined];

    range = getNewRange(date, context);

    expect(range[0]).toBe(context.value[0]);
    expect(range[1]).toBe(date);

    context.value = [new Date('2020-02-19T00:00:00Z'), new Date('2020-02-22T00:00:00Z')];

    range = getNewRange(date, context);

    expect(range[0]).toBe(date);
    expect(range[1]).toBeUndefined();

    context.freezeRange = CalendarFreezeRange.start;

    range = getNewRange(date, context);

    expect(range[0]).toBe(context.value[0]);
    expect(range[1]).toBe(date);

    context.freezeRange = CalendarFreezeRange.end;

    range = getNewRange(date, context);

    expect(range[0]).toBe(date);
    expect(range[1]).toBe(context.value[1]);
  });
});

describe('getNewHoverDate', () => {
  it('hoverDate', () => {
    const date = new Date('2020-02-20T00:00:00Z');

    const context = {
      value: [undefined, undefined],
    } as any as CalendarContextProps;

    let hoverDate = getNewHoverDate(date, context);
    expect(hoverDate).toBe(date);

    context.value = [new Date('2020-02-22T00:00:00Z'), undefined];
    hoverDate = getNewHoverDate(date, context);
    expect(hoverDate).toBe(date);

    context.freezeRange = CalendarFreezeRange.start;
    hoverDate = getNewHoverDate(date, context);
    expect(hoverDate).toBeUndefined();

    context.freezeRange = CalendarFreezeRange.end;
    hoverDate = getNewHoverDate(date, context);
    expect(hoverDate).toBeDefined();

    context.value = [new Date('2020-02-22T00:00:00Z'), new Date('2020-02-26T00:00:00Z')];
    context.freezeRange = CalendarFreezeRange.end;

    hoverDate = getNewHoverDate(new Date('2020-02-18T00:00:00Z'), context);
    expect(hoverDate).toBeDefined();

    hoverDate = getNewHoverDate(new Date('2020-02-28T00:00:00Z'), context);
    expect(hoverDate).toBeUndefined();
  });
});
