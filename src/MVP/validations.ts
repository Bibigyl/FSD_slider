import { IModelOptions } from "./Model";
import { isNumeric } from "./commonFunctions";
import { IViewOptions } from "./View";

interface IWarnings extends IModelWarnings, IViewWarnings {}

interface IModelWarnings {
    valuesAreNotNumbers?: string;
    valuesAreNotInteger?: string;
    minIsOverMax?: string;
    minIsEqualToMax?: string;
    beginIsOverEnd?: string;
    tooBigStep?: string;
    stepIsNull?: string;
    reverseIsNotBoolean?: string;
    customValuesIsNotArray?: string;
    customValuesIsTooSmall? : string;
}

interface IViewWarnings {
    invalidLength?: string;
    verticalIsNotBoolean?: string;
    tooltipIsNotBoolean?: string;
    scaleIsNotBoolean?: string;
}

const modelWarnings: IModelWarnings = {
    valuesAreNotNumbers: 'All values, instead of customValues, should be numbers',
    valuesAreNotInteger: 'All values, instead of customValues, should be integer',
    minIsOverMax: 'Min value should be less then max value',
    minIsEqualToMax: 'Min value cant be equal to max value',
    beginIsOverEnd: 'Begin value should be less then end value',
    tooBigStep: 'Step should be less then difference of max and min values',
    stepIsNull: 'Step cant be equal to 0',
    reverseIsNotBoolean: 'Option reverse should be true or false',
    customValuesIsNotArray: 'CustomValues should be array',
    customValuesIsTooSmall: 'CustomValues should contain at least two values'
}

const viewWarnings: IViewWarnings = {
    invalidLength: 'Length should be valid to CSS',
    verticalIsNotBoolean: 'Option vertical should be true or false',
    tooltipIsNotBoolean: 'Option tooltip should be true or false',
    scaleIsNotBoolean: 'Option scale should be true or false'
}


function validateModel(options: IModelOptions): IModelWarnings {

    const {begin, end, range, min, max, step, reverse, customValues} = options;

    const warns: IModelWarnings = {};

    const numbers: number[] = [min, max, step];
    if (begin) { numbers.push(begin) }
    if (end) { numbers.push(end) }


    if ( !validateNumbers(numbers) ) { 
        warns.valuesAreNotNumbers = modelWarnings.valuesAreNotNumbers;
    }

    if ( !validateIntegers(numbers) ) {
        warns.valuesAreNotInteger = modelWarnings.valuesAreNotInteger;
    }

    if ( min > max ) {
        warns.minIsOverMax = modelWarnings.minIsOverMax;
    }

    if ( min == max ) {
        warns.minIsEqualToMax = modelWarnings.minIsEqualToMax;
    }


    if ( range && (begin > end) ) {
        warns.beginIsOverEnd = modelWarnings.beginIsOverEnd;
    }

    if ( Math.abs(max - min) < Math.abs(step) ) {
        warns.tooBigStep = modelWarnings.tooBigStep;
    }
    
    if ( step == 0 ) {
        warns.stepIsNull = modelWarnings.stepIsNull;
    }

    if ( typeof reverse != 'boolean' ) {
        warns.reverseIsNotBoolean = modelWarnings.reverseIsNotBoolean;
    }

    if ( customValues ) {
        if ( !Array.isArray(customValues) ) {
            warns.customValuesIsNotArray = modelWarnings.customValuesIsNotArray;
        }

        if ( !warns.customValuesIsNotArray && customValues.length < 2 ) {
            warns.customValuesIsTooSmall = modelWarnings.customValuesIsTooSmall;
        }
    }

    return warns;
}

function validateNumbers(numbers: number[]): boolean {
    let isValid = true;
    numbers.forEach(function(item) { 
        if( !isNumeric(item) ) { 
            isValid = false;
        }
    });
    return isValid;
}

function validateIntegers(numbers: number[]): boolean {
    let isValid = true;
    numbers.forEach(function(num) {
        if ( num % 1 != 0 ) { 
            isValid = false;
        }
    });
    return isValid;
}



function validateView(options: IViewOptions): IViewWarnings {
    const warns: IViewWarnings = {};
    const {length, vertical, tooltip, scale} = options;

    if ( !length.match(/^\d{1,3}[.,]?\d*(px|em|rem|%|vh|vw)?$/i) ) {
        warns.invalidLength = viewWarnings.invalidLength;
    }

    if ( typeof vertical != 'boolean' ) {
        warns.verticalIsNotBoolean = viewWarnings.verticalIsNotBoolean;
    }

    if ( typeof tooltip != 'boolean' ) {
        warns.tooltipIsNotBoolean = viewWarnings.tooltipIsNotBoolean;
    }

    if ( typeof scale != 'boolean' ) {
        warns.scaleIsNotBoolean = viewWarnings.scaleIsNotBoolean;
    }

    return warns;
}

export { validateModel, validateView, IWarnings, IModelWarnings, IViewWarnings }