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
    Model.prototype.update = function (options) {
        var prevOptions = this.getOptions();
        this.validate(Object.assign({}, prevOptions, options));
        var validOptions = this.normalize(options, prevOptions);
        this.setOptions(validOptions);
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
        this.emit({
            type: 'NEW_VALUE',
            options: this.getOptions()
        });
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
            switch (message.type) {
                case 'NEW_VALUE':
                    that._view.update(message.options);
                    that.emit({
                        type: 'NEW_DATA',
                        options: that.getOptions()
                    });
            }
        });
        _this._view.subscribe(function (message) {
            switch (message.type) {
                case 'NEW_POSITION':
                    that._model.setValueByPercent(message.percent, message.index);
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
            this.emit({
                type: 'NEW_DATA',
                options: this.getOptions()
            });
            var warnings = this.getWarnings();
            if (Object.keys(warnings).length != 0) {
                this.emit({
                    type: 'WARNINGS',
                    warnings: warnings
                });
            }
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
            type: 'NEW_POSITION',
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
            type: 'NEW_POSITION',
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
                $(this).data('sliderData').presenter.update(options);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb25GdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZmF1bHRPcHRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsaWRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSw4RkFBNEQ7QUFDNUQsNEVBQStEO0FBQy9ELGlHQUEyRTtBQUMzRSxxRkFBeUQ7QUF1QnpEO0lB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RSxDQUFDO0lBRTFCLElBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxFQUFHO1FBQ25FLEtBQUssQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQztLQUNoRDtJQUVELElBQUssT0FBTyxPQUFPLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRztRQUN4QyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDO0tBQzlEO0lBRUQsSUFBSyxPQUFPLE9BQU8sQ0FBQyxPQUFPLElBQUksU0FBUyxFQUFHO1FBQ3ZDLEtBQUssQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsbUJBQW1CLENBQUM7S0FDNUQ7SUFFRCxJQUFLLE9BQU8sT0FBTyxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUc7UUFDckMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztLQUN4RDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFdUIsb0NBQVkiLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IHsgSU9ic2VydmFibGUsIE9ic2VydmFibGUsIElNZXNzYWdlIH0gZnJvbSAnLi9PYnNlcnZlcic7XHJcbmltcG9ydCB7IGlzTnVtZXJpYywgZ2V0TnVtYmVyT2ZTdGVwcywgZGVlcEVxdWFsIH0gZnJvbSAnLi9jb21tb25GdW5jdGlvbnMnO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZU1vZGVsLCBJV2FybmluZ3MgfSBmcm9tICcuL3ZhbGlkYXRpb25zJztcclxuXHJcbmludGVyZmFjZSBJTW9kZWxPcHRpb25zIHtcclxuICAgIC8vW3g6IHN0cmluZ106IGFueTtcclxuICAgIHZhbHVlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgbWluOiBudW1iZXI7XHJcbiAgICBtYXg6IG51bWJlcjtcclxuICAgIHN0ZXA6IG51bWJlcjtcclxuICAgIHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDtcclxuICAgIGN1c3RvbVZhbHVlcz86IHN0cmluZ1tdO1xyXG4gICAgcmV2ZXJzZTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElNb2RlbCBleHRlbmRzIElPYnNlcnZhYmxlIHtcclxuICAgIC8vdXBkYXRlKG1lc3NhZ2U6IElNZXNzYWdlKTogdm9pZDtcclxuICAgIHVwZGF0ZShvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogdm9pZDtcclxuICAgIHNldFZhbHVlQnlQZXJjZW50KHBlcmNlbnQ6IG51bWJlciwgaW5kZXg6IG51bWJlcik6IHZvaWQ7XHJcblxyXG4gICAgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zO1xyXG4gICAgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzO1xyXG59XHJcblxyXG5cclxuY2xhc3MgTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIGltcGxlbWVudHMgSU1vZGVsIHtcclxuICAgIHByaXZhdGUgX3ZhbHVlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbWluOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9tYXg6IG51bWJlcjsgICBcclxuICAgIHByaXZhdGUgX3N0ZXA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3JhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2N1c3RvbVZhbHVlcz86IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfcmV2ZXJzZTogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIF93YXJuaW5nczogSVdhcm5pbmdzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGZ1bGxPcHRpb25zOiBJTW9kZWxPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIGxldCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnM7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdGUoZnVsbE9wdGlvbnMpO1xyXG4gICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMubm9ybWFsaXplKGZ1bGxPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKHZhbGlkT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbi8qICAgICBwdWJsaWMgdXBkYXRlKG1lc3NhZ2U6IElNZXNzYWdlKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdORVdfVkFMVUVfSU5fUEVSQ0VOVCc6XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUJ5UGVyY2VudChtZXNzYWdlLnBlcmNlbnQsIG1lc3NhZ2UuaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCh7IFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdORVdfVkFMVUUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnTkVXX0RBVEEnOlxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcmV2T3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZShPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgbWVzc2FnZS5vcHRpb25zKSlcclxuICAgICAgICAgICAgICAgIGxldCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLm5vcm1hbGl6ZShtZXNzYWdlLm9wdGlvbnMsIHByZXZPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoICFkZWVwRXF1YWwocHJldk9wdGlvbnMsIHZhbGlkT3B0aW9ucykgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRPcHRpb25zKHZhbGlkT3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdORVdfREFUQScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfSAqL1xyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUob3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwcmV2T3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGUoT2JqZWN0LmFzc2lnbih7fSwgcHJldk9wdGlvbnMsIG9wdGlvbnMpKVxyXG4gICAgICAgIGxldCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLm5vcm1hbGl6ZShvcHRpb25zLCBwcmV2T3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKHZhbGlkT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXRWYWx1ZUJ5UGVyY2VudChwZXJjZW50OiBudW1iZXIsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlOiBudW1iZXI7XHJcblxyXG4gICAgICAgIG5ld1ZhbHVlID0gcGVyY2VudCAqICh0aGlzLl9tYXggLSB0aGlzLl9taW4pIC8gMTAwO1xyXG4gICAgICAgIG5ld1ZhbHVlID0gIXRoaXMuX3JldmVyc2UgPyBcclxuICAgICAgICB0aGlzLl9taW4gKyBuZXdWYWx1ZSA6XHJcbiAgICAgICAgdGhpcy5fbWF4IC0gbmV3VmFsdWU7XHJcblxyXG4gICAgICAgIG5ld1ZhbHVlID0gdGhpcy5maW5kQ2xvc2VzdFN0ZXAobmV3VmFsdWUsIHRoaXMuZ2V0T3B0aW9ucygpKTtcclxuXHJcbiAgICAgICAgaWYgKCAhdGhpcy5fcmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgaXNGaXJzdEluUmFuZ2U6IGJvb2xlYW47XHJcbiAgICAgICAgICAgIGlzRmlyc3RJblJhbmdlID0gaW5kZXggPT0gMCAmJiAhdGhpcy5fcmV2ZXJzZTtcclxuICAgICAgICAgICAgaXNGaXJzdEluUmFuZ2UgPSBpc0ZpcnN0SW5SYW5nZSB8fCBpbmRleCA9PSAxICYmIHRoaXMuX3JldmVyc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNGaXJzdEluUmFuZ2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IE1hdGgubWluKG5ld1ZhbHVlLCB0aGlzLl9yYW5nZVsxXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yYW5nZVswXSA9IG5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gTWF0aC5tYXgobmV3VmFsdWUsIHRoaXMuX3JhbmdlWzBdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JhbmdlWzFdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCh7IFxyXG4gICAgICAgICAgICB0eXBlOiAnTkVXX1ZBTFVFJyxcclxuICAgICAgICAgICAgb3B0aW9uczogdGhpcy5nZXRPcHRpb25zKClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fdmFsdWUsXHJcbiAgICAgICAgICAgIG1pbjogdGhpcy5fbWluLFxyXG4gICAgICAgICAgICBtYXg6IHRoaXMuX21heCwgICBcclxuICAgICAgICAgICAgc3RlcDogdGhpcy5fc3RlcCxcclxuICAgICAgICAgICAgcmFuZ2U6IHRoaXMuX3JhbmdlLFxyXG4gICAgICAgICAgICBjdXN0b21WYWx1ZXM6IHRoaXMuX2N1c3RvbVZhbHVlcyxcclxuICAgICAgICAgICAgcmV2ZXJzZTogdGhpcy5fcmV2ZXJzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fd2FybmluZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0T3B0aW9ucyhvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBvcHRpb25zLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX21pbiA9IG9wdGlvbnMubWluO1xyXG4gICAgICAgIHRoaXMuX21heCA9IG9wdGlvbnMubWF4O1xyXG4gICAgICAgIHRoaXMuX3N0ZXAgPSBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBvcHRpb25zLnJhbmdlO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVZhbHVlcyA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzOyAgICAgIFxyXG4gICAgICAgIHRoaXMuX3JldmVyc2UgPSBvcHRpb25zLnJldmVyc2U7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlKG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5fd2FybmluZ3MgPSB7fTtcclxuICAgICAgICB0aGlzLl93YXJuaW5ncyA9IHZhbGlkYXRlTW9kZWwob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICggT2JqZWN0LmtleXModGhpcy5fd2FybmluZ3MpLmxlbmd0aCAhPSAwICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHdhcm5pbmdzOiBJV2FybmluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl93YXJuaW5ncyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1dBUk5JTkdTJyxcclxuICAgICAgICAgICAgICAgIHdhcm5pbmdzOiB3YXJuaW5nc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5vcm1hbGl6ZShvcHRpb25zOiBJTW9kZWxPcHRpb25zLCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiBJTW9kZWxPcHRpb25zIHtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHZhbGlkT3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5fd2FybmluZ3MuY3VzdG9tVmFsdWVzSXNOb3RBcnJheSB8fCB0aGlzLl93YXJuaW5ncy5jdXN0b21WYWx1ZXNJc1Rvb1NtYWxsICkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmN1c3RvbVZhbHVlcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5jdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMubWluID0gMDtcclxuICAgICAgICAgICAgb3B0aW9ucy5tYXggPSBvcHRpb25zLmN1c3RvbVZhbHVlcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3B0aW9ucy5taW4gPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLm1pbiwgdmFsaWRPcHRpb25zLm1pbik7XHJcbiAgICAgICAgb3B0aW9ucy5tYXggPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLm1heCwgdmFsaWRPcHRpb25zLm1heCk7XHJcbiAgICAgICAgb3B0aW9ucy5zdGVwID0gdGhpcy5ub3JtYWxpemVOdW1iZXIob3B0aW9ucy5zdGVwLCB2YWxpZE9wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5fd2FybmluZ3MubWluSXNPdmVyTWF4ICkge1xyXG4gICAgICAgICAgICBbb3B0aW9ucy5taW4sIG9wdGlvbnMubWF4XSA9IFtvcHRpb25zLm1heCwgb3B0aW9ucy5taW5dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLl93YXJuaW5ncy5taW5Jc0VxdWFsVG9NYXggKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMubWluID0gdmFsaWRPcHRpb25zLm1pbjtcclxuICAgICAgICAgICAgb3B0aW9ucy5tYXggPSB2YWxpZE9wdGlvbnMubWF4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLl93YXJuaW5ncy5zdGVwSXNOdWxsIHx8IHRoaXMuX3dhcm5pbmdzLnRvb0JpZ1N0ZXAgKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuc3RlcCA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSBNYXRoLmFicyhvcHRpb25zLnN0ZXApO1xyXG4gICAgICAgIG9wdGlvbnMucmV2ZXJzZSA9ICEhb3B0aW9ucy5yZXZlcnNlO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMubm9ybWFsaXplTnVtYmVyKG9wdGlvbnMudmFsdWUsIG9wdGlvbnMubWluKTtcclxuICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMuZmluZENsb3Nlc3RTdGVwKG9wdGlvbnMudmFsdWUsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2UgPSBudWxsO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhQXJyYXkuaXNBcnJheShvcHRpb25zLnJhbmdlKSApIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2UgPSBbb3B0aW9ucy5taW4sIG9wdGlvbnMubWF4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IG9wdGlvbnMucmFuZ2Uuc2xpY2UoMCwgMikgYXMgW251bWJlciwgbnVtYmVyXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMF0gPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLnJhbmdlWzBdLCBvcHRpb25zLm1pbik7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMV0gPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLnJhbmdlWzFdLCBvcHRpb25zLm1heCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3dhcm5pbmdzLndyb25nT3JkZXJJblJhbmdlICkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICAgICAgICAgICAgICB9KTsgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMF0gPSB0aGlzLmZpbmRDbG9zZXN0U3RlcChvcHRpb25zLnJhbmdlWzBdLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVsxXSA9IHRoaXMuZmluZENsb3Nlc3RTdGVwKG9wdGlvbnMucmFuZ2VbMV0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG5vcm1hbGl6ZU51bWJlcih2YWx1ZTogbnVtYmVyLCBkZWZhdWx0VmFsOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBuZXdWYWx1ZTogbnVtYmVyID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICggIWlzTnVtZXJpYyh2YWx1ZSkgKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gZGVmYXVsdFZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3VmFsdWUgPSBNYXRoLnRydW5jKCtuZXdWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGZpbmRDbG9zZXN0U3RlcCh2YWx1ZTogbnVtYmVyLCBvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyO1xyXG4gICAgICAgIGxldCBjZWlsU3RlcHM6IG51bWJlcjtcclxuICAgICAgICBsZXQgcmVzdE9mU3RlcDogbnVtYmVyO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnJldmVyc2UgKSB7XHJcbiAgICAgICAgICAgIGNlaWxTdGVwcyA9IE1hdGgudHJ1bmMoICh2YWx1ZSAtIG9wdGlvbnMubWluKSAvIG9wdGlvbnMuc3RlcCApO1xyXG4gICAgICAgICAgICByZXN0T2ZTdGVwID0gKHZhbHVlIC0gb3B0aW9ucy5taW4pICUgb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgICAgICBzdGVwID0gb3B0aW9ucy5taW4gKyBjZWlsU3RlcHMgKiBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgICAgIHN0ZXAgPSByZXN0T2ZTdGVwID49IG9wdGlvbnMuc3RlcC8yID8gc3RlcCArIG9wdGlvbnMuc3RlcCA6IHN0ZXA7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNlaWxTdGVwcyA9IE1hdGgudHJ1bmMoIChvcHRpb25zLm1heCAtIHZhbHVlKSAvIG9wdGlvbnMuc3RlcCApO1xyXG4gICAgICAgICAgICByZXN0T2ZTdGVwID0gKG9wdGlvbnMubWF4IC0gdmFsdWUpICUgb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgICAgICBzdGVwID0gb3B0aW9ucy5tYXggLSBjZWlsU3RlcHMgKiBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgICAgIHN0ZXAgPSByZXN0T2ZTdGVwID49IG9wdGlvbnMuc3RlcC8yID8gc3RlcCAtIG9wdGlvbnMuc3RlcCA6IHN0ZXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGVwID0gc3RlcCA+IG9wdGlvbnMubWF4ID8gb3B0aW9ucy5tYXggOiBzdGVwO1xyXG4gICAgICAgIHN0ZXAgPSBzdGVwIDwgb3B0aW9ucy5taW4gPyBvcHRpb25zLm1pbiA6IHN0ZXA7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGVwO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IElNb2RlbCwgSU1vZGVsT3B0aW9ucyB9O1xyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuIiwiaW1wb3J0IHsgSU1vZGVsT3B0aW9ucyB9IGZyb20gXCIuL01vZGVsXCI7XHJcbmltcG9ydCB7IElWaWV3T3B0aW9ucyB9IGZyb20gXCIuL1ZpZXdcIjtcclxuaW1wb3J0IHsgSU9wdGlvbnMgfSBmcm9tIFwiLi9kZWZhdWx0T3B0aW9uc1wiO1xyXG5pbXBvcnQgeyBJV2FybmluZ3MgfSBmcm9tIFwiLi92YWxpZGF0aW9uc1wiO1xyXG5cclxuXHJcbnR5cGUgTW9kZWxNZXNzYWdlID0ge3R5cGU6ICdORVdfVkFMVUUnLCBvcHRpb25zOiBJTW9kZWxPcHRpb25zfTtcclxudHlwZSBWaWV3TWVzc2FnZSA9IHt0eXBlOiAnTkVXX1BPU0lUSU9OJywgaW5kZXg6IG51bWJlciwgcGVyY2VudDogbnVtYmVyfTtcclxudHlwZSBQcmVzZW50ZXJNZXNzYWdlID0ge3R5cGU6ICdORVdfREFUQScsIG9wdGlvbnM6IElPcHRpb25zfTtcclxuXHJcblxyXG5pbnRlcmZhY2UgSU9ic2VydmFibGUge1xyXG4gICAgc3Vic2NyaWJlKGxpc3RlbmVyOiBhbnkpOiB2b2lkO1xyXG4gICAgLy9kZXRhY2gobGlzdGVuZXI6IGFueSk6IHZvaWQ7XHJcbiAgICBlbWl0KG1lc3NhZ2U6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIE9ic2VydmFibGUgaW1wbGVtZW50cyBJT2JzZXJ2YWJsZSB7XHJcbiAgICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiBGdW5jdGlvbltdID0gW107XHJcblxyXG4gICAgcHVibGljIHN1YnNjcmliZShsaXN0ZW5lcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbi8qICAgICBwdWJsaWMgZGV0YWNoKGxpc3RlbmVyOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVySW5kZXg6IG51bWJlciA9IHRoaXMubGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnNwbGljZShsaXN0ZW5lckluZGV4LCAxKTtcclxuICAgIH0gKi9cclxuXHJcbiAgICBwdWJsaWMgZW1pdChtZXNzYWdlOiBJTWVzc2FnZSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy5saXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgbGlzdGVuZXIobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuaW50ZXJmYWNlIElNZXNzYWdlIHtcclxuICAgIHR5cGU6IHN0cmluZyxcclxuICAgIC8vID8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/XHJcbiAgICAvL29wdGlvbnM/OiBJTW9kZWxPcHRpb25zIHwgSVZpZXdPcHRpb25zIHwgSU9wdGlvbnMsXHJcbiAgICBvcHRpb25zPzogYW55LFxyXG4gICAgcGVyY2VudD86IG51bWJlcixcclxuICAgIGluZGV4PzogbnVtYmVyLFxyXG4gICAgd2FybmluZ3M/OiBJV2FybmluZ3NcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IElPYnNlcnZhYmxlLCBPYnNlcnZhYmxlLCBJTWVzc2FnZSB9O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qIFxyXG5pbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gXCIuL2RlZmF1bHRPcHRpb25zXCI7XHJcblxyXG4vL9CY0L3RgtGE0LXRgNGE0LXQudGBINC40LfQtNCw0YLQtdC70Y8g0L7QsdGK0Y/QstC70Y/QtdGCINC90LDQsdC+0YAg0LzQtdGC0L7QtNC+0LIg0LTQu9GPINGD0L/RgNCw0LLQu9C10L3QuNGP0LzQuCDQv9C+0LTQv9C40YHQutC40YfQsNC80LguXHJcbmludGVyZmFjZSBJT2JzZXJ2YWJsZSB7XHJcblxyXG4gICAgLy8g0J/RgNC40YHQvtC10LTQuNC90Y/QtdGCINC90LDQsdC70Y7QtNCw0YLQtdC70Y8g0Log0LjQt9C00LDRgtC10LvRji5cclxuICAgIHN1YnNjcmliZShvYnNlcnZlcjogYW55KTogdm9pZDtcclxuXHJcbiAgICAvLyDQntGC0YHQvtC10LTQuNC90Y/QtdGCINC90LDQsdC70Y7QtNCw0YLQtdC70Y8g0L7RgiDQuNC30LTQsNGC0LXQu9GPLlxyXG4gICAgZGV0YWNoKG9ic2VydmVyOiBhbnkpOiB2b2lkO1xyXG5cclxuICAgIC8vINCj0LLQtdC00L7QvNC70Y/QtdGCINCy0YHQtdGFINC90LDQsdC70Y7QtNCw0YLQtdC70LXQuSDQviDRgdC+0LHRi9GC0LjQuC5cclxuICAgIGVtaXQobWVzc2FnZTogYW55KTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgT2JzZXJ2YWJsZSBpbXBsZW1lbnRzIElPYnNlcnZhYmxlIHtcclxuICAgIHByb3RlY3RlZCBvYnNlcnZlcnM6IGFueVtdID0gW107XHJcblxyXG4gICAgc3Vic2NyaWJlKG9ic2VydmVyOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXRhY2gob2JzZXJ2ZXI6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG9ic2VydmVySW5kZXggPSB0aGlzLm9ic2VydmVycy5pbmRleE9mKG9ic2VydmVyKTtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5zcGxpY2Uob2JzZXJ2ZXJJbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZW1pdCgpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG9ic2VydmVyIG9mIHRoaXMub2JzZXJ2ZXJzKSB7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLnVwZGF0ZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5pbnRlcmZhY2UgSU91dGVyT2JzZXJ2ZXIge1xyXG4gICAgZnVuYzogYW55O1xyXG4gICAgdXBkYXRlKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgT3V0ZXJPYnNlcnZlciBpbXBsZW1lbnRzIElPdXRlck9ic2VydmVyIHtcclxuICAgIGZ1bmM6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihmdW5jOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuZnVuYyA9IGZ1bmM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnVuYyhvcHRpb25zKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgeyBJT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZX07XHJcbmV4cG9ydCB7IElPdXRlck9ic2VydmVyLCBPdXRlck9ic2VydmVyfSAqLyIsImltcG9ydCB7IElPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQgTW9kZWwsIHsgSU1vZGVsLCBJTW9kZWxPcHRpb25zIH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCBWaWV3LCB7IElWaWV3IH0gZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IHsgSU9ic2VydmFibGUsIE9ic2VydmFibGUsIElNZXNzYWdlIH0gIGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5pbXBvcnQgeyBJV2FybmluZ3MgfSBmcm9tICcuL3ZhbGlkYXRpb25zJztcclxuXHJcblxyXG5pbnRlcmZhY2UgSVByZXNlbnRlciBleHRlbmRzIElPYnNlcnZhYmxlIHtcclxuICAgIC8vZGF0YSgpOiBJT3B0aW9ucztcclxuICAgIC8vdXBkYXRlKG1lc3NhZ2U6IGFueSk6IHZvaWQ7XHJcbiAgICB1cGRhdGUob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkO1xyXG5cclxuICAgIGdldE9wdGlvbnMoKTogSU9wdGlvbnM7XHJcbiAgICBnZXRXYXJuaW5ncygpOiBJV2FybmluZ3M7XHJcbn1cclxuXHJcbmNsYXNzIFByZXNlbnRlciBleHRlbmRzIE9ic2VydmFibGUgaW1wbGVtZW50cyBJUHJlc2VudGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9tb2RlbDogSU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBfdmlldzogSVZpZXc7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogSU9wdGlvbnMsIG5vZGU6IEhUTUxEaXZFbGVtZW50KSB7XHJcblxyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fbW9kZWwgPSBuZXcgTW9kZWwob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHRoaXMuX21vZGVsLmdldE9wdGlvbnMoKSk7XHJcbiAgICAgICAgdGhpcy5fdmlldyA9IG5ldyBWaWV3KG9wdGlvbnMsIG5vZGUpO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuLyogICAgICAgICB0aGlzLl9tb2RlbC5zdWJzY3JpYmUoZnVuY3Rpb24obWVzc2FnZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoYXQuX3ZpZXcudXBkYXRlKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aGF0LmVtaXQobWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3ZpZXcuc3Vic2NyaWJlKGZ1bmN0aW9uKG1lc3NhZ2U6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGF0Ll9tb2RlbC51cGRhdGUobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRoYXQuZW1pdChtZXNzYWdlKTtcclxuICAgICAgICB9KTsgKi9cclxuXHJcbiAgICAgICAgdGhpcy5fbW9kZWwuc3Vic2NyaWJlKGZ1bmN0aW9uKG1lc3NhZ2U6IElNZXNzYWdlKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdORVdfVkFMVUUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3ZpZXcudXBkYXRlKG1lc3NhZ2Uub3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbWl0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ05FV19EQVRBJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9vcHRpb25zOiB0aGF0Ll9tb2RlbC5nZXRPcHRpb25zKCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRoYXQuZ2V0T3B0aW9ucygpICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3ZpZXcuc3Vic2NyaWJlKGZ1bmN0aW9uKG1lc3NhZ2U6IElNZXNzYWdlKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdORVdfUE9TSVRJT04nOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX21vZGVsLnNldFZhbHVlQnlQZXJjZW50KG1lc3NhZ2UucGVyY2VudCwgbWVzc2FnZS5pbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdXBkYXRlKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBpc01vZGVsVXBkYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpc1ZpZXdVcGRhdGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBtb2RlbE9wdGlvbnM6IHN0cmluZ1tdID0gWyd2YWx1ZScsICdtaW4nLCAnbWF4JywgJ3N0ZXAnLCAncmV2ZXJzZScsICdyYW5nZScsICdjdXN0b21WYWx1ZXMnXTtcclxuXHJcbiAgICAgICAgbW9kZWxPcHRpb25zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoaXRlbSkgKSB7XHJcbiAgICAgICAgICAgICAgICBpc01vZGVsVXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGlzTW9kZWxVcGRhdGVkKSB7IFxyXG4gICAgICAgICAgICB0aGlzLl9tb2RlbC51cGRhdGUob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlzVmlld1VwZGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCB2aWV3T3B0aW9uczogc3RyaW5nW10gPSBbJ2xlbmd0aCcsICd2ZXJ0aWNhbCcsICd0b29sdGlwJywgJ3NjYWxlJ107XHJcblxyXG4gICAgICAgIHZpZXdPcHRpb25zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoaXRlbSkgKSB7XHJcbiAgICAgICAgICAgICAgICBpc1ZpZXdVcGRhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXNWaWV3VXBkYXRlZCkge1xyXG4gICAgICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihvcHRpb25zLCB0aGlzLl9tb2RlbC5nZXRPcHRpb25zKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl92aWV3LnJlcmVuZGVyKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzTW9kZWxVcGRhdGVkIHx8IGlzVmlld1VwZGF0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdORVdfREFUQScsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMoKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB3YXJuaW5ncyA9IHRoaXMuZ2V0V2FybmluZ3MoKTtcclxuICAgICAgICAgICAgaWYgKCBPYmplY3Qua2V5cyh3YXJuaW5ncykubGVuZ3RoICE9IDAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdXQVJOSU5HUycsXHJcbiAgICAgICAgICAgICAgICAgICAgd2FybmluZ3M6IHdhcm5pbmdzXHJcbiAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qICAgICBwdWJsaWMgdXBkYXRlKG1lc3NhZ2U6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnM7XHJcbiAgICAgICAgbGV0IHdhcm5pbmdzOiBJV2FybmluZ3M7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9tb2RlbC51cGRhdGUobWVzc2FnZSk7XHJcblxyXG4gICAgICAgIG1lc3NhZ2Uub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24obWVzc2FnZS5vcHRpb25zLCB0aGlzLl9tb2RlbC5nZXRPcHRpb25zKCkpO1xyXG5cclxuICAgICAgICB0aGlzLl92aWV3LnVwZGF0ZShtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuZW1pdCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdORVdfREFUQScsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd2FybmluZ3MgPSB0aGlzLmdldFdhcm5pbmdzKCk7XHJcbiAgICAgICAgaWYgKCBPYmplY3Qua2V5cyh3YXJuaW5ncykubGVuZ3RoICE9IDAgKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyEhISEhJylcclxuICAgICAgICAgICAgdGhpcy5lbWl0KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdXQVJOSU5HUycsXHJcbiAgICAgICAgICAgICAgICB3YXJuaW5nczogd2FybmluZ3NcclxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSAqL1xyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGdldE9wdGlvbnMoKTogSU9wdGlvbnMge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9tb2RlbC5nZXRPcHRpb25zKCksIHRoaXMuX3ZpZXcuZ2V0T3B0aW9ucygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fbW9kZWwuZ2V0V2FybmluZ3MoKSwgdGhpcy5fdmlldy5nZXRXYXJuaW5ncygpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJlc2VudGVyOyIsImltcG9ydCB7IElPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG4vL2ltcG9ydCB7IElNb2RlbCwgSU1vZGVsT3B0aW9ucyB9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgeyBJT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZSB9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5pbXBvcnQgeyBpc051bWVyaWMsIGdldE51bWJlck9mU3RlcHMgfSBmcm9tICcuL2NvbW1vbkZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IHZhbGlkYXRlVmlldywgSVdhcm5pbmdzIH0gZnJvbSAnLi92YWxpZGF0aW9ucyc7XHJcbmltcG9ydCB7IElNb2RlbCwgSU1vZGVsT3B0aW9ucyB9IGZyb20gJy4vTW9kZWwnO1xyXG5cclxuXHJcbmludGVyZmFjZSBJVmlld09wdGlvbnMge1xyXG4gICAgbGVuZ3RoOiBzdHJpbmc7XHJcbiAgICB2ZXJ0aWNhbDogYm9vbGVhbjtcclxuICAgIHRvb2x0aXA6IGJvb2xlYW47XHJcbiAgICBzY2FsZTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElWaWV3IGV4dGVuZHMgSU9ic2VydmFibGUge1xyXG4gICAgLy91cGRhdGUobWVzc2FnZTogYW55KTogdm9pZDtcclxuICAgIHVwZGF0ZShvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQ7XHJcbiAgICByZXJlbmRlcihvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQ7XHJcblxyXG4gICAgZ2V0T3B0aW9ucygpOiBJVmlld09wdGlvbnM7XHJcbiAgICBnZXRXYXJuaW5ncygpOiBJV2FybmluZ3M7XHJcbn1cclxuXHJcbmNsYXNzIFZpZXcgZXh0ZW5kcyBPYnNlcnZhYmxlIGltcGxlbWVudHMgSVZpZXcgIHtcclxuICAgIFt4OiBzdHJpbmddOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGVuZ3RoOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF92ZXJ0aWNhbDogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIF9zbGlkZXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfdGh1bWI/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3RodW1iRmlyc3Q/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3RodW1iTGFzdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfYmFyOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXA/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBGaXJzdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcExhc3Q/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3NjYWxlPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0aXZlVGh1bWI6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfd2FybmluZ3M6IElXYXJuaW5ncztcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogSU9wdGlvbnMsIHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50KSB7XHJcblxyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRlKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLl9zbGlkZXIgPSBzbGlkZXJOb2RlO1xyXG4gICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXInKTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZChvcHRpb25zKVxyXG4gICAgfVxyXG5cclxuXHJcbi8qICAgICBwdWJsaWMgdXBkYXRlKG1lc3NhZ2U6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnTkVXX1ZBTFVFJzpcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRodW1icyhtZXNzYWdlLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCYXJQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXAgfHwgdGhpcy5fdG9vbHRpcEZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUb29sdGlwVmFsdWVzKG1lc3NhZ2Uub3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ05FV19EQVRBJzpcclxuXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmdldE9wdGlvbnMoKSwgbWVzc2FnZS5vcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlKG1lc3NhZ2Uub3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlYnVpbGQobWVzc2FnZS5vcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0gKi9cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYnMob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5zZXRCYXJQb3NpdGlvbigpO1xyXG4gICAgICAgIGlmICh0aGlzLl90b29sdGlwIHx8IHRoaXMuX3Rvb2x0aXBGaXJzdCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvb2x0aXBWYWx1ZXMob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXJlbmRlcihvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmdldE9wdGlvbnMoKSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdGUob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5yZWJ1aWxkKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGdldE9wdGlvbnMoKTogSVZpZXdPcHRpb25zIHtcclxuICAgICAgICBsZXQgdG9vbHRpcCA9ICEhdGhpcy5fdG9vbHRpcCB8fCAhIXRoaXMuX3Rvb2x0aXBGaXJzdDtcclxuICAgICAgICBsZXQgc2NhbGUgPSAhIXRoaXMuX3NjYWxlO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsZW5ndGg6ICB0aGlzLl9sZW5ndGgsXHJcbiAgICAgICAgICAgIHZlcnRpY2FsOiB0aGlzLl92ZXJ0aWNhbCxcclxuICAgICAgICAgICAgdG9vbHRpcDogdG9vbHRpcCxcclxuICAgICAgICAgICAgc2NhbGU6IHNjYWxlICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRXYXJuaW5ncygpOiBJV2FybmluZ3Mge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl93YXJuaW5ncyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlVGh1bWJEb3duKGV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgLy8g0L/RgNC10LTQvtGC0LLRgNCw0YLQuNGC0Ywg0LfQsNC/0YPRgdC6INCy0YvQtNC10LvQtdC90LjRjyAo0LTQtdC50YHRgtCy0LjQtSDQsdGA0LDRg9C30LXRgNCwKVxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVRodW1iID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVUaHVtYk1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZVRodW1iVXApO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVGh1bWJNb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlVGh1bWJVcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVUaHVtYk1vdmUoZXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSB0aGlzLmdldExlbmd0aEluUHgoKTtcclxuICAgICAgICBsZXQgb2Zmc2V0OiBudW1iZXIgPSB0aGlzLmdldE9mZnNldEluUHgoKTtcclxuICAgICAgICBsZXQgZXZlbnRQb3M6IG51bWJlcjtcclxuICAgICAgICBsZXQgbmV3VGh1bWJQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChldmVudC50b3VjaGVzKSB7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gIXRoaXMuX3ZlcnRpY2FsID8gZXZlbnQudG91Y2hlc1swXS5jbGllbnRYIDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gIXRoaXMuX3ZlcnRpY2FsID8gZXZlbnQuY2xpZW50WCA6IGV2ZW50LmNsaWVudFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXdUaHVtYlBvc2l0aW9uID0gKGV2ZW50UG9zIC0gb2Zmc2V0KSAvIGxlbmd0aCAqIDEwMDtcclxuICAgICAgICBpbmRleCA9IHRoaXMuX2FjdGl2ZVRodW1iID09IHRoaXMuX3RodW1iTGFzdCA/IDEgOiAwO1xyXG5cclxuICAgICAgICB0aGlzLmVtaXQoe1xyXG4gICAgICAgICAgICB0eXBlOiAnTkVXX1BPU0lUSU9OJyxcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICBwZXJjZW50OiBuZXdUaHVtYlBvc2l0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVTbGlkZXJDbGljayhldmVudCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IHRoaXMuZ2V0TGVuZ3RoSW5QeCgpO1xyXG4gICAgICAgIGxldCBvZmZzZXQ6IG51bWJlciA9IHRoaXMuZ2V0T2Zmc2V0SW5QeCgpO1xyXG4gICAgICAgIGxldCBldmVudFBvczogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuZXdUaHVtYlBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXMpIHtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSAhdGhpcy5fdmVydGljYWwgPyBldmVudC50b3VjaGVzWzBdLmNsaWVudFggOiBldmVudC50b3VjaGVzWzBdLmNsaWVudFk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSAhdGhpcy5fdmVydGljYWwgPyBldmVudC5jbGllbnRYIDogZXZlbnQuY2xpZW50WTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5ld1RodW1iUG9zaXRpb24gPSAoZXZlbnRQb3MgLSBvZmZzZXQpIC8gbGVuZ3RoICogMTAwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLl90aHVtYikge1xyXG4gICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHRvcExlZnQ6IHN0cmluZyA9ICF0aGlzLl92ZXJ0aWNhbCA/ICdsZWZ0JyA6ICd0b3AnO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZpcnN0VGh1bWJQb3M6IG51bWJlciA9IHBhcnNlSW50KCB0aGlzLl90aHVtYkZpcnN0LnN0eWxlW3RvcExlZnRdICk7XHJcbiAgICAgICAgICAgIGxldCBsYXN0VGh1bWJQb3M6IG51bWJlciA9IHBhcnNlSW50KCB0aGlzLl90aHVtYkxhc3Quc3R5bGVbdG9wTGVmdF0gKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpc0ZpcnN0Q2xvc2VyOiBib29sZWFuO1xyXG4gICAgICAgICAgICBpc0ZpcnN0Q2xvc2VyID0gTWF0aC5hYnMoZmlyc3RUaHVtYlBvcyAtIG5ld1RodW1iUG9zaXRpb24pIDwgTWF0aC5hYnMobGFzdFRodW1iUG9zIC0gbmV3VGh1bWJQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpbmRleCA9IGlzRmlyc3RDbG9zZXIgPyAwIDogMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdORVdfUE9TSVRJT04nLFxyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIHBlcmNlbnQ6IG5ld1RodW1iUG9zaXRpb25cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVRodW1iVXAoZXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVUaHVtYlVwKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZVRodW1iTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZVRodW1iVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVGh1bWJNb3ZlKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGh1bWIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZChvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgdmFsaWRMZW5ndGg6IHN0cmluZyA9IHRoaXMuX2xlbmd0aCB8fCBkZWZhdWx0T3B0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoID0gdGhpcy5nZXRWYWxpZExlbmd0aChvcHRpb25zLmxlbmd0aCwgdmFsaWRMZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSB0aGlzLl9sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS5oZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2hvcml6b250YWwnKTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IHRoaXMuX2xlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLndpZHRoID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKTsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9iYXIgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX2JhcicpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1aWxkVGh1bWJzKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLnNldEJhclBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy50b29sdGlwICkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkVG9vbHRpcHMob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5zY2FsZSApIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFNjYWxlKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlVGh1bWJEb3duID0gdGhpcy5oYW5kbGVUaHVtYkRvd24uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVRodW1iTW92ZSA9IHRoaXMuaGFuZGxlVGh1bWJNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVUaHVtYlVwID0gdGhpcy5oYW5kbGVUaHVtYlVwLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTbGlkZXJDbGljayA9IHRoaXMuaGFuZGxlU2xpZGVyQ2xpY2suYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmhhbmRsZVRodW1iRG93bik7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkZpcnN0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5oYW5kbGVUaHVtYkRvd24pO1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkZpcnN0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iTGFzdC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJMYXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVTbGlkZXJDbGljayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWJ1aWxkKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHByZXZPcHRpb25zOiBJVmlld09wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJldk9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcykge1xyXG4gICAgICAgICAgICBpZiAoa2V5ICE9ICdfc2xpZGVyJykge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB0aGlzLnJlbW92ZU5vZGUodGhpc1trZXldKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2gge30gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5idWlsZChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlKG9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl93YXJuaW5ncyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX3dhcm5pbmdzID0gdmFsaWRhdGVWaWV3KG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoIE9iamVjdC5rZXlzKHRoaXMuX3dhcm5pbmdzKS5sZW5ndGggIT0gMCApIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB3YXJuaW5nczogSVdhcm5pbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fd2FybmluZ3MpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5lbWl0KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdXQVJOSU5HUycsXHJcbiAgICAgICAgICAgICAgICB3YXJuaW5nczogd2FybmluZ3NcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZFRodW1icyhvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGlmICggIW9wdGlvbnMucmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iID0gdGhpcy5idWlsZE5vZGUodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYicpO1xyXG4gICAgICAgIH0gZWxzZSB7ICAgICBcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJGaXJzdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWInLCAnc2xpZGVyX190aHVtYl9maXJzdCcpO1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkxhc3QgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iJywgJ3NsaWRlcl9fdGh1bWJfbGFzdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYnMob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRUaHVtYnMob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcG9zOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmICggIW9wdGlvbnMucmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24ob3B0aW9ucy52YWx1ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbih0aGlzLl90aHVtYiwgcG9zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG51bTogbnVtYmVyO1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCByZXZlcnNlLCDRgtC+INC70LXQstGL0Lkg0LHQtdCz0YPQvdC+0LogLSDRjdGC0L4g0LHQvtC70YzRiNC10LUg0LfQvdCw0YfQtdC90LjQtVxyXG4gICAgICAgICAgICAvLyDRgi7QtS4gcmFuZ2VbMV1cclxuICAgICAgICAgICAgbnVtID0gIW9wdGlvbnMucmV2ZXJzZSA/IDAgOiAxO1xyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKG9wdGlvbnMucmFuZ2VbbnVtXSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbih0aGlzLl90aHVtYkZpcnN0LCBwb3MpO1xyXG5cclxuICAgICAgICAgICAgbnVtID0gbnVtID09IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbihvcHRpb25zLnJhbmdlW251bV0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24odGhpcy5fdGh1bWJMYXN0LCBwb3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEJhclBvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzdGFydDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciB8IHN0cmluZztcclxuICAgICAgICBsZXQgdG9wTGVmdDogc3RyaW5nID0gIXRoaXMuX3ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XHJcbiAgICAgICAgbGV0IHdpZHRoSGVpZ2h0OiBzdHJpbmcgPSAhdGhpcy5fdmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XHJcblxyXG4gICAgICAgIHN0YXJ0ID0gdGhpcy5fdGh1bWJGaXJzdCA/IHRoaXMuX3RodW1iRmlyc3Quc3R5bGVbdG9wTGVmdF0gOiAnMCUnO1xyXG4gICAgICAgIGxlbmd0aCA9IHRoaXMuX3RodW1iRmlyc3QgPyBcclxuICAgICAgICB0aGlzLl90aHVtYkxhc3Quc3R5bGVbdG9wTGVmdF0uc2xpY2UoMCwgLTEpIC0gdGhpcy5fdGh1bWJGaXJzdC5zdHlsZVt0b3BMZWZ0XS5zbGljZSgwLCAtMSkgICsgJyUnIDpcclxuICAgICAgICB0aGlzLl90aHVtYi5zdHlsZVt0b3BMZWZ0XTtcclxuXHJcbiAgICAgICAgdGhpcy5fYmFyLnN0eWxlW3RvcExlZnRdID0gc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5fYmFyLnN0eWxlW3dpZHRoSGVpZ2h0XSA9IGxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkVG9vbHRpcHMob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKCFvcHRpb25zLnJhbmdlKSB7IFxyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwID0gdGhpcy5idWlsZE5vZGUodGhpcy5fdGh1bWIsICdzbGlkZXJfX3Rvb2x0aXAnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwRmlyc3QgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl90aHVtYkZpcnN0LCAnc2xpZGVyX190b29sdGlwJywgJ3NsaWRlcl9fdG9vbHRpcF9maXJzdCcpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwTGFzdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3RodW1iTGFzdCwgJ3NsaWRlcl9fdG9vbHRpcCcsICdzbGlkZXJfX3Rvb2x0aXBfbGFzdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRUb29sdGlwVmFsdWVzKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRTY2FsZShvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzY2FsZTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGRpdmlzaW9uOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICAgbGV0IGluZGVudDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IG9wdGlvbnMubWF4IC0gb3B0aW9ucy5taW47XHJcblxyXG4gICAgICAgIHNjYWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgc2NhbGUuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZScpO1xyXG5cclxuICAgICAgICBmb3IgKCBsZXQgaTogbnVtYmVyID0gMDsgaSA8PSBnZXROdW1iZXJPZlN0ZXBzKG9wdGlvbnMubWluLCBvcHRpb25zLm1heCwgb3B0aW9ucy5zdGVwKTsgaSsrICkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhb3B0aW9ucy5yZXZlcnNlICkge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5taW4gKyBvcHRpb25zLnN0ZXAgKiBpO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gTWF0aC5taW4odmFsLCBvcHRpb25zLm1heCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBvcHRpb25zLm1heCAtIG9wdGlvbnMuc3RlcCAqIGk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBNYXRoLm1heCh2YWwsIG9wdGlvbnMubWluKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5kZW50ID0gaSAqIG9wdGlvbnMuc3RlcCA8IGxlbmd0aCA/IGkgKiBvcHRpb25zLnN0ZXAgOiBsZW5ndGg7IFxyXG4gICAgICAgICAgICBpbmRlbnQgPSBpbmRlbnQgLyBsZW5ndGggKiAxMDAgKyAnJSc7XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBvcHRpb25zLmN1c3RvbVZhbHVlcyA/IG9wdGlvbnMuY3VzdG9tVmFsdWVzW3ZhbF0gOiB2YWw7XHJcblxyXG4gICAgICAgICAgICBkaXZpc2lvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXZpc2lvbi5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3NjYWxlLWRpdmlzaW9uJyk7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInNsaWRlcl9fc2NhbGUtZGl2aXNpb24tdGV4dFwiPicgKyB2YWwgKyAnPC9zcGFuPic7XHJcbiAgICAgICAgICAgIG9wdGlvbnMudmVydGljYWwgPyBkaXZpc2lvbi5zdHlsZS50b3AgPSBpbmRlbnQgOiBkaXZpc2lvbi5zdHlsZS5sZWZ0ID0gaW5kZW50O1xyXG5cclxuICAgICAgICAgICAgc2NhbGUuYXBwZW5kKGRpdmlzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3NsaWRlci5wcmVwZW5kKHNjYWxlKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRUb29sdGlwVmFsdWVzKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoIW9wdGlvbnMucmFuZ2UpIHsgXHJcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzID8gb3B0aW9ucy5jdXN0b21WYWx1ZXNbb3B0aW9ucy52YWx1ZV0gOiBvcHRpb25zLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwLnRleHRDb250ZW50ID0gdmFsIGFzIHN0cmluZzsgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG51bTogbnVtYmVyO1xyXG4gICAgICAgICAgICBudW0gPSAhb3B0aW9ucy5yZXZlcnNlID8gMCA6IDE7XHJcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzID8gb3B0aW9ucy5jdXN0b21WYWx1ZXNbb3B0aW9ucy5yYW5nZVtudW1dXSA6IG9wdGlvbnMucmFuZ2VbbnVtXTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcEZpcnN0LnRleHRDb250ZW50ID0gdmFsIGFzIHN0cmluZztcclxuXHJcbiAgICAgICAgICAgIG51bSA9IG51bSA9PSAwID8gMSA6IDA7XHJcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzID8gb3B0aW9ucy5jdXN0b21WYWx1ZXNbb3B0aW9ucy5yYW5nZVtudW1dXSA6IG9wdGlvbnMucmFuZ2VbbnVtXTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcExhc3QudGV4dENvbnRlbnQgPSB2YWwgYXMgc3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFRodW1iUG9zaXRpb24odGh1bWJOb2RlOiBIVE1MRGl2RWxlbWVudCwgcG9zaXRpb246IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICggIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUudG9wID0gbnVsbDtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLmxlZnQgPSBwb3NpdGlvbjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUubGVmdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS50b3AgPSBwb3NpdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHogaW5kZXhcclxuICAgICAgICBpZiAoIHRoaXMuX3RodW1iRmlyc3QgKSB7XHJcbiAgICAgICAgICAgIGlmICggIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAodGhpcy5fdGh1bWJGaXJzdC5zdHlsZS5sZWZ0ID09ICcxMDAlJykgfHwgKHRoaXMuX3RodW1iRmlyc3Quc3R5bGUudG9wID09ICcxMDAlJykgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGh1bWJGaXJzdC5zdHlsZS56SW5kZXggPSAnMSc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RodW1iRmlyc3Quc3R5bGUuekluZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmluZFRodW1iUG9zaXRpb24odmFsdWU6IG51bWJlciwgb3B0aW9uczogSU9wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBwb3M6IHN0cmluZztcclxuICAgICAgICBwb3MgPSAhb3B0aW9ucy5yZXZlcnNlID9cclxuICAgICAgICAodmFsdWUgLSBvcHRpb25zLm1pbikgLyAob3B0aW9ucy5tYXggLSBvcHRpb25zLm1pbikgKiAxMDAgKyAnJScgOlxyXG4gICAgICAgIChvcHRpb25zLm1heCAtIHZhbHVlKSAvIChvcHRpb25zLm1heCAtIG9wdGlvbnMubWluKSAqIDEwMCArICclJ1xyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVOb2RlKG5vZGU6IEhUTUxEaXZFbGVtZW50KTogdW5kZWZpbmVkIHtcclxuICAgICAgICBub2RlLnJlbW92ZSgpO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZE5vZGUocGFyZW50Tm9kZTogSFRNTERpdkVsZW1lbnQsIC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGxldCBub2RlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAgICAgXHJcblxyXG4gICAgICAgIGZvciAoIGxldCBpOiBudW1iZXIgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoYXJndW1lbnRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGFyZW50Tm9kZS5hcHBlbmQobm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgZ2V0VmFsaWRMZW5ndGgoc3RyOiBhbnksIHZhbGlkTGVuZ3RoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICggdHlwZW9mICgnJyArIHN0cikgPT0gJ3N0cmluZycgKSB7XHJcbiAgICAgICAgICAgIGxldCByID0gKCcnICsgc3RyKS5tYXRjaCgvXlxcZHsxLDN9Wy4sXT9cXGQqKHB4fGVtfHJlbXwlfHZofHZ3KT8kL2kpO1xyXG4gICAgICAgICAgICBpZiAoIHIgJiYgaXNOdW1lcmljKHJbMF0pICkgeyBcclxuICAgICAgICAgICAgICAgIHJldHVybiByWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnLCcsICcuJykgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCByICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcsJywgJy4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZExlbmd0aFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TGVuZ3RoSW5QeCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9ICF0aGlzLl92ZXJ0aWNhbCA/XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLm9mZnNldFdpZHRoIDpcclxuICAgICAgICB0aGlzLl9zbGlkZXIub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICByZXR1cm4gbGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0T2Zmc2V0SW5QeCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBvZmZzZXQ6IG51bWJlciA9ICF0aGlzLl92ZXJ0aWNhbCA/XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgOlxyXG4gICAgICAgIHRoaXMuX3NsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcblxyXG4gICAgICAgIHJldHVybiBvZmZzZXQ7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgSVZpZXcsIElWaWV3T3B0aW9ucyB9O1xyXG5leHBvcnQgZGVmYXVsdCBWaWV3OyIsImZ1bmN0aW9uIGlzTnVtZXJpYyhuOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgIWlzTmFOKG4gLSAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVlcEVxdWFsKG9iajEsIG9iajIpIHtcclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmoxKT09PUpTT04uc3RyaW5naWZ5KG9iajIpO1xyXG4gfVxyXG5cclxuZnVuY3Rpb24gZ2V0TnVtYmVyT2ZTdGVwcyhtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIHN0ZXA6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5jZWlsKChtYXggLSBtaW4pIC8gc3RlcCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGlzTnVtZXJpYywgZ2V0TnVtYmVyT2ZTdGVwcywgZGVlcEVxdWFsIH07XHJcblxyXG4iLCJpbXBvcnQgeyBJTW9kZWxPcHRpb25zIH0gZnJvbSBcIi4vTW9kZWxcIjtcclxuaW1wb3J0IHsgSVZpZXdPcHRpb25zIH0gZnJvbSBcIi4vVmlld1wiO1xyXG5cclxuaW50ZXJmYWNlIElPcHRpb25zIGV4dGVuZHMgSU1vZGVsT3B0aW9ucywgSVZpZXdPcHRpb25zIHt9XHJcblxyXG5sZXQgZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zID0ge1xyXG4gICAgLy8gTW9kZWwgb3B0aW9uc1xyXG4gICAgLy8g0LIg0L3QsNGH0LDQu9GM0L3Ri9GFINC90LDRgdGC0YDQvtC50LrQsNGFINC90LUg0L7Qv9GA0LXQtNC10LvQtdC90Ysg0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0LjQu9C4INC/0YDQvtC80LXQttGD0YLQvtC6LlxyXG4gICAgLy8g0LXRgdC70Lgg0L7QvdC4INC90LUg0YPQutCw0LfQsNC90Ysg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10LwsINC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1IHZhbHVlID09IG1pbiBcclxuICAgIHZhbHVlOiBudWxsLFxyXG4gICAgbWluOiAwLFxyXG4gICAgbWF4OiAxMCxcclxuICAgIHN0ZXA6IDEsXHJcbiAgICByZXZlcnNlOiBmYWxzZSxcclxuICAgIHJhbmdlOiBudWxsLFxyXG4gICAgXHJcbiAgICBsZW5ndGg6ICczMDBweCcsXHJcbiAgICB2ZXJ0aWNhbDogZmFsc2UsXHJcbiAgICB0b29sdGlwOiBmYWxzZSxcclxuICAgIHNjYWxlOiBmYWxzZSxcclxufVxyXG5cclxuZXhwb3J0IHsgSU9wdGlvbnMgfTtcclxuZXhwb3J0IHsgZGVmYXVsdE9wdGlvbnMgfTtcclxuIiwiaW1wb3J0IE1vZGVsLCB7IElNb2RlbCB9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgVmlldywgeyBJVmlldyB9IGZyb20gJy4vVmlldyc7XHJcbmltcG9ydCBQcmVzZW50ZXIgZnJvbSAnLi9QcmVzZW50ZXInO1xyXG5pbXBvcnQgeyBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IHsgSU1lc3NhZ2UgfSBmcm9tICcuL09ic2VydmVyJztcclxuLy9pbXBvcnQgeyBJT3V0ZXJPYnNlcnZlciwgT3V0ZXJPYnNlcnZlciB9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5cclxuKGZ1bmN0aW9uICgkKSB7XHJcblxyXG4gIGludGVyZmFjZSBJTWV0aG9kcyB7XHJcbiAgICBpbml0KG9wdGlvbnM/OiBJT3B0aW9ucyk6IHZvaWQ7XHJcbiAgICBnZXREYXRhKCk6IElPcHRpb25zO1xyXG4gICAgdXBkYXRlKG9wdGlvbnM6IGFueSk6IHZvaWQ7XHJcbiAgICBkZXN0cm95KCk6IHZvaWQ7XHJcbiAgICBvYnNlcnZlKGZ1bmM6IEZ1bmN0aW9uKTogdm9pZDtcclxuICB9XHJcblxyXG4gIHZhciBtZXRob2RzOiBJTWV0aG9kcyA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAob3B0aW9ucz86IElPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgZGF0YSA9ICR0aGlzLmRhdGEoJ3NsaWRlckRhdGEnKTtcclxuICAgICAgICBsZXQgc2xpZGVyID0gJHRoaXM7XHJcblxyXG4gICAgICAgIC8vINCV0YHQu9C4INC/0LvQsNCz0LjQvSDQtdGJ0ZEg0L3QtSDQv9GA0L7QuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0L1cclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuXHJcbiAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICBsZXQgcHJlc2VudGVyID0gbmV3IFByZXNlbnRlcihvcHRpb25zLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnLCB7XHJcbiAgICAgICAgICAgIHNsaWRlcjogc2xpZGVyLFxyXG4gICAgICAgICAgICBwcmVzZW50ZXI6IHByZXNlbnRlclxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldERhdGE6IGZ1bmN0aW9uICgpOiBJT3B0aW9ucyB7XHJcbiAgICAgIHJldHVybiAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnKS5wcmVzZW50ZXIuZ2V0RGF0YSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuLyogICAgICAgICBsZXQgbWVzc2FnZTogSU1lc3NhZ2UgPSB7XHJcbiAgICAgICAgICB0eXBlOiAnTkVXX0RBVEEnLFxyXG4gICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xyXG4gICAgICAgIH0gKi9cclxuXHJcbiAgICAgICAgLy8kKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnKS5wcmVzZW50ZXIudXBkYXRlKG1lc3NhZ2UpO1xyXG4gICAgICAgICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScpLnByZXNlbnRlci51cGRhdGUob3B0aW9ucyk7XHJcblxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCk6IHZvaWQge1xyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgZGF0YSA9ICR0aGlzLmRhdGEoJ3NsaWRlckRhdGEnKTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnVuYmluZCgnLnNsaWRlcicpO1xyXG4gICAgICAgIGRhdGEuc2xpZGVyLnJlbW92ZSgpO1xyXG4gICAgICAgICR0aGlzLnJlbW92ZURhdGEoJ3NsaWRlckRhdGEnKTtcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBvYnNlcnZlOiBmdW5jdGlvbiAobGlzdGVuZXI6IEZ1bmN0aW9uKTogdm9pZCB7XHJcblxyXG4gICAgICBsZXQgcHJlc2VudGVyID0gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykucHJlc2VudGVyO1xyXG4gICAgICBwcmVzZW50ZXIuc3Vic2NyaWJlKGxpc3RlbmVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4vLyA/Pz8/Pz8/Pz8/Pz8/XHJcbiAgalF1ZXJ5LmZuLnNsaWRlciA9IGZ1bmN0aW9uIChtZXRob2Q6IHN0cmluZyk6IEpRdWVyeSB7XHJcblxyXG4gICAgLy8g0LvQvtCz0LjQutCwINCy0YvQt9C+0LLQsCDQvNC10YLQvtC00LBcclxuICAgIGlmIChtZXRob2RzW21ldGhvZCBhcyBzdHJpbmddKSB7XHJcblxyXG4gICAgICByZXR1cm4gbWV0aG9kc1ttZXRob2QgYXMgc3RyaW5nXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QpIHtcclxuXHJcbiAgICAgIHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkLmVycm9yKCdNZXRob2QgY2FsbGVkICcgKyBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IGZvciBKUXVlcnkuc2xpZGVyJyk7XHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG5cclxuXHJcblxyXG4vL2xldCBwcmVzID0gbmV3IFByZXNlbnRlcihkZWZhdWx0T3B0aW9ucywgdGVzdCk7XHJcblxyXG4vKiAkKCcudGVzdCcpLnNsaWRlcih7XHJcbiAgLy92YWx1ZTogMCxcclxuICAvL21pbjogLTcuNjY2NixcclxuICByYW5nZTogJ2hqaywnLFxyXG4gIC8vcmV2ZXJzZTogdHJ1ZSxcclxuICAvL2N1c3RvbVZhbHVlczogWydhJywgJ2InLCAnYycsICdkJ10sXHJcbiAgc3RlcDogJ2hnJyxcclxuICB2YWx1ZTogJ3Z4bnhtJyxcclxuICBtaW46ICdmZGd2aHhqaycsXHJcbiAgbWF4OiAxNy41LFxyXG4gIHRvb2x0aXA6IHRydWUsXHJcbiAgc2NhbGU6IHRydWVcclxufSk7XHJcblxyXG4kKCcudGVzdCcpLnNsaWRlcignb2JzZXJ2ZScsIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICBpZiAobWVzc2FnZS5vcHRpb25zICYmIG1lc3NhZ2Uub3B0aW9ucy5yYW5nZSkge1xyXG4gICAgJCgnLmlucHV0JykudmFsKG1lc3NhZ2Uub3B0aW9ucy5yYW5nZSk7XHJcbiAgfVxyXG5cclxuICBpZiAobWVzc2FnZS50eXBlID09ICdXQVJOSU5HUycpIHtcclxuXHJcbiAgICBmb3IgKCBsZXQga2V5IGluIG1lc3NhZ2Uud2FybmluZ3MgKSB7XHJcbiAgICAgICQoJy53YXJzJykuYXBwZW5kKCc8cD4nICsgbWVzc2FnZS53YXJuaW5nc1trZXldICsgJzwvcD4nKVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59KVxyXG5cclxuJCgnLnRlc3QnKS5zbGlkZXIoJ3VwZGF0ZScsIHtcclxuICBtaW46IDIwLFxyXG4gIHJhbmdlOiBbMywgN10sXHJcbiAgbWF4OiAtM1xyXG59KVxyXG5cclxuXHJcbiQoJy50ZXN0Jykuc2xpZGVyKCd1cGRhdGUnLCB7XHJcbiAgbWluOiAtNS44LFxyXG4gIHJhbmdlOiBbMywgNywgJ2RneCAnLCA1XSxcclxuICBtYXg6ICd2Ym4nXHJcbn0pICovXHJcblxyXG5cclxuXHJcbi8qIGxldCBtb2QgPSBuZXcgTW9kZWwoZGVmYXVsdE9wdGlvbnMpO1xyXG5jb25zb2xlLmxvZyhtb2QucmV2ZXJzZSlcclxubW9kLm1ha2VGdWxsQ2hhbmdlcyh7cmV2ZXJzZTogdHJ1ZX0pXHJcbmNvbnNvbGUubG9nKG1vZC5yZXZlcnNlKVxyXG5tb2QubWFrZUZ1bGxDaGFuZ2VzKHtyZXZlcnNlOiBmYWxzZX0pXHJcbmNvbnNvbGUubG9nKG1vZC5yZXZlcnNlKSAqLyIsImltcG9ydCB7IElNb2RlbE9wdGlvbnMgfSBmcm9tIFwiLi9Nb2RlbFwiO1xyXG5pbXBvcnQgeyBpc051bWVyaWMgfSBmcm9tIFwiLi9jb21tb25GdW5jdGlvbnNcIjtcclxuXHJcbmludGVyZmFjZSBJV2FybmluZ3Mge1xyXG4gICAgdmFsdWVzQXJlTm90TnVtYmVycz86IHN0cmluZyxcclxuICAgIHZhbHVlc0FyZU5vdEludGVnZXI/OiBzdHJpbmcsXHJcbiAgICBtaW5Jc092ZXJNYXg/OiBzdHJpbmcsXHJcbiAgICBtaW5Jc0VxdWFsVG9NYXg/OiBzdHJpbmcsXHJcbiAgICB3cm9uZ1JhbmdlTGVuZ3RoPzogc3RyaW5nLFxyXG4gICAgd3JvbmdPcmRlckluUmFuZ2U/OiBzdHJpbmcsXHJcbiAgICB0b29CaWdTdGVwPzogc3RyaW5nLFxyXG4gICAgc3RlcElzTnVsbD86IHN0cmluZyxcclxuICAgIHJldmVyc2VJc05vdEJvb2xlYW4/OiBzdHJpbmcsXHJcbiAgICBjdXN0b21WYWx1ZXNJc05vdEFycmF5Pzogc3RyaW5nLFxyXG4gICAgY3VzdG9tVmFsdWVzSXNUb29TbWFsbD8gOiBzdHJpbmcsXHJcblxyXG4gICAgaW52YWxpZExlbmd0aD86IHN0cmluZyxcclxuICAgIHZlcnRpY2FsSXNOb3RCb29sZWFuPzogc3RyaW5nLFxyXG4gICAgdG9vbHRpcElzTm90Qm9vbGVhbj86IHN0cmluZyxcclxuICAgIHNjYWxlSXNOb3RCb29sZWFuPzogc3RyaW5nLFxyXG59XHJcblxyXG5sZXQgd2FybmluZ3M6IElXYXJuaW5ncyA9IHtcclxuICAgIHZhbHVlc0FyZU5vdE51bWJlcnM6ICdBbGwgdmFsdWVzLCBpbnN0ZWFkIG9mIGN1c3RvbVZhbHVlcywgc2hvdWxkIGJlIG51bWJlcnMnLFxyXG4gICAgdmFsdWVzQXJlTm90SW50ZWdlcjogJ0FsbCB2YWx1ZXMsIGluc3RlYWQgb2YgY3VzdG9tVmFsdWVzLCBzaG91bGQgYmUgaW50ZWdlcicsXHJcbiAgICBtaW5Jc092ZXJNYXg6ICdNaW4gdmFsdWUgc2hvdWxkIGJlIGxlc3MgdGhlbiBtYXggdmFsdWUnLFxyXG4gICAgbWluSXNFcXVhbFRvTWF4OiAnTWluIHZhbHVlIGNhbnQgYmUgZXF1YWwgdG8gbWF4IHZhbHVlJyxcclxuICAgIHdyb25nUmFuZ2VMZW5ndGg6ICdSYW5nZSBzaG91bGQgY29udGFpbiB0d28gdmFsdWVzJyxcclxuICAgIHdyb25nT3JkZXJJblJhbmdlOiAnVGhlIGZpcnN0IG51bWJlciBpbiByYW5nZSBzaG91bGQgYmUgbGVzcyB0aGVuIHNlY29uZCcsXHJcbiAgICB0b29CaWdTdGVwOiAnU3RlcCBzaG91bGQgYmUgbGVzcyB0aGVuIGRpZmZlcmVuY2Ugb2YgbWF4IGFuZCBtaW4gdmFsdWVzJyxcclxuICAgIHN0ZXBJc051bGw6ICdTdGVwIGNhbnQgYmUgZXF1YWwgdG8gMCcsXHJcbiAgICByZXZlcnNlSXNOb3RCb29sZWFuOiAnT3B0aW9uIHJldmVyc2Ugc2hvdWxkIGJlIHRydWUgb3IgZmFsc2UnLFxyXG4gICAgY3VzdG9tVmFsdWVzSXNOb3RBcnJheTogJ0N1c3RvbVZhbHVlcyBzaG91bGQgYmUgYXJyYXknLFxyXG4gICAgY3VzdG9tVmFsdWVzSXNUb29TbWFsbDogJ0N1c3RvbVZhbHVlcyBzaG91bGQgY29udGFpbiBhdCBsZWFzdCB0d28gdmFsdWVzJyxcclxuXHJcbiAgICBpbnZhbGlkTGVuZ3RoOiAnTGVuZ3RoIHNob3VsZCBiZSB2YWxpZCB0byBDU1MnLFxyXG4gICAgdmVydGljYWxJc05vdEJvb2xlYW46ICdPcHRpb24gdmVydGljYWwgc2hvdWxkIGJlIHRydWUgb3IgZmFsc2UnLFxyXG4gICAgdG9vbHRpcElzTm90Qm9vbGVhbjogJ09wdGlvbiB0b29sdGlwIHNob3VsZCBiZSB0cnVlIG9yIGZhbHNlJyxcclxuICAgIHNjYWxlSXNOb3RCb29sZWFuOiAnT3B0aW9uIHNjYWxlIHNob3VsZCBiZSB0cnVlIG9yIGZhbHNlJyxcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVNb2RlbChvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogSVdhcm5pbmdzIHtcclxuXHJcbiAgICBsZXQgd2FybnM6IElXYXJuaW5ncyA9IHt9O1xyXG5cclxuICAgIGxldCBudW1iZXJzOiBudW1iZXJbXSA9IFtvcHRpb25zLm1pbiwgb3B0aW9ucy5tYXgsIG9wdGlvbnMuc3RlcF07XHJcbiAgICBpZiAob3B0aW9ucy5yYW5nZSkge1xyXG4gICAgICAgIG51bWJlcnMucHVzaChvcHRpb25zLnJhbmdlWzBdLCBvcHRpb25zLnJhbmdlWzFdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbnVtYmVycy5wdXNoKG9wdGlvbnMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZiAoICF2YWxpZGF0ZU51bWJlcnMobnVtYmVycykgKSB7IFxyXG4gICAgICAgIHdhcm5zLnZhbHVlc0FyZU5vdE51bWJlcnMgPSB3YXJuaW5ncy52YWx1ZXNBcmVOb3ROdW1iZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggIXZhbGlkYXRlSW50ZWdlcnMobnVtYmVycykgKSB7XHJcbiAgICAgICAgd2FybnMudmFsdWVzQXJlTm90SW50ZWdlciA9IHdhcm5pbmdzLnZhbHVlc0FyZU5vdEludGVnZXI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCBvcHRpb25zLm1pbiA+IG9wdGlvbnMubWF4ICkge1xyXG4gICAgICAgIHdhcm5zLm1pbklzT3Zlck1heCA9IHdhcm5pbmdzLm1pbklzT3Zlck1heDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIG9wdGlvbnMubWluID09IG9wdGlvbnMubWF4ICkge1xyXG4gICAgICAgIHdhcm5zLm1pbklzRXF1YWxUb01heCA9IHdhcm5pbmdzLm1pbklzRXF1YWxUb01heDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIG9wdGlvbnMucmFuZ2UgKSB7XHJcbiAgICAgICAgaWYgKCAhQXJyYXkuaXNBcnJheShvcHRpb25zLnJhbmdlKSB8fCBvcHRpb25zLnJhbmdlLmxlbmd0aCAhPSAyICkge1xyXG4gICAgICAgICAgICB3YXJucy53cm9uZ1JhbmdlTGVuZ3RoID0gd2FybmluZ3Mud3JvbmdSYW5nZUxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggIXdhcm5zLndyb25nUmFuZ2VMZW5ndGggJiYgb3B0aW9ucy5yYW5nZVswXSA+IG9wdGlvbnMucmFuZ2VbMV0gKSB7XHJcbiAgICAgICAgICAgIHdhcm5zLndyb25nT3JkZXJJblJhbmdlID0gd2FybmluZ3Mud3JvbmdPcmRlckluUmFuZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICggTWF0aC5hYnMob3B0aW9ucy5tYXggLSBvcHRpb25zLm1pbikgPCBNYXRoLmFicyhvcHRpb25zLnN0ZXApICkge1xyXG4gICAgICAgIHdhcm5zLnRvb0JpZ1N0ZXAgPSB3YXJuaW5ncy50b29CaWdTdGVwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAoIG9wdGlvbnMuc3RlcCA9PSAwICkge1xyXG4gICAgICAgIHdhcm5zLnN0ZXBJc051bGwgPSB3YXJuaW5ncy5zdGVwSXNOdWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggdHlwZW9mIG9wdGlvbnMucmV2ZXJzZSAhPSAnYm9vbGVhbicgKSB7XHJcbiAgICAgICAgd2FybnMucmV2ZXJzZUlzTm90Qm9vbGVhbiA9IHdhcm5pbmdzLnJldmVyc2VJc05vdEJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCBvcHRpb25zLmN1c3RvbVZhbHVlcyApIHtcclxuICAgICAgICBpZiAoICFBcnJheS5pc0FycmF5KG9wdGlvbnMuY3VzdG9tVmFsdWVzKSApIHtcclxuICAgICAgICAgICAgd2FybnMuY3VzdG9tVmFsdWVzSXNOb3RBcnJheSA9IHdhcm5pbmdzLmN1c3RvbVZhbHVlc0lzTm90QXJyYXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICF3YXJucy5jdXN0b21WYWx1ZXNJc05vdEFycmF5ICYmIG9wdGlvbnMuY3VzdG9tVmFsdWVzLmxlbmd0aCA8IDIgKSB7XHJcbiAgICAgICAgICAgIHdhcm5zLmN1c3RvbVZhbHVlc0lzVG9vU21hbGwgPSB3YXJuaW5ncy5jdXN0b21WYWx1ZXNJc1Rvb1NtYWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gd2FybnM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlTnVtYmVycyhudW1iZXJzOiBudW1iZXJbXSk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGlzVmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgbnVtYmVycy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHsgXHJcbiAgICAgICAgaWYoICFpc051bWVyaWMoaXRlbSkgKSB7IFxyXG4gICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXNWYWxpZDtcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVJbnRlZ2VycyhudW1iZXJzOiBudW1iZXJbXSk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGlzVmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgbnVtYmVycy5mb3JFYWNoKGZ1bmN0aW9uKG51bSkge1xyXG4gICAgICAgIGlmICggbnVtICUgMSAhPSAwICkgeyBcclxuICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGlzVmFsaWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlVmlldyhvcHRpb25zKTogSVdhcm5pbmdzIHtcclxuICAgIGxldCB3YXJuczogSVdhcm5pbmdzID0ge307XHJcblxyXG4gICAgaWYgKCAhb3B0aW9ucy5sZW5ndGgubWF0Y2goL15cXGR7MSwzfVsuLF0/XFxkKihweHxlbXxyZW18JXx2aHx2dyk/JC9pKSApIHtcclxuICAgICAgICB3YXJucy5pbnZhbGlkTGVuZ3RoID0gd2FybmluZ3MuaW52YWxpZExlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIHR5cGVvZiBvcHRpb25zLnZlcnRpY2FsICE9ICdib29sZWFuJyApIHtcclxuICAgICAgICB3YXJucy52ZXJ0aWNhbElzTm90Qm9vbGVhbiA9IHdhcm5pbmdzLnZlcnRpY2FsSXNOb3RCb29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggdHlwZW9mIG9wdGlvbnMudG9vbHRpcCAhPSAnYm9vbGVhbicgKSB7XHJcbiAgICAgICAgd2FybnMudG9vbHRpcElzTm90Qm9vbGVhbiA9IHdhcm5pbmdzLnRvb2x0aXBJc05vdEJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCB0eXBlb2Ygb3B0aW9ucy5zY2FsZSAhPSAnYm9vbGVhbicgKSB7XHJcbiAgICAgICAgd2FybnMuc2NhbGVJc05vdEJvb2xlYW4gPSB3YXJuaW5ncy5zY2FsZUlzTm90Qm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gd2FybnM7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHZhbGlkYXRlTW9kZWwsIHZhbGlkYXRlVmlldywgSVdhcm5pbmdzIH0iXSwic291cmNlUm9vdCI6IiJ9