import * as T from 'calendar/types';
import DefaultOptionsCalendar from 'calendar/scripts/default';
import init from 'calendar/scripts/init';
import update from 'calendar/scripts/update';
import destroy from 'calendar/scripts/destroy';
import show from 'calendar/scripts/show';
import hide from 'calendar/scripts/hide';
import messages from 'calendar/scripts/helpers/getMessages';

export default class VanillaCalendar extends DefaultOptionsCalendar implements T.IVanillaCalendar {
	constructor(selector: HTMLElement, options?: Partial<T.IOptions>) {
		super();

		this.HTMLElement = selector;

		if (!this.HTMLElement) throw new Error(messages.notFoundSelector(selector));

		if (!options) return;

		const replaceProperties = <T extends object>(original: T, replacement: T) => {
			(Object.keys(replacement) as Array<keyof T>).forEach((key) => {
				if (typeof original[key] === 'object' && typeof replacement[key] === 'object' && !(replacement[key] instanceof Date)) {
					replaceProperties(original[key] as object, replacement[key] as object);
				} else {
					original[key] = replacement[key];
				}
			});
		};
		replaceProperties(this, options);
	}

	init = () => init(this)

	update = (reset?: T.IReset) => update(this, reset);

	destroy = () => destroy(this);

	show = () => show(this);

	hide = () => hide(this);
}
