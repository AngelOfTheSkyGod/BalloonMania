import { Icon } from "@iconify/react";

// key: "default",
//         name: "Default Sky",
//         tag: "Background",
//         price: 0,
//         link: "https://wallpaperaccess.com/full/8132764.jpg",

function onAcceptBuy(props) {
  if (props.totalPoints > props.price) {
    props.setTotalPoints(props.totalPoints - props.price);
    props.setBackground((prevBackground) => {
      let backgroundObject = JSON.parse(JSON.stringify(prevBackground));
      let newBackground = [...prevBackground.backgrounds];
      newBackground.push({
        key: prevBackground.backgrounds.length + 1,
        name: props.name,
        tag: props.tag,
        price: props.price,
        link: props.link,
      });
      backgroundObject.backgrounds = newBackground;
      return backgroundObject;
    });
  }
  props.setCurrentItem(" ");
}

function onDeclineBuy(props) {
  props.setCurrentItem(" ");
  console.log("Declined buy!");
}

export default function ConfirmBuy(props) {
  return (
    <div className="confirm-buy-background">
      <h1 className="price-display">
        Would you like to buy {props.name} ({props.tag}) for {props.price}{" "}
        points?
      </h1>
      <ul className="choice-background">
        <li
          role="button"
          onClick={() => {
            onAcceptBuy({ ...props });
          }}
        >
          <Icon color="#00D024" icon="dashicons:yes" width="2.1rem" />
        </li>
        <li
          role="button"
          onClick={() => {
            onDeclineBuy({ ...props });
          }}
        >
          <Icon color="#ee2400" icon="dashicons:no" width="2.1rem" />
        </li>
      </ul>
    </div>
  );
}
