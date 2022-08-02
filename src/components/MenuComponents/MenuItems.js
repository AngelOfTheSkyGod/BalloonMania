import DisplayStats from "./DisplayStats";
import NavBar from "./Navbar";
import Title from "./Title";
export default function MenuItems(props) {
  return (
    <div className="menu-inner-background">
      <DisplayStats
        mode={props.mode}
        setMode={props.setMode}
        points={props.points}
        setPoints={props.setPoints}
        score={props.score}
        setScore={props.setScore}
        highScore={props.highScore}
        sethighScore={props.setHighScore}
      />
      <Title />
      <NavBar />
    </div>
  );
}
