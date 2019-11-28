import IOptions, { defaultOptions } from './defaultOptions';
import {IModel} from './Model';
import {IModelOptions} from './Model';
import {IView} from './View';
import {ISubject}  from './Observer';

class Presenter {

    private _model: IModel;
    private _view: IView;
    private _subject: ISubject;

    private _activeThumb: HTMLDivElement;

    constructor(model: IModel, view: IView, subject: ISubject) {

        this._model = model;
        this._view = view;
        this._subject = subject;

        this.thumbOnDown = this.thumbOnDown.bind(this);
        this.thumbOnMove = this.thumbOnMove.bind(this);
        this.thumbOnUp = this.thumbOnUp.bind(this);

        this.sliderOnClick = this.sliderOnClick.bind(this);
      
        if ( !model.getRange() ) {
            view.getThumb().addEventListener("mousedown", this.thumbOnDown);
            view.getThumb().addEventListener("touchstart", this.thumbOnDown);
        } else {
            view.getThumb(1).addEventListener("mousedown", this.thumbOnDown);
            view.getThumb(2).addEventListener("mousedown", this.thumbOnDown);

            view.getThumb(1).addEventListener("touchstart", this.thumbOnDown);
            view.getThumb(2).addEventListener("touchstart", this.thumbOnDown);
        }  

        view.getSlider().addEventListener("click", this.sliderOnClick);
    }

    private thumbOnDown(event): void {
        // предотвратить запуск выделения (действие браузера)
        event.preventDefault();
        event.stopPropagation();

        this._activeThumb = event.currentTarget;

        document.addEventListener('mousemove', this.thumbOnMove);
        document.addEventListener('mouseup', this.thumbOnUp);
        document.addEventListener('touchmove', this.thumbOnMove);
        document.addEventListener('touchend', this.thumbOnUp);
    }

    private thumbOnMove(event): void {

        let model: IModel = this._model;
        let view: IView = this._view;

        let sliderNode: HTMLDivElement = this._view.getSlider();
      
        let minVal: number = this._model.getMinVal();
        let maxVal: number = this._model.getMaxVal();
        let step: number = this._model.getStep();
        let reverse: number = !this._model.getReverse() ? 1 : -1;
        let sliderLenght: number = this._view.getLenght();
        let stepLenght: number = this._view.findOneStepLenght();

        let sliderBorder: number;
        let eventPos: number;
        let thumbPosition: number;
        let leftPoint: number;
        let rightPoint: number;
        let newVal: number;

        // Позиция бегунка в px вычисляется относительно начала слайдера.
        // Вначале newVal вычисляется как количество шагов от начала (от 0),
        // (то есть значения min, max, reverse не имеют значения).

        if ( !view.getVertical() ) {

            sliderBorder = (sliderNode.offsetWidth - sliderLenght) / 2;
            eventPos = event.clientX || event.touches[0].clientX;         
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().left - sliderBorder;

        } else {

            sliderBorder = (sliderNode.offsetHeight - sliderLenght) / 2;
            eventPos = event.clientY || event.touches[0].clientY;            
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().top - sliderBorder;
        }
 
        newVal = Math.round(thumbPosition / stepLenght);
        
        if ( model.getRange() ) {
            if ( this._activeThumb.classList.contains('slider__thumb_right') ) {
                // если промежуток, то левая граница - это левый бегунок
                // здесь рассчитывается количество шагов от начала (от 0), 
                // затем расстояние в px от начала слайдера.

                // Ошибки в вычислениях с float здесь можно проигнорировать
                leftPoint = (model.getRange()[0] - minVal) * reverse / step;
                leftPoint = leftPoint * stepLenght;
                rightPoint = sliderLenght;

                minVal = model.getRange()[0];
            } else {
                rightPoint = (model.getRange()[1] - minVal) * reverse / step;
                rightPoint = rightPoint * stepLenght;
                leftPoint = 0;

                maxVal = model.getRange()[1];
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

            const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );
            
            let n = f(step) + f(minVal);
            newVal = ( newVal * Math.pow(10, n) * step * reverse  ) / Math.pow(10, n);

            n = Math.max( f(step), f(minVal) );
            newVal = +((+newVal).toFixed(n));
            newVal = (+model.getMinVal()) + (+newVal);
            newVal = +((+newVal).toFixed(n));
        }
    
        if ( model.getRange() && this._activeThumb.classList.contains('slider__thumb_left')) {
            model.setRange( [newVal, model.getRange()[1]] );
            
        } else if ( model.getRange() && this._activeThumb.classList.contains('slider__thumb_right')) {
            model.setRange( [model.getRange()[0], newVal] );

        } else {
            model.setVal(newVal);
        }

        view.setThumbPosition(this._activeThumb, thumbPosition);

        if ( view.getTooltip() || view.getTooltip(1) ) {
            let val: number | string | Date;
            val = model.translate(newVal);

            view.setValToTooltip( this._activeThumb.querySelector('.slider__tooltip'), val, view.getTooltipMask() ); 
        }
    }
    
