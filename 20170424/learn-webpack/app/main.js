/**
 * Created by sks on 2017/4/24.
 */

//main.js
// var greeter = require('./Greeter.js');
// document.getElementById('root').appendChild(greeter());

import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';
import './main.css';

render(<Greeter />, document.getElementById('root'));
