/* eslint-disable  @typescript-eslint/no-explicit-any */

import {expect, it, describe} from 'vitest';

import {CalendarMode} from 'Calendar/types';

import {getDayProps} from './utils';

import type {BlockContextProps} from 'Calendar/Block';
import type {CalendarContextProps} from 'Calendar/types';

describe('getDayProps', () => {
  it('dateProps', () => {
    const dayArgs = {
      context: {
        mode: CalendarMode.single,
        value: [new Date('2020-02-19T00:00:00Z')],
        hoverDate: undefined,
      } as any as CalendarContextProps,

      blockContext: {viewDate: new Date('2020-02-01T00:00:00Z')} as BlockContextProps,
      currentDateTime: new Date('2020-02-20:00:00:00Z').getTime(),
      date: new Date('2020-02-20:00:00:00Z'),
    };

    let dayProps = getDayProps(dayArgs);

    expect(dayProps.isSelected).toBeFalsy();
    expect(dayProps.isViewMonth).toBeTruthy();
    expect(dayProps.isToday).toBeTruthy();

    dayArgs.context.value = [new Date('2020-02-20:00:00:00Z'), undefined];

    dayProps = getDayProps(dayArgs);
    expect(dayProps.isSelected).toBeTruthy();

    dayArgs.context.mode = CalendarMode.range;
    dayArgs.context.value = [new Date('2020-02-16:00:00:00Z'), new Date('2020-02-24:00:00:00Z')];
    dayProps = getDayProps(dayArgs);

    expect(dayProps.isRangeIn).toBeTruthy();
  });
});
