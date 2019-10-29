import Model from './Model';
import View from './View';
import {defaultOptions} from './defaultOptions';

(function($){
  jQuery.fn.slider = function(options?: any){

    options = $.extend(defaultOptions, options);
  
    var make = function(){

      let model = new Model(options);
      let view = new View(options, this);
      //let presenter = new Presenter(model, view);

    };
  
    return this.each(make); 
  };
})(jQuery);
  
// теперь можно задавать плагин с настройками по умолчанию:
$('.test').slider();

   