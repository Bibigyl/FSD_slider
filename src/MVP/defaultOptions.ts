import { IModelOptions } from "./Model";
import { IViewOptions } from "./View";

interface IOptions extends IModelOptions, IViewOptions {}

let defaultOptions: IOptions = {
    begin: null,
    end: null,
    range: false,
    min: 0,
    max: 10,
    step: 1,
    reverse: false,
    
    length: '300px',
    vertical: false,
    tooltip: true,
    scale: true,
}

export { IOptions };
export { defaultOptions };
