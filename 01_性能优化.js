onload = function () {
  const ele = document.getElementsByTagName("div")[0];
  console.log("onload", ele);
};
addEventListener("DOMContentLoaded", () => {
  const ele = document.getElementsByTagName("div")[0];
  console.log("DOMContentLoaded", ele);
});
const ele = document.getElementsByTagName("div")[0];
console.log(ele);

let id = requestAnimationFrame(fn);

function fn() {
  console.log(1);
  id = requestAnimationFrame(fn);
}

setTimeout(() => {
  cancelAnimationFrame(id);
}, 1000);
