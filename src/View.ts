import IOptions, { defaultOptions } from './defaultOptions';

interface IViewOptions {
    width?: string;
    height?: string;
    vertical: boolean;
    sliderNode: HTMLElement;
    thumb: HTMLElement;
    tooltip?: boolean;
}

export default class View {

    private _width?: string;
    private _height?: string;
    private _slider: HTMLDivElement;
    private _vertical: boolean;
    private _tooltip?: boolean;

    constructor(options: IOptions, sliderNode: HTMLDivElement) {
        if ( options.vertical && this.widthValidation(options.height) ) {
            this._height = options.height;
            this._vertical = true;
        } else {
            this._width = this.widthValidation(options.width);
            this._vertical = false;
        }

        this._slider = this.buildSlider(sliderNode);

        if ( options.tooltip ) {
            this.buildTooltip(this._slider);
            this._tooltip = options.tooltip;
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

    private setValToTooltip(sliderNode: HTMLDivElement, val: string): void {
        sliderNode.querySelector('.tooltip').textContent = val;
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

    private setWidthToSlider(width: string, node: HTMLDivElement): void {
        node.style.width = width;
    }

    private isNumeric(n: any): boolean {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }



}