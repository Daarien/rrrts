import React from 'react';
import './style.scss';

import {
	optionsDefault,
	clearDate,
	hash,
} from './options';

export class DatePickerX extends React.Component {
	constructor(props) {
		super(props);
		this.options = {};
		this.date = new Date();
		this.mode = 2; // 2 - days, 1 - months, 0 - years
		this.uid = hash();

		this.state = {
			active: false,
			front: null,
			back: null,
			date: null
		};

		this.setDPXref = node => {
			this.DPX = node;
		};
		this.setInputRef = node => {
			this.input = node;
		};
		this.setCalendarRef = node => {
			this.calendar = node;
		};
		this.setRotateRef = node => {
			this.rotator = node;
		};
	}

	componentDidMount = () => {
		this.init(optionsDefault);
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { state, mode, calendar, rotator } = this;
		// появление календаря
		if (state.active & !prevState.active) {
			setTimeout(() => {
				const h = document.querySelector('.dpx-calendar').offsetHeight;
				const w = document.querySelector('.dpx-calendar').offsetWidth;
				calendar.setAttribute('style', `height:${h}px;width:${w}px;`);


				// calendar.classList.remove('to-top');
				const bcr = calendar.getBoundingClientRect();
				if (bcr.bottom > window.innerHeight && bcr.top + this.input.offsetHeight > calendar.offsetHeight) {
					calendar.classList.add('to-top');
					calendar.getBoundingClientRect().top < 0 && calendar.classList.remove('to-top');
				}

				calendar.classList.add('active');
			}, 0);
		}
		// изменение мода
		if (prevState.active & state.active) {
			setTimeout(() => {
				mode === 0 && rotator.classList.remove('rotate');
				mode === 1 && rotator.classList.add('rotate');
				mode === 2 && rotator.classList.remove('rotate');
			}, 0);
		}
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.outsideClickListener);
	}

	init = (initOptions) => {
		for (let i in optionsDefault) {
			this.options[i] = optionsDefault[i];
		}
		this.setOptions(initOptions);
	}

	// createCalendars calendar according to current mode
	createCalendar = (dt) => {
		const { mode } = this;
		// init min date and max date
		let dtMin = this.getMinDate(),
			dtMax = this.getMaxDate(),
			current = clearDate();

		// today button
		const today_disabled = current >= dtMin && current <= dtMax ? '' : ' dpx-disabled';
		const Today = () => {
			return this.options.todayButton
				? <span className={'dpx-item dpx-today' + today_disabled}
					onClick={this.handleTodayClick}>
					{this.options.todayButtonLabel}
				</span>
				: null;
		}

		// set min and max dates according to current mode
		if (mode < 2) {
			dtMin.setDate(1);
			dtMax.setDate(1);

			if (!mode) {
				dtMin.setMonth(0);
				dtMax.setMonth(0);
			}
		}
		dtMin = dtMin.getTime();
		dtMax = dtMax.getTime();

		// init date

		let date = clearDate(new Date((dt && parseInt(dt)) || this.date || Date.now()));
		if (date.getTime() < dtMin) {
			date = new Date(dtMin);
		} else if (date.getTime() > dtMax) {
			date = new Date(dtMax);
		}

		const setMonth = date.getMonth(),
			setYear = date.getFullYear(),
			zeroYear = Math.floor(setYear / 10) * 10;
		date = new Date(mode ? setYear : zeroYear, mode < 2 ? 0 : setMonth);

		// set title
		const title_content = mode
			? (mode === 2 ? this.options.singleMonthLabels[setMonth] + ' ' : '') + setYear
			: (zeroYear + ' - ' + (zeroYear + 9));
		const title_title = mode === 2 ? setYear : (zeroYear + ' - ' + (zeroYear + 9));
		const Title = () => {
			return <span title={title_title}
				dpxvalue={date.getTime()}
				className='dpx-title'
				onClick={this.handleTitleClick}>
				{title_content}
			</span>;
		}

		// prev and next arrows
		mode === 2
			? date.setMonth(setMonth - 1)
			: date.setFullYear(mode ? setYear - 1 : zeroYear - 10);
		const prevDate = new Date(date);
		const prev_disabled = prevDate.getTime() <= dtMin ? ' dpx-disabled' : '';
		const prev_title = mode
			? (mode === 2 ? this.options.singleMonthLabels[prevDate.getMonth()] + ' ' : '') + prevDate.getFullYear()
			: ((zeroYear - 10) + ' - ' + (zeroYear - 1));
		const ArrowPrev = () => {
			return <span className={'dpx-prev' + prev_disabled}
				dpxvalue={prevDate.getTime()}
				title={prev_title}
				onClick={this.handlePrevNextClick}>
				&#x276e;
					</span>;
		}

		mode === 2
			? date.setMonth(date.getMonth() + 2)
			: date.setFullYear(mode ? setYear + 1 : zeroYear + 20);
		const nextDate = new Date(date);
		const next_disabled = nextDate.getTime() > dtMax ? 'dpx-disabled' : '';
		const next_title = mode
			? (mode === 2 ? this.options.singleMonthLabels[nextDate.getMonth()] + ' ' : '') + nextDate.getFullYear()
			: ((zeroYear + 10) + ' - ' + (zeroYear + 19));
		const ArrowNext = () => {
			return <span
				className={'dpx-next' + next_disabled}
				title={next_title}
				dpxvalue={nextDate.getTime()}
				onClick={this.handlePrevNextClick}>
				&#x276f;
				</span>;
		}

		mode === 2 ? date.setMonth(date.getMonth() - 1) : date.setFullYear(mode ? setYear : zeroYear);

		// day of week titles
		const WeekDaysLabels = () => {
			return mode === 2
				? this.options.weekDayLabels.map((label, index) => {
					return <span key={label} className={`dpx-item dpx-weekday ${index > 4 ? 'dpx-weekend' : ''}`}>{label}</span>;
				})
				: []
		}

		// set starting date
		if (mode === 2) {
			let dayWeek = date.getDay();
			date.setDate(this.options.mondayFirst ? -(dayWeek ? dayWeek - 2 : 5) : -dayWeek + 1);
		} else {
			mode ? date.setMonth(date.getMonth() - 2) : date.setFullYear(zeroYear - 3);
		}

		// current and selected dates
		let //current  = clearDate(),
			selected = this.date;
		if (mode < 2) {
			if (selected) {
				selected = new Date(selected);
				selected.setDate(1);
				!mode && selected.setMonth(0);
				selected = selected.getTime();
			}

			current.setDate(1);
			!mode && current.setMonth(0);
		}
		current = current.getTime();

		// createCalendar calendar
		const getter = ['getFullYear', 'getMonth', 'getDate'][mode];
		const setter = ['setFullYear', 'setMonth', 'setDate'][mode];
		let i = mode === 2 ? 42 : 16;
		let days = [];
		for (; i--; date[setter](date[getter]() + 1)) {
			let classes = ['dpx-item'];
			let title = mode ? this.options.singleMonthLabels[date.getMonth()] + ' ' : '';
			mode === 2 && (title += date.getDate() + ', ');
			title += date.getFullYear();

			(mode ? (mode === 2 ? date.getMonth() !== setMonth : date.getFullYear() !== setYear) : (date.getFullYear() < zeroYear || date.getFullYear() > zeroYear + 9)) && classes.push('dpx-out');
			mode === 2 && (date.getDay() === 6 || date.getDay() === 0) && classes.push('dpx-weekend');
			date.getTime() === current && classes.push('dpx-current');
			date.getTime() === this.date.getTime() && classes.push('dpx-selected');
			(date.getTime() < dtMin || date.getTime() > dtMax) && classes.push('dpx-disabled');

			const content = mode ? (mode === 2 ? date.getDate() : this.options.shortMonthLabels[date.getMonth()]) : date.getFullYear();

			const Day = <span key={i} className={classes.join(' ')} title={title} dpxvalue={date.getTime()} onClick={this.handleDayClick}>{content}</span>;
			days.push(Day);
		}

		const Days = () => days;

		const Calendar = () => <div className='dpx-calendar' data-dpx-type={['year', 'month', 'day'][mode]}>
			<div className='dpx-title-box'>
				<ArrowPrev /><Title /><ArrowNext />
			</div>
			<div className='dpx-content-box'>
				<WeekDaysLabels />
				<Days />
			</div>
			<div className='dpx-btns'>
				<Today />
				<span className='dpx-item dpx-clear' onClick={this.handleClearClick}>{this.options.clearButtonLabel}</span>
			</div>
		</div>;

		return <Calendar />;
	}

	closeCalendar = () => {
		this.calendar.classList.remove('active');
		window.removeEventListener('click', this.outsideClickListener);
		setTimeout(() => {
			this.setState({ active: false });
		}, 300);
	}

	preventPropagation = event => {
		// event within dpx-container doesnt bubble
		event.stopPropagation();
	}

	outsideClickListener = (event) => {
		// const { target } = event;
		this.closeCalendar();
		// if (!this.DPX.contains(target)) {
		// 	this.closeCalendar();
		// }
	}

	handleInputClick = () => {
		if (this.state.active) {
			this.closeCalendar();
		}
		else {
			document.dispatchEvent(new Event('click', { "bubbles": true, "cancelable": false })); // to close another datepicker-x if active
			window.addEventListener('click', this.outsideClickListener);
			this.mode = 2;
			this.showCalendar();

		}
	}

	showCalendar = (date) => {
		const { mode } = this;
		let calendar;
		switch (mode) {
			case 2:
				calendar = this.createCalendar(date);
				this.setState({ active: true, front: calendar });
				break;
			case 1:
				calendar = this.createCalendar(date);
				this.setState({ mode: mode, back: calendar });
				break;
			case 0:
				calendar = this.createCalendar(date);
				this.setState({ mode: mode, front: calendar });
				break;
			default:
		}
	}

	handleDayClick = (e) => {
		const dpxvalue = e.target.getAttribute('dpxvalue');
		if (this.mode === 2) {
			this.setValue(dpxvalue) && this.closeCalendar();
		} else {
			let min = this.getMinDate(),
				max = this.getMaxDate();

			min.setDate(1);
			max.setDate(1);

			if (!this.mode) {
				min.setMonth(0);
				max.setMonth(0);
			}

			dpxvalue >= min.getTime() && dpxvalue <= max.getTime()
				&& ++this.mode
				&& this.showCalendar(dpxvalue);
		}
	}

	handleTitleClick = (e) => {
		this.mode && this.mode-- && this.showCalendar(e.target.getAttribute('dpxvalue'));
	}

	handlePrevNextClick = (e) => {
		this.showCalendar(e.target.getAttribute('dpxvalue'));
	}

	handleTodayClick = (e) => {
		!e.target.classList.contains('dpx-disabled') &&
			this.setValue(clearDate().getTime()) && this.closeCalendar();
	}

	handleClearClick = () => {
		this.setValue(null) && this.closeCalendar();
	}

	render() {
		const { active, front, back } = this.state;
		const { className, ...other } = this.props;

		return (
			<div className='dpx-container' ref={this.setDPXref} onClick={this.preventPropagation}>
				<input type='text' ref={this.setInputRef} {...other}
					className={`dpx-input ${this.uid} ${className ? className : ''}`}
					onClick={this.handleInputClick} autoComplete='off'
				/>
				{active &&
					<div className='dpx-calendar-wrapper' ref={this.setCalendarRef}>
						<div className='dpx-calendar-inner' ref={this.setRotateRef}>
							<div className='dpx-blur'></div>
							<div className='dpx-front'>{front}</div>
							<div className='dpx-back'>{back}</div>
						</div>
					</div>
				}
			</div>
		);
	}

	// Sets option
	setOptions = (initOptions) => {
		for (let option in initOptions) {
			let value = initOptions[option];

			if (!this.options.hasOwnProperty(option)) {
				return console.error('DatePickerX, setOptions: Option doesn\'t exist.');
			}

			if (option === 'minDate' || option === 'maxDate') {
				if (!(value instanceof HTMLInputElement)) {
					!(value instanceof Date) && (value = new Date(value));

					if (isNaN(value)) {
						return console.error('DatePickerX, setOptions: Invalid date value.') && false;
					}
				}
			}
			else if (typeof this.options[option] !== typeof value) {
				return console.error('DatePickerX, setOptions: Option has invalid type.') && false;
			}
			else if (Array.isArray(this.options[option])) {
				if (value.length < this.options[option].length) {
					return console.warn('DatePickerX, setOptions: Invalid option length.') && false;
				}

				value = value.slice(0, this.options[option].length);
			}

			this.options[option] = value;
		}
	}

	/**
     * Sets date picker value.
     * If passed not Date object, method will try to convert it to date.
     * If passed null, method will clear date.
     * ignoreLimits=false If passed true min and max limits will be ignored
     */
	setValue = (dpxvalue, ignoreLimits) => {
		if (!dpxvalue) {
			// clear date & input value
			this.date = new Date();
			this.input.value = '';
		} else {
			if (isNaN(dpxvalue)) {
				return console.error('DatePickerX, setValue: Can\'t convert argument to date.') && false;
			}
			let dt;
			if (typeof dpxvalue === 'string') {
				dt = new Date(parseInt(dpxvalue));
			} else if (typeof dpxvalue === 'number')
				dt = new Date(dpxvalue);

			if (!ignoreLimits && (new Date(dt).getTime() < this.getMinDate().getTime() || new Date(dt).getTime() > this.getMaxDate().getTime())) {
				return console.error('DatePickerX, setValue: Date out of acceptable range.') && false;
			}

			this.date = dt;
			this.input.value = this.getFormatedDate(this.date, this.options.format);
		}

		// const e = document.createEvent('Event');
		// e.initEvent('change', true, true);
		// this.input.dispatchEvent(e);

		// this.state.active && this.createCalendar();

		return true;
	}

	/**
     * Returns formatted date picker value or timestamp if passed true in first parameter.
     * If value doesn't choosed yet returns empty string or null if passed true in first parameter.
     *
     * @param   {Boolean}     [timestamp] ...
     * @returns {Number|String} ...
     */
	getValue = (timestamp) => {
		return timestamp ? this.date : (!this.date ? '' : this.getFormatedDate(new Date(this.date), this.options.format));
	}

	/**
	 * Returns min date of date picker
	 * If min date relates to another date picker will be returned its value or its min date if value doesn't choose
	 *
	 * @returns {Date} minDate
	 */
	getMinDate = () => {
		let { minDate } = this.options;

		if (!minDate) {
			minDate = this.getValue(true);
			minDate = !minDate ? this.getMinDate() : new Date(minDate);
			minDate.setDate(minDate.getDate() + 1);
		}

		return clearDate(minDate);
	}

	/**
	 * Returns max date of date picker
	 * If max date relates to another date picker will be returned his value or his max date if value doesn't choose
	 *
	 * @returns {Date} Date
	 */
	getMaxDate = () => {
		let value = this.options.maxDate;

		if (!value) {
			value = this.getValue(true);
			value = !value ? this.getMaxDate() : new Date(value);
			value.setDate(value.getDate() - 1);
		}

		return clearDate(value);
	}

	/**
         * Returns date according to passed format
         *
         * @param {Date}   dt     Date object
         * @param {String} format Format string
         *      d    - day of month
         *      dd   - 2-digits day of month
         *      D    - day of week
         *      m    - month number
         *      mm   - 2-digits month number
         *      M    - short month name
         *      MM   - full month name
         *      yy   - 2-digits year number
         *      yyyy - 4-digits year number
         * @returns {Date} date
        */
	getFormatedDate(dt, format) {
		const items = {
			d: dt.getDate(),
			dd: dt.getDate(),
			D: dt.getDay(),
			m: dt.getMonth() + 1,
			mm: dt.getMonth() + 1,
			M: dt.getMonth(),
			MM: dt.getMonth(),
			yy: dt.getFullYear().toString().substr(-2),
			yyyy: dt.getFullYear()
		};

		items.dd < 10 && (items.dd = '0' + items.dd);
		items.mm < 10 && (items.mm = '0' + items.mm);
		items.D = this.options.weekDayLabels[items.D ? items.D - 1 : 6];
		items.M = this.options.shortMonthLabels[items.M];
		items.MM = this.options.singleMonthLabels[items.MM];

		return format.replace(/(?:[dmM]{1,2}|D|yyyy|yy)/g, function (m) {
			return items[m] ? items[m] : m;
		});
	}
}