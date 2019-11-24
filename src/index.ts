import Model, {IModel} from './Model';
import View, {IView} from './View';
import Presenter from './Presenter';
import {defaultOptions} from './defaultOptions';

import {Observer} from './Observer';
import {IObserver} from './Observer';
import Subject  from './Observer';


(function($){

  var methods: Object = {

    init: function( options?: any ) {

      return this.each(function(){
         
        let $this = $(this);
        let data = $this.data('sliderData');
        let slider = $this;
        
        // Если плагин ещё не проинициализирован
        if ( ! data ) {
        
          options = $.extend({}, defaultOptions, options);

          let model: IModel = new Model(options);
          // передаем модель в представление для получения из нее 
          // корректных данных
          let view: IView = new View(model, options, this);

          // субъект - это наблюдение
          // он хранит значение val или промежуток
          let val: any | [any, any];
          val = model.getVal() || model.getRange(); 
          let subject = new Subject(val);

          let presenter = new Presenter(model, view, subject);

          $(this).data('sliderData', {
            slider : slider,
            model: model,
            view: view,
            presenter: presenter,
            subject: subject
          });
          
        }
      });
    },

    change: function( options: any ) {
      return this.each( function() {

        let presenter = $(this).data('sliderData').presenter;
        presenter.change(options);

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
      let subject = $(this).data('sliderData').subject;
      let observer: IObserver = new Observer( func );

      subject.attach(observer);
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
