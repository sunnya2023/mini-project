// const color = document.getElementById("color");
// const colorOption = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color-peeker");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const modeBtn = document.getElementById("mode-btn");
const resetBtn = document.getElementById("reset-btn");
const eraserBtn = document.getElementById("eraser-btn");

const canvas = document.querySelector("canvas");
const lineWidth = document.getElementById("line-width");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;

// ctx.fillRect()

//2. storoke로 사각형만들기
// ctx.moveTo(50, 50)
// ctx.lineTo(150, 50)
// ctx.lineTo(150, 150)
// ctx.lineTo(50, 150)
// ctx.lineTo(50, 50)
// ctx.fill()

//3. 집 만들기
// ctx.fillRect(200, 200, 50, 200)
// ctx.fillRect(400, 200, 50, 200)
// ctx.fillRect(300, 300, 50, 100)
// ctx.fillRect(200, 200, 200, 20)
// ctx.moveTo(200, 200)
// ctx.lineTo(325, 100)
// ctx.lineTo(450, 200)
// ctx.fill()

//4. 아바타 만들기
// ctx.fillRect(220 - 40, 210, 15, 100)
// ctx.fillRect(350 - 40, 210, 15, 100)
// ctx.fillRect(260 - 40, 210, 60, 200)

// ctx.arc(250, 150, 50, 0, 2 * Math.PI)
// ctx.fill()

// ctx.beginPath()
// ctx.fillStyle = "white"
// ctx.arc(260, 140, 8, Math.PI, 2 * Math.PI)
// ctx.arc(230, 140, 8, Math.PI, 2 * Math.PI)
// ctx.fill()

//클릭 이벤트로 색깔별 줄 그리기

// ctx.moveTo(0, 0)
// const colors = [
//     "#1abc9c",
//     "#27ae60",
//     "#3498db",
//     "#f1c40f",
//     "#e67e22",
//     "#e74c3c",
//     "#ecf0f1"
// ]
// const clickOn = (e) => {
//     ctx.beginPath()
//     ctx.moveTo(0, 0)
//     const color = colors[Math.floor(Math.random() * colors.length)]
//     ctx.strokeStyle = color
//     ctx.lineTo(e.offsetX, e.offsetY)
//     ctx.stroke()

// }

// canvas.addEventListener('click', clickOn)

//마우스 다운/업/리브로 그림 그리기

let isPaiting = false;
let isFilling = false;

const draw = function (e) {
  if (isPaiting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
};

const starPainting = function () {
  isPaiting = true;
};
const endPainting = function () {
  isPaiting = false;
};
function onLineWidthChange(e) {
  console.log(e.target.value);
  ctx.lineWidth = e.target.value;
}

// function onColorChange(e) {
//   console.log(e.target.value);
//   ctx.strokeStyle = e.target.value;
//   ctx.fillStyle = e.target.value;
// }

// function onColorClick(e) {
//   console.log(e);
//   //   console.dir(e.target.dataset.color);
//   const colorValue = e.target.dataset.color;
//   ctx.strokeStyle = colorValue;
//   ctx.fillStyle = colorValue;
//   color.value = colorValue;
// }

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", starPainting);
canvas.addEventListener("mouseup", endPainting);
canvas.addEventListener("mouseleave", endPainting);

// lineWidth.addEventListener("change", onLineWidthChange);
// color.addEventListener("change", onColorChange);

// colorOption.forEach((color) => color.addEventListener("click", onColorClick));

function onColorChange(e) {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
}

function onColorChoice(e) {
  //   console.log(e.target.dataset.color);
  const colorValue = e.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}
function onModeChange() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerHTML = "draw";
  } else {
    isFilling = true;
    modeBtn.innerHTML = "Fill";
  }
}

function onCanvasChange() {
  if (isFilling) {
    ctx.fillRect(0, 0, 800, 800);
  }
}

function onResetChange() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 800);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerHTML = "draw";
}

color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorChoice));
// console.log(colorOptions);
modeBtn.addEventListener("click", onModeChange);
canvas.addEventListener("click", onCanvasChange);
resetBtn.addEventListener("click", onResetChange);
eraserBtn.addEventListener("click", onEraserClick);
