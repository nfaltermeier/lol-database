import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';
import DataLoader from '../../components/DataLoader';
import NoRedirectForm from "../../components/NoRedirectForm";

export default function PlayerGameStats() {
  const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });
  const [gameID, setGameID] = useState('');
  const getData = useMemo(() => {
    const result = [
      { key: 'games', fn: () => (axios.get('http://localhost:28172/games/named').then(data => data.data)) },
      { key: 'champions', fn: () => (axios.get('http://localhost:28172/champions').then(data => data.data)) }
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
    playerOptions = [ <option key="please-choose" value="">Please choose an option</option> ].concat(state.data.players.map(element => (
      <option key={element.id} value={element.id}>{element.name}</option>
    )));
  } else {
    playerOptions = <option value="">Please choose a game for options</option>;
  }

  return (
    <main>
      <h2>Player Game Stats</h2>
      <DataLoader state={state} setState={setState} actions={getData}>
        <NoRedirectForm id="playerGameStats" url="http://localhost:28172/playerGameStats" method="post">
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
            <select name="championID" required>
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
            <label htmlFor="tenMinuteGold">10 Minute Gold</label>
            <input name="tenMinuteGold" type="number" />
          </div>
          <div>
            <label htmlFor="fifteenMinuteGold">15 Minute Gold</label>
            <input name="fifteenMinuteGold" type="number" />
          </div>
          <div>
            <label htmlFor="endGold">End Gold</label>
            <input name="endGold" type="number" required />
          </div>
        </NoRedirectForm>
      </DataLoader>
    </main>
  );
};
