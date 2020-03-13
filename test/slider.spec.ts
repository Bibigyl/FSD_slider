import Slider from '../src/Slider';
import { ISlider } from '../src/Slider'
import { defaultOptions } from '../src/MVP/defaultOptions';

let sliderNode: HTMLDivElement;
let slider: ISlider;

beforeEach( function() {
    sliderNode = document.createElement('div');
    document.body.append(sliderNode);
    slider = new Slider(defaultOptions, sliderNode);
});


describe('class Slider is a facade of Application', () => {
    it('creates instances of Model, View and Presenter', () => {
        // @ts-ignore
        expect(slider._model).toBeDefined();
        // @ts-ignore
        expect(slider._view).toBeDefined();
        // @ts-ignore
        expect(slider._presenter).toBeDefined();
    });

    it('can subscribe outer listeners to presenter', () => {
        slider.subscribe(function() {});
        // @ts-ignore
        expect(slider._presenter.listeners.length).toBe(1);
    });

    it('can update application by new options', () => {
        let newOptions = Object.assign({}, defaultOptions, {
            end: 5,
            lenth: '500px'
        });
        slider.update(newOptions);
        // @ts-ignore
        expect(slider._model._end).toBe(newOptions.end);
        // @ts-ignore
        expect(slider._view._length).toBe(newOptions.length);
    });
});