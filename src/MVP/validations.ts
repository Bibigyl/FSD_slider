import { isNumeric } from './commonFunctions';
import { IModelOptions, IViewOptions } from './options';
import { IModelWarnings, IViewWarnings } from './warnings';

const modelWarnings = {
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
};

const viewWarnings = {
  invalidLength: 'Length should be valid to CSS',
  verticalIsNotBoolean: 'Option vertical should be true or false',
  tooltipIsNotBoolean: 'Option tooltip should be true or false',
  scaleIsNotBoolean: 'Option scale should be true or false',
};


function validateNumbers(numbers: number[]): boolean {
  let isValid: boolean = true;
  numbers.forEach((item) => {
    if (!isNumeric(item)) {
      isValid = false;
    }
  });
  return isValid;
}

function validateIntegers(numbers: number[]): boolean {
  let isValid: boolean = true;
  numbers.forEach((num) => {
    if (num % 1 !== 0) {
      isValid = false;
    }
  });
  return isValid;
}


function validateModel(options: IModelOptions): IModelWarnings {
  const {
    begin, end, range, min, max, step, reverse, customValues,
  } = options;

  const warns: IModelWarnings = {};

  const numbers: number[] = [min, max, step];
  if (begin) { numbers.push(begin); }
  if (end) { numbers.push(end); }


  if (!validateNumbers(numbers)) {
    warns.valuesAreNotNumbers = modelWarnings.valuesAreNotNumbers;
  }

  if (!validateIntegers(numbers)) {
    warns.valuesAreNotInteger = modelWarnings.valuesAreNotInteger;
  }

  if (Number(min) > Number(max)) {
    warns.minIsOverMax = modelWarnings.minIsOverMax;
  }

  if (Number(min) === Number(max)) {
    warns.minIsEqualToMax = modelWarnings.minIsEqualToMax;
  }

  if (!!range && (Number(begin) > Number(end))) {
    warns.beginIsOverEnd = modelWarnings.beginIsOverEnd;
  }

  if (Math.abs(Number(max) - Number(min)) < Math.abs(Number(step))) {
    warns.tooBigStep = modelWarnings.tooBigStep;
  }

  if (Number(step) === 0) {
    warns.stepIsNull = modelWarnings.stepIsNull;
  }

  if (typeof reverse !== 'boolean') {
    warns.reverseIsNotBoolean = modelWarnings.reverseIsNotBoolean;
  }

  if (customValues) {
    if (!Array.isArray(customValues)) {
      warns.customValuesIsNotArray = modelWarnings.customValuesIsNotArray;
    }

    if (!warns.customValuesIsNotArray && customValues.length < 2) {
      warns.customValuesIsTooSmall = modelWarnings.customValuesIsTooSmall;
    }
  }

  return warns;
}


function validateView(options: IViewOptions): IViewWarnings {
  const warns: IViewWarnings = {};
  const {
    length, vertical, tooltip, scale,
  } = options;

  if (!length.match(/^\d{1,3}[.,]?\d*(px|em|rem|%|vh|vw|cm|ex|in|mm|pc|pt|vmin)?$/i)) {
    warns.invalidLength = viewWarnings.invalidLength;
  }

  if (typeof vertical !== 'boolean') {
    warns.verticalIsNotBoolean = viewWarnings.verticalIsNotBoolean;
  }

  if (typeof tooltip !== 'boolean') {
    warns.tooltipIsNotBoolean = viewWarnings.tooltipIsNotBoolean;
  }

  if (typeof scale !== 'boolean') {
    warns.scaleIsNotBoolean = viewWarnings.scaleIsNotBoolean;
  }

  return warns;
}

export {
  validateModel, validateView, validateNumbers, validateIntegers,
  modelWarnings, viewWarnings
};
