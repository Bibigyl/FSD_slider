import { IObservable } from './Observer';
import { IModelOptions } from './Model';
import { IViewWarnings } from './validations';

interface IViewOptions {
    length: string;
    vertical: boolean;
    tooltip: boolean;
    scale: boolean;
  }

interface IView extends IObservable {
    update(options: IModelOptions): void;
    rerender(options: IModelOptions): void;

    getOptions(): IViewOptions;
    getWarnings(): IViewWarnings;
}

