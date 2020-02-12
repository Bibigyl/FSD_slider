import { IOptions, defaultOptions } from './defaultOptions';
import Model, { IModel, IModelOptions } from './Model';
import View, { IView } from './View';
import { ISubject, Subject }  from './Observer';

interface IPresenter extends ISubject {
    change(options: any): void

    pushViewChanges(activeThumb: HTMLDivElement, newThumbPosition: number): void;
    pushSlimModelChanges(): void;
    pushFullModelChanges(): void;
}

class Presenter extends Subject implements IPresenter {

    private _model: IModel;
    private _view: IView;
    //private observers: IObserver[] = [];

    constructor(options: IOptions, node: HTMLDivElement) {

        super();

        options = Object.assign(defaultOptions, options);
        this._model = new Model(options);

        options = Object.assign(options, this._model.data);
        this._view = new View(options, node);

        this._model.attach(this);
        this._view.attach(this);
    }

    pushViewChanges(activeThumb: HTMLDivElement, newThumbPosition: number): void {
        let percent: number = newThumbPosition;
        let newValue: number;
        let key: string;
        let value: number | number[];

        newValue = percent * (this._model.max - this._model.min) / 100;
        newValue = !this._model.reverse ? 
        this._model.min + newValue :
        this._model.max - newValue;

        if ( !this._model.range ) {
            key = 'value';
            value = newValue;

        } else {
            key = 'range';
            let isThumbFirst: boolean = activeThumb.classList.contains('slider__thumb_first');
            let isReverse: boolean = this._model.reverse;

            if ( (isThumbFirst && !isReverse) || (!isThumbFirst && isReverse) ) {
                newValue = Math.min(newValue, this._model.range[1]);
                value = [newValue, this._model.range[1]];

            } else {
                newValue = Math.max(newValue, this._model.range[0]);
                value = [this._model.range[0], newValue];
            }
        }

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this._model.makeSlimChanges(key, value);
        this.notify();
    }

    pushSlimModelChanges() {
        this._view.makeSlimChanges(this._model);
        this.notify();
    }

    pushFullModelChanges() {
        this._view.makeFullChanges(this._model);
        this.notify();
    }

    change(options: any): void {
        let doesModelChange: boolean = false;
        let doesViewChange: boolean = false;

        let modelOptions: string[] = ['value', 'min', 'max', 'step', 'reverse', 'range', 'customValues'];

        modelOptions.forEach(function(item) {
            if ( options.hasOwnProperty(item) ) {
                doesModelChange = true;
            }
        });

        if (doesModelChange) { 
            this._model.makeFullChanges(options);
            doesViewChange = true;
            options = Object.assign(options, this._model.data);
        }


        let viewOptions: string[] = ['length', 'vertical', 'tooltip', 'scale'];

        viewOptions.forEach(function(item) {
            if ( options.hasOwnProperty(item) ) {
                doesViewChange = true;
            }
        });

        if (doesViewChange) {
            this._view.makeFullChanges(options);
        }
    }

    // observer
    notify() {
        let options = Object.assign({}, this._model.data, this._view.data);

        for (const observer of this.observers) {
            observer.update(options);
        }
    }
    
}

export default Presenter;