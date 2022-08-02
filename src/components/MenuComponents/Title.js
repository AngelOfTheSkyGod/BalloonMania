import React from "react";

import { GiBalloons } from "react-icons/gi";
export default function Title() {
  return (
    <div class="title-navbar">
      <GiBalloons size="3rem" color="black" />
      <h1 className="game-title"> Balloon Mania! </h1>
      <GiBalloons size="3rem" color="black" />
    </div>
  );
}
