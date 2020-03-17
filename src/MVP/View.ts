import { IOptions, defaultOptions } from './defaultOptions';
import { IObservable, Observable, ViewMessage } from './Observer';
import { isNumeric, getNumberOfSteps } from './commonFunctions';
import { validateView, IViewWarnings } from './validations';
import { IModelOptions } from './Model';


interface IViewOptions {
    length: string;
    vertical: boolean;
    tooltip: boolean;
    scale: boolean;
}

interface IView extends IObservable {
    update(options: IModelOptions): void;
    rerender(options: IModelOptions): void;

    getOptions(): IViewOptions;
    getWarnings(): IViewWarnings;
}

class View extends Observable<ViewMessage> implements IView  {
    [x: string]: any;

    private _length: string = defaultOptions.length;
    private _vertical: boolean = defaultOptions.vertical;

    private _slider: HTMLDivElement;
    private _thumbFirst!: HTMLDivElement;
    private _thumbLast!: HTMLDivElement;
    private _bar!: HTMLDivElement;
    private _tooltipFirst?: HTMLDivElement | null;
    private _tooltipLast?: HTMLDivElement | null;
    private _scale?: HTMLDivElement | null;

    private _activeThumb: HTMLDivElement | null = null;
    private _warnings: IViewWarnings | null = null;
    
    constructor(opts: {}, sliderNode: HTMLDivElement) {

        super();

        const options: IOptions = Object.assign({}, defaultOptions, opts);
        this.validate(options);

        this._slider = sliderNode;
        this._slider.classList.add('slider');

        this.build(options)
    }


    public update(options: IModelOptions): void {
        this.setThumbs(options);
        this.setBarPosition();
        if (this._tooltip || this._tooltipFirst) {
            this.setTooltipValues(options);
        }
    }


    public rerender(opts: IModelOptions): void {
        const options: IOptions = Object.assign({}, this.getOptions(), opts);

        this.validate(options);
        this.rebuild(options);
    }


    public getOptions(): IViewOptions {
        const tooltip = Boolean(this._tooltip) || Boolean(this._tooltipFirst);
        const scale = Boolean(this._scale);

        return {
            length:  this._length,
            vertical: this._vertical,
            tooltip: tooltip,
            scale: scale            
        }
    }


    public getWarnings(): IViewWarnings {
        return Object.assign({}, this._warnings);
    }


    private handleThumbDown(event: MouseEvent | TouchEvent): void {
        event.preventDefault();
        event.stopPropagation();

        this._activeThumb = event.currentTarget as HTMLDivElement;

        document.addEventListener('mousemove', this.handleThumbMove);
        document.addEventListener('mouseup', this.handleThumbUp);
        document.addEventListener('touchmove', this.handleThumbMove);
        document.addEventListener('touchend', this.handleThumbUp);
    }


    private handleThumbMove(event: MouseEvent | TouchEvent): void {

        const length: number = this.getLengthInPx();
        const offset: number = this.getOffsetInPx();
        let eventPos: number;

        if (event.type == 'mousemove') {
            const mouseEvent: MouseEvent = event as MouseEvent;
            eventPos = !this._vertical ? mouseEvent.clientX : mouseEvent.clientY;
            
        } else {
            const touchEvent: TouchEvent = event as TouchEvent;
            eventPos = !this._vertical ? touchEvent.touches[0].clientX : touchEvent.touches[0].clientY;
        }

        const newThumbPosition: number = (eventPos - offset) / length;
        

        if ( this._activeThumb == this._thumbLast ) {

            this.notify({
                type: 'LAST_THUMB_MOVED',
                offsetRacio: newThumbPosition
            });

        } else {

            this.notify({
                type: 'FIRST_THUMB_MOVED',
                offsetRacio: newThumbPosition
            });

        }
    }


    private handleSliderClick(event: MouseEvent): void {
        const length: number = this.getLengthInPx();
        const offset: number = this.getOffsetInPx();
        const eventPos: number = !this._vertical ? event.clientX : event.clientY;
        const newThumbPosition: number = (eventPos - offset) / length;
        let isLastMoved: boolean;


        if ( this._thumbFirst.classList.contains('slider__thumb_disabled') ) {
            isLastMoved = true;
        } else if ( this._thumbLast.classList.contains('slider__thumb_disabled') ) {
            isLastMoved = false;
        } else {
            const styleNameOfStart: 'left' | 'top' = !this._vertical ? 'left' : 'top';

            const firstThumbPos: number = parseFloat( String(this._thumbFirst.style[styleNameOfStart]) );
            const lastThumbPos: number = parseFloat( String(this._thumbLast.style[styleNameOfStart]) );

            const isLastCloser: boolean = Math.abs(firstThumbPos/100 - newThumbPosition) > Math.abs(lastThumbPos/100 - newThumbPosition);

            isLastMoved = isLastCloser;            
        }

        if ( isLastMoved ) {

            this.notify({
                type: 'LAST_THUMB_MOVED',
                offsetRacio: newThumbPosition
            });

        } else {

            this.notify({
                type: 'FIRST_THUMB_MOVED',
                offsetRacio: newThumbPosition
            });

        }
    }

