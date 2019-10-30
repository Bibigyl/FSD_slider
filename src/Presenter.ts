import IOptions, { defaultOptions } from './defaultOptions';
import {IModel} from './Model';
import {IView} from './View';

export default class Presenter {

    private _model: IModel;
    private _view: IView;

    constructor(model: IModel, view: IView) {

        this._model = model;
        this._view = view;

        this.thumbOnMouseDown = this.thumbOnMouseDown.bind(this);
        this.thumbOnMouseMove = this.thumbOnMouseMove.bind(this);
        this.thumbOnMouseUp = this.thumbOnMouseUp.bind(this);
        
        this._view.getThumb().addEventListener("mousedown", this.thumbOnMouseDown);
        
    }

    thumbOnMouseDown(event) {
        // предотвратить запуск выделения (действие браузера)
        event.preventDefault();

        document.addEventListener('mousemove', this.thumbOnMouseMove);
        document.addEventListener('mouseup', this.thumbOnMouseUp);
      }

    thumbOnMouseMove(event) {

        let sliderNode: HTMLDivElement = this._view.getSlider();
        let thumbNode: HTMLDivElement = this._view.getThumb();
      
        let minVal: number = this._model.getMinVal();
        let maxVal: number = this._model.getMaxVal();
        let step: number = this._model.getStep();

        let sliderLenght: number;
        let sliderBorder: number;
        let eventPos: number;
        let thumbPosition: number;
        let oneStepLenght: number;
        let newVal: number;

        if ( !this._view.getVertical() ) {

            sliderLenght = sliderNode.clientWidth;
            sliderBorder = (sliderNode.offsetWidth - sliderLenght) / 2;
            eventPos = event.clientX;            
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().left - sliderBorder;

            console.log('привет');
            console.log('thumbPosition' + thumbPosition);

        } else {

            sliderLenght = sliderNode.clientWidth;
            sliderBorder = (sliderNode.offsetWidth - sliderLenght) / 2;
            eventPos = event.clientX;            
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().left - sliderBorder;
        }

        oneStepLenght = (sliderLenght / Math.abs(maxVal - minVal)) * step;  
        newVal = Math.round(thumbPosition / oneStepLenght);

        console.log('newVal' + newVal);
    
        if (newVal <= minVal) {
            newVal = minVal;
            thumbPosition = 0;
        } else if (newVal >= maxVal) {
            newVal = maxVal;
            thumbPosition = sliderLenght;
        } else {
            thumbPosition = newVal * oneStepLenght;
        }

        console.log(thumbPosition);

/*         if ( !this._model.getReverse() ) {
            newVal = minVal + newVal * step; 
        } else {
            newVal = minVal - newVal * step;
        } */
    
        this._model.setVal(newVal);
        this._view.setThumbPosition(thumbPosition);

        console.log(this._model.getVal());
    }
    
    thumbOnMouseUp(event) {
        document.removeEventListener('mouseup', this.thumbOnMouseUp);
        document.removeEventListener('mousemove', this.thumbOnMouseMove);
    }

}