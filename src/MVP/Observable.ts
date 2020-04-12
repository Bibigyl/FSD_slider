import bind from 'bind-decorator';

interface IObservable {
  subscribe(listener: Function): void;
  notify(...args: any): void;
}

type Fn<A, B, C> = (a: A, b?: B) => C;


class Observable<A, B> implements IObservable {
  private listeners: Fn<A, B, void>[] = [];

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
  Observable, IObservable
};