    private thumbOnUp(event): void {

        document.removeEventListener('mouseup', this.thumbOnUp);
        document.removeEventListener('mousemove', this.thumbOnMove);
        document.removeEventListener('touchend', this.thumbOnUp);
        document.removeEventListener('touchmove', this.thumbOnMove);

        this._activeThumb = undefined;
        // наблюдатель
        let model: IModel = this._model;

        if ( model.getVal() != null ) {
            let val: number | string | Date;
            val = model.translate( model.getVal() );
            this._subject.val = val;

        } else {
            let val: number | string | Date;
            this._subject.val = [];

            val = model.translate( model.getRange()[0] );
            this._subject.val[0] = val;

            val = model.translate( model.getRange()[1] );
            this._subject.val[1] = val;
        }
        this._subject.notify();
    }

    private sliderOnClick(event): void {

        let model: IModel = this._model;
        let view: IView = this._view;

        let sliderNode: HTMLDivElement = this._view.getSlider();
        let changingThumb: HTMLDivElement;
      
        let minVal: number = this._model.getMinVal();
        let maxVal: number = this._model.getMaxVal();
        let step: number = this._model.getStep();
        let reverse: number = !this._model.getReverse() ? 1 : -1;
        let sliderLenght: number = this._view.getLenght();
        let stepLenght: number = this._view.findOneStepLenght();

        let sliderBorder: number;
        let eventPos: number;
        let thumbPosition: number;
        let leftPoint: number;
        let rightPoint: number;
        let newVal: number;

        // Позиция бегунка в px вычисляется относительно начала слайдера.
        // Вначале newVal вычисляется как количество шагов от начала (от 0),
        // (то есть значения min, max, reverse не имеют значения).

        if ( !view.getVertical() ) {

            sliderBorder = (sliderNode.offsetWidth - sliderLenght) / 2;
            eventPos = event.clientX || event.touches[0].clientX;         
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().left - sliderBorder;

        } else {

            sliderBorder = (sliderNode.offsetHeight - sliderLenght) / 2;
            eventPos = event.clientY || event.touches[0].clientY;            
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().top - sliderBorder;
        }

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

            const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );
            
            let n = f(step) + f(minVal);
            newVal = ( newVal * Math.pow(10, n) * step * reverse  ) / Math.pow(10, n);

