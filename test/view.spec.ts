import Model, { IModel } from '../src/MVP/Model';
import View, { IView } from '../src/MVP/View';
import { IModelOptions, IViewOptions, IOptions } from '../src/MVP/options';
import defaultOptions from '../src/MVP/defaultOptions';
//import { validateView, viewWarnings } from '../src/MVP/validations';
import { ViewMessage } from '../src/MVP/Observable';
import { getNumberOfSteps } from '../src/MVP/commonFunctions';
import { IWarnings } from '../src/MVP/warnings';

let model: IModel;
let view: IView;
let sliderNode: HTMLDivElement;
let viewOptions: IOptions;


beforeEach( function() {
    sliderNode = document.createElement('div');
    document.body.append(sliderNode);
    model = new Model(defaultOptions);
    viewOptions = Object.assign({}, defaultOptions, model.getOptions());
    view = new View(viewOptions, sliderNode);
});
afterEach( function() {
    sliderNode.remove();
});

describe('View is created with defaultOptions', () => {
    it('can create', () => {
        expect(view).toBeDefined();
    });
    it('has properties', () => {
        // @ts-ignore
        expect(view.length).toBeDefined();
        // @ts-ignore
        expect(view.vertical).toBeDefined();
        // @ts-ignore
        expect(view.slider).toBeDefined();
        // @ts-ignore
        expect(view.thumbFirst).toBeDefined();
        // @ts-ignore
        expect(view.thumbLast).toBeDefined();
        // @ts-ignore
        expect(view.bar).toBeDefined();
        // @ts-ignore
        expect(view.tooltipLast).toBeDefined();
        // @ts-ignore
        expect(view.scale).toBeDefined();
    });
});

describe('View has public methods', () => {
    describe('method update', () => {
        it('set thumbs on new positions, changes their left/top', () => {
            // @ts-ignore
            let offset: string = view.thumbLast.style.left;
            expect(offset).toBe('100%');

            let newOptions: IModelOptions = Object.assign({}, viewOptions, {
                end: 5
            })
            view.update(newOptions);
            // @ts-ignore
            offset = view.thumbLast.style.left;
            expect(offset).toBe('50%');
        });
    });

    describe('method rerender', () => {
        it('removes previous HTML elements of slider', () => {
            // @ts-ignore
            let node = view.thumbLast;
            // @ts-ignore
            expect(node).toBe(view.thumbLast)

            view.rerender(defaultOptions);
            // @ts-ignore
            expect(node).not.toBe(view.thumbLast)
        });

        it('rerenderes slider by new options', () => {
            // @ts-ignore
            expect(view.scale).not.toBeNull();
            // @ts-ignore
            expect(view.tooltipLast).not.toBeNull();
            // @ts-ignore
            expect(view.slider.classList.contains('slider_vertical')).toBeFalsy();
            // @ts-ignore
            expect(view.thumbFirst.style.left).toBe('0%');

            let newOptions = Object.assign({}, viewOptions, {
                scale: false,
                tooltip: false,
                vertical: true,
                range: true,
                begin: 5,
            });

            view.rerender(newOptions);

            // @ts-ignore
            expect(view.scale).toBeNull();
            // @ts-ignore
            expect(view.tooltipLast).toBeNull();
            // @ts-ignore
            expect(view.slider.classList.contains('slider_vertical')).toBeTruthy();
            // @ts-ignore
            expect(view.thumbFirst.style.left).not.toBe('0%');
        });
    });

    describe('method getOptions', () => {
        it('returns an object of View options', () => {
            let options: IViewOptions = view.getOptions();
            expect(options.length).toBeDefined();
            expect(options.vertical).toBeDefined();
            expect(options.tooltip).toBeDefined();
            expect(options.scale).toBeDefined();
        })
    });

    
    describe('method getWarning', () => {
        it('returns an object of last saved warnings, gotten when view was inicializated or rerendered', () => {
            let optionsWithWarning: IOptions = Object.assign({}, viewOptions, {
                tooltip: 'NOT_VALID'
            });
            view.rerender(optionsWithWarning);
            let warning: IWarnings = view.getWarnings();

            expect(Object.keys(warning).length).not.toBe(0);
        });

        it('returns empty object, when view was inicializated or rerendered last time without warnings', () => {
            let warning: IWarnings = view.getWarnings()

            expect(Object.keys(warning).length).toBe(0);
        });
    });

});

