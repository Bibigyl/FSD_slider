import IOptions, { defaultOptions } from './defaultOptions';
import Model, {IModel} from './Model';
import  {IModelOptions} from './Model';
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
        
        if ( !model.getRange() ) {
            this._view.getThumb().addEventListener("mousedown", this.thumbOnMouseDown);
        } else {
            view.getThumb(1).addEventListener("mousedown", this.thumbOnMouseDown);
            view.getThumb(2).addEventListener("mousedown", this.thumbOnMouseDown);
        }        

        view.getSlider().addEventListener("click", this.sliderOnMouseClick);
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
        let sliderLenght: number = this._view.getLenght();
        let stepLenght: number = this._view.oneStepLenght();

        let sliderBorder: number;
        let eventPos: number;
        let thumbPosition: number;
        let leftPoint: number;
        let rightPoint: number;
        let newVal: number;

        // Позиция бегунка в px вычисляется относительно начала слайдера.
        // Вначале newVal вычисляется как количество шагов от начала (от 0),
        // (то есть значения min, max, reverse не имеют значения).

        if ( !this._view.getVertical() ) {

            sliderBorder = (sliderNode.offsetWidth - sliderLenght) / 2;
            eventPos = event.clientX;         
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().left - sliderBorder;

        } else {

            sliderBorder = (sliderNode.offsetHeight - sliderLenght) / 2;
            eventPos = event.clientY;            
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().top - sliderBorder;

        }
 
        newVal = Math.round(thumbPosition / stepLenght);
        
        if ( this._model.getRange() ) {
            if ( this._activeThumb.classList.contains('slider__thumb_right') ) {
                // если промежуток, то левая граница - это левый бегунок
                // здесь рассчитывается количество шагов от начала (от 0), 
                // затем расстояние в px от начала слайдера.

                // Ошибки в вычислениях с float здесь можно проигнорировать
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
    
        //console.log(newVal);
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

            const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );
            
            let n = f(step) + f(minVal);
            newVal = ( newVal * Math.pow(10, n) * step * reverse  ) / Math.pow(10, n);

            n = Math.max( f(step), f(minVal) );
            newVal = +(newVal.toFixed(n));
            newVal = this._model.getMinVal() + newVal;
            newVal = +(newVal.toFixed(n));
        }
    
        if ( this._model.getRange() && this._activeThumb.classList.contains('slider__thumb_left')) {
            this._model.setRange( [newVal, this._model.getRange()[1]] );
            
        } else if ( this._model.getRange() && this._activeThumb.classList.contains('slider__thumb_right')) {
            this._model.setRange( [this._model.getRange()[0], newVal] );

        } else {
            this._model.setVal(newVal);
        }
        this._view.setThumbPosition(this._activeThumb, thumbPosition);

        console.log('я тут 4' + this._view.getTooltip());
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
        let sliderLenght: number = this._view.getLenght();
        let stepLenght: number = this._view.oneStepLenght();

        let sliderBorder: number;
        let eventPos: number;
        let thumbPosition: number;
        let leftPoint: number;
        let rightPoint: number;
        let newVal: number;

        // Позиция бегунка в px вычисляется относительно начала слайдера.
        // Вначале newVal вычисляется как количество шагов от начала (от 0),
        // (то есть значения min, max, reverse не имеют значения).

        if ( !this._view.getVertical() ) {

            sliderBorder = (sliderNode.offsetWidth - sliderLenght) / 2;
            eventPos = event.clientX;            
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().left - sliderBorder;

        } else {

            sliderBorder = (sliderNode.offsetHeight - sliderLenght) / 2;
            eventPos = event.clientY;            
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().top - sliderBorder;

        }

        newVal = Math.round(thumbPosition / stepLenght);
        //console.log(newVal);
        
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

            const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );
            
            let n = f(step) + f(minVal);
            newVal = ( newVal * Math.pow(10, n) * step * reverse  ) / Math.pow(10, n);

            n = Math.max( f(step), f(minVal) );
            newVal = +(newVal.toFixed(n));
            newVal = this._model.getMinVal() + newVal;
            newVal = +(newVal.toFixed(n));
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
            let val: number | string | Date;
            //val = this._model.getCustomValues() ? this._model.getCustomValues()[newVal] : newVal;
            val = this._model.getTranslatedVal( this._model.getStepNumber( newVal ) );

            this._view.setValToTooltip( changingThumb.querySelector('.slider__tooltip'), val, this._view.getTooltipMask() ); 


