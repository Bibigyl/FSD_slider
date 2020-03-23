import Presenter, { IPresenter } from './MVP/Presenter';
import Model, { IModel } from './MVP/Model';
import { IModelOptions, IOptions } from './MVP/options';
import View, { IView } from './MVP/View';

interface ISlider {
  update(options: {}): void;
  subscribe(func: Function): void;
}

class Slider implements ISlider {
  private presenter: IPresenter;

  constructor(options: {}, node: HTMLElement) {
    const optionsForModel: {} = { ...options };
    const model: IModel = new Model(optionsForModel);

    const optionsForView: IModelOptions = { ...options, ...model.getOptions() };
    const view: IView = new View(optionsForView, node);

    this.presenter = new Presenter(model, view);
  }

  public subscribe(func: Function): void {
    this.presenter.subscribe(func);
  }

  public update(options: IOptions): void {
    this.presenter.update(options);
  }
}

export { ISlider };
export default Slider;
