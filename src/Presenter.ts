import { IOptions, defaultOptions } from './defaultOptions';
import Model, { IModel, IModelOptions } from './Model';
import View, { IView } from './View';
import { IObservable, Observable, IMessage }  from './Observer';
import { IWarnings } from './validations';


interface IPresenter extends IObservable {
    //data(): IOptions;
    //update(message: any): void;
    update(options: IOptions): void;

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

/*         this._model.subscribe(function(message: any): void {
            that._view.update(message);
            that.emit(message);
        });

        this._view.subscribe(function(message: any): void {
            that._model.update(message);
            that.emit(message);
        }); */

        this._model.subscribe(function(message: IMessage): void {
            switch (message.type) {
                case 'NEW_VALUE':
                    that._view.update(message.options);
                    that.emit({
                        type: 'NEW_DATA',
                        //options: that._model.getOptions() 
                        options: that.getOptions()                      
                    })

            }
        });

        this._view.subscribe(function(message: IMessage): void {
            switch (message.type) {
                case 'NEW_POSITION':
                    that._model.setValueByPercent(message.percent, message.index);
            }
        });
    }


    update(options: IOptions): void {

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
            this.emit({
                type: 'NEW_DATA',
                options: this.getOptions()
            });

            let warnings = this.getWarnings();
            if ( Object.keys(warnings).length != 0 ) {
                this.emit({
                    type: 'WARNINGS',
                    warnings: warnings
                });            
            }
        }
    }



    /*     public update(message: any): void {

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
    } */



    public getOptions(): IOptions {
        return Object.assign({}, this._model.getOptions(), this._view.getOptions());
    }

    public getWarnings(): IWarnings {
        return Object.assign({}, this._model.getWarnings(), this._view.getWarnings());
    }
}

export default Presenter;