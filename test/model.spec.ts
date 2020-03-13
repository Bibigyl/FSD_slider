import Model, { IModel, IModelOptions } from '../src/MVP/Model';
import { defaultOptions } from '../src/MVP/defaultOptions';
import { IWarnings, validateModel } from '../src/MVP/validations';
import { ModelMessage } from '../src/MVP/Observer';

let model: IModel;

beforeEach( function() {
    model = new Model(defaultOptions);
});

describe('Model is created with defaultOptions', () => {
    it('can create', () => {
        expect(model).toBeDefined();
    });
    it('stores model defaultOptions', () => {
        // @ts-ignore
        expect(model._end).toBe(defaultOptions.max);
        // @ts-ignore
        expect(model._begin).toBe(defaultOptions.min);
        // @ts-ignore
        expect(model._range).toBe(defaultOptions.range);
        // @ts-ignore
        expect(model._min).toBe(defaultOptions.min);
        // @ts-ignore
        expect(model._max).toBe(defaultOptions.max);
        // @ts-ignore
        expect(model._step).toBe(defaultOptions.step);
        // @ts-ignore
        expect(model._customValues).toBe(defaultOptions.customValues);
        // @ts-ignore
        expect(model._reverse).toBe(defaultOptions.reverse);
    })
})

describe('Model has public methods', () => {
    describe('method update', () => {
        it('updates models data', () => {
            let newOptions: IModelOptions = {
                begin: 2,
                end: 8,
                range: true,
                min: -10,
                max: 20,
                step: 2,
                reverse: true,
                customValues: null
            };
            model.update(newOptions)
    
            // @ts-ignore
            expect(model._end).toBe(newOptions.end);
            // @ts-ignore
            expect(model._begin).toBe(newOptions.begin);
            // @ts-ignore
            expect(model._range).toBe(newOptions.range);
            // @ts-ignore
            expect(model._min).toBe(newOptions.min);
            // @ts-ignore
            expect(model._max).toBe(newOptions.max);
            // @ts-ignore
            expect(model._step).toBe(newOptions.step);
            // @ts-ignore
            expect(model._customValues).toBeNull();
            // @ts-ignore
            expect(model._reverse).toBe(newOptions.reverse);
        });

        it('notifies model observers, when data in model changed', () => {
            let isNotified: Boolean = false;
            model.subscribe((message: ModelMessage) => {
                if (message.type == 'NEW_DATA') {
                    isNotified = true;
                }
            });
            let optionsWithWarning: IModelOptions = Object.assign({}, defaultOptions, {
                end: 5
            })
            model.update(optionsWithWarning);

            expect(isNotified).toBeTruthy();
        });

        it('notifies model observers, when there are any warnings', () => {
            let isNotified = false;
            model.subscribe((message: ModelMessage) => {
                if (message.type == 'WARNINGS') {
                    isNotified = true;
                }
            })
            let optionsWithWarning: IModelOptions = Object.assign({}, defaultOptions, {
                begin: 'sdfghjkl'
            })
            model.update(optionsWithWarning);

            expect(isNotified).toBeTruthy();
        });
    });

    describe('method setEndByOffsetRacio', () => {
        it('sets new valid end on closest step by offset racio of the whole range (max - min)', () => {
            let racio: number = 0.56
            model.setEndByOffsetRacio(racio);
    
            // @ts-ignore
            expect(model._end).toBe(6);
        });

        it('notifies model observers, when end in model changed', () => {
            let isNotified: Boolean = false;
            model.subscribe((message: ModelMessage) => {
                if (message.type == 'NEW_VALUE') {
                    isNotified = true;
                }
            });

            let racio: number = 0.56;
            model.setEndByOffsetRacio(racio);

            expect(isNotified).toBeTruthy();
        });
    });

    describe('method setBeginByOffsetRacio', () => {
        it('sets new valid end on closest step by offset racio of the whole range (max - min), only when it is range', () => {
            let optionsWithRange: IModelOptions = Object.assign({}, defaultOptions, {range: true});
            model = new Model(optionsWithRange);

            let racio: number = 0.56;
            model.setBeginByOffsetRacio(racio);

            // @ts-ignore  
            expect(model._begin).toBe(6);
        });

        it('notifies model observers, when begin in model changed', () => {
            let optionsWithRange: IModelOptions = Object.assign({}, defaultOptions, {range: true});
            model = new Model(optionsWithRange);

            let isNotified = false;
            model.subscribe((message: ModelMessage) => {
                if (message.type == 'NEW_VALUE') {
                    isNotified = true;
                }
            });

            let racio: number = 0.56;
            model.setBeginByOffsetRacio(racio);

            expect(isNotified).toBeTruthy();
        });

        it('doesnt work, when its not range', () => {
            let racio: number = 0.56;
            model.setBeginByOffsetRacio(racio);

            // @ts-ignore 
            expect(model._begin).toBe(defaultOptions.min);
        });
    });

    describe('method getOptions', () => {
        it('returns an object with model data', () => {
            let gottenOptions: IModelOptions = model.getOptions();

            expect(gottenOptions.hasOwnProperty('begin')).toBeTruthy();
            expect(gottenOptions.hasOwnProperty('end')).toBeTruthy();
            expect(gottenOptions.hasOwnProperty('range')).toBeTruthy();
            expect(gottenOptions.hasOwnProperty('min')).toBeTruthy();
            expect(gottenOptions.hasOwnProperty('max')).toBeTruthy();
            expect(gottenOptions.hasOwnProperty('step')).toBeTruthy();
            expect(gottenOptions.hasOwnProperty('customValues')).toBeTruthy();
            expect(gottenOptions.hasOwnProperty('reverse')).toBeTruthy();
        });
    });

    describe('method getWarning', () => {
        it('returns object of last saved warning, gotten when model inicializated or updated', () => {
            let optionsWithWarning: IModelOptions = Object.assign({}, defaultOptions, {
                begin: 'sdfghjkl'
            })
            model.update(optionsWithWarning);
            let warning: IWarnings = model.getWarnings();

            expect(Object.keys(warning).length).not.toBe(0);
        });

        it('returns empty object, when model inicializated or updated last time without warnings', () => {
            let warning: IWarnings = model.getWarnings()

            expect(Object.keys(warning).length).toBe(0);
        });
    });
});

