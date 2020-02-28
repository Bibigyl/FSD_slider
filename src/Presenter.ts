import { IOptions, defaultOptions } from './defaultOptions';
import Model, { IModel, IModelOptions } from './Model';
import View, { IView } from './View';
import { IObservable, Observable, ModelMessage, ViewMessage, ObservablePresenter }  from './Observer';
import { IWarnings } from './validations';


interface IPresenter extends IObservable {
    update(options: IOptions): void;

    getOptions(): IOptions;
    getWarnings(): IWarnings;
}

class Presenter extends ObservablePresenter implements IPresenter {

    private _model: IModel;
    private _view: IView;

    constructor(options: IOptions, node: HTMLDivElement) {

        super();

        options = Object.assign({}, defaultOptions, options);
        this._model = new Model(options);

        options = Object.assign(options, this._model.getOptions());
        this._view = new View(options, node);


        let that = this;

        this._model.subscribe(function(message: ModelMessage): void {

            switch (message.type) {
                case 'NEW_VALUE':
                    that._view.update(message.options);
                    that.notify(that.getOptions());
                    break;
            }
        });

        this._view.subscribe(function(message: ViewMessage): void {

            switch (message.type) {
                case 'LAST_THUMB_MOVED':
                    !that._model.getOptions().reverse ?
                    that._model.setEndByOffsetRacio(message.offsetRacio) :
                    that._model.setBeginByOffsetRacio(message.offsetRacio);
                    break;

                case 'FIRST_THUMB_MOVED':
                    !that._model.getOptions().reverse ?
                    that._model.setBeginByOffsetRacio(message.offsetRacio) :
                    that._model.setEndByOffsetRacio(message.offsetRacio);
                    break;
            }
        });
    }


    public update(options: IOptions): void {

        let isModelUpdated: boolean = false;
        let isViewUpdated: boolean = false;

        let modelOptions: string[] = ['value', 'min', 'max', 'step', 'reverse', 'range', 'customValues'];

        modelOptions.forEach(function(item) {
            if ( options.hasOwnProperty(item) ) {
                isModelUpdated = true;
                return;
            }
        });

        if (isModelUpdated) { 
            this._model.update(options);
            isViewUpdated = true;
        }


        let viewOptions: string[] = ['length', 'vertical', 'tooltip', 'scale'];

        viewOptions.forEach(function(item) {
            if ( options.hasOwnProperty(item) ) {
                isViewUpdated = true;
                return;
            }
        });

        if (isViewUpdated) {
            options = Object.assign(options, this._model.getOptions());
            this._view.rerender(options);
        }

        if (isModelUpdated || isViewUpdated) {

            //let warnings = this.getWarnings();
            //if ( Object.keys(warnings).length != 0 ) { warnings = undefined }

            this.notify( this.getOptions(), this.getWarnings() );
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