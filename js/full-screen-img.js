import imgMove from './img-move';

export default function fullScreenImg() {
  document.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`moved-image`)) {
      e.target.classList.toggle(`full-screen`);
      e.init = imgMove.move();


      if (e.target.classList.contains(`full-screen`)) {
        e.target.style.transform = ``;
        e.target.style.clipPath = ``;
      } else {
        e.init();
      }
    }
  });
}
