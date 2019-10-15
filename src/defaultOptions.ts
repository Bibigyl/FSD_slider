export default interface IOptions {
    // Model options
/*     dataFormat: string;
    initialVal: number | string | null;
    minVal: number | string;
    maxVal: number | string;
    step: number;    
    reverse: boolean;
    range: [number, number] | [string, string] | null; 
    customValues?: string[];
    initialValInCustomValues?: string;
    initialValNumInCustomValues?: number;
    initialRangeInCustomValues?: [string, string];
    initialRangeNumInCustomValues?: [number, number]; */
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


    width: number | string;
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
}

export { defaultOptions };