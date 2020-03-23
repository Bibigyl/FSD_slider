import { IModelOptions } from "./Model";

function isNumeric(n: any): boolean {
  return !isNaN(parseFloat(String(n))) && !isNaN(n - 0);
}

function deepEqual(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function getNumberOfSteps(min: number, max: number, step: number): number {
  return Math.ceil((max - min) / step);
}

function findClosestValue(value: number, options: IModelOptions): number {
  let prevValue: number;
  let nextValue: number;
  const {
    min, max, step, reverse,
  } = options;

  if (value <= min) { return min; }
  if (value >= max) { return max; }

  if (!reverse) {
    prevValue = min + Math.floor((value - min) / step) * step;
    nextValue = min + Math.floor((value - min) / step) * step + step;

    nextValue = nextValue < max ? nextValue : max;
  } else {
    prevValue = max - Math.floor((max - value) / step) * step - step;
    nextValue = max - Math.floor((max - value) / step) * step;

    prevValue = prevValue > min ? prevValue : min;
  }

  value = value < prevValue + (nextValue - prevValue) / 2 ? prevValue : nextValue;
  return value;
}


function findValueByOffsetRacio(racio: number, options: IModelOptions): number {
  let {min, max, reverse} = options;
  let value: number;

  value = racio * (max - min);
  value = !reverse
    ? min + value
    : max - value;

  //value = findClosestValue(value, options);
  return value;
}

function normalizeNumber(value: number, defaultVal: number): number {
  let newValue: number = value;

  if (!isNumeric(value)) {
    newValue = defaultVal;
  }

  newValue = Math.round(newValue);
  return newValue;
}


export { isNumeric, getNumberOfSteps, deepEqual, findClosestValue, findValueByOffsetRacio, normalizeNumber };
