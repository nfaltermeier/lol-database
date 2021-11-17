import axios from 'axios';
import { useMemo, useState, useCallback } from 'react';
import DataLoader from '../../components/DataLoader';
import NoRedirectForm from "../../components/NoRedirectForm";

export default function KillAssist() {
	const [state, setState] = useState({ 
		isLoading: true, 
		isErrored: false, 
		data: null 
	});

	const [gameID, setGameID] = useState('');
    const [killerID, setKillerID] = useState('');

	
	const getData = useMemo(() => { 
		const result = [{ key: 'games', fn: () => (axios.get('http://localhost:28172/games/named').then(data => data.data)) }];
		
		if (gameID !== '') {
			result.push({ key: 'players', fn: () => (axios.get(`http://localhost:28172/players/game/${gameID}`).then(data => data.data)) });

            if(killerID !== '') {
                result.push({ key: 'kills', fn: () => (axios.get(`http://localhost:28172/kills/perGamePlayer?GameID=${gameID}&PlayerID=${killerID}`).then(data => data.data)) });
            }
		}			

		return result;
	}, [gameID, killerID]);

	const gameOnChange = useCallback((e) => {
		setGameID(e.target.value);
	}, [setGameID]);

    const killerOnChange = useCallback((e) => {
		setKillerID(parseInt(e.target.value));
	}, [setKillerID]);


	let killerOptions;
	if (state.data && state.data.players) {
		killerOptions = [<option key="please-choose" value="">Please choose a killer</option>].concat(state.data.players.map(element => (
			<option key={element.id} value={element.id}>{element.name}</option>
		)));
	} else {
		killerOptions = <option value="">Please choose a killer</option>;
	}

    let killOptions;
    if (state.data && state.data.kills) {
		killOptions = [<option key="please-choose" value="">Please choose a kill</option>].concat(state.data.kills.map(element => (
			<option key={element.killID} value={element.killID}>{element.name}</option>
		)));
	} else {
		killOptions = <option value="">Please choose a kill</option>;
	}

    let assisterOptions;
	if (state.data && state.data.players) {
		assisterOptions = [<option key="please-choose" value="">Please choose an assister</option>].concat(state.data.players.filter(element => element.id !== killerID).map(element => (
			<option key={element.id} value={element.id}>{element.name}</option>
		)));
	} else {
		assisterOptions = <option value="">Please choose an assister</option>;
	}


	return (
		<main>
			<h2>Kill Assist</h2>

			<DataLoader state={state} 
						setState={setState} 
						actions={getData}>
				<NoRedirectForm id="killAssist" 
								url="http://localhost:28172/killAssistants" 
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
						<label htmlFor="killerID">Killer</label>
						<select name="killerID" onChange={killerOnChange}>
							{killerOptions}
						</select>
					</div>

                    <div>
						<label htmlFor="killID">Kill</label>
						<select name="killID">
							{killOptions}
						</select>
					</div>

                    <div>
						<label htmlFor="assisterPlayerID">Assister</label>
						<select name="assisterPlayerID">
							{assisterOptions}
						</select>
					</div>

				</NoRedirectForm>
			</DataLoader>
		</main>
	);
};
