import Model, { IModel } from '../src/Model';
import { defaultOptions } from '../src/defaultOptions';
import IOptions from '../src/defaultOptions';

let model: IModel;
let testOptions;
let newOptions;

beforeEach( function() {
    model = new Model(defaultOptions);
});
afterEach( function() {
    //model = null;
    //testOptions = null;
});

describe('Model is created with default options,', function() {

    it('can create', function() {  
        expect(model).toBeDefined();
    });
    it('can return default initial value = min value', function() {  
        expect(model.getVal()).toBe(defaultOptions.minVal);
    });
    it('can set new value', function() {
        model.setVal(5);
        expect(model.getVal()).toBe(5);
    });
    it('cant return range, returns null', function() {
        expect(model.getRange()).toBeNull();
    });
    it('can return step', function() {  
        expect(model.getStep()).toBe(defaultOptions.step);
    });
    it('can return min value', function() {  
        expect(model.getMinVal()).toBe(defaultOptions.minVal);
    });
    it('can return max value', function() {  
        expect(model.getMaxVal()).toBe(defaultOptions.maxVal);
    });
    it('can return reverse as boolean', function() {
        expect(model.getReverse()).toBeFalsy();
    });
    it('cant return range with custom values', function() {
        expect(model.getCustomValues()).toBeUndefined();
    });
    it('can return format of data == numeric', function() {
        expect(model.getDataFormat()).toBe('numeric');
    })
});

