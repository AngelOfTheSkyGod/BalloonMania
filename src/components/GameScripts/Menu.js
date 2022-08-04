import React from "react";
import MenuItems from "../MenuComponents/MenuItems";
import { GiAirBalloon } from "react-icons/gi";
import Animation from "../Animations/Animation";

export default function Menu(props) {
  console.log(props);
  const page = (
    <div
      className="menu-container"
      style={props.showMenu.activated === false ? Animation[1] : {}}
    >
      <div className="menu-background">
        <GiAirBalloon
          className="menu-balloon"
          color="#003f7a"
          style={props.showMenu.activated === false ? Animation[2] : {}}
        />
        <MenuItems props={props} />
      </div>
    </div>
  );
  return page;
}
