const body = document.querySelector("body");
const IMG_NUMBER = 7;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `assets/images/${imgNumber + 1}.jpg`;
  image.classList.add("bg-img");
  body.prepend(image);
}

function getRandom() {
  const number = Math.random() * IMG_NUMBER;

  return Math.floor(number);
}

function init() {
  const ramdomNumber = getRandom();
  paintImage(ramdomNumber);
}

init();
