import controller from './controller';
import {model} from './model';
import timeline from './timeline';

const blocks = document.querySelectorAll(`.moving-block`);

new controller(blocks, model).start();

new timeline().init();

