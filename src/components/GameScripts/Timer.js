export default function Timer(props) {
  if (props.time <= 0) {
    props.setGameEnded(true);
    return;
  }
  // console.log(`time: ${props.time}`);
  setTimeout(() => {
    props.syncTime.current -= 1000;
    props.setTime(props.syncTime.current);
    Timer({
      ...props,
      time: props.syncTime.current,
      setTime: props.setTime,
    });
  }, 1000);
}
