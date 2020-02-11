import { IOptions, defaultOptions } from './defaultOptions';
import Model, { IModel, IModelOptions } from './Model';
import View, { IView } from './View';
import { ISubject, IObserver }  from './Observer';

interface IPresenter {
    change(options): void
}

class Presenter implements IObserver, IPresenter {

    private _model: IModel;
    private _view: IView;

    constructor(options: IOptions, node: HTMLDivElement) {

        options = Object.assign(defaultOptions, options);
        this._model = new Model(options);

        options = this.joinOptions(options);
        this._view = new View(options, node);

        this._model.attach(this);
        this._view.attach(this);
    }

    pushViewChanges(subject: IView) {
        let percent: number = subject.newThumbPosition;
        let newValue: number;
        //let notify: boolean;
        let key: string;
        let value: number | number[];

        newValue = percent * (this._model.max - this._model.min) / 100;
        newValue = !this._model.reverse ? 
        this._model.min + newValue :
        this._model.max - newValue;

        if ( subject.activeThumb == this._view.thumb ) {
            key = 'value';
            value = newValue;

        } else if ( subject.activeThumb == this._view.thumbFirst ) {
            key = 'range';
            value = [newValue, this._model.range[1]];

        } else {
            key = 'range';
            value = [this._model.range[0], newValue];
        }

        this._model.makeSlimChanges(key, value);
    }

    pushSlimModelChanges(subject: ISubject) {
        this._view.makeSlimChanges(this._model);
    }

    pushFullModelChanges(subject: ISubject) {
        this._view.makeFullChanges(this._model);
    }

    private joinOptions(options: IOptions): IOptions {
        for (let key in options) {
            options[key] = this._model[key] || options[key];
        }
        return options;
    }

    change(options): void {
        let modelFull: boolean = false;
        //let modelSlim: boolean;
        let viewFull: boolean = false;
        //let viewSlim: boolean;

        let modelOptions: string[] = ['value', 'min', 'max', 'step', 'reverse', 'range', 'customValues'];

        modelOptions.forEach(function(item) {
            if ( options.hasOwnProperty(item) ) {
                modelFull = true;
            }
        });

        if (modelFull) { 
            this._model.makeFullChanges(options);
            viewFull = true;
            options = Object.assign({}, options, this._model);
        }


        let viewOptions: string[] = ['length', 'vertical', 'tooltip', 'scale'];

        viewOptions.forEach(function(item) {
            if ( options.hasOwnProperty(item) ) {
                viewFull = true;
            }
        });

        if (viewFull) {
            this._view.makeFullChanges(options);
        }
    }
    
}

export default Presenter;