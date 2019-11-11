import IOptions from './defaultOptions';
import {IModel} from './Model';
import { runInThisContext } from 'vm';

export interface IView {
    getLenght(): number;
    getVertical(): boolean;
    getTooltipMask(): string;

    getSlider(): HTMLDivElement;
    getThumb(num?: number): HTMLDivElement;
    getTooltip(num?: number): HTMLDivElement;
    getScale(): HTMLDivElement;

    setThumbPosition(thumbNode: HTMLDivElement, thumbPosition: number): void;
    setValToTooltip(tooltipNode: HTMLDivElement, val: number | string, mask: string): void;

    findThumbPosition(newStep, numOfSteps): number;
    oneStepLenght(): number;
    rebuildSlider(model: IModel, options: any): void;
}

export default class View {

    private _lenght: string;
    private _vertical: boolean;
    private _range: boolean;
    private _tooltipMask: string;
    private _numberOfSteps: number;

    private _slider: HTMLDivElement;
    private _thumb?: HTMLDivElement | undefined;
    private _thumbLeft?: HTMLDivElement | undefined;
    private _thumbRight?: HTMLDivElement | undefined;
    private _tooltip?: HTMLDivElement | undefined;
    private _tooltipLeft?: HTMLDivElement | undefined;
    private _tooltipRight?: HTMLDivElement | undefined;
    private _scale?: HTMLDivElement | undefined;
    

