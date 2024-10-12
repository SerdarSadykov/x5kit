/** Устанавливает дату в начало дня.
 *
 *  Возвращает ту-же дату если она уже подходит под условие.
 */
export const startOfDay = (date: Date) => {
  if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0 && date.getMilliseconds() === 0) {
    return date;
  }

  const newDate = new Date(date.getTime());

  newDate.setHours(0, 0, 0, 0);

  return newDate;
};
