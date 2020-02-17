import { IOptions, defaultOptions } from './defaultOptions';
import { ISubject, Subject, IObserver } from './Observer';
import { isNumeric, getNumberOfSteps } from './commonFunctions';
import { validateModel } from './validations';

interface IModelOptions {
    [x: string]: any;
    value: number | null;
    min: number;
    max: number;
    step: number;
    range: [number, number] | null;
    customValues?: string[];
    reverse: boolean;
}

interface IModel extends ISubject, IObserver, IModelOptions {
    getOptions(): IModelOptions;
}


class Model extends Subject implements IModel {
    value: number | null;
    min: number;
    max: number;   
    step: number;
    range: [number, number] | null;
    customValues?: string[] | undefined;
    reverse: boolean;

    private _warnings: any;

    constructor(options: IModelOptions) {

        super();

        let validOptions: IModelOptions = Object.assign({}, defaultOptions, options);

        this.validate(options);
        validOptions = this.normalize(options);
        this.setOptions(validOptions);
    }

    
    update(config: any): void {

        switch (config.type) {

            case 'NEW_VALUE_IN_PERCENT':

                this.setValueByPercent(config.percent, config.index);

                this.notify({ 
                    type: 'NEW_VALUE',
                    options: this.getOptions()
                });
                break;

            case 'NEW_DATA':

                this.validate(config.options)
                let validOptions: IModelOptions = this.normalize(config.options);
                this.setOptions(validOptions);

                this.notify({
                    type: 'NEW_DATA',
                    options: this.getOptions()
                });
                break;

            default:
                return;
        }
    }

    getOptions(): IModelOptions {
        return {
            value: this.value,
            min: this.min,
            max: this.max,   
            step: this.step,
            range: this.range,
            customValues: this.customValues,
            reverse: this.reverse
        }
    }

    private setOptions(options: IModelOptions): void {
        this.value = options.value;
        this.min = options.min;
        this.max = options.max;
        this.step = options.step;
        this.range = options.range;
        this.customValues = options.customValues;      
        this.reverse = options.reverse;        
    }

    private validate(options: IModelOptions): void {

        this._warnings = validateModel(options);
        let warnings = Object.assign({}, this._warnings);

        if (warnings) {

            this.notify({
                type: 'WARNINGS',
                warnings: warnings
            })
        }
    }

    private normalize(options: IModelOptions): IModelOptions {

        if ( this._warnings.customValuesIsNotArray ) {
            options.customValues = undefined;
        }

        if ( options.customValues ) {
            options.min = 0;
            options.max = options.customValues.length - 1;
        }

        options.min = this.normalizeNumber(options.min, defaultOptions.min);
        options.max = this.normalizeNumber(options.max, defaultOptions.max);
        options.step = this.normalizeNumber(options.step, defaultOptions.step);

        if ( this._warnings.minIsOverMax ) {
            [options.min, options.max] = [options.max, options.min];
        }

        if ( this._warnings.minIsEqualToMax ) {
            options.min = defaultOptions.min;
            options.max = defaultOptions.max;
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


    private setValueByPercent(percent: number, index: number): void {

        let newValue: number;

        newValue = percent * (this.max - this.min) / 100;
        newValue = !this.reverse ? 
        this.min + newValue :
        this.max - newValue;

        newValue = this.findClosestStep(newValue, this.getOptions());

        if ( !this.range ) {
            this.value = newValue;

        } else {

            if (index == 0 && !this.reverse) {

                newValue = Math.min(newValue, this.range[1]);
                this.range[0] = newValue;

            } else {
                newValue = Math.max(newValue, this.range[0]);
                this.range[1] = newValue;
            }
        }
    }
}


export { IModel, IModelOptions };
export default Model;
