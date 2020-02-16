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

        options = Object.assign(defaultOptions, options);
        this._model = new Model(options);

        options = Object.assign(options, this._model.data);
        this._view = new View(options, node);


        let that = this;

        this._model.attach(function(config: any): void {
            that._view.update(config);
            //that.notify(config);
        });

        this._view.attach(function(config: any): void {
            that._model.update(config);
            //that.notify(config);
        });
    }

/*     pushViewChanges(activeThumb: HTMLDivElement, newThumbPosition: number): void {
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
        //@ts-ignore
        this._model.makeSlimChanges(key, value);
    } */

/*     pushSlimModelChanges() {
        this._view.makeSlimChanges(this._model);
        this.notify();
    }

    pushFullModelChanges() {
        this._view.makeFullChanges(this._model);
        //this.notify();
    } */

    update(config: any): void {

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
            config.options = Object.assign(config.options, this._model.data);
            this._view.update(config);
            config.options = this.data
        }

        if (isModelUpdated || isViewUpdated) {
            this.notify(config);
        }
    }

    // ?????????????????????????????????????????????????????????????
    get data(): IOptions {
        return Object.assign({}, this._model.data, this._view.data);
    }  
}

export default Presenter;