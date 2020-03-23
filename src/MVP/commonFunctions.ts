import { IModelOptions } from './options';

function isNumeric(n: any): boolean {
  return !Number.isNaN(parseFloat(String(n))) && !Number.isNaN(n - 0);
}


function deepEqual(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}


function getNumberOfSteps(min: number, max: number, step: number): number {
  return Math.ceil((max - min) / step);
}


function findValueByOffsetRacio(racio: number, options: IModelOptions): number {
  const { min, max, reverse } = options;
  let value: number;

  value = racio * (max - min);
  value = !reverse
    ? min + value
    : max - value;

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


export {
  isNumeric, getNumberOfSteps, deepEqual, findValueByOffsetRacio, normalizeNumber,
};
