import Parallax from './parallax';

export default class controller {
  constructor(blocks, model) {
    this.model = model;
    this.blocks = blocks;
  }

  blocksInit() {
    this.blokArr = [];
    let count = 0;
    for (let item of this.blocks) {
      this.blokArr[count] = new Parallax(item, this.model[count].duration, this.model[count]);
      ++count;
    }
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
