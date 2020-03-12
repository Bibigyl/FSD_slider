import { isNumeric, deepEqual, getNumberOfSteps } from "../src/MVP/commonFunctions";

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

describe('function getNumberOfHSteps', () => {
    it('returns ceil number of steps by min, max and step', () => {
        let number: number = getNumberOfSteps(1, 3, 1);
        expect(number).toBe(2);

        number = getNumberOfSteps(1, 3.5, 1);
        expect(number).toBe(3);

        number = getNumberOfSteps(1, 3, 2);
        expect(number).toBe(1);
    });
});