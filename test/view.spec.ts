/* import View from '../src/View';
import { defaultOptions } from '../src/defaultOptions';
import IOptions from '../src/defaultOptions';

let sliderNode = document.createElement('div');
let view = new View(defaultOptions, sliderNode);
// document.append(sliderNode);

describe('View is created with default options', function() {

    it('can create', function() {  
        expect(view).toBeDefined();
    });

    it('has default width', function() {  
        // @ts-ignore
        expect(view._slider.style.width).toBe(defaultOptions.width);
    });
});

describe('View has methods (if default options)', function() {
    it('returns lenght', function() {
        expect(view.getSlider()).toBeDefined();
    });
    it('returns slider node', function() {
        expect(view.getSlider()).toBeDefined();
    });
    it('returns thumb node', function() {
        expect(view.getThumb()).toBeDefined();
    });
    it('returns vrtical as boolean', function() {
        expect(view.getVertical()).toBeDefined();
    });
    it('sets thumb position', function() {
        view.setThumbPosition(0);
        //@ts-ignore
        expect(view._thumb.style.left).toBe('0px');
    });
    it('dont return tooltip', function() {
        expect(view.getTooltip()).toBeUndefined();
    });
    it('dont return tooltip mask', function() {
        expect(view.getTooltipMask()).toBeUndefined();
    });
});

describe('View has functions:', function() {

    describe('buildSlider - function for constructor,', function() {

        let testNode = document.createElement('div');
        // @ts-ignore
        testNode = view.buildSlider(testNode);

        it('creates thumbNode', function() {
            expect(testNode.querySelector('.slider__thumb')).toBeDefined();
        });
        it('adds classes slider, slider__thumb', function() {
            expect(testNode.classList).toContain('slider');
        });
    });

    describe('buildTooltip adds a tooltip with value', function() {

        let testNode = document.createElement('div');
        // @ts-ignore
        testNode = view.buildSlider(testNode);
        // @ts-ignore
        view.buildTooltip(testNode);

        it('returns tooltip', function() {
            expect(testNode.querySelector('.slider__tooltip')).toBeDefined();
        });
    });

    describe('method setValToTooltip adds a value to tooltip', function() {

        let testNode = document.createElement('div');
        // @ts-ignore
        testNode = view.buildSlider(testNode);
        // @ts-ignore
        view.buildTooltip(testNode);
        // @ts-ignore
        view.setValToTooltip(testNode.querySelector('.slider__tooltip'), 1, "'val = ' + val");

        it('returns tooltip', function() {
            expect(testNode.querySelector('.slider__tooltip').textContent).toBe('val = 1');
        });
    });

    describe('widthValidation returns string if its valid', function() {

        it('returns 10px if 10px', function() {
            // @ts-ignore
            expect(view.widthValidation('10Px')).toBe('10px');
        });
        it('returns 10px if 10', function() {
            // @ts-ignore
            expect(view.widthValidation('10')).toBe('10px');
        });
        it('returns 10.5% if 10,5%', function() {
            // @ts-ignore
            expect(view.widthValidation('10,5%')).toBe('10.5%');
        });
        it('returns Error', function() {
            // @ts-ignore
            expect(function() {view.widthValidation('10pxs')}).toThrow(new Error('Width (or height) should be valid to css'));
        });
    });  
});

describe('View is created with different options:', function() {

    describe('horizontal orientation, has tooltip', function() {

        let test1sliderNode = document.createElement('div');

        let test1Options: IOptions = Object.assign({}, defaultOptions, {
            width: '200px',
            tooltip: true,
        });
        let test1View = new View(test1Options, test1sliderNode);

        it('can create', function() {  
            expect(test1View).toBeDefined();
        });

        it('has width == 200px', function() {  
            // @ts-ignore
            expect(test1View._slider.style.width).toBe('200px')
        });
        it('has vertical == false', function() {  
            // @ts-ignore
            expect(test1View._vertical).toBeFalsy();
        });
        it('has tooltip == true', function() {  
            // @ts-ignore
            expect(test1View._tooltip).toBeTruthy();
        });
        it('has slider node', function() {  
            // @ts-ignore
            expect(test1View._slider).toBeDefined();
        });
        it('has thumb node', function() {  
            // @ts-ignore
            expect(test1View._slider.querySelector('.slider__thumb')).toBeDefined();
        });
        it('has tooltip node', function() {  
            // @ts-ignore
            expect(test1View._slider.querySelector('.sldier__tooltip')).toBeDefined();
        });
    });

    describe('vertical orientation, has no tooltip', function() {

        let test2sliderNode = document.createElement('div');

        let test2Options: IOptions = Object.assign({}, defaultOptions, {
            width: 200,
            height: 200,
            vertical: true,
        });
        let test2View = new View(test2Options, test2sliderNode);

        it('can create', function() {  
            expect(test2View).toBeDefined();
        });
        it('has width != 200px', function() {  
            // @ts-ignore
            expect(test2View._slider.style.width).not.toBe('200px');
        });
        it('has height == 200px', function() {  
            // @ts-ignore
            expect(test2View._slider.style.height).toBe('200px');
        });
        it('has vertical == true', function() {  
            // @ts-ignore
            expect(test2View._vertical).toBeTruthy();
        });
        it('has tooltip == false', function() {  
            // @ts-ignore
            expect(test2View._tooltip).toBeUndefined();
        });
        it('has no tooltip node', function() {  
            // @ts-ignore
            expect(test2View._slider.querySelector('.slider__tooltip')).toBeNull();
        });
    });
});
 */