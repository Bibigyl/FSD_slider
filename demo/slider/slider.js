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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/jqueryWrapper.ts");
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
    Model.prototype.update = function (options) {
        var prevOptions = this.getOptions();
        this.validate(Object.assign({}, prevOptions, options));
        var validOptions = this.normalize(options, prevOptions);
        this.setOptions(validOptions);
        this.notify({
            type: 'NEW_DATA',
            options: this.getOptions()
        });
    };
    Model.prototype.setEndByOffsetRacio = function (racio) {
        var value = this.findValueByOffsetRacio(racio);
        if (value < this._begin) {
            value = this._begin;
        }
        this._end = value;
        this.notify({
            type: 'NEW_VALUE',
            options: this.getOptions()
        });
    };
    Model.prototype.setBeginByOffsetRacio = function (racio) {
        if (!this._range) {
            return;
        }
        ;
        var value = this.findValueByOffsetRacio(racio);
        if (value > this._end) {
            value = this._end;
        }
        this._begin = value;
        this.notify({
            type: 'NEW_VALUE',
            options: this.getOptions()
        });
    };
    Model.prototype.findValueByOffsetRacio = function (racio) {
        var value;
        value = racio * (this._max - this._min);
        value = !this._reverse ?
            this._min + value :
            this._max - value;
        value = this.findClosestValue(value, this.getOptions());
        return value;
    };
    Model.prototype.getOptions = function () {
        return {
            begin: this._begin,
            end: this._end,
            range: this._range,
            min: this._min,
            max: this._max,
            step: this._step,
            customValues: this._customValues,
            reverse: this._reverse
        };
    };
    Model.prototype.getWarnings = function () {
        return Object.assign({}, this._warnings);
    };
    Model.prototype.setOptions = function (options) {
        this._begin = options.begin;
        this._end = options.end;
        this._range = options.range;
        this._min = options.min;
        this._max = options.max;
        this._step = options.step;
        this._customValues = options.customValues;
        this._reverse = options.reverse;
    };
    Model.prototype.validate = function (options) {
        this._warnings = {};
        this._warnings = validations_1.validateModel(options);
        if (Object.keys(this._warnings).length != 0) {
            var warnings = Object.assign({}, this._warnings);
            this.notify({
                type: 'WARNINGS',
                warnings: warnings
            });
        }
    };
    Model.prototype.normalize = function (options, baseOptions) {
        var _a, _b;
        options = Object.assign({}, baseOptions, options);
        var begin = options.begin, end = options.end, range = options.range, min = options.min, max = options.max, step = options.step, reverse = options.reverse, customValues = options.customValues;
        if (this._warnings.customValuesIsNotArray || this._warnings.customValuesIsTooSmall) {
            customValues = undefined;
        }
        if (customValues) {
            min = 0;
            max = customValues.length - 1;
        }
        min = this.normalizeNumber(min, baseOptions.min);
        max = this.normalizeNumber(max, baseOptions.max);
        step = this.normalizeNumber(step, baseOptions.step);
        if (this._warnings.minIsOverMax) {
            _a = [max, min], min = _a[0], max = _a[1];
        }
        if (this._warnings.minIsEqualToMax) {
            min = baseOptions.min;
            max = baseOptions.max;
        }
        if (this._warnings.stepIsNull || this._warnings.tooBigStep) {
            step = 1;
        }
        step = Math.abs(step);
        reverse = !!reverse;
        range = !!range;
        if (this._warnings.beginIsOverEnd) {
            _b = [end, begin], begin = _b[0], end = _b[1];
        }
        end = this.normalizeNumber(end, max);
        end = this.findClosestValue(end, options);
        if (!range) {
            begin = min;
        }
        else {
            begin = this.normalizeNumber(begin, min);
            begin = this.findClosestValue(begin, options);
        }
        return { begin: begin, end: end, range: range, min: min, max: max, step: step, reverse: reverse, customValues: customValues };
    };
    Model.prototype.normalizeNumber = function (value, defaultVal) {
        var newValue = value;
        if (!commonFunctions_1.isNumeric(value)) {
            newValue = defaultVal;
        }
        newValue = Math.trunc(+newValue);
        return newValue;
    };
    Model.prototype.findClosestValue = function (value, options) {
        var prevValue;
        var nextValue;
        var min = options.min, max = options.max, step = options.step, reverse = options.reverse;
        if (value <= min) {
            return min;
        }
        ;
        if (value >= max) {
            return max;
        }
        ;
        if (!reverse) {
            prevValue = Math.trunc((value - min) / step) * step;
            nextValue = Math.trunc((value - min) / step) * step + step;
            nextValue = nextValue < max ? nextValue : max;
            value = value < prevValue + (nextValue - prevValue) / 2 ? prevValue : nextValue;
        }
        else {
            prevValue = max - Math.trunc((max - value) / step) * step - step;
            nextValue = max - Math.trunc((max - value) / step) * step;
            prevValue = prevValue > min ? prevValue : min;
            value = value < nextValue - (nextValue - prevValue) / 2 ? prevValue : nextValue;
        }
        return value;
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
    Observable.prototype.notify = function (message) {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(message);
        }
    };
    return Observable;
}());
exports.Observable = Observable;
var ObservablePresenter = (function () {
    function ObservablePresenter() {
        this.listeners = [];
    }
    ObservablePresenter.prototype.subscribe = function (listener) {
        this.listeners.push(listener);
    };
    ObservablePresenter.prototype.notify = function (options, warnings) {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(options, warnings);
        }
    };
    return ObservablePresenter;
}());
exports.ObservablePresenter = ObservablePresenter;


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
var Observer_1 = __webpack_require__(/*! ./Observer */ "./src/Observer.ts");
var Presenter = (function (_super) {
    __extends(Presenter, _super);
    function Presenter(model, view) {
        var _this = _super.call(this) || this;
        _this._model = model;
        _this._view = view;
        var that = _this;
        _this._model.subscribe(function (message) {
            switch (message.type) {
                case 'NEW_VALUE':
                    that._view.update(message.options);
                    that.notify(that.getOptions());
                    break;
            }
        });
        _this._view.subscribe(function (message) {
            switch (message.type) {
                case 'LAST_THUMB_MOVED':
                    !that._model.getOptions().reverse ?
                        that._model.setEndByOffsetRacio(message.offsetRacio) :
                        that._model.setBeginByOffsetRacio(message.offsetRacio);
                    break;
                case 'FIRST_THUMB_MOVED':
                    !that._model.getOptions().reverse ?
                        that._model.setBeginByOffsetRacio(message.offsetRacio) :
                        that._model.setEndByOffsetRacio(message.offsetRacio);
                    break;
            }
        });
        return _this;
    }
    Presenter.prototype.update = function (options) {
        var isModelUpdated = false;
        var isViewUpdated = false;
        var modelOptions = ['value', 'min', 'max', 'step', 'reverse', 'range', 'customValues'];
        modelOptions.forEach(function (item) {
            if (options.hasOwnProperty(item)) {
                isModelUpdated = true;
                return;
            }
        });
        if (isModelUpdated) {
            this._model.update(options);
            isViewUpdated = true;
        }
        var viewOptions = ['length', 'vertical', 'tooltip', 'scale'];
        viewOptions.forEach(function (item) {
            if (options.hasOwnProperty(item)) {
                isViewUpdated = true;
                return;
            }
        });
        if (isViewUpdated) {
            options = Object.assign(options, this._model.getOptions());
            this._view.rerender(options);
        }
        if (isModelUpdated || isViewUpdated) {
            var warnings = this.getWarnings();
            if (Object.keys(warnings).length != 0) {
                warnings = undefined;
            }
            this.notify(this.getOptions(), warnings);
        }
    };
    Presenter.prototype.getOptions = function () {
        return Object.assign({}, this._model.getOptions(), this._view.getOptions());
    };
    Presenter.prototype.getWarnings = function () {
        return Object.assign({}, this._model.getWarnings(), this._view.getWarnings());
    };
    return Presenter;
}(Observer_1.ObservablePresenter));
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
    View.prototype.update = function (options) {
        this.setThumbs(options);
        this.setBarPosition();
        if (this._tooltip || this._tooltipFirst) {
            this.setTooltipValues(options);
        }
    };
    View.prototype.rerender = function (options) {
        options = Object.assign({}, this.getOptions(), options);
        this.validate(options);
        this.rebuild(options);
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
        if (event.touches) {
            eventPos = !this._vertical ? event.touches[0].clientX : event.touches[0].clientY;
        }
        else {
            eventPos = !this._vertical ? event.clientX : event.clientY;
        }
        newThumbPosition = (eventPos - offset) / length;
        if (this._activeThumb == this._thumbLast) {
            this.notify({
                type: 'LAST_THUMB_MOVED',
                offsetRacio: newThumbPosition
            });
        }
        else {
            this.notify({
                type: 'FIRST_THUMB_MOVED',
                offsetRacio: newThumbPosition
            });
        }
    };
    View.prototype.handleSliderClick = function (event) {
        var length = this.getLengthInPx();
        var offset = this.getOffsetInPx();
        var eventPos;
        var newThumbPosition;
        var isLastMoved;
        if (event.touches) {
            eventPos = !this._vertical ? event.touches[0].clientX : event.touches[0].clientY;
        }
        else {
            eventPos = !this._vertical ? event.clientX : event.clientY;
        }
        newThumbPosition = (eventPos - offset) / length;
        if (this._thumbFirst.classList.contains('slider__thumb_disabled')) {
            isLastMoved = true;
        }
        else if (this._thumbLast.classList.contains('slider__thumb_disabled')) {
            isLastMoved = false;
        }
        else {
            var topLeft = !this._vertical ? 'left' : 'top';
            var firstThumbPos = parseInt(this._thumbFirst.style[topLeft]);
            var lastThumbPos = parseInt(this._thumbLast.style[topLeft]);
            var isLastCloser = void 0;
            isLastCloser = Math.abs(firstThumbPos / 100 - newThumbPosition) > Math.abs(lastThumbPos / 100 - newThumbPosition);
            isLastMoved = isLastCloser;
        }
        if (isLastMoved) {
            this.notify({
                type: 'LAST_THUMB_MOVED',
                offsetRacio: newThumbPosition
            });
        }
        else {
            this.notify({
                type: 'FIRST_THUMB_MOVED',
                offsetRacio: newThumbPosition
            });
        }
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
        this._thumbFirst.addEventListener("mousedown", this.handleThumbDown);
        this._thumbFirst.addEventListener("touchstart", this.handleThumbDown);
        this._thumbLast.addEventListener("mousedown", this.handleThumbDown);
        this._thumbLast.addEventListener("touchstart", this.handleThumbDown);
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
            this.notify({
                type: 'WARNINGS',
                warnings: warnings
            });
        }
    };
    View.prototype.buildThumbs = function (options) {
        var range = options.range, reverse = options.reverse;
        this._thumbFirst = this.buildNode(this._slider, 'slider__thumb', 'slider__thumb_first');
        this._thumbLast = this.buildNode(this._slider, 'slider__thumb', 'slider__thumb_last');
        if (!range) {
            if (!reverse) {
                this._thumbFirst.classList.add('slider__thumb_disabled');
            }
            else {
                this._thumbLast.classList.add('slider__thumb_disabled');
            }
        }
        this.setThumbs(options);
    };
    View.prototype.setThumbs = function (options) {
        var begin = options.begin, end = options.end, reverse = options.reverse;
        var beginPosition = this.findThumbPosition(begin, options);
        var endPosition = this.findThumbPosition(end, options);
        if (!reverse) {
            this.setThumbPosition(this._thumbFirst, beginPosition);
            this.setThumbPosition(this._thumbLast, endPosition);
        }
        else {
            this.setThumbPosition(this._thumbFirst, endPosition);
            this.setThumbPosition(this._thumbLast, beginPosition);
        }
    };
    View.prototype.setBarPosition = function () {
        var start;
        var length;
        var topLeft = !this._vertical ? 'left' : 'top';
        var widthHeight = !this._vertical ? 'width' : 'height';
        start = this._thumbFirst.style[topLeft];
        length = this._thumbLast.style[topLeft].slice(0, -1) - this._thumbFirst.style[topLeft].slice(0, -1) + '%';
        this._bar.style[topLeft] = start;
        this._bar.style[widthHeight] = length;
    };
    View.prototype.buildTooltips = function (options) {
        this._tooltipFirst = this.buildNode(this._thumbFirst, 'slider__tooltip', 'slider__tooltip_first');
        this._tooltipLast = this.buildNode(this._thumbLast, 'slider__tooltip', 'slider__tooltip_last');
        this.setTooltipValues(options);
    };
    View.prototype.buildScale = function (options) {
        var min = options.min, max = options.max, step = options.step, reverse = options.reverse, customValues = options.customValues;
        var scale;
        var division;
        var val;
        var indent;
        var length = max - min;
        scale = document.createElement('div');
        scale.classList.add('slider__scale');
        for (var i = 0; i <= commonFunctions_1.getNumberOfSteps(min, max, step); i++) {
            if (!reverse) {
                val = min + step * i;
                val = Math.min(val, max);
            }
            else {
                val = max - step * i;
                val = Math.max(val, min);
            }
            indent = i * step < length ? i * step : length;
            indent = indent / length * 100 + '%';
            val = customValues ? customValues[val] : val;
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
        var begin = options.begin, end = options.end, reverse = options.reverse, customValues = options.customValues;
        var beginValue = customValues ? customValues[begin] : begin;
        var endValue = customValues ? customValues[end] : end;
        if (!reverse) {
            this._tooltipFirst.textContent = beginValue;
            this._tooltipLast.textContent = endValue;
        }
        else {
            this._tooltipFirst.textContent = endValue;
            this._tooltipLast.textContent = beginValue;
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
        var min = options.min, max = options.max, reverse = options.reverse;
        var pos;
        pos = !reverse ?
            (value - min) / (max - min) * 100 + '%' :
            (max - value) / (max - min) * 100 + '%';
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
    begin: null,
    end: null,
    range: false,
    min: 0,
    max: 10,
    step: 1,
    reverse: false,
    length: '300px',
    vertical: false,
    tooltip: false,
    scale: false,
};
exports.defaultOptions = defaultOptions;


/***/ }),

