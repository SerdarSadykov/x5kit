import dayjs, { Dayjs } from 'dayjs'
import { CalendarProps, CalendarDisabledDateInput, CalendarDisabledDateOutput } from '../types'
import { CalendarDay, CalendarDayState } from '../Day/types'
import { CalendarBlockProps } from './types'
import { freezeRangeValues } from '../types'

export function normalizeDisabledDates(
  dates: CalendarDisabledDateInput[],
  dateFormat: CalendarProps['dateFormat'],
): CalendarDisabledDateOutput[] {
  return dates
    .filter((item) => !!item)
    .map((item) => {
      const isObject = typeof item === 'object'
      const normalizedItem = (isObject ? item : { value: item }) as CalendarDisabledDateOutput

      if (typeof normalizedItem.value === 'number') {
        return normalizedItem
      }

      const { value } = normalizedItem as unknown as { value: string }
      normalizedItem.value =
        value.length > 10
          ? value.split(' ').map((item) => setToStartDay(item, dateFormat))
          : setToStartDay(value, dateFormat)

      return normalizedItem
    })
}

export function isDisabledDate(value: CalendarDisabledDateOutput['value'], date: Dayjs): boolean {
  if (typeof value === 'number') {
    return value === date.day()
  }

  return Array.isArray(value) ? +date >= +value[0] && +date <= +value[1] : +value === +date
}

export function findDisabledDate(
  disabledDates: CalendarDisabledDateInput[] = [],
  dateFormat: CalendarProps['dateFormat'],
  date: Dayjs,
): { isDisabled: boolean; tooltip: string } {
  const result = { isDisabled: false, tooltip: '' }

  normalizeDisabledDates(disabledDates, dateFormat).forEach((item) => {
    if (isDisabledDate(item.value, date)) {
      result.isDisabled = true
      result.tooltip = item.tooltip
    }
  })

  return result
}

export function isOutOfLimit(minDate: Dayjs, maxDate: Dayjs, date: Dayjs): boolean {
  return +date > +maxDate || +date < +minDate
}

export function setToStartDay(date: CalendarDay, dateFormat: CalendarProps['dateFormat']): Dayjs {
  return dayjs(date, typeof date === 'string' && dateFormat).startOf('day')
}

// eslint-disable-next-line sonarjs/cognitive-complexity
// export function getDayStates({
//   day,
//   date,
//   viewDate,
//   minDate,
//   maxDate,
//   dateFormat,
//   isDisabled,
//   hoverDate,
//   freezeRange,
// }: Pick<CalendarProps, 'date' | 'viewDate' | 'dateFormat' | 'freezeRange'> &
//   Pick<CalendarBlockProps, 'minDate' | 'maxDate'> & {
//     day: string
//     isDisabled: boolean
//     hoverDate: string
//   }): CalendarDayState[] {
//   const states = []
//   const isPeriod = Array.isArray(date)

//   const normalizedViewDate = setToStartDay(viewDate, dateFormat)
//   const normalizedDay = setToStartDay(day, dateFormat)
//   const normalizedHoverDate = setToStartDay(hoverDate, dateFormat)

//   const isDisabledDay = isOutOfLimit(minDate, maxDate, normalizedDay) || isDisabled
//   const [startDate, endDate] = Array.isArray(date)
//     ? date.map((item) => (item ? setToStartDay(item, dateFormat) : ''))
//     : [date && setToStartDay(date, dateFormat)]

//   // Previous month or next month
//   if (normalizedDay.month() !== normalizedViewDate.month()) {
//     states.push(isDisabledDay ? 'disabled' : 'otherMonthDay')
//     return states
//   }

//   // Today
//   if (normalizedDay.format(dateFormat) === dayjs().format(dateFormat)) {
//     states.push('today')
//   }

//   // Disabled day
//   if (isDisabledDay) {
//     states.push('disabled')
//   }

//   // Period
//   if (isPeriod && (startDate || freezeRange === freezeRangeValues.end)) {
//     // Start date and end date is equal
//     if (+startDate === +endDate && +normalizedDay === +startDate && !isDisabledDay) {
//       states.push('selected')
//       // Select start
//     } else if (+normalizedDay === +startDate && !isDisabledDay) {
//       states.push('selected', 'selectedStart')
//       // Select end
//     } else if (+normalizedDay === +endDate && !isDisabledDay) {
//       states.push('selected', 'selectedEnd')
//       // Between start date and end date
//     } else if (endDate && startDate && +normalizedDay > +startDate && +normalizedDay < +endDate) {
//       states.push('betweenPeriod')
//     }
//     // Select day for non-period
//   } else if (+normalizedDay === +startDate && !isDisabledDay) {
//     states.push('selected')
//   }

//   // Hover
//   if (startDate && +normalizedDay <= +normalizedHoverDate && +normalizedDay > +startDate) {
//     states.push('betweenPeriod')
//   }

//   return states
// }
