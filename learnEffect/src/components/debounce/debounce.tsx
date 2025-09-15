const Debounce = () => {
  const handleClick = () => {
    console.log("Click me");
  };

  const debounce = (cb: () => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb();
      }, delay);
    };
  };
  return (
    <>
      <button onClick={debounce(handleClick, 1000)}>click me</button>
    </>
  );
};
export default Debounce;