/***/ "./src/jqueryWrapper.ts":
/*!******************************!*\
  !*** ./src/jqueryWrapper.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var defaultOptions_1 = __webpack_require__(/*! ./defaultOptions */ "./src/defaultOptions.ts");
var slider_1 = __webpack_require__(/*! ./slider */ "./src/slider.ts");
(function ($) {
    var methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('sliderData');
                var $node = $this;
                if (!data) {
                    options = $.extend({}, defaultOptions_1.defaultOptions, options);
                    var slider = new slider_1.default(options, this);
                    $(this).data('sliderData', {
                        node: $node,
                        slider: slider
                    });
                }
            });
        },
        getData: function () {
            return $(this).data('sliderData').slider.getData();
        },
        update: function (options) {
            return this.each(function () {
                $(this).data('sliderData').slider.update(options);
            });
        },
        destroy: function () {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('sliderData');
                $(window).unbind('.slider');
                data.node.remove();
                $this.removeData('sliderData');
            });
        },
        observe: function (listener) {
            var slider = $(this).data('sliderData').slider;
            slider.subscribe(listener);
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
$('.test').slider({
    end: 6,
    begin: 2,
    step: 9,
    tooltip: true,
    scale: true,
    range: true,
    reverse: true
});


/***/ }),

/***/ "./src/slider.ts":
/*!***********************!*\
  !*** ./src/slider.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var defaultOptions_1 = __webpack_require__(/*! ./defaultOptions */ "./src/defaultOptions.ts");
