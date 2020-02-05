import IOptions from './defaultOptions';
import {IModel} from './Model';
import { runInNewContext } from 'vm';
import { isNumeric } from './commonFunctions';
import { getNumberOfSteps } from './commonFunctions';

interface IView {

}

class View implements IView {

    length: string;
    vertical: boolean;
    hasRange: boolean;
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
    

    constructor(options: IOptions, sliderNode: HTMLDivElement) {

        this.slider = sliderNode;
        this.slider.classList.add('slider');
        this.hasRange = !!options.range;
        this.length = this.findValidLength(options.length);

        if ( !options.vertical ) {
            this.vertical = false;
            this.slider.style.width = this.length;
            this.slider.classList.add('slider_horizontal');
        } else {
            this.vertical = true;
            this.slider.style.height = this.length;
            this.slider.classList.add('slider_vertical');            
        }

        this.line = this.buildNode(this.slider, 'slider__line');

        let pos: string;
        if ( !this.hasRange ) {

            this.thumb = this.buildNode(this.slider, 'slider__thumb');
            pos = this.findThumbPosition(options.value, options);
            this.setThumbPosition(this.thumb, pos);
            console.log('shgsjdmvn')
        } else {     

            this.thumbLeft = this.buildNode(this.slider, 'slider__thumb', 'slider__thumb_left');
            this.thumbRight = this.buildNode(this.slider, 'slider__thumb', 'slider__thumb_right');

            pos = this.findThumbPosition(options.range[0], options);
            this.setThumbPosition(this.thumbLeft, pos);

            pos = this.findThumbPosition(options.range[1], options);
            this.setThumbPosition(this.thumbRight, pos);
        }

        if ( options.tooltip ) {
            this.buildTooltips(options);
        }
        
        if ( options.scale ) {
            this.buildScale(options);
        }
    }


    // методы для создания и изменения view

/*     changeSliderBase (options: any): void {

        let lengthChanged: boolean = false;

        // ширина / длина
        if ( options.length && this.length != options.length ) {
            this.length = options.length;
            lengthChanged = true;
        }

        // ориентация
        if ( options.vertical && !this.vertical ) {
            this.vertical = true;
            this.slider.classList.remove('slider_horizontal')
            this.slider.classList.add('slider_vertical');

            lengthChanged = true;
        }
        if ( options.vertical === false && this.vertical ) {
            this.vertical = false;
            this.slider.classList.remove('slider_vertical')
            this.slider.classList.add('slider_horizontal');

            lengthChanged = true
        }

        if (lengthChanged && !this.vertical) {
            this.slider.style.height = null;
            this.slider.style.width = this.length;
        }
        if (lengthChanged && this.vertical) {
            this.slider.style.width = null;
            this.slider.style.height = this.length;
        }
    } */

/*     changeRangeToVal (model: IModel): void {
        let pos: number;

        this.hasRange = false;
        
        this.thumb = this.buildNode(this.slider, 'slider__thumb');
        this.thumbLeft = this.removeNode(this.thumbLeft);
        this.thumbRight = this.removeNode(this.thumbRight);

        pos = this.findThumbPosition( model.getStepNumber(model.getVal()), model.getNumberOfSteps() );
        this.setThumbPosition( this.thumb, pos);
    } */

/*     changeValToRange (model: IModel): void {
        let pos: number;

        this.hasRange = true;

        this.thumb = this.removeNode(this.thumb);
        this.thumbLeft = this.buildNode(this.slider, 'slider__thumb', 'slider__thumb_left'); 
        this.thumbRight = this.buildNode(this.slider, 'slider__thumb', 'slider__thumb_right');
        
        pos = this.findThumbPosition( model.getStepNumber(model.getRange()[0]), model.getNumberOfSteps() );
        this.setThumbPosition( this.thumbLeft, pos);

        pos = this.findThumbPosition( model.getStepNumber(model.getRange()[1]), model.getNumberOfSteps() );
        this.setThumbPosition( this.thumbRight, pos);
    } */

    buildTooltips (options: IOptions): void {
        let val: number | string;

        if (!options.range) { 

            val = options.customValues ? options.customValues[options.value] : options.value;
            this.tooltip = this.buildNode(this.thumb, 'slider__tooltip');
            this.tooltip.textContent = val as string; 
        } else {

            val = options.customValues ? options.customValues[options.range[0]] : options.range[0];
            this.tooltipLeft = this.buildNode(this.thumbLeft, 'slider__tooltip', 'slider__tooltip_left');
            this.tooltipLeft.textContent = val as string;

            val = options.customValues ? options.customValues[options.range[1]] : options.range[1];
            this.tooltipRight = this.buildNode(this.thumbRight, 'slider__tooltip', 'slider__tooltip_right');
            this.tooltipLeft.textContent = val as string;
        }
    }

    buildScale(options: IOptions): void {
        let scale: HTMLDivElement;
        let division: HTMLDivElement;
        let val: number | string;
        let sign: number = options.reverse ? -1 : 1;
        let indent: number | string;
        let length: number = options.max - options.min;

        scale = document.createElement('div');
        scale.classList.add('slider__scale');

        for ( let i: number = 0; i <= getNumberOfSteps(options.min, options.max, options.step); i++ ) {
            val = options.min + sign * options.step * i;
            val = val > options.max ? options.max : val;

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





/*     rebuildScale(model: IModel): void {
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
    } */

/*     changeScaleDivision(model: IModel): void {
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
                division.style.left = this.findOneSteplength() * i + 'px';
            } else {
                division.style.left = null;
                division.style.top = this.findOneSteplength() * i + 'px';
            }
        }
    } */

/*     changeLine(): void {
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
    } */


    // вспомогательные методы

    private setThumbPosition(thumbNode: HTMLDivElement, position: string): void {
        if ( !this.vertical ) {
            thumbNode.style.top = null;
            thumbNode.style.left = position;
        } else {
            thumbNode.style.left = null;
            thumbNode.style.top = position;
        }

        // если оба бегунка справа(внизу), добавлем z index для нижнего
        if ( this.thumbLeft ) {
            if ( !this.vertical ) {
                if ( (this.thumbLeft.style.left == '100%') || (this.thumbLeft.style.top == '100%') ) {
                    this.thumbLeft.style.zIndex = '1';
                } else {
                    this.thumbLeft.style.zIndex = null;
                }  
            }
        }

        //this.changeLine();
    }



    private findThumbPosition(value: number, options: IOptions): string {
        return (value - options.min) / (options.max - options.min) * 100 + '%';
    }

    private removeNode(node: HTMLDivElement): undefined {
        node.remove();
        return undefined;
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
            if ( r && isNumeric(r[0]) ) { 
                return r[0].toLowerCase().replace(',', '.') + 'px';
            } else if ( r ) {
                return r[0].toLowerCase().replace(',', '.');
            }
        }
        throw new Error('Width (or height) should be valid to css');
    }

}


export { IView };
export default View;