import { IOptions } from './defaultOptions';
import { IModel, IModelOptions } from './Model';
import { ISubject, Subject } from './Observer';
import { isNumeric, getNumberOfSteps } from './commonFunctions';


interface IViewOptions {
    length: string | number;
    vertical: boolean;
    tooltip: boolean;
    scale: boolean;
}

interface IView extends ISubject {
    length: string;
    vertical: boolean;

    slider: HTMLDivElement;
    thumb?: HTMLDivElement | undefined;
    thumbFirst?: HTMLDivElement | undefined;
    thumbLast?: HTMLDivElement | undefined;
    line: HTMLDivElement;
    tooltip?: HTMLDivElement | undefined;
    tooltipFirst?: HTMLDivElement | undefined;
    tooltipLast?: HTMLDivElement | undefined;
    scale?: HTMLDivElement | undefined;

    data: IViewOptions;
    update(config: any): void;
    //notify(activeThumb: HTMLDivElement, newThumbPosition: number): void;

    //makeSlimChanges(options): void;
    //makeFullChanges(options): void;
}

class View extends Subject implements IView  {
    [x: string]: any;

    length: string;
    vertical: boolean;
    //numberOfSteps: number;

    slider: HTMLDivElement;
    thumb?: HTMLDivElement | undefined;
    thumbFirst?: HTMLDivElement | undefined;
    thumbLast?: HTMLDivElement | undefined;
    line: HTMLDivElement;
    tooltip?: HTMLDivElement | undefined;
    tooltipFirst?: HTMLDivElement | undefined;
    tooltipLast?: HTMLDivElement | undefined;
    scale?: HTMLDivElement | undefined;

    private _activeThumb: HTMLDivElement;
    
    constructor(options: IOptions, sliderNode: HTMLDivElement) {

        super();

        this.slider = sliderNode;
        this.slider.classList.add('slider');

        this.build(options)
    }

    private build(options: IOptions): void {

        this.length = this.findValidLength(options.length);

        if ( !options.vertical ) {
            this.vertical = false;
            this.slider.style.width = this.length;
            this.slider.style.height = null;
            this.slider.classList.add('slider_horizontal');
            this.slider.classList.remove('slider_vertical');
        } else {
            this.vertical = true;
            this.slider.style.height = this.length;
            this.slider.style.width = null;
            this.slider.classList.add('slider_vertical');
            this.slider.classList.remove('slider_horizontal');          
        }

        this.line = this.buildNode(this.slider, 'slider__line');

        this.buildThumbs(options);

        this.setLinePosition();

        if ( options.tooltip ) {
            this.buildTooltips(options);
        }
        
        if ( options.scale ) {
            this.buildScale(options);
        }

        // события
        this.thumbOnDown = this.thumbOnDown.bind(this);
        this.thumbOnMove = this.thumbOnMove.bind(this);
        this.thumbOnUp = this.thumbOnUp.bind(this);

        if ( !options.range ) {
            this.thumb.addEventListener("mousedown", this.thumbOnDown);
            this.thumb.addEventListener("touchstart", this.thumbOnDown);
        } else {
            this.thumbFirst.addEventListener("mousedown", this.thumbOnDown);
            this.thumbFirst.addEventListener("touchstart", this.thumbOnDown);

            this.thumbLast.addEventListener("mousedown", this.thumbOnDown);
            this.thumbLast.addEventListener("touchstart", this.thumbOnDown);
        }  
    }

    get data(): IViewOptions {
        let tooltip = !!this.tooltip || !!this.tooltipFirst;
        let scale = !!this.scale;

        return {
            length:  this.length,
            vertical: this.vertical,
            tooltip: tooltip,
            scale: scale            
        }
    }

    update(config: any): void {

        switch (config.type) {

            case 'NEW_VALUE':

                this.setThumbs(config.options);
                this.setLinePosition();
                if (this.tooltip || this.tooltipFirst) {
                    this.setTooltipValues(config.options);
                }
                break;

            case 'NEW_DATA':

                this.rebuild(config.options);
                break;
        }
    }

/*     makeSlimChanges(options: IOptions): void {
        this.setThumbs(options);
        this.setLinePosition();
        this.setTooltipValues(options);
    } */

    private rebuild(options: IOptions): void {
        let prevOptions: IViewOptions = this.data;
        options = Object.assign({}, prevOptions, options);

        for (let key in this) {
            if (key != 'slider') {
                try {
                    this[key] = this.removeNode(this[key]);
                } catch {}                
            }
        }
        
        this.build(options);
    }


    private thumbOnDown(event): void {
        // предотвратить запуск выделения (действие браузера)
        event.preventDefault();
        event.stopPropagation();

        this._activeThumb = event.currentTarget;

        document.addEventListener('mousemove', this.thumbOnMove);
        document.addEventListener('mouseup', this.thumbOnUp);
        document.addEventListener('touchmove', this.thumbOnMove);
        document.addEventListener('touchend', this.thumbOnUp);
    }

    private thumbOnMove(event): void {
        let length: number = this.getLengthInPx();
        let offset: number = this.getOffsetInPx();
        let eventPos: number;
        let newThumbPosition: number;
        let index: number;
        
        if (event.touches) {
            eventPos = !this.vertical ? event.touches[0].clientX : event.touches[0].clientY;
        } else {
            eventPos = !this.vertical ? event.clientX : event.clientY;
        }

        newThumbPosition = (eventPos - offset) / length * 100;
        index = this._activeThumb == this.thumbLast ? 1 : 0;

        this.notify({
            type: 'NEW_VALUE_IN_PERCENT',
            index: index,
            percent: newThumbPosition
        });
    }

