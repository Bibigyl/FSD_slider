import IOptions, { defaultOptions } from './defaultOptions';
import {IModel} from './Model';
import View, {IView} from './View';

export default class Presenter {

    private _model: IModel;
    private _view: IView;

    constructor(model: IModel, view: IView) {

        this._model = model;
        this._view = view;

        if ( this._view.getTooltip() ) {
            // ??????????????
            this._view.setValToTooltip(this._view.getTooltip(), '' + this._model.getTranslatedVal(), this._view.getTooltipMask());
        }

        this.thumbOnMouseDown = this.thumbOnMouseDown.bind(this);
        this.thumbOnMouseMove = this.thumbOnMouseMove.bind(this);
        this.thumbOnMouseUp = this.thumbOnMouseUp.bind(this);
        
        this._view.getThumb().addEventListener("mousedown", this.thumbOnMouseDown);

        
            // удалить
            //this.setValToTooltip(this._slider, '123', options.tooltipMask);
        
    }

    thumbOnMouseDown(event) {
        // предотвратить запуск выделения (действие браузера)
        event.preventDefault();

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

    
        if ( thumbPosition <= 0 ) {
            thumbPosition = 0;
            newVal = minVal;
        } else if ( thumbPosition >= sliderLenght ) {
            thumbPosition = sliderLenght;
            newVal = maxVal;
        } else {
            // если бегунок не вышел за границы, ставим его на ближайшее значение,
            // кратное шагу.
            // только после этого преобразуем его для модели. Если reverse == true, то == -1 
            thumbPosition = newVal * stepLenght;
            newVal = minVal + reverse * newVal;
        }
    
        this._model.setVal(newVal);
        this._view.setThumbPosition(thumbPosition);

        if ( this._view.getTooltip() ) {
            // ??????????????????
            this._view.setValToTooltip(this._view.getTooltip(), ''+this._model.getTranslatedVal(), this._view.getTooltipMask()); 
        }
    }
    
    thumbOnMouseUp(event) {
        document.removeEventListener('mouseup', this.thumbOnMouseUp);
        document.removeEventListener('mousemove', this.thumbOnMouseMove);
    }

}