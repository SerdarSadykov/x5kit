import { FormatDateString } from 'calendar/types';
import getDateString from 'calendar/scripts/helpers/getDateString';
import getDate from 'calendar/scripts/helpers/getDate';

const parseDates = (dates: string[]): FormatDateString[] => dates.reduce((accumulator: FormatDateString[], date) => {
	if (date.match(/^(\d{4}-\d{2}-\d{2})$/g)) {
		accumulator.push(date as FormatDateString);
	} else {
		date.replace(/(\d{4}-\d{2}-\d{2}).*?(\d{4}-\d{2}-\d{2})/g, (_, startDateStr, endDateStr) => {
			const startDate = getDate(startDateStr);
			const endDate = getDate(endDateStr);
			const currentDate = new Date(startDate.getTime());

			for (currentDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
				accumulator.push(getDateString(currentDate));
			}
			return _;
		});
	}
	return accumulator;
}, []);

export default parseDates;
