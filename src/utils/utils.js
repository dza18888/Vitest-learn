// 防抖
function debounce(callBack, time) {
  let timeout = null;
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callBack(...args);
      clearTimeout(timeout);
      timeout = null;
    }, time);
  };
}

function RGBAtoRGB(r, g, b, a) {
  let r3 = Math.round(((1 - a) * 255) + (a * r))
  let g3 = Math.round(((1 - a) * 255) + (a * g))
  let b3 = Math.round(((1 - a) * 255) + (a * b))
  return `${r3}, ${g3}, ${b3}`;
}

export { debounce, RGBAtoRGB };
