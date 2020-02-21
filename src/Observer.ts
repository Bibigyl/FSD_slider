import { IModelOptions } from "./Model";
import { IViewOptions } from "./View";
import { IOptions } from "./defaultOptions";
import { IWarnings } from "./validations";


interface IStore {
    attach(callback: any): void;
    detach(callback: any): void;
    notify(config: any): void;

    //getLastUpdate(): string;
}

// АНАЛОГ STORE В REDUX
// САМИ МОДЕЛИ И ВЬЮ НЕ ЗНАЮТ КАК ОНИ БУДУТ МЕНЯТЬСЯ, ЭТО БУДЕТ ЗАПИСАНО В _update ПРИ ИНИЦИАЛИЗАЦИИ

class Store implements IStore {

    private _lastUpdate: string;
    private _update: Function;

    protected callbacks: any[] = [];


    constructor(update) {
        this._update = update;
    }


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


    update(action) {
        this._update(action);
    }

    public getLastUpdate(): string {
        return this._lastUpdate;
    }
}













interface ISubject {
    attach(callback: any): void;
    detach(callback: any): void;
    notify(config: any): void;
}

class Subject implements ISubject {

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


export { ISubject, Subject, IConfig, IStore, Store };