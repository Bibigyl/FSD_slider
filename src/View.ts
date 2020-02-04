import IOptions from './defaultOptions';
import {IModel} from './Model';
import { runInNewContext } from 'vm';

interface IView {

    // геттеры и сеттеры
/*     getLenght(): number;
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
    setScale(scale: HTMLDivElement | undefined): void; */


    // методы для создания и изменения view
/*     changeSliderBase (options: any): void;
    changeRangeToVal (model: IModel): void;
    changeValToRange (model: IModel): void;
    buildTooltips(model: IModel): void;
    buildScale(sliderNode: HTMLDivElement, step: number, model: IModel, mask: string): HTMLDivElement;
    rebuildScale(model: IModel): void;
    changeScaleDivision(model: IModel): void;
    changeLine(): void; */

    // вспомогательные методы
/*     setThumbPosition(thumbNode: HTMLDivElement, thumbPosition: number): void;
    setValToTooltip(tooltipNode: HTMLDivElement, val: number | string | Date, mask: string): void;
    findThumbPosition(newStep, numOfSteps): number;
    findOneStepLenght(): number;
    removeNode(node: HTMLDivElement): undefined;
    findValidScaleStep(model: IModel, step: number): number;   */
}

class View implements IView {

    lenght: string;
    vertical: boolean;
    hasRange: boolean;
    //tooltipMask: string;
    //scaleMask?: string;
    //scaleStep?: number;
    numberOfSteps: number;

    slider: HTMLDivElement;
    thumb?: HTMLDivElement | undefined;
    thumbLeft?: HTMLDivElement | undefined;
    thumbRight?: HTMLDivElement | undefined;
    line: HTMLDivElement;
    tooltip?: HTMLDivElement | undefined;
    tooltipLeft?: HTMLDivElement | undefined;
    tooltipRight?: HTMLDivElement | undefined;
    scale?: HTMLDivElement | undefined;
    

    constructor(model: IModel, options: IOptions, sliderNode: HTMLDivElement) {

        this.slider = sliderNode;
        this.slider.classList.add('slider');
        this.hasRange = !!model.range;
        this.numberOfSteps = model.getNumberOfSteps();
        this.lenght = this.findValidLength(options.length);

        if ( !options.vertical ) {
            this.vertical = false;
            this.slider.style.width = this.lenght;
            this.slider.classList.add('slider_horizontal');
        } else {
            this.vertical = true;
            this.slider.style.height = this.lenght;
            this.slider.classList.add('slider_vertical');            
        }

        this.line = this.buildNode(this.slider, 'slider__line');

        let pos: string;
        if ( !this.hasRange ) {

            this.thumb = this.buildNode(this.slider, 'slider__thumb');
            pos = this.findThumbPosition(model.value, model);
            this.setThumbPosition(this.thumb, pos);
        } else {     

            this.thumbLeft = this.buildNode(this.slider, 'slider__thumb', 'slider__thumb_left');
            this.thumbRight = this.buildNode(this.slider, 'slider__thumb', 'slider__thumb_right');

            pos = this.findThumbPosition(model.range[0], model);
            this.setThumbPosition(this.thumbLeft, pos);

            pos = this.findThumbPosition(model.range[1], model);
            this.setThumbPosition(this.thumbRight, pos);
        }
 
        // маска для подсказок
        // если ее нет, применяется обычная, которая по дефолту возвращает просто val
        // (в формате дат вернется объект дата)
        //this.tooltipMask = options.tooltipMask;

        if ( options.tooltip ) {
            this.buildTooltips(model);
        }
        
        //this.scaleMask = options.scaleMask;

/*         let step: number;
        if ( options.scaleStep ) {
            step = this.findValidScaleStep(model, options.scaleStep);
        } else {
            step = model.getStep();
        }
        this.scaleStep = step; */

        if ( options.scale ) {
            this.scale = this.buildScale(this.slider, step, model, this.scaleMask);
        }
    }




    getSlider(): HTMLDivElement {
        return this.slider;
    }
    getThumb(num: number = 0): HTMLDivElement {
        if ( num == 0 ) {
            return this.thumb;
        }
        if ( num == 1 ) {
            return this.thumbLeft;
        }
        if ( num == 2 ) {
            return this.thumbRight;
        }
        return this.thumb;
    }
    getTooltip(num: number = 0): HTMLDivElement | undefined {
        if ( this.tooltip || this.tooltipLeft ) {
            if ( this.tooltip && num == 0 ) {
                return this.tooltip;
            }
            if ( this.tooltipLeft && num == 1 ) {
                return this.tooltipLeft;
            }
            if ( this.tooltipRight && num == 2 ) {
                return this.tooltipRight;
            }
        } else {
            return undefined;
        }
    }
    setTooltip(tooltip: HTMLDivElement | undefined, num: number = 0) {
        if ( num == 0 ) {
            this.tooltip = tooltip;
        } else if ( num == 1 ) {
            this.tooltipLeft = tooltip;
        } else if ( num == 2 ) {
            this.tooltipRight = tooltip;
        }
    }
    getScale(): HTMLDivElement {
        return this.scale;
    }
    setScale(scale: HTMLDivElement | undefined): void {
        this.scale = scale;
    }


