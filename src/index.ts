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

      let min = model.getMinVal();
      let max = model.getMaxVal();
      let s = model.getStep();

      //------------------

     
      //------------------

    };
  
    return this.each(make); 
  };
})(jQuery);

//console.log('---------------' + 0.6/0.2);
  
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


/* document.addEventListener('click', func);
function func(event) {
  console.log('x = ' + event.clientX + '. y = ' + event.clientY);
} */



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

/* $('.test').slider(); */

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

