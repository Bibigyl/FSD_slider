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

        for (let key in options) {
            options[key] = this._model[key] || options[key];
        }

        this._view = new View(options, node);

        this._model.attach(this);
        this._view.attach(this);
    }

    pushViewChanges(subject) {
        let key: string;

/*         if ( subject.activeThumb.classList.has('slider__thumb_first') ) {
            key = 'range[0]';
        } else if ( subject.activeThumb.classList.has('slider__thumb_last') ) {
            key = 'range[1]';
        } else {
            key = 'value'
        } */

        if ( subject.activeThumb == this._view.thumb ) {
            key = 'value'
        } else if ( subject.activeThumb == this._view.thumbFirst ) {
            key = 'range[0]';
        } else {
            key = 'range[1]';
        }

        this._model.changeValues(key, subject.newThumbPosition);
    }

    pushSlimModelChanges(subject) {
        if (!this._model.range) {
            this.view
        }
    }

    pushFullModelChanges(subject) {

    }
}

export default Presenter;