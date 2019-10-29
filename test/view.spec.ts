import View from '../src/View';
import { defaultOptions } from '../src/defaultOptions';
import IOptions from '../src/defaultOptions';

let sliderNode = document.createElement('div');

describe('View is created with default options', function() {

    let view = new View(defaultOptions, sliderNode);

    it('can create', function() {  
        expect(view).toBeDefined();
    });
    it('has default width', function() {  
        // @ts-ignore
        expect(view._width).toBe(defaultOptions.width);
    });

});

describe('View has functions:', function() {

    let view = new View(defaultOptions, sliderNode);

    describe('buildSlider - function for constructor,', function() {

        let testNode = document.createElement('div');
        // @ts-ignore
        testNode = view.buildSlider(testNode);

        it('creates thumbNode', function() {
            expect(testNode.querySelector('.thumb')).toBeDefined();
        });
        it('adds classes slider, thumb', function() {
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
            expect(testNode.querySelector('.tooltip')).toBeDefined();
        });
    });

    describe('setValToTooltip adds a value to tooltip', function() {

        let testNode = document.createElement('div');
        // @ts-ignore
        testNode = view.buildSlider(testNode);
        // @ts-ignore
        view.buildTooltip(testNode);
        // @ts-ignore
        view.setValToTooltip(testNode, '1', "'val = ' + val");

        it('returns tooltip', function() {
            expect(testNode.querySelector('.tooltip').textContent).toBe('val = 1');
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

    describe('setWidthToSlider adds width', function() {

        let testNode = document.createElement('div');

        it('sets width == 10px', function() { 
            // @ts-ignore
            view.setWidthToSlider(testNode, '100px');
            expect(testNode.style.width).toBe('100px');
        });
        it('sets width == 10.5%', function() { 
            // @ts-ignore
            view.setWidthToSlider(testNode, '10.5%');
            expect(testNode.style.width).toBe('10.5%');
        });
    });

    describe('setHeightToSlider adds height', function() {

        let testNode = document.createElement('div');

        it('sets height == 10px', function() { 
            // @ts-ignore
            view.setHeightToSlider('100px', testNode);
            expect(testNode.style.height).toBe('100px');
        });
        it('sets height == 10.5%', function() { 
            // @ts-ignore
            view.setHeightToSlider('10.5%', testNode);
            expect(testNode.style.height).toBe('10.5%');
        });
    });
});

describe('View is created with different options:', function() {

    describe('horizontal orientation, has tooltip', function() {

        let testOptions: IOptions = Object.assign({}, defaultOptions, {
            width: 200,
            tooltip: true,
        });
        let view = new View(testOptions, sliderNode);

        it('can create', function() {  
            expect(view).toBeDefined();
        });
        it('has width == 200px', function() {  
            // @ts-ignore
            expect(view._width).toBe('200px');
            // @ts-ignore
            expect(view._slider.style.width).toBe('200px')
        });
        it('has vertical == false', function() {  
            // @ts-ignore
            expect(view._vertical).toBeFalsy();
        });
        it('has tooltip == true', function() {  
            // @ts-ignore
            expect(view._tooltip).toBeTruthy();
        });
        it('has slider node', function() {  
            // @ts-ignore
            expect(view._slider).toBeDefined();
        });
        it('has thumb node', function() {  
            // @ts-ignore
            expect(view._slider.querySelector('.thumb')).toBeDefined();
        });
        it('has tooltip node', function() {  
            // @ts-ignore
            expect(view._slider.querySelector('.tooltip')).toBeDefined();
        });
    });

    describe('vertical orientation, has no tooltip', function() {

        let testOptions: IOptions = Object.assign({}, defaultOptions, {
            width: 200,
            height: 200,
            vertical: true,
        });
        let view = new View(testOptions, sliderNode);

        it('can create', function() {  
            expect(view).toBeDefined();
        });
        it('has height == 200px', function() {  
            // @ts-ignore
            expect(view._height).toBe('200px');
            // @ts-ignore
            expect(view._slider.style.height).toBe('200px');
        });
        it('has no width', function() {  
            // @ts-ignore
            expect(view._width).toBeUndefined();
        });
        it('has vertical == true', function() {  
            // @ts-ignore
            expect(view._vertical).toBeTruthy();
        });
        it('has tooltip == false', function() {  
            // @ts-ignore
            expect(view._tooltip).toBeUndefined();
        });
        it('has tooltip node', function() {  
            // @ts-ignore
            expect(view._slider.querySelector('.tooltip')).toBeDefined();
        });
    });
});