    private handleThumbUp(): void {
        document.removeEventListener('mouseup', this.handleThumbUp);
        document.removeEventListener('mousemove', this.handleThumbMove);
        document.removeEventListener('touchend', this.handleThumbUp);
        document.removeEventListener('touchmove', this.handleThumbMove);

        this._activeThumb = null;
    }

    private build(options: IOptions): void {

        const validLength: string = this._length || defaultOptions.length;
        this._length = this.getValidLength(options.length, validLength);

        if ( !options.vertical ) {
            this._vertical = false;
            this._slider.style.width = this._length;
            this._slider.style.height = '';
            this._slider.classList.add('slider_horizontal');
            this._slider.classList.remove('slider_vertical');
        } else {
            this._vertical = true;
            this._slider.style.height = this._length;
            this._slider.style.width = '';
            this._slider.classList.add('slider_vertical');
            this._slider.classList.remove('slider_horizontal');          
        }

        this._bar = this.buildNode(this._slider, 'slider__bar');

        this.buildThumbs(options);

        this.setBarPosition();

        if ( options.tooltip ) {
            this.buildTooltips(options);
        } else {
            this._tooltipFirst = null;
            this._tooltipLast = null;
        }
        
        if ( options.scale ) {
            this.buildScale(options);
        } else {
            this._scale = null;
        }


        this.handleThumbDown = this.handleThumbDown.bind(this);
        this.handleThumbMove = this.handleThumbMove.bind(this);
        this.handleThumbUp = this.handleThumbUp.bind(this);
        this.handleSliderClick = this.handleSliderClick.bind(this);


        this._thumbFirst.addEventListener("mousedown", this.handleThumbDown);
        this._thumbFirst.addEventListener("touchstart", this.handleThumbDown);

        this._thumbLast.addEventListener("mousedown", this.handleThumbDown);
        this._thumbLast.addEventListener("touchstart", this.handleThumbDown);

        this._slider.addEventListener('click', this.handleSliderClick);
    }

    private rebuild(opts: IModelOptions): void {
        const prevOptions: IViewOptions = this.getOptions();
        const options: IOptions = Object.assign({}, prevOptions, opts);

        for (const key in this) {
            if (key != '_slider') {
                try {
                    this[key].remove();
                } catch {
                    continue;
                }                
            }
        }
        
        this.build(options);
    }

    private validate(options: IViewOptions): void {
        
        this._warnings = {};
        this._warnings = validateView(options);

        if ( Object.keys(this._warnings).length == 0 ) { return }
        const warnings: IViewWarnings = Object.assign({}, this._warnings);
        
        this.notify({
            type: 'WARNINGS',
            warnings: warnings
        });
    }

    private buildThumbs(options: IOptions): void {
        const { range, reverse } = options;
        this._thumbFirst = this.buildNode(this._slider, 'slider__thumb', 'slider__thumb_first');
        this._thumbLast = this.buildNode(this._slider, 'slider__thumb', 'slider__thumb_last');

        if ( !range ) {
            if ( !reverse ) {
                this._thumbFirst.classList.add('slider__thumb_disabled');
            } else {
                this._thumbLast.classList.add('slider__thumb_disabled');
            }
        }

        this.setThumbs(options);
    }

    private setThumbs(options: IModelOptions): void {
        const { begin, end, reverse } = options;
        const beginPosition: string = this.findThumbPosition(begin, options);
        const endPosition: string = this.findThumbPosition(end, options);

        if ( !reverse ) {
            this.setThumbPosition(this._thumbFirst, beginPosition);
            this.setThumbPosition(this._thumbLast, endPosition);
        } else {
            this.setThumbPosition(this._thumbFirst, endPosition);
            this.setThumbPosition(this._thumbLast, beginPosition);
        }
    }

