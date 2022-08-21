import ShopData from "../ShopComponents/ShopData";
import ShopCard from "../ShopComponents/ShopCard";
import DisplayStats from "../MenuComponents/DisplayStats";
import { Icon } from "@iconify/react";

function Reset(props) {
  props.setMode("Menu");
  props.setPoints(0);
  props.setScore(0);
  props.menuCooldown.current = false;
  props.setShowMenu({ activated: true, clicked: "" });
  props.setTime(30000);
  props.setCombo(0);
  props.loadedSinglePlayer.current = false;
  props.setShowSinglePlayer({
    activated: true,
    clicked: "",
  });
  props.popCooldown.current = false;
  props.setGameEnded(false);
  props.newHighScore.current = false;
  document.body.style.backgroundImage = "";
  document.body.style.backgroundColor = "#a2d2ff";
}

export default function Shop(props) {
  let items = ShopData.map((item) => {
    return <ShopCard {...{ ...item, ...props }} />;
  });
  return (
    <div className="shop-background">
      <audio
        id="audio"
        src={require("./audio/heretostay.mp3")}
        autoPlay="true"
        loop
      >
        {}
      </audio>
      <DisplayStats props={props} />
      <div className="shop-grid">{items}</div>
      <div className="end-return2">
        <Icon
          onClick={() => {
            Reset({ ...props });
          }}
          className="return-icon"
          icon="ic:sharp-menu-open"
          size="100%"
          color="#22aed1"
        />
      </div>
    </div>
  );
}
