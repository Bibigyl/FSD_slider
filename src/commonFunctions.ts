function isNumeric(n: any): boolean {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

function findDecimalPlaces(num: number): number {
    // количество знаков после запятой
    return ~(num + '').indexOf('.') ? (num + '').split('.')[1].length : 0;
}

function getNumberOfSteps(min: number, max: number, step: number): number {
    return Math.ceil( (max - min) / step );
}

export {isNumeric};
export {findDecimalPlaces};
export {getNumberOfSteps};