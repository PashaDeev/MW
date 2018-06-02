import Controller from './controller';
import {model} from './model';
import fullScreen from './full-screen-img';

const blocks = document.querySelectorAll(`.moving-block`);

new Controller(blocks, model).start();

fullScreen();
