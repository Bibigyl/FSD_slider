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

        let $this = $(this);
        let presenter = $this.data('sliderData').presenter;
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
  // Когда при вызове метода передаешь два аргумента, появляется предупреждение
  // Добавление ...args не решает проблемы
  // ?????
  jQuery.fn.slider = function( method ) {

    // логика вызова метода
    if ( methods[method as string] ) {
      return methods[ method as string ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {

      // @ts-ignore
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method called ' +  method + ' does not exist for JQuery.slider' );
    } 
  };

})(jQuery);



console.log(0.7*100*0.7/100);
$('.test').slider({
  minVal: -0.7,
  maxVal: 3.3
});
  // @ts-ignore
$('.test').slider('test', 'opop');

  // @ts-ignore
$('.test').slider('change', {
  width: '400px',
  //vertical: true,
  //height: "400px",
  range: [-0.7, 1.3],
});



//$('.test').slider();
//$('.test').slider('change');
/* console.log('1 = ' + $('.test').slider().data('sliderData').model.setVal(5));
console.log('1 = ' + $('.test').slider().data('sliderData').model.getVal());



  
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

