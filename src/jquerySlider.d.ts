import { IOptions } from './MVP/options';
declare type SliderMethod = 'getData' | 'update' | 'destroy' | 'observe';
declare type FirstSliderArgument = SliderMethod | Object;
declare type SecondSliderArgument = Object | Function;
declare global {
    interface Window {
        $: JQuery;
    }
    interface JQuery {
        slider(arg1: FirstSliderArgument, arg2?: SecondSliderArgument): JQuery | void | IOptions;
    }
}
export {};
