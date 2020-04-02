import bind from 'bind-decorator';
import { IObservable, Observable, ViewMessage } from './Observable';
import { IModelOptions, IViewOptions, IOptions } from './options';
import { IViewWarnings } from './warnings';
import defaultOptions from './defaultOptions';
import { validateView } from './validations';
import { getNumberOfSteps, isNumeric } from './commonFunctions';


interface IView extends IObservable {
  update(options: IModelOptions): void;
  rerender(options: IModelOptions): void;

  getOptions(): IViewOptions;
  getWarnings(): IViewWarnings;
}


class View extends Observable<ViewMessage, undefined> implements IView {
  private length: string = defaultOptions.length;

  private vertical: boolean = defaultOptions.vertical;

  private slider: HTMLElement;

  private thumbFirst!: HTMLElement;

  private thumbLast!: HTMLElement;

  private bar!: HTMLElement;

  private tooltipFirst!: HTMLElement | null;

  private tooltipLast!: HTMLElement | null;

  private scale!: HTMLElement | null;

  private activeThumb: EventTarget | null = null;

  private warnings: IViewWarnings = {};

  constructor(opts: {}, sliderNode: HTMLElement) {
    super();

    const options: IOptions = { ...defaultOptions, ...opts };
    this.warnings = validateView(options);
    this.handleWarnings();

    this.slider = sliderNode;
    this.slider.classList.add('slider');

    this.build(options);
  }


  public update(options: IModelOptions): void {
    this.setThumbs(options);
    this.setBar();
    if (this.tooltipLast) {
      this.setTooltipValues(options);
    }
  }


  public rerender(opts: IModelOptions): void {
    const options: IOptions = { ...this.getOptions(), ...opts };

    this.warnings = validateView(options);
    this.handleWarnings();
    this.rebuild(options);
  }


  public getOptions(): IViewOptions {
    const tooltip = Boolean(this.tooltipLast);
    const scale = Boolean(this.scale);

    return {
      length: this.length,
      vertical: this.vertical,
      tooltip,
      scale,
    };
  }


  public getWarnings(): IViewWarnings {
    return { ...this.warnings };
  }


  @bind
  private handleThumbDown(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.activeThumb = event.currentTarget;

    document.addEventListener('mousemove', this.handleThumbMove);
    document.addEventListener('mouseup', this.handleThumbUp);
    document.addEventListener('touchmove', this.handleThumbMove);
    document.addEventListener('touchend', this.handleThumbUp);
  }


  @bind
  private handleThumbMove(event: MouseEvent | TouchEvent): void {
    const length: number = this.getLengthInPx();
    const offset: number = this.getOffsetInPx();
    let eventPos: number;

    if (event.type === 'mousemove') {
      const mouseEvent: MouseEvent = event as MouseEvent;
      eventPos = !this.vertical ? mouseEvent.clientX : mouseEvent.clientY;
    } else {
      const touchEvent: TouchEvent = event as TouchEvent;
      eventPos = !this.vertical ? touchEvent.touches[0].clientX : touchEvent.touches[0].clientY;
    }

    const newThumbPosition: number = (eventPos - offset) / length;


    if (this.activeThumb === this.thumbLast) {
      this.notify({
        type: 'LAST_THUMB_MOVED',
        offsetRacio: newThumbPosition,
      });
    } else {
      this.notify({
        type: 'FIRST_THUMB_MOVED',
        offsetRacio: newThumbPosition,
      });
    }
  }


  @bind
  private handleSliderClick(event: MouseEvent): void {
    const length: number = this.getLengthInPx();
    const offset: number = this.getOffsetInPx();
    const eventPos: number = !this.vertical ? event.clientX : event.clientY;
    const newThumbPos: number = (eventPos - offset) / length;
    let isLastMoved: boolean;


    if (this.thumbFirst.classList.contains('slider__thumb_disabled')) {
      isLastMoved = true;
    } else if (this.thumbLast.classList.contains('slider__thumb_disabled')) {
      isLastMoved = false;
    } else {
      const styleNameOfStart: 'left' | 'top' = !this.vertical ? 'left' : 'top';

      const firstThumbPos: number = parseFloat(String(this.thumbFirst.style[styleNameOfStart]));
      const lastThumbPos: number = parseFloat(String(this.thumbLast.style[styleNameOfStart]));

      const firstOffest: number = Math.abs(firstThumbPos / 100 - newThumbPos);
      const lastOffset: number = Math.abs(lastThumbPos / 100 - newThumbPos);
      let isLastCloser: boolean;

      if (firstThumbPos === lastThumbPos) {
        isLastCloser = newThumbPos > lastThumbPos / 100;
      } else {
        isLastCloser = firstOffest > lastOffset;
      }

      isLastMoved = isLastCloser;
    }

    if (isLastMoved) {
      this.notify({
        type: 'LAST_THUMB_MOVED',
        offsetRacio: newThumbPos,
      });
    } else {
      this.notify({
        type: 'FIRST_THUMB_MOVED',
        offsetRacio: newThumbPos,
      });
    }
  }


