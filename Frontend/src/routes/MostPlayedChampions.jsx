import axios from 'axios';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useCallback, useMemo, useState } from 'react';
import DataLoader from '../components/DataLoader';
import DateTimeWrapper from '../components/DateTimeWrapper';
import styles from './MostPlayedChampions.module.scss';

export default function MostPlayedChampions() {
	const [startDate, setStartDate] = useState('January 1 2000 01:00:00 -6:00');
	const [endDate, setEndDate] = useState('January 1 2100 01:00:00 -6:00');
	const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });
	const getData = useMemo(() => [
		{ key: 'mostPlayedChampions', fn: () => (
				axios.get(`http://localhost:28172/mostPlayedChampions?StartDate=${encodeURIComponent(startDate)}&EndDate=${encodeURIComponent(endDate)}`)
				.then(data => data.data)
			) }
	], [startDate, endDate]);
	const onDateChange = useCallback((setMethod, value) => {
		if (moment.isMoment(value)) {
			setMethod(value.format('MMMM D YYYY h:mm:ss Z'));
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
						<DateTimeWrapper inputProps={{ className: cx('datepicker') }} className={cx('datepicker-wrapper')} value={startDate} onChange={(v) => onDateChange(setStartDate, v)} initialViewDate={moment(startDate)} />
						{" through "}
						<DateTimeWrapper inputProps={{ className: cx('datepicker') }} className={cx('datepicker-wrapper')} value={endDate} onChange={(v) => onDateChange(setEndDate, v)} initialViewDate={moment(endDate)} />
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
