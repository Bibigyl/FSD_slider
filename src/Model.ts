import IOptions, { defaultOptions } from './defaultOptions';

interface IModelOptions {
    dataFormat: string;
    initialVal: number | null;
    minVal: number;
    maxVal: number;
    step: number;    
    reverse: boolean;
    range: [number, number] | null; 
    customValues?: string[];
}

export default class Model {

    private _dataFormat: string;
    private _val: number | null;
    private _minVal: number;
    private _maxVal:number;   
    private _step: number;
    private _reverse: boolean;
    private _range: [number, number] | null;

    constructor(allOptions: IOptions) {
        let options: IOptions = allOptions;
        // если не указано начальное значение, указываем минимальное.
        // это необходимо чтобы пройти валидацию и поставить бегунок согласно шагу.
        // если указан range, меняем начальное значение на null
        options.initialVal = options.initialVal ? options.initialVal : options.minVal;
        let validOptions: IModelOptions;

        if ( options.dataFormat == 'numeric' ) {
            validOptions = this.numericFormatValidation(options, defaultOptions);
        } else if ( options.dataFormat == 'date' ) {
            validOptions = this.dateFormatValidation(options, defaultOptions);
        } else if ( options.dataFormat == 'custom' ) {
            validOptions = this.customFormatValidation(options, defaultOptions);
        } else {
            throw new Error('Unknown format of data');
        }

        this._dataFormat = validOptions.dataFormat;
        this._val = validOptions.initialVal;
        this._minVal = validOptions.minVal;
        this._maxVal = validOptions.maxVal;
        this._step = validOptions.step;
        this._reverse = validOptions.reverse;
        this._range = validOptions.range;
        
    }


    getVal(): number {
        return this._val;
    }
    setVal(newVal: number): void {
        this.areNumeric(newVal);
        this.oneValueValidation(this.getMinVal(), this.getMaxVal(), newVal);
        this._val = newVal;
    }

    getStep(): number {
        return this._step;
    }
    getNumberOfSteps(): number {
        return 3;
    } // может не нужен
    getMaxVal(): number {
        return this._maxVal;
    }
    getMinVal(): number {
        return this._minVal;
    }
    getRange(): [number, number] {
        return this._range;
    }

    private numericFormatValidation(allOptions: IOptions, defaultOptions: IOptions): IModelOptions {
        let options: IOptions = allOptions;
        // присваиваем начальным опциям дефолтные значения из defaultOptions
        // начальному значению присваиваем минимальное
        // по мере прохождения валидации, меняем значения на пользовательские
        let newOptions: IModelOptions = {
            dataFormat: 'numeric',
            initialVal: defaultOptions.minVal,
            minVal: defaultOptions.minVal,
            maxVal: defaultOptions.maxVal,
            step: defaultOptions.step,
            reverse: defaultOptions.reverse,
            range: defaultOptions.range
        }

        this.areNumeric(options.maxVal, options.minVal);
        this.stepValidation(options.minVal, options.maxVal, options.step);

        // если мин и макс перепутаны пользователем, меняем порядок
        if ( this.minMaxValidation(options.minVal, options.maxVal, options.reverse) ) {
            newOptions.minVal = options.minVal;
            newOptions.maxVal = options.maxVal;            
        } else {
            newOptions.minVal = options.maxVal;
            newOptions.maxVal = options.minVal;        
        }


        if ( options.range ) {
            this.rangeValidation(options.minVal, options.maxVal, options.range);
            // если мин и макс в диапазоне range перепутаны пользователем, меняем порядок
            if ( this.minMaxValidation(options.range[0], options.range[1], options.reverse) ) {
                newOptions.range = options.range;
            } else {
                newOptions.range = [options.range[1], options.range[0]];
            }

            // отменяем начальное значение, даже если оно введено пользователем
            newOptions.initialVal = null;
            
        } else {
            // запускаем проверки для начального значения, только если не указан диапазон range
            this.areNumeric(options.initialVal);
            this.oneValueValidation(options.minVal, options.maxVal, options.initialVal);

            newOptions.initialVal = options.initialVal;
            newOptions.range = null;
        }

        newOptions.step = Math.abs(options.step);
        newOptions.reverse = options.reverse;
        newOptions.dataFormat = options.dataFormat;

        //предупреждаем пользователя о том, что некоторые его опции проигнорированы
        if (options.dataFormat == 'numeric' || options.dataFormat == 'date') {
            this.warningOfUnusefulValues(options.customValues, options.initialValInCustomValues, options.initialValNumInCustomValues, options.initialRangeInCustomValues,       options.initialRangeInCustomValues); 
        }
        
        return newOptions;
    }


    private dateFormatValidation(allOptions: IOptions, defaultOptions: IOptions): IModelOptions {
        let options: IOptions = allOptions;

        this.customDateValidation(options.minVal, options.maxVal);
        options.minVal = this.translateDateToNumber(options.minVal);
        options.maxVal = this.translateDateToNumber(options.maxVal);
        if ( !this.isNumeric(options.step) ) {
            throw new Error('Step should be a number');
        } else {
            options.step = this.tranlateStepToDateFormat(options.step);
        }

        if ( Array.isArray(options.range) && options.range.length == 2 ) {
            // если пользователь ввел что то другое, а не range, на этом
            // этапе ошибки не будет. Она появится при проверке на numericFormatValidation
            // (потому что range так и остается true)
            this.customDateValidation(options.range[0], options.range[1]);
            options.range[0] = this.translateDateToNumber(options.range[0]);
            options.range[1] = this.translateDateToNumber(options.range[1]);

        } else {
            this.customDateValidation(options.initialVal);
            options.initialVal = this.translateDateToNumber(options.initialVal);
        }
        return this.numericFormatValidation(options, defaultOptions);
    }


