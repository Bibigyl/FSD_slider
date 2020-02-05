export default interface IOptions {
    // Model options
    value: number | null;
    min: number;
    max: number;
    step: number;    
    reverse: boolean;
    range: [number, number] | null; 
    customValues?: string[];


    // View options
    length: string | number;
    vertical: boolean;
    tooltip: boolean;
    scale: boolean;
}

var defaultOptions: IOptions = {
    // Model options
    // в начальных настройках не определены начальное значение или промежуток.
    // если они не указаны пользователем, начальное значение value == min 
    value: -20,
    min: -20,
    max: 7,
    step: 5,
    reverse: false,
    range: null,
    
    length: '300px',
    vertical: true,
    tooltip: true,
    scale: true,
}

export { defaultOptions };
