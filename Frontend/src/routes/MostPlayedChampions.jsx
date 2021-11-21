import axios from 'axios';
import { useMemo, useState } from 'react';
import DataLoader from '../components/DataLoader';
import DoubleDatePicker, { defaultStartDate, defaultEndDate } from '../components/DoubleDatePicker';

export default function MostPlayedChampions() {
	const [startDate, setStartDate] = useState(defaultStartDate);
	const [endDate, setEndDate] = useState(defaultEndDate);
	const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });
	const getData = useMemo(() => [
		{ key: 'mostPlayedChampions', fn: () => (
				axios.get(`http://localhost:28172/mostPlayedChampions?StartDate=${encodeURIComponent(startDate)}&EndDate=${encodeURIComponent(endDate)}`)
				.then(data => data.data)
			) }
	], [startDate, endDate]);

	return (
		<main>
			<DataLoader state={state} setState={setState} actions={getData}>
				<div>
					<DoubleDatePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
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
