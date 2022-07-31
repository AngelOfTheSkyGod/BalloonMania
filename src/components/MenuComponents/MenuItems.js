import DisplayStats from "./DisplayStats";
import NavBar from "./Navbar";

export default function MenuItems(props) {
  return (
    <div className="menu-inner-background">
      <DisplayStats props={props} />
      <h1 className="game-title"> Balloon Mania! </h1>
      {/* <NavBar props={props} /> */}
    </div>
  );
}
