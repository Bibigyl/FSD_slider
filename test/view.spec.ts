import Model, { IModel, IModelOptions } from '../src/MVP/Model';
import { defaultOptions, IOptions } from '../src/MVP/defaultOptions';
import { IWarnings } from '../src/MVP/validations';
import { ViewMessage } from '../src/MVP/Observer';
import View, { IView, IViewOptions } from '../src/MVP/View';
import { getNumberOfSteps } from '../src/MVP/commonFunctions';

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
    model = null;
    view = null;
    viewOptions = null;
    sliderNode.remove();
});

describe('View is created with defaultOptions', () => {
    it('can create', () => {
        expect(view).toBeDefined();
    });
    it('has properties', () => {
        // @ts-ignore
        expect(view._length).toBeDefined();
        // @ts-ignore
        expect(view._vertical).toBeDefined();
        // @ts-ignore
        expect(view._slider).toBeDefined();
        // @ts-ignore
        expect(view._thumbFirst).toBeDefined();
        // @ts-ignore
        expect(view._thumbLast).toBeDefined();
        // @ts-ignore
        expect(view._bar).toBeDefined();
        // @ts-ignore
        expect(view._tooltipLast).toBeDefined();
        // @ts-ignore
        expect(view._scale).toBeDefined();
    });
});

