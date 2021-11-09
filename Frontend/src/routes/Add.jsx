import { NavLink, Outlet } from "react-router-dom"

export default function Add() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="Team">Team</NavLink>
      </nav>
      <h1>Add data</h1>
      <Outlet />
    </div>
  )
};
