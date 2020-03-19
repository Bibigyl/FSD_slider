import { defaultOptions, IOptions } from './MVP/defaultOptions';
import Slider from './Slider';

type SliderMethod = 'getData' | 'update' | 'destroy' | 'observe';
type FirstSliderArgument = SliderMethod | Object;
type SecondSliderArgument = Object | Function;

declare global {
    interface Window {
        $: JQuery;
    }

    interface JQuery {
        slider(arg1: FirstSliderArgument, arg2?: SecondSliderArgument): JQuery | void | IOptions;
    }
}


(function($) {

    const methods: {[key: string]: Function} = {

        init: function(opts: {} = {}) {
            return this.each(function(i: number, item: HTMLElement) {

                const $this = $(item);
                const data = $this.data('sliderData');
                const $node = $this;

                if (!data) {

                    const options = $.extend({}, defaultOptions, opts);
                    const slider = new Slider(options, item);

                    $(item).data('sliderData', {
                        $node: $node,
                        slider: slider
                    });
                }
            });
        },

        getData: function(): IOptions {
            return this.each(function (i: number, item: HTMLElement) {

                $(item).data('sliderData').slider.getData();
            });
        },

        update: function(options: {}): void {
            return this.each(function (i: number, item: HTMLElement) {

                $(item).data('sliderData').slider.update(options);
            });
        },

        destroy: function(): void {
            return this.each(function (i: number, item: HTMLElement) {

                const $this = $(item);
                const data = $this.data('sliderData');

                $(window).unbind('.slider');
                data.$node.remove();
                $this.removeData('sliderData');
            });
        },

        observe: function(listener: Function): void {
            return this.each(function (i: number, item: HTMLElement) {

                const slider = $(item).data('sliderData').slider;
                slider.subscribe(listener);
            });
        }
    }


    jQuery.fn.slider = function(arg1: FirstSliderArgument, arg2?: SecondSliderArgument): JQuery | void | IOptions {

        if (typeof arg1 === 'object' || !arg1) {
            return methods.init.call(this, arg1);

        } else if (methods[arg1]) {
            return methods[arg1].call(this, arg2);

        } else {
            $.error('Method called ' + arg1 + ' does not exist for JQuery.slider');
        }
    };

})(jQuery);