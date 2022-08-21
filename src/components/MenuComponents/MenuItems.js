import DisplayStats from "./DisplayStats";
import NavBar from "./Navbar";
import Title from "./Title";
export default function MenuItems(props) {
  // document.getElementById("audio").play();

  return (
    <div className="menu-inner-background">
      <DisplayStats props={props.props} />
      <Title />
      <NavBar props={props.props} />
    </div>
  );
}