    constructor(model: IModel, options: IOptions, sliderNode: HTMLDivElement) {

        this._slider = sliderNode;
        this._slider.classList.add('slider');
        this._range = model.getRange() ? true : false;
        this._numberOfSteps = model.numberOfSteps();

        if ( !options.vertical ) {
            this._vertical = false;
            this._lenght = this.lenghtValidation(options.width);
            this._slider.style.width = this._lenght;
            this._slider.classList.add('slider_horizontal');
        } else {
            this._vertical = true;
            this._lenght = this.lenghtValidation(options.height);
            this._slider.style.height = this._lenght;
            this._slider.classList.add('slider_vertical');            
        }

        let pos: number;
        if ( !this._range ) {

            this._thumb = this.buildThumb(this._slider);
            pos = this.findThumbPosition( model.getStepNumber(model.getVal()), model.numberOfSteps() );
            this.setThumbPosition( this._thumb, pos);
        } else {     

            this._thumbLeft = this.buildThumb(this._slider, 'slider__thumb_left'); 
            pos = this.findThumbPosition( model.getStepNumber(model.getRange()[0]), model.numberOfSteps() );
            this.setThumbPosition( this._thumbLeft, pos);

            this._thumbRight = this.buildThumb(this._slider, 'slider__thumb_right');
            pos = this.findThumbPosition( model.getStepNumber(model.getRange()[1]), model.numberOfSteps() );
            this.setThumbPosition( this._thumbRight, pos);
        }
 
        // маска для подсказок
        // если ее нет, применяется обычная, которая по дефолту возвращает просто val
        // (в формате дат вернется объект дата)
        this._tooltipMask = options.tooltipMask;

        if ( options.tooltip ) {
            let val: number | string;

            if (!this._range) { 
                val = model.getCustomValues() ? model.getCustomValues()[model.getVal()] : model.getVal();  
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
        
        if ( options.scale ) {
            let step: number;

            if ( options.scaleStep ) {
                let stepIsValid: boolean;
                let test: number

                // округляем, чтобы избежать проблем при вычислениях с плавающей точкой
                let n: number = Math.max( this.decimalPlaces(options.scaleStep), this.decimalPlaces(model.getStep()) );
                
                stepIsValid = this.isNumeric(options.scaleStep);

                options.scaleStep = model.getDataFormat() == 'date' ? options.scaleStep * 24 * 3600 * 1000 : options.scaleStep;

                test = (options.scaleStep * Math.pow(10, n)) / (model.getStep() * Math.pow(10, n));
                test = Math.abs(test);

                stepIsValid = stepIsValid && ( test % 1 == 0 );

                test = +( model.getMaxVal() - model.getMinVal() ).toFixed(n);
                test = ( test * Math.pow(10, n) ) / ( options.scaleStep * Math.pow(10, n) );
                test = Math.abs(test);

                stepIsValid = stepIsValid && ( test % 1 == 0 );

                step = stepIsValid ? options.scaleStep : model.getStep();

            } else {
                step = model.getStep();
            }
            this._scale = this.buildScale(this._slider, step, model, options.scaleMask);
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

    getScale(): HTMLDivElement {
        return this._scale;
    }

    setThumbPosition(thumbNode: HTMLDivElement, thumbPosition: number): void {
        if ( !this._vertical ) {
            thumbNode.style.left = thumbPosition - thumbNode.offsetWidth/2 + 'px';
        } else {
            thumbNode.style.top = thumbPosition - thumbNode.offsetWidth/2 + 'px';    
        }

        // если оба бегунка справа, добавлем z index для нижнего
        if ( this.getThumb(1) ) {
            if ( !this._vertical ) {
                if ( (this.getThumb(1).style.left == (this.getLenght() - this.getThumb(1).clientWidth/2) + 'px') ) {
                    this.getThumb(1).style.zIndex = '100';
                } else {
                    this.getThumb(1).style.zIndex = null;
                }  
            } else {
                if ( (this.getThumb(1).style.top == (this.getLenght() - this.getThumb(1).clientHeight/2) + 'px') ) {
                    this.getThumb(1).style.zIndex = '100';
                } else {
                    this.getThumb(1).style.zIndex = null;
                }      
            }         
        }
    }

    setValToTooltip(tooltipNode: HTMLDivElement, val: number | string, mask: string = 'val'): void {
        tooltipNode.textContent = eval(mask);
    }

    findThumbPosition(newStep, numOfSteps): number {
        return this.getLenght() / numOfSteps * newStep;
    }

    oneStepLenght() {
        return this.getLenght() / this._numberOfSteps;
    }

    rebuildSlider(model: IModel, options: any): void {
        let lenghtChanged: Boolean = false;
        let rangeChangedToVal: Boolean = false;
        let valChangedToRange: Boolean = false;
        let tooltipMaskChanged: Boolean = false;

        // ориентация
        if ( options.vertical && !this._vertical ) {
            this._vertical = true;
            this._lenght = options.height ? this.lenghtValidation(options.height) : this._lenght;
            this._slider.style.width = null;
            this._slider.style.height = this._lenght;
            lenghtChanged = true;
        }
        if ( options.vertical === false && this._vertical ) {
            this._vertical = false;
            this._lenght = options.width ? this.lenghtValidation(options.width) : this._lenght;
            this._slider.style.height = null;
            this._slider.style.width = this._lenght;
            lenghtChanged = true
        }

        // ширина / длина
        if ( (options.width || lenghtChanged) && !this._vertical ) {
            this._lenght = options.width;
            this._slider.style.width = this._lenght;
        }
        if ( (options.height || lenghtChanged) && this._vertical ) {
            this._lenght = options.height;
            this._slider.style.height = this._lenght;
        }

        // количество бегунков
        let pos: number;
        if ( options.range && this.getThumb() ) {
            this.getSlider().querySelector('.slider__thumb').remove();
            this._thumb = undefined;

            this._thumbLeft = this.buildThumb(this._slider, 'slider__thumb_left'); 
            pos = this.findThumbPosition( model.getStepNumber(model.getRange()[0]), model.numberOfSteps() );
            this.setThumbPosition( this._thumbLeft, pos);

            this._thumbRight = this.buildThumb(this._slider, 'slider__thumb_right');
            pos = this.findThumbPosition( model.getStepNumber(model.getRange()[1]), model.numberOfSteps() );
            this.setThumbPosition( this._thumbRight, pos);

            valChangedToRange = true;
        }
        if ( options.initialVal && this.getThumb(1) ) {
            this.getSlider().querySelector('.slider__thumb_left').remove();
            this.getSlider().querySelector('.slider__thumb_right').remove();
            this._thumbLeft = undefined;
            this._thumbRight = undefined;

            this._thumb = this.buildThumb(this._slider);
            pos = this.findThumbPosition( model.getStepNumber(model.getVal()), model.numberOfSteps() );
            this.setThumbPosition( this._thumb, pos);

            rangeChangedToVal = true;
        }

        // подсказка маска
        if ( options.tooltipMask ) {
            this._tooltipMask = options.tooltipMask;
            tooltipMaskChanged = true;
        }
        // подсказка
        if ( ( options.tooltip === false || rangeChangedToVal || valChangedToRange ) && ( this._tooltip || this._tooltipLeft ) ) {

            if (this._tooltip) {

            }

        }

        this._tooltipMask = options.tooltipMask;

        if ( options.tooltip ) {
            let val: number | string;

            if (!this._range) { 
                val = model.getCustomValues() ? model.getCustomValues()[model.getVal()] : model.getVal();  
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

    private buildScale(sliderNode: HTMLDivElement, step: number, model: IModel, mask: string) {
        let scale: HTMLDivElement = document.createElement('div');
        let division: HTMLDivElement;

        scale.classList.add('slider__scale');
        sliderNode.prepend(scale);

        // множитель. во сколько раз шаг в моделе меньше шага шкалы
        let n: number = Math.max( this.decimalPlaces(step), this.decimalPlaces(model.getStep()) );
        let mult: number = step / model.getStep();
        mult = +mult.toFixed(n);
        mult = Math.abs(mult);     
        
        for (let i: number = 0; i <= model.numberOfSteps(); i = i + mult) {

            // i + mult возвращает на какой шаг модели попадает шаг шкалы
            let val: number | string | Date = model.getTranslatedVal(i);

            division = document.createElement('div');
            division.classList.add('slider__scale-division');
            division.innerHTML = '<span>' +  eval(mask) + '</span>';

            if (!this._vertical) {
                division.style.left = this.oneStepLenght() * i + 'px';
            } else {
                division.style.top = this.oneStepLenght() * i + 'px';
            }

            scale.append(division);
        }
        return scale;
    }
    
    private lenghtValidation(str: any) {
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

    private decimalPlaces(num: number): number {
        // околичество знаков после запятой
        return ~(num + '').indexOf('.') ? (num + '').split('.')[1].length : 0;
    }
}