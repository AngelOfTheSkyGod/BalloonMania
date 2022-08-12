import React from "react";
import Menu from "./components/GameScripts/Menu";
import SinglePlayer from "./components/GameScripts/SinglePlayer";

import {
  makeGrid,
  floatUp,
  popBalloon,
  revertHistory,
} from "./components/GameScripts/Grid";
import style from "./style.css";
let coordinate = { row: -1, col: -1 };
function updatePoints(pointsGained, setScore) {
  setScore((prevScore) => {
    return pointsGained;
  });
}

function updateCombo(balloonsPopped, setCombo) {
  setCombo(balloonsPopped);
}

export default function App() {
  console.log("Rerendered");
  const [mode, setMode] = React.useState("Menu");
  const [showMenu, setShowMenu] = React.useState({
    activated: true,
    clicked: "",
  });
  const [points, setPoints] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);

  const menuCooldown = React.useRef(false);

  const [game, setGame] = React.useState({
    history: [
      {
        board: makeGrid([], 7, 7),
        points: 0,
        time: 30000,
        rows: 7,
        cols: 7,
        popped: 0,
      },
    ],
    currentBoard: 0,
  });
  ///////////////////////////////////////////////////Single Player
  const [time, setTime] = React.useState(180000);
  const [combo, setCombo] = React.useState(0);
  const loadedSinglePlayer = React.useRef(false);
  const [showSinglePlayer, setShowSinglePlayer] = React.useState({
    activated: true,
    clicked: "",
  });
  ///////////////////////////////////////////////////Single Player
  React.useEffect(() => {
    updatePoints(game.history[game.currentBoard].points, setScore);
    updateCombo(game.history[game.currentBoard].popped, setCombo);
  }, [game]);

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
        game={game}
        setGame={setGame}
        time={time}
        setTime={setTime}
        combo={combo}
        setCombo={setCombo}
        loadedSinglePlayer={loadedSinglePlayer}
        showSinglePlayer={showSinglePlayer}
        setShowSinglePlayer={setShowSinglePlayer}
      />
    ))
  );
}

//TOY PROGRAM FOR TESTING GRID.JS
/*
 // (gameObject, row, col)
  React.useEffect(() => {
    function keyListener(event) {
      if (!isNaN(event.key) && coordinate.col === -1) {
        if (coordinate.row === -1) {
          coordinate.row = event.key;
        } else {
          coordinate.col = event.key;
        }
      } else if (event.key === "Enter" || coordinate.col !== -1) {
        setGame((oldBoard) => {
          let board = popBalloon(
            game,
            parseInt(coordinate.row),
            parseInt(coordinate.col)
          );
          if (board != null) {
            return board;
          }
          return oldBoard;
        });

        coordinate.row = -1;
        coordinate.col = -1;
      } else if (event.key.toLowerCase() === "z") {
        setGame((oldBoard) => {
          let board = revertHistory(game);
          if (board != null) {
            return board;
          }
          return oldBoard;
        });
      }
      console.log(`coordinate: (${coordinate.row}, ${coordinate.col})`);
    }
    // Update the document title using the browser API
    document.addEventListener("keypress", keyListener);

    return () => {
      console.log("deleted event.");
      document.removeEventListener("keypress", keyListener);
    };
  }, []);
*/
