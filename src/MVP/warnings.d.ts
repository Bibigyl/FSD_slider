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
    customValuesIsTooSmall?: string;
}
interface IViewWarnings {
    invalidLength?: string;
    verticalIsNotBoolean?: string;
    tooltipIsNotBoolean?: string;
    scaleIsNotBoolean?: string;
}
interface IWarnings extends IModelWarnings, IViewWarnings {
}
export { IModelWarnings, IViewWarnings, IWarnings };
