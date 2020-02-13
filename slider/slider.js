/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Model.ts":
/*!**********************!*\
  !*** ./src/Model.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Observer_1 = __webpack_require__(/*! ./Observer */ "./src/Observer.ts");
var commonFunctions_1 = __webpack_require__(/*! ./commonFunctions */ "./src/commonFunctions.ts");
var Model = (function (_super) {
    __extends(Model, _super);
    function Model(options) {
        var _this = _super.call(this) || this;
        var validOptions = _this.validation(options);
        _this.value = validOptions.value;
        _this.min = validOptions.min;
        _this.max = validOptions.max;
        _this.step = validOptions.step;
        _this.range = validOptions.range;
        _this.customValues = validOptions.customValues;
        _this.reverse = validOptions.reverse;
        return _this;
    }
    Model.prototype.validation = function (options) {
        var _a;
        if (options.customValues && Array.isArray(options.customValues)) {
            options.min = 0;
            options.max = options.customValues.length - 1;
        }
        options.value = options.value || options.min;
        if (options.range) {
            this.rangeArrayValidation(options.range);
        }
        ;
        this.numericValidation(options);
        this.integerValidation(options);
        if (options.min > options.max) {
            _a = [options.max, options.min], options.min = _a[0], options.max = _a[1];
        }
        if (options.range) {
            options.range.sort(function (a, b) {
                return a - b;
            });
        }
        options.reverse = !!options.reverse;
        options.step = Math.abs(options.step);
        this.limitsValidation(options);
        if (options.range) {
            options.range[0] = this.findClosestStep(options.range[0], options);
            options.range[1] = this.findClosestStep(options.range[1], options);
        }
        else {
            options.value = this.findClosestStep(options.value, options);
        }
        return options;
    };
    Model.prototype.numericValidation = function (options) {
        var numericOptions = [options.min, options.max, options.step];
        if (options.range) {
            numericOptions.push(options.range[0], options.range[1]);
        }
        else {
            numericOptions.push(options.value);
        }
        numericOptions.forEach(function (item) {
            if (!commonFunctions_1.isNumeric(item)) {
                throw new Error('All values should be numbers');
            }
        });
    };
    Model.prototype.integerValidation = function (options) {
        options.min = Math.trunc(options.min);
        options.max = Math.trunc(options.max);
        options.step = Math.trunc(options.step);
        if (options.range) {
            options.range[0] = Math.trunc(options.range[0]);
            options.range[1] = Math.trunc(options.range[1]);
            options.value = null;
        }
        else {
            options.value = Math.trunc(options.value);
            options.range = null;
        }
        return options;
    };
    Model.prototype.rangeArrayValidation = function (range) {
        if (!Array.isArray(range) || range.length != 2) {
            throw new Error('Incorrect Range');
        }
    };
    Model.prototype.limitsValidation = function (options) {
        var valuesInLimits = [];
        if (options.range) {
            Array.prototype.push.apply(valuesInLimits, options.range);
        }
        else {
            valuesInLimits.push(options.value);
        }
        valuesInLimits.forEach(function (item) {
            if (item > options.max || item < options.min) {
                console.warn('Incorrect value or range');
                item = Math.max(item, options.max);
                item = Math.min(item, options.min);
            }
        });
        if (options.step == 0 || options.step > (options.max - options.min)) {
            options.step = 1;
            console.warn('Incorrect step');
        }
        if (options.min == options.max) {
            console.warn('Min cannot be equal to max');
        }
    };
    Model.prototype.translate = function (value) {
        if (this.customValues) {
            return this.customValues[value];
        }
        else {
            return value;
        }
    };
    Model.prototype.findClosestStep = function (value, options) {
        var step;
        var ceilSteps;
        var restOfStep;
        if (!options.reverse) {
            ceilSteps = Math.trunc((value - options.min) / options.step);
            restOfStep = (value - options.min) % options.step;
            step = options.min + ceilSteps * options.step;
            step = restOfStep >= options.step / 2 ? step + options.step : step;
        }
        else {
            ceilSteps = Math.trunc((options.max - value) / options.step);
            restOfStep = (options.max - value) % options.step;
            step = options.max - ceilSteps * options.step;
            step = restOfStep >= options.step / 2 ? step - options.step : step;
        }
        step = step > options.max ? options.max : step;
        step = step < options.min ? options.min : step;
        return step;
    };
    Model.prototype.makeFullChanges = function (options) {
        options = Object.assign({}, this.data, options);
        var validOptions = this.validation(options);
        this.value = validOptions.value;
        this.min = validOptions.min;
        this.max = validOptions.max;
        this.step = validOptions.step;
        this.range = validOptions.range;
        this.customValues = validOptions.customValues;
        this.reverse = validOptions.reverse;
        this.notify('fullChanges');
    };
    Model.prototype.makeSlimChanges = function (key, value) {
        if (Array.isArray(value)) {
            value[0] = this.findClosestStep(value[0], this.data);
            value[1] = this.findClosestStep(value[1], this.data);
        }
        else {
            value = this.findClosestStep(value, this.data);
        }
        if (this[key] != value) {
            this[key] = value;
            this.notify('slimChanges');
        }
    };
    Object.defineProperty(Model.prototype, "data", {
        get: function () {
            return {
                value: this.value,
                min: this.min,
                max: this.max,
                step: this.step,
                range: this.range,
                customValues: this.customValues,
                reverse: this.reverse
            };
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype.notify = function (type) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (type == 'slimChanges') {
                observer.pushSlimModelChanges();
            }
            else if (type == 'fullChanges') {
                observer.pushFullModelChanges();
            }
        }
    };
    return Model;
}(Observer_1.Subject));
exports.default = Model;


/***/ }),

/***/ "./src/Observer.ts":
/*!*************************!*\
  !*** ./src/Observer.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subject = (function () {
    function Subject() {
        this.observers = [];
    }
    Subject.prototype.attach = function (observer) {
        this.observers.push(observer);
    };
    Subject.prototype.detach = function (observer) {
        var observerIndex = this.observers.indexOf(observer);
        this.observers.splice(observerIndex, 1);
    };
    return Subject;
}());
exports.Subject = Subject;
var OuterObserver = (function () {
    function OuterObserver(func) {
        this.func = func;
    }
    OuterObserver.prototype.update = function (options) {
        this.func(options);
    };
    return OuterObserver;
}());
exports.OuterObserver = OuterObserver;


/***/ }),

/***/ "./src/Presenter.ts":
/*!**************************!*\
  !*** ./src/Presenter.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var defaultOptions_1 = __webpack_require__(/*! ./defaultOptions */ "./src/defaultOptions.ts");
var Model_1 = __webpack_require__(/*! ./Model */ "./src/Model.ts");
var View_1 = __webpack_require__(/*! ./View */ "./src/View.ts");
var Observer_1 = __webpack_require__(/*! ./Observer */ "./src/Observer.ts");
var Presenter = (function (_super) {
    __extends(Presenter, _super);
    function Presenter(options, node) {
        var _this = _super.call(this) || this;
        options = Object.assign(defaultOptions_1.defaultOptions, options);
        _this._model = new Model_1.default(options);
        options = Object.assign(options, _this._model.data);
        _this._view = new View_1.default(options, node);
        _this._model.attach(_this);
        _this._view.attach(_this);
        return _this;
    }
    Presenter.prototype.pushViewChanges = function (activeThumb, newThumbPosition) {
        var percent = newThumbPosition;
        var newValue;
        var key;
        var value;
        newValue = percent * (this._model.max - this._model.min) / 100;
        newValue = !this._model.reverse ?
            this._model.min + newValue :
            this._model.max - newValue;
        if (!this._model.range) {
            key = 'value';
            value = newValue;
        }
        else {
            key = 'range';
            var isThumbFirst = activeThumb.classList.contains('slider__thumb_first');
            var isReverse = this._model.reverse;
            if ((isThumbFirst && !isReverse) || (!isThumbFirst && isReverse)) {
                newValue = Math.min(newValue, this._model.range[1]);
                value = [newValue, this._model.range[1]];
            }
            else {
                newValue = Math.max(newValue, this._model.range[0]);
                value = [this._model.range[0], newValue];
            }
        }
        this._model.makeSlimChanges(key, value);
    };
    Presenter.prototype.pushSlimModelChanges = function () {
        this._view.makeSlimChanges(this._model);
        this.notify();
    };
    Presenter.prototype.pushFullModelChanges = function () {
        this._view.makeFullChanges(this._model);
    };
    Presenter.prototype.change = function (options) {
        var doesModelChange = false;
        var doesViewChange = false;
        var modelOptions = ['value', 'min', 'max', 'step', 'reverse', 'range', 'customValues'];
        modelOptions.forEach(function (item) {
            if (options.hasOwnProperty(item)) {
                doesModelChange = true;
            }
        });
        if (doesModelChange) {
            this._model.makeFullChanges(options);
            doesViewChange = true;
        }
        var viewOptions = ['length', 'vertical', 'tooltip', 'scale'];
        viewOptions.forEach(function (item) {
            if (options.hasOwnProperty(item)) {
                doesViewChange = true;
            }
        });
        if (doesViewChange) {
            options = Object.assign(options, this._model.data);
            this._view.makeFullChanges(options);
        }
        if (doesModelChange || doesViewChange) {
            this.notify();
        }
    };
    Object.defineProperty(Presenter.prototype, "data", {
        get: function () {
            return Object.assign({}, this._model.data, this._view.data);
        },
        enumerable: true,
        configurable: true
    });
    Presenter.prototype.notify = function () {
        var options = Object.assign({}, this._model.data, this._view.data);
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(options);
        }
    };
    return Presenter;
}(Observer_1.Subject));
exports.default = Presenter;


/***/ }),

/***/ "./src/View.ts":
/*!*********************!*\
  !*** ./src/View.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Observer_1 = __webpack_require__(/*! ./Observer */ "./src/Observer.ts");
