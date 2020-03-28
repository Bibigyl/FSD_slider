import { IObservable, Observable, ViewMessage } from './Observable';
import { IModelOptions, IViewOptions } from './options';
import { IViewWarnings } from './warnings';
interface IView extends IObservable {
    update(options: IModelOptions): void;
    rerender(options: IModelOptions): void;
    getOptions(): IViewOptions;
    getWarnings(): IViewWarnings;
}
declare class View extends Observable<ViewMessage, undefined> implements IView {
    private length;
    private vertical;
    private slider;
    private thumbFirst;
    private thumbLast;
    private bar;
    private tooltipFirst;
    private tooltipLast;
    private scale;
    private activeThumb;
    private warnings;
    constructor(opts: {}, sliderNode: HTMLElement);
    update(options: IModelOptions): void;
    rerender(opts: IModelOptions): void;
    getOptions(): IViewOptions;
    getWarnings(): IViewWarnings;
    private handleThumbDown;
    private handleThumbMove;
    private handleSliderClick;
    private handleThumbUp;
    private build;
    private rebuild;
    private handleWarnings;
    private buildThumbs;
    private setThumbs;
    private setBar;
    private buildTooltips;
    private buildScale;
    private setTooltipValues;
    private setThumbPosition;
    private getLengthInPx;
    private getOffsetInPx;
    static getValidLength(str: string, validLength: string): string;
    static buildNode(parentNode: HTMLElement, ...classes: string[]): HTMLElement;
    static findThumbPosition(value: number, options: IModelOptions): string;
}
export { IView };
export default View;
