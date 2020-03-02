import { IModelOptions } from "./Model";
import { isNumeric } from "./commonFunctions";

interface IWarnings {
    valuesAreNotNumbers?: string,
    valuesAreNotInteger?: string,
    minIsOverMax?: string,
    minIsEqualToMax?: string,
    beginIsOverEnd?: string,
    tooBigStep?: string,
    stepIsNull?: string,
    reverseIsNotBoolean?: string,
    customValuesIsNotArray?: string,
    customValuesIsTooSmall? : string,

    invalidLength?: string,
    verticalIsNotBoolean?: string,
    tooltipIsNotBoolean?: string,
    scaleIsNotBoolean?: string,
}

let warnings: IWarnings = {
    valuesAreNotNumbers: 'All values, instead of customValues, should be numbers',
    valuesAreNotInteger: 'All values, instead of customValues, should be integer',
    minIsOverMax: 'Min value should be less then max value',
    minIsEqualToMax: 'Min value cant be equal to max value',
    beginIsOverEnd: 'Begin value should be less then end value',
    tooBigStep: 'Step should be less then difference of max and min values',
    stepIsNull: 'Step cant be equal to 0',
    reverseIsNotBoolean: 'Option reverse should be true or false',
    customValuesIsNotArray: 'CustomValues should be array',
    customValuesIsTooSmall: 'CustomValues should contain at least two values',

    invalidLength: 'Length should be valid to CSS',
    verticalIsNotBoolean: 'Option vertical should be true or false',
    tooltipIsNotBoolean: 'Option tooltip should be true or false',
    scaleIsNotBoolean: 'Option scale should be true or false',
}

function validateModel(options: IModelOptions): IWarnings {

    let {begin, end, range, min, max, step, reverse, customValues} = options;

    let warns: IWarnings = {};

    let numbers: number[] = [min, max, step];
    if (begin) { numbers.push(begin) }
    if (end) { numbers.push(end) }


    if ( !validateNumbers(numbers) ) { 
        warns.valuesAreNotNumbers = warnings.valuesAreNotNumbers;
    }

    if ( !validateIntegers(numbers) ) {
        warns.valuesAreNotInteger = warnings.valuesAreNotInteger;
    }

    if ( min > max ) {
        warns.minIsOverMax = warnings.minIsOverMax;
    }

    if ( min == max ) {
        warns.minIsEqualToMax = warnings.minIsEqualToMax;
    }


    if ( range && (begin > end) ) {
        warns.beginIsOverEnd = warnings.beginIsOverEnd;
    }

    if ( Math.abs(max - min) < Math.abs(step) ) {
        warns.tooBigStep = warnings.tooBigStep;
    }
    
    if ( step == 0 ) {
        warns.stepIsNull = warnings.stepIsNull;
    }

    if ( typeof reverse != 'boolean' ) {
        warns.reverseIsNotBoolean = warnings.reverseIsNotBoolean;
    }

    if ( customValues ) {
        if ( !Array.isArray(customValues) ) {
            warns.customValuesIsNotArray = warnings.customValuesIsNotArray;
        }

        if ( !warns.customValuesIsNotArray && customValues.length < 2 ) {
            warns.customValuesIsTooSmall = warnings.customValuesIsTooSmall;
        }
    }

    return warns;
}

function validateNumbers(numbers: number[]): boolean {
    let isValid: boolean = true;
    numbers.forEach(function(item) { 
        if( !isNumeric(item) ) { 
            isValid = false;
        }
    });
    return isValid;
}

function validateIntegers(numbers: number[]): boolean {
    let isValid: boolean = true;
    numbers.forEach(function(num) {
        if ( num % 1 != 0 ) { 
            isValid = false;
        }
    });
    return isValid;
}



function validateView(options): IWarnings {
    let warns: IWarnings = {};
    let {length, vertical, tooltip, scale} = options;

    if ( !length.match(/^\d{1,3}[.,]?\d*(px|em|rem|%|vh|vw)?$/i) ) {
        warns.invalidLength = warnings.invalidLength;
    }

    if ( typeof vertical != 'boolean' ) {
        warns.verticalIsNotBoolean = warnings.verticalIsNotBoolean;
    }

    if ( typeof tooltip != 'boolean' ) {
        warns.tooltipIsNotBoolean = warnings.tooltipIsNotBoolean;
    }

    if ( typeof scale != 'boolean' ) {
        warns.scaleIsNotBoolean = warnings.scaleIsNotBoolean;
    }

    return warns;
}

export { validateModel, validateView, IWarnings }