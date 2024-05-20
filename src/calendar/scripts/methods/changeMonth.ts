import VanillaCalendar from 'calendar';
import getDateString from 'calendar/scripts/helpers/getDateString';
import getDate from 'calendar/scripts/helpers/getDate';
import visibilityArrows from 'calendar/scripts/methods/visibilityArrows';
import createDays from 'calendar/scripts/methods/createDays';
import visibilityTitle from 'calendar/scripts/methods/visibilityTitle';

const changeMonth = (self: VanillaCalendar, route: 'prev' | 'next') => {
	const jumpDate = getDate(getDateString(new Date(self.selectedYear, self.selectedMonth, 1)));

	const routeMap: Record<string, () => void> = {
		prev: () => jumpDate.setMonth(jumpDate.getMonth() - self.jumpMonths),
		next: () => jumpDate.setMonth(jumpDate.getMonth() + self.jumpMonths),
	};

	routeMap[route]();
	[self.selectedMonth, self.selectedYear] = [jumpDate.getMonth(), jumpDate.getFullYear()];

	visibilityTitle(self);
	visibilityArrows(self);
	createDays(self);
};

export default changeMonth;
