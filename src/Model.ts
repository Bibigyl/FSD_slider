import IOptions from './defaultOptions';

export default class Model {

    private _minVal: number;
    private _maxVal:number;
    private _val: number;
    private _step: number;

    constructor(options: IOptions) {
        this._minVal = options.minVal;
        this._maxVal = options.maxVal;
        this._val = options.initialVal;
        this._step = options.step; //возможно не нужен
    }

    getVal(): number {
        return this._val;
    }
    setVal(newVal: number): void {
        this._val = newVal;
    }

    getStep(): number {
        return this._step;
    }
    getMaxVal(): number {
        return this._maxVal;
    }
    getMinVal(): number {
        return this._minVal;
    }
}