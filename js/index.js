import Controller from './controller';
import {model} from './model';
import timeline from './timeline';

const blocks = document.querySelectorAll(`.moving-block`);

new Controller(blocks, model).start();

