import IOptions, { defaultOptions } from './defaultOptions';
import { isNumeric } from './commonFunctions';
import { findDecimalPlaces } from './commonFunctions';
import { ISubject } from './Observer';
import { IObserver } from './Observer';

interface IModelOptions {
    value: number | null;
    min: number;
    max: number;
    step: number;
    range: [number, number] | null;
    customValues?: string[];
    reverse: boolean;
}

interface IModel extends ISubject {
    value: number | null;
    min: number;
    max: number;
    step: number;
    range: [number, number] | null;
    customValues?: string[];
    reverse: boolean;
    
    //getNumberOfSteps(): number,
    //translate(value: number): number | string,
    //findClosestStep(value: number, options: IModelOptions): number,

    changeValues(key: string, percent: number): void;

}
class Model implements IModel {

    value: number | null;
    min: number;
    max: number;   
    step: number;
    range: [number, number] | null;
    customValues?: string[] | undefined;
    reverse: boolean;
    private observers: IObserver[] = [];

    constructor(options: IOptions) {

        let validOptions: IModelOptions = this.validation(options, defaultOptions);

        this.value = validOptions.value;
        this.min = validOptions.min;
        this.max = validOptions.max;
        this.step = validOptions.step;
        this.range = validOptions.range;
        this.customValues = validOptions.customValues;      
        this.reverse = validOptions.reverse;
    }


    private validation(allOptions: IOptions, defaultOptions: IOptions): IModelOptions {

        let options: IModelOptions;

        options = Object.assign({
            valueStep: null,
            rangeSteps: null
        }, defaultOptions, allOptions);

        if (options.customValues && Array.isArray(options.customValues)) {
            options.min = 0;
            options.max = options.customValues.length - 1;
        }

        // собираем все, что должно быть integer
        let integerOptions: number[] = [options.min, options.max, options.step];

        if (options.range) {
            this.rangeArrayValidation(options.range);
            Array.prototype.push.apply(integerOptions, options.range);
            options.value = null;
        } else {
            options.value = options.value || options.min;
            integerOptions.push(options.value)
        }

        // проверили, что все, что должно быть целыми числами, таковыми являются
        // => меняем порядок, если он перепутан
        // => преобразуем step и reverse
        this.integerValidation(integerOptions);
        if (options.min > options.max) {
            [options.min, options.max] = [options.max, options.min];
        }
        if (options.range) {
            options.range.sort(function(a, b) {
                return a - b;
            });            
        }

        options.reverse = !!options.reverse;
        options.step = Math.abs(options.step);

        // проверка на то, что соблюдены все неравенства
        // например, шаг не больше всего диапазона, шаг не ноль..
        this.limitsValidation(options);

        // находим value или range в шагах от 0
        //options = this.addValuesSteps(options);

        if (options.range) {
            options.range[0] = this.findClosestStep(options.range[0], options);
            options.range[1] = this.findClosestStep(options.range[1], options);
        } else {
            options.value = this.findClosestStep(options.value, options)
        }

        return options;
    }

    private integerValidation(options: number[]) {
        options.forEach(function(item) {
            if( !isNumeric(item) || item % 1 != 0 ) { 
                throw new Error('All values should be integer'); 
            }
        });
    }

    private rangeArrayValidation(range: [number, number]) {
        if ( !Array.isArray(range) || range.length != 2 ) {
            throw new Error('Incorrect Range');
        }
    }

    private limitsValidation(options: IModelOptions) {
        // добавляем все, что нужно проверить
        let valuesInLimits: number[] = [];

        if (options.range) {
            Array.prototype.push.apply(valuesInLimits, options.range);
        } else {
            valuesInLimits.push(options.value);
        }

        valuesInLimits.forEach(function(item) {
            if ( item > options.max || item < options.min ) {
                throw new Error('Incorrect value or range');
            }
        });

        if ( options.step == 0 || options.step > (options.max - options.min) ) {
            throw new Error('Incorrect step');
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
        let sign: number = options.reverse ? -1 : 1;
        let ceilSteps: number;
        let restOfStep: number;

        ceilSteps = Math.trunc( sign * (value - options.min) / options.step );
        restOfStep = sign * (value - options.min) % options.step;

        step = options.min + sign * ceilSteps * options.step;
        step = restOfStep >= options.step/2 ? step + sign * options.step : step;

        step = step > options.max ? options.max : step;
        step = step < options.min ? options.min : step;

        return step;
    }

    changeValues(key: string, percent: number): void {
        let newValue: number;

        newValue = percent * (this.max - this.min) / 100;
        newValue = !this.reverse ? 
        this.min + newValue :
        this.max - newValue;

        newValue = this.findClosestStep(newValue, this);

        if ( newValue != this[key] ) {
            this[key] = newValue;
            this.notify('slimChanges');
        }
    }

    // observer methods
    attach(observer: IObserver): void {
        this.observers.push(observer);
    }

    detach(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        this.observers.splice(observerIndex, 1);
    }

    notify(type?: string): void {
        if (type == 'slimChanges') {
            this.notifySlimChanges();
        } else if (type == 'fullChanges') {
            this.notifyFullChanges();
        }
    }

    notifySlimChanges(): void {
        for (const observer of this.observers) {
            observer.pushSlimModelChanges(this);
        }
    }

    notifyFullChanges(): void {
        for (const observer of this.observers) {
            observer.pushFullModelChanges(this);
        }
    }
}


export { IModel };
export { IModelOptions };
export default Model;
