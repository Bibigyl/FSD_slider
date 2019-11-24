export default interface IOptions {
    // Model options
    dataFormat: any;
    value: any;
    minVal: any;
    maxVal: any;
    step: any;    
    reverse: any;
    range: any; 
    customValues?: any;
    valueInCustomValues?: any;
    rangeInCustomValues?: any;


    // View options
    length: any;
    vertical: any;
    tooltip: any;
    tooltipMask: any;
    scale: any;
    scaleStep: any;
    scaleMask: any;
}

var defaultOptions: IOptions = {
    // Model options
    // в range и в min и max слева то, что слева на слайдере
    dataFormat: 'numeric',
    value: null,      // в начальных настройках не определены
    minVal: 0,        // начальное значение или промежуток.
    maxVal: 10,       // если они не указаны пользователем, начальное значение 
    step: 1,          // (value) и позиция бегунка равны минимальному значению
    reverse: false,
    range: null,
    
    length: '300px',
    vertical: false,
    tooltip: false,
    tooltipMask: "val",
    scale: false,
    scaleStep: null,
    scaleMask: "val",
}

export { defaultOptions };
