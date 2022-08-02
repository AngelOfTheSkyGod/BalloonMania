import React from "react";
import MenuItems from "../MenuComponents/MenuItems";
import { GiAirBalloon } from "react-icons/gi";
export default function Menu(props) {
  const page = (
    <div className="menu-container">
      <div className="menu-background">
        <GiAirBalloon className="menu-balloon" color="#003f7a" />
        <MenuItems
          mode={props.mode}
          setMode={props.setMode}
          points={props.points}
          setPoints={props.setPoints}
          score={props.score}
          setScore={props.setScore}
          highScore={props.highScore}
          sethighScore={props.setHighScore}
        />
      </div>
    </div>
  );
  return page;
}