    private customFormatValidation(allOptions: IOptions, defaultOptions: IOptions): IModelOptions {
        let options: IOptions = allOptions;

        if ( !options.customValues ) {
            throw new Error('customValues is required option for custom format');
        } else if ( !Array.isArray(options.customValues) || options.customValues.length < 2 ) {
            throw new Error('customValues should be a range with two or more items, like [1, 2, "a"]');
        }

        options.minVal = 0;
        options.maxVal = options.customValues.length - 1;
        options.step = 1;

        // приоритеты опций:
        // 1. range в числах
        // 2. range в значениях
        // 3. initialVal как число
        // 4. initialVal как значение 
        if ( options.initialRangeNumInCustomValues || options.initialRangeInCustomValues ) {

            options.range = [0, options.maxVal];

            if ( Array.isArray(options.initialRangeInCustomValues) && options.initialRangeInCustomValues.length == 2 ) {
                // если пользователь ввел что то другое, а не range, на этом
                // этапе ошибки не будет. Она появится при проверке на numericFormatValidation
                // (потому что range так и остается true)
                options.range[0] = this.findPositionInArr(options.initialRangeInCustomValues[0], options.customValues);
                options.range[1] = this.findPositionInArr(options.initialRangeInCustomValues[1], options.customValues);
            }
            if ( Array.isArray(options.initialRangeNumInCustomValues) && options.initialRangeNumInCustomValues.length == 2 ) {
                options.range[0] = options.initialRangeNumInCustomValues[0];
                options.range[1] = options.initialRangeNumInCustomValues[1];
            }  
        } else {
            if ( options.initialValInCustomValues ) {
                options.initialVal = this.findPositionInArr(options.initialValInCustomValues, options.customValues);
            }
            if ( options.initialValNumInCustomValues ) {
                options.initialVal = options.initialValNumInCustomValues;
            }
        }
        return this.numericFormatValidation(options, defaultOptions);
    }


    private areNumeric(...vals: any) {
        for (let val of vals) {
            if ( !this.isNumeric(val) ) {
                throw new Error('All values in numeric format should be numbers');
            }
        }
        return true;
    }

    private minMaxValidation(minVal: number, maxVal: number, reverse: boolean) {
        if ( !reverse && (minVal >= maxVal) ) {
            return false;
        } else if ( reverse && (minVal <= maxVal) ) {
            return false;
        } else {
            return true;
        }
    }

    private stepValidation(minVal: number, maxVal: number, step: number) {
        if ( !this.isNumeric(step) ) {
            throw new Error('Step should be a number');
        } else if ( step == 0 ) {
            throw new Error('Step cant be equal to 0');
        } else if ( (maxVal - minVal) % step != 0 ) {
            // в том числе это проверка чтобы шаг был не больше всего промежутка
            throw new Error('(Max value - min value) divided by step should return integer');
        } else {
            return true;
        }
    }

    private oneValueValidation(minVal: number, maxVal: number, val: number) {
        if ( Math.max(minVal, maxVal) < val  ||  Math.min(minVal, maxVal) > val ) {
            throw new Error('The initial value should be within min and max values')
        }
        return true;
    }

    private rangeValidation(minVal: number, maxVal: number, range: [number, number]) {
        if ( range.length != 2 ) {
            throw new Error('Range should contain two values');
        }
        if ( !this.isNumeric(range[0]) || !this.isNumeric(range[1]) ) {
            throw new Error('Values in range should be numbers');
        }
        if ( Math.max(minVal, maxVal) < Math.max(range[0], range[1])  ||  Math.min(minVal, maxVal) > Math.min(range[0], range[1]) ) {
            throw new Error('The range should be within min and max values');
        }
        return true;
    }

    private isNumeric(n: any): boolean {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }

    // внимение! нет теста!
    private warningOfUnusefulValues(...vals: any): void {
        for (let val of vals) {
            if ( val ) {
                console.warn('Some options are ignored');
                return;
            }
        }
    }

    private customDateValidation(...vals: any[]) {
        for ( let val of vals ) {
            if ( !('' + val).match(/^\d{2}[.\/-]\d{2}[.\/-]\d{4}$/) ) {
                throw new Error('All values in date format should be dates, like dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy'); 
            }   
        }
        return true;
    }

    private translateDateToNumber(str: string): number {
        let arr = str.split(str[2]);
        let date = new Date(+arr[2], +arr[1], +arr[0]);
        // Если пользователь вводит странные данные, он все равно получит результат.
        // Скорее всего, это говорит о том, что он перепутал порядок. Появится предупреждение
        if (+arr[0] > 31 || +arr[1] > 12) {
            console.warn('Use dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy for dates');
        }
        if (!date) {
            throw new Error('Incorrect date, try dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy');
        }
        return +date;
    }

    private tranlateStepToDateFormat(step: number): number {
        if ( !this.isNumeric(step) || step % 1 != 0 ) {
            throw new Error('Step in date format should be integer');
        }
        return step * 24 * 3600 * 1000;
    }

    /* private */ findPositionInArr(item: any, arr: any[]) {
        if ( arr.indexOf(item) != -1 ) {
            return arr.indexOf(item);
        } else {
            throw new Error('Incorrect range or initial value in custom range');
        }
    }



}


