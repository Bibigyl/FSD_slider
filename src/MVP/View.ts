import { IOptions, defaultOptions } from './defaultOptions';
import { IObservable, Observable, ViewMessage } from './Observer';
import { isNumeric, getNumberOfSteps } from './commonFunctions';
import { validateView, IViewWarnings } from './validations';
import { IModelOptions } from './Model';
import bind from 'bind-decorator';


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

    private _length: string = defaultOptions.length;
    private _vertical: boolean = defaultOptions.vertical;

    private _slider: HTMLElement;
    private _thumbFirst!: HTMLElement;
    private _thumbLast!: HTMLElement;
    private _bar!: HTMLElement;
    private _tooltipFirst!: HTMLElement | null;
    private _tooltipLast!: HTMLElement | null;
    private _scale!: HTMLElement | null;

    private _activeThumb: EventTarget | null = null;
    private _warnings: IViewWarnings = {};
    
    constructor(opts: {}, sliderNode: HTMLElement) {

        super();

        const options: IOptions = Object.assign({}, defaultOptions, opts);
        this._warnings = validateView(options);
        this.handleWarnings();

        this._slider = sliderNode;
        this._slider.classList.add('slider');

        this.build(options)
    }


    public update(options: IModelOptions): void {
        this.setThumbs(options);
        this.setBarPosition();
        if (this._tooltipLast) {
            this.setTooltipValues(options);
        }
    }


    public rerender(opts: IModelOptions): void {
        const options: IOptions = Object.assign({}, this.getOptions(), opts);

        this._warnings = validateView(options);
        this.handleWarnings();
        this.rebuild(options);
    }


    public getOptions(): IViewOptions {
        const tooltip = Boolean(this._tooltipLast);
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


    @bind
    private handleThumbDown(event: MouseEvent | TouchEvent): void {
        event.preventDefault();
        event.stopPropagation();

        this._activeThumb = event.currentTarget;

        document.addEventListener('mousemove', this.handleThumbMove);
        document.addEventListener('mouseup', this.handleThumbUp);
        document.addEventListener('touchmove', this.handleThumbMove);
        document.addEventListener('touchend', this.handleThumbUp);
    }


    @bind
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


    @bind
    private handleSliderClick(event: MouseEvent): void {
        const length: number = this.getLengthInPx();
        const offset: number = this.getOffsetInPx();
        const eventPosition: number = !this._vertical ? event.clientX : event.clientY;
        const newThumbPosition: number = (eventPosition - offset) / length;
        let isLastMoved: boolean;


        if ( this._thumbFirst.classList.contains('slider__thumb_disabled') ) {
            isLastMoved = true;
        } else if ( this._thumbLast.classList.contains('slider__thumb_disabled') ) {
            isLastMoved = false;
        } else {
            const styleNameOfStart: 'left' | 'top' = !this._vertical ? 'left' : 'top';

            const firstThumbPosition: number = parseFloat( String(this._thumbFirst.style[styleNameOfStart]) );
            const lastThumbPosition: number = parseFloat( String(this._thumbLast.style[styleNameOfStart]) );

            const isLastCloser: boolean = Math.abs(firstThumbPosition/100 - newThumbPosition) > Math.abs(lastThumbPosition/100 - newThumbPosition);

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


    @bind
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


        this.handleThumbDown = this.handleThumbDown;
        this.handleThumbMove = this.handleThumbMove;
        this.handleThumbUp = this.handleThumbUp;
        this.handleSliderClick = this.handleSliderClick;


        this._thumbFirst.addEventListener("mousedown", this.handleThumbDown);
        this._thumbFirst.addEventListener("touchstart", this.handleThumbDown);

        this._thumbLast.addEventListener("mousedown", this.handleThumbDown);
        this._thumbLast.addEventListener("touchstart", this.handleThumbDown);

        this._slider.addEventListener('click', this.handleSliderClick);
    }

    private rebuild(opts: IModelOptions): void {
        const prevOptions: IViewOptions = this.getOptions();
        const options: IOptions = Object.assign({}, prevOptions, opts);

        this._slider.innerHTML = '';
        
        this.build(options);
    }

    private handleWarnings(): void {
        if ( Object.keys(this._warnings).length == 0 ) { return }
        
        this.notify({
            type: 'WARNINGS',
            warnings: this.getWarnings()
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
        let division: HTMLElement;
        let val: number | string;
        let indent: number | string;
        const length: number = max - min;

        const scale: HTMLElement = document.createElement('div');
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
        if ( this._tooltipFirst == null ) return;
        if ( this._tooltipLast == null ) return;

        const { begin, end, reverse, customValues } = options;
        const beginValue: string = customValues ? customValues[begin] : String(begin);
        const endValue: string = customValues ? customValues[end] : String(end);

        if (!reverse) {
            this._tooltipFirst.textContent = beginValue;
            this._tooltipLast.textContent = endValue;
        } else {
            this._tooltipFirst.textContent = endValue;
            this._tooltipLast.textContent = beginValue;
        }
    }

    private setThumbPosition(thumbNode: HTMLElement, position: string): void {
        if ( !this._vertical ) {
            thumbNode.style.top = '';
            thumbNode.style.left = position;
        } else {
            thumbNode.style.left = '';
            thumbNode.style.top = position;
        }

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

    private buildNode(parentNode: HTMLElement, ...classes: string[]): HTMLElement {
        const node: HTMLElement = document.createElement('div');

        classes.forEach(function(currenClass: string) {
            node.classList.add(currenClass);
        });

        parentNode.append(node);
        return node;
    }
    
    private getValidLength(str: string, validLength: string): string {

        const foundMatch: string[] | number[] | null = str.match(/^\d{1,3}[.,]?\d*(px|em|rem|%|vh|vw)?$/i);
        let isCSSLengthFound: Boolean = Boolean(foundMatch);
        let CSSLength: string = foundMatch ? foundMatch[0].toLowerCase().replace(',', '.') : '';

        if ( isCSSLengthFound && isNumeric(CSSLength) ) { 
            return CSSLength + 'px';

        } else if ( isCSSLengthFound ) {
            return CSSLength;

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