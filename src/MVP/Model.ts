import { defaultOptions } from './defaultOptions';
import { IObservable, Observable, ModelMessage } from './Observer';
import { isNumeric, deepEqual } from './commonFunctions';
import { validateModel, IModelWarnings } from './validations';

interface IModelOptions {
    begin: number;
    end: number;
    range: boolean;
    min: number;
    max: number;
    step: number;
    customValues: string[] | null;
    reverse: boolean;
}

interface IModel extends IObservable {
    update(options: {}): void;
    setBeginByOffsetRacio(racio: number): void;
    setEndByOffsetRacio(racio: number): void;

    getOptions(): IModelOptions;
    getWarnings(): IModelWarnings;
}


class Model extends Observable<ModelMessage, void> implements IModel {
    private _begin: number = defaultOptions.min;
    private _end: number = defaultOptions.max;
    private _range: boolean = defaultOptions.range;
    private _min: number = defaultOptions.min;
    private _max: number = defaultOptions.max;   
    private _step: number = defaultOptions.step;
    private _customValues: string[] | null = defaultOptions.customValues;
    private _reverse: boolean = defaultOptions.reverse;

    private _warnings: IModelWarnings = {};

    constructor(options: {}) {

        super();

        const fullOptions: IModelOptions = Object.assign({}, defaultOptions, options);
        this._warnings = validateModel(fullOptions);
        this.handleWarnings();

        const validOptions: IModelOptions = this.normalize(fullOptions, defaultOptions);
        this.setOptions(validOptions);
    }


    public update(options: {}): void {

        const prevOptions: IModelOptions = this.getOptions();
        const newOptions: IModelOptions = Object.assign({}, this.getOptions(), options);

        this._warnings = validateModel(newOptions);
        this.handleWarnings();

        const newValidOptions: IModelOptions = this.normalize(newOptions, prevOptions);

        if ( deepEqual(prevOptions, newValidOptions) ) { return }
        this.setOptions(newValidOptions);

        this.notify({ 
            type: 'NEW_DATA',
            options: this.getOptions()
        });
    }



    public setEndByOffsetRacio(racio: number): void {
        const prevEnd: number = this._end as number;
        let value: number = this.findValueByOffsetRacio(racio);
        value = Math.max( value, this._begin as number );
        
        if ( value == prevEnd ) { return }
        this._end = value;

        this.notify({ 
            type: 'NEW_VALUE',
            options: this.getOptions()
        });
    }


    public setBeginByOffsetRacio(racio: number): void {
        const prevBegin: number = this._begin as number;
        if (!this._range) { return }
        let value: number = this.findValueByOffsetRacio(racio);
        value = Math.min( value, this._end as number );

        if ( value == prevBegin ) { return }
        this._begin = value;

        this.notify({ 
            type: 'NEW_VALUE',
            options: this.getOptions()
        });
    }


    public getOptions(): IModelOptions {
        return {
            begin: this._begin,
            end: this._end,
            range: this._range,
            min: this._min,
            max: this._max,   
            step: this._step,
            customValues: this._customValues,
            reverse: this._reverse
        }
    }


    public getWarnings(): IModelWarnings {
        return Object.assign({}, this._warnings);
    }


    private setOptions(options: IModelOptions): void {
        this._begin = options.begin;
        this._end = options.end;
        this._range = options.range;
        this._min = options.min;
        this._max = options.max;
        this._step = options.step;
        this._customValues = options.customValues;      
        this._reverse = options.reverse;        
    }


    private handleWarnings(): void {
        if ( Object.keys(this._warnings).length == 0 ) { return }
        
        this.notify({
            type: 'WARNINGS',
            warnings: this.getWarnings()
        });
    }


    private normalize(opts: {}, baseOpts: IModelOptions): IModelOptions {

        let options: IModelOptions = Object.assign({}, baseOpts, opts);
        const baseOptions: IModelOptions = Object.assign({}, baseOpts);
        let { begin, end, range, min, max, step, reverse, customValues } = options;

        if ( this._warnings.customValuesIsNotArray || this._warnings.customValuesIsTooSmall ) {
            customValues = null;
        }

        if ( customValues ) {
            min = 0;
            max = customValues.length - 1;
        }

        min = this.normalizeNumber(min, baseOptions.min);
        max = this.normalizeNumber(max, baseOptions.max);
        step = this.normalizeNumber(step, baseOptions.step);

        if ( this._warnings.minIsOverMax ) {
            [min, max] = [max, min];
        }

        if ( this._warnings.minIsEqualToMax ) {
            min = baseOptions.min;
            max = baseOptions.max;
        }

        if ( this._warnings.stepIsNull || this._warnings.tooBigStep ) {
            step = 1;
        }

        step = Math.abs(step);
        reverse = Boolean(reverse);
        range = Boolean(range);

        if ( this._warnings.beginIsOverEnd ) {
            [begin, end] = [end, begin];
        }


        options = { begin, end, range, min, max, step, reverse, customValues };
        
        end = this.normalizeNumber(end, max);
        options.end = this.findClosestValue(end, options);

        if ( !range ) {
            options.begin = min;
        } else {
            begin = this.normalizeNumber(begin, min);
            options.begin = this.findClosestValue(begin, options);
        }

        return options;
    }


    private normalizeNumber(value: number, defaultVal: number): number {
        let newValue: number = value;

        if ( !isNumeric(value) ) {
            newValue = defaultVal;
        }

        newValue = Math.round(newValue);
        return newValue;
    }


    private findClosestValue(value: number, options: IModelOptions): number {
        let prevValue: number;
        let nextValue: number;
        const { min, max, step, reverse } = options;
        
        if (value <= min) { return min }
        if (value >= max) { return max }

        if (!reverse) {

            prevValue = min + Math.floor( (value - min) / step ) * step;
            nextValue = min + Math.floor( (value - min) / step ) * step + step;

            nextValue = nextValue < max ? nextValue : max;

        } else {

            prevValue = max - Math.floor( (max - value) / step ) * step - step;
            nextValue = max - Math.floor( (max - value) / step ) * step;

            prevValue = prevValue > min ? prevValue : min;
        }

        value = value < prevValue + (nextValue - prevValue) / 2 ? prevValue : nextValue;
        return value;
    }

    
    private findValueByOffsetRacio(racio: number): number {
        let value: number;

        value = racio * (this._max - this._min);
        value = !this._reverse ? 
        this._min + value :
        this._max - value;

        value = this.findClosestValue(value, this.getOptions());
        return value;
    }
}


export { IModel, IModelOptions };
export default Model;
