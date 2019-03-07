export const optionsDefault = {
	mondayFirst: true,
	format: 'dd-mm-yyyy',
	minDate: new Date(0, 0),
	maxDate: new Date(9999, 11, 31),
	weekDayLabels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
	shortMonthLabels: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
	singleMonthLabels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
	todayButton: true,
	todayButtonLabel: 'Сегодня',
	clearButton: true,
	clearButtonLabel: 'Очистить',
};

/**
     * Returns date with time 00:00:00.0000
     *
     * @param   {Date} [dt] Date object
     * @returns {Date} new Date
     */
export function clearDate(dt) {
	dt = dt || new Date();
	return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
}

export function hash() {
	function s3() {
		return Math.random().toString(16).substr(2, 3);
	}
	return s3() + '-' + s3();
}