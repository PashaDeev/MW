import parallax from './parallax';
import ImgMove from './img-move';

export default class controller {
  constructor(blocks, model) {
    this.model = model;
    this.blocks = blocks;
    this.image = [];
    //this.svg = [];
  }

  blocksInit() {
    this.blokArr = [];
    this.imgArr = [];
    let count = 0;
    for (let item of this.blocks) {
      this.blokArr[count] = new parallax(item, 2000);
      ++count;
    }
    this.blokArr;
  }

  imgInit() {

    for (let j = 0; j < this.blocks.length; j++) {
      let imageCollection = this.blocks[j].querySelectorAll(`.moved-image`);
        for (let i = 0; i < imageCollection.length; i++) {
          this.image.push(new ImgMove(imageCollection[i], this.model[this.image.length + 0], this.blocks[j].parentElement.scrollHeight));
        }
    }
  }

  start() {
    this.blocksInit();
    //this.imgInit();

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
