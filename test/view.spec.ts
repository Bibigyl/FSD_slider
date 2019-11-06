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
/*     view = null;
    model = null;
    testOptions = null;

    document.querySelector('.slider').remove();
    sliderNode = null;
    testNode = null; */
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

        it('throught error if mask is not valid', function() {
            let testNode = document.createElement('div');
            
            // ???????????????? нужно ли исправлять
            // @ts-ignore
            expect(function() {view.setValToTooltip(testNode, 10, undefined)}).not.toThrow(new Error('Invalid mask for tooltip'));
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

            let view = new View(model, testOptions, sliderNode);

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

            let view = new View(model, testOptions, sliderNode);

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
}); 
