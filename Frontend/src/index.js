import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from "react-router-dom";
import './index.scss';
import Add from './routes/Add';
import App from './App';
import NotFound from './routes/404';
import Game from './routes/add/Game';
import Player from './routes/add/Player';
import PlayerGameStats from './routes/add/PlayerGameStats';
import Team from './routes/add/Team';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/add" element={<Add />} >
          <Route path="team" element={<Team />} />
          <Route path="player" element={<Player />} />
          <Route path="playerGameStats" element={<PlayerGameStats />} />
          <Route path="game" element={<Game />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
