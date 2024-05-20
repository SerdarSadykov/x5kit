import VanillaCalendar from 'calendar';
import messages from 'calendar/scripts/helpers/getMessages';

const destroy = (self: VanillaCalendar) => {
	if (!self.isInit) throw new Error(messages.notInit);

	if (self.input) {
		self.HTMLElement?.parentElement?.removeChild(self.HTMLElement);
		self.HTMLInputElement?.replaceWith(self.HTMLOriginalElement);
		self.HTMLInputElement = undefined;
	} else {
		self.HTMLElement?.replaceWith(self.HTMLOriginalElement);
	}

	self.HTMLElement = self.HTMLOriginalElement;
	if (self.actions.destroyCalendar) self.actions.destroyCalendar(self);
};

export default destroy;
