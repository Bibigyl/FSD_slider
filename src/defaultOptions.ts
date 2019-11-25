export default interface IOptions {
    // Model options
    dataFormat: string;
    value: number | string | null;
    minVal: number | string;
    maxVal: number | string;
    step: number;    
    reverse: boolean;
    range: [number, number] | [string, string] | null; 
    customValues?: string[];
    valueInCustomValues?: string;
    rangeInCustomValues?: string;


    // View options
    length: string | number;
    vertical: boolean;
    tooltip: boolean;
    tooltipMask: string;
    scale: boolean;
    scaleStep: number;
    scaleMask: string;
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
