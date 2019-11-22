/**
 * Интферфейс издателя объявляет набор методов для управлениями подпискичами.
 */
interface ISubject {

    val: any | [any, any]; 

    // Присоединяет наблюдателя к издателю.
    attach(observer: IObserver): void;

    // Отсоединяет наблюдателя от издателя.
    detach(observer: IObserver): void;

    // Уведомляет всех наблюдателей о событии.
    notify(): void;
}

/**
 * Издатель владеет некоторым важным состоянием и оповещает наблюдателей о его
 * изменениях.
 */
export default class Subject implements ISubject {

    val: any | [any, any]; 

    constructor( val: any | [any, any] ) {
        this.val = val;
    }

    /**
     * @type {Observer[]} Список подписчиков. В реальной жизни список
     * подписчиков может храниться в более подробном виде (классифицируется по
     * типу события и т.д.)
     */
    private observers: IObserver[] = [];

    /**
     * Методы управления подпиской.
     */
    public attach(observer: IObserver): void {
        this.observers.push(observer);
    }

    public detach(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        this.observers.splice(observerIndex, 1);
    }

    /**
     * Запуск обновления в каждом подписчике.
     */
    public notify(): void {

        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}

/**
 * Интерфейс Наблюдателя объявляет метод уведомления, который издатели
 * используют для оповещения своих подписчиков.
 */
export interface IObserver {
    func: any;
    // Получить обновление от субъекта.
    update(subject: Subject): void;
}

/**
 * Конкретные Наблюдатели реагируют на обновления, выпущенные Издателем, к
 * которому они прикреплены.
 */
export class Observer implements IObserver {

    func: any;

    constructor(func) {
        this.func = func;
    }

    public update(subject: Subject): void {
        this.func( subject.val );
    }
}

export {ISubject};