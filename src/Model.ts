import { IOptions, defaultOptions } from './defaultOptions';
import { ISubject, Subject } from './Observer';
import { isNumeric, getNumberOfSteps } from './commonFunctions';

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
    data: IModelOptions;
    notify(type?: string): void;
    
    makeFullChanges(options: IOptions): void;
    makeSlimChanges(key: string, value: number): void;
}


class Model extends Subject implements IModel {
    value: number | null;
    min: number;
    max: number;   
    step: number;
    range: [number, number] | null;
    customValues?: string[] | undefined;
    reverse: boolean;

    constructor(options: IOptions) {

        super();

        let validOptions: IModelOptions = this.validation(options);

        this.value = validOptions.value;
        this.min = validOptions.min;
        this.max = validOptions.max;
        this.step = validOptions.step;
        this.range = validOptions.range;
        this.customValues = validOptions.customValues;      
        this.reverse = validOptions.reverse;
    }


    private validation(options: IModelOptions): IModelOptions {

        if (options.customValues && Array.isArray(options.customValues)) {
            options.min = 0;
            options.max = options.customValues.length - 1;
            //options.step = 1;
        }

        options.value = options.value || options.min;
        if (options.range) { this.rangeArrayValidation(options.range) };

        // проверили, что все, что должно быть целыми числами, таковыми являются
        // => меняем порядок, если он перепутан
        // => преобразуем step и reverse
        this.numericValidation(options);
        this.integerValidation(options);

        if (options.min > options.max) {
            [options.min, options.max] = [options.max, options.min];
        }
        if (options.range) {
            options.range.sort(function(a, b) {
                return a - b;
            });            
        }

        //console.log('22 ' + options.reverse)

        options.reverse = !!options.reverse;

        //console.log('22 ' + options.reverse)
        options.step = Math.abs(options.step);

        // проверка на то, что соблюдены все неравенства
        // например, шаг не больше всего диапазона, шаг не ноль..
        this.limitsValidation(options);

        if (options.range) {
            options.range[0] = this.findClosestStep(options.range[0], options);
            options.range[1] = this.findClosestStep(options.range[1], options);
        } else {
            options.value = this.findClosestStep(options.value, options)
        }

        return options;
    }

/*     private integerValidation(options: number[]): void {
        options.forEach(function(item) {
            if( !isNumeric(item) || item % 1 != 0 ) { 
                throw new Error('All values should be integer'); 
            }
        });
    } */

    private numericValidation(options: IModelOptions): void {
        let numericOptions: number[] = [options.min, options.max, options.step];
        if (options.range) {
            numericOptions.push(options.range[0], options.range[1]);
        } else {
            numericOptions.push(options.value);
        }

        numericOptions.forEach(function(item) {
            if( !isNumeric(item) ) { 
                throw new Error('All values should be numbers'); 
            }
        });
    }

    private integerValidation(options: IModelOptions): IModelOptions {
        options.min = Math.trunc(options.min);
        options.max = Math.trunc(options.max);
        options.step = Math.trunc(options.step);
        
        if (options.range) {
            options.range[0] = Math.trunc(options.range[0]);
            options.range[1] = Math.trunc(options.range[1]);
            options.value = null;
        } else {
            options.value = Math.trunc(options.value);
            options.range = null;
        }
        return options;
    }

    private rangeArrayValidation(range: [number, number]): void {
        if ( !Array.isArray(range) || range.length != 2 ) {
            throw new Error('Incorrect Range');
        }
    }

    private limitsValidation(options: IModelOptions): void {
        // добавляем все, что нужно проверить
        let valuesInLimits: number[] = [];

        if (options.range) {
            Array.prototype.push.apply(valuesInLimits, options.range);
        } else {
            valuesInLimits.push(options.value);
        }

        valuesInLimits.forEach(function(item) {
            if ( item > options.max || item < options.min ) {
                console.warn('Incorrect value or range');
                item = Math.max(item, options.max);
                item = Math.min(item, options.min);
                //throw new W('Incorrect value or range');
            }
        });

        if ( options.step == 0 || options.step > (options.max - options.min) ) {
            options.step = 1;
            console.warn('Incorrect step');
            //throw new Error('Incorrect step');
        }

        if ( options.min == options.max ) {
            console.warn('Min cannot be equal to max');
        }
    }

/*     getNumberOfSteps(): number {
        let num: number = Math.ceil( (this.max - this.min) / this.step );
        return num;
    } */

/*     getValueStep(value: number): number {
        let step: number = 
    } */

    private translate(value: number): number | string {
        if (this.customValues) {
            return this.customValues[value];
        } else {
            return value;
        }
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

    makeFullChanges(options: IModelOptions): void {
        options = Object.assign({}, this.data, options);
        let validOptions: IModelOptions = this.validation(options);

        ///console.log('333 ' + validOptions.reverse)

        this.value = validOptions.value;
        this.min = validOptions.min;
        this.max = validOptions.max;
        this.step = validOptions.step;
        this.range = validOptions.range;
        this.customValues = validOptions.customValues;      
        this.reverse = validOptions.reverse;

        this.notify('fullChanges');
    }

    makeSlimChanges(key: string, value: number | number[]): void {

        if ( Array.isArray(value) ) {
            value[0] = this.findClosestStep(value[0], this.data);
            value[1] = this.findClosestStep(value[1], this.data);
        } else {
            value = this.findClosestStep(value, this.data);
        }

        if ( this[key] != value ) {
            this[key] = value;
            this.notify('slimChanges');
        }
    }

    get data(): IModelOptions {
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


    // observer method

    notify(type?: string): void {

        for (const observer of this.observers) {
            
            if (type == 'slimChanges') {
                observer.pushSlimModelChanges();

            } else if (type == 'fullChanges') {
                observer.pushFullModelChanges();
            }
        }
    }
}


export { IModel, IModelOptions };
export default Model;
