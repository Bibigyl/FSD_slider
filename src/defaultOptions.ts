export default interface IOptions {
    // Model options
    dataFormat: any;
    initialVal: any;
    minVal: any;
    maxVal: any;
    step: any;    
    reverse: any;
    range: any; 
    customValues?: any;
    initialValInCustomValues?: any;
    initialValNumInCustomValues?: any;
    initialRangeInCustomValues?: any;
    initialRangeNumInCustomValues?: any;


    // View options
    width: any;
    height: any; 
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
    initialVal: null, // внимание! в начальных настройках не определены
    minVal: 0,        // начальное значение или промежуток.
    maxVal: 10,       // если они не указаны пользователем, начальное значение 
    step: 1,          // (initialVal) и позиция бегунка равны минимальному значению
    reverse: false,
    range: null,
    
    width: '300px',
    height: '300px',
    vertical: false,
    tooltip: false,
    tooltipMask: "val",
    scale: false,
    scaleStep: null,
    scaleMask: "val",
}

export { defaultOptions };
