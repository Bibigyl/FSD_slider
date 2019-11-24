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
    it('has default length', function() {  
        expect((view.getSlider().clientWidth) + 'px').toBe(defaultOptions.length);
    });
    it('getLenght returns lenght', function() {
        expect(view.getLenght()).toBeDefined();
    });
    it('getVertical returns vertical as boolean', function() {
        expect(view.getVertical()).toBeFalsy();
    });
    it('getRange returns false', function() {
        expect(view.getRange()).toBeFalsy();
    })
    it('getTooltipMask returns "val"', function() {
        expect(view.getTooltipMask()).toBe("val");
    })
    it('setTooltipMask changes tooltip mask', function() {
        view.setTooltipMask('1');
        expect(view.getTooltipMask()).toBe('1');
    });
    it('getScaleStep returns step, either slider is builded first without scale', function() {
        expect(view.getScaleStep()).toBe(1);
    });
    it('setScaleStep sets scale step', function() {
        view.setScaleStep(1);
        expect(view.getScaleStep()).toBe(1);
    });
    it('getScaleMask returns "val"', function() {
        expect(view.getScaleMask()).toBe(defaultOptions.scaleMask);
    });
    it('setScaleMask sets scale step', function() {
        view.setScaleMask('1');
        expect(view.getScaleMask()).toBe('1');
    });
    it('getNumberOfSteps returns number of steps', function() {
        expect(view.getNumberOfSteps()).toBe(10);
    });
    it('setNumberOfSteps, has no validations of step', function() {
        view.setNumberOfSteps(6);
        expect(view.getNumberOfSteps()).toBe(6);
    });



    it('getSlider returns slider node', function() {
        expect(view.getSlider()).toBeDefined();
    });
    it('getThumb returns thumb node', function() {
        expect(view.getThumb()).toBeDefined();
    });
    it('getTooltip returns undefined', function() {
        expect(view.getTooltip()).toBeUndefined();
    });
    it('setTooltip changes _tooltip, has no validation', function() {
        testNode = document.createElement('div');
        view.setTooltip(testNode);
        expect(view.getTooltip()).toBeDefined();
    });
    it('getScale returns undefined', function() {
        expect(view.getScale()).toBeUndefined();
    });
    it('setScale changes _scale, has no validation', function() {
        testNode = document.createElement('div');
        view.setScale(testNode);
        expect(view.getScale()).toBeDefined();
    });
});

