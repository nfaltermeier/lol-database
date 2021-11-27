import axios from 'axios';
import { useMemo, useState, useCallback } from 'react';
import DataLoader from '../components/DataLoader';
import DoubleDatePicker, { defaultStartDate, defaultEndDate } from '../components/DoubleDatePicker';

export default function SelectivePlayerStatistics() {
    const [playerID, setPlayerID] = useState(-1);
    const [startDate, setStartDate] = useState(defaultStartDate);
	const [endDate, setEndDate] = useState(defaultEndDate);

	const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });

	const getData = useMemo(() => [
		{ key: 'selectivePlayerStatistics', fn: () => (
				axios.get(`http://localhost:28172/selectivePlayerStats?PlayerID=${encodeURIComponent(playerID)}&StartDateTime=${encodeURIComponent(startDate)}&EndDateTime=${encodeURIComponent(endDate)}`)
				.then(data => data.data)
			) 
        },
        { key: 'players', fn: () => (axios.get(`http://localhost:28172/players`).then(data => data.data)) }
	], [playerID, startDate, endDate]);


    const playerOnChange = useCallback((e) => {
		setPlayerID(e.target.value);
	}, [setPlayerID]);



    let playerOptions;
    if (state.data && state.data.players) {
		playerOptions = [<option key="please-choose" value="">Please choose a player</option>].concat(state.data.players.map(element => (
			<option key={element.id} value={element.id}>{element.name}</option>
		)));
	} else {
		playerOptions = <option value="">Please choose a player</option>;
	}


    let selectivePlayerStatistics;
	if (state.data && playerID && state.data.selectivePlayerStatistics) {
		// selectivePlayerStatistics = state.data.selectivePlayerStatistics.map(e => (
        //     // instead of this, we need a custom component that takes in the selectivePlayerStatistics variable and returns us a full html element that we can use
		// 	<p key={e.name}>{`${e.rank}. ${e.name} (${e.count} time${e.count !== 1 ? 's' : ''})`}</p>
		// ));

        selectivePlayerStatistics = (
        <div>

        </div>);

	} else {
		selectivePlayerStatistics = <p>No player statistics found. Try expanding the date range or selecting another player.</p>;
	}


    return (
		<main>
			<DataLoader state={state} setState={setState} actions={getData}>
				<div>
                    <div>
						<label htmlFor="playerID">Player</label>
						<select name="playerID" onChange={playerOnChange} value={playerID}>
							{playerOptions}
						</select>
					</div>

					<DoubleDatePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />	

                    <h3>Selective Player Statistics</h3>
					<div>
						{selectivePlayerStatistics}
					</div>
				</div>
			</DataLoader>
		</main>
	);
}