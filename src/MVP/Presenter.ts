import { IOptions, IModelOptions } from './defaultOptions';
import { IModel } from './Model';
import { IView } from './View';
import {
  IObservable, ModelMessage, ViewMessage, Observable,
} from './Observer';
import { IWarnings } from './validations';
import { findValueByOffsetRacio } from './commonFunctions';


interface IPresenter extends IObservable {
  update(options: {}): void;

  getOptions(): IOptions;
  getWarnings(): IWarnings;
}


class Presenter extends Observable<IOptions, IWarnings> implements IPresenter {
  private model: IModel;

  private view: IView;

  constructor(model: IModel, view: IView) {
    super();

    this.model = model;
    this.view = view;


    this.model.subscribe((message: ModelMessage): void => {
      switch (message.type) {
        case 'NEW_VALUE':

          this.view.update(message.options);
          this.notify(this.getOptions(), {});
          break;

        default:
          break;
      }
    });

    this.view.subscribe((message: ViewMessage): void => {
      let value: number;

      switch (message.type) {
        case 'LAST_THUMB_MOVED':
          value = findValueByOffsetRacio(message.offsetRacio, model.getOptions());

          if (!this.model.getOptions().reverse) {
            this.model.setEnd(value);
          } else {
            this.model.setBegin(value);
          }
          break;

        case 'FIRST_THUMB_MOVED':
          value = findValueByOffsetRacio(message.offsetRacio, model.getOptions());

          if (!this.model.getOptions().reverse) {
            this.model.setBegin(value);
          } else {
            this.model.setEnd(value);
          }
          break;

        default:
          break;
      }
    });
  }


  public update(options: {}): void {
    const optionsForModel: {} = { ...options };
    this.model.update(optionsForModel);

    const optionsForView: IModelOptions = Object.assign(options, this.model.getOptions());
    this.view.rerender(optionsForView);

    const warnings: IWarnings = this.getWarnings();

    this.notify(this.getOptions(), warnings);
  }


  public getOptions(): IOptions {
    return { ...this.model.getOptions(), ...this.view.getOptions() };
  }


  public getWarnings(): IWarnings {
    return { ...this.model.getWarnings(), ...this.view.getWarnings() };
  }
}

export { IPresenter };
export default Presenter;
