import bind from 'bind-decorator';
import { IModelOptions } from './options';
import { IModelWarnings, IViewWarnings } from './warnings';


type NewValue = { type: 'NEW_VALUE'; options: IModelOptions };
type NewData = { type: 'NEW_DATA'; options: IModelOptions };
type LastThumbMoved = { type: 'LAST_THUMB_MOVED'; offsetRacio: number };
type FirstThumbMoved = { type: 'FIRST_THUMB_MOVED'; offsetRacio: number };
type ModelWarnings = { type: 'WARNINGS'; warnings: IModelWarnings };
type ViewWarnings = { type: 'WARNINGS'; warnings: IViewWarnings };

type ModelMessage = NewValue | NewData | ModelWarnings;
type ViewMessage = LastThumbMoved | FirstThumbMoved | ViewWarnings;


interface IObservable {
  subscribe(listener: Function): void;
  notify(...args: any): void;
}

type Fn<A, B, C> = (a: A, b?: B) => C;


class Observable<A, B> implements IObservable {
  protected listeners: Fn<A, B, void>[] = [];

  @bind
  public subscribe(listener: Fn<A, B, void>): void {
    this.listeners.push(listener);
  }

  @bind
  public notify(arg1: A, arg2?: B): void {
    this.listeners.forEach((listener) => {
      listener(arg1, arg2);
    });
  }
}


export {
  Observable, IObservable, ModelMessage, ViewMessage,
};
