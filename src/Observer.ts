import { IModelOptions } from "./Model";
import { IViewOptions } from "./View";
import { IOptions } from "./defaultOptions";
import { IWarnings } from "./validations";


interface ISubject {
    attach(callback: any): void;
    detach(callback: any): void;
    notify(config: any): void;

    //getLastUpdate(): string;
}

class Subject implements ISubject {

    //constructor()
    protected callbacks: any[] = [];

    public attach(callback: Function): void {
        this.callbacks.push(callback);
    }

    public detach(callback: Function): void {
        const callbackIndex: number = this.callbacks.indexOf(callback);
        this.callbacks.splice(callbackIndex, 1);
    }

    public notify(): void {
        for (const callback of this.callbacks) {
            callback();
        }
    }
}

interface IConfig {
    type: string,
    // ???????????????????????
    //options?: IModelOptions | IViewOptions | IOptions,
    options?: any,
    percent?: number,
    index?: number,
    warnings?: IWarnings
}


export { ISubject, Subject, IConfig };








/* 
import { IOptions } from "./defaultOptions";

//Интферфейс издателя объявляет набор методов для управлениями подпискичами.
interface ISubject {

    // Присоединяет наблюдателя к издателю.
    attach(observer: any): void;

    // Отсоединяет наблюдателя от издателя.
    detach(observer: any): void;

    // Уведомляет всех наблюдателей о событии.
    notify(config: any): void;
}

class Subject implements ISubject {
    protected observers: any[] = [];

    attach(observer: any): void {
        this.observers.push(observer);
    }

    detach(observer: any): void {
        const observerIndex = this.observers.indexOf(observer);
        this.observers.splice(observerIndex, 1);
    }

    notify() {
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



export { ISubject, Subject};
export { IOuterObserver, OuterObserver} */