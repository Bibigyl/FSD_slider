
import { IOptions, defaultOptions } from './MVP/defaultOptions';
import Slider from './Slider';


(function ($) {

  interface IMethods {
    init(options?: IOptions): void;
    getData(): IOptions;
    update(options: any): void;
    destroy(): void;
    observe(func: Function): void;
  }

  var methods: IMethods = {

    init: function(options?: IOptions): void {

      return this.each(function() {

        let $this = $(this);
        let data = $this.data('sliderData');
        let $node = $this;

        // Если плагин ещё не проинициализирован
        if (!data) {

          let newDefaultOptions = Object.assign({}, defaultOptions)
          options = $.extend({}, newDefaultOptions, options);
          let slider = new Slider(options, this);

          $(this).data('sliderData', {
            $node: $node,
            slider: slider
          });

        }
      });
    },

    getData: function (): IOptions {
      return $(this).data('sliderData').slider.getData();
    },

    update: function (options: IOptions): void {
      return this.each(function () {
        $(this).data('sliderData').slider.update(options);
      });
    },

    destroy: function (): void {
      return this.each(function () {

        let $this = $(this);
        let data = $this.data('sliderData');

        $(window).unbind('.slider');
        data.node.remove();
        $this.removeData('sliderData');

      });
    },

    observe: function (listener: Function): void {

      let slider = $(this).data('sliderData').slider;
      slider.subscribe(listener);
    }
  }

  jQuery.fn.slider = function (method: string): JQuery {

    // логика вызова метода
    if (methods[method as string]) {

      return methods[method as string].apply(this, Array.prototype.slice.call(arguments, 1));

    } else if (typeof method === 'object' || !method) {

      return methods.init.apply(this, arguments);

    } else {
      $.error('Method called ' + method + ' does not exist for JQuery.slider');
    }

  };

})(jQuery);