import { GiBalloons } from "react-icons/gi";

function MakeListSection({ title, data }) {
  return (
    <li className="points-container">
      <GiBalloons className="points-balloon" color="#00538F" />
      <div className="points-display">
        <h1 className="points-title">{title}:</h1>
        <h1 className="points-data">{data}</h1>
      </div>
    </li>
  );
}

export default function DisplayStatsSP(props) {
  let loaded = props.props.loadedSinglePlayer.current;
  props.props.loadedSinglePlayer.current = true;
  return (
    <ul
      className="stats-navbar"
      style={
        !loaded
          ? { animation: "points-balloon-float 1s ease-out forwards" }
          : {}
      }
    >
      <MakeListSection
        title={"Time left"}
        data={`${props.props.time / 1000} seconds`}
      />
      <MakeListSection title={"Score"} data={`${props.props.score} points`} />
      <MakeListSection title={"Combo"} data={`${props.props.combo} balloons`} />
    </ul>
  );
}
