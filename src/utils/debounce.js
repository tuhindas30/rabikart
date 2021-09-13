const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export default debounce;
