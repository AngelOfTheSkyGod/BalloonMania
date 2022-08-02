import { FiSettings } from "react-icons/fi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GiCornerExplosion } from "react-icons/gi";
export default function Navbar(props) {
  return (
    <nav className="navbar-selection">
      <ul className="selection-navbar">
        <li className="selection-container">
          <GiCornerExplosion
            className="selection-icon"
            size="2rem"
            color="#0077B6"
          />
          <h1 className="selection-title">Single Player</h1>
        </li>
        <li className="selection-container">
          <FaMoneyBillAlt
            className="selection-icon"
            size="2rem"
            color="#0096C7"
          />
          <h1 className="selection-title">Shop</h1>
        </li>
        <li className="selection-container">
          <FiSettings className="selection-icon" size="2rem" color="#00B4D8" />
          <h1 className="selection-title">Settings</h1>
        </li>
      </ul>
    </nav>
  );
}
