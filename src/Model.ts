import IOptions, { defaultOptions } from './defaultOptions';
import { isNumeric } from './commonFunctions';
import { findDecimalPlaces } from './commonFunctions';

interface IModel {
/*     // 1
    getVal(): number;
    setVal(newVal: number): void;
    // 2
    getRange(): [number, number];
    setRange(newRange: [number, number]): void;
    // 3
    getStep(): number;
    // 4
    getMinVal(): number;
    // 5
    getMaxVal(): number;
    // 6
    getReverse(): boolean;
    // 7
    getCustomValues(): string[] | undefined;
    // 8
    getDataFormat(): string;
    // 9
    getOptions(): IModelOptions;

    // вспомогательные методы
    findPositionInArr(val: any, arr?: any[]): number;
    getStepNumber(val: number): number;
    translateByStep(step: number): number | string | Date; // по шагу
    translate(val: number): number | string | Date; // по валидному значению
    getNumberOfSteps(): number;
    change(newOptions: any): void; */
}

interface IModelOptions {
    value: number | null;
    valueAbs: number | null;
    minVal: number;
    maxVal: number;
    step: number;
    stepAbs: number;
    range: [number, number] | null;
    rangeAbs: [number, number] | null;
    customValues?: string[];
    reverse: boolean;
}

class Model implements IModel {

    private _value: number | null;
    private _valueAbs: number | null;
    private _minVal: number;
    private _maxVal:number;   
    private _step: number;
    private _stepAbs: number;
    private _range: [number, number] | null;
    private _rangeAbs: [number, number] | null;
    private _customValues?: string[] | undefined;
    private _reverse: boolean;

    constructor(options: IOptions) {

        let validOptions: IModelOptions = this.validate(options, defaultOptions);

        this._value = validOptions.value;
        this._valueAbs = validOptions.valueAbs;
        this._minVal = validOptions.minVal;
        this._maxVal = validOptions.maxVal;
        this._step = validOptions.step;
        this._stepAbs = validOptions.stepAbs;
        this._range = validOptions.range;
        this._rangeAbs = validOptions.rangeAbs;
        this._customValues = validOptions.customValues;      
        this._reverse = validOptions.reverse;
    }

 // здесь были геттеры

    // вспомогательные методы




    private validate(allOptions: IOptions, defaultOptions: IOptions): IModelOptions {

        let options: IModelOptions;

        options = Object.assign({
            stepAbs: null,
            valueAbs: null,
            rangeAbs: null,
            reverse: false
        }, defaultOptions, allOptions);

        if (options.customValues && Array.isArray(options.customValues)) {
            options.minVal = 0;
            options.maxVal = options.customValues.length - 1;
        }

        let numericOptions = [options.minVal, options.maxVal, options.step];

        if (options.range) {
            this.rangeArrayValidation(options.range);
            Array.prototype.push.apply(numericOptions, options.range);
            options.value = null;
        } else {
            options.value = options.value || options.minVal;
            numericOptions.push(options.value)
        }

        this.numericValidation(numericOptions);
        this.integerValidation(numericOptions);
        this.limitsValidation(options);
        options.reverse = !!(options.minVal > options.maxVal)
        options = this.stepNegativeValidation(options);
        options = this.setOnStep(options);

        return options;
    }
    
    private numericValidation(options: number[]) {
        options.forEach(function(item: number) {
            if ( !isNumeric(item) ) { throw new Error('Incorrect numerc data'); }
        });  
    }

    private integerValidation(options: number[]) {
        options.forEach(function(item) {
            if( item % 1 != 0 ) { throw new Error('All values should be integer'); }
        });
    }

    private rangeArrayValidation(range: [number, number]) {
        if ( !Array.isArray(range) || range.length != 2 ) {
            throw new Error('Incorrect Range');
        }
    }

    private limitsValidation(options: IModelOptions) {
        let max = Math.max(options.minVal, options.maxVal);
        let min = Math.min(options.minVal, options.maxVal);
        let rangeInLimits: number[] = [];

        if (options.range) {
            Array.prototype.push.apply(rangeInLimits, options.range);
        } else {
            rangeInLimits.push(options.value);
        }

        rangeInLimits.forEach(function(item) {
            if (item > max || item < min) {
                throw new Error('Incorrect value or range');
            }
        });

        if (options.step == 0 || Math.abs( (max - min) / options.step ) < 1) {
            throw new Error('Incorrect step');
        }
    }

    private stepNegativeValidation(options: IModelOptions): IModelOptions {

        if (options.step == 0) {
            throw new Error('Step cant be 0');
        }

        let changeSign: boolean;
        changeSign = options.minVal > options.maxVal && options.step > 0;
        changeSign = changeSign || options.minVal < options.maxVal && options.step < 0

        options.step = changeSign ? options.step * (-1) : options.step;
        options.stepAbs = Math.abs(options.step);

        return options;
    }
    
    private setOnStep(options: IModelOptions): IModelOptions {

        if (options.range) {
            options.range.forEach(function(item, i) {
                let steps: ISteps = setEachOnStep(item);
                options.range[i] = steps.step;
                options.rangeAbs[i] = steps.stepAbs;
            })
        } else {
            let steps: ISteps = setEachOnStep(options.value); 
            options.value = steps.step;
            options.valueAbs = steps.stepAbs;
        }

        interface ISteps {step: number, stepAbs: number};


        /// !!!!!!!!!!!!
        function setEachOnStep(item: number): ISteps {
            let sign = options.reverse ? -1 : 1;
            let steps: ISteps = {step: null, stepAbs: null};

            let closestStepAbs: number = Math.ceil( (item - sign * options.minVal) / options.stepAbs );
            let closestStep: number = options.minVal + closestStepAbs * options.step;
            console.log(closestStepAbs);
            console.log(closestStep);
            steps.stepAbs = closestStepAbs;

            //let closestStep: number = options.minVal + closestStepAbs * options.step;
            let changeToMax: boolean = !options.reverse && closestStep > options.maxVal;
            changeToMax = changeToMax || options.reverse && closestStep < options.maxVal;
            steps.step = changeToMax ? options.maxVal : closestStep;

            return steps;
        }

        return options;
    } 
}


export { IModel };
export { IModelOptions };
export default Model;