            n = Math.max( f(step), f(minVal) );
            newVal = +((+newVal).toFixed(n));
            newVal = (+model.getMinVal()) + (+newVal);
            newVal = +((+newVal).toFixed(n));
        }

        if ( !model.getRange() ) {
            model.setVal(newVal);
            changingThumb = view.getThumb();
            view.setThumbPosition(changingThumb, thumbPosition);

        } else {
            if ( Math.abs(newVal - model.getRange()[0]) < Math.abs(newVal - model.getRange()[1]) ) {
                model.setRange([ newVal, model.getRange()[1] ]);
                changingThumb = view.getThumb(1);
                view.setThumbPosition(changingThumb, thumbPosition);
            } else {
                model.setRange([ model.getRange()[0], newVal ]);
                changingThumb = view.getThumb(2);
                view.setThumbPosition(changingThumb, thumbPosition);
            }
        }
    
        if ( view.getTooltip() || view.getTooltip(1) ) {
            let val: number | string | Date;
            val = model.translate(newVal);

            view.setValToTooltip( changingThumb.querySelector('.slider__tooltip'), val, view.getTooltipMask() ); 
        }

        // наблюдатель
        if ( model.getVal() != null ) {
            let val: number | string | Date;
            val = model.translate( model.getVal() );
            this._subject.val = val;

        } else {
            let val: number | string | Date;
            this._subject.val = [];

            val = model.translate( model.getRange()[0] );
            this._subject.val[0] = val;

            val = model.translate( model.getRange()[1] );
            this._subject.val[1] = val;
        }
        this._subject.notify();
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


        let modelOptions = ['dataFormat', 'value', 'minVal', 'maxVal', 'step', 'reverse', 'range', 'customValues', 'valueInCustomValues', 'rangeInCustomValues'];

        let test: boolean = false;
        
        modelOptions.forEach(function(item) {
            if ( options.hasOwnProperty(item) ) {
                test = true;
                return;
            }
        });
        
        if ( test ) {
            let prevNumOfSteps: number = model.getNumberOfSteps();
            let prevOptions: IModelOptions = model.getOptions();
            let newOptions: IOptions = Object.assign({}, prevOptions, options);

            model.change(newOptions);

            view.setNumberOfSteps( model.getNumberOfSteps() );
            view.setScaleStep( view.findValidScaleStep( model, view.getScaleStep() ) );

            changeThumbPosition = true;
            changeTooltipVal = true;
            changeScaleDivision = true;

            if ( prevNumOfSteps != model.getNumberOfSteps() ) {
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
        // Ее изменение вызывает: изменить положения бегунков, делений шкалы

        if ( options.hasOwnProperty('vertical') || options.hasOwnProperty('length') ) {
            view.changeSliderBase(options);
            changeThumbPosition = true;
            changeScaleDivision = true;
        }

        // 2.2 Меняем количество бегунков, если нужно
        // Если такое изменение было, значит везде,
        // где надо, уже стоит true

        if ( changeRangeToVal ) {
            view.changeRangeToVal(model);

            view.getThumb().addEventListener("mousedown", this.thumbOnDown);
            view.getThumb().addEventListener("touchstart", this.thumbOnDown);
        }
        if ( changeValToRange ) {
            view.changeValToRange(model);
            view.getThumb(1).addEventListener("mousedown", this.thumbOnDown);
            view.getThumb(2).addEventListener("mousedown", this.thumbOnDown);
            view.getThumb(1).addEventListener("touchstart", this.thumbOnDown);
            view.getThumb(2).addEventListener("touchstart", this.thumbOnDown);
        }   

        // 2.3 Шкала. Удаляем, строим или перестраиваем. Изменяем деления.

        if ( options.hasOwnProperty('scaleStep') && options.scaleStep != view.getScaleStep() ) {
            view.setScaleStep( view.findValidScaleStep(model, options.scaleStep) );
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
        if ( !view.getTooltip() && !view.getTooltip(1) && !options.hasOwnProperty('tooltip') ) {
            rebuildTooltip = false;
            changeTooltipVal = false;
        }
        // удаляем
        if ( options.tooltip == false || rebuildTooltip ) {

            // почему в другом порядке не работает
            if ( view.getTooltip(2) ) view.setTooltip( view.removeNode(view.getTooltip(2)), 2 );
            if ( view.getTooltip(1) ) view.setTooltip( view.removeNode(view.getTooltip(1)), 1 );
            if ( view.getTooltip() ) view.setTooltip( view.removeNode(view.getTooltip(0)), 0 );

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
    
                val = model.translate( model.getVal() );
                view.setValToTooltip( view.getTooltip(), val as string, view.getTooltipMask() );   
            } else {

                val = model.translate( model.getRange()[0] );
                view.setValToTooltip( view.getTooltip(1), val as string, view.getTooltipMask() ); 
    
                val = model.translate( model.getRange()[1] );
                view.setValToTooltip( view.getTooltip(2), val as string, view.getTooltipMask() ); 
            }
        } 


        // 2.5 Положения бегунков

        if ( changeThumbPosition ) {
            let pos: number;

            if ( !model.getRange() ) {

                pos = view.findThumbPosition( model.getStepNumber(model.getVal()), model.getNumberOfSteps() );
                view.setThumbPosition( view.getThumb(), pos);

            } else {     
    
                pos = view.findThumbPosition( model.getStepNumber(model.getRange()[0]), model.getNumberOfSteps() );
                view.setThumbPosition( view.getThumb(1), pos);
    
                pos = view.findThumbPosition( model.getStepNumber(model.getRange()[1]), model.getNumberOfSteps() );
                view.setThumbPosition( view.getThumb(2), pos);
            }

            // наблюдатель
            // вызываем если были изменения связанные с бегунками
            // не затронет, например, добавление шкалы
            if ( model.getVal() != null ) {
                let val: number | string | Date;
                val = model.translate( model.getVal() );
                this._subject.val = val;

            } else {
                let val: number | string | Date;
                this._subject.val = [];

                val = model.translate( model.getRange()[0] );
                this._subject.val[0] = val;

                val = model.translate( model.getRange()[1] );
                this._subject.val[1] = val;
            }
            this._subject.notify();
        }
    }
}

export default Presenter