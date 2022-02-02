import "./slider.css";
import "./btn.css";

import Slider from "./module";

const slider = new Slider(document.querySelector(".slider"), {
  initialIndex: 2,
  animation: false,
  speed: 500,
  autoplay: 2000,
});

const leftbtn = document.getElementById("leftbtn");
const rightbtn = document.getElementById("rightbtn");
leftbtn.addEventListener(
  "click",
  () => {
    slider.prev();
  },
  false
);

rightbtn.addEventListener(
  "click",
  () => {
    slider.next();
  },
  false
);

const banner = document.getElementById("banner");
banner.addEventListener(
  "mouseenter",
  () => {
    slider.pause();
  },
  false
);
banner.addEventListener(
  "mouseleave",
  () => {
    slider.autoplay();
  },
  false
);
