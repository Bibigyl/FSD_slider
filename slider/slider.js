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
        var _this = _super.call(this, update) || this;
        var fullOptions = Object.assign({}, defaultOptions_1.defaultOptions, options);
        var validOptions;
        _this.validate(fullOptions);
        validOptions = _this.normalize(fullOptions, defaultOptions_1.defaultOptions);
        _this.setOptions(validOptions);
        return _this;
    }
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
}(Observer_1.Store));
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
var Store = (function () {
    function Store(update) {
        this.callbacks = [];
        this._update = update;
    }
    Store.prototype.attach = function (callback) {
        this.callbacks.push(callback);
    };
    Store.prototype.detach = function (callback) {
        var callbackIndex = this.callbacks.indexOf(callback);
        this.callbacks.splice(callbackIndex, 1);
    };
    Store.prototype.notify = function () {
        for (var _i = 0, _a = this.callbacks; _i < _a.length; _i++) {
            var callback = _a[_i];
            callback();
        }
    };
    Store.prototype.update = function (action) {
        this._update(action);
    };
    Store.prototype.getLastUpdate = function () {
        return this._lastUpdate;
    };
    return Store;
}());
exports.Store = Store;
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
        var _this = _super.call(this, update) || this;
        options = Object.assign(defaultOptions_1.defaultOptions, options);
        _this.validate(options);
        _this._slider = sliderNode;
        _this._slider.classList.add('slider');
        _this.build(options);
        return _this;
    }
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
}(Observer_1.Store));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb25GdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZmF1bHRPcHRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFsaWRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSw4RkFBNEQ7QUFDNUQsNEVBQXVFO0FBQ3ZFLGlHQUEyRTtBQUMzRSxxRkFBeUQ7QUF1QnpEO0lB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QUFPLENBQUMsT0FBTyxFQUFHO1FBQ3BCLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFFLENBQUM7UUFDL0QsVUFBVSxHQUFHLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ2xELElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQzlDLElBQUksR0FBRyxVQUFVLElBQUksT0FBTyxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FFcEU7U0FBTTtRQUNILFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFFLENBQUM7UUFDL0QsVUFBVSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ2xELElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQzlDLElBQUksR0FBRyxVQUFVLElBQUksT0FBTyxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDcEU7SUFFRCxJQUFJLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMvQyxJQUFJLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUUvQyxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRWdELDBDQUFlOzs7Ozs7Ozs7Ozs7Ozs7QUNqQ2hFLElBQUksY0FBYyxHQUFhO0lBSTNCLEtBQUssRUFBRSxJQUFJO0lBQ1gsR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsRUFBRTtJQUNQLElBQUksRUFBRSxDQUFDO0lBQ1AsT0FBTyxFQUFFLEtBQUs7SUFDZCxLQUFLLEVBQUUsSUFBSTtJQUVYLE1BQU0sRUFBRSxPQUFPO0lBQ2YsUUFBUSxFQUFFLEtBQUs7SUFDZixPQUFPLEVBQUUsS0FBSztJQUNkLEtBQUssRUFBRSxLQUFLO0NBQ2Y7QUFHUSx3Q0FBYzs7Ozs7Ozs7Ozs7Ozs7O0FDckJ2QiwrRUFBb0M7QUFDcEMsOEZBQTREO0FBSTVELENBQUMsVUFBVSxDQUFDO0lBVVYsSUFBSSxPQUFPLEdBQWE7UUFFdEIsSUFBSSxFQUFFLFVBQVUsT0FBa0I7WUFFaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUVmLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUduQixJQUFJLENBQUMsSUFBSSxFQUFFO29CQUVULE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSwrQkFBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUVoRCxJQUFJLFNBQVMsR0FBRyxJQUFJLG1CQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUU3QyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTt3QkFDekIsTUFBTSxFQUFFLE1BQU07d0JBQ2QsU0FBUyxFQUFFLFNBQVM7cUJBQ3JCLENBQUMsQ0FBQztpQkFFSjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE9BQU8sRUFBRTtZQUNQLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEQsQ0FBQztRQUVELE1BQU0sRUFBRSxVQUFVLE9BQWlCO1lBRWpDLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3JELFNBQVMsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM3QyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFFRCxPQUFPLEVBQUU7WUFDUCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBRWYsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUVwQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNyQixLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE9BQU8sRUFBRSxVQUFVLFFBQWtCO1lBRW5DLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3JELFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsQ0FBQztLQUNGO0lBR0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxNQUFjO1FBR3pDLElBQUksT0FBTyxDQUFDLE1BQWdCLENBQUMsRUFBRTtZQUU3QixPQUFPLE9BQU8sQ0FBQyxNQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FFeEY7YUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUVoRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztTQUU1QzthQUFNO1lBQ0wsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLEdBQUcsbUNBQW1DLENBQUMsQ0FBQztTQUMxRTtJQUVILENBQUMsQ0FBQztBQUVKLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMxRlgsaUdBQThDO0FBcUI5QyxJQUFJLFFBQVEsR0FBYztJQUN0QixtQkFBbUIsRUFBRSx3REFBd0Q7SUFDN0UsbUJBQW1CLEVBQUUsd0RBQXdEO0lBQzdFLFlBQVksRUFBRSx5Q0FBeUM7SUFDdkQsZUFBZSxFQUFFLHNDQUFzQztJQUN2RCxnQkFBZ0IsRUFBRSxpQ0FBaUM7SUFDbkQsaUJBQWlCLEVBQUUsc0RBQXNEO0lBQ3pFLFVBQVUsRUFBRSwyREFBMkQ7SUFDdkUsVUFBVSxFQUFFLHlCQUF5QjtJQUNyQyxtQkFBbUIsRUFBRSx3Q0FBd0M7SUFDN0Qsc0JBQXNCLEVBQUUsOEJBQThCO0lBQ3RELHNCQUFzQixFQUFFLGlEQUFpRDtJQUV6RSxhQUFhLEVBQUUsK0JBQStCO0lBQzlDLG9CQUFvQixFQUFFLHlDQUF5QztJQUMvRCxtQkFBbUIsRUFBRSx3Q0FBd0M7SUFDN0QsaUJBQWlCLEVBQUUsc0NBQXNDO0NBQzVEO0FBRUQsU0FBUyxhQUFhLENBQUMsT0FBc0I7SUFFekMsSUFBSSxLQUFLLEdBQWMsRUFBRSxDQUFDO0lBRTFCLElBQUksT0FBTyxHQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7UUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3BEO1NBQU07UUFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMvQjtJQUdELElBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUc7UUFDN0IsS0FBSyxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztLQUM1RDtJQUVELElBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBRztRQUM5QixLQUFLLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDO0tBQzVEO0lBRUQsSUFBSyxPQUFPLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUc7UUFDN0IsS0FBSyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO0tBQzlDO0lBRUQsSUFBSyxPQUFPLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUc7UUFDOUIsS0FBSyxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDO0tBQ3BEO0lBRUQsSUFBSyxPQUFPLENBQUMsS0FBSyxFQUFHO1FBQ2pCLElBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUc7WUFDOUQsS0FBSyxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztTQUN0RDtRQUVELElBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFHO1lBQ2xFLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsaUJBQWlCLENBQUM7U0FDeEQ7S0FDSjtJQUVELElBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRztRQUNoRSxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7S0FDMUM7SUFFRCxJQUFLLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFHO1FBQ3JCLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztLQUMxQztJQUVELElBQUssT0FBTyxPQUFPLENBQUMsT0FBTyxJQUFJLFNBQVMsRUFBRztRQUN2QyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDO0tBQzVEO0lBRUQsSUFBSyxPQUFPLENBQUMsWUFBWSxFQUFHO1FBQ3hCLElBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRztZQUN4QyxLQUFLLENBQUMsc0JBQXNCLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDO1NBQ2xFO1FBRUQsSUFBSyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUc7WUFDcEUsS0FBSyxDQUFDLHNCQUFzQixHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQztTQUNsRTtLQUNKO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQTRDUSxzQ0FBYTtBQTFDdEIsU0FBUyxlQUFlLENBQUMsT0FBaUI7SUFDdEMsSUFBSSxPQUFPLEdBQVksSUFBSSxDQUFDO0lBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBUyxJQUFJO1FBQ3pCLElBQUksQ0FBQywyQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFHO1lBQ25CLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDbkI7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFFRCxTQUFTLGdCQUFnQixDQUFDLE9BQWlCO0lBQ3ZDLElBQUksT0FBTyxHQUFZLElBQUksQ0FBQztJQUM1QixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVMsR0FBRztRQUN4QixJQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFHO1lBQ2hCLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDbkI7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxPQUFPO0lBQ3pCLElBQUksS0FBSyxHQUFjLEVBQUUsQ0FBQztJQUUxQixJQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLENBQUMsRUFBRztRQUNuRSxLQUFLLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7S0FDaEQ7SUFFRCxJQUFLLE9BQU8sT0FBTyxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUc7UUFDeEMsS0FBSyxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM5RDtJQUVELElBQUssT0FBTyxPQUFPLENBQUMsT0FBTyxJQUFJLFNBQVMsRUFBRztRQUN2QyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDO0tBQzVEO0lBRUQsSUFBSyxPQUFPLE9BQU8sQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFHO1FBQ3JDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsaUJBQWlCLENBQUM7S0FDeEQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRXVCLG9DQUFZIiwiZmlsZSI6InNsaWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCB7IElTdWJqZWN0LCBTdWJqZWN0LCBJQ29uZmlnLCBTdG9yZSwgSVN0b3JlIH0gZnJvbSAnLi9PYnNlcnZlcic7XHJcbmltcG9ydCB7IGlzTnVtZXJpYywgZ2V0TnVtYmVyT2ZTdGVwcywgZGVlcEVxdWFsIH0gZnJvbSAnLi9jb21tb25GdW5jdGlvbnMnO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZU1vZGVsLCBJV2FybmluZ3MgfSBmcm9tICcuL3ZhbGlkYXRpb25zJztcclxuXHJcbi8vINCd0JXQmtCe0KLQntCg0KvQlSDQodCi0KDQntCn0JrQmCDQryDQl9CQ0JrQntCc0JzQldCd0KLQmNCg0J7QktCQ0JvQkCwg0JLQnNCV0KHQotCeINCi0J7Qk9CeINCn0KLQntCRINCj0JTQkNCb0K/QotCsLiDQodCV0JnQp9CQ0KEg0K3QotCe0KIg0JrQntCUINCSINCa0JvQkNCh0KHQlSBTdG9yZSAg0JIg0KTQkNCZ0JvQlSBPYnNlcnZlclxyXG5cclxuaW50ZXJmYWNlIElNb2RlbE9wdGlvbnMge1xyXG4gICAgdmFsdWU6IG51bWJlciB8IG51bGw7XHJcbiAgICBtaW46IG51bWJlcjtcclxuICAgIG1heDogbnVtYmVyO1xyXG4gICAgc3RlcDogbnVtYmVyO1xyXG4gICAgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gfCBudWxsO1xyXG4gICAgY3VzdG9tVmFsdWVzPzogc3RyaW5nW107XHJcbiAgICByZXZlcnNlOiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSU1vZGVsIGV4dGVuZHMgSVN0b3JlIHtcclxuICAgIHVwZGF0ZShjb25maWc6IElDb25maWcpOiB2b2lkO1xyXG5cclxuICAgIGdldE9wdGlvbnMoKTogSU1vZGVsT3B0aW9ucztcclxuICAgIGdldFdhcm5pbmdzKCk6IElXYXJuaW5ncztcclxuICAgIC8vZ2V0TGFzdFVwZGF0ZSgpOiBzdHJpbmc7XHJcbn1cclxuXHJcblxyXG5jbGFzcyBNb2RlbCBleHRlbmRzIFN0b3JlIGltcGxlbWVudHMgSU1vZGVsIHtcclxuICAgIHByaXZhdGUgX3ZhbHVlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbWluOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9tYXg6IG51bWJlcjsgICBcclxuICAgIHByaXZhdGUgX3N0ZXA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3JhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2N1c3RvbVZhbHVlcz86IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfcmV2ZXJzZTogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIF93YXJuaW5nczogSVdhcm5pbmdzO1xyXG4gICAgLy9wcml2YXRlIF9sYXN0VXBkYXRlOiBzdHJpbmc7XHJcblxyXG4gICAgLy9wcml2YXRlIF91cGRhdGU6IEZ1bmN0aW9uO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJTW9kZWxPcHRpb25zLCB1cGRhdGU6IEZ1bmN0aW9uKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKHVwZGF0ZSk7XHJcblxyXG4gICAgICAgIGxldCBmdWxsT3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICBsZXQgdmFsaWRPcHRpb25zOiBJTW9kZWxPcHRpb25zO1xyXG5cclxuICAgICAgICB0aGlzLnZhbGlkYXRlKGZ1bGxPcHRpb25zKTtcclxuICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLm5vcm1hbGl6ZShmdWxsT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyh2YWxpZE9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvL3RoaXMuX3VwZGF0ZSA9IHVwZGF0ZTtcclxuICAgIH1cclxuXHJcbi8qICAgICB1cGRhdGUoYWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlKGFjdGlvbik7XHJcbiAgICB9ICovXHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRPcHRpb25zKCk6IElNb2RlbE9wdGlvbnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl92YWx1ZSxcclxuICAgICAgICAgICAgbWluOiB0aGlzLl9taW4sXHJcbiAgICAgICAgICAgIG1heDogdGhpcy5fbWF4LCAgIFxyXG4gICAgICAgICAgICBzdGVwOiB0aGlzLl9zdGVwLFxyXG4gICAgICAgICAgICByYW5nZTogdGhpcy5fcmFuZ2UsXHJcbiAgICAgICAgICAgIGN1c3RvbVZhbHVlczogdGhpcy5fY3VzdG9tVmFsdWVzLFxyXG4gICAgICAgICAgICByZXZlcnNlOiB0aGlzLl9yZXZlcnNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRXYXJuaW5ncygpOiBJV2FybmluZ3Mge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl93YXJuaW5ncyk7XHJcbiAgICB9XHJcblxyXG4vKiAgICAgcHVibGljIGdldExhc3RVcGRhdGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdFVwZGF0ZTtcclxuICAgIH0gKi9cclxuXHJcbiAgICBwcml2YXRlIHNldE9wdGlvbnMob3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gb3B0aW9ucy52YWx1ZTtcclxuICAgICAgICB0aGlzLl9taW4gPSBvcHRpb25zLm1pbjtcclxuICAgICAgICB0aGlzLl9tYXggPSBvcHRpb25zLm1heDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gb3B0aW9ucy5yYW5nZTtcclxuICAgICAgICB0aGlzLl9jdXN0b21WYWx1ZXMgPSBvcHRpb25zLmN1c3RvbVZhbHVlczsgICAgICBcclxuICAgICAgICB0aGlzLl9yZXZlcnNlID0gb3B0aW9ucy5yZXZlcnNlOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZShvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuX3dhcm5pbmdzID0ge307XHJcbiAgICAgICAgdGhpcy5fd2FybmluZ3MgPSB2YWxpZGF0ZU1vZGVsKG9wdGlvbnMpO1xyXG5cclxuLyogICAgICAgICBpZiAoIE9iamVjdC5rZXlzKHRoaXMuX3dhcm5pbmdzKS5sZW5ndGggIT0gMCApIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB3YXJuaW5nczogSVdhcm5pbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fd2FybmluZ3MpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1dBUk5JTkdTJyxcclxuICAgICAgICAgICAgICAgIHdhcm5pbmdzOiB3YXJuaW5nc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gKi9cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5vcm1hbGl6ZShvcHRpb25zOiBJTW9kZWxPcHRpb25zLCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiBJTW9kZWxPcHRpb25zIHtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHZhbGlkT3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5fd2FybmluZ3MuY3VzdG9tVmFsdWVzSXNOb3RBcnJheSB8fCB0aGlzLl93YXJuaW5ncy5jdXN0b21WYWx1ZXNJc1Rvb1NtYWxsICkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmN1c3RvbVZhbHVlcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5jdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMubWluID0gMDtcclxuICAgICAgICAgICAgb3B0aW9ucy5tYXggPSBvcHRpb25zLmN1c3RvbVZhbHVlcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3B0aW9ucy5taW4gPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLm1pbiwgdmFsaWRPcHRpb25zLm1pbik7XHJcbiAgICAgICAgb3B0aW9ucy5tYXggPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLm1heCwgdmFsaWRPcHRpb25zLm1heCk7XHJcbiAgICAgICAgb3B0aW9ucy5zdGVwID0gdGhpcy5ub3JtYWxpemVOdW1iZXIob3B0aW9ucy5zdGVwLCB2YWxpZE9wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5fd2FybmluZ3MubWluSXNPdmVyTWF4ICkge1xyXG4gICAgICAgICAgICBbb3B0aW9ucy5taW4sIG9wdGlvbnMubWF4XSA9IFtvcHRpb25zLm1heCwgb3B0aW9ucy5taW5dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLl93YXJuaW5ncy5taW5Jc0VxdWFsVG9NYXggKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMubWluID0gdmFsaWRPcHRpb25zLm1pbjtcclxuICAgICAgICAgICAgb3B0aW9ucy5tYXggPSB2YWxpZE9wdGlvbnMubWF4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLl93YXJuaW5ncy5zdGVwSXNOdWxsIHx8IHRoaXMuX3dhcm5pbmdzLnRvb0JpZ1N0ZXAgKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuc3RlcCA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSBNYXRoLmFicyhvcHRpb25zLnN0ZXApO1xyXG4gICAgICAgIG9wdGlvbnMucmV2ZXJzZSA9ICEhb3B0aW9ucy5yZXZlcnNlO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMubm9ybWFsaXplTnVtYmVyKG9wdGlvbnMudmFsdWUsIG9wdGlvbnMubWluKTtcclxuICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMuZmluZENsb3Nlc3RTdGVwKG9wdGlvbnMudmFsdWUsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2UgPSBudWxsO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhQXJyYXkuaXNBcnJheShvcHRpb25zLnJhbmdlKSApIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2UgPSBbb3B0aW9ucy5taW4sIG9wdGlvbnMubWF4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IG9wdGlvbnMucmFuZ2Uuc2xpY2UoMCwgMikgYXMgW251bWJlciwgbnVtYmVyXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMF0gPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLnJhbmdlWzBdLCBvcHRpb25zLm1pbik7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMV0gPSB0aGlzLm5vcm1hbGl6ZU51bWJlcihvcHRpb25zLnJhbmdlWzFdLCBvcHRpb25zLm1heCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3dhcm5pbmdzLndyb25nT3JkZXJJblJhbmdlICkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICAgICAgICAgICAgICB9KTsgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMF0gPSB0aGlzLmZpbmRDbG9zZXN0U3RlcChvcHRpb25zLnJhbmdlWzBdLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVsxXSA9IHRoaXMuZmluZENsb3Nlc3RTdGVwKG9wdGlvbnMucmFuZ2VbMV0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG5vcm1hbGl6ZU51bWJlcih2YWx1ZTogbnVtYmVyLCBkZWZhdWx0VmFsOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBuZXdWYWx1ZTogbnVtYmVyID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICggIWlzTnVtZXJpYyh2YWx1ZSkgKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gZGVmYXVsdFZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3VmFsdWUgPSBNYXRoLnRydW5jKCtuZXdWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGZpbmRDbG9zZXN0U3RlcCh2YWx1ZTogbnVtYmVyLCBvcHRpb25zOiBJTW9kZWxPcHRpb25zKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyO1xyXG4gICAgICAgIGxldCBjZWlsU3RlcHM6IG51bWJlcjtcclxuICAgICAgICBsZXQgcmVzdE9mU3RlcDogbnVtYmVyO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnJldmVyc2UgKSB7XHJcbiAgICAgICAgICAgIGNlaWxTdGVwcyA9IE1hdGgudHJ1bmMoICh2YWx1ZSAtIG9wdGlvbnMubWluKSAvIG9wdGlvbnMuc3RlcCApO1xyXG4gICAgICAgICAgICByZXN0T2ZTdGVwID0gKHZhbHVlIC0gb3B0aW9ucy5taW4pICUgb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgICAgICBzdGVwID0gb3B0aW9ucy5taW4gKyBjZWlsU3RlcHMgKiBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgICAgIHN0ZXAgPSByZXN0T2ZTdGVwID49IG9wdGlvbnMuc3RlcC8yID8gc3RlcCArIG9wdGlvbnMuc3RlcCA6IHN0ZXA7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNlaWxTdGVwcyA9IE1hdGgudHJ1bmMoIChvcHRpb25zLm1heCAtIHZhbHVlKSAvIG9wdGlvbnMuc3RlcCApO1xyXG4gICAgICAgICAgICByZXN0T2ZTdGVwID0gKG9wdGlvbnMubWF4IC0gdmFsdWUpICUgb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgICAgICBzdGVwID0gb3B0aW9ucy5tYXggLSBjZWlsU3RlcHMgKiBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgICAgIHN0ZXAgPSByZXN0T2ZTdGVwID49IG9wdGlvbnMuc3RlcC8yID8gc3RlcCAtIG9wdGlvbnMuc3RlcCA6IHN0ZXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGVwID0gc3RlcCA+IG9wdGlvbnMubWF4ID8gb3B0aW9ucy5tYXggOiBzdGVwO1xyXG4gICAgICAgIHN0ZXAgPSBzdGVwIDwgb3B0aW9ucy5taW4gPyBvcHRpb25zLm1pbiA6IHN0ZXA7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGVwO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IElNb2RlbCwgSU1vZGVsT3B0aW9ucyB9O1xyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuIiwiaW1wb3J0IHsgSU1vZGVsT3B0aW9ucyB9IGZyb20gXCIuL01vZGVsXCI7XHJcbmltcG9ydCB7IElWaWV3T3B0aW9ucyB9IGZyb20gXCIuL1ZpZXdcIjtcclxuaW1wb3J0IHsgSU9wdGlvbnMgfSBmcm9tIFwiLi9kZWZhdWx0T3B0aW9uc1wiO1xyXG5pbXBvcnQgeyBJV2FybmluZ3MgfSBmcm9tIFwiLi92YWxpZGF0aW9uc1wiO1xyXG5cclxuXHJcbmludGVyZmFjZSBJU3RvcmUge1xyXG4gICAgYXR0YWNoKGNhbGxiYWNrOiBhbnkpOiB2b2lkO1xyXG4gICAgZGV0YWNoKGNhbGxiYWNrOiBhbnkpOiB2b2lkO1xyXG4gICAgbm90aWZ5KGNvbmZpZzogYW55KTogdm9pZDtcclxuXHJcbiAgICAvL2dldExhc3RVcGRhdGUoKTogc3RyaW5nO1xyXG59XHJcblxyXG4vLyDQkNCd0JDQm9Ce0JMgU1RPUkUg0JIgUkVEVVhcclxuLy8g0KHQkNCc0Jgg0JzQntCU0JXQm9CYINCYINCS0KzQriDQndCVINCX0J3QkNCu0KIg0JrQkNCaINCe0J3QmCDQkdCj0JTQo9CiINCc0JXQndCv0KLQrNCh0K8sINCt0KLQniDQkdCj0JTQldCiINCX0JDQn9CY0KHQkNCd0J4g0JIgX3VwZGF0ZSDQn9Cg0Jgg0JjQndCY0KbQmNCQ0JvQmNCX0JDQptCY0JhcclxuXHJcbmNsYXNzIFN0b3JlIGltcGxlbWVudHMgSVN0b3JlIHtcclxuXHJcbiAgICBwcml2YXRlIF9sYXN0VXBkYXRlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF91cGRhdGU6IEZ1bmN0aW9uO1xyXG5cclxuICAgIHByb3RlY3RlZCBjYWxsYmFja3M6IGFueVtdID0gW107XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHVwZGF0ZSkge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZSA9IHVwZGF0ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGF0dGFjaChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGV0YWNoKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNhbGxiYWNrSW5kZXg6IG51bWJlciA9IHRoaXMuY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnNwbGljZShjYWxsYmFja0luZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbm90aWZ5KCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5jYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHVwZGF0ZShhY3Rpb24pIHtcclxuICAgICAgICB0aGlzLl91cGRhdGUoYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TGFzdFVwZGF0ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0VXBkYXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5pbnRlcmZhY2UgSVN1YmplY3Qge1xyXG4gICAgYXR0YWNoKGNhbGxiYWNrOiBhbnkpOiB2b2lkO1xyXG4gICAgZGV0YWNoKGNhbGxiYWNrOiBhbnkpOiB2b2lkO1xyXG4gICAgbm90aWZ5KGNvbmZpZzogYW55KTogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgU3ViamVjdCBpbXBsZW1lbnRzIElTdWJqZWN0IHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY2FsbGJhY2tzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBhdHRhY2goY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjYWxsYmFja0luZGV4OiBudW1iZXIgPSB0aGlzLmNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrcy5zcGxpY2UoY2FsbGJhY2tJbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5vdGlmeSgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHRoaXMuY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUNvbmZpZyB7XHJcbiAgICB0eXBlOiBzdHJpbmcsXHJcbiAgICAvLyA/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/P1xyXG4gICAgLy9vcHRpb25zPzogSU1vZGVsT3B0aW9ucyB8IElWaWV3T3B0aW9ucyB8IElPcHRpb25zLFxyXG4gICAgb3B0aW9ucz86IGFueSxcclxuICAgIHBlcmNlbnQ/OiBudW1iZXIsXHJcbiAgICBpbmRleD86IG51bWJlcixcclxuICAgIHdhcm5pbmdzPzogSVdhcm5pbmdzXHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBJU3ViamVjdCwgU3ViamVjdCwgSUNvbmZpZywgSVN0b3JlLCBTdG9yZSB9OyIsImltcG9ydCB7IElPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQgTW9kZWwsIHsgSU1vZGVsLCBJTW9kZWxPcHRpb25zIH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCBWaWV3LCB7IElWaWV3IH0gZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IHsgSVN1YmplY3QsIFN1YmplY3QgfSAgZnJvbSAnLi9PYnNlcnZlcic7XHJcbmltcG9ydCB7IElXYXJuaW5ncyB9IGZyb20gJy4vdmFsaWRhdGlvbnMnO1xyXG5pbXBvcnQgeyBkZWVwRXF1YWwsIGZpbmRDbG9zZXN0U3RlcCB9IGZyb20gJy4vY29tbW9uRnVuY3Rpb25zJztcclxuXHJcbmludGVyZmFjZSBJUHJlc2VudGVyIGV4dGVuZHMgSVN1YmplY3Qge1xyXG4gICAgdXBkYXRlKGNvbmZpZzogYW55KTogdm9pZDtcclxuXHJcbiAgICBnZXRPcHRpb25zKCk6IElPcHRpb25zO1xyXG4gICAgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzO1xyXG4gICAgLy8gPz8/Pz9cclxuICAgIHNldExhc3RVcGRhdGUodmFsdWU6IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qIGNvbnN0IGxhc3RVcGRhdGUgPSB7XHJcbiAgICBORVdfT1BUSU9OUzogJ05FV19PUFRJT05TJyxcclxuICAgIE5FV19WQUxVRTogJ05FV19WQUxVRScsXHJcbiAgICBNT0RFTDogJ01PREVMJyxcclxuICAgIFZJRVc6ICdWSUVXJyxcclxuICAgIE9VVEVSX0RBVEE6ICdORVdfT1VURVJfT1BUSU9OUydcclxufTsgKi9cclxuXHJcbi8vINCc0JXQotCe0JTQqyB1cGRhdGVNb2RlbCDQmCB1cGRhdGVWaWV3IC0g0K3QotCeINCQ0J3QkNCb0J7Qk9CYINCg0JXQlNCs0K7QodCV0KDQntCSINCSIFJFRFVYLlxyXG4vLyDQoNCQ0JfQndCY0KbQkCDQkiDQotCe0Jwg0KfQotCeINCt0KLQniDQndCVINCn0JjQodCi0KvQlSDQpNCj0J3QmtCm0JjQmCwg0J/QntCi0J7QnNCjINCn0KLQniDQnNCe0JTQldCb0Kwg0Jgg0JLQmNCUINCd0JUg0K/QktCb0K/QrtCi0KHQryDQn9Ce0JvQndCe0KbQldCd0J3Qq9Cc0JggU1RPUkVcclxuXHJcbmNvbnN0IHVwZGF0ZU1vZGVsID0gZnVuY3Rpb24oYWN0aW9uKSB7XHJcblxyXG4gICAgbGV0IHByZXZPcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcbiAgICB0aGlzLnZhbGlkYXRlKE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBhY3Rpb24ub3B0aW9ucykpXHJcbiAgICBsZXQgdmFsaWRPcHRpb25zOiBJTW9kZWxPcHRpb25zID0gdGhpcy5ub3JtYWxpemUoYWN0aW9uLm9wdGlvbnMsIHByZXZPcHRpb25zKTtcclxuICAgIFxyXG4gICAgaWYgKCBkZWVwRXF1YWwocHJldk9wdGlvbnMsIHZhbGlkT3B0aW9ucykgKSB7XHJcbiAgICAgICAgcmV0dXJuOyAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXRPcHRpb25zKHZhbGlkT3B0aW9ucyk7XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ1NFVF9ORVdfT1BUSU9OUyc6XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RVcGRhdGUgPSAnTkVXX09QVElPTlMnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAnU0VUX05FV19WQUxVRSc6XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RVcGRhdGUgPSAnTkVXX1ZBTFVFJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ub3RpZnkoKTtcclxufTtcclxuXHJcbmNvbnN0IHVwZGF0ZVZpZXcgPSBmdW5jdGlvbihhY3Rpb24pIHtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnU0VUX05FV19QT1NJVElPTic6XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJzKGFjdGlvbi5vcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCYXJQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCB8fCB0aGlzLl90b29sdGlwRmlyc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VG9vbHRpcFZhbHVlcyhhY3Rpb24ub3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RVcGRhdGUgPSAnTkVXX1BPU0lUSU9OJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ1NFVF9ORVdfT1BUSU9OUyc6XHJcbiAgICAgICAgICAgIGFjdGlvbi5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5nZXRPcHRpb25zKCksIGFjdGlvbi5vcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGUoYWN0aW9uLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlYnVpbGQoYWN0aW9uLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZSA9ICdORVdfT1BUSU9OUyc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8g0JzQntCU0JXQm9CsINCYINCS0JjQlCAtINCt0KLQniDQn9Ce0JTQntCR0JjQlSBTVE9SRS4g0J7QndCYINCd0JDQodCb0JXQlNCj0K7QoiDQntCiINCa0JvQkNCh0KHQkCBTVE9SRSwg0J7QnSDQktCg0JXQnNCV0J3QndCeINCSINCf0JDQn9Ca0JUgT0JTRVJWRVJcclxuXHJcbmNsYXNzIFByZXNlbnRlciBleHRlbmRzIFN1YmplY3QgaW1wbGVtZW50cyBJUHJlc2VudGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9tb2RlbDogSU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBfdmlldzogSVZpZXc7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGFzdFVwZGF0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJT3B0aW9ucywgbm9kZTogSFRNTERpdkVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9tb2RlbCA9IG5ldyBNb2RlbChvcHRpb25zLCB1cGRhdGVNb2RlbCk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHRoaXMuX21vZGVsLmdldE9wdGlvbnMoKSk7XHJcbiAgICAgICAgdGhpcy5fdmlldyA9IG5ldyBWaWV3KG9wdGlvbnMsIG5vZGUsIHVwZGF0ZVZpZXcpO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLl9tb2RlbC5hdHRhY2goZnVuY3Rpb24oYWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoYXQuX2xhc3RVcGRhdGUgPSAnTU9ERUwnO1xyXG4gICAgICAgICAgICB0aGF0LnVwZGF0ZShhY3Rpb24pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl92aWV3LmF0dGFjaChmdW5jdGlvbihhY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhhdC5fbGFzdFVwZGF0ZSA9ICdWSUVXJztcclxuICAgICAgICAgICAgdGhhdC51cGRhdGUoYWN0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLz8/P1xyXG4gICAgc2V0TGFzdFVwZGF0ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShvcHRpb25zPykge1xyXG5cclxuICAgICAgICBsZXQgbmV3T3B0aW9ucztcclxuICAgICAgICBsZXQgYWN0aW9uO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKCB0aGlzLl9sYXN0VXBkYXRlICkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSAnTkVXX09VVEVSX09QVElPTlMnOlxyXG5cclxuICAgICAgICAgICAgICAgIG5ld09wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl92aWV3LmdldE9wdGlvbnMoKSwgdGhpcy5fbW9kZWwuZ2V0T3B0aW9ucygpLCBvcHRpb25zKTsgXHJcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1NFVF9ORVdfT1BUSU9OUycsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA6IG5ld09wdGlvbnNcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb2RlbC51cGRhdGUoYWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBuZXdPcHRpb25zID0gT2JqZWN0LmFzc2lnbihuZXdPcHRpb25zLCB0aGlzLl9tb2RlbC5nZXRPcHRpb25zKCkpO1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uLm9wdGlvbnMgPSBuZXdPcHRpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXcudXBkYXRlKGFjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ01PREVMJzpcclxuXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKCB0aGlzLl9tb2RlbC5nZXRMYXN0VXBkYXRlKCkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ05FV19WQUxVRSc6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPcHRpb25zID0gdGhpcy5fbW9kZWwuZ2V0T3B0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1NFVF9ORVdfUE9TSVRJT04nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA6IG5ld09wdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdORVdfT1BUSU9OUyc6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fdmlldy5nZXRPcHRpb25zKCksIHRoaXMuX21vZGVsLmdldE9wdGlvbnMoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU0VUX05FV19PUFRJT05TJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgOiBuZXdPcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aWV3LnVwZGF0ZShhY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ1ZJRVcnOlxyXG5cclxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5fdmlldy5nZXRMYXN0VXBkYXRlKCkgPT0gJ05FV19QT1NJVElPTicgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB7cGVyY2VudCwgaW5kZXh9ID0gdGhpcy5fdmlldy5nZXROZXdJbmRlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW9kZWxPcHRpb25zID0gdGhpcy5fbW9kZWwuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZTogbnVtYmVyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IHBlcmNlbnQgKiAobW9kZWxPcHRpb25zLm1heCAtIG1vZGVsT3B0aW9ucy5taW4pIC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gIW1vZGVsT3B0aW9ucy5yZXZlcnNlID8gXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxPcHRpb25zLm1pbiArIG5ld1ZhbHVlIDpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbE9wdGlvbnMubWF4IC0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gZmluZENsb3Nlc3RTdGVwKG5ld1ZhbHVlLCBtb2RlbE9wdGlvbnMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoICFtb2RlbE9wdGlvbnMucmFuZ2UgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09wdGlvbnMgPSB7dmFsdWU6IG5ld1ZhbHVlfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzRmlyc3RJblJhbmdlOiBib29sZWFuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0SW5SYW5nZSA9IGluZGV4ID09IDAgJiYgIW1vZGVsT3B0aW9ucy5yZXZlcnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0SW5SYW5nZSA9IGlzRmlyc3RJblJhbmdlIHx8IGluZGV4ID09IDEgJiYgbW9kZWxPcHRpb25zLnJldmVyc2U7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaXJzdEluUmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gTWF0aC5taW4obmV3VmFsdWUsIG1vZGVsT3B0aW9ucy5yYW5nZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdPcHRpb25zID0ge3JhbmdlOiBbbmV3VmFsdWUsIG1vZGVsT3B0aW9ucy5yYW5nZVsxXV19XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBNYXRoLm1heChuZXdWYWx1ZSwgbW9kZWxPcHRpb25zLnJhbmdlWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld09wdGlvbnMgPSB7cmFuZ2U6IFttb2RlbE9wdGlvbnMucmFuZ2VbMF0sIG5ld1ZhbHVlXX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU0VUX05FV19WQUxVRScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IG5ld09wdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21vZGVsLnVwZGF0ZShhY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldE9wdGlvbnMoKTogSU9wdGlvbnMge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9tb2RlbC5nZXRPcHRpb25zKCksIHRoaXMuX3ZpZXcuZ2V0T3B0aW9ucygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2FybmluZ3MoKTogSVdhcm5pbmdzIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fbW9kZWwuZ2V0V2FybmluZ3MoKSwgdGhpcy5fdmlldy5nZXRXYXJuaW5ncygpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJlc2VudGVyOyIsImltcG9ydCB7IElPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG4vL2ltcG9ydCB7IElNb2RlbCwgSU1vZGVsT3B0aW9ucyB9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgeyBJU3ViamVjdCwgU3ViamVjdCwgSVN0b3JlLCBTdG9yZSB9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5pbXBvcnQgeyBpc051bWVyaWMsIGdldE51bWJlck9mU3RlcHMgfSBmcm9tICcuL2NvbW1vbkZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IHZhbGlkYXRlVmlldywgSVdhcm5pbmdzIH0gZnJvbSAnLi92YWxpZGF0aW9ucyc7XHJcblxyXG5cclxuaW50ZXJmYWNlIElWaWV3T3B0aW9ucyB7XHJcbiAgICBsZW5ndGg6IHN0cmluZztcclxuICAgIHZlcnRpY2FsOiBib29sZWFuO1xyXG4gICAgdG9vbHRpcDogYm9vbGVhbjtcclxuICAgIHNjYWxlOiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSVZpZXcgZXh0ZW5kcyBJU3RvcmUge1xyXG4gICAgdXBkYXRlKGNvbmZpZzogYW55KTogdm9pZDtcclxuXHJcbiAgICBnZXRPcHRpb25zKCk6IElWaWV3T3B0aW9ucztcclxuICAgIGdldFdhcm5pbmdzKCk6IElXYXJuaW5ncztcclxuICAgIC8vZ2V0TGFzdFVwZGF0ZSgpOiBzdHJpbmc7XHJcblxyXG4gICAgLy8g0JXQodCb0Jgg0JIg0JrQntCb0JHQrdCa0Jgg0J3QlSDQn9CV0KDQldCU0JDQriDQn9CQ0KDQkNCc0JXQotCg0KssINCi0J4g0J3Qo9CW0J3QniDQodCe0KXQoNCQ0J3QmNCi0Kwg0J3QntCS0KPQriDQn9Ce0JfQmNCm0JjQriBfbmV3SW5kZW50XHJcbiAgICBnZXROZXdJbmRlbnQoKTogYW55O1xyXG59XHJcblxyXG5jbGFzcyBWaWV3IGV4dGVuZHMgU3RvcmUgaW1wbGVtZW50cyBJVmlldyAge1xyXG4gICAgW3g6IHN0cmluZ106IGFueTtcclxuXHJcbiAgICBwcml2YXRlIF9sZW5ndGg6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3ZlcnRpY2FsOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX3NsaWRlcjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF90aHVtYj86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdGh1bWJGaXJzdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdGh1bWJMYXN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9iYXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcEZpcnN0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwTGFzdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGU/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVUaHVtYjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF93YXJuaW5nczogSVdhcm5pbmdzO1xyXG4gICAgLy9wcml2YXRlIF9sYXN0VXBkYXRlOiBzdHJpbmc7XHJcblxyXG4gICAgLy8gKlxyXG4gICAgcHJpdmF0ZSBfbmV3SW5kZW50OiBhbnk7XHJcblxyXG4gICAgLy9wcml2YXRlIF91cGRhdGU6IEZ1bmN0aW9uO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJT3B0aW9ucywgc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQsIHVwZGF0ZTogRnVuY3Rpb24pIHtcclxuXHJcbiAgICAgICAgc3VwZXIodXBkYXRlKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGUob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NsaWRlciA9IHNsaWRlck5vZGU7XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcicpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1aWxkKG9wdGlvbnMpXHJcblxyXG4gICAgICAgIC8vdGhpcy5fdXBkYXRlID0gdXBkYXRlO1xyXG4gICAgfVxyXG5cclxuLyogICAgIHVwZGF0ZShhY3Rpb24pIHtcclxuICAgICAgICB0aGlzLl91cGRhdGUoYWN0aW9uKTtcclxuICAgIH0gKi9cclxuXHJcblxyXG4gICAgcHVibGljIGdldE9wdGlvbnMoKTogSVZpZXdPcHRpb25zIHtcclxuICAgICAgICBsZXQgdG9vbHRpcCA9ICEhdGhpcy5fdG9vbHRpcCB8fCAhIXRoaXMuX3Rvb2x0aXBGaXJzdDtcclxuICAgICAgICBsZXQgc2NhbGUgPSAhIXRoaXMuX3NjYWxlO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsZW5ndGg6ICB0aGlzLl9sZW5ndGgsXHJcbiAgICAgICAgICAgIHZlcnRpY2FsOiB0aGlzLl92ZXJ0aWNhbCxcclxuICAgICAgICAgICAgdG9vbHRpcDogdG9vbHRpcCxcclxuICAgICAgICAgICAgc2NhbGU6IHNjYWxlICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRXYXJuaW5ncygpOiBJV2FybmluZ3Mge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl93YXJuaW5ncyk7XHJcbiAgICB9XHJcblxyXG4vKiAgICAgcHVibGljIGdldExhc3RVcGRhdGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdFVwZGF0ZTtcclxuICAgIH0gKi9cclxuXHJcbiAgICBnZXROZXdJbmRlbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25ld0luZGVudDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVUaHVtYkRvd24oZXZlbnQpOiB2b2lkIHtcclxuICAgICAgICAvLyDQv9GA0LXQtNC+0YLQstGA0LDRgtC40YLRjCDQt9Cw0L/Rg9GB0Log0LLRi9C00LXQu9C10L3QuNGPICjQtNC10LnRgdGC0LLQuNC1INCx0YDQsNGD0LfQtdGA0LApXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGh1bWIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZVRodW1iTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlVGh1bWJVcCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUaHVtYk1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVUaHVtYlVwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVRodW1iTW92ZShldmVudCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IHRoaXMuZ2V0TGVuZ3RoSW5QeCgpO1xyXG4gICAgICAgIGxldCBvZmZzZXQ6IG51bWJlciA9IHRoaXMuZ2V0T2Zmc2V0SW5QeCgpO1xyXG4gICAgICAgIGxldCBldmVudFBvczogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuZXdUaHVtYlBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXMpIHtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSAhdGhpcy5fdmVydGljYWwgPyBldmVudC50b3VjaGVzWzBdLmNsaWVudFggOiBldmVudC50b3VjaGVzWzBdLmNsaWVudFk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSAhdGhpcy5fdmVydGljYWwgPyBldmVudC5jbGllbnRYIDogZXZlbnQuY2xpZW50WTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5ld1RodW1iUG9zaXRpb24gPSAoZXZlbnRQb3MgLSBvZmZzZXQpIC8gbGVuZ3RoICogMTAwO1xyXG4gICAgICAgIGluZGV4ID0gdGhpcy5fYWN0aXZlVGh1bWIgPT0gdGhpcy5fdGh1bWJMYXN0ID8gMSA6IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX25ld0luZGVudCA9IHtcclxuICAgICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICAgIHBlcmNlbnQ6IG5ld1RodW1iUG9zaXRpb25cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZSA9ICdORVdfUE9TSVRJT04nO1xyXG4gICAgICAgIHRoaXMubm90aWZ5KCk7XHJcblxyXG4vKiAgICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgdHlwZTogJ05FV19WQUxVRV9JTl9QRVJDRU5UJyxcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICBwZXJjZW50OiBuZXdUaHVtYlBvc2l0aW9uXHJcbiAgICAgICAgfSk7ICovXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVTbGlkZXJDbGljayhldmVudCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IHRoaXMuZ2V0TGVuZ3RoSW5QeCgpO1xyXG4gICAgICAgIGxldCBvZmZzZXQ6IG51bWJlciA9IHRoaXMuZ2V0T2Zmc2V0SW5QeCgpO1xyXG4gICAgICAgIGxldCBldmVudFBvczogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuZXdUaHVtYlBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXMpIHtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSAhdGhpcy5fdmVydGljYWwgPyBldmVudC50b3VjaGVzWzBdLmNsaWVudFggOiBldmVudC50b3VjaGVzWzBdLmNsaWVudFk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSAhdGhpcy5fdmVydGljYWwgPyBldmVudC5jbGllbnRYIDogZXZlbnQuY2xpZW50WTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5ld1RodW1iUG9zaXRpb24gPSAoZXZlbnRQb3MgLSBvZmZzZXQpIC8gbGVuZ3RoICogMTAwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLl90aHVtYikge1xyXG4gICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHRvcExlZnQ6IHN0cmluZyA9ICF0aGlzLl92ZXJ0aWNhbCA/ICdsZWZ0JyA6ICd0b3AnO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZpcnN0VGh1bWJQb3M6IG51bWJlciA9IHBhcnNlSW50KCB0aGlzLl90aHVtYkZpcnN0LnN0eWxlW3RvcExlZnRdICk7XHJcbiAgICAgICAgICAgIGxldCBsYXN0VGh1bWJQb3M6IG51bWJlciA9IHBhcnNlSW50KCB0aGlzLl90aHVtYkxhc3Quc3R5bGVbdG9wTGVmdF0gKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpc0ZpcnN0Q2xvc2VyOiBib29sZWFuO1xyXG4gICAgICAgICAgICBpc0ZpcnN0Q2xvc2VyID0gTWF0aC5hYnMoZmlyc3RUaHVtYlBvcyAtIG5ld1RodW1iUG9zaXRpb24pIDwgTWF0aC5hYnMobGFzdFRodW1iUG9zIC0gbmV3VGh1bWJQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpbmRleCA9IGlzRmlyc3RDbG9zZXIgPyAwIDogMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX25ld0luZGVudCA9IHtcclxuICAgICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICAgIHBlcmNlbnQ6IG5ld1RodW1iUG9zaXRpb25cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2xhc3RVcGRhdGUgPSAnTkVXX1BPU0lUSU9OJztcclxuICAgICAgICB0aGlzLm5vdGlmeSgpO1xyXG5cclxuLyogICAgICAgICB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdORVdfVkFMVUVfSU5fUEVSQ0VOVCcsXHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgcGVyY2VudDogbmV3VGh1bWJQb3NpdGlvblxyXG4gICAgICAgIH0pOyAqL1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlVGh1bWJVcChldmVudCk6IHZvaWQge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZVRodW1iVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlVGh1bWJNb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlVGh1bWJVcCk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUaHVtYk1vdmUpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHVtYiA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCB2YWxpZExlbmd0aDogc3RyaW5nID0gdGhpcy5fbGVuZ3RoIHx8IGRlZmF1bHRPcHRpb25zLmxlbmd0aDtcclxuICAgICAgICB0aGlzLl9sZW5ndGggPSB0aGlzLmdldFZhbGlkTGVuZ3RoKG9wdGlvbnMubGVuZ3RoLCB2YWxpZExlbmd0aCk7XHJcblxyXG4gICAgICAgIGlmICggIW9wdGlvbnMudmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS53aWR0aCA9IHRoaXMuX2xlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaG9yaXpvbnRhbCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX3ZlcnRpY2FsJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fbGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX3ZlcnRpY2FsJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfaG9yaXpvbnRhbCcpOyAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2JhciA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fYmFyJyk7XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGRUaHVtYnMob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0QmFyUG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnRvb2x0aXAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRUb29sdGlwcyhvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnNjYWxlICkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkU2NhbGUob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVUaHVtYkRvd24gPSB0aGlzLmhhbmRsZVRodW1iRG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGh1bWJNb3ZlID0gdGhpcy5oYW5kbGVUaHVtYk1vdmUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVRodW1iVXAgPSB0aGlzLmhhbmRsZVRodW1iVXAuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVNsaWRlckNsaWNrID0gdGhpcy5oYW5kbGVTbGlkZXJDbGljay5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnJhbmdlICkge1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYi5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlVGh1bWJEb3duKTtcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5oYW5kbGVUaHVtYkRvd24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iRmlyc3QuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmhhbmRsZVRodW1iRG93bik7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iRmlyc3QuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5oYW5kbGVUaHVtYkRvd24pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJMYXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5oYW5kbGVUaHVtYkRvd24pO1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkxhc3QuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5oYW5kbGVUaHVtYkRvd24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZVNsaWRlckNsaWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYnVpbGQob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcHJldk9wdGlvbnM6IElWaWV3T3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgIT0gJ19zbGlkZXInKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHRoaXMucmVtb3ZlTm9kZSh0aGlzW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCB7fSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmJ1aWxkKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGUob3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3dhcm5pbmdzID0ge307XHJcbiAgICAgICAgdGhpcy5fd2FybmluZ3MgPSB2YWxpZGF0ZVZpZXcob3B0aW9ucyk7XHJcblxyXG4vKiAgICAgICAgIGlmICggT2JqZWN0LmtleXModGhpcy5fd2FybmluZ3MpLmxlbmd0aCAhPSAwICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHdhcm5pbmdzOiBJV2FybmluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl93YXJuaW5ncyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnV0FSTklOR1MnLFxyXG4gICAgICAgICAgICAgICAgd2FybmluZ3M6IHdhcm5pbmdzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSAqL1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRUaHVtYnMob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBpZiAoICFvcHRpb25zLnJhbmdlICkge1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYiA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWInKTtcclxuICAgICAgICB9IGVsc2UgeyAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iRmlyc3QgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iJywgJ3NsaWRlcl9fdGh1bWJfZmlyc3QnKTtcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJMYXN0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYicsICdzbGlkZXJfX3RodW1iX2xhc3QnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VGh1bWJzKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VGh1bWJzKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBvczogc3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnJhbmdlICkge1xyXG5cclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbihvcHRpb25zLnZhbHVlLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMuX3RodW1iLCBwb3MpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbnVtOiBudW1iZXI7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4IHJldmVyc2UsINGC0L4g0LvQtdCy0YvQuSDQsdC10LPRg9C90L7QuiAtINGN0YLQviDQsdC+0LvRjNGI0LXQtSDQt9C90LDRh9C10L3QuNC1XHJcbiAgICAgICAgICAgIC8vINGCLtC1LiByYW5nZVsxXVxyXG4gICAgICAgICAgICBudW0gPSAhb3B0aW9ucy5yZXZlcnNlID8gMCA6IDE7XHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24ob3B0aW9ucy5yYW5nZVtudW1dLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMuX3RodW1iRmlyc3QsIHBvcyk7XHJcblxyXG4gICAgICAgICAgICBudW0gPSBudW0gPT0gMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKG9wdGlvbnMucmFuZ2VbbnVtXSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbih0aGlzLl90aHVtYkxhc3QsIHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0QmFyUG9zaXRpb24oKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHN0YXJ0OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGxldCB0b3BMZWZ0OiBzdHJpbmcgPSAhdGhpcy5fdmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcclxuICAgICAgICBsZXQgd2lkdGhIZWlnaHQ6IHN0cmluZyA9ICF0aGlzLl92ZXJ0aWNhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcclxuXHJcbiAgICAgICAgc3RhcnQgPSB0aGlzLl90aHVtYkZpcnN0ID8gdGhpcy5fdGh1bWJGaXJzdC5zdHlsZVt0b3BMZWZ0XSA6ICcwJSc7XHJcbiAgICAgICAgbGVuZ3RoID0gdGhpcy5fdGh1bWJGaXJzdCA/IFxyXG4gICAgICAgIHRoaXMuX3RodW1iTGFzdC5zdHlsZVt0b3BMZWZ0XS5zbGljZSgwLCAtMSkgLSB0aGlzLl90aHVtYkZpcnN0LnN0eWxlW3RvcExlZnRdLnNsaWNlKDAsIC0xKSAgKyAnJScgOlxyXG4gICAgICAgIHRoaXMuX3RodW1iLnN0eWxlW3RvcExlZnRdO1xyXG5cclxuICAgICAgICB0aGlzLl9iYXIuc3R5bGVbdG9wTGVmdF0gPSBzdGFydDtcclxuICAgICAgICB0aGlzLl9iYXIuc3R5bGVbd2lkdGhIZWlnaHRdID0gbGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRUb29sdGlwcyhvcHRpb25zOiBJT3B0aW9ucyk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAoIW9wdGlvbnMucmFuZ2UpIHsgXHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl90aHVtYiwgJ3NsaWRlcl9fdG9vbHRpcCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBGaXJzdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3RodW1iRmlyc3QsICdzbGlkZXJfX3Rvb2x0aXAnLCAnc2xpZGVyX190b29sdGlwX2ZpcnN0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBMYXN0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5fdGh1bWJMYXN0LCAnc2xpZGVyX190b29sdGlwJywgJ3NsaWRlcl9fdG9vbHRpcF9sYXN0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFRvb2x0aXBWYWx1ZXMob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZFNjYWxlKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNjYWxlOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBsZXQgZGl2aXNpb246IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZztcclxuICAgICAgICBsZXQgaW5kZW50OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gb3B0aW9ucy5tYXggLSBvcHRpb25zLm1pbjtcclxuXHJcbiAgICAgICAgc2NhbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBzY2FsZS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3NjYWxlJyk7XHJcblxyXG4gICAgICAgIGZvciAoIGxldCBpOiBudW1iZXIgPSAwOyBpIDw9IGdldE51bWJlck9mU3RlcHMob3B0aW9ucy5taW4sIG9wdGlvbnMubWF4LCBvcHRpb25zLnN0ZXApOyBpKysgKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFvcHRpb25zLnJldmVyc2UgKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBvcHRpb25zLm1pbiArIG9wdGlvbnMuc3RlcCAqIGk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBNYXRoLm1pbih2YWwsIG9wdGlvbnMubWF4KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMubWF4IC0gb3B0aW9ucy5zdGVwICogaTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IE1hdGgubWF4KHZhbCwgb3B0aW9ucy5taW4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRlbnQgPSBpICogb3B0aW9ucy5zdGVwIDwgbGVuZ3RoID8gaSAqIG9wdGlvbnMuc3RlcCA6IGxlbmd0aDsgXHJcbiAgICAgICAgICAgIGluZGVudCA9IGluZGVudCAvIGxlbmd0aCAqIDEwMCArICclJztcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzID8gb3B0aW9ucy5jdXN0b21WYWx1ZXNbdmFsXSA6IHZhbDtcclxuXHJcbiAgICAgICAgICAgIGRpdmlzaW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUtZGl2aXNpb24nKTtcclxuICAgICAgICAgICAgZGl2aXNpb24uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwic2xpZGVyX19zY2FsZS1kaXZpc2lvbi10ZXh0XCI+JyArIHZhbCArICc8L3NwYW4+JztcclxuICAgICAgICAgICAgb3B0aW9ucy52ZXJ0aWNhbCA/IGRpdmlzaW9uLnN0eWxlLnRvcCA9IGluZGVudCA6IGRpdmlzaW9uLnN0eWxlLmxlZnQgPSBpbmRlbnQ7XHJcblxyXG4gICAgICAgICAgICBzY2FsZS5hcHBlbmQoZGl2aXNpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLnByZXBlbmQoc2NhbGUpOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFRvb2x0aXBWYWx1ZXMob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmICghb3B0aW9ucy5yYW5nZSkgeyBcclxuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMgPyBvcHRpb25zLmN1c3RvbVZhbHVlc1tvcHRpb25zLnZhbHVlXSA6IG9wdGlvbnMudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAudGV4dENvbnRlbnQgPSB2YWwgYXMgc3RyaW5nOyBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbnVtOiBudW1iZXI7XHJcbiAgICAgICAgICAgIG51bSA9ICFvcHRpb25zLnJldmVyc2UgPyAwIDogMTtcclxuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMgPyBvcHRpb25zLmN1c3RvbVZhbHVlc1tvcHRpb25zLnJhbmdlW251bV1dIDogb3B0aW9ucy5yYW5nZVtudW1dO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwRmlyc3QudGV4dENvbnRlbnQgPSB2YWwgYXMgc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgbnVtID0gbnVtID09IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMgPyBvcHRpb25zLmN1c3RvbVZhbHVlc1tvcHRpb25zLnJhbmdlW251bV1dIDogb3B0aW9ucy5yYW5nZVtudW1dO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwTGFzdC50ZXh0Q29udGVudCA9IHZhbCBhcyBzdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VGh1bWJQb3NpdGlvbih0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCBwb3NpdGlvbjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS50b3AgPSBudWxsO1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUubGVmdCA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS5sZWZ0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLnRvcCA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8geiBpbmRleFxyXG4gICAgICAgIGlmICggdGhpcy5fdGh1bWJGaXJzdCApIHtcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoICh0aGlzLl90aHVtYkZpcnN0LnN0eWxlLmxlZnQgPT0gJzEwMCUnKSB8fCAodGhpcy5fdGh1bWJGaXJzdC5zdHlsZS50b3AgPT0gJzEwMCUnKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90aHVtYkZpcnN0LnN0eWxlLnpJbmRleCA9ICcxJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGh1bWJGaXJzdC5zdHlsZS56SW5kZXggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kVGh1bWJQb3NpdGlvbih2YWx1ZTogbnVtYmVyLCBvcHRpb25zOiBJT3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHBvczogc3RyaW5nO1xyXG4gICAgICAgIHBvcyA9ICFvcHRpb25zLnJldmVyc2UgP1xyXG4gICAgICAgICh2YWx1ZSAtIG9wdGlvbnMubWluKSAvIChvcHRpb25zLm1heCAtIG9wdGlvbnMubWluKSAqIDEwMCArICclJyA6XHJcbiAgICAgICAgKG9wdGlvbnMubWF4IC0gdmFsdWUpIC8gKG9wdGlvbnMubWF4IC0gb3B0aW9ucy5taW4pICogMTAwICsgJyUnXHJcbiAgICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZU5vZGUobm9kZTogSFRNTERpdkVsZW1lbnQpOiB1bmRlZmluZWQge1xyXG4gICAgICAgIG5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkTm9kZShwYXJlbnROb2RlOiBIVE1MRGl2RWxlbWVudCwgLi4uY2xhc3Nlczogc3RyaW5nW10pOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IG5vZGU6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7ICAgICBcclxuXHJcbiAgICAgICAgZm9yICggbGV0IGk6IG51bWJlciA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZChhcmd1bWVudHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwYXJlbnROb2RlLmFwcGVuZChub2RlKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBnZXRWYWxpZExlbmd0aChzdHI6IGFueSwgdmFsaWRMZW5ndGg6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCB0eXBlb2YgKCcnICsgc3RyKSA9PSAnc3RyaW5nJyApIHtcclxuICAgICAgICAgICAgbGV0IHIgPSAoJycgKyBzdHIpLm1hdGNoKC9eXFxkezEsM31bLixdP1xcZCoocHh8ZW18cmVtfCV8dmh8dncpPyQvaSk7XHJcbiAgICAgICAgICAgIGlmICggciAmJiBpc051bWVyaWMoclswXSkgKSB7IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcsJywgJy4nKSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gclswXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJywnLCAnLicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkTGVuZ3RoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMZW5ndGhJblB4KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGxlbmd0aDogbnVtYmVyID0gIXRoaXMuX3ZlcnRpY2FsID9cclxuICAgICAgICB0aGlzLl9zbGlkZXIub2Zmc2V0V2lkdGggOlxyXG4gICAgICAgIHRoaXMuX3NsaWRlci5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgIHJldHVybiBsZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRPZmZzZXRJblB4KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyID0gIXRoaXMuX3ZlcnRpY2FsID9cclxuICAgICAgICB0aGlzLl9zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCA6XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBJVmlldywgSVZpZXdPcHRpb25zIH07XHJcbmV4cG9ydCBkZWZhdWx0IFZpZXc7IiwiaW1wb3J0IHsgSU1vZGVsT3B0aW9ucyB9IGZyb20gXCIuL01vZGVsXCI7XHJcblxyXG5mdW5jdGlvbiBpc051bWVyaWMobjogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmICFpc05hTihuIC0gMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlZXBFcXVhbChvYmoxLCBvYmoyKSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqMSk9PT1KU09OLnN0cmluZ2lmeShvYmoyKTtcclxuIH1cclxuXHJcbmZ1bmN0aW9uIGdldE51bWJlck9mU3RlcHMobWluOiBudW1iZXIsIG1heDogbnVtYmVyLCBzdGVwOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguY2VpbCgobWF4IC0gbWluKSAvIHN0ZXApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kQ2xvc2VzdFN0ZXAodmFsdWU6IG51bWJlciwgb3B0aW9uczogSU1vZGVsT3B0aW9ucyk6IG51bWJlciB7XHJcbiAgICBsZXQgc3RlcDogbnVtYmVyO1xyXG4gICAgbGV0IGNlaWxTdGVwczogbnVtYmVyO1xyXG4gICAgbGV0IHJlc3RPZlN0ZXA6IG51bWJlcjtcclxuXHJcbiAgICBpZiAoICFvcHRpb25zLnJldmVyc2UgKSB7XHJcbiAgICAgICAgY2VpbFN0ZXBzID0gTWF0aC50cnVuYyggKHZhbHVlIC0gb3B0aW9ucy5taW4pIC8gb3B0aW9ucy5zdGVwICk7XHJcbiAgICAgICAgcmVzdE9mU3RlcCA9ICh2YWx1ZSAtIG9wdGlvbnMubWluKSAlIG9wdGlvbnMuc3RlcDtcclxuICAgICAgICBzdGVwID0gb3B0aW9ucy5taW4gKyBjZWlsU3RlcHMgKiBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgc3RlcCA9IHJlc3RPZlN0ZXAgPj0gb3B0aW9ucy5zdGVwLzIgPyBzdGVwICsgb3B0aW9ucy5zdGVwIDogc3RlcDtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNlaWxTdGVwcyA9IE1hdGgudHJ1bmMoIChvcHRpb25zLm1heCAtIHZhbHVlKSAvIG9wdGlvbnMuc3RlcCApO1xyXG4gICAgICAgIHJlc3RPZlN0ZXAgPSAob3B0aW9ucy5tYXggLSB2YWx1ZSkgJSBvcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgc3RlcCA9IG9wdGlvbnMubWF4IC0gY2VpbFN0ZXBzICogb3B0aW9ucy5zdGVwO1xyXG4gICAgICAgIHN0ZXAgPSByZXN0T2ZTdGVwID49IG9wdGlvbnMuc3RlcC8yID8gc3RlcCAtIG9wdGlvbnMuc3RlcCA6IHN0ZXA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RlcCA9IHN0ZXAgPiBvcHRpb25zLm1heCA/IG9wdGlvbnMubWF4IDogc3RlcDtcclxuICAgIHN0ZXAgPSBzdGVwIDwgb3B0aW9ucy5taW4gPyBvcHRpb25zLm1pbiA6IHN0ZXA7XHJcblxyXG4gICAgcmV0dXJuIHN0ZXA7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGlzTnVtZXJpYywgZ2V0TnVtYmVyT2ZTdGVwcywgZGVlcEVxdWFsLCBmaW5kQ2xvc2VzdFN0ZXAgfTtcclxuXHJcbiIsImltcG9ydCB7IElNb2RlbE9wdGlvbnMgfSBmcm9tIFwiLi9Nb2RlbFwiO1xyXG5pbXBvcnQgeyBJVmlld09wdGlvbnMgfSBmcm9tIFwiLi9WaWV3XCI7XHJcblxyXG5pbnRlcmZhY2UgSU9wdGlvbnMgZXh0ZW5kcyBJTW9kZWxPcHRpb25zLCBJVmlld09wdGlvbnMge31cclxuXHJcbmxldCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMgPSB7XHJcbiAgICAvLyBNb2RlbCBvcHRpb25zXHJcbiAgICAvLyDQsiDQvdCw0YfQsNC70YzQvdGL0YUg0L3QsNGB0YLRgNC+0LnQutCw0YUg0L3QtSDQvtC/0YDQtdC00LXQu9C10L3RiyDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQuNC70Lgg0L/RgNC+0LzQtdC20YPRgtC+0LouXHJcbiAgICAvLyDQtdGB0LvQuCDQvtC90Lgg0L3QtSDRg9C60LDQt9Cw0L3RiyDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvCwg0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUgdmFsdWUgPT0gbWluIFxyXG4gICAgdmFsdWU6IG51bGwsXHJcbiAgICBtaW46IDAsXHJcbiAgICBtYXg6IDEwLFxyXG4gICAgc3RlcDogMSxcclxuICAgIHJldmVyc2U6IGZhbHNlLFxyXG4gICAgcmFuZ2U6IG51bGwsXHJcbiAgICBcclxuICAgIGxlbmd0aDogJzMwMHB4JyxcclxuICAgIHZlcnRpY2FsOiBmYWxzZSxcclxuICAgIHRvb2x0aXA6IGZhbHNlLFxyXG4gICAgc2NhbGU6IGZhbHNlLFxyXG59XHJcblxyXG5leHBvcnQgeyBJT3B0aW9ucyB9O1xyXG5leHBvcnQgeyBkZWZhdWx0T3B0aW9ucyB9O1xyXG4iLCJpbXBvcnQgTW9kZWwsIHsgSU1vZGVsIH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCBWaWV3LCB7IElWaWV3IH0gZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IFByZXNlbnRlciBmcm9tICcuL1ByZXNlbnRlcic7XHJcbmltcG9ydCB7IElPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJQ29uZmlnIH0gZnJvbSAnLi9PYnNlcnZlcic7XHJcbi8vaW1wb3J0IHsgSU91dGVyT2JzZXJ2ZXIsIE91dGVyT2JzZXJ2ZXIgfSBmcm9tICcuL09ic2VydmVyJztcclxuXHJcbihmdW5jdGlvbiAoJCkge1xyXG5cclxuICBpbnRlcmZhY2UgSU1ldGhvZHMge1xyXG4gICAgaW5pdChvcHRpb25zPzogSU9wdGlvbnMpOiB2b2lkO1xyXG4gICAgZ2V0RGF0YSgpOiBJT3B0aW9ucztcclxuICAgIHVwZGF0ZShvcHRpb25zOiBhbnkpOiB2b2lkO1xyXG4gICAgZGVzdHJveSgpOiB2b2lkO1xyXG4gICAgb2JzZXJ2ZShmdW5jOiBGdW5jdGlvbik6IHZvaWQ7XHJcbiAgfVxyXG5cclxuICB2YXIgbWV0aG9kczogSU1ldGhvZHMgPSB7XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKG9wdGlvbnM/OiBJT3B0aW9ucyk6IHZvaWQge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSAkdGhpcy5kYXRhKCdzbGlkZXJEYXRhJyk7XHJcbiAgICAgICAgbGV0IHNsaWRlciA9ICR0aGlzO1xyXG5cclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C70LDQs9C40L0g0LXRidGRINC90LUg0L/RgNC+0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNC9XHJcbiAgICAgICAgaWYgKCFkYXRhKSB7XHJcblxyXG4gICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgbGV0IHByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIob3B0aW9ucywgdGhpcyk7XHJcblxyXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJywge1xyXG4gICAgICAgICAgICBzbGlkZXI6IHNsaWRlcixcclxuICAgICAgICAgICAgcHJlc2VudGVyOiBwcmVzZW50ZXJcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXREYXRhOiBmdW5jdGlvbiAoKTogSU9wdGlvbnMge1xyXG4gICAgICByZXR1cm4gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykucHJlc2VudGVyLmdldERhdGEoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuXHJcbiAgICAgIGxldCBwcmVzZW50ZXIgPSAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnKS5wcmVzZW50ZXI7XHJcbiAgICAgIHByZXNlbnRlci5zZXRMYXN0VXBkYXRlKCdORVdfT1VURVJfT1BUSU9OUycpO1xyXG4gICAgICBwcmVzZW50ZXIudXBkYXRlKG9wdGlvbnMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKTogdm9pZCB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBkYXRhID0gJHRoaXMuZGF0YSgnc2xpZGVyRGF0YScpO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykudW5iaW5kKCcuc2xpZGVyJyk7XHJcbiAgICAgICAgZGF0YS5zbGlkZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgJHRoaXMucmVtb3ZlRGF0YSgnc2xpZGVyRGF0YScpO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgb2JzZXJ2ZTogZnVuY3Rpb24gKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG5cclxuICAgICAgbGV0IHByZXNlbnRlciA9ICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScpLnByZXNlbnRlcjtcclxuICAgICAgcHJlc2VudGVyLmF0dGFjaChjYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuLy8gPz8/Pz8/Pz8/Pz8/P1xyXG4gIGpRdWVyeS5mbi5zbGlkZXIgPSBmdW5jdGlvbiAobWV0aG9kOiBzdHJpbmcpOiBKUXVlcnkge1xyXG5cclxuICAgIC8vINC70L7Qs9C40LrQsCDQstGL0LfQvtCy0LAg0LzQtdGC0L7QtNCwXHJcbiAgICBpZiAobWV0aG9kc1ttZXRob2QgYXMgc3RyaW5nXSkge1xyXG5cclxuICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kIGFzIHN0cmluZ10uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XHJcblxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XHJcblxyXG4gICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJC5lcnJvcignTWV0aG9kIGNhbGxlZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBmb3IgSlF1ZXJ5LnNsaWRlcicpO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxufSkoalF1ZXJ5KTtcclxuXHJcblxyXG4vL2xldCB0ZXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlc3QnKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuXHJcblxyXG4vL2xldCBwcmVzID0gbmV3IFByZXNlbnRlcihkZWZhdWx0T3B0aW9ucywgdGVzdCk7XHJcblxyXG4vKiAkKCcudGVzdCcpLnNsaWRlcih7XHJcbiAgLy92YWx1ZTogMCxcclxuICAvL21pbjogLTcuNjY2NixcclxuICByYW5nZTogJ2hqaywnLFxyXG4gIC8vcmV2ZXJzZTogdHJ1ZSxcclxuICAvL2N1c3RvbVZhbHVlczogWydhJywgJ2InLCAnYycsICdkJ10sXHJcbiAgc3RlcDogJ2hnJyxcclxuICB2YWx1ZTogJ3Z4bnhtJyxcclxuICBtaW46ICdmZGd2aHhqaycsXHJcbiAgbWF4OiAxNy41LFxyXG4gIHRvb2x0aXA6IHRydWUsXHJcbiAgc2NhbGU6IHRydWVcclxufSk7XHJcblxyXG4kKCcudGVzdCcpLnNsaWRlcignb2JzZXJ2ZScsIGZ1bmN0aW9uKGNvbmZpZykge1xyXG4gIGlmIChjb25maWcub3B0aW9ucyAmJiBjb25maWcub3B0aW9ucy5yYW5nZSkge1xyXG4gICAgJCgnLmlucHV0JykudmFsKGNvbmZpZy5vcHRpb25zLnJhbmdlKTtcclxuICB9XHJcblxyXG4gIGlmIChjb25maWcudHlwZSA9PSAnV0FSTklOR1MnKSB7XHJcblxyXG4gICAgZm9yICggbGV0IGtleSBpbiBjb25maWcud2FybmluZ3MgKSB7XHJcbiAgICAgICQoJy53YXJzJykuYXBwZW5kKCc8cD4nICsgY29uZmlnLndhcm5pbmdzW2tleV0gKyAnPC9wPicpXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn0pXHJcblxyXG4kKCcudGVzdCcpLnNsaWRlcigndXBkYXRlJywge1xyXG4gIG1pbjogMjAsXHJcbiAgcmFuZ2U6IFszLCA3XSxcclxuICBtYXg6IC0zXHJcbn0pXHJcblxyXG5cclxuJCgnLnRlc3QnKS5zbGlkZXIoJ3VwZGF0ZScsIHtcclxuICBtaW46IC01LjgsXHJcbiAgcmFuZ2U6IFszLCA3LCAnZGd4ICcsIDVdLFxyXG4gIG1heDogJ3ZibidcclxufSkgKi9cclxuXHJcblxyXG5cclxuLyogbGV0IG1vZCA9IG5ldyBNb2RlbChkZWZhdWx0T3B0aW9ucyk7XHJcbmNvbnNvbGUubG9nKG1vZC5yZXZlcnNlKVxyXG5tb2QubWFrZUZ1bGxDaGFuZ2VzKHtyZXZlcnNlOiB0cnVlfSlcclxuY29uc29sZS5sb2cobW9kLnJldmVyc2UpXHJcbm1vZC5tYWtlRnVsbENoYW5nZXMoe3JldmVyc2U6IGZhbHNlfSlcclxuY29uc29sZS5sb2cobW9kLnJldmVyc2UpICovIiwiaW1wb3J0IHsgSU1vZGVsT3B0aW9ucyB9IGZyb20gXCIuL01vZGVsXCI7XHJcbmltcG9ydCB7IGlzTnVtZXJpYyB9IGZyb20gXCIuL2NvbW1vbkZ1bmN0aW9uc1wiO1xyXG5cclxuaW50ZXJmYWNlIElXYXJuaW5ncyB7XHJcbiAgICB2YWx1ZXNBcmVOb3ROdW1iZXJzPzogc3RyaW5nLFxyXG4gICAgdmFsdWVzQXJlTm90SW50ZWdlcj86IHN0cmluZyxcclxuICAgIG1pbklzT3Zlck1heD86IHN0cmluZyxcclxuICAgIG1pbklzRXF1YWxUb01heD86IHN0cmluZyxcclxuICAgIHdyb25nUmFuZ2VMZW5ndGg/OiBzdHJpbmcsXHJcbiAgICB3cm9uZ09yZGVySW5SYW5nZT86IHN0cmluZyxcclxuICAgIHRvb0JpZ1N0ZXA/OiBzdHJpbmcsXHJcbiAgICBzdGVwSXNOdWxsPzogc3RyaW5nLFxyXG4gICAgcmV2ZXJzZUlzTm90Qm9vbGVhbj86IHN0cmluZyxcclxuICAgIGN1c3RvbVZhbHVlc0lzTm90QXJyYXk/OiBzdHJpbmcsXHJcbiAgICBjdXN0b21WYWx1ZXNJc1Rvb1NtYWxsPyA6IHN0cmluZyxcclxuXHJcbiAgICBpbnZhbGlkTGVuZ3RoPzogc3RyaW5nLFxyXG4gICAgdmVydGljYWxJc05vdEJvb2xlYW4/OiBzdHJpbmcsXHJcbiAgICB0b29sdGlwSXNOb3RCb29sZWFuPzogc3RyaW5nLFxyXG4gICAgc2NhbGVJc05vdEJvb2xlYW4/OiBzdHJpbmcsXHJcbn1cclxuXHJcbmxldCB3YXJuaW5nczogSVdhcm5pbmdzID0ge1xyXG4gICAgdmFsdWVzQXJlTm90TnVtYmVyczogJ0FsbCB2YWx1ZXMsIGluc3RlYWQgb2YgY3VzdG9tVmFsdWVzLCBzaG91bGQgYmUgbnVtYmVycycsXHJcbiAgICB2YWx1ZXNBcmVOb3RJbnRlZ2VyOiAnQWxsIHZhbHVlcywgaW5zdGVhZCBvZiBjdXN0b21WYWx1ZXMsIHNob3VsZCBiZSBpbnRlZ2VyJyxcclxuICAgIG1pbklzT3Zlck1heDogJ01pbiB2YWx1ZSBzaG91bGQgYmUgbGVzcyB0aGVuIG1heCB2YWx1ZScsXHJcbiAgICBtaW5Jc0VxdWFsVG9NYXg6ICdNaW4gdmFsdWUgY2FudCBiZSBlcXVhbCB0byBtYXggdmFsdWUnLFxyXG4gICAgd3JvbmdSYW5nZUxlbmd0aDogJ1JhbmdlIHNob3VsZCBjb250YWluIHR3byB2YWx1ZXMnLFxyXG4gICAgd3JvbmdPcmRlckluUmFuZ2U6ICdUaGUgZmlyc3QgbnVtYmVyIGluIHJhbmdlIHNob3VsZCBiZSBsZXNzIHRoZW4gc2Vjb25kJyxcclxuICAgIHRvb0JpZ1N0ZXA6ICdTdGVwIHNob3VsZCBiZSBsZXNzIHRoZW4gZGlmZmVyZW5jZSBvZiBtYXggYW5kIG1pbiB2YWx1ZXMnLFxyXG4gICAgc3RlcElzTnVsbDogJ1N0ZXAgY2FudCBiZSBlcXVhbCB0byAwJyxcclxuICAgIHJldmVyc2VJc05vdEJvb2xlYW46ICdPcHRpb24gcmV2ZXJzZSBzaG91bGQgYmUgdHJ1ZSBvciBmYWxzZScsXHJcbiAgICBjdXN0b21WYWx1ZXNJc05vdEFycmF5OiAnQ3VzdG9tVmFsdWVzIHNob3VsZCBiZSBhcnJheScsXHJcbiAgICBjdXN0b21WYWx1ZXNJc1Rvb1NtYWxsOiAnQ3VzdG9tVmFsdWVzIHNob3VsZCBjb250YWluIGF0IGxlYXN0IHR3byB2YWx1ZXMnLFxyXG5cclxuICAgIGludmFsaWRMZW5ndGg6ICdMZW5ndGggc2hvdWxkIGJlIHZhbGlkIHRvIENTUycsXHJcbiAgICB2ZXJ0aWNhbElzTm90Qm9vbGVhbjogJ09wdGlvbiB2ZXJ0aWNhbCBzaG91bGQgYmUgdHJ1ZSBvciBmYWxzZScsXHJcbiAgICB0b29sdGlwSXNOb3RCb29sZWFuOiAnT3B0aW9uIHRvb2x0aXAgc2hvdWxkIGJlIHRydWUgb3IgZmFsc2UnLFxyXG4gICAgc2NhbGVJc05vdEJvb2xlYW46ICdPcHRpb24gc2NhbGUgc2hvdWxkIGJlIHRydWUgb3IgZmFsc2UnLFxyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGVsKG9wdGlvbnM6IElNb2RlbE9wdGlvbnMpOiBJV2FybmluZ3Mge1xyXG5cclxuICAgIGxldCB3YXJuczogSVdhcm5pbmdzID0ge307XHJcblxyXG4gICAgbGV0IG51bWJlcnM6IG51bWJlcltdID0gW29wdGlvbnMubWluLCBvcHRpb25zLm1heCwgb3B0aW9ucy5zdGVwXTtcclxuICAgIGlmIChvcHRpb25zLnJhbmdlKSB7XHJcbiAgICAgICAgbnVtYmVycy5wdXNoKG9wdGlvbnMucmFuZ2VbMF0sIG9wdGlvbnMucmFuZ2VbMV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBudW1iZXJzLnB1c2gob3B0aW9ucy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmICggIXZhbGlkYXRlTnVtYmVycyhudW1iZXJzKSApIHsgXHJcbiAgICAgICAgd2FybnMudmFsdWVzQXJlTm90TnVtYmVycyA9IHdhcm5pbmdzLnZhbHVlc0FyZU5vdE51bWJlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCAhdmFsaWRhdGVJbnRlZ2VycyhudW1iZXJzKSApIHtcclxuICAgICAgICB3YXJucy52YWx1ZXNBcmVOb3RJbnRlZ2VyID0gd2FybmluZ3MudmFsdWVzQXJlTm90SW50ZWdlcjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIG9wdGlvbnMubWluID4gb3B0aW9ucy5tYXggKSB7XHJcbiAgICAgICAgd2FybnMubWluSXNPdmVyTWF4ID0gd2FybmluZ3MubWluSXNPdmVyTWF4O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggb3B0aW9ucy5taW4gPT0gb3B0aW9ucy5tYXggKSB7XHJcbiAgICAgICAgd2FybnMubWluSXNFcXVhbFRvTWF4ID0gd2FybmluZ3MubWluSXNFcXVhbFRvTWF4O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICBpZiAoICFBcnJheS5pc0FycmF5KG9wdGlvbnMucmFuZ2UpIHx8IG9wdGlvbnMucmFuZ2UubGVuZ3RoICE9IDIgKSB7XHJcbiAgICAgICAgICAgIHdhcm5zLndyb25nUmFuZ2VMZW5ndGggPSB3YXJuaW5ncy53cm9uZ1JhbmdlTGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhd2FybnMud3JvbmdSYW5nZUxlbmd0aCAmJiBvcHRpb25zLnJhbmdlWzBdID4gb3B0aW9ucy5yYW5nZVsxXSApIHtcclxuICAgICAgICAgICAgd2FybnMud3JvbmdPcmRlckluUmFuZ2UgPSB3YXJuaW5ncy53cm9uZ09yZGVySW5SYW5nZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCBNYXRoLmFicyhvcHRpb25zLm1heCAtIG9wdGlvbnMubWluKSA8IE1hdGguYWJzKG9wdGlvbnMuc3RlcCkgKSB7XHJcbiAgICAgICAgd2FybnMudG9vQmlnU3RlcCA9IHdhcm5pbmdzLnRvb0JpZ1N0ZXA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICggb3B0aW9ucy5zdGVwID09IDAgKSB7XHJcbiAgICAgICAgd2FybnMuc3RlcElzTnVsbCA9IHdhcm5pbmdzLnN0ZXBJc051bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCB0eXBlb2Ygb3B0aW9ucy5yZXZlcnNlICE9ICdib29sZWFuJyApIHtcclxuICAgICAgICB3YXJucy5yZXZlcnNlSXNOb3RCb29sZWFuID0gd2FybmluZ3MucmV2ZXJzZUlzTm90Qm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIG9wdGlvbnMuY3VzdG9tVmFsdWVzICkge1xyXG4gICAgICAgIGlmICggIUFycmF5LmlzQXJyYXkob3B0aW9ucy5jdXN0b21WYWx1ZXMpICkge1xyXG4gICAgICAgICAgICB3YXJucy5jdXN0b21WYWx1ZXNJc05vdEFycmF5ID0gd2FybmluZ3MuY3VzdG9tVmFsdWVzSXNOb3RBcnJheTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggIXdhcm5zLmN1c3RvbVZhbHVlc0lzTm90QXJyYXkgJiYgb3B0aW9ucy5jdXN0b21WYWx1ZXMubGVuZ3RoIDwgMiApIHtcclxuICAgICAgICAgICAgd2FybnMuY3VzdG9tVmFsdWVzSXNUb29TbWFsbCA9IHdhcm5pbmdzLmN1c3RvbVZhbHVlc0lzVG9vU21hbGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB3YXJucztcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVOdW1iZXJzKG51bWJlcnM6IG51bWJlcltdKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBudW1iZXJzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkgeyBcclxuICAgICAgICBpZiggIWlzTnVtZXJpYyhpdGVtKSApIHsgXHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpc1ZhbGlkO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUludGVnZXJzKG51bWJlcnM6IG51bWJlcltdKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBudW1iZXJzLmZvckVhY2goZnVuY3Rpb24obnVtKSB7XHJcbiAgICAgICAgaWYgKCBudW0gJSAxICE9IDAgKSB7IFxyXG4gICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXNWYWxpZDtcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVWaWV3KG9wdGlvbnMpOiBJV2FybmluZ3Mge1xyXG4gICAgbGV0IHdhcm5zOiBJV2FybmluZ3MgPSB7fTtcclxuXHJcbiAgICBpZiAoICFvcHRpb25zLmxlbmd0aC5tYXRjaCgvXlxcZHsxLDN9Wy4sXT9cXGQqKHB4fGVtfHJlbXwlfHZofHZ3KT8kL2kpICkge1xyXG4gICAgICAgIHdhcm5zLmludmFsaWRMZW5ndGggPSB3YXJuaW5ncy5pbnZhbGlkTGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggdHlwZW9mIG9wdGlvbnMudmVydGljYWwgIT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgIHdhcm5zLnZlcnRpY2FsSXNOb3RCb29sZWFuID0gd2FybmluZ3MudmVydGljYWxJc05vdEJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCB0eXBlb2Ygb3B0aW9ucy50b29sdGlwICE9ICdib29sZWFuJyApIHtcclxuICAgICAgICB3YXJucy50b29sdGlwSXNOb3RCb29sZWFuID0gd2FybmluZ3MudG9vbHRpcElzTm90Qm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIHR5cGVvZiBvcHRpb25zLnNjYWxlICE9ICdib29sZWFuJyApIHtcclxuICAgICAgICB3YXJucy5zY2FsZUlzTm90Qm9vbGVhbiA9IHdhcm5pbmdzLnNjYWxlSXNOb3RCb29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB3YXJucztcclxufVxyXG5cclxuZXhwb3J0IHsgdmFsaWRhdGVNb2RlbCwgdmFsaWRhdGVWaWV3LCBJV2FybmluZ3MgfSJdLCJzb3VyY2VSb290IjoiIn0=