import { useEffect, useState } from "react";

const PlayGround = () => {
  const [text, setText] = useState("a");
  useEffect(() => {
    function onTimeout() {
      console.log("Clock " + text)
    }
    console.log("Schedule " + text + " log")
    const timeoutId = setTimeout(onTimeout, 3000)
    return () => {
      console.log("Cancel " + text + " log");
      clearTimeout(timeoutId)
    }
  }, [text])
  return (
    <>
      <label>What to log: {" "} <input value={text} onChange={(e) => setText(e.target.value)} /></label>
      <h1>{text}</h1>
    </>
  );
};
export default PlayGround;