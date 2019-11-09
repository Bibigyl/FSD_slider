import View, { IView } from '../src/View';
import { defaultOptions } from '../src/defaultOptions';
import IOptions from '../src/defaultOptions';
import Model, { IModel } from '../src/Model';


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
    //view = null;
    //model = null;
    //testOptions = null;

    //document.querySelector('.slider').remove();
    //sliderNode = null;
    //testNode = null;
});

describe('View is created with default options and has methods', function() {

    it('can create', function() {  
        expect(view).toBeDefined();
    });
    it('has default width', function() {  
        expect((view.getSlider().clientWidth) + 'px').toBe(defaultOptions.width);
    });
    it('getLenght returns lenght', function() {
        expect(view.getLenght()).toBeDefined();
    });
    it('getVertical returns vertical as boolean', function() {
        expect(view.getVertical()).toBeFalsy();
    });
    it('getTooltipMask returns "val"', function() {
        expect(view.getTooltipMask()).toBe("val");
    })
    it('getSlider returns slider node', function() {
        expect(view.getSlider()).toBeDefined();
    });
    it('getThumb returns thumb node', function() {
        expect(view.getThumb()).toBeDefined();
    });
    it('getTooltip returns undefined', function() {
        expect(view.getTooltip()).toBeUndefined();
    });
    it('setThumbPosition sets thumb position', function() {
        view.setThumbPosition(view.getThumb(), 0);
        expect(view.getThumb().style.left).toBe('-10px');
    });
    it('findThumbPosition returns position in px', function() {
        expect(view.findThumbPosition(3, 10)).toBe(90);
    });
    it('oneStepLenght returns lenght of one step', function() {
        expect(view.oneStepLenght()).toBe(30);
    });
});

