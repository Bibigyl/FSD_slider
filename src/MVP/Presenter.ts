import { IOptions } from './defaultOptions';
import { IModel, IModelOptions } from './Model';
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
  private _model: IModel;

  private _view: IView;

  constructor(model: IModel, view: IView) {
    super();

    this._model = model;
    this._view = view;


    this._model.subscribe((message: ModelMessage): void => {
      switch (message.type) {
        case 'NEW_VALUE':
          
          this._view.update(message.options);
          this.notify(this.getOptions(), {});
          break;
      }
    });

    this._view.subscribe((message: ViewMessage): void => {
      let value: number;

      switch (message.type) {
        case 'LAST_THUMB_MOVED':
          value = findValueByOffsetRacio(message.offsetRacio, model.getOptions());

          !this._model.getOptions().reverse
            ? this._model.setEnd(value)
            : this._model.setBegin(value);
          break;

        case 'FIRST_THUMB_MOVED':
          value = findValueByOffsetRacio(message.offsetRacio, model.getOptions());

          !this._model.getOptions().reverse
            ? this._model.setBegin(value)
            : this._model.setEnd(value);
          break;
      }
    });
  }


  public update(options: {}): void {
    const optionsForModel: {} = { ...options };
    this._model.update(optionsForModel);

    const optionsForView: IModelOptions = Object.assign(options, this._model.getOptions());
    this._view.rerender(optionsForView);

    const warnings: IWarnings = this.getWarnings();

    this.notify(this.getOptions(), warnings);
  }


  public getOptions(): IOptions {
    return { ...this._model.getOptions(), ...this._view.getOptions() };
  }


  public getWarnings(): IWarnings {
    return { ...this._model.getWarnings(), ...this._view.getWarnings() };
  }
}

export { IPresenter };
export default Presenter;
