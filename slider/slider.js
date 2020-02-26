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
var defaultOptions_1 = __webpack_require__(/*! ./defaultOptions */ "./src/defaultOptions.ts");
var Observer_1 = __webpack_require__(/*! ./Observer */ "./src/Observer.ts");
var commonFunctions_1 = __webpack_require__(/*! ./commonFunctions */ "./src/commonFunctions.ts");
var validations_1 = __webpack_require__(/*! ./validations */ "./src/validations.ts");
var Model = (function (_super) {
    __extends(Model, _super);
    function Model(options) {
        var _this = _super.call(this) || this;
        var fullOptions = Object.assign({}, defaultOptions_1.defaultOptions, options);
        var validOptions;
        _this.validate(fullOptions);
        validOptions = _this.normalize(fullOptions, defaultOptions_1.defaultOptions);
        _this.setOptions(validOptions);
        return _this;
    }
    Model.prototype.update = function (message) {
        switch (message.type) {
            case 'NEW_VALUE_IN_PERCENT':
                this.setValueByPercent(message.percent, message.index);
                this.emit({
                    type: 'NEW_VALUE',
                    options: this.getOptions()
                });
                break;
            case 'NEW_DATA':
                var prevOptions = this.getOptions();
                this.validate(Object.assign({}, prevOptions, message.options));
                var validOptions = this.normalize(message.options, prevOptions);
                if (!commonFunctions_1.deepEqual(prevOptions, validOptions)) {
                    this.setOptions(validOptions);
                    this.emit({
                        type: 'NEW_DATA',
                        options: this.getOptions()
                    });
                    break;
                }
            default:
                return;
        }
    };
    Model.prototype.getOptions = function () {
        return {
            value: this._value,
            min: this._min,
            max: this._max,
            step: this._step,
            range: this._range,
            customValues: this._customValues,
            reverse: this._reverse
        };
    };
    Model.prototype.getWarnings = function () {
        return Object.assign({}, this._warnings);
    };
    Model.prototype.setOptions = function (options) {
        this._value = options.value;
        this._min = options.min;
        this._max = options.max;
        this._step = options.step;
        this._range = options.range;
        this._customValues = options.customValues;
        this._reverse = options.reverse;
    };
    Model.prototype.validate = function (options) {
        this._warnings = {};
        this._warnings = validations_1.validateModel(options);
        if (Object.keys(this._warnings).length != 0) {
            var warnings = Object.assign({}, this._warnings);
            this.emit({
                type: 'WARNINGS',
                warnings: warnings
            });
        }
    };
    Model.prototype.normalize = function (options, validOptions) {
        var _a;
        options = Object.assign({}, validOptions, options);
        if (this._warnings.customValuesIsNotArray || this._warnings.customValuesIsTooSmall) {
            options.customValues = undefined;
        }
        if (options.customValues) {
            options.min = 0;
            options.max = options.customValues.length - 1;
        }
        options.min = this.normalizeNumber(options.min, validOptions.min);
        options.max = this.normalizeNumber(options.max, validOptions.max);
        options.step = this.normalizeNumber(options.step, validOptions.step);
        if (this._warnings.minIsOverMax) {
            _a = [options.max, options.min], options.min = _a[0], options.max = _a[1];
        }
        if (this._warnings.minIsEqualToMax) {
            options.min = validOptions.min;
            options.max = validOptions.max;
        }
        if (this._warnings.stepIsNull || this._warnings.tooBigStep) {
            options.step = 1;
        }
        options.step = Math.abs(options.step);
        options.reverse = !!options.reverse;
        if (!options.range) {
            options.value = this.normalizeNumber(options.value, options.min);
            options.value = this.findClosestStep(options.value, options);
            options.range = null;
        }
        else {
            if (!Array.isArray(options.range)) {
                options.range = [options.min, options.max];
            }
            options.range = options.range.slice(0, 2);
            options.range[0] = this.normalizeNumber(options.range[0], options.min);
            options.range[1] = this.normalizeNumber(options.range[1], options.max);
            if (this._warnings.wrongOrderInRange) {
                options.range.sort(function (a, b) {
                    return a - b;
                });
            }
            options.range[0] = this.findClosestStep(options.range[0], options);
            options.range[1] = this.findClosestStep(options.range[1], options);
            options.value = null;
        }
        return options;
    };
    Model.prototype.normalizeNumber = function (value, defaultVal) {
        var newValue = value;
        if (!commonFunctions_1.isNumeric(value)) {
            newValue = defaultVal;
        }
        newValue = Math.trunc(+newValue);
        return newValue;
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
    Model.prototype.setValueByPercent = function (percent, index) {
        var newValue;
        newValue = percent * (this._max - this._min) / 100;
        newValue = !this._reverse ?
            this._min + newValue :
            this._max - newValue;
        newValue = this.findClosestStep(newValue, this.getOptions());
        if (!this._range) {
            this._value = newValue;
        }
        else {
            var isFirstInRange = void 0;
            isFirstInRange = index == 0 && !this._reverse;
            isFirstInRange = isFirstInRange || index == 1 && this._reverse;
            if (isFirstInRange) {
                newValue = Math.min(newValue, this._range[1]);
                this._range[0] = newValue;
            }
            else {
                newValue = Math.max(newValue, this._range[0]);
                this._range[1] = newValue;
            }
        }
    };
    return Model;
}(Observer_1.Observable));
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
var Observable = (function () {
    function Observable() {
        this.listeners = [];
    }
    Observable.prototype.subscribe = function (listener) {
        this.listeners.push(listener);
    };
    Observable.prototype.emit = function (message) {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(message);
        }
    };
    return Observable;
}());
exports.Observable = Observable;


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
        options = Object.assign({}, defaultOptions_1.defaultOptions, options);
        _this._model = new Model_1.default(options);
        options = Object.assign(options, _this._model.getOptions());
        _this._view = new View_1.default(options, node);
        var that = _this;
        _this._model.subscribe(function (message) {
            that._view.update(message);
            that.emit(message);
        });
        _this._view.subscribe(function (message) {
            that._model.update(message);
            that.emit(message);
        });
        return _this;
    }
    Presenter.prototype.update = function (message) {
        var options;
        var warnings;
        this._model.update(message);
        message.options = Object.assign(message.options, this._model.getOptions());
        this._view.update(message);
        options = this.getOptions();
        this.emit({
            type: 'NEW_DATA',
            options: options
        });
        warnings = this.getWarnings();
        if (Object.keys(warnings).length != 0) {
            this.emit({
                type: 'WARNINGS',
                warnings: warnings
            });
        }
    };
    Presenter.prototype.getOptions = function () {
        return Object.assign({}, this._model.getOptions(), this._view.getOptions());
    };
    Presenter.prototype.getWarnings = function () {
        return Object.assign({}, this._model.getWarnings(), this._view.getWarnings());
    };
    return Presenter;
}(Observer_1.Observable));
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
var defaultOptions_1 = __webpack_require__(/*! ./defaultOptions */ "./src/defaultOptions.ts");
var Observer_1 = __webpack_require__(/*! ./Observer */ "./src/Observer.ts");
var commonFunctions_1 = __webpack_require__(/*! ./commonFunctions */ "./src/commonFunctions.ts");
var validations_1 = __webpack_require__(/*! ./validations */ "./src/validations.ts");
var View = (function (_super) {
    __extends(View, _super);
    function View(options, sliderNode) {
        var _this = _super.call(this) || this;
        options = Object.assign(defaultOptions_1.defaultOptions, options);
        _this.validate(options);
        _this._slider = sliderNode;
        _this._slider.classList.add('slider');
        _this.build(options);
        return _this;
    }
    View.prototype.update = function (message) {
        switch (message.type) {
            case 'NEW_VALUE':
                this.setThumbs(message.options);
                this.setBarPosition();
                if (this._tooltip || this._tooltipFirst) {
                    this.setTooltipValues(message.options);
                }
                break;
            case 'NEW_DATA':
                message.options = Object.assign({}, this.getOptions(), message.options);
                this.validate(message.options);
                this.rebuild(message.options);
                break;
        }
    };
    View.prototype.getOptions = function () {
        var tooltip = !!this._tooltip || !!this._tooltipFirst;
        var scale = !!this._scale;
        return {
            length: this._length,
            vertical: this._vertical,
            tooltip: tooltip,
            scale: scale
        };
    };
    View.prototype.getWarnings = function () {
        return Object.assign({}, this._warnings);
    };
    View.prototype.handleThumbDown = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this._activeThumb = event.currentTarget;
        document.addEventListener('mousemove', this.handleThumbMove);
        document.addEventListener('mouseup', this.handleThumbUp);
        document.addEventListener('touchmove', this.handleThumbMove);
        document.addEventListener('touchend', this.handleThumbUp);
    };
    View.prototype.handleThumbMove = function (event) {
        var length = this.getLengthInPx();
        var offset = this.getOffsetInPx();
        var eventPos;
        var newThumbPosition;
        var index;
        if (event.touches) {
            eventPos = !this._vertical ? event.touches[0].clientX : event.touches[0].clientY;
        }
        else {
            eventPos = !this._vertical ? event.clientX : event.clientY;
        }
        newThumbPosition = (eventPos - offset) / length * 100;
        index = this._activeThumb == this._thumbLast ? 1 : 0;
        this.emit({
            type: 'NEW_VALUE_IN_PERCENT',
            index: index,
            percent: newThumbPosition
        });
    };
    View.prototype.handleSliderClick = function (event) {
        var length = this.getLengthInPx();
        var offset = this.getOffsetInPx();
        var eventPos;
        var newThumbPosition;
        var index;
        if (event.touches) {
            eventPos = !this._vertical ? event.touches[0].clientX : event.touches[0].clientY;
        }
        else {
            eventPos = !this._vertical ? event.clientX : event.clientY;
        }
        newThumbPosition = (eventPos - offset) / length * 100;
        if (this._thumb) {
            index = 0;
        }
        else {
            var topLeft = !this._vertical ? 'left' : 'top';
            var firstThumbPos = parseInt(this._thumbFirst.style[topLeft]);
            var lastThumbPos = parseInt(this._thumbLast.style[topLeft]);
            var isFirstCloser = void 0;
            isFirstCloser = Math.abs(firstThumbPos - newThumbPosition) < Math.abs(lastThumbPos - newThumbPosition);
            index = isFirstCloser ? 0 : 1;
        }
        this.emit({
            type: 'NEW_VALUE_IN_PERCENT',
            index: index,
            percent: newThumbPosition
        });
    };
    View.prototype.handleThumbUp = function (event) {
        document.removeEventListener('mouseup', this.handleThumbUp);
        document.removeEventListener('mousemove', this.handleThumbMove);
        document.removeEventListener('touchend', this.handleThumbUp);
        document.removeEventListener('touchmove', this.handleThumbMove);
        this._activeThumb = undefined;
    };
    View.prototype.build = function (options) {
        var validLength = this._length || defaultOptions_1.defaultOptions.length;
        this._length = this.getValidLength(options.length, validLength);
        if (!options.vertical) {
            this._vertical = false;
            this._slider.style.width = this._length;
            this._slider.style.height = null;
            this._slider.classList.add('slider_horizontal');
            this._slider.classList.remove('slider_vertical');
        }
        else {
            this._vertical = true;
            this._slider.style.height = this._length;
            this._slider.style.width = null;
            this._slider.classList.add('slider_vertical');
            this._slider.classList.remove('slider_horizontal');
        }
        this._bar = this.buildNode(this._slider, 'slider__bar');
        this.buildThumbs(options);
        this.setBarPosition();
        if (options.tooltip) {
            this.buildTooltips(options);
        }
        if (options.scale) {
            this.buildScale(options);
        }
        this.handleThumbDown = this.handleThumbDown.bind(this);
        this.handleThumbMove = this.handleThumbMove.bind(this);
        this.handleThumbUp = this.handleThumbUp.bind(this);
        this.handleSliderClick = this.handleSliderClick.bind(this);
        if (!options.range) {
            this._thumb.addEventListener("mousedown", this.handleThumbDown);
            this._thumb.addEventListener("touchstart", this.handleThumbDown);
        }
        else {
            this._thumbFirst.addEventListener("mousedown", this.handleThumbDown);
            this._thumbFirst.addEventListener("touchstart", this.handleThumbDown);
            this._thumbLast.addEventListener("mousedown", this.handleThumbDown);
            this._thumbLast.addEventListener("touchstart", this.handleThumbDown);
        }
        this._slider.addEventListener('click', this.handleSliderClick);
    };
    View.prototype.rebuild = function (options) {
        var prevOptions = this.getOptions();
        options = Object.assign({}, prevOptions, options);
        for (var key in this) {
            if (key != '_slider') {
                try {
                    this[key] = this.removeNode(this[key]);
                }
                catch (_a) { }
            }
        }
        this.build(options);
    };
    View.prototype.validate = function (options) {
        this._warnings = {};
        this._warnings = validations_1.validateView(options);
        if (Object.keys(this._warnings).length != 0) {
            var warnings = Object.assign({}, this._warnings);
            this.emit({
                type: 'WARNINGS',
                warnings: warnings
            });
        }
    };
    View.prototype.buildThumbs = function (options) {
        if (!options.range) {
            this._thumb = this.buildNode(this._slider, 'slider__thumb');
        }
        else {
            this._thumbFirst = this.buildNode(this._slider, 'slider__thumb', 'slider__thumb_first');
            this._thumbLast = this.buildNode(this._slider, 'slider__thumb', 'slider__thumb_last');
        }
        this.setThumbs(options);
    };
    View.prototype.setThumbs = function (options) {
        var pos;
        if (!options.range) {
            pos = this.findThumbPosition(options.value, options);
            this.setThumbPosition(this._thumb, pos);
        }
        else {
            var num = void 0;
            num = !options.reverse ? 0 : 1;
            pos = this.findThumbPosition(options.range[num], options);
            this.setThumbPosition(this._thumbFirst, pos);
            num = num == 0 ? 1 : 0;
            pos = this.findThumbPosition(options.range[num], options);
            this.setThumbPosition(this._thumbLast, pos);
        }
    };
    View.prototype.setBarPosition = function () {
        var start;
        var length;
        var topLeft = !this._vertical ? 'left' : 'top';
        var widthHeight = !this._vertical ? 'width' : 'height';
        start = this._thumbFirst ? this._thumbFirst.style[topLeft] : '0%';
        length = this._thumbFirst ?
            this._thumbLast.style[topLeft].slice(0, -1) - this._thumbFirst.style[topLeft].slice(0, -1) + '%' :
            this._thumb.style[topLeft];
        this._bar.style[topLeft] = start;
        this._bar.style[widthHeight] = length;
    };
    View.prototype.buildTooltips = function (options) {
        if (!options.range) {
            this._tooltip = this.buildNode(this._thumb, 'slider__tooltip');
        }
        else {
            this._tooltipFirst = this.buildNode(this._thumbFirst, 'slider__tooltip', 'slider__tooltip_first');
            this._tooltipLast = this.buildNode(this._thumbLast, 'slider__tooltip', 'slider__tooltip_last');
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
        this._slider.prepend(scale);
        this._scale = scale;
    };
    View.prototype.setTooltipValues = function (options) {
        var val;
        if (!options.range) {
            val = options.customValues ? options.customValues[options.value] : options.value;
            this._tooltip.textContent = val;
        }
        else {
            var num = void 0;
            num = !options.reverse ? 0 : 1;
            val = options.customValues ? options.customValues[options.range[num]] : options.range[num];
            this._tooltipFirst.textContent = val;
            num = num == 0 ? 1 : 0;
            val = options.customValues ? options.customValues[options.range[num]] : options.range[num];
            this._tooltipLast.textContent = val;
        }
    };
    View.prototype.setThumbPosition = function (thumbNode, position) {
        if (!this._vertical) {
            thumbNode.style.top = null;
            thumbNode.style.left = position;
        }
        else {
            thumbNode.style.left = null;
            thumbNode.style.top = position;
        }
        if (this._thumbFirst) {
            if (!this._vertical) {
                if ((this._thumbFirst.style.left == '100%') || (this._thumbFirst.style.top == '100%')) {
                    this._thumbFirst.style.zIndex = '1';
                }
                else {
                    this._thumbFirst.style.zIndex = null;
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
    View.prototype.getValidLength = function (str, validLength) {
        if (true) {
            var r = ('' + str).match(/^\d{1,3}[.,]?\d*(px|em|rem|%|vh|vw)?$/i);
            if (r && commonFunctions_1.isNumeric(r[0])) {
                return r[0].toLowerCase().replace(',', '.') + 'px';
            }
            else if (r) {
                return r[0].toLowerCase().replace(',', '.');
            }
            else {
                return validLength;
            }
        }
    };
    View.prototype.getLengthInPx = function () {
        var length = !this._vertical ?
            this._slider.offsetWidth :
            this._slider.offsetHeight;
        return length;
    };
    View.prototype.getOffsetInPx = function () {
        var offset = !this._vertical ?
            this._slider.getBoundingClientRect().left :
            this._slider.getBoundingClientRect().top;
        return offset;
    };
    return View;
}(Observer_1.Observable));
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
function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
exports.deepEqual = deepEqual;
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
            return $(this).data('sliderData').presenter.getData();
        },
        update: function (options) {
            return this.each(function () {
                var message = {
                    type: 'NEW_DATA',
                    options: options
                };
                $(this).data('sliderData').presenter.update(message);
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
        observe: function (listener) {
            var presenter = $(this).data('sliderData').presenter;
            presenter.subscribe(listener);
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


/***/ }),

/***/ "./src/validations.ts":
/*!****************************!*\
  !*** ./src/validations.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var commonFunctions_1 = __webpack_require__(/*! ./commonFunctions */ "./src/commonFunctions.ts");
var warnings = {
    valuesAreNotNumbers: 'All values, instead of customValues, should be numbers',
    valuesAreNotInteger: 'All values, instead of customValues, should be integer',
    minIsOverMax: 'Min value should be less then max value',
    minIsEqualToMax: 'Min value cant be equal to max value',
    wrongRangeLength: 'Range should contain two values',
    wrongOrderInRange: 'The first number in range should be less then second',
    tooBigStep: 'Step should be less then difference of max and min values',
    stepIsNull: 'Step cant be equal to 0',
    reverseIsNotBoolean: 'Option reverse should be true or false',
    customValuesIsNotArray: 'CustomValues should be array',
    customValuesIsTooSmall: 'CustomValues should contain at least two values',
    invalidLength: 'Length should be valid to CSS',
    verticalIsNotBoolean: 'Option vertical should be true or false',
    tooltipIsNotBoolean: 'Option tooltip should be true or false',
    scaleIsNotBoolean: 'Option scale should be true or false',
};
function validateModel(options) {
    var warns = {};
    var numbers = [options.min, options.max, options.step];
    if (options.range) {
        numbers.push(options.range[0], options.range[1]);
    }
    else {
        numbers.push(options.value);
    }
    if (!validateNumbers(numbers)) {
        warns.valuesAreNotNumbers = warnings.valuesAreNotNumbers;
    }
    if (!validateIntegers(numbers)) {
        warns.valuesAreNotInteger = warnings.valuesAreNotInteger;
    }
    if (options.min > options.max) {
        warns.minIsOverMax = warnings.minIsOverMax;
    }
    if (options.min == options.max) {
        warns.minIsEqualToMax = warnings.minIsEqualToMax;
    }
    if (options.range) {
        if (!Array.isArray(options.range) || options.range.length != 2) {
            warns.wrongRangeLength = warnings.wrongRangeLength;
        }
        if (!warns.wrongRangeLength && options.range[0] > options.range[1]) {
            warns.wrongOrderInRange = warnings.wrongOrderInRange;
        }
    }
    if (Math.abs(options.max - options.min) < Math.abs(options.step)) {
        warns.tooBigStep = warnings.tooBigStep;
    }
    if (options.step == 0) {
        warns.stepIsNull = warnings.stepIsNull;
    }
    if (typeof options.reverse != 'boolean') {
        warns.reverseIsNotBoolean = warnings.reverseIsNotBoolean;
    }
    if (options.customValues) {
        if (!Array.isArray(options.customValues)) {
            warns.customValuesIsNotArray = warnings.customValuesIsNotArray;
        }
        if (!warns.customValuesIsNotArray && options.customValues.length < 2) {
            warns.customValuesIsTooSmall = warnings.customValuesIsTooSmall;
        }
    }
    return warns;
}
exports.validateModel = validateModel;
function validateNumbers(numbers) {
    var isValid = true;
    numbers.forEach(function (item) {
        if (!commonFunctions_1.isNumeric(item)) {
            isValid = false;
        }
    });
    return isValid;
}
function validateIntegers(numbers) {
    var isValid = true;
    numbers.forEach(function (num) {
        if (num % 1 != 0) {
            isValid = false;
        }
    });
    return isValid;
}
function validateView(options) {
    var warns = {};
    if (!options.length.match(/^\d{1,3}[.,]?\d*(px|em|rem|%|vh|vw)?$/i)) {
        warns.invalidLength = warnings.invalidLength;
    }
    if (typeof options.vertical != 'boolean') {
        warns.verticalIsNotBoolean = warnings.verticalIsNotBoolean;
    }
    if (typeof options.tooltip != 'boolean') {
        warns.tooltipIsNotBoolean = warnings.tooltipIsNotBoolean;
    }
    if (typeof options.scale != 'boolean') {
        warns.scaleIsNotBoolean = warnings.scaleIsNotBoolean;
    }
    return warns;
}
exports.validateView = validateView;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb25GdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZmF1bHRPcHRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsaWRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSw4RkFBNEQ7QUFDNUQsNEVBQStEO0FBQy9ELGlHQUEyRTtBQUMzRSxxRkFBeUQ7QUFxQnpEO0lB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RUFBRztRQUN4QyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDO0tBQzlEO0lBRUQsSUFBSyxPQUFPLE9BQU8sQ0FBQyxPQUFPLElBQUksU0FBUyxFQUFHO1FBQ3ZDLEtBQUssQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsbUJBQW1CLENBQUM7S0FDNUQ7SUFFRCxJQUFLLE9BQU8sT0FBTyxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUc7UUFDckMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztLQUN4RDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFdUIsb0NBQVkiLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IHsgSU9ic2VydmFibGUsIE9ic2VydmFibGUsIElNZXNzYWdlIH0gZnJvbSAnLi9PYnNlcnZlcic7XHJcbmltcG9ydCB7IGlzTnVtZXJpYywgZ2V0TnVtYmVyT2ZTdGVwcywgZGVlcEVxdWFsIH0gZnJvbSAnLi9jb21tb25GdW5jdGlvbnMnO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZU1vZGVsLCBJV2FybmluZ3MgfSBmcm9tICcuL3ZhbGlkYXRpb25zJztcclxuXHJcbmludGVyZmFjZSBJTW9kZWxPcHRpb25zIHtcclxuICAgIC8vW3g6IHN0cmluZ106IGFueTtcclxuICAgIHZhbHVlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgbWluOiBudW1iZXI7XHJcbiAgICBtYXg6IG51bWJlcjtcclxuICAgIHN0ZXA6IG51bWJlcjtcclxuICAgIHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDtcclxuICAgIGN1c3RvbVZhbHVlcz86IHN0cmluZ1tdO1xyXG4gICAgcmV2ZXJzZTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElNb2RlbCBleHRlbmRzIElPYnNlcnZhYmxlIHtcclxuICAgIHVwZGF0ZShtZXNzYWdlOiBJTWVzc2FnZSk6IHZvaWQ7XHJcblxyXG4gICAgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zO1xyXG4gICAgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzO1xyXG59XHJcblxyXG5cclxuY2xhc3MgTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIGltcGxlbWVudHMgSU1vZGVsIHtcclxuICAgIHByaXZhdGUgX3ZhbHVlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbWluOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9tYXg6IG51bWJlcjsgICBcclxuICAgIHByaXZhdGUgX3N0ZXA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3JhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2N1c3RvbVZhbHVlcz86IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfcmV2ZXJzZTogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIF93YXJuaW5nczogSVdhcm5pbmdzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGZ1bGxPcHRpb25zOiBJTW9kZWxPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIGxldCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnM7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdGUoZnVsbE9wdGlvbnMpO1xyXG4gICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMubm9ybWFsaXplKGZ1bGxPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKHZhbGlkT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgdXBkYXRlKG1lc3NhZ2U6IElNZXNzYWdlKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdORVdfVkFMVUVfSU5fUEVSQ0VOVCc6XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUJ5UGVyY2VudChtZXNzYWdlLnBlcmNlbnQsIG1lc3NhZ2UuaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCh7IFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdORVdfVkFMVUUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnTkVXX0RBVEEnOlxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcmV2T3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZShPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgbWVzc2FnZS5vcHRpb25zKSlcclxuICAgICAgICAgICAgICAgIGxldCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLm5vcm1hbGl6ZShtZXNzYWdlLm9wdGlvbnMsIHByZXZPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoICFkZWVwRXF1YWwocHJldk9wdGlvbnMsIHZhbGlkT3B0aW9ucykgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRPcHRpb25zKHZhbGlkT3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdORVdfREFUQScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuLyogICAgIHB1YmxpYyB1cGRhdGUob3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwcmV2T3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGUoT2JqZWN0LmFzc2lnbih7fSwgcHJldk9wdGlvbnMsIG9wdGlvbnMpKVxyXG4gICAgICAgIGxldCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLm5vcm1hbGl6ZShvcHRpb25zLCBwcmV2T3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKHZhbGlkT3B0aW9ucyk7XHJcbiAgICB9ICovXHJcblxyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fdmFsdWUsXHJcbiAgICAgICAgICAgIG1pbjogdGhpcy5fbWluLFxyXG4gICAgICAgICAgICBtYXg6IHRoaXMuX21heCwgICBcclxuICAgICAgICAgICAgc3RlcDogdGhpcy5fc3RlcCxcclxuICAgICAgICAgICAgcmFuZ2U6IHRoaXMuX3JhbmdlLFxyXG4gICAgICAgICAgICBjdXN0b21WYWx1ZXM6IHRoaXMuX2N1c3RvbVZhbHVlcyxcclxuICAgICAgICAgICAgcmV2ZXJzZTogdGhpcy5fcmV2ZXJzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fd2FybmluZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0T3B0aW9ucyhvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBvcHRpb25zLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX21pbiA9IG9wdGlvbnMubWluO1xyXG4gICAgICAgIHRoaXMuX21heCA9IG9wdGlvbnMubWF4O1xyXG4gICAgICAgIHRoaXMuX3N0ZXAgPSBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBvcHRpb25zLnJhbmdlO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVZhbHVlcyA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzOyAgICAgIFxyXG4gICAgICAgIHRoaXMuX3JldmVyc2UgPSBvcHRpb25zLnJldmVyc2U7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlKG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5fd2FybmluZ3MgPSB7fTtcclxuICAgICAgICB0aGlzLl93YXJuaW5ncyA9IHZhbGlkYXRlTW9kZWwob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICggT2JqZWN0LmtleXModGhpcy5fd2FybmluZ3MpLmxlbmd0aCAhPSAwICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHdhcm5pbmdzOiBJV2FybmluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl93YXJuaW5ncyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1dBUk5JTkdTJyxcclxuICAgICAgICAgICAgICAgIHdhcm5pbmdzOiB3YXJuaW5nc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5vcm1hbGl6ZShvcHRpb25zOiBJTW9kZWxPcHRpb25zLCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiBJTW9kZWxPcHRpb25zIHtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHZhbGlkT3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5fd2FybmluZ3MuY3VzdG9tVmFsdWVzSXNOb3RBcnJheSB8fCB0aGlzLl93YXJuaW5ncy5jdXN0b21WYWx1ZXNJc1Rvb1NtYWxsICkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmN1c3RvbVZhbHVlcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5jdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMubWluID0gMDtcclxuICAgICAgICAgICAgb3B0aW9ucy5tYXggPSBvcHRpb25zLmN1c3RvbVZhbHVlcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3B0aW9ucy5taW4gPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLm1pbiwgdmFsaWRPcHRpb25zLm1pbik7XHJcbiAgICAgICAgb3B0aW9ucy5tYXggPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLm1heCwgdmFsaWRPcHRpb25zLm1heCk7XHJcbiAgICAgICAgb3B0aW9ucy5zdGVwID0gdGhpcy5ub3JtYWxpemVOdW1iZXIob3B0aW9ucy5zdGVwLCB2YWxpZE9wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5fd2FybmluZ3MubWluSXNPdmVyTWF4ICkge1xyXG4gICAgICAgICAgICBbb3B0aW9ucy5taW4sIG9wdGlvbnMubWF4XSA9IFtvcHRpb25zLm1heCwgb3B0aW9ucy5taW5dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLl93YXJuaW5ncy5taW5Jc0VxdWFsVG9NYXggKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMubWluID0gdmFsaWRPcHRpb25zLm1pbjtcclxuICAgICAgICAgICAgb3B0aW9ucy5tYXggPSB2YWxpZE9wdGlvbnMubWF4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLl93YXJuaW5ncy5zdGVwSXNOdWxsIHx8IHRoaXMuX3dhcm5pbmdzLnRvb0JpZ1N0ZXAgKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuc3RlcCA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSBNYXRoLmFicyhvcHRpb25zLnN0ZXApO1xyXG4gICAgICAgIG9wdGlvbnMucmV2ZXJzZSA9ICEhb3B0aW9ucy5yZXZlcnNlO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMubm9ybWFsaXplTnVtYmVyKG9wdGlvbnMudmFsdWUsIG9wdGlvbnMubWluKTtcclxuICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMuZmluZENsb3Nlc3RTdGVwKG9wdGlvbnMudmFsdWUsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2UgPSBudWxsO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhQXJyYXkuaXNBcnJheShvcHRpb25zLnJhbmdlKSApIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2UgPSBbb3B0aW9ucy5taW4sIG9wdGlvbnMubWF4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IG9wdGlvbnMucmFuZ2Uuc2xpY2UoMCwgMikgYXMgW251bWJlciwgbnVtYmVyXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMF0gPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLnJhbmdlWzBdLCBvcHRpb25zLm1pbik7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMV0gPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLnJhbmdlWzFdLCBvcHRpb25zLm1heCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3dhcm5pbmdzLndyb25nT3JkZXJJblJhbmdlICkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICAgICAgICAgICAgICB9KTsgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMF0gPSB0aGlzLmZpbmRDbG9zZXN0U3RlcChvcHRpb25zLnJhbmdlWzBdLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVsxXSA9IHRoaXMuZmluZENsb3Nlc3RTdGVwKG9wdGlvbnMucmFuZ2VbMV0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG5vcm1hbGl6ZU51bWJlcih2YWx1ZTogbnVtYmVyLCBkZWZhdWx0VmFsOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBuZXdWYWx1ZTogbnVtYmVyID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICggIWlzTnVtZXJpYyh2YWx1ZSkgKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gZGVmYXVsdFZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3VmFsdWUgPSBNYXRoLnRydW5jKCtuZXdWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGZpbmRDbG9zZXN0U3RlcCh2YWx1ZTogbnVtYmVyLCBvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyO1xyXG4gICAgICAgIGxldCBjZWlsU3RlcHM6IG51bWJlcjtcclxuICAgICAgICBsZXQgcmVzdE9mU3RlcDogbnVtYmVyO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnJldmVyc2UgKSB7XHJcbiAgICAgICAgICAgIGNlaWxTdGVwcyA9IE1hdGgudHJ1bmMoICh2YWx1ZSAtIG9wdGlvbnMubWluKSAvIG9wdGlvbnMuc3RlcCApO1xyXG4gICAgICAgICAgICByZXN0T2ZTdGVwID0gKHZhbHVlIC0gb3B0aW9ucy5taW4pICUgb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgICAgICBzdGVwID0gb3B0aW9ucy5taW4gKyBjZWlsU3RlcHMgKiBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgICAgIHN0ZXAgPSByZXN0T2ZTdGVwID49IG9wdGlvbnMuc3RlcC8yID8gc3RlcCArIG9wdGlvbnMuc3RlcCA6IHN0ZXA7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNlaWxTdGVwcyA9IE1hdGgudHJ1bmMoIChvcHRpb25zLm1heCAtIHZhbHVlKSAvIG9wdGlvbnMuc3RlcCApO1xyXG4gICAgICAgICAgICByZXN0T2ZTdGVwID0gKG9wdGlvbnMubWF4IC0gdmFsdWUpICUgb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgICAgICBzdGVwID0gb3B0aW9ucy5tYXggLSBjZWlsU3RlcHMgKiBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgICAgIHN0ZXAgPSByZXN0T2ZTdGVwID49IG9wdGlvbnMuc3RlcC8yID8gc3RlcCAtIG9wdGlvbnMuc3RlcCA6IHN0ZXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGVwID0gc3RlcCA+IG9wdGlvbnMubWF4ID8gb3B0aW9ucy5tYXggOiBzdGVwO1xyXG4gICAgICAgIHN0ZXAgPSBzdGVwIDwgb3B0aW9ucy5taW4gPyBvcHRpb25zLm1pbiA6IHN0ZXA7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGVwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHNldFZhbHVlQnlQZXJjZW50KHBlcmNlbnQ6IG51bWJlciwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbmV3VmFsdWU6IG51bWJlcjtcclxuXHJcbiAgICAgICAgbmV3VmFsdWUgPSBwZXJjZW50ICogKHRoaXMuX21heCAtIHRoaXMuX21pbikgLyAxMDA7XHJcbiAgICAgICAgbmV3VmFsdWUgPSAhdGhpcy5fcmV2ZXJzZSA/IFxyXG4gICAgICAgIHRoaXMuX21pbiArIG5ld1ZhbHVlIDpcclxuICAgICAgICB0aGlzLl9tYXggLSBuZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmZpbmRDbG9zZXN0U3RlcChuZXdWYWx1ZSwgdGhpcy5nZXRPcHRpb25zKCkpO1xyXG5cclxuICAgICAgICBpZiAoICF0aGlzLl9yYW5nZSApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBpc0ZpcnN0SW5SYW5nZTogYm9vbGVhbjtcclxuICAgICAgICAgICAgaXNGaXJzdEluUmFuZ2UgPSBpbmRleCA9PSAwICYmICF0aGlzLl9yZXZlcnNlO1xyXG4gICAgICAgICAgICBpc0ZpcnN0SW5SYW5nZSA9IGlzRmlyc3RJblJhbmdlIHx8IGluZGV4ID09IDEgJiYgdGhpcy5fcmV2ZXJzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0ZpcnN0SW5SYW5nZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gTWF0aC5taW4obmV3VmFsdWUsIHRoaXMuX3JhbmdlWzFdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JhbmdlWzBdID0gbmV3VmFsdWU7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBNYXRoLm1heChuZXdWYWx1ZSwgdGhpcy5fcmFuZ2VbMF0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmFuZ2VbMV0gPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IElNb2RlbCwgSU1vZGVsT3B0aW9ucyB9O1xyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuIiwiaW1wb3J0IHsgSU1vZGVsT3B0aW9ucyB9IGZyb20gXCIuL01vZGVsXCI7XHJcbmltcG9ydCB7IElWaWV3T3B0aW9ucyB9IGZyb20gXCIuL1ZpZXdcIjtcclxuaW1wb3J0IHsgSU9wdGlvbnMgfSBmcm9tIFwiLi9kZWZhdWx0T3B0aW9uc1wiO1xyXG5pbXBvcnQgeyBJV2FybmluZ3MgfSBmcm9tIFwiLi92YWxpZGF0aW9uc1wiO1xyXG5cclxuXHJcbmludGVyZmFjZSBJT2JzZXJ2YWJsZSB7XHJcbiAgICBzdWJzY3JpYmUobGlzdGVuZXI6IGFueSk6IHZvaWQ7XHJcbiAgICAvL2RldGFjaChsaXN0ZW5lcjogYW55KTogdm9pZDtcclxuICAgIGVtaXQobWVzc2FnZTogYW55KTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgT2JzZXJ2YWJsZSBpbXBsZW1lbnRzIElPYnNlcnZhYmxlIHtcclxuICAgIHByb3RlY3RlZCBsaXN0ZW5lcnM6IGFueVtdID0gW107XHJcblxyXG4gICAgcHVibGljIHN1YnNjcmliZShsaXN0ZW5lcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbi8qICAgICBwdWJsaWMgZGV0YWNoKGxpc3RlbmVyOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVySW5kZXg6IG51bWJlciA9IHRoaXMubGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnNwbGljZShsaXN0ZW5lckluZGV4LCAxKTtcclxuICAgIH0gKi9cclxuXHJcbiAgICBwdWJsaWMgZW1pdChtZXNzYWdlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRoaXMubGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElNZXNzYWdlIHtcclxuICAgIHR5cGU6IHN0cmluZyxcclxuICAgIC8vID8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/XHJcbiAgICAvL29wdGlvbnM/OiBJTW9kZWxPcHRpb25zIHwgSVZpZXdPcHRpb25zIHwgSU9wdGlvbnMsXHJcbiAgICBvcHRpb25zPzogYW55LFxyXG4gICAgcGVyY2VudD86IG51bWJlcixcclxuICAgIGluZGV4PzogbnVtYmVyLFxyXG4gICAgd2FybmluZ3M/OiBJV2FybmluZ3NcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IElPYnNlcnZhYmxlLCBPYnNlcnZhYmxlLCBJTWVzc2FnZSB9O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qIFxyXG5pbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gXCIuL2RlZmF1bHRPcHRpb25zXCI7XHJcblxyXG4vL9CY0L3RgtGE0LXRgNGE0LXQudGBINC40LfQtNCw0YLQtdC70Y8g0L7QsdGK0Y/QstC70Y/QtdGCINC90LDQsdC+0YAg0LzQtdGC0L7QtNC+0LIg0LTQu9GPINGD0L/RgNCw0LLQu9C10L3QuNGP0LzQuCDQv9C+0LTQv9C40YHQutC40YfQsNC80LguXHJcbmludGVyZmFjZSBJT2JzZXJ2YWJsZSB7XHJcblxyXG4gICAgLy8g0J/RgNC40YHQvtC10LTQuNC90Y/QtdGCINC90LDQsdC70Y7QtNCw0YLQtdC70Y8g0Log0LjQt9C00LDRgtC10LvRji5cclxuICAgIHN1YnNjcmliZShvYnNlcnZlcjogYW55KTogdm9pZDtcclxuXHJcbiAgICAvLyDQntGC0YHQvtC10LTQuNC90Y/QtdGCINC90LDQsdC70Y7QtNCw0YLQtdC70Y8g0L7RgiDQuNC30LTQsNGC0LXQu9GPLlxyXG4gICAgZGV0YWNoKG9ic2VydmVyOiBhbnkpOiB2b2lkO1xyXG5cclxuICAgIC8vINCj0LLQtdC00L7QvNC70Y/QtdGCINCy0YHQtdGFINC90LDQsdC70Y7QtNCw0YLQtdC70LXQuSDQviDRgdC+0LHRi9GC0LjQuC5cclxuICAgIGVtaXQobWVzc2FnZTogYW55KTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgT2JzZXJ2YWJsZSBpbXBsZW1lbnRzIElPYnNlcnZhYmxlIHtcclxuICAgIHByb3RlY3RlZCBvYnNlcnZlcnM6IGFueVtdID0gW107XHJcblxyXG4gICAgc3Vic2NyaWJlKG9ic2VydmVyOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXRhY2gob2JzZXJ2ZXI6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG9ic2VydmVySW5kZXggPSB0aGlzLm9ic2VydmVycy5pbmRleE9mKG9ic2VydmVyKTtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5zcGxpY2Uob2JzZXJ2ZXJJbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZW1pdCgpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG9ic2VydmVyIG9mIHRoaXMub2JzZXJ2ZXJzKSB7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLnVwZGF0ZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5pbnRlcmZhY2UgSU91dGVyT2JzZXJ2ZXIge1xyXG4gICAgZnVuYzogYW55O1xyXG4gICAgdXBkYXRlKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgT3V0ZXJPYnNlcnZlciBpbXBsZW1lbnRzIElPdXRlck9ic2VydmVyIHtcclxuICAgIGZ1bmM6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihmdW5jOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuZnVuYyA9IGZ1bmM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnVuYyhvcHRpb25zKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgeyBJT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZX07XHJcbmV4cG9ydCB7IElPdXRlck9ic2VydmVyLCBPdXRlck9ic2VydmVyfSAqLyIsImltcG9ydCB7IElPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQgTW9kZWwsIHsgSU1vZGVsLCBJTW9kZWxPcHRpb25zIH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCBWaWV3LCB7IElWaWV3IH0gZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IHsgSU9ic2VydmFibGUsIE9ic2VydmFibGUgfSAgZnJvbSAnLi9PYnNlcnZlcic7XHJcbmltcG9ydCB7IElXYXJuaW5ncyB9IGZyb20gJy4vdmFsaWRhdGlvbnMnO1xyXG5cclxuXHJcbmludGVyZmFjZSBJUHJlc2VudGVyIGV4dGVuZHMgSU9ic2VydmFibGUge1xyXG4gICAgLy9kYXRhKCk6IElPcHRpb25zO1xyXG4gICAgdXBkYXRlKG1lc3NhZ2U6IGFueSk6IHZvaWQ7XHJcblxyXG4gICAgZ2V0T3B0aW9ucygpOiBJT3B0aW9ucztcclxuICAgIGdldFdhcm5pbmdzKCk6IElXYXJuaW5ncztcclxufVxyXG5cclxuY2xhc3MgUHJlc2VudGVyIGV4dGVuZHMgT2JzZXJ2YWJsZSBpbXBsZW1lbnRzIElQcmVzZW50ZXIge1xyXG5cclxuICAgIHByaXZhdGUgX21vZGVsOiBJTW9kZWw7XHJcbiAgICBwcml2YXRlIF92aWV3OiBJVmlldztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJT3B0aW9ucywgbm9kZTogSFRNTERpdkVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9tb2RlbCA9IG5ldyBNb2RlbChvcHRpb25zKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucywgdGhpcy5fbW9kZWwuZ2V0T3B0aW9ucygpKTtcclxuICAgICAgICB0aGlzLl92aWV3ID0gbmV3IFZpZXcob3B0aW9ucywgbm9kZSk7XHJcblxyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGVsLnN1YnNjcmliZShmdW5jdGlvbihtZXNzYWdlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhhdC5fdmlldy51cGRhdGUobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRoYXQuZW1pdChtZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fdmlldy5zdWJzY3JpYmUoZnVuY3Rpb24obWVzc2FnZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoYXQuX21vZGVsLnVwZGF0ZShtZXNzYWdlKTtcclxuICAgICAgICAgICAgdGhhdC5lbWl0KG1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKG1lc3NhZ2U6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnM7XHJcbiAgICAgICAgbGV0IHdhcm5pbmdzOiBJV2FybmluZ3M7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9tb2RlbC51cGRhdGUobWVzc2FnZSk7XHJcblxyXG4gICAgICAgIG1lc3NhZ2Uub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24obWVzc2FnZS5vcHRpb25zLCB0aGlzLl9tb2RlbC5nZXRPcHRpb25zKCkpO1xyXG5cclxuICAgICAgICB0aGlzLl92aWV3LnVwZGF0ZShtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuZW1pdCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdORVdfREFUQScsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd2FybmluZ3MgPSB0aGlzLmdldFdhcm5pbmdzKCk7XHJcbiAgICAgICAgaWYgKCBPYmplY3Qua2V5cyh3YXJuaW5ncykubGVuZ3RoICE9IDAgKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyEhISEhJylcclxuICAgICAgICAgICAgdGhpcy5lbWl0KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdXQVJOSU5HUycsXHJcbiAgICAgICAgICAgICAgICB3YXJuaW5nczogd2FybmluZ3NcclxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbi8qICAgICB1cGRhdGUobWVzc2FnZTogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBpc01vZGVsVXBkYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpc1ZpZXdVcGRhdGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBtb2RlbE9wdGlvbnM6IHN0cmluZ1tdID0gWyd2YWx1ZScsICdtaW4nLCAnbWF4JywgJ3N0ZXAnLCAncmV2ZXJzZScsICdyYW5nZScsICdjdXN0b21WYWx1ZXMnXTtcclxuXHJcbiAgICAgICAgbW9kZWxPcHRpb25zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoIG1lc3NhZ2Uub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShpdGVtKSApIHtcclxuICAgICAgICAgICAgICAgIGlzTW9kZWxVcGRhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXNNb2RlbFVwZGF0ZWQpIHsgXHJcbiAgICAgICAgICAgIHRoaXMuX21vZGVsLnVwZGF0ZShtZXNzYWdlKTtcclxuICAgICAgICAgICAgaXNWaWV3VXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IHZpZXdPcHRpb25zOiBzdHJpbmdbXSA9IFsnbGVuZ3RoJywgJ3ZlcnRpY2FsJywgJ3Rvb2x0aXAnLCAnc2NhbGUnXTtcclxuXHJcbiAgICAgICAgdmlld09wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmICggbWVzc2FnZS5vcHRpb25zLmhhc093blByb3BlcnR5KGl0ZW0pICkge1xyXG4gICAgICAgICAgICAgICAgaXNWaWV3VXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGlzVmlld1VwZGF0ZWQpIHtcclxuICAgICAgICAgICAgbWVzc2FnZS5vcHRpb25zID0gT2JqZWN0LmFzc2lnbihtZXNzYWdlLm9wdGlvbnMsIHRoaXMuX21vZGVsLmdldE9wdGlvbnMoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZXcudXBkYXRlKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBtZXNzYWdlLm9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzTW9kZWxVcGRhdGVkIHx8IGlzVmlld1VwZGF0ZWQpIHtcclxuICAgICAgICAgICAgLy90aGlzLmVtaXQobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAqL1xyXG5cclxuICAgIHB1YmxpYyBnZXRPcHRpb25zKCk6IElPcHRpb25zIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fbW9kZWwuZ2V0T3B0aW9ucygpLCB0aGlzLl92aWV3LmdldE9wdGlvbnMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFdhcm5pbmdzKCk6IElXYXJuaW5ncyB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX21vZGVsLmdldFdhcm5pbmdzKCksIHRoaXMuX3ZpZXcuZ2V0V2FybmluZ3MoKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByZXNlbnRlcjsiLCJpbXBvcnQgeyBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuLy9pbXBvcnQgeyBJTW9kZWwsIElNb2RlbE9wdGlvbnMgfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IHsgSU9ic2VydmFibGUsIE9ic2VydmFibGUgfSBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IHsgaXNOdW1lcmljLCBnZXROdW1iZXJPZlN0ZXBzIH0gZnJvbSAnLi9jb21tb25GdW5jdGlvbnMnO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZVZpZXcsIElXYXJuaW5ncyB9IGZyb20gJy4vdmFsaWRhdGlvbnMnO1xyXG5pbXBvcnQgeyBJTW9kZWwsIElNb2RlbE9wdGlvbnMgfSBmcm9tICcuL01vZGVsJztcclxuXHJcblxyXG5pbnRlcmZhY2UgSVZpZXdPcHRpb25zIHtcclxuICAgIGxlbmd0aDogc3RyaW5nO1xyXG4gICAgdmVydGljYWw6IGJvb2xlYW47XHJcbiAgICB0b29sdGlwOiBib29sZWFuO1xyXG4gICAgc2NhbGU6IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBJVmlldyBleHRlbmRzIElPYnNlcnZhYmxlIHtcclxuICAgIHVwZGF0ZShtZXNzYWdlOiBhbnkpOiB2b2lkO1xyXG5cclxuICAgIGdldE9wdGlvbnMoKTogSVZpZXdPcHRpb25zO1xyXG4gICAgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzO1xyXG59XHJcblxyXG5jbGFzcyBWaWV3IGV4dGVuZHMgT2JzZXJ2YWJsZSBpbXBsZW1lbnRzIElWaWV3ICB7XHJcbiAgICBbeDogc3RyaW5nXTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgX2xlbmd0aDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdmVydGljYWw6IGJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSBfc2xpZGVyOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHByaXZhdGUgX3RodW1iPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90aHVtYkZpcnN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90aHVtYkxhc3Q/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2JhcjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwRmlyc3Q/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBMYXN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9zY2FsZT86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgX2FjdGl2ZVRodW1iOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHByaXZhdGUgX3dhcm5pbmdzOiBJV2FybmluZ3M7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElPcHRpb25zLCBzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCkge1xyXG5cclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZShvcHRpb25zKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2xpZGVyID0gc2xpZGVyTm9kZTtcclxuICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGQob3B0aW9ucylcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShtZXNzYWdlOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ05FV19WQUxVRSc6XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUaHVtYnMobWVzc2FnZS5vcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QmFyUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwIHx8IHRoaXMuX3Rvb2x0aXBGaXJzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VG9vbHRpcFZhbHVlcyhtZXNzYWdlLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdORVdfREFUQSc6XHJcblxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5nZXRPcHRpb25zKCksIG1lc3NhZ2Uub3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZShtZXNzYWdlLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWJ1aWxkKG1lc3NhZ2Uub3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4vKiAgICAgcHVibGljIHVwZGF0ZShvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0VGh1bWJzKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuc2V0QmFyUG9zaXRpb24oKTtcclxuICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCB8fCB0aGlzLl90b29sdGlwRmlyc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUb29sdGlwVmFsdWVzKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVyZW5kZXIob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5nZXRPcHRpb25zKCksIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLnZhbGlkYXRlKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMucmVidWlsZChvcHRpb25zKTtcclxuICAgIH0gKi9cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRPcHRpb25zKCk6IElWaWV3T3B0aW9ucyB7XHJcbiAgICAgICAgbGV0IHRvb2x0aXAgPSAhIXRoaXMuX3Rvb2x0aXAgfHwgISF0aGlzLl90b29sdGlwRmlyc3Q7XHJcbiAgICAgICAgbGV0IHNjYWxlID0gISF0aGlzLl9zY2FsZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGVuZ3RoOiAgdGhpcy5fbGVuZ3RoLFxyXG4gICAgICAgICAgICB2ZXJ0aWNhbDogdGhpcy5fdmVydGljYWwsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IHRvb2x0aXAsXHJcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fd2FybmluZ3MpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVRodW1iRG93bihldmVudCk6IHZvaWQge1xyXG4gICAgICAgIC8vINC/0YDQtdC00L7RgtCy0YDQsNGC0LjRgtGMINC30LDQv9GD0YHQuiDQstGL0LTQtdC70LXQvdC40Y8gKNC00LXQudGB0YLQstC40LUg0LHRgNCw0YPQt9C10YDQsClcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHVtYiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlVGh1bWJNb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVUaHVtYlVwKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRodW1iTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZVRodW1iVXApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlVGh1bWJNb3ZlKGV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gdGhpcy5nZXRMZW5ndGhJblB4KCk7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyID0gdGhpcy5nZXRPZmZzZXRJblB4KCk7XHJcbiAgICAgICAgbGV0IGV2ZW50UG9zOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG5ld1RodW1iUG9zaXRpb246IG51bWJlcjtcclxuICAgICAgICBsZXQgaW5kZXg6IG51bWJlcjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZXZlbnQudG91Y2hlcykge1xyXG4gICAgICAgICAgICBldmVudFBvcyA9ICF0aGlzLl92ZXJ0aWNhbCA/IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudFBvcyA9ICF0aGlzLl92ZXJ0aWNhbCA/IGV2ZW50LmNsaWVudFggOiBldmVudC5jbGllbnRZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV3VGh1bWJQb3NpdGlvbiA9IChldmVudFBvcyAtIG9mZnNldCkgLyBsZW5ndGggKiAxMDA7XHJcbiAgICAgICAgaW5kZXggPSB0aGlzLl9hY3RpdmVUaHVtYiA9PSB0aGlzLl90aHVtYkxhc3QgPyAxIDogMDtcclxuXHJcbiAgICAgICAgdGhpcy5lbWl0KHtcclxuICAgICAgICAgICAgdHlwZTogJ05FV19WQUxVRV9JTl9QRVJDRU5UJyxcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICBwZXJjZW50OiBuZXdUaHVtYlBvc2l0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVTbGlkZXJDbGljayhldmVudCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IHRoaXMuZ2V0TGVuZ3RoSW5QeCgpO1xyXG4gICAgICAgIGxldCBvZmZzZXQ6IG51bWJlciA9IHRoaXMuZ2V0T2Zmc2V0SW5QeCgpO1xyXG4gICAgICAgIGxldCBldmVudFBvczogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuZXdUaHVtYlBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXMpIHtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSAhdGhpcy5fdmVydGljYWwgPyBldmVudC50b3VjaGVzWzBdLmNsaWVudFggOiBldmVudC50b3VjaGVzWzBdLmNsaWVudFk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSAhdGhpcy5fdmVydGljYWwgPyBldmVudC5jbGllbnRYIDogZXZlbnQuY2xpZW50WTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5ld1RodW1iUG9zaXRpb24gPSAoZXZlbnRQb3MgLSBvZmZzZXQpIC8gbGVuZ3RoICogMTAwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLl90aHVtYikge1xyXG4gICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHRvcExlZnQ6IHN0cmluZyA9ICF0aGlzLl92ZXJ0aWNhbCA/ICdsZWZ0JyA6ICd0b3AnO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZpcnN0VGh1bWJQb3M6IG51bWJlciA9IHBhcnNlSW50KCB0aGlzLl90aHVtYkZpcnN0LnN0eWxlW3RvcExlZnRdICk7XHJcbiAgICAgICAgICAgIGxldCBsYXN0VGh1bWJQb3M6IG51bWJlciA9IHBhcnNlSW50KCB0aGlzLl90aHVtYkxhc3Quc3R5bGVbdG9wTGVmdF0gKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpc0ZpcnN0Q2xvc2VyOiBib29sZWFuO1xyXG4gICAgICAgICAgICBpc0ZpcnN0Q2xvc2VyID0gTWF0aC5hYnMoZmlyc3RUaHVtYlBvcyAtIG5ld1RodW1iUG9zaXRpb24pIDwgTWF0aC5hYnMobGFzdFRodW1iUG9zIC0gbmV3VGh1bWJQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpbmRleCA9IGlzRmlyc3RDbG9zZXIgPyAwIDogMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdORVdfVkFMVUVfSU5fUEVSQ0VOVCcsXHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgcGVyY2VudDogbmV3VGh1bWJQb3NpdGlvblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlVGh1bWJVcChldmVudCk6IHZvaWQge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZVRodW1iVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlVGh1bWJNb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlVGh1bWJVcCk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUaHVtYk1vdmUpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHVtYiA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCB2YWxpZExlbmd0aDogc3RyaW5nID0gdGhpcy5fbGVuZ3RoIHx8IGRlZmF1bHRPcHRpb25zLmxlbmd0aDtcclxuICAgICAgICB0aGlzLl9sZW5ndGggPSB0aGlzLmdldFZhbGlkTGVuZ3RoKG9wdGlvbnMubGVuZ3RoLCB2YWxpZExlbmd0aCk7XHJcblxyXG4gICAgICAgIGlmICggIW9wdGlvbnMudmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS53aWR0aCA9IHRoaXMuX2xlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaG9yaXpvbnRhbCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX3ZlcnRpY2FsJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fbGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX3ZlcnRpY2FsJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfaG9yaXpvbnRhbCcpOyAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2JhciA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fYmFyJyk7XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGRUaHVtYnMob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0QmFyUG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnRvb2x0aXAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRUb29sdGlwcyhvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnNjYWxlICkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkU2NhbGUob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVUaHVtYkRvd24gPSB0aGlzLmhhbmRsZVRodW1iRG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGh1bWJNb3ZlID0gdGhpcy5oYW5kbGVUaHVtYk1vdmUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVRodW1iVXAgPSB0aGlzLmhhbmRsZVRodW1iVXAuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVNsaWRlckNsaWNrID0gdGhpcy5oYW5kbGVTbGlkZXJDbGljay5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnJhbmdlICkge1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYi5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5oYW5kbGVUaHVtYkRvd24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iRmlyc3QuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmhhbmRsZVRodW1iRG93bik7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iRmlyc3QuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5oYW5kbGVUaHVtYkRvd24pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJMYXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5oYW5kbGVUaHVtYkRvd24pO1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkxhc3QuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5oYW5kbGVUaHVtYkRvd24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZVNsaWRlckNsaWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYnVpbGQob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcHJldk9wdGlvbnM6IElWaWV3T3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgIT0gJ19zbGlkZXInKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHRoaXMucmVtb3ZlTm9kZSh0aGlzW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCB7fSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmJ1aWxkKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGUob3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3dhcm5pbmdzID0ge307XHJcbiAgICAgICAgdGhpcy5fd2FybmluZ3MgPSB2YWxpZGF0ZVZpZXcob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICggT2JqZWN0LmtleXModGhpcy5fd2FybmluZ3MpLmxlbmd0aCAhPSAwICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHdhcm5pbmdzOiBJV2FybmluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl93YXJuaW5ncyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1dBUk5JTkdTJyxcclxuICAgICAgICAgICAgICAgIHdhcm5pbmdzOiB3YXJuaW5nc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkVGh1bWJzKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWIgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iJyk7XHJcbiAgICAgICAgfSBlbHNlIHsgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkZpcnN0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYicsICdzbGlkZXJfX3RodW1iX2ZpcnN0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iTGFzdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWInLCAnc2xpZGVyX190aHVtYl9sYXN0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFRodW1icyhvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFRodW1icyhvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwb3M6IHN0cmluZztcclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbihvcHRpb25zLnZhbHVlLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMuX3RodW1iLCBwb3MpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbnVtOiBudW1iZXI7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4IHJldmVyc2UsINGC0L4g0LvQtdCy0YvQuSDQsdC10LPRg9C90L7QuiAtINGN0YLQviDQsdC+0LvRjNGI0LXQtSDQt9C90LDRh9C10L3QuNC1XHJcbiAgICAgICAgICAgIC8vINGCLtC1LiByYW5nZVsxXVxyXG4gICAgICAgICAgICBudW0gPSAhb3B0aW9ucy5yZXZlcnNlID8gMCA6IDE7XHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24ob3B0aW9ucy5yYW5nZVtudW1dLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMuX3RodW1iRmlyc3QsIHBvcyk7XHJcblxyXG4gICAgICAgICAgICBudW0gPSBudW0gPT0gMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKG9wdGlvbnMucmFuZ2VbbnVtXSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbih0aGlzLl90aHVtYkxhc3QsIHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0QmFyUG9zaXRpb24oKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHN0YXJ0OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGxldCB0b3BMZWZ0OiBzdHJpbmcgPSAhdGhpcy5fdmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcclxuICAgICAgICBsZXQgd2lkdGhIZWlnaHQ6IHN0cmluZyA9ICF0aGlzLl92ZXJ0aWNhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcclxuXHJcbiAgICAgICAgc3RhcnQgPSB0aGlzLl90aHVtYkZpcnN0ID8gdGhpcy5fdGh1bWJGaXJzdC5zdHlsZVt0b3BMZWZ0XSA6ICcwJSc7XHJcbiAgICAgICAgbGVuZ3RoID0gdGhpcy5fdGh1bWJGaXJzdCA/IFxyXG4gICAgICAgIHRoaXMuX3RodW1iTGFzdC5zdHlsZVt0b3BMZWZ0XS5zbGljZSgwLCAtMSkgLSB0aGlzLl90aHVtYkZpcnN0LnN0eWxlW3RvcExlZnRdLnNsaWNlKDAsIC0xKSAgKyAnJScgOlxyXG4gICAgICAgIHRoaXMuX3RodW1iLnN0eWxlW3RvcExlZnRdO1xyXG5cclxuICAgICAgICB0aGlzLl9iYXIuc3R5bGVbdG9wTGVmdF0gPSBzdGFydDtcclxuICAgICAgICB0aGlzLl9iYXIuc3R5bGVbd2lkdGhIZWlnaHRdID0gbGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRUb29sdGlwcyhvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAoIW9wdGlvbnMucmFuZ2UpIHsgXHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl90aHVtYiwgJ3NsaWRlcl9fdG9vbHRpcCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBGaXJzdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3RodW1iRmlyc3QsICdzbGlkZXJfX3Rvb2x0aXAnLCAnc2xpZGVyX190b29sdGlwX2ZpcnN0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBMYXN0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5fdGh1bWJMYXN0LCAnc2xpZGVyX190b29sdGlwJywgJ3NsaWRlcl9fdG9vbHRpcF9sYXN0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFRvb2x0aXBWYWx1ZXMob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZFNjYWxlKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNjYWxlOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBsZXQgZGl2aXNpb246IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZztcclxuICAgICAgICBsZXQgaW5kZW50OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gb3B0aW9ucy5tYXggLSBvcHRpb25zLm1pbjtcclxuXHJcbiAgICAgICAgc2NhbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBzY2FsZS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3NjYWxlJyk7XHJcblxyXG4gICAgICAgIGZvciAoIGxldCBpOiBudW1iZXIgPSAwOyBpIDw9IGdldE51bWJlck9mU3RlcHMob3B0aW9ucy5taW4sIG9wdGlvbnMubWF4LCBvcHRpb25zLnN0ZXApOyBpKysgKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFvcHRpb25zLnJldmVyc2UgKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBvcHRpb25zLm1pbiArIG9wdGlvbnMuc3RlcCAqIGk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBNYXRoLm1pbih2YWwsIG9wdGlvbnMubWF4KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMubWF4IC0gb3B0aW9ucy5zdGVwICogaTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IE1hdGgubWF4KHZhbCwgb3B0aW9ucy5taW4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRlbnQgPSBpICogb3B0aW9ucy5zdGVwIDwgbGVuZ3RoID8gaSAqIG9wdGlvbnMuc3RlcCA6IGxlbmd0aDsgXHJcbiAgICAgICAgICAgIGluZGVudCA9IGluZGVudCAvIGxlbmd0aCAqIDEwMCArICclJztcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzID8gb3B0aW9ucy5jdXN0b21WYWx1ZXNbdmFsXSA6IHZhbDtcclxuXHJcbiAgICAgICAgICAgIGRpdmlzaW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUtZGl2aXNpb24nKTtcclxuICAgICAgICAgICAgZGl2aXNpb24uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwic2xpZGVyX19zY2FsZS1kaXZpc2lvbi10ZXh0XCI+JyArIHZhbCArICc8L3NwYW4+JztcclxuICAgICAgICAgICAgb3B0aW9ucy52ZXJ0aWNhbCA/IGRpdmlzaW9uLnN0eWxlLnRvcCA9IGluZGVudCA6IGRpdmlzaW9uLnN0eWxlLmxlZnQgPSBpbmRlbnQ7XHJcblxyXG4gICAgICAgICAgICBzY2FsZS5hcHBlbmQoZGl2aXNpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLnByZXBlbmQoc2NhbGUpOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFRvb2x0aXBWYWx1ZXMob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmICghb3B0aW9ucy5yYW5nZSkgeyBcclxuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMgPyBvcHRpb25zLmN1c3RvbVZhbHVlc1tvcHRpb25zLnZhbHVlXSA6IG9wdGlvbnMudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAudGV4dENvbnRlbnQgPSB2YWwgYXMgc3RyaW5nOyBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbnVtOiBudW1iZXI7XHJcbiAgICAgICAgICAgIG51bSA9ICFvcHRpb25zLnJldmVyc2UgPyAwIDogMTtcclxuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMgPyBvcHRpb25zLmN1c3RvbVZhbHVlc1tvcHRpb25zLnJhbmdlW251bV1dIDogb3B0aW9ucy5yYW5nZVtudW1dO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwRmlyc3QudGV4dENvbnRlbnQgPSB2YWwgYXMgc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgbnVtID0gbnVtID09IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMgPyBvcHRpb25zLmN1c3RvbVZhbHVlc1tvcHRpb25zLnJhbmdlW251bV1dIDogb3B0aW9ucy5yYW5nZVtudW1dO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwTGFzdC50ZXh0Q29udGVudCA9IHZhbCBhcyBzdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VGh1bWJQb3NpdGlvbih0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCBwb3NpdGlvbjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS50b3AgPSBudWxsO1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUubGVmdCA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS5sZWZ0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLnRvcCA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8geiBpbmRleFxyXG4gICAgICAgIGlmICggdGhpcy5fdGh1bWJGaXJzdCApIHtcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoICh0aGlzLl90aHVtYkZpcnN0LnN0eWxlLmxlZnQgPT0gJzEwMCUnKSB8fCAodGhpcy5fdGh1bWJGaXJzdC5zdHlsZS50b3AgPT0gJzEwMCUnKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90aHVtYkZpcnN0LnN0eWxlLnpJbmRleCA9ICcxJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGh1bWJGaXJzdC5zdHlsZS56SW5kZXggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kVGh1bWJQb3NpdGlvbih2YWx1ZTogbnVtYmVyLCBvcHRpb25zOiBJT3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHBvczogc3RyaW5nO1xyXG4gICAgICAgIHBvcyA9ICFvcHRpb25zLnJldmVyc2UgP1xyXG4gICAgICAgICh2YWx1ZSAtIG9wdGlvbnMubWluKSAvIChvcHRpb25zLm1heCAtIG9wdGlvbnMubWluKSAqIDEwMCArICclJyA6XHJcbiAgICAgICAgKG9wdGlvbnMubWF4IC0gdmFsdWUpIC8gKG9wdGlvbnMubWF4IC0gb3B0aW9ucy5taW4pICogMTAwICsgJyUnXHJcbiAgICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZU5vZGUobm9kZTogSFRNTERpdkVsZW1lbnQpOiB1bmRlZmluZWQge1xyXG4gICAgICAgIG5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkTm9kZShwYXJlbnROb2RlOiBIVE1MRGl2RWxlbWVudCwgLi4uY2xhc3Nlczogc3RyaW5nW10pOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IG5vZGU6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7ICAgICBcclxuXHJcbiAgICAgICAgZm9yICggbGV0IGk6IG51bWJlciA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZChhcmd1bWVudHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwYXJlbnROb2RlLmFwcGVuZChub2RlKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBnZXRWYWxpZExlbmd0aChzdHI6IGFueSwgdmFsaWRMZW5ndGg6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCB0eXBlb2YgKCcnICsgc3RyKSA9PSAnc3RyaW5nJyApIHtcclxuICAgICAgICAgICAgbGV0IHIgPSAoJycgKyBzdHIpLm1hdGNoKC9eXFxkezEsM31bLixdP1xcZCoocHh8ZW18cmVtfCV8dmh8dncpPyQvaSk7XHJcbiAgICAgICAgICAgIGlmICggciAmJiBpc051bWVyaWMoclswXSkgKSB7IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcsJywgJy4nKSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gclswXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJywnLCAnLicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkTGVuZ3RoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMZW5ndGhJblB4KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gIXRoaXMuX3ZlcnRpY2FsID9cclxuICAgICAgICB0aGlzLl9zbGlkZXIub2Zmc2V0V2lkdGggOlxyXG4gICAgICAgIHRoaXMuX3NsaWRlci5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgIHJldHVybiBsZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRPZmZzZXRJblB4KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyID0gIXRoaXMuX3ZlcnRpY2FsID9cclxuICAgICAgICB0aGlzLl9zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCA6XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBJVmlldywgSVZpZXdPcHRpb25zIH07XHJcbmV4cG9ydCBkZWZhdWx0IFZpZXc7IiwiZnVuY3Rpb24gaXNOdW1lcmljKG46IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiAhaXNOYU4obiAtIDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWVwRXF1YWwob2JqMSwgb2JqMikge1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iajEpPT09SlNPTi5zdHJpbmdpZnkob2JqMik7XHJcbiB9XHJcblxyXG5mdW5jdGlvbiBnZXROdW1iZXJPZlN0ZXBzKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciwgc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLmNlaWwoKG1heCAtIG1pbikgLyBzdGVwKTtcclxufVxyXG5cclxuZXhwb3J0IHsgaXNOdW1lcmljLCBnZXROdW1iZXJPZlN0ZXBzLCBkZWVwRXF1YWwgfTtcclxuXHJcbiIsImltcG9ydCB7IElNb2RlbE9wdGlvbnMgfSBmcm9tIFwiLi9Nb2RlbFwiO1xyXG5pbXBvcnQgeyBJVmlld09wdGlvbnMgfSBmcm9tIFwiLi9WaWV3XCI7XHJcblxyXG5pbnRlcmZhY2UgSU9wdGlvbnMgZXh0ZW5kcyBJTW9kZWxPcHRpb25zLCBJVmlld09wdGlvbnMge31cclxuXHJcbmxldCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMgPSB7XHJcbiAgICAvLyBNb2RlbCBvcHRpb25zXHJcbiAgICAvLyDQsiDQvdCw0YfQsNC70YzQvdGL0YUg0L3QsNGB0YLRgNC+0LnQutCw0YUg0L3QtSDQvtC/0YDQtdC00LXQu9C10L3RiyDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQuNC70Lgg0L/RgNC+0LzQtdC20YPRgtC+0LouXHJcbiAgICAvLyDQtdGB0LvQuCDQvtC90Lgg0L3QtSDRg9C60LDQt9Cw0L3RiyDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvCwg0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUgdmFsdWUgPT0gbWluIFxyXG4gICAgdmFsdWU6IG51bGwsXHJcbiAgICBtaW46IDAsXHJcbiAgICBtYXg6IDEwLFxyXG4gICAgc3RlcDogMSxcclxuICAgIHJldmVyc2U6IGZhbHNlLFxyXG4gICAgcmFuZ2U6IG51bGwsXHJcbiAgICBcclxuICAgIGxlbmd0aDogJzMwMHB4JyxcclxuICAgIHZlcnRpY2FsOiBmYWxzZSxcclxuICAgIHRvb2x0aXA6IGZhbHNlLFxyXG4gICAgc2NhbGU6IGZhbHNlLFxyXG59XHJcblxyXG5leHBvcnQgeyBJT3B0aW9ucyB9O1xyXG5leHBvcnQgeyBkZWZhdWx0T3B0aW9ucyB9O1xyXG4iLCJpbXBvcnQgTW9kZWwsIHsgSU1vZGVsIH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCBWaWV3LCB7IElWaWV3IH0gZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IFByZXNlbnRlciBmcm9tICcuL1ByZXNlbnRlcic7XHJcbmltcG9ydCB7IElPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWVzc2FnZSB9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG4vL2ltcG9ydCB7IElPdXRlck9ic2VydmVyLCBPdXRlck9ic2VydmVyIH0gZnJvbSAnLi9PYnNlcnZlcic7XHJcblxyXG4oZnVuY3Rpb24gKCQpIHtcclxuXHJcbiAgaW50ZXJmYWNlIElNZXRob2RzIHtcclxuICAgIGluaXQob3B0aW9ucz86IElPcHRpb25zKTogdm9pZDtcclxuICAgIGdldERhdGEoKTogSU9wdGlvbnM7XHJcbiAgICB1cGRhdGUob3B0aW9uczogYW55KTogdm9pZDtcclxuICAgIGRlc3Ryb3koKTogdm9pZDtcclxuICAgIG9ic2VydmUoZnVuYzogRnVuY3Rpb24pOiB2b2lkO1xyXG4gIH1cclxuXHJcbiAgdmFyIG1ldGhvZHM6IElNZXRob2RzID0ge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChvcHRpb25zPzogSU9wdGlvbnMpOiB2b2lkIHtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBkYXRhID0gJHRoaXMuZGF0YSgnc2xpZGVyRGF0YScpO1xyXG4gICAgICAgIGxldCBzbGlkZXIgPSAkdGhpcztcclxuXHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0L/Qu9Cw0LPQuNC9INC10YnRkSDQvdC1INC/0YDQvtC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDQvVxyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG5cclxuICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgIGxldCBwcmVzZW50ZXIgPSBuZXcgUHJlc2VudGVyKG9wdGlvbnMsIHRoaXMpO1xyXG5cclxuICAgICAgICAgICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScsIHtcclxuICAgICAgICAgICAgc2xpZGVyOiBzbGlkZXIsXHJcbiAgICAgICAgICAgIHByZXNlbnRlcjogcHJlc2VudGVyXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RGF0YTogZnVuY3Rpb24gKCk6IElPcHRpb25zIHtcclxuICAgICAgcmV0dXJuICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScpLnByZXNlbnRlci5nZXREYXRhKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBtZXNzYWdlOiBJTWVzc2FnZSA9IHtcclxuICAgICAgICAgIHR5cGU6ICdORVdfREFUQScsXHJcbiAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnKS5wcmVzZW50ZXIudXBkYXRlKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpOiB2b2lkIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSAkdGhpcy5kYXRhKCdzbGlkZXJEYXRhJyk7XHJcblxyXG4gICAgICAgICQod2luZG93KS51bmJpbmQoJy5zbGlkZXInKTtcclxuICAgICAgICBkYXRhLnNsaWRlci5yZW1vdmUoKTtcclxuICAgICAgICAkdGhpcy5yZW1vdmVEYXRhKCdzbGlkZXJEYXRhJyk7XHJcblxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgb2JzZXJ2ZTogZnVuY3Rpb24gKGxpc3RlbmVyOiBGdW5jdGlvbik6IHZvaWQge1xyXG5cclxuICAgICAgbGV0IHByZXNlbnRlciA9ICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScpLnByZXNlbnRlcjtcclxuICAgICAgcHJlc2VudGVyLnN1YnNjcmliZShsaXN0ZW5lcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuLy8gPz8/Pz8/Pz8/Pz8/P1xyXG4gIGpRdWVyeS5mbi5zbGlkZXIgPSBmdW5jdGlvbiAobWV0aG9kOiBzdHJpbmcpOiBKUXVlcnkge1xyXG5cclxuICAgIC8vINC70L7Qs9C40LrQsCDQstGL0LfQvtCy0LAg0LzQtdGC0L7QtNCwXHJcbiAgICBpZiAobWV0aG9kc1ttZXRob2QgYXMgc3RyaW5nXSkge1xyXG5cclxuICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kIGFzIHN0cmluZ10uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XHJcblxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XHJcblxyXG4gICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJC5lcnJvcignTWV0aG9kIGNhbGxlZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBmb3IgSlF1ZXJ5LnNsaWRlcicpO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxufSkoalF1ZXJ5KTtcclxuXHJcblxyXG5cclxuLy9sZXQgcHJlcyA9IG5ldyBQcmVzZW50ZXIoZGVmYXVsdE9wdGlvbnMsIHRlc3QpO1xyXG5cclxuLyogJCgnLnRlc3QnKS5zbGlkZXIoe1xyXG4gIC8vdmFsdWU6IDAsXHJcbiAgLy9taW46IC03LjY2NjYsXHJcbiAgcmFuZ2U6ICdoamssJyxcclxuICAvL3JldmVyc2U6IHRydWUsXHJcbiAgLy9jdXN0b21WYWx1ZXM6IFsnYScsICdiJywgJ2MnLCAnZCddLFxyXG4gIHN0ZXA6ICdoZycsXHJcbiAgdmFsdWU6ICd2eG54bScsXHJcbiAgbWluOiAnZmRndmh4amsnLFxyXG4gIG1heDogMTcuNSxcclxuICB0b29sdGlwOiB0cnVlLFxyXG4gIHNjYWxlOiB0cnVlXHJcbn0pO1xyXG5cclxuJCgnLnRlc3QnKS5zbGlkZXIoJ29ic2VydmUnLCBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgaWYgKG1lc3NhZ2Uub3B0aW9ucyAmJiBtZXNzYWdlLm9wdGlvbnMucmFuZ2UpIHtcclxuICAgICQoJy5pbnB1dCcpLnZhbChtZXNzYWdlLm9wdGlvbnMucmFuZ2UpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1lc3NhZ2UudHlwZSA9PSAnV0FSTklOR1MnKSB7XHJcblxyXG4gICAgZm9yICggbGV0IGtleSBpbiBtZXNzYWdlLndhcm5pbmdzICkge1xyXG4gICAgICAkKCcud2FycycpLmFwcGVuZCgnPHA+JyArIG1lc3NhZ2Uud2FybmluZ3Nba2V5XSArICc8L3A+JylcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufSlcclxuXHJcbiQoJy50ZXN0Jykuc2xpZGVyKCd1cGRhdGUnLCB7XHJcbiAgbWluOiAyMCxcclxuICByYW5nZTogWzMsIDddLFxyXG4gIG1heDogLTNcclxufSlcclxuXHJcblxyXG4kKCcudGVzdCcpLnNsaWRlcigndXBkYXRlJywge1xyXG4gIG1pbjogLTUuOCxcclxuICByYW5nZTogWzMsIDcsICdkZ3ggJywgNV0sXHJcbiAgbWF4OiAndmJuJ1xyXG59KSAqL1xyXG5cclxuXHJcblxyXG4vKiBsZXQgbW9kID0gbmV3IE1vZGVsKGRlZmF1bHRPcHRpb25zKTtcclxuY29uc29sZS5sb2cobW9kLnJldmVyc2UpXHJcbm1vZC5tYWtlRnVsbENoYW5nZXMoe3JldmVyc2U6IHRydWV9KVxyXG5jb25zb2xlLmxvZyhtb2QucmV2ZXJzZSlcclxubW9kLm1ha2VGdWxsQ2hhbmdlcyh7cmV2ZXJzZTogZmFsc2V9KVxyXG5jb25zb2xlLmxvZyhtb2QucmV2ZXJzZSkgKi8iLCJpbXBvcnQgeyBJTW9kZWxPcHRpb25zIH0gZnJvbSBcIi4vTW9kZWxcIjtcclxuaW1wb3J0IHsgaXNOdW1lcmljIH0gZnJvbSBcIi4vY29tbW9uRnVuY3Rpb25zXCI7XHJcblxyXG5pbnRlcmZhY2UgSVdhcm5pbmdzIHtcclxuICAgIHZhbHVlc0FyZU5vdE51bWJlcnM/OiBzdHJpbmcsXHJcbiAgICB2YWx1ZXNBcmVOb3RJbnRlZ2VyPzogc3RyaW5nLFxyXG4gICAgbWluSXNPdmVyTWF4Pzogc3RyaW5nLFxyXG4gICAgbWluSXNFcXVhbFRvTWF4Pzogc3RyaW5nLFxyXG4gICAgd3JvbmdSYW5nZUxlbmd0aD86IHN0cmluZyxcclxuICAgIHdyb25nT3JkZXJJblJhbmdlPzogc3RyaW5nLFxyXG4gICAgdG9vQmlnU3RlcD86IHN0cmluZyxcclxuICAgIHN0ZXBJc051bGw/OiBzdHJpbmcsXHJcbiAgICByZXZlcnNlSXNOb3RCb29sZWFuPzogc3RyaW5nLFxyXG4gICAgY3VzdG9tVmFsdWVzSXNOb3RBcnJheT86IHN0cmluZyxcclxuICAgIGN1c3RvbVZhbHVlc0lzVG9vU21hbGw/IDogc3RyaW5nLFxyXG5cclxuICAgIGludmFsaWRMZW5ndGg/OiBzdHJpbmcsXHJcbiAgICB2ZXJ0aWNhbElzTm90Qm9vbGVhbj86IHN0cmluZyxcclxuICAgIHRvb2x0aXBJc05vdEJvb2xlYW4/OiBzdHJpbmcsXHJcbiAgICBzY2FsZUlzTm90Qm9vbGVhbj86IHN0cmluZyxcclxufVxyXG5cclxubGV0IHdhcm5pbmdzOiBJV2FybmluZ3MgPSB7XHJcbiAgICB2YWx1ZXNBcmVOb3ROdW1iZXJzOiAnQWxsIHZhbHVlcywgaW5zdGVhZCBvZiBjdXN0b21WYWx1ZXMsIHNob3VsZCBiZSBudW1iZXJzJyxcclxuICAgIHZhbHVlc0FyZU5vdEludGVnZXI6ICdBbGwgdmFsdWVzLCBpbnN0ZWFkIG9mIGN1c3RvbVZhbHVlcywgc2hvdWxkIGJlIGludGVnZXInLFxyXG4gICAgbWluSXNPdmVyTWF4OiAnTWluIHZhbHVlIHNob3VsZCBiZSBsZXNzIHRoZW4gbWF4IHZhbHVlJyxcclxuICAgIG1pbklzRXF1YWxUb01heDogJ01pbiB2YWx1ZSBjYW50IGJlIGVxdWFsIHRvIG1heCB2YWx1ZScsXHJcbiAgICB3cm9uZ1JhbmdlTGVuZ3RoOiAnUmFuZ2Ugc2hvdWxkIGNvbnRhaW4gdHdvIHZhbHVlcycsXHJcbiAgICB3cm9uZ09yZGVySW5SYW5nZTogJ1RoZSBmaXJzdCBudW1iZXIgaW4gcmFuZ2Ugc2hvdWxkIGJlIGxlc3MgdGhlbiBzZWNvbmQnLFxyXG4gICAgdG9vQmlnU3RlcDogJ1N0ZXAgc2hvdWxkIGJlIGxlc3MgdGhlbiBkaWZmZXJlbmNlIG9mIG1heCBhbmQgbWluIHZhbHVlcycsXHJcbiAgICBzdGVwSXNOdWxsOiAnU3RlcCBjYW50IGJlIGVxdWFsIHRvIDAnLFxyXG4gICAgcmV2ZXJzZUlzTm90Qm9vbGVhbjogJ09wdGlvbiByZXZlcnNlIHNob3VsZCBiZSB0cnVlIG9yIGZhbHNlJyxcclxuICAgIGN1c3RvbVZhbHVlc0lzTm90QXJyYXk6ICdDdXN0b21WYWx1ZXMgc2hvdWxkIGJlIGFycmF5JyxcclxuICAgIGN1c3RvbVZhbHVlc0lzVG9vU21hbGw6ICdDdXN0b21WYWx1ZXMgc2hvdWxkIGNvbnRhaW4gYXQgbGVhc3QgdHdvIHZhbHVlcycsXHJcblxyXG4gICAgaW52YWxpZExlbmd0aDogJ0xlbmd0aCBzaG91bGQgYmUgdmFsaWQgdG8gQ1NTJyxcclxuICAgIHZlcnRpY2FsSXNOb3RCb29sZWFuOiAnT3B0aW9uIHZlcnRpY2FsIHNob3VsZCBiZSB0cnVlIG9yIGZhbHNlJyxcclxuICAgIHRvb2x0aXBJc05vdEJvb2xlYW46ICdPcHRpb24gdG9vbHRpcCBzaG91bGQgYmUgdHJ1ZSBvciBmYWxzZScsXHJcbiAgICBzY2FsZUlzTm90Qm9vbGVhbjogJ09wdGlvbiBzY2FsZSBzaG91bGQgYmUgdHJ1ZSBvciBmYWxzZScsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlTW9kZWwob3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IElXYXJuaW5ncyB7XHJcblxyXG4gICAgbGV0IHdhcm5zOiBJV2FybmluZ3MgPSB7fTtcclxuXHJcbiAgICBsZXQgbnVtYmVyczogbnVtYmVyW10gPSBbb3B0aW9ucy5taW4sIG9wdGlvbnMubWF4LCBvcHRpb25zLnN0ZXBdO1xyXG4gICAgaWYgKG9wdGlvbnMucmFuZ2UpIHtcclxuICAgICAgICBudW1iZXJzLnB1c2gob3B0aW9ucy5yYW5nZVswXSwgb3B0aW9ucy5yYW5nZVsxXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG51bWJlcnMucHVzaChvcHRpb25zLnZhbHVlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKCAhdmFsaWRhdGVOdW1iZXJzKG51bWJlcnMpICkgeyBcclxuICAgICAgICB3YXJucy52YWx1ZXNBcmVOb3ROdW1iZXJzID0gd2FybmluZ3MudmFsdWVzQXJlTm90TnVtYmVycztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoICF2YWxpZGF0ZUludGVnZXJzKG51bWJlcnMpICkge1xyXG4gICAgICAgIHdhcm5zLnZhbHVlc0FyZU5vdEludGVnZXIgPSB3YXJuaW5ncy52YWx1ZXNBcmVOb3RJbnRlZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggb3B0aW9ucy5taW4gPiBvcHRpb25zLm1heCApIHtcclxuICAgICAgICB3YXJucy5taW5Jc092ZXJNYXggPSB3YXJuaW5ncy5taW5Jc092ZXJNYXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCBvcHRpb25zLm1pbiA9PSBvcHRpb25zLm1heCApIHtcclxuICAgICAgICB3YXJucy5taW5Jc0VxdWFsVG9NYXggPSB3YXJuaW5ncy5taW5Jc0VxdWFsVG9NYXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCBvcHRpb25zLnJhbmdlICkge1xyXG4gICAgICAgIGlmICggIUFycmF5LmlzQXJyYXkob3B0aW9ucy5yYW5nZSkgfHwgb3B0aW9ucy5yYW5nZS5sZW5ndGggIT0gMiApIHtcclxuICAgICAgICAgICAgd2FybnMud3JvbmdSYW5nZUxlbmd0aCA9IHdhcm5pbmdzLndyb25nUmFuZ2VMZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICF3YXJucy53cm9uZ1JhbmdlTGVuZ3RoICYmIG9wdGlvbnMucmFuZ2VbMF0gPiBvcHRpb25zLnJhbmdlWzFdICkge1xyXG4gICAgICAgICAgICB3YXJucy53cm9uZ09yZGVySW5SYW5nZSA9IHdhcm5pbmdzLndyb25nT3JkZXJJblJhbmdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIE1hdGguYWJzKG9wdGlvbnMubWF4IC0gb3B0aW9ucy5taW4pIDwgTWF0aC5hYnMob3B0aW9ucy5zdGVwKSApIHtcclxuICAgICAgICB3YXJucy50b29CaWdTdGVwID0gd2FybmluZ3MudG9vQmlnU3RlcDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKCBvcHRpb25zLnN0ZXAgPT0gMCApIHtcclxuICAgICAgICB3YXJucy5zdGVwSXNOdWxsID0gd2FybmluZ3Muc3RlcElzTnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIHR5cGVvZiBvcHRpb25zLnJldmVyc2UgIT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgIHdhcm5zLnJldmVyc2VJc05vdEJvb2xlYW4gPSB3YXJuaW5ncy5yZXZlcnNlSXNOb3RCb29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggb3B0aW9ucy5jdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgaWYgKCAhQXJyYXkuaXNBcnJheShvcHRpb25zLmN1c3RvbVZhbHVlcykgKSB7XHJcbiAgICAgICAgICAgIHdhcm5zLmN1c3RvbVZhbHVlc0lzTm90QXJyYXkgPSB3YXJuaW5ncy5jdXN0b21WYWx1ZXNJc05vdEFycmF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhd2FybnMuY3VzdG9tVmFsdWVzSXNOb3RBcnJheSAmJiBvcHRpb25zLmN1c3RvbVZhbHVlcy5sZW5ndGggPCAyICkge1xyXG4gICAgICAgICAgICB3YXJucy5jdXN0b21WYWx1ZXNJc1Rvb1NtYWxsID0gd2FybmluZ3MuY3VzdG9tVmFsdWVzSXNUb29TbWFsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHdhcm5zO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZU51bWJlcnMobnVtYmVyczogbnVtYmVyW10pOiBib29sZWFuIHtcclxuICAgIGxldCBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIG51bWJlcnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IFxyXG4gICAgICAgIGlmKCAhaXNOdW1lcmljKGl0ZW0pICkgeyBcclxuICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGlzVmFsaWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlSW50ZWdlcnMobnVtYmVyczogbnVtYmVyW10pOiBib29sZWFuIHtcclxuICAgIGxldCBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIG51bWJlcnMuZm9yRWFjaChmdW5jdGlvbihudW0pIHtcclxuICAgICAgICBpZiAoIG51bSAlIDEgIT0gMCApIHsgXHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpc1ZhbGlkO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVZpZXcob3B0aW9ucyk6IElXYXJuaW5ncyB7XHJcbiAgICBsZXQgd2FybnM6IElXYXJuaW5ncyA9IHt9O1xyXG5cclxuICAgIGlmICggIW9wdGlvbnMubGVuZ3RoLm1hdGNoKC9eXFxkezEsM31bLixdP1xcZCoocHh8ZW18cmVtfCV8dmh8dncpPyQvaSkgKSB7XHJcbiAgICAgICAgd2FybnMuaW52YWxpZExlbmd0aCA9IHdhcm5pbmdzLmludmFsaWRMZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCB0eXBlb2Ygb3B0aW9ucy52ZXJ0aWNhbCAhPSAnYm9vbGVhbicgKSB7XHJcbiAgICAgICAgd2FybnMudmVydGljYWxJc05vdEJvb2xlYW4gPSB3YXJuaW5ncy52ZXJ0aWNhbElzTm90Qm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIHR5cGVvZiBvcHRpb25zLnRvb2x0aXAgIT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgIHdhcm5zLnRvb2x0aXBJc05vdEJvb2xlYW4gPSB3YXJuaW5ncy50b29sdGlwSXNOb3RCb29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggdHlwZW9mIG9wdGlvbnMuc2NhbGUgIT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgIHdhcm5zLnNjYWxlSXNOb3RCb29sZWFuID0gd2FybmluZ3Muc2NhbGVJc05vdEJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHdhcm5zO1xyXG59XHJcblxyXG5leHBvcnQgeyB2YWxpZGF0ZU1vZGVsLCB2YWxpZGF0ZVZpZXcsIElXYXJuaW5ncyB9Il0sInNvdXJjZVJvb3QiOiIifQ==