describe('View has private methods', () => {

    describe('method handleThumbDown', () => {
        it('saves the target thumb to property activeThumb for further processing', () => {
            let thumbOnDown: MouseEvent = new MouseEvent("mousedown");
            // @ts-ignore
            view.thumbLast.dispatchEvent(thumbOnDown);
            // @ts-ignore
            expect(view.activeThumb).toEqual(view.thumbLast);
        });
    })

    describe('method handleThumbMove', () => {
        it('handles event coordinates and sends to observers new thumb position - the offset as a racio of slider length, and witch of thumbs moved', () => {
            let isNotified: Boolean = false;
            let offsetRacio: number;
            view.subscribe((message: ViewMessage) => {
                if (message.type === 'LAST_THUMB_MOVED') {
                    isNotified = true;
                    offsetRacio = message.offsetRacio
                }
            });

            let thumbOnDown: MouseEvent = new MouseEvent("mousedown", {});
            let thumbOnMove: MouseEvent = new MouseEvent("mousemove", {
                bubbles: true,
                cancelable: true,
                clientX: 150,
                clientY: 5
            });
            // @ts-ignore
            view.thumbLast.dispatchEvent(thumbOnDown);
            // @ts-ignore
            view.thumbLast.dispatchEvent(thumbOnMove);

            expect(isNotified).toBeTruthy();
            expect( parseFloat(offsetRacio.toFixed(1)) ).toBe(0.5);
        });
    });

    describe('method handleThumbUp', () => {
        it('removes event listeners and clears property activeThumb', () => {
            let thumbOnDown: MouseEvent = new MouseEvent("mousedown", {});
            let thumbOnUp: MouseEvent = new MouseEvent("mouseup", {
                bubbles: true,
            });
            // @ts-ignore
            view.thumbLast.dispatchEvent(thumbOnDown);
            // @ts-ignore
            expect(view.activeThumb).toBeDefined();
            // @ts-ignore

            view.thumbLast.dispatchEvent(thumbOnUp);
            // @ts-ignore
            expect(view.activeThumb).toBeNull();
        });
    });

    describe('method handleSliderClick', () => {
        it('if its range, handles event coordinates and sends to observers position of closest thumb - the offset as a racio of slider length, and witch of thumbs moved', () => {

            let optionsWithRange = Object.assign({}, viewOptions, {range: true});
            view.rerender(optionsWithRange);

            let isNotified: Boolean = false;
            let offsetRacio: number;
            view.subscribe((message: ViewMessage) => {
                if (message.type === 'FIRST_THUMB_MOVED') {
                    isNotified = true;
                    offsetRacio = message.offsetRacio
                }
            });

            let sliderOnClick: MouseEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                clientX: 31,
                clientY: 5
            });
            // @ts-ignore
            view.slider.dispatchEvent(sliderOnClick);

            expect(isNotified).toBeTruthy();
            expect(parseFloat(offsetRacio.toFixed(1))).toBe(0.1);
        });

        it('if its not range, ignores the thumb of begin (first thumb if its not reverse and last thumb in other way), always works with the thumb of end', () => {
            let isNotifiedFirst: Boolean = false;
            let isNotifiedLast: Boolean = false;
            let offsetRacio: number;
            view.subscribe((message: ViewMessage) => {
                if (message.type === 'FIRST_THUMB_MOVED') {
                    isNotifiedFirst = true;
                }
                if (message.type === 'LAST_THUMB_MOVED') {
                    isNotifiedLast = true;
                    offsetRacio = message.offsetRacio
                }
            });

            let sliderOnClick: MouseEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                clientX: 31,
                clientY: 5
            });

            // @ts-ignore
            view.slider.dispatchEvent(sliderOnClick);

            expect(isNotifiedFirst).toBeFalsy();
            expect(isNotifiedLast).toBeTruthy();
            expect(parseFloat(offsetRacio.toFixed(1))).toBe(0.1);
        });
    });

    describe('method build', () => {
        it('sets valid length to slider', () => {
            // @ts-ignore
            expect(view.length).toBe('300px');
            // @ts-ignore
            view.build(Object.assign({}, viewOptions, {
                length: '400px'
            }));
            // @ts-ignore
            expect(view.length).toBe('400px');
        });

        it('adds class slider_horizontal or class slider_vertivcal', () => {
            // @ts-ignore
            expect(view.slider.classList.contains('slider_horizontal')).toBeTruthy();
            // @ts-ignore
            expect(view.slider.classList.contains('slider_vertical')).toBeFalsy();
            // @ts-ignore
            view.build(Object.assign({}, defaultOptions, model.getOptions(), {
                vertical: true
            }));
            // @ts-ignore
            expect(view.slider.classList.contains('slider_horizontal')).toBeFalsy();
            // @ts-ignore
            expect(view.slider.classList.contains('slider_vertical')).toBeTruthy();
        });

        it('builds nodes of thumbs, bar, tooltips, scale', () => {

            // @ts-ignore
            view.thumbLast.remove();
            // @ts-ignore
            view.bar.remove();
            // @ts-ignore
            view.tooltipLast.remove();
            // @ts-ignore
            view.scale.remove();

            setTimeout(() => {
                expect(document.querySelector('.slider__thumb_last')).toBeNull();
                expect(document.querySelector('.slider__bar')).toBeNull();
                expect(document.querySelector('.slider__tooltip_last')).toBeNull();
                expect(document.querySelector('.slider__scale')).toBeNull();                
            }, 3000)
            
            // @ts-ignore
            view.build(defaultOptions);

            expect(document.querySelector('.slider__thumb_last')).not.toBeNull();
            expect(document.querySelector('.slider__bar')).not.toBeNull();
            expect(document.querySelector('.slider__tooltip_last')).not.toBeNull();
            expect(document.querySelector('.slider__scale')).not.toBeNull();

            // @ts-ignore
            expect(view.thumbLast).toBeDefined();
            // @ts-ignore
            expect(view.bar).toBeDefined();
            // @ts-ignore
            expect(view.tooltipLast).toBeDefined();
            // @ts-ignore
            expect(view.scale).toBeDefined();
        });
    });

    describe('method rebuild', () => {
        it('removes all sliders children nodes, clears properties and builds new slider by new options', () => {
            expect(document.querySelector('.slider__tooltip_last')).not.toBeNull();
            expect(document.querySelector('.slider__scale')).not.toBeNull();
            // @ts-ignore
            expect(view.length).toBe(defaultOptions.length);

            let newOptions = Object.assign({}, viewOptions, {
                tooltip: false,
                scale: false,
                length: '200px'
            })
            // @ts-ignore
            view.rebuild(newOptions);

            // @ts-ignore
            expect(view.tooltipLast).toBeNull();
            // @ts-ignore
            expect(view.scale).toBeNull();
            // @ts-ignore
            expect(view.length).toBe(newOptions.length);
            setTimeout(() => {
            expect(document.querySelector('.slider__tooltip_last')).toBeNull();
            expect(document.querySelector('.slider__scale')).toBeNull();                
            }, 3000);
        });
    });

    describe('method buildThumbs', () => {
        beforeEach( function() {
            sliderNode.textContent = '';
            // @ts-ignore
            view.thumbFirst = null;
            // @ts-ignore
            view.thumbLast = null;
        });

        it('builds thumbs, adds classes slider__thumb, slider__thumb_first, slider__thumb_last', () => {
            // @ts-ignore
            view.buildThumbs(viewOptions);
            // @ts-ignore
            expect(view.thumbFirst.classList.contains('slider__thumb')).toBeTruthy();
            // @ts-ignore
            expect(view.thumbFirst.classList.contains('slider__thumb_first')).toBeTruthy();
            // @ts-ignore
            expect(view.thumbLast.classList.contains('slider__thumb')).toBeTruthy();
            // @ts-ignore
            expect(view.thumbLast.classList.contains('slider__thumb_last')).toBeTruthy();
        })

        it('adds class slider__thumb_disabled to first trumb, when its not range and not reverse', () => {
            // @ts-ignore
            view.buildThumbs(viewOptions);
            // @ts-ignore
            expect(view.thumbFirst.classList.contains('slider__thumb_disabled')).toBeTruthy();
        });

        it('adds class slider__thumb_disabled to last trumb, when its not range and reverse', () => {
            let newOptions: IOptions = Object.assign({}, viewOptions, {reverse: true});
            // @ts-ignore
            view.buildThumbs(newOptions);
            // @ts-ignore
            expect(view.thumbFirst.classList.contains('slider__thumb_disabled')).toBeFalsy();
            // @ts-ignore
            expect(view.thumbLast.classList.contains('slider__thumb_disabled')).toBeTruthy();
        });
    });

    describe('method setThumbs', () => {
        it('finds and sets thumbs positions, accoding to option reverse', () => {
            // @ts-ignore
            view.setThumbs(Object.assign({}, viewOptions, {
                begin: 0,
                end: 9,
                reverse: false
            }))
            // @ts-ignore
            let pos: number = parseInt( parseFloat(view.thumbLast.style.left).toFixed(0), 10 )
            expect(pos).toBe(90);

            // @ts-ignore
            view.setThumbs(Object.assign({}, viewOptions, {
                begin: 0,
                end: 9,
                reverse: true
            }))
            // @ts-ignore
            let pos: number = parseInt( parseFloat(view.thumbFirst.style.left).toFixed(0), 10 )
            expect(pos).toBe(10);
        });
    });

    describe('method setBar', () => {
        it('Adds left and width to bar, when horizontal. Adds top and height, when vertical', () => {
            // @ts-ignore
            view.bar.style.left = null;
            // @ts-ignore
            view.bar.style.width = null;

            // @ts-ignore
            view.setBar();

            // @ts-ignore
            expect(view.bar.style.left).toBe('0%');
            // @ts-ignore
            expect(view.bar.style.width).toBe('100%');

            // @ts-ignore
            view.rebuild(Object.assign({}, viewOptions, {vertical: true}))
            
            // @ts-ignore
            view.bar.style.top = null;
            // @ts-ignore
            view.bar.style.height = null;

            // @ts-ignore
            view.setBar();

            // @ts-ignore
            expect(view.bar.style.top).toBe('0%');
            // @ts-ignore
            expect(view.bar.style.height).toBe('100%');
        });
    });

    describe('method buildScale', () => {
        it('builds scale, adds divisions', () => {
            let optionsWithoutScale = Object.assign({}, viewOptions, {scale: false});
            // @ts-ignore
            view.rebuild(optionsWithoutScale);
            // @ts-ignore
            expect(view.scale).toBeNull();
            
            // @ts-ignore
            view.buildScale(viewOptions);
            // @ts-ignore
            expect(view.scale).toBeDefined();
            let numOfSteps = getNumberOfSteps(viewOptions.min, viewOptions.max, viewOptions.step);
            // @ts-ignore
            expect(view.scale.children.length).toBe(numOfSteps + 1);
            // @ts-ignore
            let firstDivision = view.scale.children[0];
            expect(firstDivision.classList.contains('slider__scale-division')).toBeTruthy();
            expect(firstDivision.firstChild.classList.contains('slider__scale-division-text')).toBeTruthy();
            expect(firstDivision.firstChild.textContent).toBe('0');
        });
    });

    describe('method setTooltipValues', () => {
        it('sets values to tooltips accoding to reverse', () => {
            // @ts-ignore
            expect(view.tooltipFirst.textContent).toBe('0')

            // @ts-ignore
            view.rebuild(Object.assign({}, viewOptions, {reverse: true}));
            // @ts-ignore
            expect(view.tooltipFirst.textContent).toBe('10');
        });

        it('sets value from customValues, if this option is defined', () => {
            // @ts-ignore
            view.rebuild(Object.assign({}, viewOptions, {customValues: ['a', 'b', 'c']}));
            // @ts-ignore
            expect(view.tooltipFirst.textContent).toBe('a');
        });
    });

    describe('method setThumbPosition', () => {
        it('sets left or top, accoding to reverse, to current node', () => {
            let someNode = document.createElement('div');
            document.body.append(someNode);

            // @ts-ignore
            view.setThumbPosition(someNode, '10%');
            expect(someNode.style.left).toBe('10%');
        });

        it('adds z index to first thumb, if both of them are in the end', () => {
            // @ts-ignore
            view.rebuild(Object.assign({}, viewOptions, {
                range: true,
                begin: 10,
                end: 10
            }));
            // @ts-ignore
            expect(view.thumbFirst.style.zIndex).not.toBeNull();
        });
    });

    describe('method getLengthInPx', () => {
        it('returns lendth of slider', () => {
            // @ts-ignore
            expect(view.getLengthInPx()).toBe(302);
        });
    });

    describe('method getOffsetInPx', () => {
        it('returns the offset from left or top(if its vertical), from document borders', () => {
            // @ts-ignore
            expect(view.getOffsetInPx()).toBe(8);
        });
    });
});


