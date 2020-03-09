import { IModelOptions } from "./Model";
import { IOptions } from "./defaultOptions";
import { IWarnings, IModelWarnings, IViewWarnings } from "./validations";

type NewValue = {type: 'NEW_VALUE'; options: IModelOptions};
type NewData = {type: 'NEW_DATA'; options: IModelOptions};
type LastThumbMoved = {type: 'LAST_THUMB_MOVED'; offsetRacio: number};
type FirstThumbMoved = {type: 'FIRST_THUMB_MOVED'; offsetRacio: number};
type ModelWarnings = {type: 'WARNINGS'; warnings: IModelWarnings};
type ViewWarnings = {type: 'WARNINGS'; warnings: IViewWarnings};

type ModelMessage = NewValue | NewData | ModelWarnings;
type ViewMessage = LastThumbMoved | FirstThumbMoved | ViewWarnings;



interface IObservable {
    subscribe(listener: Function): void;
    notify(...args: any): void;
}


type Fn<A, B> = (a: A) => B;

class Observable<A> implements IObservable {
    protected listeners: Fn<A, void>[] = [];

    public subscribe(listener: Fn<A, void>): void {
        this.listeners.push(listener);
    }

    public notify(message: A): void {
        this.listeners.forEach(function(listener) {
            listener(message);
        });
    }
}


class ObservablePresenter implements IObservable {
    protected listeners: Function[] = [];

    public subscribe(listener: Function): void {
        this.listeners.push(listener);
    }

    public notify(options?: IOptions, warnings?: IWarnings): void {
        this.listeners.forEach(function(listener) {
            listener(options, warnings);
        });
    }
}


export { IObservable, Observable, ModelMessage, ViewMessage, ObservablePresenter};