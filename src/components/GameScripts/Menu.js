import React from "react";
import { useSpring, animated } from "react-spring";

//import MenuList from "/components/MenuComponents/MenuList";
export default function Menu(props) {
  const page = (
    <div className="Menu-background">
      <h1 className="Menu-title">Balloon Pop Mania</h1>
      {/* <MenuList /> */}
    </div>
  );
  console.log("called menu");
  return page;
}
