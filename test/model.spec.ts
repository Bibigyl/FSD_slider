import Model, { IModel, ModelMessage } from '../src/MVP/Model';
import { IModelOptions } from '../src/MVP/options';
import defaultOptions from '../src/MVP/defaultOptions';
import { validateModel, modelWarnings } from '../src/MVP/validations';
import { IWarnings } from '../src/MVP/warnings';

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
        expect(model.end).toBe(defaultOptions.max);
        // @ts-ignore
        expect(model.begin).toBe(defaultOptions.min);
        // @ts-ignore
        expect(model.range).toBe(defaultOptions.range);
        // @ts-ignore
        expect(model.min).toBe(defaultOptions.min);
        // @ts-ignore
        expect(model.max).toBe(defaultOptions.max);
        // @ts-ignore
        expect(model.step).toBe(defaultOptions.step);
        // @ts-ignore
        expect(model.customValues).toBe(defaultOptions.customValues);
        // @ts-ignore
        expect(model.reverse).toBe(defaultOptions.reverse);
    });
});

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
            expect(model.end).toBe(newOptions.end);
            // @ts-ignore
            expect(model.begin).toBe(newOptions.begin);
            // @ts-ignore
            expect(model.range).toBe(newOptions.range);
            // @ts-ignore
            expect(model.min).toBe(newOptions.min);
            // @ts-ignore
            expect(model.max).toBe(newOptions.max);
            // @ts-ignore
            expect(model.step).toBe(newOptions.step);
            // @ts-ignore
            expect(model.customValues).toBeNull();
            // @ts-ignore
            expect(model.reverse).toBe(newOptions.reverse);
        });

        it('notifies model observers, when data in model changed', () => {
            let isNotified: Boolean = false;
            model.subscribe((message: ModelMessage) => {
                if (message.type === 'NEW_DATA') {
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
                if (message.type === 'WARNINGS') {
                    isNotified = true;
                }
            })
            let optionsWithWarning: IModelOptions = Object.assign({}, defaultOptions, {
                begin: 'sdfghjkl'
            })

            model.update(optionsWithWarning);

            expect(isNotified).toBeTruthy();
            // @ts-ignore
            expect(model.warnings.length).not.toBe(0);
        });
    });

    describe('method setEnd', () => {
        it('finds closest value and sets it to end, if they are not equal', () => {
            let value: number = 5.6
            model.setEnd(value);
    
            // @ts-ignore
            expect(model.end).toBe(6);
        });

        it('notifies model observers, when end in model changed', () => {
            let isNotified: Boolean = false;
            model.subscribe((message: ModelMessage) => {
                if (message.type === 'NEW_VALUE') {
                    isNotified = true;
                }
            });

            let value: number = 5.6
            model.setEnd(value);

            expect(isNotified).toBeTruthy();
        });
    });

    describe('method setBegin', () => {
        it('finds closest value and sets it to begin, if they are not equal, only when it is range', () => {
            let optionsWithRange: IModelOptions = Object.assign({}, defaultOptions, {range: true});
            model = new Model(optionsWithRange);

            let value: number = 5.6;
            model.setBegin(value);

            // @ts-ignore  
            expect(model.begin).toBe(6);
        });

        it('notifies model observers, when begin in model changed', () => {
            let optionsWithRange: IModelOptions = Object.assign({}, defaultOptions, {range: true});
            model = new Model(optionsWithRange);

            let isNotified = false;
            model.subscribe((message: ModelMessage) => {
                if (message.type === 'NEW_VALUE') {
                    isNotified = true;
                }
            });

            let value: number = 5.6;
            model.setBegin(value);

            expect(isNotified).toBeTruthy();
        });

        it('doesnt work, when its not range', () => {
            let value: number = 5.6;
            model.setBegin(value);

            // @ts-ignore 
            expect(model.begin).toBe(defaultOptions.min);
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
                begin: 'NOT_VALID'
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
            expect(model.begin).toBe('a');
        });
    });

    describe('method handleWarnings', () => {
        it('notifies models observers if there are any warnings', () => {
            let isNotified: Boolean = false;
            model.subscribe((message: ModelMessage) => {
                if (message.type === 'WARNINGS') {
                    isNotified = true;
                }
            });
            // @ts-ignore
            model.warnings = modelWarnings;
            // @ts-ignore
            model.handleWarnings();
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

        it('changes not right order in min/max, begin/end(if its range) by object warnings', () => {
            let invalidOptions: IModelOptions = Object.assign({}, defaultOptions, {
                min: 10,
                max: 0,
                begin: 10,
                end: 0,
                range: true
            });
            // @ts-ignore
            model.warnings = validateModel(invalidOptions);
            // @ts-ignore
            let newOptions: IModelOptions = model.normalize(invalidOptions, defaultOptions);

            expect(newOptions.min).toBeLessThan(newOptions.max);
            expect(newOptions.begin).toBeLessThan(newOptions.end);
        });

        it('canges step to integer absolute number, makes step === 1, if it too big by object warnings', () => {
            let invalidOptions: IModelOptions = Object.assign({}, defaultOptions, {
                step: -5
            });
            // @ts-ignore
            model.warnings = validateModel(invalidOptions);
            // @ts-ignore
            let newOptions: IModelOptions = model.normalize(invalidOptions, defaultOptions);

            expect(newOptions.step).toBe(5);

            invalidOptions = Object.assign({}, defaultOptions, {
                step: 100
            });
            // @ts-ignore
            model.warnings = validateModel(invalidOptions);
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
});

describe('Model has static methods', () => {
    describe('method findClosestValue', () => {
        it('returns closest value by step between min and max', () => {
            // @ts-ignore
            let value: number = Model.findClosestValue(5.4, defaultOptions);
            expect(value).toBe(5);
            // @ts-ignore
            let tppBigValue: number = Model.findClosestValue(100, defaultOptions);
             expect(tppBigValue).toBe(defaultOptions.max);
            // @ts-ignore
            let tooSmallValue: number = Model.findClosestValue(-100, defaultOptions);
            expect(tooSmallValue).toBe(defaultOptions.min);
        });

        it('considers option reverse to find steps', () => {
            let newOptions: IModelOptions = Object.assign({}, defaultOptions, {step: 3});
            // @ts-ignore
            let value: number = Model.findClosestValue(2.8, newOptions);
            expect(value).toBe(3);

            let newOptionsReversed: IModelOptions = Object.assign({}, defaultOptions, {
                step: 3,
                reverse: true
            });
            // @ts-ignore
            let value: number = Model.findClosestValue(2.8, newOptionsReversed);
            expect(value).toBe(4);
        });
    });
});