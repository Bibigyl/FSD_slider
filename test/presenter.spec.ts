// Добавляем стили в тесты
let ss = document.createElement("link");
ss.type = "text/css";
ss.rel = "stylesheet";
ss.href = 'slider.css';
document.getElementsByTagName("head")[0].appendChild(ss);


import Model, { IModel } from '../src/Model';
import View, { IView } from '../src/View';
import { defaultOptions } from '../src/defaultOptions';
import IOptions from '../src/defaultOptions';


let sliderNode: HTMLDivElement;
let testNode: HTMLDivElement;
let view: IView;
let model: IModel;
let testOptions: IOptions;


beforeEach( function() {
    sliderNode = document.createElement('div');
    document.body.append(sliderNode);
    model = new Model(defaultOptions);
    view = new View(model, defaultOptions, sliderNode);
});
afterEach( function() {
    view = null;
    model = null;
    testOptions = null;

    document.querySelector('.slider').remove();
    sliderNode = null;
    testNode = null;
});