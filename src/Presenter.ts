import IOptions, { defaultOptions } from './defaultOptions';
import Model, {IModel} from './Model';
import View, {IView} from './View';

export default class Presenter {

    private _model: IModel;
    private _view: IView;

    private _activeThumb: HTMLDivElement;

    constructor(model: IModel, view: IView) {

        this._model = model;
        this._view = view;

        this.thumbOnMouseDown = this.thumbOnMouseDown.bind(this);
        this.thumbOnMouseMove = this.thumbOnMouseMove.bind(this);
        this.thumbOnMouseUp = this.thumbOnMouseUp.bind(this);

        this.sliderOnMouseClick = this.sliderOnMouseClick.bind(this);
        
        if ( !this._model.getRange() ) {
            this._view.getThumb().addEventListener("mousedown", this.thumbOnMouseDown);
        } else {
            this._view.getThumb(1).addEventListener("mousedown", this.thumbOnMouseDown);
            this._view.getThumb(2).addEventListener("mousedown", this.thumbOnMouseDown);
        }        

        this._view.getSlider().addEventListener("click", this.sliderOnMouseClick);
    }

    thumbOnMouseDown(event) {
        // предотвратить запуск выделения (действие браузера)
        event.preventDefault();

        this._activeThumb = event.currentTarget;

        document.addEventListener('mousemove', this.thumbOnMouseMove);
        document.addEventListener('mouseup', this.thumbOnMouseUp);
      }

    thumbOnMouseMove(event) {

        let sliderNode: HTMLDivElement = this._view.getSlider();
      
        let minVal: number = this._model.getMinVal();
        let maxVal: number = this._model.getMaxVal();
        let step: number = this._model.getStep();
        let reverse: number = !this._model.getReverse() ? 1 : -1;

        let sliderLenght: number;
        let sliderBorder: number;
        let stepLenght: number;
        let eventPos: number;
        let thumbPosition: number;
        let leftPoint: number;
        let rightPoint: number;
        let newVal: number;

        // Позиция бегунка в px вычисляется относительно начала слайдера.
        // Вначале newVal вычисляется как количество шагов от начала (от 0),
        // (то есть значения min, max, reverse не имеют значения).

        if ( !this._view.getVertical() ) {

            sliderLenght = sliderNode.clientWidth;
            sliderBorder = (sliderNode.offsetWidth - sliderLenght) / 2;
            eventPos = event.clientX;            
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().left - sliderBorder;

        } else {

            sliderLenght = sliderNode.clientHeight;
            sliderBorder = (sliderNode.offsetHeight - sliderLenght) / 2;
            eventPos = event.clientY;            
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().top - sliderBorder;

        }

        stepLenght = (sliderLenght / Math.abs(maxVal - minVal)) * step;  
        newVal = Math.round(thumbPosition / stepLenght);
        
        if ( this._model.getRange() ) {
            if ( this._activeThumb.classList.contains('slider__thumb_right') ) {
                // если промежуток, то левая граница - это левый бегунок
                // здесь рассчитывается количество шагов от начала (от 0), 
                // затем расстояние в px от начала слайдера.
                leftPoint = (this._model.getRange()[0] - minVal) * reverse / step;
                leftPoint = leftPoint * stepLenght;
                rightPoint = sliderLenght;

                minVal = this._model.getRange()[0];
            } else {
                rightPoint = (this._model.getRange()[1] - minVal) * reverse / step;
                rightPoint = rightPoint * stepLenght;
                leftPoint = 0;

                maxVal = this._model.getRange()[1];
            }
        } else {
            leftPoint = 0;
            rightPoint = sliderLenght;
        }
    
        if ( thumbPosition <= leftPoint) {
            thumbPosition = leftPoint;
            newVal = minVal;
        } else if ( thumbPosition >= rightPoint) {
            thumbPosition = rightPoint;
            newVal = maxVal;
        } else {
            // если бегунок не вышел за границы, ставим его на ближайшее значение,
            // кратное шагу.
            // только после этого преобразуем его для модели. Если reverse == true, то == -1 
            thumbPosition = newVal * stepLenght;

            const simbols: number = ~(step + '').indexOf('.') ? (step + '').split('.')[1].length : 0;
            newVal = +( (reverse * (newVal * (step * Math.pow(10, simbols))) / Math.pow(10, simbols) ).toFixed(simbols) );
            newVal = +( this._model.getMinVal() + newVal ).toFixed(simbols);
        }
    
        if ( this._model.getRange() && this._activeThumb.classList.contains('slider__thumb_left')) {
            this._model.setRange( [newVal, this._model.getRange()[1]] );
            
        } else if ( this._model.getRange() && this._activeThumb.classList.contains('slider__thumb_right')) {
            this._model.setRange( [this._model.getRange()[0], newVal] );

        } else {
            this._model.setVal(newVal);
        }
        this._view.setThumbPosition(this._activeThumb, thumbPosition);


        if ( this._view.getTooltip() || this._view.getTooltip(1) ) {
            let val: number | string;
            val = this._model.getCustomValues() ? this._model.getCustomValues()[newVal] : newVal;

            this._view.setValToTooltip( this._activeThumb.querySelector('.slider__tooltip'), val, this._view.getTooltipMask() ); 
        }
    }
    
