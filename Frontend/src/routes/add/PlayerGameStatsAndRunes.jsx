import axios from 'axios';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import DataLoader from '../../components/DataLoader';
import NoRedirectForm from "../../components/NoRedirectForm";
import style from './PlayerGameStatsAndRunes.module.scss';

export default function PlayerGameStatsAndRunes() {
	const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });
	const [gameID, setGameID] = useState('');
	const [primaryRunePathID, setPrimaryRunePathID] = useState(null);
	const [secondaryRunePathID, setSecondaryRunePathID] = useState(null);
	const secondaryRuneCount = useRef(0);
	const rune1Elem = useRef();
	const rune2Elem = useRef();
	const rune3Elem = useRef();
	const keystoneRuneElem = useRef();
	const secondaryRunePathElem = useRef();
	// need to use JS to make sure the forms are valid, remember to duplicate these checks in the backend
	const doCustomValidation = useCallback((currentPrimaryRunePathID, currentSecondaryRunePathID) => {
		// doCustomValidation is called before we finish rendering, so the refs will be null
		if (!keystoneRuneElem.current)
			return;

		if (currentPrimaryRunePathID !== null && currentPrimaryRunePathID === currentSecondaryRunePathID) {
			keystoneRuneElem.current.setCustomValidity('Cannot use the same rune path as the secondary rune path');
			secondaryRunePathElem.current.setCustomValidity('Cannot use the same rune path as the primary rune path');
		} else {
			keystoneRuneElem.current.setCustomValidity('');
			secondaryRunePathElem.current.setCustomValidity('');
		}

		if (currentSecondaryRunePathID !== null && secondaryRuneCount.current !== 2) {
			rune1Elem.current.setCustomValidity('Must have exactly 2 secondary runes');
			rune2Elem.current.setCustomValidity('Must have exactly 2 secondary runes');
			rune3Elem.current.setCustomValidity('Must have exactly 2 secondary runes');
		} else {
			rune1Elem.current.setCustomValidity('');
			rune2Elem.current.setCustomValidity('');
			rune3Elem.current.setCustomValidity('');
		}
	}, []);
	// function called to get data from the backend to use in the form
	const getData = useMemo(() => {
		const result = [
			{ key: 'games', fn: () => (axios.get('http://localhost:28172/games/named').then(data => data.data)) },
			{ key: 'champions', fn: () => (axios.get('http://localhost:28172/champions').then(data => data.data)) },
			{ key: 'staticrunedata', fn: () => (axios.get('http://localhost:28172/staticrunedata').then(data => data.data)) }
		];

		if (gameID !== '') {
			result.push({ key: 'players', fn: () => (axios.get(`http://localhost:28172/players/game/${gameID}`).then(data => data.data)) });
		}

		return result;
	}, [gameID]);
	// gameID changing causes the selects to reset, so clear the stored state
	useEffect(() => {
		secondaryRuneCount.current = 0;
		setPrimaryRunePathID(null);
		setSecondaryRunePathID(null);
	}, [gameID]);
	// changing secondaryRunePathID causes the secondary lesser runes to reset
	useEffect(() => {
		secondaryRuneCount.current = 0;
	}, [secondaryRunePathID]);
	// revalidate when gameID changes
	useEffect(() => {
		doCustomValidation(primaryRunePathID, secondaryRunePathID);
	}, [gameID, doCustomValidation, primaryRunePathID, secondaryRunePathID]);
	const gameOnChange = useCallback((e) => {
		setGameID(e.target.value);
	}, [setGameID]);
	const primaryRunePathIDOnChange = useCallback((e) => {
		// access the custom attribute on the selected option
		let val = e.target.selectedOptions[0].attributes.getNamedItem('data--rune-path-id')?.value;
		val = val ? parseInt(val) : val;
		setPrimaryRunePathID(val);

		doCustomValidation(val, secondaryRunePathID);
	}, [setPrimaryRunePathID, doCustomValidation, secondaryRunePathID]);
	const secondaryRunePathOnChange = useCallback((e) => {
		const val = parseInt(e.target.value);;
		setSecondaryRunePathID(val);

		doCustomValidation(primaryRunePathID, val);
	}, [setSecondaryRunePathID, doCustomValidation, primaryRunePathID]);
	// store the current value on focus so we can properly count how many selects have a value
	const secondaryRuneOnFocus = useCallback(e => {
		const attr = document.createAttribute('data--prev-value');
		attr.value = e.target.value;
		e.target.attributes.setNamedItem(attr);
	}, []);
	const secondaryRuneOnChange = useCallback(e => {
		const prev = e.target.attributes.getNamedItem('data--prev-value').value;
		if (prev === '' && e.target.value !== '')
			secondaryRuneCount.current += 1;
		else if (e.target.value === '')
			secondaryRuneCount.current -= 1;
		// Update the value since it can be changed again without losing focus
		const attr = document.createAttribute('data--prev-value');
		attr.value = e.target.value;
		e.target.attributes.setNamedItem(attr);

		doCustomValidation(primaryRunePathID, secondaryRunePathID);
	}, [secondaryRuneCount, doCustomValidation, primaryRunePathID, secondaryRunePathID]);

	let playerOptions;
	if (state.data && state.data.players) {
		playerOptions = [<option key="please-choose" value="">Please choose an option</option>].concat(state.data.players.map(element => (
			<option key={element.id} value={element.id}>{element.name}</option>
		)));
	} else {
		playerOptions = <option value="">Please choose a game for options</option>;
	}

	let primaryRunes;
	if (state.data && primaryRunePathID) {
		primaryRunes = [<option key="please-choose" value="">Please choose an option</option>];
		primaryRunes = primaryRunes.concat(
			state.data.staticrunedata.secondaryRunes.filter(e => e.runePathID === primaryRunePathID).map(element => (
				<option key={element.id} value={element.id} data--rune-slot={element.slot}>{element.name}</option>
			))
		);
	} else {
		primaryRunes = [<option key="please-choose-keystone" value="">Please choose a keystone rune for options</option>];
	}

	let secondaryRunes;
	if (state.data && secondaryRunePathID) {
		secondaryRunes = [<option key="please-choose" value="">Maybe choose an option</option>];
		secondaryRunes = secondaryRunes.concat(
			state.data.staticrunedata.secondaryRunes.filter(e => e.runePathID === secondaryRunePathID).map(element => (
				<option key={element.id} value={element.id} data--rune-slot={element.slot}>{element.name}</option>
			))
		);
	} else {
		secondaryRunes = [<option key="please-choose-2nd-rune-path" value="">Please choose a secondary rune path for options</option>];
	}

	const filterSlot = useCallback((e, slot) => e.props.value === '' || e.props['data--rune-slot'] === slot, []);

	const cx = classNames.bind(style);
	return (
		<main>
			<h2>Player Game Stats</h2>
			<DataLoader state={state} setState={setState} actions={getData}>
				<NoRedirectForm id="playerGameStatsAndRunes" url="http://localhost:28172/playerGameStatsAndRunes" method="post">
					<div>
						<label htmlFor="gameID">Game</label>
						<select name="gameID" required onChange={gameOnChange} value={gameID}>
							<option value="">Please choose an option</option>
							{state.data && state.data.games.map(element => (
								<option key={element.id} value={element.id}>{element.name}</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="playerID">Player</label>
						<select name="playerID" required>
							{playerOptions}
						</select>
					</div>
					<div>
						<label htmlFor="championID">Champion</label>
						<select name="championID" required disabled={gameID === ''}>
							<option value="">Please choose an option</option>
							{state.data && state.data.champions.map(element => (
								<option key={element.id} value={element.id}>{element.name}</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="creepScore">Creep Score</label>
						<input name="creepScore" type="number" required />
					</div>
					<div>
						<label htmlFor="visionScore">Vision Score</label>
						<input name="visionScore" type="number" required />
					</div>
					<div>
						<label htmlFor="tenMinuteGold">10 Minute Gold (optional)</label>
						<input name="tenMinuteGold" type="number" />
					</div>
					<div>
						<label htmlFor="fifteenMinuteGold">15 Minute Gold (optional)</label>
						<input name="fifteenMinuteGold" type="number" />
					</div>
					<div>
						<label htmlFor="endGold">End Gold</label>
						<input name="endGold" type="number" required />
					</div>
					<hr />
					<div>
						<label htmlFor="keystoneRuneID">Keystone Rune</label>
						<select
							name="keystoneRuneID"
							required
							onChange={primaryRunePathIDOnChange}
							ref={keystoneRuneElem}
							className={primaryRunePathID !== null ? cx('show-error') : undefined}
							disabled={gameID === ''}
						>
							<option value="">Please choose an option</option>
							{state.data && state.data.staticrunedata.keystoneRunes.map(element => (
								<option key={element.id} value={element.id} data--rune-path-id={element.runePathID}>{element.name}</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="primaryRunePathRune1ID">Slot 1</label>
						<select name="primaryRunePathRune1ID" required disabled={gameID === ''}>
							{primaryRunes.filter((e) => filterSlot(e, 1))}
						</select>
					</div>
					<div>
						<label htmlFor="primaryRunePathRune2ID">Slot 2</label>
						<select name="primaryRunePathRune2ID" required disabled={gameID === ''}>
							{primaryRunes.filter((e) => filterSlot(e, 2))}
						</select>
					</div>
					<div>
						<label htmlFor="primaryRunePathRune3ID">Slot 3</label>
						<select name="primaryRunePathRune3ID" required disabled={gameID === ''}>
							{primaryRunes.filter((e) => filterSlot(e, 3))}
						</select>
					</div>
					<div>
						<label htmlFor="secondaryRunePathID">Secondary Rune Path</label>
						<select
							name="secondaryRunePathID"
							required
							onChange={secondaryRunePathOnChange}
							ref={secondaryRunePathElem}
							className={secondaryRunePathID !== null ? cx('show-error') : undefined}
							disabled={gameID === ''}
						>
							<option value="">Please choose an option</option>
							{state.data && state.data.staticrunedata.runePaths.map(element => (
								<option key={element.id} value={element.id}>{element.name}</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="secondaryRunePathRuneSlot1ID">Slot 1</label>
						<select
							name="secondaryRunePathRuneSlot1ID"
							ref={rune1Elem}
							onChange={secondaryRuneOnChange}
							onFocus={secondaryRuneOnFocus}
							className={cx('show-error')}
							disabled={gameID === ''}
						>
							{secondaryRunes.filter((e) => filterSlot(e, 1))}
						</select>
					</div>
					<div>
						<label htmlFor="secondaryRunePathRuneSlot2ID">Slot 2</label>
						<select
							name="secondaryRunePathRuneSlot2ID"
							ref={rune2Elem}
							onChange={secondaryRuneOnChange}
							onFocus={secondaryRuneOnFocus}
							className={cx('show-error')}
							disabled={gameID === ''}
						>
							{secondaryRunes.filter((e) => filterSlot(e, 2))}
						</select>
					</div>
					<div>
						<label htmlFor="secondaryRunePathRuneSlot3ID">Slot 3</label>
						<select
							name="secondaryRunePathRuneSlot3ID"
							ref={rune3Elem}
							onChange={secondaryRuneOnChange}
							onFocus={secondaryRuneOnFocus}
							className={cx('show-error')}
							disabled={gameID === ''}
						>
							{secondaryRunes.filter((e) => filterSlot(e, 3))}
						</select>
					</div>
					<hr />
					<div>
						<label htmlFor="shardRune1ID">Shard Slot 1</label>
						<select name="shardRune1ID" required disabled={gameID === ''}>
							<option value="">Please choose an option</option>
							{state.data && state.data.staticrunedata.shardRunes.filter(e => e.slot === 1).map(element => (
								<option key={element.id} value={element.id}>{element.name}</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="shardRune2ID">Shard Slot 2</label>
						<select name="shardRune2ID" required disabled={gameID === ''}>
							<option value="">Please choose an option</option>
							{state.data && state.data.staticrunedata.shardRunes.filter(e => e.slot === 2).map(element => (
								<option key={element.id} value={element.id}>{element.name}</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="shardRune3ID">Shard Slot 3</label>
						<select name="shardRune3ID" required disabled={gameID === ''}>
							<option value="">Please choose an option</option>
							{state.data && state.data.staticrunedata.shardRunes.filter(e => e.slot === 3).map(element => (
								<option key={element.id} value={element.id}>{element.name}</option>
							))}
						</select>
					</div>
					<hr />
				</NoRedirectForm>
			</DataLoader>
		</main>
	);
};
