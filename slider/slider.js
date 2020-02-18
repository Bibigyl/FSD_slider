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
        console.log('sddfcgv');
        console.log(this.getLengthInPx());
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
        if (!this._range) {
            index = 0;
        }
        else {
            var topLeft = !this._vertical ? 'left' : 'top';
            var firstThumbPos = this._thumbFirst.getBoundingClientRect()[topLeft];
            var lastThumbPos = this._thumbLast.getBoundingClientRect()[topLeft];
            if (Math.abs(firstThumbPos - newThumbPosition) < Math.abs(lastThumbPos - newThumbPosition)) {
                index = 0;
            }
            else {
                index = 1;
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb25GdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZmF1bHRPcHRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsaWRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSw4RkFBNEQ7QUFDNUQsNEVBQXdEO0FBQ3hELGlHQUEyRTtBQUMzRSxxRkFBeUQ7QUFxQnpEO0lB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LENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxFQUFHO1FBQ25FLEtBQUssQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQztLQUNoRDtJQUVELElBQUssT0FBTyxPQUFPLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRztRQUN4QyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDO0tBQzlEO0lBRUQsSUFBSyxPQUFPLE9BQU8sQ0FBQyxPQUFPLElBQUksU0FBUyxFQUFHO1FBQ3ZDLEtBQUssQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsbUJBQW1CLENBQUM7S0FDNUQ7SUFFRCxJQUFLLE9BQU8sT0FBTyxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUc7UUFDckMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztLQUN4RDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFdUIsb0NBQVkiLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IHsgSVN1YmplY3QsIFN1YmplY3QsIElDb25maWcgfSBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IHsgaXNOdW1lcmljLCBnZXROdW1iZXJPZlN0ZXBzLCBkZWVwRXF1YWwgfSBmcm9tICcuL2NvbW1vbkZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IHZhbGlkYXRlTW9kZWwsIElXYXJuaW5ncyB9IGZyb20gJy4vdmFsaWRhdGlvbnMnO1xyXG5cclxuaW50ZXJmYWNlIElNb2RlbE9wdGlvbnMge1xyXG4gICAgLy9beDogc3RyaW5nXTogYW55O1xyXG4gICAgdmFsdWU6IG51bWJlciB8IG51bGw7XHJcbiAgICBtaW46IG51bWJlcjtcclxuICAgIG1heDogbnVtYmVyO1xyXG4gICAgc3RlcDogbnVtYmVyO1xyXG4gICAgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gfCBudWxsO1xyXG4gICAgY3VzdG9tVmFsdWVzPzogc3RyaW5nW107XHJcbiAgICByZXZlcnNlOiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSU1vZGVsIGV4dGVuZHMgSVN1YmplY3Qge1xyXG4gICAgdXBkYXRlKGNvbmZpZzogSUNvbmZpZyk6IHZvaWQ7XHJcblxyXG4gICAgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zO1xyXG4gICAgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzO1xyXG59XHJcblxyXG5cclxuY2xhc3MgTW9kZWwgZXh0ZW5kcyBTdWJqZWN0IGltcGxlbWVudHMgSU1vZGVsIHtcclxuICAgIHByaXZhdGUgX3ZhbHVlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbWluOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9tYXg6IG51bWJlcjsgICBcclxuICAgIHByaXZhdGUgX3N0ZXA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3JhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2N1c3RvbVZhbHVlcz86IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfcmV2ZXJzZTogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIF93YXJuaW5nczogSVdhcm5pbmdzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGZ1bGxPcHRpb25zOiBJTW9kZWxPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIGxldCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnM7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdGUoZnVsbE9wdGlvbnMpO1xyXG4gICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMubm9ybWFsaXplKGZ1bGxPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKHZhbGlkT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgdXBkYXRlKGNvbmZpZzogSUNvbmZpZyk6IHZvaWQge1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGNvbmZpZy50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdORVdfVkFMVUVfSU5fUEVSQ0VOVCc6XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUJ5UGVyY2VudChjb25maWcucGVyY2VudCwgY29uZmlnLmluZGV4KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeSh7IFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdORVdfVkFMVUUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnTkVXX0RBVEEnOlxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcmV2T3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZShPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgY29uZmlnLm9wdGlvbnMpKVxyXG4gICAgICAgICAgICAgICAgbGV0IHZhbGlkT3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IHRoaXMubm9ybWFsaXplKGNvbmZpZy5vcHRpb25zLCBwcmV2T3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCAhZGVlcEVxdWFsKHByZXZPcHRpb25zLCB2YWxpZE9wdGlvbnMpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9ucyh2YWxpZE9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdORVdfREFUQScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRPcHRpb25zKCk6IElNb2RlbE9wdGlvbnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl92YWx1ZSxcclxuICAgICAgICAgICAgbWluOiB0aGlzLl9taW4sXHJcbiAgICAgICAgICAgIG1heDogdGhpcy5fbWF4LCAgIFxyXG4gICAgICAgICAgICBzdGVwOiB0aGlzLl9zdGVwLFxyXG4gICAgICAgICAgICByYW5nZTogdGhpcy5fcmFuZ2UsXHJcbiAgICAgICAgICAgIGN1c3RvbVZhbHVlczogdGhpcy5fY3VzdG9tVmFsdWVzLFxyXG4gICAgICAgICAgICByZXZlcnNlOiB0aGlzLl9yZXZlcnNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRXYXJuaW5ncygpOiBJV2FybmluZ3Mge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl93YXJuaW5ncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRPcHRpb25zKG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IG9wdGlvbnMudmFsdWU7XHJcbiAgICAgICAgdGhpcy5fbWluID0gb3B0aW9ucy5taW47XHJcbiAgICAgICAgdGhpcy5fbWF4ID0gb3B0aW9ucy5tYXg7XHJcbiAgICAgICAgdGhpcy5fc3RlcCA9IG9wdGlvbnMuc3RlcDtcclxuICAgICAgICB0aGlzLl9yYW5nZSA9IG9wdGlvbnMucmFuZ2U7XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tVmFsdWVzID0gb3B0aW9ucy5jdXN0b21WYWx1ZXM7ICAgICAgXHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZSA9IG9wdGlvbnMucmV2ZXJzZTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGUob3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLl93YXJuaW5ncyA9IHZhbGlkYXRlTW9kZWwob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICggT2JqZWN0LmtleXModGhpcy5fd2FybmluZ3MpLmxlbmd0aCAhPSAwICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHdhcm5pbmdzOiBJV2FybmluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl93YXJuaW5ncyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnV0FSTklOR1MnLFxyXG4gICAgICAgICAgICAgICAgd2FybmluZ3M6IHdhcm5pbmdzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbm9ybWFsaXplKG9wdGlvbnM6IElNb2RlbE9wdGlvbnMsIHZhbGlkT3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IElNb2RlbE9wdGlvbnMge1xyXG5cclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdmFsaWRPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLl93YXJuaW5ncy5jdXN0b21WYWx1ZXNJc05vdEFycmF5IHx8IHRoaXMuX3dhcm5pbmdzLmN1c3RvbVZhbHVlc0lzVG9vU21hbGwgKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuY3VzdG9tVmFsdWVzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmN1c3RvbVZhbHVlcyApIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5taW4gPSAwO1xyXG4gICAgICAgICAgICBvcHRpb25zLm1heCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcHRpb25zLm1pbiA9IHRoaXMubm9ybWFsaXplTnVtYmVyKG9wdGlvbnMubWluLCB2YWxpZE9wdGlvbnMubWluKTtcclxuICAgICAgICBvcHRpb25zLm1heCA9IHRoaXMubm9ybWFsaXplTnVtYmVyKG9wdGlvbnMubWF4LCB2YWxpZE9wdGlvbnMubWF4KTtcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLnN0ZXAsIHZhbGlkT3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLl93YXJuaW5ncy5taW5Jc092ZXJNYXggKSB7XHJcbiAgICAgICAgICAgIFtvcHRpb25zLm1pbiwgb3B0aW9ucy5tYXhdID0gW29wdGlvbnMubWF4LCBvcHRpb25zLm1pbl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHRoaXMuX3dhcm5pbmdzLm1pbklzRXF1YWxUb01heCApIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5taW4gPSB2YWxpZE9wdGlvbnMubWluO1xyXG4gICAgICAgICAgICBvcHRpb25zLm1heCA9IHZhbGlkT3B0aW9ucy5tYXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHRoaXMuX3dhcm5pbmdzLnN0ZXBJc051bGwgfHwgdGhpcy5fd2FybmluZ3MudG9vQmlnU3RlcCApIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5zdGVwID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIG9wdGlvbnMuc3RlcCA9IE1hdGguYWJzKG9wdGlvbnMuc3RlcCk7XHJcbiAgICAgICAgb3B0aW9ucy5yZXZlcnNlID0gISFvcHRpb25zLnJldmVyc2U7XHJcblxyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnJhbmdlICkge1xyXG4gICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gdGhpcy5ub3JtYWxpemVOdW1iZXIob3B0aW9ucy52YWx1ZSwgb3B0aW9ucy5taW4pO1xyXG4gICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gdGhpcy5maW5kQ2xvc2VzdFN0ZXAob3B0aW9ucy52YWx1ZSwgb3B0aW9ucylcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IG51bGw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFBcnJheS5pc0FycmF5KG9wdGlvbnMucmFuZ2UpICkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IFtvcHRpb25zLm1pbiwgb3B0aW9ucy5tYXhdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvcHRpb25zLnJhbmdlID0gb3B0aW9ucy5yYW5nZS5zbGljZSgwLCAyKSBhcyBbbnVtYmVyLCBudW1iZXJdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVswXSA9IHRoaXMubm9ybWFsaXplTnVtYmVyKG9wdGlvbnMucmFuZ2VbMF0sIG9wdGlvbnMubWluKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVsxXSA9IHRoaXMubm9ybWFsaXplTnVtYmVyKG9wdGlvbnMucmFuZ2VbMV0sIG9wdGlvbnMubWF4KTtcclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fd2FybmluZ3Mud3JvbmdPcmRlckluUmFuZ2UgKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJhbmdlLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhIC0gYjtcclxuICAgICAgICAgICAgICAgIH0pOyAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVswXSA9IHRoaXMuZmluZENsb3Nlc3RTdGVwKG9wdGlvbnMucmFuZ2VbMF0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnJhbmdlWzFdID0gdGhpcy5maW5kQ2xvc2VzdFN0ZXAob3B0aW9ucy5yYW5nZVsxXSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIG9wdGlvbnMudmFsdWUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgbm9ybWFsaXplTnVtYmVyKHZhbHVlOiBudW1iZXIsIGRlZmF1bHRWYWw6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlOiBudW1iZXIgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKCAhaXNOdW1lcmljKHZhbHVlKSApIHtcclxuICAgICAgICAgICAgbmV3VmFsdWUgPSBkZWZhdWx0VmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdWYWx1ZSA9IE1hdGgudHJ1bmMoK25ld1ZhbHVlKTtcclxuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgZmluZENsb3Nlc3RTdGVwKHZhbHVlOiBudW1iZXIsIG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBzdGVwOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGNlaWxTdGVwczogbnVtYmVyO1xyXG4gICAgICAgIGxldCByZXN0T2ZTdGVwOiBudW1iZXI7XHJcblxyXG4gICAgICAgIGlmICggIW9wdGlvbnMucmV2ZXJzZSApIHtcclxuICAgICAgICAgICAgY2VpbFN0ZXBzID0gTWF0aC50cnVuYyggKHZhbHVlIC0gb3B0aW9ucy5taW4pIC8gb3B0aW9ucy5zdGVwICk7XHJcbiAgICAgICAgICAgIHJlc3RPZlN0ZXAgPSAodmFsdWUgLSBvcHRpb25zLm1pbikgJSBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBvcHRpb25zLm1pbiArIGNlaWxTdGVwcyAqIG9wdGlvbnMuc3RlcDtcclxuICAgICAgICAgICAgc3RlcCA9IHJlc3RPZlN0ZXAgPj0gb3B0aW9ucy5zdGVwLzIgPyBzdGVwICsgb3B0aW9ucy5zdGVwIDogc3RlcDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2VpbFN0ZXBzID0gTWF0aC50cnVuYyggKG9wdGlvbnMubWF4IC0gdmFsdWUpIC8gb3B0aW9ucy5zdGVwICk7XHJcbiAgICAgICAgICAgIHJlc3RPZlN0ZXAgPSAob3B0aW9ucy5tYXggLSB2YWx1ZSkgJSBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBvcHRpb25zLm1heCAtIGNlaWxTdGVwcyAqIG9wdGlvbnMuc3RlcDtcclxuICAgICAgICAgICAgc3RlcCA9IHJlc3RPZlN0ZXAgPj0gb3B0aW9ucy5zdGVwLzIgPyBzdGVwIC0gb3B0aW9ucy5zdGVwIDogc3RlcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0ZXAgPSBzdGVwID4gb3B0aW9ucy5tYXggPyBvcHRpb25zLm1heCA6IHN0ZXA7XHJcbiAgICAgICAgc3RlcCA9IHN0ZXAgPCBvcHRpb25zLm1pbiA/IG9wdGlvbnMubWluIDogc3RlcDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0ZXA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgc2V0VmFsdWVCeVBlcmNlbnQocGVyY2VudDogbnVtYmVyLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBuZXdWYWx1ZTogbnVtYmVyO1xyXG5cclxuICAgICAgICBuZXdWYWx1ZSA9IHBlcmNlbnQgKiAodGhpcy5fbWF4IC0gdGhpcy5fbWluKSAvIDEwMDtcclxuICAgICAgICBuZXdWYWx1ZSA9ICF0aGlzLl9yZXZlcnNlID8gXHJcbiAgICAgICAgdGhpcy5fbWluICsgbmV3VmFsdWUgOlxyXG4gICAgICAgIHRoaXMuX21heCAtIG5ld1ZhbHVlO1xyXG5cclxuICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuZmluZENsb3Nlc3RTdGVwKG5ld1ZhbHVlLCB0aGlzLmdldE9wdGlvbnMoKSk7XHJcblxyXG4gICAgICAgIGlmICggIXRoaXMuX3JhbmdlICkge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IGlzRmlyc3RJblJhbmdlOiBib29sZWFuO1xyXG4gICAgICAgICAgICBpc0ZpcnN0SW5SYW5nZSA9IGluZGV4ID09IDAgJiYgIXRoaXMuX3JldmVyc2U7XHJcbiAgICAgICAgICAgIGlzRmlyc3RJblJhbmdlID0gaXNGaXJzdEluUmFuZ2UgfHwgaW5kZXggPT0gMSAmJiB0aGlzLl9yZXZlcnNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzRmlyc3RJblJhbmdlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBNYXRoLm1pbihuZXdWYWx1ZSwgdGhpcy5fcmFuZ2VbMV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmFuZ2VbMF0gPSBuZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IE1hdGgubWF4KG5ld1ZhbHVlLCB0aGlzLl9yYW5nZVswXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yYW5nZVsxXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgSU1vZGVsLCBJTW9kZWxPcHRpb25zIH07XHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG4iLCJpbXBvcnQgeyBJTW9kZWxPcHRpb25zIH0gZnJvbSBcIi4vTW9kZWxcIjtcclxuaW1wb3J0IHsgSVZpZXdPcHRpb25zIH0gZnJvbSBcIi4vVmlld1wiO1xyXG5pbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gXCIuL2RlZmF1bHRPcHRpb25zXCI7XHJcbmltcG9ydCB7IElXYXJuaW5ncyB9IGZyb20gXCIuL3ZhbGlkYXRpb25zXCI7XHJcblxyXG5cclxuaW50ZXJmYWNlIElTdWJqZWN0IHtcclxuICAgIGF0dGFjaChjYWxsYmFjazogYW55KTogdm9pZDtcclxuICAgIGRldGFjaChjYWxsYmFjazogYW55KTogdm9pZDtcclxuICAgIG5vdGlmeShjb25maWc6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIFN1YmplY3QgaW1wbGVtZW50cyBJU3ViamVjdCB7XHJcbiAgICBwcm90ZWN0ZWQgY2FsbGJhY2tzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBhdHRhY2goY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjYWxsYmFja0luZGV4OiBudW1iZXIgPSB0aGlzLmNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrcy5zcGxpY2UoY2FsbGJhY2tJbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5vdGlmeShjb25maWc6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5jYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJQ29uZmlnIHtcclxuICAgIHR5cGU6IHN0cmluZyxcclxuICAgIC8vID8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/XHJcbiAgICAvL29wdGlvbnM/OiBJTW9kZWxPcHRpb25zIHwgSVZpZXdPcHRpb25zIHwgSU9wdGlvbnMsXHJcbiAgICBvcHRpb25zPzogYW55LFxyXG4gICAgcGVyY2VudD86IG51bWJlcixcclxuICAgIGluZGV4PzogbnVtYmVyLFxyXG4gICAgd2FybmluZ3M/OiBJV2FybmluZ3NcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IElTdWJqZWN0LCBTdWJqZWN0LCBJQ29uZmlnIH07XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLyogXHJcbmltcG9ydCB7IElPcHRpb25zIH0gZnJvbSBcIi4vZGVmYXVsdE9wdGlvbnNcIjtcclxuXHJcbi8v0JjQvdGC0YTQtdGA0YTQtdC50YEg0LjQt9C00LDRgtC10LvRjyDQvtCx0YrRj9Cy0LvRj9C10YIg0L3QsNCx0L7RgCDQvNC10YLQvtC00L7QsiDQtNC70Y8g0YPQv9GA0LDQstC70LXQvdC40Y/QvNC4INC/0L7QtNC/0LjRgdC60LjRh9Cw0LzQuC5cclxuaW50ZXJmYWNlIElTdWJqZWN0IHtcclxuXHJcbiAgICAvLyDQn9GA0LjRgdC+0LXQtNC40L3Rj9C10YIg0L3QsNCx0LvRjtC00LDRgtC10LvRjyDQuiDQuNC30LTQsNGC0LXQu9GOLlxyXG4gICAgYXR0YWNoKG9ic2VydmVyOiBhbnkpOiB2b2lkO1xyXG5cclxuICAgIC8vINCe0YLRgdC+0LXQtNC40L3Rj9C10YIg0L3QsNCx0LvRjtC00LDRgtC10LvRjyDQvtGCINC40LfQtNCw0YLQtdC70Y8uXHJcbiAgICBkZXRhY2gob2JzZXJ2ZXI6IGFueSk6IHZvaWQ7XHJcblxyXG4gICAgLy8g0KPQstC10LTQvtC80LvRj9C10YIg0LLRgdC10YUg0L3QsNCx0LvRjtC00LDRgtC10LvQtdC5INC+INGB0L7QsdGL0YLQuNC4LlxyXG4gICAgbm90aWZ5KGNvbmZpZzogYW55KTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgU3ViamVjdCBpbXBsZW1lbnRzIElTdWJqZWN0IHtcclxuICAgIHByb3RlY3RlZCBvYnNlcnZlcnM6IGFueVtdID0gW107XHJcblxyXG4gICAgYXR0YWNoKG9ic2VydmVyOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXRhY2gob2JzZXJ2ZXI6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG9ic2VydmVySW5kZXggPSB0aGlzLm9ic2VydmVycy5pbmRleE9mKG9ic2VydmVyKTtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5zcGxpY2Uob2JzZXJ2ZXJJbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgbm90aWZ5KCkge1xyXG4gICAgICAgIGZvciAoY29uc3Qgb2JzZXJ2ZXIgb2YgdGhpcy5vYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIudXBkYXRlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmludGVyZmFjZSBJT3V0ZXJPYnNlcnZlciB7XHJcbiAgICBmdW5jOiBhbnk7XHJcbiAgICB1cGRhdGUob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBPdXRlck9ic2VydmVyIGltcGxlbWVudHMgSU91dGVyT2JzZXJ2ZXIge1xyXG4gICAgZnVuYzogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGZ1bmM6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5mdW5jID0gZnVuYztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mdW5jKG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IElTdWJqZWN0LCBTdWJqZWN0fTtcclxuZXhwb3J0IHsgSU91dGVyT2JzZXJ2ZXIsIE91dGVyT2JzZXJ2ZXJ9ICovIiwiaW1wb3J0IHsgSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCBNb2RlbCwgeyBJTW9kZWwsIElNb2RlbE9wdGlvbnMgfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IFZpZXcsIHsgSVZpZXcgfSBmcm9tICcuL1ZpZXcnO1xyXG5pbXBvcnQgeyBJU3ViamVjdCwgU3ViamVjdCB9ICBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IHsgSVdhcm5pbmdzIH0gZnJvbSAnLi92YWxpZGF0aW9ucyc7XHJcblxyXG5pbnRlcmZhY2UgSVByZXNlbnRlciBleHRlbmRzIElTdWJqZWN0IHtcclxuICAgIC8vZGF0YSgpOiBJT3B0aW9ucztcclxuICAgIHVwZGF0ZShjb25maWc6IGFueSk6IHZvaWQ7XHJcblxyXG4gICAgZ2V0T3B0aW9ucygpOiBJT3B0aW9ucztcclxuICAgIGdldFdhcm5pbmdzKCk6IElXYXJuaW5ncztcclxufVxyXG5cclxuY2xhc3MgUHJlc2VudGVyIGV4dGVuZHMgU3ViamVjdCBpbXBsZW1lbnRzIElQcmVzZW50ZXIge1xyXG5cclxuICAgIHByaXZhdGUgX21vZGVsOiBJTW9kZWw7XHJcbiAgICBwcml2YXRlIF92aWV3OiBJVmlldztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJT3B0aW9ucywgbm9kZTogSFRNTERpdkVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9tb2RlbCA9IG5ldyBNb2RlbChvcHRpb25zKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucywgdGhpcy5fbW9kZWwuZ2V0T3B0aW9ucygpKTtcclxuICAgICAgICB0aGlzLl92aWV3ID0gbmV3IFZpZXcob3B0aW9ucywgbm9kZSk7XHJcblxyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGVsLmF0dGFjaChmdW5jdGlvbihjb25maWc6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGF0Ll92aWV3LnVwZGF0ZShjb25maWcpO1xyXG4gICAgICAgICAgICB0aGF0Lm5vdGlmeShjb25maWcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl92aWV3LmF0dGFjaChmdW5jdGlvbihjb25maWc6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGF0Ll9tb2RlbC51cGRhdGUoY29uZmlnKTtcclxuICAgICAgICAgICAgdGhhdC5ub3RpZnkoY29uZmlnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShjb25maWc6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnM7XHJcbiAgICAgICAgbGV0IHdhcm5pbmdzOiBJV2FybmluZ3M7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9tb2RlbC51cGRhdGUoY29uZmlnKTtcclxuXHJcbiAgICAgICAgY29uZmlnLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGNvbmZpZy5vcHRpb25zLCB0aGlzLl9tb2RlbC5nZXRPcHRpb25zKCkpO1xyXG5cclxuICAgICAgICB0aGlzLl92aWV3LnVwZGF0ZShjb25maWcpO1xyXG5cclxuICAgICAgICBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICB0eXBlOiAnTkVXX0RBVEEnLFxyXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdhcm5pbmdzID0gdGhpcy5nZXRXYXJuaW5ncygpO1xyXG4gICAgICAgIGlmICggT2JqZWN0LmtleXMod2FybmluZ3MpLmxlbmd0aCAhPSAwICkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCchISEhIScpXHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdXQVJOSU5HUycsXHJcbiAgICAgICAgICAgICAgICB3YXJuaW5nczogd2FybmluZ3NcclxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbi8qICAgICB1cGRhdGUoY29uZmlnOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IGlzTW9kZWxVcGRhdGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGlzVmlld1VwZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IG1vZGVsT3B0aW9uczogc3RyaW5nW10gPSBbJ3ZhbHVlJywgJ21pbicsICdtYXgnLCAnc3RlcCcsICdyZXZlcnNlJywgJ3JhbmdlJywgJ2N1c3RvbVZhbHVlcyddO1xyXG5cclxuICAgICAgICBtb2RlbE9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmICggY29uZmlnLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoaXRlbSkgKSB7XHJcbiAgICAgICAgICAgICAgICBpc01vZGVsVXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGlzTW9kZWxVcGRhdGVkKSB7IFxyXG4gICAgICAgICAgICB0aGlzLl9tb2RlbC51cGRhdGUoY29uZmlnKTtcclxuICAgICAgICAgICAgaXNWaWV3VXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IHZpZXdPcHRpb25zOiBzdHJpbmdbXSA9IFsnbGVuZ3RoJywgJ3ZlcnRpY2FsJywgJ3Rvb2x0aXAnLCAnc2NhbGUnXTtcclxuXHJcbiAgICAgICAgdmlld09wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmICggY29uZmlnLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoaXRlbSkgKSB7XHJcbiAgICAgICAgICAgICAgICBpc1ZpZXdVcGRhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXNWaWV3VXBkYXRlZCkge1xyXG4gICAgICAgICAgICBjb25maWcub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oY29uZmlnLm9wdGlvbnMsIHRoaXMuX21vZGVsLmdldE9wdGlvbnMoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZXcudXBkYXRlKGNvbmZpZyk7XHJcbiAgICAgICAgICAgIGNvbmZpZy5vcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc01vZGVsVXBkYXRlZCB8fCBpc1ZpZXdVcGRhdGVkKSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5ub3RpZnkoY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9ICovXHJcblxyXG4gICAgcHVibGljIGdldE9wdGlvbnMoKTogSU9wdGlvbnMge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9tb2RlbC5nZXRPcHRpb25zKCksIHRoaXMuX3ZpZXcuZ2V0T3B0aW9ucygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fbW9kZWwuZ2V0V2FybmluZ3MoKSwgdGhpcy5fdmlldy5nZXRXYXJuaW5ncygpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJlc2VudGVyOyIsImltcG9ydCB7IElPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG4vL2ltcG9ydCB7IElNb2RlbCwgSU1vZGVsT3B0aW9ucyB9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgeyBJU3ViamVjdCwgU3ViamVjdCB9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5pbXBvcnQgeyBpc051bWVyaWMsIGdldE51bWJlck9mU3RlcHMgfSBmcm9tICcuL2NvbW1vbkZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IHZhbGlkYXRlVmlldywgSVdhcm5pbmdzIH0gZnJvbSAnLi92YWxpZGF0aW9ucyc7XHJcblxyXG5cclxuaW50ZXJmYWNlIElWaWV3T3B0aW9ucyB7XHJcbiAgICBsZW5ndGg6IHN0cmluZztcclxuICAgIHZlcnRpY2FsOiBib29sZWFuO1xyXG4gICAgdG9vbHRpcDogYm9vbGVhbjtcclxuICAgIHNjYWxlOiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSVZpZXcgZXh0ZW5kcyBJU3ViamVjdCB7XHJcbiAgICB1cGRhdGUoY29uZmlnOiBhbnkpOiB2b2lkO1xyXG5cclxuICAgIGdldE9wdGlvbnMoKTogSVZpZXdPcHRpb25zO1xyXG4gICAgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzO1xyXG59XHJcblxyXG5jbGFzcyBWaWV3IGV4dGVuZHMgU3ViamVjdCBpbXBsZW1lbnRzIElWaWV3ICB7XHJcbiAgICBbeDogc3RyaW5nXTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgX2xlbmd0aDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdmVydGljYWw6IGJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSBfc2xpZGVyOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHByaXZhdGUgX3RodW1iPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90aHVtYkZpcnN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90aHVtYkxhc3Q/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2JhcjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwRmlyc3Q/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBMYXN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9zY2FsZT86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgX2FjdGl2ZVRodW1iOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHByaXZhdGUgX3dhcm5pbmdzOiBJV2FybmluZ3M7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElPcHRpb25zLCBzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCkge1xyXG5cclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZShvcHRpb25zKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2xpZGVyID0gc2xpZGVyTm9kZTtcclxuICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGQob3B0aW9ucylcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShjb25maWc6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGNvbmZpZy50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdORVdfVkFMVUUnOlxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJzKGNvbmZpZy5vcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QmFyUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwIHx8IHRoaXMuX3Rvb2x0aXBGaXJzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VG9vbHRpcFZhbHVlcyhjb25maWcub3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ05FV19EQVRBJzpcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0T3B0aW9ucygpLCBjb25maWcub3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlKGNvbmZpZy5vcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVidWlsZChjb25maWcub3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE9wdGlvbnMoKTogSVZpZXdPcHRpb25zIHtcclxuICAgICAgICBsZXQgdG9vbHRpcCA9ICEhdGhpcy5fdG9vbHRpcCB8fCAhIXRoaXMuX3Rvb2x0aXBGaXJzdDtcclxuICAgICAgICBsZXQgc2NhbGUgPSAhIXRoaXMuX3NjYWxlO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsZW5ndGg6ICB0aGlzLl9sZW5ndGgsXHJcbiAgICAgICAgICAgIHZlcnRpY2FsOiB0aGlzLl92ZXJ0aWNhbCxcclxuICAgICAgICAgICAgdG9vbHRpcDogdG9vbHRpcCxcclxuICAgICAgICAgICAgc2NhbGU6IHNjYWxlICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRXYXJuaW5ncygpOiBJV2FybmluZ3Mge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl93YXJuaW5ncyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlVGh1bWJEb3duKGV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgLy8g0L/RgNC10LTQvtGC0LLRgNCw0YLQuNGC0Ywg0LfQsNC/0YPRgdC6INCy0YvQtNC10LvQtdC90LjRjyAo0LTQtdC50YHRgtCy0LjQtSDQsdGA0LDRg9C30LXRgNCwKVxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVRodW1iID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVUaHVtYk1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZVRodW1iVXApO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVGh1bWJNb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlVGh1bWJVcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVUaHVtYk1vdmUoZXZlbnQpOiB2b2lkIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZ2V0TGVuZ3RoSW5QeCgpKVxyXG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IHRoaXMuZ2V0TGVuZ3RoSW5QeCgpO1xyXG4gICAgICAgIGxldCBvZmZzZXQ6IG51bWJlciA9IHRoaXMuZ2V0T2Zmc2V0SW5QeCgpO1xyXG4gICAgICAgIGxldCBldmVudFBvczogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuZXdUaHVtYlBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXMpIHtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSAhdGhpcy5fdmVydGljYWwgPyBldmVudC50b3VjaGVzWzBdLmNsaWVudFggOiBldmVudC50b3VjaGVzWzBdLmNsaWVudFk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSAhdGhpcy5fdmVydGljYWwgPyBldmVudC5jbGllbnRYIDogZXZlbnQuY2xpZW50WTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5ld1RodW1iUG9zaXRpb24gPSAoZXZlbnRQb3MgLSBvZmZzZXQpIC8gbGVuZ3RoICogMTAwO1xyXG4gICAgICAgIGluZGV4ID0gdGhpcy5fYWN0aXZlVGh1bWIgPT0gdGhpcy5fdGh1bWJMYXN0ID8gMSA6IDA7XHJcblxyXG4gICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgdHlwZTogJ05FV19WQUxVRV9JTl9QRVJDRU5UJyxcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICBwZXJjZW50OiBuZXdUaHVtYlBvc2l0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVTbGlkZXJDbGljayhldmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzZGRmY2d2JylcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdldExlbmd0aEluUHgoKSlcclxuICAgICAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSB0aGlzLmdldExlbmd0aEluUHgoKTtcclxuICAgICAgICBsZXQgb2Zmc2V0OiBudW1iZXIgPSB0aGlzLmdldE9mZnNldEluUHgoKTtcclxuICAgICAgICBsZXQgZXZlbnRQb3M6IG51bWJlcjtcclxuICAgICAgICBsZXQgbmV3VGh1bWJQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChldmVudC50b3VjaGVzKSB7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gIXRoaXMuX3ZlcnRpY2FsID8gZXZlbnQudG91Y2hlc1swXS5jbGllbnRYIDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gIXRoaXMuX3ZlcnRpY2FsID8gZXZlbnQuY2xpZW50WCA6IGV2ZW50LmNsaWVudFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXdUaHVtYlBvc2l0aW9uID0gKGV2ZW50UG9zIC0gb2Zmc2V0KSAvIGxlbmd0aCAqIDEwMDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIXRoaXMuX3JhbmdlKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdG9wTGVmdDogc3RyaW5nID0gIXRoaXMuX3ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XHJcblxyXG4gICAgICAgICAgICBsZXQgZmlyc3RUaHVtYlBvczogbnVtYmVyID0gdGhpcy5fdGh1bWJGaXJzdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVt0b3BMZWZ0XTtcclxuICAgICAgICAgICAgbGV0IGxhc3RUaHVtYlBvczogbnVtYmVyID0gdGhpcy5fdGh1bWJMYXN0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW3RvcExlZnRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBNYXRoLmFicyhmaXJzdFRodW1iUG9zIC0gbmV3VGh1bWJQb3NpdGlvbikgPCBNYXRoLmFicyhsYXN0VGh1bWJQb3MgLSBuZXdUaHVtYlBvc2l0aW9uKSApIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICB0eXBlOiAnTkVXX1ZBTFVFX0lOX1BFUkNFTlQnLFxyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIHBlcmNlbnQ6IG5ld1RodW1iUG9zaXRpb25cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVRodW1iVXAoZXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVUaHVtYlVwKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZVRodW1iTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZVRodW1iVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVGh1bWJNb3ZlKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGh1bWIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZChvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgdmFsaWRMZW5ndGg6IHN0cmluZyA9IHRoaXMuX2xlbmd0aCB8fCBkZWZhdWx0T3B0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoID0gdGhpcy5nZXRWYWxpZExlbmd0aChvcHRpb25zLmxlbmd0aCwgdmFsaWRMZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSB0aGlzLl9sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS5oZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2hvcml6b250YWwnKTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IHRoaXMuX2xlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLndpZHRoID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKTsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9iYXIgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX2JhcicpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1aWxkVGh1bWJzKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLnNldEJhclBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy50b29sdGlwICkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkVG9vbHRpcHMob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5zY2FsZSApIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFNjYWxlKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlVGh1bWJEb3duID0gdGhpcy5oYW5kbGVUaHVtYkRvd24uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVRodW1iTW92ZSA9IHRoaXMuaGFuZGxlVGh1bWJNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVUaHVtYlVwID0gdGhpcy5oYW5kbGVUaHVtYlVwLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTbGlkZXJDbGljayA9IHRoaXMuaGFuZGxlU2xpZGVyQ2xpY2suYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmhhbmRsZVRodW1iRG93bik7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkZpcnN0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5oYW5kbGVUaHVtYkRvd24pO1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkZpcnN0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iTGFzdC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJMYXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVTbGlkZXJDbGljayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWJ1aWxkKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHByZXZPcHRpb25zOiBJVmlld09wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJldk9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcykge1xyXG4gICAgICAgICAgICBpZiAoa2V5ICE9ICdfc2xpZGVyJykge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB0aGlzLnJlbW92ZU5vZGUodGhpc1trZXldKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2gge30gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5idWlsZChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlKG9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl93YXJuaW5ncyA9IHZhbGlkYXRlVmlldyhvcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKCBPYmplY3Qua2V5cyh0aGlzLl93YXJuaW5ncykubGVuZ3RoICE9IDAgKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgd2FybmluZ3M6IElXYXJuaW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3dhcm5pbmdzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdXQVJOSU5HUycsXHJcbiAgICAgICAgICAgICAgICB3YXJuaW5nczogd2FybmluZ3NcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZFRodW1icyhvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGlmICggIW9wdGlvbnMucmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iID0gdGhpcy5idWlsZE5vZGUodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYicpO1xyXG4gICAgICAgIH0gZWxzZSB7ICAgICBcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJGaXJzdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWInLCAnc2xpZGVyX190aHVtYl9maXJzdCcpO1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkxhc3QgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iJywgJ3NsaWRlcl9fdGh1bWJfbGFzdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYnMob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRUaHVtYnMob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcG9zOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmICggIW9wdGlvbnMucmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24ob3B0aW9ucy52YWx1ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbih0aGlzLl90aHVtYiwgcG9zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG51bTogbnVtYmVyO1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCByZXZlcnNlLCDRgtC+INC70LXQstGL0Lkg0LHQtdCz0YPQvdC+0LogLSDRjdGC0L4g0LHQvtC70YzRiNC10LUg0LfQvdCw0YfQtdC90LjQtVxyXG4gICAgICAgICAgICAvLyDRgi7QtS4gcmFuZ2VbMV1cclxuICAgICAgICAgICAgbnVtID0gIW9wdGlvbnMucmV2ZXJzZSA/IDAgOiAxO1xyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKG9wdGlvbnMucmFuZ2VbbnVtXSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbih0aGlzLl90aHVtYkZpcnN0LCBwb3MpO1xyXG5cclxuICAgICAgICAgICAgbnVtID0gbnVtID09IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbihvcHRpb25zLnJhbmdlW251bV0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24odGhpcy5fdGh1bWJMYXN0LCBwb3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEJhclBvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzdGFydDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciB8IHN0cmluZztcclxuICAgICAgICBsZXQgdG9wTGVmdDogc3RyaW5nID0gIXRoaXMuX3ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XHJcbiAgICAgICAgbGV0IHdpZHRoSGVpZ2h0OiBzdHJpbmcgPSAhdGhpcy5fdmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XHJcblxyXG4gICAgICAgIHN0YXJ0ID0gdGhpcy5fdGh1bWJGaXJzdCA/IHRoaXMuX3RodW1iRmlyc3Quc3R5bGVbdG9wTGVmdF0gOiAnMCUnO1xyXG4gICAgICAgIGxlbmd0aCA9IHRoaXMuX3RodW1iRmlyc3QgPyBcclxuICAgICAgICB0aGlzLl90aHVtYkxhc3Quc3R5bGVbdG9wTGVmdF0uc2xpY2UoMCwgLTEpIC0gdGhpcy5fdGh1bWJGaXJzdC5zdHlsZVt0b3BMZWZ0XS5zbGljZSgwLCAtMSkgICsgJyUnIDpcclxuICAgICAgICB0aGlzLl90aHVtYi5zdHlsZVt0b3BMZWZ0XTtcclxuXHJcbiAgICAgICAgdGhpcy5fYmFyLnN0eWxlW3RvcExlZnRdID0gc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5fYmFyLnN0eWxlW3dpZHRoSGVpZ2h0XSA9IGxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkVG9vbHRpcHMob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKCFvcHRpb25zLnJhbmdlKSB7IFxyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwID0gdGhpcy5idWlsZE5vZGUodGhpcy5fdGh1bWIsICdzbGlkZXJfX3Rvb2x0aXAnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwRmlyc3QgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl90aHVtYkZpcnN0LCAnc2xpZGVyX190b29sdGlwJywgJ3NsaWRlcl9fdG9vbHRpcF9maXJzdCcpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwTGFzdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3RodW1iTGFzdCwgJ3NsaWRlcl9fdG9vbHRpcCcsICdzbGlkZXJfX3Rvb2x0aXBfbGFzdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRUb29sdGlwVmFsdWVzKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRTY2FsZShvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzY2FsZTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGRpdmlzaW9uOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICAgbGV0IGluZGVudDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IG9wdGlvbnMubWF4IC0gb3B0aW9ucy5taW47XHJcblxyXG4gICAgICAgIHNjYWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgc2NhbGUuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZScpO1xyXG5cclxuICAgICAgICBmb3IgKCBsZXQgaTogbnVtYmVyID0gMDsgaSA8PSBnZXROdW1iZXJPZlN0ZXBzKG9wdGlvbnMubWluLCBvcHRpb25zLm1heCwgb3B0aW9ucy5zdGVwKTsgaSsrICkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhb3B0aW9ucy5yZXZlcnNlICkge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5taW4gKyBvcHRpb25zLnN0ZXAgKiBpO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gTWF0aC5taW4odmFsLCBvcHRpb25zLm1heCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBvcHRpb25zLm1heCAtIG9wdGlvbnMuc3RlcCAqIGk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBNYXRoLm1heCh2YWwsIG9wdGlvbnMubWluKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5kZW50ID0gaSAqIG9wdGlvbnMuc3RlcCA8IGxlbmd0aCA/IGkgKiBvcHRpb25zLnN0ZXAgOiBsZW5ndGg7IFxyXG4gICAgICAgICAgICBpbmRlbnQgPSBpbmRlbnQgLyBsZW5ndGggKiAxMDAgKyAnJSc7XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBvcHRpb25zLmN1c3RvbVZhbHVlcyA/IG9wdGlvbnMuY3VzdG9tVmFsdWVzW3ZhbF0gOiB2YWw7XHJcblxyXG4gICAgICAgICAgICBkaXZpc2lvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXZpc2lvbi5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3NjYWxlLWRpdmlzaW9uJyk7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInNsaWRlcl9fc2NhbGUtZGl2aXNpb24tdGV4dFwiPicgKyB2YWwgKyAnPC9zcGFuPic7XHJcbiAgICAgICAgICAgIG9wdGlvbnMudmVydGljYWwgPyBkaXZpc2lvbi5zdHlsZS50b3AgPSBpbmRlbnQgOiBkaXZpc2lvbi5zdHlsZS5sZWZ0ID0gaW5kZW50O1xyXG5cclxuICAgICAgICAgICAgc2NhbGUuYXBwZW5kKGRpdmlzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3NsaWRlci5wcmVwZW5kKHNjYWxlKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRUb29sdGlwVmFsdWVzKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoIW9wdGlvbnMucmFuZ2UpIHsgXHJcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzID8gb3B0aW9ucy5jdXN0b21WYWx1ZXNbb3B0aW9ucy52YWx1ZV0gOiBvcHRpb25zLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwLnRleHRDb250ZW50ID0gdmFsIGFzIHN0cmluZzsgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG51bTogbnVtYmVyO1xyXG4gICAgICAgICAgICBudW0gPSAhb3B0aW9ucy5yZXZlcnNlID8gMCA6IDE7XHJcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzID8gb3B0aW9ucy5jdXN0b21WYWx1ZXNbb3B0aW9ucy5yYW5nZVtudW1dXSA6IG9wdGlvbnMucmFuZ2VbbnVtXTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcEZpcnN0LnRleHRDb250ZW50ID0gdmFsIGFzIHN0cmluZztcclxuXHJcbiAgICAgICAgICAgIG51bSA9IG51bSA9PSAwID8gMSA6IDA7XHJcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzID8gb3B0aW9ucy5jdXN0b21WYWx1ZXNbb3B0aW9ucy5yYW5nZVtudW1dXSA6IG9wdGlvbnMucmFuZ2VbbnVtXTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcExhc3QudGV4dENvbnRlbnQgPSB2YWwgYXMgc3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFRodW1iUG9zaXRpb24odGh1bWJOb2RlOiBIVE1MRGl2RWxlbWVudCwgcG9zaXRpb246IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICggIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUudG9wID0gbnVsbDtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLmxlZnQgPSBwb3NpdGlvbjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUubGVmdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS50b3AgPSBwb3NpdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHogaW5kZXhcclxuICAgICAgICBpZiAoIHRoaXMuX3RodW1iRmlyc3QgKSB7XHJcbiAgICAgICAgICAgIGlmICggIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAodGhpcy5fdGh1bWJGaXJzdC5zdHlsZS5sZWZ0ID09ICcxMDAlJykgfHwgKHRoaXMuX3RodW1iRmlyc3Quc3R5bGUudG9wID09ICcxMDAlJykgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGh1bWJGaXJzdC5zdHlsZS56SW5kZXggPSAnMSc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RodW1iRmlyc3Quc3R5bGUuekluZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmluZFRodW1iUG9zaXRpb24odmFsdWU6IG51bWJlciwgb3B0aW9uczogSU9wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBwb3M6IHN0cmluZztcclxuICAgICAgICBwb3MgPSAhb3B0aW9ucy5yZXZlcnNlID9cclxuICAgICAgICAodmFsdWUgLSBvcHRpb25zLm1pbikgLyAob3B0aW9ucy5tYXggLSBvcHRpb25zLm1pbikgKiAxMDAgKyAnJScgOlxyXG4gICAgICAgIChvcHRpb25zLm1heCAtIHZhbHVlKSAvIChvcHRpb25zLm1heCAtIG9wdGlvbnMubWluKSAqIDEwMCArICclJ1xyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVOb2RlKG5vZGU6IEhUTUxEaXZFbGVtZW50KTogdW5kZWZpbmVkIHtcclxuICAgICAgICBub2RlLnJlbW92ZSgpO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZE5vZGUocGFyZW50Tm9kZTogSFRNTERpdkVsZW1lbnQsIC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGxldCBub2RlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAgICAgXHJcblxyXG4gICAgICAgIGZvciAoIGxldCBpOiBudW1iZXIgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoYXJndW1lbnRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGFyZW50Tm9kZS5hcHBlbmQobm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgZ2V0VmFsaWRMZW5ndGgoc3RyOiBhbnksIHZhbGlkTGVuZ3RoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICggdHlwZW9mICgnJyArIHN0cikgPT0gJ3N0cmluZycgKSB7XHJcbiAgICAgICAgICAgIGxldCByID0gKCcnICsgc3RyKS5tYXRjaCgvXlxcZHsxLDN9Wy4sXT9cXGQqKHB4fGVtfHJlbXwlfHZofHZ3KT8kL2kpO1xyXG4gICAgICAgICAgICBpZiAoIHIgJiYgaXNOdW1lcmljKHJbMF0pICkgeyBcclxuICAgICAgICAgICAgICAgIHJldHVybiByWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnLCcsICcuJykgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCByICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcsJywgJy4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZExlbmd0aFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TGVuZ3RoSW5QeCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9ICF0aGlzLl92ZXJ0aWNhbCA/XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLm9mZnNldFdpZHRoIDpcclxuICAgICAgICB0aGlzLl9zbGlkZXIub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICByZXR1cm4gbGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0T2Zmc2V0SW5QeCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBvZmZzZXQ6IG51bWJlciA9ICF0aGlzLl92ZXJ0aWNhbCA/XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgOlxyXG4gICAgICAgIHRoaXMuX3NsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcblxyXG4gICAgICAgIHJldHVybiBvZmZzZXQ7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgSVZpZXcsIElWaWV3T3B0aW9ucyB9O1xyXG5leHBvcnQgZGVmYXVsdCBWaWV3OyIsImZ1bmN0aW9uIGlzTnVtZXJpYyhuOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgIWlzTmFOKG4gLSAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVlcEVxdWFsKG9iajEsIG9iajIpIHtcclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmoxKT09PUpTT04uc3RyaW5naWZ5KG9iajIpO1xyXG4gfVxyXG5cclxuZnVuY3Rpb24gZ2V0TnVtYmVyT2ZTdGVwcyhtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIHN0ZXA6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5jZWlsKChtYXggLSBtaW4pIC8gc3RlcCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGlzTnVtZXJpYywgZ2V0TnVtYmVyT2ZTdGVwcywgZGVlcEVxdWFsIH07XHJcblxyXG4iLCJpbXBvcnQgeyBJTW9kZWxPcHRpb25zIH0gZnJvbSBcIi4vTW9kZWxcIjtcclxuaW1wb3J0IHsgSVZpZXdPcHRpb25zIH0gZnJvbSBcIi4vVmlld1wiO1xyXG5cclxuaW50ZXJmYWNlIElPcHRpb25zIGV4dGVuZHMgSU1vZGVsT3B0aW9ucywgSVZpZXdPcHRpb25zIHt9XHJcblxyXG5sZXQgZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zID0ge1xyXG4gICAgLy8gTW9kZWwgb3B0aW9uc1xyXG4gICAgLy8g0LIg0L3QsNGH0LDQu9GM0L3Ri9GFINC90LDRgdGC0YDQvtC50LrQsNGFINC90LUg0L7Qv9GA0LXQtNC10LvQtdC90Ysg0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0LjQu9C4INC/0YDQvtC80LXQttGD0YLQvtC6LlxyXG4gICAgLy8g0LXRgdC70Lgg0L7QvdC4INC90LUg0YPQutCw0LfQsNC90Ysg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10LwsINC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1IHZhbHVlID09IG1pbiBcclxuICAgIHZhbHVlOiBudWxsLFxyXG4gICAgbWluOiAwLFxyXG4gICAgbWF4OiAxMCxcclxuICAgIHN0ZXA6IDEsXHJcbiAgICByZXZlcnNlOiBmYWxzZSxcclxuICAgIHJhbmdlOiBudWxsLFxyXG4gICAgXHJcbiAgICBsZW5ndGg6ICczMDBweCcsXHJcbiAgICB2ZXJ0aWNhbDogZmFsc2UsXHJcbiAgICB0b29sdGlwOiBmYWxzZSxcclxuICAgIHNjYWxlOiBmYWxzZSxcclxufVxyXG5cclxuZXhwb3J0IHsgSU9wdGlvbnMgfTtcclxuZXhwb3J0IHsgZGVmYXVsdE9wdGlvbnMgfTtcclxuIiwiaW1wb3J0IE1vZGVsLCB7IElNb2RlbCB9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgVmlldywgeyBJVmlldyB9IGZyb20gJy4vVmlldyc7XHJcbmltcG9ydCBQcmVzZW50ZXIgZnJvbSAnLi9QcmVzZW50ZXInO1xyXG5pbXBvcnQgeyBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IHsgSUNvbmZpZyB9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG4vL2ltcG9ydCB7IElPdXRlck9ic2VydmVyLCBPdXRlck9ic2VydmVyIH0gZnJvbSAnLi9PYnNlcnZlcic7XHJcblxyXG4oZnVuY3Rpb24gKCQpIHtcclxuXHJcbiAgaW50ZXJmYWNlIElNZXRob2RzIHtcclxuICAgIGluaXQob3B0aW9ucz86IElPcHRpb25zKTogdm9pZDtcclxuICAgIGdldERhdGEoKTogSU9wdGlvbnM7XHJcbiAgICB1cGRhdGUob3B0aW9uczogYW55KTogdm9pZDtcclxuICAgIGRlc3Ryb3koKTogdm9pZDtcclxuICAgIG9ic2VydmUoZnVuYzogRnVuY3Rpb24pOiB2b2lkO1xyXG4gIH1cclxuXHJcbiAgdmFyIG1ldGhvZHM6IElNZXRob2RzID0ge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChvcHRpb25zPzogSU9wdGlvbnMpOiB2b2lkIHtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBkYXRhID0gJHRoaXMuZGF0YSgnc2xpZGVyRGF0YScpO1xyXG4gICAgICAgIGxldCBzbGlkZXIgPSAkdGhpcztcclxuXHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0L/Qu9Cw0LPQuNC9INC10YnRkSDQvdC1INC/0YDQvtC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDQvVxyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG5cclxuICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgIGxldCBwcmVzZW50ZXIgPSBuZXcgUHJlc2VudGVyKG9wdGlvbnMsIHRoaXMpO1xyXG5cclxuICAgICAgICAgICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScsIHtcclxuICAgICAgICAgICAgc2xpZGVyOiBzbGlkZXIsXHJcbiAgICAgICAgICAgIHByZXNlbnRlcjogcHJlc2VudGVyXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RGF0YTogZnVuY3Rpb24gKCk6IElPcHRpb25zIHtcclxuICAgICAgcmV0dXJuICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScpLnByZXNlbnRlci5nZXREYXRhKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBjb25maWc6IElDb25maWcgPSB7XHJcbiAgICAgICAgICB0eXBlOiAnTkVXX0RBVEEnLFxyXG4gICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykucHJlc2VudGVyLnVwZGF0ZShjb25maWcpO1xyXG5cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpOiB2b2lkIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSAkdGhpcy5kYXRhKCdzbGlkZXJEYXRhJyk7XHJcblxyXG4gICAgICAgICQod2luZG93KS51bmJpbmQoJy5zbGlkZXInKTtcclxuICAgICAgICBkYXRhLnNsaWRlci5yZW1vdmUoKTtcclxuICAgICAgICAkdGhpcy5yZW1vdmVEYXRhKCdzbGlkZXJEYXRhJyk7XHJcblxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgb2JzZXJ2ZTogZnVuY3Rpb24gKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG5cclxuICAgICAgbGV0IHByZXNlbnRlciA9ICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScpLnByZXNlbnRlcjtcclxuICAgICAgcHJlc2VudGVyLmF0dGFjaChjYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuLy8gPz8/Pz8/Pz8/Pz8/P1xyXG4gIGpRdWVyeS5mbi5zbGlkZXIgPSBmdW5jdGlvbiAobWV0aG9kOiBzdHJpbmcpOiBKUXVlcnkge1xyXG5cclxuICAgIC8vINC70L7Qs9C40LrQsCDQstGL0LfQvtCy0LAg0LzQtdGC0L7QtNCwXHJcbiAgICBpZiAobWV0aG9kc1ttZXRob2QgYXMgc3RyaW5nXSkge1xyXG5cclxuICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kIGFzIHN0cmluZ10uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XHJcblxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XHJcblxyXG4gICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJC5lcnJvcignTWV0aG9kIGNhbGxlZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBmb3IgSlF1ZXJ5LnNsaWRlcicpO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxufSkoalF1ZXJ5KTtcclxuXHJcblxyXG4vL2xldCB0ZXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlc3QnKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuXHJcblxyXG4vL2xldCBwcmVzID0gbmV3IFByZXNlbnRlcihkZWZhdWx0T3B0aW9ucywgdGVzdCk7XHJcblxyXG4vKiAkKCcudGVzdCcpLnNsaWRlcih7XHJcbiAgLy92YWx1ZTogMCxcclxuICAvL21pbjogLTcuNjY2NixcclxuICByYW5nZTogJ2hqaywnLFxyXG4gIC8vcmV2ZXJzZTogdHJ1ZSxcclxuICAvL2N1c3RvbVZhbHVlczogWydhJywgJ2InLCAnYycsICdkJ10sXHJcbiAgc3RlcDogJ2hnJyxcclxuICB2YWx1ZTogJ3Z4bnhtJyxcclxuICBtaW46ICdmZGd2aHhqaycsXHJcbiAgbWF4OiAxNy41LFxyXG4gIHRvb2x0aXA6IHRydWUsXHJcbiAgc2NhbGU6IHRydWVcclxufSk7XHJcblxyXG4kKCcudGVzdCcpLnNsaWRlcignb2JzZXJ2ZScsIGZ1bmN0aW9uKGNvbmZpZykge1xyXG4gIGlmIChjb25maWcub3B0aW9ucyAmJiBjb25maWcub3B0aW9ucy5yYW5nZSkge1xyXG4gICAgJCgnLmlucHV0JykudmFsKGNvbmZpZy5vcHRpb25zLnJhbmdlKTtcclxuICB9XHJcblxyXG4gIGlmIChjb25maWcudHlwZSA9PSAnV0FSTklOR1MnKSB7XHJcblxyXG4gICAgZm9yICggbGV0IGtleSBpbiBjb25maWcud2FybmluZ3MgKSB7XHJcbiAgICAgICQoJy53YXJzJykuYXBwZW5kKCc8cD4nICsgY29uZmlnLndhcm5pbmdzW2tleV0gKyAnPC9wPicpXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn0pXHJcblxyXG4kKCcudGVzdCcpLnNsaWRlcigndXBkYXRlJywge1xyXG4gIG1pbjogMjAsXHJcbiAgcmFuZ2U6IFszLCA3XSxcclxuICBtYXg6IC0zXHJcbn0pXHJcblxyXG5cclxuJCgnLnRlc3QnKS5zbGlkZXIoJ3VwZGF0ZScsIHtcclxuICBtaW46IC01LjgsXHJcbiAgcmFuZ2U6IFszLCA3LCAnZGd4ICcsIDVdLFxyXG4gIG1heDogJ3ZibidcclxufSkgKi9cclxuXHJcblxyXG5cclxuLyogbGV0IG1vZCA9IG5ldyBNb2RlbChkZWZhdWx0T3B0aW9ucyk7XHJcbmNvbnNvbGUubG9nKG1vZC5yZXZlcnNlKVxyXG5tb2QubWFrZUZ1bGxDaGFuZ2VzKHtyZXZlcnNlOiB0cnVlfSlcclxuY29uc29sZS5sb2cobW9kLnJldmVyc2UpXHJcbm1vZC5tYWtlRnVsbENoYW5nZXMoe3JldmVyc2U6IGZhbHNlfSlcclxuY29uc29sZS5sb2cobW9kLnJldmVyc2UpICovIiwiaW1wb3J0IHsgSU1vZGVsT3B0aW9ucyB9IGZyb20gXCIuL01vZGVsXCI7XHJcbmltcG9ydCB7IGlzTnVtZXJpYyB9IGZyb20gXCIuL2NvbW1vbkZ1bmN0aW9uc1wiO1xyXG5cclxuaW50ZXJmYWNlIElXYXJuaW5ncyB7XHJcbiAgICB2YWx1ZXNBcmVOb3ROdW1iZXJzPzogc3RyaW5nLFxyXG4gICAgdmFsdWVzQXJlTm90SW50ZWdlcj86IHN0cmluZyxcclxuICAgIG1pbklzT3Zlck1heD86IHN0cmluZyxcclxuICAgIG1pbklzRXF1YWxUb01heD86IHN0cmluZyxcclxuICAgIHdyb25nUmFuZ2VMZW5ndGg/OiBzdHJpbmcsXHJcbiAgICB3cm9uZ09yZGVySW5SYW5nZT86IHN0cmluZyxcclxuICAgIHRvb0JpZ1N0ZXA/OiBzdHJpbmcsXHJcbiAgICBzdGVwSXNOdWxsPzogc3RyaW5nLFxyXG4gICAgcmV2ZXJzZUlzTm90Qm9vbGVhbj86IHN0cmluZyxcclxuICAgIGN1c3RvbVZhbHVlc0lzTm90QXJyYXk/OiBzdHJpbmcsXHJcbiAgICBjdXN0b21WYWx1ZXNJc1Rvb1NtYWxsPyA6IHN0cmluZyxcclxuXHJcbiAgICBpbnZhbGlkTGVuZ3RoPzogc3RyaW5nLFxyXG4gICAgdmVydGljYWxJc05vdEJvb2xlYW4/OiBzdHJpbmcsXHJcbiAgICB0b29sdGlwSXNOb3RCb29sZWFuPzogc3RyaW5nLFxyXG4gICAgc2NhbGVJc05vdEJvb2xlYW4/OiBzdHJpbmcsXHJcbn1cclxuXHJcbmxldCB3YXJuaW5nczogSVdhcm5pbmdzID0ge1xyXG4gICAgdmFsdWVzQXJlTm90TnVtYmVyczogJ0FsbCB2YWx1ZXMsIGluc3RlYWQgb2YgY3VzdG9tVmFsdWVzLCBzaG91bGQgYmUgbnVtYmVycycsXHJcbiAgICB2YWx1ZXNBcmVOb3RJbnRlZ2VyOiAnQWxsIHZhbHVlcywgaW5zdGVhZCBvZiBjdXN0b21WYWx1ZXMsIHNob3VsZCBiZSBpbnRlZ2VyJyxcclxuICAgIG1pbklzT3Zlck1heDogJ01pbiB2YWx1ZSBzaG91bGQgYmUgbGVzcyB0aGVuIG1heCB2YWx1ZScsXHJcbiAgICBtaW5Jc0VxdWFsVG9NYXg6ICdNaW4gdmFsdWUgY2FudCBiZSBlcXVhbCB0byBtYXggdmFsdWUnLFxyXG4gICAgd3JvbmdSYW5nZUxlbmd0aDogJ1JhbmdlIHNob3VsZCBjb250YWluIHR3byB2YWx1ZXMnLFxyXG4gICAgd3JvbmdPcmRlckluUmFuZ2U6ICdUaGUgZmlyc3QgbnVtYmVyIGluIHJhbmdlIHNob3VsZCBiZSBsZXNzIHRoZW4gc2Vjb25kJyxcclxuICAgIHRvb0JpZ1N0ZXA6ICdTdGVwIHNob3VsZCBiZSBsZXNzIHRoZW4gZGlmZmVyZW5jZSBvZiBtYXggYW5kIG1pbiB2YWx1ZXMnLFxyXG4gICAgc3RlcElzTnVsbDogJ1N0ZXAgY2FudCBiZSBlcXVhbCB0byAwJyxcclxuICAgIHJldmVyc2VJc05vdEJvb2xlYW46ICdPcHRpb24gcmV2ZXJzZSBzaG91bGQgYmUgdHJ1ZSBvciBmYWxzZScsXHJcbiAgICBjdXN0b21WYWx1ZXNJc05vdEFycmF5OiAnQ3VzdG9tVmFsdWVzIHNob3VsZCBiZSBhcnJheScsXHJcbiAgICBjdXN0b21WYWx1ZXNJc1Rvb1NtYWxsOiAnQ3VzdG9tVmFsdWVzIHNob3VsZCBjb250YWluIGF0IGxlYXN0IHR3byB2YWx1ZXMnLFxyXG5cclxuICAgIGludmFsaWRMZW5ndGg6ICdMZW5ndGggc2hvdWxkIGJlIHZhbGlkIHRvIENTUycsXHJcbiAgICB2ZXJ0aWNhbElzTm90Qm9vbGVhbjogJ09wdGlvbiB2ZXJ0aWNhbCBzaG91bGQgYmUgdHJ1ZSBvciBmYWxzZScsXHJcbiAgICB0b29sdGlwSXNOb3RCb29sZWFuOiAnT3B0aW9uIHRvb2x0aXAgc2hvdWxkIGJlIHRydWUgb3IgZmFsc2UnLFxyXG4gICAgc2NhbGVJc05vdEJvb2xlYW46ICdPcHRpb24gc2NhbGUgc2hvdWxkIGJlIHRydWUgb3IgZmFsc2UnLFxyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGVsKG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiBJV2FybmluZ3Mge1xyXG5cclxuICAgIGxldCB3YXJuczogSVdhcm5pbmdzID0ge307XHJcblxyXG4gICAgbGV0IG51bWJlcnM6IG51bWJlcltdID0gW29wdGlvbnMubWluLCBvcHRpb25zLm1heCwgb3B0aW9ucy5zdGVwXTtcclxuICAgIGlmIChvcHRpb25zLnJhbmdlKSB7XHJcbiAgICAgICAgbnVtYmVycy5wdXNoKG9wdGlvbnMucmFuZ2VbMF0sIG9wdGlvbnMucmFuZ2VbMV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBudW1iZXJzLnB1c2gob3B0aW9ucy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmICggIXZhbGlkYXRlTnVtYmVycyhudW1iZXJzKSApIHsgXHJcbiAgICAgICAgd2FybnMudmFsdWVzQXJlTm90TnVtYmVycyA9IHdhcm5pbmdzLnZhbHVlc0FyZU5vdE51bWJlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCAhdmFsaWRhdGVJbnRlZ2VycyhudW1iZXJzKSApIHtcclxuICAgICAgICB3YXJucy52YWx1ZXNBcmVOb3RJbnRlZ2VyID0gd2FybmluZ3MudmFsdWVzQXJlTm90SW50ZWdlcjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIG9wdGlvbnMubWluID4gb3B0aW9ucy5tYXggKSB7XHJcbiAgICAgICAgd2FybnMubWluSXNPdmVyTWF4ID0gd2FybmluZ3MubWluSXNPdmVyTWF4O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggb3B0aW9ucy5taW4gPT0gb3B0aW9ucy5tYXggKSB7XHJcbiAgICAgICAgd2FybnMubWluSXNFcXVhbFRvTWF4ID0gd2FybmluZ3MubWluSXNFcXVhbFRvTWF4O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICBpZiAoICFBcnJheS5pc0FycmF5KG9wdGlvbnMucmFuZ2UpIHx8IG9wdGlvbnMucmFuZ2UubGVuZ3RoICE9IDIgKSB7XHJcbiAgICAgICAgICAgIHdhcm5zLndyb25nUmFuZ2VMZW5ndGggPSB3YXJuaW5ncy53cm9uZ1JhbmdlTGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhd2FybnMud3JvbmdSYW5nZUxlbmd0aCAmJiBvcHRpb25zLnJhbmdlWzBdID4gb3B0aW9ucy5yYW5nZVsxXSApIHtcclxuICAgICAgICAgICAgd2FybnMud3JvbmdPcmRlckluUmFuZ2UgPSB3YXJuaW5ncy53cm9uZ09yZGVySW5SYW5nZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCBNYXRoLmFicyhvcHRpb25zLm1heCAtIG9wdGlvbnMubWluKSA8IE1hdGguYWJzKG9wdGlvbnMuc3RlcCkgKSB7XHJcbiAgICAgICAgd2FybnMudG9vQmlnU3RlcCA9IHdhcm5pbmdzLnRvb0JpZ1N0ZXA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICggb3B0aW9ucy5zdGVwID09IDAgKSB7XHJcbiAgICAgICAgd2FybnMuc3RlcElzTnVsbCA9IHdhcm5pbmdzLnN0ZXBJc051bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCB0eXBlb2Ygb3B0aW9ucy5yZXZlcnNlICE9ICdib29sZWFuJyApIHtcclxuICAgICAgICB3YXJucy5yZXZlcnNlSXNOb3RCb29sZWFuID0gd2FybmluZ3MucmV2ZXJzZUlzTm90Qm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIG9wdGlvbnMuY3VzdG9tVmFsdWVzICkge1xyXG4gICAgICAgIGlmICggIUFycmF5LmlzQXJyYXkob3B0aW9ucy5jdXN0b21WYWx1ZXMpICkge1xyXG4gICAgICAgICAgICB3YXJucy5jdXN0b21WYWx1ZXNJc05vdEFycmF5ID0gd2FybmluZ3MuY3VzdG9tVmFsdWVzSXNOb3RBcnJheTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggIXdhcm5zLmN1c3RvbVZhbHVlc0lzTm90QXJyYXkgJiYgb3B0aW9ucy5jdXN0b21WYWx1ZXMubGVuZ3RoIDwgMiApIHtcclxuICAgICAgICAgICAgd2FybnMuY3VzdG9tVmFsdWVzSXNUb29TbWFsbCA9IHdhcm5pbmdzLmN1c3RvbVZhbHVlc0lzVG9vU21hbGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB3YXJucztcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVOdW1iZXJzKG51bWJlcnM6IG51bWJlcltdKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBudW1iZXJzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkgeyBcclxuICAgICAgICBpZiggIWlzTnVtZXJpYyhpdGVtKSApIHsgXHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpc1ZhbGlkO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUludGVnZXJzKG51bWJlcnM6IG51bWJlcltdKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBudW1iZXJzLmZvckVhY2goZnVuY3Rpb24obnVtKSB7XHJcbiAgICAgICAgaWYgKCBudW0gJSAxICE9IDAgKSB7IFxyXG4gICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXNWYWxpZDtcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVWaWV3KG9wdGlvbnMpOiBJV2FybmluZ3Mge1xyXG4gICAgbGV0IHdhcm5zOiBJV2FybmluZ3MgPSB7fTtcclxuXHJcbiAgICBpZiAoICFvcHRpb25zLmxlbmd0aC5tYXRjaCgvXlxcZHsxLDN9Wy4sXT9cXGQqKHB4fGVtfHJlbXwlfHZofHZ3KT8kL2kpICkge1xyXG4gICAgICAgIHdhcm5zLmludmFsaWRMZW5ndGggPSB3YXJuaW5ncy5pbnZhbGlkTGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggdHlwZW9mIG9wdGlvbnMudmVydGljYWwgIT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgIHdhcm5zLnZlcnRpY2FsSXNOb3RCb29sZWFuID0gd2FybmluZ3MudmVydGljYWxJc05vdEJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCB0eXBlb2Ygb3B0aW9ucy50b29sdGlwICE9ICdib29sZWFuJyApIHtcclxuICAgICAgICB3YXJucy50b29sdGlwSXNOb3RCb29sZWFuID0gd2FybmluZ3MudG9vbHRpcElzTm90Qm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIHR5cGVvZiBvcHRpb25zLnNjYWxlICE9ICdib29sZWFuJyApIHtcclxuICAgICAgICB3YXJucy5zY2FsZUlzTm90Qm9vbGVhbiA9IHdhcm5pbmdzLnNjYWxlSXNOb3RCb29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB3YXJucztcclxufVxyXG5cclxuZXhwb3J0IHsgdmFsaWRhdGVNb2RlbCwgdmFsaWRhdGVWaWV3LCBJV2FybmluZ3MgfSJdLCJzb3VyY2VSb290IjoiIn0=