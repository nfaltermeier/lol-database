import axios from 'axios';
import { useMemo, useState, useCallback } from 'react';
import DateTimeWrapper from '../../components/DateTimeWrapper';
import DataLoader from '../../components/DataLoader';
import NoRedirectForm from "../../components/NoRedirectForm";

export default function ItemAcquisition() {
	const [state, setState] = useState({ 
		isLoading: true, 
		isErrored: false, 
		data: null 
	});
	const [gameID, setGameID] = useState('');

	
	const getData = useMemo(() => { 
		const result = [{ key: 'games', fn: () => (axios.get('http://localhost:28172/games/named').then(data => data.data)) },
						{ key: 'items', fn: () => (axios.get('http://localhost:28172/items').then(data => data.data)) }
		];
		
		if (gameID !== '') {
			result.push({ key: 'players', fn: () => (axios.get(`http://localhost:28172/players/game/${gameID}`).then(data => data.data)) });
		}			

		return result;
	}, [gameID]);

	const gameOnChange = useCallback((e) => {
		setGameID(e.target.value);
	}, [setGameID]);


	let playerOptions;
	if (state.data && state.data.players) {
		playerOptions = [<option key="please-choose" value="">Please choose a player</option>].concat(state.data.players.map(element => (
			<option key={element.id} value={element.id}>{element.name}</option>
		)));
	} else {
		playerOptions = <option value="">Please choose a player</option>;
	}


	return (
		<main>
			<h2>Item Acquisition</h2>

			<DataLoader state={state} 
						setState={setState} 
						actions={getData}>
				<NoRedirectForm id="itemAcquisition" 
								url="http://localhost:28172/itemAcquisitions" 
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
						<label htmlFor="playerID">Player</label>
						<select name="playerID">
							{playerOptions}
						</select>
					</div>

                    <div>
						<label htmlFor="itemID">Item</label>
						<select name="itemID">
							<option value="">Please choose an item</option>
							{state.data && state.data.items.map(element => (
								<option key={element.id} value={element.id}>{element.name}</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="TimeOfAcquisition">Time of Acquisition</label>
						<DateTimeWrapper inputProps={{ name: 'TimeOfAcquisition', required: true }}
										 dateFormat={false}
										 timeFormat="HH:mm:ss" />
					</div>

				</NoRedirectForm>
			</DataLoader>
		</main>
	);
};
