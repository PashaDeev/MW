import controller from './controller';
import {model} from './model';
import timeline from './timeline';
import React from 'react';
import ReactDOM from 'react-dom';

const blocks = document.querySelectorAll(`.moving-block`);

new controller(blocks, model).start();

new timeline().init();



