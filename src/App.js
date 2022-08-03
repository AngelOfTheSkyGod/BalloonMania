import React from "react";
import Menu from "./components/GameScripts/Menu";
import SinglePlayer from "./components/GameScripts/SinglePlayer.js";
import style from "./style.css";

export default function App() {
  const [mode, setMode] = React.useState("Menu");
  const [showMenu, setShowMenu] = React.useState(true);
  const [points, setPoints] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);

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
    ))
  );
}
