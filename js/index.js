import controller from './controller';
import {model} from './model';

const blocks = document.querySelectorAll(`.moving-block`);

new controller(blocks, model).start();