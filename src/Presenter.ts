import { IOptions, defaultOptions } from './defaultOptions';
import Model, { IModel, IModelOptions } from './Model';
import View, { IView } from './View';
import { IObservable, Observable }  from './Observer';
import { IWarnings } from './validations';


interface IPresenter extends IObservable {
    //data(): IOptions;
    update(message: any): void;

    getOptions(): IOptions;
    getWarnings(): IWarnings;
}

class Presenter extends Observable implements IPresenter {

    private _model: IModel;
    private _view: IView;

    constructor(options: IOptions, node: HTMLDivElement) {

        super();

        options = Object.assign({}, defaultOptions, options);
        this._model = new Model(options);

        options = Object.assign(options, this._model.getOptions());
        this._view = new View(options, node);


        let that = this;

        this._model.subscribe(function(message: any): void {
            that._view.update(message);
            that.emit(message);
        });

        this._view.subscribe(function(message: any): void {
            that._model.update(message);
            that.emit(message);
        });
    }


    public update(message: any): void {

        let options: IOptions;
        let warnings: IWarnings;


        this._model.update(message);

        message.options = Object.assign(message.options, this._model.getOptions());

        this._view.update(message);

        options = this.getOptions();
        this.emit({
            type: 'NEW_DATA',
            options: options
        });

        warnings = this.getWarnings();
        if ( Object.keys(warnings).length != 0 ) {
            //console.log('!!!!!')
            this.emit({
                type: 'WARNINGS',
                warnings: warnings
            });            
        }
    }


/*     update(message: any): void {

        let isModelUpdated: boolean = false;
        let isViewUpdated: boolean = false;

        let modelOptions: string[] = ['value', 'min', 'max', 'step', 'reverse', 'range', 'customValues'];

        modelOptions.forEach(function(item) {
            if ( message.options.hasOwnProperty(item) ) {
                isModelUpdated = true;
                return;
            }
        });

        if (isModelUpdated) { 
            this._model.update(message);
            isViewUpdated = true;
        }


        let viewOptions: string[] = ['length', 'vertical', 'tooltip', 'scale'];

        viewOptions.forEach(function(item) {
            if ( message.options.hasOwnProperty(item) ) {
                isViewUpdated = true;
                return;
            }
        });

        if (isViewUpdated) {
            message.options = Object.assign(message.options, this._model.getOptions());
            this._view.update(message);
            message.options = this.getOptions()
        }

        if (isModelUpdated || isViewUpdated) {
            //this.emit(message);
        }
    } */

    public getOptions(): IOptions {
        return Object.assign({}, this._model.getOptions(), this._view.getOptions());
    }

    public getWarnings(): IWarnings {
        return Object.assign({}, this._model.getWarnings(), this._view.getWarnings());
    }
}

export default Presenter;