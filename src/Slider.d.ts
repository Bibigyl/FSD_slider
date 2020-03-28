import { IOptions } from './MVP/options';
interface ISlider {
    update(options: {}): void;
    subscribe(func: Function): void;
}
declare class Slider implements ISlider {
    private presenter;
    constructor(options: {}, node: HTMLElement);
    subscribe(func: Function): void;
    update(options: IOptions): void;
}
export { ISlider };
export default Slider;
