import { isNumeric, deepEqual, getNumberOfSteps,  findValueByOffsetRacio, normalizeNumber } from "../src/MVP/commonFunctions";
import defaultOptions from "../src/MVP/defaultOptions";
import { IModelOptions } from "../src/MVP/options";

describe('function isNumeric', () => {
    it('checks if argument is number', () => {
        expect(isNumeric(1)).toBeTruthy();
        expect(isNumeric(1.5)).toBeTruthy();
        expect(isNumeric('5')).toBeTruthy();
        expect(isNumeric('cv')).toBeFalsy();
    });
});

describe('function deepEqual', () => {
    it('compairs two object, returns true, if they are equal', () => {
        let obj1: {min: number, max: number} = {min: 2, max: 3};
        let obj2: {min: number, max: number} = {min: 2, max: 3};
        let obj3: {min: number, max: number} = {min: 1, max: 3};

        expect(deepEqual(obj1, obj2)).toBeTruthy();
        expect(deepEqual(obj1, obj3)).toBeFalsy();
    });
});

describe('function getNumberOfSteps', () => {
    it('returns ceil number of steps by min, max and step', () => {
        let number: number = getNumberOfSteps(1, 3, 1);
        expect(number).toBe(2);

        number = getNumberOfSteps(1, 3.5, 1);
        expect(number).toBe(3);

        number = getNumberOfSteps(1, 3, 2);
        expect(number).toBe(1);
    });
});

describe('function findValueByOffsetRacio', () => {
    it('returns value (witch can be float) by racio, considering to reverse', () => {
        // @ts-ignore
        let value: number = findValueByOffsetRacio(0.18, defaultOptions);
        expect(Number(value.toFixed())).toBe(2);

        // @ts-ignore
        let optionsReversed: IModelOptions = Object.assign({}, defaultOptions, {
            reverse: true
        });
        // @ts-ignore
        let valueIfReverse: number = findValueByOffsetRacio(0.18, optionsReversed);
        expect(Number(valueIfReverse.toFixed())).toBe(8);
    });
});

describe('function normalizeNumber', () => {
    it('checks, if value is number, in other way returns default value', () => {
        // @ts-ignore
        let number: number = normalizeNumber(3, 1);
        expect(number).toBe(3);
        // @ts-ignore
        let notNumber: number = normalizeNumber('abc', 1);
        expect(notNumber).toBe(1);
    });
});