import { MouseEvent } from 'react'
import { Dayjs } from 'dayjs'

import { CalendarProps } from '../types'
import { QA } from '../../types'

export type CalendarDayState =
  | 'today'
  | 'selected'
  | 'selectedStart'
  | 'selectedEnd'
  | 'otherMonthDay'
  | 'betweenPeriod'
  | 'disabled'
  | 'hide'

export interface CalendarDayProps extends QA {
  value: string
  states: CalendarDayState[]
  onClick?: (event: MouseEvent<HTMLElement>) => void
  onMouseOver?: (event: MouseEvent<HTMLElement>) => void
  onMouseOut?: (event: MouseEvent<HTMLElement>) => void
  dateFormat?: CalendarProps['dateFormat']
  tooltip?: string
}