describe('Model has private functions and methods: ', function() {

    describe('findPositionInArr return position or Error', function() {

        it('returns 2 when k, if its called inside Model', function() {
            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'custom',
                customValues: [1, 3, 'k', 'lol']
            });
            
            model = new Model(testOptions);
            expect(model.findPositionInArr('k')).toBe(2);
        })
        it('returns position in arrow from parameter', function() {
            expect(model.findPositionInArr(0, [1, 3, 0, 5])).toBe(2);
        });
        it('returns first parametr val, if in model there is no custom values and no 2nd parameter', function() {
            expect(model.findPositionInArr(2)).toBe(2);
        })
        it('returns Error if val not in array from 2nd parameter', function() {
            expect(function() { model.findPositionInArr(7, [1, 3, 0, 5]) }).toThrow(new Error('Cant find value in array'));
        });
        it('returns Error if val not in custom array', function() {
            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'custom',
                customValues: [1, 3, 'k', 'lol']
            });
            
            model = new Model(testOptions);
            expect(function() { model.findPositionInArr(7) }).toThrow(new Error('Not valid value for custom values'));
        });
    });

    describe('getStepNumber returns, how many steps from begin (from 0) has value', function() {
        it('returns 3 if 3', function() {
            expect(model.getStepNumber(3)).toBe(3);
        });
        it('returns 3 if 1.5', function() {
            testOptions = Object.assign({}, defaultOptions, {
                step: 0.5,
            });
            model = new Model(testOptions);
            expect(model.getStepNumber(1.5)).toBe(3);
        });
        it('returns 1 if 0.1', function() {
            testOptions = Object.assign({}, defaultOptions, {
                step: 0.3,
                minVal: -0.2,
                maxVal: 2.5
            });
            model = new Model(testOptions);
            expect(model.getStepNumber(0.1)).toBe(1);
        });
        it('returns 1 if 0.9', function() {
            testOptions = Object.assign({}, defaultOptions, {
                step: 1,
                minVal: -0.1,
                maxVal: 1.9
            });
            model = new Model(testOptions);
            expect(model.getStepNumber(0.9)).toBe(1);
        });
    });

    describe('translateByStep return formated value accoding to step', function() {
        it('returns integer values', function() {
            expect(model.translateByStep(5)).toBe(5);
        });
        it('returns value if reverse', function() {
            testOptions = Object.assign({}, defaultOptions, {
                step: 1,
                reverse: true
            });
            model = new Model(testOptions);
            expect(model.translateByStep(1)).toBe(9);
        });
        it('returns float values', function() {
            testOptions = Object.assign({}, defaultOptions, {
                step: 0.3,
                minVal: -0.2,
                maxVal: 2.5
            });
            model = new Model(testOptions);
            expect(model.translateByStep(2)).toBe(0.4);
        });
        it('returns float when step is integer', function() {
            testOptions = Object.assign({}, defaultOptions, {
                step: 1,
                minVal: -0.1,
                maxVal: 1.9,
                reverse: true,
            });
            model = new Model(testOptions);
            expect(model.translateByStep(1)).toBe(0.9);
        });
        it('returns custom value', function() {
            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'custom',
                customValues: ['a','b','c']
            });
            model = new Model(testOptions);
            expect(model.translateByStep(1)).toBe('b');
        });
        it('returns object date', function() {
            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'date',
                minVal: '01/11/2019',
                maxVal: '20/11/2019',
            });
            model = new Model(testOptions);
            let date: Date = model.translateByStep(0) as Date;
            expect(date.getDate()).toBe(1);
        });
    });

    describe('translate', function() {
        it('returns parametr val if numeric values', function() {
            expect(model.translate(6)).toBe(6);
        });
        it('returns Date if date values', function() {
            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'date',
                minVal: '01/11/2019',
                maxVal: '20/11/2019',
            });
            model = new Model(testOptions);
            // @ts-ignore
            expect(model.translate(1572652800000).getDate()).toBeDefined();
            // @ts-ignore
            expect(model.translate(1572652800000).getDate()).toBe(2);
        });
        it('returns custom value if custom data farmat', function() {
            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'custom',
                customValues: ['a','b','c']
            });
            model = new Model(testOptions);
            expect(model.translate(0)).toBe('a');
        })
    })

    describe('numberOfSteps returns number of steps', function() {
        it('returns 10 if default options', function() {
            expect(model.numberOfSteps()).toBe(10);
        })
        it('works, when float', function() {
            testOptions = Object.assign({}, defaultOptions, {
                step: 0.3,
                minVal: -0.2,
                maxVal: 2.5
            });
            model = new Model(testOptions);
            expect(model.numberOfSteps()).toBe(9);
        });
        it('works, when float and step == 1', function() {
            testOptions = Object.assign({}, defaultOptions, {
                step: 1,
                minVal: -0.1,
                maxVal: 1.9
            });
            model = new Model(testOptions);
            expect(model.numberOfSteps()).toBe(2);
        });
    });

    describe('change', function() {
        it('changes data in model, calls all validations. It is called in presenter method change', function() {
            testOptions = Object.assign({}, defaultOptions, {
                step: 2,
                maxVal: 14,
                range: [2, 8],
            });

            expect(model.getMaxVal()).toBe(10);
            expect(model.getVal()).toBe(0);
            expect(model.getRange()).toBeNull();
            expect(model.getStep()).toBe(1);

            model.change(testOptions);

            expect(model.getMaxVal()).toBe(14);
            expect(model.getVal()).toBeNull();
            expect(model.getRange()[0]).toBe(2);
            expect(model.getStep()).toBe(2);
        });
    });

    describe('numericFormatValidation calls all validation functions to options. Its the main function for model, its called even if custom or date format of data', function() {
        it('returns an object, with valid options, test 1. Min and max change position, initian val == min', function() {
            testOptions = Object.assign({}, defaultOptions, {
                minVal: 0,
                maxVal: 20,
                step: 2,
                reverse: true,
            });
            // @ts-ignore
            newOptions = model.numericFormatValidation(testOptions, defaultOptions);
            expect(newOptions.dataFormat).toBe('numeric');
            expect(newOptions.minVal).toBe(20);
            expect(newOptions.maxVal).toBe(0);
            expect(newOptions.value).toBe(0);
            expect(newOptions.range).toBeNull;
            expect(newOptions.reverse).toBeTruthy();
            expect(newOptions.step).toBe(2);
        });
        it('returns an object, with valid options, test 2. Changes positions in range, initial val == null', function() {
            testOptions = Object.assign({}, defaultOptions, {
                minVal: -10,
                maxVal: 20,
                step: .2,
                range: [0.6, -2.8],
                value: 10
            });
            // @ts-ignore
            newOptions = model.numericFormatValidation(testOptions, defaultOptions);
            expect(newOptions.dataFormat).toBe('numeric');
            expect(newOptions.minVal).toBe(-10);
            expect(newOptions.maxVal).toBe(20);
            expect(newOptions.value).toBeNull();
            expect(newOptions.range).toEqual([-2.8, 0.6]);
            expect(newOptions.reverse).toBeFalsy();
            expect(newOptions.step).toBe(.2);
        });
    });

    describe('dateValidation is used for date format, returns numbers', function() {
        it('returns an object, with valid options, test 3. All options are numeric, milliseconds', function() {
            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'date',
                minVal: '01/09/2019',
                maxVal: '19/09/2019',
                value: '01.09.2019',
                step: 2,
                reverse: true,
            });
            // @ts-ignore
            newOptions = model.dateFormatValidation(testOptions, defaultOptions);

            expect(newOptions.dataFormat).toBe('date');
            expect(newOptions.minVal).toBe(1568840400000);
            expect(newOptions.maxVal).toBe(1567285200000);
            expect(newOptions.value).toBe(1567285200000);
            expect(newOptions.range).toBeNull();
            expect(newOptions.reverse).toBeTruthy();
            expect(newOptions.step).toBe(172800000);
        });  
    });

    describe('customDataValidation is used for custom format, returns numbers. CustomValue is required, is array of any values', function() {
        it('returns an object, with valid options, test 4. All options are numeric, step always == 1. Raiting of options: range -> rangeInCustomValues -> value -> valueInCustomValues', function() {

            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'custom',
                customValues: [0, 1, 'k', 'n', 'p'],
                value: 2,
                valueInCustomValues: 'n', 
                range: [1, 3],
                rangeInCustomValues: [1, 'p'],
                reverse: true,
                step: 2,
            });
            // @ts-ignore
            newOptions = model.customFormatValidation(testOptions, defaultOptions);

            expect(newOptions.dataFormat).toBe('custom');
            expect(newOptions.minVal).toBe(4);
            expect(newOptions.maxVal).toBe(0);
            expect(newOptions.value).toBeNull();
            expect(newOptions.range).toEqual([3, 1]);
            expect(newOptions.reverse).toBeTruthy();
            expect(newOptions.step).toBe(1);
        });

        it('returns an object, with valid options, test 4. All options are numeric, step always == 1. Raiting of options: range -> rangeInCustomValues -> value -> valueInCustomValues', function() {

            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'custom',
                customValues: [0, 1, 'k', 'n', 'p'],
                value: 2,
                valueInCustomValues: 'n', 
                range: [1, 3],
                rangeInCustomValues: [1, 'p'],
                reverse: true,
                step: 2,
            });
            // @ts-ignore
            newOptions = model.customFormatValidation(testOptions, defaultOptions);

            expect(newOptions.dataFormat).toBe('custom');
            expect(newOptions.minVal).toBe(4);
            expect(newOptions.maxVal).toBe(0);
            expect(newOptions.value).toBeNull();
            expect(newOptions.range).toEqual([3, 1]);
            expect(newOptions.reverse).toBeTruthy();
            expect(newOptions.step).toBe(1);
        });

        it('returns rangeInCustomValues -> value -> valueInCustomValues', function() {

            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'custom',
                customValues: [0, 1, 'k', 'n', 'p'],
                value: 2,
                valueInCustomValues: 'n', 
                //range: [1, 3],
                rangeInCustomValues: [1, 'p'],
            });
            // @ts-ignore
            newOptions = model.customFormatValidation(testOptions, defaultOptions);

            expect(newOptions.value).toBeNull();
            expect(newOptions.range).toEqual([1, 4]);
        });
        it('returns value -> valueInCustomValues', function() {

            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'custom',
                customValues: [0, 1, 'k', 'n', 'p'],
                value: 2,
                valueInCustomValues: 'n', 
                //range: [1, 3],
                //rangeInCustomValues: [1, 'p'],
            });
            // @ts-ignore
            newOptions = model.customFormatValidation(testOptions, defaultOptions);

            expect(newOptions.value).toBe(2);
            expect(newOptions.range).toBeNull();
        });
            it('returns  valueInCustomValues', function() {

            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'custom',
                customValues: [0, 1, 'k', 'n', 'p'],
                //value: 2,
                valueInCustomValues: 'n', 
                //range: [1, 3],
                //rangeInCustomValues: [1, 'p'],
            });
            // @ts-ignore
            newOptions = model.customFormatValidation(testOptions, defaultOptions);

            expect(newOptions.value).toBe(3);
            expect(newOptions.range).toBeNull();
        });
    });

    describe('areNumeric checks if arguments are numbers, returns boolean', function() {
        it('val=1 minVal=2 maxVal=3 return true', function() {
            // @ts-ignore
            expect(model.areNumeric(1, 2, 3)).toBeTruthy();
        });
        it('range=[1, 2] minVal=2 maxVal=3 return true', function() {
            // @ts-ignore
            expect(model.areNumeric([1, 2][0], [1, 2][1], 1, 2, 3)).toBeTruthy();
        });
        it('val="a" minVal=2 maxVal=3 throw Error', function() {
            // @ts-ignore
            expect(function() { model.areNumeric("a", 2, 3) }).toThrow(new Error('All values in numeric format should be numbers'));
        }); 
    });

    describe('minMaxValidation checks the right meaning of min and max values, considering to reverse option, returns boolean', function() {
        it('minVal=1 maxVal=2 return true', function() {
            // @ts-ignore
            expect(model.minMaxValidation(1, 2, false)).toBeTruthy();
        });
        it('minVal=2 maxVal=1 return false', function() {
            // @ts-ignore
            expect(model.minMaxValidation(2, 1, false)).toBeFalsy();
        }); 
        it('minVal=2 maxVal=1 and reverse return true', function() {
            // @ts-ignore
            expect(model.minMaxValidation(2, 1, true)).toBeTruthy();
        });
        it('minVal=1 maxVal=2 and reverse return false', function() {
            // @ts-ignore
            expect(model.minMaxValidation(1, 2, true)).toBeFalsy();
        });
    });

    describe('stepValidation checks if (max val - min val) divided by step returns integer, returns true or Error', function() {
        it('minVal=0 maxVal=10 step=2 return true', function() {
            // @ts-ignore
            expect(model.stepValidation(0, 10, 2)).toBeTruthy();
        });
        it('minVal=0 maxVal=10 step=10 return true', function() {
            // @ts-ignore
            expect(model.stepValidation(0, 10, 2)).toBeTruthy();
        });
        it('minVal=10 maxVal=0 step=-2 return true', function() {
            // @ts-ignore
            expect(model.stepValidation(0, 10, -2)).toBeTruthy();
        });
        it('minVal=0.1 maxVal=0.9 step=0.1 return true', function() {
            // @ts-ignore
            expect(model.stepValidation(0, 10, -2)).toBeTruthy();
        });
        it('minVal=0.1 maxVal=0.9 step=0.1 return true', function() {
            // @ts-ignore
            expect(model.stepValidation(0.1, 0.9, 0.1)).toBeTruthy();
        });
        it('minVal=1 maxVal=10 step=9 return true', function() {
            // @ts-ignore
            expect(model.stepValidation(1, 10, 9)).toBeTruthy();
        });
        it('minVal=1 maxVal=10 step="a" return Error', function() {
            // @ts-ignore
            expect(function() { model.stepValidation(1, 10, 'a') }).toThrow(new Error('Step should be a number'));
        });
        it('minVal=1 maxVal=10 step=0 return Error', function() {
            // @ts-ignore
            expect( function() { model.stepValidation(1, 10, 0) }).toThrow(new Error('Step cant be equal to 0'));
        });
        it('minVal=1 maxVal=10 step=2 return Error', function() {
            // @ts-ignore
            expect(function() { model.stepValidation(1, 10, 2) }).toThrow(new Error('(Max value - min value) divided by step should return integer'));
        });
        it('minVal=1 maxVal=10 step=11 return Error', function() {
            // @ts-ignore
            expect( function() { model.stepValidation(1, 10, 11) }).toThrow(new Error('(Max value - min value) divided by step should return integer'));
        });
    });

    describe('oneValueValidation ckecks one value, return true or Error', function() {
        it('minVal=1 maxVal=10 val=4 return true', function() {
            // @ts-ignore
            expect(model.oneValueValidation(0, 10, 4, 2)).toBeTruthy();
        });
        it('minVal=10 maxVal=0 val=1.5 step 0.5  return true', function() {
            // @ts-ignore
            expect(model.oneValueValidation(10, 0, 1.5, 0.5)).toBeTruthy();
        });
        it('minVal=0 maxVal=10 val=10.6 step 0.5 return true', function() {
            // @ts-ignore
            expect(function() {model.oneValueValidation(0, 10, 10.6, 0.5)}).toThrow(new Error('The initial value should be within min and max values'));
        });
        it('minVal=0 maxVal=10 val=0.6 step 0.5 return true', function() {
            // @ts-ignore
            expect(function() {model.oneValueValidation(0, 10, 0.6, 0.5)}).toThrow(new Error('Value should be set on step'));
        });    
    });

    describe('rangeValidation checks the range, returns true or Error', function() {
        it('minVal=1 maxVal=10 range=[2,3] return true', function() {
            // @ts-ignore
            expect(model.rangeValidation(0, 10, [2, 6], 2)).toBeTruthy();
        });
        it('minVal=1 maxVal=10 range=["11", "2"] return true', function() {
            // @ts-ignore
            expect(model.rangeValidation(1, 10, ["9", "2"], 1)).toBeTruthy();
        });
        it('minVal=1 maxVal=10 range=[2,3,4] return Error', function() {
            // @ts-ignore
            expect(function() {model.rangeValidation(1, 10, [2, 3, 4])} ).toThrow(new Error('Range should contain two values'));
        });
        it('minVal=1 maxVal=10 range=["a", 2] return Error', function() {
            // @ts-ignore
            expect(function() {model.rangeValidation(1, 10, ["a", "2"], 1)} ).toThrow(new Error('Values in range should be numbers'));
        });
        it('minVal=1 maxVal=10 range=[11, 2] return Error', function() {
            // @ts-ignore
            expect(function() {model.rangeValidation(1, 10, [11, 2])} ).toThrow(new Error('The range should be within min and max values'));
        });
    });

    describe('customDateValidation checks if date has right format,', function() {
        it('returns true if 22.05.2016', function() {
            // @ts-ignore
            expect(model.customDateValidation('22.05.2016')).toBeTruthy();
        });
        it('returns true if 22/05/2016', function() {
            // @ts-ignore
            expect(model.customDateValidation('22/05/2016')).toBeTruthy();
        });
        it('returns true if 22-05-2016', function() {
            // @ts-ignore
            expect(model.customDateValidation('22-05-2016')).toBeTruthy();
        });
        it('returns Error if 5', function() {
            // @ts-ignore
            expect(function() { model.customDateValidation('5') }).toThrow(new Error('All values in date format should be dates, like dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy'));
        });
    });

    describe('translateDateToNumber translate string date in ms', function() {
        it('returns right ms', function() {
            // @ts-ignore
            expect(model.translateDateToNumber('11.05.2013')).toBe(1368216000000);
        });
        it('returns right ms, either if there are some mistakes', function() {
            // @ts-ignore
            expect(model.translateDateToNumber('11.13.2013')).toBe(1389384000000);
        });
        it('returns Error with incorrect data', function() {
            // @ts-ignore
            expect(model.translateDateToNumber('00.00.0000')).toBe(-2211762617000);
        });            
    });

    describe('tranlateStepToDateFormat returns step in ms', function() {
        it('returns 2 == 172800000 ms', function() {
            // @ts-ignore
            expect(model.tranlateStepToDateFormat(2)).toBe(172800000);
        });
        it('returns Error if arg is not integer', function() {
            // @ts-ignore
            expect(function() { model.tranlateStepToDateFormat('k') }).toThrow(new Error('Step in date format should be integer'));
        });      
    });

    describe('isNumeric checks if argument is a number, returns booleal', function() {
        it('1', function() {
            // @ts-ignore
            expect(model.isNumeric(1)).toBeTruthy();
        });
        it('1.5', function() {
            // @ts-ignore
            expect(model.isNumeric(1.5)).toBeTruthy();
        });
        it('1,7', function() {
            // @ts-ignore
            expect(model.isNumeric(1,7)).toBeTruthy();
        });
        it('"1"', function() {  
            // @ts-ignore
            expect(model.isNumeric("1")).toBeTruthy();
        });
        it('-9', function() { 
            // @ts-ignore 
            expect(model.isNumeric(-9)).toBeTruthy();
        });
        it('true returns false', function() {  
            // @ts-ignore
            expect(model.isNumeric(true)).not.toBeTruthy();
        });
        it('a', function() {  
            // @ts-ignore
            expect(model.isNumeric('a')).not.toBeTruthy();
        });
    });
    describe('decimalPlaces returns number of decimal places', function() {
        it('returns 5 if 1.12345', function(){
            // @ts-ignore
            expect(model.decimalPlaces(1.12345)).toBe(5);
        });
    });
});

