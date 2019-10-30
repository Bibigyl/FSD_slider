import IOptions from './defaultOptions';

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
    getThumb(): HTMLDivElement;
    getTooltip(): HTMLDivElement;
    getTooltipMask(): string;

    setThumbPosition(thumbPosition: number): void;
    setValToTooltip(tooltipNode: HTMLDivElement, val: string, mask: string): void;
}

export default class View {

    private _lenght: number;
    private _vertical: boolean;

    private _slider: HTMLDivElement;
    private _thumb: HTMLDivElement;
    private _tooltip?: HTMLDivElement;
    private _tooltipMask?: string;


    constructor(options: IOptions, sliderNode: HTMLDivElement) {

        this._slider = this.buildSlider(sliderNode);
        this._thumb = this._slider.querySelector('.slider__thumb');

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
            this.buildTooltip(this._slider);
            this._tooltip = this._slider.querySelector('.slider__tooltip');

            // маски для подсказок
            // больший приоритет имеет маска с вычислениями
            // если ее нет, применяется обычная, которая по дефолту возвращает просто val
            // (в числовом формате вернется кол-во секунд)
            options.tooltipMaskWithCalc ? this._tooltipMask = options.tooltipMaskWithCalc : this._tooltipMask = options.tooltipMask;
        }
        
        // удалить
        //this.setValToTooltip(this._slider, '12fgdgdgdx3', options.tooltipMask);
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
    getThumb(): HTMLDivElement {
        return this._thumb;
    }
    setThumbPosition(thumbPosition): void {
        if ( !this._vertical ) {
            this._thumb.style.left = thumbPosition - this._thumb.offsetWidth/2 + 'px';
        } else {
            this._thumb.style.top = thumbPosition - this._thumb.offsetWidth/2 + 'px';    
        }       
    }
    getTooltip(): HTMLDivElement | undefined {
        if ( this._tooltip ) {
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

    private buildSlider(sliderNode: HTMLDivElement): HTMLDivElement {
        let thumb: HTMLDivElement = document.createElement('div');
        
        sliderNode.classList.add('slider');
        thumb.classList.add('slider__thumb');

        sliderNode.append(thumb);

        return sliderNode;
    }

    private buildTooltip(sliderNode: HTMLDivElement): void {
        let tooltip: HTMLDivElement = document.createElement('div');
        tooltip.classList.add('slider__tooltip');

        sliderNode.querySelector('.slider__thumb').append(tooltip);
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