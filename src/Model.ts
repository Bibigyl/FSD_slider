import IOptions, { defaultOptions } from './defaultOptions';

export interface IModel {
    // 1
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
    getTranslatedVal(step: number): number | string | Date;
    numberOfSteps(): number;
    change(newOptions: any): void;
}

export interface IModelOptions {
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
    private _customValues?: string[] | undefined;
    private _options: IModelOptions;

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
            validOptions.customValues = options.customValues;
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
        this._customValues = validOptions.customValues;      
        
        this._options = validOptions;
    }

    // 1
    getVal(): number {
        return this._val;
    }
    setVal(newVal: number): void {
        this.areNumeric(newVal);
        this.oneValueValidation(this._minVal, this._maxVal, newVal, this._step);
        this._val = newVal;
    }
    // 2
    getRange(): [number, number] {
        return this._range;
    }
    setRange(newRange: [number, number]): void {
        this.areNumeric(newRange[0], newRange[1])
        this.rangeValidation(this._minVal, this._maxVal, newRange, this._step);

        if ( this.minMaxValidation(newRange[0], newRange[1], this._reverse) ) {
            this._range = newRange;
        } else {
            this._range = [newRange[1], newRange[0]];
        }

        this._range = newRange;
    }
    // 3
    getStep(): number {
        return this._step;
    }
    // 4
    getMinVal(): number {
        return this._minVal;
    }
    // 5
    getMaxVal(): number {
        return this._maxVal;
    }
    // 6
    getReverse(): boolean {
        return this._reverse;
    }
    // 7
    getCustomValues(): any[] {
        if (this._customValues) {
            return this._customValues;
        } else {
            return undefined;
        }
    }
    // 8
    getDataFormat(): string {
        return this._dataFormat;
    }
    getOptions(): IModelOptions {
        return this._options;
    }

    // вспомогательные методы
    findPositionInArr(val: any, arr?: any[]): number {
        // ищет позицию val в custom values
        // так же может быть использован с любым други массивом
        if ( arr && arr.indexOf(val) != -1 ) {
            return arr.indexOf(val);
        } else if ( arr && arr.indexOf(val) == -1 ) {
            throw new Error('Cant find value in array');
        }

        if ( !this._customValues ) {
            return val;
        }

        if ( this._customValues.indexOf(val) != -1 ) {
            return this._customValues.indexOf(val);
        } else {
            throw new Error('Not valid value for custom values');
        }
    }

    getStepNumber(val: number): number {
        // находит, на каком по счету шаге стоит val
        // применять только для нетрансформированных, правильных значений!
        let stepNum: number;
        let n: number = Math.max( this.decimalPlaces(this._step), this.decimalPlaces(this._minVal) );

        let a: number = +(val - this._minVal).toFixed(n);
        let b: number = +(this._maxVal - this._minVal).toFixed(n)
        
        stepNum = +( a * this.numberOfSteps() / b ).toFixed();
        stepNum = Math.abs(stepNum);

        return stepNum;
    }

    getTranslatedVal(step: number): number | string | Date {
        if (this._dataFormat == 'custom') {
            if ( !this._reverse ) {
                return this._customValues[step];
            } else {
                console.log()
                return this._customValues[this._customValues.length - step - 1];
            }
            
        } else {
            let n: number = Math.max( this.decimalPlaces(this._step), this.decimalPlaces(this._minVal) );
            let r: number = !this._reverse ? 1 : -1;
            let val: number = +(this._minVal + this._step * step * r).toFixed(n);

            if (this._dataFormat == 'date') { 
                return new Date(val); 
            } else {
               return val; 
            }
        }
    }

    numberOfSteps(): number {
        let n: number = Math.max( this.decimalPlaces(this._step), this.decimalPlaces(this._minVal) );
        n = Math.pow(10, n);
        return ( Math.abs(this._maxVal - this._minVal) * n ) / ( this._step * n );
    }

    change(newOptions: any): void {

        let prevOptions: IModelOptions = this._options;
        let options: any = Object.assign(prevOptions, newOptions);

        options.initialVal = options.initialVal ? options.initialVal : options.minVal;
        let validOptions: IModelOptions;

        if ( options.dataFormat == 'numeric' ) {
            validOptions = this.numericFormatValidation(options, prevOptions as IOptions);
        } else if ( options.dataFormat == 'date' ) {
            validOptions = this.dateFormatValidation(options, prevOptions as IOptions);
        } else if ( options.dataFormat == 'custom' ) {
            validOptions = this.customFormatValidation(options, prevOptions as IOptions);
            validOptions.customValues = options.customValues;
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
        this._customValues = validOptions.customValues;      
        
        this._options = validOptions;
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
            range: defaultOptions.range,
        }

        this.areNumeric(options.maxVal, options.minVal, options.step);

        newOptions.step = Math.abs(options.step);
        newOptions.reverse = options.reverse ? true : false;
        newOptions.dataFormat = options.dataFormat;
        
        this.stepValidation(options.minVal, options.maxVal, newOptions.step);

        // если мин и макс перепутаны пользователем, меняем порядок
        // подразумевается, что min - это то что слева на слайдере, max - справа
        if ( this.minMaxValidation(options.minVal, options.maxVal, newOptions.reverse) ) {
            newOptions.minVal = options.minVal;
            newOptions.maxVal = options.maxVal;            
        } else {
            newOptions.minVal = options.maxVal;
            newOptions.maxVal = options.minVal;        
        }

        if ( options.range ) {
            this.rangeValidation(newOptions.minVal, newOptions.maxVal, options.range, newOptions.step);
            // если мин и макс в диапазоне range перепутаны пользователем, меняем порядок
            if ( this.minMaxValidation(options.range[0], options.range[1], newOptions.reverse) ) {
                newOptions.range = options.range;
            } else {
                newOptions.range = [options.range[1], options.range[0]];
            }

            // отменяем начальное значение, даже если оно введено пользователем
            newOptions.initialVal = null;
            
        } else {
            // запускаем проверки для начального значения, только если не указан диапазон range
            this.areNumeric(options.initialVal);
            this.oneValueValidation(newOptions.minVal, newOptions.maxVal, options.initialVal, newOptions.step);

            newOptions.initialVal = options.initialVal;
            newOptions.range = null;
        }

        //предупреждаем пользователя о том, что некоторые его опции проигнорированы
        if (options.dataFormat == 'numeric' || options.dataFormat == 'date') {
            this.warningOfUnusefulValues(options.customValues, options.initialValInCustomValues, options.initialValNumInCustomValues, options.initialRangeInCustomValues, options.initialRangeInCustomValues); 
        }
        
        return newOptions;
    }


    private dateFormatValidation(allOptions: IOptions, defaultOptions: IOptions): IModelOptions {
        let options: IOptions = allOptions;

        this.customDateValidation(options.minVal, options.maxVal);
        options.minVal = this.translateDateToNumber(options.minVal);
        options.maxVal = this.translateDateToNumber(options.maxVal);
        options.step = this.tranlateStepToDateFormat(options.step);

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

        this.warningOfUnusefulValues(options.step);

        options.minVal = 0;
        options.maxVal = options.customValues.length - 1;
        options.step = 1;

        // приоритеты опций:
        // 1. range в числах
        // 2. range в значениях
        // 3. initialVal как число
        // 4. initialVal как значение 
        if ( options.initialRangeNumInCustomValues || options.initialRangeInCustomValues ) {

            if ( Array.isArray(options.initialRangeNumInCustomValues) && options.initialRangeNumInCustomValues.length == 2 ) {
                options.range = [];
                options.range[0] = options.initialRangeNumInCustomValues[0];
                options.range[1] = options.initialRangeNumInCustomValues[1];

            } else if ( Array.isArray(options.initialRangeInCustomValues) && options.initialRangeInCustomValues.length == 2 ) {
                // если пользователь ввел что то другое, а не range, на этом
                // этапе ошибки не будет. Она появится при проверке на numericFormatValidation
                // (потому что range так и остается true)
                options.range = [];
                options.range[0] = this.findPositionInArr(options.initialRangeInCustomValues[0], options.customValues);
                options.range[1] = this.findPositionInArr(options.initialRangeInCustomValues[1], options.customValues);
            }

        } else {
            // если не введены val или range в custom values
            // присваиваем простые initialVal или range, если они есть
            if ( options.initialValNumInCustomValues ) {
                options.range = null;
                options.initialVal = options.initialValNumInCustomValues;
                
            } else if ( options.initialValInCustomValues ) {
                options.range = null;
                options.initialVal = this.findPositionInArr(options.initialValInCustomValues, options.customValues);
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
        }
        if ( step == 0 ) {
            throw new Error('Step cant be equal to 0');
        }

        let n: number = Math.max( this.decimalPlaces(this._step), this.decimalPlaces(this._minVal) );
        let test: number = +(maxVal - minVal).toFixed(n)
        test = ( test * Math.pow(10, n) ) / ( step * Math.pow(10, n) );
        test = Math.abs(test);

        if ( test % 1 != 0 ) {
            // в том числе это проверка чтобы шаг был не больше всего промежутка
            throw new Error('(Max value - min value) divided by step should return integer');
        }
        return true;
    }

    private oneValueValidation(minVal: number, maxVal: number, val: number, step: number) {

        let n: number = Math.max( this.decimalPlaces(step), this.decimalPlaces(minVal) );

        let test: number = +(val - minVal).toFixed(n)
        test = ( test * Math.pow(10, n) ) / ( step * Math.pow(10, n) );
        test = Math.abs(test);

        if ( Math.max(minVal, maxVal) < val  ||  Math.min(minVal, maxVal) > val ) {
            throw new Error('The initial value should be within min and max values')
        }
        if ( test % 1 != 0 ) {
            throw new Error('Value should be set on step');
        }
        return true;
    }

    private rangeValidation(minVal: number, maxVal: number, range: [number, number], step: number) {

        let n: number = Math.max( this.decimalPlaces(this._step), this.decimalPlaces(this._minVal) );

        let testLeft: number = (range[0] - minVal) / step;
        testLeft = +testLeft.toFixed(n);
        testLeft = Math.abs(testLeft);

        let testRight: number = (range[1] - minVal) / step;
        testRight = +testRight.toFixed(n);
        testRight = Math.abs(testRight);

        if ( range.length != 2 ) {
            throw new Error('Range should contain two values');
        }
        if ( !this.isNumeric(range[0]) || !this.isNumeric(range[1]) ) {
            throw new Error('Values in range should be numbers');
        }
        if ( Math.max(minVal, maxVal) < Math.max(range[0], range[1])  ||  Math.min(minVal, maxVal) > Math.min(range[0], range[1]) ) {
            throw new Error('The range should be within min and max values');
        }
        if ( testLeft % 1 != 0 || testRight % 1 != 0 ) {
            throw new Error('The range should be set on step');
        }
        return true;
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
    
    private isNumeric(n: any): boolean {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }

    private decimalPlaces(num: number): number {
        // количество знаков после запятой
        return ~(num + '').indexOf('.') ? (num + '').split('.')[1].length : 0;
    }
}