    private setBarPosition(): void {
        const styleNameOfStart: 'top' | 'left' = !this._vertical ? 'left' : 'top';
        const styleNameOfLength: 'width' | 'height' = !this._vertical ? 'width' : 'height';

        const start = String(this._thumbFirst.style[styleNameOfStart]);
        const length: string = parseFloat( String(this._thumbLast.style[styleNameOfStart]) ) - parseFloat(start)  + '%';

        this._bar.style[styleNameOfStart] = start;
        this._bar.style[styleNameOfLength] = length;
    }

    private buildTooltips(options: IOptions): void {
        this._tooltipFirst = this.buildNode(this._thumbFirst, 'slider__tooltip', 'slider__tooltip_first');
        this._tooltipLast = this.buildNode(this._thumbLast, 'slider__tooltip', 'slider__tooltip_last');

        this.setTooltipValues(options);
    }

    private buildScale(options: IOptions): void {
        const { min, max, step, reverse, customValues } = options;
        let division: HTMLDivElement;
        let val: number | string;
        let indent: number | string;
        const length: number = max - min;

        const scale: HTMLDivElement = document.createElement('div');
        scale.classList.add('slider__scale');

        for ( let i = 0; i <= getNumberOfSteps(min, max, step); i++ ) {

            if ( !reverse ) {
                val = min + step * i;
                val = Math.min(val, max);
            } else {
                val = max - step * i;
                val = Math.max(val, min);
            }

            indent = Math.min( i * step, length )
            indent = indent / length * 100 + '%';

            val = customValues ? customValues[val] : val;

            division = document.createElement('div');
            division.classList.add('slider__scale-division');
            division.innerHTML = `<span class="slider__scale-division-text">${val}</span>`;
            options.vertical ? division.style.top = indent : division.style.left = indent;

            scale.append(division);
        }

        this._slider.prepend(scale);        
        this._scale = scale;
    }

    private setTooltipValues(options: IModelOptions): void {
        const { begin, end, reverse, customValues } = options;
        const beginValue: string = customValues ? customValues[begin] : String(begin);
        const endValue: string = customValues ? customValues[end] : String(end);
        const first: HTMLDivElement = this._tooltipFirst as HTMLDivElement;
        const last: HTMLDivElement = this._tooltipLast as HTMLDivElement;

        if (!reverse) {
            first.textContent = beginValue;
            last.textContent = endValue;
        } else {
            first.textContent = endValue;
            last.textContent = beginValue;
        }
    }

    private setThumbPosition(thumbNode: HTMLDivElement, position: string): void {
        if ( !this._vertical ) {
            thumbNode.style.top = '';
            thumbNode.style.left = position;
        } else {
            thumbNode.style.left = '';
            thumbNode.style.top = position;
        }


        // z index
        if ( this._thumbFirst ) {
            if ( (this._thumbFirst.style.left == '100%') || (this._thumbFirst.style.top == '100%') ) {
                this._thumbFirst.style.zIndex = '1';
            } else {
                this._thumbFirst.style.zIndex = '';
            }
        }
    }

    private findThumbPosition(value: number, options: IModelOptions): string {
        const { min, max, reverse } = options;
        const position: string = !reverse ?
        (value - min) / (max - min) * 100 + '%' :
        (max - value) / (max - min) * 100 + '%'
        return position;
    }

    private buildNode(parentNode: HTMLElement, ...classes: string[]): HTMLDivElement {
        const node: HTMLDivElement = document.createElement('div');

        classes.forEach(function(currenClass: string) {
            node.classList.add(currenClass);
        });

        parentNode.append(node);
        return node;
    }
    
    private getValidLength(str: string, validLength: string): string {

        const CSSLength: string[] | number[] | null = str.match(/^\d{1,3}[.,]?\d*(px|em|rem|%|vh|vw)?$/i);

        if ( CSSLength && isNumeric(CSSLength[0]) ) { 
            return CSSLength[0].toLowerCase().replace(',', '.') + 'px';

        } else if ( CSSLength ) {
            return CSSLength[0].toLowerCase().replace(',', '.');

        } else {
            return validLength;
        }
    }

    private getLengthInPx(): number {
        const length: number = !this._vertical ?
        this._slider.offsetWidth :
        this._slider.offsetHeight;

        return length;
    }

    private getOffsetInPx(): number {
        const offset: number = !this._vertical ?
        this._slider.getBoundingClientRect().left :
        this._slider.getBoundingClientRect().top;

        return offset;
    }
}


export { IView, IViewOptions };
export default View;