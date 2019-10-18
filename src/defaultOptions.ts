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
    tooltip?: any;
}

var defaultOptions: IOptions = {
    // Model options
    dataFormat: 'numeric',
    initialVal: null, // внимание! в начальных настройках не определены
    minVal: 0,        // начальное значение или промежуток.
    maxVal: 10,       // если они не указаны пользователем, начальное значение 
    step: 1,          // (initialVal) и позиция бегунка равны минимальному значению
    reverse: false,
    range: null,
    
    width: '377px',
    height: '300px',
    vertical: false,
}

export { defaultOptions };