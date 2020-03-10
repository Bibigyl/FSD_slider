
import { defaultOptions } from './MVP/defaultOptions';
import Slider from './Slider';

(function ($) {

    const methods = {

        init: function(opts) {

            return this.each(function() {

                const $this = $(this);
                const data = $this.data('sliderData');
                const $node = $this;

                // If the plugin has not yet been initialized
                if (!data) {

                    const options = $.extend({}, defaultOptions, opts);
                    const slider = new Slider(options, this);

                    $(this).data('sliderData', {
                        $node: $node,
                        slider: slider
                    });
                }
            });
        },

        getData: function() {
            return $(this).data('sliderData').slider.getData();
        },

        update: function (options) {
            return this.each(function () {
                $(this).data('sliderData').slider.update(options);
            });
        },

        destroy: function() {
            return this.each(function () {

                const $this = $(this);
                const data = $this.data('sliderData');

                $(window).unbind('.slider');
                data.node.remove();
                $this.removeData('sliderData');
            });
        },

        observe: function(listener) {

            const slider = $(this).data('sliderData').slider;
            slider.subscribe(listener);
        }
    }

    jQuery.fn.slider = function(method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);

        } else {
            $.error('Method called ' + method + ' does not exist for JQuery.slider');
        }
    };

})(jQuery);
