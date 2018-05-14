import parallax from './parallax';

export default class controller {
  constructor(blocks, model) {
    this.model = model;
    this.blocks = blocks;
    //this.svg = [];
  }

  blocksInit() {
    this.blokArr = [];
    let count = 0;
    for (let item of this.blocks) {
      this.blokArr[count] = new parallax(item, 2000, this.model[count]);
      ++count;
    }
    this.blokArr;
  }

  start() {
    this.blocksInit();

    document.addEventListener(`scroll`, () => {
      for (let item of this.blokArr) {
        if (window.pageYOffset > item._startParallax) {

          if (window.pageYOffset > item._startParallax && window.pageYOffset < item._endParallax) {
            item.startParallax();
          }
    
          if (window.pageYOffset > item._endParallax) {
            item.endParallax();
          }
        } else {
          item.cancelParallax();
        }
      }
      });
  }
}
