import axios from 'axios';
import classNames from 'classnames/bind';
import moment from 'moment-timezone';
import { useCallback, useMemo, useState } from 'react';
import DataLoader from '../components/DataLoader';
import DateTimeWrapper from '../components/DateTimeWrapper';
import styles from './MostPlayedChampions.module.scss';

export default function MostPlayedChampions() {
	const tz = moment.tz.guess();
	console.log(tz);
	const [startDate, setStartDate] = useState(moment('10/4/2021 12:01 am -5:00', 'M/D/YYYY h:mm a Z').tz(tz).format('M/D/YYYY h:mm a Z'));
	const [endDate, setEndDate] = useState(moment('11/7/2021 12:01 am -5:00', 'M/D/YYYY h:mm a Z').tz(tz).format('M/D/YYYY h:mm a Z'));
	const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });
	const getData = useMemo(() => [
		{ key: 'mostPlayedChampions', fn: () => (
				axios.get(`http://localhost:28172/mostPlayedChampions?StartDate=${encodeURIComponent(startDate)}&EndDate=${encodeURIComponent(endDate)}`)
				.then(data => data.data)
			) }
	], [startDate, endDate]);
	const onDateChange = useCallback((setMethod, value) => {
		if (moment.isMoment(value)) {
			setMethod(value.format('M/D/YYYY h:mm a Z'));
		} else {
			setMethod(value);
		}
	}, []);

	const cx = classNames.bind(styles);
	return (
		<main>
			<DataLoader state={state} setState={setState} actions={getData}>
				<div>
					<div>
						<DateTimeWrapper inputProps={{ className: cx('datepicker') }} className={cx('datepicker-wrapper')} value={moment(startDate, 'M/D/YYYY h:mm a Z')} onChange={(v) => onDateChange(setStartDate, v)} initialViewDate={moment(startDate, 'M/D/YYYY h:mm a Z')} />
						{" through "}
						<DateTimeWrapper inputProps={{ className: cx('datepicker') }} className={cx('datepicker-wrapper')} value={moment(endDate, 'M/D/YYYY h:mm a Z')} onChange={(v) => onDateChange(setEndDate, v)} initialViewDate={moment(endDate, 'M/D/YYYY h:mm a Z')} />
					</div>
					<h3>Most Played Champions</h3>
					<div>
						{state.data && state.data.mostPlayedChampions.map(e => (
							<p key={e.name}>{`${e.rank}. ${e.name} (${e.count} time${e.count !== 1 ? 's' : ''})`}</p>
						))}
					</div>
				</div>
			</DataLoader>
		</main>
	);
}
