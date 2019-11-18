import IOptions from './defaultOptions';
import Model, {IModel} from './Model';
import { runInNewContext } from 'vm';

export interface IView {

    // геттеры и сеттеры
    getLenght(): number;
    getVertical(): boolean;
    getRange(): boolean;
    getTooltipMask(): string;
    setTooltipMask(mask: string): void;
    getScaleStep(): number;
    setScaleStep(step: number): void;
    getScaleMask(): string;
    setScaleMask(mask: string): void;
    getNumberOfSteps(): number;
    setNumberOfSteps(num: number): void;

    getSlider(): HTMLDivElement;
    getThumb(num?: number): HTMLDivElement;
    getTooltip(num?: number): HTMLDivElement;
    setTooltip(tooltip: HTMLDivElement | undefined, num?: number): void;
    getScale(): HTMLDivElement;
    setScale(scale: HTMLDivElement | undefined): void;


    // методы для создания и изменения view
    changeSliderBase (options: any): void;
    changeRangeToVal (model: IModel): void;
    changeValToRange (model: IModel): void;
    buildValidTooltips(model: IModel): void;
    buildScale(sliderNode: HTMLDivElement, step: number, model: IModel, mask: string): HTMLDivElement;
    rebuildScale(model: IModel): void;
    changeScaleDivision(model: IModel): void;

    // вспомогательные методы
    setThumbPosition(thumbNode: HTMLDivElement, thumbPosition: number): void;
    setValToTooltip(tooltipNode: HTMLDivElement, val: number | string | Date, mask: string): void;
    findThumbPosition(newStep, numOfSteps): number;
    oneStepLenght(): number;
    removeNode(node: HTMLDivElement): undefined;
    scaleStepValidation(model: IModel, step: number): number;  
}

export default class View implements IView {

