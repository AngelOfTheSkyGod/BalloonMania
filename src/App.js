import React from "react";
import Menu from "./components/GameScripts/Menu";
import SinglePlayer from "./components/GameScripts/SinglePlayer.js";

import { makeGrid, floatUp } from "./components/GameScripts/Grid";
import style from "./style.css";

export default function App() {
  const [mode, setMode] = React.useState("Menu");
  const [showMenu, setShowMenu] = React.useState({
    activated: true,
    clicked: "",
  });
  const [points, setPoints] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);

  const [game, setGame] = React.useState({
    history: [
      { board: makeGrid([], 7, 7), points: 0, time: 30000, rows: 7, cols: 7 },
    ],
    currentBoard: 0,
  });

  const menuCooldown = React.useRef(false);

  //
  return (
    (mode === "Menu" && (
      <Menu
        mode={mode}
        setMode={setMode}
        points={points}
        setPoints={setPoints}
        score={score}
        setScore={setScore}
        highScore={highScore}
        sethighScore={setHighScore}
        menuCooldown={menuCooldown}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    )) ||
    (mode === "Single Player" && (
      <SinglePlayer
        mode={mode}
        setMode={setMode}
        points={points}
        setPoints={setPoints}
        score={score}
        setScore={setScore}
        highScore={highScore}
        sethighScore={setHighScore}
        menuCooldown={menuCooldown}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    ))
  );
}
