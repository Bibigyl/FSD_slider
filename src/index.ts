import Model, {IModel} from './Model';
import View, {IView} from './View';
import Presenter from './Presenter';
import {defaultOptions} from './defaultOptions';

(function($){

  var methods: Object = {

    init: function( options?: any ) {

      return this.each(function(){
         
        // ??? Правильно?
        let $this = $(this);
        let data = $this.data('sliderData');
        let slider = $this;
        
        // Если плагин ещё не проинициализирован
        if ( ! data ) {
        
          options = $.extend(defaultOptions, options);

          let model: IModel = new Model(options);
          // передаем модель в представление для получения из нее 
          // корректных данных
          let view: IView = new View(model, options, this);
          let presenter = new Presenter(model, view);

          $(this).data('sliderData', {
            slider : slider,
            model: model,
            view: view,
            presenter: presenter
          });
          
        }
      });
    },

    test: function( content ) {
      console.log('its test:  ' + content);
    },

    change: function( options ) {
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



$('.test').slider();

/* 
class EventObserver {
  constructor () {
    // @ts-ignore
    this.observers = []
  }

  subscribe (fn) {
    // @ts-ignore
    this.observers.push(fn)
  }

  unsubscribe (fn) {
    // @ts-ignore
    this.observers = this.observers.filter(
      subscriber => subscriber !== fn
    )
  }

  broadcast (data) {
    // @ts-ignore
    this.observers.forEach(subscriber => subscriber(data))
  }
}

const blogObserver = new EventObserver()

const textField = document.querySelector('.textField')
const countField = document.querySelector('.countField')

const getWordsCount = text =>
  text ? text.trim().split(/\s+/).length : 0

blogObserver.subscribe(text => {
  countField.innerHTML = getWordsCount(text)
})

textField.addEventListener('keyup', () => {
  // @ts-ignore
  blogObserver.broadcast(textField.value)
}) */






/**
 * Клиентский код.
 */

const subject = new ConcreteSubject();

const observer1 = new ConcreteObserverA();
subject.attach(observer1);

const observer2 = new ConcreteObserverB();
subject.attach(observer2);

subject.someBusinessLogic();
subject.someBusinessLogic();

subject.detach(observer2);

subject.someBusinessLogic();