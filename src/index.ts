/* import Model from './Model';
import {defaultOptions} from './defaultOptions'; */
/* interface JQuery {
  slider(options?: any): void;
}

(function($){
  jQuery.fn.slider = function(options){

    options = $.extend(defaultOptions, options);
  
    var make = function(){

      let thumb = document.createElement("div");
      thumb.classList.add("thumb");
      this.classList.add("slider");
      this.append(thumb);

      let model = new Model(options);
      let view = new View(options, this);
      let presenter = new Presenter(model, view);

      view.build();

    };
  
    return this.each(make); 
    // в итоге, метод responsiveBlock вернет текущий объект jQuery обратно
  };
})(jQuery); */
  
// теперь можно задавать плагин с настройками по умолчанию:
/* $('.test').slider();
$('.test2').slider(); */

   