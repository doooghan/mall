import "./slider.css";
import "./btn.css";

// import { render } from "slider.art";

import Slider from "./module";
import { getData } from "api/getData";

const layoutEl = document.getElementById("slider-layout");
getData(
  "https://www.imooc.com/api/mall-PC/index/slider?icode=J6DDC8E3E7A8BF54C"
)
  .then((data) => {
    layoutEl.innerHTML = render({
      items: data,
    });
    const slider = new Slider(document.querySelector(".slider"), {
      initialIndex: 2,
      animation: true,
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
  })
  .finally(() => {

  });