describe('View has methods for build and rebuild', function() {

    describe('changeSliderBase', function() {

        it('changes orientation and length', function() {
            view.changeSliderBase({
                vertical: true,
                length: '400px',
            });

            expect(view.getLenght()).toBe(400);
            expect(view.getVertical()).toBeTruthy();
        });
    });

    describe('changeRangeToVal', function() {

        it('removes one of two thumbs, makes _range false', function() {
            testOptions = Object.assign({}, defaultOptions, {
                range: [1, 2]
            })
            model = new Model(testOptions);
            view = new View(model, testOptions, sliderNode);

            expect(view.getRange()).toBeTruthy();
            expect(view.getThumb(1)).toBeDefined();

            model = new Model(defaultOptions);
            view.changeRangeToVal(model);

            expect(view.getRange()).toBeFalsy();
            expect(view.getThumb(1)).toBeUndefined();
            expect(view.getThumb()).toBeDefined();
        });
    });

    describe('changeValToRange', function() {

        it('adds second thumb, makes _range false', function() {
            testOptions = Object.assign({}, defaultOptions, {
                range: [1, 2]
            })
            model = new Model(testOptions);
            view.changeValToRange(model);

            expect(view.getRange()).toBeTruthy();
            expect(view.getThumb()).toBeUndefined();
            expect(view.getThumb(1)).toBeDefined();
        });
    });

    describe('buildValidTooltips', function() {

        it('builds tooltips accoding to model data, tooltip mask', function() {
            view.buildValidTooltips(model);

            expect(view.getTooltip()).toBeDefined();
            expect(view.getTooltip(1)).toBeUndefined();
            expect(view.getTooltip().innerHTML).toBe('0');
            // @ts-ignore
            expect(view._tooltip).toBeDefined();
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

    describe('rebuildScale', function() {
        it('removes excess scale divisions or adds scale divions if not enough, accoding to model', function() {
            testOptions = Object.assign({}, defaultOptions, {
                scale: true,
                scaleStep: 1,
            });
            view = new View(model, testOptions, sliderNode);

            expect(view.getScale().querySelectorAll('.slider__scale-division').length).toBe(11);

            model = new Model(Object.assign({}, defaultOptions, {
                maxVal: 20,
            }));
            view.rebuildScale(model);

            expect(view.getScale().querySelectorAll('.slider__scale-division').length).toBe(21);
        });
        it('removes excess scale divisions or adds scale divions if not enough, accoding to scale step', function() {
            testOptions = Object.assign({}, defaultOptions, {
                scale: true,
                scaleStep: 1,
            });
            view = new View(model, testOptions, sliderNode);

            expect(view.getScale().querySelectorAll('.slider__scale-division').length).toBe(11);

            view.setScaleStep(2);
            view.rebuildScale(model);

            expect(view.getScale().querySelectorAll('.slider__scale-division').length).toBe(6);
        });
    });

    describe('changeScaleDivision', function() {
        it('changes text in span and changes position of each division in scale', function() {
            testOptions = Object.assign({}, defaultOptions, {
                scale: true,
                scaleStep: 1,
            });
            view = new View(model, testOptions, sliderNode);

            let el: HTMLDivElement = view.getScale().querySelectorAll('.slider__scale-division')[1] as HTMLDivElement;
            expect(el.style.left).toBe('30px');
            expect(el.innerHTML).toBe('<span>1</span>');

            view.setScaleStep(2);
            view.rebuildScale(model);
            view.changeScaleDivision(model); 
            
            el = view.getScale().querySelectorAll('.slider__scale-division')[1] as HTMLDivElement;
            expect(el.style.left).toBe('60px');
            expect(el.innerHTML).toBe('<span>2</span>');
        });
    });  
});

describe('View has auxiliary methods', function() {

    describe('setThumbPosition', function() {
        it('sets new left or top to thumb', function() {
            view.setThumbPosition(view.getThumb(), 30);
            expect(view.getThumb().style.left).toBe('20px');
            // @ts-ignore
            view._vertical = true;
            view.setThumbPosition(view.getThumb(), 30);
            expect(view.getThumb().style.left).toBe('');
            expect(view.getThumb().style.top).toBe('20px');
        });
    });

    describe('setValToTooltip', function() {
        it('sets val with mask to span in division node', function() {
            view.buildValidTooltips(model);
            view.setValToTooltip(view.getTooltip(), 'abc', "'val = ' + val");
            expect(view.getTooltip().innerText).toBe('val = abc');
        });
    });

    describe('findThumbPosition', function() {
        it('returns new position of thumb in pxs accoding to step', function() {
            let n: number = view.findThumbPosition(1, 10);
            expect(n).toBe(30);
        });
    });

    describe('oneStepLength', function() {
        it('returns lentgh of one step', function() {
            expect(view.oneStepLenght()).toBe(30);
        });
    });

    describe('removeNode', function() {
        it('removes node, returns undefined', function() {
            //@ts-ignore
            view._thumb = view.removeNode(document.querySelector('.slider__thumb'));
            expect(view.getThumb()).toBeUndefined();
            setTimeout(function() {
                expect(document.querySelector('.slider .slider__thumb')).toBeUndefined();
            }, 2000); 
        });
    });

    describe('scaleStepValidation', function() {
        it('returns new scale step or model step, accoding to number of steps. Scale step should be multiple to step in model', function() {
            let step: number = view.scaleStepValidation(model, 2);
            expect(step).toBe(2);
            step = view.scaleStepValidation(model, 3);
            expect(step).toBe(1);
        });
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
    
    describe('lengthValidation returns string if its valid', function() {

        it('returns 10px if 10px', function() {
            // @ts-ignore
            expect(view.lengthValidation('10Px')).toBe('10px');
        });
        it('returns 10px if 10', function() {
            // @ts-ignore
            expect(view.lengthValidation('10')).toBe('10px');
        });
        it('returns 10.5% if 10,5%', function() {
            // @ts-ignore
            expect(view.lengthValidation('10,5%')).toBe('10.5%');
        });
        it('returns Error', function() {
            // @ts-ignore
            expect(function() {view.lengthValidation('10pxs')}).toThrow(new Error('Width (or height) should be valid to css'));
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
                length: '200px',
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
                length: '200px',
                tooltip: true,
                tooltipMask: "'val = ' + val",
            });
            view = new View(model, testOptions, sliderNode);

            expect(view).toBeDefined();
            expect(view.getLenght()).toBe(200);
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
