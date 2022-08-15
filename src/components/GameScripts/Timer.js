export default function Timer(props) {
  if (props.time <= 0) {
    props.setGameEnded(true);
    return;
  }
  // console.log(`time: ${props.time}`);
  setTimeout(() => {
    props.setTime(props.time - 1000);

    Timer({
      ...props,
      time: props.time - 1000,
      setTime: props.setTime,
    });
  }, 1000);
}
