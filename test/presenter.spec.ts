// Добавляем стили в тесты
let ss = document.createElement("link");
ss.type = "text/css";
ss.rel = "stylesheet";
ss.href = 'slider.css';
document.getElementsByTagName("head")[0].appendChild(ss);

import Model, { IModel } from '../src/Model';
import View, { IView } from '../src/View';
import Presenter from '../src/Presenter';
import Subject from '../src/Observer';
import { defaultOptions } from '../src/defaultOptions';
import IOptions from '../src/defaultOptions';
import { ISubject } from '../src/Observer';


let sliderNode: HTMLDivElement;
let testNode: HTMLDivElement;
let view: IView;
let model: IModel;
let subject: ISubject;
let presenter;
let testOptions: IOptions;

let thumbOnDown: MouseEvent;
let thumbOnMove: MouseEvent;
let thumbOnUp: MouseEvent;
let sliderOnClick: MouseEvent;


beforeEach( function() {
    sliderNode = document.createElement('div');
    document.body.append(sliderNode);
    model = new Model(defaultOptions);
    view = new View(model, defaultOptions, sliderNode);
    subject = new Subject( model.getVal() || model.getRange() );
    presenter = new Presenter(model, view, subject);
});
afterEach( function() {
    //view = null;
    //model = null;
    //presenter = null;
    //testOptions = null;

    //document.querySelector('.slider').remove();
    //sliderNode = null;
    //testNode = null;
});

describe('Mousedown, mousemove, mouseup on thumb', function() {
    it('causes changing position of thumb, changes value in model', function() {
        thumbOnDown = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            clientX: 50,
            clientY: 45
        });
        thumbOnMove = new MouseEvent("mousemove", {
            bubbles: true,
            cancelable: true,
            clientX: 100,
            clientY: 45
        });
        thumbOnUp = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            clientX: 100,
            clientY: 45
        });

        expect(model.getVal()).toBe(0);

        view.getThumb().dispatchEvent(thumbOnDown);
        view.getThumb().dispatchEvent(thumbOnMove);
        view.getThumb().dispatchEvent(thumbOnUp);

        expect(model.getVal()).toBe(2);
        expect(view.getThumb().style.left).toBe('50px');
    });

    it('sets thumb position in borders of slider', function() {
        thumbOnDown = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            clientX: 50,
            clientY: 45
        });
        thumbOnMove = new MouseEvent("mousemove", {
            bubbles: true,
            cancelable: true,
            clientX: 1000,
            clientY: 45
        });
        thumbOnUp = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            clientX: 1000,
            clientY: 45
        });

        view.getThumb().dispatchEvent(thumbOnDown);
        view.getThumb().dispatchEvent(thumbOnMove);
        view.getThumb().dispatchEvent(thumbOnUp);

        expect(model.getVal()).toBe(10);
        expect(view.getThumb().style.left).toBe('290px');
        //@ts-ignore
        expect(view._line.style.left).toBe('0px');
        //@ts-ignore
        expect(view._line.style.width).toBe('300px');
    });

    it('works with range - two thumbs, dont let thumbs to change positions min and max in range', function() {
        testOptions = Object.assign({}, defaultOptions, {
            range: [1, 5]
        });

        testNode = document.createElement('div');
        document.body.append(testNode);

        model = new Model(testOptions);
        view = new View(model, testOptions, testNode);
        presenter = new Presenter(model, view, subject);

    
        thumbOnDown = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            clientX: 70,
            clientY: 45
        });
        thumbOnMove = new MouseEvent("mousemove", {
            bubbles: true,
            cancelable: true,
            clientX: 130,
            clientY: 45
        });
        thumbOnUp = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            clientX: 130,
            clientY: 45
        });

        expect(model.getRange()[0]).toBe(1);

        view.getThumb(1).dispatchEvent(thumbOnDown);
        view.getThumb(1).dispatchEvent(thumbOnMove);
        view.getThumb(1).dispatchEvent(thumbOnUp);

        expect(model.getRange()[0]).toBe(3);
        expect(view.getThumb(1).style.left).toBe('80px');


        thumbOnDown = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            clientX: 80,
            clientY: 45
        });
        thumbOnMove = new MouseEvent("mousemove", {
            bubbles: true,
            cancelable: true,
            clientX: 1300,
            clientY: 45
        });
        thumbOnUp = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            clientX: 1300,
            clientY: 45
        });

        view.getThumb(1).dispatchEvent(thumbOnDown);
        view.getThumb(1).dispatchEvent(thumbOnMove);
        view.getThumb(1).dispatchEvent(thumbOnUp);

        expect(model.getRange()[0] == model.getRange()[1]).toBeTruthy();
        expect(view.getThumb(1).style.left == view.getThumb(2).style.left).toBeTruthy();
        expect(view.getThumb(1).style.left).toBe('140px');
        //@ts-ignore
        expect(view._line.style.left).toBe('150px');
        //@ts-ignore
        expect(view._line.style.width).toBe('0px');
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
        presenter = new Presenter(model, view, subject);

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

describe('Method change changes model if there are any model options, changes view', function() {
    it('changes model data, changes view', function() {
        let test: any = {
            minVal: -5,
            maxVal: 5,
            reverse: true,
            scale: true,
            scaleStep: 2,
            tooltip: true,
            vertical: true
        }

        presenter.change(test);

        expect(model.getVal()).toBe(0);
        expect(model.getMaxVal()).toBe(-5);
        expect(model.getReverse()).toBeTruthy();

        expect(view.getThumb().style.top).toBe("140px");
        expect(view.getTooltip()).toBeDefined();
        setTimeout(() => {
            expect(document.querySelector('.slider__scale')).toBeDefined();
            expect(document.querySelector('.slider__tooltip')).toBeDefined();
            expect(view.getScale().querySelectorAll('slider__scale-division').length).toBe(10)
            expect(document.querySelector('.slider').clientHeight).toBe(300);
        }, 2000);
    });
});
