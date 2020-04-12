import bind from 'bind-decorator';

interface IObservable {
  subscribe(listener: Function): void;
  notify(...args: any): void;
}

type Fn<A, B> = (a: A) => B;


class Observable<A> implements IObservable {
  private listeners: Fn<A, void>[] = [];

  @bind
  public subscribe(listener: Fn<A, void>): void {
    this.listeners.push(listener);
  }

  @bind
  public notify(arg: A): void {
    this.listeners.forEach((listener) => {
      listener(arg);
    });
  }
}


export {
  Observable, IObservable,
};
