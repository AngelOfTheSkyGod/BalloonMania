import React from "react";
import { Icon } from "@iconify/react";
import { GiAirBalloon } from "react-icons/gi";

// const colors = ["^", "&", "%", "#", "*"];
const colors = {
  "^": { color: "blue" },
  "&": { color: "red" },
  "%": { color: "green" },
  "#": { color: "green" },
  "*": { opacity: "0%", color: "blue" },
};
export default function GenerateGrid(props) {
  console.log(props);
  let rows = props.props.game.history[props.props.game.currentBoard].board.map(
    (row) => {
      let balloons = row.map((balloon) => {
        return (
          <div className="Balloon" role="button">
            <Icon
              icon="bi:balloon-fill"
              style={colors[balloon.color]}
              width="70%"
              height="80%"
            />
          </div>
        );
      });
      return balloons;
    }
  );

  return <div className="balloon-board">{rows}</div>;
}
