import { IReset } from 'calendar/types';
import VanillaCalendar from 'calendar';
import messages from 'calendar/scripts/helpers/getMessages';
import reset from 'calendar/scripts/reset';

const update = (self: VanillaCalendar, {
	year,
	month,
	dates,
	holidays,
	time,
}: IReset = {}) => {
	if (!self.isInit) throw new Error(messages.notInit);

	reset(self, {
		year,
		month,
		dates,
		holidays,
		time,
	});
	if (self.actions.updateCalendar) self.actions.updateCalendar(self);
};

export default update;
