import Model, { IModel } from './Model';
import View, { IView } from './View';
import Presenter from './Presenter';
import { IOptions, defaultOptions } from './defaultOptions';
//import { IOuterObserver, OuterObserver } from './Observer';


(function ($) {

  interface IMethods {
    init(options?: IOptions): void;
    getData(): IOptions;
    update(options: any): void;
    destroy(): void;
    observe(func: Function): void;
  }

  var methods: IMethods = {

    init: function (options?: IOptions) {

      return this.each(function () {

        let $this = $(this);
        let data = $this.data('sliderData');
        let slider = $this;

        // Если плагин ещё не проинициализирован
        if (!data) {

          options = $.extend({}, defaultOptions, options);

          let presenter = new Presenter(options, this);

          $(this).data('sliderData', {
            slider: slider,
            presenter: presenter
          });

        }
      });
    },

    getData: function () {
      return $(this).data('sliderData').presenter.data;
    },

    update: function (options: any) {
      return this.each(function () {
        let config: any = {
          type: 'NEW_DATA',
          options: options
        }

        $(this).data('sliderData').presenter.update(config);

      });
    },

    destroy: function () {
      return this.each(function () {

        let $this = $(this);
        let data = $this.data('sliderData');

        $(window).unbind('.slider');
        data.slider.remove();
        $this.removeData('sliderData');

      });
    },

    observe: function (callback) {

      //let observer: IOuterObserver = new OuterObserver(func);
      let presenter = $(this).data('sliderData').presenter;

      presenter.attach(callback);
    }
  }


  jQuery.fn.slider = function (method) {

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


//let test = document.querySelector('.test') as HTMLDivElement;


//let pres = new Presenter(defaultOptions, test);

$('.test').slider({
  value: 0,
  //min: -7.6666,
  //range: [5, 10],
  //reverse: true,
  //customValues: ['a', 'b', 'c', 'd'],
  step: 1,
  min: 0,
  max: 17,
});
/* 
$('.test').slider('update', {
  min: -5,
  range: [3, 15]
}) */

/* $('.test').slider('observe', function(config) {
  console.log('2 ' + config.options)
  $('.input').val(config.options.range);
})
 */

/* let mod = new Model(defaultOptions);
console.log(mod.reverse)
mod.makeFullChanges({reverse: true})
console.log(mod.reverse)
mod.makeFullChanges({reverse: false})
console.log(mod.reverse) */