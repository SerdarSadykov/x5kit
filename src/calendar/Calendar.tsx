import {createContext, useEffect, useState} from 'react';
// import clsx from 'clsx';
// import { defaultDateFormat } from '@x5-react-uikit/core'

import {Day, Month, format, startOfDay} from 'date-fns';
import {ru} from 'date-fns/locale';

import Block from './Block';

// import {
//   createBlock,
//   generateDays,
//   normalizeChangedDate,
//   addFreezedDateToDisabledDates,
//   normalizeViewDate,
//   getMinDate,
//   getMaxDate,
// } from './helpers';
// import { getDateString } from '../Datepicker/helpers'

import {RequiredQA, getQAAttribute} from 'common';
import {SpaceTokenName, colors, shadows, spaces, theme, typography} from 'theme';

import {DropdownItem} from './Dropdown';
import {CalendarContextProps, CalendarProps} from './types';

export const CalendarContext = createContext<CalendarContextProps>({} as any);
import styled from '@emotion/styled';

export const Container = styled.div`
  padding: ${theme.spaces.x8}px;
  background: ${colors.white};
  box-shadow: ${shadows.medium};
  border-radius: ${spaces.x4}px;
  box-sizing: 'border-box';
  font-family: ${typography.base.fontFamily};
  font-size: ${spaces.x8}px;
`;

const CalendarComponent: React.FC<RequiredQA> = ({qa}) => {
  const getQA = getQAAttribute(qa);

  // const normalizedMinDate = getMinDate(minDate, maxDate, dateFormat);
  // const normalizedMaxDate = getMaxDate(minDate, maxDate, dateFormat);

  // const disabledDates = addFreezedDateToDisabledDates({
  //   freezeRange,
  //   date,
  //   dateFormat,
  //   maxDate: normalizedMaxDate,
  //   minDate: normalizedMinDate,
  //   disabledDates: disabledDatesFromProps,
  // });

  // const [hoverDate, setHoverDate] = useState('');
  // const [viewDate, updateViewDate] = useState(viewDateFromProps);
  // const normalizedViewDate = normalizeViewDate({
  //   viewDate,
  //   dateFormat,
  //   minDate: normalizedMinDate,
  //   maxDate: normalizedMaxDate,
  // });

  // const nextViewDate = normalizedViewDate.month(normalizedViewDate.month() + 1);
  // const [blockElements, updateBlockElements] =
  // useState();
  // createBlock(
  //   generateDays({
  //     date: normalizedViewDate,
  //     minDate: normalizedMinDate,
  //     maxDate: normalizedMaxDate,
  //     dateFormat,
  //     hideOtherMonthDays: long,
  //   }),
  // ),

  // const onChangeDate = value => {
  // const newDate = normalizeChangedDate(value, date, dateFormat, freezeRange)
  // onChange(Array.isArray(newDate) ? newDate.map((item) => (item ? item.format(dateFormat) : '')) : value, newDate)
  // };

  // const onChangeViewDate = (value, unit) => {
  // let newDate = dayjs(value, dateFormat)
  // if (unit === 'year') {
  //   newDate = newDate.month(normalizedViewDate.month())
  // }
  // newDate = normalizeViewDate({
  //   viewDate: newDate,
  //   dateFormat,
  //   minDate: normalizedMinDate,
  //   maxDate: normalizedMaxDate,
  // })
  // if (onChangeViewDateFromProps) {
  //   onChangeViewDateFromProps(newDate.format(dateFormat), newDate)
  // }
  // updateViewDate(newDate)
  // updateBlockElements(
  //   createBlock(
  //     generateDays({
  //       date: newDate,
  //       minDate: normalizedMinDate,
  //       maxDate: normalizedMaxDate,
  //       dateFormat,
  //       hideOtherMonthDays: long,
  //     }),
  //   ),
  // )
  // };

  /*
  //  * Меняем viewDate, если поменялся date
  //  * Это нужно когда календарь открыт и мы вводим дату вручную в Datepicker
  //  * */

  // useEffect(() => {
  //   if (changeViewDateOnChangeDate) {
  //     const actualDate = Array.isArray(date) ? date[long ? 0 : 1] : date

  //     if (actualDate) {
  //       onChangeViewDate(actualDate, '')
  //     }
  //   }
  //   /* eslint-disable */
  // }, [changeViewDateOnChangeDate, getDateString(date, dateFormat)])

  return (
    <Container data-qa={getQA()}>
      <Block qa={getQA('block-1')} />
      {/* 
      {long && (
        <Block
          hoverDate={hoverDate}
          onChangeHoverDate={setHoverDate}
          className={classes.offsetBlock}
          dateFormat={dateFormat}
          viewDate={nextViewDate}
          minDate={normalizedMinDate}
          maxDate={normalizedMaxDate}
          date={date}
          onChangeViewDate={onChangeViewDate}
          onChangeDate={onChangeDate}
          long={long}
          hideArrow="left"
          disabledDates={disabledDates}
          qa={getQA('block-2')}
          freezeRange={freezeRange}
          elements={createBlock(
            generateDays({
              date: nextViewDate,
              minDate: normalizedMinDate,
              maxDate: normalizedMaxDate,
              dateFormat,
              hideOtherMonthDays: long,
            }),
          )}
        />
      )} */}
    </Container>
  );
};

export const Calendar: React.FC<CalendarProps> = ({qa, ...props}) => {
  const locale = props.locale ?? ru;

  const value = props.value ?? [null, null];

  const [viewDate, setViewDate] = useState<Date>(() => startOfDay(props.viewDate?.getTime() ?? new Date()));

  const onChangeViewDate: CalendarProps['onChangeViewDate'] = newViewDate => {
    setViewDate(newViewDate);
    props.onChangeViewDate?.(newViewDate);
  };

  useEffect(() => {
    if (!props.viewDate) {
      return;
    }

    setViewDate(startOfDay(props.viewDate));
  }, [props.viewDate]);

  const years: DropdownItem[] = [];
  const months: DropdownItem[] = [];
  const currentYear = viewDate.getFullYear();
  const minYear = props.minDate ? props.minDate.getFullYear() : currentYear - 5;
  const maxYear = props.maxDate ? props.maxDate.getFullYear() : currentYear + 10;

  for (let i = minYear; i <= maxYear; i++) {
    years.push({
      name: String(i),
      value: i,
      disabled: false,
    });
  }

  for (let i = 0; i < 12; i++) {
    months.push({
      name: locale.localize.month(i as Month),
      value: i,
      disabled: false,
    });
  }

  const weekStartsOn = props.weekStartsOn ?? 1;
  const weekDays: Day[] = [0, 1, 2, 3, 4, 5, 6];

  weekDays.push(...weekDays.splice(0, weekStartsOn));

  const context: CalendarContextProps = {
    ...props,
    value,
    viewDate,
    years,
    weekDays,
    months,
    weekStartsOn,
    locale,
    onChangeViewDate,
  };

  return (
    <CalendarContext.Provider value={context}>
      <CalendarComponent qa={qa ?? 'calendar'} />
    </CalendarContext.Provider>
  );
};