/*             if (!model.getRange()) { 
    
                val = model.getTranslatedVal( model.getStepNumber( model.getVal() ) );
                view.setValToTooltip( view.getTooltip(), val as string, view.getTooltipMask() );   
            } else {
                val = model.getTranslatedVal( model.getStepNumber( model.getRange()[0] ) );
                view.setValToTooltip( view.getTooltip(1), val as string, view.getTooltipMask() ); 
    
                val = model.getTranslatedVal( model.getStepNumber( model.getRange()[1] ) );
                view.setValToTooltip( view.getTooltip(2), val as string, view.getTooltipMask() ); 
            } */



        }
    }

    change(options: any): void {

        let model = this._model;
        let view = this._view;

        let changeThumbPosition: boolean = false;
        let changeTooltipVal: boolean = false;
        let changeScaleDivision: boolean = false;
        let changeValToRange: boolean = false;
        let changeRangeToVal: boolean = false;
        let rebuildScale: boolean = false;
        let rebuildTooltip: boolean = false;

        // 1. МОДЕЛЬ
        // если меняется какой либо параметр в модели, запускаем проверки модели,
        // присваиваем новые значения.
        // запоминаем, что нужно изменить положения ползунков, значения в подсказках,
        // делений шкалы (значения и left). 
        // Если изменилось количество шагов - true на перерисовать шкалу.
        // Если поменялось val на range, или наоборот - true на построить! бегунки.


        let modelOptions = ['dataFormat', 'initialVal', 'minVal', 'maxVal', 'step', 'reverse', 'range', 'customValues', 'initialValInCustomValues', 'initialValNumInCustomValues', 'initialRangeInCustomValues', 'initialRangeNumInCustomValues'];

        let test: boolean = false;
        
        modelOptions.forEach(function(item) {
            if ( options.hasOwnProperty(item) ) {
                test = true;
                return;
            }
        });

        console.log(test);
        
        if ( test ) {
            let prevNumOfSteps: number = model.numberOfSteps();
            let prevOptions: IModelOptions = model.getOptions();
            let newOptions: IOptions = Object.assign({}, prevOptions, options);

            model.change(newOptions);

            view.setNumberOfSteps( model.numberOfSteps() );
            view.setScaleStep( view.scaleStepValidation( model, view.getScaleStep() ) );

            changeThumbPosition = true;
            changeTooltipVal = true;
            changeScaleDivision = true;
            if ( prevNumOfSteps != model.numberOfSteps() ) {
                rebuildScale = true;
            }
            if ( view.getRange() && !model.getRange() ) {
                changeRangeToVal = true;
                rebuildTooltip = true;
            }
            if ( !view.getRange() && model.getRange() ) {
                changeValToRange = true;
                rebuildTooltip = true;
            }
        }

        // 2. ВИД
        // Перерисовываем вид от самых глобальных изменений к самым незначительным.
        
        // 2.1 Самое большое изменение - это вид основы шкалы.
        // Ее изменение вызывает: изменить положения ползунков, делений шкалы

        if ( options.hasOwnProperty('vertical') || options.hasOwnProperty('width') || options.hasOwnProperty('height')) {
            view.changeSliderBase(options);
            changeThumbPosition = true;
            changeScaleDivision = true;
        }

        // 2.2 Меняем количество бегунков, если нужно
        // Если такое изменение было, значит везде,
        // где надо, уже стоит true

        if ( changeRangeToVal ) {
            view.changeRangeToVal(model);
            view.getThumb().addEventListener("mousedown", this.thumbOnMouseDown);
        }
        if ( changeValToRange ) {
            view.changeValToRange(model);
            view.getThumb(1).addEventListener("mousedown", this.thumbOnMouseDown);
            view.getThumb(2).addEventListener("mousedown", this.thumbOnMouseDown);
        }   

        // 2.3 Шкала. Удаляем, строим или перестраиваем. Изменяем деления.

        if ( options.hasOwnProperty('scaleStep') && options.scaleStep != view.getScaleStep() ) {
            view.setScaleStep( view.scaleStepValidation(model, options.scaleStep) );
            rebuildScale = true;
            changeScaleDivision = true;
        }
        if ( options.hasOwnProperty('scaleMask') && options.scaleMask != view.getScaleMask() ) {
            view.setScaleMask( options.scaleMask );
            changeScaleDivision = true;
        }
        // удаляем
        if ( options.hasOwnProperty('scale') && options.scale == false && view.getScale() ) {
            view.setScale( view.removeNode( view.getScale() ) );
            changeScaleDivision = false;
            rebuildScale = false;
        }
        // строим
        if ( options.hasOwnProperty('scale') && options.scale == true && !view.getScale() ) {
            let scale: HTMLDivElement;
            scale = view.buildScale(view.getSlider(), view.getScaleStep(), model, view.getScaleMask() );
            view.setScale(scale);

            rebuildScale = false;
            changeScaleDivision = false;
        }
        // перестраиваем
        if ( rebuildScale && view.getScale() ) {
            console.log('я тут 2');
            view.rebuildScale(model);
            changeScaleDivision = true;
        }
        // изменяем деления. значение и left
        if ( changeScaleDivision && view.getScale() ) {
            view.changeScaleDivision(model);
        }


        // 2.4 Подсказки. Удаляем. Строим. Меняем значения

        if ( options.hasOwnProperty('tooltipMask') && options.tooltipMask != view.getTooltipMask() ) {
            view.setTooltipMask( options.tooltipMask );
            changeTooltipVal = true;
        }
        // удаляем
        if ( options.tooltip == false || rebuildTooltip ) {
            if ( view.getTooltip() ) view.setTooltip( view.removeNode(view.getTooltip(0)), 0 );
            if ( view.getTooltip(1) ) view.setTooltip( view.removeNode(view.getTooltip(1)), 1 );
            if ( view.getTooltip(2) ) view.setTooltip( view.removeNode(view.getTooltip(2)), 2 );

            if ( options.tooltip == false ) {
                rebuildTooltip = false;
            }
            changeTooltipVal = false;
        }
        // перестраиваем
        if ( options.tooltip || rebuildTooltip ) {
            view.buildValidTooltips(model);

            changeTooltipVal = false;
        }
        // меняем значения
        if ( changeTooltipVal && (view.getTooltip() || view.getTooltip(1)) ) {
            let val: number | string | Date;

            if (!model.getRange()) { 
    
                val = model.getTranslatedVal( model.getStepNumber( model.getVal() ) );
                view.setValToTooltip( view.getTooltip(), val as string, view.getTooltipMask() );   
            } else {
                val = model.getTranslatedVal( model.getStepNumber( model.getRange()[0] ) );
                view.setValToTooltip( view.getTooltip(1), val as string, view.getTooltipMask() ); 
    
                val = model.getTranslatedVal( model.getStepNumber( model.getRange()[1] ) );
                view.setValToTooltip( view.getTooltip(2), val as string, view.getTooltipMask() ); 
            }
        } 


        // 2.5 Положения бегунков

        if ( changeThumbPosition ) {
            let pos: number;

            if ( !model.getRange() ) {

                pos = view.findThumbPosition( model.getStepNumber(model.getVal()), model.numberOfSteps() );
                view.setThumbPosition( view.getThumb(), pos);

            } else {     
    
                pos = view.findThumbPosition( model.getStepNumber(model.getRange()[0]), model.numberOfSteps() );
                view.setThumbPosition( view.getThumb(1), pos);
    
                pos = view.findThumbPosition( model.getStepNumber(model.getRange()[1]), model.numberOfSteps() );
                view.setThumbPosition( view.getThumb(2), pos);
            }
        }
    }
}