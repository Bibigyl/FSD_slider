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
    Model.prototype.update = function (config) {
        switch (config.type) {
            case 'NEW_VALUE_IN_PERCENT':
                this.setValueByPercent(config.percent, config.index);
                this.notify({
                    type: 'NEW_VALUE',
                    options: this.getOptions()
                });
                break;
            case 'NEW_DATA':
                var prevOptions = this.getOptions();
                this.validate(Object.assign({}, prevOptions, config.options));
                var validOptions = this.normalize(config.options, prevOptions);
                if (!commonFunctions_1.deepEqual(prevOptions, validOptions)) {
                    this.setOptions(validOptions);
                    this.notify({
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
            this.notify({
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
        this.callbacks = [];
    }
    Subject.prototype.attach = function (callback) {
        this.callbacks.push(callback);
    };
    Subject.prototype.detach = function (callback) {
        var callbackIndex = this.callbacks.indexOf(callback);
        this.callbacks.splice(callbackIndex, 1);
    };
    Subject.prototype.notify = function (config) {
        for (var _i = 0, _a = this.callbacks; _i < _a.length; _i++) {
            var callback = _a[_i];
            callback(config);
        }
    };
    return Subject;
}());
exports.Subject = Subject;


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
        _this._model.attach(function (config) {
            that._view.update(config);
            that.notify(config);
        });
        _this._view.attach(function (config) {
            that._model.update(config);
            that.notify(config);
        });
        return _this;
    }
    Presenter.prototype.update = function (config) {
        var options;
        var warnings;
        this._model.update(config);
        config.options = Object.assign(config.options, this._model.getOptions());
        this._view.update(config);
        options = this.getOptions();
        this.notify({
            type: 'NEW_DATA',
            options: options
        });
        warnings = this.getWarnings();
        if (Object.keys(warnings).length != 0) {
            this.notify({
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
    View.prototype.update = function (config) {
        switch (config.type) {
            case 'NEW_VALUE':
                this.setThumbs(config.options);
                this.setBarPosition();
                if (this._tooltip || this._tooltipFirst) {
                    this.setTooltipValues(config.options);
                }
                break;
            case 'NEW_DATA':
                config.options = Object.assign({}, this.getOptions(), config.options);
                this.validate(config.options);
                this.rebuild(config.options);
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
        this.notify({
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
        this.notify({
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
            this.notify({
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
                var config = {
                    type: 'NEW_DATA',
                    options: options
                };
                $(this).data('sliderData').presenter.update(config);
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
        observe: function (callback) {
            var presenter = $(this).data('sliderData').presenter;
            presenter.attach(callback);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb25GdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZmF1bHRPcHRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsaWRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSw4RkFBNEQ7QUFDNUQsNEVBQXdEO0FBQ3hELGlHQUEyRTtBQUMzRSxxRkFBeUQ7QUFxQnpEO0lB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Q0FBQztJQUUxQixJQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLENBQUMsRUFBRztRQUNuRSxLQUFLLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7S0FDaEQ7SUFFRCxJQUFLLE9BQU8sT0FBTyxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUc7UUFDeEMsS0FBSyxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM5RDtJQUVELElBQUssT0FBTyxPQUFPLENBQUMsT0FBTyxJQUFJLFNBQVMsRUFBRztRQUN2QyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDO0tBQzVEO0lBRUQsSUFBSyxPQUFPLE9BQU8sQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFHO1FBQ3JDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsaUJBQWlCLENBQUM7S0FDeEQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRXVCLG9DQUFZIiwiZmlsZSI6InNsaWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCB7IElTdWJqZWN0LCBTdWJqZWN0LCBJQ29uZmlnIH0gZnJvbSAnLi9PYnNlcnZlcic7XHJcbmltcG9ydCB7IGlzTnVtZXJpYywgZ2V0TnVtYmVyT2ZTdGVwcywgZGVlcEVxdWFsIH0gZnJvbSAnLi9jb21tb25GdW5jdGlvbnMnO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZU1vZGVsLCBJV2FybmluZ3MgfSBmcm9tICcuL3ZhbGlkYXRpb25zJztcclxuXHJcbmludGVyZmFjZSBJTW9kZWxPcHRpb25zIHtcclxuICAgIC8vW3g6IHN0cmluZ106IGFueTtcclxuICAgIHZhbHVlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgbWluOiBudW1iZXI7XHJcbiAgICBtYXg6IG51bWJlcjtcclxuICAgIHN0ZXA6IG51bWJlcjtcclxuICAgIHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDtcclxuICAgIGN1c3RvbVZhbHVlcz86IHN0cmluZ1tdO1xyXG4gICAgcmV2ZXJzZTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElNb2RlbCBleHRlbmRzIElTdWJqZWN0IHtcclxuICAgIHVwZGF0ZShjb25maWc6IElDb25maWcpOiB2b2lkO1xyXG5cclxuICAgIGdldE9wdGlvbnMoKTogSU1vZGVsT3B0aW9ucztcclxuICAgIGdldFdhcm5pbmdzKCk6IElXYXJuaW5ncztcclxufVxyXG5cclxuXHJcbmNsYXNzIE1vZGVsIGV4dGVuZHMgU3ViamVjdCBpbXBsZW1lbnRzIElNb2RlbCB7XHJcbiAgICBwcml2YXRlIF92YWx1ZTogbnVtYmVyIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX21pbjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbWF4OiBudW1iZXI7ICAgXHJcbiAgICBwcml2YXRlIF9zdGVwOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9yYW5nZTogW251bWJlciwgbnVtYmVyXSB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9jdXN0b21WYWx1ZXM/OiBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3JldmVyc2U6IGJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSBfd2FybmluZ3M6IElXYXJuaW5ncztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJTW9kZWxPcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIGxldCBmdWxsT3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICBsZXQgdmFsaWRPcHRpb25zOiBJTW9kZWxPcHRpb25zO1xyXG5cclxuICAgICAgICB0aGlzLnZhbGlkYXRlKGZ1bGxPcHRpb25zKTtcclxuICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLm5vcm1hbGl6ZShmdWxsT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyh2YWxpZE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIHVwZGF0ZShjb25maWc6IElDb25maWcpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgc3dpdGNoIChjb25maWcudHlwZSkge1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnTkVXX1ZBTFVFX0lOX1BFUkNFTlQnOlxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVCeVBlcmNlbnQoY29uZmlnLnBlcmNlbnQsIGNvbmZpZy5pbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoeyBcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnTkVXX1ZBTFVFJyxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ05FV19EQVRBJzpcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldk9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUoT2JqZWN0LmFzc2lnbih7fSwgcHJldk9wdGlvbnMsIGNvbmZpZy5vcHRpb25zKSlcclxuICAgICAgICAgICAgICAgIGxldCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLm5vcm1hbGl6ZShjb25maWcub3B0aW9ucywgcHJldk9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggIWRlZXBFcXVhbChwcmV2T3B0aW9ucywgdmFsaWRPcHRpb25zKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE9wdGlvbnModmFsaWRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnTkVXX0RBVEEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fdmFsdWUsXHJcbiAgICAgICAgICAgIG1pbjogdGhpcy5fbWluLFxyXG4gICAgICAgICAgICBtYXg6IHRoaXMuX21heCwgICBcclxuICAgICAgICAgICAgc3RlcDogdGhpcy5fc3RlcCxcclxuICAgICAgICAgICAgcmFuZ2U6IHRoaXMuX3JhbmdlLFxyXG4gICAgICAgICAgICBjdXN0b21WYWx1ZXM6IHRoaXMuX2N1c3RvbVZhbHVlcyxcclxuICAgICAgICAgICAgcmV2ZXJzZTogdGhpcy5fcmV2ZXJzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fd2FybmluZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0T3B0aW9ucyhvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBvcHRpb25zLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX21pbiA9IG9wdGlvbnMubWluO1xyXG4gICAgICAgIHRoaXMuX21heCA9IG9wdGlvbnMubWF4O1xyXG4gICAgICAgIHRoaXMuX3N0ZXAgPSBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBvcHRpb25zLnJhbmdlO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVZhbHVlcyA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzOyAgICAgIFxyXG4gICAgICAgIHRoaXMuX3JldmVyc2UgPSBvcHRpb25zLnJldmVyc2U7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlKG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5fd2FybmluZ3MgPSB7fTtcclxuICAgICAgICB0aGlzLl93YXJuaW5ncyA9IHZhbGlkYXRlTW9kZWwob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICggT2JqZWN0LmtleXModGhpcy5fd2FybmluZ3MpLmxlbmd0aCAhPSAwICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHdhcm5pbmdzOiBJV2FybmluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl93YXJuaW5ncyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnV0FSTklOR1MnLFxyXG4gICAgICAgICAgICAgICAgd2FybmluZ3M6IHdhcm5pbmdzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbm9ybWFsaXplKG9wdGlvbnM6IElNb2RlbE9wdGlvbnMsIHZhbGlkT3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IElNb2RlbE9wdGlvbnMge1xyXG5cclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdmFsaWRPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLl93YXJuaW5ncy5jdXN0b21WYWx1ZXNJc05vdEFycmF5IHx8IHRoaXMuX3dhcm5pbmdzLmN1c3RvbVZhbHVlc0lzVG9vU21hbGwgKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuY3VzdG9tVmFsdWVzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmN1c3RvbVZhbHVlcyApIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5taW4gPSAwO1xyXG4gICAgICAgICAgICBvcHRpb25zLm1heCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcHRpb25zLm1pbiA9IHRoaXMubm9ybWFsaXplTnVtYmVyKG9wdGlvbnMubWluLCB2YWxpZE9wdGlvbnMubWluKTtcclxuICAgICAgICBvcHRpb25zLm1heCA9IHRoaXMubm9ybWFsaXplTnVtYmVyKG9wdGlvbnMubWF4LCB2YWxpZE9wdGlvbnMubWF4KTtcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLnN0ZXAsIHZhbGlkT3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLl93YXJuaW5ncy5taW5Jc092ZXJNYXggKSB7XHJcbiAgICAgICAgICAgIFtvcHRpb25zLm1pbiwgb3B0aW9ucy5tYXhdID0gW29wdGlvbnMubWF4LCBvcHRpb25zLm1pbl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHRoaXMuX3dhcm5pbmdzLm1pbklzRXF1YWxUb01heCApIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5taW4gPSB2YWxpZE9wdGlvbnMubWluO1xyXG4gICAgICAgICAgICBvcHRpb25zLm1heCA9IHZhbGlkT3B0aW9ucy5tYXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHRoaXMuX3dhcm5pbmdzLnN0ZXBJc051bGwgfHwgdGhpcy5fd2FybmluZ3MudG9vQmlnU3RlcCApIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5zdGVwID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIG9wdGlvbnMuc3RlcCA9IE1hdGguYWJzKG9wdGlvbnMuc3RlcCk7XHJcbiAgICAgICAgb3B0aW9ucy5yZXZlcnNlID0gISFvcHRpb25zLnJldmVyc2U7XHJcblxyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnJhbmdlICkge1xyXG4gICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gdGhpcy5ub3JtYWxpemVOdW1iZXIob3B0aW9ucy52YWx1ZSwgb3B0aW9ucy5taW4pO1xyXG4gICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gdGhpcy5maW5kQ2xvc2VzdFN0ZXAob3B0aW9ucy52YWx1ZSwgb3B0aW9ucylcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IG51bGw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFBcnJheS5pc0FycmF5KG9wdGlvbnMucmFuZ2UpICkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IFtvcHRpb25zLm1pbiwgb3B0aW9ucy5tYXhdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvcHRpb25zLnJhbmdlID0gb3B0aW9ucy5yYW5nZS5zbGljZSgwLCAyKSBhcyBbbnVtYmVyLCBudW1iZXJdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVswXSA9IHRoaXMubm9ybWFsaXplTnVtYmVyKG9wdGlvbnMucmFuZ2VbMF0sIG9wdGlvbnMubWluKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVsxXSA9IHRoaXMubm9ybWFsaXplTnVtYmVyKG9wdGlvbnMucmFuZ2VbMV0sIG9wdGlvbnMubWF4KTtcclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fd2FybmluZ3Mud3JvbmdPcmRlckluUmFuZ2UgKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJhbmdlLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhIC0gYjtcclxuICAgICAgICAgICAgICAgIH0pOyAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVswXSA9IHRoaXMuZmluZENsb3Nlc3RTdGVwKG9wdGlvbnMucmFuZ2VbMF0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnJhbmdlWzFdID0gdGhpcy5maW5kQ2xvc2VzdFN0ZXAob3B0aW9ucy5yYW5nZVsxXSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIG9wdGlvbnMudmFsdWUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgbm9ybWFsaXplTnVtYmVyKHZhbHVlOiBudW1iZXIsIGRlZmF1bHRWYWw6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlOiBudW1iZXIgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKCAhaXNOdW1lcmljKHZhbHVlKSApIHtcclxuICAgICAgICAgICAgbmV3VmFsdWUgPSBkZWZhdWx0VmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdWYWx1ZSA9IE1hdGgudHJ1bmMoK25ld1ZhbHVlKTtcclxuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgZmluZENsb3Nlc3RTdGVwKHZhbHVlOiBudW1iZXIsIG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBzdGVwOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGNlaWxTdGVwczogbnVtYmVyO1xyXG4gICAgICAgIGxldCByZXN0T2ZTdGVwOiBudW1iZXI7XHJcblxyXG4gICAgICAgIGlmICggIW9wdGlvbnMucmV2ZXJzZSApIHtcclxuICAgICAgICAgICAgY2VpbFN0ZXBzID0gTWF0aC50cnVuYyggKHZhbHVlIC0gb3B0aW9ucy5taW4pIC8gb3B0aW9ucy5zdGVwICk7XHJcbiAgICAgICAgICAgIHJlc3RPZlN0ZXAgPSAodmFsdWUgLSBvcHRpb25zLm1pbikgJSBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBvcHRpb25zLm1pbiArIGNlaWxTdGVwcyAqIG9wdGlvbnMuc3RlcDtcclxuICAgICAgICAgICAgc3RlcCA9IHJlc3RPZlN0ZXAgPj0gb3B0aW9ucy5zdGVwLzIgPyBzdGVwICsgb3B0aW9ucy5zdGVwIDogc3RlcDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2VpbFN0ZXBzID0gTWF0aC50cnVuYyggKG9wdGlvbnMubWF4IC0gdmFsdWUpIC8gb3B0aW9ucy5zdGVwICk7XHJcbiAgICAgICAgICAgIHJlc3RPZlN0ZXAgPSAob3B0aW9ucy5tYXggLSB2YWx1ZSkgJSBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBvcHRpb25zLm1heCAtIGNlaWxTdGVwcyAqIG9wdGlvbnMuc3RlcDtcclxuICAgICAgICAgICAgc3RlcCA9IHJlc3RPZlN0ZXAgPj0gb3B0aW9ucy5zdGVwLzIgPyBzdGVwIC0gb3B0aW9ucy5zdGVwIDogc3RlcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0ZXAgPSBzdGVwID4gb3B0aW9ucy5tYXggPyBvcHRpb25zLm1heCA6IHN0ZXA7XHJcbiAgICAgICAgc3RlcCA9IHN0ZXAgPCBvcHRpb25zLm1pbiA/IG9wdGlvbnMubWluIDogc3RlcDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0ZXA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgc2V0VmFsdWVCeVBlcmNlbnQocGVyY2VudDogbnVtYmVyLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBuZXdWYWx1ZTogbnVtYmVyO1xyXG5cclxuICAgICAgICBuZXdWYWx1ZSA9IHBlcmNlbnQgKiAodGhpcy5fbWF4IC0gdGhpcy5fbWluKSAvIDEwMDtcclxuICAgICAgICBuZXdWYWx1ZSA9ICF0aGlzLl9yZXZlcnNlID8gXHJcbiAgICAgICAgdGhpcy5fbWluICsgbmV3VmFsdWUgOlxyXG4gICAgICAgIHRoaXMuX21heCAtIG5ld1ZhbHVlO1xyXG5cclxuICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuZmluZENsb3Nlc3RTdGVwKG5ld1ZhbHVlLCB0aGlzLmdldE9wdGlvbnMoKSk7XHJcblxyXG4gICAgICAgIGlmICggIXRoaXMuX3JhbmdlICkge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IGlzRmlyc3RJblJhbmdlOiBib29sZWFuO1xyXG4gICAgICAgICAgICBpc0ZpcnN0SW5SYW5nZSA9IGluZGV4ID09IDAgJiYgIXRoaXMuX3JldmVyc2U7XHJcbiAgICAgICAgICAgIGlzRmlyc3RJblJhbmdlID0gaXNGaXJzdEluUmFuZ2UgfHwgaW5kZXggPT0gMSAmJiB0aGlzLl9yZXZlcnNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzRmlyc3RJblJhbmdlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBNYXRoLm1pbihuZXdWYWx1ZSwgdGhpcy5fcmFuZ2VbMV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmFuZ2VbMF0gPSBuZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IE1hdGgubWF4KG5ld1ZhbHVlLCB0aGlzLl9yYW5nZVswXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yYW5nZVsxXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgSU1vZGVsLCBJTW9kZWxPcHRpb25zIH07XHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG4iLCJpbXBvcnQgeyBJTW9kZWxPcHRpb25zIH0gZnJvbSBcIi4vTW9kZWxcIjtcclxuaW1wb3J0IHsgSVZpZXdPcHRpb25zIH0gZnJvbSBcIi4vVmlld1wiO1xyXG5pbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gXCIuL2RlZmF1bHRPcHRpb25zXCI7XHJcbmltcG9ydCB7IElXYXJuaW5ncyB9IGZyb20gXCIuL3ZhbGlkYXRpb25zXCI7XHJcblxyXG5cclxuaW50ZXJmYWNlIElTdWJqZWN0IHtcclxuICAgIGF0dGFjaChjYWxsYmFjazogYW55KTogdm9pZDtcclxuICAgIGRldGFjaChjYWxsYmFjazogYW55KTogdm9pZDtcclxuICAgIG5vdGlmeShjb25maWc6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIFN1YmplY3QgaW1wbGVtZW50cyBJU3ViamVjdCB7XHJcbiAgICBwcm90ZWN0ZWQgY2FsbGJhY2tzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBhdHRhY2goY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjYWxsYmFja0luZGV4OiBudW1iZXIgPSB0aGlzLmNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrcy5zcGxpY2UoY2FsbGJhY2tJbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5vdGlmeShjb25maWc6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5jYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJQ29uZmlnIHtcclxuICAgIHR5cGU6IHN0cmluZyxcclxuICAgIC8vID8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/XHJcbiAgICAvL29wdGlvbnM/OiBJTW9kZWxPcHRpb25zIHwgSVZpZXdPcHRpb25zIHwgSU9wdGlvbnMsXHJcbiAgICBvcHRpb25zPzogYW55LFxyXG4gICAgcGVyY2VudD86IG51bWJlcixcclxuICAgIGluZGV4PzogbnVtYmVyLFxyXG4gICAgd2FybmluZ3M/OiBJV2FybmluZ3NcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IElTdWJqZWN0LCBTdWJqZWN0LCBJQ29uZmlnIH07XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLyogXHJcbmltcG9ydCB7IElPcHRpb25zIH0gZnJvbSBcIi4vZGVmYXVsdE9wdGlvbnNcIjtcclxuXHJcbi8v0JjQvdGC0YTQtdGA0YTQtdC50YEg0LjQt9C00LDRgtC10LvRjyDQvtCx0YrRj9Cy0LvRj9C10YIg0L3QsNCx0L7RgCDQvNC10YLQvtC00L7QsiDQtNC70Y8g0YPQv9GA0LDQstC70LXQvdC40Y/QvNC4INC/0L7QtNC/0LjRgdC60LjRh9Cw0LzQuC5cclxuaW50ZXJmYWNlIElTdWJqZWN0IHtcclxuXHJcbiAgICAvLyDQn9GA0LjRgdC+0LXQtNC40L3Rj9C10YIg0L3QsNCx0LvRjtC00LDRgtC10LvRjyDQuiDQuNC30LTQsNGC0LXQu9GOLlxyXG4gICAgYXR0YWNoKG9ic2VydmVyOiBhbnkpOiB2b2lkO1xyXG5cclxuICAgIC8vINCe0YLRgdC+0LXQtNC40L3Rj9C10YIg0L3QsNCx0LvRjtC00LDRgtC10LvRjyDQvtGCINC40LfQtNCw0YLQtdC70Y8uXHJcbiAgICBkZXRhY2gob2JzZXJ2ZXI6IGFueSk6IHZvaWQ7XHJcblxyXG4gICAgLy8g0KPQstC10LTQvtC80LvRj9C10YIg0LLRgdC10YUg0L3QsNCx0LvRjtC00LDRgtC10LvQtdC5INC+INGB0L7QsdGL0YLQuNC4LlxyXG4gICAgbm90aWZ5KGNvbmZpZzogYW55KTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgU3ViamVjdCBpbXBsZW1lbnRzIElTdWJqZWN0IHtcclxuICAgIHByb3RlY3RlZCBvYnNlcnZlcnM6IGFueVtdID0gW107XHJcblxyXG4gICAgYXR0YWNoKG9ic2VydmVyOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXRhY2gob2JzZXJ2ZXI6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG9ic2VydmVySW5kZXggPSB0aGlzLm9ic2VydmVycy5pbmRleE9mKG9ic2VydmVyKTtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5zcGxpY2Uob2JzZXJ2ZXJJbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgbm90aWZ5KCkge1xyXG4gICAgICAgIGZvciAoY29uc3Qgb2JzZXJ2ZXIgb2YgdGhpcy5vYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIudXBkYXRlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmludGVyZmFjZSBJT3V0ZXJPYnNlcnZlciB7XHJcbiAgICBmdW5jOiBhbnk7XHJcbiAgICB1cGRhdGUob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBPdXRlck9ic2VydmVyIGltcGxlbWVudHMgSU91dGVyT2JzZXJ2ZXIge1xyXG4gICAgZnVuYzogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGZ1bmM6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5mdW5jID0gZnVuYztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mdW5jKG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IElTdWJqZWN0LCBTdWJqZWN0fTtcclxuZXhwb3J0IHsgSU91dGVyT2JzZXJ2ZXIsIE91dGVyT2JzZXJ2ZXJ9ICovIiwiaW1wb3J0IHsgSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCBNb2RlbCwgeyBJTW9kZWwsIElNb2RlbE9wdGlvbnMgfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IFZpZXcsIHsgSVZpZXcgfSBmcm9tICcuL1ZpZXcnO1xyXG5pbXBvcnQgeyBJU3ViamVjdCwgU3ViamVjdCB9ICBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IHsgSVdhcm5pbmdzIH0gZnJvbSAnLi92YWxpZGF0aW9ucyc7XHJcblxyXG5pbnRlcmZhY2UgSVByZXNlbnRlciBleHRlbmRzIElTdWJqZWN0IHtcclxuICAgIC8vZGF0YSgpOiBJT3B0aW9ucztcclxuICAgIHVwZGF0ZShjb25maWc6IGFueSk6IHZvaWQ7XHJcblxyXG4gICAgZ2V0T3B0aW9ucygpOiBJT3B0aW9ucztcclxuICAgIGdldFdhcm5pbmdzKCk6IElXYXJuaW5ncztcclxufVxyXG5cclxuY2xhc3MgUHJlc2VudGVyIGV4dGVuZHMgU3ViamVjdCBpbXBsZW1lbnRzIElQcmVzZW50ZXIge1xyXG5cclxuICAgIHByaXZhdGUgX21vZGVsOiBJTW9kZWw7XHJcbiAgICBwcml2YXRlIF92aWV3OiBJVmlldztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJT3B0aW9ucywgbm9kZTogSFRNTERpdkVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9tb2RlbCA9IG5ldyBNb2RlbChvcHRpb25zKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucywgdGhpcy5fbW9kZWwuZ2V0T3B0aW9ucygpKTtcclxuICAgICAgICB0aGlzLl92aWV3ID0gbmV3IFZpZXcob3B0aW9ucywgbm9kZSk7XHJcblxyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGVsLmF0dGFjaChmdW5jdGlvbihjb25maWc6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGF0Ll92aWV3LnVwZGF0ZShjb25maWcpO1xyXG4gICAgICAgICAgICB0aGF0Lm5vdGlmeShjb25maWcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl92aWV3LmF0dGFjaChmdW5jdGlvbihjb25maWc6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGF0Ll9tb2RlbC51cGRhdGUoY29uZmlnKTtcclxuICAgICAgICAgICAgdGhhdC5ub3RpZnkoY29uZmlnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShjb25maWc6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnM7XHJcbiAgICAgICAgbGV0IHdhcm5pbmdzOiBJV2FybmluZ3M7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9tb2RlbC51cGRhdGUoY29uZmlnKTtcclxuXHJcbiAgICAgICAgY29uZmlnLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGNvbmZpZy5vcHRpb25zLCB0aGlzLl9tb2RlbC5nZXRPcHRpb25zKCkpO1xyXG5cclxuICAgICAgICB0aGlzLl92aWV3LnVwZGF0ZShjb25maWcpO1xyXG5cclxuICAgICAgICBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICB0eXBlOiAnTkVXX0RBVEEnLFxyXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdhcm5pbmdzID0gdGhpcy5nZXRXYXJuaW5ncygpO1xyXG4gICAgICAgIGlmICggT2JqZWN0LmtleXMod2FybmluZ3MpLmxlbmd0aCAhPSAwICkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCchISEhIScpXHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdXQVJOSU5HUycsXHJcbiAgICAgICAgICAgICAgICB3YXJuaW5nczogd2FybmluZ3NcclxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbi8qICAgICB1cGRhdGUoY29uZmlnOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IGlzTW9kZWxVcGRhdGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGlzVmlld1VwZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IG1vZGVsT3B0aW9uczogc3RyaW5nW10gPSBbJ3ZhbHVlJywgJ21pbicsICdtYXgnLCAnc3RlcCcsICdyZXZlcnNlJywgJ3JhbmdlJywgJ2N1c3RvbVZhbHVlcyddO1xyXG5cclxuICAgICAgICBtb2RlbE9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmICggY29uZmlnLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoaXRlbSkgKSB7XHJcbiAgICAgICAgICAgICAgICBpc01vZGVsVXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGlzTW9kZWxVcGRhdGVkKSB7IFxyXG4gICAgICAgICAgICB0aGlzLl9tb2RlbC51cGRhdGUoY29uZmlnKTtcclxuICAgICAgICAgICAgaXNWaWV3VXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IHZpZXdPcHRpb25zOiBzdHJpbmdbXSA9IFsnbGVuZ3RoJywgJ3ZlcnRpY2FsJywgJ3Rvb2x0aXAnLCAnc2NhbGUnXTtcclxuXHJcbiAgICAgICAgdmlld09wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmICggY29uZmlnLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoaXRlbSkgKSB7XHJcbiAgICAgICAgICAgICAgICBpc1ZpZXdVcGRhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXNWaWV3VXBkYXRlZCkge1xyXG4gICAgICAgICAgICBjb25maWcub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oY29uZmlnLm9wdGlvbnMsIHRoaXMuX21vZGVsLmdldE9wdGlvbnMoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZXcudXBkYXRlKGNvbmZpZyk7XHJcbiAgICAgICAgICAgIGNvbmZpZy5vcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc01vZGVsVXBkYXRlZCB8fCBpc1ZpZXdVcGRhdGVkKSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5ub3RpZnkoY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9ICovXHJcblxyXG4gICAgcHVibGljIGdldE9wdGlvbnMoKTogSU9wdGlvbnMge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9tb2RlbC5nZXRPcHRpb25zKCksIHRoaXMuX3ZpZXcuZ2V0T3B0aW9ucygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fbW9kZWwuZ2V0V2FybmluZ3MoKSwgdGhpcy5fdmlldy5nZXRXYXJuaW5ncygpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJlc2VudGVyOyIsImltcG9ydCB7IElPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG4vL2ltcG9ydCB7IElNb2RlbCwgSU1vZGVsT3B0aW9ucyB9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgeyBJU3ViamVjdCwgU3ViamVjdCB9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5pbXBvcnQgeyBpc051bWVyaWMsIGdldE51bWJlck9mU3RlcHMgfSBmcm9tICcuL2NvbW1vbkZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IHZhbGlkYXRlVmlldywgSVdhcm5pbmdzIH0gZnJvbSAnLi92YWxpZGF0aW9ucyc7XHJcblxyXG5cclxuaW50ZXJmYWNlIElWaWV3T3B0aW9ucyB7XHJcbiAgICBsZW5ndGg6IHN0cmluZztcclxuICAgIHZlcnRpY2FsOiBib29sZWFuO1xyXG4gICAgdG9vbHRpcDogYm9vbGVhbjtcclxuICAgIHNjYWxlOiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSVZpZXcgZXh0ZW5kcyBJU3ViamVjdCB7XHJcbiAgICB1cGRhdGUoY29uZmlnOiBhbnkpOiB2b2lkO1xyXG5cclxuICAgIGdldE9wdGlvbnMoKTogSVZpZXdPcHRpb25zO1xyXG4gICAgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzO1xyXG59XHJcblxyXG5jbGFzcyBWaWV3IGV4dGVuZHMgU3ViamVjdCBpbXBsZW1lbnRzIElWaWV3ICB7XHJcbiAgICBbeDogc3RyaW5nXTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgX2xlbmd0aDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdmVydGljYWw6IGJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSBfc2xpZGVyOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHByaXZhdGUgX3RodW1iPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90aHVtYkZpcnN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90aHVtYkxhc3Q/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2JhcjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwRmlyc3Q/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBMYXN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9zY2FsZT86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgX2FjdGl2ZVRodW1iOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHByaXZhdGUgX3dhcm5pbmdzOiBJV2FybmluZ3M7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElPcHRpb25zLCBzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCkge1xyXG5cclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZShvcHRpb25zKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2xpZGVyID0gc2xpZGVyTm9kZTtcclxuICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGQob3B0aW9ucylcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShjb25maWc6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGNvbmZpZy50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdORVdfVkFMVUUnOlxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJzKGNvbmZpZy5vcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QmFyUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwIHx8IHRoaXMuX3Rvb2x0aXBGaXJzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VG9vbHRpcFZhbHVlcyhjb25maWcub3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ05FV19EQVRBJzpcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0T3B0aW9ucygpLCBjb25maWcub3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZShjb25maWcub3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlYnVpbGQoY29uZmlnLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRPcHRpb25zKCk6IElWaWV3T3B0aW9ucyB7XHJcbiAgICAgICAgbGV0IHRvb2x0aXAgPSAhIXRoaXMuX3Rvb2x0aXAgfHwgISF0aGlzLl90b29sdGlwRmlyc3Q7XHJcbiAgICAgICAgbGV0IHNjYWxlID0gISF0aGlzLl9zY2FsZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGVuZ3RoOiAgdGhpcy5fbGVuZ3RoLFxyXG4gICAgICAgICAgICB2ZXJ0aWNhbDogdGhpcy5fdmVydGljYWwsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IHRvb2x0aXAsXHJcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fd2FybmluZ3MpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVRodW1iRG93bihldmVudCk6IHZvaWQge1xyXG4gICAgICAgIC8vINC/0YDQtdC00L7RgtCy0YDQsNGC0LjRgtGMINC30LDQv9GD0YHQuiDQstGL0LTQtdC70LXQvdC40Y8gKNC00LXQudGB0YLQstC40LUg0LHRgNCw0YPQt9C10YDQsClcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHVtYiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlVGh1bWJNb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVUaHVtYlVwKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRodW1iTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZVRodW1iVXApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlVGh1bWJNb3ZlKGV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gdGhpcy5nZXRMZW5ndGhJblB4KCk7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyID0gdGhpcy5nZXRPZmZzZXRJblB4KCk7XHJcbiAgICAgICAgbGV0IGV2ZW50UG9zOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG5ld1RodW1iUG9zaXRpb246IG51bWJlcjtcclxuICAgICAgICBsZXQgaW5kZXg6IG51bWJlcjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZXZlbnQudG91Y2hlcykge1xyXG4gICAgICAgICAgICBldmVudFBvcyA9ICF0aGlzLl92ZXJ0aWNhbCA/IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudFBvcyA9ICF0aGlzLl92ZXJ0aWNhbCA/IGV2ZW50LmNsaWVudFggOiBldmVudC5jbGllbnRZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV3VGh1bWJQb3NpdGlvbiA9IChldmVudFBvcyAtIG9mZnNldCkgLyBsZW5ndGggKiAxMDA7XHJcbiAgICAgICAgaW5kZXggPSB0aGlzLl9hY3RpdmVUaHVtYiA9PSB0aGlzLl90aHVtYkxhc3QgPyAxIDogMDtcclxuXHJcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICB0eXBlOiAnTkVXX1ZBTFVFX0lOX1BFUkNFTlQnLFxyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIHBlcmNlbnQ6IG5ld1RodW1iUG9zaXRpb25cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVNsaWRlckNsaWNrKGV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gdGhpcy5nZXRMZW5ndGhJblB4KCk7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyID0gdGhpcy5nZXRPZmZzZXRJblB4KCk7XHJcbiAgICAgICAgbGV0IGV2ZW50UG9zOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG5ld1RodW1iUG9zaXRpb246IG51bWJlcjtcclxuICAgICAgICBsZXQgaW5kZXg6IG51bWJlcjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZXZlbnQudG91Y2hlcykge1xyXG4gICAgICAgICAgICBldmVudFBvcyA9ICF0aGlzLl92ZXJ0aWNhbCA/IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudFBvcyA9ICF0aGlzLl92ZXJ0aWNhbCA/IGV2ZW50LmNsaWVudFggOiBldmVudC5jbGllbnRZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV3VGh1bWJQb3NpdGlvbiA9IChldmVudFBvcyAtIG9mZnNldCkgLyBsZW5ndGggKiAxMDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX3RodW1iKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdG9wTGVmdDogc3RyaW5nID0gIXRoaXMuX3ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XHJcblxyXG4gICAgICAgICAgICBsZXQgZmlyc3RUaHVtYlBvczogbnVtYmVyID0gcGFyc2VJbnQoIHRoaXMuX3RodW1iRmlyc3Quc3R5bGVbdG9wTGVmdF0gKTtcclxuICAgICAgICAgICAgbGV0IGxhc3RUaHVtYlBvczogbnVtYmVyID0gcGFyc2VJbnQoIHRoaXMuX3RodW1iTGFzdC5zdHlsZVt0b3BMZWZ0XSApO1xyXG5cclxuICAgICAgICAgICAgbGV0IGlzRmlyc3RDbG9zZXI6IGJvb2xlYW47XHJcbiAgICAgICAgICAgIGlzRmlyc3RDbG9zZXIgPSBNYXRoLmFicyhmaXJzdFRodW1iUG9zIC0gbmV3VGh1bWJQb3NpdGlvbikgPCBNYXRoLmFicyhsYXN0VGh1bWJQb3MgLSBuZXdUaHVtYlBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGluZGV4ID0gaXNGaXJzdENsb3NlciA/IDAgOiAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICB0eXBlOiAnTkVXX1ZBTFVFX0lOX1BFUkNFTlQnLFxyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIHBlcmNlbnQ6IG5ld1RodW1iUG9zaXRpb25cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVRodW1iVXAoZXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVUaHVtYlVwKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZVRodW1iTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZVRodW1iVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVGh1bWJNb3ZlKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGh1bWIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZChvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgdmFsaWRMZW5ndGg6IHN0cmluZyA9IHRoaXMuX2xlbmd0aCB8fCBkZWZhdWx0T3B0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoID0gdGhpcy5nZXRWYWxpZExlbmd0aChvcHRpb25zLmxlbmd0aCwgdmFsaWRMZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSB0aGlzLl9sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS5oZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2hvcml6b250YWwnKTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IHRoaXMuX2xlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLndpZHRoID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKTsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9iYXIgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX2JhcicpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1aWxkVGh1bWJzKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLnNldEJhclBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy50b29sdGlwICkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkVG9vbHRpcHMob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5zY2FsZSApIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFNjYWxlKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlVGh1bWJEb3duID0gdGhpcy5oYW5kbGVUaHVtYkRvd24uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVRodW1iTW92ZSA9IHRoaXMuaGFuZGxlVGh1bWJNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVUaHVtYlVwID0gdGhpcy5oYW5kbGVUaHVtYlVwLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTbGlkZXJDbGljayA9IHRoaXMuaGFuZGxlU2xpZGVyQ2xpY2suYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmhhbmRsZVRodW1iRG93bik7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkZpcnN0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5oYW5kbGVUaHVtYkRvd24pO1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkZpcnN0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iTGFzdC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJMYXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVTbGlkZXJDbGljayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWJ1aWxkKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHByZXZPcHRpb25zOiBJVmlld09wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJldk9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcykge1xyXG4gICAgICAgICAgICBpZiAoa2V5ICE9ICdfc2xpZGVyJykge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB0aGlzLnJlbW92ZU5vZGUodGhpc1trZXldKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2gge30gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5idWlsZChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlKG9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl93YXJuaW5ncyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX3dhcm5pbmdzID0gdmFsaWRhdGVWaWV3KG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoIE9iamVjdC5rZXlzKHRoaXMuX3dhcm5pbmdzKS5sZW5ndGggIT0gMCApIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB3YXJuaW5nczogSVdhcm5pbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fd2FybmluZ3MpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1dBUk5JTkdTJyxcclxuICAgICAgICAgICAgICAgIHdhcm5pbmdzOiB3YXJuaW5nc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkVGh1bWJzKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWIgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iJyk7XHJcbiAgICAgICAgfSBlbHNlIHsgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkZpcnN0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYicsICdzbGlkZXJfX3RodW1iX2ZpcnN0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iTGFzdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWInLCAnc2xpZGVyX190aHVtYl9sYXN0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFRodW1icyhvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFRodW1icyhvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwb3M6IHN0cmluZztcclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbihvcHRpb25zLnZhbHVlLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMuX3RodW1iLCBwb3MpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbnVtOiBudW1iZXI7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4IHJldmVyc2UsINGC0L4g0LvQtdCy0YvQuSDQsdC10LPRg9C90L7QuiAtINGN0YLQviDQsdC+0LvRjNGI0LXQtSDQt9C90LDRh9C10L3QuNC1XHJcbiAgICAgICAgICAgIC8vINGCLtC1LiByYW5nZVsxXVxyXG4gICAgICAgICAgICBudW0gPSAhb3B0aW9ucy5yZXZlcnNlID8gMCA6IDE7XHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24ob3B0aW9ucy5yYW5nZVtudW1dLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMuX3RodW1iRmlyc3QsIHBvcyk7XHJcblxyXG4gICAgICAgICAgICBudW0gPSBudW0gPT0gMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKG9wdGlvbnMucmFuZ2VbbnVtXSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbih0aGlzLl90aHVtYkxhc3QsIHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0QmFyUG9zaXRpb24oKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHN0YXJ0OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGxldCB0b3BMZWZ0OiBzdHJpbmcgPSAhdGhpcy5fdmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcclxuICAgICAgICBsZXQgd2lkdGhIZWlnaHQ6IHN0cmluZyA9ICF0aGlzLl92ZXJ0aWNhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcclxuXHJcbiAgICAgICAgc3RhcnQgPSB0aGlzLl90aHVtYkZpcnN0ID8gdGhpcy5fdGh1bWJGaXJzdC5zdHlsZVt0b3BMZWZ0XSA6ICcwJSc7XHJcbiAgICAgICAgbGVuZ3RoID0gdGhpcy5fdGh1bWJGaXJzdCA/IFxyXG4gICAgICAgIHRoaXMuX3RodW1iTGFzdC5zdHlsZVt0b3BMZWZ0XS5zbGljZSgwLCAtMSkgLSB0aGlzLl90aHVtYkZpcnN0LnN0eWxlW3RvcExlZnRdLnNsaWNlKDAsIC0xKSAgKyAnJScgOlxyXG4gICAgICAgIHRoaXMuX3RodW1iLnN0eWxlW3RvcExlZnRdO1xyXG5cclxuICAgICAgICB0aGlzLl9iYXIuc3R5bGVbdG9wTGVmdF0gPSBzdGFydDtcclxuICAgICAgICB0aGlzLl9iYXIuc3R5bGVbd2lkdGhIZWlnaHRdID0gbGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRUb29sdGlwcyhvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAoIW9wdGlvbnMucmFuZ2UpIHsgXHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl90aHVtYiwgJ3NsaWRlcl9fdG9vbHRpcCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBGaXJzdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3RodW1iRmlyc3QsICdzbGlkZXJfX3Rvb2x0aXAnLCAnc2xpZGVyX190b29sdGlwX2ZpcnN0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBMYXN0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5fdGh1bWJMYXN0LCAnc2xpZGVyX190b29sdGlwJywgJ3NsaWRlcl9fdG9vbHRpcF9sYXN0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFRvb2x0aXBWYWx1ZXMob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZFNjYWxlKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNjYWxlOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBsZXQgZGl2aXNpb246IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZztcclxuICAgICAgICBsZXQgaW5kZW50OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gb3B0aW9ucy5tYXggLSBvcHRpb25zLm1pbjtcclxuXHJcbiAgICAgICAgc2NhbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBzY2FsZS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3NjYWxlJyk7XHJcblxyXG4gICAgICAgIGZvciAoIGxldCBpOiBudW1iZXIgPSAwOyBpIDw9IGdldE51bWJlck9mU3RlcHMob3B0aW9ucy5taW4sIG9wdGlvbnMubWF4LCBvcHRpb25zLnN0ZXApOyBpKysgKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFvcHRpb25zLnJldmVyc2UgKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBvcHRpb25zLm1pbiArIG9wdGlvbnMuc3RlcCAqIGk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBNYXRoLm1pbih2YWwsIG9wdGlvbnMubWF4KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMubWF4IC0gb3B0aW9ucy5zdGVwICogaTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IE1hdGgubWF4KHZhbCwgb3B0aW9ucy5taW4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRlbnQgPSBpICogb3B0aW9ucy5zdGVwIDwgbGVuZ3RoID8gaSAqIG9wdGlvbnMuc3RlcCA6IGxlbmd0aDsgXHJcbiAgICAgICAgICAgIGluZGVudCA9IGluZGVudCAvIGxlbmd0aCAqIDEwMCArICclJztcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzID8gb3B0aW9ucy5jdXN0b21WYWx1ZXNbdmFsXSA6IHZhbDtcclxuXHJcbiAgICAgICAgICAgIGRpdmlzaW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUtZGl2aXNpb24nKTtcclxuICAgICAgICAgICAgZGl2aXNpb24uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwic2xpZGVyX19zY2FsZS1kaXZpc2lvbi10ZXh0XCI+JyArIHZhbCArICc8L3NwYW4+JztcclxuICAgICAgICAgICAgb3B0aW9ucy52ZXJ0aWNhbCA/IGRpdmlzaW9uLnN0eWxlLnRvcCA9IGluZGVudCA6IGRpdmlzaW9uLnN0eWxlLmxlZnQgPSBpbmRlbnQ7XHJcblxyXG4gICAgICAgICAgICBzY2FsZS5hcHBlbmQoZGl2aXNpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLnByZXBlbmQoc2NhbGUpOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFRvb2x0aXBWYWx1ZXMob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmICghb3B0aW9ucy5yYW5nZSkgeyBcclxuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMgPyBvcHRpb25zLmN1c3RvbVZhbHVlc1tvcHRpb25zLnZhbHVlXSA6IG9wdGlvbnMudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAudGV4dENvbnRlbnQgPSB2YWwgYXMgc3RyaW5nOyBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbnVtOiBudW1iZXI7XHJcbiAgICAgICAgICAgIG51bSA9ICFvcHRpb25zLnJldmVyc2UgPyAwIDogMTtcclxuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMgPyBvcHRpb25zLmN1c3RvbVZhbHVlc1tvcHRpb25zLnJhbmdlW251bV1dIDogb3B0aW9ucy5yYW5nZVtudW1dO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwRmlyc3QudGV4dENvbnRlbnQgPSB2YWwgYXMgc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgbnVtID0gbnVtID09IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMgPyBvcHRpb25zLmN1c3RvbVZhbHVlc1tvcHRpb25zLnJhbmdlW251bV1dIDogb3B0aW9ucy5yYW5nZVtudW1dO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwTGFzdC50ZXh0Q29udGVudCA9IHZhbCBhcyBzdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VGh1bWJQb3NpdGlvbih0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCBwb3NpdGlvbjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS50b3AgPSBudWxsO1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUubGVmdCA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS5sZWZ0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLnRvcCA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8geiBpbmRleFxyXG4gICAgICAgIGlmICggdGhpcy5fdGh1bWJGaXJzdCApIHtcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoICh0aGlzLl90aHVtYkZpcnN0LnN0eWxlLmxlZnQgPT0gJzEwMCUnKSB8fCAodGhpcy5fdGh1bWJGaXJzdC5zdHlsZS50b3AgPT0gJzEwMCUnKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90aHVtYkZpcnN0LnN0eWxlLnpJbmRleCA9ICcxJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGh1bWJGaXJzdC5zdHlsZS56SW5kZXggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kVGh1bWJQb3NpdGlvbih2YWx1ZTogbnVtYmVyLCBvcHRpb25zOiBJT3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHBvczogc3RyaW5nO1xyXG4gICAgICAgIHBvcyA9ICFvcHRpb25zLnJldmVyc2UgP1xyXG4gICAgICAgICh2YWx1ZSAtIG9wdGlvbnMubWluKSAvIChvcHRpb25zLm1heCAtIG9wdGlvbnMubWluKSAqIDEwMCArICclJyA6XHJcbiAgICAgICAgKG9wdGlvbnMubWF4IC0gdmFsdWUpIC8gKG9wdGlvbnMubWF4IC0gb3B0aW9ucy5taW4pICogMTAwICsgJyUnXHJcbiAgICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZU5vZGUobm9kZTogSFRNTERpdkVsZW1lbnQpOiB1bmRlZmluZWQge1xyXG4gICAgICAgIG5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkTm9kZShwYXJlbnROb2RlOiBIVE1MRGl2RWxlbWVudCwgLi4uY2xhc3Nlczogc3RyaW5nW10pOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IG5vZGU6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7ICAgICBcclxuXHJcbiAgICAgICAgZm9yICggbGV0IGk6IG51bWJlciA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZChhcmd1bWVudHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwYXJlbnROb2RlLmFwcGVuZChub2RlKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBnZXRWYWxpZExlbmd0aChzdHI6IGFueSwgdmFsaWRMZW5ndGg6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCB0eXBlb2YgKCcnICsgc3RyKSA9PSAnc3RyaW5nJyApIHtcclxuICAgICAgICAgICAgbGV0IHIgPSAoJycgKyBzdHIpLm1hdGNoKC9eXFxkezEsM31bLixdP1xcZCoocHh8ZW18cmVtfCV8dmh8dncpPyQvaSk7XHJcbiAgICAgICAgICAgIGlmICggciAmJiBpc051bWVyaWMoclswXSkgKSB7IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcsJywgJy4nKSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gclswXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJywnLCAnLicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkTGVuZ3RoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMZW5ndGhJblB4KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gIXRoaXMuX3ZlcnRpY2FsID9cclxuICAgICAgICB0aGlzLl9zbGlkZXIub2Zmc2V0V2lkdGggOlxyXG4gICAgICAgIHRoaXMuX3NsaWRlci5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgIHJldHVybiBsZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRPZmZzZXRJblB4KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyID0gIXRoaXMuX3ZlcnRpY2FsID9cclxuICAgICAgICB0aGlzLl9zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCA6XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBJVmlldywgSVZpZXdPcHRpb25zIH07XHJcbmV4cG9ydCBkZWZhdWx0IFZpZXc7IiwiZnVuY3Rpb24gaXNOdW1lcmljKG46IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiAhaXNOYU4obiAtIDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWVwRXF1YWwob2JqMSwgb2JqMikge1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iajEpPT09SlNPTi5zdHJpbmdpZnkob2JqMik7XHJcbiB9XHJcblxyXG5mdW5jdGlvbiBnZXROdW1iZXJPZlN0ZXBzKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciwgc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLmNlaWwoKG1heCAtIG1pbikgLyBzdGVwKTtcclxufVxyXG5cclxuZXhwb3J0IHsgaXNOdW1lcmljLCBnZXROdW1iZXJPZlN0ZXBzLCBkZWVwRXF1YWwgfTtcclxuXHJcbiIsImltcG9ydCB7IElNb2RlbE9wdGlvbnMgfSBmcm9tIFwiLi9Nb2RlbFwiO1xyXG5pbXBvcnQgeyBJVmlld09wdGlvbnMgfSBmcm9tIFwiLi9WaWV3XCI7XHJcblxyXG5pbnRlcmZhY2UgSU9wdGlvbnMgZXh0ZW5kcyBJTW9kZWxPcHRpb25zLCBJVmlld09wdGlvbnMge31cclxuXHJcbmxldCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMgPSB7XHJcbiAgICAvLyBNb2RlbCBvcHRpb25zXHJcbiAgICAvLyDQsiDQvdCw0YfQsNC70YzQvdGL0YUg0L3QsNGB0YLRgNC+0LnQutCw0YUg0L3QtSDQvtC/0YDQtdC00LXQu9C10L3RiyDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQuNC70Lgg0L/RgNC+0LzQtdC20YPRgtC+0LouXHJcbiAgICAvLyDQtdGB0LvQuCDQvtC90Lgg0L3QtSDRg9C60LDQt9Cw0L3RiyDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvCwg0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUgdmFsdWUgPT0gbWluIFxyXG4gICAgdmFsdWU6IG51bGwsXHJcbiAgICBtaW46IDAsXHJcbiAgICBtYXg6IDEwLFxyXG4gICAgc3RlcDogMSxcclxuICAgIHJldmVyc2U6IGZhbHNlLFxyXG4gICAgcmFuZ2U6IG51bGwsXHJcbiAgICBcclxuICAgIGxlbmd0aDogJzMwMHB4JyxcclxuICAgIHZlcnRpY2FsOiBmYWxzZSxcclxuICAgIHRvb2x0aXA6IGZhbHNlLFxyXG4gICAgc2NhbGU6IGZhbHNlLFxyXG59XHJcblxyXG5leHBvcnQgeyBJT3B0aW9ucyB9O1xyXG5leHBvcnQgeyBkZWZhdWx0T3B0aW9ucyB9O1xyXG4iLCJpbXBvcnQgTW9kZWwsIHsgSU1vZGVsIH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCBWaWV3LCB7IElWaWV3IH0gZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IFByZXNlbnRlciBmcm9tICcuL1ByZXNlbnRlcic7XHJcbmltcG9ydCB7IElPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJQ29uZmlnIH0gZnJvbSAnLi9PYnNlcnZlcic7XHJcbi8vaW1wb3J0IHsgSU91dGVyT2JzZXJ2ZXIsIE91dGVyT2JzZXJ2ZXIgfSBmcm9tICcuL09ic2VydmVyJztcclxuXHJcbihmdW5jdGlvbiAoJCkge1xyXG5cclxuICBpbnRlcmZhY2UgSU1ldGhvZHMge1xyXG4gICAgaW5pdChvcHRpb25zPzogSU9wdGlvbnMpOiB2b2lkO1xyXG4gICAgZ2V0RGF0YSgpOiBJT3B0aW9ucztcclxuICAgIHVwZGF0ZShvcHRpb25zOiBhbnkpOiB2b2lkO1xyXG4gICAgZGVzdHJveSgpOiB2b2lkO1xyXG4gICAgb2JzZXJ2ZShmdW5jOiBGdW5jdGlvbik6IHZvaWQ7XHJcbiAgfVxyXG5cclxuICB2YXIgbWV0aG9kczogSU1ldGhvZHMgPSB7XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKG9wdGlvbnM/OiBJT3B0aW9ucyk6IHZvaWQge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSAkdGhpcy5kYXRhKCdzbGlkZXJEYXRhJyk7XHJcbiAgICAgICAgbGV0IHNsaWRlciA9ICR0aGlzO1xyXG5cclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C70LDQs9C40L0g0LXRidGRINC90LUg0L/RgNC+0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNC9XHJcbiAgICAgICAgaWYgKCFkYXRhKSB7XHJcblxyXG4gICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgbGV0IHByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIob3B0aW9ucywgdGhpcyk7XHJcblxyXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJywge1xyXG4gICAgICAgICAgICBzbGlkZXI6IHNsaWRlcixcclxuICAgICAgICAgICAgcHJlc2VudGVyOiBwcmVzZW50ZXJcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXREYXRhOiBmdW5jdGlvbiAoKTogSU9wdGlvbnMge1xyXG4gICAgICByZXR1cm4gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykucHJlc2VudGVyLmdldERhdGEoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGNvbmZpZzogSUNvbmZpZyA9IHtcclxuICAgICAgICAgIHR5cGU6ICdORVdfREFUQScsXHJcbiAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnKS5wcmVzZW50ZXIudXBkYXRlKGNvbmZpZyk7XHJcblxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCk6IHZvaWQge1xyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgZGF0YSA9ICR0aGlzLmRhdGEoJ3NsaWRlckRhdGEnKTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnVuYmluZCgnLnNsaWRlcicpO1xyXG4gICAgICAgIGRhdGEuc2xpZGVyLnJlbW92ZSgpO1xyXG4gICAgICAgICR0aGlzLnJlbW92ZURhdGEoJ3NsaWRlckRhdGEnKTtcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBvYnNlcnZlOiBmdW5jdGlvbiAoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcblxyXG4gICAgICBsZXQgcHJlc2VudGVyID0gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykucHJlc2VudGVyO1xyXG4gICAgICBwcmVzZW50ZXIuYXR0YWNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4vLyA/Pz8/Pz8/Pz8/Pz8/XHJcbiAgalF1ZXJ5LmZuLnNsaWRlciA9IGZ1bmN0aW9uIChtZXRob2Q6IHN0cmluZyk6IEpRdWVyeSB7XHJcblxyXG4gICAgLy8g0LvQvtCz0LjQutCwINCy0YvQt9C+0LLQsCDQvNC10YLQvtC00LBcclxuICAgIGlmIChtZXRob2RzW21ldGhvZCBhcyBzdHJpbmddKSB7XHJcblxyXG4gICAgICByZXR1cm4gbWV0aG9kc1ttZXRob2QgYXMgc3RyaW5nXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QpIHtcclxuXHJcbiAgICAgIHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkLmVycm9yKCdNZXRob2QgY2FsbGVkICcgKyBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IGZvciBKUXVlcnkuc2xpZGVyJyk7XHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG5cclxuXHJcbi8vbGV0IHRlc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVzdCcpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHJcbi8vbGV0IHByZXMgPSBuZXcgUHJlc2VudGVyKGRlZmF1bHRPcHRpb25zLCB0ZXN0KTtcclxuXHJcbi8qICQoJy50ZXN0Jykuc2xpZGVyKHtcclxuICAvL3ZhbHVlOiAwLFxyXG4gIC8vbWluOiAtNy42NjY2LFxyXG4gIHJhbmdlOiAnaGprLCcsXHJcbiAgLy9yZXZlcnNlOiB0cnVlLFxyXG4gIC8vY3VzdG9tVmFsdWVzOiBbJ2EnLCAnYicsICdjJywgJ2QnXSxcclxuICBzdGVwOiAnaGcnLFxyXG4gIHZhbHVlOiAndnhueG0nLFxyXG4gIG1pbjogJ2ZkZ3ZoeGprJyxcclxuICBtYXg6IDE3LjUsXHJcbiAgdG9vbHRpcDogdHJ1ZSxcclxuICBzY2FsZTogdHJ1ZVxyXG59KTtcclxuXHJcbiQoJy50ZXN0Jykuc2xpZGVyKCdvYnNlcnZlJywgZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgaWYgKGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLnJhbmdlKSB7XHJcbiAgICAkKCcuaW5wdXQnKS52YWwoY29uZmlnLm9wdGlvbnMucmFuZ2UpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGNvbmZpZy50eXBlID09ICdXQVJOSU5HUycpIHtcclxuXHJcbiAgICBmb3IgKCBsZXQga2V5IGluIGNvbmZpZy53YXJuaW5ncyApIHtcclxuICAgICAgJCgnLndhcnMnKS5hcHBlbmQoJzxwPicgKyBjb25maWcud2FybmluZ3Nba2V5XSArICc8L3A+JylcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufSlcclxuXHJcbiQoJy50ZXN0Jykuc2xpZGVyKCd1cGRhdGUnLCB7XHJcbiAgbWluOiAyMCxcclxuICByYW5nZTogWzMsIDddLFxyXG4gIG1heDogLTNcclxufSlcclxuXHJcblxyXG4kKCcudGVzdCcpLnNsaWRlcigndXBkYXRlJywge1xyXG4gIG1pbjogLTUuOCxcclxuICByYW5nZTogWzMsIDcsICdkZ3ggJywgNV0sXHJcbiAgbWF4OiAndmJuJ1xyXG59KSAqL1xyXG5cclxuXHJcblxyXG4vKiBsZXQgbW9kID0gbmV3IE1vZGVsKGRlZmF1bHRPcHRpb25zKTtcclxuY29uc29sZS5sb2cobW9kLnJldmVyc2UpXHJcbm1vZC5tYWtlRnVsbENoYW5nZXMoe3JldmVyc2U6IHRydWV9KVxyXG5jb25zb2xlLmxvZyhtb2QucmV2ZXJzZSlcclxubW9kLm1ha2VGdWxsQ2hhbmdlcyh7cmV2ZXJzZTogZmFsc2V9KVxyXG5jb25zb2xlLmxvZyhtb2QucmV2ZXJzZSkgKi8iLCJpbXBvcnQgeyBJTW9kZWxPcHRpb25zIH0gZnJvbSBcIi4vTW9kZWxcIjtcclxuaW1wb3J0IHsgaXNOdW1lcmljIH0gZnJvbSBcIi4vY29tbW9uRnVuY3Rpb25zXCI7XHJcblxyXG5pbnRlcmZhY2UgSVdhcm5pbmdzIHtcclxuICAgIHZhbHVlc0FyZU5vdE51bWJlcnM/OiBzdHJpbmcsXHJcbiAgICB2YWx1ZXNBcmVOb3RJbnRlZ2VyPzogc3RyaW5nLFxyXG4gICAgbWluSXNPdmVyTWF4Pzogc3RyaW5nLFxyXG4gICAgbWluSXNFcXVhbFRvTWF4Pzogc3RyaW5nLFxyXG4gICAgd3JvbmdSYW5nZUxlbmd0aD86IHN0cmluZyxcclxuICAgIHdyb25nT3JkZXJJblJhbmdlPzogc3RyaW5nLFxyXG4gICAgdG9vQmlnU3RlcD86IHN0cmluZyxcclxuICAgIHN0ZXBJc051bGw/OiBzdHJpbmcsXHJcbiAgICByZXZlcnNlSXNOb3RCb29sZWFuPzogc3RyaW5nLFxyXG4gICAgY3VzdG9tVmFsdWVzSXNOb3RBcnJheT86IHN0cmluZyxcclxuICAgIGN1c3RvbVZhbHVlc0lzVG9vU21hbGw/IDogc3RyaW5nLFxyXG5cclxuICAgIGludmFsaWRMZW5ndGg/OiBzdHJpbmcsXHJcbiAgICB2ZXJ0aWNhbElzTm90Qm9vbGVhbj86IHN0cmluZyxcclxuICAgIHRvb2x0aXBJc05vdEJvb2xlYW4/OiBzdHJpbmcsXHJcbiAgICBzY2FsZUlzTm90Qm9vbGVhbj86IHN0cmluZyxcclxufVxyXG5cclxubGV0IHdhcm5pbmdzOiBJV2FybmluZ3MgPSB7XHJcbiAgICB2YWx1ZXNBcmVOb3ROdW1iZXJzOiAnQWxsIHZhbHVlcywgaW5zdGVhZCBvZiBjdXN0b21WYWx1ZXMsIHNob3VsZCBiZSBudW1iZXJzJyxcclxuICAgIHZhbHVlc0FyZU5vdEludGVnZXI6ICdBbGwgdmFsdWVzLCBpbnN0ZWFkIG9mIGN1c3RvbVZhbHVlcywgc2hvdWxkIGJlIGludGVnZXInLFxyXG4gICAgbWluSXNPdmVyTWF4OiAnTWluIHZhbHVlIHNob3VsZCBiZSBsZXNzIHRoZW4gbWF4IHZhbHVlJyxcclxuICAgIG1pbklzRXF1YWxUb01heDogJ01pbiB2YWx1ZSBjYW50IGJlIGVxdWFsIHRvIG1heCB2YWx1ZScsXHJcbiAgICB3cm9uZ1JhbmdlTGVuZ3RoOiAnUmFuZ2Ugc2hvdWxkIGNvbnRhaW4gdHdvIHZhbHVlcycsXHJcbiAgICB3cm9uZ09yZGVySW5SYW5nZTogJ1RoZSBmaXJzdCBudW1iZXIgaW4gcmFuZ2Ugc2hvdWxkIGJlIGxlc3MgdGhlbiBzZWNvbmQnLFxyXG4gICAgdG9vQmlnU3RlcDogJ1N0ZXAgc2hvdWxkIGJlIGxlc3MgdGhlbiBkaWZmZXJlbmNlIG9mIG1heCBhbmQgbWluIHZhbHVlcycsXHJcbiAgICBzdGVwSXNOdWxsOiAnU3RlcCBjYW50IGJlIGVxdWFsIHRvIDAnLFxyXG4gICAgcmV2ZXJzZUlzTm90Qm9vbGVhbjogJ09wdGlvbiByZXZlcnNlIHNob3VsZCBiZSB0cnVlIG9yIGZhbHNlJyxcclxuICAgIGN1c3RvbVZhbHVlc0lzTm90QXJyYXk6ICdDdXN0b21WYWx1ZXMgc2hvdWxkIGJlIGFycmF5JyxcclxuICAgIGN1c3RvbVZhbHVlc0lzVG9vU21hbGw6ICdDdXN0b21WYWx1ZXMgc2hvdWxkIGNvbnRhaW4gYXQgbGVhc3QgdHdvIHZhbHVlcycsXHJcblxyXG4gICAgaW52YWxpZExlbmd0aDogJ0xlbmd0aCBzaG91bGQgYmUgdmFsaWQgdG8gQ1NTJyxcclxuICAgIHZlcnRpY2FsSXNOb3RCb29sZWFuOiAnT3B0aW9uIHZlcnRpY2FsIHNob3VsZCBiZSB0cnVlIG9yIGZhbHNlJyxcclxuICAgIHRvb2x0aXBJc05vdEJvb2xlYW46ICdPcHRpb24gdG9vbHRpcCBzaG91bGQgYmUgdHJ1ZSBvciBmYWxzZScsXHJcbiAgICBzY2FsZUlzTm90Qm9vbGVhbjogJ09wdGlvbiBzY2FsZSBzaG91bGQgYmUgdHJ1ZSBvciBmYWxzZScsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlTW9kZWwob3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IElXYXJuaW5ncyB7XHJcblxyXG4gICAgbGV0IHdhcm5zOiBJV2FybmluZ3MgPSB7fTtcclxuXHJcbiAgICBsZXQgbnVtYmVyczogbnVtYmVyW10gPSBbb3B0aW9ucy5taW4sIG9wdGlvbnMubWF4LCBvcHRpb25zLnN0ZXBdO1xyXG4gICAgaWYgKG9wdGlvbnMucmFuZ2UpIHtcclxuICAgICAgICBudW1iZXJzLnB1c2gob3B0aW9ucy5yYW5nZVswXSwgb3B0aW9ucy5yYW5nZVsxXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG51bWJlcnMucHVzaChvcHRpb25zLnZhbHVlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKCAhdmFsaWRhdGVOdW1iZXJzKG51bWJlcnMpICkgeyBcclxuICAgICAgICB3YXJucy52YWx1ZXNBcmVOb3ROdW1iZXJzID0gd2FybmluZ3MudmFsdWVzQXJlTm90TnVtYmVycztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoICF2YWxpZGF0ZUludGVnZXJzKG51bWJlcnMpICkge1xyXG4gICAgICAgIHdhcm5zLnZhbHVlc0FyZU5vdEludGVnZXIgPSB3YXJuaW5ncy52YWx1ZXNBcmVOb3RJbnRlZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggb3B0aW9ucy5taW4gPiBvcHRpb25zLm1heCApIHtcclxuICAgICAgICB3YXJucy5taW5Jc092ZXJNYXggPSB3YXJuaW5ncy5taW5Jc092ZXJNYXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCBvcHRpb25zLm1pbiA9PSBvcHRpb25zLm1heCApIHtcclxuICAgICAgICB3YXJucy5taW5Jc0VxdWFsVG9NYXggPSB3YXJuaW5ncy5taW5Jc0VxdWFsVG9NYXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCBvcHRpb25zLnJhbmdlICkge1xyXG4gICAgICAgIGlmICggIUFycmF5LmlzQXJyYXkob3B0aW9ucy5yYW5nZSkgfHwgb3B0aW9ucy5yYW5nZS5sZW5ndGggIT0gMiApIHtcclxuICAgICAgICAgICAgd2FybnMud3JvbmdSYW5nZUxlbmd0aCA9IHdhcm5pbmdzLndyb25nUmFuZ2VMZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICF3YXJucy53cm9uZ1JhbmdlTGVuZ3RoICYmIG9wdGlvbnMucmFuZ2VbMF0gPiBvcHRpb25zLnJhbmdlWzFdICkge1xyXG4gICAgICAgICAgICB3YXJucy53cm9uZ09yZGVySW5SYW5nZSA9IHdhcm5pbmdzLndyb25nT3JkZXJJblJhbmdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIE1hdGguYWJzKG9wdGlvbnMubWF4IC0gb3B0aW9ucy5taW4pIDwgTWF0aC5hYnMob3B0aW9ucy5zdGVwKSApIHtcclxuICAgICAgICB3YXJucy50b29CaWdTdGVwID0gd2FybmluZ3MudG9vQmlnU3RlcDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKCBvcHRpb25zLnN0ZXAgPT0gMCApIHtcclxuICAgICAgICB3YXJucy5zdGVwSXNOdWxsID0gd2FybmluZ3Muc3RlcElzTnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIHR5cGVvZiBvcHRpb25zLnJldmVyc2UgIT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgIHdhcm5zLnJldmVyc2VJc05vdEJvb2xlYW4gPSB3YXJuaW5ncy5yZXZlcnNlSXNOb3RCb29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggb3B0aW9ucy5jdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgaWYgKCAhQXJyYXkuaXNBcnJheShvcHRpb25zLmN1c3RvbVZhbHVlcykgKSB7XHJcbiAgICAgICAgICAgIHdhcm5zLmN1c3RvbVZhbHVlc0lzTm90QXJyYXkgPSB3YXJuaW5ncy5jdXN0b21WYWx1ZXNJc05vdEFycmF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhd2FybnMuY3VzdG9tVmFsdWVzSXNOb3RBcnJheSAmJiBvcHRpb25zLmN1c3RvbVZhbHVlcy5sZW5ndGggPCAyICkge1xyXG4gICAgICAgICAgICB3YXJucy5jdXN0b21WYWx1ZXNJc1Rvb1NtYWxsID0gd2FybmluZ3MuY3VzdG9tVmFsdWVzSXNUb29TbWFsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHdhcm5zO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZU51bWJlcnMobnVtYmVyczogbnVtYmVyW10pOiBib29sZWFuIHtcclxuICAgIGxldCBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIG51bWJlcnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IFxyXG4gICAgICAgIGlmKCAhaXNOdW1lcmljKGl0ZW0pICkgeyBcclxuICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGlzVmFsaWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlSW50ZWdlcnMobnVtYmVyczogbnVtYmVyW10pOiBib29sZWFuIHtcclxuICAgIGxldCBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIG51bWJlcnMuZm9yRWFjaChmdW5jdGlvbihudW0pIHtcclxuICAgICAgICBpZiAoIG51bSAlIDEgIT0gMCApIHsgXHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpc1ZhbGlkO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVZpZXcob3B0aW9ucyk6IElXYXJuaW5ncyB7XHJcbiAgICBsZXQgd2FybnM6IElXYXJuaW5ncyA9IHt9O1xyXG5cclxuICAgIGlmICggIW9wdGlvbnMubGVuZ3RoLm1hdGNoKC9eXFxkezEsM31bLixdP1xcZCoocHh8ZW18cmVtfCV8dmh8dncpPyQvaSkgKSB7XHJcbiAgICAgICAgd2FybnMuaW52YWxpZExlbmd0aCA9IHdhcm5pbmdzLmludmFsaWRMZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCB0eXBlb2Ygb3B0aW9ucy52ZXJ0aWNhbCAhPSAnYm9vbGVhbicgKSB7XHJcbiAgICAgICAgd2FybnMudmVydGljYWxJc05vdEJvb2xlYW4gPSB3YXJuaW5ncy52ZXJ0aWNhbElzTm90Qm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIHR5cGVvZiBvcHRpb25zLnRvb2x0aXAgIT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgIHdhcm5zLnRvb2x0aXBJc05vdEJvb2xlYW4gPSB3YXJuaW5ncy50b29sdGlwSXNOb3RCb29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggdHlwZW9mIG9wdGlvbnMuc2NhbGUgIT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgIHdhcm5zLnNjYWxlSXNOb3RCb29sZWFuID0gd2FybmluZ3Muc2NhbGVJc05vdEJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHdhcm5zO1xyXG59XHJcblxyXG5leHBvcnQgeyB2YWxpZGF0ZU1vZGVsLCB2YWxpZGF0ZVZpZXcsIElXYXJuaW5ncyB9Il0sInNvdXJjZVJvb3QiOiIifQ==