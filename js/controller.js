import Parallax from './parallax';
import Timeline from './timeline';
import React from 'react';
import ReactDom from 'react-dom';

export default class controller {
  constructor(blocks, model) {
    this.model = model;
    this.blocks = blocks;
  }

  blocksInit() {
    this.blockArr = [];
    let count = 0;
    for (let item of this.blocks) {
      this.blockArr[count] = new Parallax(item, this.model[count].duration, this.model[count]);
      ++count;
    }
  }

  timelineInit() {

    let timelineCoords = [];
    for (let item of this.blockArr) {
      if (item.block.classList.contains(`timeline-block`)) {
        timelineCoords.push(item._startParallax);
      }
    }

    let fixed = document.querySelector(`.collect-six > .collection__container`).getBoundingClientRect();
    fixed = {
      top: this.blockArr[this.blockArr.length - 1]._endParallax - this.blockArr[3]._startParallax,
      left: fixed.left
    };

    ReactDom.render(
      <Timeline coords={timelineCoords} fixed={fixed}/>,
      document.getElementById(`timeline`)
    );
  }

  start() {
    this.blocksInit();
    this.timelineInit();

    document.addEventListener(`scroll`, () => {
      for (let item of this.blockArr) {
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
