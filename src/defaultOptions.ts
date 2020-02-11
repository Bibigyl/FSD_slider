import { IModelOptions } from "./Model";
import { IViewOptions } from "./View";

interface IOptions extends IModelOptions, IViewOptions {
    
}

let defaultOptions: IOptions = {
    // Model options
    // в начальных настройках не определены начальное значение или промежуток.
    // если они не указаны пользователем, начальное значение value == min 
    value: 2,
    min: 0,
    max: 32,
    step: 3,
    reverse: false,
    range: null,
    
    length: '540px',
    vertical: false,
    tooltip: true,
    scale: true,
}

export { IOptions };
export { defaultOptions };
