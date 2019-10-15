/*
 * Copyright 2019 Nazmul Idris. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Car} from './Car';

console.log('hi');
const car: Car = new Car();
car.go('vroom');

import Model from './Model';
import {defaultOptions} from './defaultOptions';
 
$(() => {
    $("#content").html("<h1>Привет мир</h1>");
});

//console.log(model.customDateValidation('22.05.2019'));

/* let testOptions = Object.assign({}, defaultOptions, {
    dataFormat: 'date',
    initialVal: 'asd',
    range: ['13.10.2019', '20.10.2019'],
    minVal: '10.10.2019',
    maxVal: '30.10.2019',
}); */

let testOptions = Object.assign({}, defaultOptions, {
    dataFormat: 'custom',
    customValues: [1, 2, 'f', 5, 'f'],
    initialValInCustomValues: 'f',

});

let m = new Model(testOptions);

/* let t;

if (testOptions.initialRangeInCustomValues || testOptions.initialRangeNumInCustomValues ) {
    t = 1;
} else {
    t = 2;
} */

//console.log(t);

console.log(m.getVal());
console.log(m.getRange());
console.log(m.getMinVal());
console.log(m.getMaxVal());
console.log(m.getStep());