import { NavLink, Outlet } from "react-router-dom";
import "./Add.scss";

export default function Add() {
	return (
		<div>
			<nav>
				<NavLink to="/">Home</NavLink>
				<NavLink to="team">Team</NavLink>
				<NavLink to="player">Player</NavLink>
				<NavLink to="game">Game</NavLink>
				<NavLink to="kill">Kill</NavLink>
				<NavLink to="playerGameStatsAndRunes">Player Game Stats &amp; Runes</NavLink>
				<NavLink to="item">Item</NavLink>
				<NavLink to="itemAcquisition">Item Acquisition</NavLink>
				<NavLink to="objectiveStat">Objective Stat</NavLink>
			</nav>
			<div className="addContainer">
				<h1>Add Data</h1>
				<Outlet />
			</div>
		</div>
	);
};
