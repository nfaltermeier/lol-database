import classNames from 'classnames/bind';
import moment from 'moment-timezone';
import { useCallback } from 'react';
import DateTimeWrapper from './DateTimeWrapper';
import styles from './DoubleDatePicker.module.scss';

export default function DoubleDatePicker(props) {
	const { startDate, setStartDate, endDate, setEndDate } = props;
	const onDateChange = useCallback((setMethod, value) => {
		if (moment.isMoment(value)) {
			setMethod(value.format('M/D/YYYY h:mm a Z'));
		} else {
			setMethod(value);
		}
	}, []);

	const cx = classNames.bind(styles);
	return (
		<div>
			<DateTimeWrapper inputProps={{ className: cx('datepicker') }} className={cx('datepicker-wrapper')} value={moment(startDate, 'M/D/YYYY h:mm a Z')} onChange={(v) => onDateChange(setStartDate, v)} initialViewDate={moment(startDate, 'M/D/YYYY h:mm a Z')} />
			{" through "}
			<DateTimeWrapper inputProps={{ className: cx('datepicker') }} className={cx('datepicker-wrapper')} value={moment(endDate, 'M/D/YYYY h:mm a Z')} onChange={(v) => onDateChange(setEndDate, v)} initialViewDate={moment(endDate, 'M/D/YYYY h:mm a Z')} />
		</div>
	);
}

const tz = moment.tz.guess();
const defaultStartDate = moment('10/4/2021 12:01 am -5:00', 'M/D/YYYY h:mm a Z').tz(tz).format('M/D/YYYY h:mm a Z');
const defaultEndDate = moment('11/7/2021 12:01 am -5:00', 'M/D/YYYY h:mm a Z').tz(tz).format('M/D/YYYY h:mm a Z');
export { defaultStartDate, defaultEndDate };
