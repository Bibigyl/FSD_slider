export default interface IOptions {
    // Model options
    //dataFormat: string;
    value: number | null;
    min: number;
    max: number;
    step: number;    
    reverse: boolean;
    range: [number, number] | null; 
    customValues?: string[];
    //valueInCustomValues?: string;
    //rangeInCustomValues?: string;


    // View options
    length: string | number;
    vertical: boolean;
    tooltip: boolean;
    //tooltipMask: string;
    scale: boolean;
    //scaleStep: number;
    //scaleMask: string;
}

var defaultOptions: IOptions = {
    // Model options
    // в range и в min и max слева то, что слева на слайдере
    //dataFormat: 'numeric',
    value: 7,      // в начальных настройках не определены
    min: 7,        // начальное значение или промежуток.
    max: -1,       // если они не указаны пользователем, начальное значение 
    step: 2,          // (value) и позиция бегунка равны минимальному значению
    reverse: false,
    range: null,
    
    length: '300px',
    vertical: false,
    tooltip: false,
    //tooltipMask: "val",
    scale: false,
    //scaleStep: null,
    //scaleMask: "val",
}

export { defaultOptions };