describe('When model has numeric values,', function() {

    describe('can create with one value, when step < 1', function() {

        it('returns val, doesn return range, step > 0', function() {
            testOptions = Object.assign({}, defaultOptions, {
                value: 0.2,
                minVal: -0.6,
                maxVal: 1,
                reverse: true,
                step: -0.1,
                valueNumInCustomValues: 5
            });
            model = new Model(testOptions);

            expect(model.getRange()).toBeNull();
            expect(model.getVal()).toBe(0.2);
            expect(model.getStep()).toBe(0.1);
            expect(model.getMinVal()).toBe(1);
            expect(model.getMaxVal()).toBe(-0.6);
        });
    });

    describe('can create with range,', function() {
    
        it('returns range, doesnt return val, can change positions if reverse', function() {
            testOptions = Object.assign({}, defaultOptions, {
                range: [-1.5, 9.5],
                minVal: -1.5,
                maxVal: 10,
                step: -0.5,
                reverse: true,
            });
            model = new Model(testOptions);

            expect(model.getRange()).toEqual([9.5, -1.5]);
            expect(model.getVal()).toBeNull();
            expect(model.getStep()).toBe(0.5);
            expect(model.getMinVal()).toBe(10);
            expect(model.getMaxVal()).toBe(-1.5);
        });
    });

    describe('can create with some custom mistakes,', function() {
    
        it('returns range, min, max in right order, considering to reverse option. return step > 0. ignores value, if range', function() {
            let testOptions: IOptions = Object.assign({}, defaultOptions, {
                value: 0.5,
                range: [13, 15],
                minVal: 10,
                maxVal: 20,
                step: -0.5,
                reverse: true
            });
            let model = new Model(testOptions);
            expect(model.getRange()).toEqual([15, 13]);
            expect([model.getMinVal(), model.getMaxVal()]).toEqual([20, 10]);
            expect(model.getVal()).toBeNull();
            expect(model.getStep()).toBe(0.5);
        });
    }); 
});