describe('View has static methods', () => {
    describe('method getValidLength', () => {
        it('checks, if length is valid to CSS, returns it, if valid', () => {
            // @ts-ignore
            let length = View.getValidLength('100px', '200px');
            expect(length).toBe('100px');
        });
        it('changes "," to "." if float', () => {
            // @ts-ignore
            let length = View.getValidLength('100,25px', '200px');
            expect(length).toBe('100.25px');
        });
        it('adds px if its only number', () => {
            // @ts-ignore
            let length = View.getValidLength('100', '200px');
            expect(length).toBe('100px');
        });
        it('returns reserve valid length, if length does not match to regular expression', () => {
            // @ts-ignore
            let length = View.getValidLength('dfgh', '200px');
            expect(length).toBe('200px');
        });
    });

    describe('method buildNode', () => {
        it('builds new node, adds classes, appends it to parent node, returns it', () => {
            let parent = document.createElement('div');
            document.body.append(parent);
            // @ts-ignore
            let newChild = View.buildNode(parent, 'class1', 'class2');
            expect(parent.children[0]).toBe(newChild);
            expect(newChild.classList.contains('class1')).toBeTruthy();
            expect(newChild.classList.contains('class2')).toBeTruthy();
        });
    });

    describe('method findThumbPosition', () => {
        it('returns offset as a percent from begin of slider to some value', () => {
            // @ts-ignore
            let percent: string = View.findThumbPosition(4, viewOptions);
            // @ts-ignore
            expect(percent, viewOptions).toBe('40%')
        });
    });
});