    // методы для создания и изменения view

    changeSliderBase (options: any): void {

        let lenghtChanged: boolean = false;

        // ширина / длина
        if ( options.length && this.lenght != options.length ) {
            this.lenght = options.length;
            lenghtChanged = true;
        }

        // ориентация
        if ( options.vertical && !this.vertical ) {
            this.vertical = true;
            this.slider.classList.remove('slider_horizontal')
            this.slider.classList.add('slider_vertical');

            lenghtChanged = true;
        }
        if ( options.vertical === false && this.vertical ) {
            this.vertical = false;
            this.slider.classList.remove('slider_vertical')
            this.slider.classList.add('slider_horizontal');

            lenghtChanged = true
        }

        if (lenghtChanged && !this.vertical) {
            this.slider.style.height = null;
            this.slider.style.width = this.lenght;
        }
        if (lenghtChanged && this.vertical) {
            this.slider.style.width = null;
            this.slider.style.height = this.lenght;
        }
    }

    changeRangeToVal (model: IModel): void {
        let pos: number;

        this.hasRange = false;
        
        this.thumb = this.buildNode(this.slider, 'slider__thumb');
        this.thumbLeft = this.removeNode(this.thumbLeft);
        this.thumbRight = this.removeNode(this.thumbRight);

        pos = this.findThumbPosition( model.getStepNumber(model.getVal()), model.getNumberOfSteps() );
        this.setThumbPosition( this.thumb, pos);
    }

    changeValToRange (model: IModel): void {
        let pos: number;

        this.hasRange = true;

        this.thumb = this.removeNode(this.thumb);
        this.thumbLeft = this.buildNode(this.slider, 'slider__thumb', 'slider__thumb_left'); 
        this.thumbRight = this.buildNode(this.slider, 'slider__thumb', 'slider__thumb_right');
        
        pos = this.findThumbPosition( model.getStepNumber(model.getRange()[0]), model.getNumberOfSteps() );
        this.setThumbPosition( this.thumbLeft, pos);

        pos = this.findThumbPosition( model.getStepNumber(model.getRange()[1]), model.getNumberOfSteps() );
        this.setThumbPosition( this.thumbRight, pos);
    }

    buildTooltips (model: IModel): void {
        let val: number | string;

        if (!model.range) { 

            val = model.translate( model.value );
            this.tooltip = this.buildNode(this.thumb, 'slider__tooltip');
            this.tooltip.textContent = val as string; 
        } else {

            val = model.translate( model.range[0] );
            this.tooltipLeft = this.buildNode(this.thumbLeft, 'slider__tooltip', 'slider__tooltip_left');
            this.tooltipLeft.textContent = val as string;

            val = model.translate( model.range[1] );
            this.tooltipRight = this.buildNode(this.thumbRight, 'slider__tooltip', 'slider__tooltip_right');
            this.tooltipLeft.textContent = val as string;
        }
    }

    buildScale(model: IModel): HTMLDivElement {
        let scale: HTMLDivElement = document.createElement('div');
        //let division: HTMLDivElement;
        //let val: number | string | Date;

        scale.classList.add('slider__scale');
        this.slider.prepend(scale);

        for (let i: number = 0; i <= model.getNumberOfSteps())

/*         // множитель. во сколько раз шаг в моделе меньше шага шкалы
        let n: number = Math.max( this.findDecimalPlaces(step), this.findDecimalPlaces(model.getStep()) );
        let mult: number = step / model.getStep();
        mult = +(+mult).toFixed(n);
        mult = Math.abs(mult);     
        
        for (let i: number = 0; i <= model.getNumberOfSteps(); i = i + mult) {

            // i + mult возвращает на какой шаг модели попадает шаг шкалы
            val = model.translateByStep(i);

            division = document.createElement('div');
            division.classList.add('slider__scale-division');
            division.innerHTML = '<span>' +  eval(mask) + '</span>';

            if (!this.vertical) {
                division.style.left = this.findOneStepLenght() * i + 'px';
            } else {
                division.style.top = this.findOneStepLenght() * i + 'px';
            }

            scale.append(division);
        } */
        return scale;
    }

