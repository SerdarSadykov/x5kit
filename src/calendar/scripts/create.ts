import VanillaCalendar from 'calendar';
import getLocale from 'calendar/scripts/helpers/getLocale';
import visibilityArrows from 'calendar/scripts/methods/visibilityArrows';
import createDays from 'calendar/scripts/methods/createDays';
import createDOM from 'calendar/scripts/methods/createDOM';
import visibilityTitle from 'calendar/scripts/methods/visibilityTitle';
import createMonths from 'calendar/scripts/methods/createMonths';
import createTime from 'calendar/scripts/methods/createTime';
import createWeek from 'calendar/scripts/methods/createWeek';
import createYears from 'calendar/scripts/methods/createYears';
import changeTheme from 'calendar/scripts/methods/changeTheme';

const create = (self: VanillaCalendar) => {
	const types = {
		default: () => {
			createWeek(self);
			createDays(self);
		},
		multiple: () => {
			createWeek(self);
			createDays(self);
		},
		month: () => createMonths(self),
		year: () => createYears(self),
	};

	changeTheme(self);
	getLocale(self);
	createDOM(self);
	visibilityTitle(self);
	visibilityArrows(self);
	createTime(self);

	types[self.currentType]();
};

export default create;
