import axios from 'axios';
import { useMemo, useState, useCallback } from 'react';
import DataLoader from '../components/DataLoader';
import DoubleDatePicker, { defaultStartDate, defaultEndDate } from '../components/DoubleDatePicker';
import LabelImage from '../components/LabelImage';
import './SelectivePlayerStatistics.scss';

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
        { key: 'players', fn: () => (axios.get(`http://localhost:28172/players`).then(data => data.data)) },
        { key: 'champions', fn: () => (axios.get(`http://localhost:28172/champions`).then(data => data.data)) },
        { key: 'runeData', fn: () => (axios.get(`http://localhost:28172/staticRuneData`).then(data => data.data)) }
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
	if (state.data && playerID) {
		// selectivePlayerStatistics = state.data.selectivePlayerStatistics.map(e => (
        //     // instead of this, we need a custom component that takes in the selectivePlayerStatistics variable and returns us a full html element that we can use
		// 	<p key={e.name}>{`${e.rank}. ${e.name} (${e.count} time${e.count !== 1 ? 's' : ''})`}</p>
		// ));


        // Retrieve readable data for statistic data
        let _playerName = "";
        let _championName = "No Champion Data";
        let _championImgUrl = null;
        let _mostChosenRuneKeystoneName = "No Keystone Rune Data";
        let _mostChosenRuneKeystoneImgUrl = null;
        let _shard01Name = "No Shard Data";
        let _shard01ImgUrl = null;
        let _shard02Name = "No Shard Data";
        let _shard02ImgUrl = null;
        let _shard03Name = "No Shard Data";
        let _shard03ImgUrl = null;


        let _sps = state.data.selectivePlayerStatistics[0];
        
        if(_sps){
            // Player info
            if(playerID && state.data.players){
                const p = state.data.players.find(e => e.id.toString() === playerID.toString());
                if(p) _playerName = p.name;
            }

            // Champion info
            if(_sps.mostPlayedChampionID && state.data.champions) {
                const c = state.data.champions.find(e => e.id.toString() === _sps.mostPlayedChampionID.toString());
                if(c) {
                    _championName = c.name;
                    _championImgUrl = "";
                }
            }

            // Keystone Rune info
            if(_sps.mostChosenRuneKeystone && state.data.runeData && state.data.runeData.keystoneRunes) {
                const r = state.data.runeData.keystoneRunes.find(e => e.id.toString() === _sps.mostChosenRuneKeystone.toString());
                if(r) {
                    _mostChosenRuneKeystoneName = r.name;
                    _mostChosenRuneKeystoneImgUrl = r.logoLink;
                }
            }

            // Shard info
            // Shard 01
            if(_sps.mostChosenShard1 && state.data.runeData && state.data.runeData.shardRunes) {
                const s = state.data.runeData.shardRunes.find(e => e.id.toString() === _sps.mostChosenShard1.toString());
                if(s) {
                    _shard01Name = s.name;
                    _shard01ImgUrl = s.logoLink;
                }
            }

            // Shard 02
            if(_sps.mostChosenShard2 && state.data.runeData && state.data.runeData.shardRunes) {
                const s = state.data.runeData.shardRunes.find(e => e.id.toString() === _sps.mostChosenShard2.toString());
                if(s) {
                    _shard02Name = s.name;
                    _shard02ImgUrl = s.logoLink;
                }
            }

            // Shard 03
            if(_sps.mostChosenShard3 && state.data.runeData && state.data.runeData.shardRunes) {
                const s = state.data.runeData.shardRunes.find(e => e.id.toString() === _sps.mostChosenShard3.toString());
                if(s) {
                    _shard03Name = s.name;
                    _shard03ImgUrl = s.logoLink;
                }
            }
        }
        

        // Subcomponent construction
        let keystoneRuneLI = LabelImage({message: _mostChosenRuneKeystoneName, imgUrl: _mostChosenRuneKeystoneImgUrl});
        let shard01LI = LabelImage({message: _shard01Name, imgUrl: _shard01ImgUrl});
        let shard02LI = LabelImage({message: _shard02Name, imgUrl: _shard02ImgUrl});
        let shard03LI = LabelImage({message: _shard03Name, imgUrl: _shard03ImgUrl});

        // Final component construction
        selectivePlayerStatistics = (
        <div>
            <div className="playerNameLabelContainer">
                <label className="nameLabel">{_playerName}</label>
            </div>

            <label className="fieldTitle">Most Played Champion</label>
            <div className="championDataContainer">
                <label className="nameLabel">{_championName}</label>
            </div>

            <br/>

            <label className="fieldTitle">Most Chosen Keystone Rune</label>
            {keystoneRuneLI}

            <br/>

            <label className="fieldTitle">Most Chosen Primary Shard</label>
            {shard01LI}
            <label className="fieldTitle">Most Chosen Secondary Shard</label>
            {shard02LI}
            <label className="fieldTitle">Most Chosen Tertiary Shard</label>
            {shard03LI}
            
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