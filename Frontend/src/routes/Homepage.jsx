import axios from 'axios';
import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DataLoader from '../components/DataLoader';
import { defaultStartDate, defaultEndDate } from '../components/DoubleDatePicker';
import styles from './Homepage.module.scss';

export default function Homepage() {
	const startDate = defaultStartDate;
	const endDate = defaultEndDate;
	const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });
	const getData = useMemo(() => [
		{ key: 'mostPlayedChampions', fn: () => (axios.get(`http://localhost:28172/mostPlayedChampions?StartDate=${startDate}&EndDate=${endDate}&Limit=3`).then(data => data.data)) },
		{ key: 'teamRankings', fn: () => (axios.get(`http://localhost:28172/teamRankings?StartDate=${startDate}&EndDate=${endDate}&Limit=3`).then(data => data.data)) }
	], [startDate, endDate]);

	let mostPlayedChampions;
	if (state.data && state.data.mostPlayedChampions.length > 0) {
		mostPlayedChampions = state.data.mostPlayedChampions.map(e => (
			<p key={e.name}>{`${e.rank}. ${e.name} (${e.count} time${e.count !== 1 ? 's' : ''})`}</p>
		));
	} else {
		mostPlayedChampions = <p>No player statistics found</p>;
	}

	let teamRankings;
	if (state.data && state.data.teamRankings.length > 0) {
		teamRankings = state.data.teamRankings.map(e => (
			<p key={e.name}>{e.rank}. {e.name}</p>
		));
	} else {
		teamRankings = <p>No games found</p>;
	}

	const cx = classNames.bind(styles);
	return (
		<main>
			<DataLoader state={state} setState={setState} actions={getData}>
				<table className={cx('table')}>
					<thead>
						<td><Link to="mostPlayedChampions"><h3>Most Played Champions</h3></Link></td>
						<td><Link to="teamRankings"><h3>Team Rankings</h3></Link></td>
					</thead>
					<tbody>
						<tr>
							<td>{mostPlayedChampions}</td>
							<td>{teamRankings}</td>
						</tr>
					</tbody>
				</table>
			</DataLoader>
		</main>
	);
}
