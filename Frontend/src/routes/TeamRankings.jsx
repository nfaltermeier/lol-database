import axios from 'axios';
import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';
import DataLoader from '../components/DataLoader';
import DoubleDatePicker, { defaultStartDate, defaultEndDate } from '../components/DoubleDatePicker';
import TeamRanking from '../components/TeamRanking';
import styles from './TeamRankings.module.scss';

export default function TeamRankings() {
	const [startDate, setStartDate] = useState(defaultStartDate);
	const [endDate, setEndDate] = useState(defaultEndDate);
	const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });
	const getData = useMemo(() => [
		{ key: 'teamRankings', fn: () => (
				axios.get(`http://localhost:28172/teamRankings?StartDate=${encodeURIComponent(startDate)}&EndDate=${encodeURIComponent(endDate)}`)
				.then(data => data.data)
			) }
	], [startDate, endDate]);

	let teamRankings;
	if (state.data && state.data.teamRankings.length > 0) {
		teamRankings = state.data.teamRankings.map(e => (
			<TeamRanking key={e.name} rank={e.rank} name={e.name} wins={e.wins} losses={e.losses} winLossRatio={e.winLossRatio} />
		));
	} else {
		teamRankings = <p>No games found</p>;
	}

	const cx = classNames.bind(styles);
	return (
		<main>
			<DataLoader state={state} setState={setState} actions={getData}>
				<div>
					<DoubleDatePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
					<h3>Team Rankings</h3>
					<div className={cx('ranking-wrapper')}>
						{teamRankings}
					</div>
				</div>
			</DataLoader>
		</main>
	);
}
