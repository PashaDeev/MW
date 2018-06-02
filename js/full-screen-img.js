import ImgMove from './img-move';

function onPressEsc(event) {
  if (event.keyCode === 27) {
    document.querySelector(`.full-screen`).classList.remove(`full-screen`);

    document.removeEventListener(`keydown`, onPressEsc);
  }
}

export default function fullScreenImg() {
  document.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`moved-image`)) {
      e.target.classList.toggle(`full-screen`);
      e.init = ImgMove.move();


      if (e.target.classList.contains(`full-screen`)) {
        e.target.style.transform = ``;
        e.target.style.clipPath = ``;

        document.addEventListener(`keydown`, onPressEsc);
      } else {
        e.init();
      }
    }
  });
}
