import Model, { IModel } from './Model';
import View, { IView } from './View';
import Presenter from './Presenter';
import { IOptions, defaultOptions } from './defaultOptions';
import { IMessage } from './Observer';
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
/*         let message: IMessage = {
          type: 'NEW_DATA',
          options: options
        } */

        //$(this).data('sliderData').presenter.update(message);
        $(this).data('sliderData').presenter.update(options);

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

    observe: function (listener: Function): void {

      let presenter = $(this).data('sliderData').presenter;
      presenter.subscribe(listener);
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


let mod = new Model(Object.assign({}, defaultOptions, {
  begin: 5,
  end: 7,
  range: true
}));
mod.setEndByOffsetRacio(0.3454);
console.log(mod);



//let pres = new Presenter(defaultOptions, test);

/*  $('.test').slider({
  step: 9,
  tooltip: true,
  scale: true,
  reverse: true
}); */
/*
$('.test').slider('observe', function(message) {
  if (message.options && message.options.range) {
    $('.input').val(message.options.range);
  }

  if (message.type == 'WARNINGS') {

    for ( let key in message.warnings ) {
      $('.wars').append('<p>' + message.warnings[key] + '</p>')
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