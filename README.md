# Слайдер - jquery плагин

### [Демонстрация работы слайдера](https://bibigyl.github.io/FSD_slider/demo/demo.html)
## Установка
```
npm install
```
### Режим работы
```
// develop
npm run start

// production
npm run build

// Запустить тесты
npm run test
```
## Использование
Для подключения плагина необходимо:
  * Подключить **jquery** к своему проекту
  * Скачать файлы **slider.js** и **slider.css** из папки slider
  * Подключить файлы **slider.js** и **slider.css** к своему проекту

Для создания слайдера c настройками "по умолчанию" выполните:
```
$('.some_div_element').slider();
```
Для создания слайдера с пользовательскими настройками, выполните функцию slider с одним параметром - объектом с настройками. Например: 
```
$('.some_div_element').slider({
    range: [2, 5],
    vertical: true
});
```
### Доступные настройки
| Название свойства | По умолчанию | Описание |
| ------ | ------ | ------ |
| Данные |
| dataFormat | numeric | Формат данных. Возможные варианты: numeric, date, custom. |
| value | null | Одно значение. По умолчанию, value примет минимальное значение. Value должно быть установлено на шаг |
| minVal | 0 | Минимальное значение |
| maxVal | 10 | Максимальное значение |
| step | 1 | Шаг. (Max - min) должно быть кратно шагу  |
| reverse | false | В обратном порядке |
| range | null | Диапазон, два бегунка. Range должно быть установлено на шаг. Отменяет value |
| customValues | - | Массив с любыми пользовательскими значениями. Только для 'dataFormat: custom', обязательный параметр |
| valueInCustomValues | - | Одно значение из customValues (аналог value). Если таких несколько, определится как первое найденное.
| rangeInCustomValues | - | Диапазон из customValue (аналог range). Если таких несколько, определится как первое найденное.
| Вид |
| length | 300px | Длина или высота. Принимает любые значение, валидные css |
| vertical | false | Вертикальный вид |
| tooltip | false | Подсказки над бегунками |
| tooltipMask | "val" | Маска подсказки. Текущее значение - val. Пример: "'$' + (+val).toFixed(2)" выведет $0.00|
| scale | false | Шкала |
| scaleStep | null | Шаг шкалы. По умолчанию примет значение шага из данных. Должно быть кратно шагу из данных |
| scaleMask | "val" | Маска делений шкалы. По аналогии с tooltipMask |

### Методы

При вызове метода, его название передается в качестве первого аргумента. Пример:
```
// Сначала инициализируем слайдер
$('.some_div_element').slider();

// Добавляем наблюдение
$('.some_div_element').slider('observe', function() {
    console.log(val);
});

// Изменяем количество бегунков
$('.some_div_element').slider('change', {
    range: [1, 3],
});

// Удаляем узел слайдера
$('.some_div_element').slider('destroy');
```
### Доступные методы
| Название метода | Описание |
| ------ | ------ |
| change | Изменяет slider. В качестве второго аргумента необходимо передать объект с новыми параметрами |
| destroy | Удаляет слайдер со страницы вместе с узлом, на котором слайдер создавался |
| observe | Создает объект наблюдателя. Позволяет вывести текущее значение value или диапазон значений range. В качестве второго аргумента необходимо передать функцию |

### Пример
```
// Полученный результат можно увидеть на демо странице

// Числовые значения
$('#slider1').slider({
    minVal: 0,
    maxVal: 30,
    step: 0.5,
    tooltipMask: "'$' + (+val).toFixed(2)",
    scaleStep: 5,
    scaleMask: "'$' + val",
});

// Даты
$('#slider2').slider({
    dataFormat: 'date',
    minVal: '11/11/2019',
    maxVal: '23/12/2019',
    value: '18/11/2019',
    step: 1,
    scaleStep: 7,
    scaleMask: "val",
    scale: true,
    vertical: true,
    tooltip: false,
    tooltipMask: "('0'+val.getDate()).slice(-2) + '.' + ('0'+(1+val.getMonth())).slice(-2)",
});

// Пользовательский диапазон
$('#slider3').slider({
    dataFormat: 'custom',
    customValues: ['yellow', 'orange', 'red', 'purple', 'blue', 'green'],
    value: 4,
    scale: true,
    tooltipMask: "'color: ' + val",
});