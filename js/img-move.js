
export default class ImgMove {
  constructor(img, model, size, startCoord) {
    this.img = img;
    this.startCoord = startCoord;
    this.initialSize = {
      width: this.img.width,
      height: this.img.height
    };
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
      scrollWidth: Math.abs(this.model.width - this.initialSize.width) / this.scrollDuration,
      scrollHeight: Math.abs(this.model.height - this.initialSize.height) / this.scrollDuration
    };

    this.init();
  }

  getShift() {
    const parentCoords = this.getCoords(this.img.parentElement);
    const imgCoords = this.getCoords(this.img);

    return {
      x: imgCoords.left - parentCoords.left,
      y: imgCoords.top - parentCoords.top
    }
  }

  init() {
      this.img.position = `relative`;
      this.img.style.transform = `translate(${this.path.x}px, ${this.path.y}px) 
                                  scale(${this.coef.width}, ${this.coef.height})`;
      this.img.style.zIndex = this.model.zIndex;
  }

  getCoords(elem) {
    const box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    }
  }

  move() {
    let translateX = this.path.x - this.coef.x * (window.pageYOffset - this.startCoord);
    let translateY = this.path.y - this.coef.y * (window.pageYOffset - this.startCoord);
    let scaleX = this.coef.scrollWidth * (window.pageYOffset - this.startCoord);
    let scaleY = this.coef.scrollHeight * (window.pageYOffset - this.startCoord);
    this.img.style.transform = 
         `translate(${translateX}px, ${translateY}px)`;
    //scale(${scaleX}, ${scaleY})
  }
}