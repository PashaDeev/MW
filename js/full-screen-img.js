
export default function fullScreenImg() {
  document.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`moved-image`)) {
      e.target.classList.toggle(`full-screen`);
    }
  });
}
