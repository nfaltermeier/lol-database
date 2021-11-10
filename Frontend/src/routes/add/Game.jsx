import axios from 'axios';
import { useMemo, useState } from 'react';
import DateTimeWrapper from '../../components/DateTimeWrapper';
import DataLoader from '../../components/DataLoader';
import NoRedirectForm from "../../components/NoRedirectForm";

export default function Game() {
  const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });
  const getData = useMemo(() => [{ key: 'teams', fn: () => (axios.get('http://localhost:28172/teams').then(data => data.data)) }], []);

  return (
    <main>
      <h2>Team</h2>
      <DataLoader state={state} setState={setState} actions={getData}>
        <NoRedirectForm id="team" url="http://localhost:28172/games" method="post">
          <div>
            <label htmlFor="team1ID">Team 1</label>
            <select name="team1ID">
              <option value="">Please choose an option</option>
              {state.data != null && state.data.teams.map(element => (
                <option key={element.id} value={element.id}>{element.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="team2ID">Team 2</label>
            <select name="team2ID">
              <option value="">Please choose an option</option>
              {state.data != null && state.data.teams.map(element => (
                <option key={element.id} value={element.id}>{element.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="StartDateTime">Game start date time</label>
            <DateTimeWrapper inputProps={{ name: 'StartDateTime' }} />
          </div>
          <div>
            <label htmlFor="nameabbreviation">Name Abbreviation</label>
            <DateTimeWrapper inputProps={{ name: 'Duration' }} dateFormat={false} timeFormat="HH:mm" />
          </div>
        </NoRedirectForm>
      </DataLoader>
    </main>
  );
};