    rebuildScale(model: IModel): void {
        let scale: HTMLDivElement = this.getScale();
        let prevNumOfSteps: number = scale.querySelectorAll('.slider__scale-division').length - 1;
        let newNumOfSteps: number;
        let division: HTMLDivElement;
        
        // множитель. во сколько раз шаг в моделе меньше шага шкалы
        let n: number = Math.max( this.findDecimalPlaces(this.scaleStep), this.findDecimalPlaces(model.getStep()) );
        let mult: number = this.scaleStep / model.getStep();
        mult = +mult.toFixed(n);
        mult = Math.abs(mult);

        newNumOfSteps = model.getNumberOfSteps() / mult;

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
        let mask: string = this.scaleMask;

        // множитель. во сколько раз шаг в моделе меньше шага шкалы
        let n: number = Math.max( this.findDecimalPlaces(this.scaleStep), this.findDecimalPlaces(model.getStep()) );
        let mult: number = this.scaleStep / model.getStep();
        mult = +mult.toFixed(n);
        mult = Math.abs(mult);   
        
        for (let i: number = 0; i <= model.getNumberOfSteps(); i = i + mult) {

            // i + mult возвращает на какой шаг модели попадает шаг шкалы
            val = model.translateByStep(i);

            division = this.getScale().querySelectorAll('.slider__scale-division')[i / mult] as HTMLDivElement;
            division.querySelector('span').textContent = '' + eval(mask);

            if (!this.vertical) {
                division.style.top = null;
                division.style.left = this.findOneStepLenght() * i + 'px';
            } else {
                division.style.left = null;
                division.style.top = this.findOneStepLenght() * i + 'px';
            }
        }
    }

    changeLine(): void {
        this.line.style.left = null;
        this.line.style.top = null;
        this.line.style.width = null;
        this.line.style.height = null;  

        if (!this.hasRange) {

            if (!this.vertical) {
                this.line.style.height = '100%'
                this.line.style.top = '0px'
                this.line.style.left = '0px';
                this.line.style.width = parseInt(this.thumb.style.left) + this.thumb.clientWidth/2 + 'px';
            } else {
                this.line.style.width = '100%'
                this.line.style.left = '0px'
                this.line.style.top = '0px';
                this.line.style.height = parseInt(this.thumb.style.top) + this.thumb.clientHeight/2 + 'px';
            }

        } else {

            if (!this.vertical) {
                this.line.style.height = '100%'
                this.line.style.top = '0px'
                this.line.style.left = parseInt(this.thumbLeft.style.left) + this.thumbLeft.clientWidth/2 + 'px';
                this.line.style.width = ( parseInt(this.thumbRight.style.left) - parseInt(this.thumbLeft.style.left) ) + 'px';
            } else {
                this.line.style.width = '100%'
                this.line.style.left = '0px'
                this.line.style.top = parseInt(this.thumbLeft.style.top)  + this.thumbLeft.clientHeight/2 + 'px';
                this.line.style.height = ( parseInt(this.thumbRight.style.top) - parseInt(this.thumbLeft.style.top) ) + 'px';
            }
        }
    }


    // вспомогательные методы

    setThumbPosition(thumbNode: HTMLDivElement, position: string): void {
        if ( !this.vertical ) {
            thumbNode.style.top = null;
            thumbNode.style.left = position;
        } else {
            thumbNode.style.left = null;
            thumbNode.style.top = position;    
        }

        // если оба бегунка справа, добавлем z index для нижнего
        if ( this.getThumb(1) ) {
            if ( !this.vertical ) {
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

        this.changeLine();
    }

/*     setValToTooltip(tooltipNode: HTMLDivElement, val: number | string | Date, mask: string = 'val'): void {
        tooltipNode.textContent = eval(mask);
    } */

/*     findThumbPosition(newStep, numOfSteps): number {
        return this.getLenght() / numOfSteps * newStep;
    } */
    findThumbPosition(value: number, model: IModel): string {
        return (value - model.min) / (model.max - model.min) + '%';
    }

    findOneStepLenght() {
        return this.getLenght() / this.numberOfSteps;
    }

    removeNode(node: HTMLDivElement): undefined {
        node.remove();
        return undefined;
    }

    findValidScaleStep(model: IModel, step: number): number {

        let stepIsValid: boolean;
        let test: number

        // округляем, чтобы избежать проблем при вычислениях с плавающей точкой
        let n: number = Math.max( this.findDecimalPlaces(step), this.findDecimalPlaces(model.getStep()) );

        stepIsValid = this.isNumeric(step);

        if ( model.getDataFormat() == 'date' && ( step % (24 * 3600 * 1000) != 0 )) {
            step = step * 24 * 3600 * 1000;
        }
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

    private findDecimalPlaces(num: number): number {
        // количество знаков после запятой
        return ~(num + '').indexOf('.') ? (num + '').split('.')[1].length : 0;
    }
}


export { IView };
export default View;