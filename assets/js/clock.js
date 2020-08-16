const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
const dayTitle = clockContainer.querySelector("h2");
const secTitle = clockContainer.querySelector("small");
function getTime() {
  const date = new Date();
  const day = date.toLocaleDateString("ko-KR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : `${hours}`}:${
    minutes < 10 ? `0${minutes}` : `${minutes}`
  }`;
  secTitle.innerText = `${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  dayTitle.innerText = day;
}

function init() {
  setInterval(getTime, 1000);
}
init();
