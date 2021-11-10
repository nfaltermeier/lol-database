import axios from 'axios';
import { useMemo, useState } from 'react';
import DataLoader from '../../components/DataLoader';
import NoRedirectForm from "../../components/NoRedirectForm";

export default function PlayerGameStats() {
  const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });
  const getData = useMemo(() => [
    { key: 'games', fn: () => (axios.get('http://localhost:28172/games/named').then(data => data.data)) },
    { key: 'champions', fn: () => (axios.get('http://localhost:28172/champions').then(data => data.data)) },
    { key: 'players', fn: () => (axios.get('http://localhost:28172/players').then(data => data.data)) }
  ], []);

  return (
    <main>
      <h2>Player Game Stats</h2>
      <DataLoader state={state} setState={setState} actions={getData}>
        <NoRedirectForm id="playerGameStats" url="http://localhost:28172/playerGameStats" method="post">
          <div>
            <label htmlFor="playerID">Player</label>
            <select name="playerID" required>
              <option value="">Please choose an option</option>
              {state.data != null && state.data.players.map(element => (
                <option key={element.id} value={element.id}>{element.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="gameID">Game</label>
            <select name="gameID" required>
              <option value="">Please choose an option</option>
              {state.data != null && state.data.games.map(element => (
                <option key={element.id} value={element.id}>{element.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="championID">Champion</label>
            <select name="championID" required>
              <option value="">Please choose an option</option>
              {state.data != null && state.data.champions.map(element => (
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
