import IOptions, { defaultOptions } from './defaultOptions';

export default class Model {

    private _minVal: number;
    private _maxVal:number;
    private _val: number;
    private _step: number;
    private _dataFormat: string;

    constructor(options: IOptions) {

        if (this.tes()!=5) {
            this._minVal = 88;
        } else {
            this._minVal = options.minVal;
        }
        /* this._minVal = options.minVal; */
        this._maxVal = options.maxVal;
        this._val = options.initialVal;
        this._step = options.step;
        this._dataFormat = options.dataFormat;
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

    private numericFormatValidation(val: any, maxVal: any, minVal: any) {
        if ( this.isNumeric(val) && this.isNumeric(maxVal) && this.isNumeric(minVal)) {
            return true;
        } else {
            throw new Error('Initial value, Max value, Min value should be numbers');
        }
    }

    private minMaxValidation(minVal: number, maxVal: Number, reverse: Boolean=false) {
        if ( !reverse && (minVal >= maxVal) ) {
            throw new Error('Max value should be bigger then Min value');
        } else if ( reverse && (minVal <= maxVal) ) {
            throw new Error('Min value should be bigger then Max value, if you added reverse option');
        } else {
            return true;
        }
    }

    private stepValidation() {}

    private isNumeric(n: any): boolean {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }

    tes() {
        return 5;
    }

}


let model = new Model(defaultOptions);
