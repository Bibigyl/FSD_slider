import { IModelOptions } from "./Model";

function isNumeric(n: any): boolean {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1)===JSON.stringify(obj2);
 }

function getNumberOfSteps(min: number, max: number, step: number): number {
    return Math.ceil((max - min) / step);
}

function findClosestStep(value: number, options: IModelOptions): number {
    let step: number;
    let ceilSteps: number;
    let restOfStep: number;

    if ( !options.reverse ) {
        ceilSteps = Math.trunc( (value - options.min) / options.step );
        restOfStep = (value - options.min) % options.step;
        step = options.min + ceilSteps * options.step;
        step = restOfStep >= options.step/2 ? step + options.step : step;

    } else {
        ceilSteps = Math.trunc( (options.max - value) / options.step );
        restOfStep = (options.max - value) % options.step;
        step = options.max - ceilSteps * options.step;
        step = restOfStep >= options.step/2 ? step - options.step : step;
    }

    step = step > options.max ? options.max : step;
    step = step < options.min ? options.min : step;

    return step;
}

export { isNumeric, getNumberOfSteps, deepEqual, findClosestStep };

