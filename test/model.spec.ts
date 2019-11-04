import Model, { IModel } from '../src/Model';
import { defaultOptions } from '../src/defaultOptions';
import IOptions from '../src/defaultOptions';

let model: IModel;
let testOptions;
beforeEach( function() {
    model = new Model(defaultOptions);
});
afterEach( function() {
    model = null;
    testOptions = null;
});

it('test', function() {
    let testOptions = Object.assign({}, defaultOptions, {
        dataFormat: 'date',
        minVal: '01/01/2019',
        maxVal: '02/01/2019',
    });
    
    model = new Model(testOptions);
    console.log('test ++++++++++++++++++++++ ' + model.getStep());
    expect(5).toBe(5);
})

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
    // расширить setrange
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

    describe('findPositionByStep returns, how many steps from begin (from 0) has value', function() {
        it('returns 3 if 3', function() {
            expect(model.findPositionByStep(3)).toBe(3);
        });
    });

    describe('nubberOfSteps returns number of steps', function() {
        it('returns 10 if default options', function() {
            expect(model.numberOfSteps()).toBe(10);
        })
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
            let newOptions = model.numericFormatValidation(testOptions, defaultOptions);
            expect(newOptions.dataFormat).toBe('numeric');
            expect(newOptions.minVal).toBe(20);
            expect(newOptions.maxVal).toBe(0);
            expect(newOptions.initialVal).toBe(0);
            expect(newOptions.range).toBeNull;
            expect(newOptions.reverse).toBeTruthy();
            expect(newOptions.step).toBe(2);
        });
        it('returns an object, with valid options, test 2. Changes positions in range, initial val == null', function() {
            testOptions = Object.assign({}, defaultOptions, {
                minVal: -10,
                maxVal: 20,
                step: 2,
                //range: [0.6, -2.8],
                initialVal: 10
            });
            console.log(testOptions.minVal);
            console.log(testOptions.maxVal);
            console.log(testOptions.step);
            // @ts-ignore
            console.log(model.stepValidation(testOptions.minVal, testOptions.maxVal, testOptions.step));
            // @ts-ignore
            let newOptions = model.numericFormatValidation(testOptions, defaultOptions);
            //expect(newOptions.dataFormat).toBe('numeric');
            //expect(newOptions.minVal).toBe(-10);
            //expect(newOptions.maxVal).toBe(20);
            //expect(newOptions.initialVal).toBeNull();
            //expect(newOptions.range).toBe([-2.8, 0.6]);
            //expect(newOptions.reverse).toBeTruthy();
            //expect(newOptions.step).toBe(0.2);
        });
    });

/*     describe('dateValidation is used for date format, returns numbers', function() {
        it('returns an object, with valid options, test 1. Min and max change position, initian val == min', function() {
            let testOptions = Object.assign({}, defaultOptions, {
                minVal: '01/09/2019',
                maxVal: '10/10/2019',
                initialVal: '20.09.2019',
                step: 2,
                reverse: true,
            });
            // @ts-ignore
            let newOptions = model.numericFormatValidation(testOptions, defaultOptions);
            console.log('min = ' + newOptions.minVal);
            console.log('max = ' + newOptions.maxVal);
            console.log('init = ' + newOptions.initialVal);

            expect(newOptions.dataFormat).toBe('numeric');
            expect(newOptions.minVal).toBe(20);
            expect(newOptions.maxVal).toBe(0);
            expect(newOptions.initialVal).toBe(0);
            expect(newOptions.range).toBeNull;
            expect(newOptions.reverse).toBeTruthy();
            expect(newOptions.step).toBe(2);
        });  
    }) */

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
            expect(model.translateDateToNumber('11.05.2013')).toBe(1370894400000);
        });
        it('returns right ms, either if there are some mistakes', function() {
            // @ts-ignore
            expect(model.translateDateToNumber('11.13.2013')).toBe(1392062400000);
        });
        it('returns Error with incorrect data', function() {
            // @ts-ignore
            expect(model.translateDateToNumber('00.00.0000')).toBe(-2209084217000);
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



});

