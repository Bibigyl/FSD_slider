import Model, { IModel } from './Model';
import View, { IView } from './View';
import Presenter from './Presenter';
import { IOptions, defaultOptions } from './defaultOptions';
import { IConfig } from './Observer';
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

    init: function (options?: IOptions): void {

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

    getData: function (): IOptions {
      return $(this).data('sliderData').presenter.getData();
    },

    update: function (options: IOptions): void {
      return this.each(function () {
        let config: IConfig = {
          type: 'NEW_DATA',
          options: options
        }

        $(this).data('sliderData').presenter.update(config);

      });
    },

    destroy: function (): void {
      return this.each(function () {

        let $this = $(this);
        let data = $this.data('sliderData');

        $(window).unbind('.slider');
        data.slider.remove();
        $this.removeData('sliderData');

      });
    },

    observe: function (callback: Function): void {

      let presenter = $(this).data('sliderData').presenter;
      presenter.attach(callback);
    }
  }

// ?????????????
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


//let test = document.querySelector('.test') as HTMLDivElement;


//let pres = new Presenter(defaultOptions, test);

/* $('.test').slider({
  //value: 0,
  //min: -7.6666,
  range: 'hjk,',
  //reverse: true,
  //customValues: ['a', 'b', 'c', 'd'],
  step: 'hg',
  value: 'vxnxm',
  min: 'fdgvhxjk',
  max: 17.5,
  tooltip: true,
  scale: true
});

$('.test').slider('observe', function(config) {
  if (config.options && config.options.range) {
    $('.input').val(config.options.range);
  }

  if (config.type == 'WARNINGS') {

    for ( let key in config.warnings ) {
      $('.wars').append('<p>' + config.warnings[key] + '</p>')
    }

  }

})

$('.test').slider('update', {
  min: 20,
  range: [3, 7],
  max: -3
})


$('.test').slider('update', {
  min: -5.8,
  range: [3, 7, 'dgx ', 5],
  max: 'vbn'
}) */



/* let mod = new Model(defaultOptions);
console.log(mod.reverse)
mod.makeFullChanges({reverse: true})
console.log(mod.reverse)
mod.makeFullChanges({reverse: false})
console.log(mod.reverse) */