describe('View has private functions:', function() {

    describe('buildThumb - function for constructor,', function() {

        it('creates thumbNode, adds classes', function() {
            // @ts-ignore
            testNode = view.buildThumb(sliderNode, 'testClass');
            
            expect(testNode.classList).toContain('slider__thumb');
            expect(testNode.classList).toContain('testClass');
            expect(sliderNode.querySelector('.slider__thumb')).toBeDefined();
        });
    });

    describe('buildTooltip adds a tooltip with value', function() {

        it('returns tooltip, adds classes', function() {
            testNode = document.createElement('div');
            // @ts-ignore
            testNode = view.buildTooltip(testNode, 'testClass');

            expect(testNode).toBeDefined();
            expect(testNode.classList).toContain('slider__tooltip');
            expect(testNode.classList).toContain('testClass');
        });
    });

    describe('buildScale adds scale', function() {
        it('returns scale, adds divisions and values with mask', function() {
            testNode = document.createElement('div');
            document.body.append(testNode);
            // @ts-ignore
            testNode = view.buildScale(testNode, 1, model, "'val = ' + val");

            expect(testNode).toBeDefined();
            expect(testNode.classList).toContain('slider__scale');
            expect(testNode.querySelectorAll('.slider__scale-division').length).toBe(11);
            expect(testNode.querySelectorAll('.slider__scale-division span')[10].textContent).toBe('val = 10');
        });
        it('can create scale with other step, multiple to step in model', function() {
            testNode = document.createElement('div');
            document.body.append(testNode);
            // @ts-ignore
            testNode = view.buildScale(testNode, 2, model, "'v = ' + val/2");

            expect(testNode).toBeDefined();
            expect(testNode.classList).toContain('slider__scale');
            expect(testNode.querySelectorAll('.slider__scale-division').length).toBe(6);
            expect(testNode.querySelectorAll('.slider__scale-division span')[3].textContent).toBe('v = 3');
        });
        it('can create scale with other step < 0, multiple to step in model', function() {
            testOptions = Object.assign({}, defaultOptions, {
                minVal: -0.4,
                maxVal: 1.6,
                step: -0.2,
            })
            model = new Model(testOptions);

            testNode = document.createElement('div');
            document.body.append(testNode);
            // @ts-ignore
            testNode = view.buildScale(testNode, 0.4, model, "val");

            expect(testNode).toBeDefined();
            expect(testNode.classList).toContain('slider__scale');
            expect(testNode.querySelectorAll('.slider__scale-division').length).toBe(6);
            expect(testNode.querySelectorAll('.slider__scale-division span')[3].textContent).toBe('0.8');
        });
        it('can create scale with other step as integer, min and max values float', function() {
            testOptions = Object.assign({}, defaultOptions, {
                minVal: -0.4,
                maxVal: 1.6,
                step: 1,
            })
            model = new Model(testOptions);

            testNode = document.createElement('div');
            document.body.append(testNode);
            // @ts-ignore
            testNode = view.buildScale(testNode, 1, model, "val");

            expect(testNode).toBeDefined();
            expect(testNode.classList).toContain('slider__scale');
            expect(testNode.querySelectorAll('.slider__scale-division').length).toBe(3);
            expect(testNode.querySelectorAll('.slider__scale-division span')[1].textContent).toBe('0.6');
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

    describe('method setValToTooltip adds a value to tooltip', function() {

        it('can add mask', function() {
            let testNode = document.createElement('div');
            // @ts-ignore
            view.setValToTooltip(testNode, 10, "'val/10 = ' + val/10");

            expect(testNode.textContent).toBe('val/10 = 1');
        });

        it('without mask returns val', function() {
            let testNode = document.createElement('div');
            // @ts-ignore
            view.setValToTooltip(testNode, 10);

            expect(testNode.textContent).toBe('10');
        });
    });
});

describe('View is created with different options:', function() {

    describe('vertical orientation, has tooltip, tooltipmask', function() {

        it('can create', function() {

            testOptions = Object.assign({}, defaultOptions, {
                vertical: true,
                height: '200px',
                tooltip: true,
                tooltipMask: "'val = ' + val",
            });
            view = new View(model, testOptions, sliderNode);

            expect(view).toBeDefined();
            expect(view.getLenght()).toBe(200);
            expect(view.getVertical()).toBeTruthy();
            expect(view.getTooltipMask()).toBe("'val = ' + val");
            expect(view.getSlider()).toBeDefined();
            expect(view.getThumb()).toBeDefined();
            expect(view.getTooltip()).toBeDefined();

            view.setThumbPosition(view.getThumb(), 5);
            view.setValToTooltip(view.getTooltip(), 5, view.getTooltipMask());

            expect(view.getThumb().style.top).toBe('-5px');
            expect(view.getTooltip().textContent).toBe("val = 5");

        });
    });

    describe('has two thumb, has tooltips', function() {

        it('can create', function() {

            testOptions = Object.assign({}, defaultOptions, {
                range: [1, 5]
            });
            model = new Model(testOptions);

            testOptions = Object.assign({}, defaultOptions, {
                vertical: false,
                height: '200px',
                width: '500px',
                tooltip: true,
                tooltipMask: "'val = ' + val",
            });
            view = new View(model, testOptions, sliderNode);

            expect(view).toBeDefined();
            expect(view.getLenght()).toBe(500);
            expect(view.getVertical()).toBeFalsy();
            expect(view.getTooltipMask()).toBe("'val = ' + val");
            expect(view.getSlider()).toBeDefined();
            expect(view.getThumb()).toBeUndefined();
            expect(view.getThumb(1)).toBeDefined();
            expect(view.getThumb(2)).toBeDefined();
            expect(view.getTooltip()).toBeUndefined();
            expect(view.getTooltip(1)).toBeDefined();
            expect(view.getTooltip(2)).toBeDefined();
            expect(view.getSlider().querySelector('.slider__thumb_left')).toBeDefined();
            expect(view.getSlider().querySelector('.slider__thumb_right')).toBeDefined();

            let thumb: HTMLDivElement = view.getSlider().querySelector('.slider__thumb_left');
            let tooltip: HTMLDivElement = view.getSlider().querySelector('.slider__tooltip_left');
            view.setThumbPosition(thumb, 150);
            view.setValToTooltip(tooltip, 5, view.getTooltipMask());

            expect(thumb.style.left).toBe('140px');
            expect(tooltip.textContent).toBe("val = 5");
        });
    });

    describe('with scale,', function() {

        it('can create', function() {

            testOptions = Object.assign({}, defaultOptions, {
                scale: true,
                scaleStep: 2,
                scaleMask: "'n ' + val"
            });

            let view = new View(model, testOptions, sliderNode);

            expect(view.getScale()).toBeDefined();
            expect(view.getScale().querySelectorAll('.slider__scale-division').length).toBe(6);
            expect(view.getScale().querySelectorAll('.slider__scale-division span')[5].textContent).toBe('n 10');

            let n: HTMLDivElement = view.getScale().querySelectorAll('.slider__scale-division')[1] as HTMLDivElement;
            expect(n.style.left).toBe('60px');
        });

        it('can create with reverse', function() {
            
            testOptions = Object.assign({}, defaultOptions, {
                reverse: true,
            });
            model = new Model(testOptions);

            testOptions = Object.assign({}, defaultOptions, {
                scale: true,
                scaleStep: 2,
                scaleMask: "'n ' + val"
            });
            view = new View(model, testOptions, sliderNode);

            expect(view.getScale()).toBeDefined();
            expect(view.getScale().querySelectorAll('.slider__scale-division').length).toBe(6);
            expect(view.getScale().querySelectorAll('.slider__scale-division span')[5].textContent).toBe('n 0');
            expect(view.getScale().querySelectorAll('.slider__scale-division span')[1].textContent).toBe('n 8');

            let n: HTMLDivElement = view.getScale().querySelectorAll('.slider__scale-division')[1] as HTMLDivElement;
            expect(n.style.left).toBe('60px');
        });
    });
}); 