describe('When Model has date format,', function() {

    describe('can create with defined range,', function() {

        it('can create, all data are numeric, understand different formats', function() {
            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'date',
                value: '15.10.2019',
                range: ['13/10/2019', '20.10.2019'],
                minVal: '10.10.2019',
                maxVal: '30-10-2019',
            });
            model = new Model(testOptions);

            expect(model).toBeDefined();
            expect( model.getVal() ).toBeNull();
            // @ts-ignore
            expect( model.isNumeric(model.getMinVal()) ).toBeTruthy();
            // @ts-ignore
            expect( model.isNumeric(model.getMaxVal()) ).toBeTruthy();
            // @ts-ignore
            expect( model.isNumeric(model.getRange()[0]) ).toBeTruthy();
            // @ts-ignore
            expect( model.isNumeric(model.getStep()) ).toBeTruthy();
        });
    });

    describe('with defined initial value,', function() {

        it('can create, all data are numeric', function() {

            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'date',
                value: '15.10.2019',
                minVal: '10/10/2019',
                maxVal: '30-10-2019',
            });
            model = new Model(testOptions);

            expect(model).toBeDefined();
            expect( model.getRange() ).toBeNull();
            // @ts-ignore
            expect( model.isNumeric(model.getMinVal()) ).toBeTruthy();
            // @ts-ignore
            expect( model.isNumeric(model.getMaxVal()) ).toBeTruthy();
            // @ts-ignore
            expect( model.isNumeric(model.getVal()) ).toBeTruthy();
            // @ts-ignore
            expect( model.isNumeric(model.getStep()) ).toBeTruthy();
        });
    });
});

