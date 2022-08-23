import React from "react";

import DisplayStatsSP from "../SinglePlayerComponents/DisplayStatsSP";
import GenerateGrid from "../SinglePlayerComponents/GenerateGrid";
import GameEnd from "../SinglePlayerComponents/GameEnd";

import { revertHistory } from "./Grid";

import { FaRedoAlt } from "react-icons/fa";

function rewindGridOneStep(props) {
  revertHistory(props.game, props.setGame, props.setTime, props.syncTime);
}
export default function SinglePlayer(props) {
  React.useEffect(() => {
    console.log("updated background image.");
    document.body.style.backgroundColor = "#000000";
    document.body.style.backgroundImage = `url(${
      props.background.backgrounds[props.background.index].link
    })`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }, []);

  return (
    <div className="SP-Background">
      <DisplayStatsSP props={props} />
      <GenerateGrid props={props} />
      <audio
        id="audio"
        src={require("./audio/escalon.mp3")}
        autoPlay="true"
        loop
      >
        {}
      </audio>
      {/* props.game, props.setGame, props.setTime, props.syncTime */}
      <div className="redo-background">
        <FaRedoAlt
          onClick={() => {
            rewindGridOneStep({
              game: props.game,
              setGame: props.setGame,
              setTime: props.setTime,
              syncTime: props.syncTime,
            });
          }}
          color="#0088ff"
          size="5rem"
          className="redo-icon"
        />
        <h1 className="background-settings-title">
          Boards: {props.game.currentBoard}
        </h1>
      </div>
      {props.gameEnded && <GameEnd props={props} />}
    </div>
  );
}
