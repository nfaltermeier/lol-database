import NoRedirectForm from './NoRedirectForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NoRedirectForm id="team" url="http://localhost:28172/teams" method="post">
          <div>
            <label htmlFor="name">Name</label>
            <input name="name" type="text" />
          </div>
          <div>
            {/* Should be a select */}
            <label htmlFor="region">Region</label>
            <input name="regionID" type="number" />
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
      </header>
    </div>
  );
}

export default App;
