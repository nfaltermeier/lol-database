import axios from 'axios';
import { useMemo, useState } from 'react';
import DateTimeWrapper from '../../components/DateTimeWrapper';
import DataLoader from '../../components/DataLoader';
import NoRedirectForm from "../../components/NoRedirectForm";
import moment from 'moment';

export default function Game() {
	const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });
	const getData = useMemo(() => [{ key: 'teams', fn: () => (axios.get('http://localhost:28172/teams').then(data => data.data)) }], []);

	return (
		<main>
			<h2>Game</h2>
			<DataLoader state={state} setState={setState} actions={getData}>
				<NoRedirectForm id="game" url="http://localhost:28172/games" method="post">
					<div>
						<label htmlFor="winningTeamID">Winning Team</label>
						<select name="winningTeamID" required>
							<option value="">Please choose an option</option>
							{state.data && state.data.teams.map(element => (
								<option key={element.id} value={element.id}>{element.name}</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="losingTeamID">Losing Team</label>
						<select name="losingTeamID">
							<option value="">Please choose an option</option>
							{state.data && state.data.teams.map(element => (
								<option key={element.id} value={element.id}>{element.name}</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="StartDateTime">Game Start Date-Time</label>
						<DateTimeWrapper inputProps={{ name: 'StartDateTime', required: true }} initialViewDate={moment().hours(12).minutes(0).seconds(0)} />
					</div>
					<div>
						<label htmlFor="nameabbreviation">Game Duration</label>
						<DateTimeWrapper inputProps={{ name: 'Duration', required: true }} dateFormat={false} timeFormat="HH:mm" />
					</div>
				</NoRedirectForm>
			</DataLoader>
		</main>
	);
};
