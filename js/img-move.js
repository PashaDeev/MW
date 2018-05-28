
import Svg from './svg';

export default class ImgMove {
  constructor(img, model, size, startCoord) {
    this.img = img;
    this.startCoord = startCoord;
    this.model = model;
    this.scrollDuration = size;
    this.shift = this.getShift();
    this.path = {
      x: this.model.x - this.shift.x,
      y: this.model.y - this.shift.y
    };
    this.coef = {
      x: this.path.x / this.scrollDuration,
      y: this.path.y / this.scrollDuration,
      width: this.model.width / this.img.width,
      height: this.model.height / this.img.height,
    };

    this.coef.scrollWidth = Math.abs(1 - this.coef.width) / this.scrollDuration;
    this.coef.scrollHeight = Math.abs(1 - this.coef.height) / this.scrollDuration;

    if (this.model.svg) {
      this.svg = new Svg(this.img, this.model.svg, this.scrollDuration, this.startCoord);
      this.svg.initMask();
    }
    this.init();
  }

  getShift() {
    const parentCoords = this.getCoords(this.img.parentElement);
    const imgCoords = this.getCoords(this.img);

    return {
      x: imgCoords.left - parentCoords.left,
      y: imgCoords.top - parentCoords.top
    };
  }

  init() {
    this.img.position = `relative`;
    this.img.style.transform = `translate(${this.path.x}px, ${this.path.y}px) 
                                scale(${this.coef.width}, ${this.coef.height})`;
    this.img.style.zIndex = this.model.zIndex;
    if (this.model.position) {
      this.img.style.position = this.model.position;
    }
  }

  getCoords(elem) {
    const box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  getScale() {
    const scale = {};
    if (this.model.width > this.img.width) {
      scale.x = this.coef.width - this.coef.scrollWidth * (window.pageYOffset - this.startCoord);
    } else {
      scale.x = this.coef.width + this.coef.scrollWidth * (window.pageYOffset - this.startCoord);
    }

    if (this.model.height > this.img.height) {
      scale.y = this.coef.height - this.coef.scrollHeight * (window.pageYOffset - this.startCoord);
    } else {
      scale.y = this.coef.height + this.coef.scrollHeight * (window.pageYOffset - this.startCoord);
    }

    return scale;
  }

  move() {
    let translateX = this.path.x - this.coef.x * (window.pageYOffset - this.startCoord);
    let translateY = this.path.y - this.coef.y * (window.pageYOffset - this.startCoord);
    let scale = this.getScale();
    this.img.style.transform = `translate(${translateX}px, ${translateY}px)
                                scale(${scale.x}, ${scale.y})`;

    if (this.svg) {
      this.svg.maskMove();
    }
  }

  endMove() {
    this.img.style.transform = ``;
  }
}
