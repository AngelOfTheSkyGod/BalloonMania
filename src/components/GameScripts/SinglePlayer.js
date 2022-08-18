import React from "react";

import DisplayStatsSP from "../SinglePlayerComponents/DisplayStatsSP";
import GenerateGrid from "../SinglePlayerComponents/GenerateGrid";
import GameEnd from "../SinglePlayerComponents/GameEnd";

import Grid from "../GameScripts/Grid";

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
      {props.gameEnded && <GameEnd props={props} />}
    </div>
  );
}
