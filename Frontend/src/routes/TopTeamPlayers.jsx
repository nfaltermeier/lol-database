import axios from 'axios';
import { useMemo, useState } from 'react';
import DataLoader from '../components/DataLoader';
import DoubleDatePicker, { defaultStartDate, defaultEndDate } from '../components/DoubleDatePicker';
import './TopTeamPlayers.scss';

export default function TopTeamPlayers() {
    const [startDate, setStartDate] = useState(defaultStartDate);
	const [endDate, setEndDate] = useState(defaultEndDate);

	const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });

    const getData = useMemo(() => [
		{ key: 'topTeamPlayers', fn: () => (
				axios.get(`http://localhost:28172/topTeamPlayers?StartDateTime=${encodeURIComponent(startDate)}&EndDateTime=${encodeURIComponent(endDate)}`)
				.then(data => data.data)
			) 
        },
        { key: 'champions', fn: () => (axios.get(`http://localhost:28172/champions`).then(data => data.data)) },
	], [startDate, endDate]);


    // Construction of Top Team Players data container
    let topTeamPlayers;

    if(state.data){
        const _ttp = state.data.topTeamPlayers;

        if(_ttp) {
            topTeamPlayers = [];

            topTeamPlayers.push(
                <tr key={-1}>
                        <th>Team</th>
                        <th>Player</th>
                        <th>Kills</th>
                        <th>Most Played Champion</th>
                </tr>
            );

            for(let i=0;i<_ttp.length;i++) {
                const cur = _ttp[i];

                // Champion info
                let _championName = "Unknown";
                if(cur.mostPlayedChampionID && state.data.champions) {
                    const c = state.data.champions.find(e => e.id.toString() === cur.mostPlayedChampionID.toString());
                    if(c) {
                        _championName = c.name;
                    }
                }

                // Array table subcomponent construction 
                topTeamPlayers.push(
                    <tr key={i}>
                        <td>{`[${cur.playerTeam}]`}</td>
                        <td>{cur.playerName}</td>
                        <td>{cur.killCount}</td>
                        <td>{_championName}</td>
                    </tr>
                );
            }
        }
    }


    // Return complete page
    return (
		<main>
			<DataLoader state={state} setState={setState} actions={getData}>
				<div>
					<DoubleDatePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />	

                    <h3>Top Team Players</h3>
                    <table className="topTeamPlayerDataTable">
                        <tbody>
                            {topTeamPlayers}
                        </tbody>
                    </table>
					
				</div>
			</DataLoader>
		</main>
	);
}