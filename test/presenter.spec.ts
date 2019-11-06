// Добавляем стили в тесты
let ss = document.createElement("link");
ss.type = "text/css";
ss.rel = "stylesheet";
ss.href = 'slider.css';
document.getElementsByTagName("head")[0].appendChild(ss);

import Model, { IModel } from '../src/Model';
import View, { IView } from '../src/View';
import Presenter from '../src/Presenter'
import { defaultOptions } from '../src/defaultOptions';
import IOptions from '../src/defaultOptions';


let sliderNode: HTMLDivElement;
let testNode: HTMLDivElement;
let view: IView;
let model: IModel;
let presenter;
let testOptions: IOptions;

let thumbOnMouseDown: MouseEvent;
let thumbOnMouseMove: MouseEvent;
let thumbOnMouseUp: MouseEvent;
let sliderOnClick: MouseEvent;


beforeEach( function() {
    sliderNode = document.createElement('div');
    document.body.append(sliderNode);
    model = new Model(defaultOptions);
    view = new View(model, defaultOptions, sliderNode);
    presenter = new Presenter(model, view);
});
afterEach( function() {
/*     view = null;
    model = null;
    presenter = null;
    testOptions = null;

    document.querySelector('.slider').remove();
    sliderNode = null;
    testNode = null; */
});

describe('Mousedown, mousemove, mouseup on thumb', function() {
    it('causes changing position of thumb, changes value in model', function() {
        thumbOnMouseDown = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            clientX: 50,
            clientY: 45
        });
        thumbOnMouseMove = new MouseEvent("mousemove", {
            bubbles: true,
            cancelable: true,
            clientX: 100,
            clientY: 45
        });
        thumbOnMouseUp = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            clientX: 100,
            clientY: 45
        });

        expect(model.getVal()).toBe(0);

        view.getThumb().dispatchEvent(thumbOnMouseDown);
        view.getThumb().dispatchEvent(thumbOnMouseMove);
        view.getThumb().dispatchEvent(thumbOnMouseUp);

        expect(model.getVal()).toBe(2);
        expect(view.getThumb().style.left).toBe('50px');
    });

    it('sets thumb position in borders of slider', function() {
        thumbOnMouseDown = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            clientX: 50,
            clientY: 45
        });
        thumbOnMouseMove = new MouseEvent("mousemove", {
            bubbles: true,
            cancelable: true,
            clientX: 1000,
            clientY: 45
        });
        thumbOnMouseUp = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            clientX: 1000,
            clientY: 45
        });

        view.getThumb().dispatchEvent(thumbOnMouseDown);
        view.getThumb().dispatchEvent(thumbOnMouseMove);
        view.getThumb().dispatchEvent(thumbOnMouseUp);

        expect(model.getVal()).toBe(10);
        expect(view.getThumb().style.left).toBe('290px');
    });

    it('works with range - two thumbs, dont let thumbs to change positions min and max in range', function() {
        testOptions = Object.assign({}, defaultOptions, {
            range: [1, 5]
        });

        testNode = document.createElement('div');
        document.body.append(testNode);

        model = new Model(testOptions);
        view = new View(model, testOptions, testNode);
        presenter = new Presenter(model, view);

    
        thumbOnMouseDown = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            clientX: 70,
            clientY: 45
        });
        thumbOnMouseMove = new MouseEvent("mousemove", {
            bubbles: true,
            cancelable: true,
            clientX: 130,
            clientY: 45
        });
        thumbOnMouseUp = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            clientX: 130,
            clientY: 45
        });

        expect(model.getRange()[0]).toBe(1);

        view.getThumb(1).dispatchEvent(thumbOnMouseDown);
        view.getThumb(1).dispatchEvent(thumbOnMouseMove);
        view.getThumb(1).dispatchEvent(thumbOnMouseUp);

        expect(model.getRange()[0]).toBe(3);
        expect(view.getThumb(1).style.left).toBe('80px');


        thumbOnMouseDown = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            clientX: 80,
            clientY: 45
        });
        thumbOnMouseMove = new MouseEvent("mousemove", {
            bubbles: true,
            cancelable: true,
            clientX: 1300,
            clientY: 45
        });
        thumbOnMouseUp = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            clientX: 1300,
            clientY: 45
        });

        view.getThumb(1).dispatchEvent(thumbOnMouseDown);
        view.getThumb(1).dispatchEvent(thumbOnMouseMove);
        view.getThumb(1).dispatchEvent(thumbOnMouseUp);

        expect(model.getRange()[0] == model.getRange()[1]).toBeTruthy();
        expect(view.getThumb(1).style.left == view.getThumb(2).style.left).toBeTruthy();
        expect(view.getThumb(1).style.left).toBe('140px');
    });
});

describe('Click on slider', function() {
    it('sets thumb on nearest position of step', function() {
        sliderOnClick = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            clientX: 100,
            clientY: 45
        });

        view.getSlider().dispatchEvent(sliderOnClick);

        expect(model.getVal()).toBe(2);
        expect(view.getThumb().style.left).toBe('50px');
    });
    it('changes position of the nearest to event thumb', function() {
        testOptions = Object.assign({}, defaultOptions, {
            range: [1, 5]
        });

        testNode = document.createElement('div');
        document.body.append(testNode);

        model = new Model(testOptions);
        view = new View(model, testOptions, testNode);
        presenter = new Presenter(model, view);

        sliderOnClick = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            clientX: 100,
            clientY: 45
        });

        view.getSlider().dispatchEvent(sliderOnClick);

        expect(model.getRange()[0]).toBe(2);
        expect(model.getRange()[1]).toBe(5);
        expect(view.getThumb(1).style.left).toBe('50px');
    });
});
