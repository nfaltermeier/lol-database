import { NavLink, Outlet } from "react-router-dom";

export default function Add() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="team">Team</NavLink>
        <NavLink to="player">Player</NavLink>
        <NavLink to="game">Game</NavLink>
<<<<<<< HEAD
        <NavLink to="kill">Kill</NavLink>
=======
        <NavLink to="playerGameStats">Player game stats</NavLink>
>>>>>>> a4accc093988425f5b2f02665c458e33fb94e654
      </nav>
      <h1>Add data</h1>
      <Outlet />
    </div>
  );
};
