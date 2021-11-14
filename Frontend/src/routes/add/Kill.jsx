import axios from 'axios';
import { useMemo, useState, useCallback } from 'react';
import DateTimeWrapper from '../../components/DateTimeWrapper';
import DataLoader from '../../components/DataLoader';
import NoRedirectForm from "../../components/NoRedirectForm";

export default function Kill() {
	const [state, setState] = useState({ 
		isLoading: true, 
		isErrored: false, 
		data: null 
	});
	const [gameID, setGameID] = useState('');

	
	const getData = useMemo(() => { 
		const result = [{ key: 'games', fn: () => (axios.get('http://localhost:28172/games/named').then(data => data.data)) },
						{ key: 'locations', fn: () => (axios.get('http://localhost:28172/locations').then(data => data.data)) }
		];
		
		if (gameID !== '') {
			result.push({ key: 'players', fn: () => (axios.get(`http://localhost:28172/players/game/${gameID}`).then(data => data.data)) });
		}			

		return result;
	}, [gameID]);

	const gameOnChange = useCallback((e) => {
		setGameID(e.target.value);
	}, [setGameID]);


	let killerOptions;
	if (state.data && state.data.players) {
		killerOptions = [<option key="please-choose" value="">Please choose a killer</option>].concat(state.data.players.map(element => (
			<option key={element.id} value={element.id}>{element.name}</option>
		)));
	} else {
		killerOptions = <option value="">Please choose a killer</option>;
	}

	let victimOptions;
	if (state.data && state.data.players) {
		victimOptions = [<option key="please-choose" value="">Please choose a victim</option>].concat(state.data.players.map(element => (
			<option key={element.id} value={element.id}>{element.name}</option>
		)));
	} else {
		victimOptions = <option value="">Please choose a killer</option>;
	}


	return (
		<main>
			<h2>Kill</h2>

			<DataLoader state={state} 
						setState={setState} 
						actions={getData}>
				<NoRedirectForm id="kill" 
								url="http://localhost:28172/kills" 
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
						<label htmlFor="victimID">Victim</label>
						<select name="victimID">
							{victimOptions}
						</select>
					</div>
					
					<div>
						<label htmlFor="killerID">Killer</label>
						<select name="killerID">
							{killerOptions}
						</select>
					</div>

					<div>
						<label htmlFor="Time">Time of Kill</label>
						<DateTimeWrapper inputProps={{ name: 'Time', required: true }}
										 dateFormat={false}
										 timeFormat="HH:mm:ss" />
					</div>

					<div>
						<label htmlFor="locationID">Location</label>
						<select name="locationId">
							<option value="">Please choose a location</option>
							{state.data != null && state.data.locations.map(element => (
								<option key={element.id} value={element.id}>{element.name}</option>
							))}
						</select>
					</div>
				</NoRedirectForm>
			</DataLoader>
		</main>
	);
};
