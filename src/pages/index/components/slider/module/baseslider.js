import { ELEMENT_NODE_TYPE, SLIDER_ANIMATION_CLASS_NAME } from "./constants";
import DEFAULTS from "./defaults";

export default class BaseSlider {
  constructor(el, options) {
    if (el.nodeType !== ELEMENT_NODE_TYPE) {
      throw new Error("实例化请传入DOM元素");
    }

    this.options = { ...DEFAULTS, ...options };

    const sliderEl = el;
    const sliderContentEl = sliderEl.querySelector(".slider-content");
    const sliderItemEls = sliderContentEl.querySelectorAll(".slider-item");

    this.sliderEl = sliderEl;
    this.sliderContentEl = sliderContentEl;
    this.sliderItemEls = sliderItemEls;

    this.minIndex = 0;
    this.maxIndex = this.sliderItemEls.length - 1;
    this.currentIndex = this.getCorrectedIndex(this.options.initialIndex);

    this.itemWidth = this.sliderItemEls[0].offsetWidth;

    this.init();
  }

  // 获取修正后的index
  getCorrectedIndex(index) {
    if (index < this.minIndex) {
      return this.maxIndex;
    }
    if (index > this.maxIndex) {
      return this.minIndex;
    }
    return index;
  }

  init() {
    this.setItmesWidth();

    this.setContentWidth();

    // 切换到初始索引
    this.move(this.getDistance());

    if (this.options.animation) {
      this.openAnimation();
    }
    if (this.options.autoplay) {
      this.autoplay();
    }
  }

  setItmesWidth() {
    for (const item of this.sliderItemEls) {
      item.style.width = `${this.itemWidth}px`;
    }
  }
  setContentWidth() {
    this.sliderContentEl.style.width = `${
      this.itemWidth * this.sliderItemEls.length
    }px`;
  }
  // 不带动画的移动
  move(distance) {
    this.sliderContentEl.style.transform = `translate3d(${distance}px, 0px, 0px)`;
  }

  // 带动画的移动
  moveWithAnimation(distance) {
    this.setAnimationSpeed();
    this.move(distance);
    this.sliderContentEl.addEventListener("transitionend", () => {
      this.closeAnimation();
    });
  }
  setAnimationSpeed(speed = this.options.speed) {
    this.sliderContentEl.style.transitionDuration = `${speed}ms`;
  }

  getDistance(index = this.currentIndex) {
    return index * -this.itemWidth;
  }
  openAnimation() {
    this.sliderContentEl.classList.add(SLIDER_ANIMATION_CLASS_NAME);
  }
  closeAnimation() {
    this.setAnimationSpeed(0);
  }

  autoplay() {
    if (this.options.autoplay <= 0) return;

    this.pause();
    this.autoplayTimer = setInterval(() => {
      this.next();
    }, this.options.autoplay);
  }
  pause() {
    clearInterval(this.autoplayTimer);
  }
  to(index) {
    index = this.getCorrectedIndex(index);

    if (index === this.currentIndex) return;

    this.currentIndex = index;
    const distance = this.getDistance(index);
    if (this.options.animation) {
      this.moveWithAnimation(distance);
    } else {
      this.move(distance);
    }
  }
  next() {
    this.to(this.currentIndex + 1);
  }
  prev() {
    this.to(this.currentIndex - 1);
  }
}
