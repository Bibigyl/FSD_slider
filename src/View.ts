import { IOptions, defaultOptions } from './defaultOptions';
//import { IModel, IModelOptions } from './Model';
import { IObservable, Observable } from './Observer';
import { isNumeric, getNumberOfSteps } from './commonFunctions';
import { validateView, IWarnings } from './validations';
import { IModel, IModelOptions } from './Model';


interface IViewOptions {
    length: string;
    vertical: boolean;
    tooltip: boolean;
    scale: boolean;
}

interface IView extends IObservable {
    //update(message: any): void;
    update(options: IOptions): void;
    rerender(options: IOptions): void;

    getOptions(): IViewOptions;
    getWarnings(): IWarnings;
}

class View extends Observable implements IView  {
    [x: string]: any;

    private _length: string;
    private _vertical: boolean;

    private _slider: HTMLDivElement;
    private _thumb?: HTMLDivElement | undefined;
    private _thumbFirst?: HTMLDivElement | undefined;
    private _thumbLast?: HTMLDivElement | undefined;
    private _bar: HTMLDivElement;
    private _tooltip?: HTMLDivElement | undefined;
    private _tooltipFirst?: HTMLDivElement | undefined;
    private _tooltipLast?: HTMLDivElement | undefined;
    private _scale?: HTMLDivElement | undefined;

    private _activeThumb: HTMLDivElement;
    private _warnings: IWarnings;
    
    constructor(options: IOptions, sliderNode: HTMLDivElement) {

        super();

        options = Object.assign(defaultOptions, options);
        this.validate(options);

        this._slider = sliderNode;
        this._slider.classList.add('slider');

        this.build(options)
    }


/*     public update(message: any): void {

        switch (message.type) {

            case 'NEW_VALUE':

                this.setThumbs(message.options);
                this.setBarPosition();
                if (this._tooltip || this._tooltipFirst) {
                    this.setTooltipValues(message.options);
                }
                break;

            case 'NEW_DATA':

                message.options = Object.assign({}, this.getOptions(), message.options);

                this.validate(message.options);
                this.rebuild(message.options);
                break;
        }
    } */

    public update(options: IOptions): void {
        this.setThumbs(options);
        this.setBarPosition();
        if (this._tooltip || this._tooltipFirst) {
            this.setTooltipValues(options);
        }
    }

    public rerender(options: IOptions): void {
        options = Object.assign({}, this.getOptions(), options);

        this.validate(options);
        this.rebuild(options);
    }



    public getOptions(): IViewOptions {
        let tooltip = !!this._tooltip || !!this._tooltipFirst;
        let scale = !!this._scale;

        return {
            length:  this._length,
            vertical: this._vertical,
            tooltip: tooltip,
            scale: scale            
        }
    }

    public getWarnings(): IWarnings {
        return Object.assign({}, this._warnings);
    }


    private handleThumbDown(event): void {
        // предотвратить запуск выделения (действие браузера)
        event.preventDefault();
        event.stopPropagation();

        this._activeThumb = event.currentTarget;

        document.addEventListener('mousemove', this.handleThumbMove);
        document.addEventListener('mouseup', this.handleThumbUp);
        document.addEventListener('touchmove', this.handleThumbMove);
        document.addEventListener('touchend', this.handleThumbUp);
    }

    private handleThumbMove(event): void {
        let length: number = this.getLengthInPx();
        let offset: number = this.getOffsetInPx();
        let eventPos: number;
        let newThumbPosition: number;
        let index: number;
        
        if (event.touches) {
            eventPos = !this._vertical ? event.touches[0].clientX : event.touches[0].clientY;
        } else {
            eventPos = !this._vertical ? event.clientX : event.clientY;
        }

        newThumbPosition = (eventPos - offset) / length * 100;
        index = this._activeThumb == this._thumbLast ? 1 : 0;

        this.emit({
            type: 'NEW_POSITION',
            index: index,
            percent: newThumbPosition
        });
    }

    private handleSliderClick(event): void {
        let length: number = this.getLengthInPx();
        let offset: number = this.getOffsetInPx();
        let eventPos: number;
        let newThumbPosition: number;
        let index: number;
        
        if (event.touches) {
            eventPos = !this._vertical ? event.touches[0].clientX : event.touches[0].clientY;
        } else {
            eventPos = !this._vertical ? event.clientX : event.clientY;
        }

        newThumbPosition = (eventPos - offset) / length * 100;
        
        if (this._thumb) {
            index = 0;
        } else {
            let topLeft: string = !this._vertical ? 'left' : 'top';

            let firstThumbPos: number = parseInt( this._thumbFirst.style[topLeft] );
            let lastThumbPos: number = parseInt( this._thumbLast.style[topLeft] );

            let isFirstCloser: boolean;
            isFirstCloser = Math.abs(firstThumbPos - newThumbPosition) < Math.abs(lastThumbPos - newThumbPosition);

            index = isFirstCloser ? 0 : 1;
        }

        this.emit({
            type: 'NEW_POSITION',
            index: index,
            percent: newThumbPosition
        });
    }

