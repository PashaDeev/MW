import parallax from './parallax';

export default class controller {
  constructor(blocks, /*model*/) {
    //this.model = model;
    this.blocks = blocks;
    //this.image = [];
    //this.svg = [];
  }

  blocksInit() {
    this.arr = [];
    let count = 0;
    for (let item of this.blocks) {
      this.arr[count] = new parallax(item, 2000);
      ++count;
    }
    this.blocks = this.arr;
  }

  start() {
    this.blocksInit();

    document.addEventListener(`scroll`, () => {
      for (let item of this.blocks) {
        item.moveParallaxBlock();
      }
    });
  }
}