    private thumbOnUp(event): void {
        document.removeEventListener('mouseup', this.thumbOnUp);
        document.removeEventListener('mousemove', this.thumbOnMove);
        document.removeEventListener('touchend', this.thumbOnUp);
        document.removeEventListener('touchmove', this.thumbOnMove);

        this._activeThumb = undefined;
    }

    private buildThumbs(options: IOptions): void {
        if ( !options.range ) {
            this.thumb = this.buildNode(this.slider, 'slider__thumb');
        } else {     
            this.thumbFirst = this.buildNode(this.slider, 'slider__thumb', 'slider__thumb_first');
            this.thumbLast = this.buildNode(this.slider, 'slider__thumb', 'slider__thumb_last');
        }

        this.setThumbs(options);
    }

    private setThumbs(options: IOptions): void {
        let pos: string;

        if ( !options.range ) {
            pos = this.findThumbPosition(options.value, options);
            this.setThumbPosition(this.thumb, pos);

        } else {
            let num: number;
            // если reverse, то левый бегунок - это большее значение
            // т.е. range[1]
            num = !options.reverse ? 0 : 1;
            pos = this.findThumbPosition(options.range[num], options);
            this.setThumbPosition(this.thumbFirst, pos);

            num = num == 0 ? 1 : 0;
            pos = this.findThumbPosition(options.range[num], options);
            this.setThumbPosition(this.thumbLast, pos);
        }
    }



    private setLinePosition(): void {
        let start: number | string;
        let length: number | string;
        let topLeft: string = !this.vertical ? 'left' : 'top';
        let widthHeight: string = !this.vertical ? 'width' : 'height';

        start = this.thumbFirst ? this.thumbFirst.style[topLeft] : '0%';
        length = this.thumbFirst ? 
        this.thumbLast.style[topLeft].slice(0, -1) - this.thumbFirst.style[topLeft].slice(0, -1)  + '%' :
        this.thumb.style[topLeft];

        this.line.style[topLeft] = start;
        this.line.style[widthHeight] = length;
    }

    private buildTooltips(options: IOptions): void {

        if (!options.range) { 
            this.tooltip = this.buildNode(this.thumb, 'slider__tooltip');
        } else {
            this.tooltipFirst = this.buildNode(this.thumbFirst, 'slider__tooltip', 'slider__tooltip_first');
            this.tooltipLast = this.buildNode(this.thumbLast, 'slider__tooltip', 'slider__tooltip_last');
        }

        this.setTooltipValues(options);
    }

    private buildScale(options: IOptions): void {
        let scale: HTMLDivElement;
        let division: HTMLDivElement;
        let val: number | string;
        //let sign: number = options.reverse ? -1 : 1;
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

        this.slider.prepend(scale);        
        this.scale = scale;
    }

    private setTooltipValues(options: IOptions): void {
        let val: number | string;

        if (!options.range) { 
            val = options.customValues ? options.customValues[options.value] : options.value;
            this.tooltip.textContent = val as string; 
        } else {
            let num: number;
            num = !options.reverse ? 0 : 1;
            val = options.customValues ? options.customValues[options.range[num]] : options.range[num];
            this.tooltipFirst.textContent = val as string;

            num = num == 0 ? 1 : 0;
            val = options.customValues ? options.customValues[options.range[num]] : options.range[num];
            this.tooltipLast.textContent = val as string;
        }
    }


    private setThumbPosition(thumbNode: HTMLDivElement, position: string): void {
        if ( !this.vertical ) {
            thumbNode.style.top = null;
            thumbNode.style.left = position;
        } else {
            thumbNode.style.left = null;
            thumbNode.style.top = position;
        }

        // z index
        if ( this.thumbFirst ) {
            if ( !this.vertical ) {
                if ( (this.thumbFirst.style.left == '100%') || (this.thumbFirst.style.top == '100%') ) {
                    this.thumbFirst.style.zIndex = '1';
                } else {
                    this.thumbFirst.style.zIndex = null;
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
    
    private findValidLength(str: any): string {
        if ( typeof ('' + str) == 'string' ) {
            let r = ('' + str).match(/^\d{1,3}[.,]?\d*(px|em|rem|%|vh|vw)?$/i);
            if ( r && isNumeric(r[0]) ) { 
                return r[0].toLowerCase().replace(',', '.') + 'px';
            } else if ( r ) {
                return r[0].toLowerCase().replace(',', '.');
            }
        }
        throw new Error('Width (or height) should be valid to css');
    }

    private getLengthInPx(): number {
        let length: number = !this.vertical ?
        this.slider.offsetWidth :
        this.slider.offsetHeight;

        return length;
    }

    private getOffsetInPx(): number {
        let offset: number = !this.vertical ?
        this.slider.getBoundingClientRect().left :
        this.slider.getBoundingClientRect().top;

        return offset;
    }


    // observer method

/*     notify(activeThumb: HTMLDivElement, newThumbPosition: number): void {
        for (const observer of this.observers) {
            observer.pushViewChanges(activeThumb, newThumbPosition);
        }
    } */
}


export { IView, IViewOptions };
export default View;