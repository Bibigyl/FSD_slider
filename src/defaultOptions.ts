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
    value: null,
    min: -20,
    max: 7,
    step: 5,
    reverse: false,
    range: [1, 4],
    
    length: '540px',
    vertical: false,
    tooltip: true,
    scale: true,
}

export { defaultOptions };
