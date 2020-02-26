import { IOptions, defaultOptions } from './defaultOptions';
import { IObservable, Observable, IMessage } from './Observer';
import { isNumeric, getNumberOfSteps, deepEqual } from './commonFunctions';
import { validateModel, IWarnings } from './validations';

interface IModelOptions {
    //[x: string]: any;
    value: number | null;
    min: number;
    max: number;
    step: number;
    range: [number, number] | null;
    customValues?: string[];
    reverse: boolean;
}

interface IModel extends IObservable {
    //update(message: IMessage): void;
    update(options: IModelOptions): void;
    setValueByPercent(percent: number, index: number): void;

    getOptions(): IModelOptions;
    getWarnings(): IWarnings;
}


class Model extends Observable implements IModel {
    private _value: number | null;
    private _min: number;
    private _max: number;   
    private _step: number;
    private _range: [number, number] | null;
    private _customValues?: string[] | undefined;
    private _reverse: boolean;

    private _warnings: IWarnings;

    constructor(options: IModelOptions) {

        super();

        let fullOptions: IModelOptions = Object.assign({}, defaultOptions, options);
        let validOptions: IModelOptions;

        this.validate(fullOptions);
        validOptions = this.normalize(fullOptions, defaultOptions);
        this.setOptions(validOptions);
    }

    
/*     public update(message: IMessage): void {

        switch (message.type) {

            case 'NEW_VALUE_IN_PERCENT':

                this.setValueByPercent(message.percent, message.index);

                this.emit({ 
                    type: 'NEW_VALUE',
                    options: this.getOptions()
                });
                break;

            case 'NEW_DATA':

                let prevOptions = this.getOptions();
                this.validate(Object.assign({}, prevOptions, message.options))
                let validOptions: IModelOptions = this.normalize(message.options, prevOptions);

                if ( !deepEqual(prevOptions, validOptions) ) {
                    this.setOptions(validOptions);

                    this.emit({
                        type: 'NEW_DATA',
                        options: this.getOptions()
                    });
                    break;                    
                }

            default:
                return;
        }
    } */

    public update(options: IModelOptions): void {
        let prevOptions = this.getOptions();
        this.validate(Object.assign({}, prevOptions, options))
        let validOptions: IModelOptions = this.normalize(options, prevOptions);
        this.setOptions(validOptions);
    }


    public setValueByPercent(percent: number, index: number): void {

        let newValue: number;

        newValue = percent * (this._max - this._min) / 100;
        newValue = !this._reverse ? 
        this._min + newValue :
        this._max - newValue;

        newValue = this.findClosestStep(newValue, this.getOptions());

        if ( !this._range ) {
            this._value = newValue;

        } else {

            let isFirstInRange: boolean;
            isFirstInRange = index == 0 && !this._reverse;
            isFirstInRange = isFirstInRange || index == 1 && this._reverse;

            if (isFirstInRange) {

                newValue = Math.min(newValue, this._range[1]);
                this._range[0] = newValue;

            } else {
                newValue = Math.max(newValue, this._range[0]);
                this._range[1] = newValue;
            }
        }

        this.emit({ 
            type: 'NEW_VALUE',
            options: this.getOptions()
        });
    }




    public getOptions(): IModelOptions {
        return {
            value: this._value,
            min: this._min,
            max: this._max,   
            step: this._step,
            range: this._range,
            customValues: this._customValues,
            reverse: this._reverse
        }
    }

    public getWarnings(): IWarnings {
        return Object.assign({}, this._warnings);
    }

    private setOptions(options: IModelOptions): void {
        this._value = options.value;
        this._min = options.min;
        this._max = options.max;
        this._step = options.step;
        this._range = options.range;
        this._customValues = options.customValues;      
        this._reverse = options.reverse;        
    }

    private validate(options: IModelOptions): void {

        this._warnings = {};
        this._warnings = validateModel(options);

        if ( Object.keys(this._warnings).length != 0 ) {

            let warnings: IWarnings = Object.assign({}, this._warnings);
            
            this.emit({
                type: 'WARNINGS',
                warnings: warnings
            })
        }
    }

    private normalize(options: IModelOptions, validOptions: IModelOptions): IModelOptions {

        options = Object.assign({}, validOptions, options);

        if ( this._warnings.customValuesIsNotArray || this._warnings.customValuesIsTooSmall ) {
            options.customValues = undefined;
        }

        if ( options.customValues ) {
            options.min = 0;
            options.max = options.customValues.length - 1;
        }

        options.min = this.normalizeNumber(options.min, validOptions.min);
        options.max = this.normalizeNumber(options.max, validOptions.max);
        options.step = this.normalizeNumber(options.step, validOptions.step);

        if ( this._warnings.minIsOverMax ) {
            [options.min, options.max] = [options.max, options.min];
        }

        if ( this._warnings.minIsEqualToMax ) {
            options.min = validOptions.min;
            options.max = validOptions.max;
        }

        if ( this._warnings.stepIsNull || this._warnings.tooBigStep ) {
            options.step = 1;
        }

        
        options.step = Math.abs(options.step);
        options.reverse = !!options.reverse;


        if ( !options.range ) {
            options.value = this.normalizeNumber(options.value, options.min);
            options.value = this.findClosestStep(options.value, options)
            options.range = null;

        } else {

            if ( !Array.isArray(options.range) ) {
                options.range = [options.min, options.max];
            }

            options.range = options.range.slice(0, 2) as [number, number];
            
            options.range[0] = this.normalizeNumber(options.range[0], options.min);
            options.range[1] = this.normalizeNumber(options.range[1], options.max);

            if ( this._warnings.wrongOrderInRange ) {
                options.range.sort(function(a, b) {
                    return a - b;
                });  
            }
            options.range[0] = this.findClosestStep(options.range[0], options);
            options.range[1] = this.findClosestStep(options.range[1], options);
            options.value = null;
        }

        return options;
    }


    private normalizeNumber(value: number, defaultVal: number): number {
        let newValue: number = value;

        if ( !isNumeric(value) ) {
            newValue = defaultVal;
        }
        newValue = Math.trunc(+newValue);
        return newValue;
    }


    private findClosestStep(value: number, options: IModelOptions): number {
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

}


export { IModel, IModelOptions };
export default Model;
