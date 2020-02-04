import IOptions, { defaultOptions } from './defaultOptions';
import { isNumeric } from './commonFunctions';
import { findDecimalPlaces } from './commonFunctions';

interface IModelOptions {
    value: number | null;
    //valueStep: number | null;
    min: number;
    max: number;
    step: number;
    range: [number, number] | null;
    //rangeSteps: [number, number] | null;
    customValues?: string[];
    reverse: boolean;
}

interface IModel {
    value: number | null;
    //valueStep: number | null;
    min: number;
    max: number;
    step: number;
    range: [number, number] | null;
    //rangeSteps: [number, number] | null;
    customValues?: string[];
    reverse: boolean;

    getNumberOfSteps(): number,
    //getValueStep(value: number): number,
    translate(value: number): number | string,
    findClosestStep(value: number, options: IModelOptions): number,


}
class Model implements IModel {

    value: number | null;
    //valueStep: number | null;
    min: number;
    max: number;   
    step: number;
    range: [number, number] | null;
    //rangeSteps: [number, number] | null;
    customValues?: string[] | undefined;
    reverse: boolean;

    constructor(options: IOptions) {

        let validOptions: IModelOptions = this.validation(options, defaultOptions);

        this.value = validOptions.value;
        //this.valueStep = validOptions.valueStep;
        this.min = validOptions.min;
        this.max = validOptions.max;
        this.step = validOptions.step;
        this.range = validOptions.range;
        //this.rangeSteps = validOptions.rangeSteps;
        this.customValues = validOptions.customValues;      
        this.reverse = validOptions.reverse;
    }

 // здесь были геттеры

    // вспомогательные методы



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





    getNumberOfSteps(): number {
        let num: number = Math.ceil( (this.max - this.min) / this.step );
        return num;
    }

/*     getValueStep(value: number): number {
        let step: number = 
    } */

    translate(value: number): number | string {
        if (this.customValues) {
            return this.customValues[value];
        } else {
            return value;
        }
    }

    findClosestStep(value: number, options: IModelOptions): number {
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

}


export { IModel };
export { IModelOptions };
export default Model;
