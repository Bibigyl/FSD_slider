// import styles
import './slider.css';


import { IOptions } from './MVP/defaultOptions';
import Model, { IModel, IModelOptions } from './MVP/Model';
import View, { IView } from './MVP/View';
import Presenter, { IPresenter } from './MVP/Presenter';


interface ISlider {
    update(options: Record<string, any>): void;
    subscribe(func: Function): void;
}

class Slider implements ISlider {

    private _model: IModel;
    private _view: IView;
    private _presenter: IPresenter;

    constructor(options: Record<string, any>, node: HTMLDivElement) {

        const optionsForModel: Record<string, any> = Object.assign({}, options);
        this._model = new Model(optionsForModel);

        const optionsForView: IModelOptions = Object.assign({}, options, this._model.getOptions());
        this._view = new View(optionsForView, node);

        this._presenter = new Presenter(this._model, this._view);
    }

    public subscribe(func: Function): void {
        this._presenter.subscribe(func);
    }

    public update(options: IOptions): void {
        this._presenter.update(options);
    }
}

export { ISlider };
export default Slider;