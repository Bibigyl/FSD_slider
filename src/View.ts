import IOptions from './defaultOptions';

interface IViewOptions {
    width?: string;
    height?: string;
    vertical: boolean;
    sliderNode: HTMLElement;
    thumb: HTMLElement;
    tooltip?: boolean;
}

export interface IView {
    getWidth(): string;
    getHeight(): string;
    getVertical(): boolean;

    getSlider(): HTMLDivElement;
    getThumb(): HTMLDivElement;
    getTooltip(): HTMLDivElement;

    setThumbPosition(thumbPosition: number): void;
}

export default class View {

    private _width?: string;
    private _height?: string;
    private _vertical: boolean;

    private _slider: HTMLDivElement;
    private _thumb: HTMLDivElement;
    private _tooltip?: HTMLDivElement;


    constructor(options: IOptions, sliderNode: HTMLDivElement) {

        this._slider = this.buildSlider(sliderNode);
        this._thumb = this._slider.querySelector('.thumb');

        if ( options.vertical == true ) {
            this._height = this.widthValidation(options.height);
            this._vertical = true;
            this.setHeightToSlider(this._slider, this._height);
        } else {
            this._width = this.widthValidation(options.width);
            this._vertical = false;
            this.setWidthToSlider(this._slider, this._width);
        }
 
        if ( options.tooltip ) {
            this.buildTooltip(this._slider);
            this._tooltip = this._slider.querySelector('.tooltip');

            // удалить
            this.setValToTooltip(this._slider, '123', options.tooltipMask);
        }
        
    }

    getWidth(): string {
        return this._width;
    }
    getHeight(): string {
        return this._height;
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

    private buildSlider(sliderNode: HTMLDivElement): HTMLDivElement {
        let thumb: HTMLDivElement = document.createElement('div');
        
        sliderNode.classList.add('slider');
        thumb.classList.add('thumb');

        sliderNode.append(thumb);

        return sliderNode;
    }

    private buildTooltip(sliderNode: HTMLDivElement): void {
        let tooltip: HTMLDivElement = document.createElement('div');
        tooltip.classList.add('tooltip');

        sliderNode.querySelector('.thumb').append(tooltip);
    }

    private setValToTooltip(sliderNode: HTMLDivElement, val: string, mask: string = 'val'): void {
        console.log(eval(mask));
        if ( typeof eval(mask) != 'string') {
            console.warn('Invalid mask for tooltip');
            // функция eval, вопрос с безопасностью, нужно ли ее заменить
            sliderNode.querySelector('.tooltip').textContent = val;
        } else {
            sliderNode.querySelector('.tooltip').textContent = eval(mask);
        }
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

    private setWidthToSlider(node: HTMLDivElement, width: string): void {
        node.style.width = width;
    }

    private setHeightToSlider(node: HTMLDivElement, height: string): void {
        node.style.height = height;
    }

    private isNumeric(n: any): boolean {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }



}