import IOptions from './defaultOptions';
import Model, { IModel } from './Model';
import { IModelOptions } from './Model';
import View, { IView } from './View';
import { ISubject }  from './Observer';
import { IObserver }  from './Observer';

interface IPresenter {
}

class Presenter implements IObserver, IPresenter {

    private _model: IModel;
    private _view: IView;

    constructor(options: IOptions, node: HTMLDivElement) {

        this._model = new Model(options);
        options = this.joinOptions(options);

        this._view = new View(options, node);

        this._model.attach(this);
        this._view.attach(this);
    }

    pushSlimViewChanges(subject: IView) {
        let percent: number = subject.newThumbPosition;
        let newValue: number;
        let notify: boolean;

        newValue = percent * (this._model.max - this._model.min) / 100;
        newValue = !this._model.reverse ? 
        this._model.min + newValue :
        this._model.max - newValue;
        newValue = this._model.findClosestStep(newValue, this._model);


        if ( subject.activeThumb == this._view.thumb ) {
            notify = this._model.value == newValue;
            this._model.value = newValue;

        } else if ( subject.activeThumb == this._view.thumbFirst ) {
            notify = this._model.range[0] == newValue;
            this._model.range[0] = newValue;

        } else {
            notify = this._model.range[1] == newValue;
            this._model.range[1] = newValue;
        }

        if (notify) {
            this._model.notify('slimChanges');
        }
    }

    pushFullViewChanges(subject: IView) {

    }

    pushSlimModelChanges(subject) {
        this._view.setThumbs(subject);
        this._view.setLinePosition();
        this._view.setTooltipValues(this._model);
    }

    pushFullModelChanges(subject) {

    }

    private joinOptions(options: IOptions): IOptions {
        for (let key in options) {
            options[key] = this._model[key] || options[key];
        }
        return options;
    }
}

export default Presenter;