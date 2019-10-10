import Model from '../src/Model';
import { defaultOptions } from '../src/defaultOptions';
import IOptions from '../src/defaultOptions';

describe('Model is created with default settings', function() {

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


describe('When model has numeric values', function() {

    interface ISettingOptions {
        step: number;
        minVal: number;
        maxVal: number;
        initialVal: number;
    }
    let model;
    let numericOptions: ISettingOptions;
    let settingOptions: IOptions;

    
    beforeEach( function() {

        numericOptions = {
            step: 1,
            minVal: 0,
            maxVal: 10,
            initialVal: 1
        };
        settingOptions = Object.assign({}, defaultOptions, numericOptions);
        model = new Model(settingOptions);

    });

    it('can create', function() {  
        expect(model).toBeDefined();
    });
    it('can return default initial value', function() {  
        expect(model.getVal()).toBe(defaultOptions.initialVal);
    });


});