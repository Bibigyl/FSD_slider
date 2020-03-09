
import { IOptions, defaultOptions } from './MVP/defaultOptions';
import Slider, { ISlider } from './Slider';

interface IMethods {
  init(options?: IOptions): void;
  getData(): IOptions;
  update(options: Object): void;
  destroy(): void;
  observe(func: Function): void;
}

//(function ($) {
(function ($): void {

  const methods: IMethods = {

    init: function(opts?: Object): void {

      return this.each(function() {

        const $this = $(this);
        const data = $this.data('sliderData');
        const $node = $this;

        // If the plugin has not yet been initialized
        if (!data) {

          const options: Object = $.extend({}, defaultOptions, opts);
          const slider: ISlider = new Slider(options, this);

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

        const $this = $(this);
        const data = $this.data('sliderData');

        $(window).unbind('.slider');
        data.node.remove();
        $this.removeData('sliderData');

      });
    },

    observe: function (listener: Function): void {

      const slider = $(this).data('sliderData').slider;
      slider.subscribe(listener);
    }
  }

  jQuery.fn.slider = function (method: string): JQuery {

    if (methods[method as string]) {

      return methods[method as string].apply(this, Array.prototype.slice.call(arguments, 1));

    } else if (typeof method === 'object' || !method) {

      return methods.init.apply(this, arguments);

    } else {
      $.error('Method called ' + method + ' does not exist for JQuery.slider');
    }

  };

})(jQuery);


/* const node: HTMLDivElement = document.querySelector('#slider1');
const mod = new Model({})
const modOpt = mod.getOptions()
const view = new View(modOpt, node); */
