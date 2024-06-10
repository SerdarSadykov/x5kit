import dayjs, { Dayjs } from 'dayjs'
import { formatDate } from '../Datepicker/helpers'
import { setToStartDay } from './Block/helpers'
import { CalendarProps, freezeRangeValues } from './types'
import { CalendarDay } from './Day/types'

const today = new Date()
const yearsLimit = 5

export function addFreezedDateToDisabledDates({
  disabledDates,
  freezeRange,
  minDate,
  maxDate,
  date,
  dateFormat,
}: Pick<CalendarProps, 'dateFormat' | 'disabledDates' | 'freezeRange' | 'date'> & {
  minDate: Dayjs
  maxDate: Dayjs
}): CalendarProps['disabledDates'] {
  const isRange = Array.isArray(date)

  if (!isRange) return disabledDates
  const dates = formatDate(date, dateFormat)

  if (freezeRange === freezeRangeValues.start) {
    return disabledDates.concat([
      `${minDate.format(dateFormat)} ${formatDate(
        dayjs(dates[0], typeof dates[0] === 'string' && dateFormat).subtract(1, 'days'),
        dateFormat,
      )}`,
    ])
  }

  if (freezeRange === freezeRangeValues.end) {
    return disabledDates.concat([
      `${formatDate(
        dayjs(dates[1], typeof dates[1] === 'string' && dateFormat).add(1, 'days'),
        dateFormat,
      )} ${maxDate.format(dateFormat)}`,
    ])
  }

  return disabledDates
}

export function limitDate(date: CalendarDay, method: 'add' | 'subtract'): Dayjs {
  return dayjs(date)[method](yearsLimit, 'years')
}

export function getMinDate(
  minDate: CalendarProps['minDate'],
  maxDate: CalendarProps['maxDate'],
  dateFormat: CalendarProps['dateFormat'],
): Dayjs {
  return setToStartDay(
    minDate ||
      limitDate(maxDate || today, 'subtract')
        .month(0)
        .startOf('month'),
    dateFormat,
  )
}

export function getMaxDate(
  minDate: CalendarProps['minDate'],
  maxDate: CalendarProps['maxDate'],
  dateFormat: CalendarProps['dateFormat'],
): Dayjs {
  return setToStartDay(
    maxDate ||
      limitDate(minDate || today, 'add')
        .month(11)
        .endOf('month'),
    dateFormat,
  )
}

export function normalizeChangedDate(
  value: string,
  date: CalendarProps['date'],
  dateFormat: CalendarProps['dateFormat'],
  freezeRange: CalendarProps['freezeRange'],
): Dayjs | Dayjs[] {
  const newDate = dayjs(value, dateFormat)

  if (Array.isArray(date)) {
    if (freezeRange === freezeRangeValues.start) {
      return [dayjs(date[0], typeof date[0] === 'string' && dateFormat), newDate]
    }

    if (freezeRange === freezeRangeValues.end) {
      return [newDate, dayjs(date[1], typeof date[1] === 'string' && dateFormat)]
    }

    const previousDate = dayjs(date[0], typeof date[0] === 'string' && dateFormat)
    return date.length === 1 ? [previousDate, newDate].sort((a, b) => +a - +b) : [newDate]
  }

  return newDate
}

export function normalizeViewDate({
  viewDate,
  minDate,
  maxDate,
  dateFormat,
}: Pick<CalendarProps, 'dateFormat' | 'viewDate'> & { minDate: Dayjs; maxDate: Dayjs }): Dayjs {
  const normalizedViewDate = dayjs(viewDate, typeof viewDate === 'string' && dateFormat)

  const minMonth = minDate.month()
  const maxMonth = maxDate.month()
  const minYear = minDate.year()
  const maxYear = maxDate.year()

  const currentMonth = normalizedViewDate.month()
  const currentYear = normalizedViewDate.year()

  if (currentMonth < minMonth && currentYear === minYear) {
    return normalizedViewDate.month(minMonth)
  }

  if (currentMonth > maxMonth && currentYear === maxYear) {
    return normalizedViewDate.month(maxMonth)
  }

  return normalizedViewDate
}

const weekDays = 6
export function generateDays({
  date,
  minDate,
  maxDate,
  dateFormat,
  hideOtherMonthDays,
}: Pick<CalendarProps, 'dateFormat'> & {
  date: Dayjs
  minDate: Dayjs
  maxDate: Dayjs
  hideOtherMonthDays: boolean
}): string[] {
  const previousMonthDays = []
  const monthDays = []
  const nextMonthDays = []

  const daysInMonth = date.daysInMonth()
  const startDate = date.startOf('month')
  let startWeekDay = date.startOf('month').day()
  let endWeekDay = date.endOf('month').day()

  startWeekDay = startWeekDay === 0 ? weekDays : startWeekDay - 1
  endWeekDay = endWeekDay === 0 ? weekDays : endWeekDay - 1

  // Generate previous month
  for (let i = startWeekDay; i > 0; i--) {
    previousMonthDays.push(startDate.subtract(i, 'day').format(dateFormat))
  }

  // Generate next month
  const nextMonth = startDate.add(1, 'month')
  for (let i = endWeekDay, count = 0; i < weekDays; i++) {
    nextMonthDays.push(nextMonth.add(count++, 'day').format(dateFormat))
  }

  // Generate current month
  for (let i = 0; i < daysInMonth; i++) {
    monthDays.push(startDate.add(i, 'day').format(dateFormat))
  }

  const isHide = (unit: string) => (date: string) => {
    if (hideOtherMonthDays) return null
    const normalizedDate = dayjs(date, dateFormat)
    return unit === 'min' ? +normalizedDate > +minDate && date : +normalizedDate < +maxDate && date
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return [...previousMonthDays.map(isHide('min')), ...monthDays, ...nextMonthDays.map(isHide('max'))]
}

export function createBlock(days: string[]): string[][] {
  const block = []
  const size = weekDays + 1

  for (let i = 0; i < days.length; i += size) {
    block.push(days.slice(i, i + size))
  }

  return block
}

export const getQaAttribute =
  (rootName: string) =>
  (subName?: string, state?: string | string[]): string => {
    if (!rootName) return null
    let endName = ''

    if (typeof state === 'string') endName = state

    if (Array.isArray(state)) {
      endName = state.filter((s) => s).join(':')
    }

    subName = subName ? `-${subName}` : ''
    return `${rootName}${subName}${!endName.length ? '' : ':' + endName}`
  }