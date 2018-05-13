
export default class parallax {
  constructor(block, size) {
    this.block = block;
    this.scrollingBlock = this.block.parentElement;
    this.scrollingBlockSize = size;
    this._fixedCoords = this.getFixedCoords();
    this._startParallax = this.getStartParallaxCoords();

    this.setBoxSize();

    this._endParallax = this.getEndParallaxCoords();
  }

  setBoxSize() {
    this.scrollingBlock.style.height = this.scrollingBlockSize + `px`;
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
  }

  endParallax() {
    this.block.style.position = `absolute`;
    this.block.style.top = this._endParallax + this._fixedCoords.top + `px`;
  }

  cancelParallax() {
    this.block.style.position = `static`;
  }

  moveParallaxBlock(callbackImg) {
    if (window.pageYOffset > this._startParallax) {

      if (window.pageYOffset > this._startParallax && window.pageYOffset < this._endParallax) {
        this.startParallax();
        for (let item of callbackImg) {
          item(this.gitElemCoords(this.scrollingBlock).top);  
        }
        
      }

      if (window.pageYOffset > this._endParallax) {
        this.endParallax();
      }
    } else {
      this.cancelParallax();
    }
  }
}