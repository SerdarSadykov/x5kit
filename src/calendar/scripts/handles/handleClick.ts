import VanillaCalendar from 'calendar';
import handleClickArrow from 'calendar/scripts/handles/handleClickArrow';
import handleClickWeekNumber from 'calendar/scripts/handles/handleClickWeekNumber';
import handleClickDay from 'calendar/scripts/handles/handleClickDay';
import handleClickMonthOrYear from 'calendar/scripts/handles/handleClickMonthOrYear';

const handleClick = (self: VanillaCalendar) => {
	const handle = (e: MouseEvent) => {
		handleClickArrow(self, e);
		handleClickWeekNumber(self, e);
		handleClickDay(self, e);
		handleClickMonthOrYear(self, e, 'month', {
			header: self.CSSClasses.month,
			item: self.CSSClasses.monthsMonth,
			column: self.CSSClasses.columnMonth,
		});
		handleClickMonthOrYear(self, e, 'year', {
			header: self.CSSClasses.year,
			item: self.CSSClasses.yearsYear,
			column: self.CSSClasses.columnYear,
		});
	};

	self.HTMLElement.addEventListener('click', handle);
	return () => self.HTMLElement.removeEventListener('click', handle);
};

export default handleClick;
