import VanillaCalendar from 'calendar';
import setVariables from 'calendar/scripts/helpers/setVariables';
import handleInput from 'calendar/scripts/handles/handleInput';
import handleClick from 'calendar/scripts/handles/handleClick';
import create from 'calendar/scripts/create';

const init = (self: VanillaCalendar) => {
	self.HTMLOriginalElement = self.HTMLElement.cloneNode(true) as HTMLElement;
	self.isInit = true;

	if (self.input) {
		return handleInput(self);
	}

	setVariables(self);
	create(self);
	if (self.actions.initCalendar) self.actions.initCalendar(self);
	return handleClick(self);
};

export default init;