    private handleThumbUp(event): void {
        document.removeEventListener('mouseup', this.handleThumbUp);
        document.removeEventListener('mousemove', this.handleThumbMove);
        document.removeEventListener('touchend', this.handleThumbUp);
        document.removeEventListener('touchmove', this.handleThumbMove);

        this._activeThumb = undefined;
    }

    private build(options: IOptions): void {

        let validLength: string = this._length || defaultOptions.length;
        this._length = this.getValidLength(options.length, validLength);

        if ( !options.vertical ) {
            this._vertical = false;
            this._slider.style.width = this._length;
            this._slider.style.height = null;
            this._slider.classList.add('slider_horizontal');
            this._slider.classList.remove('slider_vertical');
        } else {
            this._vertical = true;
            this._slider.style.height = this._length;
            this._slider.style.width = null;
            this._slider.classList.add('slider_vertical');
            this._slider.classList.remove('slider_horizontal');          
        }

        this._bar = this.buildNode(this._slider, 'slider__bar');

        this.buildThumbs(options);

        this.setBarPosition();

        if ( options.tooltip ) {
            this.buildTooltips(options);
        }
        
        if ( options.scale ) {
            this.buildScale(options);
        }


        this.handleThumbDown = this.handleThumbDown.bind(this);
        this.handleThumbMove = this.handleThumbMove.bind(this);
        this.handleThumbUp = this.handleThumbUp.bind(this);
        this.handleSliderClick = this.handleSliderClick.bind(this);

        if ( !options.range ) {
            this._thumb.addEventListener("mousedown", this.handleThumbDown);
            this._thumb.addEventListener("touchstart", this.handleThumbDown);
        } else {
            this._thumbFirst.addEventListener("mousedown", this.handleThumbDown);
            this._thumbFirst.addEventListener("touchstart", this.handleThumbDown);

            this._thumbLast.addEventListener("mousedown", this.handleThumbDown);
            this._thumbLast.addEventListener("touchstart", this.handleThumbDown);
        }
        this._slider.addEventListener('click', this.handleSliderClick);
    }

    private rebuild(options: IOptions): void {
        let prevOptions: IViewOptions = this.getOptions();
        options = Object.assign({}, prevOptions, options);

        for (let key in this) {
            if (key != '_slider') {
                try {
                    this[key] = this.removeNode(this[key]);
                } catch {}                
            }
        }
        
        this.build(options);
    }

    private validate(options): void {
        
        this._warnings = {};
        this._warnings = validateView(options);

        if ( Object.keys(this._warnings).length != 0 ) {

            let warnings: IWarnings = Object.assign({}, this._warnings);
            
            this.emit({
                type: 'WARNINGS',
                warnings: warnings
            })
        }
    }

    private buildThumbs(options: IOptions): void {
        if ( !options.range ) {
            this._thumb = this.buildNode(this._slider, 'slider__thumb');
        } else {     
            this._thumbFirst = this.buildNode(this._slider, 'slider__thumb', 'slider__thumb_first');
            this._thumbLast = this.buildNode(this._slider, 'slider__thumb', 'slider__thumb_last');
        }

        this.setThumbs(options);
    }

    private setThumbs(options: IOptions): void {
        let pos: string;

        if ( !options.range ) {
            pos = this.findThumbPosition(options.value, options);
            this.setThumbPosition(this._thumb, pos);

        } else {
            let num: number;
            // если reverse, то левый бегунок - это большее значение
            // т.е. range[1]
            num = !options.reverse ? 0 : 1;
            pos = this.findThumbPosition(options.range[num], options);
            this.setThumbPosition(this._thumbFirst, pos);

            num = num == 0 ? 1 : 0;
            pos = this.findThumbPosition(options.range[num], options);
            this.setThumbPosition(this._thumbLast, pos);
        }
    }

    private setBarPosition(): void {
        let start: number | string;
        let length: number | string;
        let topLeft: string = !this._vertical ? 'left' : 'top';
        let widthHeight: string = !this._vertical ? 'width' : 'height';

        start = this._thumbFirst ? this._thumbFirst.style[topLeft] : '0%';
        length = this._thumbFirst ? 
        this._thumbLast.style[topLeft].slice(0, -1) - this._thumbFirst.style[topLeft].slice(0, -1)  + '%' :
        this._thumb.style[topLeft];

        this._bar.style[topLeft] = start;
        this._bar.style[widthHeight] = length;
    }

