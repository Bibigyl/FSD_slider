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

    findThumbPosition(newStep, numOfSteps): number;
}

export default class View {

    private _lenght: number;
    private _vertical: boolean;
    private _range: boolean;
    private _tooltipMask?: string;

    private _slider: HTMLDivElement;
    private _thumb?: HTMLDivElement | undefined;
    private _thumbLeft?: HTMLDivElement | undefined;
    private _thumbRight?: HTMLDivElement | undefined;
    private _tooltip?: HTMLDivElement | undefined;
    private _tooltipLeft?: HTMLDivElement | undefined;
    private _tooltipRight?: HTMLDivElement | undefined;
    

    constructor(model: IModel, options: IOptions, sliderNode: HTMLDivElement) {

        this._slider = sliderNode;
        this._slider.classList.add('slider');
        this._range = model.getRange() ? true : false;

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

        let pos: number;
        if ( !this._range ) {

            this._thumb = this.buildThumb(this._slider);
            pos = this.findThumbPosition( model.findPositionByStep(model.getVal()), model.numberOfSteps() );
            this.setThumbPosition( this._thumb, pos);
        } else {     

            this._thumbLeft = this.buildThumb(this._slider, 'slider__thumb_left'); 
            pos = this.findThumbPosition( model.findPositionByStep(model.getRange()[0]), model.numberOfSteps() );
            this.setThumbPosition( this._thumbLeft, pos);

            this._thumbRight = this.buildThumb(this._slider, 'slider__thumb_right');
            pos = this.findThumbPosition( model.findPositionByStep(model.getRange()[1]), model.numberOfSteps() );
            this.setThumbPosition( this._thumbRight, pos);
        }
 
        if ( options.tooltip ) {

            // маски для подсказок
            // больший приоритет имеет маска с вычислениями
            // если ее нет, применяется обычная, которая по дефолту возвращает просто val
            // (в формате дат вернется кол-во миллисекунд)
            this._tooltipMask = options.tooltipMaskWithCalc ? options.tooltipMaskWithCalc : options.tooltipMask;
            let val: number | string;

            if (!this._range) { 
                val = model.getCustomValues() ? model.getCustomValues()[model.getVal()] : model.getVal();
                console.log('val = ' + val);     
                this._tooltip = this.buildTooltip(this._thumb);
                this.setValToTooltip( this._tooltip, val, this._tooltipMask );   

            } else {
                val = model.getCustomValues() ? model.getCustomValues()[model.getRange()[0]] : model.getRange()[0];    
                this._tooltipLeft = this.buildTooltip(this._thumbLeft, 'slider__tooltip_left');
                this.setValToTooltip( this._tooltipLeft, val, this._tooltipMask );  

                val = model.getCustomValues() ? model.getCustomValues()[model.getRange()[1]] : model.getRange()[1];   
                this._tooltipRight = this.buildTooltip(this._thumbRight, 'slider__tooltip_right');
                this.setValToTooltip( this._tooltipRight, val, this._tooltipMask ); 
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
    getTooltipMask(): string {
        return this._tooltipMask;
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
    getTooltip(num: number = 0): HTMLDivElement | undefined {
        if ( this._tooltip || this._tooltipLeft ) {
            if ( this._tooltip && num == 0 ) {
                return this._tooltip;
            }
            if ( this._tooltipLeft && num == 1 ) {
                return this._tooltipLeft;
            }
            if ( this._tooltipLeft && num == 2 ) {
                return this._tooltipRight;
            }
        } else {
            return undefined;
        }
    }

    setThumbPosition(thumbNode: HTMLDivElement, thumbPosition: number): void {
        if ( !this._vertical ) {
            thumbNode.style.left = thumbPosition - thumbNode.offsetWidth/2 + 'px';
        } else {
            thumbNode.style.top = thumbPosition - thumbNode.offsetWidth/2 + 'px';    
        }       
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
    findThumbPosition(newStep, numOfSteps): number {
        return this.getLenght() / numOfSteps * newStep;
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