    private _lenght: string;
    private _vertical: boolean;
    private _range: boolean;
    private _tooltipMask: string;
    private _scaleMask?: string;
    private _scaleStep?: number;
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
            this._lenght = this.lengthValidation(options.width);
            this._slider.style.width = this._lenght;
            this._slider.classList.add('slider_horizontal');
        } else {
            this._vertical = true;
            this._lenght = this.lengthValidation(options.height);
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
            this.buildValidTooltips(model);
        }
        
        this._scaleMask = options.scaleMask;

        if ( options.scale ) {
            let step: number;

            if ( options.scaleStep ) {
                step = this.scaleStepValidation(model, options.scaleStep);
            } else {
                step = model.getStep();
            }
            this._scaleStep = step;
            this._scale = this.buildScale(this._slider, step, model, this._scaleMask);
        }
    }

    // геттеры и сеттеры
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
    getRange(): boolean {
        return this._range;
    }
    getTooltipMask(): string {
        return this._tooltipMask;
    }
    setTooltipMask(mask: string): void {
        this._tooltipMask = mask;
    }
    getScaleStep(): number {
        return this._scaleStep;
    }
    setScaleStep(step: number): void {
        this._scaleStep = step;
    }
    getScaleMask(): string {
        return this._scaleMask;
    }
    setScaleMask(mask: string): void {
        this._scaleMask = mask;
    }
    getNumberOfSteps(): number {
        return this._numberOfSteps;
    };
    setNumberOfSteps(num: number): void {
        this._numberOfSteps = num;
    };
    


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
    setTooltip(tooltip: HTMLDivElement | undefined, num: number = 0) {
        if ( num == 0 ) {
            this._tooltip = tooltip;
        } else if ( num == 1 ) {
            this._tooltipLeft = tooltip;
        } else if ( num == 2 ) {
            this._tooltipRight = tooltip;
        }
    }
    getScale(): HTMLDivElement {
        return this._scale;
    }
    setScale(scale: HTMLDivElement | undefined): void {
        this._scale = scale;
    }


    // методы для создания и изменения view

    changeSliderBase (options: any): void {

        let lenghtChanged: boolean = false;
        // ориентация
        if ( options.vertical && !this._vertical ) {
            this._vertical = true;
            this._slider.classList.remove('slider_horizontal')
            this._slider.classList.add('slider_vertical');

            this._lenght = options.height ? this.lengthValidation(options.height) : this._lenght;
            this._slider.style.width = null;
            this._slider.style.height = this._lenght;
            lenghtChanged = true;
        }
        if ( options.vertical === false && this._vertical ) {
            this._vertical = false;
            this._slider.classList.remove('slider_vertical')
            this._slider.classList.add('slider_horizontal');

            this._lenght = options.width ? this.lengthValidation(options.width) : this._lenght;
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
    }

    changeRangeToVal (model: IModel): void {
        let pos: number;

        this._thumbLeft = this.removeNode(this._thumbLeft);
        this._thumbRight = this.removeNode(this._thumbRight);

        this._thumb = this.buildThumb(this._slider);
        pos = this.findThumbPosition( model.getStepNumber(model.getVal()), model.numberOfSteps() );
        this.setThumbPosition( this._thumb, pos);

        this._range = false;
    }

    changeValToRange (model: IModel): void {
        let pos: number;

        this._thumb = this.removeNode(this._thumb);

        this._thumbLeft = this.buildThumb(this._slider, 'slider__thumb_left'); 
        pos = this.findThumbPosition( model.getStepNumber(model.getRange()[0]), model.numberOfSteps() );
        this.setThumbPosition( this._thumbLeft, pos);

        this._thumbRight = this.buildThumb(this._slider, 'slider__thumb_right');
        pos = this.findThumbPosition( model.getStepNumber(model.getRange()[1]), model.numberOfSteps() );
        this.setThumbPosition( this._thumbRight, pos);

        this._range = true;
    }

    buildValidTooltips(model: IModel): void {
        let val: number | string | Date;

        if (!this._range) { 

            if ( this._tooltip ) this._tooltip = this.removeNode( this._tooltip );
            val = model.getTranslatedVal( model.getStepNumber( model.getVal() ) );
            this._tooltip = this.buildTooltip(this._thumb);
            this.setValToTooltip( this._tooltip, val, this._tooltipMask );   

        } else {
            if ( this._tooltipLeft ) this._tooltipLeft = this.removeNode( this._tooltipLeft );
            val = model.getTranslatedVal( model.getStepNumber( model.getRange()[0] ) ); 
            this._tooltipLeft = this.buildTooltip(this._thumbLeft, 'slider__tooltip_left');
            this.setValToTooltip( this._tooltipLeft, val, this._tooltipMask );  

            if ( this._tooltipRight ) this._tooltipRight = this.removeNode( this._tooltipRight );
            val = model.getTranslatedVal( model.getStepNumber( model.getRange()[1] ) ); 
            this._tooltipRight = this.buildTooltip(this._thumbRight, 'slider__tooltip_right');
            this.setValToTooltip( this._tooltipRight, val, this._tooltipMask ); 
        }
    }

    buildScale(sliderNode: HTMLDivElement, step: number, model: IModel, mask: string): HTMLDivElement {
        let scale: HTMLDivElement = document.createElement('div');
        let division: HTMLDivElement;
        let val: number | string | Date;

        scale.classList.add('slider__scale');
        sliderNode.prepend(scale);

        // множитель. во сколько раз шаг в моделе меньше шага шкалы
        let n: number = Math.max( this.decimalPlaces(step), this.decimalPlaces(model.getStep()) );
        let mult: number = step / model.getStep();
        mult = +mult.toFixed(n);
        mult = Math.abs(mult);     
        
        for (let i: number = 0; i <= model.numberOfSteps(); i = i + mult) {

            // i + mult возвращает на какой шаг модели попадает шаг шкалы
            val = model.getTranslatedVal(i);

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

    rebuildScale(model: IModel): void {
        let scale: HTMLDivElement = this.getScale();
        let prevNumOfSteps: number = scale.querySelectorAll('.slider__scale-division').length - 1;
        let newNumOfSteps: number;
        let division: HTMLDivElement;
        
        // множитель. во сколько раз шаг в моделе меньше шага шкалы
        let n: number = Math.max( this.decimalPlaces(this._scaleStep), this.decimalPlaces(model.getStep()) );
        let mult: number = this._scaleStep / model.getStep();
        mult = +mult.toFixed(n);
        mult = Math.abs(mult);

        newNumOfSteps = model.numberOfSteps() / mult;

        if ( prevNumOfSteps > newNumOfSteps ) {
            for (let i: number = 0; i < (prevNumOfSteps - newNumOfSteps); i++) {
                scale.lastChild.remove();
            }
        }
        if ( prevNumOfSteps < newNumOfSteps ) {
            for (let i: number = 0; i < (newNumOfSteps - prevNumOfSteps); i++) {
                division = document.createElement('div');
                division.classList.add('slider__scale-division');
                division.innerHTML = '<span></span>';
                scale.append(division);
            }
        }
    }

    changeScaleDivision(model: IModel): void {
        let division: HTMLDivElement;
        let val: number | string | Date;
        let mask: string = this._scaleMask;

        //let modelStep: number = model.getStep();

        // множитель. во сколько раз шаг в моделе меньше шага шкалы
        let n: number = Math.max( this.decimalPlaces(this._scaleStep), this.decimalPlaces(model.getStep()) );
        let mult: number = this._scaleStep / model.getStep();
        mult = +mult.toFixed(n);
        mult = Math.abs(mult);     
        
        for (let i: number = 0; i <= model.numberOfSteps(); i = i + mult) {

            // i + mult возвращает на какой шаг модели попадает шаг шкалы
            val = model.getTranslatedVal(i);

            division = this.getScale().querySelectorAll('.slider__scale-division')[i / mult] as HTMLDivElement;
            division.querySelector('span').textContent = '' + eval(mask);

            if (!this._vertical) {
                division.style.top = null;
                division.style.left = this.oneStepLenght() * i + 'px';
            } else {
                division.style.left = null;
                division.style.top = this.oneStepLenght() * i + 'px';
            }
        }
    }


    // вспомогательные методы

    setThumbPosition(thumbNode: HTMLDivElement, thumbPosition: number): void {
        if ( !this._vertical ) {
            thumbNode.style.top = null;
            thumbNode.style.left = thumbPosition - thumbNode.offsetWidth/2 + 'px';
        } else {
            thumbNode.style.left = null;
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

    setValToTooltip(tooltipNode: HTMLDivElement, val: number | string | Date, mask: string = 'val'): void {
        tooltipNode.textContent = eval(mask);
    }

    findThumbPosition(newStep, numOfSteps): number {
        return this.getLenght() / numOfSteps * newStep;
    }

    oneStepLenght() {
        return this.getLenght() / this._numberOfSteps;
    }

    removeNode(node: HTMLDivElement): undefined {
        node.remove();
        return undefined;
    }

    scaleStepValidation(model: IModel, step: number): number {

        let stepIsValid: boolean;
        let test: number

        // округляем, чтобы избежать проблем при вычислениях с плавающей точкой
        let n: number = Math.max( this.decimalPlaces(step), this.decimalPlaces(model.getStep()) );

        stepIsValid = this.isNumeric(step);

        step = model.getDataFormat() == 'date' ? step * 24 * 3600 * 1000 : step;

        test = (step * Math.pow(10, n)) / (model.getStep() * Math.pow(10, n));
        test = Math.abs(test);

        stepIsValid = stepIsValid && ( test % 1 == 0 );

        test = +( model.getMaxVal() - model.getMinVal() ).toFixed(n);
        test = ( test * Math.pow(10, n) ) / ( step * Math.pow(10, n) );
        test = Math.abs(test);

        stepIsValid = stepIsValid && ( test % 1 == 0 );

        step = stepIsValid ? step : model.getStep();
        return step;
    }


    // приватные функции

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
    
    private lengthValidation(str: any) {
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
        // количество знаков после запятой
        return ~(num + '').indexOf('.') ? (num + '').split('.')[1].length : 0;
    }
}