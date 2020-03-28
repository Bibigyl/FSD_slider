import { IModelOptions } from './options';
import { IModelWarnings, IViewWarnings } from './warnings';
declare type NewValue = {
    type: 'NEW_VALUE';
    options: IModelOptions;
};
declare type NewData = {
    type: 'NEW_DATA';
    options: IModelOptions;
};
declare type LastThumbMoved = {
    type: 'LAST_THUMB_MOVED';
    offsetRacio: number;
};
declare type FirstThumbMoved = {
    type: 'FIRST_THUMB_MOVED';
    offsetRacio: number;
};
declare type ModelWarnings = {
    type: 'WARNINGS';
    warnings: IModelWarnings;
};
declare type ViewWarnings = {
    type: 'WARNINGS';
    warnings: IViewWarnings;
};
declare type ModelMessage = NewValue | NewData | ModelWarnings;
declare type ViewMessage = LastThumbMoved | FirstThumbMoved | ViewWarnings;
interface IObservable {
    subscribe(listener: Function): void;
    notify(...args: any): void;
}
declare type Fn<A, B, C> = (a: A, b?: B) => C;
declare class Observable<A, B> implements IObservable {
    protected listeners: Fn<A, B, void>[];
    subscribe(listener: Fn<A, B, void>): void;
    notify(arg1: A, arg2?: B): void;
}
export { Observable, IObservable, ModelMessage, ViewMessage, };
