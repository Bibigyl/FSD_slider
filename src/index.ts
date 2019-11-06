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

let step = 0.1;
const simbols: number =  ~(step + '').indexOf('.') ? (step + '').split('.')[1].length : 0;
//console.log(Math.pow(10, simbols));
//console.log( Math.abs(((0.2 - 0.6)*Math.pow(10, simbols)) / (0.1 * Math.pow(10, simbols)))%1 ) 

  
// теперь можно задавать плагин с настройками по умолчанию:
/* $('.test').slider({
  initialVal: 0.16,
  minVal: 0.6,
  maxVal: -1,
  reverse: true,
  step: 0.01,
  initialValNumInCustomValues: 5,
  range: [-0.61, 0.16],
  tooltip: true,
}); */

/* $('.test').slider({
  initialVal: 2,
  minVal: -6,
  maxVal: 12,
  reverse: true,
  step: 0.5,
  initialValNumInCustomValues: 5,
  range: [ -2.5, 8],
  tooltip: true,
}); */

$('.test').slider();


/* document.addEventListener('click', func);
function func(event) {
  console.log('x = ' + event.clientX + '. y = ' + event.clientY);
} */


/* $('.test').slider({
  //dataFormat: 'custom',
  width: '500px',
  vertical: false,
  //initialVal: 1,
  step: .2,
  //initialRangeInCustomValues: [1, 'fsd'],
  range: [0.6 , 1 ],
  //customValues: ['kjk', 1, 0, 'fsd', 'sf'],
  tooltip: true,
  tooltipMaskWithCalc: "'val = ' + val",
}); */


let sliderOnClick = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 45
});


document.querySelector('.slider').dispatchEvent(sliderOnClick);



/* let sliderOnClick = new MouseEvent("click", {
  //bubbles: true,
  //cancelable: true,
  clientX: 2000,
  clientY: 45
});
document.querySelector('.slider').dispatchEvent(sliderOnClick); */
