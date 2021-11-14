import { NavLink } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<div className="App">
			<nav>
				<NavLink to="add">Add data</NavLink>
			</nav>
			<header className="App-header">
				<h1>LOL Database</h1>
			</header>
		</div>
	);
}

export default App;
