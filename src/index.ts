import Model, {IModel} from './Model';
import View, {IView} from './View';
import Presenter from './Presenter';
import {defaultOptions} from './defaultOptions';

(function($){

  var methods: Object = {



    init: function( options?: any ) {

      return this.each(function(){
         
        let $this = $(this);
        let data = $this.data('slider');
        
        // Если плагин ещё не проинициализирован
        if ( ! data ) {
        
          options = $.extend(defaultOptions, options);

          let model: IModel = new Model(options);
            
          // передаем модель в представление для получения из нее 
          // корректных данных
          let view: IView = new View(model, options, this);
          let presenter = new Presenter(model, view);

          $(this).data('tooltip', {
            slider : $this,
            model: model,
            view: view,
            presenter: presenter
          });

        }
      });
    },

    test: function() {
      console.log('its test');
    }

  }

  jQuery.fn.slider = function( method?: string | Object ) {

    // логика вызова метода
    if ( methods[method as string] ) {
      return methods[ method as string ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      // ????????????
      // @ts-ignore
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method called ' +  method + ' does not exist for JQuery.slider' );
    } 


  };
})(jQuery);






$('.test').slider('make');

  
// теперь можно задавать плагин с настройками по умолчанию:
/* $('.test').slider({
  initialVal: 1.6,
  minVal: 1.6,
  maxVal: -3.6,
  //reverse: true,
  step: 0.1,
  initialValNumInCustomValues: 5,
  range: [-0.4, 1.6],
  tooltip: true,
  scaleStep: 0.4,
  scale: true,
  vertical: true,
}); */

/* $('.test').slider({
  initialVal: 2,
  minVal: 0,
  maxVal: 12,
  reverse: false,
  step: 2,
  tooltip: true,
  scaleStep: 4,
  //scaleMask: 'val',
  vertical:true
}); */

/* $('.test').slider({
  tooltip: true,
  minVal: -0.2,
  maxVal: 2.2,
  step: 0.2,
  scale: true,
  scaleStep: 0.4,
  vertical: true,
}); */



/* $('.test').slider({
  dataFormat: 'date',
  minVal: '01.11.2019',
  maxVal: '13.11.2019',
  //scale: true,
  scaleStep: 4,
  tooltip: true,
  scaleMask: "val.getDate()",
  vertical: true
}); */



/* $('.test').slider({
  //dataFormat: 'custom',
  width: '500px',
  //initialVal: 1,
  step: .25,
  scaleStep: .5,
  //initialRangeInCustomValues: [1, 'fsd'],
  range: [0.5 , 5 ],
  customValues: ['kjk', 1, 0, 'fsd', 'sf'],
  tooltip: true,
  tooltipMaskWithCalc: "val",
  vertical: true,
}); */

