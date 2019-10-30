import Model from '../src/Model';
import { defaultOptions } from '../src/defaultOptions';
import IOptions from '../src/defaultOptions';

describe('Model is created with default options', function() {

    let model;
    
    beforeEach( function() {
        model = new Model(defaultOptions);
    });

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
    it('can return step', function() {  
        expect(model.getStep()).toBe(defaultOptions.step);
    });
    it('can return max value', function() {  
        expect(model.getMaxVal()).toBe(defaultOptions.maxVal);
    });
    it('can return min value', function() {  
        expect(model.getMinVal()).toBe(defaultOptions.minVal);
    });

});

describe('Model has functions: ', function() {

    let model;
    model = new Model(defaultOptions);

    describe('isNumeric checks if argument is a number, returns booleal', function() {
        it('1', function() {  
            expect(model.isNumeric(1)).toBeTruthy();
        });
        it('1.5', function() {  
            expect(model.isNumeric(1.5)).toBeTruthy();
        });
        it('1,7', function() {  
            expect(model.isNumeric(1,7)).toBeTruthy();
        });
        it('"1"', function() {  
            expect(model.isNumeric("1")).toBeTruthy();
        });
        it('-9', function() {  
            expect(model.isNumeric(-9)).toBeTruthy();
        });
        it('true returns false', function() {  
            expect(model.isNumeric(true)).not.toBeTruthy();
        });
        it('a', function() {  
            expect(model.isNumeric('a')).not.toBeTruthy();
        });
    });

    describe('areNumeric checks if arguments are numbers, returns boolean', function() {
        it('val=1 minVal=2 maxVal=3 return true', function() {
            expect(model.areNumeric(1, 2, 3)).toBeTruthy();
        });
        it('range=[1, 2] minVal=2 maxVal=3 return true', function() {
            expect(model.areNumeric([1, 2][0], [1, 2][1], 1, 2, 3)).toBeTruthy();
        });
        it('val="a" minVal=2 maxVal=3 throw Error', function() {
            expect(function() { model.areNumeric("a", 2, 3) }).toThrow(new Error('All values in numeric format should be numbers'));
        }); 
    });

    describe('minMaxValidation checks the right meaning of min and max values, considering to reverse option, returns boolean', function() {
        it('minVal=1 maxVal=2 return true', function() {
            expect(model.minMaxValidation(1, 2, false)).toBeTruthy();
        });
        it('minVal=2 maxVal=1 return false', function() {
            expect(model.minMaxValidation(2, 1, false)).toBeFalsy();
        }); 
        it('minVal=2 maxVal=1 and reverse return true', function() {
            expect(model.minMaxValidation(2, 1, true)).toBeTruthy();
        });
        it('minVal=1 maxVal=2 and reverse return false', function() {
            expect(model.minMaxValidation(1, 2, true)).toBeFalsy();
        });
    });

    describe('stepValidation checks if (max val - min val) divided by step returns integer, returns true or Error', function() {
        it('minVal=0 maxVal=10 step=2 return true', function() {
            expect(model.stepValidation(0, 10, 2)).toBeTruthy();
        });
        it('minVal=0 maxVal=10 step=10 return true', function() {
            expect(model.stepValidation(0, 10, 2)).toBeTruthy();
        });
        it('minVal=10 maxVal=0 step=-2 return true', function() {
            expect(model.stepValidation(0, 10, -2)).toBeTruthy();
        });
        it('minVal=0.1 maxVal=0.9 step=0.1 return true', function() {
            expect(model.stepValidation(0, 10, -2)).toBeTruthy();
        });
        it('minVal=0.1 maxVal=0.9 step=0.1 return true', function() {
            expect(model.stepValidation(0.1, 0.9, 0.1)).toBeTruthy();
        });
        it('minVal=1 maxVal=10 step=9 return true', function() {
            expect(model.stepValidation(1, 10, 9)).toBeTruthy();
        });
        it('minVal=1 maxVal=10 step="a" return Error', function() {
            expect(function() { model.stepValidation(1, 10, 'a') }).toThrow(new Error('Step should be a number'));
        });
        it('minVal=1 maxVal=10 step=0 return Error', function() {
            expect( function() { model.stepValidation(1, 10, 0) }).toThrow(new Error('Step cant be equal to 0'));
        });
        it('minVal=1 maxVal=10 step=2 return Error', function() {
            expect(function() { model.stepValidation(1, 10, 2) }).toThrow(new Error('(Max value - min value) divided by step should return integer'));
        });
        it('minVal=1 maxVal=10 step=11 return Error', function() {
            expect( function() { model.stepValidation(1, 10, 11) }).toThrow(new Error('(Max value - min value) divided by step should return integer'));
        });
    });

    describe('rangeValidation checks the range, returns true or Error', function() {
        it('minVal=1 maxVal=10 range=[2,3] return true', function() {
            expect(model.rangeValidation(1, 10, [2, 3])).toBeTruthy();
        });
        it('minVal=1 maxVal=10 range=["11", "2"] return true', function() {
            expect(model.rangeValidation(1, 10, ["9", "2"])).toBeTruthy();
        });
        it('minVal=1 maxVal=10 range=[2,3,4] return Error', function() {
            expect(function() {model.rangeValidation(1, 10, [2, 3, 4])} ).toThrow(new Error('Range should contain two values'));
        });
        it('minVal=1 maxVal=10 range=["a", 2] return Error', function() {
            expect(function() {model.rangeValidation(1, 10, ["a", "2"])} ).toThrow(new Error('Values in range should be numbers'));
        });
        it('minVal=1 maxVal=10 range=[11, 2] return Error', function() {
            expect(function() {model.rangeValidation(1, 10, [11, 2])} ).toThrow(new Error('The range should be within min and max values'));
        });
    });

    describe('customDateValidation checks if date has right format,', function() {
        it('returns true if 22.05.2016', function() {
            expect(model.customDateValidation('22.05.2016')).toBeTruthy();
        });
        it('returns true if 22/05/2016', function() {
            expect(model.customDateValidation('22/05/2016')).toBeTruthy();
        });
        it('returns true if 22-05-2016', function() {
            expect(model.customDateValidation('22-05-2016')).toBeTruthy();
        });
        it('returns Error if 5', function() {
            expect(function() { model.customDateValidation('5') }).toThrow(new Error('All values in date format should be dates, like dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy'));
        });
    });

    describe('translateDateToNumber translate string date in ms', function() {
        it('returns right ms', function() {
            expect(model.translateDateToNumber('11.05.2013')).toBe(1370894400000);
        });
        it('returns right ms, either if there are some mistakes', function() {
            expect(model.translateDateToNumber('11.13.2013')).toBe(1392062400000);
        });
        it('returns Error with incorrect data', function() {
            expect(model.translateDateToNumber('00.00.0000')).toBe(-2209084217000);
        });            
    });

    describe('tranlateStepToDateFormat returns step in ms', function() {
        it('returns 2 == 172800000 ms', function() {
            expect(model.tranlateStepToDateFormat(2)).toBe(172800000);
        });
        it('returns Error if arg is not integer', function() {
            expect(function() { model.tranlateStepToDateFormat('k') }).toThrow(new Error('Step in date format should be integer'));
        });      
    });

    describe('findPositionInArr return position or Error', function() {
        it('returns position', function() {
            expect(model.findPositionInArr(0, [1, 3, 0, 5])).toBe(2);
        })
        it('returns Error', function() {
            expect(function() { model.findPositionInArr(7, [1, 3, 0, 5]) }).toThrow(new Error('Incorrect range or initial value in custom range'));
        })
    })

});


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
            initialVal: 0.2,
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
        it('returns translated data', function() {
            expect( model.getTranslated(1) ).toBe(2)
        })
    });
});