/* 
describe('When model has numeric values,', function() {

    describe('can create with one value,', function() {

        let testOptions = Object.assign({}, defaultOptions, {
            initialVal: 0.2,
            minVal: 0.6,
            maxVal: -1,
            reverse: true,
            step: -0.1,
            initialValNumInCustomValues: 5
        });
        let model = new Model(testOptions);

        it('returns range == null', function() {
            expect(model.getRange()).toBeNull();
        });
        it('val == 2', function() {
            expect(model.getVal()).toBe(0.2);
        });
        it('step == 0.1', function() {
            expect(model.getStep()).toBe(0.1);
        });
    });

    describe('can create with range,', function() {

        let testOptions: IOptions = Object.assign({}, defaultOptions, {
            range: [-1.5, 9.5],
            minVal: -1.5,
            maxVal: 10,
            step: 0.5,
        });
        let model = new Model(testOptions);
    
        it('returns range == [-1.5, 9.5]', function() {
            expect(model.getRange()).toEqual([-1.5, 9.5]);
        });
        it('returns val == null', function() {
            expect(model.getVal()).toBeNull();
        });
    });

    describe('can create with some custom mistakes,', function() {

        let testOptions: IOptions = Object.assign({}, defaultOptions, {
            initialVal: 0.5,
            range: [15, 13],
            minVal: 20,
            maxVal: 10,
            step: -0.5,
        });
        let model = new Model(testOptions);
    
        it('returns range in right order, considering to reverse option', function() {
            expect(model.getRange()).toEqual([13, 15]);
        });
        it('changes min and max values, considering to reverse option', function() {
            expect([model.getMinVal(), model.getMaxVal()]).toEqual([10, 20]);
        });
        it('ignores initial value, if range is defined', function() {
            expect(model.getVal()).toBeNull();
        });
        it('returns absolute value of step, if step < 0', function() {
            expect(model.getStep()).toBe(0.5);
        });
    });
});

describe('When Model has date format,', function() {

    describe('with defined range,', function() {

        let testOptions: IOptions = Object.assign({}, defaultOptions, {
            dataFormat: 'date',
            initialVal: '15.10.2019',
            range: ['13.10.2019', '20.10.2019'],
            minVal: '10.10.2019',
            maxVal: '30.10.2019',
        });
        let model = new Model(testOptions);

        it('can create', function() {
            expect(model).toBeDefined();
        });
        it('returns all data, like numbers', function() {
            // @ts-ignore
            expect( model.isNumeric(model.getMinVal()) ).toBeTruthy();
            // @ts-ignore
            expect( model.isNumeric(model.getMaxVal()) ).toBeTruthy();
            // @ts-ignore
            expect( model.isNumeric(model.getRange()[0]) ).toBeTruthy();
            // @ts-ignore
            expect( model.isNumeric(model.getStep()) ).toBeTruthy();
        });
        it('returns val == null', function() {
            // @ts-ignore
            expect( model.getVal() ).toBeNull();

        });

    });

    describe('with defined initial value,', function() {

        let testOptions: IOptions = Object.assign({}, defaultOptions, {
            dataFormat: 'date',
            initialVal: '15.10.2019',
            minVal: '10.10.2019',
            maxVal: '30.10.2019',
        });
        let model = new Model(testOptions);

        it('can create', function() {
            expect(model).toBeDefined();
        });
        it('returns all data, like numbers', function() {
            // @ts-ignore
            expect( model.isNumeric(model.getMinVal()) ).toBeTruthy();
            // @ts-ignore
            expect( model.isNumeric(model.getMaxVal()) ).toBeTruthy();
            // @ts-ignore
            expect( model.isNumeric(model.getVal()) ).toBeTruthy();
            // @ts-ignore
            expect( model.isNumeric(model.getStep()) ).toBeTruthy();
        });
        it('returns range == null', function() {
            // @ts-ignore
            expect( model.getRange() ).toBeNull();
        });

    });

    describe('throught Error if range is not valid,', function() {

        let testOptions: IOptions = Object.assign({}, defaultOptions, {
            dataFormat: 'date',
            range: '15.10.2019',
            minVal: '10.10.2019',
            maxVal: '30.10.2019',
        });

        it('returns Error "Range should contain two values"', function() {
            // @ts-ignore
            expect(function() { let model = new Model(testOptions) }).toThrow(new Error('Range should contain two values'));
        });
    });
});

describe('When Model has custom format,', function() {

    describe('with any custom values', function() {

        let testOptions: IOptions = Object.assign({}, defaultOptions, {
            dataFormat: 'custom',
            customValues: [1, 2, 'gdfg', true]
        });

        let model = new Model(testOptions);

        it('can create', function() {
            expect(model).toBeDefined();
        });
        it('returns all data, like numbers', function() {
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

        let testOptions: IOptions = Object.assign({}, defaultOptions, {
            dataFormat: 'custom',
            customValues: [1, 2, 'gdfg', 5],
            initialRangeInCustomValues: [1, 'gdfg']
        });

        let model = new Model(testOptions);
        // @ts-ignore
        console.log(model._customValues)

        it('can create', function() {
            expect(model).toBeDefined();
        });
        it('returns all data, like numbers', function() {
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
}); */