var commonFunctions_1 = __webpack_require__(/*! ./commonFunctions */ "./src/commonFunctions.ts");
var View = (function (_super) {
    __extends(View, _super);
    function View(options, sliderNode) {
        var _this = _super.call(this) || this;
        _this.slider = sliderNode;
        _this.slider.classList.add('slider');
        _this.build(options);
        return _this;
    }
    View.prototype.build = function (options) {
        this.length = this.findValidLength(options.length);
        if (!options.vertical) {
            this.vertical = false;
            this.slider.style.width = this.length;
            this.slider.style.height = null;
            this.slider.classList.add('slider_horizontal');
            this.slider.classList.remove('slider_vertical');
        }
        else {
            this.vertical = true;
            this.slider.style.height = this.length;
            this.slider.style.width = null;
            this.slider.classList.add('slider_vertical');
            this.slider.classList.remove('slider_horizontal');
        }
        this.line = this.buildNode(this.slider, 'slider__line');
        this.buildThumbs(options);
        this.setLinePosition();
        if (options.tooltip) {
            this.buildTooltips(options);
        }
        if (options.scale) {
            this.buildScale(options);
        }
        this.thumbOnDown = this.thumbOnDown.bind(this);
        this.thumbOnMove = this.thumbOnMove.bind(this);
        this.thumbOnUp = this.thumbOnUp.bind(this);
        if (!options.range) {
            this.thumb.addEventListener("mousedown", this.thumbOnDown);
            this.thumb.addEventListener("touchstart", this.thumbOnDown);
        }
        else {
            this.thumbFirst.addEventListener("mousedown", this.thumbOnDown);
            this.thumbFirst.addEventListener("touchstart", this.thumbOnDown);
            this.thumbLast.addEventListener("mousedown", this.thumbOnDown);
            this.thumbLast.addEventListener("touchstart", this.thumbOnDown);
        }
    };
    Object.defineProperty(View.prototype, "data", {
        get: function () {
            var tooltip = !!this.tooltip || !!this.tooltipFirst;
            var scale = !!this.scale;
            return {
                length: this.length,
                vertical: this.vertical,
                tooltip: tooltip,
                scale: scale
            };
        },
        enumerable: true,
        configurable: true
    });
    View.prototype.makeSlimChanges = function (options) {
        this.setThumbs(options);
        this.setLinePosition();
        this.setTooltipValues(options);
    };
    View.prototype.makeFullChanges = function (options) {
        var prevOptions = this.data;
        options = Object.assign(prevOptions, options);
        for (var key in this) {
            if (key != 'slider') {
                try {
                    this[key] = this.removeNode(this[key]);
                }
                catch (_a) { }
            }
        }
        this.build(options);
    };
    View.prototype.thumbOnDown = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this._activeThumb = event.currentTarget;
        document.addEventListener('mousemove', this.thumbOnMove);
        document.addEventListener('mouseup', this.thumbOnUp);
        document.addEventListener('touchmove', this.thumbOnMove);
        document.addEventListener('touchend', this.thumbOnUp);
    };
    View.prototype.thumbOnMove = function (event) {
        var length = this.getLengthInPx();
        var offset = this.getOffsetInPx();
        var eventPos;
        var newThumbPosition;
        if (event.touches) {
            eventPos = !this.vertical ? event.touches[0].clientX : event.touches[0].clientY;
        }
        else {
            eventPos = !this.vertical ? event.clientX : event.clientY;
        }
        newThumbPosition = (eventPos - offset) / length * 100;
        this.notify(this._activeThumb, newThumbPosition);
    };
    View.prototype.thumbOnUp = function (event) {
        document.removeEventListener('mouseup', this.thumbOnUp);
        document.removeEventListener('mousemove', this.thumbOnMove);
        document.removeEventListener('touchend', this.thumbOnUp);
        document.removeEventListener('touchmove', this.thumbOnMove);
        this._activeThumb = undefined;
    };
    View.prototype.buildThumbs = function (options) {
        if (!options.range) {
            this.thumb = this.buildNode(this.slider, 'slider__thumb');
        }
        else {
            this.thumbFirst = this.buildNode(this.slider, 'slider__thumb', 'slider__thumb_first');
            this.thumbLast = this.buildNode(this.slider, 'slider__thumb', 'slider__thumb_last');
        }
        this.setThumbs(options);
    };
    View.prototype.setThumbs = function (options) {
        var pos;
        if (!options.range) {
            pos = this.findThumbPosition(options.value, options);
            this.setThumbPosition(this.thumb, pos);
        }
        else {
            var num = void 0;
            num = !options.reverse ? 0 : 1;
            pos = this.findThumbPosition(options.range[num], options);
            this.setThumbPosition(this.thumbFirst, pos);
            num = num == 0 ? 1 : 0;
            pos = this.findThumbPosition(options.range[num], options);
            this.setThumbPosition(this.thumbLast, pos);
        }
    };
    View.prototype.setLinePosition = function () {
        var start;
        var length;
        var topLeft = !this.vertical ? 'left' : 'top';
        var widthHeight = !this.vertical ? 'width' : 'height';
        start = this.thumbFirst ? this.thumbFirst.style[topLeft] : '0%';
        length = this.thumbFirst ?
            this.thumbLast.style[topLeft].slice(0, -1) - this.thumbFirst.style[topLeft].slice(0, -1) + '%' :
            this.thumb.style[topLeft];
        this.line.style[topLeft] = start;
        this.line.style[widthHeight] = length;
    };
    View.prototype.buildTooltips = function (options) {
        if (!options.range) {
            this.tooltip = this.buildNode(this.thumb, 'slider__tooltip');
        }
        else {
            this.tooltipFirst = this.buildNode(this.thumbFirst, 'slider__tooltip', 'slider__tooltip_first');
            this.tooltipLast = this.buildNode(this.thumbLast, 'slider__tooltip', 'slider__tooltip_last');
        }
        this.setTooltipValues(options);
    };
    View.prototype.buildScale = function (options) {
        var scale;
        var division;
        var val;
        var indent;
        var length = options.max - options.min;
        scale = document.createElement('div');
        scale.classList.add('slider__scale');
        for (var i = 0; i <= commonFunctions_1.getNumberOfSteps(options.min, options.max, options.step); i++) {
            if (!options.reverse) {
                val = options.min + options.step * i;
                val = Math.min(val, options.max);
            }
            else {
                val = options.max - options.step * i;
                val = Math.max(val, options.min);
            }
            indent = i * options.step < length ? i * options.step : length;
            indent = indent / length * 100 + '%';
            val = options.customValues ? options.customValues[val] : val;
            division = document.createElement('div');
            division.classList.add('slider__scale-division');
            division.innerHTML = '<span class="slider__scale-division-text">' + val + '</span>';
            options.vertical ? division.style.top = indent : division.style.left = indent;
            scale.append(division);
        }
        this.slider.prepend(scale);
        this.scale = scale;
    };
    View.prototype.setTooltipValues = function (options) {
        var val;
        if (!options.range) {
            val = options.customValues ? options.customValues[options.value] : options.value;
            this.tooltip.textContent = val;
        }
        else {
            var num = void 0;
            num = !options.reverse ? 0 : 1;
            val = options.customValues ? options.customValues[options.range[num]] : options.range[num];
            this.tooltipFirst.textContent = val;
            num = num == 0 ? 1 : 0;
            val = options.customValues ? options.customValues[options.range[num]] : options.range[num];
            this.tooltipLast.textContent = val;
        }
    };
    View.prototype.setThumbPosition = function (thumbNode, position) {
        if (!this.vertical) {
            thumbNode.style.top = null;
            thumbNode.style.left = position;
        }
        else {
            thumbNode.style.left = null;
            thumbNode.style.top = position;
        }
        if (this.thumbFirst) {
            if (!this.vertical) {
                if ((this.thumbFirst.style.left == '100%') || (this.thumbFirst.style.top == '100%')) {
                    this.thumbFirst.style.zIndex = '1';
                }
                else {
                    this.thumbFirst.style.zIndex = null;
                }
            }
        }
    };
    View.prototype.findThumbPosition = function (value, options) {
        var pos;
        pos = !options.reverse ?
            (value - options.min) / (options.max - options.min) * 100 + '%' :
            (options.max - value) / (options.max - options.min) * 100 + '%';
        return pos;
    };
    View.prototype.removeNode = function (node) {
        node.remove();
        return undefined;
    };
    View.prototype.buildNode = function (parentNode) {
        var classes = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            classes[_i - 1] = arguments[_i];
        }
        var node = document.createElement('div');
        for (var i = 1; i < arguments.length; i++) {
            node.classList.add(arguments[i]);
        }
        parentNode.append(node);
        return node;
    };
    View.prototype.findValidLength = function (str) {
        if (true) {
            var r = ('' + str).match(/^\d{1,3}[.,]?\d*(px|em|rem|%|vh|vw)?$/i);
            if (r && commonFunctions_1.isNumeric(r[0])) {
                return r[0].toLowerCase().replace(',', '.') + 'px';
            }
            else if (r) {
                return r[0].toLowerCase().replace(',', '.');
            }
        }
        throw new Error('Width (or height) should be valid to css');
    };
    View.prototype.getLengthInPx = function () {
        var length = !this.vertical ?
            this.slider.offsetWidth :
            this.slider.offsetHeight;
        return length;
    };
    View.prototype.getOffsetInPx = function () {
        var offset = !this.vertical ?
            this.slider.getBoundingClientRect().left :
            this.slider.getBoundingClientRect().top;
        return offset;
    };
    View.prototype.notify = function (activeThumb, newThumbPosition) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.pushViewChanges(activeThumb, newThumbPosition);
        }
    };
    return View;
}(Observer_1.Subject));
exports.default = View;


/***/ }),

/***/ "./src/commonFunctions.ts":
/*!********************************!*\
  !*** ./src/commonFunctions.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}
exports.isNumeric = isNumeric;
function findDecimalPlaces(num) {
    return ~(num + '').indexOf('.') ? (num + '').split('.')[1].length : 0;
}
exports.findDecimalPlaces = findDecimalPlaces;
function getNumberOfSteps(min, max, step) {
    return Math.ceil((max - min) / step);
}
exports.getNumberOfSteps = getNumberOfSteps;


/***/ }),

