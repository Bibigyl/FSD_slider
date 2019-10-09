import { Model } from '../src/Model';

describe('Model is created with default settings', function() {

    let defaultOptions = {
        width: "377px",
        step: 1,
        minVal: 0,
        maxVal: 10,
        initialVal: 1
    };

/*     beforeEach( function() {
        let model = new Model(defaultOptions);
    }); */

    it('can create', function() {  
        let model = new Model(defaultOptions);
        expect(model).not.toBe(null);
    });
});