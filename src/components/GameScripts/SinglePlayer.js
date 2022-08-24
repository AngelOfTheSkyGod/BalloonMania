import React from "react";

import DisplayStatsSP from "../SinglePlayerComponents/DisplayStatsSP";
import GenerateGrid from "../SinglePlayerComponents/GenerateGrid";
import GameEnd from "../SinglePlayerComponents/GameEnd";

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
      {props.gameEnded && <GameEnd props={props} />}
    </div>
  );
}
