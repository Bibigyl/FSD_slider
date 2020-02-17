import { IOptions } from "./defaultOptions";


//Интферфейс издателя объявляет набор методов для управлениями подпискичами.
interface ISubject {
    attach(callback: any): void;
    detach(callback: any): void;
    notify(config: any): void;
}

class Subject implements ISubject {
    protected callbacks: any[] = [];

    attach(callback: Function): void {
        this.callbacks.push(callback);
    }

    detach(callback: Function): void {
        const callbackIndex: number = this.callbacks.indexOf(callback);
        this.callbacks.splice(callbackIndex, 1);
    }

    notify(config: any): void {
        for (const callback of this.callbacks) {
            callback(config);
        }
    }
}

interface IObserver {
    update(config: any): void;
}



export { ISubject, Subject, IObserver};
//export { IOuterObserver, OuterObserver}








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