import { IObservable, Observable } from './Observable';
import { IOptions } from './options';
import { IWarnings } from './warnings';
import { IModel } from './Model';
import { IView } from './View';
interface IPresenter extends IObservable {
    update(options: {}): void;
    getOptions(): IOptions;
    getWarnings(): IWarnings;
}
declare class Presenter extends Observable<IOptions, IWarnings> implements IPresenter {
    private model;
    private view;
    constructor(model: IModel, view: IView);
    update(options: {}): void;
    getOptions(): IOptions;
    getWarnings(): IWarnings;
}
export default Presenter;
export { IPresenter };
