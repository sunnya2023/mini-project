// const images = ["boat.jpg", "fallen.jpg", "river.jpg", "see.jpg", "soop.jpgn "];

// const chosenImage = images[Math.floor(Math.random() * images.length)];

// const bgImage = document.createElement("img");
// bgImage.src = `img/${chosenImage}`;
// console.log(chosenImage);
// console.log(bgImage);

// document.body.appendChild(bgImage);

const images = ["soop.jpg", "fallen.jpg", "boat.jpg", "river.jpg", "see.jpg"];

const chosenImg = images[Math.floor(Math.random() * images.length)];

const imgElement = document.createElement("img");
// console.log(imgElement);

imgElement.src = `img/${chosenImg}`;
document.body.appendChild(imgElement);
