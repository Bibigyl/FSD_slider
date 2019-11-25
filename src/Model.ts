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
    translateByStep(step: number): number | string | Date; // по шагу
    translate(val: number): number | string | Date; // по валидному значению
    numberOfSteps(): number;
    change(newOptions: any): void;
}

export interface IModelOptions {
    dataFormat: string;
    value: number | null;
    minVal: number;
    maxVal: number;
    step: number;
    reverse: boolean;
    range: [number, number] | null; 
    customValues?: string[];
}

export default class Model implements IModel {

    private _dataFormat: string;
    private _val: number | null;
    private _minVal: number;
    private _maxVal:number;   
    private _step: number;
    private _reverse: boolean;
    private _range: [number, number] | null;
    private _customValues?: string[] | undefined;
    private _options: IModelOptions | any;

    constructor(allOptions: IOptions) {

        let options: IOptions = allOptions;
        // если не указано начальное значение, указываем минимальное.
        // это необходимо чтобы пройти валидацию и поставить бегунок согласно шагу.
        // если указан range, меняем начальное значение на null
        options.value = options.value ? options.value : options.minVal;
        let validOptions: IModelOptions;

        if ( options.dataFormat == 'numeric' ) {
            validOptions = this.numericFormatValidation(options, defaultOptions);

        } else if ( options.dataFormat == 'date' ) {
            // сохраняем даты в начальном фотрмате, напр dd/mm/yyyy
            // чтобы можно было использовать их для изменения модели
            this._options = Object.assign({}, allOptions);
            validOptions = this.dateFormatValidation(options, defaultOptions);

        } else if ( options.dataFormat == 'custom' ) {
            validOptions = this.customFormatValidation(options, defaultOptions);
            validOptions.customValues = options.customValues;

        } else {
            throw new Error('Unknown format of data');
        }

        this._dataFormat = validOptions.dataFormat;
        this._val = validOptions.value;
        this._minVal = validOptions.minVal;
        this._maxVal = validOptions.maxVal;
        this._step = validOptions.step;
        this._reverse = validOptions.reverse;
        this._range = validOptions.range;
        this._customValues = validOptions.customValues;      
        
        if (this._dataFormat != 'date') this._options = validOptions;
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

        let opts: IModelOptions = this._options;
        if ( !this._range ) {

            let val: any;
            //val = this.translate( this._val );

            if (this._dataFormat == 'date') {
                val = this.translate( this._val );

                val = ('0' + val.getDate()).slice(-2) + 
                '/' + ('0' + (1 + val.getMonth()) ).slice(-2) +
                '/' + ( val.getFullYear() );
            } else {
                val = this._val;
            }

            opts.value = val;
            opts.range = null;

        } else {

            let val: any;
            let arr: [any, any] = [null, null];

            if (this._dataFormat != 'date') {

                arr = this._range;
            }
            if (this._dataFormat == 'date') {

                val = this.translate( this._range[0] );
                val = ('0' + val.getDate()).slice(-2) + 
                '/' + ('0' + (1 + val.getMonth()) ).slice(-2) +
                '/' + val.getFullYear();

                arr[0] = val;

                val = this.translate( this._range[1] );
                val = ('0' + val.getDate()).slice(-2) + 
                '/' + ('0' + (1 + val.getMonth()) ).slice(-2) +
                '/' + val.getFullYear();

                arr[1] = val;
            }

            opts.value = null;
            opts.range = arr;
        }

        return opts;
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

    translateByStep(step: number): number | string | Date {
        
        if (this._dataFormat == 'custom') {

            if ( !this._reverse ) {
                return this._customValues[step];
            } else {
                return this._customValues[this._customValues.length - step - 1];
            }
            
        } else {
            let n: number = Math.max( this.decimalPlaces(this._step), this.decimalPlaces(this._minVal) );
            let r: number = !this._reverse ? 1 : -1;
            let val: number = +( (+this._minVal) + (+this._step) * (+step) * (+r) ).toFixed(n);

            if (this._dataFormat == 'date') { 
                return new Date(val); 
            } else {
               return val; 
            }
        }
    }

    translate(val): number | string | Date {

        if (this._dataFormat == 'custom') {
            return this._customValues[val];
            
        } else if (this._dataFormat == 'date') {
            return new Date(val); 

        } else {
            return val; 
        }
    }

    numberOfSteps(): number {
        let n: number = Math.max( this.decimalPlaces(this._step), this.decimalPlaces(this._minVal) );
        n = Math.pow(10, n);
        return ( Math.abs(this._maxVal - this._minVal) * n ) / ( this._step * n );
    }

    change(newOptions: any): void {

        let prevOptions: IModelOptions = this._options;
        let options: any = Object.assign({}, prevOptions, newOptions);

        options.value = options.value != null ? options.value : options.minVal;
        let validOptions: IModelOptions;

        if ( options.dataFormat == 'numeric' ) {
            validOptions = this.numericFormatValidation(options, prevOptions as IOptions);

        } else if ( options.dataFormat == 'date' ) {
            validOptions = this.dateFormatValidation(options, prevOptions as IOptions);
            this._options = Object.assign({}, prevOptions, newOptions);


        } else if ( options.dataFormat == 'custom' ) {
            validOptions = this.customFormatValidation(options, prevOptions as IOptions);
            validOptions.customValues = options.customValues;

        } else {
            throw new Error('Unknown format of data');
        }

        this._dataFormat = validOptions.dataFormat;
        this._val = validOptions.value;
        this._minVal = validOptions.minVal;
        this._maxVal = validOptions.maxVal;
        this._step = validOptions.step;
        this._reverse = validOptions.reverse;
        this._range = validOptions.range;
        this._customValues = validOptions.customValues;      
        
        if (this._dataFormat != 'date') this._options = validOptions;
    }

    private numericFormatValidation(allOptions: IOptions, defaultOptions: IOptions): IModelOptions {
        let options: IOptions = allOptions;
        // присваиваем начальным опциям дефолтные значения из defaultOptions
        // начальному значению присваиваем минимальное
        // по мере прохождения валидации, меняем значения на пользовательские
        let newOptions: IModelOptions = {
            dataFormat: 'numeric',
            value: defaultOptions.minVal as number,
            minVal: defaultOptions.minVal as number,
            maxVal: defaultOptions.maxVal as number,
            step: defaultOptions.step,
            reverse: defaultOptions.reverse,
            range: defaultOptions.range as [number, number],
        }

        this.areNumeric(options.maxVal, options.minVal, options.step);

        newOptions.step = Math.abs(options.step);
        newOptions.reverse = options.reverse ? true : false;
        newOptions.dataFormat = options.dataFormat;
        
        this.stepValidation(options.minVal as number, options.maxVal as number, newOptions.step);

        // если мин и макс перепутаны пользователем, меняем порядок
        // подразумевается, что min - это то что слева на слайдере, max - справа
        if ( this.minMaxValidation(options.minVal as number, options.maxVal as number, newOptions.reverse) ) {
            newOptions.minVal = options.minVal as number;
            newOptions.maxVal = options.maxVal as number;            
        } else {
            newOptions.minVal = options.maxVal as number;
            newOptions.maxVal = options.minVal as number;        
        }

        if ( options.range ) {
            this.rangeValidation(newOptions.minVal, newOptions.maxVal, options.range as [number, number], newOptions.step);
            // если мин и макс в диапазоне range перепутаны пользователем, меняем порядок
            if ( this.minMaxValidation(options.range[0] as number, options.range[1] as number, newOptions.reverse) ) {
                newOptions.range = options.range as [number, number];
            } else {
                newOptions.range = [options.range[1] as number, options.range[0] as number];
            }

            // отменяем начальное значение, даже если оно введено пользователем
            newOptions.value = null;
            
        } else {
            // запускаем проверки для начального значения, только если не указан диапазон range
            this.areNumeric(options.value);
            this.oneValueValidation(newOptions.minVal, newOptions.maxVal, options.value as number, newOptions.step);

            newOptions.value = options.value as number;
            newOptions.range = null;
        }
        
        return newOptions;
    }


    private dateFormatValidation(allOptions: IOptions, defaultOptions: IOptions): IModelOptions {
        let options: IOptions = allOptions;

        this.customDateValidation(options.minVal, options.maxVal);
        options.minVal = this.translateDateToNumber(options.minVal as string);
        options.maxVal = this.translateDateToNumber(options.maxVal as string);
        options.step = this.tranlateStepToDateFormat(options.step);

        if ( Array.isArray(options.range) && options.range.length == 2 ) {
            // если пользователь ввел что то другое, а не range, на этом
            // этапе ошибки не будет. Она появится при проверке на numericFormatValidation
            // (потому что range так и остается true)
            this.customDateValidation(options.range[0], options.range[1]);
            options.range[0] = this.translateDateToNumber(options.range[0] as string);
            options.range[1] = this.translateDateToNumber(options.range[1] as string);

        } else {
            this.customDateValidation(options.value);
            options.value = this.translateDateToNumber(options.value as string);
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
        // 3. value как число
        // 4. value как значение 
        if ( options.range || options.rangeInCustomValues ) {

            if ( !options.range && Array.isArray(options.rangeInCustomValues) && options.rangeInCustomValues.length == 2 ) {
                // если пользователь ввел что то другое, а не range, на этом
                // этапе ошибки не будет. Она появится при проверке на numericFormatValidation
                // (потому что range так и остается true)
                options.range = [0, 0];
                options.range[0] = this.findPositionInArr(options.rangeInCustomValues[0], options.customValues);
                options.range[1] = this.findPositionInArr(options.rangeInCustomValues[1], options.customValues);
            }

        } else {
            // если не введены val или range в custom values
            // присваиваем простые value или range, если они есть 
            if ( !options.value && options.valueInCustomValues ) {
                options.value = this.findPositionInArr(options.valueInCustomValues, options.customValues);
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
        let date = new Date(+arr[2], +arr[1] - 1, +arr[0]);
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


