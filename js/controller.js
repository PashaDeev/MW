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
      top: 47,
      left: fixed.left
    };

    let containerParam = document.querySelector(`.timeline__container`).getBoundingClientRect();
    containerParam = {
      top: containerParam.top + window.pageYOffset,
      height: containerParam.height
    };

    ReactDom.render(
      <Timeline coords={timelineCoords} fixed={fixed} parentBlock={containerParam}/>,
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
