// const clock = document.querySelector("#clock");

// function getClock() {
//   const date = new Date();
//   const hours = String(date.getHours()).padStart(2, "0");
//   const mitnutes = String(date.getMinutes()).padStart(2, "0");
//   const seconds = String(date.getSeconds()).padStart(2, "0");
//   clock.textContent = `${hours}:${mitnutes}:${seconds}`;
// }
// getClock();
// setInterval(getClock, 1000);
const clock = document.querySelector(".clock");

function clockHandler() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const mitnutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  clock.textContent = `${hours}:${mitnutes}:${seconds}`;
}

clockHandler();
setInterval(clockHandler, 1000);
