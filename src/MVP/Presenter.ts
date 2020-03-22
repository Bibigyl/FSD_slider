import { IOptions } from './defaultOptions';
import { IModel, IModelOptions } from './Model';
import { IView } from './View';
import {
  IObservable, ModelMessage, ViewMessage, Observable,
} from './Observer';
import { IWarnings } from './validations';


interface IPresenter extends IObservable {
  update(options: {}): void;

  getOptions(): IOptions;
  getWarnings(): IWarnings;
}

// bind!!!!!!!!!!!!

class Presenter extends Observable<IOptions, IWarnings> implements IPresenter {
  private _model: IModel;

  private _view: IView;

  constructor(model: IModel, view: IView) {
    super();

    this._model = model;
    this._view = view;

    const that = this;

    this._model.subscribe((message: ModelMessage): void => {
      switch (message.type) {
        case 'NEW_VALUE':
          that._view.update(message.options);
          that.notify(that.getOptions(), {});
          break;
      }
    });

    this._view.subscribe((message: ViewMessage): void => {
      switch (message.type) {
        case 'LAST_THUMB_MOVED':
          !that._model.getOptions().reverse
            ? that._model.setEndByOffsetRacio(message.offsetRacio)
            : that._model.setBeginByOffsetRacio(message.offsetRacio);
          break;

        case 'FIRST_THUMB_MOVED':
          !that._model.getOptions().reverse
            ? that._model.setBeginByOffsetRacio(message.offsetRacio)
            : that._model.setEndByOffsetRacio(message.offsetRacio);
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
