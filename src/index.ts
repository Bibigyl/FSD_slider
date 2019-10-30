import Model, {IModel} from './Model';
import View, {IView} from './View';
import Presenter from './Presenter';
import {defaultOptions} from './defaultOptions';

(function($){
  jQuery.fn.slider = function(options?: any) {

    options = $.extend(defaultOptions, options);
  
    var make = function(){

      let model: IModel = new Model(options);
      let view: IView = new View(options, this);
      let presenter = new Presenter(model, view);

/*       console.log(model.getMinVal());
      console.log(model.getMaxVal());
      console.log(model.getVal()); */
      console.log(model.getTranslated(3));
    };
  
    return this.each(make); 
  };
})(jQuery);
  
// теперь можно задавать плагин с настройками по умолчанию:
$('.test').slider({
  dataFormat: 'custom',
  width: '500px',
  vertical: false,
  initialVal: 2,
  customValues: ['kjk', 1, 0, 'fsd', 'sf'],
  tooltip: true,
  tooltipMaskWithCalc: "'val = ' + val/2",
});

   