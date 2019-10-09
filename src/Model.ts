class Model {

    private _minVal: number;
    private _maxVal:number;
    private _val: number;
    private _step: number;
    
    constructor(options) {
        this._minVal: number = options.minVal;
        this._maxVal: number = options.maxVal;
        this._val: number = options.initialVal;
        this._step: number = options.step; //возможно не нужен
    }

    getVal(): number {
        return this._val;
      }
    setVal(newVal): void {
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

export {Model};