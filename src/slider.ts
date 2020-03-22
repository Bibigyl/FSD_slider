import { IOptions } from './MVP/defaultOptions';
import Model, { IModel, IModelOptions } from './MVP/Model';
import View, { IView } from './MVP/View';
import Presenter, { IPresenter } from './MVP/Presenter';


interface ISlider {
    update(options: {}): void;
    subscribe(func: Function): void;
}

class Slider implements ISlider {

    private _presenter: IPresenter;

    constructor(options: {}, node: HTMLElement) {

        const optionsForModel: {} = Object.assign({}, options);
        const model: IModel = new Model(optionsForModel);

        const optionsForView: IModelOptions = Object.assign({}, options, model.getOptions());
        const view: IView = new View(optionsForView, node);

        this._presenter = new Presenter(model, view);
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