var Model_1 = __webpack_require__(/*! ./Model */ "./src/Model.ts");
var View_1 = __webpack_require__(/*! ./View */ "./src/View.ts");
var Presenter_1 = __webpack_require__(/*! ./Presenter */ "./src/Presenter.ts");
var Slider = (function () {
    function Slider(options, node) {
        options = Object.assign({}, defaultOptions_1.defaultOptions, options);
        this._model = new Model_1.default(options);
        options = Object.assign(options, this._model.getOptions());
        this._view = new View_1.default(options, node);
        this._presenter = new Presenter_1.default(this._model, this._view);
    }
    Slider.prototype.subscribe = function (func) {
        this._presenter.subscribe(func);
    };
    Slider.prototype.update = function (options) {
        this._presenter.update(options);
    };
    return Slider;
}());
exports.default = Slider;


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
    beginIsIgnored: 'If it is not range, options begin is ignored',
    beginIsOverEnd: 'Begin value should be less then end value',
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
    var begin = options.begin, end = options.end, range = options.range, min = options.min, max = options.max, step = options.step, reverse = options.reverse, customValues = options.customValues;
    var warns = {};
    var numbers = [min, max, step];
    if (begin) {
        numbers.push(begin);
    }
    if (end) {
        numbers.push(end);
    }
    if (!validateNumbers(numbers)) {
        warns.valuesAreNotNumbers = warnings.valuesAreNotNumbers;
    }
    if (!validateIntegers(numbers)) {
        warns.valuesAreNotInteger = warnings.valuesAreNotInteger;
    }
    if (min > max) {
        warns.minIsOverMax = warnings.minIsOverMax;
    }
    if (min == max) {
        warns.minIsEqualToMax = warnings.minIsEqualToMax;
    }
    if (!range && begin) {
        warns.beginIsIgnored = warnings.beginIsIgnored;
    }
    if (range && (begin > end)) {
        warns.beginIsOverEnd = warnings.beginIsOverEnd;
    }
    if (Math.abs(max - min) < Math.abs(step)) {
        warns.tooBigStep = warnings.tooBigStep;
    }
    if (step == 0) {
        warns.stepIsNull = warnings.stepIsNull;
    }
    if (typeof reverse != 'boolean') {
        warns.reverseIsNotBoolean = warnings.reverseIsNotBoolean;
    }
    if (customValues) {
        if (!Array.isArray(customValues)) {
            warns.customValuesIsNotArray = warnings.customValuesIsNotArray;
        }
        if (!warns.customValuesIsNotArray && customValues.length < 2) {
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
    var length = options.length, vertical = options.vertical, tooltip = options.tooltip, scale = options.scale;
    if (!length.match(/^\d{1,3}[.,]?\d*(px|em|rem|%|vh|vw)?$/i)) {
        warns.invalidLength = warnings.invalidLength;
    }
    if (typeof vertical != 'boolean') {
        warns.verticalIsNotBoolean = warnings.verticalIsNotBoolean;
    }
    if (typeof tooltip != 'boolean') {
        warns.tooltipIsNotBoolean = warnings.tooltipIsNotBoolean;
    }
    if (typeof scale != 'boolean') {
        warns.scaleIsNotBoolean = warnings.scaleIsNotBoolean;
    }
    return warns;
}
exports.validateView = validateView;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb25GdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZmF1bHRPcHRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9qcXVlcnlXcmFwcGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zbGlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhbGlkYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsOEZBQTREO0FBQzVELDRFQUFt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QUFpQixHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztLQUN4RDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFdUIsb0NBQVkiLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanF1ZXJ5V3JhcHBlci50c1wiKTtcbiIsImltcG9ydCB7IElPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZSwgTW9kZWxNZXNzYWdlIH0gZnJvbSAnLi9PYnNlcnZlcic7XHJcbmltcG9ydCB7IGlzTnVtZXJpYywgZ2V0TnVtYmVyT2ZTdGVwcywgZGVlcEVxdWFsIH0gZnJvbSAnLi9jb21tb25GdW5jdGlvbnMnO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZU1vZGVsLCBJV2FybmluZ3MgfSBmcm9tICcuL3ZhbGlkYXRpb25zJztcclxuXHJcbmludGVyZmFjZSBJTW9kZWxPcHRpb25zIHtcclxuICAgIGJlZ2luOiBudW1iZXI7XHJcbiAgICBlbmQ6IG51bWJlcjtcclxuICAgIHJhbmdlOiBib29sZWFuO1xyXG4gICAgbWluOiBudW1iZXI7XHJcbiAgICBtYXg6IG51bWJlcjtcclxuICAgIHN0ZXA6IG51bWJlcjtcclxuICAgIGN1c3RvbVZhbHVlcz86IHN0cmluZ1tdO1xyXG4gICAgcmV2ZXJzZTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElNb2RlbCBleHRlbmRzIElPYnNlcnZhYmxlIHtcclxuICAgIHVwZGF0ZShvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogdm9pZDtcclxuICAgIHNldEJlZ2luQnlPZmZzZXRSYWNpbyhyYWNpbzogbnVtYmVyKTogdm9pZDtcclxuICAgIHNldEVuZEJ5T2Zmc2V0UmFjaW8ocmFjaW86IG51bWJlcik6IHZvaWRcclxuXHJcbiAgICBnZXRPcHRpb25zKCk6IElNb2RlbE9wdGlvbnM7XHJcbiAgICBnZXRXYXJuaW5ncygpOiBJV2FybmluZ3M7XHJcbn1cclxuXHJcblxyXG5jbGFzcyBNb2RlbCBleHRlbmRzIE9ic2VydmFibGU8TW9kZWxNZXNzYWdlPiBpbXBsZW1lbnRzIElNb2RlbCB7XHJcbiAgICBwcml2YXRlIF9iZWdpbjogbnVtYmVyIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2VuZDogbnVtYmVyIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX3JhbmdlOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfbWluOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9tYXg6IG51bWJlcjsgICBcclxuICAgIHByaXZhdGUgX3N0ZXA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2N1c3RvbVZhbHVlcz86IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfcmV2ZXJzZTogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIF93YXJuaW5nczogSVdhcm5pbmdzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGZ1bGxPcHRpb25zOiBJTW9kZWxPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIGxldCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnM7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdGUoZnVsbE9wdGlvbnMpO1xyXG4gICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMubm9ybWFsaXplKGZ1bGxPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKHZhbGlkT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUob3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwcmV2T3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGUoT2JqZWN0LmFzc2lnbih7fSwgcHJldk9wdGlvbnMsIG9wdGlvbnMpKVxyXG4gICAgICAgIGxldCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLm5vcm1hbGl6ZShvcHRpb25zLCBwcmV2T3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKHZhbGlkT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vINC80L7QttC90L4g0YPQsdGA0LDRgtGMXHJcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBcclxuICAgICAgICAgICAgdHlwZTogJ05FV19EQVRBJyxcclxuICAgICAgICAgICAgb3B0aW9uczogdGhpcy5nZXRPcHRpb25zKClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXRFbmRCeU9mZnNldFJhY2lvKHJhY2lvOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdmFsdWU6IG51bWJlciA9IHRoaXMuZmluZFZhbHVlQnlPZmZzZXRSYWNpbyhyYWNpbyk7XHJcbiAgICAgICAgaWYgKCB2YWx1ZSA8IHRoaXMuX2JlZ2luICkgeyB2YWx1ZSA9IHRoaXMuX2JlZ2luIH1cclxuICAgICAgICB0aGlzLl9lbmQgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBcclxuICAgICAgICAgICAgdHlwZTogJ05FV19WQUxVRScsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXRCZWdpbkJ5T2Zmc2V0UmFjaW8ocmFjaW86IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fcmFuZ2UpIHsgcmV0dXJuIH07XHJcblxyXG4gICAgICAgIGxldCB2YWx1ZTogbnVtYmVyID0gdGhpcy5maW5kVmFsdWVCeU9mZnNldFJhY2lvKHJhY2lvKTtcclxuICAgICAgICBpZiAoIHZhbHVlID4gdGhpcy5fZW5kICkgeyB2YWx1ZSA9IHRoaXMuX2VuZCB9XHJcbiAgICAgICAgdGhpcy5fYmVnaW4gPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBcclxuICAgICAgICAgICAgdHlwZTogJ05FV19WQUxVRScsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgZmluZFZhbHVlQnlPZmZzZXRSYWNpbyhyYWNpbzogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgdmFsdWU6IG51bWJlcjtcclxuXHJcbiAgICAgICAgdmFsdWUgPSByYWNpbyAqICh0aGlzLl9tYXggLSB0aGlzLl9taW4pO1xyXG4gICAgICAgIHZhbHVlID0gIXRoaXMuX3JldmVyc2UgPyBcclxuICAgICAgICB0aGlzLl9taW4gKyB2YWx1ZSA6XHJcbiAgICAgICAgdGhpcy5fbWF4IC0gdmFsdWU7XHJcblxyXG4gICAgICAgIHZhbHVlID0gdGhpcy5maW5kQ2xvc2VzdFZhbHVlKHZhbHVlLCB0aGlzLmdldE9wdGlvbnMoKSk7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBiZWdpbjogdGhpcy5fYmVnaW4sXHJcbiAgICAgICAgICAgIGVuZDogdGhpcy5fZW5kLFxyXG4gICAgICAgICAgICByYW5nZTogdGhpcy5fcmFuZ2UsXHJcbiAgICAgICAgICAgIG1pbjogdGhpcy5fbWluLFxyXG4gICAgICAgICAgICBtYXg6IHRoaXMuX21heCwgICBcclxuICAgICAgICAgICAgc3RlcDogdGhpcy5fc3RlcCxcclxuICAgICAgICAgICAgY3VzdG9tVmFsdWVzOiB0aGlzLl9jdXN0b21WYWx1ZXMsXHJcbiAgICAgICAgICAgIHJldmVyc2U6IHRoaXMuX3JldmVyc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRXYXJuaW5ncygpOiBJV2FybmluZ3Mge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl93YXJuaW5ncyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgc2V0T3B0aW9ucyhvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYmVnaW4gPSBvcHRpb25zLmJlZ2luO1xyXG4gICAgICAgIHRoaXMuX2VuZCA9IG9wdGlvbnMuZW5kO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gb3B0aW9ucy5yYW5nZTtcclxuICAgICAgICB0aGlzLl9taW4gPSBvcHRpb25zLm1pbjtcclxuICAgICAgICB0aGlzLl9tYXggPSBvcHRpb25zLm1heDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVZhbHVlcyA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzOyAgICAgIFxyXG4gICAgICAgIHRoaXMuX3JldmVyc2UgPSBvcHRpb25zLnJldmVyc2U7ICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZShvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuX3dhcm5pbmdzID0ge307XHJcbiAgICAgICAgdGhpcy5fd2FybmluZ3MgPSB2YWxpZGF0ZU1vZGVsKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoIE9iamVjdC5rZXlzKHRoaXMuX3dhcm5pbmdzKS5sZW5ndGggIT0gMCApIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB3YXJuaW5nczogSVdhcm5pbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fd2FybmluZ3MpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1dBUk5JTkdTJyxcclxuICAgICAgICAgICAgICAgIHdhcm5pbmdzOiB3YXJuaW5nc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBub3JtYWxpemUob3B0aW9uczogSU1vZGVsT3B0aW9ucywgYmFzZU9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiBJTW9kZWxPcHRpb25zIHtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGJhc2VPcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICBsZXQgeyBiZWdpbiwgZW5kLCByYW5nZSwgbWluLCBtYXgsIHN0ZXAsIHJldmVyc2UsIGN1c3RvbVZhbHVlcyB9ID0gb3B0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLl93YXJuaW5ncy5jdXN0b21WYWx1ZXNJc05vdEFycmF5IHx8IHRoaXMuX3dhcm5pbmdzLmN1c3RvbVZhbHVlc0lzVG9vU21hbGwgKSB7XHJcbiAgICAgICAgICAgIGN1c3RvbVZhbHVlcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggY3VzdG9tVmFsdWVzICkge1xyXG4gICAgICAgICAgICBtaW4gPSAwO1xyXG4gICAgICAgICAgICBtYXggPSBjdXN0b21WYWx1ZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1pbiA9IHRoaXMubm9ybWFsaXplTnVtYmVyKG1pbiwgYmFzZU9wdGlvbnMubWluKTtcclxuICAgICAgICBtYXggPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihtYXgsIGJhc2VPcHRpb25zLm1heCk7XHJcbiAgICAgICAgc3RlcCA9IHRoaXMubm9ybWFsaXplTnVtYmVyKHN0ZXAsIGJhc2VPcHRpb25zLnN0ZXApO1xyXG5cclxuICAgICAgICBpZiAoIHRoaXMuX3dhcm5pbmdzLm1pbklzT3Zlck1heCApIHtcclxuICAgICAgICAgICAgW21pbiwgbWF4XSA9IFttYXgsIG1pbl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHRoaXMuX3dhcm5pbmdzLm1pbklzRXF1YWxUb01heCApIHtcclxuICAgICAgICAgICAgbWluID0gYmFzZU9wdGlvbnMubWluO1xyXG4gICAgICAgICAgICBtYXggPSBiYXNlT3B0aW9ucy5tYXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHRoaXMuX3dhcm5pbmdzLnN0ZXBJc051bGwgfHwgdGhpcy5fd2FybmluZ3MudG9vQmlnU3RlcCApIHtcclxuICAgICAgICAgICAgc3RlcCA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGVwID0gTWF0aC5hYnMoc3RlcCk7XHJcbiAgICAgICAgcmV2ZXJzZSA9ICEhcmV2ZXJzZTtcclxuICAgICAgICByYW5nZSA9ICEhcmFuZ2U7XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5fd2FybmluZ3MuYmVnaW5Jc092ZXJFbmQgKSB7XHJcbiAgICAgICAgICAgIFtiZWdpbiwgZW5kXSA9IFtlbmQsIGJlZ2luXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZW5kID0gdGhpcy5ub3JtYWxpemVOdW1iZXIoZW5kLCBtYXgpO1xyXG4gICAgICAgIGVuZCA9IHRoaXMuZmluZENsb3Nlc3RWYWx1ZShlbmQsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoICFyYW5nZSApIHtcclxuICAgICAgICAgICAgYmVnaW4gPSBtaW47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYmVnaW4gPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihiZWdpbiwgbWluKTtcclxuICAgICAgICAgICAgYmVnaW4gPSB0aGlzLmZpbmRDbG9zZXN0VmFsdWUoYmVnaW4sIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHsgYmVnaW4sIGVuZCwgcmFuZ2UsIG1pbiwgbWF4LCBzdGVwLCByZXZlcnNlLCBjdXN0b21WYWx1ZXMgfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBub3JtYWxpemVOdW1iZXIodmFsdWU6IG51bWJlciwgZGVmYXVsdFZhbDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbmV3VmFsdWU6IG51bWJlciA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoICFpc051bWVyaWModmFsdWUpICkge1xyXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IGRlZmF1bHRWYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ld1ZhbHVlID0gTWF0aC50cnVuYygrbmV3VmFsdWUpO1xyXG4gICAgICAgIHJldHVybiBuZXdWYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kQ2xvc2VzdFZhbHVlKHZhbHVlOiBudW1iZXIsIG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBwcmV2VmFsdWU6IG51bWJlcjtcclxuICAgICAgICBsZXQgbmV4dFZhbHVlOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHsgbWluLCBtYXgsIHN0ZXAsIHJldmVyc2UgfSA9IG9wdGlvbnM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHZhbHVlIDw9IG1pbikgeyByZXR1cm4gbWluIH07XHJcbiAgICAgICAgaWYgKHZhbHVlID49IG1heCkgeyByZXR1cm4gbWF4IH07XHJcblxyXG4gICAgICAgIGlmICghcmV2ZXJzZSkge1xyXG4gICAgICAgICAgICBwcmV2VmFsdWUgPSBNYXRoLnRydW5jKCAodmFsdWUgLSBtaW4pIC8gc3RlcCApICogc3RlcDtcclxuICAgICAgICAgICAgbmV4dFZhbHVlID0gTWF0aC50cnVuYyggKHZhbHVlIC0gbWluKSAvIHN0ZXAgKSAqIHN0ZXAgKyBzdGVwO1xyXG5cclxuICAgICAgICAgICAgbmV4dFZhbHVlID0gbmV4dFZhbHVlIDwgbWF4ID8gbmV4dFZhbHVlIDogbWF4O1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlIDwgcHJldlZhbHVlICsgKG5leHRWYWx1ZSAtIHByZXZWYWx1ZSkgLyAyID8gcHJldlZhbHVlIDogbmV4dFZhbHVlO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcmV2VmFsdWUgPSBtYXggLSBNYXRoLnRydW5jKCAobWF4IC0gdmFsdWUpIC8gc3RlcCApICogc3RlcCAtIHN0ZXA7XHJcbiAgICAgICAgICAgIG5leHRWYWx1ZSA9IG1heCAtIE1hdGgudHJ1bmMoIChtYXggLSB2YWx1ZSkgLyBzdGVwICkgKiBzdGVwO1xyXG5cclxuICAgICAgICAgICAgcHJldlZhbHVlID0gcHJldlZhbHVlID4gbWluID8gcHJldlZhbHVlIDogbWluO1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlIDwgbmV4dFZhbHVlIC0gKG5leHRWYWx1ZSAtIHByZXZWYWx1ZSkgLyAyID8gcHJldlZhbHVlIDogbmV4dFZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgSU1vZGVsLCBJTW9kZWxPcHRpb25zIH07XHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG4iLCJpbXBvcnQgeyBJTW9kZWxPcHRpb25zIH0gZnJvbSBcIi4vTW9kZWxcIjtcclxuaW1wb3J0IHsgSVZpZXdPcHRpb25zIH0gZnJvbSBcIi4vVmlld1wiO1xyXG5pbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gXCIuL2RlZmF1bHRPcHRpb25zXCI7XHJcbmltcG9ydCB7IElXYXJuaW5ncyB9IGZyb20gXCIuL3ZhbGlkYXRpb25zXCI7XHJcblxyXG4vLyBNZXNzYWdlc1xyXG50eXBlIE5ld1ZhbHVlID0ge3R5cGU6ICdORVdfVkFMVUUnLCBvcHRpb25zOiBJTW9kZWxPcHRpb25zfTtcclxudHlwZSBOZXdEYXRhID0ge3R5cGU6ICdORVdfREFUQScsIG9wdGlvbnM6IElNb2RlbE9wdGlvbnN9O1xyXG50eXBlIExhc3RUaHVtYk1vdmVkID0ge3R5cGU6ICdMQVNUX1RIVU1CX01PVkVEJywgb2Zmc2V0UmFjaW86IG51bWJlcn07XHJcbnR5cGUgRmlyc3RUaHVtYk1vdmVkID0ge3R5cGU6ICdGSVJTVF9USFVNQl9NT1ZFRCcsIG9mZnNldFJhY2lvOiBudW1iZXJ9O1xyXG50eXBlIFdhcm5pbmdzID0ge3R5cGU6ICdXQVJOSU5HUycsIHdhcm5pbmdzOiBJV2FybmluZ3N9O1xyXG5cclxudHlwZSBNb2RlbE1lc3NhZ2UgPSBOZXdWYWx1ZSB8IE5ld0RhdGEgfCBXYXJuaW5ncztcclxudHlwZSBWaWV3TWVzc2FnZSA9IExhc3RUaHVtYk1vdmVkIHwgRmlyc3RUaHVtYk1vdmVkIHwgV2FybmluZ3M7XHJcblxyXG5cclxuXHJcbi8vIE9ic2VydmVcclxuaW50ZXJmYWNlIElPYnNlcnZhYmxlIHtcclxuICAgIHN1YnNjcmliZShsaXN0ZW5lcjogRnVuY3Rpb24pOiB2b2lkO1xyXG4gICAgbm90aWZ5KC4uLmFyZ3M6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcblxyXG50eXBlIEZuPEEsIEI+ID0gKGE6IEEpID0+IEI7XHJcblxyXG5jbGFzcyBPYnNlcnZhYmxlPEE+IGltcGxlbWVudHMgSU9ic2VydmFibGUge1xyXG4gICAgcHJvdGVjdGVkIGxpc3RlbmVyczogRm48QSwgdm9pZD5bXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBzdWJzY3JpYmUobGlzdGVuZXI6IEZuPEEsIHZvaWQ+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5vdGlmeShtZXNzYWdlOiBBKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVycykge1xyXG4gICAgICAgICAgICBsaXN0ZW5lcihtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBPYnNlcnZhYmxlUHJlc2VudGVyIGltcGxlbWVudHMgSU9ic2VydmFibGUge1xyXG4gICAgcHJvdGVjdGVkIGxpc3RlbmVyczogRnVuY3Rpb25bXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBzdWJzY3JpYmUobGlzdGVuZXI6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5vdGlmeShvcHRpb25zPzogSU9wdGlvbnMsIHdhcm5pbmdzPzogSVdhcm5pbmdzKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVycykge1xyXG4gICAgICAgICAgICBsaXN0ZW5lcihvcHRpb25zLCB3YXJuaW5ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgSU9ic2VydmFibGUsIE9ic2VydmFibGUsIE1vZGVsTWVzc2FnZSwgVmlld01lc3NhZ2UsIE9ic2VydmFibGVQcmVzZW50ZXJ9O1xyXG5cclxuXHJcblxyXG4vKlxyXG4vLyBPYnNlcnZlXHJcbmludGVyZmFjZSBJT2JzZXJ2YWJsZSB7XHJcbiAgICBzdWJzY3JpYmUobGlzdGVuZXI6IGFueSk6IHZvaWQ7XHJcbiAgICAvL2RldGFjaChsaXN0ZW5lcjogYW55KTogdm9pZDtcclxuICAgIG5vdGlmeShtZXNzYWdlOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBPYnNlcnZhYmxlIGltcGxlbWVudHMgSU9ic2VydmFibGUge1xyXG4gICAgcHJvdGVjdGVkIGxpc3RlbmVyczogRnVuY3Rpb25bXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBzdWJzY3JpYmUobGlzdGVuZXI6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4vKiAgICAgcHVibGljIGRldGFjaChsaXN0ZW5lcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lckluZGV4OiBudW1iZXIgPSB0aGlzLmxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycy5zcGxpY2UobGlzdGVuZXJJbmRleCwgMSk7XHJcbiAgICB9ICovXHJcbi8qXHJcbiAgICBwdWJsaWMgbm90aWZ5KG1lc3NhZ2U6IElNZXNzYWdlKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVycykge1xyXG4gICAgICAgICAgICBsaXN0ZW5lcihtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0qLyIsImltcG9ydCB7IElPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQgTW9kZWwsIHsgSU1vZGVsLCBJTW9kZWxPcHRpb25zIH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCBWaWV3LCB7IElWaWV3IH0gZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IHsgSU9ic2VydmFibGUsIE9ic2VydmFibGUsIE1vZGVsTWVzc2FnZSwgVmlld01lc3NhZ2UsIE9ic2VydmFibGVQcmVzZW50ZXIgfSAgZnJvbSAnLi9PYnNlcnZlcic7XHJcbmltcG9ydCB7IElXYXJuaW5ncyB9IGZyb20gJy4vdmFsaWRhdGlvbnMnO1xyXG5cclxuXHJcbmludGVyZmFjZSBJUHJlc2VudGVyIGV4dGVuZHMgSU9ic2VydmFibGUge1xyXG4gICAgdXBkYXRlKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZDtcclxuXHJcbiAgICBnZXRPcHRpb25zKCk6IElPcHRpb25zO1xyXG4gICAgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzO1xyXG59XHJcblxyXG5jbGFzcyBQcmVzZW50ZXIgZXh0ZW5kcyBPYnNlcnZhYmxlUHJlc2VudGVyIGltcGxlbWVudHMgSVByZXNlbnRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW9kZWw6IElNb2RlbDtcclxuICAgIHByaXZhdGUgX3ZpZXc6IElWaWV3O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1vZGVsOiBJTW9kZWwsIHZpZXc6IElWaWV3KSB7XHJcblxyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XHJcblxyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5fbW9kZWwuc3Vic2NyaWJlKGZ1bmN0aW9uKG1lc3NhZ2U6IE1vZGVsTWVzc2FnZSk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ05FV19WQUxVRSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fdmlldy51cGRhdGUobWVzc2FnZS5vcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm5vdGlmeSh0aGF0LmdldE9wdGlvbnMoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fdmlldy5zdWJzY3JpYmUoZnVuY3Rpb24obWVzc2FnZTogVmlld01lc3NhZ2UpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdMQVNUX1RIVU1CX01PVkVEJzpcclxuICAgICAgICAgICAgICAgICAgICAhdGhhdC5fbW9kZWwuZ2V0T3B0aW9ucygpLnJldmVyc2UgP1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX21vZGVsLnNldEVuZEJ5T2Zmc2V0UmFjaW8obWVzc2FnZS5vZmZzZXRSYWNpbykgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX21vZGVsLnNldEJlZ2luQnlPZmZzZXRSYWNpbyhtZXNzYWdlLm9mZnNldFJhY2lvKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdGSVJTVF9USFVNQl9NT1ZFRCc6XHJcbiAgICAgICAgICAgICAgICAgICAgIXRoYXQuX21vZGVsLmdldE9wdGlvbnMoKS5yZXZlcnNlID9cclxuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9tb2RlbC5zZXRCZWdpbkJ5T2Zmc2V0UmFjaW8obWVzc2FnZS5vZmZzZXRSYWNpbykgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX21vZGVsLnNldEVuZEJ5T2Zmc2V0UmFjaW8obWVzc2FnZS5vZmZzZXRSYWNpbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgaXNNb2RlbFVwZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgaXNWaWV3VXBkYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgbW9kZWxPcHRpb25zOiBzdHJpbmdbXSA9IFsndmFsdWUnLCAnbWluJywgJ21heCcsICdzdGVwJywgJ3JldmVyc2UnLCAncmFuZ2UnLCAnY3VzdG9tVmFsdWVzJ107XHJcblxyXG4gICAgICAgIG1vZGVsT3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KGl0ZW0pICkge1xyXG4gICAgICAgICAgICAgICAgaXNNb2RlbFVwZGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChpc01vZGVsVXBkYXRlZCkgeyBcclxuICAgICAgICAgICAgdGhpcy5fbW9kZWwudXBkYXRlKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBpc1ZpZXdVcGRhdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgdmlld09wdGlvbnM6IHN0cmluZ1tdID0gWydsZW5ndGgnLCAndmVydGljYWwnLCAndG9vbHRpcCcsICdzY2FsZSddO1xyXG5cclxuICAgICAgICB2aWV3T3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KGl0ZW0pICkge1xyXG4gICAgICAgICAgICAgICAgaXNWaWV3VXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGlzVmlld1VwZGF0ZWQpIHtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucywgdGhpcy5fbW9kZWwuZ2V0T3B0aW9ucygpKTtcclxuICAgICAgICAgICAgdGhpcy5fdmlldy5yZXJlbmRlcihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc01vZGVsVXBkYXRlZCB8fCBpc1ZpZXdVcGRhdGVkKSB7XHJcblxyXG4gICAgICAgICAgICAvLyEhISEhXHJcbiAgICAgICAgICAgIGxldCB3YXJuaW5ncyA9IHRoaXMuZ2V0V2FybmluZ3MoKTtcclxuICAgICAgICAgICAgaWYgKCBPYmplY3Qua2V5cyh3YXJuaW5ncykubGVuZ3RoICE9IDAgKSB7IHdhcm5pbmdzID0gdW5kZWZpbmVkIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KCB0aGlzLmdldE9wdGlvbnMoKSwgd2FybmluZ3MgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRPcHRpb25zKCk6IElPcHRpb25zIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fbW9kZWwuZ2V0T3B0aW9ucygpLCB0aGlzLl92aWV3LmdldE9wdGlvbnMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFdhcm5pbmdzKCk6IElXYXJuaW5ncyB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX21vZGVsLmdldFdhcm5pbmdzKCksIHRoaXMuX3ZpZXcuZ2V0V2FybmluZ3MoKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IElQcmVzZW50ZXIgfTtcclxuZXhwb3J0IGRlZmF1bHQgUHJlc2VudGVyOyIsImltcG9ydCB7IElPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZSwgVmlld01lc3NhZ2UgfSBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IHsgaXNOdW1lcmljLCBnZXROdW1iZXJPZlN0ZXBzIH0gZnJvbSAnLi9jb21tb25GdW5jdGlvbnMnO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZVZpZXcsIElXYXJuaW5ncyB9IGZyb20gJy4vdmFsaWRhdGlvbnMnO1xyXG5pbXBvcnQgeyBJTW9kZWwsIElNb2RlbE9wdGlvbnMgfSBmcm9tICcuL01vZGVsJztcclxuXHJcblxyXG5pbnRlcmZhY2UgSVZpZXdPcHRpb25zIHtcclxuICAgIGxlbmd0aDogc3RyaW5nO1xyXG4gICAgdmVydGljYWw6IGJvb2xlYW47XHJcbiAgICB0b29sdGlwOiBib29sZWFuO1xyXG4gICAgc2NhbGU6IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBJVmlldyBleHRlbmRzIElPYnNlcnZhYmxlIHtcclxuICAgIHVwZGF0ZShvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogdm9pZDtcclxuICAgIHJlcmVuZGVyKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZDtcclxuXHJcbiAgICBnZXRPcHRpb25zKCk6IElWaWV3T3B0aW9ucztcclxuICAgIGdldFdhcm5pbmdzKCk6IElXYXJuaW5ncztcclxufVxyXG5cclxuY2xhc3MgVmlldyBleHRlbmRzIE9ic2VydmFibGU8Vmlld01lc3NhZ2U+IGltcGxlbWVudHMgSVZpZXcgIHtcclxuICAgIFt4OiBzdHJpbmddOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGVuZ3RoOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF92ZXJ0aWNhbDogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIF9zbGlkZXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfdGh1bWJGaXJzdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdGh1bWJMYXN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9iYXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcEZpcnN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwTGFzdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGU/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVUaHVtYjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF93YXJuaW5nczogSVdhcm5pbmdzO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJT3B0aW9ucywgc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGUob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NsaWRlciA9IHNsaWRlck5vZGU7XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcicpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1aWxkKG9wdGlvbnMpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUob3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0VGh1bWJzKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuc2V0QmFyUG9zaXRpb24oKTtcclxuICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCB8fCB0aGlzLl90b29sdGlwRmlyc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUb29sdGlwVmFsdWVzKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHJlcmVuZGVyKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0T3B0aW9ucygpLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZShvcHRpb25zKTtcclxuICAgICAgICB0aGlzLnJlYnVpbGQob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRPcHRpb25zKCk6IElWaWV3T3B0aW9ucyB7XHJcbiAgICAgICAgbGV0IHRvb2x0aXAgPSAhIXRoaXMuX3Rvb2x0aXAgfHwgISF0aGlzLl90b29sdGlwRmlyc3Q7XHJcbiAgICAgICAgbGV0IHNjYWxlID0gISF0aGlzLl9zY2FsZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGVuZ3RoOiAgdGhpcy5fbGVuZ3RoLFxyXG4gICAgICAgICAgICB2ZXJ0aWNhbDogdGhpcy5fdmVydGljYWwsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IHRvb2x0aXAsXHJcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldFdhcm5pbmdzKCk6IElXYXJuaW5ncyB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3dhcm5pbmdzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVUaHVtYkRvd24oZXZlbnQpOiB2b2lkIHtcclxuICAgICAgICAvLyDQv9GA0LXQtNC+0YLQstGA0LDRgtC40YLRjCDQt9Cw0L/Rg9GB0Log0LLRi9C00LXQu9C10L3QuNGPICjQtNC10LnRgdGC0LLQuNC1INCx0YDQsNGD0LfQtdGA0LApXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGh1bWIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZVRodW1iTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlVGh1bWJVcCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUaHVtYk1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVUaHVtYlVwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVUaHVtYk1vdmUoZXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSB0aGlzLmdldExlbmd0aEluUHgoKTtcclxuICAgICAgICBsZXQgb2Zmc2V0OiBudW1iZXIgPSB0aGlzLmdldE9mZnNldEluUHgoKTtcclxuICAgICAgICBsZXQgZXZlbnRQb3M6IG51bWJlcjtcclxuICAgICAgICBsZXQgbmV3VGh1bWJQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChldmVudC50b3VjaGVzKSB7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gIXRoaXMuX3ZlcnRpY2FsID8gZXZlbnQudG91Y2hlc1swXS5jbGllbnRYIDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gIXRoaXMuX3ZlcnRpY2FsID8gZXZlbnQuY2xpZW50WCA6IGV2ZW50LmNsaWVudFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXdUaHVtYlBvc2l0aW9uID0gKGV2ZW50UG9zIC0gb2Zmc2V0KSAvIGxlbmd0aDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIHRoaXMuX2FjdGl2ZVRodW1iID09IHRoaXMuX3RodW1iTGFzdCApIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdMQVNUX1RIVU1CX01PVkVEJyxcclxuICAgICAgICAgICAgICAgIG9mZnNldFJhY2lvOiBuZXdUaHVtYlBvc2l0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0ZJUlNUX1RIVU1CX01PVkVEJyxcclxuICAgICAgICAgICAgICAgIG9mZnNldFJhY2lvOiBuZXdUaHVtYlBvc2l0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlU2xpZGVyQ2xpY2soZXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSB0aGlzLmdldExlbmd0aEluUHgoKTtcclxuICAgICAgICBsZXQgb2Zmc2V0OiBudW1iZXIgPSB0aGlzLmdldE9mZnNldEluUHgoKTtcclxuICAgICAgICBsZXQgZXZlbnRQb3M6IG51bWJlcjtcclxuICAgICAgICBsZXQgbmV3VGh1bWJQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgICAgIGxldCBpc0xhc3RNb3ZlZDogYm9vbGVhbjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZXZlbnQudG91Y2hlcykge1xyXG4gICAgICAgICAgICBldmVudFBvcyA9ICF0aGlzLl92ZXJ0aWNhbCA/IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudFBvcyA9ICF0aGlzLl92ZXJ0aWNhbCA/IGV2ZW50LmNsaWVudFggOiBldmVudC5jbGllbnRZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0LLQvtC30LLRgCAlLCDRgtC+ICogMTAwXHJcbiAgICAgICAgbmV3VGh1bWJQb3NpdGlvbiA9IChldmVudFBvcyAtIG9mZnNldCkgLyBsZW5ndGg7XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5fdGh1bWJGaXJzdC5jbGFzc0xpc3QuY29udGFpbnMoJ3NsaWRlcl9fdGh1bWJfZGlzYWJsZWQnKSApIHtcclxuICAgICAgICAgICAgaXNMYXN0TW92ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHRoaXMuX3RodW1iTGFzdC5jbGFzc0xpc3QuY29udGFpbnMoJ3NsaWRlcl9fdGh1bWJfZGlzYWJsZWQnKSApIHtcclxuICAgICAgICAgICAgaXNMYXN0TW92ZWQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdG9wTGVmdDogc3RyaW5nID0gIXRoaXMuX3ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XHJcblxyXG4gICAgICAgICAgICBsZXQgZmlyc3RUaHVtYlBvczogbnVtYmVyID0gcGFyc2VJbnQoIHRoaXMuX3RodW1iRmlyc3Quc3R5bGVbdG9wTGVmdF0gKTtcclxuICAgICAgICAgICAgbGV0IGxhc3RUaHVtYlBvczogbnVtYmVyID0gcGFyc2VJbnQoIHRoaXMuX3RodW1iTGFzdC5zdHlsZVt0b3BMZWZ0XSApO1xyXG5cclxuICAgICAgICAgICAgbGV0IGlzTGFzdENsb3NlcjogYm9vbGVhbjtcclxuICAgICAgICAgICAgaXNMYXN0Q2xvc2VyID0gTWF0aC5hYnMoZmlyc3RUaHVtYlBvcy8xMDAgLSBuZXdUaHVtYlBvc2l0aW9uKSA+IE1hdGguYWJzKGxhc3RUaHVtYlBvcy8xMDAgLSBuZXdUaHVtYlBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGlzTGFzdE1vdmVkID0gaXNMYXN0Q2xvc2VyOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBpc0xhc3RNb3ZlZCApIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdMQVNUX1RIVU1CX01PVkVEJyxcclxuICAgICAgICAgICAgICAgIG9mZnNldFJhY2lvOiBuZXdUaHVtYlBvc2l0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0ZJUlNUX1RIVU1CX01PVkVEJyxcclxuICAgICAgICAgICAgICAgIG9mZnNldFJhY2lvOiBuZXdUaHVtYlBvc2l0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVUaHVtYlVwKGV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlVGh1bWJVcCk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVUaHVtYk1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVUaHVtYlVwKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRodW1iTW92ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVRodW1iID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGQob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IHZhbGlkTGVuZ3RoOiBzdHJpbmcgPSB0aGlzLl9sZW5ndGggfHwgZGVmYXVsdE9wdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuX2xlbmd0aCA9IHRoaXMuZ2V0VmFsaWRMZW5ndGgob3B0aW9ucy5sZW5ndGgsIHZhbGlkTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy52ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLndpZHRoID0gdGhpcy5fbGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfdmVydGljYWwnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS5oZWlnaHQgPSB0aGlzLl9sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS53aWR0aCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfdmVydGljYWwnKTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl9ob3Jpem9udGFsJyk7ICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fYmFyID0gdGhpcy5idWlsZE5vZGUodGhpcy5fc2xpZGVyLCAnc2xpZGVyX19iYXInKTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZFRodW1icyhvcHRpb25zKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRCYXJQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCApIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFRvb2x0aXBzKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoIG9wdGlvbnMuc2NhbGUgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRTY2FsZShvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZVRodW1iRG93biA9IHRoaXMuaGFuZGxlVGh1bWJEb3duLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVUaHVtYk1vdmUgPSB0aGlzLmhhbmRsZVRodW1iTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGh1bWJVcCA9IHRoaXMuaGFuZGxlVGh1bWJVcC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2xpZGVyQ2xpY2sgPSB0aGlzLmhhbmRsZVNsaWRlckNsaWNrLmJpbmQodGhpcyk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl90aHVtYkZpcnN0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5oYW5kbGVUaHVtYkRvd24pO1xyXG4gICAgICAgIHRoaXMuX3RodW1iRmlyc3QuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5oYW5kbGVUaHVtYkRvd24pO1xyXG5cclxuICAgICAgICB0aGlzLl90aHVtYkxhc3QuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmhhbmRsZVRodW1iRG93bik7XHJcbiAgICAgICAgdGhpcy5fdGh1bWJMYXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVTbGlkZXJDbGljayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWJ1aWxkKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHByZXZPcHRpb25zOiBJVmlld09wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJldk9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcykge1xyXG4gICAgICAgICAgICBpZiAoa2V5ICE9ICdfc2xpZGVyJykge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB0aGlzLnJlbW92ZU5vZGUodGhpc1trZXldKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2gge30gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5idWlsZChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlKG9wdGlvbnM6IElWaWV3T3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3dhcm5pbmdzID0ge307XHJcbiAgICAgICAgdGhpcy5fd2FybmluZ3MgPSB2YWxpZGF0ZVZpZXcob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICggT2JqZWN0LmtleXModGhpcy5fd2FybmluZ3MpLmxlbmd0aCAhPSAwICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHdhcm5pbmdzOiBJV2FybmluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl93YXJuaW5ncyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnV0FSTklOR1MnLFxyXG4gICAgICAgICAgICAgICAgd2FybmluZ3M6IHdhcm5pbmdzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRUaHVtYnMob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBsZXQgeyByYW5nZSwgcmV2ZXJzZSB9ID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLl90aHVtYkZpcnN0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYicsICdzbGlkZXJfX3RodW1iX2ZpcnN0Jyk7XHJcbiAgICAgICAgdGhpcy5fdGh1bWJMYXN0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYicsICdzbGlkZXJfX3RodW1iX2xhc3QnKTtcclxuXHJcbiAgICAgICAgaWYgKCAhcmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIGlmICggIXJldmVyc2UgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90aHVtYkZpcnN0LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fdGh1bWJfZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RodW1iTGFzdC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3RodW1iX2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VGh1bWJzKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VGh1bWJzKG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBsZXQgeyBiZWdpbiwgZW5kLCByZXZlcnNlIH0gPSBvcHRpb25zO1xyXG4gICAgICAgIGxldCBiZWdpblBvc2l0aW9uOiBzdHJpbmcgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKGJlZ2luLCBvcHRpb25zKTtcclxuICAgICAgICBsZXQgZW5kUG9zaXRpb246IHN0cmluZyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oZW5kLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKCAhcmV2ZXJzZSApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMuX3RodW1iRmlyc3QsIGJlZ2luUG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24odGhpcy5fdGh1bWJMYXN0LCBlbmRQb3NpdGlvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMuX3RodW1iRmlyc3QsIGVuZFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMuX3RodW1iTGFzdCwgYmVnaW5Qb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0QmFyUG9zaXRpb24oKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHN0YXJ0OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGxldCB0b3BMZWZ0OiBzdHJpbmcgPSAhdGhpcy5fdmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcclxuICAgICAgICBsZXQgd2lkdGhIZWlnaHQ6IHN0cmluZyA9ICF0aGlzLl92ZXJ0aWNhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcclxuXHJcbiAgICAgICAgc3RhcnQgPSB0aGlzLl90aHVtYkZpcnN0LnN0eWxlW3RvcExlZnRdO1xyXG4gICAgICAgIGxlbmd0aCA9IHRoaXMuX3RodW1iTGFzdC5zdHlsZVt0b3BMZWZ0XS5zbGljZSgwLCAtMSkgLSB0aGlzLl90aHVtYkZpcnN0LnN0eWxlW3RvcExlZnRdLnNsaWNlKDAsIC0xKSAgKyAnJSc7XHJcblxyXG4gICAgICAgIHRoaXMuX2Jhci5zdHlsZVt0b3BMZWZ0XSA9IHN0YXJ0O1xyXG4gICAgICAgIHRoaXMuX2Jhci5zdHlsZVt3aWR0aEhlaWdodF0gPSBsZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZFRvb2x0aXBzKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdG9vbHRpcEZpcnN0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5fdGh1bWJGaXJzdCwgJ3NsaWRlcl9fdG9vbHRpcCcsICdzbGlkZXJfX3Rvb2x0aXBfZmlyc3QnKTtcclxuICAgICAgICB0aGlzLl90b29sdGlwTGFzdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3RodW1iTGFzdCwgJ3NsaWRlcl9fdG9vbHRpcCcsICdzbGlkZXJfX3Rvb2x0aXBfbGFzdCcpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFRvb2x0aXBWYWx1ZXMob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZFNjYWxlKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHsgbWluLCBtYXgsIHN0ZXAsIHJldmVyc2UsIGN1c3RvbVZhbHVlcyB9ID0gb3B0aW9ucztcclxuICAgICAgICBsZXQgc2NhbGU6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGxldCBkaXZpc2lvbjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGxldCBpbmRlbnQ6IG51bWJlciB8IHN0cmluZztcclxuICAgICAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSBtYXggLSBtaW47XHJcblxyXG4gICAgICAgIHNjYWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgc2NhbGUuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZScpO1xyXG5cclxuICAgICAgICBmb3IgKCBsZXQgaTogbnVtYmVyID0gMDsgaSA8PSBnZXROdW1iZXJPZlN0ZXBzKG1pbiwgbWF4LCBzdGVwKTsgaSsrICkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhcmV2ZXJzZSApIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IG1pbiArIHN0ZXAgKiBpO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gTWF0aC5taW4odmFsLCBtYXgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gbWF4IC0gc3RlcCAqIGk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBNYXRoLm1heCh2YWwsIG1pbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGluZGVudCA9IGkgKiBzdGVwIDwgbGVuZ3RoID8gaSAqIHN0ZXAgOiBsZW5ndGg7IFxyXG4gICAgICAgICAgICBpbmRlbnQgPSBpbmRlbnQgLyBsZW5ndGggKiAxMDAgKyAnJSc7XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBjdXN0b21WYWx1ZXMgPyBjdXN0b21WYWx1ZXNbdmFsXSA6IHZhbDtcclxuXHJcbiAgICAgICAgICAgIGRpdmlzaW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUtZGl2aXNpb24nKTtcclxuICAgICAgICAgICAgZGl2aXNpb24uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwic2xpZGVyX19zY2FsZS1kaXZpc2lvbi10ZXh0XCI+JyArIHZhbCArICc8L3NwYW4+JztcclxuICAgICAgICAgICAgb3B0aW9ucy52ZXJ0aWNhbCA/IGRpdmlzaW9uLnN0eWxlLnRvcCA9IGluZGVudCA6IGRpdmlzaW9uLnN0eWxlLmxlZnQgPSBpbmRlbnQ7XHJcblxyXG4gICAgICAgICAgICBzY2FsZS5hcHBlbmQoZGl2aXNpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLnByZXBlbmQoc2NhbGUpOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFRvb2x0aXBWYWx1ZXMob3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGxldCB7IGJlZ2luLCBlbmQsIHJldmVyc2UsIGN1c3RvbVZhbHVlcyB9ID0gb3B0aW9ucztcclxuICAgICAgICBsZXQgYmVnaW5WYWx1ZSA9IGN1c3RvbVZhbHVlcyA/IGN1c3RvbVZhbHVlc1tiZWdpbl0gOiBiZWdpbjtcclxuICAgICAgICBsZXQgZW5kVmFsdWUgPSBjdXN0b21WYWx1ZXMgPyBjdXN0b21WYWx1ZXNbZW5kXSA6IGVuZDtcclxuXHJcbiAgICAgICAgaWYgKCFyZXZlcnNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBGaXJzdC50ZXh0Q29udGVudCA9IGJlZ2luVmFsdWUgYXMgc3RyaW5nO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwTGFzdC50ZXh0Q29udGVudCA9IGVuZFZhbHVlIGFzIHN0cmluZztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwRmlyc3QudGV4dENvbnRlbnQgPSBlbmRWYWx1ZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBMYXN0LnRleHRDb250ZW50ID0gYmVnaW5WYWx1ZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VGh1bWJQb3NpdGlvbih0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCBwb3NpdGlvbjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS50b3AgPSBudWxsO1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUubGVmdCA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS5sZWZ0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLnRvcCA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8geiBpbmRleFxyXG4gICAgICAgIGlmICggdGhpcy5fdGh1bWJGaXJzdCApIHtcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoICh0aGlzLl90aHVtYkZpcnN0LnN0eWxlLmxlZnQgPT0gJzEwMCUnKSB8fCAodGhpcy5fdGh1bWJGaXJzdC5zdHlsZS50b3AgPT0gJzEwMCUnKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90aHVtYkZpcnN0LnN0eWxlLnpJbmRleCA9ICcxJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGh1bWJGaXJzdC5zdHlsZS56SW5kZXggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kVGh1bWJQb3NpdGlvbih2YWx1ZTogbnVtYmVyLCBvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgeyBtaW4sIG1heCwgcmV2ZXJzZSB9ID0gb3B0aW9ucztcclxuICAgICAgICBsZXQgcG9zOiBzdHJpbmc7XHJcbiAgICAgICAgcG9zID0gIXJldmVyc2UgP1xyXG4gICAgICAgICh2YWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKSAqIDEwMCArICclJyA6XHJcbiAgICAgICAgKG1heCAtIHZhbHVlKSAvIChtYXggLSBtaW4pICogMTAwICsgJyUnXHJcbiAgICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZU5vZGUobm9kZTogSFRNTERpdkVsZW1lbnQpOiB1bmRlZmluZWQge1xyXG4gICAgICAgIG5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkTm9kZShwYXJlbnROb2RlOiBIVE1MRGl2RWxlbWVudCwgLi4uY2xhc3Nlczogc3RyaW5nW10pOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IG5vZGU6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7ICAgICBcclxuXHJcbiAgICAgICAgZm9yICggbGV0IGk6IG51bWJlciA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZChhcmd1bWVudHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwYXJlbnROb2RlLmFwcGVuZChub2RlKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBnZXRWYWxpZExlbmd0aChzdHI6IGFueSwgdmFsaWRMZW5ndGg6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCB0eXBlb2YgKCcnICsgc3RyKSA9PSAnc3RyaW5nJyApIHtcclxuICAgICAgICAgICAgbGV0IHIgPSAoJycgKyBzdHIpLm1hdGNoKC9eXFxkezEsM31bLixdP1xcZCoocHh8ZW18cmVtfCV8dmh8dncpPyQvaSk7XHJcbiAgICAgICAgICAgIGlmICggciAmJiBpc051bWVyaWMoclswXSkgKSB7IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcsJywgJy4nKSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gclswXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJywnLCAnLicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkTGVuZ3RoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMZW5ndGhJblB4KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gIXRoaXMuX3ZlcnRpY2FsID9cclxuICAgICAgICB0aGlzLl9zbGlkZXIub2Zmc2V0V2lkdGggOlxyXG4gICAgICAgIHRoaXMuX3NsaWRlci5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgIHJldHVybiBsZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRPZmZzZXRJblB4KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyID0gIXRoaXMuX3ZlcnRpY2FsID9cclxuICAgICAgICB0aGlzLl9zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCA6XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IElWaWV3LCBJVmlld09wdGlvbnMgfTtcclxuZXhwb3J0IGRlZmF1bHQgVmlldzsiLCJmdW5jdGlvbiBpc051bWVyaWMobjogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmICFpc05hTihuIC0gMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlZXBFcXVhbChvYmoxLCBvYmoyKSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqMSk9PT1KU09OLnN0cmluZ2lmeShvYmoyKTtcclxuIH1cclxuXHJcbmZ1bmN0aW9uIGdldE51bWJlck9mU3RlcHMobWluOiBudW1iZXIsIG1heDogbnVtYmVyLCBzdGVwOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguY2VpbCgobWF4IC0gbWluKSAvIHN0ZXApO1xyXG59XHJcblxyXG5leHBvcnQgeyBpc051bWVyaWMsIGdldE51bWJlck9mU3RlcHMsIGRlZXBFcXVhbCB9O1xyXG5cclxuIiwiaW1wb3J0IHsgSU1vZGVsT3B0aW9ucyB9IGZyb20gXCIuL01vZGVsXCI7XHJcbmltcG9ydCB7IElWaWV3T3B0aW9ucyB9IGZyb20gXCIuL1ZpZXdcIjtcclxuXHJcbmludGVyZmFjZSBJT3B0aW9ucyBleHRlbmRzIElNb2RlbE9wdGlvbnMsIElWaWV3T3B0aW9ucyB7fVxyXG5cclxubGV0IGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyA9IHtcclxuICAgIGJlZ2luOiBudWxsLFxyXG4gICAgZW5kOiBudWxsLFxyXG4gICAgcmFuZ2U6IGZhbHNlLFxyXG4gICAgbWluOiAwLFxyXG4gICAgbWF4OiAxMCxcclxuICAgIHN0ZXA6IDEsXHJcbiAgICByZXZlcnNlOiBmYWxzZSxcclxuICAgIFxyXG4gICAgbGVuZ3RoOiAnMzAwcHgnLFxyXG4gICAgdmVydGljYWw6IGZhbHNlLFxyXG4gICAgdG9vbHRpcDogZmFsc2UsXHJcbiAgICBzY2FsZTogZmFsc2UsXHJcbn1cclxuXHJcbmV4cG9ydCB7IElPcHRpb25zIH07XHJcbmV4cG9ydCB7IGRlZmF1bHRPcHRpb25zIH07XHJcbiIsImltcG9ydCBNb2RlbCwgeyBJTW9kZWwgfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IFZpZXcsIHsgSVZpZXcgfSBmcm9tICcuL1ZpZXcnO1xyXG5pbXBvcnQgUHJlc2VudGVyIGZyb20gJy4vUHJlc2VudGVyJztcclxuaW1wb3J0IHsgSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCB7IH0gZnJvbSAnLi9PYnNlcnZlcic7XHJcbmltcG9ydCBTbGlkZXIgZnJvbSAnLi9zbGlkZXInO1xyXG5cclxuKGZ1bmN0aW9uICgkKSB7XHJcblxyXG4gIGludGVyZmFjZSBJTWV0aG9kcyB7XHJcbiAgICBpbml0KG9wdGlvbnM/OiBJT3B0aW9ucyk6IHZvaWQ7XHJcbiAgICBnZXREYXRhKCk6IElPcHRpb25zO1xyXG4gICAgdXBkYXRlKG9wdGlvbnM6IGFueSk6IHZvaWQ7XHJcbiAgICBkZXN0cm95KCk6IHZvaWQ7XHJcbiAgICBvYnNlcnZlKGZ1bmM6IEZ1bmN0aW9uKTogdm9pZDtcclxuICB9XHJcblxyXG4gIHZhciBtZXRob2RzOiBJTWV0aG9kcyA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAob3B0aW9ucz86IElPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgZGF0YSA9ICR0aGlzLmRhdGEoJ3NsaWRlckRhdGEnKTtcclxuICAgICAgICBsZXQgJG5vZGUgPSAkdGhpcztcclxuXHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0L/Qu9Cw0LPQuNC9INC10YnRkSDQvdC1INC/0YDQvtC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDQvVxyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG5cclxuICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgbGV0IHNsaWRlciA9IG5ldyBTbGlkZXIob3B0aW9ucywgdGhpcyk7XHJcblxyXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJywge1xyXG4gICAgICAgICAgICBub2RlOiAkbm9kZSxcclxuICAgICAgICAgICAgc2xpZGVyOiBzbGlkZXJcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXREYXRhOiBmdW5jdGlvbiAoKTogSU9wdGlvbnMge1xyXG4gICAgICByZXR1cm4gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykuc2xpZGVyLmdldERhdGEoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykuc2xpZGVyLnVwZGF0ZShvcHRpb25zKTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpOiB2b2lkIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSAkdGhpcy5kYXRhKCdzbGlkZXJEYXRhJyk7XHJcblxyXG4gICAgICAgICQod2luZG93KS51bmJpbmQoJy5zbGlkZXInKTtcclxuICAgICAgICBkYXRhLm5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgJHRoaXMucmVtb3ZlRGF0YSgnc2xpZGVyRGF0YScpO1xyXG5cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9ic2VydmU6IGZ1bmN0aW9uIChsaXN0ZW5lcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuXHJcbiAgICAgIGxldCBzbGlkZXIgPSAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnKS5zbGlkZXI7XHJcbiAgICAgIHNsaWRlci5zdWJzY3JpYmUobGlzdGVuZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gPz8/Pz8/Pz8/Pz8/P1xyXG4gIGpRdWVyeS5mbi5zbGlkZXIgPSBmdW5jdGlvbiAobWV0aG9kOiBzdHJpbmcpOiBKUXVlcnkge1xyXG5cclxuICAgIC8vINC70L7Qs9C40LrQsCDQstGL0LfQvtCy0LAg0LzQtdGC0L7QtNCwXHJcbiAgICBpZiAobWV0aG9kc1ttZXRob2QgYXMgc3RyaW5nXSkge1xyXG5cclxuICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kIGFzIHN0cmluZ10uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XHJcblxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XHJcblxyXG4gICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJC5lcnJvcignTWV0aG9kIGNhbGxlZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBmb3IgSlF1ZXJ5LnNsaWRlcicpO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxufSkoalF1ZXJ5KTtcclxuXHJcblxyXG4vKiBsZXQgbW9kID0gbmV3IE1vZGVsKE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCB7XHJcbiAgYmVnaW46IDUsXHJcbiAgZW5kOiA3LFxyXG4gIHJhbmdlOiB0cnVlXHJcbn0pKTsgKi9cclxuLy9tb2Quc2V0RW5kQnlPZmZzZXRSYWNpbygwLjM0NTQpO1xyXG4vL2NvbnNvbGUubG9nKG1vZC5nZXRPcHRpb25zKCkpO1xyXG5cclxuLyogbGV0IHRlc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVzdCcpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxubGV0IHZpZXcgPSBuZXcgVmlldyhkZWZhdWx0T3B0aW9ucywgdGVzdCk7ICovXHJcblxyXG5cclxuLy9sZXQgcHJlcyA9IG5ldyBQcmVzZW50ZXIoZGVmYXVsdE9wdGlvbnMsIHRlc3QpO1xyXG5cclxuJCgnLnRlc3QnKS5zbGlkZXIoe1xyXG4gIGVuZDogNixcclxuICBiZWdpbjogMixcclxuICBzdGVwOiA5LFxyXG4gIHRvb2x0aXA6IHRydWUsXHJcbiAgc2NhbGU6IHRydWUsXHJcbiAgcmFuZ2U6IHRydWUsXHJcbiAgcmV2ZXJzZTogdHJ1ZVxyXG59KTtcclxuXHJcblxyXG4vKlxyXG4kKCcudGVzdCcpLnNsaWRlcigndXBkYXRlJywge1xyXG4gIG1pbjogMjAsXHJcbiAgcmFuZ2U6IFszLCA3XSxcclxuICBtYXg6IC0zXHJcbn0pXHJcblxyXG5cclxuJCgnLnRlc3QnKS5zbGlkZXIoJ3VwZGF0ZScsIHtcclxuICBtaW46IC01LjgsXHJcbiAgcmFuZ2U6IFszLCA3LCAnZGd4ICcsIDVdLFxyXG4gIG1heDogJ3ZibidcclxufSkgKi9cclxuXHJcblxyXG5cclxuLyogbGV0IG1vZCA9IG5ldyBNb2RlbChkZWZhdWx0T3B0aW9ucyk7XHJcbmNvbnNvbGUubG9nKG1vZC5yZXZlcnNlKVxyXG5tb2QubWFrZUZ1bGxDaGFuZ2VzKHtyZXZlcnNlOiB0cnVlfSlcclxuY29uc29sZS5sb2cobW9kLnJldmVyc2UpXHJcbm1vZC5tYWtlRnVsbENoYW5nZXMoe3JldmVyc2U6IGZhbHNlfSlcclxuY29uc29sZS5sb2cobW9kLnJldmVyc2UpICovIiwiaW1wb3J0IHsgSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCBNb2RlbCwgeyBJTW9kZWwsIElNb2RlbE9wdGlvbnMgfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IFZpZXcsIHsgSVZpZXcgfSBmcm9tICcuL1ZpZXcnO1xyXG5pbXBvcnQgeyBJT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZSwgTW9kZWxNZXNzYWdlLCBWaWV3TWVzc2FnZSwgT2JzZXJ2YWJsZVByZXNlbnRlciB9ICBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IHsgSVdhcm5pbmdzIH0gZnJvbSAnLi92YWxpZGF0aW9ucyc7XHJcbmltcG9ydCBQcmVzZW50ZXIsIHsgSVByZXNlbnRlciB9IGZyb20gJy4vUHJlc2VudGVyJztcclxuXHJcblxyXG5pbnRlcmZhY2UgSVNsaWRlciB7XHJcbiAgICB1cGRhdGUob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkO1xyXG4gICAgc3Vic2NyaWJlKGZ1bmM6IEZ1bmN0aW9uKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgU2xpZGVyIGltcGxlbWVudHMgSVNsaWRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW9kZWw6IElNb2RlbDtcclxuICAgIHByaXZhdGUgX3ZpZXc6IElWaWV3O1xyXG4gICAgcHJpdmF0ZSBfcHJlc2VudGVyOiBJUHJlc2VudGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElPcHRpb25zLCBub2RlOiBIVE1MRGl2RWxlbWVudCkge1xyXG5cclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX21vZGVsID0gbmV3IE1vZGVsKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihvcHRpb25zLCB0aGlzLl9tb2RlbC5nZXRPcHRpb25zKCkpO1xyXG4gICAgICAgIHRoaXMuX3ZpZXcgPSBuZXcgVmlldyhvcHRpb25zLCBub2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcHJlc2VudGVyID0gbmV3IFByZXNlbnRlcih0aGlzLl9tb2RlbCwgdGhpcy5fdmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN1YnNjcmliZShmdW5jOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3ByZXNlbnRlci5zdWJzY3JpYmUoZnVuYyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3ByZXNlbnRlci51cGRhdGUob3B0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IElTbGlkZXIgfTtcclxuZXhwb3J0IGRlZmF1bHQgU2xpZGVyOyIsImltcG9ydCB7IElNb2RlbE9wdGlvbnMgfSBmcm9tIFwiLi9Nb2RlbFwiO1xyXG5pbXBvcnQgeyBpc051bWVyaWMgfSBmcm9tIFwiLi9jb21tb25GdW5jdGlvbnNcIjtcclxuXHJcbmludGVyZmFjZSBJV2FybmluZ3Mge1xyXG4gICAgdmFsdWVzQXJlTm90TnVtYmVycz86IHN0cmluZyxcclxuICAgIHZhbHVlc0FyZU5vdEludGVnZXI/OiBzdHJpbmcsXHJcbiAgICBtaW5Jc092ZXJNYXg/OiBzdHJpbmcsXHJcbiAgICBtaW5Jc0VxdWFsVG9NYXg/OiBzdHJpbmcsXHJcbiAgICBiZWdpbklzSWdub3JlZD86IHN0cmluZyxcclxuICAgIGJlZ2luSXNPdmVyRW5kPzogc3RyaW5nLFxyXG4gICAgdG9vQmlnU3RlcD86IHN0cmluZyxcclxuICAgIHN0ZXBJc051bGw/OiBzdHJpbmcsXHJcbiAgICByZXZlcnNlSXNOb3RCb29sZWFuPzogc3RyaW5nLFxyXG4gICAgY3VzdG9tVmFsdWVzSXNOb3RBcnJheT86IHN0cmluZyxcclxuICAgIGN1c3RvbVZhbHVlc0lzVG9vU21hbGw/IDogc3RyaW5nLFxyXG5cclxuICAgIGludmFsaWRMZW5ndGg/OiBzdHJpbmcsXHJcbiAgICB2ZXJ0aWNhbElzTm90Qm9vbGVhbj86IHN0cmluZyxcclxuICAgIHRvb2x0aXBJc05vdEJvb2xlYW4/OiBzdHJpbmcsXHJcbiAgICBzY2FsZUlzTm90Qm9vbGVhbj86IHN0cmluZyxcclxufVxyXG5cclxubGV0IHdhcm5pbmdzOiBJV2FybmluZ3MgPSB7XHJcbiAgICB2YWx1ZXNBcmVOb3ROdW1iZXJzOiAnQWxsIHZhbHVlcywgaW5zdGVhZCBvZiBjdXN0b21WYWx1ZXMsIHNob3VsZCBiZSBudW1iZXJzJyxcclxuICAgIHZhbHVlc0FyZU5vdEludGVnZXI6ICdBbGwgdmFsdWVzLCBpbnN0ZWFkIG9mIGN1c3RvbVZhbHVlcywgc2hvdWxkIGJlIGludGVnZXInLFxyXG4gICAgbWluSXNPdmVyTWF4OiAnTWluIHZhbHVlIHNob3VsZCBiZSBsZXNzIHRoZW4gbWF4IHZhbHVlJyxcclxuICAgIG1pbklzRXF1YWxUb01heDogJ01pbiB2YWx1ZSBjYW50IGJlIGVxdWFsIHRvIG1heCB2YWx1ZScsXHJcbiAgICBiZWdpbklzSWdub3JlZDogJ0lmIGl0IGlzIG5vdCByYW5nZSwgb3B0aW9ucyBiZWdpbiBpcyBpZ25vcmVkJyxcclxuICAgIGJlZ2luSXNPdmVyRW5kOiAnQmVnaW4gdmFsdWUgc2hvdWxkIGJlIGxlc3MgdGhlbiBlbmQgdmFsdWUnLFxyXG4gICAgdG9vQmlnU3RlcDogJ1N0ZXAgc2hvdWxkIGJlIGxlc3MgdGhlbiBkaWZmZXJlbmNlIG9mIG1heCBhbmQgbWluIHZhbHVlcycsXHJcbiAgICBzdGVwSXNOdWxsOiAnU3RlcCBjYW50IGJlIGVxdWFsIHRvIDAnLFxyXG4gICAgcmV2ZXJzZUlzTm90Qm9vbGVhbjogJ09wdGlvbiByZXZlcnNlIHNob3VsZCBiZSB0cnVlIG9yIGZhbHNlJyxcclxuICAgIGN1c3RvbVZhbHVlc0lzTm90QXJyYXk6ICdDdXN0b21WYWx1ZXMgc2hvdWxkIGJlIGFycmF5JyxcclxuICAgIGN1c3RvbVZhbHVlc0lzVG9vU21hbGw6ICdDdXN0b21WYWx1ZXMgc2hvdWxkIGNvbnRhaW4gYXQgbGVhc3QgdHdvIHZhbHVlcycsXHJcblxyXG4gICAgaW52YWxpZExlbmd0aDogJ0xlbmd0aCBzaG91bGQgYmUgdmFsaWQgdG8gQ1NTJyxcclxuICAgIHZlcnRpY2FsSXNOb3RCb29sZWFuOiAnT3B0aW9uIHZlcnRpY2FsIHNob3VsZCBiZSB0cnVlIG9yIGZhbHNlJyxcclxuICAgIHRvb2x0aXBJc05vdEJvb2xlYW46ICdPcHRpb24gdG9vbHRpcCBzaG91bGQgYmUgdHJ1ZSBvciBmYWxzZScsXHJcbiAgICBzY2FsZUlzTm90Qm9vbGVhbjogJ09wdGlvbiBzY2FsZSBzaG91bGQgYmUgdHJ1ZSBvciBmYWxzZScsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlTW9kZWwob3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IElXYXJuaW5ncyB7XHJcblxyXG4gICAgbGV0IHtiZWdpbiwgZW5kLCByYW5nZSwgbWluLCBtYXgsIHN0ZXAsIHJldmVyc2UsIGN1c3RvbVZhbHVlc30gPSBvcHRpb25zO1xyXG5cclxuICAgIGxldCB3YXJuczogSVdhcm5pbmdzID0ge307XHJcblxyXG4gICAgbGV0IG51bWJlcnM6IG51bWJlcltdID0gW21pbiwgbWF4LCBzdGVwXTtcclxuICAgIGlmIChiZWdpbikgeyBudW1iZXJzLnB1c2goYmVnaW4pIH1cclxuICAgIGlmIChlbmQpIHsgbnVtYmVycy5wdXNoKGVuZCkgfVxyXG5cclxuXHJcbiAgICBpZiAoICF2YWxpZGF0ZU51bWJlcnMobnVtYmVycykgKSB7IFxyXG4gICAgICAgIHdhcm5zLnZhbHVlc0FyZU5vdE51bWJlcnMgPSB3YXJuaW5ncy52YWx1ZXNBcmVOb3ROdW1iZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggIXZhbGlkYXRlSW50ZWdlcnMobnVtYmVycykgKSB7XHJcbiAgICAgICAgd2FybnMudmFsdWVzQXJlTm90SW50ZWdlciA9IHdhcm5pbmdzLnZhbHVlc0FyZU5vdEludGVnZXI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCBtaW4gPiBtYXggKSB7XHJcbiAgICAgICAgd2FybnMubWluSXNPdmVyTWF4ID0gd2FybmluZ3MubWluSXNPdmVyTWF4O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggbWluID09IG1heCApIHtcclxuICAgICAgICB3YXJucy5taW5Jc0VxdWFsVG9NYXggPSB3YXJuaW5ncy5taW5Jc0VxdWFsVG9NYXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCAhcmFuZ2UgJiYgYmVnaW4gKSB7XHJcbiAgICAgICAgd2FybnMuYmVnaW5Jc0lnbm9yZWQgPSB3YXJuaW5ncy5iZWdpbklzSWdub3JlZDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKCByYW5nZSAmJiAoYmVnaW4gPiBlbmQpICkge1xyXG4gICAgICAgIHdhcm5zLmJlZ2luSXNPdmVyRW5kID0gd2FybmluZ3MuYmVnaW5Jc092ZXJFbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCBNYXRoLmFicyhtYXggLSBtaW4pIDwgTWF0aC5hYnMoc3RlcCkgKSB7XHJcbiAgICAgICAgd2FybnMudG9vQmlnU3RlcCA9IHdhcm5pbmdzLnRvb0JpZ1N0ZXA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICggc3RlcCA9PSAwICkge1xyXG4gICAgICAgIHdhcm5zLnN0ZXBJc051bGwgPSB3YXJuaW5ncy5zdGVwSXNOdWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggdHlwZW9mIHJldmVyc2UgIT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgIHdhcm5zLnJldmVyc2VJc05vdEJvb2xlYW4gPSB3YXJuaW5ncy5yZXZlcnNlSXNOb3RCb29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggY3VzdG9tVmFsdWVzICkge1xyXG4gICAgICAgIGlmICggIUFycmF5LmlzQXJyYXkoY3VzdG9tVmFsdWVzKSApIHtcclxuICAgICAgICAgICAgd2FybnMuY3VzdG9tVmFsdWVzSXNOb3RBcnJheSA9IHdhcm5pbmdzLmN1c3RvbVZhbHVlc0lzTm90QXJyYXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICF3YXJucy5jdXN0b21WYWx1ZXNJc05vdEFycmF5ICYmIGN1c3RvbVZhbHVlcy5sZW5ndGggPCAyICkge1xyXG4gICAgICAgICAgICB3YXJucy5jdXN0b21WYWx1ZXNJc1Rvb1NtYWxsID0gd2FybmluZ3MuY3VzdG9tVmFsdWVzSXNUb29TbWFsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHdhcm5zO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZU51bWJlcnMobnVtYmVyczogbnVtYmVyW10pOiBib29sZWFuIHtcclxuICAgIGxldCBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIG51bWJlcnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IFxyXG4gICAgICAgIGlmKCAhaXNOdW1lcmljKGl0ZW0pICkgeyBcclxuICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGlzVmFsaWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlSW50ZWdlcnMobnVtYmVyczogbnVtYmVyW10pOiBib29sZWFuIHtcclxuICAgIGxldCBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIG51bWJlcnMuZm9yRWFjaChmdW5jdGlvbihudW0pIHtcclxuICAgICAgICBpZiAoIG51bSAlIDEgIT0gMCApIHsgXHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpc1ZhbGlkO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlVmlldyhvcHRpb25zKTogSVdhcm5pbmdzIHtcclxuICAgIGxldCB3YXJuczogSVdhcm5pbmdzID0ge307XHJcbiAgICBsZXQge2xlbmd0aCwgdmVydGljYWwsIHRvb2x0aXAsIHNjYWxlfSA9IG9wdGlvbnM7XHJcblxyXG4gICAgaWYgKCAhbGVuZ3RoLm1hdGNoKC9eXFxkezEsM31bLixdP1xcZCoocHh8ZW18cmVtfCV8dmh8dncpPyQvaSkgKSB7XHJcbiAgICAgICAgd2FybnMuaW52YWxpZExlbmd0aCA9IHdhcm5pbmdzLmludmFsaWRMZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCB0eXBlb2YgdmVydGljYWwgIT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgIHdhcm5zLnZlcnRpY2FsSXNOb3RCb29sZWFuID0gd2FybmluZ3MudmVydGljYWxJc05vdEJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCB0eXBlb2YgdG9vbHRpcCAhPSAnYm9vbGVhbicgKSB7XHJcbiAgICAgICAgd2FybnMudG9vbHRpcElzTm90Qm9vbGVhbiA9IHdhcm5pbmdzLnRvb2x0aXBJc05vdEJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCB0eXBlb2Ygc2NhbGUgIT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgIHdhcm5zLnNjYWxlSXNOb3RCb29sZWFuID0gd2FybmluZ3Muc2NhbGVJc05vdEJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHdhcm5zO1xyXG59XHJcblxyXG5leHBvcnQgeyB2YWxpZGF0ZU1vZGVsLCB2YWxpZGF0ZVZpZXcsIElXYXJuaW5ncyB9Il0sInNvdXJjZVJvb3QiOiIifQ==