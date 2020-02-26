import { IModelOptions } from "./Model";
import { IViewOptions } from "./View";
import { IOptions } from "./defaultOptions";
import { IWarnings } from "./validations";


type ModelMessage = {type: 'NEW_VALUE', options: IModelOptions};
type ViewMessage = {type: 'NEW_POSITION', index: number, percent: number};
type PresenterMessage = {type: 'NEW_DATA', options: IOptions};


interface IObservable {
    subscribe(listener: any): void;
    //detach(listener: any): void;
    emit(message: any): void;
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

    public emit(message: IMessage): void {
        for (const listener of this.listeners) {
            listener(message);
        }
    }
}


interface IMessage {
    type: string,
    // ???????????????????????
    //options?: IModelOptions | IViewOptions | IOptions,
    options?: any,
    percent?: number,
    index?: number,
    warnings?: IWarnings
}


export { IObservable, Observable, IMessage };








/* 
import { IOptions } from "./defaultOptions";

//Интферфейс издателя объявляет набор методов для управлениями подпискичами.
interface IObservable {

    // Присоединяет наблюдателя к издателю.
    subscribe(observer: any): void;

    // Отсоединяет наблюдателя от издателя.
    detach(observer: any): void;

    // Уведомляет всех наблюдателей о событии.
    emit(message: any): void;
}

class Observable implements IObservable {
    protected observers: any[] = [];

    subscribe(observer: any): void {
        this.observers.push(observer);
    }

    detach(observer: any): void {
        const observerIndex = this.observers.indexOf(observer);
        this.observers.splice(observerIndex, 1);
    }

    emit() {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}


interface IOuterObserver {
    func: any;
    update(options: IOptions): void;
}

class OuterObserver implements IOuterObserver {
    func: any;

    constructor(func: Function) {
        this.func = func;
    }

    public update(options: IOptions): void {
        this.func(options);
    }
}



export { IObservable, Observable};
export { IOuterObserver, OuterObserver} */