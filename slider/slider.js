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
    function Model(options, update) {
        var _this = _super.call(this) || this;
        var fullOptions = Object.assign({}, defaultOptions_1.defaultOptions, options);
        var validOptions;
        _this.validate(fullOptions);
        validOptions = _this.normalize(fullOptions, defaultOptions_1.defaultOptions);
        _this.setOptions(validOptions);
        _this._update = update;
        return _this;
    }
    Model.prototype.update = function (action) {
        this._update(action);
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
    Model.prototype.getLastUpdate = function () {
        return this._lastUpdate;
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
    Subject.prototype.notify = function () {
        for (var _i = 0, _a = this.callbacks; _i < _a.length; _i++) {
            var callback = _a[_i];
            callback();
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
var commonFunctions_1 = __webpack_require__(/*! ./commonFunctions */ "./src/commonFunctions.ts");
var updateModel = function (action) {
    var prevOptions = this.getOptions();
    this.validate(Object.assign({}, prevOptions, action.options));
    var validOptions = this.normalize(action.options, prevOptions);
    if (commonFunctions_1.deepEqual(prevOptions, validOptions)) {
        return;
    }
    this.setOptions(validOptions);
    switch (action.type) {
        case 'SET_NEW_OPTIONS':
            this._lastUpdate = 'NEW_OPTIONS';
            break;
        case 'SET_NEW_VALUE':
            this._lastUpdate = 'NEW_VALUE';
            break;
    }
    this.notify();
};
var updateView = function (action) {
    switch (action.type) {
        case 'SET_NEW_POSITION':
            this.setThumbs(action.options);
            this.setBarPosition();
            if (this._tooltip || this._tooltipFirst) {
                this.setTooltipValues(action.options);
            }
            this._lastUpdate = 'NEW_POSITION';
            break;
        case 'SET_NEW_OPTIONS':
            action.options = Object.assign({}, this.getOptions(), action.options);
            this.validate(action.options);
            this.rebuild(action.options);
            this._lastUpdate = 'NEW_OPTIONS';
            break;
    }
};
var Presenter = (function (_super) {
    __extends(Presenter, _super);
    function Presenter(options, node) {
        var _this = _super.call(this) || this;
        options = Object.assign({}, defaultOptions_1.defaultOptions, options);
        _this._model = new Model_1.default(options, updateModel);
        options = Object.assign(options, _this._model.getOptions());
        _this._view = new View_1.default(options, node, updateView);
        var that = _this;
        _this._model.attach(function (action) {
            that._lastUpdate = 'MODEL';
            that.update(action);
        });
        _this._view.attach(function (action) {
            that._lastUpdate = 'VIEW';
            that.update(action);
        });
        return _this;
    }
    Presenter.prototype.setLastUpdate = function (value) {
        this._lastUpdate = value;
    };
    Presenter.prototype.update = function (options) {
        var newOptions;
        var action;
        switch (this._lastUpdate) {
            case 'NEW_OUTER_OPTIONS':
                newOptions = Object.assign({}, this._view.getOptions(), this._model.getOptions(), options);
                action = {
                    type: 'SET_NEW_OPTIONS',
                    options: newOptions
                };
                this._model.update(action);
                newOptions = Object.assign(newOptions, this._model.getOptions());
                action.options = newOptions;
                this._view.update(action);
                this.notify();
                break;
            case 'MODEL':
                switch (this._model.getLastUpdate()) {
                    case 'NEW_VALUE':
                        newOptions = this._model.getOptions();
                        action = {
                            type: 'SET_NEW_POSITION',
                            options: newOptions
                        };
                        break;
                    case 'NEW_OPTIONS':
                        newOptions = Object.assign({}, this._view.getOptions(), this._model.getOptions());
                        action = {
                            type: 'SET_NEW_OPTIONS',
                            options: newOptions
                        };
                        break;
                }
                this._view.update(action);
                this.notify();
                break;
            case 'VIEW':
                if (this._view.getLastUpdate() == 'NEW_POSITION') {
                    var _a = this._view.getNewIndent(), percent = _a.percent, index = _a.index;
                    var modelOptions = this._model.getOptions();
                    var newValue = void 0;
                    newValue = percent * (modelOptions.max - modelOptions.min) / 100;
                    newValue = !modelOptions.reverse ?
                        modelOptions.min + newValue :
                        modelOptions.max - newValue;
                    newValue = commonFunctions_1.findClosestStep(newValue, modelOptions);
                    if (!modelOptions.range) {
                        newOptions = { value: newValue };
                    }
                    else {
                        var isFirstInRange = void 0;
                        isFirstInRange = index == 0 && !modelOptions.reverse;
                        isFirstInRange = isFirstInRange || index == 1 && modelOptions.reverse;
                        if (isFirstInRange) {
                            newValue = Math.min(newValue, modelOptions.range[1]);
                            newOptions = { range: [newValue, modelOptions.range[1]] };
                        }
                        else {
                            newValue = Math.max(newValue, modelOptions.range[0]);
                            newOptions = { range: [modelOptions.range[0], newValue] };
                        }
                    }
                    action = {
                        type: 'SET_NEW_VALUE',
                        options: newOptions
                    };
                    this._model.update(action);
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
    function View(options, sliderNode, update) {
        var _this = _super.call(this) || this;
        options = Object.assign(defaultOptions_1.defaultOptions, options);
        _this.validate(options);
        _this._slider = sliderNode;
        _this._slider.classList.add('slider');
        _this.build(options);
        _this._update = update;
        return _this;
    }
    View.prototype.update = function (action) {
        this._update(action);
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
    View.prototype.getLastUpdate = function () {
        return this._lastUpdate;
    };
    View.prototype.getNewIndent = function () {
        return this._newIndent;
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
        this._newIndent = {
            index: index,
            percent: newThumbPosition
        };
        this._lastUpdate = 'NEW_POSITION';
        this.notify();
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
        this._newIndent = {
            index: index,
            percent: newThumbPosition
        };
        this._lastUpdate = 'NEW_POSITION';
        this.notify();
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
function findClosestStep(value, options) {
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
}
exports.findClosestStep = findClosestStep;


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
            var presenter = $(this).data('sliderData').presenter;
            presenter.setLastUpdate('NEW_OUTER_OPTIONS');
            presenter.update(options);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb25GdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZmF1bHRPcHRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsaWRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSw4RkFBNEQ7QUFDNUQsNEVBQXdEO0FBQ3hELGlHQUEyRTtBQUMzRSxxRkFBeUQ7QUFzQnpEO0lB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SSxPQUFPLEdBQVksSUFBSSxDQUFDO0lBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBUyxHQUFHO1FBQ3hCLElBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUc7WUFDaEIsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUNuQjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLE9BQU87SUFDekIsSUFBSSxLQUFLLEdBQWMsRUFBRSxDQUFDO0lBRTFCLElBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxFQUFHO1FBQ25FLEtBQUssQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQztLQUNoRDtJQUVELElBQUssT0FBTyxPQUFPLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRztRQUN4QyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDO0tBQzlEO0lBRUQsSUFBSyxPQUFPLE9BQU8sQ0FBQyxPQUFPLElBQUksU0FBUyxFQUFHO1FBQ3ZDLEtBQUssQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsbUJBQW1CLENBQUM7S0FDNUQ7SUFFRCxJQUFLLE9BQU8sT0FBTyxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUc7UUFDckMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztLQUN4RDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFdUIsb0NBQVkiLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IHsgSVN1YmplY3QsIFN1YmplY3QsIElDb25maWcgfSBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IHsgaXNOdW1lcmljLCBnZXROdW1iZXJPZlN0ZXBzLCBkZWVwRXF1YWwgfSBmcm9tICcuL2NvbW1vbkZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IHZhbGlkYXRlTW9kZWwsIElXYXJuaW5ncyB9IGZyb20gJy4vdmFsaWRhdGlvbnMnO1xyXG5cclxuaW50ZXJmYWNlIElNb2RlbE9wdGlvbnMge1xyXG4gICAgLy9beDogc3RyaW5nXTogYW55O1xyXG4gICAgdmFsdWU6IG51bWJlciB8IG51bGw7XHJcbiAgICBtaW46IG51bWJlcjtcclxuICAgIG1heDogbnVtYmVyO1xyXG4gICAgc3RlcDogbnVtYmVyO1xyXG4gICAgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gfCBudWxsO1xyXG4gICAgY3VzdG9tVmFsdWVzPzogc3RyaW5nW107XHJcbiAgICByZXZlcnNlOiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSU1vZGVsIGV4dGVuZHMgSVN1YmplY3Qge1xyXG4gICAgdXBkYXRlKGNvbmZpZzogSUNvbmZpZyk6IHZvaWQ7XHJcblxyXG4gICAgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zO1xyXG4gICAgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzO1xyXG4gICAgZ2V0TGFzdFVwZGF0ZSgpOiBzdHJpbmc7XHJcbn1cclxuXHJcblxyXG5jbGFzcyBNb2RlbCBleHRlbmRzIFN1YmplY3QgaW1wbGVtZW50cyBJTW9kZWwge1xyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlciB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9taW46IG51bWJlcjtcclxuICAgIHByaXZhdGUgX21heDogbnVtYmVyOyAgIFxyXG4gICAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBfY3VzdG9tVmFsdWVzPzogc3RyaW5nW10gfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9yZXZlcnNlOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX3dhcm5pbmdzOiBJV2FybmluZ3M7XHJcbiAgICBwcml2YXRlIF9sYXN0VXBkYXRlOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlOiBGdW5jdGlvbjtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogSU1vZGVsT3B0aW9ucywgdXBkYXRlOiBGdW5jdGlvbikge1xyXG5cclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICBsZXQgZnVsbE9wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgbGV0IHZhbGlkT3B0aW9uczogSU1vZGVsT3B0aW9ucztcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZShmdWxsT3B0aW9ucyk7XHJcbiAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy5ub3JtYWxpemUoZnVsbE9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcclxuICAgICAgICB0aGlzLnNldE9wdGlvbnModmFsaWRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlID0gdXBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShhY3Rpb24pIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCcyMjInKTtcclxuICAgICAgICAvL2NvbnNvbGUuZGlyKHRoaXMuX3VwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlKGFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbi8qICAgICBwdWJsaWMgdXBkYXRlKGNvbmZpZzogSUNvbmZpZyk6IHZvaWQge1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGNvbmZpZy50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdORVdfVkFMVUVfSU5fUEVSQ0VOVCc6XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUJ5UGVyY2VudChjb25maWcucGVyY2VudCwgY29uZmlnLmluZGV4KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeSh7IFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdORVdfVkFMVUUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnTkVXX0RBVEEnOlxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcmV2T3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZShPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgY29uZmlnLm9wdGlvbnMpKVxyXG4gICAgICAgICAgICAgICAgbGV0IHZhbGlkT3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IHRoaXMubm9ybWFsaXplKGNvbmZpZy5vcHRpb25zLCBwcmV2T3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCAhZGVlcEVxdWFsKHByZXZPcHRpb25zLCB2YWxpZE9wdGlvbnMpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9ucyh2YWxpZE9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdORVdfREFUQScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfSAqL1xyXG5cclxuICAgIHB1YmxpYyBnZXRPcHRpb25zKCk6IElNb2RlbE9wdGlvbnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl92YWx1ZSxcclxuICAgICAgICAgICAgbWluOiB0aGlzLl9taW4sXHJcbiAgICAgICAgICAgIG1heDogdGhpcy5fbWF4LCAgIFxyXG4gICAgICAgICAgICBzdGVwOiB0aGlzLl9zdGVwLFxyXG4gICAgICAgICAgICByYW5nZTogdGhpcy5fcmFuZ2UsXHJcbiAgICAgICAgICAgIGN1c3RvbVZhbHVlczogdGhpcy5fY3VzdG9tVmFsdWVzLFxyXG4gICAgICAgICAgICByZXZlcnNlOiB0aGlzLl9yZXZlcnNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRXYXJuaW5ncygpOiBJV2FybmluZ3Mge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl93YXJuaW5ncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldExhc3RVcGRhdGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdFVwZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldE9wdGlvbnMob3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gb3B0aW9ucy52YWx1ZTtcclxuICAgICAgICB0aGlzLl9taW4gPSBvcHRpb25zLm1pbjtcclxuICAgICAgICB0aGlzLl9tYXggPSBvcHRpb25zLm1heDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gb3B0aW9ucy5yYW5nZTtcclxuICAgICAgICB0aGlzLl9jdXN0b21WYWx1ZXMgPSBvcHRpb25zLmN1c3RvbVZhbHVlczsgICAgICBcclxuICAgICAgICB0aGlzLl9yZXZlcnNlID0gb3B0aW9ucy5yZXZlcnNlOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZShvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuX3dhcm5pbmdzID0ge307XHJcbiAgICAgICAgdGhpcy5fd2FybmluZ3MgPSB2YWxpZGF0ZU1vZGVsKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoIE9iamVjdC5rZXlzKHRoaXMuX3dhcm5pbmdzKS5sZW5ndGggIT0gMCApIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB3YXJuaW5nczogSVdhcm5pbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fd2FybmluZ3MpO1xyXG4gICAgICAgICAgICBcclxuLyogICAgICAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1dBUk5JTkdTJyxcclxuICAgICAgICAgICAgICAgIHdhcm5pbmdzOiB3YXJuaW5nc1xyXG4gICAgICAgICAgICB9KSAqL1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5vcm1hbGl6ZShvcHRpb25zOiBJTW9kZWxPcHRpb25zLCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiBJTW9kZWxPcHRpb25zIHtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHZhbGlkT3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5fd2FybmluZ3MuY3VzdG9tVmFsdWVzSXNOb3RBcnJheSB8fCB0aGlzLl93YXJuaW5ncy5jdXN0b21WYWx1ZXNJc1Rvb1NtYWxsICkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmN1c3RvbVZhbHVlcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5jdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMubWluID0gMDtcclxuICAgICAgICAgICAgb3B0aW9ucy5tYXggPSBvcHRpb25zLmN1c3RvbVZhbHVlcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3B0aW9ucy5taW4gPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLm1pbiwgdmFsaWRPcHRpb25zLm1pbik7XHJcbiAgICAgICAgb3B0aW9ucy5tYXggPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLm1heCwgdmFsaWRPcHRpb25zLm1heCk7XHJcbiAgICAgICAgb3B0aW9ucy5zdGVwID0gdGhpcy5ub3JtYWxpemVOdW1iZXIob3B0aW9ucy5zdGVwLCB2YWxpZE9wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5fd2FybmluZ3MubWluSXNPdmVyTWF4ICkge1xyXG4gICAgICAgICAgICBbb3B0aW9ucy5taW4sIG9wdGlvbnMubWF4XSA9IFtvcHRpb25zLm1heCwgb3B0aW9ucy5taW5dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLl93YXJuaW5ncy5taW5Jc0VxdWFsVG9NYXggKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMubWluID0gdmFsaWRPcHRpb25zLm1pbjtcclxuICAgICAgICAgICAgb3B0aW9ucy5tYXggPSB2YWxpZE9wdGlvbnMubWF4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLl93YXJuaW5ncy5zdGVwSXNOdWxsIHx8IHRoaXMuX3dhcm5pbmdzLnRvb0JpZ1N0ZXAgKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuc3RlcCA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSBNYXRoLmFicyhvcHRpb25zLnN0ZXApO1xyXG4gICAgICAgIG9wdGlvbnMucmV2ZXJzZSA9ICEhb3B0aW9ucy5yZXZlcnNlO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMubm9ybWFsaXplTnVtYmVyKG9wdGlvbnMudmFsdWUsIG9wdGlvbnMubWluKTtcclxuICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMuZmluZENsb3Nlc3RTdGVwKG9wdGlvbnMudmFsdWUsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2UgPSBudWxsO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhQXJyYXkuaXNBcnJheShvcHRpb25zLnJhbmdlKSApIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2UgPSBbb3B0aW9ucy5taW4sIG9wdGlvbnMubWF4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IG9wdGlvbnMucmFuZ2Uuc2xpY2UoMCwgMikgYXMgW251bWJlciwgbnVtYmVyXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMF0gPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLnJhbmdlWzBdLCBvcHRpb25zLm1pbik7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMV0gPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLnJhbmdlWzFdLCBvcHRpb25zLm1heCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3dhcm5pbmdzLndyb25nT3JkZXJJblJhbmdlICkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICAgICAgICAgICAgICB9KTsgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMF0gPSB0aGlzLmZpbmRDbG9zZXN0U3RlcChvcHRpb25zLnJhbmdlWzBdLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVsxXSA9IHRoaXMuZmluZENsb3Nlc3RTdGVwKG9wdGlvbnMucmFuZ2VbMV0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG5vcm1hbGl6ZU51bWJlcih2YWx1ZTogbnVtYmVyLCBkZWZhdWx0VmFsOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBuZXdWYWx1ZTogbnVtYmVyID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICggIWlzTnVtZXJpYyh2YWx1ZSkgKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gZGVmYXVsdFZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3VmFsdWUgPSBNYXRoLnRydW5jKCtuZXdWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGZpbmRDbG9zZXN0U3RlcCh2YWx1ZTogbnVtYmVyLCBvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyO1xyXG4gICAgICAgIGxldCBjZWlsU3RlcHM6IG51bWJlcjtcclxuICAgICAgICBsZXQgcmVzdE9mU3RlcDogbnVtYmVyO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnJldmVyc2UgKSB7XHJcbiAgICAgICAgICAgIGNlaWxTdGVwcyA9IE1hdGgudHJ1bmMoICh2YWx1ZSAtIG9wdGlvbnMubWluKSAvIG9wdGlvbnMuc3RlcCApO1xyXG4gICAgICAgICAgICByZXN0T2ZTdGVwID0gKHZhbHVlIC0gb3B0aW9ucy5taW4pICUgb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgICAgICBzdGVwID0gb3B0aW9ucy5taW4gKyBjZWlsU3RlcHMgKiBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgICAgIHN0ZXAgPSByZXN0T2ZTdGVwID49IG9wdGlvbnMuc3RlcC8yID8gc3RlcCArIG9wdGlvbnMuc3RlcCA6IHN0ZXA7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNlaWxTdGVwcyA9IE1hdGgudHJ1bmMoIChvcHRpb25zLm1heCAtIHZhbHVlKSAvIG9wdGlvbnMuc3RlcCApO1xyXG4gICAgICAgICAgICByZXN0T2ZTdGVwID0gKG9wdGlvbnMubWF4IC0gdmFsdWUpICUgb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgICAgICBzdGVwID0gb3B0aW9ucy5tYXggLSBjZWlsU3RlcHMgKiBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgICAgIHN0ZXAgPSByZXN0T2ZTdGVwID49IG9wdGlvbnMuc3RlcC8yID8gc3RlcCAtIG9wdGlvbnMuc3RlcCA6IHN0ZXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGVwID0gc3RlcCA+IG9wdGlvbnMubWF4ID8gb3B0aW9ucy5tYXggOiBzdGVwO1xyXG4gICAgICAgIHN0ZXAgPSBzdGVwIDwgb3B0aW9ucy5taW4gPyBvcHRpb25zLm1pbiA6IHN0ZXA7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGVwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHNldFZhbHVlQnlQZXJjZW50KHBlcmNlbnQ6IG51bWJlciwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbmV3VmFsdWU6IG51bWJlcjtcclxuXHJcbiAgICAgICAgbmV3VmFsdWUgPSBwZXJjZW50ICogKHRoaXMuX21heCAtIHRoaXMuX21pbikgLyAxMDA7XHJcbiAgICAgICAgbmV3VmFsdWUgPSAhdGhpcy5fcmV2ZXJzZSA/IFxyXG4gICAgICAgIHRoaXMuX21pbiArIG5ld1ZhbHVlIDpcclxuICAgICAgICB0aGlzLl9tYXggLSBuZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmZpbmRDbG9zZXN0U3RlcChuZXdWYWx1ZSwgdGhpcy5nZXRPcHRpb25zKCkpO1xyXG5cclxuICAgICAgICBpZiAoICF0aGlzLl9yYW5nZSApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBpc0ZpcnN0SW5SYW5nZTogYm9vbGVhbjtcclxuICAgICAgICAgICAgaXNGaXJzdEluUmFuZ2UgPSBpbmRleCA9PSAwICYmICF0aGlzLl9yZXZlcnNlO1xyXG4gICAgICAgICAgICBpc0ZpcnN0SW5SYW5nZSA9IGlzRmlyc3RJblJhbmdlIHx8IGluZGV4ID09IDEgJiYgdGhpcy5fcmV2ZXJzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0ZpcnN0SW5SYW5nZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gTWF0aC5taW4obmV3VmFsdWUsIHRoaXMuX3JhbmdlWzFdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JhbmdlWzBdID0gbmV3VmFsdWU7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBNYXRoLm1heChuZXdWYWx1ZSwgdGhpcy5fcmFuZ2VbMF0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmFuZ2VbMV0gPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IElNb2RlbCwgSU1vZGVsT3B0aW9ucyB9O1xyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuIiwiaW1wb3J0IHsgSU1vZGVsT3B0aW9ucyB9IGZyb20gXCIuL01vZGVsXCI7XHJcbmltcG9ydCB7IElWaWV3T3B0aW9ucyB9IGZyb20gXCIuL1ZpZXdcIjtcclxuaW1wb3J0IHsgSU9wdGlvbnMgfSBmcm9tIFwiLi9kZWZhdWx0T3B0aW9uc1wiO1xyXG5pbXBvcnQgeyBJV2FybmluZ3MgfSBmcm9tIFwiLi92YWxpZGF0aW9uc1wiO1xyXG5cclxuXHJcbmludGVyZmFjZSBJU3ViamVjdCB7XHJcbiAgICBhdHRhY2goY2FsbGJhY2s6IGFueSk6IHZvaWQ7XHJcbiAgICBkZXRhY2goY2FsbGJhY2s6IGFueSk6IHZvaWQ7XHJcbiAgICBub3RpZnkoY29uZmlnOiBhbnkpOiB2b2lkO1xyXG5cclxuICAgIC8vZ2V0TGFzdFVwZGF0ZSgpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIFN1YmplY3QgaW1wbGVtZW50cyBJU3ViamVjdCB7XHJcblxyXG4gICAgLy9jb25zdHJ1Y3RvcigpXHJcbiAgICBwcm90ZWN0ZWQgY2FsbGJhY2tzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBhdHRhY2goY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjYWxsYmFja0luZGV4OiBudW1iZXIgPSB0aGlzLmNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrcy5zcGxpY2UoY2FsbGJhY2tJbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5vdGlmeSgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHRoaXMuY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUNvbmZpZyB7XHJcbiAgICB0eXBlOiBzdHJpbmcsXHJcbiAgICAvLyA/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/P1xyXG4gICAgLy9vcHRpb25zPzogSU1vZGVsT3B0aW9ucyB8IElWaWV3T3B0aW9ucyB8IElPcHRpb25zLFxyXG4gICAgb3B0aW9ucz86IGFueSxcclxuICAgIHBlcmNlbnQ/OiBudW1iZXIsXHJcbiAgICBpbmRleD86IG51bWJlcixcclxuICAgIHdhcm5pbmdzPzogSVdhcm5pbmdzXHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBJU3ViamVjdCwgU3ViamVjdCwgSUNvbmZpZyB9O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qIFxyXG5pbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gXCIuL2RlZmF1bHRPcHRpb25zXCI7XHJcblxyXG4vL9CY0L3RgtGE0LXRgNGE0LXQudGBINC40LfQtNCw0YLQtdC70Y8g0L7QsdGK0Y/QstC70Y/QtdGCINC90LDQsdC+0YAg0LzQtdGC0L7QtNC+0LIg0LTQu9GPINGD0L/RgNCw0LLQu9C10L3QuNGP0LzQuCDQv9C+0LTQv9C40YHQutC40YfQsNC80LguXHJcbmludGVyZmFjZSBJU3ViamVjdCB7XHJcblxyXG4gICAgLy8g0J/RgNC40YHQvtC10LTQuNC90Y/QtdGCINC90LDQsdC70Y7QtNCw0YLQtdC70Y8g0Log0LjQt9C00LDRgtC10LvRji5cclxuICAgIGF0dGFjaChvYnNlcnZlcjogYW55KTogdm9pZDtcclxuXHJcbiAgICAvLyDQntGC0YHQvtC10LTQuNC90Y/QtdGCINC90LDQsdC70Y7QtNCw0YLQtdC70Y8g0L7RgiDQuNC30LTQsNGC0LXQu9GPLlxyXG4gICAgZGV0YWNoKG9ic2VydmVyOiBhbnkpOiB2b2lkO1xyXG5cclxuICAgIC8vINCj0LLQtdC00L7QvNC70Y/QtdGCINCy0YHQtdGFINC90LDQsdC70Y7QtNCw0YLQtdC70LXQuSDQviDRgdC+0LHRi9GC0LjQuC5cclxuICAgIG5vdGlmeShjb25maWc6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIFN1YmplY3QgaW1wbGVtZW50cyBJU3ViamVjdCB7XHJcbiAgICBwcm90ZWN0ZWQgb2JzZXJ2ZXJzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIGF0dGFjaChvYnNlcnZlcjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgZGV0YWNoKG9ic2VydmVyOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvYnNlcnZlckluZGV4ID0gdGhpcy5vYnNlcnZlcnMuaW5kZXhPZihvYnNlcnZlcik7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMuc3BsaWNlKG9ic2VydmVySW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vdGlmeSgpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG9ic2VydmVyIG9mIHRoaXMub2JzZXJ2ZXJzKSB7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLnVwZGF0ZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5pbnRlcmZhY2UgSU91dGVyT2JzZXJ2ZXIge1xyXG4gICAgZnVuYzogYW55O1xyXG4gICAgdXBkYXRlKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgT3V0ZXJPYnNlcnZlciBpbXBsZW1lbnRzIElPdXRlck9ic2VydmVyIHtcclxuICAgIGZ1bmM6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihmdW5jOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuZnVuYyA9IGZ1bmM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnVuYyhvcHRpb25zKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgeyBJU3ViamVjdCwgU3ViamVjdH07XHJcbmV4cG9ydCB7IElPdXRlck9ic2VydmVyLCBPdXRlck9ic2VydmVyfSAqLyIsImltcG9ydCB7IElPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQgTW9kZWwsIHsgSU1vZGVsLCBJTW9kZWxPcHRpb25zIH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCBWaWV3LCB7IElWaWV3IH0gZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IHsgSVN1YmplY3QsIFN1YmplY3QgfSAgZnJvbSAnLi9PYnNlcnZlcic7XHJcbmltcG9ydCB7IElXYXJuaW5ncyB9IGZyb20gJy4vdmFsaWRhdGlvbnMnO1xyXG5pbXBvcnQgeyBkZWVwRXF1YWwsIGZpbmRDbG9zZXN0U3RlcCB9IGZyb20gJy4vY29tbW9uRnVuY3Rpb25zJztcclxuXHJcbmludGVyZmFjZSBJUHJlc2VudGVyIGV4dGVuZHMgSVN1YmplY3Qge1xyXG4gICAgdXBkYXRlKGNvbmZpZzogYW55KTogdm9pZDtcclxuXHJcbiAgICBnZXRPcHRpb25zKCk6IElPcHRpb25zO1xyXG4gICAgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzO1xyXG4gICAgLy8gPz8/Pz9cclxuICAgIHNldExhc3RVcGRhdGUodmFsdWU6IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qIGNvbnN0IGxhc3RVcGRhdGUgPSB7XHJcbiAgICBORVdfT1BUSU9OUzogJ05FV19PUFRJT05TJyxcclxuICAgIE5FV19WQUxVRTogJ05FV19WQUxVRScsXHJcbiAgICBNT0RFTDogJ01PREVMJyxcclxuICAgIFZJRVc6ICdWSUVXJyxcclxuICAgIE9VVEVSX0RBVEE6ICdORVdfT1VURVJfT1BUSU9OUydcclxufTsgKi9cclxuXHJcbi8vINCc0JXQotCe0JTQqyB1cGRhdGVNb2RlbCDQmCB1cGRhdGVWaWV3IC0g0K3QotCeINCQ0J3QkNCb0J7Qk9CYINCg0JXQlNCs0K7QodCV0KDQntCSINCSIFJFRFVYLlxyXG4vLyDQoNCQ0JfQndCY0KbQkCDQkiDQotCe0Jwg0KfQotCeINCt0KLQniDQndCVINCn0JjQodCi0KvQlSDQpNCj0J3QmtCm0JjQmCwg0J/QntCi0J7QnNCjINCn0KLQniDQnNCe0JTQldCb0Kwg0Jgg0JLQmNCUINCd0JUg0K/QktCb0K/QrtCi0KHQryDQn9Ce0JvQndCe0KbQldCd0J3Qq9Cc0JggU1RPUkVcclxuXHJcbmNvbnN0IHVwZGF0ZU1vZGVsID0gZnVuY3Rpb24oYWN0aW9uKSB7XHJcblxyXG4gICAgbGV0IHByZXZPcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcbiAgICB0aGlzLnZhbGlkYXRlKE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBhY3Rpb24ub3B0aW9ucykpXHJcbiAgICBsZXQgdmFsaWRPcHRpb25zOiBJTW9kZWxPcHRpb25zID0gdGhpcy5ub3JtYWxpemUoYWN0aW9uLm9wdGlvbnMsIHByZXZPcHRpb25zKTtcclxuICAgIFxyXG4gICAgaWYgKCBkZWVwRXF1YWwocHJldk9wdGlvbnMsIHZhbGlkT3B0aW9ucykgKSB7XHJcbiAgICAgICAgcmV0dXJuOyAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXRPcHRpb25zKHZhbGlkT3B0aW9ucyk7XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ1NFVF9ORVdfT1BUSU9OUyc6XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RVcGRhdGUgPSAnTkVXX09QVElPTlMnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAnU0VUX05FV19WQUxVRSc6XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RVcGRhdGUgPSAnTkVXX1ZBTFVFJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ub3RpZnkoKTtcclxufTtcclxuXHJcbmNvbnN0IHVwZGF0ZVZpZXcgPSBmdW5jdGlvbihhY3Rpb24pIHtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnU0VUX05FV19QT1NJVElPTic6XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJzKGFjdGlvbi5vcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCYXJQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCB8fCB0aGlzLl90b29sdGlwRmlyc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VG9vbHRpcFZhbHVlcyhhY3Rpb24ub3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RVcGRhdGUgPSAnTkVXX1BPU0lUSU9OJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ1NFVF9ORVdfT1BUSU9OUyc6XHJcbiAgICAgICAgICAgIGFjdGlvbi5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5nZXRPcHRpb25zKCksIGFjdGlvbi5vcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGUoYWN0aW9uLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlYnVpbGQoYWN0aW9uLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZSA9ICdORVdfT1BUSU9OUyc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8g0JzQntCU0JXQm9CsINCYINCS0JjQlCAtINCt0KLQniDQn9Ce0JTQntCR0JjQlSBTVE9SRS4g0J7QndCYINCd0JDQodCb0JXQlNCj0K7QoiDQntCiINCa0JvQkNCh0KHQkCBTVE9SRSwg0J7QnSDQktCg0JXQnNCV0J3QndCeINCSINCf0JDQn9Ca0JUgT0JTRVJWRVJcclxuXHJcblxyXG5jbGFzcyBQcmVzZW50ZXIgZXh0ZW5kcyBTdWJqZWN0IGltcGxlbWVudHMgSVByZXNlbnRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW9kZWw6IElNb2RlbDtcclxuICAgIHByaXZhdGUgX3ZpZXc6IElWaWV3O1xyXG5cclxuICAgIHByaXZhdGUgX2xhc3RVcGRhdGU7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogSU9wdGlvbnMsIG5vZGU6IEhUTUxEaXZFbGVtZW50KSB7XHJcblxyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fbW9kZWwgPSBuZXcgTW9kZWwob3B0aW9ucywgdXBkYXRlTW9kZWwpO1xyXG5cclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihvcHRpb25zLCB0aGlzLl9tb2RlbC5nZXRPcHRpb25zKCkpO1xyXG4gICAgICAgIHRoaXMuX3ZpZXcgPSBuZXcgVmlldyhvcHRpb25zLCBub2RlLCB1cGRhdGVWaWV3KTtcclxuXHJcblxyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5fbW9kZWwuYXR0YWNoKGZ1bmN0aW9uKGFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGF0Ll9sYXN0VXBkYXRlID0gJ01PREVMJztcclxuICAgICAgICAgICAgdGhhdC51cGRhdGUoYWN0aW9uKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fdmlldy5hdHRhY2goZnVuY3Rpb24oYWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoYXQuX2xhc3RVcGRhdGUgPSAnVklFVyc7XHJcbiAgICAgICAgICAgIHRoYXQudXBkYXRlKGFjdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8/Pz9cclxuICAgIHNldExhc3RVcGRhdGUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xhc3RVcGRhdGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUob3B0aW9ucz8pIHtcclxuXHJcbiAgICAgICAgbGV0IG5ld09wdGlvbnM7XHJcbiAgICAgICAgbGV0IGFjdGlvbjtcclxuXHJcbiAgICAgICAgc3dpdGNoICggdGhpcy5fbGFzdFVwZGF0ZSApIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgJ05FV19PVVRFUl9PUFRJT05TJzpcclxuXHJcbiAgICAgICAgICAgICAgICBuZXdPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fdmlldy5nZXRPcHRpb25zKCksIHRoaXMuX21vZGVsLmdldE9wdGlvbnMoKSwgb3B0aW9ucyk7IFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdTRVRfTkVXX09QVElPTlMnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgOiBuZXdPcHRpb25zXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW9kZWwudXBkYXRlKGFjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgbmV3T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24obmV3T3B0aW9ucywgdGhpcy5fbW9kZWwuZ2V0T3B0aW9ucygpKTtcclxuICAgICAgICAgICAgICAgIGFjdGlvbi5vcHRpb25zID0gbmV3T3B0aW9ucztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aWV3LnVwZGF0ZShhY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcblxyXG4gICAgICAgICAgICBjYXNlICdNT0RFTCc6XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICggdGhpcy5fbW9kZWwuZ2V0TGFzdFVwZGF0ZSgpICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdORVdfVkFMVUUnOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T3B0aW9ucyA9IHRoaXMuX21vZGVsLmdldE9wdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdTRVRfTkVXX1BPU0lUSU9OJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgOiBuZXdPcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTkVXX09QVElPTlMnOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3ZpZXcuZ2V0T3B0aW9ucygpLCB0aGlzLl9tb2RlbC5nZXRPcHRpb25zKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1NFVF9ORVdfT1BUSU9OUycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zIDogbmV3T3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlldy51cGRhdGUoYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcblxyXG4gICAgICAgICAgICBjYXNlICdWSUVXJzpcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuX3ZpZXcuZ2V0TGFzdFVwZGF0ZSgpID09ICdORVdfUE9TSVRJT04nICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQge3BlcmNlbnQsIGluZGV4fSA9IHRoaXMuX3ZpZXcuZ2V0TmV3SW5kZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vZGVsT3B0aW9ucyA9IHRoaXMuX21vZGVsLmdldE9wdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VmFsdWU6IG51bWJlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBwZXJjZW50ICogKG1vZGVsT3B0aW9ucy5tYXggLSBtb2RlbE9wdGlvbnMubWluKSAvIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9ICFtb2RlbE9wdGlvbnMucmV2ZXJzZSA/IFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsT3B0aW9ucy5taW4gKyBuZXdWYWx1ZSA6XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxPcHRpb25zLm1heCAtIG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IGZpbmRDbG9zZXN0U3RlcChuZXdWYWx1ZSwgbW9kZWxPcHRpb25zKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbW9kZWxPcHRpb25zLnJhbmdlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPcHRpb25zID0ge3ZhbHVlOiBuZXdWYWx1ZX1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc0ZpcnN0SW5SYW5nZTogYm9vbGVhbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNGaXJzdEluUmFuZ2UgPSBpbmRleCA9PSAwICYmICFtb2RlbE9wdGlvbnMucmV2ZXJzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNGaXJzdEluUmFuZ2UgPSBpc0ZpcnN0SW5SYW5nZSB8fCBpbmRleCA9PSAxICYmIG1vZGVsT3B0aW9ucy5yZXZlcnNlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmlyc3RJblJhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IE1hdGgubWluKG5ld1ZhbHVlLCBtb2RlbE9wdGlvbnMucmFuZ2VbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3T3B0aW9ucyA9IHtyYW5nZTogW25ld1ZhbHVlLCBtb2RlbE9wdGlvbnMucmFuZ2VbMV1dfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gTWF0aC5tYXgobmV3VmFsdWUsIG1vZGVsT3B0aW9ucy5yYW5nZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdPcHRpb25zID0ge3JhbmdlOiBbbW9kZWxPcHRpb25zLnJhbmdlWzBdLCBuZXdWYWx1ZV19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1NFVF9ORVdfVkFMVUUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBuZXdPcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tb2RlbC51cGRhdGUoYWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRPcHRpb25zKCk6IElPcHRpb25zIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fbW9kZWwuZ2V0T3B0aW9ucygpLCB0aGlzLl92aWV3LmdldE9wdGlvbnMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFdhcm5pbmdzKCk6IElXYXJuaW5ncyB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX21vZGVsLmdldFdhcm5pbmdzKCksIHRoaXMuX3ZpZXcuZ2V0V2FybmluZ3MoKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByZXNlbnRlcjsiLCJpbXBvcnQgeyBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuLy9pbXBvcnQgeyBJTW9kZWwsIElNb2RlbE9wdGlvbnMgfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IHsgSVN1YmplY3QsIFN1YmplY3QgfSBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IHsgaXNOdW1lcmljLCBnZXROdW1iZXJPZlN0ZXBzIH0gZnJvbSAnLi9jb21tb25GdW5jdGlvbnMnO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZVZpZXcsIElXYXJuaW5ncyB9IGZyb20gJy4vdmFsaWRhdGlvbnMnO1xyXG5cclxuXHJcbmludGVyZmFjZSBJVmlld09wdGlvbnMge1xyXG4gICAgbGVuZ3RoOiBzdHJpbmc7XHJcbiAgICB2ZXJ0aWNhbDogYm9vbGVhbjtcclxuICAgIHRvb2x0aXA6IGJvb2xlYW47XHJcbiAgICBzY2FsZTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElWaWV3IGV4dGVuZHMgSVN1YmplY3Qge1xyXG4gICAgdXBkYXRlKGNvbmZpZzogYW55KTogdm9pZDtcclxuXHJcbiAgICBnZXRPcHRpb25zKCk6IElWaWV3T3B0aW9ucztcclxuICAgIGdldFdhcm5pbmdzKCk6IElXYXJuaW5ncztcclxuICAgIGdldExhc3RVcGRhdGUoKTogc3RyaW5nO1xyXG4gICAgZ2V0TmV3SW5kZW50KCk6IGFueTtcclxufVxyXG5cclxuY2xhc3MgVmlldyBleHRlbmRzIFN1YmplY3QgaW1wbGVtZW50cyBJVmlldyAge1xyXG4gICAgW3g6IHN0cmluZ106IGFueTtcclxuXHJcbiAgICBwcml2YXRlIF9sZW5ndGg6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3ZlcnRpY2FsOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX3NsaWRlcjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF90aHVtYj86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdGh1bWJGaXJzdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdGh1bWJMYXN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9iYXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcEZpcnN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwTGFzdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGU/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVUaHVtYjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF93YXJuaW5nczogSVdhcm5pbmdzO1xyXG4gICAgcHJpdmF0ZSBfbGFzdFVwZGF0ZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfbmV3SW5kZW50OiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlOiBGdW5jdGlvbjtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogSU9wdGlvbnMsIHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50LCB1cGRhdGU6IEZ1bmN0aW9uKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRlKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLl9zbGlkZXIgPSBzbGlkZXJOb2RlO1xyXG4gICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXInKTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZChvcHRpb25zKVxyXG5cclxuICAgICAgICB0aGlzLl91cGRhdGUgPSB1cGRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGFjdGlvbikge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZShhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0T3B0aW9ucygpOiBJVmlld09wdGlvbnMge1xyXG4gICAgICAgIGxldCB0b29sdGlwID0gISF0aGlzLl90b29sdGlwIHx8ICEhdGhpcy5fdG9vbHRpcEZpcnN0O1xyXG4gICAgICAgIGxldCBzY2FsZSA9ICEhdGhpcy5fc2NhbGU7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxlbmd0aDogIHRoaXMuX2xlbmd0aCxcclxuICAgICAgICAgICAgdmVydGljYWw6IHRoaXMuX3ZlcnRpY2FsLFxyXG4gICAgICAgICAgICB0b29sdGlwOiB0b29sdGlwLFxyXG4gICAgICAgICAgICBzY2FsZTogc2NhbGUgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFdhcm5pbmdzKCk6IElXYXJuaW5ncyB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3dhcm5pbmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TGFzdFVwZGF0ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0VXBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5ld0luZGVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmV3SW5kZW50O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVRodW1iRG93bihldmVudCk6IHZvaWQge1xyXG4gICAgICAgIC8vINC/0YDQtdC00L7RgtCy0YDQsNGC0LjRgtGMINC30LDQv9GD0YHQuiDQstGL0LTQtdC70LXQvdC40Y8gKNC00LXQudGB0YLQstC40LUg0LHRgNCw0YPQt9C10YDQsClcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHVtYiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlVGh1bWJNb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVUaHVtYlVwKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRodW1iTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZVRodW1iVXApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlVGh1bWJNb3ZlKGV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gdGhpcy5nZXRMZW5ndGhJblB4KCk7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyID0gdGhpcy5nZXRPZmZzZXRJblB4KCk7XHJcbiAgICAgICAgbGV0IGV2ZW50UG9zOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG5ld1RodW1iUG9zaXRpb246IG51bWJlcjtcclxuICAgICAgICBsZXQgaW5kZXg6IG51bWJlcjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZXZlbnQudG91Y2hlcykge1xyXG4gICAgICAgICAgICBldmVudFBvcyA9ICF0aGlzLl92ZXJ0aWNhbCA/IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudFBvcyA9ICF0aGlzLl92ZXJ0aWNhbCA/IGV2ZW50LmNsaWVudFggOiBldmVudC5jbGllbnRZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV3VGh1bWJQb3NpdGlvbiA9IChldmVudFBvcyAtIG9mZnNldCkgLyBsZW5ndGggKiAxMDA7XHJcbiAgICAgICAgaW5kZXggPSB0aGlzLl9hY3RpdmVUaHVtYiA9PSB0aGlzLl90aHVtYkxhc3QgPyAxIDogMDtcclxuXHJcbiAgICAgICAgdGhpcy5fbmV3SW5kZW50ID0ge1xyXG4gICAgICAgICAgICBpbmRleCxcclxuICAgICAgICAgICAgcGVyY2VudDogbmV3VGh1bWJQb3NpdGlvblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYXN0VXBkYXRlID0gJ05FV19QT1NJVElPTic7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoKTtcclxuXHJcbi8qICAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICB0eXBlOiAnTkVXX1ZBTFVFX0lOX1BFUkNFTlQnLFxyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIHBlcmNlbnQ6IG5ld1RodW1iUG9zaXRpb25cclxuICAgICAgICB9KTsgKi9cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVNsaWRlckNsaWNrKGV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gdGhpcy5nZXRMZW5ndGhJblB4KCk7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyID0gdGhpcy5nZXRPZmZzZXRJblB4KCk7XHJcbiAgICAgICAgbGV0IGV2ZW50UG9zOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG5ld1RodW1iUG9zaXRpb246IG51bWJlcjtcclxuICAgICAgICBsZXQgaW5kZXg6IG51bWJlcjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZXZlbnQudG91Y2hlcykge1xyXG4gICAgICAgICAgICBldmVudFBvcyA9ICF0aGlzLl92ZXJ0aWNhbCA/IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudFBvcyA9ICF0aGlzLl92ZXJ0aWNhbCA/IGV2ZW50LmNsaWVudFggOiBldmVudC5jbGllbnRZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV3VGh1bWJQb3NpdGlvbiA9IChldmVudFBvcyAtIG9mZnNldCkgLyBsZW5ndGggKiAxMDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX3RodW1iKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdG9wTGVmdDogc3RyaW5nID0gIXRoaXMuX3ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XHJcblxyXG4gICAgICAgICAgICBsZXQgZmlyc3RUaHVtYlBvczogbnVtYmVyID0gcGFyc2VJbnQoIHRoaXMuX3RodW1iRmlyc3Quc3R5bGVbdG9wTGVmdF0gKTtcclxuICAgICAgICAgICAgbGV0IGxhc3RUaHVtYlBvczogbnVtYmVyID0gcGFyc2VJbnQoIHRoaXMuX3RodW1iTGFzdC5zdHlsZVt0b3BMZWZ0XSApO1xyXG5cclxuICAgICAgICAgICAgbGV0IGlzRmlyc3RDbG9zZXI6IGJvb2xlYW47XHJcbiAgICAgICAgICAgIGlzRmlyc3RDbG9zZXIgPSBNYXRoLmFicyhmaXJzdFRodW1iUG9zIC0gbmV3VGh1bWJQb3NpdGlvbikgPCBNYXRoLmFicyhsYXN0VGh1bWJQb3MgLSBuZXdUaHVtYlBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGluZGV4ID0gaXNGaXJzdENsb3NlciA/IDAgOiAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbmV3SW5kZW50ID0ge1xyXG4gICAgICAgICAgICBpbmRleCxcclxuICAgICAgICAgICAgcGVyY2VudDogbmV3VGh1bWJQb3NpdGlvblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZSA9ICdORVdfUE9TSVRJT04nO1xyXG4gICAgICAgIHRoaXMubm90aWZ5KCk7XHJcblxyXG4vKiAgICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgdHlwZTogJ05FV19WQUxVRV9JTl9QRVJDRU5UJyxcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICBwZXJjZW50OiBuZXdUaHVtYlBvc2l0aW9uXHJcbiAgICAgICAgfSk7ICovXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVUaHVtYlVwKGV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlVGh1bWJVcCk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVUaHVtYk1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVUaHVtYlVwKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRodW1iTW92ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVRodW1iID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGQob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IHZhbGlkTGVuZ3RoOiBzdHJpbmcgPSB0aGlzLl9sZW5ndGggfHwgZGVmYXVsdE9wdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuX2xlbmd0aCA9IHRoaXMuZ2V0VmFsaWRMZW5ndGgob3B0aW9ucy5sZW5ndGgsIHZhbGlkTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy52ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLndpZHRoID0gdGhpcy5fbGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfdmVydGljYWwnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS5oZWlnaHQgPSB0aGlzLl9sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS53aWR0aCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfdmVydGljYWwnKTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl9ob3Jpem9udGFsJyk7ICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fYmFyID0gdGhpcy5idWlsZE5vZGUodGhpcy5fc2xpZGVyLCAnc2xpZGVyX19iYXInKTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZFRodW1icyhvcHRpb25zKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRCYXJQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCApIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFRvb2x0aXBzKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoIG9wdGlvbnMuc2NhbGUgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRTY2FsZShvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZVRodW1iRG93biA9IHRoaXMuaGFuZGxlVGh1bWJEb3duLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVUaHVtYk1vdmUgPSB0aGlzLmhhbmRsZVRodW1iTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGh1bWJVcCA9IHRoaXMuaGFuZGxlVGh1bWJVcC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2xpZGVyQ2xpY2sgPSB0aGlzLmhhbmRsZVNsaWRlckNsaWNrLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIGlmICggIW9wdGlvbnMucmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5oYW5kbGVUaHVtYkRvd24pO1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYi5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLmhhbmRsZVRodW1iRG93bik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJGaXJzdC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJGaXJzdC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLmhhbmRsZVRodW1iRG93bik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkxhc3QuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmhhbmRsZVRodW1iRG93bik7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iTGFzdC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLmhhbmRsZVRodW1iRG93bik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlU2xpZGVyQ2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVidWlsZChvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwcmV2T3B0aW9uczogSVZpZXdPcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMpIHtcclxuICAgICAgICAgICAgaWYgKGtleSAhPSAnX3NsaWRlcicpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gdGhpcy5yZW1vdmVOb2RlKHRoaXNba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIHt9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYnVpbGQob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZShvcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fd2FybmluZ3MgPSB7fTtcclxuICAgICAgICB0aGlzLl93YXJuaW5ncyA9IHZhbGlkYXRlVmlldyhvcHRpb25zKTtcclxuXHJcbi8qICAgICAgICAgaWYgKCBPYmplY3Qua2V5cyh0aGlzLl93YXJuaW5ncykubGVuZ3RoICE9IDAgKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgd2FybmluZ3M6IElXYXJuaW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3dhcm5pbmdzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdXQVJOSU5HUycsXHJcbiAgICAgICAgICAgICAgICB3YXJuaW5nczogd2FybmluZ3NcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9ICovXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZFRodW1icyhvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGlmICggIW9wdGlvbnMucmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iID0gdGhpcy5idWlsZE5vZGUodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYicpO1xyXG4gICAgICAgIH0gZWxzZSB7ICAgICBcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJGaXJzdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWInLCAnc2xpZGVyX190aHVtYl9maXJzdCcpO1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkxhc3QgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iJywgJ3NsaWRlcl9fdGh1bWJfbGFzdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYnMob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRUaHVtYnMob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcG9zOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmICggIW9wdGlvbnMucmFuZ2UgKSB7XHJcblxyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKG9wdGlvbnMudmFsdWUsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24odGhpcy5fdGh1bWIsIHBvcyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBudW06IG51bWJlcjtcclxuICAgICAgICAgICAgLy8g0LXRgdC70LggcmV2ZXJzZSwg0YLQviDQu9C10LLRi9C5INCx0LXQs9GD0L3QvtC6IC0g0Y3RgtC+INCx0L7Qu9GM0YjQtdC1INC30L3QsNGH0LXQvdC40LVcclxuICAgICAgICAgICAgLy8g0YIu0LUuIHJhbmdlWzFdXHJcbiAgICAgICAgICAgIG51bSA9ICFvcHRpb25zLnJldmVyc2UgPyAwIDogMTtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbihvcHRpb25zLnJhbmdlW251bV0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24odGhpcy5fdGh1bWJGaXJzdCwgcG9zKTtcclxuXHJcbiAgICAgICAgICAgIG51bSA9IG51bSA9PSAwID8gMSA6IDA7XHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24ob3B0aW9ucy5yYW5nZVtudW1dLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMuX3RodW1iTGFzdCwgcG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRCYXJQb3NpdGlvbigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc3RhcnQ6IG51bWJlciB8IHN0cmluZztcclxuICAgICAgICBsZXQgbGVuZ3RoOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICAgbGV0IHRvcExlZnQ6IHN0cmluZyA9ICF0aGlzLl92ZXJ0aWNhbCA/ICdsZWZ0JyA6ICd0b3AnO1xyXG4gICAgICAgIGxldCB3aWR0aEhlaWdodDogc3RyaW5nID0gIXRoaXMuX3ZlcnRpY2FsID8gJ3dpZHRoJyA6ICdoZWlnaHQnO1xyXG5cclxuICAgICAgICBzdGFydCA9IHRoaXMuX3RodW1iRmlyc3QgPyB0aGlzLl90aHVtYkZpcnN0LnN0eWxlW3RvcExlZnRdIDogJzAlJztcclxuICAgICAgICBsZW5ndGggPSB0aGlzLl90aHVtYkZpcnN0ID8gXHJcbiAgICAgICAgdGhpcy5fdGh1bWJMYXN0LnN0eWxlW3RvcExlZnRdLnNsaWNlKDAsIC0xKSAtIHRoaXMuX3RodW1iRmlyc3Quc3R5bGVbdG9wTGVmdF0uc2xpY2UoMCwgLTEpICArICclJyA6XHJcbiAgICAgICAgdGhpcy5fdGh1bWIuc3R5bGVbdG9wTGVmdF07XHJcblxyXG4gICAgICAgIHRoaXMuX2Jhci5zdHlsZVt0b3BMZWZ0XSA9IHN0YXJ0O1xyXG4gICAgICAgIHRoaXMuX2Jhci5zdHlsZVt3aWR0aEhlaWdodF0gPSBsZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZFRvb2x0aXBzKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmICghb3B0aW9ucy5yYW5nZSkgeyBcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3RodW1iLCAnc2xpZGVyX190b29sdGlwJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcEZpcnN0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5fdGh1bWJGaXJzdCwgJ3NsaWRlcl9fdG9vbHRpcCcsICdzbGlkZXJfX3Rvb2x0aXBfZmlyc3QnKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcExhc3QgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl90aHVtYkxhc3QsICdzbGlkZXJfX3Rvb2x0aXAnLCAnc2xpZGVyX190b29sdGlwX2xhc3QnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VG9vbHRpcFZhbHVlcyhvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkU2NhbGUob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2NhbGU6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGxldCBkaXZpc2lvbjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGxldCBpbmRlbnQ6IG51bWJlciB8IHN0cmluZztcclxuICAgICAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSBvcHRpb25zLm1heCAtIG9wdGlvbnMubWluO1xyXG5cclxuICAgICAgICBzY2FsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHNjYWxlLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUnKTtcclxuXHJcbiAgICAgICAgZm9yICggbGV0IGk6IG51bWJlciA9IDA7IGkgPD0gZ2V0TnVtYmVyT2ZTdGVwcyhvcHRpb25zLm1pbiwgb3B0aW9ucy5tYXgsIG9wdGlvbnMuc3RlcCk7IGkrKyApIHtcclxuXHJcbiAgICAgICAgICAgIGlmICggIW9wdGlvbnMucmV2ZXJzZSApIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMubWluICsgb3B0aW9ucy5zdGVwICogaTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IE1hdGgubWluKHZhbCwgb3B0aW9ucy5tYXgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5tYXggLSBvcHRpb25zLnN0ZXAgKiBpO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gTWF0aC5tYXgodmFsLCBvcHRpb25zLm1pbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGluZGVudCA9IGkgKiBvcHRpb25zLnN0ZXAgPCBsZW5ndGggPyBpICogb3B0aW9ucy5zdGVwIDogbGVuZ3RoOyBcclxuICAgICAgICAgICAgaW5kZW50ID0gaW5kZW50IC8gbGVuZ3RoICogMTAwICsgJyUnO1xyXG5cclxuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMgPyBvcHRpb25zLmN1c3RvbVZhbHVlc1t2YWxdIDogdmFsO1xyXG5cclxuICAgICAgICAgICAgZGl2aXNpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2aXNpb24uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpO1xyXG4gICAgICAgICAgICBkaXZpc2lvbi5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJzbGlkZXJfX3NjYWxlLWRpdmlzaW9uLXRleHRcIj4nICsgdmFsICsgJzwvc3Bhbj4nO1xyXG4gICAgICAgICAgICBvcHRpb25zLnZlcnRpY2FsID8gZGl2aXNpb24uc3R5bGUudG9wID0gaW5kZW50IDogZGl2aXNpb24uc3R5bGUubGVmdCA9IGluZGVudDtcclxuXHJcbiAgICAgICAgICAgIHNjYWxlLmFwcGVuZChkaXZpc2lvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zbGlkZXIucHJlcGVuZChzY2FsZSk7ICAgICAgICBcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VG9vbHRpcFZhbHVlcyhvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgICAgICAgaWYgKCFvcHRpb25zLnJhbmdlKSB7IFxyXG4gICAgICAgICAgICB2YWwgPSBvcHRpb25zLmN1c3RvbVZhbHVlcyA/IG9wdGlvbnMuY3VzdG9tVmFsdWVzW29wdGlvbnMudmFsdWVdIDogb3B0aW9ucy52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC50ZXh0Q29udGVudCA9IHZhbCBhcyBzdHJpbmc7IFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBudW06IG51bWJlcjtcclxuICAgICAgICAgICAgbnVtID0gIW9wdGlvbnMucmV2ZXJzZSA/IDAgOiAxO1xyXG4gICAgICAgICAgICB2YWwgPSBvcHRpb25zLmN1c3RvbVZhbHVlcyA/IG9wdGlvbnMuY3VzdG9tVmFsdWVzW29wdGlvbnMucmFuZ2VbbnVtXV0gOiBvcHRpb25zLnJhbmdlW251bV07XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBGaXJzdC50ZXh0Q29udGVudCA9IHZhbCBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICBudW0gPSBudW0gPT0gMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICB2YWwgPSBvcHRpb25zLmN1c3RvbVZhbHVlcyA/IG9wdGlvbnMuY3VzdG9tVmFsdWVzW29wdGlvbnMucmFuZ2VbbnVtXV0gOiBvcHRpb25zLnJhbmdlW251bV07XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBMYXN0LnRleHRDb250ZW50ID0gdmFsIGFzIHN0cmluZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRUaHVtYlBvc2l0aW9uKHRodW1iTm9kZTogSFRNTERpdkVsZW1lbnQsIHBvc2l0aW9uOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLnRvcCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS5sZWZ0ID0gcG9zaXRpb247XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLmxlZnQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUudG9wID0gcG9zaXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB6IGluZGV4XHJcbiAgICAgICAgaWYgKCB0aGlzLl90aHVtYkZpcnN0ICkge1xyXG4gICAgICAgICAgICBpZiAoICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgICAgIGlmICggKHRoaXMuX3RodW1iRmlyc3Quc3R5bGUubGVmdCA9PSAnMTAwJScpIHx8ICh0aGlzLl90aHVtYkZpcnN0LnN0eWxlLnRvcCA9PSAnMTAwJScpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RodW1iRmlyc3Quc3R5bGUuekluZGV4ID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90aHVtYkZpcnN0LnN0eWxlLnpJbmRleCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRUaHVtYlBvc2l0aW9uKHZhbHVlOiBudW1iZXIsIG9wdGlvbnM6IElPcHRpb25zKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgcG9zOiBzdHJpbmc7XHJcbiAgICAgICAgcG9zID0gIW9wdGlvbnMucmV2ZXJzZSA/XHJcbiAgICAgICAgKHZhbHVlIC0gb3B0aW9ucy5taW4pIC8gKG9wdGlvbnMubWF4IC0gb3B0aW9ucy5taW4pICogMTAwICsgJyUnIDpcclxuICAgICAgICAob3B0aW9ucy5tYXggLSB2YWx1ZSkgLyAob3B0aW9ucy5tYXggLSBvcHRpb25zLm1pbikgKiAxMDAgKyAnJSdcclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlTm9kZShub2RlOiBIVE1MRGl2RWxlbWVudCk6IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbm9kZS5yZW1vdmUoKTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGROb2RlKHBhcmVudE5vZGU6IEhUTUxEaXZFbGVtZW50LCAuLi5jbGFzc2VzOiBzdHJpbmdbXSk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBsZXQgbm9kZTogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgICAgIFxyXG5cclxuICAgICAgICBmb3IgKCBsZXQgaTogbnVtYmVyID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKGFyZ3VtZW50c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcmVudE5vZGUuYXBwZW5kKG5vZGUpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGdldFZhbGlkTGVuZ3RoKHN0cjogYW55LCB2YWxpZExlbmd0aDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIHR5cGVvZiAoJycgKyBzdHIpID09ICdzdHJpbmcnICkge1xyXG4gICAgICAgICAgICBsZXQgciA9ICgnJyArIHN0cikubWF0Y2goL15cXGR7MSwzfVsuLF0/XFxkKihweHxlbXxyZW18JXx2aHx2dyk/JC9pKTtcclxuICAgICAgICAgICAgaWYgKCByICYmIGlzTnVtZXJpYyhyWzBdKSApIHsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gclswXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJywnLCAnLicpICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggciApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnLCcsICcuJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRMZW5ndGhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldExlbmd0aEluUHgoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSAhdGhpcy5fdmVydGljYWwgP1xyXG4gICAgICAgIHRoaXMuX3NsaWRlci5vZmZzZXRXaWR0aCA6XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLm9mZnNldEhlaWdodDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE9mZnNldEluUHgoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgb2Zmc2V0OiBudW1iZXIgPSAhdGhpcy5fdmVydGljYWwgP1xyXG4gICAgICAgIHRoaXMuX3NsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IDpcclxuICAgICAgICB0aGlzLl9zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG5cclxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IElWaWV3LCBJVmlld09wdGlvbnMgfTtcclxuZXhwb3J0IGRlZmF1bHQgVmlldzsiLCJpbXBvcnQgeyBJTW9kZWxPcHRpb25zIH0gZnJvbSBcIi4vTW9kZWxcIjtcclxuXHJcbmZ1bmN0aW9uIGlzTnVtZXJpYyhuOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgIWlzTmFOKG4gLSAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVlcEVxdWFsKG9iajEsIG9iajIpIHtcclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmoxKT09PUpTT04uc3RyaW5naWZ5KG9iajIpO1xyXG4gfVxyXG5cclxuZnVuY3Rpb24gZ2V0TnVtYmVyT2ZTdGVwcyhtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIHN0ZXA6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5jZWlsKChtYXggLSBtaW4pIC8gc3RlcCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRDbG9zZXN0U3RlcCh2YWx1ZTogbnVtYmVyLCBvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogbnVtYmVyIHtcclxuICAgIGxldCBzdGVwOiBudW1iZXI7XHJcbiAgICBsZXQgY2VpbFN0ZXBzOiBudW1iZXI7XHJcbiAgICBsZXQgcmVzdE9mU3RlcDogbnVtYmVyO1xyXG5cclxuICAgIGlmICggIW9wdGlvbnMucmV2ZXJzZSApIHtcclxuICAgICAgICBjZWlsU3RlcHMgPSBNYXRoLnRydW5jKCAodmFsdWUgLSBvcHRpb25zLm1pbikgLyBvcHRpb25zLnN0ZXAgKTtcclxuICAgICAgICByZXN0T2ZTdGVwID0gKHZhbHVlIC0gb3B0aW9ucy5taW4pICUgb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgIHN0ZXAgPSBvcHRpb25zLm1pbiArIGNlaWxTdGVwcyAqIG9wdGlvbnMuc3RlcDtcclxuICAgICAgICBzdGVwID0gcmVzdE9mU3RlcCA+PSBvcHRpb25zLnN0ZXAvMiA/IHN0ZXAgKyBvcHRpb25zLnN0ZXAgOiBzdGVwO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2VpbFN0ZXBzID0gTWF0aC50cnVuYyggKG9wdGlvbnMubWF4IC0gdmFsdWUpIC8gb3B0aW9ucy5zdGVwICk7XHJcbiAgICAgICAgcmVzdE9mU3RlcCA9IChvcHRpb25zLm1heCAtIHZhbHVlKSAlIG9wdGlvbnMuc3RlcDtcclxuICAgICAgICBzdGVwID0gb3B0aW9ucy5tYXggLSBjZWlsU3RlcHMgKiBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgc3RlcCA9IHJlc3RPZlN0ZXAgPj0gb3B0aW9ucy5zdGVwLzIgPyBzdGVwIC0gb3B0aW9ucy5zdGVwIDogc3RlcDtcclxuICAgIH1cclxuXHJcbiAgICBzdGVwID0gc3RlcCA+IG9wdGlvbnMubWF4ID8gb3B0aW9ucy5tYXggOiBzdGVwO1xyXG4gICAgc3RlcCA9IHN0ZXAgPCBvcHRpb25zLm1pbiA/IG9wdGlvbnMubWluIDogc3RlcDtcclxuXHJcbiAgICByZXR1cm4gc3RlcDtcclxufVxyXG5cclxuZXhwb3J0IHsgaXNOdW1lcmljLCBnZXROdW1iZXJPZlN0ZXBzLCBkZWVwRXF1YWwsIGZpbmRDbG9zZXN0U3RlcCB9O1xyXG5cclxuIiwiaW1wb3J0IHsgSU1vZGVsT3B0aW9ucyB9IGZyb20gXCIuL01vZGVsXCI7XHJcbmltcG9ydCB7IElWaWV3T3B0aW9ucyB9IGZyb20gXCIuL1ZpZXdcIjtcclxuXHJcbmludGVyZmFjZSBJT3B0aW9ucyBleHRlbmRzIElNb2RlbE9wdGlvbnMsIElWaWV3T3B0aW9ucyB7fVxyXG5cclxubGV0IGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyA9IHtcclxuICAgIC8vIE1vZGVsIG9wdGlvbnNcclxuICAgIC8vINCyINC90LDRh9Cw0LvRjNC90YvRhSDQvdCw0YHRgtGA0L7QudC60LDRhSDQvdC1INC+0L/RgNC10LTQtdC70LXQvdGLINC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1INC40LvQuCDQv9GA0L7QvNC10LbRg9GC0L7Qui5cclxuICAgIC8vINC10YHQu9C4INC+0L3QuCDQvdC1INGD0LrQsNC30LDQvdGLINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8LCDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSB2YWx1ZSA9PSBtaW4gXHJcbiAgICB2YWx1ZTogbnVsbCxcclxuICAgIG1pbjogMCxcclxuICAgIG1heDogMTAsXHJcbiAgICBzdGVwOiAxLFxyXG4gICAgcmV2ZXJzZTogZmFsc2UsXHJcbiAgICByYW5nZTogbnVsbCxcclxuICAgIFxyXG4gICAgbGVuZ3RoOiAnMzAwcHgnLFxyXG4gICAgdmVydGljYWw6IGZhbHNlLFxyXG4gICAgdG9vbHRpcDogZmFsc2UsXHJcbiAgICBzY2FsZTogZmFsc2UsXHJcbn1cclxuXHJcbmV4cG9ydCB7IElPcHRpb25zIH07XHJcbmV4cG9ydCB7IGRlZmF1bHRPcHRpb25zIH07XHJcbiIsImltcG9ydCBNb2RlbCwgeyBJTW9kZWwgfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IFZpZXcsIHsgSVZpZXcgfSBmcm9tICcuL1ZpZXcnO1xyXG5pbXBvcnQgUHJlc2VudGVyIGZyb20gJy4vUHJlc2VudGVyJztcclxuaW1wb3J0IHsgSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCB7IElDb25maWcgfSBmcm9tICcuL09ic2VydmVyJztcclxuLy9pbXBvcnQgeyBJT3V0ZXJPYnNlcnZlciwgT3V0ZXJPYnNlcnZlciB9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5cclxuKGZ1bmN0aW9uICgkKSB7XHJcblxyXG4gIGludGVyZmFjZSBJTWV0aG9kcyB7XHJcbiAgICBpbml0KG9wdGlvbnM/OiBJT3B0aW9ucyk6IHZvaWQ7XHJcbiAgICBnZXREYXRhKCk6IElPcHRpb25zO1xyXG4gICAgdXBkYXRlKG9wdGlvbnM6IGFueSk6IHZvaWQ7XHJcbiAgICBkZXN0cm95KCk6IHZvaWQ7XHJcbiAgICBvYnNlcnZlKGZ1bmM6IEZ1bmN0aW9uKTogdm9pZDtcclxuICB9XHJcblxyXG4gIHZhciBtZXRob2RzOiBJTWV0aG9kcyA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAob3B0aW9ucz86IElPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgZGF0YSA9ICR0aGlzLmRhdGEoJ3NsaWRlckRhdGEnKTtcclxuICAgICAgICBsZXQgc2xpZGVyID0gJHRoaXM7XHJcblxyXG4gICAgICAgIC8vINCV0YHQu9C4INC/0LvQsNCz0LjQvSDQtdGJ0ZEg0L3QtSDQv9GA0L7QuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0L1cclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuXHJcbiAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICBsZXQgcHJlc2VudGVyID0gbmV3IFByZXNlbnRlcihvcHRpb25zLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnLCB7XHJcbiAgICAgICAgICAgIHNsaWRlcjogc2xpZGVyLFxyXG4gICAgICAgICAgICBwcmVzZW50ZXI6IHByZXNlbnRlclxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldERhdGE6IGZ1bmN0aW9uICgpOiBJT3B0aW9ucyB7XHJcbiAgICAgIHJldHVybiAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnKS5wcmVzZW50ZXIuZ2V0RGF0YSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG5cclxuICAgICAgbGV0IHByZXNlbnRlciA9ICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScpLnByZXNlbnRlcjtcclxuICAgICAgcHJlc2VudGVyLnNldExhc3RVcGRhdGUoJ05FV19PVVRFUl9PUFRJT05TJyk7XHJcbiAgICAgIHByZXNlbnRlci51cGRhdGUob3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpOiB2b2lkIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSAkdGhpcy5kYXRhKCdzbGlkZXJEYXRhJyk7XHJcblxyXG4gICAgICAgICQod2luZG93KS51bmJpbmQoJy5zbGlkZXInKTtcclxuICAgICAgICBkYXRhLnNsaWRlci5yZW1vdmUoKTtcclxuICAgICAgICAkdGhpcy5yZW1vdmVEYXRhKCdzbGlkZXJEYXRhJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBvYnNlcnZlOiBmdW5jdGlvbiAoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcblxyXG4gICAgICBsZXQgcHJlc2VudGVyID0gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykucHJlc2VudGVyO1xyXG4gICAgICBwcmVzZW50ZXIuYXR0YWNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4vLyA/Pz8/Pz8/Pz8/Pz8/XHJcbiAgalF1ZXJ5LmZuLnNsaWRlciA9IGZ1bmN0aW9uIChtZXRob2Q6IHN0cmluZyk6IEpRdWVyeSB7XHJcblxyXG4gICAgLy8g0LvQvtCz0LjQutCwINCy0YvQt9C+0LLQsCDQvNC10YLQvtC00LBcclxuICAgIGlmIChtZXRob2RzW21ldGhvZCBhcyBzdHJpbmddKSB7XHJcblxyXG4gICAgICByZXR1cm4gbWV0aG9kc1ttZXRob2QgYXMgc3RyaW5nXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QpIHtcclxuXHJcbiAgICAgIHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkLmVycm9yKCdNZXRob2QgY2FsbGVkICcgKyBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IGZvciBKUXVlcnkuc2xpZGVyJyk7XHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG5cclxuXHJcbi8vbGV0IHRlc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVzdCcpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHJcbi8vbGV0IHByZXMgPSBuZXcgUHJlc2VudGVyKGRlZmF1bHRPcHRpb25zLCB0ZXN0KTtcclxuXHJcbi8qICQoJy50ZXN0Jykuc2xpZGVyKHtcclxuICAvL3ZhbHVlOiAwLFxyXG4gIC8vbWluOiAtNy42NjY2LFxyXG4gIHJhbmdlOiAnaGprLCcsXHJcbiAgLy9yZXZlcnNlOiB0cnVlLFxyXG4gIC8vY3VzdG9tVmFsdWVzOiBbJ2EnLCAnYicsICdjJywgJ2QnXSxcclxuICBzdGVwOiAnaGcnLFxyXG4gIHZhbHVlOiAndnhueG0nLFxyXG4gIG1pbjogJ2ZkZ3ZoeGprJyxcclxuICBtYXg6IDE3LjUsXHJcbiAgdG9vbHRpcDogdHJ1ZSxcclxuICBzY2FsZTogdHJ1ZVxyXG59KTtcclxuXHJcbiQoJy50ZXN0Jykuc2xpZGVyKCdvYnNlcnZlJywgZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgaWYgKGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLnJhbmdlKSB7XHJcbiAgICAkKCcuaW5wdXQnKS52YWwoY29uZmlnLm9wdGlvbnMucmFuZ2UpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGNvbmZpZy50eXBlID09ICdXQVJOSU5HUycpIHtcclxuXHJcbiAgICBmb3IgKCBsZXQga2V5IGluIGNvbmZpZy53YXJuaW5ncyApIHtcclxuICAgICAgJCgnLndhcnMnKS5hcHBlbmQoJzxwPicgKyBjb25maWcud2FybmluZ3Nba2V5XSArICc8L3A+JylcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufSlcclxuXHJcbiQoJy50ZXN0Jykuc2xpZGVyKCd1cGRhdGUnLCB7XHJcbiAgbWluOiAyMCxcclxuICByYW5nZTogWzMsIDddLFxyXG4gIG1heDogLTNcclxufSlcclxuXHJcblxyXG4kKCcudGVzdCcpLnNsaWRlcigndXBkYXRlJywge1xyXG4gIG1pbjogLTUuOCxcclxuICByYW5nZTogWzMsIDcsICdkZ3ggJywgNV0sXHJcbiAgbWF4OiAndmJuJ1xyXG59KSAqL1xyXG5cclxuXHJcblxyXG4vKiBsZXQgbW9kID0gbmV3IE1vZGVsKGRlZmF1bHRPcHRpb25zKTtcclxuY29uc29sZS5sb2cobW9kLnJldmVyc2UpXHJcbm1vZC5tYWtlRnVsbENoYW5nZXMoe3JldmVyc2U6IHRydWV9KVxyXG5jb25zb2xlLmxvZyhtb2QucmV2ZXJzZSlcclxubW9kLm1ha2VGdWxsQ2hhbmdlcyh7cmV2ZXJzZTogZmFsc2V9KVxyXG5jb25zb2xlLmxvZyhtb2QucmV2ZXJzZSkgKi8iLCJpbXBvcnQgeyBJTW9kZWxPcHRpb25zIH0gZnJvbSBcIi4vTW9kZWxcIjtcclxuaW1wb3J0IHsgaXNOdW1lcmljIH0gZnJvbSBcIi4vY29tbW9uRnVuY3Rpb25zXCI7XHJcblxyXG5pbnRlcmZhY2UgSVdhcm5pbmdzIHtcclxuICAgIHZhbHVlc0FyZU5vdE51bWJlcnM/OiBzdHJpbmcsXHJcbiAgICB2YWx1ZXNBcmVOb3RJbnRlZ2VyPzogc3RyaW5nLFxyXG4gICAgbWluSXNPdmVyTWF4Pzogc3RyaW5nLFxyXG4gICAgbWluSXNFcXVhbFRvTWF4Pzogc3RyaW5nLFxyXG4gICAgd3JvbmdSYW5nZUxlbmd0aD86IHN0cmluZyxcclxuICAgIHdyb25nT3JkZXJJblJhbmdlPzogc3RyaW5nLFxyXG4gICAgdG9vQmlnU3RlcD86IHN0cmluZyxcclxuICAgIHN0ZXBJc051bGw/OiBzdHJpbmcsXHJcbiAgICByZXZlcnNlSXNOb3RCb29sZWFuPzogc3RyaW5nLFxyXG4gICAgY3VzdG9tVmFsdWVzSXNOb3RBcnJheT86IHN0cmluZyxcclxuICAgIGN1c3RvbVZhbHVlc0lzVG9vU21hbGw/IDogc3RyaW5nLFxyXG5cclxuICAgIGludmFsaWRMZW5ndGg/OiBzdHJpbmcsXHJcbiAgICB2ZXJ0aWNhbElzTm90Qm9vbGVhbj86IHN0cmluZyxcclxuICAgIHRvb2x0aXBJc05vdEJvb2xlYW4/OiBzdHJpbmcsXHJcbiAgICBzY2FsZUlzTm90Qm9vbGVhbj86IHN0cmluZyxcclxufVxyXG5cclxubGV0IHdhcm5pbmdzOiBJV2FybmluZ3MgPSB7XHJcbiAgICB2YWx1ZXNBcmVOb3ROdW1iZXJzOiAnQWxsIHZhbHVlcywgaW5zdGVhZCBvZiBjdXN0b21WYWx1ZXMsIHNob3VsZCBiZSBudW1iZXJzJyxcclxuICAgIHZhbHVlc0FyZU5vdEludGVnZXI6ICdBbGwgdmFsdWVzLCBpbnN0ZWFkIG9mIGN1c3RvbVZhbHVlcywgc2hvdWxkIGJlIGludGVnZXInLFxyXG4gICAgbWluSXNPdmVyTWF4OiAnTWluIHZhbHVlIHNob3VsZCBiZSBsZXNzIHRoZW4gbWF4IHZhbHVlJyxcclxuICAgIG1pbklzRXF1YWxUb01heDogJ01pbiB2YWx1ZSBjYW50IGJlIGVxdWFsIHRvIG1heCB2YWx1ZScsXHJcbiAgICB3cm9uZ1JhbmdlTGVuZ3RoOiAnUmFuZ2Ugc2hvdWxkIGNvbnRhaW4gdHdvIHZhbHVlcycsXHJcbiAgICB3cm9uZ09yZGVySW5SYW5nZTogJ1RoZSBmaXJzdCBudW1iZXIgaW4gcmFuZ2Ugc2hvdWxkIGJlIGxlc3MgdGhlbiBzZWNvbmQnLFxyXG4gICAgdG9vQmlnU3RlcDogJ1N0ZXAgc2hvdWxkIGJlIGxlc3MgdGhlbiBkaWZmZXJlbmNlIG9mIG1heCBhbmQgbWluIHZhbHVlcycsXHJcbiAgICBzdGVwSXNOdWxsOiAnU3RlcCBjYW50IGJlIGVxdWFsIHRvIDAnLFxyXG4gICAgcmV2ZXJzZUlzTm90Qm9vbGVhbjogJ09wdGlvbiByZXZlcnNlIHNob3VsZCBiZSB0cnVlIG9yIGZhbHNlJyxcclxuICAgIGN1c3RvbVZhbHVlc0lzTm90QXJyYXk6ICdDdXN0b21WYWx1ZXMgc2hvdWxkIGJlIGFycmF5JyxcclxuICAgIGN1c3RvbVZhbHVlc0lzVG9vU21hbGw6ICdDdXN0b21WYWx1ZXMgc2hvdWxkIGNvbnRhaW4gYXQgbGVhc3QgdHdvIHZhbHVlcycsXHJcblxyXG4gICAgaW52YWxpZExlbmd0aDogJ0xlbmd0aCBzaG91bGQgYmUgdmFsaWQgdG8gQ1NTJyxcclxuICAgIHZlcnRpY2FsSXNOb3RCb29sZWFuOiAnT3B0aW9uIHZlcnRpY2FsIHNob3VsZCBiZSB0cnVlIG9yIGZhbHNlJyxcclxuICAgIHRvb2x0aXBJc05vdEJvb2xlYW46ICdPcHRpb24gdG9vbHRpcCBzaG91bGQgYmUgdHJ1ZSBvciBmYWxzZScsXHJcbiAgICBzY2FsZUlzTm90Qm9vbGVhbjogJ09wdGlvbiBzY2FsZSBzaG91bGQgYmUgdHJ1ZSBvciBmYWxzZScsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlTW9kZWwob3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IElXYXJuaW5ncyB7XHJcblxyXG4gICAgbGV0IHdhcm5zOiBJV2FybmluZ3MgPSB7fTtcclxuXHJcbiAgICBsZXQgbnVtYmVyczogbnVtYmVyW10gPSBbb3B0aW9ucy5taW4sIG9wdGlvbnMubWF4LCBvcHRpb25zLnN0ZXBdO1xyXG4gICAgaWYgKG9wdGlvbnMucmFuZ2UpIHtcclxuICAgICAgICBudW1iZXJzLnB1c2gob3B0aW9ucy5yYW5nZVswXSwgb3B0aW9ucy5yYW5nZVsxXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG51bWJlcnMucHVzaChvcHRpb25zLnZhbHVlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKCAhdmFsaWRhdGVOdW1iZXJzKG51bWJlcnMpICkgeyBcclxuICAgICAgICB3YXJucy52YWx1ZXNBcmVOb3ROdW1iZXJzID0gd2FybmluZ3MudmFsdWVzQXJlTm90TnVtYmVycztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoICF2YWxpZGF0ZUludGVnZXJzKG51bWJlcnMpICkge1xyXG4gICAgICAgIHdhcm5zLnZhbHVlc0FyZU5vdEludGVnZXIgPSB3YXJuaW5ncy52YWx1ZXNBcmVOb3RJbnRlZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggb3B0aW9ucy5taW4gPiBvcHRpb25zLm1heCApIHtcclxuICAgICAgICB3YXJucy5taW5Jc092ZXJNYXggPSB3YXJuaW5ncy5taW5Jc092ZXJNYXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCBvcHRpb25zLm1pbiA9PSBvcHRpb25zLm1heCApIHtcclxuICAgICAgICB3YXJucy5taW5Jc0VxdWFsVG9NYXggPSB3YXJuaW5ncy5taW5Jc0VxdWFsVG9NYXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCBvcHRpb25zLnJhbmdlICkge1xyXG4gICAgICAgIGlmICggIUFycmF5LmlzQXJyYXkob3B0aW9ucy5yYW5nZSkgfHwgb3B0aW9ucy5yYW5nZS5sZW5ndGggIT0gMiApIHtcclxuICAgICAgICAgICAgd2FybnMud3JvbmdSYW5nZUxlbmd0aCA9IHdhcm5pbmdzLndyb25nUmFuZ2VMZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICF3YXJucy53cm9uZ1JhbmdlTGVuZ3RoICYmIG9wdGlvbnMucmFuZ2VbMF0gPiBvcHRpb25zLnJhbmdlWzFdICkge1xyXG4gICAgICAgICAgICB3YXJucy53cm9uZ09yZGVySW5SYW5nZSA9IHdhcm5pbmdzLndyb25nT3JkZXJJblJhbmdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIE1hdGguYWJzKG9wdGlvbnMubWF4IC0gb3B0aW9ucy5taW4pIDwgTWF0aC5hYnMob3B0aW9ucy5zdGVwKSApIHtcclxuICAgICAgICB3YXJucy50b29CaWdTdGVwID0gd2FybmluZ3MudG9vQmlnU3RlcDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKCBvcHRpb25zLnN0ZXAgPT0gMCApIHtcclxuICAgICAgICB3YXJucy5zdGVwSXNOdWxsID0gd2FybmluZ3Muc3RlcElzTnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIHR5cGVvZiBvcHRpb25zLnJldmVyc2UgIT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgIHdhcm5zLnJldmVyc2VJc05vdEJvb2xlYW4gPSB3YXJuaW5ncy5yZXZlcnNlSXNOb3RCb29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggb3B0aW9ucy5jdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgaWYgKCAhQXJyYXkuaXNBcnJheShvcHRpb25zLmN1c3RvbVZhbHVlcykgKSB7XHJcbiAgICAgICAgICAgIHdhcm5zLmN1c3RvbVZhbHVlc0lzTm90QXJyYXkgPSB3YXJuaW5ncy5jdXN0b21WYWx1ZXNJc05vdEFycmF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhd2FybnMuY3VzdG9tVmFsdWVzSXNOb3RBcnJheSAmJiBvcHRpb25zLmN1c3RvbVZhbHVlcy5sZW5ndGggPCAyICkge1xyXG4gICAgICAgICAgICB3YXJucy5jdXN0b21WYWx1ZXNJc1Rvb1NtYWxsID0gd2FybmluZ3MuY3VzdG9tVmFsdWVzSXNUb29TbWFsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHdhcm5zO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZU51bWJlcnMobnVtYmVyczogbnVtYmVyW10pOiBib29sZWFuIHtcclxuICAgIGxldCBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIG51bWJlcnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IFxyXG4gICAgICAgIGlmKCAhaXNOdW1lcmljKGl0ZW0pICkgeyBcclxuICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGlzVmFsaWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlSW50ZWdlcnMobnVtYmVyczogbnVtYmVyW10pOiBib29sZWFuIHtcclxuICAgIGxldCBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIG51bWJlcnMuZm9yRWFjaChmdW5jdGlvbihudW0pIHtcclxuICAgICAgICBpZiAoIG51bSAlIDEgIT0gMCApIHsgXHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpc1ZhbGlkO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVZpZXcob3B0aW9ucyk6IElXYXJuaW5ncyB7XHJcbiAgICBsZXQgd2FybnM6IElXYXJuaW5ncyA9IHt9O1xyXG5cclxuICAgIGlmICggIW9wdGlvbnMubGVuZ3RoLm1hdGNoKC9eXFxkezEsM31bLixdP1xcZCoocHh8ZW18cmVtfCV8dmh8dncpPyQvaSkgKSB7XHJcbiAgICAgICAgd2FybnMuaW52YWxpZExlbmd0aCA9IHdhcm5pbmdzLmludmFsaWRMZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCB0eXBlb2Ygb3B0aW9ucy52ZXJ0aWNhbCAhPSAnYm9vbGVhbicgKSB7XHJcbiAgICAgICAgd2FybnMudmVydGljYWxJc05vdEJvb2xlYW4gPSB3YXJuaW5ncy52ZXJ0aWNhbElzTm90Qm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIHR5cGVvZiBvcHRpb25zLnRvb2x0aXAgIT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgIHdhcm5zLnRvb2x0aXBJc05vdEJvb2xlYW4gPSB3YXJuaW5ncy50b29sdGlwSXNOb3RCb29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggdHlwZW9mIG9wdGlvbnMuc2NhbGUgIT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgIHdhcm5zLnNjYWxlSXNOb3RCb29sZWFuID0gd2FybmluZ3Muc2NhbGVJc05vdEJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHdhcm5zO1xyXG59XHJcblxyXG5leHBvcnQgeyB2YWxpZGF0ZU1vZGVsLCB2YWxpZGF0ZVZpZXcsIElXYXJuaW5ncyB9Il0sInNvdXJjZVJvb3QiOiIifQ==