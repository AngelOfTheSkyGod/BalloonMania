import React from "react";
import Menu from "./components/GameScripts/Menu";
import SinglePlayer from "./components/GameScripts/SinglePlayer";
import style from "./style.css";

export default function App() {
  const [mode, setMode] = React.useState("Menu");
  console.log("mode: " + mode);
  const page =
    (mode == "Menu" && <Menu mode={mode} setMode={setMode} />) ||
    (mode == "SinglePlayer" && <SinglePlayer />);
  return page;
}
