import { IModelOptions } from "./Model";
import { isNumeric } from "./commonFunctions";

interface IWarnings {
    valuesAreNotNumbers?: string,
    valuesAreNotInteger?: string,
    minIsOverMax?: string,
    minIsEqualToMax?: string,
    wrongRangeLength?: string,
    wrongOrderInRange?: string,
    tooBigStep?: string,
    stepIsNull?: string,
    reverseIsNotBoolean?: string,
    customValuesIsNotArray?: string,
    //someValuesAreIgnored?: string
}

let warnings: IWarnings = {
    valuesAreNotNumbers: 'All values, instead of customValues, should be numbers',
    valuesAreNotInteger: 'All values, instead of customValues, should be integer',
    minIsOverMax: 'Min value should be less then max value',
    minIsEqualToMax: 'Min value cant be equal to max value',
    wrongRangeLength: 'Range should contain two values',
    wrongOrderInRange: 'The first number in range should be less then second',
    tooBigStep: 'Step should be less then difference of max and min values',
    stepIsNull: 'Step cant be equal to 0',
    reverseIsNotBoolean: 'Option reverse should be true or false',
    customValuesIsNotArray: 'CustomValues should be array',
    //someValuesAreIgnored: 'If options customValues is defined min, max are ignored'
}

function validateModel(options: IModelOptions): IWarnings {

    let warns: IWarnings = {};

    let numbers: number[] = [options.min, options.max, options.step];
    if (options.range) {
        numbers.push(options.range[0], options.range[1]);
    } else {
        numbers.push(options.value);
    }


    if ( !validateNumbers(numbers) ) { 
        warns.valuesAreNotNumbers = warnings.valuesAreNotNumbers;
    }

    if ( !validateIntegers(numbers) ) {
        warns.valuesAreNotInteger = warnings.valuesAreNotInteger;
    }

    if ( options.min > options.max ) {
        warns.minIsOverMax = warnings.minIsOverMax;
    }

    if ( options.min == options.max ) {
        warns.minIsEqualToMax = warnings.minIsEqualToMax;
    }

    if ( options.range ) {
        if ( !Array.isArray(options.range) || options.range.length != 2 ) {
            warns.wrongRangeLength = warnings.wrongRangeLength;
        }

        if ( options.range[0] > options.range[1] ) {
            warns.wrongOrderInRange = warnings.wrongOrderInRange;
        }
    }

    if ( Math.abs(options.max - options.min) < Math.abs(options.step) ) {
        warns.tooBigStep = warnings.tooBigStep;
    }
    
    if ( options.step == 0 ) {
        warns.stepIsNull = warnings.stepIsNull;
    }

    if ( typeof options.reverse != 'boolean' ) {
        warns.reverseIsNotBoolean = warnings.reverseIsNotBoolean;
    }

    if ( options.customValues ) {
        if ( !Array.isArray(options.customValues) ) {
            warns.customValuesIsNotArray = warnings.customValuesIsNotArray;
        }

/*         if ( (options.customValues.length - 1) != options.max || options.min != 0 ) {
            warns.someValuesAreIgnored = warnings.someValuesAreIgnored;
        } */
    }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if (Object.keys(warns).length == 0) {
        return {};
    }

    return warns;
}



function validateNumbers(numbers: number[]): boolean {
    numbers.forEach(function(item) {
        if( !isNumeric(item) ) { 
            return false;
        }
    });
    return true;
}

function validateIntegers(numbers: number[]): boolean {
    numbers.forEach(function(num) {
        if ( num % 1 != 0 ) { 
            return false;
        }
    });
    return true;
}

export { validateModel }