import { IModelOptions, IViewOptions } from './options';
import { IModelWarnings, IViewWarnings } from './warnings';
declare const modelWarnings: {
    valuesAreNotNumbers: string;
    valuesAreNotInteger: string;
    minIsOverMax: string;
    minIsEqualToMax: string;
    beginIsOverEnd: string;
    tooBigStep: string;
    stepIsNull: string;
    reverseIsNotBoolean: string;
    customValuesIsNotArray: string;
    customValuesIsTooSmall: string;
};
declare const viewWarnings: {
    invalidLength: string;
    verticalIsNotBoolean: string;
    tooltipIsNotBoolean: string;
    scaleIsNotBoolean: string;
};
declare function validateNumbers(numbers: number[]): boolean;
declare function validateIntegers(numbers: number[]): boolean;
declare function validateModel(options: IModelOptions): IModelWarnings;
declare function validateView(options: IViewOptions): IViewWarnings;
export { validateModel, validateView, validateNumbers, validateIntegers, modelWarnings, viewWarnings };