  @bind
  private handleThumbUp(): void {
    document.removeEventListener('mouseup', this.handleThumbUp);
    document.removeEventListener('mousemove', this.handleThumbMove);
    document.removeEventListener('touchend', this.handleThumbUp);
    document.removeEventListener('touchmove', this.handleThumbMove);

    this.activeThumb = null;
  }


  private build(options: IOptions): void {
    const validLength: string = this.length || defaultOptions.length;
    this.length = View.getValidLength(options.length, validLength);

    if (!options.vertical) {
      this.vertical = false;
      this.slider.style.width = this.length;
      this.slider.style.height = '';
      this.slider.classList.add('slider_horizontal');
      this.slider.classList.remove('slider_vertical');
    } else {
      this.vertical = true;
      this.slider.style.height = this.length;
      this.slider.style.width = '';
      this.slider.classList.add('slider_vertical');
      this.slider.classList.remove('slider_horizontal');
    }

    this.bar = View.buildNode(this.slider, 'slider__bar');

    this.buildThumbs(options);

    this.setBar();

    if (options.tooltip) {
      this.buildTooltips(options);
    } else {
      this.tooltipFirst = null;
      this.tooltipLast = null;
    }

    if (options.scale) {
      this.buildScale(options);
    } else {
      this.scale = null;
    }


    this.thumbFirst.addEventListener('mousedown', this.handleThumbDown);
    this.thumbFirst.addEventListener('touchstart', this.handleThumbDown);

    this.thumbLast.addEventListener('mousedown', this.handleThumbDown);
    this.thumbLast.addEventListener('touchstart', this.handleThumbDown);

    this.slider.addEventListener('click', this.handleSliderClick);
  }

  private rebuild(opts: IModelOptions): void {
    const prevOptions: IViewOptions = this.getOptions();
    const options: IOptions = { ...prevOptions, ...opts };

    this.slider.innerHTML = '';

    this.build(options);
  }

  private handleWarnings(): void {
    if (Object.keys(this.warnings).length === 0) { return; }

    this.notify({
      type: 'WARNINGS',
      warnings: this.getWarnings(),
    });
  }

  private buildThumbs(options: IOptions): void {
    const { range, reverse } = options;
    this.thumbFirst = View.buildNode(this.slider, 'slider__thumb', 'slider__thumb_first');
    this.thumbLast = View.buildNode(this.slider, 'slider__thumb', 'slider__thumb_last');

    if (!range) {
      if (!reverse) {
        this.thumbFirst.classList.add('slider__thumb_disabled');
      } else {
        this.thumbLast.classList.add('slider__thumb_disabled');
      }
    }

    this.setThumbs(options);
  }

  private setThumbs(options: IModelOptions): void {
    const { begin, end, reverse } = options;
    const beginPosition: string = View.findThumbPosition(begin, options);
    const endPosition: string = View.findThumbPosition(end, options);

    if (!reverse) {
      this.setThumbPosition(this.thumbFirst, beginPosition);
      this.setThumbPosition(this.thumbLast, endPosition);
    } else {
      this.setThumbPosition(this.thumbFirst, endPosition);
      this.setThumbPosition(this.thumbLast, beginPosition);
    }
  }

  private setBar(): void {
    const styleNameOfStart: 'top' | 'left' = !this.vertical ? 'left' : 'top';
    const styleNameOfLength: 'width' | 'height' = !this.vertical ? 'width' : 'height';

    const start = String(this.thumbFirst.style[styleNameOfStart]);
    const length: string = `${parseFloat(String(this.thumbLast.style[styleNameOfStart])) - parseFloat(start) + 0.01}%`;

    this.bar.style[styleNameOfStart] = start;
    this.bar.style[styleNameOfLength] = length;
  }

