import defaultOptions from "../src/MVP/defaultOptions";
import { IOptions } from "../src/MVP/options";
import { validateModel, validateView, validateNumbers, validateIntegers } from "../src/MVP/validations";

let test: IOptions;

describe('function validateModel', () => {
    it('returns empty object if all data valid', () => {
        expect(Object.keys(validateModel(defaultOptions)).length).toBe(0);
    });

    describe('returns object, witch contains', () => {
        it('valuesAreNotNumbers, if step/min/mx/begin/end is not number', () => {
            test = Object.assign({}, defaultOptions, {min: 'abc'});
            expect(validateModel(test).valuesAreNotNumbers).toBeDefined();
        });

        it('valuesAreNotInteger, if step/min/mx/begin/end is not integer', () => {
            test = Object.assign({}, defaultOptions, {min: 5.5});
            expect(validateModel(test).valuesAreNotInteger).toBeDefined();
        });

        it('minIsOverMax, if min is over max', () => {
            test = Object.assign({}, defaultOptions, {min: 10, max: 0});
            expect(validateModel(test).minIsOverMax).toBeDefined();
        });

        it('minIsEqualToMax, if min is equal to max', () => {
            test = Object.assign({}, defaultOptions, {min: 10, max: 10});
            expect(validateModel(test).minIsEqualToMax).toBeDefined();
        });

        it('beginIsOverEnd, if begin is over end and range is true', () => {
            test = Object.assign({}, defaultOptions, {begin: 10, end: 0, range: true});
            expect(validateModel(test).beginIsOverEnd).toBeDefined();

            test = Object.assign({}, defaultOptions, {begin: 10, end: 0, range: false});
            expect(validateModel(test).beginIsOverEnd).toBeUndefined();
        });

        it('tooBigStep, if step is bigger then (max - min)', () => {
            test = Object.assign({}, defaultOptions, {step: 1000});
            expect(validateModel(test).tooBigStep).toBeDefined();
        });

        it('stepIsNull, if step is 0', () => {
            test = Object.assign({}, defaultOptions, {step: 0});
            expect(validateModel(test).stepIsNull).toBeDefined();
        });

        it('reverseIsNotBoolean, if reverse is not true or false', () => {
            test = Object.assign({}, defaultOptions, {reverse: 1});
            expect(validateModel(test).reverseIsNotBoolean).toBeDefined();
        });

        it('customValuesIsNotArray, if customValues is not range', () => {
            test = Object.assign({}, defaultOptions, {customValues: 5});
            expect(validateModel(test).customValuesIsNotArray).toBeDefined();
        });

        it('customValuesIsTooSmall, if customValues contains one value', () => {
            test = Object.assign({}, defaultOptions, {customValues: [5]});
            expect(validateModel(test).customValuesIsTooSmall).toBeDefined();
        });
    });
});

describe('function validateView', () => {
    it('returns empty object if all data valid', () => {
        expect(Object.keys(validateView(defaultOptions)).length).toBe(0);
    });

    describe('returns object, witch contains', () => {
        it('invalidLength, if length is not valid to CSS', () => {
            test = Object.assign({}, defaultOptions, {length: '38popugaev'});
            expect(validateView(test).invalidLength).toBeDefined();

            test = Object.assign({}, defaultOptions, {length: '38'});
            expect(validateView(test).invalidLength).toBeUndefined();

            test = Object.assign({}, defaultOptions, {length: '38em'});
            expect(validateView(test).invalidLength).toBeUndefined();
        });

        it('verticalIsNotBoolean, if vertical is not true or false', () => {
            test = Object.assign({}, defaultOptions, {vertical: 'da'});
            expect(validateView(test).verticalIsNotBoolean).toBeDefined();
        });

        it('tooltipIsNotBoolean, if tooltip is not true or false', () => {
            test = Object.assign({}, defaultOptions, {tooltip: 10});
            expect(validateView(test).tooltipIsNotBoolean).toBeDefined();
        });

        it('scaleIsNotBoolean, if scale is not true or false', () => {
            test = Object.assign({}, defaultOptions, {scale: 'ok'});
            expect(validateView(test).scaleIsNotBoolean).toBeDefined();
        });
    });
});

describe('function validateNumbers', () => {
    it('checks if all values in array are numbers', () => {
        expect(validateNumbers([1,2,3])).toBeTruthy();
        expect(validateNumbers([1,2.5,3])).toBeTruthy();
        // @ts-ignore
        expect(validateNumbers([1,'2',3])).toBeTruthy();
        // @ts-ignore
        expect(validateNumbers([1,'test',3])).toBeFalsy();
        // @ts-ignore
        expect(validateNumbers([1,true,3])).toBeFalsy();
    });
});

describe('function validateIntegers', () => {
    it('checks if all values in array are numbers', () => {
        expect(validateIntegers([1,2])).toBeTruthy();
        expect(validateIntegers([1.5, 2])).toBeFalsy();
    });
});