/* import Model, { IModel } from '../src/MVP/Model';
import View, { IView } from '../src/MVP/View';
import { IModelOptions, IViewOptions, IOptions } from '../src/MVP/options';
import defaultOptions from '../src/MVP/defaultOptions';
//import { validateView, viewWarnings } from '../src/MVP/validations';
import { ViewMessage } from '../src/MVP/Observerable';
import { getNumberOfSteps } from '../src/MVP/commonFunctions';
import { IWarnings } from '../src/MVP/warnings';

let model: IModel;
let view: IView;
let sliderNode: HTMLDivElement;
let viewOptions: IOptions;


beforeEach( function() {
    sliderNode = document.createElement('div');
    document.body.append(sliderNode);
    model = new Model(defaultOptions);
    viewOptions = Object.assign({}, defaultOptions, model.getOptions());
    view = new View(viewOptions, sliderNode);
});
afterEach( function() {
    sliderNode.remove();
});

describe('View is created with defaultOptions', () => {
    it('can create', () => {
        expect(view).toBeDefined();
    });
    it('has properties', () => {
        // @ts-ignore
        expect(view.length).toBeDefined();
        // @ts-ignore
        expect(view.vertical).toBeDefined();
        // @ts-ignore
        expect(view.slider).toBeDefined();
        // @ts-ignore
        expect(view.thumbFirst).toBeDefined();
        // @ts-ignore
        expect(view.thumbLast).toBeDefined();
        // @ts-ignore
        expect(view.bar).toBeDefined();
        // @ts-ignore
        expect(view.tooltipLast).toBeDefined();
        // @ts-ignore
        expect(view.scale).toBeDefined();
    });
});

describe('View has public methods', () => {
    describe('method update', () => {
        it('set thumbs on new positions, changes their left/top', () => {
            // @ts-ignore
            let offset: string = view.thumbLast.style.left;
            expect(offset).toBe('100%');

            let newOptions: IModelOptions = Object.assign({}, viewOptions, {
                end: 5
            })
            view.update(newOptions);
            // @ts-ignore
            offset = view.thumbLast.style.left;
            expect(offset).toBe('50%');
        });
    });

    describe('method rerender', () => {
        it('removes previous HTML elements of slider', () => {
            // @ts-ignore
            let node = view.thumbLast;
            // @ts-ignore
            expect(node).toEqual(view.thumbLast)

            view.rerender(defaultOptions);
            // @ts-ignore
            expect(node).not.toEqual(view.thumbLast)
        });

        it('rebuilds slider by new options', () => {
            // @ts-ignore
            expect(view.scale).toBeDefined();
            // @ts-ignore
            expect(view.tooltipLast).toBeDefined();
            // @ts-ignore
            expect(view.slider.classList.contains('slider_vertical')).toBeFalsy();
            // @ts-ignore
            expect(view.thumbFirst.style.left).toBe('0%');

            let newOptions = Object.assign({}, viewOptions, {
                scale: false,
                tooltip: false,
                vertical: true,
                range: true,
                begin: 5,
            });

            view.rerender(newOptions);

            // @ts-ignore
            expect(view.scale).toBeNull();
            // @ts-ignore
            expect(view.tooltipLast).toBeNull();
            // @ts-ignore
            expect(view.slider.classList.contains('slider_vertical')).toBeTruthy();
            // @ts-ignore
            expect(view.thumbFirst.style.left).not.toBe('0%');
        });
    });

    describe('method getOptions', () => {
        it('returns an object of View options', () => {
            let options: IViewOptions = view.getOptions();
            expect(options.length).toBeDefined();
            expect(options.vertical).toBeDefined();
            expect(options.tooltip).toBeDefined();
            expect(options.scale).toBeDefined();
        })
    });

    
    describe('method getWarning', () => {
        it('returns an object of last saved warnings, gotten when view was inicializated or rerendered', () => {
            let optionsWithWarning: IModelOptions = Object.assign({}, viewOptions, {
                length: 'sdfghjkl'
            })
            view.rerender(optionsWithWarning);
            let warning: IWarnings = view.getWarnings();

            expect(Object.keys(warning).length).not.toBe(0);
        });

        it('returns empty object, when view was inicializated or rerendered last time without warnings', () => {
            let warning: IWarnings = view.getWarnings()

            expect(Object.keys(warning).length).toBe(0);
        });
    });

});

describe('View has private methods', () => {

    describe('method handleThumbDown', () => {
        it('saves the target thumb to property activeThumb for further processing', () => {
            let thumbOnDown: MouseEvent = new MouseEvent("mousedown");
            // @ts-ignore
            view.thumbLast.dispatchEvent(thumbOnDown);
            // @ts-ignore
            expect(view.activeThumb).toEqual(view.thumbLast);
        });
    })

    describe('method handleThumbMove', () => {
        it('handles event coordinates and sends to observers new thumb position - the offset as a racio of slider length, and witch of thumbs moved', () => {
            let isNotified: Boolean = false;
            let offsetRacio: number;
            view.subscribe((message: ViewMessage) => {
                if (message.type === 'LAST_THUMB_MOVED') {
                    isNotified = true;
                    offsetRacio = message.offsetRacio
                }
            });

            let thumbOnDown: MouseEvent = new MouseEvent("mousedown", {});
            let thumbOnMove: MouseEvent = new MouseEvent("mousemove", {
                bubbles: true,
                cancelable: true,
                clientX: 150,
                clientY: 5
            });
            // @ts-ignore
            view.thumbLast.dispatchEvent(thumbOnDown);
            // @ts-ignore
            view.thumbLast.dispatchEvent(thumbOnMove);

            expect(isNotified).toBeTruthy();
            expect( parseFloat(offsetRacio.toFixed(1)) ).toBe(0.5);
        });
    });

    describe('method handleThumbUp', () => {
        it('removes event listeners and clears property activeThumb', () => {
            let thumbOnDown: MouseEvent = new MouseEvent("mousedown", {});
            let thumbOnUp: MouseEvent = new MouseEvent("mouseup", {
                bubbles: true,
            });
            // @ts-ignore
            view.thumbLast.dispatchEvent(thumbOnDown);
            // @ts-ignore
            expect(view.activeThumb).toBeDefined();
            // @ts-ignore

            view.thumbLast.dispatchEvent(thumbOnUp);
            // @ts-ignore
            expect(view.activeThumb).toBeNull();
        });
    });

    describe('method handleSliderClick', () => {
        it('if its range, handles event coordinates and sends to observers position of closest thumb - the offset as a racio of slider length, and witch of thumbs moved', () => {

            let optionsWithRange = Object.assign({}, viewOptions, {range: true});
            view.rerender(optionsWithRange);

            let isNotified: Boolean = false;
            let offsetRacio: number;
            view.subscribe((message: ViewMessage) => {
                if (message.type === 'FIRST_THUMB_MOVED') {
                    isNotified = true;
                    offsetRacio = message.offsetRacio
                }
            });

            let sliderOnClick: MouseEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                clientX: 31,
                clientY: 5
            });
            // @ts-ignore
            view.slider.dispatchEvent(sliderOnClick);

            expect(isNotified).toBeTruthy();
            expect(parseFloat(offsetRacio.toFixed(1))).toBe(0.1);
        });

        it('if its not range, ignores the thumb of begin (first thumb if its not reverse and last thumb in other way), always works with the thumb of end', () => {
            let isNotifiedFirst: Boolean = false;
            let isNotifiedLast: Boolean = false;
            let offsetRacio: number;
            view.subscribe((message: ViewMessage) => {
                if (message.type === 'FIRST_THUMB_MOVED') {
                    isNotifiedFirst = true;
                }
                if (message.type === 'LAST_THUMB_MOVED') {
                    isNotifiedLast = true;
                    offsetRacio = message.offsetRacio
                }
            });

            let sliderOnClick: MouseEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                clientX: 31,
                clientY: 5
            });

            // @ts-ignore
            view.slider.dispatchEvent(sliderOnClick);

            expect(isNotifiedFirst).toBeFalsy();
            expect(isNotifiedLast).toBeTruthy();
            expect(parseFloat(offsetRacio.toFixed(1))).toBe(0.1);
        });
    });

    describe('method build', () => {
        it('sets valid length to slider', () => {
            // @ts-ignore
            expect(view.length).toBe('300px');
            // @ts-ignore
            view.build(Object.assign({}, viewOptions, {
                length: '400px'
            }));
            // @ts-ignore
            expect(view.length).toBe('400px');
        });

        it('adds class slider_horizontal or class slider_vertivcal', () => {
            // @ts-ignore
            expect(view.slider.classList.contains('slider_horizontal')).toBeTruthy();
            // @ts-ignore
            expect(view.slider.classList.contains('slider_vertical')).toBeFalsy();
            // @ts-ignore
            view.build(Object.assign({}, defaultOptions, model.getOptions(), {
                vertical: true
            }));
            // @ts-ignore
            expect(view.slider.classList.contains('slider_horizontal')).toBeFalsy();
            // @ts-ignore
            expect(view.slider.classList.contains('slider_vertical')).toBeTruthy();
        });

        it('builds nodes of thumbs, bar, tooltips, scale', () => {

            // @ts-ignore
            view.thumbLast.remove();
            // @ts-ignore
            view.bar.remove();
            // @ts-ignore
            view.tooltipLast.remove();
            // @ts-ignore
            view.scale.remove();

            setTimeout(() => {
                expect(document.querySelector('.slider__thumb_last')).toBeNull();
                expect(document.querySelector('.slider__bar')).toBeNull();
                expect(document.querySelector('.slider__tooltip_last')).toBeNull();
                expect(document.querySelector('.slider__scale')).toBeNull();                
            }, 3000)
            
            // @ts-ignore
            view.build(defaultOptions);

            expect(document.querySelector('.slider__thumb_last')).not.toBeNull();
            expect(document.querySelector('.slider__bar')).not.toBeNull();
            expect(document.querySelector('.slider__tooltip_last')).not.toBeNull();
            expect(document.querySelector('.slider__scale')).not.toBeNull();

            // @ts-ignore
            expect(view.thumbLast).toBeDefined();
            // @ts-ignore
            expect(view.bar).toBeDefined();
            // @ts-ignore
            expect(view.tooltipLast).toBeDefined();
            // @ts-ignore
            expect(view.scale).toBeDefined();
        });
    });

    describe('method rebuild', () => {
        it('removes all sliders children nodes, clears properties and builds new slider by new options', () => {
            expect(document.querySelector('.slider__tooltip_last')).not.toBeNull();
            expect(document.querySelector('.slider__scale')).not.toBeNull();
            // @ts-ignore
            expect(view.length).toBe(defaultOptions.length);

            let newOptions = Object.assign({}, viewOptions, {
                tooltip: false,
                scale: false,
                length: '200px'
            })
            // @ts-ignore
            view.rebuild(newOptions);

            // @ts-ignore
            expect(view.tooltipLast).toBeNull();
            // @ts-ignore
            expect(view.scale).toBeNull();
            // @ts-ignore
            expect(view.length).toBe(newOptions.length);
            setTimeout(() => {
            expect(document.querySelector('.slider__tooltip_last')).toBeNull();
            expect(document.querySelector('.slider__scale')).toBeNull();                
            }, 3000);
        });
    });

    describe('method validate', () => {
        let newOptions: IOptions = Object.assign({}, viewOptions, {
            length: 'dfghh'
        });

        it('changes property warnings', () => {
            // @ts-ignore
            expect(Object.keys(view.warnings).length).toBe(0);
            // @ts-ignore
            view.validate(newOptions);
            // @ts-ignore
            expect(Object.keys(view.warnings).length).not.toBe(0);
        });

        it('notifies views observers if there are any warnings', () => {
            let isNotified: Boolean = false;
            view.subscribe((message: ViewMessage) => {
                if (message.type === 'WARNINGS') {
                    isNotified = true;
                }
            });
            // @ts-ignore
            view.validate(newOptions);
            // @ts-ignore
            expect(isNotified).toBeTruthy();
        });
    });

    describe('method buildThumbs', () => {
        beforeEach( function() {
            sliderNode.textContent = '';
            // @ts-ignore
            view.thumbFirst = null;
            // @ts-ignore
            view.thumbLast = null;
        });

        it('builds thumbs, adds classes slider__thumb, slider__thumb_first, slider__thumb_last', () => {
            // @ts-ignore
            view.buildThumbs(viewOptions);
            // @ts-ignore
            expect(view.thumbFirst.classList.contains('slider__thumb')).toBeTruthy();
            // @ts-ignore
            expect(view.thumbFirst.classList.contains('slider__thumb_first')).toBeTruthy();
            // @ts-ignore
            expect(view.thumbLast.classList.contains('slider__thumb')).toBeTruthy();
            // @ts-ignore
            expect(view.thumbLast.classList.contains('slider__thumb_last')).toBeTruthy();
        })

        it('adds class slider__thumb_disabled to first trumb, when its not range and not reverse', () => {
            // @ts-ignore
            view.buildThumbs(viewOptions);
            // @ts-ignore
            expect(view.thumbFirst.classList.contains('slider__thumb_disabled')).toBeTruthy();
        });

        it('adds class slider__thumb_disabled to last trumb, when its not range and reverse', () => {
            let newOptions: IOptions = Object.assign({}, viewOptions, {reverse: true});
            // @ts-ignore
            view.buildThumbs(newOptions);
            // @ts-ignore
            expect(view.thumbFirst.classList.contains('slider__thumb_disabled')).toBeFalsy();
            // @ts-ignore
            expect(view.thumbLast.classList.contains('slider__thumb_disabled')).toBeTruthy();
        });
    });

    describe('method setThumbs', () => {
        it('finds and sets thumbs positions, accoding to option reverse', () => {
            // @ts-ignore
            view.setThumbs(Object.assign({}, viewOptions, {
                begin: 0,
                end: 9,
                reverse: false
            }))
            // @ts-ignore
            let pos: number = parseInt( parseFloat(view.thumbLast.style.left).toFixed(0), 10 )
            expect(pos).toBe(90);

            // @ts-ignore
            view.setThumbs(Object.assign({}, viewOptions, {
                begin: 0,
                end: 9,
                reverse: true
            }))
            // @ts-ignore
            let pos: number = parseInt( parseFloat(view.thumbFirst.style.left).toFixed(0), 10 )
            expect(pos).toBe(10);
        });
    });

    describe('method setBar', () => {
        it('Adds left and width to bar, when horizontal. Adds top and height, when vertical', () => {
            // @ts-ignore
            view.bar.style.left = null;
            // @ts-ignore
            view.bar.style.width = null;

            // @ts-ignore
            view.setBar();

            // @ts-ignore
            expect(view.bar.style.left).toBe('0%');
            // @ts-ignore
            expect(view.bar.style.width).toBe('100%');

            // @ts-ignore
            view.rebuild(Object.assign({}, viewOptions, {vertical: true}))
            
            // @ts-ignore
            view.bar.style.top = null;
            // @ts-ignore
            view.bar.style.height = null;

            // @ts-ignore
            view.setBar();

            // @ts-ignore
            expect(view.bar.style.top).toBe('0%');
            // @ts-ignore
            expect(view.bar.style.height).toBe('100%');
        });
    });

    describe('method buildScale', () => {
        it('builds scale, adds divisions', () => {
            let optionsWithoutScale = Object.assign({}, viewOptions, {scale: false});
            // @ts-ignore
            view.rebuild(optionsWithoutScale);
            // @ts-ignore
            expect(view.scale).toBeNull();
            
            // @ts-ignore
            view.buildScale(viewOptions);
            // @ts-ignore
            expect(view.scale).toBeDefined();
            let numOfSteps = getNumberOfSteps(viewOptions.min, viewOptions.max, viewOptions.step);
            // @ts-ignore
            expect(view.scale.children.length).toBe(numOfSteps + 1);
            // @ts-ignore
            let firstDivision = view.scale.children[0];
            expect(firstDivision.classList.contains('slider__scale-division')).toBeTruthy();
            expect(firstDivision.firstChild.classList.contains('slider__scale-division-text')).toBeTruthy();
            expect(firstDivision.firstChild.textContent).toBe('0');
        });
    });

    describe('method setTooltipValues', () => {
        it('sets values to tooltips accoding to reverse', () => {
            // @ts-ignore
            expect(view.tooltipFirst.textContent).toBe('0')

            // @ts-ignore
            view.rebuild(Object.assign({}, viewOptions, {reverse: true}));
            // @ts-ignore
            expect(view.tooltipFirst.textContent).toBe('10');
        });

        it('sets value from customValues, if this option is defined', () => {
            // @ts-ignore
            view.rebuild(Object.assign({}, viewOptions, {customValues: ['a', 'b', 'c']}));
            // @ts-ignore
            expect(view.tooltipFirst.textContent).toBe('a');
        });
    });

    describe('method setThumbPosition', () => {
        it('sets left or top, accoding to reverse, to current node', () => {
            let someNode = document.createElement('div');
            document.body.append(someNode);

            // @ts-ignore
            view.setThumbPosition(someNode, '10%');
            expect(someNode.style.left).toBe('10%');
        });

        it('adds z index to first thumb, if both of them are in the end', () => {
            // @ts-ignore
            view.rebuild(Object.assign({}, viewOptions, {
                range: true,
                begin: 10,
                end: 10
            }));
            // @ts-ignore
            expect(view.thumbFirst.style.zIndex).not.toBeNull();
        });
    });

    describe('method findThumbPosition', () => {
        it('returns offset as a percent from begin of slider to some value', () => {
            // @ts-ignore
            let percent: string = view.findThumbPosition(4, viewOptions);
            // @ts-ignore
            expect(percent, viewOptions).toBe('40%')
        });
    });

    describe('method buildNode', () => {
        it('builds new node, adds classes, appends it to parent node, returns it', () => {
            let parent = document.createElement('div');
            document.body.append(parent);
            // @ts-ignore
            let newChild = view.buildNode(parent, 'class1', 'class2');
            expect(parent.children[0]).toBe(newChild);
            expect(newChild.classList.contains('class1')).toBeTruthy();
            expect(newChild.classList.contains('class2')).toBeTruthy();
        });
    });

    describe('method getValidLength', () => {
        it('checks, if length is valid to CSS, returns it, if valid', () => {
            // @ts-ignore
            let length = view.getValidLength('100px', '200px');
            expect(length).toBe('100px');
        });
        it('changes "," to "." if float', () => {
            // @ts-ignore
            let length = view.getValidLength('100,25px', '200px');
            expect(length).toBe('100.25px');
        });
        it('adds px if its only number', () => {
            // @ts-ignore
            let length = view.getValidLength('100', '200px');
            expect(length).toBe('100px');
        });
        it('returns reserve valid length, if length does not match to regular expression', () => {
            // @ts-ignore
            let length = view.getValidLength('dfgh', '200px');
            expect(length).toBe('200px');
        });
    });

    describe('method getLengthInPx', () => {
        it('returns lendth of slider', () => {
            // @ts-ignore
            expect(view.getLengthInPx()).toBe(302);
        });
    });

    describe('method getOffsetInPx', () => {
        it('returns the offset from left or top(if its vertical), from document borders', () => {
            // @ts-ignore
            expect(view.getOffsetInPx()).toBe(8);
        });
    });
}); */