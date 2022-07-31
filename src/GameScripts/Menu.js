import React from "react";
import { useSpring, animated } from "react-spring";
import MenuItems from "../MenuComponents/MenuItems";
export default function Menu(props) {
  const page = (
    <div className="menu-container">
      <div className="menu-background">
        <MenuItems props={props} />
      </div>
    </div>
  );
  return page;
}
