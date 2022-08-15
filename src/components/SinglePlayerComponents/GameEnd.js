import { Icon } from "@iconify/react";
import Confetti from "react-confetti";
import useWindowSize from "@rooks/use-window-size";
import { makeGrid } from "../GameScripts/Grid";

function Reset(props) {
  props.props.setMode("Menu");
  props.props.setPoints(0);
  props.props.setScore(0);
  props.props.menuCooldown.current = false;
  props.props.setShowMenu({ activated: true, clicked: "" });
  props.props.setGame({
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
  props.props.setTime(30000);
  props.props.setCombo(0);
  props.props.loadedSinglePlayer.current = false;
  props.props.setShowSinglePlayer({
    activated: true,
    clicked: "",
  });
  props.props.popCooldown.current = false;
  props.props.setGameEnded(false);
  props.props.newHighScore.current = false;
  document.body.style.backgroundImage = "";
  document.body.style.backgroundColor = "#a2d2ff";
}

export default function GameEnd(props) {
  let message = "";
  // const { width, height } = useWindowSize();
  const { width, height } = useWindowSize();

  if (props.props.newHighScore.current) {
    message = "(New Top Score!)";
  }
  return (
    <div className="end-background">
      <div className="end-foreground">
        <ul className="end-navbar">
          {props.props.newHighScore.current && (
            <Confetti width={width} height={height} />
          )}
          <li className="end-list">
            <p className="end-title">&#11088; Results &#11088;</p>
          </li>
          <li className="end-list">
            <h1 className="end-text">
              Balloons popped:{" "}
              {
                props.props.game.history[props.props.game.currentBoard]
                  .totalPopped
              }
            </h1>
          </li>
          <li className="end-list">
            <h1 className="end-text">
              Highest Combo:{" "}
              {props.props.game.history[props.props.game.currentBoard].topCombo}
            </h1>
          </li>
          <li className="end-list">
            <h1 className="end-text">Score: {props.props.score}</h1>
          </li>
          <li className="end-list">
            <h1 className="end-text">
              High Score: {`${props.props.highScore} ${message}`}
            </h1>
          </li>
        </ul>
      </div>
      <div className="end-return">
        <Icon
          onClick={() => {
            Reset(props);
          }}
          className="return-icon"
          icon="ic:sharp-menu-open"
          size="100%"
          color="#22aed1"
        />
      </div>
    </div>
  );
}
