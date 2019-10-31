import IOptions from './defaultOptions';
import {IModel} from './Model';

/* interface IViewOptions {
    width?: string;
    height?: string;
    vertical: boolean;
    sliderNode: HTMLElement;
    thumb: HTMLElement;
    tooltip?: boolean;
} */

export interface IView {
    getLenght(): number;
    getVertical(): boolean;
    getTooltipMask(): string;

    getSlider(): HTMLDivElement;
    getThumb(num?: number): HTMLDivElement;
    getTooltip(num?: number): HTMLDivElement;

    setThumbPosition(thumbNode: HTMLDivElement, thumbPosition: number): void;
    setValToTooltip(tooltipNode: HTMLDivElement, val: number | string, mask: string): void;
}

export default class View {

    private _lenght: number;
    private _vertical: boolean;
    private _range: boolean;

    private _slider: HTMLDivElement;
    private _thumb?: HTMLDivElement | undefined;
    private _thumbLeft?: HTMLDivElement | undefined;
    private _thumbRight?: HTMLDivElement | undefined;
    private _tooltip?: HTMLDivElement | undefined;
    private _tooltipLeft?: HTMLDivElement | undefined;
    private _tooltipRight?: HTMLDivElement | undefined;
    private _tooltipMask?: string;


    constructor(model: IModel, options: IOptions, sliderNode: HTMLDivElement) {

        this._slider = sliderNode;
        this._slider.classList.add('slider');
        //model.getRange() ? this._range = true : this._range = false;
        this._range = model.getRange() ? true : false;
        console.log(model.getRange());
        console.log(this._range);

        if ( !this._range ) {
            this._thumb = this.buildThumb(this._slider);
        } else {     
            this._thumbLeft = this.buildThumb(this._slider, 'slider__thumb_left'); 
            this._thumbRight = this.buildThumb(this._slider, 'slider__thumb_right');
        }
        console.log(this._thumbLeft);

        if ( !options.vertical ) {
            this._vertical = false;
            this._slider.style.width = this.widthValidation(options.width);
            this._lenght = this._slider.clientWidth;
            this._slider.classList.add('slider_horizontal');
        } else {
            this._vertical = true;
            this._slider.style.height = this.widthValidation(options.height);
            this._lenght = this._slider.clientHeight;
            this._slider.classList.add('slider_vertical');            
        }
 
        if ( options.tooltip ) {

            // маски для подсказок
            // больший приоритет имеет маска с вычислениями
            // если ее нет, применяется обычная, которая по дефолту возвращает просто val
            // (в формате дат вернется кол-во миллисекунд)
            this._tooltipMask = options.tooltipMaskWithCalc ? options.tooltipMaskWithCalc : options.tooltipMask;

            if (!this._range) {                
                this._tooltip = this.buildTooltip(this._thumb);
                this.setValToTooltip( this._tooltip, model.getTranslatedVal(), this._tooltipMask );   

            } else {          
                this._tooltipLeft = this.buildTooltip(this._thumbLeft, 'slider__tooltip_left');
                this.setValToTooltip( this._tooltipLeft, model.getTranslated( model.getRange()[0] ), this._tooltipMask );  

                this._tooltipRight = this.buildTooltip(this._thumbRight, 'slider__tooltip_right');
                this.setValToTooltip( this._tooltipRight, model.getTranslated( model.getRange()[1] ), this._tooltipMask ); 
            }
        }       
    }

    getLenght(): number {
        if ( !this._vertical ) {
            return this._slider.clientWidth;
        } else {
            return this._slider.clientHeight;
        }    
    }
    getVertical(): boolean {
        return this._vertical;
    }
    getSlider(): HTMLDivElement {
        return this._slider;
    }
    getThumb(num: number = 0): HTMLDivElement {
        if ( num == 0 ) {
            return this._thumb;
        }
        if ( num == 1 ) {
            return this._thumbLeft;
        }
        if ( num == 2 ) {
            return this._thumbRight;
        }
        return this._thumb;
    }
    setThumbPosition(thumbNode: HTMLDivElement, thumbPosition: number): void {
        if ( !this._vertical ) {
            thumbNode.style.left = thumbPosition - thumbNode.offsetWidth/2 + 'px';
        } else {
            thumbNode.style.top = thumbPosition - thumbNode.offsetWidth/2 + 'px';    
        }       
    }
    getTooltip(num: number = 0): HTMLDivElement | undefined {
        if ( this._tooltip ) {
            if ( num == 0 ) {
                return this._tooltip;
            }
            if ( num == 1 ) {
                return this._tooltipLeft;
            }
            if ( num == 2 ) {
                return this._tooltipRight;
            }
            return this._tooltip;
        } else {
            return undefined;
        }
    }
    getTooltipMask(): string {
        return this._tooltipMask;
    }
    setValToTooltip(tooltipNode: HTMLDivElement, val: number | string, mask: string = 'val'): void {
        if ( typeof eval(mask) != 'string') {
            console.warn('Invalid mask for tooltip');
            // функция eval, вопрос с безопасностью, нужно ли ее заменить
            tooltipNode.textContent = '' + val;
        } else {
            tooltipNode.textContent = eval(mask);
        }
    }

    private buildThumb(sliderNode: HTMLDivElement, thumbClass?: string): HTMLDivElement {
        let thumb: HTMLDivElement = document.createElement('div');     
        thumb.classList.add('slider__thumb');
        thumbClass ? thumb.classList.add(thumbClass) : false;
        sliderNode.append(thumb);

        return thumb;
    }

    private buildTooltip(thumbNode: HTMLDivElement, tooltipClass?: string): HTMLDivElement {
        let tooltip: HTMLDivElement = document.createElement('div');
        tooltip.classList.add('slider__tooltip');
        tooltipClass ? tooltip.classList.add(tooltipClass) : false;
        thumbNode.append(tooltip);

        return tooltip;
    }
    
    private widthValidation(str: any) {
        if ( typeof ('' + str) == 'string' ) {
            let r = ('' + str).match(/^\d{1,3}[.,]?\d*(px|em|rem|%)?$/i);
            if ( r && this.isNumeric(r[0]) ) { 
                return r[0].toLowerCase().replace(',', '.') + 'px';
            } else if ( r ) {
                return r[0].toLowerCase().replace(',', '.');
            }
        }
        throw new Error('Width (or height) should be valid to css');
    }

    private isNumeric(n: any): boolean {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }



}