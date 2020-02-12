//Интферфейс издателя объявляет набор методов для управлениями подпискичами.
interface ISubject {

    // Присоединяет наблюдателя к издателю.
    attach(observer: IObserver): void;

    // Отсоединяет наблюдателя от издателя.
    detach(observer: IObserver): void;

    // Уведомляет всех наблюдателей о событии.
    notify(...args: any): void;
}


// Интерфейс Наблюдателя объявляет метод уведомления, который издатели
// используют для оповещения своих подписчиков.
interface IObserver {
    // Получить обновление от субъекта.
    pushViewChanges(activeThumb: HTMLDivElement, newThumbPosition: number): void;
    pushSlimModelChanges(): void;
    pushFullModelChanges(): void;
}

class Subject {
    protected observers: IObserver[] = [];

    attach(observer: IObserver): void {
        this.observers.push(observer);
    }

    detach(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        this.observers.splice(observerIndex, 1);
    }
}



export { ISubject, IObserver, Subject};