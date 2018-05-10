import {until} from './until';

const historyBlock = document.querySelector(`.moving-block--history`);
const historyImage = historyBlock.querySelector(`.history__image`);
const padding = until.getElemPadding(historyBlock);
const initialPoint = until.getElemCoords(historyBlock).top - padding;
const scrollingBlock = document.querySelector(`.history`);
const initialMargin = until.getElemCoords(historyBlock).left;

scrollingBlock.style.height = `1200px`;

document.addEventListener(`scroll`, () => {
  if (window.pageYOffset > initialPoint) {
    historyBlock.style.position = `fixed`;
    historyBlock.style.top = padding + `px`;
    historyBlock.style.left = initialMargin + `px`;
  }

  if (window.pageYOffset < initialPoint) {
    historyBlock.style.position = `static`;
  }
});