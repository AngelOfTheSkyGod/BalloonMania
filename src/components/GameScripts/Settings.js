import { Icon } from "@iconify/react";

function increaseIndex(props) {
  props.background.index++;
  if (props.background.index >= props.background.backgrounds.length) {
    props.background.index = 0;
  }
  props.setBackground((prevBackground) => {
    let backgroundObject = JSON.parse(JSON.stringify(prevBackground));

    backgroundObject.index = props.background.index;
    return backgroundObject;
  });
}

function decreaseIndex(props) {
  props.background.index--;
  if (props.background.index < 0) {
    props.background.index = props.background.backgrounds.length - 1;
  }
  props.setBackground((prevBackground) => {
    let backgroundObject = JSON.parse(JSON.stringify(prevBackground));

    backgroundObject.index = props.background.index;
    return backgroundObject;
  });
}
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
export default function Settings(props) {
  return (
    <div className="BACKGROUND-SETTINGS">
      <ul className="settings-background">
        <ul className="background-settings-background">
          <h1 className="background-settings-title ">
            Current Background:
            {props.background.backgrounds[props.background.index].name}
          </h1>
          <li className="background-settings-background">
            <Icon
              onClick={() => {
                increaseIndex({ ...props });
              }}
              icon="akar-icons:arrow-left-thick"
              width="5rem"
              color="#0088ff"
            />
            <Icon
              onClick={() => {
                decreaseIndex({ ...props });
              }}
              icon="akar-icons:arrow-right-thick"
              width="5rem"
              color="#0088ff"
            />
          </li>
        </ul>
      </ul>
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