  private buildTooltips(options: IOptions): void {
    this.tooltipFirst = View.buildNode(this.thumbFirst, 'slider__tooltip', 'slider__tooltip_first');
    this.tooltipLast = View.buildNode(this.thumbLast, 'slider__tooltip', 'slider__tooltip_last');

    this.setTooltipValues(options);
  }

  private buildScale(options: IOptions): void {
    const {
      min, max, step, reverse, customValues,
    } = options;
    let division: HTMLElement;
    let val: number | string;
    let indent: number | string;
    const length: number = max - min;

    const scale: HTMLElement = document.createElement('div');
    scale.classList.add('slider__scale');

    for (let i = 0; i <= getNumberOfSteps(min, max, step); i += 1) {
      if (!reverse) {
        val = min + step * i;
        val = Math.min(val, max);
      } else {
        val = max - step * i;
        val = Math.max(val, min);
      }

      indent = Math.min(i * step, length);
      indent = `${(indent / length) * 100}%`;

      val = customValues ? customValues[val] : val;

      division = document.createElement('div');
      division.classList.add('slider__scale-division');
      division.innerHTML = `<span class="slider__scale-division-text">${val}</span>`;

      const styleNameOfStart: 'top' | 'left' = !this.vertical ? 'left' : 'top';
      division.style[styleNameOfStart] = indent;

      scale.append(division);
    }

    this.slider.prepend(scale);
    this.scale = scale;
  }

  private setTooltipValues(options: IModelOptions): void {
    if (this.tooltipFirst === null) return;
    if (this.tooltipLast === null) return;

    const {
      begin, end, reverse, customValues,
    } = options;
    const beginValue: string = customValues ? customValues[begin] : String(begin);
    const endValue: string = customValues ? customValues[end] : String(end);

    if (!reverse) {
      this.tooltipFirst.textContent = beginValue;
      this.tooltipLast.textContent = endValue;
    } else {
      this.tooltipFirst.textContent = endValue;
      this.tooltipLast.textContent = beginValue;
    }
  }

  private setThumbPosition(node: HTMLElement, position: string): void {
    const thumbNode: HTMLElement = node;

    if (!this.vertical) {
      thumbNode.style.top = '';
      thumbNode.style.left = position;
    } else {
      thumbNode.style.left = '';
      thumbNode.style.top = position;
    }

    if (this.thumbFirst) {
      const CRITICAL_POS: number = 95;
      if ((parseFloat(String(this.thumbFirst.style.left)) > CRITICAL_POS)
      || (parseFloat(String(this.thumbFirst.style.top)) > CRITICAL_POS)) {
        this.thumbFirst.style.zIndex = '1';
      } else {
        this.thumbFirst.style.zIndex = '';
      }
    }
  }

  private getLengthInPx(): number {
    const length: number = !this.vertical
      ? this.slider.offsetWidth
      : this.slider.offsetHeight;

    return length;
  }

  private getOffsetInPx(): number {
    const offset: number = !this.vertical
      ? this.slider.getBoundingClientRect().left
      : this.slider.getBoundingClientRect().top;

    return offset;
  }

  static getValidLength(str: string, validLength: string): string {
    const foundMatch: string[] | number[] | null = str.match(/^\d{1,3}[.,]?\d*(px|em|rem|%|vh|vw|cm|ex|in|mm|pc|pt|vmin)?$/i);
    const isCSSLengthFound: Boolean = Boolean(foundMatch);
    const CSSLength: string = foundMatch ? foundMatch[0].toLowerCase().replace(',', '.') : '';

    if (isCSSLengthFound && isNumeric(CSSLength)) {
      return `${CSSLength}px`;
    } if (isCSSLengthFound) {
      return CSSLength;
    }
    return validLength;
  }

  static buildNode(parentNode: HTMLElement, ...classes: string[]): HTMLElement {
    const node: HTMLElement = document.createElement('div');

    classes.forEach((currenClass: string) => {
      node.classList.add(currenClass);
    });

    parentNode.append(node);
    return node;
  }

  static findThumbPosition(value: number, options: IModelOptions): string {
    const { min, max, reverse } = options;
    const position: string = !reverse
      ? `${((value - min) / (max - min)) * 100}%`
      : `${((max - value) / (max - min)) * 100}%`;
    return position;
  }
}


export { IView };
export default View;