    private buildTooltips(options: IOptions): void {

        if (!options.range) { 
            this._tooltip = this.buildNode(this._thumb, 'slider__tooltip');
        } else {
            this._tooltipFirst = this.buildNode(this._thumbFirst, 'slider__tooltip', 'slider__tooltip_first');
            this._tooltipLast = this.buildNode(this._thumbLast, 'slider__tooltip', 'slider__tooltip_last');
        }

        this.setTooltipValues(options);
    }

    private buildScale(options: IOptions): void {
        let scale: HTMLDivElement;
        let division: HTMLDivElement;
        let val: number | string;
        let indent: number | string;
        let length: number = options.max - options.min;

        scale = document.createElement('div');
        scale.classList.add('slider__scale');

        for ( let i: number = 0; i <= getNumberOfSteps(options.min, options.max, options.step); i++ ) {

            if ( !options.reverse ) {
                val = options.min + options.step * i;
                val = Math.min(val, options.max);
            } else {
                val = options.max - options.step * i;
                val = Math.max(val, options.min);
            }

            indent = i * options.step < length ? i * options.step : length; 
            indent = indent / length * 100 + '%';

            val = options.customValues ? options.customValues[val] : val;

            division = document.createElement('div');
            division.classList.add('slider__scale-division');
            division.innerHTML = '<span class="slider__scale-division-text">' + val + '</span>';
            options.vertical ? division.style.top = indent : division.style.left = indent;

            scale.append(division);
        }

        this._slider.prepend(scale);        
        this._scale = scale;
    }

    private setTooltipValues(options: IOptions): void {
        let val: number | string;

        if (!options.range) { 
            val = options.customValues ? options.customValues[options.value] : options.value;
            this._tooltip.textContent = val as string; 
        } else {
            let num: number;
            num = !options.reverse ? 0 : 1;
            val = options.customValues ? options.customValues[options.range[num]] : options.range[num];
            this._tooltipFirst.textContent = val as string;

            num = num == 0 ? 1 : 0;
            val = options.customValues ? options.customValues[options.range[num]] : options.range[num];
            this._tooltipLast.textContent = val as string;
        }
    }

    private setThumbPosition(thumbNode: HTMLDivElement, position: string): void {
        if ( !this._vertical ) {
            thumbNode.style.top = null;
            thumbNode.style.left = position;
        } else {
            thumbNode.style.left = null;
            thumbNode.style.top = position;
        }

        // z index
        if ( this._thumbFirst ) {
            if ( !this._vertical ) {
                if ( (this._thumbFirst.style.left == '100%') || (this._thumbFirst.style.top == '100%') ) {
                    this._thumbFirst.style.zIndex = '1';
                } else {
                    this._thumbFirst.style.zIndex = null;
                }  
            }
        }
    }

    private findThumbPosition(value: number, options: IOptions): string {
        let pos: string;
        pos = !options.reverse ?
        (value - options.min) / (options.max - options.min) * 100 + '%' :
        (options.max - value) / (options.max - options.min) * 100 + '%'
        return pos;
    }

    private removeNode(node: HTMLDivElement): undefined {
        node.remove();
        return undefined;
    }

    private buildNode(parentNode: HTMLDivElement, ...classes: string[]): HTMLDivElement {
        let node: HTMLDivElement = document.createElement('div');     

        for ( let i: number = 1; i < arguments.length; i++ ) {
            node.classList.add(arguments[i]);
        }
        parentNode.append(node);
        return node;
    }
    
    private getValidLength(str: any, validLength: string): string {
        if ( typeof ('' + str) == 'string' ) {
            let r = ('' + str).match(/^\d{1,3}[.,]?\d*(px|em|rem|%|vh|vw)?$/i);
            if ( r && isNumeric(r[0]) ) { 
                return r[0].toLowerCase().replace(',', '.') + 'px';
            } else if ( r ) {
                return r[0].toLowerCase().replace(',', '.');
            } else {
                return validLength
            }
        }
    }

    private getLengthInPx(): number {
        let length: number = !this._vertical ?
        this._slider.offsetWidth :
        this._slider.offsetHeight;

        return length;
    }

    private getOffsetInPx(): number {
        let offset: number = !this._vertical ?
        this._slider.getBoundingClientRect().left :
        this._slider.getBoundingClientRect().top;

        return offset;
    }

}


export { IView, IViewOptions };
export default View;