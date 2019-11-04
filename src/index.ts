import Model, {IModel} from './Model';
import View, {IView} from './View';
import Presenter from './Presenter';
import {defaultOptions} from './defaultOptions';

(function($){
  jQuery.fn.slider = function(options?: any) {

    options = $.extend(defaultOptions, options);
  
    var make = function(){

      let model: IModel = new Model(options);
      
      // передаем модель в представление для получения из нее 
      // корректных данных
      let view: IView = new View(model, options, this);
      let presenter = new Presenter(model, view);

      let testOptions = Object.assign({}, defaultOptions, {
        minVal: 0,
        maxVal: 20,
        step: 2,
        reverse: true,
      });

    };
  
    return this.each(make); 
  };
})(jQuery);
  
// теперь можно задавать плагин с настройками по умолчанию:
$('.test').slider({
  //dataFormat: 'custom',
  width: '500px',
  vertical: false,
  initialVal: 3,
  range: [0.2, 0.8],
  step: 0.2,
  //initialVal: 2,
  //initialRangeInCustomValues: [1, 'fsd'],
  //range: [0, 1 ],
  //customValues: ['kjk', 1, 0, 'fsd', 'sf'],
  tooltip: true,
  tooltipMaskWithCalc: "'val = ' + val",
});