describe('Model has private methods', () => {
    describe('method setOptions', () => {
        it('sets new data to model, either not valid', () => {
            // @ts-ignore
            model.setOptions(Object.assign({}, defaultOptions, {begin: 'a'}));

            // @ts-ignore
            expect(model._begin).toBe('a');
        });
    });

    describe('method validate', () => {
        let newOptions: IModelOptions = Object.assign({}, defaultOptions, {
            max: 0,
            min: 10
        });

        it('changes property _warnings', () => {
            // @ts-ignore
            expect(Object.keys(model._warnings).length).toBe(0);
            // @ts-ignore
            model.validate(newOptions);
            // @ts-ignore
            expect(Object.keys(model._warnings).length).not.toBe(0);
        });

        it('notifies models observers if there are any warnings', () => {
            let isNotified: Boolean = false;
            model.subscribe((message: ModelMessage) => {
                if (message.type == 'WARNINGS') {
                    isNotified = true;
                }
            });
            // @ts-ignore
            model.validate(newOptions);
            // @ts-ignore
            expect(isNotified).toBeTruthy();
        });
    });

    describe('method normalize', () => {
        it('returns new object of valid model options', () => {
            // @ts-ignore
            let newOptions: IModelOptions = model.normalize(defaultOptions, defaultOptions);

            expect(newOptions instanceof Object).toBeTruthy();
        });

        it('sets new min and max if customValues', () => {
            // @ts-ignore
            let newOptions: IModelOptions = model.normalize({
                min: 5,
                max: 10,
                customValues: ['a', 'b', 'c']
            }, defaultOptions);

            expect(newOptions.min).toBe(0);
            expect(newOptions.max).toBe(2);
        });

        it('normalize numbers', () => {
            // @ts-ignore
            let newOptions: IModelOptions = model.normalize({
                min: 'fgh',
                begin: 'dfgh',
                step: 'dfgh',
            }, defaultOptions);

            expect(newOptions.min).toBe(defaultOptions.min);
            expect(newOptions.begin).toBe(defaultOptions.min);
            expect(newOptions.step).toBe(defaultOptions.step)
        });

        it('changes not right order in min/max, begin/end(if its range) by object _warnings', () => {
            let invalidOptions: IModelOptions = Object.assign({}, defaultOptions, {
                min: 10,
                max: 0,
                begin: 10,
                end: 0,
                range: true
            });
            // @ts-ignore
            model._warnings = validateModel(invalidOptions);
            // @ts-ignore
            let newOptions: IModelOptions = model.normalize(invalidOptions, defaultOptions);

            expect(newOptions.min).toBeLessThan(newOptions.max);
            expect(newOptions.begin).toBeLessThan(newOptions.end);
        });

        it('canges step to integer absolute number, makes step == 1, if it too big by object _warnings', () => {
            let invalidOptions: IModelOptions = Object.assign({}, defaultOptions, {
                step: -5
            });
            // @ts-ignore
            model._warnings = validateModel(invalidOptions);
            // @ts-ignore
            let newOptions: IModelOptions = model.normalize(invalidOptions, defaultOptions);

            expect(newOptions.step).toBe(5);

            invalidOptions = Object.assign({}, defaultOptions, {
                step: 100
            });
            // @ts-ignore
            model._warnings = validateModel(invalidOptions);
            // @ts-ignore
            let newOptions: IModelOptions = model.normalize(invalidOptions, defaultOptions);

            expect(newOptions.step).toBe(1);
        });

        it('ignores option begin and sets begin to min, when its not range', () => {
            let invalidOptions: IModelOptions = Object.assign({}, defaultOptions, {
                begin: 5,
            });
            // @ts-ignore
            let newOptions: IModelOptions = model.normalize(invalidOptions, defaultOptions);

            expect(newOptions.begin).toBe(newOptions.min);
        });

        it('sets end and begin (when its range) to closest step', () => {
            let invalidOptions: IModelOptions = Object.assign({}, defaultOptions, {
                range: true,
                begin: 1.3,
                end: 5.7
            });
            // @ts-ignore
            let newOptions: IModelOptions = model.normalize(invalidOptions, defaultOptions);

            expect(newOptions.begin).toBe(1);
            expect(newOptions.end).toBe(6);
        });
    });

    describe('method normalizeNumber', () => {
        it('checks, if value is number, in other way returns default value', () => {
            // @ts-ignore
            let number: number = model.normalizeNumber(3, 1);
            expect(number).toBe(3);
            // @ts-ignore
            let notNumber: number = model.normalizeNumber('abc', 1);
            expect(notNumber).toBe(1);
        });
    });

    describe('method findClosestValue', () => {
        it('returns closest value by step between min and max', () => {
            // @ts-ignore
            let value: number = model.findClosestValue(5.4, defaultOptions);
            expect(value).toBe(5);
            // @ts-ignore
            let tppBigValue: number = model.findClosestValue(100, defaultOptions);
             expect(tppBigValue).toBe(defaultOptions.max);
            // @ts-ignore
            let tooSmallValue: number = model.findClosestValue(-100, defaultOptions);
            expect(tooSmallValue).toBe(defaultOptions.min);
        });

        it('considers reverse to find steps', () => {
            let newOptions: IModelOptions = Object.assign({}, defaultOptions, {step: 3});
            // @ts-ignore
            let value: number = model.findClosestValue(2.8, newOptions);
            expect(value).toBe(3);

            let newOptionsReversed: IModelOptions = Object.assign({}, defaultOptions, {
                step: 3,
                reverse: true
            });
            // @ts-ignore
            let value: number = model.findClosestValue(2.8, newOptionsReversed);
            expect(value).toBe(4);
        });
    });

    describe('method findValueByOffsetRacio', () => {
        it('returns value by racio considering to rreverse', () => {
            // @ts-ignore
            let value: number = model.findValueByOffsetRacio(0.18);
            expect(value).toBe(2);

            // @ts-ignore
            model._reverse = true;
            // @ts-ignore
            let valueIfReverse: number = model.findValueByOffsetRacio(0.18);
            expect(valueIfReverse).toBe(8);
        });
    });
});