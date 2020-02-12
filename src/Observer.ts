import { IOptions } from "./defaultOptions";

//Интферфейс издателя объявляет набор методов для управлениями подпискичами.
interface ISubject {

    // Присоединяет наблюдателя к издателю.
    attach(observer: any): void;

    // Отсоединяет наблюдателя от издателя.
    detach(observer: any): void;

    // Уведомляет всех наблюдателей о событии.
    notify(...args: any): void;
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
export { IOuterObserver, OuterObserver}