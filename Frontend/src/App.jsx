import classNames from 'classnames/bind';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './App.module.scss';

function App() {
	const cx = classNames.bind(styles);
	return (
		<div className={cx('app')}>
			<nav>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/mostPlayedChampions">Most Played Champions</NavLink>
				<NavLink to="/teamRankings">Team Rankings</NavLink>
				<NavLink to="/selectivePlayerStatistics">Selective Player Statistics</NavLink>
				<NavLink to="/topTeamPlayers">Top Team Players</NavLink>
				<NavLink to="/add">Add Data</NavLink>
			</nav>
			<header className={cx('app-header')}>
				<h1>LOL Database</h1>
			</header>
			<div className={cx('subpage')}>
				<Outlet />
			</div>
		</div>
	);
}

export default App;
