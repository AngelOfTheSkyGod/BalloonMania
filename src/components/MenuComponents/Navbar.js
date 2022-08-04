import { FiSettings } from "react-icons/fi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GiCornerExplosion } from "react-icons/gi";
import Animation from "../Animations/Animation";

function updateMode(mode, setMode, cooldown, setShowMenu) {
  if (cooldown.current) {
    return;
  }
  setShowMenu({ activated: false, clicked: mode });
  setTimeout(() => {
    setMode(mode);
  }, "1000");
  cooldown.current = true;
}

export default function Navbar(props) {
  return (
    <nav className="navbar-selection">
      <ul className="selection-navbar">
        <li
          style={
            props.props.showMenu.activated === false &&
            props.props.showMenu.clicked === "Single Player"
              ? Animation[0]
              : {}
          }
          className="selection-container"
          role="button"
          onClick={() =>
            updateMode(
              "Single Player",
              props.props.setMode,
              props.props.menuCooldown,
              props.props.setShowMenu
            )
          }
        >
          <GiCornerExplosion
            className="selection-icon"
            size="2rem"
            color="#0077B6"
          />
          <h1 className="selection-title">Single Player</h1>
        </li>
        <li
          style={
            props.props.showMenu.activated === false &&
            props.props.showMenu.clicked === "Shop"
              ? Animation[0]
              : {}
          }
          className="selection-container"
          role="button"
          onClick={() =>
            updateMode(
              "Shop",
              props.props.setMode,
              props.props.menuCooldown,
              props.props.setShowMenu
            )
          }
        >
          <FaMoneyBillAlt
            className="selection-icon"
            size="2rem"
            color="#0077B6"
          />
          <h1 className="selection-title">Shop</h1>
        </li>
        <li
          style={
            props.props.showMenu.activated === false &&
            props.props.showMenu.clicked === "Settings"
              ? Animation[0]
              : {}
          }
          className="selection-container"
          role="button"
          onClick={() =>
            updateMode(
              "Settings",
              props.props.setMode,
              props.props.menuCooldown,
              props.props.setShowMenu
            )
          }
        >
          <FiSettings className="selection-icon" size="2rem" color="#0077B6" />
          <h1 className="selection-title">Settings</h1>
        </li>
      </ul>
    </nav>
  );
}
