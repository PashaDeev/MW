
export default class ImgMove {
  constructor(img, model, size) {
    this.img = img;
    this.intialSize = {
      width: this.img.width,
      height: this.img.height
    };
    this.model = model;
    this.scrollDuration = size;
    this.shift = this.getShift();
    this.path = {
      x: this.model.x - this.shift.x,
      y: this.model.y - this.shift.y
    }
    //this.coof = this.getCoof();

    this.init();
  }

  getShift() {
    if (!this.model.absolute) {
      const parentCoords = this.getCoords(this.img.parentElement);
      const imgCoords = this.getCoords(this.img);

      return {
        x: imgCoords.left - parentCoords.left,
        y: imgCoords.top - parentCoords.top
      }
    } else {
      this.img.style.position = `static`;

      const parentCoords = this.getCoords(this.img.parentElement);
      const imgCoords = this.getCoords(this.img);

      this.img.style.position = `absolute`;

      return {
        x: imgCoords.left - parentCoords.left,
        y: imgCoords.top - parentCoords.top
      }
    }
    
  }

  init() {
    if (this.img && this.model) {
      this.img.style.position = `relative`;
      this.img.style.left = this.path.x + `px`;
      this.img.style.top = this.path.y + `px`;
      this.img.width = this.model.width;
      this.img.height = this.model.height;
    }
  }

  getCoords(elem) {
    const box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    }
  }
}