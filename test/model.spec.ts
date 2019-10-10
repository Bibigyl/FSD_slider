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
    it('can return default initial value', function() {  
        expect(model.getVal()).toBe(defaultOptions.initialVal);
    });
    it('can set new value', function() {
        model.setVal(defaultOptions.initialVal-1);
        expect(model.getVal()).toBe(defaultOptions.initialVal-1);
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

describe('Model has functions', function() {

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

    describe('numericFormatValidation checks if initial value, min, max value are numbers, returns true or Error', function() {
        it('val=1 minVal=2 maxVal=3 return true', function() {
            expect(model.numericFormatValidation(1, 2, 3)).toBeTruthy();
        });
        it('val="a" minVal=2 maxVal=3 throw Error', function() {
            expect(function() { model.numericFormatValidation("a", 2, 3) }).toThrow(new Error('Initial value, Max value, Min value should be numbers'));
        }); 
    });

    describe('minMaxValidation checks the right meaning of min and max values, considering to reverse option, returns boolean', function() {
        it('minVal=1 maxVal=2 return true', function() {
            expect(model.minMaxValidation(1, 2)).toBeTruthy();
        });
        it('minVal=2 maxVal=1 return Error', function() {
            expect(function() { model.minMaxValidation(2, 1) }).toThrow(new Error('Max value should be bigger then Min value'));
        }); 
        it('minVal=2 maxVal=1 and reverse return true', function() {
            expect(model.minMaxValidation(2, 1, true)).toBeTruthy();
        });
        it('minVal=1 maxVal=2 and reverse return Error', function() {
            expect(function() { model.minMaxValidation(1, 2, true) }).toThrow(new Error('Min value should be bigger then Max value, if you added reverse option'));
        });
    });

})


describe('When model has numeric values', function() {

    interface INumericOptions {
        step: number;
        minVal: number;
        maxVal: number;
        initialVal: number;
    }
    let model;
    let numericOptions: INumericOptions;
    let fullOptions: IOptions;

    
    beforeEach( function() {

        numericOptions = {
            step: 1,
            minVal: 0,
            maxVal: 10,
            initialVal: 1
        };
        fullOptions = Object.assign({}, defaultOptions, numericOptions);
        model = new Model(fullOptions);

    });

    it('can create', function() {  
        expect(model).toBeDefined();
    });
    it('can return default initial value', function() {  
        expect(model.getVal()).toBe(defaultOptions.initialVal);
    });


    

});