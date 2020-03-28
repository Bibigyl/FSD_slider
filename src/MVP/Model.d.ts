import { IObservable, Observable, ModelMessage } from './Observable';
import { IModelOptions } from './options';
import { IModelWarnings } from './warnings';
interface IModel extends IObservable {
    update(options: {}): void;
    setBegin(begin: number): void;
    setEnd(end: number): void;
    getOptions(): IModelOptions;
    getWarnings(): IModelWarnings;
}
declare class Model extends Observable<ModelMessage, undefined> implements IModel {
    private begin;
    private end;
    private range;
    private min;
    private max;
    private step;
    private customValues;
    private reverse;
    private warnings;
    constructor(options: {});
    update(options: {}): void;
    setEnd(end: number): void;
    setBegin(begin: number): void;
    getOptions(): IModelOptions;
    getWarnings(): IModelWarnings;
    private setOptions;
    private handleWarnings;
    private normalize;
    static findClosestValue(value: number, options: IModelOptions): number;
}
export { IModel };
export default Model;
