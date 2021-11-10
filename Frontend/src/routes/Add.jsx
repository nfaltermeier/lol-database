import { NavLink, Outlet } from "react-router-dom";

export default function Add() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="team">Team</NavLink>
        <NavLink to="player">Player</NavLink>
        <NavLink to="game">Game</NavLink>
        <NavLink to="playerGameStats">Player game stats</NavLink>
      </nav>
      <h1>Add data</h1>
      <Outlet />
    </div>
  );
};
