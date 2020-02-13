import { IModelOptions } from "./Model";
import { IViewOptions } from "./View";

interface IOptions extends IModelOptions, IViewOptions {}

let defaultOptions: IOptions = {
    // Model options
    // в начальных настройках не определены начальное значение или промежуток.
    // если они не указаны пользователем, начальное значение value == min 
    value: null,
    min: 0,
    max: 10,
    step: 1,
    reverse: false,
    range: null,
    
    length: '300px',
    vertical: false,
    tooltip: false,
    scale: false,
}

export { IOptions };
export { defaultOptions };
