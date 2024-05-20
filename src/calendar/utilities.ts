import { FormatDateString } from 'calendar/types';
import parseDatesOriginal from 'calendar/scripts/helpers/parseDates';
import getDateStringOriginal from './scripts/helpers/getDateString';
import getDateOriginal from './scripts/helpers/getDate';

export const parseDates = (dates: string[]) => parseDatesOriginal(dates);

export const getDateString = (date: Date) => getDateStringOriginal(date);

export const getDate = (date: FormatDateString) => getDateOriginal(date);
