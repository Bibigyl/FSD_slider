import { IModelOptions } from './options';
declare function isNumeric(n: any): boolean;
declare function deepEqual(obj1: Record<string, any>, obj2: Record<string, any>): boolean;
declare function getNumberOfSteps(min: number, max: number, step: number): number;
declare function findValueByOffsetRacio(racio: number, options: IModelOptions): number;
declare function normalizeNumber(value: number, defaultVal: number): number;
export { isNumeric, getNumberOfSteps, deepEqual, findValueByOffsetRacio, normalizeNumber, };
