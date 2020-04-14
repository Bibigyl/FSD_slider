import { IObservable, Observable } from './Observable';
import { IModelOptions } from './options';
import { IModelWarnings } from './warnings';
import defaultOptions from './defaultOptions';
import { validateModel } from './validations';
import { deepEqual, normalizeNumber } from './commonFunctions';


interface IModel extends IObservable {
  update(options: {}): void;
  setBegin(begin: number): void;
  setEnd(end: number): void

  getOptions(): IModelOptions;
  getWarnings(): IModelWarnings;
}


type NewValue = { type: 'NEW_VALUE'; options: IModelOptions };
type NewData = { type: 'NEW_DATA'; options: IModelOptions };
type ModelWarnings = { type: 'WARNINGS'; warnings: IModelWarnings };

type ModelMessage = NewValue | NewData | ModelWarnings;


class Model extends Observable<ModelMessage> implements IModel {
  private begin: number = defaultOptions.min;

  private end: number = defaultOptions.max;

  private range: boolean = defaultOptions.range;

  private min: number = defaultOptions.min;

  private max: number = defaultOptions.max;

  private step: number = defaultOptions.step;

  private customValues: string[] | null = defaultOptions.customValues;

  private reverse: boolean = defaultOptions.reverse;

  private warnings: IModelWarnings = {};

  constructor(options: IModelOptions) {
    super();

    this.warnings = validateModel(options);
    this.handleWarnings();

    const validOptions: IModelOptions = this.normalize(options, defaultOptions);
    this.setOptions(validOptions);
  }


  public update(options: {}): void {
    const prevOptions: IModelOptions = this.getOptions();
    const newOptions: IModelOptions = { ...this.getOptions(), ...options };

    this.warnings = validateModel(newOptions);
    this.handleWarnings();

    const newValidOptions: IModelOptions = this.normalize(newOptions, prevOptions);

    if (deepEqual(prevOptions, newValidOptions)) { return; }
    this.setOptions(newValidOptions);

    this.notify({
      type: 'NEW_DATA',
      options: this.getOptions(),
    });
  }


  public setEnd(end: number): void {
    let newEnd: number = Model.findClosestValue(end, this.getOptions());
    newEnd = Math.max(newEnd, this.begin);

    if (newEnd === this.end) { return; }
    this.end = newEnd;

    this.notify({
      type: 'NEW_VALUE',
      options: this.getOptions(),
    });
  }


  public setBegin(begin: number): void {
    if (!this.range) { return; }

    let newBegin: number = Model.findClosestValue(begin, this.getOptions());
    newBegin = Math.min(newBegin, this.end);

    if (newBegin === this.begin) { return; }
    this.begin = newBegin;

    this.notify({
      type: 'NEW_VALUE',
      options: this.getOptions(),
    });
  }


  public getOptions(): IModelOptions {
    return {
      begin: this.begin,
      end: this.end,
      range: this.range,
      min: this.min,
      max: this.max,
      step: this.step,
      customValues: this.customValues,
      reverse: this.reverse,
    };
  }


  public getWarnings(): IModelWarnings {
    return { ...this.warnings };
  }


  private setOptions(options: IModelOptions): void {
    this.begin = options.begin;
    this.end = options.end;
    this.range = options.range;
    this.min = options.min;
    this.max = options.max;
    this.step = options.step;
    this.customValues = options.customValues;
    this.reverse = options.reverse;
  }


  private handleWarnings(): void {
    if (Object.keys(this.warnings).length === 0) { return; }

    this.notify({
      type: 'WARNINGS',
      warnings: this.getWarnings(),
    });
  }


  private normalize(opts: {}, baseOpts: IModelOptions): IModelOptions {
    const options: IModelOptions = { ...baseOpts, ...opts };
    const baseOptions: IModelOptions = { ...baseOpts };
    let {
      begin, end, range, min, max, step, reverse, customValues,
    } = options;

    if (!customValues
      || this.warnings.customValuesIsNotArray
      || this.warnings.customValuesIsTooSmall
    ) {
      customValues = null;
    }

    if (customValues) {
      min = 0;
      max = customValues.length - 1;
    }

    min = normalizeNumber(min, baseOptions.min);
    max = normalizeNumber(max, baseOptions.max);
    step = normalizeNumber(step, baseOptions.step);

    if (this.warnings.minIsOverMax) {
      [min, max] = [max, min];
    }

    if (this.warnings.minIsEqualToMax) {
      min = baseOptions.min;
      max = baseOptions.max;
    }

    if (this.warnings.stepIsNull || this.warnings.tooBigStep) {
      step = 1;
    }

    step = Math.abs(step);
    reverse = Boolean(reverse);
    range = Boolean(range);

    if (this.warnings.beginIsOverEnd) {
      [begin, end] = [end, begin];
    }

    end = normalizeNumber(end, max);
    end = Model.findClosestValue(end, {
      min, max, step, reverse,
    });

    if (!range) {
      begin = min;
    } else {
      begin = normalizeNumber(begin, min);
      begin = Model.findClosestValue(begin, {
        min, max, step, reverse,
      });
    }

    return {
      begin, end, range, min, max, step, reverse, customValues,
    };
  }

  static findClosestValue(value: number, options: {
    min: number,
    max: number,
    step: number,
    reverse: boolean
  }): number {
    let prev: number;
    let next: number;
    const {
      min, max, step, reverse,
    } = options;

    if (value <= min) { return min; }
    if (value >= max) { return max; }

    if (!reverse) {
      prev = min + Math.floor((value - min) / step) * step;
      next = min + Math.floor((value - min) / step) * step + step;

      next = next < max ? next : max;
    } else {
      prev = max - Math.floor((max - value) / step) * step - step;
      next = max - Math.floor((max - value) / step) * step;

      prev = prev > min ? prev : min;
    }

    const closestValue: number = value < prev + (next - prev) / 2 ? prev : next;
    return closestValue;
  }
}


export { IModel, ModelMessage };
export default Model;
