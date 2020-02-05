//Интферфейс издателя объявляет набор методов для управлениями подпискичами.
interface ISubject {

    // Присоединяет наблюдателя к издателю.
    attach(observer: IObserver): void;

    // Отсоединяет наблюдателя от издателя.
    detach(observer: IObserver): void;

    // Уведомляет всех наблюдателей о событии.
    notify(type?: string): void;
}


// Интерфейс Наблюдателя объявляет метод уведомления, который издатели
// используют для оповещения своих подписчиков.
interface IObserver {
    // Получить обновление от субъекта.
    //update(subject: ISubject): void;

    pushViewChanges(subject: ISubject): void;
    pushSlimModelChanges(subject: ISubject): void;
    pushFullModelChanges(subject: ISubject): void;

}


export { ISubject };
export { IObserver };