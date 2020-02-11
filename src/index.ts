import Model, { IModel } from './Model';
import View, { IView } from './View';
import Presenter from './Presenter';
import { IOptions, defaultOptions } from './defaultOptions';
import { IObserver } from './Observer';


(function($){

  var methods: Object = {

    init: function( options?: IOptions ) {

      return this.each(function(){
         
        let $this = $(this);
        let data = $this.data('sliderData');
        let slider = $this;
        
        // Если плагин ещё не проинициализирован
        if ( ! data ) {
        
          options = $.extend({}, defaultOptions, options);

          let presenter = new Presenter(options, this)

          $(this).data('sliderData', {
            slider : slider,
            presenter: presenter
          });
          
        }
      });
    },

    change: function( options: any ) {
      return this.each( function() {

        $(this).data('sliderData').presenter.change(options);
        //presenter.change(options);

      });
    },

    destroy: function() {
      return this.each( function() {

        let $this = $(this);
        let data = $this.data('sliderData');

        $(window).unbind('.slider');
        data.slider.remove();
        $this.removeData('sliderData');
        
      });
    },

    observe: function( func ) {

      // добавляем наблюдателя
      // аргумент - эта функция которая будет обрабатывать изменения
      //let subject = $(this).data('sliderData').subject;
      //let observer: IObserver = new Observer( func );

      //subject.attach(observer);
    }
  }

  
  jQuery.fn.slider = function( method ) {

    // логика вызова метода
    if ( methods[method as string] ) {
      return methods[ method as string ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {

      // ????
      // @ts-ignore
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method called ' +  method + ' does not exist for JQuery.slider' );
    } 

  };

})(jQuery);


//let test = document.querySelector('.test') as HTMLDivElement;


//let pres = new Presenter(defaultOptions, test);

$('.test').slider({
  value: 5
});

$('.test').slider('change', {
  min: -5,
  range: [3, 15]
})