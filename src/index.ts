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

    test: function( content ) {
      console.log('its test:  ' + content);
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



/* $('.test').slider({
  dataFormat: 'date',
  minVal: '11/11/2019',
  maxVal: '23/12/2019',
  initialVal: '18/11/2019',
  step: 1,
  scaleStep: 7,
  //scaleMask: 'val',
  scaleMask: "('0'+val.getDate()).slice(-2) + '.' + ('0'+(1+val.getMonth())).slice(-2)",
  scale: true,
  vertical: true,
  tooltip: true,
  tooltipMask: "('0'+val.getDate()).slice(-2) + '.' + ('0'+(1+val.getMonth())).slice(-2)",
  //tooltipMask: 'val',
}); */

/*  $('.test').slider('change', {
  range: ['18/11/2019', '25/11/2019'],
});

$('.test').slider('change', {
  step: 7,
});

$('.test').slider('change', {
  minVal: '18/11/2019',
});

$('.test').slider('change', {
  step: 1,
});

$('.test').slider('change', {
  range: null,
  initialVal: '18/11/2019'
});  */



$('.test').slider({
  dataFormat: 'custom',
  customValues: ['a','b','c','d'],
  initialVal: 1,
  tooltip: true,
})

$('.test').slider('change', {
  initialValInCustomValues: 'c',
})

/* $('.test').slider('change', {
  customValues: ['a','b','c','d', 'r'],
  range: [1,2],
})
$('.test').slider('change', {
  reverse: true,
  scale:true,
})
$('.test').slider('change', {
  initialVal: 2,
  range: false,
}); */