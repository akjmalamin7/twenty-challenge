import { useState } from "react";
import PlayGround from "./playGround";

const PuttingAll = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(prev => !prev)}>
        {show ? "Unmount" : "Mount"} the component
      </button>
      {show && <hr />}
      {show && <PlayGround />}
    </>
  );
};
export default PuttingAll;