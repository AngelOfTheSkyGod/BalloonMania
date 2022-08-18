import React from "react";
import Menu from "./components/GameScripts/Menu";
import SinglePlayer from "./components/GameScripts/SinglePlayer";
import Shop from "./components/GameScripts/Shop";
import Timer from "./components/GameScripts/Timer";
import Settings from "./components/GameScripts/Settings";
import {
  makeGrid,
  floatUp,
  popBalloon,
  revertHistory,
} from "./components/GameScripts/Grid";
import style from "./style.css";
let coordinate = { row: -1, col: -1 };
function updatePoints(
  pointsGained,
  setScore,
  setTotalPoints,
  setHighScore,
  newHighScore,
  highScore
) {
  if (pointsGained > highScore) {
    console.log(`should update high score!: ${pointsGained}`);
    newHighScore.current = true;
    setHighScore(pointsGained);
  }
  setScore((prevScore) => {
    return pointsGained;
  });
  setTotalPoints((prevTotalPoints) => {
    return prevTotalPoints + pointsGained;
  });
}

function updateCombo(balloonsPopped, setCombo) {
  setCombo(balloonsPopped);
}

export default function App() {
  // console.log("Rerendered");
  const [mode, setMode] = React.useState("Menu");
  const [showMenu, setShowMenu] = React.useState({
    activated: true,
    clicked: "",
  });
  const [points, setPoints] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(
    JSON.parse(localStorage.getItem("highScore6")) || 0
  );
  const [totalPoints, setTotalPoints] = React.useState(
    JSON.parse(localStorage.getItem("totalPoints")) || 0
  );
  const menuCooldown = React.useRef(false);

  const [game, setGame] = React.useState({
    history: [
      {
        board: makeGrid([], 7, 7),
        points: 0,
        time: 60000,
        rows: 7,
        cols: 7,
        balloonsPopped: 0,
        topCombo: 0,
        popped: false,
        totalPopped: 0,
      },
    ],
    currentBoard: 0,
  });
  ///////////////////////////////////////////////////Single Player
  const [time, setTime] = React.useState(30000);
  const [combo, setCombo] = React.useState(0);
  const loadedSinglePlayer = React.useRef(false);
  const [showSinglePlayer, setShowSinglePlayer] = React.useState({
    activated: true,
    clicked: "",
  });
  const popCooldown = React.useRef(false);
  const [gameEnded, setGameEnded] = React.useState(false);
  const newHighScore = React.useRef(false);

  ///////////////////////////////////////////////////Single Player
  ///////////////////////////////////////////////////Shop
  let [currentItem, setCurrentItem] = React.useState("");
  const [background, setBackground] = React.useState(
    JSON.parse(localStorage.getItem("background2")) || {
      currentBackground: "https://wallpaperaccess.com/full/8132764.jpg",
      index: 0,
      backgrounds: [
        {
          key: "0",
          name: "Default Sky",
          tag: "Background",
          price: 0,
          link: "https://wallpaperaccess.com/full/8132764.jpg",
        },
      ],
    }
  );
  ///////////////////////////////////////////////////Shop
  React.useEffect(() => {
    updatePoints(
      game.history[game.currentBoard].points,
      setScore,
      setTotalPoints,
      setHighScore,
      newHighScore,
      highScore
    );
    updateCombo(game.history[game.currentBoard].balloonsPopped, setCombo);
  }, [game]);

  React.useEffect(() => {
    if (mode != "Single Player") {
      return;
    }
    Timer({
      time: time,
      setTime: setTime,
      gameEnded: gameEnded,
      setGameEnded: setGameEnded,
      score: score,
      highScore: highScore,
      newHighScore: newHighScore,
      setHighScore: setHighScore,
    });
  }, [mode]);

  React.useEffect(() => {
    localStorage.setItem("totalPoints", JSON.stringify(totalPoints));
    localStorage.setItem("highScore6", JSON.stringify(highScore));
    localStorage.setItem("background2", JSON.stringify(background));
  }, [totalPoints, highScore, background]);

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
        totalPoints={totalPoints}
        setTotalPoints={setTotalPoints}
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
        setHighScore={setHighScore}
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
        popCooldown={popCooldown}
        totalPoints={totalPoints}
        setTotalPoints={setTotalPoints}
        gameEnded={gameEnded}
        setGameEnded={setGameEnded}
        newHighScore={newHighScore}
        setShowMenu={setShowMenu}
        background={background}
        setBackground={setBackground}
      />
    )) ||
    (mode === "Shop" && (
      <Shop
        mode={mode}
        setMode={setMode}
        points={points}
        setPoints={setPoints}
        score={score}
        setScore={setScore}
        highScore={highScore}
        setHighScore={setHighScore}
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
        popCooldown={popCooldown}
        totalPoints={totalPoints}
        setTotalPoints={setTotalPoints}
        gameEnded={gameEnded}
        setGameEnded={setGameEnded}
        newHighScore={newHighScore}
        setShowMenu={setShowMenu}
        background={background}
        setBackground={setBackground}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
      />
    )) ||
    (mode === "Settings" && (
      <Settings
        mode={mode}
        setMode={setMode}
        points={points}
        setPoints={setPoints}
        score={score}
        setScore={setScore}
        highScore={highScore}
        setHighScore={setHighScore}
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
        popCooldown={popCooldown}
        totalPoints={totalPoints}
        setTotalPoints={setTotalPoints}
        gameEnded={gameEnded}
        setGameEnded={setGameEnded}
        newHighScore={newHighScore}
        setShowMenu={setShowMenu}
        background={background}
        setBackground={setBackground}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
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
    document.addEventListener("keypress", keyListener);

    return () => {
      console.log("deleted event.");
      document.removeEventListener("keypress", keyListener);
    };
  }, []);
*/

//  time: time,
// setTime: setTime,
// mode: mode,
// setMode: setMode,
// showMenu: showMenu,
// setShowMenu: setShowMenu,
// points: points,
// setPoints: setPoints,
// score: score,
// setScore: setScore,
// highScore: highScore,
// setHighScore: setHighScore,
// menuCooldown: menuCooldown,
// game: game,
// setGame: setGame,
// loadedSinglePlayer: loadedSinglePlayer,
// showSinglePlayer: showSinglePlayer,
// setShowSinglePlayer: setShowSinglePlayer,
// popCooldown: popCooldown,
