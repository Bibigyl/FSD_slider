import Presenter, { IPresenter } from './MVP/Presenter';
import Model, { IModel } from './MVP/Model';
import { IModelOptions, IOptions } from './MVP/options';
import View, { IView } from './MVP/View';

interface ISlider {
  update(options: IOptions): void;
  subscribe(func: Function): void;
}

class Slider implements ISlider {
  private presenter: IPresenter;

  constructor(options: IOptions, node: HTMLElement) {
    const optionsForModel: IModelOptions = { ...options };
    const model: IModel = new Model(optionsForModel);

    const optionsForView: IOptions = { ...options, ...model.getOptions() };
    const view: IView = new View(optionsForView, node);

    this.presenter = new Presenter(model, view);
  }

  public subscribe(func: Function): void {
    this.presenter.subscribe(func);
  }

  public update(options: {}): void {
    this.presenter.update(options);
  }
}

export { ISlider };
export default Slider;
