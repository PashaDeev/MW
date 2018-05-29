import Controller from './controller';
import {model} from './model';

const blocks = document.querySelectorAll(`.moving-block`);

new Controller(blocks, model).start();

