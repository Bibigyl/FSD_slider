import { IOptions, defaultOptions } from './defaultOptions';
import { ISubject, Subject } from './Observer';
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

interface IModel extends ISubject, IModelOptions {
    getData(): IModelOptions;
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

        this.validate(options);
        let validOptions: IModelOptions = this.normalize(options);
        this.setOptions(validOptions);
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

        let validOptions: IModelOptions;

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // вопрос про создать пустой объкт и добавлять туда свва
        validOptions = Object.assign({}, defaultOptions);

        if ( this._warnings.customValuesIsNotArray ) {
            validOptions.customValues = undefined;
        }

        if ( options.customValues ) {
            validOptions.min = 0;
            validOptions.max = options.customValues.length - 1;
        }

        validOptions.min = this.normalizeNumber(options.min, defaultOptions.min);
        validOptions.max = this.normalizeNumber(options.max, defaultOptions.max);
        validOptions.step = this.normalizeNumber(options.step, defaultOptions.step);

        if ( this._warnings.minIsOverMax ) {
            [validOptions.min, validOptions.max] = [validOptions.max, validOptions.min];
        }

        if ( this._warnings.minIsEqualToMax ) {
            validOptions.min = defaultOptions.min;
            validOptions.max = defaultOptions.max;
        }

        if ( this._warnings.stepIsNull || this._warnings.tooBigStep ) {
            validOptions.step = 1;
        }

        validOptions.step = Math.abs(options.step);
        validOptions.reverse = !!options.reverse;


        if ( !options.range ) {
            validOptions.value = this.normalizeNumber(options.value, defaultOptions.min);
            validOptions.value = this.findClosestStep(validOptions.value, validOptions)
            validOptions.range = null;

        } else {
            validOptions.range = options.range.slice(0, 1) as [number, number];
            validOptions.range[0] = this.normalizeNumber(validOptions.range[0], defaultOptions.min);
            validOptions.range[1] = this.normalizeNumber(validOptions.range[1], defaultOptions.max);

            if ( this._warnings.wrongOrderInRange ) {
                validOptions.range.sort(function(a, b) {
                    return a - b;
                });  
            }
            
            validOptions.range[0] = this.findClosestStep(validOptions.range[0], validOptions);
            validOptions.range[1] = this.findClosestStep(validOptions.range[1], validOptions);
            validOptions.value = null;
        }

        return validOptions;
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

        newValue = this.findClosestStep(newValue, this.getData());

        if ( !this.range ) {
            this.value = newValue;

        } else {

            if (index == 0 && !this.reverse) {

                newValue = Math.min(newValue, this.range[0]);
                this.range[0] = newValue;

            } else {
                newValue = Math.max(newValue, this.range[1]);
                this.range[1] = newValue;
            }
        }
    }

    update(config: any): void {

        switch (config.type) {

            case 'NEW_VALUE_IN_PERCENT':

                this.setValueByPercent(config.percent, config.index);

                this.notify({ 
                    type: 'NEW_VALUE',
                    options: this.getData()
                });
                break;

            case 'NEW_DATA':

                this.validate(config.options)
                let validOptions: IModelOptions = this.normalize(config.options);
                this.setOptions(validOptions);

                this.notify({
                    type: 'NEW_DATA',
                    options: this.getData()
                });
                break;

            default:
                return;
        }
    }

    getData(): IModelOptions {
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
}


export { IModel, IModelOptions };
export default Model;