    thumbOnMouseUp(event) {
        document.removeEventListener('mouseup', this.thumbOnMouseUp);
        document.removeEventListener('mousemove', this.thumbOnMouseMove);

        this._activeThumb = undefined;
    }

    sliderOnMouseClick(event) {

        let sliderNode: HTMLDivElement = this._view.getSlider();
        let changingThumb: HTMLDivElement;
      
        let minVal: number = this._model.getMinVal();
        let maxVal: number = this._model.getMaxVal();
        let step: number = this._model.getStep();
        let reverse: number = !this._model.getReverse() ? 1 : -1;

        let sliderLenght: number;
        let sliderBorder: number;
        let stepLenght: number;
        let eventPos: number;
        let thumbPosition: number;
        let leftPoint: number;
        let rightPoint: number;
        let newVal: number;

        // Позиция бегунка в px вычисляется относительно начала слайдера.
        // Вначале newVal вычисляется как количество шагов от начала (от 0),
        // (то есть значения min, max, reverse не имеют значения).

        if ( !this._view.getVertical() ) {

            sliderLenght = sliderNode.clientWidth;
            sliderBorder = (sliderNode.offsetWidth - sliderLenght) / 2;
            eventPos = event.clientX;            
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().left - sliderBorder;

        } else {

            sliderLenght = sliderNode.clientHeight;
            sliderBorder = (sliderNode.offsetHeight - sliderLenght) / 2;
            eventPos = event.clientY;            
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().top - sliderBorder;

        }

        stepLenght = (sliderLenght / Math.abs(maxVal - minVal)) * step;  
        newVal = Math.round(thumbPosition / stepLenght);
        
        leftPoint = 0;
        rightPoint = sliderLenght;
    
        if ( thumbPosition <= leftPoint) {
            thumbPosition = leftPoint;
            newVal = minVal;
        } else if ( thumbPosition >= rightPoint) {
            thumbPosition = rightPoint;
            newVal = maxVal;
        } else {
            // если бегунок не вышел за границы, ставим его на ближайшее значение,
            // кратное шагу.
            // только после этого преобразуем его для модели. Если reverse == true, то == -1 
            thumbPosition = newVal * stepLenght;

            const simbols: number = ~(step + '').indexOf('.') ? (step + '').split('.')[1].length : 0;
            newVal = +( (reverse * (newVal * (step * Math.pow(10, simbols))) / Math.pow(10, simbols) ).toFixed(simbols) );
            newVal = +( this._model.getMinVal() + newVal ).toFixed(simbols);
        }

        if ( !this._model.getRange() ) {
            this._model.setVal(newVal);
            changingThumb = this._view.getThumb();
            this._view.setThumbPosition(changingThumb, thumbPosition);

        } else {
            if ( Math.abs(newVal - this._model.getRange()[0]) < Math.abs(newVal - this._model.getRange()[1]) ) {
                this._model.setRange([ newVal, this._model.getRange()[1] ]);
                changingThumb = this._view.getThumb(1);
                this._view.setThumbPosition(changingThumb, thumbPosition);
            } else {
                this._model.setRange([ this._model.getRange()[0], newVal ]);
                changingThumb = this._view.getThumb(2);
                this._view.setThumbPosition(changingThumb, thumbPosition);
            }
        }
    
        if ( this._view.getTooltip() || this._view.getTooltip(1) ) {
            let val: number | string;
            val = this._model.getCustomValues() ? this._model.getCustomValues()[newVal] : newVal;

            this._view.setValToTooltip( changingThumb.querySelector('.slider__tooltip'), val, this._view.getTooltipMask() ); 
        }
    }

}