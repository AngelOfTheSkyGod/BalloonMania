import { GiDart } from "react-icons/gi";
import { GiFallingStar } from "react-icons/gi";

export default function DisplayStats(props) {
  return (
    <nav>
      <ul className="display-navbar">
        <li className="display-container">
          <GiDart size="3rem" color="#ADE8F4" stroke="black" strokeWidth="5" />
          <h1 className="display-title">Points: {props.points}</h1>
        </li>
        <li className="display-container">
          <GiFallingStar
            size="3rem"
            color="#ADE8F4"
            stroke="black"
            strokeWidth="5"
          />
          <h1 className="display-title">High-Score: {props.highScore}</h1>
        </li>
      </ul>
    </nav>
  );
}
