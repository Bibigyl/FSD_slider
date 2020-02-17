import { IOptions, defaultOptions } from './defaultOptions';
import Model, { IModel, IModelOptions } from './Model';
import View, { IView } from './View';
import { ISubject, Subject }  from './Observer';

interface IPresenter extends ISubject {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //data(): IOptions;
    update(config: any): void;

}

class Presenter extends Subject implements IPresenter {

    private _model: IModel;
    private _view: IView;

    constructor(options: IOptions, node: HTMLDivElement) {

        super();

        options = Object.assign({}, defaultOptions, options);
        this._model = new Model(options);

        options = Object.assign(options, this._model.getOptions());
        this._view = new View(options, node);


        let that = this;

        this._model.attach(function(config: any): void {
            that._view.update(config);
            that.notify(config);
        });

        this._view.attach(function(config: any): void {
            that._model.update(config);
            that.notify(config);
        });
    }


    update(config: any): void {

        this._model.update(config);
        config.options = Object.assign(config.options, this._model.getOptions());
        this._view.update(config);

    }


/*     update(config: any): void {

        let isModelUpdated: boolean = false;
        let isViewUpdated: boolean = false;

        let modelOptions: string[] = ['value', 'min', 'max', 'step', 'reverse', 'range', 'customValues'];

        modelOptions.forEach(function(item) {
            if ( config.options.hasOwnProperty(item) ) {
                isModelUpdated = true;
                return;
            }
        });

        if (isModelUpdated) { 
            this._model.update(config);
            isViewUpdated = true;
        }


        let viewOptions: string[] = ['length', 'vertical', 'tooltip', 'scale'];

        viewOptions.forEach(function(item) {
            if ( config.options.hasOwnProperty(item) ) {
                isViewUpdated = true;
                return;
            }
        });

        if (isViewUpdated) {
            config.options = Object.assign(config.options, this._model.getOptions());
            this._view.update(config);
            config.options = this.getOptions()
        }

        if (isModelUpdated || isViewUpdated) {
            //this.notify(config);
        }
    } */

    getOptions(): IOptions {
        return Object.assign({}, this._model.getOptions(), this._view.getOptions());
    }  
}

export default Presenter;