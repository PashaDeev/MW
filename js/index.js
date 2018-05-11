import controller from './controller';

const blocks = document.querySelectorAll(`.moving-block`);

new controller(blocks).start();