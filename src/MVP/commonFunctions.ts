function isNumeric(n: any): boolean {
    return !isNaN(parseFloat(String(n))) && !isNaN(n - 0);
}

function deepEqual(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
    return JSON.stringify(obj1)===JSON.stringify(obj2);
 }

function getNumberOfSteps(min: number, max: number, step: number): number {
    return Math.ceil((max - min) / step);
}

export { isNumeric, getNumberOfSteps, deepEqual };
