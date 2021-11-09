import axios from 'axios';
import { useCallback, useState } from 'react';
import DataLoader from '../../components/DataLoader';
import NoRedirectForm from "../../components/NoRedirectForm"

export default function Team() {
  const [state, setState] = useState({ isLoading: true, isErrored: false, data: null });
  const getData = useCallback(() => axios.get('http://localhost:28172/regions').then(data => data.data), []);

  return (
    <main>
      <h2>Team</h2>
      <DataLoader state={state} setState={setState} action={getData}>
        <NoRedirectForm id="team" url="http://localhost:28172/teams" method="post">
          <div>
            <label htmlFor="name">Name</label>
            <input name="name" type="text" />
          </div>
          <div>
            <label htmlFor="region">Region</label>
            <select name="regionID">
              <option value="">Please choose an option</option>
              {state.data != null && state.data.map(element => (
                <option key={element.id} value={element.id}>{element.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="logolink">Logo Link</label>
            <input name="logolink" type="text" />
          </div>
          <div>
            <label htmlFor="nameabbreviation">Name Abbreviation</label>
            <input name="nameabbreviation" type="text" />
          </div>
        </NoRedirectForm>
      </DataLoader>
    </main>
  )
};