/***/ "./src/defaultOptions.ts":
/*!*******************************!*\
  !*** ./src/defaultOptions.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var defaultOptions = {
    value: null,
    min: 0,
    max: 10,
    step: 1,
    reverse: false,
    range: null,
    length: '300px',
    vertical: false,
    tooltip: false,
    scale: false,
};
exports.defaultOptions = defaultOptions;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Presenter_1 = __webpack_require__(/*! ./Presenter */ "./src/Presenter.ts");
var defaultOptions_1 = __webpack_require__(/*! ./defaultOptions */ "./src/defaultOptions.ts");
var Observer_1 = __webpack_require__(/*! ./Observer */ "./src/Observer.ts");
(function ($) {
    var methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('sliderData');
                var slider = $this;
                if (!data) {
                    options = $.extend({}, defaultOptions_1.defaultOptions, options);
                    var presenter = new Presenter_1.default(options, this);
                    $(this).data('sliderData', {
                        slider: slider,
                        presenter: presenter
                    });
                }
            });
        },
        getData: function () {
            return $(this).data('sliderData').presenter.data;
        },
        change: function (options) {
            return this.each(function () {
                $(this).data('sliderData').presenter.change(options);
            });
        },
        destroy: function () {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('sliderData');
                $(window).unbind('.slider');
                data.slider.remove();
                $this.removeData('sliderData');
            });
        },
        observe: function (func) {
            var observer = new Observer_1.OuterObserver(func);
            var presenter = $(this).data('sliderData').presenter;
            presenter.attach(observer);
        }
    };
    jQuery.fn.slider = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method called ' + method + ' does not exist for JQuery.slider');
        }
    };
})(jQuery);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb25GdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZmF1bHRPcHRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakZBLDRFQUErQztBQUMvQyxpR0FBZ0U7QUFzQmhFO0lBQW9CLHlCQUFPO0lBU3ZCLGVBQVksT0FBaUI7UUFBN0IsWUFFSSxpQkFBTyxTQVdWO1FBVEcsSUFBSSxZ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QUFDLElBQUksQ0FBQyxLQUFLLENBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBRSxDQUFDO1NBRTlDO2FBQU07WUFDTCxDQUFDLENBQUMsS0FBSyxDQUFFLGdCQUFnQixHQUFJLE1BQU0sR0FBRyxtQ0FBbUMsQ0FBRSxDQUFDO1NBQzdFO0lBRUgsQ0FBQyxDQUFDO0FBRUosQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMiLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IHsgSVN1YmplY3QsIFN1YmplY3QgfSBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IHsgaXNOdW1lcmljLCBnZXROdW1iZXJPZlN0ZXBzIH0gZnJvbSAnLi9jb21tb25GdW5jdGlvbnMnO1xyXG5cclxuaW50ZXJmYWNlIElNb2RlbE9wdGlvbnMge1xyXG4gICAgW3g6IHN0cmluZ106IGFueTtcclxuICAgIHZhbHVlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgbWluOiBudW1iZXI7XHJcbiAgICBtYXg6IG51bWJlcjtcclxuICAgIHN0ZXA6IG51bWJlcjtcclxuICAgIHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDtcclxuICAgIGN1c3RvbVZhbHVlcz86IHN0cmluZ1tdO1xyXG4gICAgcmV2ZXJzZTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElNb2RlbCBleHRlbmRzIElTdWJqZWN0LCBJTW9kZWxPcHRpb25zIHtcclxuICAgIGRhdGE6IElNb2RlbE9wdGlvbnM7XHJcbiAgICBub3RpZnkodHlwZT86IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBcclxuICAgIG1ha2VGdWxsQ2hhbmdlcyhvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQ7XHJcbiAgICBtYWtlU2xpbUNoYW5nZXMoa2V5OiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpOiB2b2lkO1xyXG59XHJcblxyXG5cclxuY2xhc3MgTW9kZWwgZXh0ZW5kcyBTdWJqZWN0IGltcGxlbWVudHMgSU1vZGVsIHtcclxuICAgIHZhbHVlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgbWluOiBudW1iZXI7XHJcbiAgICBtYXg6IG51bWJlcjsgICBcclxuICAgIHN0ZXA6IG51bWJlcjtcclxuICAgIHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDtcclxuICAgIGN1c3RvbVZhbHVlcz86IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xyXG4gICAgcmV2ZXJzZTogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJT3B0aW9ucykge1xyXG5cclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICBsZXQgdmFsaWRPcHRpb25zOiBJTW9kZWxPcHRpb25zID0gdGhpcy52YWxpZGF0aW9uKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsaWRPcHRpb25zLnZhbHVlO1xyXG4gICAgICAgIHRoaXMubWluID0gdmFsaWRPcHRpb25zLm1pbjtcclxuICAgICAgICB0aGlzLm1heCA9IHZhbGlkT3B0aW9ucy5tYXg7XHJcbiAgICAgICAgdGhpcy5zdGVwID0gdmFsaWRPcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IHZhbGlkT3B0aW9ucy5yYW5nZTtcclxuICAgICAgICB0aGlzLmN1c3RvbVZhbHVlcyA9IHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXM7ICAgICAgXHJcbiAgICAgICAgdGhpcy5yZXZlcnNlID0gdmFsaWRPcHRpb25zLnJldmVyc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGlvbihvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogSU1vZGVsT3B0aW9ucyB7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmN1c3RvbVZhbHVlcyAmJiBBcnJheS5pc0FycmF5KG9wdGlvbnMuY3VzdG9tVmFsdWVzKSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLm1pbiA9IDA7XHJcbiAgICAgICAgICAgIG9wdGlvbnMubWF4ID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgLy9vcHRpb25zLnN0ZXAgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3B0aW9ucy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgfHwgb3B0aW9ucy5taW47XHJcbiAgICAgICAgaWYgKG9wdGlvbnMucmFuZ2UpIHsgdGhpcy5yYW5nZUFycmF5VmFsaWRhdGlvbihvcHRpb25zLnJhbmdlKSB9O1xyXG5cclxuICAgICAgICAvLyDQv9GA0L7QstC10YDQuNC70LgsINGH0YLQviDQstGB0LUsINGH0YLQviDQtNC+0LvQttC90L4g0LHRi9GC0Ywg0YbQtdC70YvQvNC4INGH0LjRgdC70LDQvNC4LCDRgtCw0LrQvtCy0YvQvNC4INGP0LLQu9GP0Y7RgtGB0Y9cclxuICAgICAgICAvLyA9PiDQvNC10L3Rj9C10Lwg0L/QvtGA0Y/QtNC+0LosINC10YHQu9C4INC+0L0g0L/QtdGA0LXQv9GD0YLQsNC9XHJcbiAgICAgICAgLy8gPT4g0L/RgNC10L7QsdGA0LDQt9GD0LXQvCBzdGVwINC4IHJldmVyc2VcclxuICAgICAgICB0aGlzLm51bWVyaWNWYWxpZGF0aW9uKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuaW50ZWdlclZhbGlkYXRpb24ob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLm1pbiA+IG9wdGlvbnMubWF4KSB7XHJcbiAgICAgICAgICAgIFtvcHRpb25zLm1pbiwgb3B0aW9ucy5tYXhdID0gW29wdGlvbnMubWF4LCBvcHRpb25zLm1pbl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHRpb25zLnJhbmdlKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2Uuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICAgICAgICAgIH0pOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnMjIgJyArIG9wdGlvbnMucmV2ZXJzZSlcclxuXHJcbiAgICAgICAgb3B0aW9ucy5yZXZlcnNlID0gISFvcHRpb25zLnJldmVyc2U7XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJzIyICcgKyBvcHRpb25zLnJldmVyc2UpXHJcbiAgICAgICAgb3B0aW9ucy5zdGVwID0gTWF0aC5hYnMob3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LrQsCDQvdCwINGC0L4sINGH0YLQviDRgdC+0LHQu9GO0LTQtdC90Ysg0LLRgdC1INC90LXRgNCw0LLQtdC90YHRgtCy0LBcclxuICAgICAgICAvLyDQvdCw0L/RgNC40LzQtdGALCDRiNCw0LMg0L3QtSDQsdC+0LvRjNGI0LUg0LLRgdC10LPQviDQtNC40LDQv9Cw0LfQvtC90LAsINGI0LDQsyDQvdC1INC90L7Qu9GMLi5cclxuICAgICAgICB0aGlzLmxpbWl0c1ZhbGlkYXRpb24ob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLnJhbmdlKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMF0gPSB0aGlzLmZpbmRDbG9zZXN0U3RlcChvcHRpb25zLnJhbmdlWzBdLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVsxXSA9IHRoaXMuZmluZENsb3Nlc3RTdGVwKG9wdGlvbnMucmFuZ2VbMV0sIG9wdGlvbnMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMudmFsdWUgPSB0aGlzLmZpbmRDbG9zZXN0U3RlcChvcHRpb25zLnZhbHVlLCBvcHRpb25zKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4vKiAgICAgcHJpdmF0ZSBpbnRlZ2VyVmFsaWRhdGlvbihvcHRpb25zOiBudW1iZXJbXSk6IHZvaWQge1xyXG4gICAgICAgIG9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmKCAhaXNOdW1lcmljKGl0ZW0pIHx8IGl0ZW0gJSAxICE9IDAgKSB7IFxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgdmFsdWVzIHNob3VsZCBiZSBpbnRlZ2VyJyk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9ICovXHJcblxyXG4gICAgcHJpdmF0ZSBudW1lcmljVmFsaWRhdGlvbihvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG51bWVyaWNPcHRpb25zOiBudW1iZXJbXSA9IFtvcHRpb25zLm1pbiwgb3B0aW9ucy5tYXgsIG9wdGlvbnMuc3RlcF07XHJcbiAgICAgICAgaWYgKG9wdGlvbnMucmFuZ2UpIHtcclxuICAgICAgICAgICAgbnVtZXJpY09wdGlvbnMucHVzaChvcHRpb25zLnJhbmdlWzBdLCBvcHRpb25zLnJhbmdlWzFdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBudW1lcmljT3B0aW9ucy5wdXNoKG9wdGlvbnMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbnVtZXJpY09wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmKCAhaXNOdW1lcmljKGl0ZW0pICkgeyBcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIHZhbHVlcyBzaG91bGQgYmUgbnVtYmVycycpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW50ZWdlclZhbGlkYXRpb24ob3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IElNb2RlbE9wdGlvbnMge1xyXG4gICAgICAgIG9wdGlvbnMubWluID0gTWF0aC50cnVuYyhvcHRpb25zLm1pbik7XHJcbiAgICAgICAgb3B0aW9ucy5tYXggPSBNYXRoLnRydW5jKG9wdGlvbnMubWF4KTtcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSBNYXRoLnRydW5jKG9wdGlvbnMuc3RlcCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG9wdGlvbnMucmFuZ2UpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVswXSA9IE1hdGgudHJ1bmMob3B0aW9ucy5yYW5nZVswXSk7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMV0gPSBNYXRoLnRydW5jKG9wdGlvbnMucmFuZ2VbMV0pO1xyXG4gICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gTWF0aC50cnVuYyhvcHRpb25zLnZhbHVlKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZ2VBcnJheVZhbGlkYXRpb24ocmFuZ2U6IFtudW1iZXIsIG51bWJlcl0pOiB2b2lkIHtcclxuICAgICAgICBpZiAoICFBcnJheS5pc0FycmF5KHJhbmdlKSB8fCByYW5nZS5sZW5ndGggIT0gMiApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgUmFuZ2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsaW1pdHNWYWxpZGF0aW9uKG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0LLRgdC1LCDRh9GC0L4g0L3Rg9C20L3QviDQv9GA0L7QstC10YDQuNGC0YxcclxuICAgICAgICBsZXQgdmFsdWVzSW5MaW1pdHM6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLnJhbmdlKSB7XHJcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHZhbHVlc0luTGltaXRzLCBvcHRpb25zLnJhbmdlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YWx1ZXNJbkxpbWl0cy5wdXNoKG9wdGlvbnMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFsdWVzSW5MaW1pdHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmICggaXRlbSA+IG9wdGlvbnMubWF4IHx8IGl0ZW0gPCBvcHRpb25zLm1pbiApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignSW5jb3JyZWN0IHZhbHVlIG9yIHJhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gTWF0aC5tYXgoaXRlbSwgb3B0aW9ucy5tYXgpO1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IE1hdGgubWluKGl0ZW0sIG9wdGlvbnMubWluKTtcclxuICAgICAgICAgICAgICAgIC8vdGhyb3cgbmV3IFcoJ0luY29ycmVjdCB2YWx1ZSBvciByYW5nZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5zdGVwID09IDAgfHwgb3B0aW9ucy5zdGVwID4gKG9wdGlvbnMubWF4IC0gb3B0aW9ucy5taW4pICkge1xyXG4gICAgICAgICAgICBvcHRpb25zLnN0ZXAgPSAxO1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0luY29ycmVjdCBzdGVwJyk7XHJcbiAgICAgICAgICAgIC8vdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3Qgc3RlcCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLm1pbiA9PSBvcHRpb25zLm1heCApIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdNaW4gY2Fubm90IGJlIGVxdWFsIHRvIG1heCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbi8qICAgICBnZXROdW1iZXJPZlN0ZXBzKCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gTWF0aC5jZWlsKCAodGhpcy5tYXggLSB0aGlzLm1pbikgLyB0aGlzLnN0ZXAgKTtcclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfSAqL1xyXG5cclxuLyogICAgIGdldFZhbHVlU3RlcCh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyID0gXHJcbiAgICB9ICovXHJcblxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGUodmFsdWU6IG51bWJlcik6IG51bWJlciB8IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tVmFsdWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1c3RvbVZhbHVlc1t2YWx1ZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRDbG9zZXN0U3RlcCh2YWx1ZTogbnVtYmVyLCBvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyO1xyXG4gICAgICAgIGxldCBjZWlsU3RlcHM6IG51bWJlcjtcclxuICAgICAgICBsZXQgcmVzdE9mU3RlcDogbnVtYmVyO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnJldmVyc2UgKSB7XHJcbiAgICAgICAgICAgIGNlaWxTdGVwcyA9IE1hdGgudHJ1bmMoICh2YWx1ZSAtIG9wdGlvbnMubWluKSAvIG9wdGlvbnMuc3RlcCApO1xyXG4gICAgICAgICAgICByZXN0T2ZTdGVwID0gKHZhbHVlIC0gb3B0aW9ucy5taW4pICUgb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgICAgICBzdGVwID0gb3B0aW9ucy5taW4gKyBjZWlsU3RlcHMgKiBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgICAgIHN0ZXAgPSByZXN0T2ZTdGVwID49IG9wdGlvbnMuc3RlcC8yID8gc3RlcCArIG9wdGlvbnMuc3RlcCA6IHN0ZXA7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNlaWxTdGVwcyA9IE1hdGgudHJ1bmMoIChvcHRpb25zLm1heCAtIHZhbHVlKSAvIG9wdGlvbnMuc3RlcCApO1xyXG4gICAgICAgICAgICByZXN0T2ZTdGVwID0gKG9wdGlvbnMubWF4IC0gdmFsdWUpICUgb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgICAgICBzdGVwID0gb3B0aW9ucy5tYXggLSBjZWlsU3RlcHMgKiBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgICAgIHN0ZXAgPSByZXN0T2ZTdGVwID49IG9wdGlvbnMuc3RlcC8yID8gc3RlcCAtIG9wdGlvbnMuc3RlcCA6IHN0ZXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGVwID0gc3RlcCA+IG9wdGlvbnMubWF4ID8gb3B0aW9ucy5tYXggOiBzdGVwO1xyXG4gICAgICAgIHN0ZXAgPSBzdGVwIDwgb3B0aW9ucy5taW4gPyBvcHRpb25zLm1pbiA6IHN0ZXA7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VGdWxsQ2hhbmdlcyhvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGF0YSwgb3B0aW9ucyk7XHJcbiAgICAgICAgbGV0IHZhbGlkT3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IHRoaXMudmFsaWRhdGlvbihvcHRpb25zKTtcclxuXHJcbiAgICAgICAgLy8vY29uc29sZS5sb2coJzMzMyAnICsgdmFsaWRPcHRpb25zLnJldmVyc2UpXHJcblxyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWxpZE9wdGlvbnMudmFsdWU7XHJcbiAgICAgICAgdGhpcy5taW4gPSB2YWxpZE9wdGlvbnMubWluO1xyXG4gICAgICAgIHRoaXMubWF4ID0gdmFsaWRPcHRpb25zLm1heDtcclxuICAgICAgICB0aGlzLnN0ZXAgPSB2YWxpZE9wdGlvbnMuc3RlcDtcclxuICAgICAgICB0aGlzLnJhbmdlID0gdmFsaWRPcHRpb25zLnJhbmdlO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tVmFsdWVzID0gdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlczsgICAgICBcclxuICAgICAgICB0aGlzLnJldmVyc2UgPSB2YWxpZE9wdGlvbnMucmV2ZXJzZTtcclxuXHJcbiAgICAgICAgdGhpcy5ub3RpZnkoJ2Z1bGxDaGFuZ2VzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZVNsaW1DaGFuZ2VzKGtleTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyIHwgbnVtYmVyW10pOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKCBBcnJheS5pc0FycmF5KHZhbHVlKSApIHtcclxuICAgICAgICAgICAgdmFsdWVbMF0gPSB0aGlzLmZpbmRDbG9zZXN0U3RlcCh2YWx1ZVswXSwgdGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgdmFsdWVbMV0gPSB0aGlzLmZpbmRDbG9zZXN0U3RlcCh2YWx1ZVsxXSwgdGhpcy5kYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZmluZENsb3Nlc3RTdGVwKHZhbHVlLCB0aGlzLmRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCB0aGlzW2tleV0gIT0gdmFsdWUgKSB7XHJcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vdGlmeSgnc2xpbUNoYW5nZXMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRhdGEoKTogSU1vZGVsT3B0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgICAgICAgIG1pbjogdGhpcy5taW4sXHJcbiAgICAgICAgICAgIG1heDogdGhpcy5tYXgsICAgXHJcbiAgICAgICAgICAgIHN0ZXA6IHRoaXMuc3RlcCxcclxuICAgICAgICAgICAgcmFuZ2U6IHRoaXMucmFuZ2UsXHJcbiAgICAgICAgICAgIGN1c3RvbVZhbHVlczogdGhpcy5jdXN0b21WYWx1ZXMsXHJcbiAgICAgICAgICAgIHJldmVyc2U6IHRoaXMucmV2ZXJzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gb2JzZXJ2ZXIgbWV0aG9kXHJcblxyXG4gICAgbm90aWZ5KHR5cGU/OiBzdHJpbmcpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBvYnNlcnZlciBvZiB0aGlzLm9ic2VydmVycykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ3NsaW1DaGFuZ2VzJykge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIucHVzaFNsaW1Nb2RlbENoYW5nZXMoKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAnZnVsbENoYW5nZXMnKSB7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5wdXNoRnVsbE1vZGVsQ2hhbmdlcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgSU1vZGVsLCBJTW9kZWxPcHRpb25zIH07XHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG4iLCJpbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gXCIuL2RlZmF1bHRPcHRpb25zXCI7XHJcblxyXG4vL9CY0L3RgtGE0LXRgNGE0LXQudGBINC40LfQtNCw0YLQtdC70Y8g0L7QsdGK0Y/QstC70Y/QtdGCINC90LDQsdC+0YAg0LzQtdGC0L7QtNC+0LIg0LTQu9GPINGD0L/RgNCw0LLQu9C10L3QuNGP0LzQuCDQv9C+0LTQv9C40YHQutC40YfQsNC80LguXHJcbmludGVyZmFjZSBJU3ViamVjdCB7XHJcblxyXG4gICAgLy8g0J/RgNC40YHQvtC10LTQuNC90Y/QtdGCINC90LDQsdC70Y7QtNCw0YLQtdC70Y8g0Log0LjQt9C00LDRgtC10LvRji5cclxuICAgIGF0dGFjaChvYnNlcnZlcjogYW55KTogdm9pZDtcclxuXHJcbiAgICAvLyDQntGC0YHQvtC10LTQuNC90Y/QtdGCINC90LDQsdC70Y7QtNCw0YLQtdC70Y8g0L7RgiDQuNC30LTQsNGC0LXQu9GPLlxyXG4gICAgZGV0YWNoKG9ic2VydmVyOiBhbnkpOiB2b2lkO1xyXG5cclxuICAgIC8vINCj0LLQtdC00L7QvNC70Y/QtdGCINCy0YHQtdGFINC90LDQsdC70Y7QtNCw0YLQtdC70LXQuSDQviDRgdC+0LHRi9GC0LjQuC5cclxuLyogICAgIG5vdGlmeSguLi5hcmdzOiBhbnkpOiB2b2lkOyAqL1xyXG59XHJcblxyXG5jbGFzcyBTdWJqZWN0IGltcGxlbWVudHMgSVN1YmplY3Qge1xyXG4gICAgcHJvdGVjdGVkIG9ic2VydmVyczogYW55W10gPSBbXTtcclxuXHJcbiAgICBhdHRhY2gob2JzZXJ2ZXI6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGRldGFjaChvYnNlcnZlcjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJJbmRleCA9IHRoaXMub2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLnNwbGljZShvYnNlcnZlckluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbi8qICAgICBub3RpZnkoKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBvYnNlcnZlciBvZiB0aGlzLm9ic2VydmVycykge1xyXG4gICAgICAgICAgICBvYnNlcnZlci51cGRhdGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAqL1xyXG59XHJcblxyXG5cclxuaW50ZXJmYWNlIElPdXRlck9ic2VydmVyIHtcclxuICAgIGZ1bmM6IGFueTtcclxuICAgIHVwZGF0ZShvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIE91dGVyT2JzZXJ2ZXIgaW1wbGVtZW50cyBJT3V0ZXJPYnNlcnZlciB7XHJcbiAgICBmdW5jOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZnVuYzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmZ1bmMgPSBmdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZ1bmMob3B0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgSVN1YmplY3QsIFN1YmplY3R9O1xyXG5leHBvcnQgeyBJT3V0ZXJPYnNlcnZlciwgT3V0ZXJPYnNlcnZlcn0iLCJpbXBvcnQgeyBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IE1vZGVsLCB7IElNb2RlbCwgSU1vZGVsT3B0aW9ucyB9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgVmlldywgeyBJVmlldyB9IGZyb20gJy4vVmlldyc7XHJcbmltcG9ydCB7IElTdWJqZWN0LCBTdWJqZWN0IH0gIGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5cclxuaW50ZXJmYWNlIElQcmVzZW50ZXIgZXh0ZW5kcyBJU3ViamVjdCB7XHJcbiAgICAvLyAhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISFcclxuICAgIC8vZGF0YSgpOiBJT3B0aW9ucztcclxuICAgIGNoYW5nZShvcHRpb25zOiBhbnkpOiB2b2lkO1xyXG5cclxuICAgIHB1c2hWaWV3Q2hhbmdlcyhhY3RpdmVUaHVtYjogSFRNTERpdkVsZW1lbnQsIG5ld1RodW1iUG9zaXRpb246IG51bWJlcik6IHZvaWQ7XHJcbiAgICBwdXNoU2xpbU1vZGVsQ2hhbmdlcygpOiB2b2lkO1xyXG4gICAgcHVzaEZ1bGxNb2RlbENoYW5nZXMoKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgUHJlc2VudGVyIGV4dGVuZHMgU3ViamVjdCBpbXBsZW1lbnRzIElQcmVzZW50ZXIge1xyXG5cclxuICAgIHByaXZhdGUgX21vZGVsOiBJTW9kZWw7XHJcbiAgICBwcml2YXRlIF92aWV3OiBJVmlldztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJT3B0aW9ucywgbm9kZTogSFRNTERpdkVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX21vZGVsID0gbmV3IE1vZGVsKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihvcHRpb25zLCB0aGlzLl9tb2RlbC5kYXRhKTtcclxuICAgICAgICB0aGlzLl92aWV3ID0gbmV3IFZpZXcob3B0aW9ucywgbm9kZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGVsLmF0dGFjaCh0aGlzKTtcclxuICAgICAgICB0aGlzLl92aWV3LmF0dGFjaCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdXNoVmlld0NoYW5nZXMoYWN0aXZlVGh1bWI6IEhUTUxEaXZFbGVtZW50LCBuZXdUaHVtYlBvc2l0aW9uOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcGVyY2VudDogbnVtYmVyID0gbmV3VGh1bWJQb3NpdGlvbjtcclxuICAgICAgICBsZXQgbmV3VmFsdWU6IG51bWJlcjtcclxuICAgICAgICBsZXQga2V5OiBzdHJpbmc7XHJcbiAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgfCBudW1iZXJbXTtcclxuXHJcbiAgICAgICAgbmV3VmFsdWUgPSBwZXJjZW50ICogKHRoaXMuX21vZGVsLm1heCAtIHRoaXMuX21vZGVsLm1pbikgLyAxMDA7XHJcbiAgICAgICAgbmV3VmFsdWUgPSAhdGhpcy5fbW9kZWwucmV2ZXJzZSA/IFxyXG4gICAgICAgIHRoaXMuX21vZGVsLm1pbiArIG5ld1ZhbHVlIDpcclxuICAgICAgICB0aGlzLl9tb2RlbC5tYXggLSBuZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKCAhdGhpcy5fbW9kZWwucmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIGtleSA9ICd2YWx1ZSc7XHJcbiAgICAgICAgICAgIHZhbHVlID0gbmV3VmFsdWU7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGtleSA9ICdyYW5nZSc7XHJcbiAgICAgICAgICAgIGxldCBpc1RodW1iRmlyc3Q6IGJvb2xlYW4gPSBhY3RpdmVUaHVtYi5jbGFzc0xpc3QuY29udGFpbnMoJ3NsaWRlcl9fdGh1bWJfZmlyc3QnKTtcclxuICAgICAgICAgICAgbGV0IGlzUmV2ZXJzZTogYm9vbGVhbiA9IHRoaXMuX21vZGVsLnJldmVyc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoIChpc1RodW1iRmlyc3QgJiYgIWlzUmV2ZXJzZSkgfHwgKCFpc1RodW1iRmlyc3QgJiYgaXNSZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gTWF0aC5taW4obmV3VmFsdWUsIHRoaXMuX21vZGVsLnJhbmdlWzFdKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gW25ld1ZhbHVlLCB0aGlzLl9tb2RlbC5yYW5nZVsxXV07XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBNYXRoLm1heChuZXdWYWx1ZSwgdGhpcy5fbW9kZWwucmFuZ2VbMF0pO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBbdGhpcy5fbW9kZWwucmFuZ2VbMF0sIG5ld1ZhbHVlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISFcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLl9tb2RlbC5tYWtlU2xpbUNoYW5nZXMoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaFNsaW1Nb2RlbENoYW5nZXMoKSB7XHJcbiAgICAgICAgdGhpcy5fdmlldy5tYWtlU2xpbUNoYW5nZXModGhpcy5fbW9kZWwpO1xyXG4gICAgICAgIHRoaXMubm90aWZ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaEZ1bGxNb2RlbENoYW5nZXMoKSB7XHJcbiAgICAgICAgdGhpcy5fdmlldy5tYWtlRnVsbENoYW5nZXModGhpcy5fbW9kZWwpO1xyXG4gICAgICAgIC8vdGhpcy5ub3RpZnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2Uob3B0aW9uczogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGRvZXNNb2RlbENoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBkb2VzVmlld0NoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgbW9kZWxPcHRpb25zOiBzdHJpbmdbXSA9IFsndmFsdWUnLCAnbWluJywgJ21heCcsICdzdGVwJywgJ3JldmVyc2UnLCAncmFuZ2UnLCAnY3VzdG9tVmFsdWVzJ107XHJcblxyXG4gICAgICAgIG1vZGVsT3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KGl0ZW0pICkge1xyXG4gICAgICAgICAgICAgICAgZG9lc01vZGVsQ2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoZG9lc01vZGVsQ2hhbmdlKSB7IFxyXG4gICAgICAgICAgICB0aGlzLl9tb2RlbC5tYWtlRnVsbENoYW5nZXMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGRvZXNWaWV3Q2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgdmlld09wdGlvbnM6IHN0cmluZ1tdID0gWydsZW5ndGgnLCAndmVydGljYWwnLCAndG9vbHRpcCcsICdzY2FsZSddO1xyXG5cclxuICAgICAgICB2aWV3T3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KGl0ZW0pICkge1xyXG4gICAgICAgICAgICAgICAgZG9lc1ZpZXdDaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChkb2VzVmlld0NoYW5nZSkge1xyXG4gICAgICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihvcHRpb25zLCB0aGlzLl9tb2RlbC5kYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5fdmlldy5tYWtlRnVsbENoYW5nZXMob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZG9lc01vZGVsQ2hhbmdlIHx8IGRvZXNWaWV3Q2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz9cclxuICAgIGdldCBkYXRhKCk6IElPcHRpb25zIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fbW9kZWwuZGF0YSwgdGhpcy5fdmlldy5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBvYnNlcnZlXHJcbiAgICBub3RpZnkoKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9tb2RlbC5kYXRhLCB0aGlzLl92aWV3LmRhdGEpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IG9ic2VydmVyIG9mIHRoaXMub2JzZXJ2ZXJzKSB7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLnVwZGF0ZShvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJlc2VudGVyOyIsImltcG9ydCB7IElPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCB7IElNb2RlbCwgSU1vZGVsT3B0aW9ucyB9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgeyBJU3ViamVjdCwgU3ViamVjdCB9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5pbXBvcnQgeyBpc051bWVyaWMsIGdldE51bWJlck9mU3RlcHMgfSBmcm9tICcuL2NvbW1vbkZ1bmN0aW9ucyc7XHJcblxyXG5cclxuaW50ZXJmYWNlIElWaWV3T3B0aW9ucyB7XHJcbiAgICBsZW5ndGg6IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHZlcnRpY2FsOiBib29sZWFuO1xyXG4gICAgdG9vbHRpcDogYm9vbGVhbjtcclxuICAgIHNjYWxlOiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSVZpZXcgZXh0ZW5kcyBJU3ViamVjdCB7XHJcbiAgICBsZW5ndGg6IHN0cmluZztcclxuICAgIHZlcnRpY2FsOiBib29sZWFuO1xyXG5cclxuICAgIC8vINC/0LXRgNC10L/QuNGB0LDRgtGMINCy0YHQtSDRjdGC0L4g0YfQtdGA0LXQtyBnZXQgc2V0P1xyXG4gICAgc2xpZGVyOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRodW1iPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICB0aHVtYkZpcnN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICB0aHVtYkxhc3Q/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIGxpbmU6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgdG9vbHRpcD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgdG9vbHRpcEZpcnN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICB0b29sdGlwTGFzdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgc2NhbGU/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBkYXRhOiBJVmlld09wdGlvbnM7XHJcbiAgICBub3RpZnkoYWN0aXZlVGh1bWI6IEhUTUxEaXZFbGVtZW50LCBuZXdUaHVtYlBvc2l0aW9uOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIG1ha2VTbGltQ2hhbmdlcyhvcHRpb25zKTogdm9pZDtcclxuICAgIG1ha2VGdWxsQ2hhbmdlcyhvcHRpb25zKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgVmlldyBleHRlbmRzIFN1YmplY3QgaW1wbGVtZW50cyBJVmlldyAge1xyXG4gICAgW3g6IHN0cmluZ106IGFueTtcclxuXHJcbiAgICBsZW5ndGg6IHN0cmluZztcclxuICAgIHZlcnRpY2FsOiBib29sZWFuO1xyXG4gICAgLy9udW1iZXJPZlN0ZXBzOiBudW1iZXI7XHJcblxyXG4gICAgc2xpZGVyOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRodW1iPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICB0aHVtYkZpcnN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICB0aHVtYkxhc3Q/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIGxpbmU6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgdG9vbHRpcD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgdG9vbHRpcEZpcnN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICB0b29sdGlwTGFzdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgc2NhbGU/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVUaHVtYjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElPcHRpb25zLCBzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCkge1xyXG5cclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlciA9IHNsaWRlck5vZGU7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGQob3B0aW9ucylcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5maW5kVmFsaWRMZW5ndGgob3B0aW9ucy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLndpZHRoID0gdGhpcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLmhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudmVydGljYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS5oZWlnaHQgPSB0aGlzLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUud2lkdGggPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfdmVydGljYWwnKTtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKTsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxpbmUgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLnNsaWRlciwgJ3NsaWRlcl9fbGluZScpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1aWxkVGh1bWJzKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLnNldExpbmVQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCApIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFRvb2x0aXBzKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoIG9wdGlvbnMuc2NhbGUgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRTY2FsZShvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINGB0L7QsdGL0YLQuNGPXHJcbiAgICAgICAgdGhpcy50aHVtYk9uRG93biA9IHRoaXMudGh1bWJPbkRvd24uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnRodW1iT25Nb3ZlID0gdGhpcy50aHVtYk9uTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudGh1bWJPblVwID0gdGhpcy50aHVtYk9uVXAuYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgdGhpcy50aHVtYi5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB0aGlzLnRodW1iLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGh1bWJGaXJzdC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB0aGlzLnRodW1iRmlyc3QuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50aHVtYk9uRG93bik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRodW1iTGFzdC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB0aGlzLnRodW1iTGFzdC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRodW1iT25Eb3duKTtcclxuICAgICAgICB9ICBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGF0YSgpOiBJVmlld09wdGlvbnMge1xyXG4gICAgICAgIGxldCB0b29sdGlwID0gISF0aGlzLnRvb2x0aXAgfHwgISF0aGlzLnRvb2x0aXBGaXJzdDtcclxuICAgICAgICBsZXQgc2NhbGUgPSAhIXRoaXMuc2NhbGU7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxlbmd0aDogIHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgICB2ZXJ0aWNhbDogdGhpcy52ZXJ0aWNhbCxcclxuICAgICAgICAgICAgdG9vbHRpcDogdG9vbHRpcCxcclxuICAgICAgICAgICAgc2NhbGU6IHNjYWxlICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ha2VTbGltQ2hhbmdlcyhvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0VGh1bWJzKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuc2V0TGluZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5zZXRUb29sdGlwVmFsdWVzKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VGdWxsQ2hhbmdlcyhvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwcmV2T3B0aW9uczogSVZpZXdPcHRpb25zID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHByZXZPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMpIHtcclxuICAgICAgICAgICAgaWYgKGtleSAhPSAnc2xpZGVyJykge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB0aGlzLnJlbW92ZU5vZGUodGhpc1trZXldKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2gge30gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5idWlsZChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSB0aHVtYk9uRG93bihldmVudCk6IHZvaWQge1xyXG4gICAgICAgIC8vINC/0YDQtdC00L7RgtCy0YDQsNGC0LjRgtGMINC30LDQv9GD0YHQuiDQstGL0LTQtdC70LXQvdC40Y8gKNC00LXQudGB0YLQstC40LUg0LHRgNCw0YPQt9C10YDQsClcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHVtYiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMudGh1bWJPbk1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnRodW1iT25VcCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy50aHVtYk9uTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRodW1iT25VcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aHVtYk9uTW92ZShldmVudCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IHRoaXMuZ2V0TGVuZ3RoSW5QeCgpO1xyXG4gICAgICAgIGxldCBvZmZzZXQ6IG51bWJlciA9IHRoaXMuZ2V0T2Zmc2V0SW5QeCgpO1xyXG4gICAgICAgIGxldCBldmVudFBvczogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuZXdUaHVtYlBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXMpIHtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSAhdGhpcy52ZXJ0aWNhbCA/IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudFBvcyA9ICF0aGlzLnZlcnRpY2FsID8gZXZlbnQuY2xpZW50WCA6IGV2ZW50LmNsaWVudFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXdUaHVtYlBvc2l0aW9uID0gKGV2ZW50UG9zIC0gb2Zmc2V0KSAvIGxlbmd0aCAqIDEwMDtcclxuICAgICAgICB0aGlzLm5vdGlmeSh0aGlzLl9hY3RpdmVUaHVtYiwgbmV3VGh1bWJQb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aHVtYk9uVXAoZXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy50aHVtYk9uVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMudGh1bWJPbk1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50aHVtYk9uVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudGh1bWJPbk1vdmUpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHVtYiA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkVGh1bWJzKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgdGhpcy50aHVtYiA9IHRoaXMuYnVpbGROb2RlKHRoaXMuc2xpZGVyLCAnc2xpZGVyX190aHVtYicpO1xyXG4gICAgICAgIH0gZWxzZSB7ICAgICBcclxuICAgICAgICAgICAgdGhpcy50aHVtYkZpcnN0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5zbGlkZXIsICdzbGlkZXJfX3RodW1iJywgJ3NsaWRlcl9fdGh1bWJfZmlyc3QnKTtcclxuICAgICAgICAgICAgdGhpcy50aHVtYkxhc3QgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLnNsaWRlciwgJ3NsaWRlcl9fdGh1bWInLCAnc2xpZGVyX190aHVtYl9sYXN0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFRodW1icyhvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFRodW1icyhvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwb3M6IHN0cmluZztcclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbihvcHRpb25zLnZhbHVlLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMudGh1bWIsIHBvcyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBudW06IG51bWJlcjtcclxuICAgICAgICAgICAgLy8g0LXRgdC70LggcmV2ZXJzZSwg0YLQviDQu9C10LLRi9C5INCx0LXQs9GD0L3QvtC6IC0g0Y3RgtC+INCx0L7Qu9GM0YjQtdC1INC30L3QsNGH0LXQvdC40LVcclxuICAgICAgICAgICAgLy8g0YIu0LUuIHJhbmdlWzFdXHJcbiAgICAgICAgICAgIG51bSA9ICFvcHRpb25zLnJldmVyc2UgPyAwIDogMTtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbihvcHRpb25zLnJhbmdlW251bV0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24odGhpcy50aHVtYkZpcnN0LCBwb3MpO1xyXG5cclxuICAgICAgICAgICAgbnVtID0gbnVtID09IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbihvcHRpb25zLnJhbmdlW251bV0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24odGhpcy50aHVtYkxhc3QsIHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8g0LzQtdGC0L7QtNGLINC00LvRjyDRgdC+0LfQtNCw0L3QuNGPINC4INC40LfQvNC10L3QtdC90LjRjyB2aWV3XHJcblxyXG4vKiAgICAgY2hhbmdlU2xpZGVyQmFzZSAob3B0aW9uczogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBsZW5ndGhDaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vINGI0LjRgNC40L3QsCAvINC00LvQuNC90LBcclxuICAgICAgICBpZiAoIG9wdGlvbnMubGVuZ3RoICYmIHRoaXMubGVuZ3RoICE9IG9wdGlvbnMubGVuZ3RoICkge1xyXG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZW5ndGhDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC+0YDQuNC10L3RgtCw0YbQuNGPXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnZlcnRpY2FsICYmICF0aGlzLnZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKVxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfdmVydGljYWwnKTtcclxuXHJcbiAgICAgICAgICAgIGxlbmd0aENoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIG9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlICYmIHRoaXMudmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmVydGljYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX3ZlcnRpY2FsJylcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2hvcml6b250YWwnKTtcclxuXHJcbiAgICAgICAgICAgIGxlbmd0aENoYW5nZWQgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGVuZ3RoQ2hhbmdlZCAmJiAhdGhpcy52ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS5oZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS53aWR0aCA9IHRoaXMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGVuZ3RoQ2hhbmdlZCAmJiB0aGlzLnZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLndpZHRoID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfSAqL1xyXG5cclxuLyogICAgIGNoYW5nZVJhbmdlVG9WYWwgKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHRoaXMuaGFzUmFuZ2UgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRodW1iID0gdGhpcy5idWlsZE5vZGUodGhpcy5zbGlkZXIsICdzbGlkZXJfX3RodW1iJyk7XHJcbiAgICAgICAgdGhpcy50aHVtYkZpcnN0ID0gdGhpcy5yZW1vdmVOb2RlKHRoaXMudGh1bWJGaXJzdCk7XHJcbiAgICAgICAgdGhpcy50aHVtYkxhc3QgPSB0aGlzLnJlbW92ZU5vZGUodGhpcy50aHVtYkxhc3QpO1xyXG5cclxuICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFZhbCgpKSwgbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLnRodW1iLCBwb3MpO1xyXG4gICAgfSAqL1xyXG5cclxuLyogICAgIGNoYW5nZVZhbFRvUmFuZ2UgKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHRoaXMuaGFzUmFuZ2UgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnRodW1iID0gdGhpcy5yZW1vdmVOb2RlKHRoaXMudGh1bWIpO1xyXG4gICAgICAgIHRoaXMudGh1bWJGaXJzdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuc2xpZGVyLCAnc2xpZGVyX190aHVtYicsICdzbGlkZXJfX3RodW1iX2ZpcnN0Jyk7IFxyXG4gICAgICAgIHRoaXMudGh1bWJMYXN0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5zbGlkZXIsICdzbGlkZXJfX3RodW1iJywgJ3NsaWRlcl9fdGh1bWJfbGFzdCcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVswXSksIG1vZGVsLmdldE51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy50aHVtYkZpcnN0LCBwb3MpO1xyXG5cclxuICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMV0pLCBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMudGh1bWJMYXN0LCBwb3MpO1xyXG4gICAgfSAqL1xyXG5cclxuICAgIHByaXZhdGUgc2V0TGluZVBvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzdGFydDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciB8IHN0cmluZztcclxuICAgICAgICBsZXQgdG9wTGVmdDogc3RyaW5nID0gIXRoaXMudmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcclxuICAgICAgICBsZXQgd2lkdGhIZWlnaHQ6IHN0cmluZyA9ICF0aGlzLnZlcnRpY2FsID8gJ3dpZHRoJyA6ICdoZWlnaHQnO1xyXG5cclxuICAgICAgICBzdGFydCA9IHRoaXMudGh1bWJGaXJzdCA/IHRoaXMudGh1bWJGaXJzdC5zdHlsZVt0b3BMZWZ0XSA6ICcwJSc7XHJcbiAgICAgICAgbGVuZ3RoID0gdGhpcy50aHVtYkZpcnN0ID8gXHJcbiAgICAgICAgdGhpcy50aHVtYkxhc3Quc3R5bGVbdG9wTGVmdF0uc2xpY2UoMCwgLTEpIC0gdGhpcy50aHVtYkZpcnN0LnN0eWxlW3RvcExlZnRdLnNsaWNlKDAsIC0xKSAgKyAnJScgOlxyXG4gICAgICAgIHRoaXMudGh1bWIuc3R5bGVbdG9wTGVmdF07XHJcblxyXG4gICAgICAgIHRoaXMubGluZS5zdHlsZVt0b3BMZWZ0XSA9IHN0YXJ0O1xyXG4gICAgICAgIHRoaXMubGluZS5zdHlsZVt3aWR0aEhlaWdodF0gPSBsZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZFRvb2x0aXBzKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmICghb3B0aW9ucy5yYW5nZSkgeyBcclxuICAgICAgICAgICAgdGhpcy50b29sdGlwID0gdGhpcy5idWlsZE5vZGUodGhpcy50aHVtYiwgJ3NsaWRlcl9fdG9vbHRpcCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcEZpcnN0ID0gdGhpcy5idWlsZE5vZGUodGhpcy50aHVtYkZpcnN0LCAnc2xpZGVyX190b29sdGlwJywgJ3NsaWRlcl9fdG9vbHRpcF9maXJzdCcpO1xyXG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBMYXN0ID0gdGhpcy5idWlsZE5vZGUodGhpcy50aHVtYkxhc3QsICdzbGlkZXJfX3Rvb2x0aXAnLCAnc2xpZGVyX190b29sdGlwX2xhc3QnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VG9vbHRpcFZhbHVlcyhvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkU2NhbGUob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2NhbGU6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGxldCBkaXZpc2lvbjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIC8vbGV0IHNpZ246IG51bWJlciA9IG9wdGlvbnMucmV2ZXJzZSA/IC0xIDogMTtcclxuICAgICAgICBsZXQgaW5kZW50OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gb3B0aW9ucy5tYXggLSBvcHRpb25zLm1pbjtcclxuXHJcbiAgICAgICAgc2NhbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBzY2FsZS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3NjYWxlJyk7XHJcblxyXG4gICAgICAgIGZvciAoIGxldCBpOiBudW1iZXIgPSAwOyBpIDw9IGdldE51bWJlck9mU3RlcHMob3B0aW9ucy5taW4sIG9wdGlvbnMubWF4LCBvcHRpb25zLnN0ZXApOyBpKysgKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFvcHRpb25zLnJldmVyc2UgKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBvcHRpb25zLm1pbiArIG9wdGlvbnMuc3RlcCAqIGk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBNYXRoLm1pbih2YWwsIG9wdGlvbnMubWF4KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMubWF4IC0gb3B0aW9ucy5zdGVwICogaTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IE1hdGgubWF4KHZhbCwgb3B0aW9ucy5taW4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRlbnQgPSBpICogb3B0aW9ucy5zdGVwIDwgbGVuZ3RoID8gaSAqIG9wdGlvbnMuc3RlcCA6IGxlbmd0aDsgXHJcbiAgICAgICAgICAgIGluZGVudCA9IGluZGVudCAvIGxlbmd0aCAqIDEwMCArICclJztcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzID8gb3B0aW9ucy5jdXN0b21WYWx1ZXNbdmFsXSA6IHZhbDtcclxuXHJcbiAgICAgICAgICAgIGRpdmlzaW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUtZGl2aXNpb24nKTtcclxuICAgICAgICAgICAgZGl2aXNpb24uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwic2xpZGVyX19zY2FsZS1kaXZpc2lvbi10ZXh0XCI+JyArIHZhbCArICc8L3NwYW4+JztcclxuICAgICAgICAgICAgb3B0aW9ucy52ZXJ0aWNhbCA/IGRpdmlzaW9uLnN0eWxlLnRvcCA9IGluZGVudCA6IGRpdmlzaW9uLnN0eWxlLmxlZnQgPSBpbmRlbnQ7XHJcblxyXG4gICAgICAgICAgICBzY2FsZS5hcHBlbmQoZGl2aXNpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zbGlkZXIucHJlcGVuZChzY2FsZSk7ICAgICAgICBcclxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRUb29sdGlwVmFsdWVzKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoIW9wdGlvbnMucmFuZ2UpIHsgXHJcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzID8gb3B0aW9ucy5jdXN0b21WYWx1ZXNbb3B0aW9ucy52YWx1ZV0gOiBvcHRpb25zLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAudGV4dENvbnRlbnQgPSB2YWwgYXMgc3RyaW5nOyBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbnVtOiBudW1iZXI7XHJcbiAgICAgICAgICAgIG51bSA9ICFvcHRpb25zLnJldmVyc2UgPyAwIDogMTtcclxuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMgPyBvcHRpb25zLmN1c3RvbVZhbHVlc1tvcHRpb25zLnJhbmdlW251bV1dIDogb3B0aW9ucy5yYW5nZVtudW1dO1xyXG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBGaXJzdC50ZXh0Q29udGVudCA9IHZhbCBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICBudW0gPSBudW0gPT0gMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICB2YWwgPSBvcHRpb25zLmN1c3RvbVZhbHVlcyA/IG9wdGlvbnMuY3VzdG9tVmFsdWVzW29wdGlvbnMucmFuZ2VbbnVtXV0gOiBvcHRpb25zLnJhbmdlW251bV07XHJcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcExhc3QudGV4dENvbnRlbnQgPSB2YWwgYXMgc3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4vKiAgICAgcmVidWlsZFNjYWxlKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2NhbGU6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5nZXRTY2FsZSgpO1xyXG4gICAgICAgIGxldCBwcmV2TnVtT2ZTdGVwczogbnVtYmVyID0gc2NhbGUucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlcl9fc2NhbGUtZGl2aXNpb24nKS5sZW5ndGggLSAxO1xyXG4gICAgICAgIGxldCBuZXdOdW1PZlN0ZXBzOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGRpdmlzaW9uOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBcclxuICAgICAgICAvLyDQvNC90L7QttC40YLQtdC70YwuINCy0L4g0YHQutC+0LvRjNC60L4g0YDQsNC3INGI0LDQsyDQsiDQvNC+0LTQtdC70LUg0LzQtdC90YzRiNC1INGI0LDQs9CwINGI0LrQsNC70YtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZmluZERlY2ltYWxQbGFjZXModGhpcy5zY2FsZVN0ZXApLCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKG1vZGVsLmdldFN0ZXAoKSkgKTtcclxuICAgICAgICBsZXQgbXVsdDogbnVtYmVyID0gdGhpcy5zY2FsZVN0ZXAgLyBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbXVsdCA9ICttdWx0LnRvRml4ZWQobik7XHJcbiAgICAgICAgbXVsdCA9IE1hdGguYWJzKG11bHQpO1xyXG5cclxuICAgICAgICBuZXdOdW1PZlN0ZXBzID0gbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpIC8gbXVsdDtcclxuXHJcbiAgICAgICAgaWYgKCBwcmV2TnVtT2ZTdGVwcyA+IG5ld051bU9mU3RlcHMgKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCAocHJldk51bU9mU3RlcHMgLSBuZXdOdW1PZlN0ZXBzKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZS5sYXN0Q2hpbGQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBwcmV2TnVtT2ZTdGVwcyA8IG5ld051bU9mU3RlcHMgKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCAobmV3TnVtT2ZTdGVwcyAtIHByZXZOdW1PZlN0ZXBzKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uaW5uZXJIVE1MID0gJzxzcGFuPjwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgc2NhbGUuYXBwZW5kKGRpdmlzaW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gKi9cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzZXRUaHVtYlBvc2l0aW9uKHRodW1iTm9kZTogSFRNTERpdkVsZW1lbnQsIHBvc2l0aW9uOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoICF0aGlzLnZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUudG9wID0gbnVsbDtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLmxlZnQgPSBwb3NpdGlvbjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUubGVmdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS50b3AgPSBwb3NpdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC+0LHQsCDQsdC10LPRg9C90LrQsCDRgdC/0YDQsNCy0LAo0LLQvdC40LfRgyksINC00L7QsdCw0LLQu9C10LwgeiBpbmRleCDQtNC70Y8g0L3QuNC20L3QtdCz0L5cclxuICAgICAgICBpZiAoIHRoaXMudGh1bWJGaXJzdCApIHtcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy52ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgICAgIGlmICggKHRoaXMudGh1bWJGaXJzdC5zdHlsZS5sZWZ0ID09ICcxMDAlJykgfHwgKHRoaXMudGh1bWJGaXJzdC5zdHlsZS50b3AgPT0gJzEwMCUnKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRodW1iRmlyc3Quc3R5bGUuekluZGV4ID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRodW1iRmlyc3Quc3R5bGUuekluZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kVGh1bWJQb3NpdGlvbih2YWx1ZTogbnVtYmVyLCBvcHRpb25zOiBJT3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHBvczogc3RyaW5nO1xyXG4gICAgICAgIHBvcyA9ICFvcHRpb25zLnJldmVyc2UgP1xyXG4gICAgICAgICh2YWx1ZSAtIG9wdGlvbnMubWluKSAvIChvcHRpb25zLm1heCAtIG9wdGlvbnMubWluKSAqIDEwMCArICclJyA6XHJcbiAgICAgICAgKG9wdGlvbnMubWF4IC0gdmFsdWUpIC8gKG9wdGlvbnMubWF4IC0gb3B0aW9ucy5taW4pICogMTAwICsgJyUnXHJcbiAgICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZU5vZGUobm9kZTogSFRNTERpdkVsZW1lbnQpOiB1bmRlZmluZWQge1xyXG4gICAgICAgIG5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZE5vZGUocGFyZW50Tm9kZTogSFRNTERpdkVsZW1lbnQsIC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGxldCBub2RlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAgICAgXHJcblxyXG4gICAgICAgIGZvciAoIGxldCBpOiBudW1iZXIgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoYXJndW1lbnRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGFyZW50Tm9kZS5hcHBlbmQobm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgZmluZFZhbGlkTGVuZ3RoKHN0cjogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIHR5cGVvZiAoJycgKyBzdHIpID09ICdzdHJpbmcnICkge1xyXG4gICAgICAgICAgICBsZXQgciA9ICgnJyArIHN0cikubWF0Y2goL15cXGR7MSwzfVsuLF0/XFxkKihweHxlbXxyZW18JXx2aHx2dyk/JC9pKTtcclxuICAgICAgICAgICAgaWYgKCByICYmIGlzTnVtZXJpYyhyWzBdKSApIHsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gclswXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJywnLCAnLicpICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggciApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnLCcsICcuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaWR0aCAob3IgaGVpZ2h0KSBzaG91bGQgYmUgdmFsaWQgdG8gY3NzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMZW5ndGhJblB4KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gIXRoaXMudmVydGljYWwgP1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLm9mZnNldFdpZHRoIDpcclxuICAgICAgICB0aGlzLnNsaWRlci5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgIHJldHVybiBsZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRPZmZzZXRJblB4KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyID0gIXRoaXMudmVydGljYWwgP1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgOlxyXG4gICAgICAgIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gb2JzZXJ2ZXIgbWV0aG9kXHJcblxyXG4gICAgbm90aWZ5KGFjdGl2ZVRodW1iOiBIVE1MRGl2RWxlbWVudCwgbmV3VGh1bWJQb3NpdGlvbjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBvYnNlcnZlciBvZiB0aGlzLm9ic2VydmVycykge1xyXG4gICAgICAgICAgICBvYnNlcnZlci5wdXNoVmlld0NoYW5nZXMoYWN0aXZlVGh1bWIsIG5ld1RodW1iUG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IElWaWV3LCBJVmlld09wdGlvbnMgfTtcclxuZXhwb3J0IGRlZmF1bHQgVmlldzsiLCJmdW5jdGlvbiBpc051bWVyaWMobjogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmICFpc05hTihuIC0gMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmREZWNpbWFsUGxhY2VzKG51bTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIC8vINC60L7Qu9C40YfQtdGB0YLQstC+INC30L3QsNC60L7QsiDQv9C+0YHQu9C1INC30LDQv9GP0YLQvtC5XHJcbiAgICByZXR1cm4gfihudW0gKyAnJykuaW5kZXhPZignLicpID8gKG51bSArICcnKS5zcGxpdCgnLicpWzFdLmxlbmd0aCA6IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE51bWJlck9mU3RlcHMobWluOiBudW1iZXIsIG1heDogbnVtYmVyLCBzdGVwOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguY2VpbCggKG1heCAtIG1pbikgLyBzdGVwICk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGlzTnVtZXJpYyB9O1xyXG5leHBvcnQgeyBmaW5kRGVjaW1hbFBsYWNlcyB9O1xyXG5leHBvcnQgeyBnZXROdW1iZXJPZlN0ZXBzIH07XHJcblxyXG5cclxuLy8gZmluZENsb3Nlc3RTdGVwIC0g0YLQvtC20LUg0LYg0LLRi9C90LXRgdGC0Lgg0LIg0L7RgtC00LXQu9GM0L3Ri9C1INGE0YPQvdC60YbQuNC4IiwiaW1wb3J0IHsgSU1vZGVsT3B0aW9ucyB9IGZyb20gXCIuL01vZGVsXCI7XHJcbmltcG9ydCB7IElWaWV3T3B0aW9ucyB9IGZyb20gXCIuL1ZpZXdcIjtcclxuXHJcbmludGVyZmFjZSBJT3B0aW9ucyBleHRlbmRzIElNb2RlbE9wdGlvbnMsIElWaWV3T3B0aW9ucyB7fVxyXG5cclxubGV0IGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyA9IHtcclxuICAgIC8vIE1vZGVsIG9wdGlvbnNcclxuICAgIC8vINCyINC90LDRh9Cw0LvRjNC90YvRhSDQvdCw0YHRgtGA0L7QudC60LDRhSDQvdC1INC+0L/RgNC10LTQtdC70LXQvdGLINC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1INC40LvQuCDQv9GA0L7QvNC10LbRg9GC0L7Qui5cclxuICAgIC8vINC10YHQu9C4INC+0L3QuCDQvdC1INGD0LrQsNC30LDQvdGLINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8LCDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSB2YWx1ZSA9PSBtaW4gXHJcbiAgICB2YWx1ZTogbnVsbCxcclxuICAgIG1pbjogMCxcclxuICAgIG1heDogMTAsXHJcbiAgICBzdGVwOiAxLFxyXG4gICAgcmV2ZXJzZTogZmFsc2UsXHJcbiAgICByYW5nZTogbnVsbCxcclxuICAgIFxyXG4gICAgbGVuZ3RoOiAnMzAwcHgnLFxyXG4gICAgdmVydGljYWw6IGZhbHNlLFxyXG4gICAgdG9vbHRpcDogZmFsc2UsXHJcbiAgICBzY2FsZTogZmFsc2UsXHJcbn1cclxuXHJcbmV4cG9ydCB7IElPcHRpb25zIH07XHJcbmV4cG9ydCB7IGRlZmF1bHRPcHRpb25zIH07XHJcbiIsImltcG9ydCBNb2RlbCwgeyBJTW9kZWwgfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IFZpZXcsIHsgSVZpZXcgfSBmcm9tICcuL1ZpZXcnO1xyXG5pbXBvcnQgUHJlc2VudGVyIGZyb20gJy4vUHJlc2VudGVyJztcclxuaW1wb3J0IHsgSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCB7IElPdXRlck9ic2VydmVyLCBPdXRlck9ic2VydmVyIH0gZnJvbSAnLi9PYnNlcnZlcic7XHJcblxyXG5cclxuKGZ1bmN0aW9uKCQpe1xyXG5cclxuICBpbnRlcmZhY2UgSU1ldGhvZHMge1xyXG4gICAgaW5pdChvcHRpb25zPzogSU9wdGlvbnMpOiB2b2lkO1xyXG4gICAgZ2V0RGF0YSgpOiBJT3B0aW9ucztcclxuICAgIGNoYW5nZShvcHRpb25zOiBhbnkpOiB2b2lkO1xyXG4gICAgZGVzdHJveSgpOiB2b2lkO1xyXG4gICAgb2JzZXJ2ZShmdW5jOiBGdW5jdGlvbik6IHZvaWQ7XHJcbiAgfVxyXG5cclxuICB2YXIgbWV0aG9kczogSU1ldGhvZHMgPSB7XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnM/OiBJT3B0aW9ucyApIHtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgXHJcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgZGF0YSA9ICR0aGlzLmRhdGEoJ3NsaWRlckRhdGEnKTtcclxuICAgICAgICBsZXQgc2xpZGVyID0gJHRoaXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0L/Qu9Cw0LPQuNC9INC10YnRkSDQvdC1INC/0YDQvtC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDQvVxyXG4gICAgICAgIGlmICggISBkYXRhICkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgbGV0IHByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIob3B0aW9ucywgdGhpcyk7XHJcblxyXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJywge1xyXG4gICAgICAgICAgICBzbGlkZXIgOiBzbGlkZXIsXHJcbiAgICAgICAgICAgIHByZXNlbnRlcjogcHJlc2VudGVyXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldERhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykucHJlc2VudGVyLmRhdGE7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZTogZnVuY3Rpb24oIG9wdGlvbnM6IGFueSApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykucHJlc2VudGVyLmNoYW5nZShvcHRpb25zKTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgZGF0YSA9ICR0aGlzLmRhdGEoJ3NsaWRlckRhdGEnKTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnVuYmluZCgnLnNsaWRlcicpO1xyXG4gICAgICAgIGRhdGEuc2xpZGVyLnJlbW92ZSgpO1xyXG4gICAgICAgICR0aGlzLnJlbW92ZURhdGEoJ3NsaWRlckRhdGEnKTtcclxuICAgICAgICBcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9ic2VydmU6IGZ1bmN0aW9uKCBmdW5jICkge1xyXG5cclxuICAgICAgbGV0IG9ic2VydmVyOiBJT3V0ZXJPYnNlcnZlciA9IG5ldyBPdXRlck9ic2VydmVyKGZ1bmMpO1xyXG4gICAgICBsZXQgcHJlc2VudGVyID0gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykucHJlc2VudGVyO1xyXG5cclxuICAgICAgcHJlc2VudGVyLmF0dGFjaChvYnNlcnZlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBcclxuICBqUXVlcnkuZm4uc2xpZGVyID0gZnVuY3Rpb24oIG1ldGhvZCApIHtcclxuXHJcbiAgICAvLyDQu9C+0LPQuNC60LAg0LLRi9C30L7QstCwINC80LXRgtC+0LTQsFxyXG4gICAgaWYgKCBtZXRob2RzW21ldGhvZCBhcyBzdHJpbmddICkge1xyXG5cclxuICAgICAgcmV0dXJuIG1ldGhvZHNbIG1ldGhvZCBhcyBzdHJpbmcgXS5hcHBseSggdGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMSApKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKCB0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhIG1ldGhvZCApIHtcclxuXHJcbiAgICAgIHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQuZXJyb3IoICdNZXRob2QgY2FsbGVkICcgKyAgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBmb3IgSlF1ZXJ5LnNsaWRlcicgKTtcclxuICAgIH0gXHJcblxyXG4gIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG5cclxuXHJcbi8vbGV0IHRlc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVzdCcpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHJcbi8vbGV0IHByZXMgPSBuZXcgUHJlc2VudGVyKGRlZmF1bHRPcHRpb25zLCB0ZXN0KTtcclxuXHJcbi8qICQoJy50ZXN0Jykuc2xpZGVyKHtcclxuICB2YWx1ZTogMCxcclxuICAvL21pbjogLTcuNjY2NixcclxuICAvL3JhbmdlOiBbNSwgMTBdLFxyXG4gIC8vcmV2ZXJzZTogdHJ1ZSxcclxuICAvL2N1c3RvbVZhbHVlczogWydhJywgJ2InLCAnYycsICdkJ10sXHJcbiAgc3RlcDogMSxcclxuICBtaW46IDAsXHJcbiAgbWF4OiAxNyxcclxufSk7XHJcblxyXG4kKCcudGVzdCcpLnNsaWRlcignY2hhbmdlJywge1xyXG4gIG1pbjogLTUsXHJcbiAgcmFuZ2U6IFszLCAxNV1cclxufSlcclxuXHJcbiQoJy50ZXN0Jykuc2xpZGVyKCdvYnNlcnZlJywgZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gIGNvbnNvbGUubG9nKCcyICcgKyBvcHRpb25zKVxyXG4gICQoJy5pbnB1dCcpLnZhbChvcHRpb25zLnJhbmdlKTtcclxufSkgKi9cclxuXHJcblxyXG4vKiBsZXQgbW9kID0gbmV3IE1vZGVsKGRlZmF1bHRPcHRpb25zKTtcclxuY29uc29sZS5sb2cobW9kLnJldmVyc2UpXHJcbm1vZC5tYWtlRnVsbENoYW5nZXMoe3JldmVyc2U6IHRydWV9KVxyXG5jb25zb2xlLmxvZyhtb2QucmV2ZXJzZSlcclxubW9kLm1ha2VGdWxsQ2hhbmdlcyh7cmV2ZXJzZTogZmFsc2V9KVxyXG5jb25zb2xlLmxvZyhtb2QucmV2ZXJzZSkgKi8iXSwic291cmNlUm9vdCI6IiJ9