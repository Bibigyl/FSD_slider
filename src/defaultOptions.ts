export default interface IOptions {
    width: number | string;
    step: number;
    minVal: number;
    maxVal: number;
    initialVal: number;
    dataFormat: string;
}

var defaultOptions: IOptions = {
    width: '377px',
    step: 1,
    minVal: 0,
    maxVal: 10,
    initialVal: 1,
    dataFormat: 'numeric',
}

export { defaultOptions };