describe('View has public methods', () => {
    describe('method update', () => {
        it('set thumbs on new positions, changes their left/top', () => {
            // @ts-ignore
            let offset: string = view._thumbLast.style.left;
            expect(offset).toBe('100%');

            let newOptions: IModelOptions = Object.assign({}, viewOptions, {
                end: 5
            })
            view.update(newOptions);
            // @ts-ignore
            offset = view._thumbLast.style.left;
            expect(offset).toBe('50%');
        });
    });

    describe('method rerender', () => {
        it('removes previous HTML elements of slider', () => {
            // @ts-ignore
            let node = view._thumbLast;
            // @ts-ignore
            expect(node).toEqual(view._thumbLast)

            view.rerender(defaultOptions);
            // @ts-ignore
            expect(node).not.toEqual(view._thumbLast)
        });

        it('rebuilds slider by new options', () => {
            // @ts-ignore
            expect(view._scale).toBeDefined();
            // @ts-ignore
            expect(view._tooltipLast).toBeDefined();
            // @ts-ignore
            expect(view._slider.classList.contains('slider_vertical')).toBeFalsy();
            // @ts-ignore
            expect(view._thumbFirst.style.left).toBe('0%');

            let newOptions = Object.assign({}, viewOptions, {
                scale: false,
                tooltip: false,
                vertical: true,
                range: true,
                begin: 5,
            });

            view.rerender(newOptions);

            // @ts-ignore
            expect(view._scale).toBeUndefined();
            // @ts-ignore
            expect(view._tooltipLast).toBeUndefined();
            // @ts-ignore
            expect(view._slider.classList.contains('slider_vertical')).toBeTruthy();
            // @ts-ignore
            expect(view._thumbFirst.style.left).not.toBe('0%');
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
        it('saves the target thumb to property _activeThumb for further processing', () => {
            let thumbOnDown: MouseEvent = new MouseEvent("mousedown");
            // @ts-ignore
            view._thumbLast.dispatchEvent(thumbOnDown);
            // @ts-ignore
            expect(view._activeThumb).toEqual(view._thumbLast);
        });
    })

    describe('method handleThumbMove', () => {
        it('handles event coordinates and sends to observers new thumb position - the offset as a racio of slider length, and witch of thumbs moved', () => {
            let isNotified: Boolean = false;
            let offsetRacio: number;
            view.subscribe((message: ViewMessage) => {
                if (message.type == 'LAST_THUMB_MOVED') {
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
            view._thumbLast.dispatchEvent(thumbOnDown);
            // @ts-ignore
            view._thumbLast.dispatchEvent(thumbOnMove);

            expect(isNotified).toBeTruthy();
            expect( parseFloat(offsetRacio.toFixed(1)) ).toBe(0.5);
        });
    });

    describe('method handleThumbUp', () => {
        it('removes event listeners and clears property _activeThumb', () => {
            let thumbOnDown: MouseEvent = new MouseEvent("mousedown", {});
            let thumbOnUp: MouseEvent = new MouseEvent("mouseup", {
                bubbles: true,
            });
            // @ts-ignore
            view._thumbLast.dispatchEvent(thumbOnDown);
            // @ts-ignore
            expect(view._activeThumb).toBeDefined();
            // @ts-ignore

            view._thumbLast.dispatchEvent(thumbOnUp);
            // @ts-ignore
            expect(view._activeThumb).toBeUndefined();
        });
    });

    describe('method handleSliderClick', () => {
        it('if its range, handles event coordinates and sends to observers position of closest thumb - the offset as a racio of slider length, and witch of thumbs moved', () => {

            let optionsWithRange = Object.assign({}, viewOptions, {range: true});
            view.rerender(optionsWithRange);

            let isNotified: Boolean = false;
            let offsetRacio: number;
            view.subscribe((message: ViewMessage) => {
                if (message.type == 'FIRST_THUMB_MOVED') {
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
            view._slider.dispatchEvent(sliderOnClick);

            expect(isNotified).toBeTruthy();
            expect(parseFloat(offsetRacio.toFixed(1))).toBe(0.1);
        });

        it('if its not range, ignores the thumb of begin (first thumb if its not reverse and last thumb in other way), always works with the thumb of end', () => {
            let isNotifiedFirst: Boolean = false;
            let isNotifiedLast: Boolean = false;
            let offsetRacio: number;
            view.subscribe((message: ViewMessage) => {
                if (message.type == 'FIRST_THUMB_MOVED') {
                    isNotifiedFirst = true;
                }
                if (message.type == 'LAST_THUMB_MOVED') {
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
            view._slider.dispatchEvent(sliderOnClick);

            expect(isNotifiedFirst).toBeFalsy();
            expect(isNotifiedLast).toBeTruthy();
            expect(parseFloat(offsetRacio.toFixed(1))).toBe(0.1);
        });
    });

    describe('method build', () => {
        it('sets valid length to slider', () => {
            // @ts-ignore
            expect(view._length).toBe('300px');
            // @ts-ignore
            view.build(Object.assign({}, viewOptions, {
                length: '400px'
            }));
            // @ts-ignore
            expect(view._length).toBe('400px');
        });

        it('adds class slider_horizontal or class slider_vertivcal', () => {
            // @ts-ignore
            expect(view._slider.classList.contains('slider_horizontal')).toBeTruthy();
            // @ts-ignore
            expect(view._slider.classList.contains('slider_vertical')).toBeFalsy();
            // @ts-ignore
            view.build(Object.assign({}, defaultOptions, model.getOptions(), {
                vertical: true
            }));
            // @ts-ignore
            expect(view._slider.classList.contains('slider_horizontal')).toBeFalsy();
            // @ts-ignore
            expect(view._slider.classList.contains('slider_vertical')).toBeTruthy();
        });

        it('builds nodes of thumbs, bar, tooltips, scale', () => {

            sliderNode.textContent = '';
            // @ts-ignore
            view._thumbLast = undefined;
            // @ts-ignore
            view._bar = undefined;
            // @ts-ignore
            view._tooltipLast = undefined;
            // @ts-ignore
            view._scale = undefined;
            
            expect(document.querySelector('.slider__thumb_last')).toBeNull();
            expect(document.querySelector('.slider__bar')).toBeNull();
            expect(document.querySelector('.slider__tooltip_last')).toBeNull();
            expect(document.querySelector('.slider__scale')).toBeNull();

            // @ts-ignore
            view.build(defaultOptions);

            expect(document.querySelector('.slider__thumb_last')).not.toBeNull();
            expect(document.querySelector('.slider__bar')).not.toBeNull();
            expect(document.querySelector('.slider__tooltip_last')).not.toBeNull();
            expect(document.querySelector('.slider__scale')).not.toBeNull();

            // @ts-ignore
            expect(view._thumbLast).toBeDefined();
            // @ts-ignore
            expect(view._bar).toBeDefined();
            // @ts-ignore
            expect(view._tooltipLast).toBeDefined();
            // @ts-ignore
            expect(view._scale).toBeDefined();
        });
    });

    describe('method rebuild', () => {
        it('removes all sliders children nodes, clears properties and builds new slider by new options', () => {
            expect(document.querySelector('.slider__tooltip_last')).not.toBeNull();
            expect(document.querySelector('.slider__scale')).not.toBeNull();
            // @ts-ignore
            expect(view._length).toBe(defaultOptions.length);

            let newOptions = Object.assign({}, viewOptions, {
                tooltip: false,
                scale: false,
                length: '200px'
            })
            // @ts-ignore
            view.rebuild(newOptions);

            expect(document.querySelector('.slider__tooltip_last')).toBeNull();
            expect(document.querySelector('.slider__scale')).toBeNull();
            // @ts-ignore
            expect(view._length).toBe(newOptions.length);
        });
    });

    describe('method validate', () => {
        let newOptions: IOptions = Object.assign({}, viewOptions, {
            length: 'dfghh'
        });

        it('changes property _warnings', () => {
            // @ts-ignore
            expect(Object.keys(view._warnings).length).toBe(0);
            // @ts-ignore
            view.validate(newOptions);
            // @ts-ignore
            expect(Object.keys(view._warnings).length).not.toBe(0);
        });

        it('notifies views observers if there are any warnings', () => {
            let isNotified: Boolean = false;
            view.subscribe((message: ViewMessage) => {
                if (message.type == 'WARNINGS') {
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
            view._thumbFirst = undefined;
            // @ts-ignore
            view._thumbLast = undefined;
        });

        it('builds thumbs, adds classes slider__thumb, slider__thumb_first, slider__thumb_last', () => {
            // @ts-ignore
            view.buildThumbs(viewOptions);
            // @ts-ignore
            expect(view._thumbFirst.classList.contains('slider__thumb')).toBeTruthy();
            // @ts-ignore
            expect(view._thumbFirst.classList.contains('slider__thumb_first')).toBeTruthy();
            // @ts-ignore
            expect(view._thumbLast.classList.contains('slider__thumb')).toBeTruthy();
            // @ts-ignore
            expect(view._thumbLast.classList.contains('slider__thumb_last')).toBeTruthy();
        })

        it('adds class slider__thumb_disabled to first trumb, when its not range and not reverse', () => {
            // @ts-ignore
            view.buildThumbs(viewOptions);
            // @ts-ignore
            expect(view._thumbFirst.classList.contains('slider__thumb_disabled')).toBeTruthy();
        });

        it('adds class slider__thumb_disabled to last trumb, when its not range and reverse', () => {
            let newOptions: IOptions = Object.assign({}, viewOptions, {reverse: true});
            // @ts-ignore
            view.buildThumbs(newOptions);
            // @ts-ignore
            expect(view._thumbFirst.classList.contains('slider__thumb_disabled')).toBeFalsy();
            // @ts-ignore
            expect(view._thumbLast.classList.contains('slider__thumb_disabled')).toBeTruthy();
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
            let pos: number = parseInt( parseFloat(view._thumbLast.style.left).toFixed(0), 10 )
            expect(pos).toBe(90);

            // @ts-ignore
            view.setThumbs(Object.assign({}, viewOptions, {
                begin: 0,
                end: 9,
                reverse: true
            }))
            // @ts-ignore
            let pos: number = parseInt( parseFloat(view._thumbFirst.style.left).toFixed(0), 10 )
            expect(pos).toBe(10);
        });
    });

    describe('method setBarPosition', () => {
        it('Adds left and width to bar, when horizontal. Adds top and height, when vertical', () => {
            // @ts-ignore
            view._bar.style.left = null;
            // @ts-ignore
            view._bar.style.width = null;

            // @ts-ignore
            view.setBarPosition();

            // @ts-ignore
            expect(view._bar.style.left).toBe('0%');
            // @ts-ignore
            expect(view._bar.style.width).toBe('100%');

            // @ts-ignore
            view.rebuild(Object.assign({}, viewOptions, {vertical: true}))
            
            // @ts-ignore
            view._bar.style.top = null;
            // @ts-ignore
            view._bar.style.height = null;

            // @ts-ignore
            view.setBarPosition();

            // @ts-ignore
            expect(view._bar.style.top).toBe('0%');
            // @ts-ignore
            expect(view._bar.style.height).toBe('100%');
        });
    });

    describe('method buildScale', () => {
        it('builds scale, adds divisions', () => {
            let optionsWithoutScale = Object.assign({}, viewOptions, {scale: false});
            // @ts-ignore
            view.rebuild(optionsWithoutScale);
            // @ts-ignore
            expect(view._scale).toBeUndefined();
            
            // @ts-ignore
            view.buildScale(viewOptions);
            // @ts-ignore
            expect(view._scale).toBeDefined();
            let numOfSteps = getNumberOfSteps(viewOptions.min, viewOptions.max, viewOptions.step);
            // @ts-ignore
            expect(view._scale.children.length).toBe(numOfSteps + 1);
            // @ts-ignore
            let firstDivision = view._scale.children[0];
            expect(firstDivision.classList.contains('slider__scale-division')).toBeTruthy();
            expect(firstDivision.firstChild.classList.contains('slider__scale-division-text')).toBeTruthy();
            expect(firstDivision.firstChild.textContent).toBe('0');
        });
    });

    describe('method setTooltipValues', () => {
        it('sets values to tooltips accoding to reverse', () => {
            // @ts-ignore
            expect(view._tooltipFirst.textContent).toBe('0')

            // @ts-ignore
            view.rebuild(Object.assign({}, viewOptions, {reverse: true}));
            // @ts-ignore
            expect(view._tooltipFirst.textContent).toBe('10');
        });

        it('sets value from customValues, if this option is defined', () => {
            // @ts-ignore
            view.rebuild(Object.assign({}, viewOptions, {customValues: ['a', 'b', 'c']}));
            // @ts-ignore
            expect(view._tooltipFirst.textContent).toBe('a');
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
            expect(view._thumbFirst.style.zIndex).not.toBeNull();
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

    describe('method removeNode', () => {
        it('removes node from page, returns undefined', () => {
            // @ts-ignore
            view._thumbFirst = view.removeNode(view._thumbFirst);
            expect(document.querySelector('.slider__thumb_first')).toBeNull();
            // @ts-ignore
            expect(view._thumbFirst).toBeUndefined();
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
});