describe('When Model has custom format,', function() {

    describe('can create with any custom values', function() {

        it('returns numeric values, can return range - custom values', function() {
            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'custom',
                customValues: [1, 2, 'gdfg', true]
            });
    
            model = new Model(testOptions);

            expect(model).toBeDefined();
            // @ts-ignore
            expect( model.getMinVal() ).toBe(0);
            // @ts-ignore
            expect( model.getMaxVal() ).toBe(testOptions.customValues.length - 1);
            // @ts-ignore
            expect( model.getVal() ).toBe(0);
            // @ts-ignore
            expect( model.getStep() ).toBe(1);
            // @ts-ignore
            expect( model.getRange() ).toBeNull();
        });
    });

    describe('with defined range,', function() {

        it('can create, returns all data, like numbers', function() {
            testOptions = Object.assign({}, defaultOptions, {
                dataFormat: 'custom',
                customValues: [1, 2, 'gdfg', 5],
                rangeInCustomValues: [1, 'gdfg']
            });
    
            model = new Model(testOptions);

            expect(model).toBeDefined();
            // @ts-ignore
            expect( model.getMinVal() ).toBe(0);
            // @ts-ignore
            expect( model.getMaxVal() ).toBe(testOptions.customValues.length - 1);
            // @ts-ignore
            expect( model.getVal() ).toBeNull();
            // @ts-ignore
            expect( model.getStep() ).toBe(1);
            // @ts-ignore
            expect( model.getRange()[0] ).toBe(0);
            // @ts-ignore
            expect( model.getRange()[1] ).toBe(2);
        });
    });
});