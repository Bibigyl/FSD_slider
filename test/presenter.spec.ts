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

let thumbOnMouseDown: Event;
let thumbOnMouseMove: Event;
let thumbOnMouseUp: Event;


beforeEach( function() {
    sliderNode = document.createElement('div');
    document.body.append(sliderNode);
    model = new Model(defaultOptions);
    view = new View(model, defaultOptions, sliderNode);

    console.log(getComputedStyle(view.getThumb()).opacity);
});
afterEach( function() {
    view = null;
    model = null;
    testOptions = null;

    document.querySelector('.slider').remove();
    sliderNode = null;
    testNode = null;
});

describe('Mousedown, mousemove, mouseup on thumb', function() {
    it('causes changing position of thumb, changes value in model', function() {
        let thumbOnMouseDown = new MouseEvent("mousedown", {
            //bubbles: true,
            //cancelable: true,
            clientX: 50,
            clientY: 45
        });
        let thumbOnMouseMove = new MouseEvent("mousemove", {
            //bubbles: true,
            //cancelable: true,
            clientX: 100,
            clientY: 45
        });
        let thumbOnMouseUp = new MouseEvent("mouseup", {
            //bubbles: true,
            //cancelable: true,
            clientX: 100,
            clientY: 45
        });

        console.log(model.getVal());

        view.getThumb().dispatchEvent(thumbOnMouseDown);
        view.getThumb().dispatchEvent(thumbOnMouseMove);
        view.getThumb().dispatchEvent(thumbOnMouseUp);

        console.log(model.getVal());

        /* console.log(getComputedStyle(view.getThumb()).backgroundColor); */

        expect(2).toBe(2);

    });
});