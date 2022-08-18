import ConfirmBuy from "./ConfirmBuy";

// key: "default",
//         name: "Default Sky",
//         tag: "Background",
//         price: 0,
//         link: "https://wallpaperaccess.com/full/8132764.jpg",
function OwnsItem(item, backgrounds) {
  // console.log(item, backgrounds, "stuff");
  for (let i = 0; i < backgrounds.length; i++) {
    if (backgrounds[i].name == item) {
      return true;
    }
  }
  return false;
}

function onSelectBuy(currentItem, setCurrentItem, item, backgrounds) {
  if (OwnsItem(item, backgrounds)) {
    return;
  }
  setCurrentItem(item);
}

// {

//   totalpoints: props.background,
//   setBackground: props.setBackground,
//   totalPoints: props.totalPoints,
//   setTotalPoints: props.setTotalPoints,
// }
export default function ShopCard(props) {
  return (
    <div className="shopcard-background">
      {props.currentItem === props.name ? (
        <ConfirmBuy {...props} />
      ) : (
        <div className="shop-foreground">
          <img
            role="button"
            onClick={() => {
              onSelectBuy(
                props.currentItem,
                props.setCurrentItem,
                props.name,
                props.background.backgrounds
              );
            }}
            className="shop-display"
            style={
              OwnsItem(props.name, props.background.backgrounds)
                ? { backgroundColor: "black", opacity: 0.1 }
                : {}
            }
            src={props.link}
            alt={props.name}
          />
          <h1 className="price-display">Price : {props.price} points</h1>
        </div>
      )}
    </div>
  );
}
