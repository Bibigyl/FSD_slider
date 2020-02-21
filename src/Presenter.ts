import { IOptions, defaultOptions } from './defaultOptions';
import Model, { IModel, IModelOptions } from './Model';
import View, { IView } from './View';
import { ISubject, Subject }  from './Observer';
import { IWarnings } from './validations';
import { deepEqual, findClosestStep } from './commonFunctions';

interface IPresenter extends ISubject {
    update(config: any): void;

    getOptions(): IOptions;
    getWarnings(): IWarnings;
    // ?????
    setLastUpdate(value: string): void;
}

/* const lastUpdate = {
    NEW_OPTIONS: 'NEW_OPTIONS',
    NEW_VALUE: 'NEW_VALUE',
    MODEL: 'MODEL',
    VIEW: 'VIEW',
    OUTER_DATA: 'NEW_OUTER_OPTIONS'
}; */

// МЕТОДЫ updateModel И updateView - ЭТО АНАЛОГИ РЕДЬЮСЕРОВ В REDUX.
// РАЗНИЦА В ТОМ ЧТО ЭТО НЕ ЧИСТЫЕ ФУНКЦИИ, ПОТОМУ ЧТО МОДЕЛЬ И ВИД НЕ ЯВЛЯЮТСЯ ПОЛНОЦЕННЫМИ STORE

const updateModel = function(action) {

    let prevOptions = this.getOptions();
    this.validate(Object.assign({}, prevOptions, action.options))
    let validOptions: IModelOptions = this.normalize(action.options, prevOptions);
    
    if ( deepEqual(prevOptions, validOptions) ) {
        return;              
    }

    this.setOptions(validOptions);

    switch (action.type) {
        case 'SET_NEW_OPTIONS':
            this._lastUpdate = 'NEW_OPTIONS';
            break;

        case 'SET_NEW_VALUE':
            this._lastUpdate = 'NEW_VALUE';
            break;
    }

    this.notify();
};

const updateView = function(action) {

    switch (action.type) {
        case 'SET_NEW_POSITION':
            this.setThumbs(action.options);
            this.setBarPosition();
            if (this._tooltip || this._tooltipFirst) {
                this.setTooltipValues(action.options);
            }

            this._lastUpdate = 'NEW_POSITION';
            break;

        case 'SET_NEW_OPTIONS':
            action.options = Object.assign({}, this.getOptions(), action.options);

            this.validate(action.options);
            this.rebuild(action.options);

            this._lastUpdate = 'NEW_OPTIONS';
            break;
    }
};

// МОДЕЛЬ И ВИД - ЭТО ПОДОБИЕ STORE. ОНИ НАСЛЕДУЮТ ОТ КЛАССА STORE, ОН ВРЕМЕННО В ПАПКЕ OBSERVER


class Presenter extends Subject implements IPresenter {

    private _model: IModel;
    private _view: IView;

    private _lastUpdate;

    constructor(options: IOptions, node: HTMLDivElement) {

        super();

        options = Object.assign({}, defaultOptions, options);
        this._model = new Model(options, updateModel);

        options = Object.assign(options, this._model.getOptions());
        this._view = new View(options, node, updateView);


        let that = this;

        this._model.attach(function(action): void {
            that._lastUpdate = 'MODEL';
            that.update(action);
        });

        this._view.attach(function(action): void {
            that._lastUpdate = 'VIEW';
            that.update(action);
        });
    }

    //???
    setLastUpdate(value: string): void {
        this._lastUpdate = value;
    }

    update(options?) {

        let newOptions;
        let action;

        switch ( this._lastUpdate ) {
            
            case 'NEW_OUTER_OPTIONS':

                newOptions = Object.assign({}, this._view.getOptions(), this._model.getOptions(), options); 
                action = {
                    type: 'SET_NEW_OPTIONS',
                    options : newOptions
                }

                this._model.update(action);

                newOptions = Object.assign(newOptions, this._model.getOptions());
                action.options = newOptions;

                this._view.update(action);

                this.notify();
                break;


            case 'MODEL':

                

                switch ( this._model.getLastUpdate() ) {

                    case 'NEW_VALUE':

                        newOptions = this._model.getOptions();

                        action = {
                            type: 'SET_NEW_POSITION',
                            options : newOptions
                        };
                        break;


                    case 'NEW_OPTIONS':

                        newOptions = Object.assign({}, this._view.getOptions(), this._model.getOptions());

                        action = {
                            type: 'SET_NEW_OPTIONS',
                            options : newOptions
                        };
                        break; 
                }

                this._view.update(action);
                this.notify();
                break;


            case 'VIEW':

                if ( this._view.getLastUpdate() == 'NEW_POSITION' ) {

                    let {percent, index} = this._view.getNewIndent();
                    
                    let modelOptions = this._model.getOptions();
                    let newValue: number;

                    newValue = percent * (modelOptions.max - modelOptions.min) / 100;
                    newValue = !modelOptions.reverse ? 
                    modelOptions.min + newValue :
                    modelOptions.max - newValue;
            
                    newValue = findClosestStep(newValue, modelOptions);
            
                    if ( !modelOptions.range ) {
                        newOptions = {value: newValue}
            
                    } else {
            
                        let isFirstInRange: boolean;
                        isFirstInRange = index == 0 && !modelOptions.reverse;
                        isFirstInRange = isFirstInRange || index == 1 && modelOptions.reverse;
            
                        if (isFirstInRange) {
                            newValue = Math.min(newValue, modelOptions.range[1]);
                            newOptions = {range: [newValue, modelOptions.range[1]]}
            
                        } else {
                            newValue = Math.max(newValue, modelOptions.range[0]);
                            newOptions = {range: [modelOptions.range[0], newValue]}
                        }
                    }

                    action = {
                        type: 'SET_NEW_VALUE',
                        options: newOptions
                    }

                    this._model.update(action);

                } 

        }
    }


    public getOptions(): IOptions {
        return Object.assign({}, this._model.getOptions(), this._view.getOptions());
    }

    public getWarnings(): IWarnings {
        return Object.assign({}, this._model.getWarnings(), this._view.getWarnings());
    }
}

export default Presenter;