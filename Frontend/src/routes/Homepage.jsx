import axios from 'axios';
import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DataLoader from '../components/DataLoader';
import styles from './Homepage.module.scss';

export default function Homepage() {
	const startDate = 'January 1 2000 01:00:00 -6:00';
	const endDate = 'January 1 2100 01:00:00 -6:00';
	const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });
	const getData = useMemo(() => [
		{ key: 'mostPlayedChampions', fn: () => (axios.get(`http://localhost:28172/mostPlayedChampions?StartDate=${startDate}&EndDate=${endDate}&Limit=3`).then(data => data.data)) }
	], []);

	const cx = classNames.bind(styles);
	return (
		<main>
			<DataLoader state={state} setState={setState} actions={getData}>
				<div className={cx('inline')}>
					<Link to="mostPlayedChampions"><h3>Most Played Champions</h3></Link>
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
