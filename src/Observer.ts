import { IModelOptions } from "./Model";
import { IViewOptions } from "./View";
import { IOptions } from "./defaultOptions";
import { IWarnings } from "./validations";

// Messages
type NewValue = {type: 'NEW_VALUE', options: IModelOptions};
type NewData = {type: 'NEW_DATA', options: IModelOptions};
type LastThumbMoved = {type: 'LAST_THUMB_MOVED', offsetRacio: number};
type FirstThumbMoved = {type: 'FIRST_THUMB_MOVED', offsetRacio: number};
type Warnings = {type: 'WARNINGS', warnings: IWarnings};

type ModelMessage = NewValue | NewData | Warnings;
type ViewMessage = LastThumbMoved | FirstThumbMoved | Warnings;



// Observe
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
        for (const listener of this.listeners) {
            listener(message);
        }
    }
}


class ObservablePresenter implements IObservable {
    protected listeners: Function[] = [];

    public subscribe(listener: Function): void {
        this.listeners.push(listener);
    }

    public notify(options?: IOptions, warnings?: IWarnings): void {
        for (const listener of this.listeners) {
            listener(options, warnings);
        }
    }
}


export { IObservable, Observable, ModelMessage, ViewMessage, ObservablePresenter};



/*
// Observe
interface IObservable {
    subscribe(listener: any): void;
    //detach(listener: any): void;
    notify(message: any): void;
}

class Observable implements IObservable {
    protected listeners: Function[] = [];

    public subscribe(listener: Function): void {
        this.listeners.push(listener);
    }

/*     public detach(listener: Function): void {
        const listenerIndex: number = this.listeners.indexOf(listener);
        this.listeners.splice(listenerIndex, 1);
    } */
/*
    public notify(message: IMessage): void {
        for (const listener of this.listeners) {
            listener(message);
        }
    }
}*/