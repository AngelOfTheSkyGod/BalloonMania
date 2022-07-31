import React from "react";
import Menu from "./components/GameScripts/Menu";
import SinglePlayer from "./components/GameScripts/SinglePlayer";
import style from "./style.css";

export default function App() {
  const [mode, setMode] = React.useState("Menu");
  const [points, setPoints] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);

  const page =
    (mode == "Menu" && (
      <Menu
        mode={mode}
        setMode={setMode}
        points={points}
        setPoints={setPoints}
        score={score}
        setScore={setScore}
        highScore={highScore}
        sethighScore={setHighScore}
      />
    )) ||
    (mode == "SinglePlayer" && (
      <SinglePlayer
        mode={mode}
        setMode={setMode}
        points={points}
        setPoints={setPoints}
        score={score}
        setScore={setScore}
        highScore={highScore}
        sethighScore={setHighScore}
      />
    ));
  return page;
}
