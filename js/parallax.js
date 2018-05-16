
import ImgMove from './img-move';

export default class parallax {
  constructor(block, size, model) {
    this.block = block;
    this.model = model;
    this.scrollingBlock = this.block.parentElement;
    this.scrollingBlockSize = size;
    this._fixedCoords = this.getFixedCoords();
    this._startParallax = this.getStartParallaxCoords();
    this.images = [];

    this.setBoxSize();

    this._endParallax = this.getEndParallaxCoords();
    this.scrollDuration = this._endParallax - this._startParallax;

    if (model) {
        this.imgInit();
    }
  }

  setBoxSize() {
    this.scrollingBlock.style.height = this.scrollingBlockSize + `px`;
  }

  imgInit() {
    let i = 0;
    this.images = this.block.querySelectorAll(`.moved-image`);
    this.imageList = [];
    for (let item of this.images) {
      this.imageList[i] = new ImgMove(item, this.model[i], this.scrollDuration, this._startParallax);
      i++;
    }
  }

  getElemCoords(elem) {
    const relCoords = elem.getBoundingClientRect();

    return {
      top: relCoords.top + window.pageYOffset,
      left: relCoords.left + window.pageXOffset
    }
  }

  getFixedCoords() {
    if (window.innerHeight > this.block.scrollHeight) {
      const coords = {};
      coords.top = (window.innerHeight - this.block.scrollHeight) / 2;
      coords.left = this.getElemCoords(this.block).left;
      return coords;
    } else {
      const coords = {
        top: 0,
        left: this.getElemCoords(this.block).left
      }
      return coords;
    }
  }

  getStartParallaxCoords() {
    const startCoords = this.getElemCoords(this.block).top - this._fixedCoords.top;
    return startCoords;
  }

  getEndParallaxCoords() {
    const scrollingBlockCoords = this.getElemCoords(this.scrollingBlock);
    const endCoords = scrollingBlockCoords.top + this.scrollingBlock.scrollHeight;
    const endParallaxCoords = endCoords - this.block.scrollHeight - this._fixedCoords.top;

    return endParallaxCoords;
  }

  startParallax() {
    this.block.style.position = `fixed`;
    this.block.style.top = this._fixedCoords.top + `px`;
    this.block.style.left = this._fixedCoords.left + `px`;

    for (let item of this.imageList) {
      item.move();
    }
  }

  endParallax() {
    this.block.style.position = `absolute`;
    this.block.style.top = this._endParallax + this._fixedCoords.top + `px`;
  }

  cancelParallax() {
    this.block.style.position = `static`;
  }
}