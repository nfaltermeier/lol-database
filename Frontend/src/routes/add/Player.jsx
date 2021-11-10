import axios from 'axios';
import { useMemo, useState } from 'react';
import DataLoader from '../../components/DataLoader';
import NoRedirectForm from "../../components/NoRedirectForm";

export default function Player() {
  const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });
  const getData = useMemo(() => [
    { key: 'teams', fn: () => (axios.get('http://localhost:28172/teams').then(data => data.data)) },
    { key: 'positions', fn: () => (axios.get('http://localhost:28172/positions').then(data => data.data)) }
  ], []);

  return (
    <main>
      <h2>Player</h2>
      <DataLoader state={state} setState={setState} actions={getData}>
        <NoRedirectForm id="player" url="http://localhost:28172/players" method="post">
          <div>
            <label htmlFor="name">Name</label>
            <input name="name" type="text" required />
          </div>
          <div>
            <label htmlFor="teamID">Team</label>
            <select name="teamID" required>
              <option value="">Please choose an option</option>
              {state.data != null && state.data.teams.map(element => (
                <option key={element.id} value={element.id}>{element.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="positionID">Position</label>
            <select name="positionID" required>
              <option value="">Please choose an option</option>
              {state.data != null && state.data.positions.map(element => (
                <option key={element.id} value={element.id}>{element.name}</option>
              ))}
            </select>
          </div>
        </NoRedirectForm>
      </DataLoader>
    </main>
  );
};
