import { GiBalloons } from "react-icons/gi";

import { revertHistory } from "../GameScripts/Grid";

import { FaRedoAlt } from "react-icons/fa";

function rewindGridOneStep(props) {
  revertHistory(props.game, props.setGame, props.setTime, props.syncTime);
}
function MakeListSection({ title, data }) {
  return (
    <li className="points-container">
      <GiBalloons className="points-balloon" color="#00538F" />
      <div className="points-display">
        <h1 className="points-title">{title}:</h1>
        <h1 className="points-data">{data}</h1>
      </div>
    </li>
  );
}

export default function DisplayStatsSP(props) {
  let loaded = props.props.loadedSinglePlayer.current;
  props.props.loadedSinglePlayer.current = true;
  return (
    <ul
      className="stats-navbar"
      style={
        !loaded
          ? { animation: "points-balloon-float 1s ease-out forwards" }
          : {}
      }
    >
      <MakeListSection
        title={"Time left"}
        data={`${(props.props.time / 30000) * 30} seconds`}
      />
      <MakeListSection title={"Score"} data={`${props.props.score} points`} />
      <MakeListSection title={"Combo"} data={`${props.props.combo} balloons`} />
      <li className="points-container">
        <div className="redo-background">
          <FaRedoAlt
            onClick={() => {
              rewindGridOneStep({
                game: props.props.game,
                setGame: props.props.setGame,
                setTime: props.props.setTime,
                syncTime: props.props.syncTime,
              });
            }}
            color="#0088ff"
            size="5rem"
            className="redo-icon"
          />
          <h1 className="background-settings-title">
            Boards: {props.props.game.currentBoard}
          </h1>
        </div>
      </li>
    </ul>
  );
}
