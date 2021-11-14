import axios from 'axios';
import { useMemo, useState, useCallback } from 'react';
import DateTimeWrapper from '../../components/DateTimeWrapper';
import DataLoader from '../../components/DataLoader';
import NoRedirectForm from "../../components/NoRedirectForm";

export default function ObjectiveStat() {
	const [state, setState] = useState({ 
		isLoading: true, 
		isErrored: false, 
		data: null 
	});
	const [gameID, setGameID] = useState('');

	
	const getData = useMemo(() => { 
		const result = [{ key: 'games', fn: () => (axios.get('http://localhost:28172/games/named').then(data => data.data)) },
						{ key: 'objectives', fn: () => (axios.get('http://localhost:28172/objectives').then(data => data.data)) }
		];
		
		if (gameID !== '') {
			result.push({ key: 'teams', fn: () => (axios.get(`http://localhost:28172/teams/game/${gameID}`).then(data => data.data)) });
		}			

		return result;
	}, [gameID]);

	const gameOnChange = useCallback((e) => {
		setGameID(e.target.value);
	}, [setGameID]);


	let teamOptions;
	if (state.data && state.data.teams) {
		teamOptions = [<option key="please-choose" value="">Please choose a team</option>].concat(state.data.teams.map(element => (
			<option key={element.id} value={element.id}>{element.name}</option>
		)));
	} else {
		teamOptions = <option value="">Please choose a team</option>;
	}


	return (
		<main>
			<h2>Objective Stat</h2>

			<DataLoader state={state} 
						setState={setState} 
						actions={getData}>
				<NoRedirectForm id="objectiveStat" 
								url="http://localhost:28172/objectiveStats" 
								method="post">

					<div>
						<label htmlFor="gameID">Game</label>
						<select name="gameID" required onChange={gameOnChange} value={gameID}>
							<option value="">Please choose a game</option>
							{state.data && state.data.games.map(element => (
								<option key={element.id} value={element.id}>{element.name}</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="teamID">Team</label>
						<select name="teamID">
							{teamOptions}
						</select>
					</div>

                    <div>
						<label htmlFor="objectiveID">Objective</label>
						<select name="objectiveID">
							<option value="">Please choose an objective</option>
							{state.data && state.data.objectives.map(element => (
								<option key={element.id} value={element.id}>{element.name}</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="TimeOfCapture">Time of Capture</label>
						<DateTimeWrapper inputProps={{ name: 'TimeOfCapture', required: true }}
										 dateFormat={false}
										 timeFormat="HH:mm:ss" />
					</div>

				</NoRedirectForm>
			</DataLoader>
		</main>
	);
};
