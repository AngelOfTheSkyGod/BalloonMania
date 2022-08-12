import React from "react";
import { Icon } from "@iconify/react";
import { GiAirBalloon } from "react-icons/gi";

import {
  makeGrid,
  floatUp,
  popBalloon,
  revertHistory,
} from "../GameScripts/Grid";

// const colors = ["^", "&", "%", "#", "*"];
const colors = {
  "^": { color: "blue" },
  "&": { color: "red" },
  "%": { color: "green" },
  "#": { color: "yellow" },
  "*": { opacity: "0%", color: "blue" },
};

function onClick(row, column, game, setGame) {
  console.log(`popped: (${row}, ${column})`);
  popBalloon(game, row, column, setGame);
}
export default function GenerateGrid(props) {
  console.log("current version: ", props.props.game.currentBoard);
  let rows = props.props.game.history[props.props.game.currentBoard].board.map(
    (row) => {
      let balloons = row.map((balloon) => {
        return (
          <div
            className="Balloon"
            role="button"
            row={balloon.row}
            column={balloon.column}
            popped={balloon.popped}
            onClick={() =>
              onClick(
                balloon.row,
                balloon.col,
                props.props.game,
                props.props.setGame
              )
            }
          >
            <Icon
              icon="bi:balloon-fill"
              style={colors[balloon.color]}
              width="70%"
              height="80%"
              className="balloon-image"
            />
          </div>
        );
      });
      return balloons;
    }
  );

  return <div className="balloon-board">{rows}</div>;
}
