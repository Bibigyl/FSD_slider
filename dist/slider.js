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

Object.defineProperty(exports, "__esModule", { value: true });
var defaultOptions_1 = __webpack_require__(/*! ./defaultOptions */ "./src/defaultOptions.ts");
var Model = (function () {
    function Model(allOptions) {
        var options = allOptions;
        options.initialVal = options.initialVal ? options.initialVal : options.minVal;
        var validOptions;
        if (options.dataFormat == 'numeric') {
            validOptions = this.numericFormatValidation(options, defaultOptions_1.defaultOptions);
        }
        else if (options.dataFormat == 'date') {
            this._options = Object.assign({}, allOptions);
            validOptions = this.dateFormatValidation(options, defaultOptions_1.defaultOptions);
        }
        else if (options.dataFormat == 'custom') {
            validOptions = this.customFormatValidation(options, defaultOptions_1.defaultOptions);
            validOptions.customValues = options.customValues;
        }
        else {
            throw new Error('Unknown format of data');
        }
        this._dataFormat = validOptions.dataFormat;
        this._val = validOptions.initialVal;
        this._minVal = validOptions.minVal;
        this._maxVal = validOptions.maxVal;
        this._step = validOptions.step;
        this._reverse = validOptions.reverse;
        this._range = validOptions.range;
        this._customValues = validOptions.customValues;
        if (this._dataFormat != 'date')
            this._options = validOptions;
    }
    Model.prototype.getVal = function () {
        return this._val;
    };
    Model.prototype.setVal = function (newVal) {
        this.areNumeric(newVal);
        this.oneValueValidation(this._minVal, this._maxVal, newVal, this._step);
        this._val = newVal;
    };
    Model.prototype.getRange = function () {
        return this._range;
    };
    Model.prototype.setRange = function (newRange) {
        this.areNumeric(newRange[0], newRange[1]);
        this.rangeValidation(this._minVal, this._maxVal, newRange, this._step);
        if (this.minMaxValidation(newRange[0], newRange[1], this._reverse)) {
            this._range = newRange;
        }
        else {
            this._range = [newRange[1], newRange[0]];
        }
        this._range = newRange;
    };
    Model.prototype.getStep = function () {
        return this._step;
    };
    Model.prototype.getMinVal = function () {
        return this._minVal;
    };
    Model.prototype.getMaxVal = function () {
        return this._maxVal;
    };
    Model.prototype.getReverse = function () {
        return this._reverse;
    };
    Model.prototype.getCustomValues = function () {
        if (this._customValues) {
            return this._customValues;
        }
        else {
            return undefined;
        }
    };
    Model.prototype.getDataFormat = function () {
        return this._dataFormat;
    };
    Model.prototype.getOptions = function () {
        var opts = this._options;
        if (!this._range) {
            var val = void 0;
            if (this._dataFormat == 'date') {
                val = this.translate(this._val);
                val = ('0' + val.getDate()).slice(-2) +
                    '/' + ('0' + (1 + val.getMonth())).slice(-2) +
                    '/' + (val.getFullYear());
            }
            else {
                val = this._val;
            }
            opts.initialVal = val;
            opts.range = null;
        }
        else {
            var val = void 0;
            var arr = [null, null];
            if (this._dataFormat != 'date') {
                arr = this._range;
            }
            if (this._dataFormat == 'date') {
                val = this.translate(this._range[0]);
                val = ('0' + val.getDate()).slice(-2) +
                    '/' + ('0' + (1 + val.getMonth())).slice(-2) +
                    '/' + val.getFullYear();
                arr[0] = val;
                val = this.translate(this._range[1]);
                val = ('0' + val.getDate()).slice(-2) +
                    '/' + ('0' + (1 + val.getMonth())).slice(-2) +
                    '/' + val.getFullYear();
                arr[1] = val;
            }
            opts.initialVal = null;
            opts.range = arr;
        }
        return opts;
    };
    Model.prototype.findPositionInArr = function (val, arr) {
        if (arr && arr.indexOf(val) != -1) {
            return arr.indexOf(val);
        }
        else if (arr && arr.indexOf(val) == -1) {
            throw new Error('Cant find value in array');
        }
        if (!this._customValues) {
            return val;
        }
        if (this._customValues.indexOf(val) != -1) {
            return this._customValues.indexOf(val);
        }
        else {
            throw new Error('Not valid value for custom values');
        }
    };
    Model.prototype.getStepNumber = function (val) {
        var stepNum;
        var n = Math.max(this.decimalPlaces(this._step), this.decimalPlaces(this._minVal));
        var a = +(val - this._minVal).toFixed(n);
        var b = +(this._maxVal - this._minVal).toFixed(n);
        stepNum = +(a * this.numberOfSteps() / b).toFixed();
        stepNum = Math.abs(stepNum);
        return stepNum;
    };
    Model.prototype.translateByStep = function (step) {
        if (this._dataFormat == 'custom') {
            if (!this._reverse) {
                return this._customValues[step];
            }
            else {
                return this._customValues[this._customValues.length - step - 1];
            }
        }
        else {
            var n = Math.max(this.decimalPlaces(this._step), this.decimalPlaces(this._minVal));
            var r = !this._reverse ? 1 : -1;
            var val = +((+this._minVal) + (+this._step) * (+step) * (+r)).toFixed(n);
            if (this._dataFormat == 'date') {
                return new Date(val);
            }
            else {
                return val;
            }
        }
    };
    Model.prototype.translate = function (val) {
        if (this._dataFormat == 'custom') {
            return this._customValues[val];
        }
        else if (this._dataFormat == 'date') {
            return new Date(val);
        }
        else {
            return val;
        }
    };
    Model.prototype.numberOfSteps = function () {
        var n = Math.max(this.decimalPlaces(this._step), this.decimalPlaces(this._minVal));
        n = Math.pow(10, n);
        return (Math.abs(this._maxVal - this._minVal) * n) / (this._step * n);
    };
    Model.prototype.change = function (newOptions) {
        var prevOptions = this._options;
        var options = Object.assign({}, prevOptions, newOptions);
        options.initialVal = options.initialVal != null ? options.initialVal : options.minVal;
        var validOptions;
        if (options.dataFormat == 'numeric') {
            validOptions = this.numericFormatValidation(options, prevOptions);
        }
        else if (options.dataFormat == 'date') {
            validOptions = this.dateFormatValidation(options, prevOptions);
            this._options = Object.assign({}, prevOptions, newOptions);
        }
        else if (options.dataFormat == 'custom') {
            validOptions = this.customFormatValidation(options, prevOptions);
            validOptions.customValues = options.customValues;
        }
        else {
            throw new Error('Unknown format of data');
        }
        this._dataFormat = validOptions.dataFormat;
        this._val = validOptions.initialVal;
        this._minVal = validOptions.minVal;
        this._maxVal = validOptions.maxVal;
        this._step = validOptions.step;
        this._reverse = validOptions.reverse;
        this._range = validOptions.range;
        this._customValues = validOptions.customValues;
        if (this._dataFormat != 'date')
            this._options = validOptions;
    };
    Model.prototype.numericFormatValidation = function (allOptions, defaultOptions) {
        var options = allOptions;
        var newOptions = {
            dataFormat: 'numeric',
            initialVal: defaultOptions.minVal,
            minVal: defaultOptions.minVal,
            maxVal: defaultOptions.maxVal,
            step: defaultOptions.step,
            reverse: defaultOptions.reverse,
            range: defaultOptions.range,
        };
        this.areNumeric(options.maxVal, options.minVal, options.step);
        newOptions.step = Math.abs(options.step);
        newOptions.reverse = options.reverse ? true : false;
        newOptions.dataFormat = options.dataFormat;
        this.stepValidation(options.minVal, options.maxVal, newOptions.step);
        if (this.minMaxValidation(options.minVal, options.maxVal, newOptions.reverse)) {
            newOptions.minVal = options.minVal;
            newOptions.maxVal = options.maxVal;
        }
        else {
            newOptions.minVal = options.maxVal;
            newOptions.maxVal = options.minVal;
        }
        if (options.range) {
            this.rangeValidation(newOptions.minVal, newOptions.maxVal, options.range, newOptions.step);
            if (this.minMaxValidation(options.range[0], options.range[1], newOptions.reverse)) {
                newOptions.range = options.range;
            }
            else {
                newOptions.range = [options.range[1], options.range[0]];
            }
            newOptions.initialVal = null;
        }
        else {
            this.areNumeric(options.initialVal);
            this.oneValueValidation(newOptions.minVal, newOptions.maxVal, options.initialVal, newOptions.step);
            newOptions.initialVal = options.initialVal;
            newOptions.range = null;
        }
        return newOptions;
    };
    Model.prototype.dateFormatValidation = function (allOptions, defaultOptions) {
        var options = allOptions;
        this.customDateValidation(options.minVal, options.maxVal);
        options.minVal = this.translateDateToNumber(options.minVal);
        options.maxVal = this.translateDateToNumber(options.maxVal);
        options.step = this.tranlateStepToDateFormat(options.step);
        if (Array.isArray(options.range) && options.range.length == 2) {
            this.customDateValidation(options.range[0], options.range[1]);
            options.range[0] = this.translateDateToNumber(options.range[0]);
            options.range[1] = this.translateDateToNumber(options.range[1]);
        }
        else {
            this.customDateValidation(options.initialVal);
            options.initialVal = this.translateDateToNumber(options.initialVal);
        }
        return this.numericFormatValidation(options, defaultOptions);
    };
    Model.prototype.customFormatValidation = function (allOptions, defaultOptions) {
        var options = allOptions;
        if (!options.customValues) {
            throw new Error('customValues is required option for custom format');
        }
        else if (!Array.isArray(options.customValues) || options.customValues.length < 2) {
            throw new Error('customValues should be a range with two or more items, like [1, 2, "a"]');
        }
        options.minVal = 0;
        options.maxVal = options.customValues.length - 1;
        options.step = 1;
        if (options.rangeNumInCustomValues || options.rangeInCustomValues) {
            if (Array.isArray(options.rangeNumInCustomValues) && options.rangeNumInCustomValues.length == 2) {
                options.range = [];
                options.range[0] = options.rangeNumInCustomValues[0];
                options.range[1] = options.rangeNumInCustomValues[1];
            }
            else if (Array.isArray(options.rangeInCustomValues) && options.rangeInCustomValues.length == 2) {
                options.range = [];
                options.range[0] = this.findPositionInArr(options.rangeInCustomValues[0], options.customValues);
                options.range[1] = this.findPositionInArr(options.rangeInCustomValues[1], options.customValues);
            }
        }
        else {
            if (options.initialValNumInCustomValues) {
                options.range = null;
                options.initialVal = options.initialValNumInCustomValues;
            }
            else if (options.initialValInCustomValues) {
                options.range = null;
                options.initialVal = this.findPositionInArr(options.initialValInCustomValues, options.customValues);
            }
        }
        return this.numericFormatValidation(options, defaultOptions);
    };
    Model.prototype.areNumeric = function () {
        var vals = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vals[_i] = arguments[_i];
        }
        for (var _a = 0, vals_1 = vals; _a < vals_1.length; _a++) {
            var val = vals_1[_a];
            if (!this.isNumeric(val)) {
                throw new Error('All values in numeric format should be numbers');
            }
        }
        return true;
    };
    Model.prototype.minMaxValidation = function (minVal, maxVal, reverse) {
        if (!reverse && (minVal >= maxVal)) {
            return false;
        }
        else if (reverse && (minVal <= maxVal)) {
            return false;
        }
        else {
            return true;
        }
    };
    Model.prototype.stepValidation = function (minVal, maxVal, step) {
        if (!this.isNumeric(step)) {
            throw new Error('Step should be a number');
        }
        if (step == 0) {
            throw new Error('Step cant be equal to 0');
        }
        var n = Math.max(this.decimalPlaces(this._step), this.decimalPlaces(this._minVal));
        var test = +(maxVal - minVal).toFixed(n);
        test = (test * Math.pow(10, n)) / (step * Math.pow(10, n));
        test = Math.abs(test);
        if (test % 1 != 0) {
            throw new Error('(Max value - min value) divided by step should return integer');
        }
        return true;
    };
    Model.prototype.oneValueValidation = function (minVal, maxVal, val, step) {
        var n = Math.max(this.decimalPlaces(step), this.decimalPlaces(minVal));
        var test = +(val - minVal).toFixed(n);
        test = (test * Math.pow(10, n)) / (step * Math.pow(10, n));
        test = Math.abs(test);
        if (Math.max(minVal, maxVal) < val || Math.min(minVal, maxVal) > val) {
            throw new Error('The initial value should be within min and max values');
        }
        if (test % 1 != 0) {
            throw new Error('Value should be set on step');
        }
        return true;
    };
    Model.prototype.rangeValidation = function (minVal, maxVal, range, step) {
        var n = Math.max(this.decimalPlaces(this._step), this.decimalPlaces(this._minVal));
        var testLeft = (range[0] - minVal) / step;
        testLeft = +testLeft.toFixed(n);
        testLeft = Math.abs(testLeft);
        var testRight = (range[1] - minVal) / step;
        testRight = +testRight.toFixed(n);
        testRight = Math.abs(testRight);
        if (range.length != 2) {
            throw new Error('Range should contain two values');
        }
        if (!this.isNumeric(range[0]) || !this.isNumeric(range[1])) {
            throw new Error('Values in range should be numbers');
        }
        if (Math.max(minVal, maxVal) < Math.max(range[0], range[1]) || Math.min(minVal, maxVal) > Math.min(range[0], range[1])) {
            throw new Error('The range should be within min and max values');
        }
        if (testLeft % 1 != 0 || testRight % 1 != 0) {
            throw new Error('The range should be set on step');
        }
        return true;
    };
    Model.prototype.customDateValidation = function () {
        var vals = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vals[_i] = arguments[_i];
        }
        for (var _a = 0, vals_2 = vals; _a < vals_2.length; _a++) {
            var val = vals_2[_a];
            if (!('' + val).match(/^\d{2}[.\/-]\d{2}[.\/-]\d{4}$/)) {
                throw new Error('All values in date format should be dates, like dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy');
            }
        }
        return true;
    };
    Model.prototype.translateDateToNumber = function (str) {
        var arr = str.split(str[2]);
        var date = new Date(+arr[2], +arr[1] - 1, +arr[0]);
        if (+arr[0] > 31 || +arr[1] > 12) {
            console.warn('Use dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy for dates');
        }
        if (!date) {
            throw new Error('Incorrect date, try dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy');
        }
        return +date;
    };
    Model.prototype.tranlateStepToDateFormat = function (step) {
        if (!this.isNumeric(step) || step % 1 != 0) {
            throw new Error('Step in date format should be integer');
        }
        return step * 24 * 3600 * 1000;
    };
    Model.prototype.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    };
    Model.prototype.decimalPlaces = function (num) {
        return ~(num + '').indexOf('.') ? (num + '').split('.')[1].length : 0;
    };
    return Model;
}());
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
    function Subject(val) {
        this.observers = [];
        this.val = val;
    }
    Subject.prototype.attach = function (observer) {
        this.observers.push(observer);
    };
    Subject.prototype.detach = function (observer) {
        var observerIndex = this.observers.indexOf(observer);
        this.observers.splice(observerIndex, 1);
    };
    Subject.prototype.notify = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this);
        }
    };
    return Subject;
}());
exports.default = Subject;
var Observer = (function () {
    function Observer(func) {
        this.func = func;
    }
    Observer.prototype.update = function (subject) {
        this.func(subject.val);
    };
    return Observer;
}());
exports.Observer = Observer;


/***/ }),

/***/ "./src/Presenter.ts":
/*!**************************!*\
  !*** ./src/Presenter.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Presenter = (function () {
    function Presenter(model, view, subject) {
        this._model = model;
        this._view = view;
        this._subject = subject;
        this.thumbOnMouseDown = this.thumbOnMouseDown.bind(this);
        this.thumbOnMouseMove = this.thumbOnMouseMove.bind(this);
        this.thumbOnMouseUp = this.thumbOnMouseUp.bind(this);
        this.sliderOnMouseClick = this.sliderOnMouseClick.bind(this);
        if (!model.getRange()) {
            this._view.getThumb().addEventListener("mousedown", this.thumbOnMouseDown);
        }
        else {
            view.getThumb(1).addEventListener("mousedown", this.thumbOnMouseDown);
            view.getThumb(2).addEventListener("mousedown", this.thumbOnMouseDown);
        }
        view.getSlider().addEventListener("click", this.sliderOnMouseClick);
    }
    Presenter.prototype.thumbOnMouseDown = function (event) {
        event.preventDefault();
        this._activeThumb = event.currentTarget;
        document.addEventListener('mousemove', this.thumbOnMouseMove);
        document.addEventListener('mouseup', this.thumbOnMouseUp);
    };
    Presenter.prototype.thumbOnMouseMove = function (event) {
        var model = this._model;
        var view = this._view;
        var sliderNode = this._view.getSlider();
        var minVal = this._model.getMinVal();
        var maxVal = this._model.getMaxVal();
        var step = this._model.getStep();
        var reverse = !this._model.getReverse() ? 1 : -1;
        var sliderLenght = this._view.getLenght();
        var stepLenght = this._view.oneStepLenght();
        var sliderBorder;
        var eventPos;
        var thumbPosition;
        var leftPoint;
        var rightPoint;
        var newVal;
        if (!view.getVertical()) {
            sliderBorder = (sliderNode.offsetWidth - sliderLenght) / 2;
            eventPos = event.clientX;
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().left - sliderBorder;
        }
        else {
            sliderBorder = (sliderNode.offsetHeight - sliderLenght) / 2;
            eventPos = event.clientY;
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().top - sliderBorder;
        }
        newVal = Math.round(thumbPosition / stepLenght);
        if (model.getRange()) {
            if (this._activeThumb.classList.contains('slider__thumb_right')) {
                leftPoint = (model.getRange()[0] - minVal) * reverse / step;
                leftPoint = leftPoint * stepLenght;
                rightPoint = sliderLenght;
                minVal = model.getRange()[0];
            }
            else {
                rightPoint = (model.getRange()[1] - minVal) * reverse / step;
                rightPoint = rightPoint * stepLenght;
                leftPoint = 0;
                maxVal = model.getRange()[1];
            }
        }
        else {
            leftPoint = 0;
            rightPoint = sliderLenght;
        }
        if (thumbPosition <= leftPoint) {
            thumbPosition = leftPoint;
            newVal = minVal;
        }
        else if (thumbPosition >= rightPoint) {
            thumbPosition = rightPoint;
            newVal = maxVal;
        }
        else {
            thumbPosition = newVal * stepLenght;
            var f = function (x) { return ((x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0)); };
            var n = f(step) + f(minVal);
            newVal = (newVal * Math.pow(10, n) * step * reverse) / Math.pow(10, n);
            n = Math.max(f(step), f(minVal));
            newVal = +((+newVal).toFixed(n));
            newVal = (+model.getMinVal()) + (+newVal);
            newVal = +((+newVal).toFixed(n));
        }
        if (model.getRange() && this._activeThumb.classList.contains('slider__thumb_left')) {
            model.setRange([newVal, model.getRange()[1]]);
        }
        else if (model.getRange() && this._activeThumb.classList.contains('slider__thumb_right')) {
            model.setRange([model.getRange()[0], newVal]);
        }
        else {
            model.setVal(newVal);
        }
        view.setThumbPosition(this._activeThumb, thumbPosition);
        if (view.getTooltip() || view.getTooltip(1)) {
            var val = void 0;
            val = model.translate(newVal);
            view.setValToTooltip(this._activeThumb.querySelector('.slider__tooltip'), val, view.getTooltipMask());
        }
    };
    Presenter.prototype.thumbOnMouseUp = function (event) {
        document.removeEventListener('mouseup', this.thumbOnMouseUp);
        document.removeEventListener('mousemove', this.thumbOnMouseMove);
        this._activeThumb = undefined;
        var model = this._model;
        if (model.getVal() != null) {
            var val = void 0;
            val = model.translate(model.getVal());
            this._subject.val = val;
        }
        else {
            var val = void 0;
            this._subject.val = [];
            val = model.translate(model.getRange()[0]);
            this._subject.val[0] = val;
            val = model.translate(model.getRange()[1]);
            this._subject.val[1] = val;
        }
        this._subject.notify();
    };
    Presenter.prototype.sliderOnMouseClick = function (event) {
        var model = this._model;
        var view = this._view;
        var sliderNode = this._view.getSlider();
        var changingThumb;
        var minVal = this._model.getMinVal();
        var maxVal = this._model.getMaxVal();
        var step = this._model.getStep();
        var reverse = !this._model.getReverse() ? 1 : -1;
        var sliderLenght = this._view.getLenght();
        var stepLenght = this._view.oneStepLenght();
        var sliderBorder;
        var eventPos;
        var thumbPosition;
        var leftPoint;
        var rightPoint;
        var newVal;
        if (!this._view.getVertical()) {
            sliderBorder = (sliderNode.offsetWidth - sliderLenght) / 2;
            eventPos = event.clientX;
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().left - sliderBorder;
        }
        else {
            sliderBorder = (sliderNode.offsetHeight - sliderLenght) / 2;
            eventPos = event.clientY;
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().top - sliderBorder;
        }
        newVal = Math.round(thumbPosition / stepLenght);
        leftPoint = 0;
        rightPoint = sliderLenght;
        if (thumbPosition <= leftPoint) {
            thumbPosition = leftPoint;
            newVal = minVal;
        }
        else if (thumbPosition >= rightPoint) {
            thumbPosition = rightPoint;
            newVal = maxVal;
        }
        else {
            thumbPosition = newVal * stepLenght;
            var f = function (x) { return ((x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0)); };
            var n = f(step) + f(minVal);
            newVal = (newVal * Math.pow(10, n) * step * reverse) / Math.pow(10, n);
            n = Math.max(f(step), f(minVal));
            newVal = +((+newVal).toFixed(n));
            newVal = (+model.getMinVal()) + (+newVal);
            newVal = +((+newVal).toFixed(n));
        }
        if (!model.getRange()) {
            model.setVal(newVal);
            changingThumb = view.getThumb();
            view.setThumbPosition(changingThumb, thumbPosition);
        }
        else {
            if (Math.abs(newVal - model.getRange()[0]) < Math.abs(newVal - model.getRange()[1])) {
                model.setRange([newVal, model.getRange()[1]]);
                changingThumb = view.getThumb(1);
                view.setThumbPosition(changingThumb, thumbPosition);
            }
            else {
                model.setRange([model.getRange()[0], newVal]);
                changingThumb = view.getThumb(2);
                view.setThumbPosition(changingThumb, thumbPosition);
            }
        }
        if (view.getTooltip() || view.getTooltip(1)) {
            var val = void 0;
            val = model.translate(newVal);
            view.setValToTooltip(changingThumb.querySelector('.slider__tooltip'), val, view.getTooltipMask());
        }
        if (model.getVal() != null) {
            var val = void 0;
            val = model.translate(model.getVal());
            this._subject.val = val;
        }
        else {
            var val = void 0;
            this._subject.val = [];
            val = model.translate(model.getRange()[0]);
            this._subject.val[0] = val;
            val = model.translate(model.getRange()[1]);
            this._subject.val[1] = val;
        }
        this._subject.notify();
    };
    Presenter.prototype.change = function (options) {
        var model = this._model;
        var view = this._view;
        console.log('111111   ' + model.getOptions().range);
        var changeThumbPosition = false;
        var changeTooltipVal = false;
        var changeScaleDivision = false;
        var changeValToRange = false;
        var changeRangeToVal = false;
        var rebuildScale = false;
        var rebuildTooltip = false;
        var modelOptions = ['dataFormat', 'initialVal', 'minVal', 'maxVal', 'step', 'reverse', 'range', 'customValues', 'initialValInCustomValues', 'initialValNumInCustomValues', 'rangeInCustomValues', 'rangeNumInCustomValues'];
        var test = false;
        modelOptions.forEach(function (item) {
            if (options.hasOwnProperty(item)) {
                test = true;
                return;
            }
        });
        if (test) {
            var prevNumOfSteps = model.numberOfSteps();
            var prevOptions = model.getOptions();
            var newOptions = Object.assign({}, prevOptions, options);
            model.change(newOptions);
            view.setNumberOfSteps(model.numberOfSteps());
            view.setScaleStep(view.scaleStepValidation(model, view.getScaleStep()));
            changeThumbPosition = true;
            changeTooltipVal = true;
            changeScaleDivision = true;
            if (prevNumOfSteps != model.numberOfSteps()) {
                rebuildScale = true;
            }
            if (view.getRange() && !model.getRange()) {
                changeRangeToVal = true;
                rebuildTooltip = true;
            }
            if (!view.getRange() && model.getRange()) {
                changeValToRange = true;
                rebuildTooltip = true;
            }
        }
        if (options.hasOwnProperty('vertical') || options.hasOwnProperty('length')) {
            view.changeSliderBase(options);
            changeThumbPosition = true;
            changeScaleDivision = true;
        }
        if (changeRangeToVal) {
            view.changeRangeToVal(model);
            view.getThumb().addEventListener("mousedown", this.thumbOnMouseDown);
        }
        if (changeValToRange) {
            view.changeValToRange(model);
            view.getThumb(1).addEventListener("mousedown", this.thumbOnMouseDown);
            view.getThumb(2).addEventListener("mousedown", this.thumbOnMouseDown);
        }
        if (options.hasOwnProperty('scaleStep') && options.scaleStep != view.getScaleStep()) {
            view.setScaleStep(view.scaleStepValidation(model, options.scaleStep));
            rebuildScale = true;
            changeScaleDivision = true;
        }
        if (options.hasOwnProperty('scaleMask') && options.scaleMask != view.getScaleMask()) {
            view.setScaleMask(options.scaleMask);
            changeScaleDivision = true;
        }
        if (options.hasOwnProperty('scale') && options.scale == false && view.getScale()) {
            view.setScale(view.removeNode(view.getScale()));
            changeScaleDivision = false;
            rebuildScale = false;
        }
        if (options.hasOwnProperty('scale') && options.scale == true && !view.getScale()) {
            var scale = void 0;
            scale = view.buildScale(view.getSlider(), view.getScaleStep(), model, view.getScaleMask());
            view.setScale(scale);
            rebuildScale = false;
            changeScaleDivision = false;
        }
        if (rebuildScale && view.getScale()) {
            view.rebuildScale(model);
            changeScaleDivision = true;
        }
        if (changeScaleDivision && view.getScale()) {
            view.changeScaleDivision(model);
        }
        if (options.hasOwnProperty('tooltipMask') && options.tooltipMask != view.getTooltipMask()) {
            view.setTooltipMask(options.tooltipMask);
            changeTooltipVal = true;
        }
        if (!view.getTooltip() && !view.getTooltip(1) && !options.hasOwnProperty('tooltip')) {
            rebuildTooltip = false;
            changeTooltipVal = false;
        }
        if (options.tooltip == false || rebuildTooltip) {
            if (view.getTooltip(2))
                view.setTooltip(view.removeNode(view.getTooltip(2)), 2);
            if (view.getTooltip(1))
                view.setTooltip(view.removeNode(view.getTooltip(1)), 1);
            if (view.getTooltip())
                view.setTooltip(view.removeNode(view.getTooltip(0)), 0);
            if (options.tooltip == false) {
                rebuildTooltip = false;
            }
            changeTooltipVal = false;
        }
        if (options.tooltip || rebuildTooltip) {
            view.buildValidTooltips(model);
            changeTooltipVal = false;
        }
        if (changeTooltipVal && (view.getTooltip() || view.getTooltip(1))) {
            var val = void 0;
            if (!model.getRange()) {
                val = model.translate(model.getVal());
                view.setValToTooltip(view.getTooltip(), val, view.getTooltipMask());
            }
            else {
                val = model.translate(model.getRange()[0]);
                view.setValToTooltip(view.getTooltip(1), val, view.getTooltipMask());
                val = model.translate(model.getRange()[1]);
                view.setValToTooltip(view.getTooltip(2), val, view.getTooltipMask());
            }
        }
        if (changeThumbPosition) {
            var pos = void 0;
            if (!model.getRange()) {
                pos = view.findThumbPosition(model.getStepNumber(model.getVal()), model.numberOfSteps());
                view.setThumbPosition(view.getThumb(), pos);
            }
            else {
                pos = view.findThumbPosition(model.getStepNumber(model.getRange()[0]), model.numberOfSteps());
                view.setThumbPosition(view.getThumb(1), pos);
                pos = view.findThumbPosition(model.getStepNumber(model.getRange()[1]), model.numberOfSteps());
                view.setThumbPosition(view.getThumb(2), pos);
            }
            if (model.getVal() != null) {
                var val = void 0;
                val = model.translate(model.getVal());
                this._subject.val = val;
            }
            else {
                var val = void 0;
                this._subject.val = [];
                val = model.translate(model.getRange()[0]);
                this._subject.val[0] = val;
                val = model.translate(model.getRange()[1]);
                this._subject.val[1] = val;
            }
            this._subject.notify();
        }
    };
    return Presenter;
}());
exports.default = Presenter;


/***/ }),

/***/ "./src/View.ts":
/*!*********************!*\
  !*** ./src/View.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var View = (function () {
    function View(model, options, sliderNode) {
        this._slider = sliderNode;
        this._slider.classList.add('slider');
        this._range = model.getRange() ? true : false;
        this._numberOfSteps = model.numberOfSteps();
        this._lenght = this.lengthValidation(options.length);
        if (!options.vertical) {
            this._vertical = false;
            this._slider.style.width = this._lenght;
            this._slider.classList.add('slider_horizontal');
        }
        else {
            this._vertical = true;
            this._slider.style.height = this._lenght;
            this._slider.classList.add('slider_vertical');
        }
        var pos;
        if (!this._range) {
            this._thumb = this.buildThumb(this._slider);
            pos = this.findThumbPosition(model.getStepNumber(model.getVal()), model.numberOfSteps());
            this.setThumbPosition(this._thumb, pos);
        }
        else {
            this._thumbLeft = this.buildThumb(this._slider, 'slider__thumb_left');
            pos = this.findThumbPosition(model.getStepNumber(model.getRange()[0]), model.numberOfSteps());
            this.setThumbPosition(this._thumbLeft, pos);
            this._thumbRight = this.buildThumb(this._slider, 'slider__thumb_right');
            pos = this.findThumbPosition(model.getStepNumber(model.getRange()[1]), model.numberOfSteps());
            this.setThumbPosition(this._thumbRight, pos);
        }
        this._tooltipMask = options.tooltipMask;
        if (options.tooltip) {
            this.buildValidTooltips(model);
        }
        this._scaleMask = options.scaleMask;
        var step;
        if (options.scaleStep) {
            step = this.scaleStepValidation(model, options.scaleStep);
        }
        else {
            step = model.getStep();
        }
        this._scaleStep = step;
        if (options.scale) {
            this._scale = this.buildScale(this._slider, step, model, this._scaleMask);
        }
    }
    View.prototype.getLenght = function () {
        if (!this._vertical) {
            return this._slider.clientWidth;
        }
        else {
            return this._slider.clientHeight;
        }
    };
    View.prototype.getVertical = function () {
        return this._vertical;
    };
    View.prototype.getRange = function () {
        return this._range;
    };
    View.prototype.getTooltipMask = function () {
        return this._tooltipMask;
    };
    View.prototype.setTooltipMask = function (mask) {
        this._tooltipMask = mask;
    };
    View.prototype.getScaleStep = function () {
        return this._scaleStep;
    };
    View.prototype.setScaleStep = function (step) {
        this._scaleStep = step;
    };
    View.prototype.getScaleMask = function () {
        return this._scaleMask;
    };
    View.prototype.setScaleMask = function (mask) {
        this._scaleMask = mask;
    };
    View.prototype.getNumberOfSteps = function () {
        return this._numberOfSteps;
    };
    ;
    View.prototype.setNumberOfSteps = function (num) {
        this._numberOfSteps = num;
    };
    ;
    View.prototype.getSlider = function () {
        return this._slider;
    };
    View.prototype.getThumb = function (num) {
        if (num === void 0) { num = 0; }
        if (num == 0) {
            return this._thumb;
        }
        if (num == 1) {
            return this._thumbLeft;
        }
        if (num == 2) {
            return this._thumbRight;
        }
        return this._thumb;
    };
    View.prototype.getTooltip = function (num) {
        if (num === void 0) { num = 0; }
        if (this._tooltip || this._tooltipLeft) {
            if (this._tooltip && num == 0) {
                return this._tooltip;
            }
            if (this._tooltipLeft && num == 1) {
                return this._tooltipLeft;
            }
            if (this._tooltipRight && num == 2) {
                return this._tooltipRight;
            }
        }
        else {
            return undefined;
        }
    };
    View.prototype.setTooltip = function (tooltip, num) {
        if (num === void 0) { num = 0; }
        if (num == 0) {
            this._tooltip = tooltip;
        }
        else if (num == 1) {
            this._tooltipLeft = tooltip;
        }
        else if (num == 2) {
            this._tooltipRight = tooltip;
        }
    };
    View.prototype.getScale = function () {
        return this._scale;
    };
    View.prototype.setScale = function (scale) {
        this._scale = scale;
    };
    View.prototype.changeSliderBase = function (options) {
        var lenghtChanged = false;
        if (options.length && this._lenght != options.length) {
            this._lenght = options.length;
            lenghtChanged = true;
        }
        if (options.vertical && !this._vertical) {
            this._vertical = true;
            this._slider.classList.remove('slider_horizontal');
            this._slider.classList.add('slider_vertical');
            lenghtChanged = true;
        }
        if (options.vertical === false && this._vertical) {
            this._vertical = false;
            this._slider.classList.remove('slider_vertical');
            this._slider.classList.add('slider_horizontal');
            lenghtChanged = true;
        }
        if (lenghtChanged && !this._vertical) {
            this._slider.style.height = null;
            this._slider.style.width = this._lenght;
        }
        if (lenghtChanged && this._vertical) {
            this._slider.style.width = null;
            this._slider.style.height = this._lenght;
        }
    };
    View.prototype.changeRangeToVal = function (model) {
        var pos;
        this._thumbLeft = this.removeNode(this._thumbLeft);
        this._thumbRight = this.removeNode(this._thumbRight);
        this._thumb = this.buildThumb(this._slider);
        pos = this.findThumbPosition(model.getStepNumber(model.getVal()), model.numberOfSteps());
        this.setThumbPosition(this._thumb, pos);
        this._range = false;
    };
    View.prototype.changeValToRange = function (model) {
        var pos;
        this._thumb = this.removeNode(this._thumb);
        this._thumbLeft = this.buildThumb(this._slider, 'slider__thumb_left');
        pos = this.findThumbPosition(model.getStepNumber(model.getRange()[0]), model.numberOfSteps());
        this.setThumbPosition(this._thumbLeft, pos);
        this._thumbRight = this.buildThumb(this._slider, 'slider__thumb_right');
        pos = this.findThumbPosition(model.getStepNumber(model.getRange()[1]), model.numberOfSteps());
        this.setThumbPosition(this._thumbRight, pos);
        this._range = true;
    };
    View.prototype.buildValidTooltips = function (model) {
        var val;
        if (!this._range) {
            if (this._tooltip)
                this._tooltip = this.removeNode(this._tooltip);
            val = model.translate(model.getVal());
            this._tooltip = this.buildTooltip(this._thumb);
            this.setValToTooltip(this._tooltip, val, this._tooltipMask);
        }
        else {
            if (this._tooltipLeft)
                this._tooltipLeft = this.removeNode(this._tooltipLeft);
            val = model.translate(model.getRange()[0]);
            this._tooltipLeft = this.buildTooltip(this._thumbLeft, 'slider__tooltip_left');
            this.setValToTooltip(this._tooltipLeft, val, this._tooltipMask);
            if (this._tooltipRight)
                this._tooltipRight = this.removeNode(this._tooltipRight);
            val = model.translate(model.getRange()[1]);
            this._tooltipRight = this.buildTooltip(this._thumbRight, 'slider__tooltip_right');
            this.setValToTooltip(this._tooltipRight, val, this._tooltipMask);
        }
    };
    View.prototype.buildScale = function (sliderNode, step, model, mask) {
        var scale = document.createElement('div');
        var division;
        var val;
        scale.classList.add('slider__scale');
        sliderNode.prepend(scale);
        var n = Math.max(this.decimalPlaces(step), this.decimalPlaces(model.getStep()));
        var mult = step / model.getStep();
        mult = +(+mult).toFixed(n);
        mult = Math.abs(mult);
        for (var i = 0; i <= model.numberOfSteps(); i = i + mult) {
            val = model.translateByStep(i);
            division = document.createElement('div');
            division.classList.add('slider__scale-division');
            division.innerHTML = '<span>' + eval(mask) + '</span>';
            if (!this._vertical) {
                division.style.left = this.oneStepLenght() * i + 'px';
            }
            else {
                division.style.top = this.oneStepLenght() * i + 'px';
            }
            scale.append(division);
        }
        return scale;
    };
    View.prototype.rebuildScale = function (model) {
        var scale = this.getScale();
        var prevNumOfSteps = scale.querySelectorAll('.slider__scale-division').length - 1;
        var newNumOfSteps;
        var division;
        var n = Math.max(this.decimalPlaces(this._scaleStep), this.decimalPlaces(model.getStep()));
        var mult = this._scaleStep / model.getStep();
        mult = +mult.toFixed(n);
        mult = Math.abs(mult);
        newNumOfSteps = model.numberOfSteps() / mult;
        if (prevNumOfSteps > newNumOfSteps) {
            for (var i = 0; i < (prevNumOfSteps - newNumOfSteps); i++) {
                scale.lastChild.remove();
            }
        }
        if (prevNumOfSteps < newNumOfSteps) {
            for (var i = 0; i < (newNumOfSteps - prevNumOfSteps); i++) {
                division = document.createElement('div');
                division.classList.add('slider__scale-division');
                division.innerHTML = '<span></span>';
                scale.append(division);
            }
        }
    };
    View.prototype.changeScaleDivision = function (model) {
        var division;
        var val;
        var mask = this._scaleMask;
        var n = Math.max(this.decimalPlaces(this._scaleStep), this.decimalPlaces(model.getStep()));
        var mult = this._scaleStep / model.getStep();
        mult = +mult.toFixed(n);
        mult = Math.abs(mult);
        for (var i = 0; i <= model.numberOfSteps(); i = i + mult) {
            val = model.translateByStep(i);
            division = this.getScale().querySelectorAll('.slider__scale-division')[i / mult];
            division.querySelector('span').textContent = '' + eval(mask);
            if (!this._vertical) {
                division.style.top = null;
                division.style.left = this.oneStepLenght() * i + 'px';
            }
            else {
                division.style.left = null;
                division.style.top = this.oneStepLenght() * i + 'px';
            }
        }
    };
    View.prototype.setThumbPosition = function (thumbNode, thumbPosition) {
        if (!this._vertical) {
            thumbNode.style.top = null;
            thumbNode.style.left = thumbPosition - thumbNode.offsetWidth / 2 + 'px';
        }
        else {
            thumbNode.style.left = null;
            thumbNode.style.top = thumbPosition - thumbNode.offsetWidth / 2 + 'px';
        }
        if (this.getThumb(1)) {
            if (!this._vertical) {
                if ((this.getThumb(1).style.left == (this.getLenght() - this.getThumb(1).clientWidth / 2) + 'px')) {
                    this.getThumb(1).style.zIndex = '100';
                }
                else {
                    this.getThumb(1).style.zIndex = null;
                }
            }
            else {
                if ((this.getThumb(1).style.top == (this.getLenght() - this.getThumb(1).clientHeight / 2) + 'px')) {
                    this.getThumb(1).style.zIndex = '100';
                }
                else {
                    this.getThumb(1).style.zIndex = null;
                }
            }
        }
    };
    View.prototype.setValToTooltip = function (tooltipNode, val, mask) {
        if (mask === void 0) { mask = 'val'; }
        tooltipNode.textContent = eval(mask);
    };
    View.prototype.findThumbPosition = function (newStep, numOfSteps) {
        return this.getLenght() / numOfSteps * newStep;
    };
    View.prototype.oneStepLenght = function () {
        return this.getLenght() / this._numberOfSteps;
    };
    View.prototype.removeNode = function (node) {
        node.remove();
        return undefined;
    };
    View.prototype.scaleStepValidation = function (model, step) {
        var stepIsValid;
        var test;
        var n = Math.max(this.decimalPlaces(step), this.decimalPlaces(model.getStep()));
        stepIsValid = this.isNumeric(step);
        if (model.getDataFormat() == 'date' && (step % (24 * 3600 * 1000) != 0)) {
            step = step * 24 * 3600 * 1000;
        }
        test = (step * Math.pow(10, n)) / (model.getStep() * Math.pow(10, n));
        test = Math.abs(test);
        stepIsValid = stepIsValid && (test % 1 == 0);
        test = +(model.getMaxVal() - model.getMinVal()).toFixed(n);
        test = (test * Math.pow(10, n)) / (step * Math.pow(10, n));
        test = Math.abs(test);
        stepIsValid = stepIsValid && (test % 1 == 0);
        step = stepIsValid ? step : model.getStep();
        return step;
    };
    View.prototype.buildThumb = function (sliderNode, thumbClass) {
        var thumb = document.createElement('div');
        thumb.classList.add('slider__thumb');
        thumbClass ? thumb.classList.add(thumbClass) : false;
        sliderNode.append(thumb);
        return thumb;
    };
    View.prototype.buildTooltip = function (thumbNode, tooltipClass) {
        var tooltip = document.createElement('div');
        tooltip.classList.add('slider__tooltip');
        tooltipClass ? tooltip.classList.add(tooltipClass) : false;
        thumbNode.append(tooltip);
        return tooltip;
    };
    View.prototype.lengthValidation = function (str) {
        if (true) {
            var r = ('' + str).match(/^\d{1,3}[.,]?\d*(px|em|rem|%)?$/i);
            if (r && this.isNumeric(r[0])) {
                return r[0].toLowerCase().replace(',', '.') + 'px';
            }
            else if (r) {
                return r[0].toLowerCase().replace(',', '.');
            }
        }
        throw new Error('Width (or height) should be valid to css');
    };
    View.prototype.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    };
    View.prototype.decimalPlaces = function (num) {
        return ~(num + '').indexOf('.') ? (num + '').split('.')[1].length : 0;
    };
    return View;
}());
exports.default = View;


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
    dataFormat: 'numeric',
    initialVal: null,
    minVal: 0,
    maxVal: 10,
    step: 1,
    reverse: false,
    range: null,
    length: '300px',
    vertical: false,
    tooltip: false,
    tooltipMask: "val",
    scale: false,
    scaleStep: null,
    scaleMask: "val",
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
var Model_1 = __webpack_require__(/*! ./Model */ "./src/Model.ts");
var View_1 = __webpack_require__(/*! ./View */ "./src/View.ts");
var Presenter_1 = __webpack_require__(/*! ./Presenter */ "./src/Presenter.ts");
var defaultOptions_1 = __webpack_require__(/*! ./defaultOptions */ "./src/defaultOptions.ts");
var Observer_1 = __webpack_require__(/*! ./Observer */ "./src/Observer.ts");
var Observer_2 = __webpack_require__(/*! ./Observer */ "./src/Observer.ts");
(function ($) {
    var methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('sliderData');
                var slider = $this;
                if (!data) {
                    options = $.extend({}, defaultOptions_1.defaultOptions, options);
                    var model = new Model_1.default(options);
                    var view = new View_1.default(model, options, this);
                    var val = void 0;
                    val = model.getVal() || model.getRange();
                    var subject = new Observer_2.default(val);
                    var presenter = new Presenter_1.default(model, view, subject);
                    $(this).data('sliderData', {
                        slider: slider,
                        model: model,
                        view: view,
                        presenter: presenter,
                        subject: subject
                    });
                }
            });
        },
        test: function (content) {
            console.log('its test:  ' + content);
        },
        change: function (options) {
            return this.each(function () {
                var presenter = $(this).data('sliderData').presenter;
                presenter.change(options);
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
            var subject = $(this).data('sliderData').subject;
            var observer = new Observer_1.Observer(func);
            subject.attach(observer);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0T3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDhGQUE0RDtBQTRDNUQ7SUFZSSxlQUFZLFVBQW9CO1FBRTVCLElBQUksT0FBTyxHQUFhLFVBQVUsQ0FBQztRQUluQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FB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QUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxNQUFNO1FBR2pDLElBQUssT0FBTyxDQUFDLE1BQWdCLENBQUMsRUFBRztZQUMvQixPQUFPLE9BQU8sQ0FBRSxNQUFnQixDQUFFLENBQUMsS0FBSyxDQUFFLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUUsU0FBUyxFQUFFLENBQUMsQ0FBRSxDQUFDLENBQUM7U0FDN0Y7YUFBTSxJQUFLLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFFLE1BQU0sRUFBRztZQUluRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFFLElBQUksRUFBRSxTQUFTLENBQUUsQ0FBQztTQUM5QzthQUFNO1lBQ0wsQ0FBQyxDQUFDLEtBQUssQ0FBRSxnQkFBZ0IsR0FBSSxNQUFNLEdBQUcsbUNBQW1DLENBQUUsQ0FBQztTQUM3RTtJQUVILENBQUMsQ0FBQztBQUVKLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwiZmlsZSI6InNsaWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IElPcHRpb25zLCB7IGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNb2RlbCB7XHJcbiAgICAvLyAxXHJcbiAgICBnZXRWYWwoKTogbnVtYmVyO1xyXG4gICAgc2V0VmFsKG5ld1ZhbDogbnVtYmVyKTogdm9pZDtcclxuICAgIC8vIDJcclxuICAgIGdldFJhbmdlKCk6IFtudW1iZXIsIG51bWJlcl07XHJcbiAgICBzZXRSYW5nZShuZXdSYW5nZTogW251bWJlciwgbnVtYmVyXSk6IHZvaWQ7XHJcbiAgICAvLyAzXHJcbiAgICBnZXRTdGVwKCk6IG51bWJlcjtcclxuICAgIC8vIDRcclxuICAgIGdldE1pblZhbCgpOiBudW1iZXI7XHJcbiAgICAvLyA1XHJcbiAgICBnZXRNYXhWYWwoKTogbnVtYmVyO1xyXG4gICAgLy8gNlxyXG4gICAgZ2V0UmV2ZXJzZSgpOiBib29sZWFuO1xyXG4gICAgLy8gN1xyXG4gICAgZ2V0Q3VzdG9tVmFsdWVzKCk6IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xyXG4gICAgLy8gOFxyXG4gICAgZ2V0RGF0YUZvcm1hdCgpOiBzdHJpbmc7XHJcbiAgICAvLyA5XHJcbiAgICBnZXRPcHRpb25zKCk6IElNb2RlbE9wdGlvbnM7XHJcblxyXG4gICAgLy8g0LLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3Ri9C1INC80LXRgtC+0LTRi1xyXG4gICAgZmluZFBvc2l0aW9uSW5BcnIodmFsOiBhbnksIGFycj86IGFueVtdKTogbnVtYmVyO1xyXG4gICAgZ2V0U3RlcE51bWJlcih2YWw6IG51bWJlcik6IG51bWJlcjtcclxuICAgIHRyYW5zbGF0ZUJ5U3RlcChzdGVwOiBudW1iZXIpOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlOyAvLyDQv9C+INGI0LDQs9GDXHJcbiAgICB0cmFuc2xhdGUodmFsKTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTsgLy8g0L/QviDQstCw0LvQuNC00L3QvtC80YMg0LfQvdCw0YfQtdC90LjRjlxyXG4gICAgbnVtYmVyT2ZTdGVwcygpOiBudW1iZXI7XHJcbiAgICBjaGFuZ2UobmV3T3B0aW9uczogYW55KTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTW9kZWxPcHRpb25zIHtcclxuICAgIGRhdGFGb3JtYXQ6IHN0cmluZztcclxuICAgIGluaXRpYWxWYWw6IG51bWJlciB8IG51bGw7XHJcbiAgICBtaW5WYWw6IG51bWJlcjtcclxuICAgIG1heFZhbDogbnVtYmVyO1xyXG4gICAgc3RlcDogbnVtYmVyO1xyXG4gICAgcmV2ZXJzZTogYm9vbGVhbjtcclxuICAgIHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDsgXHJcbiAgICBjdXN0b21WYWx1ZXM/OiBzdHJpbmdbXTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWwgaW1wbGVtZW50cyBJTW9kZWwge1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGFGb3JtYXQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3ZhbDogbnVtYmVyIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX21pblZhbDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbWF4VmFsOm51bWJlcjsgICBcclxuICAgIHByaXZhdGUgX3N0ZXA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3JldmVyc2U6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9yYW5nZTogW251bWJlciwgbnVtYmVyXSB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9jdXN0b21WYWx1ZXM/OiBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX29wdGlvbnM6IElNb2RlbE9wdGlvbnMgfCBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWxsT3B0aW9uczogSU9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IElPcHRpb25zID0gYWxsT3B0aW9ucztcclxuICAgICAgICAvLyDQtdGB0LvQuCDQvdC1INGD0LrQsNC30LDQvdC+INC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1LCDRg9C60LDQt9GL0LLQsNC10Lwg0LzQuNC90LjQvNCw0LvRjNC90L7QtS5cclxuICAgICAgICAvLyDRjdGC0L4g0L3QtdC+0LHRhdC+0LTQuNC80L4g0YfRgtC+0LHRiyDQv9GA0L7QudGC0Lgg0LLQsNC70LjQtNCw0YbQuNGOINC4INC/0L7RgdGC0LDQstC40YLRjCDQsdC10LPRg9C90L7QuiDRgdC+0LPQu9Cw0YHQvdC+INGI0LDQs9GDLlxyXG4gICAgICAgIC8vINC10YHQu9C4INGD0LrQsNC30LDQvSByYW5nZSwg0LzQtdC90Y/QtdC8INC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1INC90LAgbnVsbFxyXG4gICAgICAgIG9wdGlvbnMuaW5pdGlhbFZhbCA9IG9wdGlvbnMuaW5pdGlhbFZhbCA/IG9wdGlvbnMuaW5pdGlhbFZhbCA6IG9wdGlvbnMubWluVmFsO1xyXG4gICAgICAgIGxldCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnM7XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdudW1lcmljJyApIHtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy5udW1lcmljRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnZGF0ZScgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBhbGxPcHRpb25zKTtcclxuICAgICAgICAgICAgLy9pZiAoICF0aGlzLl9vcHRpb25zLmluaXRpYWxWYWwgKSB0aGlzLl9vcHRpb25zLmluaXRpYWxWYWwgPSB0aGlzLl9vcHRpb25zLl9taW5WYWw7IFxyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLmRhdGVGb3JtYXRWYWxpZGF0aW9uKG9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdjdXN0b20nICkge1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLmN1c3RvbUZvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMuY3VzdG9tVmFsdWVzID0gb3B0aW9ucy5jdXN0b21WYWx1ZXM7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBmb3JtYXQgb2YgZGF0YScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGF0YUZvcm1hdCA9IHZhbGlkT3B0aW9ucy5kYXRhRm9ybWF0O1xyXG4gICAgICAgIHRoaXMuX3ZhbCA9IHZhbGlkT3B0aW9ucy5pbml0aWFsVmFsO1xyXG4gICAgICAgIHRoaXMuX21pblZhbCA9IHZhbGlkT3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgdGhpcy5fbWF4VmFsID0gdmFsaWRPcHRpb25zLm1heFZhbDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gdmFsaWRPcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZSA9IHZhbGlkT3B0aW9ucy5yZXZlcnNlO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gdmFsaWRPcHRpb25zLnJhbmdlO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVZhbHVlcyA9IHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXM7ICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgIT0gJ2RhdGUnKSB0aGlzLl9vcHRpb25zID0gdmFsaWRPcHRpb25zO1xyXG5cclxuICAgICAgICAvLyDQtNC70Y8g0LTQsNGCINGB0L7RhdGA0LDQvdGP0LXQvCDQv9C10YDQtdC00LDQvdC90YvQtSDQvtC/0YbQuNC4XHJcbiAgICAgICAgLy8g0L/QvtGC0L7QvNGDINGH0YLQviDQtNC70Y8g0LLQsNC70LjQtNCw0YbQuNC4INC90YPQttC90Ysg0LTQsNGC0Ysg0LLQuNC00LAgJ2RkL21tL3l5eXknXHJcblxyXG4gICAgICAgIC8qIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdkYXRlJykge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gYWxsT3B0aW9ucztcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fb3B0aW9ucyk7XHJcbiAgICAgICAgfSAqL1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDFcclxuICAgIGdldFZhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWw7XHJcbiAgICB9XHJcbiAgICBzZXRWYWwobmV3VmFsOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFyZU51bWVyaWMobmV3VmFsKTtcclxuICAgICAgICB0aGlzLm9uZVZhbHVlVmFsaWRhdGlvbih0aGlzLl9taW5WYWwsIHRoaXMuX21heFZhbCwgbmV3VmFsLCB0aGlzLl9zdGVwKTtcclxuICAgICAgICB0aGlzLl92YWwgPSBuZXdWYWw7XHJcbiAgICB9XHJcbiAgICAvLyAyXHJcbiAgICBnZXRSYW5nZSgpOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmFuZ2U7XHJcbiAgICB9XHJcbiAgICBzZXRSYW5nZShuZXdSYW5nZTogW251bWJlciwgbnVtYmVyXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXJlTnVtZXJpYyhuZXdSYW5nZVswXSwgbmV3UmFuZ2VbMV0pXHJcbiAgICAgICAgdGhpcy5yYW5nZVZhbGlkYXRpb24odGhpcy5fbWluVmFsLCB0aGlzLl9tYXhWYWwsIG5ld1JhbmdlLCB0aGlzLl9zdGVwKTtcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLm1pbk1heFZhbGlkYXRpb24obmV3UmFuZ2VbMF0sIG5ld1JhbmdlWzFdLCB0aGlzLl9yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFuZ2UgPSBuZXdSYW5nZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9yYW5nZSA9IFtuZXdSYW5nZVsxXSwgbmV3UmFuZ2VbMF1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBuZXdSYW5nZTtcclxuICAgIH1cclxuICAgIC8vIDNcclxuICAgIGdldFN0ZXAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcDtcclxuICAgIH1cclxuICAgIC8vIDRcclxuICAgIGdldE1pblZhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5WYWw7XHJcbiAgICB9XHJcbiAgICAvLyA1XHJcbiAgICBnZXRNYXhWYWwoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4VmFsO1xyXG4gICAgfVxyXG4gICAgLy8gNlxyXG4gICAgZ2V0UmV2ZXJzZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmV2ZXJzZTtcclxuICAgIH1cclxuICAgIC8vIDdcclxuICAgIGdldEN1c3RvbVZhbHVlcygpOiBhbnlbXSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1c3RvbVZhbHVlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gOFxyXG4gICAgZ2V0RGF0YUZvcm1hdCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhRm9ybWF0O1xyXG4gICAgfVxyXG4gICAgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zIHtcclxuLyogICAgICAgICBsZXQgb3B0czogSU1vZGVsT3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XHJcbiAgICAgICAgaWYgKCB0aGlzLl92YWwgKSB7XHJcbiAgICAgICAgICAgIC8vb3B0cy5pbml0aWFsVmFsID0gdGhpcy5fdmFsO1xyXG4gICAgICAgICAgICBvcHRzLnJhbmdlID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvcHRzLmluaXRpYWxWYWwgPSBudWxsO1xyXG4gICAgICAgICAgICAvL29wdHMucmFuZ2UgPSB0aGlzLl9yYW5nZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9wdHM7ICovXHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3YnICsgdGhpcy5fb3B0aW9ucy5fdmFsKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdyJyArIHRoaXMuX29wdGlvbnMuX3JhbmdlKTtcclxuXHJcbiAgICAgICAgbGV0IG9wdHM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLl9vcHRpb25zO1xyXG4gICAgICAgIGlmICggIXRoaXMuX3JhbmdlICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbDogYW55O1xyXG4gICAgICAgICAgICAvL3ZhbCA9IHRoaXMudHJhbnNsYXRlKCB0aGlzLl92YWwgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdkYXRlJykge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3ZhbCApO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9ICgnMCcgKyB2YWwuZ2V0RGF0ZSgpKS5zbGljZSgtMikgKyBcclxuICAgICAgICAgICAgICAgICcvJyArICgnMCcgKyAoMSArIHZhbC5nZXRNb250aCgpKSApLnNsaWNlKC0yKSArXHJcbiAgICAgICAgICAgICAgICAnLycgKyAoIHZhbC5nZXRGdWxsWWVhcigpICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLl92YWw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9wdHMuaW5pdGlhbFZhbCA9IHZhbDtcclxuICAgICAgICAgICAgb3B0cy5yYW5nZSA9IG51bGw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsOiBhbnk7XHJcbiAgICAgICAgICAgIGxldCBhcnI6IFthbnksIGFueV0gPSBbbnVsbCwgbnVsbF07XHJcbiAgICAgICAgICAgIC8vdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3JhbmdlWzBdICk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCAhPSAnZGF0ZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2FyciA9IFt0aGlzLnRyYW5zbGF0ZSggdGhpcy5fcmFuZ2VbMF0gKSwgdGhpcy50cmFuc2xhdGUoIHRoaXMuX3JhbmdlWzFdICldO1xyXG4gICAgICAgICAgICAgICAgYXJyID0gdGhpcy5fcmFuZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3JhbmdlWzBdICk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSAoJzAnICsgdmFsLmdldERhdGUoKSkuc2xpY2UoLTIpICsgXHJcbiAgICAgICAgICAgICAgICAnLycgKyAoJzAnICsgKDEgKyB2YWwuZ2V0TW9udGgoKSkgKS5zbGljZSgtMikgK1xyXG4gICAgICAgICAgICAgICAgJy8nICsgdmFsLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXJyWzBdID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudHJhbnNsYXRlKCB0aGlzLl9yYW5nZVsxXSApO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gKCcwJyArIHZhbC5nZXREYXRlKCkpLnNsaWNlKC0yKSArIFxyXG4gICAgICAgICAgICAgICAgJy8nICsgKCcwJyArICgxICsgdmFsLmdldE1vbnRoKCkpICkuc2xpY2UoLTIpICtcclxuICAgICAgICAgICAgICAgICcvJyArIHZhbC5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGFyclsxXSA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0cy5pbml0aWFsVmFsID0gbnVsbDtcclxuICAgICAgICAgICAgb3B0cy5yYW5nZSA9IGFycjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINCy0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90YvQtSDQvNC10YLQvtC00YtcclxuICAgIGZpbmRQb3NpdGlvbkluQXJyKHZhbDogYW55LCBhcnI/OiBhbnlbXSk6IG51bWJlciB7XHJcbiAgICAgICAgLy8g0LjRidC10YIg0L/QvtC30LjRhtC40Y4gdmFsINCyIGN1c3RvbSB2YWx1ZXNcclxuICAgICAgICAvLyDRgtCw0Log0LbQtSDQvNC+0LbQtdGCINCx0YvRgtGMINC40YHQv9C+0LvRjNC30L7QstCw0L0g0YEg0LvRjtCx0YvQvCDQtNGA0YPQs9C4INC80LDRgdGB0LjQstC+0LxcclxuICAgICAgICBpZiAoIGFyciAmJiBhcnIuaW5kZXhPZih2YWwpICE9IC0xICkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyLmluZGV4T2YodmFsKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCBhcnIgJiYgYXJyLmluZGV4T2YodmFsKSA9PSAtMSApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW50IGZpbmQgdmFsdWUgaW4gYXJyYXknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggIXRoaXMuX2N1c3RvbVZhbHVlcyApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5fY3VzdG9tVmFsdWVzLmluZGV4T2YodmFsKSAhPSAtMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbVZhbHVlcy5pbmRleE9mKHZhbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgdmFsaWQgdmFsdWUgZm9yIGN1c3RvbSB2YWx1ZXMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RlcE51bWJlcih2YWw6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgLy8g0L3QsNGF0L7QtNC40YIsINC90LAg0LrQsNC60L7QvCDQv9C+INGB0YfQtdGC0YMg0YjQsNCz0LUg0YHRgtC+0LjRgiB2YWxcclxuICAgICAgICAvLyDQv9GA0LjQvNC10L3Rj9GC0Ywg0YLQvtC70YzQutC+INC00LvRjyDQvdC10YLRgNCw0L3RgdGE0L7RgNC80LjRgNC+0LLQsNC90L3Ri9GFLCDQv9GA0LDQstC40LvRjNC90YvRhSDQt9C90LDRh9C10L3QuNC5IVxyXG4gICAgICAgIGxldCBzdGVwTnVtOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcblxyXG4gICAgICAgIGxldCBhOiBudW1iZXIgPSArKHZhbCAtIHRoaXMuX21pblZhbCkudG9GaXhlZChuKTtcclxuICAgICAgICBsZXQgYjogbnVtYmVyID0gKyh0aGlzLl9tYXhWYWwgLSB0aGlzLl9taW5WYWwpLnRvRml4ZWQobilcclxuICAgICAgICBcclxuICAgICAgICBzdGVwTnVtID0gKyggYSAqIHRoaXMubnVtYmVyT2ZTdGVwcygpIC8gYiApLnRvRml4ZWQoKTtcclxuICAgICAgICBzdGVwTnVtID0gTWF0aC5hYnMoc3RlcE51bSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGVwTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zbGF0ZUJ5U3RlcChzdGVwOiBudW1iZXIpOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnY3VzdG9tJykge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5fcmV2ZXJzZSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXNbc3RlcF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzW3RoaXMuX2N1c3RvbVZhbHVlcy5sZW5ndGggLSBzdGVwIC0gMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcbiAgICAgICAgICAgIGxldCByOiBudW1iZXIgPSAhdGhpcy5fcmV2ZXJzZSA/IDEgOiAtMTtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyID0gKyggKCt0aGlzLl9taW5WYWwpICsgKCt0aGlzLl9zdGVwKSAqICgrc3RlcCkgKiAoK3IpICkudG9GaXhlZChuKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdkYXRlJykgeyBcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpOyBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgcmV0dXJuIHZhbDsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNsYXRlKHZhbCk6IG51bWJlciB8IHN0cmluZyB8IERhdGUge1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnY3VzdG9tJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzW3ZhbF07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnZGF0ZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbCk7IFxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbnVtYmVyT2ZTdGVwcygpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fbWluVmFsKSApO1xyXG4gICAgICAgIG4gPSBNYXRoLnBvdygxMCwgbik7XHJcbiAgICAgICAgcmV0dXJuICggTWF0aC5hYnModGhpcy5fbWF4VmFsIC0gdGhpcy5fbWluVmFsKSAqIG4gKSAvICggdGhpcy5fc3RlcCAqIG4gKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2UobmV3T3B0aW9uczogYW55KTogdm9pZCB7XHJcblxyXG4vKiAgICAgICAgIGNvbnNvbGUubG9nKCdtb2QnICsgdGhpcy5fb3B0aW9ucy5yYW5nZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21vZDInICsgbmV3T3B0aW9ucy5yYW5nZSk7ICovXHJcblxyXG4gICAgICAgIGxldCBwcmV2T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IGFueSA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBuZXdPcHRpb25zKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucy5pbml0aWFsVmFsID0gb3B0aW9ucy5pbml0aWFsVmFsICE9IG51bGwgPyBvcHRpb25zLmluaXRpYWxWYWwgOiBvcHRpb25zLm1pblZhbDtcclxuICAgICAgICBsZXQgdmFsaWRPcHRpb25zOiBJTW9kZWxPcHRpb25zO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnbnVtZXJpYycgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMubnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgcHJldk9wdGlvbnMgYXMgSU9wdGlvbnMpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ2RhdGUnICkge1xyXG4gICAgICAgICAgICAvL3RoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgbmV3T3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLmRhdGVGb3JtYXRWYWxpZGF0aW9uKG9wdGlvbnMsIHByZXZPcHRpb25zIGFzIElPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgbmV3T3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBhbGxPcHRpb25zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdjdXN0b20nICkge1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLmN1c3RvbUZvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgcHJldk9wdGlvbnMgYXMgSU9wdGlvbnMpO1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMuY3VzdG9tVmFsdWVzID0gb3B0aW9ucy5jdXN0b21WYWx1ZXM7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBmb3JtYXQgb2YgZGF0YScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGF0YUZvcm1hdCA9IHZhbGlkT3B0aW9ucy5kYXRhRm9ybWF0O1xyXG4gICAgICAgIHRoaXMuX3ZhbCA9IHZhbGlkT3B0aW9ucy5pbml0aWFsVmFsO1xyXG4gICAgICAgIHRoaXMuX21pblZhbCA9IHZhbGlkT3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgdGhpcy5fbWF4VmFsID0gdmFsaWRPcHRpb25zLm1heFZhbDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gdmFsaWRPcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZSA9IHZhbGlkT3B0aW9ucy5yZXZlcnNlO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gdmFsaWRPcHRpb25zLnJhbmdlO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVZhbHVlcyA9IHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXM7ICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgIT0gJ2RhdGUnKSB0aGlzLl9vcHRpb25zID0gdmFsaWRPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24oYWxsT3B0aW9uczogSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyk6IElNb2RlbE9wdGlvbnMge1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBJT3B0aW9ucyA9IGFsbE9wdGlvbnM7XHJcbiAgICAgICAgLy8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQvdCw0YfQsNC70YzQvdGL0Lwg0L7Qv9GG0LjRj9C8INC00LXRhNC+0LvRgtC90YvQtSDQt9C90LDRh9C10L3QuNGPINC40LcgZGVmYXVsdE9wdGlvbnNcclxuICAgICAgICAvLyDQvdCw0YfQsNC70YzQvdC+0LzRgyDQt9C90LDRh9C10L3QuNGOINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0LzQuNC90LjQvNCw0LvRjNC90L7QtVxyXG4gICAgICAgIC8vINC/0L4g0LzQtdGA0LUg0L/RgNC+0YXQvtC20LTQtdC90LjRjyDQstCw0LvQuNC00LDRhtC40LgsINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPINC90LAg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC40LVcclxuICAgICAgICBsZXQgbmV3T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgZGF0YUZvcm1hdDogJ251bWVyaWMnLFxyXG4gICAgICAgICAgICBpbml0aWFsVmFsOiBkZWZhdWx0T3B0aW9ucy5taW5WYWwsXHJcbiAgICAgICAgICAgIG1pblZhbDogZGVmYXVsdE9wdGlvbnMubWluVmFsLFxyXG4gICAgICAgICAgICBtYXhWYWw6IGRlZmF1bHRPcHRpb25zLm1heFZhbCxcclxuICAgICAgICAgICAgc3RlcDogZGVmYXVsdE9wdGlvbnMuc3RlcCxcclxuICAgICAgICAgICAgcmV2ZXJzZTogZGVmYXVsdE9wdGlvbnMucmV2ZXJzZSxcclxuICAgICAgICAgICAgcmFuZ2U6IGRlZmF1bHRPcHRpb25zLnJhbmdlLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hcmVOdW1lcmljKG9wdGlvbnMubWF4VmFsLCBvcHRpb25zLm1pblZhbCwgb3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgbmV3T3B0aW9ucy5zdGVwID0gTWF0aC5hYnMob3B0aW9ucy5zdGVwKTtcclxuICAgICAgICBuZXdPcHRpb25zLnJldmVyc2UgPSBvcHRpb25zLnJldmVyc2UgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgbmV3T3B0aW9ucy5kYXRhRm9ybWF0ID0gb3B0aW9ucy5kYXRhRm9ybWF0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc3RlcFZhbGlkYXRpb24ob3B0aW9ucy5taW5WYWwsIG9wdGlvbnMubWF4VmFsLCBuZXdPcHRpb25zLnN0ZXApO1xyXG5cclxuICAgICAgICAvLyDQtdGB0LvQuCDQvNC40L0g0Lgg0LzQsNC60YEg0L/QtdGA0LXQv9GD0YLQsNC90Ysg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10LwsINC80LXQvdGP0LXQvCDQv9C+0YDRj9C00L7QulxyXG4gICAgICAgIC8vINC/0L7QtNGA0LDQt9GD0LzQtdCy0LDQtdGC0YHRjywg0YfRgtC+IG1pbiAtINGN0YLQviDRgtC+INGH0YLQviDRgdC70LXQstCwINC90LAg0YHQu9Cw0LnQtNC10YDQtSwgbWF4IC0g0YHQv9GA0LDQstCwXHJcbiAgICAgICAgaWYgKCB0aGlzLm1pbk1heFZhbGlkYXRpb24ob3B0aW9ucy5taW5WYWwsIG9wdGlvbnMubWF4VmFsLCBuZXdPcHRpb25zLnJldmVyc2UpICkge1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLm1pblZhbCA9IG9wdGlvbnMubWluVmFsO1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLm1heFZhbCA9IG9wdGlvbnMubWF4VmFsOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMubWluVmFsID0gb3B0aW9ucy5tYXhWYWw7XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMubWF4VmFsID0gb3B0aW9ucy5taW5WYWw7ICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgdGhpcy5yYW5nZVZhbGlkYXRpb24obmV3T3B0aW9ucy5taW5WYWwsIG5ld09wdGlvbnMubWF4VmFsLCBvcHRpb25zLnJhbmdlLCBuZXdPcHRpb25zLnN0ZXApO1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQvNC40L0g0Lgg0LzQsNC60YEg0LIg0LTQuNCw0L/QsNC30L7QvdC1IHJhbmdlINC/0LXRgNC10L/Rg9GC0LDQvdGLINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8LCDQvNC10L3Rj9C10Lwg0L/QvtGA0Y/QtNC+0LpcclxuICAgICAgICAgICAgaWYgKCB0aGlzLm1pbk1heFZhbGlkYXRpb24ob3B0aW9ucy5yYW5nZVswXSwgb3B0aW9ucy5yYW5nZVsxXSwgbmV3T3B0aW9ucy5yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgICAgIG5ld09wdGlvbnMucmFuZ2UgPSBvcHRpb25zLnJhbmdlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3T3B0aW9ucy5yYW5nZSA9IFtvcHRpb25zLnJhbmdlWzFdLCBvcHRpb25zLnJhbmdlWzBdXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g0L7RgtC80LXQvdGP0LXQvCDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwg0LTQsNC20LUg0LXRgdC70Lgg0L7QvdC+INCy0LLQtdC00LXQvdC+INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMuaW5pdGlhbFZhbCA9IG51bGw7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vINC30LDQv9GD0YHQutCw0LXQvCDQv9GA0L7QstC10YDQutC4INC00LvRjyDQvdCw0YfQsNC70YzQvdC+0LPQviDQt9C90LDRh9C10L3QuNGPLCDRgtC+0LvRjNC60L4g0LXRgdC70Lgg0L3QtSDRg9C60LDQt9Cw0L0g0LTQuNCw0L/QsNC30L7QvSByYW5nZVxyXG4gICAgICAgICAgICB0aGlzLmFyZU51bWVyaWMob3B0aW9ucy5pbml0aWFsVmFsKTtcclxuICAgICAgICAgICAgdGhpcy5vbmVWYWx1ZVZhbGlkYXRpb24obmV3T3B0aW9ucy5taW5WYWwsIG5ld09wdGlvbnMubWF4VmFsLCBvcHRpb25zLmluaXRpYWxWYWwsIG5ld09wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgICAgICBuZXdPcHRpb25zLmluaXRpYWxWYWwgPSBvcHRpb25zLmluaXRpYWxWYWw7XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMucmFuZ2UgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbmV3T3B0aW9ucztcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBkYXRlRm9ybWF0VmFsaWRhdGlvbihhbGxPcHRpb25zOiBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zKTogSU1vZGVsT3B0aW9ucyB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IElPcHRpb25zID0gYWxsT3B0aW9ucztcclxuXHJcbiAgICAgICAgdGhpcy5jdXN0b21EYXRlVmFsaWRhdGlvbihvcHRpb25zLm1pblZhbCwgb3B0aW9ucy5tYXhWYWwpO1xyXG4gICAgICAgIG9wdGlvbnMubWluVmFsID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5taW5WYWwpO1xyXG4gICAgICAgIG9wdGlvbnMubWF4VmFsID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5tYXhWYWwpO1xyXG4gICAgICAgIG9wdGlvbnMuc3RlcCA9IHRoaXMudHJhbmxhdGVTdGVwVG9EYXRlRm9ybWF0KG9wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgIGlmICggQXJyYXkuaXNBcnJheShvcHRpb25zLnJhbmdlKSAmJiBvcHRpb25zLnJhbmdlLmxlbmd0aCA9PSAyICkge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LLQstC10Lsg0YfRgtC+INGC0L4g0LTRgNGD0LPQvtC1LCDQsCDQvdC1IHJhbmdlLCDQvdCwINGN0YLQvtC8XHJcbiAgICAgICAgICAgIC8vINGN0YLQsNC/0LUg0L7RiNC40LHQutC4INC90LUg0LHRg9C00LXRgi4g0J7QvdCwINC/0L7Rj9Cy0LjRgtGB0Y8g0L/RgNC4INC/0YDQvtCy0LXRgNC60LUg0L3QsCBudW1lcmljRm9ybWF0VmFsaWRhdGlvblxyXG4gICAgICAgICAgICAvLyAo0L/QvtGC0L7QvNGDINGH0YLQviByYW5nZSDRgtCw0Log0Lgg0L7RgdGC0LDQtdGC0YHRjyB0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbURhdGVWYWxpZGF0aW9uKG9wdGlvbnMucmFuZ2VbMF0sIG9wdGlvbnMucmFuZ2VbMV0pO1xyXG4gICAgICAgICAgICBvcHRpb25zLnJhbmdlWzBdID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5yYW5nZVswXSk7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMV0gPSB0aGlzLnRyYW5zbGF0ZURhdGVUb051bWJlcihvcHRpb25zLnJhbmdlWzFdKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRlVmFsaWRhdGlvbihvcHRpb25zLmluaXRpYWxWYWwpO1xyXG4gICAgICAgICAgICBvcHRpb25zLmluaXRpYWxWYWwgPSB0aGlzLnRyYW5zbGF0ZURhdGVUb051bWJlcihvcHRpb25zLmluaXRpYWxWYWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5udW1lcmljRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgY3VzdG9tRm9ybWF0VmFsaWRhdGlvbihhbGxPcHRpb25zOiBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zKTogSU1vZGVsT3B0aW9ucyB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IElPcHRpb25zID0gYWxsT3B0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5jdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY3VzdG9tVmFsdWVzIGlzIHJlcXVpcmVkIG9wdGlvbiBmb3IgY3VzdG9tIGZvcm1hdCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoICFBcnJheS5pc0FycmF5KG9wdGlvbnMuY3VzdG9tVmFsdWVzKSB8fCBvcHRpb25zLmN1c3RvbVZhbHVlcy5sZW5ndGggPCAyICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2N1c3RvbVZhbHVlcyBzaG91bGQgYmUgYSByYW5nZSB3aXRoIHR3byBvciBtb3JlIGl0ZW1zLCBsaWtlIFsxLCAyLCBcImFcIl0nKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBvcHRpb25zLm1pblZhbCA9IDA7XHJcbiAgICAgICAgb3B0aW9ucy5tYXhWYWwgPSBvcHRpb25zLmN1c3RvbVZhbHVlcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIG9wdGlvbnMuc3RlcCA9IDE7XHJcblxyXG4gICAgICAgIC8vINC/0YDQuNC+0YDQuNGC0LXRgtGLINC+0L/RhtC40Lk6XHJcbiAgICAgICAgLy8gMS4gcmFuZ2Ug0LIg0YfQuNGB0LvQsNGFXHJcbiAgICAgICAgLy8gMi4gcmFuZ2Ug0LIg0LfQvdCw0YfQtdC90LjRj9GFXHJcbiAgICAgICAgLy8gMy4gaW5pdGlhbFZhbCDQutCw0Log0YfQuNGB0LvQvlxyXG4gICAgICAgIC8vIDQuIGluaXRpYWxWYWwg0LrQsNC6INC30L3QsNGH0LXQvdC40LUgXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnJhbmdlTnVtSW5DdXN0b21WYWx1ZXMgfHwgb3B0aW9ucy5yYW5nZUluQ3VzdG9tVmFsdWVzICkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCBBcnJheS5pc0FycmF5KG9wdGlvbnMucmFuZ2VOdW1JbkN1c3RvbVZhbHVlcykgJiYgb3B0aW9ucy5yYW5nZU51bUluQ3VzdG9tVmFsdWVzLmxlbmd0aCA9PSAyICkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVswXSA9IG9wdGlvbnMucmFuZ2VOdW1JbkN1c3RvbVZhbHVlc1swXTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMV0gPSBvcHRpb25zLnJhbmdlTnVtSW5DdXN0b21WYWx1ZXNbMV07XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBBcnJheS5pc0FycmF5KG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlcykgJiYgb3B0aW9ucy5yYW5nZUluQ3VzdG9tVmFsdWVzLmxlbmd0aCA9PSAyICkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINCy0LLQtdC7INGH0YLQviDRgtC+INC00YDRg9Cz0L7QtSwg0LAg0L3QtSByYW5nZSwg0L3QsCDRjdGC0L7QvFxyXG4gICAgICAgICAgICAgICAgLy8g0Y3RgtCw0L/QtSDQvtGI0LjQsdC60Lgg0L3QtSDQsdGD0LTQtdGCLiDQntC90LAg0L/QvtGP0LLQuNGC0YHRjyDQv9GA0Lgg0L/RgNC+0LLQtdGA0LrQtSDQvdCwIG51bWVyaWNGb3JtYXRWYWxpZGF0aW9uXHJcbiAgICAgICAgICAgICAgICAvLyAo0L/QvtGC0L7QvNGDINGH0YLQviByYW5nZSDRgtCw0Log0Lgg0L7RgdGC0LDQtdGC0YHRjyB0cnVlKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVswXSA9IHRoaXMuZmluZFBvc2l0aW9uSW5BcnIob3B0aW9ucy5yYW5nZUluQ3VzdG9tVmFsdWVzWzBdLCBvcHRpb25zLmN1c3RvbVZhbHVlcyk7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJhbmdlWzFdID0gdGhpcy5maW5kUG9zaXRpb25JbkFycihvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXNbMV0sIG9wdGlvbnMuY3VzdG9tVmFsdWVzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQvdC1INCy0LLQtdC00LXQvdGLIHZhbCDQuNC70LggcmFuZ2Ug0LIgY3VzdG9tIHZhbHVlc1xyXG4gICAgICAgICAgICAvLyDQv9GA0LjRgdCy0LDQuNCy0LDQtdC8INC/0YDQvtGB0YLRi9C1IGluaXRpYWxWYWwg0LjQu9C4IHJhbmdlLCDQtdGB0LvQuCDQvtC90Lgg0LXRgdGC0YxcclxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLmluaXRpYWxWYWxOdW1JbkN1c3RvbVZhbHVlcyApIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5pbml0aWFsVmFsID0gb3B0aW9ucy5pbml0aWFsVmFsTnVtSW5DdXN0b21WYWx1ZXM7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggb3B0aW9ucy5pbml0aWFsVmFsSW5DdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJhbmdlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuaW5pdGlhbFZhbCA9IHRoaXMuZmluZFBvc2l0aW9uSW5BcnIob3B0aW9ucy5pbml0aWFsVmFsSW5DdXN0b21WYWx1ZXMsIG9wdGlvbnMuY3VzdG9tVmFsdWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5udW1lcmljRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgYXJlTnVtZXJpYyguLi52YWxzOiBhbnkpIHtcclxuICAgICAgICBmb3IgKGxldCB2YWwgb2YgdmFscykge1xyXG4gICAgICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyh2YWwpICkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgdmFsdWVzIGluIG51bWVyaWMgZm9ybWF0IHNob3VsZCBiZSBudW1iZXJzJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtaW5NYXhWYWxpZGF0aW9uKG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlciwgcmV2ZXJzZTogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICggIXJldmVyc2UgJiYgKG1pblZhbCA+PSBtYXhWYWwpICkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICggcmV2ZXJzZSAmJiAobWluVmFsIDw9IG1heFZhbCkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGVwVmFsaWRhdGlvbihtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIsIHN0ZXA6IG51bWJlcikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICggIXRoaXMuaXNOdW1lcmljKHN0ZXApICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0ZXAgc2hvdWxkIGJlIGEgbnVtYmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggc3RlcCA9PSAwICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0ZXAgY2FudCBiZSBlcXVhbCB0byAwJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuICAgICAgICBsZXQgdGVzdDogbnVtYmVyID0gKyhtYXhWYWwgLSBtaW5WYWwpLnRvRml4ZWQobilcclxuICAgICAgICB0ZXN0ID0gKCB0ZXN0ICogTWF0aC5wb3coMTAsIG4pICkgLyAoIHN0ZXAgKiBNYXRoLnBvdygxMCwgbikgKTtcclxuICAgICAgICB0ZXN0ID0gTWF0aC5hYnModGVzdCk7XHJcblxyXG4gICAgICAgIGlmICggdGVzdCAlIDEgIT0gMCApIHtcclxuICAgICAgICAgICAgLy8g0LIg0YLQvtC8INGH0LjRgdC70LUg0Y3RgtC+INC/0YDQvtCy0LXRgNC60LAg0YfRgtC+0LHRiyDRiNCw0LMg0LHRi9C7INC90LUg0LHQvtC70YzRiNC1INCy0YHQtdCz0L4g0L/RgNC+0LzQtdC20YPRgtC60LBcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCcoTWF4IHZhbHVlIC0gbWluIHZhbHVlKSBkaXZpZGVkIGJ5IHN0ZXAgc2hvdWxkIHJldHVybiBpbnRlZ2VyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25lVmFsdWVWYWxpZGF0aW9uKG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlciwgdmFsOiBudW1iZXIsIHN0ZXA6IG51bWJlcikge1xyXG5cclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyhzdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKG1pblZhbCkgKTtcclxuXHJcbiAgICAgICAgbGV0IHRlc3Q6IG51bWJlciA9ICsodmFsIC0gbWluVmFsKS50b0ZpeGVkKG4pXHJcbiAgICAgICAgdGVzdCA9ICggdGVzdCAqIE1hdGgucG93KDEwLCBuKSApIC8gKCBzdGVwICogTWF0aC5wb3coMTAsIG4pICk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBpZiAoIE1hdGgubWF4KG1pblZhbCwgbWF4VmFsKSA8IHZhbCAgfHwgIE1hdGgubWluKG1pblZhbCwgbWF4VmFsKSA+IHZhbCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgaW5pdGlhbCB2YWx1ZSBzaG91bGQgYmUgd2l0aGluIG1pbiBhbmQgbWF4IHZhbHVlcycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGVzdCAlIDEgIT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBzaG91bGQgYmUgc2V0IG9uIHN0ZXAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYW5nZVZhbGlkYXRpb24obWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyLCByYW5nZTogW251bWJlciwgbnVtYmVyXSwgc3RlcDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fbWluVmFsKSApO1xyXG5cclxuICAgICAgICBsZXQgdGVzdExlZnQ6IG51bWJlciA9IChyYW5nZVswXSAtIG1pblZhbCkgLyBzdGVwO1xyXG4gICAgICAgIHRlc3RMZWZ0ID0gK3Rlc3RMZWZ0LnRvRml4ZWQobik7XHJcbiAgICAgICAgdGVzdExlZnQgPSBNYXRoLmFicyh0ZXN0TGVmdCk7XHJcblxyXG4gICAgICAgIGxldCB0ZXN0UmlnaHQ6IG51bWJlciA9IChyYW5nZVsxXSAtIG1pblZhbCkgLyBzdGVwO1xyXG4gICAgICAgIHRlc3RSaWdodCA9ICt0ZXN0UmlnaHQudG9GaXhlZChuKTtcclxuICAgICAgICB0ZXN0UmlnaHQgPSBNYXRoLmFicyh0ZXN0UmlnaHQpO1xyXG5cclxuICAgICAgICBpZiAoIHJhbmdlLmxlbmd0aCAhPSAyICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JhbmdlIHNob3VsZCBjb250YWluIHR3byB2YWx1ZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCAhdGhpcy5pc051bWVyaWMocmFuZ2VbMF0pIHx8ICF0aGlzLmlzTnVtZXJpYyhyYW5nZVsxXSkgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWVzIGluIHJhbmdlIHNob3VsZCBiZSBudW1iZXJzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggTWF0aC5tYXgobWluVmFsLCBtYXhWYWwpIDwgTWF0aC5tYXgocmFuZ2VbMF0sIHJhbmdlWzFdKSAgfHwgIE1hdGgubWluKG1pblZhbCwgbWF4VmFsKSA+IE1hdGgubWluKHJhbmdlWzBdLCByYW5nZVsxXSkgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHJhbmdlIHNob3VsZCBiZSB3aXRoaW4gbWluIGFuZCBtYXggdmFsdWVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGVzdExlZnQgJSAxICE9IDAgfHwgdGVzdFJpZ2h0ICUgMSAhPSAwICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSByYW5nZSBzaG91bGQgYmUgc2V0IG9uIHN0ZXAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjdXN0b21EYXRlVmFsaWRhdGlvbiguLi52YWxzOiBhbnlbXSkge1xyXG4gICAgICAgIGZvciAoIGxldCB2YWwgb2YgdmFscyApIHtcclxuICAgICAgICAgICAgaWYgKCAhKCcnICsgdmFsKS5tYXRjaCgvXlxcZHsyfVsuXFwvLV1cXGR7Mn1bLlxcLy1dXFxkezR9JC8pICkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgdmFsdWVzIGluIGRhdGUgZm9ybWF0IHNob3VsZCBiZSBkYXRlcywgbGlrZSBkZC5tbS55eXl5IG9yIGRkL21tL3l5eXkgb3IgZGQtbW0teXl5eScpOyBcclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZURhdGVUb051bWJlcihzdHI6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGFyciA9IHN0ci5zcGxpdChzdHJbMl0pO1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoK2FyclsyXSwgK2FyclsxXSAtIDEsICthcnJbMF0pO1xyXG4gICAgICAgIC8vINCV0YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQstCy0L7QtNC40YIg0YHRgtGA0LDQvdC90YvQtSDQtNCw0L3QvdGL0LUsINC+0L0g0LLRgdC1INGA0LDQstC90L4g0L/QvtC70YPRh9C40YIg0YDQtdC30YPQu9GM0YLQsNGCLlxyXG4gICAgICAgIC8vINCh0LrQvtGA0LXQtSDQstGB0LXQs9C+LCDRjdGC0L4g0LPQvtCy0L7RgNC40YIg0L4g0YLQvtC8LCDRh9GC0L4g0L7QvSDQv9C10YDQtdC/0YPRgtCw0Lsg0L/QvtGA0Y/QtNC+0LouINCf0L7Rj9Cy0LjRgtGB0Y8g0L/RgNC10LTRg9C/0YDQtdC20LTQtdC90LjQtVxyXG4gICAgICAgIGlmICgrYXJyWzBdID4gMzEgfHwgK2FyclsxXSA+IDEyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVXNlIGRkLm1tLnl5eXkgb3IgZGQvbW0veXl5eSBvciBkZC1tbS15eXl5IGZvciBkYXRlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRhdGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgZGF0ZSwgdHJ5IGRkLm1tLnl5eXkgb3IgZGQvbW0veXl5eSBvciBkZC1tbS15eXl5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiArZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyYW5sYXRlU3RlcFRvRGF0ZUZvcm1hdChzdGVwOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICggIXRoaXMuaXNOdW1lcmljKHN0ZXApIHx8IHN0ZXAgJSAxICE9IDAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RlcCBpbiBkYXRlIGZvcm1hdCBzaG91bGQgYmUgaW50ZWdlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RlcCAqIDI0ICogMzYwMCAqIDEwMDA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgaXNOdW1lcmljKG46IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgIWlzTmFOKG4gLSAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlY2ltYWxQbGFjZXMobnVtOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC60L7Qu9C40YfQtdGB0YLQstC+INC30L3QsNC60L7QsiDQv9C+0YHQu9C1INC30LDQv9GP0YLQvtC5XHJcbiAgICAgICAgcmV0dXJuIH4obnVtICsgJycpLmluZGV4T2YoJy4nKSA/IChudW0gKyAnJykuc3BsaXQoJy4nKVsxXS5sZW5ndGggOiAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqINCY0L3RgtGE0LXRgNGE0LXQudGBINC40LfQtNCw0YLQtdC70Y8g0L7QsdGK0Y/QstC70Y/QtdGCINC90LDQsdC+0YAg0LzQtdGC0L7QtNC+0LIg0LTQu9GPINGD0L/RgNCw0LLQu9C10L3QuNGP0LzQuCDQv9C+0LTQv9C40YHQutC40YfQsNC80LguXHJcbiAqL1xyXG5pbnRlcmZhY2UgSVN1YmplY3Qge1xyXG5cclxuICAgIHZhbDogYW55IHwgW2FueSwgYW55XTsgXHJcblxyXG4gICAgLy8g0J/RgNC40YHQvtC10LTQuNC90Y/QtdGCINC90LDQsdC70Y7QtNCw0YLQtdC70Y8g0Log0LjQt9C00LDRgtC10LvRji5cclxuICAgIGF0dGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZDtcclxuXHJcbiAgICAvLyDQntGC0YHQvtC10LTQuNC90Y/QtdGCINC90LDQsdC70Y7QtNCw0YLQtdC70Y8g0L7RgiDQuNC30LTQsNGC0LXQu9GPLlxyXG4gICAgZGV0YWNoKG9ic2VydmVyOiBJT2JzZXJ2ZXIpOiB2b2lkO1xyXG5cclxuICAgIC8vINCj0LLQtdC00L7QvNC70Y/QtdGCINCy0YHQtdGFINC90LDQsdC70Y7QtNCw0YLQtdC70LXQuSDQviDRgdC+0LHRi9GC0LjQuC5cclxuICAgIG5vdGlmeSgpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICog0JjQt9C00LDRgtC10LvRjCDQstC70LDQtNC10LXRgiDQvdC10LrQvtGC0L7RgNGL0Lwg0LLQsNC20L3Ri9C8INGB0L7RgdGC0L7Rj9C90LjQtdC8INC4INC+0L/QvtCy0LXRidCw0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9C10Lkg0L4g0LXQs9C+XHJcbiAqINC40LfQvNC10L3QtdC90LjRj9GFLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ViamVjdCBpbXBsZW1lbnRzIElTdWJqZWN0IHtcclxuXHJcbiAgICB2YWw6IGFueSB8IFthbnksIGFueV07IFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCB2YWw6IGFueSB8IFthbnksIGFueV0gKSB7XHJcbiAgICAgICAgdGhpcy52YWwgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7T2JzZXJ2ZXJbXX0g0KHQv9C40YHQvtC6INC/0L7QtNC/0LjRgdGH0LjQutC+0LIuINCSINGA0LXQsNC70YzQvdC+0Lkg0LbQuNC30L3QuCDRgdC/0LjRgdC+0LpcclxuICAgICAqINC/0L7QtNC/0LjRgdGH0LjQutC+0LIg0LzQvtC20LXRgiDRhdGA0LDQvdC40YLRjNGB0Y8g0LIg0LHQvtC70LXQtSDQv9C+0LTRgNC+0LHQvdC+0Lwg0LLQuNC00LUgKNC60LvQsNGB0YHQuNGE0LjRhtC40YDRg9C10YLRgdGPINC/0L5cclxuICAgICAqINGC0LjQv9GDINGB0L7QsdGL0YLQuNGPINC4INGCLtC0LilcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvYnNlcnZlcnM6IElPYnNlcnZlcltdID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQnNC10YLQvtC00Ysg0YPQv9GA0LDQstC70LXQvdC40Y8g0L/QvtC00L/QuNGB0LrQvtC5LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNoKG9ic2VydmVyOiBJT2JzZXJ2ZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGV0YWNoKG9ic2VydmVyOiBJT2JzZXJ2ZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvYnNlcnZlckluZGV4ID0gdGhpcy5vYnNlcnZlcnMuaW5kZXhPZihvYnNlcnZlcik7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMuc3BsaWNlKG9ic2VydmVySW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JfQsNC/0YPRgdC6INC+0LHQvdC+0LLQu9C10L3QuNGPINCyINC60LDQttC00L7QvCDQv9C+0LTQv9C40YHRh9C40LrQtS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG5vdGlmeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBvYnNlcnZlciBvZiB0aGlzLm9ic2VydmVycykge1xyXG4gICAgICAgICAgICBvYnNlcnZlci51cGRhdGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog0JjQvdGC0LXRgNGE0LXQudGBINCd0LDQsdC70Y7QtNCw0YLQtdC70Y8g0L7QsdGK0Y/QstC70Y/QtdGCINC80LXRgtC+0LQg0YPQstC10LTQvtC80LvQtdC90LjRjywg0LrQvtGC0L7RgNGL0Lkg0LjQt9C00LDRgtC10LvQuFxyXG4gKiDQuNGB0L/QvtC70YzQt9GD0Y7RgiDQtNC70Y8g0L7Qv9C+0LLQtdGJ0LXQvdC40Y8g0YHQstC+0LjRhSDQv9C+0LTQv9C40YHRh9C40LrQvtCyLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2ZXIge1xyXG4gICAgZnVuYzogYW55O1xyXG4gICAgLy8g0J/QvtC70YPRh9C40YLRjCDQvtCx0L3QvtCy0LvQtdC90LjQtSDQvtGCINGB0YPQsdGK0LXQutGC0LAuXHJcbiAgICB1cGRhdGUoc3ViamVjdDogU3ViamVjdCk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQmtC+0L3QutGA0LXRgtC90YvQtSDQndCw0LHQu9GO0LTQsNGC0LXQu9C4INGA0LXQsNCz0LjRgNGD0Y7RgiDQvdCwINC+0LHQvdC+0LLQu9C10L3QuNGPLCDQstGL0L/Rg9GJ0LXQvdC90YvQtSDQmNC30LTQsNGC0LXQu9C10LwsINC6XHJcbiAqINC60L7RgtC+0YDQvtC80YMg0L7QvdC4INC/0YDQuNC60YDQtdC/0LvQtdC90YsuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT2JzZXJ2ZXIgaW1wbGVtZW50cyBJT2JzZXJ2ZXIge1xyXG5cclxuICAgIGZ1bmM6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihmdW5jKSB7XHJcbiAgICAgICAgdGhpcy5mdW5jID0gZnVuYztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKHN1YmplY3Q6IFN1YmplY3QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZ1bmMoIHN1YmplY3QudmFsICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7SVN1YmplY3R9OyIsImltcG9ydCBJT3B0aW9ucywgeyBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQgTW9kZWwsIHtJTW9kZWx9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgIHtJTW9kZWxPcHRpb25zfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IFZpZXcsIHtJVmlld30gZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IFN1YmplY3QsIHtJU3ViamVjdH0gIGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlc2VudGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9tb2RlbDogSU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBfdmlldzogSVZpZXc7XHJcbiAgICBwcml2YXRlIF9zdWJqZWN0OiBJU3ViamVjdDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVUaHVtYjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IobW9kZWw6IElNb2RlbCwgdmlldzogSVZpZXcsIHN1YmplY3Q6IElTdWJqZWN0KSB7XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XHJcbiAgICAgICAgdGhpcy5fc3ViamVjdCA9IHN1YmplY3Q7XHJcblxyXG4gICAgICAgIHRoaXMudGh1bWJPbk1vdXNlRG93biA9IHRoaXMudGh1bWJPbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudGh1bWJPbk1vdXNlTW92ZSA9IHRoaXMudGh1bWJPbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudGh1bWJPbk1vdXNlVXAgPSB0aGlzLnRodW1iT25Nb3VzZVVwLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyT25Nb3VzZUNsaWNrID0gdGhpcy5zbGlkZXJPbk1vdXNlQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoICFtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICB0aGlzLl92aWV3LmdldFRodW1iKCkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Nb3VzZURvd24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMSkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Nb3VzZURvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDIpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy50aHVtYk9uTW91c2VEb3duKTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgdmlldy5nZXRTbGlkZXIoKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zbGlkZXJPbk1vdXNlQ2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHRodW1iT25Nb3VzZURvd24oZXZlbnQpIHtcclxuICAgICAgICAvLyDQv9GA0LXQtNC+0YLQstGA0LDRgtC40YLRjCDQt9Cw0L/Rg9GB0Log0LLRi9C00LXQu9C10L3QuNGPICjQtNC10LnRgdGC0LLQuNC1INCx0YDQsNGD0LfQtdGA0LApXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGh1bWIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnRodW1iT25Nb3VzZU1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnRodW1iT25Nb3VzZVVwKTtcclxuICAgICAgfVxyXG5cclxuICAgIHRodW1iT25Nb3VzZU1vdmUoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgbGV0IG1vZGVsOiBJTW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuICAgICAgICBsZXQgdmlldzogSVZpZXcgPSB0aGlzLl92aWV3O1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQgPSB0aGlzLl92aWV3LmdldFNsaWRlcigpO1xyXG4gICAgICBcclxuICAgICAgICBsZXQgbWluVmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNaW5WYWwoKTtcclxuICAgICAgICBsZXQgbWF4VmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNYXhWYWwoKTtcclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIGxldCByZXZlcnNlOiBudW1iZXIgPSAhdGhpcy5fbW9kZWwuZ2V0UmV2ZXJzZSgpID8gMSA6IC0xO1xyXG4gICAgICAgIGxldCBzbGlkZXJMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcuZ2V0TGVuZ2h0KCk7XHJcbiAgICAgICAgbGV0IHN0ZXBMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcub25lU3RlcExlbmdodCgpO1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyQm9yZGVyOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGV2ZW50UG9zOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHRodW1iUG9zaXRpb246IG51bWJlcjtcclxuICAgICAgICBsZXQgbGVmdFBvaW50OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHJpZ2h0UG9pbnQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgbmV3VmFsOiBudW1iZXI7XHJcblxyXG4gICAgICAgIC8vINCf0L7Qt9C40YbQuNGPINCx0LXQs9GD0L3QutCwINCyIHB4INCy0YvRh9C40YHQu9GP0LXRgtGB0Y8g0L7RgtC90L7RgdC40YLQtdC70YzQvdC+INC90LDRh9Cw0LvQsCDRgdC70LDQudC00LXRgNCwLlxyXG4gICAgICAgIC8vINCS0L3QsNGH0LDQu9C1IG5ld1ZhbCDQstGL0YfQuNGB0LvRj9C10YLRgdGPINC60LDQuiDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyINC+0YIg0L3QsNGH0LDQu9CwICjQvtGCIDApLFxyXG4gICAgICAgIC8vICjRgtC+INC10YHRgtGMINC30L3QsNGH0LXQvdC40Y8gbWluLCBtYXgsIHJldmVyc2Ug0L3QtSDQuNC80LXRjtGCINC30L3QsNGH0LXQvdC40Y8pLlxyXG5cclxuICAgICAgICBpZiAoICF2aWV3LmdldFZlcnRpY2FsKCkgKSB7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJCb3JkZXIgPSAoc2xpZGVyTm9kZS5vZmZzZXRXaWR0aCAtIHNsaWRlckxlbmdodCkgLyAyO1xyXG4gICAgICAgICAgICBldmVudFBvcyA9IGV2ZW50LmNsaWVudFg7ICAgICAgICAgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBldmVudFBvcyAtIHNsaWRlck5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHNsaWRlckJvcmRlcjtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHNsaWRlckJvcmRlciA9IChzbGlkZXJOb2RlLm9mZnNldEhlaWdodCAtIHNsaWRlckxlbmdodCkgLyAyO1xyXG4gICAgICAgICAgICBldmVudFBvcyA9IGV2ZW50LmNsaWVudFk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBldmVudFBvcyAtIHNsaWRlck5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gc2xpZGVyQm9yZGVyO1xyXG5cclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICBuZXdWYWwgPSBNYXRoLnJvdW5kKHRodW1iUG9zaXRpb24gLyBzdGVwTGVuZ2h0KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIG1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fYWN0aXZlVGh1bWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX3RodW1iX3JpZ2h0JykgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9GA0L7QvNC10LbRg9GC0L7Quiwg0YLQviDQu9C10LLQsNGPINCz0YDQsNC90LjRhtCwIC0g0Y3RgtC+INC70LXQstGL0Lkg0LHQtdCz0YPQvdC+0LpcclxuICAgICAgICAgICAgICAgIC8vINC30LTQtdGB0Ywg0YDQsNGB0YHRh9C40YLRi9Cy0LDQtdGC0YHRjyDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyINC+0YIg0L3QsNGH0LDQu9CwICjQvtGCIDApLCBcclxuICAgICAgICAgICAgICAgIC8vINC30LDRgtC10Lwg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0LIgcHgg0L7RgiDQvdCw0YfQsNC70LAg0YHQu9Cw0LnQtNC10YDQsC5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDQntGI0LjQsdC60Lgg0LIg0LLRi9GH0LjRgdC70LXQvdC40Y/RhSDRgSBmbG9hdCDQt9C00LXRgdGMINC80L7QttC90L4g0L/RgNC+0LjQs9C90L7RgNC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgICAgICAgICBsZWZ0UG9pbnQgPSAobW9kZWwuZ2V0UmFuZ2UoKVswXSAtIG1pblZhbCkgKiByZXZlcnNlIC8gc3RlcDtcclxuICAgICAgICAgICAgICAgIGxlZnRQb2ludCA9IGxlZnRQb2ludCAqIHN0ZXBMZW5naHQ7XHJcbiAgICAgICAgICAgICAgICByaWdodFBvaW50ID0gc2xpZGVyTGVuZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblZhbCA9IG1vZGVsLmdldFJhbmdlKClbMF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByaWdodFBvaW50ID0gKG1vZGVsLmdldFJhbmdlKClbMV0gLSBtaW5WYWwpICogcmV2ZXJzZSAvIHN0ZXA7XHJcbiAgICAgICAgICAgICAgICByaWdodFBvaW50ID0gcmlnaHRQb2ludCAqIHN0ZXBMZW5naHQ7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UG9pbnQgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIG1heFZhbCA9IG1vZGVsLmdldFJhbmdlKClbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZWZ0UG9pbnQgPSAwO1xyXG4gICAgICAgICAgICByaWdodFBvaW50ID0gc2xpZGVyTGVuZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICggdGh1bWJQb3NpdGlvbiA8PSBsZWZ0UG9pbnQpIHtcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGxlZnRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWluVmFsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHRodW1iUG9zaXRpb24gPj0gcmlnaHRQb2ludCkge1xyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gcmlnaHRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWF4VmFsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCx0LXQs9GD0L3QvtC6INC90LUg0LLRi9GI0LXQuyDQt9CwINCz0YDQsNC90LjRhtGLLCDRgdGC0LDQstC40Lwg0LXQs9C+INC90LAg0LHQu9C40LbQsNC50YjQtdC1INC30L3QsNGH0LXQvdC40LUsXHJcbiAgICAgICAgICAgIC8vINC60YDQsNGC0L3QvtC1INGI0LDQs9GDLlxyXG4gICAgICAgICAgICAvLyDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDRjdGC0L7Qs9C+INC/0YDQtdC+0LHRgNCw0LfRg9C10Lwg0LXQs9C+INC00LvRjyDQvNC+0LTQtdC70LguINCV0YHQu9C4IHJldmVyc2UgPT0gdHJ1ZSwg0YLQviA9PSAtMSBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IG5ld1ZhbCAqIHN0ZXBMZW5naHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmID0geCA9PiAoICh4LnRvU3RyaW5nKCkuaW5jbHVkZXMoJy4nKSkgPyAoeC50b1N0cmluZygpLnNwbGl0KCcuJykucG9wKCkubGVuZ3RoKSA6ICgwKSApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG4gPSBmKHN0ZXApICsgZihtaW5WYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSAoIG5ld1ZhbCAqIE1hdGgucG93KDEwLCBuKSAqIHN0ZXAgKiByZXZlcnNlICApIC8gTWF0aC5wb3coMTAsIG4pO1xyXG5cclxuICAgICAgICAgICAgbiA9IE1hdGgubWF4KCBmKHN0ZXApLCBmKG1pblZhbCkgKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKygoK25ld1ZhbCkudG9GaXhlZChuKSk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICgrbW9kZWwuZ2V0TWluVmFsKCkpICsgKCtuZXdWYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSArKCgrbmV3VmFsKS50b0ZpeGVkKG4pKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIG1vZGVsLmdldFJhbmdlKCkgJiYgdGhpcy5fYWN0aXZlVGh1bWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX3RodW1iX2xlZnQnKSkge1xyXG4gICAgICAgICAgICBtb2RlbC5zZXRSYW5nZSggW25ld1ZhbCwgbW9kZWwuZ2V0UmFuZ2UoKVsxXV0gKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmICggbW9kZWwuZ2V0UmFuZ2UoKSAmJiB0aGlzLl9hY3RpdmVUaHVtYi5jbGFzc0xpc3QuY29udGFpbnMoJ3NsaWRlcl9fdGh1bWJfcmlnaHQnKSkge1xyXG4gICAgICAgICAgICBtb2RlbC5zZXRSYW5nZSggW21vZGVsLmdldFJhbmdlKClbMF0sIG5ld1ZhbF0gKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0VmFsKG5ld1ZhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24odGhpcy5fYWN0aXZlVGh1bWIsIHRodW1iUG9zaXRpb24pO1xyXG5cclxuICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgpIHx8IHZpZXcuZ2V0VG9vbHRpcCgxKSApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKG5ld1ZhbCk7XHJcblxyXG4gICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggdGhpcy5fYWN0aXZlVGh1bWIucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fdG9vbHRpcCcpLCB2YWwsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRodW1iT25Nb3VzZVVwKGV2ZW50KSB7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMudGh1bWJPbk1vdXNlVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMudGh1bWJPbk1vdXNlTW92ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVRodW1iID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIC8vINC90LDQsdC70Y7QtNCw0YLQtdC70YxcclxuICAgICAgICBsZXQgbW9kZWw6IElNb2RlbCA9IHRoaXMuX21vZGVsO1xyXG5cclxuICAgICAgICBpZiAoIG1vZGVsLmdldFZhbCgpICE9IG51bGwgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSB2YWw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gW107XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMV0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2xpZGVyT25Nb3VzZUNsaWNrKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGxldCBtb2RlbDogSU1vZGVsID0gdGhpcy5fbW9kZWw7XHJcbiAgICAgICAgbGV0IHZpZXc6IElWaWV3ID0gdGhpcy5fdmlldztcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5fdmlldy5nZXRTbGlkZXIoKTtcclxuICAgICAgICBsZXQgY2hhbmdpbmdUaHVtYjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgIFxyXG4gICAgICAgIGxldCBtaW5WYWw6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldE1pblZhbCgpO1xyXG4gICAgICAgIGxldCBtYXhWYWw6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldE1heFZhbCgpO1xyXG4gICAgICAgIGxldCBzdGVwOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbGV0IHJldmVyc2U6IG51bWJlciA9ICF0aGlzLl9tb2RlbC5nZXRSZXZlcnNlKCkgPyAxIDogLTE7XHJcbiAgICAgICAgbGV0IHNsaWRlckxlbmdodDogbnVtYmVyID0gdGhpcy5fdmlldy5nZXRMZW5naHQoKTtcclxuICAgICAgICBsZXQgc3RlcExlbmdodDogbnVtYmVyID0gdGhpcy5fdmlldy5vbmVTdGVwTGVuZ2h0KCk7XHJcblxyXG4gICAgICAgIGxldCBzbGlkZXJCb3JkZXI6IG51bWJlcjtcclxuICAgICAgICBsZXQgZXZlbnRQb3M6IG51bWJlcjtcclxuICAgICAgICBsZXQgdGh1bWJQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZWZ0UG9pbnQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgcmlnaHRQb2ludDogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuZXdWYWw6IG51bWJlcjtcclxuXHJcbiAgICAgICAgLy8g0J/QvtC30LjRhtC40Y8g0LHQtdCz0YPQvdC60LAg0LIgcHgg0LLRi9GH0LjRgdC70Y/QtdGC0YHRjyDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L4g0L3QsNGH0LDQu9CwINGB0LvQsNC50LTQtdGA0LAuXHJcbiAgICAgICAgLy8g0JLQvdCw0YfQsNC70LUgbmV3VmFsINCy0YvRh9C40YHQu9GP0LXRgtGB0Y8g0LrQsNC6INC60L7Qu9C40YfQtdGB0YLQstC+INGI0LDQs9C+0LIg0L7RgiDQvdCw0YfQsNC70LAgKNC+0YIgMCksXHJcbiAgICAgICAgLy8gKNGC0L4g0LXRgdGC0Ywg0LfQvdCw0YfQtdC90LjRjyBtaW4sIG1heCwgcmV2ZXJzZSDQvdC1INC40LzQtdGO0YIg0LfQvdCw0YfQtdC90LjRjykuXHJcblxyXG4gICAgICAgIGlmICggIXRoaXMuX3ZpZXcuZ2V0VmVydGljYWwoKSApIHtcclxuXHJcbiAgICAgICAgICAgIHNsaWRlckJvcmRlciA9IChzbGlkZXJOb2RlLm9mZnNldFdpZHRoIC0gc2xpZGVyTGVuZ2h0KSAvIDI7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gZXZlbnQuY2xpZW50WDsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGV2ZW50UG9zIC0gc2xpZGVyTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gc2xpZGVyQm9yZGVyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJCb3JkZXIgPSAoc2xpZGVyTm9kZS5vZmZzZXRIZWlnaHQgLSBzbGlkZXJMZW5naHQpIC8gMjtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSBldmVudC5jbGllbnRZOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gZXZlbnRQb3MgLSBzbGlkZXJOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHNsaWRlckJvcmRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5ld1ZhbCA9IE1hdGgucm91bmQodGh1bWJQb3NpdGlvbiAvIHN0ZXBMZW5naHQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxlZnRQb2ludCA9IDA7XHJcbiAgICAgICAgcmlnaHRQb2ludCA9IHNsaWRlckxlbmdodDtcclxuICAgIFxyXG4gICAgICAgIGlmICggdGh1bWJQb3NpdGlvbiA8PSBsZWZ0UG9pbnQpIHtcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGxlZnRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWluVmFsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHRodW1iUG9zaXRpb24gPj0gcmlnaHRQb2ludCkge1xyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gcmlnaHRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWF4VmFsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCx0LXQs9GD0L3QvtC6INC90LUg0LLRi9GI0LXQuyDQt9CwINCz0YDQsNC90LjRhtGLLCDRgdGC0LDQstC40Lwg0LXQs9C+INC90LAg0LHQu9C40LbQsNC50YjQtdC1INC30L3QsNGH0LXQvdC40LUsXHJcbiAgICAgICAgICAgIC8vINC60YDQsNGC0L3QvtC1INGI0LDQs9GDLlxyXG4gICAgICAgICAgICAvLyDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDRjdGC0L7Qs9C+INC/0YDQtdC+0LHRgNCw0LfRg9C10Lwg0LXQs9C+INC00LvRjyDQvNC+0LTQtdC70LguINCV0YHQu9C4IHJldmVyc2UgPT0gdHJ1ZSwg0YLQviA9PSAtMSBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IG5ld1ZhbCAqIHN0ZXBMZW5naHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmID0geCA9PiAoICh4LnRvU3RyaW5nKCkuaW5jbHVkZXMoJy4nKSkgPyAoeC50b1N0cmluZygpLnNwbGl0KCcuJykucG9wKCkubGVuZ3RoKSA6ICgwKSApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG4gPSBmKHN0ZXApICsgZihtaW5WYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSAoIG5ld1ZhbCAqIE1hdGgucG93KDEwLCBuKSAqIHN0ZXAgKiByZXZlcnNlICApIC8gTWF0aC5wb3coMTAsIG4pO1xyXG5cclxuICAgICAgICAgICAgbiA9IE1hdGgubWF4KCBmKHN0ZXApLCBmKG1pblZhbCkgKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKygoK25ld1ZhbCkudG9GaXhlZChuKSk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICgrbW9kZWwuZ2V0TWluVmFsKCkpICsgKCtuZXdWYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSArKCgrbmV3VmFsKS50b0ZpeGVkKG4pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggIW1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgIG1vZGVsLnNldFZhbChuZXdWYWwpO1xyXG4gICAgICAgICAgICBjaGFuZ2luZ1RodW1iID0gdmlldy5nZXRUaHVtYigpO1xyXG4gICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oY2hhbmdpbmdUaHVtYiwgdGh1bWJQb3NpdGlvbik7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICggTWF0aC5hYnMobmV3VmFsIC0gbW9kZWwuZ2V0UmFuZ2UoKVswXSkgPCBNYXRoLmFicyhuZXdWYWwgLSBtb2RlbC5nZXRSYW5nZSgpWzFdKSApIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsLnNldFJhbmdlKFsgbmV3VmFsLCBtb2RlbC5nZXRSYW5nZSgpWzFdIF0pO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdpbmdUaHVtYiA9IHZpZXcuZ2V0VGh1bWIoMSk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oY2hhbmdpbmdUaHVtYiwgdGh1bWJQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb2RlbC5zZXRSYW5nZShbIG1vZGVsLmdldFJhbmdlKClbMF0sIG5ld1ZhbCBdKTtcclxuICAgICAgICAgICAgICAgIGNoYW5naW5nVGh1bWIgPSB2aWV3LmdldFRodW1iKDIpO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKGNoYW5naW5nVGh1bWIsIHRodW1iUG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoKSB8fCB2aWV3LmdldFRvb2x0aXAoMSkgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZShuZXdWYWwpO1xyXG5cclxuICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIGNoYW5naW5nVGh1bWIucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fdG9vbHRpcCcpLCB2YWwsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC90LDQsdC70Y7QtNCw0YLQtdC70YxcclxuICAgICAgICBpZiAoIG1vZGVsLmdldFZhbCgpICE9IG51bGwgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSB2YWw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gW107XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMV0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlKG9wdGlvbnM6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuICAgICAgICBsZXQgdmlldyA9IHRoaXMuX3ZpZXc7XHJcbiAgICAgICAgY29uc29sZS5sb2coJzExMTExMSAgICcgKyBtb2RlbC5nZXRPcHRpb25zKCkucmFuZ2UpO1xyXG5cclxuICAgICAgICBsZXQgY2hhbmdlVGh1bWJQb3NpdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjaGFuZ2VUb29sdGlwVmFsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNoYW5nZVNjYWxlRGl2aXNpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhbmdlVmFsVG9SYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjaGFuZ2VSYW5nZVRvVmFsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHJlYnVpbGRTY2FsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCByZWJ1aWxkVG9vbHRpcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyAxLiDQnNCe0JTQldCb0KxcclxuICAgICAgICAvLyDQtdGB0LvQuCDQvNC10L3Rj9C10YLRgdGPINC60LDQutC+0Lkg0LvQuNCx0L4g0L/QsNGA0LDQvNC10YLRgCDQsiDQvNC+0LTQtdC70LgsINC30LDQv9GD0YHQutCw0LXQvCDQv9GA0L7QstC10YDQutC4INC80L7QtNC10LvQuCxcclxuICAgICAgICAvLyDQv9GA0LjRgdCy0LDQuNCy0LDQtdC8INC90L7QstGL0LUg0LfQvdCw0YfQtdC90LjRjy5cclxuICAgICAgICAvLyDQt9Cw0L/QvtC80LjQvdCw0LXQvCwg0YfRgtC+INC90YPQttC90L4g0LjQt9C80LXQvdC40YLRjCDQv9C+0LvQvtC20LXQvdC40Y8g0L/QvtC70LfRg9C90LrQvtCyLCDQt9C90LDRh9C10L3QuNGPINCyINC/0L7QtNGB0LrQsNC30LrQsNGFLFxyXG4gICAgICAgIC8vINC00LXQu9C10L3QuNC5INGI0LrQsNC70YsgKNC30L3QsNGH0LXQvdC40Y8g0LggbGVmdCkuIFxyXG4gICAgICAgIC8vINCV0YHQu9C4INC40LfQvNC10L3QuNC70L7RgdGMINC60L7Qu9C40YfQtdGB0YLQstC+INGI0LDQs9C+0LIgLSB0cnVlINC90LAg0L/QtdGA0LXRgNC40YHQvtCy0LDRgtGMINGI0LrQsNC70YMuXHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0L/QvtC80LXQvdGP0LvQvtGB0YwgdmFsINC90LAgcmFuZ2UsINC40LvQuCDQvdCw0L7QsdC+0YDQvtGCIC0gdHJ1ZSDQvdCwINC/0L7RgdGC0YDQvtC40YLRjCEg0LHQtdCz0YPQvdC60LguXHJcblxyXG5cclxuICAgICAgICBsZXQgbW9kZWxPcHRpb25zID0gWydkYXRhRm9ybWF0JywgJ2luaXRpYWxWYWwnLCAnbWluVmFsJywgJ21heFZhbCcsICdzdGVwJywgJ3JldmVyc2UnLCAncmFuZ2UnLCAnY3VzdG9tVmFsdWVzJywgJ2luaXRpYWxWYWxJbkN1c3RvbVZhbHVlcycsICdpbml0aWFsVmFsTnVtSW5DdXN0b21WYWx1ZXMnLCAncmFuZ2VJbkN1c3RvbVZhbHVlcycsICdyYW5nZU51bUluQ3VzdG9tVmFsdWVzJ107XHJcblxyXG4gICAgICAgIGxldCB0ZXN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbW9kZWxPcHRpb25zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoaXRlbSkgKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICggdGVzdCApIHtcclxuICAgICAgICAgICAgbGV0IHByZXZOdW1PZlN0ZXBzOiBudW1iZXIgPSBtb2RlbC5udW1iZXJPZlN0ZXBzKCk7XHJcbiAgICAgICAgICAgIGxldCBwcmV2T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IG1vZGVsLmdldE9wdGlvbnMoKTtcclxuICAgICAgICAgICAgbGV0IG5ld09wdGlvbnM6IElPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJldk9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgbW9kZWwuY2hhbmdlKG5ld09wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgdmlldy5zZXROdW1iZXJPZlN0ZXBzKCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZVN0ZXAoIHZpZXcuc2NhbGVTdGVwVmFsaWRhdGlvbiggbW9kZWwsIHZpZXcuZ2V0U2NhbGVTdGVwKCkgKSApO1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlVGh1bWJQb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICggcHJldk51bU9mU3RlcHMgIT0gbW9kZWwubnVtYmVyT2ZTdGVwcygpICkge1xyXG4gICAgICAgICAgICAgICAgcmVidWlsZFNjYWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIHZpZXcuZ2V0UmFuZ2UoKSAmJiAhbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZVJhbmdlVG9WYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVidWlsZFRvb2x0aXAgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggIXZpZXcuZ2V0UmFuZ2UoKSAmJiBtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlVmFsVG9SYW5nZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZWJ1aWxkVG9vbHRpcCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDIuINCS0JjQlFxyXG4gICAgICAgIC8vINCf0LXRgNC10YDQuNGB0L7QstGL0LLQsNC10Lwg0LLQuNC0INC+0YIg0YHQsNC80YvRhSDQs9C70L7QsdCw0LvRjNC90YvRhSDQuNC30LzQtdC90LXQvdC40Lkg0Log0YHQsNC80YvQvCDQvdC10LfQvdCw0YfQuNGC0LXQu9GM0L3Ri9C8LlxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIDIuMSDQodCw0LzQvtC1INCx0L7Qu9GM0YjQvtC1INC40LfQvNC10L3QtdC90LjQtSAtINGN0YLQviDQstC40LQg0L7RgdC90L7QstGLINGI0LrQsNC70YsuXHJcbiAgICAgICAgLy8g0JXQtSDQuNC30LzQtdC90LXQvdC40LUg0LLRi9C30YvQstCw0LXRgjog0LjQt9C80LXQvdC40YLRjCDQv9C+0LvQvtC20LXQvdC40Y8g0LHQtdCz0YPQvdC60L7Qsiwg0LTQtdC70LXQvdC40Lkg0YjQutCw0LvRi1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3ZlcnRpY2FsJykgfHwgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnbGVuZ3RoJykgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlU2xpZGVyQmFzZShvcHRpb25zKTtcclxuICAgICAgICAgICAgY2hhbmdlVGh1bWJQb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMi4yINCc0LXQvdGP0LXQvCDQutC+0LvQuNGH0LXRgdGC0LLQviDQsdC10LPRg9C90LrQvtCyLCDQtdGB0LvQuCDQvdGD0LbQvdC+XHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0YLQsNC60L7QtSDQuNC30LzQtdC90LXQvdC40LUg0LHRi9C70L4sINC30L3QsNGH0LjRgiDQstC10LfQtNC1LFxyXG4gICAgICAgIC8vINCz0LTQtSDQvdCw0LTQviwg0YPQttC1INGB0YLQvtC40YIgdHJ1ZVxyXG5cclxuICAgICAgICBpZiAoIGNoYW5nZVJhbmdlVG9WYWwgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlUmFuZ2VUb1ZhbChtb2RlbCk7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbk1vdXNlRG93bik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggY2hhbmdlVmFsVG9SYW5nZSApIHtcclxuICAgICAgICAgICAgdmlldy5jaGFuZ2VWYWxUb1JhbmdlKG1vZGVsKTtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigxKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbk1vdXNlRG93bik7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMikuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Nb3VzZURvd24pO1xyXG4gICAgICAgIH0gICBcclxuXHJcbiAgICAgICAgLy8gMi4zINCo0LrQsNC70LAuINCj0LTQsNC70Y/QtdC8LCDRgdGC0YDQvtC40Lwg0LjQu9C4INC/0LXRgNC10YHRgtGA0LDQuNCy0LDQtdC8LiDQmNC30LzQtdC90Y/QtdC8INC00LXQu9C10L3QuNGPLlxyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NjYWxlU3RlcCcpICYmIG9wdGlvbnMuc2NhbGVTdGVwICE9IHZpZXcuZ2V0U2NhbGVTdGVwKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGVTdGVwKCB2aWV3LnNjYWxlU3RlcFZhbGlkYXRpb24obW9kZWwsIG9wdGlvbnMuc2NhbGVTdGVwKSApO1xyXG4gICAgICAgICAgICByZWJ1aWxkU2NhbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCdzY2FsZU1hc2snKSAmJiBvcHRpb25zLnNjYWxlTWFzayAhPSB2aWV3LmdldFNjYWxlTWFzaygpICkge1xyXG4gICAgICAgICAgICB2aWV3LnNldFNjYWxlTWFzayggb3B0aW9ucy5zY2FsZU1hc2sgKTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINGD0LTQsNC70Y/QtdC8XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCdzY2FsZScpICYmIG9wdGlvbnMuc2NhbGUgPT0gZmFsc2UgJiYgdmlldy5nZXRTY2FsZSgpICkge1xyXG4gICAgICAgICAgICB2aWV3LnNldFNjYWxlKCB2aWV3LnJlbW92ZU5vZGUoIHZpZXcuZ2V0U2NhbGUoKSApICk7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgcmVidWlsZFNjYWxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINGB0YLRgNC+0LjQvFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2NhbGUnKSAmJiBvcHRpb25zLnNjYWxlID09IHRydWUgJiYgIXZpZXcuZ2V0U2NhbGUoKSApIHtcclxuICAgICAgICAgICAgbGV0IHNjYWxlOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICAgICAgc2NhbGUgPSB2aWV3LmJ1aWxkU2NhbGUodmlldy5nZXRTbGlkZXIoKSwgdmlldy5nZXRTY2FsZVN0ZXAoKSwgbW9kZWwsIHZpZXcuZ2V0U2NhbGVNYXNrKCkgKTtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZShzY2FsZSk7XHJcblxyXG4gICAgICAgICAgICByZWJ1aWxkU2NhbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQv9C10YDQtdGB0YLRgNCw0LjQstCw0LXQvFxyXG4gICAgICAgIGlmICggcmVidWlsZFNjYWxlICYmIHZpZXcuZ2V0U2NhbGUoKSApIHtcclxuICAgICAgICAgICAgdmlldy5yZWJ1aWxkU2NhbGUobW9kZWwpO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdGP0LXQvCDQtNC10LvQtdC90LjRjy4g0LfQvdCw0YfQtdC90LjQtSDQuCBsZWZ0XHJcbiAgICAgICAgaWYgKCBjaGFuZ2VTY2FsZURpdmlzaW9uICYmIHZpZXcuZ2V0U2NhbGUoKSApIHtcclxuICAgICAgICAgICAgdmlldy5jaGFuZ2VTY2FsZURpdmlzaW9uKG1vZGVsKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyAyLjQg0J/QvtC00YHQutCw0LfQutC4LiDQo9C00LDQu9GP0LXQvC4g0KHRgtGA0L7QuNC8LiDQnNC10L3Rj9C10Lwg0LfQvdCw0YfQtdC90LjRj1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3Rvb2x0aXBNYXNrJykgJiYgb3B0aW9ucy50b29sdGlwTWFzayAhPSB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0VG9vbHRpcE1hc2soIG9wdGlvbnMudG9vbHRpcE1hc2sgKTtcclxuICAgICAgICAgICAgY2hhbmdlVG9vbHRpcFZhbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggIXZpZXcuZ2V0VG9vbHRpcCgpICYmICF2aWV3LmdldFRvb2x0aXAoMSkgJiYgIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3Rvb2x0aXAnKSApIHtcclxuICAgICAgICAgICAgcmVidWlsZFRvb2x0aXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2hhbmdlVG9vbHRpcFZhbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDRg9C00LDQu9GP0LXQvFxyXG4gICAgICAgIGlmICggb3B0aW9ucy50b29sdGlwID09IGZhbHNlIHx8IHJlYnVpbGRUb29sdGlwICkge1xyXG5cclxuICAgICAgICAgICAgLy8g0L/QvtGH0LXQvNGDINCyINC00YDRg9Cz0L7QvCDQv9C+0YDRj9C00LrQtSDQvdC1INGA0LDQsdC+0YLQsNC10YJcclxuICAgICAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoMikgKSB2aWV3LnNldFRvb2x0aXAoIHZpZXcucmVtb3ZlTm9kZSh2aWV3LmdldFRvb2x0aXAoMikpLCAyICk7XHJcbiAgICAgICAgICAgIGlmICggdmlldy5nZXRUb29sdGlwKDEpICkgdmlldy5zZXRUb29sdGlwKCB2aWV3LnJlbW92ZU5vZGUodmlldy5nZXRUb29sdGlwKDEpKSwgMSApO1xyXG4gICAgICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgpICkgdmlldy5zZXRUb29sdGlwKCB2aWV3LnJlbW92ZU5vZGUodmlldy5nZXRUb29sdGlwKDApKSwgMCApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLnRvb2x0aXAgPT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgICAgICByZWJ1aWxkVG9vbHRpcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgdGC0YDQsNC40LLQsNC10LxcclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCB8fCByZWJ1aWxkVG9vbHRpcCApIHtcclxuICAgICAgICAgICAgdmlldy5idWlsZFZhbGlkVG9vbHRpcHMobW9kZWwpO1xyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgICAgaWYgKCBjaGFuZ2VUb29sdGlwVmFsICYmICh2aWV3LmdldFRvb2x0aXAoKSB8fCB2aWV3LmdldFRvb2x0aXAoMSkpICkge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFtb2RlbC5nZXRSYW5nZSgpKSB7IFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggdmlldy5nZXRUb29sdGlwKCksIHZhbCBhcyBzdHJpbmcsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyAgIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIHZpZXcuZ2V0VG9vbHRpcCgxKSwgdmFsIGFzIHN0cmluZywgdmlldy5nZXRUb29sdGlwTWFzaygpICk7IFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VmFsVG9Ub29sdGlwKCB2aWV3LmdldFRvb2x0aXAoMiksIHZhbCBhcyBzdHJpbmcsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcblxyXG5cclxuICAgICAgICAvLyAyLjUg0J/QvtC70L7QttC10L3QuNGPINCx0LXQs9GD0L3QutC+0LJcclxuXHJcbiAgICAgICAgaWYgKCBjaGFuZ2VUaHVtYlBvc2l0aW9uICkge1xyXG4gICAgICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFtb2RlbC5nZXRSYW5nZSgpICkge1xyXG5cclxuICAgICAgICAgICAgICAgIHBvcyA9IHZpZXcuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0VmFsKCkpLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbiggdmlldy5nZXRUaHVtYigpLCBwb3MpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHsgICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBwb3MgPSB2aWV3LmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMF0pLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbiggdmlldy5nZXRUaHVtYigxKSwgcG9zKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgcG9zID0gdmlldy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzFdKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oIHZpZXcuZ2V0VGh1bWIoMiksIHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vINC90LDQsdC70Y7QtNCw0YLQtdC70YxcclxuICAgICAgICAgICAgLy8g0LLRi9C30YvQstCw0LXQvCDQtdGB0LvQuCDQsdGL0LvQuCDQuNC30LzQtdC90LXQvdC40Y8g0YHQstGP0LfQsNC90L3Ri9C1INGBINCx0LXQs9GD0L3QutCw0LzQuFxyXG4gICAgICAgICAgICAvLyDQvdC1INC30LDRgtGA0L7QvdC10YIsINC90LDQv9GA0LjQvNC10YAsINC00L7QsdCw0LLQu9C10L3QuNC1INGI0LrQsNC70YtcclxuICAgICAgICAgICAgaWYgKCBtb2RlbC5nZXRWYWwoKSAhPSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFsxXSA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBJT3B0aW9ucyBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IE1vZGVsLCB7SU1vZGVsfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IHsgcnVuSW5OZXdDb250ZXh0IH0gZnJvbSAndm0nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmlldyB7XHJcblxyXG4gICAgLy8g0LPQtdGC0YLQtdGA0Ysg0Lgg0YHQtdGC0YLQtdGA0YtcclxuICAgIGdldExlbmdodCgpOiBudW1iZXI7XHJcbiAgICBnZXRWZXJ0aWNhbCgpOiBib29sZWFuO1xyXG4gICAgZ2V0UmFuZ2UoKTogYm9vbGVhbjtcclxuICAgIGdldFRvb2x0aXBNYXNrKCk6IHN0cmluZztcclxuICAgIHNldFRvb2x0aXBNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZVN0ZXAoKTogbnVtYmVyO1xyXG4gICAgc2V0U2NhbGVTdGVwKHN0ZXA6IG51bWJlcik6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZU1hc2soKTogc3RyaW5nO1xyXG4gICAgc2V0U2NhbGVNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBnZXROdW1iZXJPZlN0ZXBzKCk6IG51bWJlcjtcclxuICAgIHNldE51bWJlck9mU3RlcHMobnVtOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIGdldFNsaWRlcigpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFRodW1iKG51bT86IG51bWJlcik6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VG9vbHRpcChudW0/OiBudW1iZXIpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHNldFRvb2x0aXAodG9vbHRpcDogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQsIG51bT86IG51bWJlcik6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZSgpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHNldFNjYWxlKHNjYWxlOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCk6IHZvaWQ7XHJcblxyXG5cclxuICAgIC8vINC80LXRgtC+0LTRiyDQtNC70Y8g0YHQvtC30LTQsNC90LjRjyDQuCDQuNC30LzQtdC90LXQvdC40Y8gdmlld1xyXG4gICAgY2hhbmdlU2xpZGVyQmFzZSAob3B0aW9uczogYW55KTogdm9pZDtcclxuICAgIGNoYW5nZVJhbmdlVG9WYWwgKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgY2hhbmdlVmFsVG9SYW5nZSAobW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcbiAgICBidWlsZFZhbGlkVG9vbHRpcHMobW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcbiAgICBidWlsZFNjYWxlKHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50LCBzdGVwOiBudW1iZXIsIG1vZGVsOiBJTW9kZWwsIG1hc2s6IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcmVidWlsZFNjYWxlKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgY2hhbmdlU2NhbGVEaXZpc2lvbihtb2RlbDogSU1vZGVsKTogdm9pZDtcclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBzZXRUaHVtYlBvc2l0aW9uKHRodW1iTm9kZTogSFRNTERpdkVsZW1lbnQsIHRodW1iUG9zaXRpb246IG51bWJlcik6IHZvaWQ7XHJcbiAgICBzZXRWYWxUb1Rvb2x0aXAodG9vbHRpcE5vZGU6IEhUTUxEaXZFbGVtZW50LCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGUsIG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBmaW5kVGh1bWJQb3NpdGlvbihuZXdTdGVwLCBudW1PZlN0ZXBzKTogbnVtYmVyO1xyXG4gICAgb25lU3RlcExlbmdodCgpOiBudW1iZXI7XHJcbiAgICByZW1vdmVOb2RlKG5vZGU6IEhUTUxEaXZFbGVtZW50KTogdW5kZWZpbmVkO1xyXG4gICAgc2NhbGVTdGVwVmFsaWRhdGlvbihtb2RlbDogSU1vZGVsLCBzdGVwOiBudW1iZXIpOiBudW1iZXI7ICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyBpbXBsZW1lbnRzIElWaWV3IHtcclxuXHJcbiAgICBwcml2YXRlIF9sZW5naHQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3ZlcnRpY2FsOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfcmFuZ2U6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF90b29sdGlwTWFzazogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGVNYXNrPzogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGVTdGVwPzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbnVtYmVyT2ZTdGVwczogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX3NsaWRlcjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF90aHVtYj86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdGh1bWJMZWZ0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90aHVtYlJpZ2h0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwTGVmdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcFJpZ2h0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9zY2FsZT86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgXHJcblxyXG4gICAgY29uc3RydWN0b3IobW9kZWw6IElNb2RlbCwgb3B0aW9uczogSU9wdGlvbnMsIHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50KSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3NsaWRlciA9IHNsaWRlck5vZGU7XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcicpO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gbW9kZWwuZ2V0UmFuZ2UoKSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICB0aGlzLl9udW1iZXJPZlN0ZXBzID0gbW9kZWwubnVtYmVyT2ZTdGVwcygpO1xyXG4gICAgICAgIHRoaXMuX2xlbmdodCA9IHRoaXMubGVuZ3RoVmFsaWRhdGlvbihvcHRpb25zLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGlmICggIW9wdGlvbnMudmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS53aWR0aCA9IHRoaXMuX2xlbmdodDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fbGVuZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX3ZlcnRpY2FsJyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fcmFuZ2UgKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl90aHVtYiA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIpO1xyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFZhbCgpKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy5fdGh1bWIsIHBvcyk7XHJcbiAgICAgICAgfSBlbHNlIHsgICAgIFxyXG5cclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJMZWZ0ID0gdGhpcy5idWlsZFRodW1iKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWJfbGVmdCcpOyBcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzBdKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy5fdGh1bWJMZWZ0LCBwb3MpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJSaWdodCA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iX3JpZ2h0Jyk7XHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVsxXSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iUmlnaHQsIHBvcyk7XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgLy8g0LzQsNGB0LrQsCDQtNC70Y8g0L/QvtC00YHQutCw0LfQvtC6XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0LXQtSDQvdC10YIsINC/0YDQuNC80LXQvdGP0LXRgtGB0Y8g0L7QsdGL0YfQvdCw0Y8sINC60L7RgtC+0YDQsNGPINC/0L4g0LTQtdGE0L7Qu9GC0YMg0LLQvtC30LLRgNCw0YnQsNC10YIg0L/RgNC+0YHRgtC+IHZhbFxyXG4gICAgICAgIC8vICjQsiDRhNC+0YDQvNCw0YLQtSDQtNCw0YIg0LLQtdGA0L3QtdGC0YHRjyDQvtCx0YrQtdC60YIg0LTQsNGC0LApXHJcbiAgICAgICAgdGhpcy5fdG9vbHRpcE1hc2sgPSBvcHRpb25zLnRvb2x0aXBNYXNrO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCApIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFZhbGlkVG9vbHRpcHMobW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zY2FsZU1hc2sgPSBvcHRpb25zLnNjYWxlTWFzaztcclxuXHJcbiAgICAgICAgbGV0IHN0ZXA6IG51bWJlcjtcclxuICAgICAgICBpZiAoIG9wdGlvbnMuc2NhbGVTdGVwICkge1xyXG4gICAgICAgICAgICBzdGVwID0gdGhpcy5zY2FsZVN0ZXBWYWxpZGF0aW9uKG1vZGVsLCBvcHRpb25zLnNjYWxlU3RlcCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RlcCA9IG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2NhbGVTdGVwID0gc3RlcDtcclxuXHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5zY2FsZSApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2NhbGUgPSB0aGlzLmJ1aWxkU2NhbGUodGhpcy5fc2xpZGVyLCBzdGVwLCBtb2RlbCwgdGhpcy5fc2NhbGVNYXNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0LPQtdGC0YLQtdGA0Ysg0Lgg0YHQtdGC0YLQtdGA0YtcclxuICAgIGdldExlbmdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICggIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVyLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zbGlkZXIuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIH0gICAgXHJcbiAgICB9XHJcbiAgICBnZXRWZXJ0aWNhbCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmVydGljYWw7XHJcbiAgICB9XHJcbiAgICBnZXRSYW5nZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmFuZ2U7XHJcbiAgICB9XHJcbiAgICBnZXRUb29sdGlwTWFzaygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwTWFzaztcclxuICAgIH1cclxuICAgIHNldFRvb2x0aXBNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXBNYXNrID0gbWFzaztcclxuICAgIH1cclxuICAgIGdldFNjYWxlU3RlcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVN0ZXA7XHJcbiAgICB9XHJcbiAgICBzZXRTY2FsZVN0ZXAoc3RlcDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2NhbGVTdGVwID0gc3RlcDtcclxuICAgIH1cclxuICAgIGdldFNjYWxlTWFzaygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZU1hc2s7XHJcbiAgICB9XHJcbiAgICBzZXRTY2FsZU1hc2sobWFzazogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2NhbGVNYXNrID0gbWFzaztcclxuICAgIH1cclxuICAgIGdldE51bWJlck9mU3RlcHMoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZTdGVwcztcclxuICAgIH07XHJcbiAgICBzZXROdW1iZXJPZlN0ZXBzKG51bTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbnVtYmVyT2ZTdGVwcyA9IG51bTtcclxuICAgIH07XHJcbiAgICBcclxuXHJcblxyXG4gICAgZ2V0U2xpZGVyKCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVyO1xyXG4gICAgfVxyXG4gICAgZ2V0VGh1bWIobnVtOiBudW1iZXIgPSAwKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGlmICggbnVtID09IDAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aHVtYjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBudW0gPT0gMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RodW1iTGVmdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBudW0gPT0gMiApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RodW1iUmlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90aHVtYjtcclxuICAgIH1cclxuICAgIGdldFRvb2x0aXAobnVtOiBudW1iZXIgPSAwKTogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICggdGhpcy5fdG9vbHRpcCB8fCB0aGlzLl90b29sdGlwTGVmdCApIHtcclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwICYmIG51bSA9PSAwICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwTGVmdCAmJiBudW0gPT0gMSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwTGVmdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXBSaWdodCAmJiBudW0gPT0gMiApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwUmlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldFRvb2x0aXAodG9vbHRpcDogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQsIG51bTogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIGlmICggbnVtID09IDAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0b29sdGlwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIG51bSA9PSAxICkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwTGVmdCA9IHRvb2x0aXA7XHJcbiAgICAgICAgfSBlbHNlIGlmICggbnVtID09IDIgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBSaWdodCA9IHRvb2x0aXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0U2NhbGUoKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZTtcclxuICAgIH1cclxuICAgIHNldFNjYWxlKHNjYWxlOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vINC80LXRgtC+0LTRiyDQtNC70Y8g0YHQvtC30LTQsNC90LjRjyDQuCDQuNC30LzQtdC90LXQvdC40Y8gdmlld1xyXG5cclxuICAgIGNoYW5nZVNsaWRlckJhc2UgKG9wdGlvbnM6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbGVuZ2h0Q2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyDRiNC40YDQuNC90LAgLyDQtNC70LjQvdCwXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmxlbmd0aCAmJiB0aGlzLl9sZW5naHQgIT0gb3B0aW9ucy5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xlbmdodCA9IG9wdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZW5naHRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC+0YDQuNC10L3RgtCw0YbQuNGPXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnZlcnRpY2FsICYmICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKVxyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX3ZlcnRpY2FsJyk7XHJcblxyXG4gICAgICAgICAgICBsZW5naHRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSAmJiB0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl92ZXJ0aWNhbCcpXHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaG9yaXpvbnRhbCcpO1xyXG5cclxuICAgICAgICAgICAgbGVuZ2h0Q2hhbmdlZCA9IHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsZW5naHRDaGFuZ2VkICYmICF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLndpZHRoID0gdGhpcy5fbGVuZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGVuZ2h0Q2hhbmdlZCAmJiB0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fbGVuZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VSYW5nZVRvVmFsIChtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHBvczogbnVtYmVyO1xyXG5cclxuICAgICAgICB0aGlzLl90aHVtYkxlZnQgPSB0aGlzLnJlbW92ZU5vZGUodGhpcy5fdGh1bWJMZWZ0KTtcclxuICAgICAgICB0aGlzLl90aHVtYlJpZ2h0ID0gdGhpcy5yZW1vdmVOb2RlKHRoaXMuX3RodW1iUmlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLl90aHVtYiA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIpO1xyXG4gICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0VmFsKCkpLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iLCBwb3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9yYW5nZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVZhbFRvUmFuZ2UgKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHRoaXMuX3RodW1iID0gdGhpcy5yZW1vdmVOb2RlKHRoaXMuX3RodW1iKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGh1bWJMZWZ0ID0gdGhpcy5idWlsZFRodW1iKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWJfbGVmdCcpOyBcclxuICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMF0pLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iTGVmdCwgcG9zKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGh1bWJSaWdodCA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iX3JpZ2h0Jyk7XHJcbiAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzFdKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYlJpZ2h0LCBwb3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9yYW5nZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRWYWxpZFRvb2x0aXBzKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3JhbmdlKSB7IFxyXG5cclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwICkgdGhpcy5fdG9vbHRpcCA9IHRoaXMucmVtb3ZlTm9kZSggdGhpcy5fdG9vbHRpcCApO1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0aGlzLmJ1aWxkVG9vbHRpcCh0aGlzLl90aHVtYik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsVG9Ub29sdGlwKCB0aGlzLl90b29sdGlwLCB2YWwsIHRoaXMuX3Rvb2x0aXBNYXNrICk7ICAgXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcExlZnQgKSB0aGlzLl90b29sdGlwTGVmdCA9IHRoaXMucmVtb3ZlTm9kZSggdGhpcy5fdG9vbHRpcExlZnQgKTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzBdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBMZWZ0ID0gdGhpcy5idWlsZFRvb2x0aXAodGhpcy5fdGh1bWJMZWZ0LCAnc2xpZGVyX190b29sdGlwX2xlZnQnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWxUb1Rvb2x0aXAoIHRoaXMuX3Rvb2x0aXBMZWZ0LCB2YWwsIHRoaXMuX3Rvb2x0aXBNYXNrICk7ICBcclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcFJpZ2h0ICkgdGhpcy5fdG9vbHRpcFJpZ2h0ID0gdGhpcy5yZW1vdmVOb2RlKCB0aGlzLl90b29sdGlwUmlnaHQgKTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBSaWdodCA9IHRoaXMuYnVpbGRUb29sdGlwKHRoaXMuX3RodW1iUmlnaHQsICdzbGlkZXJfX3Rvb2x0aXBfcmlnaHQnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWxUb1Rvb2x0aXAoIHRoaXMuX3Rvb2x0aXBSaWdodCwgdmFsLCB0aGlzLl90b29sdGlwTWFzayApOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRTY2FsZShzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCwgc3RlcDogbnVtYmVyLCBtb2RlbDogSU1vZGVsLCBtYXNrOiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IHNjYWxlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxldCBkaXZpc2lvbjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuXHJcbiAgICAgICAgc2NhbGUuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZScpO1xyXG4gICAgICAgIHNsaWRlck5vZGUucHJlcGVuZChzY2FsZSk7XHJcblxyXG4gICAgICAgIC8vINC80L3QvtC20LjRgtC10LvRjC4g0LLQviDRgdC60L7Qu9GM0LrQviDRgNCw0Lcg0YjQsNCzINCyINC80L7QtNC10LvQtSDQvNC10L3RjNGI0LUg0YjQsNCz0LAg0YjQutCw0LvRi1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHN0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG4gICAgICAgIGxldCBtdWx0OiBudW1iZXIgPSBzdGVwIC8gbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIG11bHQgPSArKCttdWx0KS50b0ZpeGVkKG4pO1xyXG4gICAgICAgIG11bHQgPSBNYXRoLmFicyhtdWx0KTsgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPD0gbW9kZWwubnVtYmVyT2ZTdGVwcygpOyBpID0gaSArIG11bHQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGkgKyBtdWx0INCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC90LAg0LrQsNC60L7QuSDRiNCw0LMg0LzQvtC00LXQu9C4INC/0L7Qv9Cw0LTQsNC10YIg0YjQsNCzINGI0LrQsNC70YtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlQnlTdGVwKGkpO1xyXG5cclxuICAgICAgICAgICAgZGl2aXNpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2aXNpb24uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpO1xyXG4gICAgICAgICAgICBkaXZpc2lvbi5pbm5lckhUTUwgPSAnPHNwYW4+JyArICBldmFsKG1hc2spICsgJzwvc3Bhbj4nO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUubGVmdCA9IHRoaXMub25lU3RlcExlbmdodCgpICogaSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS50b3AgPSB0aGlzLm9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzY2FsZS5hcHBlbmQoZGl2aXNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVidWlsZFNjYWxlKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2NhbGU6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5nZXRTY2FsZSgpO1xyXG4gICAgICAgIGxldCBwcmV2TnVtT2ZTdGVwczogbnVtYmVyID0gc2NhbGUucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlcl9fc2NhbGUtZGl2aXNpb24nKS5sZW5ndGggLSAxO1xyXG4gICAgICAgIGxldCBuZXdOdW1PZlN0ZXBzOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGRpdmlzaW9uOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBcclxuICAgICAgICAvLyDQvNC90L7QttC40YLQtdC70YwuINCy0L4g0YHQutC+0LvRjNC60L4g0YDQsNC3INGI0LDQsyDQsiDQvNC+0LTQtdC70LUg0LzQtdC90YzRiNC1INGI0LDQs9CwINGI0LrQsNC70YtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9zY2FsZVN0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG4gICAgICAgIGxldCBtdWx0OiBudW1iZXIgPSB0aGlzLl9zY2FsZVN0ZXAgLyBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbXVsdCA9ICttdWx0LnRvRml4ZWQobik7XHJcbiAgICAgICAgbXVsdCA9IE1hdGguYWJzKG11bHQpO1xyXG5cclxuICAgICAgICBuZXdOdW1PZlN0ZXBzID0gbW9kZWwubnVtYmVyT2ZTdGVwcygpIC8gbXVsdDtcclxuXHJcbiAgICAgICAgaWYgKCBwcmV2TnVtT2ZTdGVwcyA+IG5ld051bU9mU3RlcHMgKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCAocHJldk51bU9mU3RlcHMgLSBuZXdOdW1PZlN0ZXBzKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZS5sYXN0Q2hpbGQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBwcmV2TnVtT2ZTdGVwcyA8IG5ld051bU9mU3RlcHMgKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCAobmV3TnVtT2ZTdGVwcyAtIHByZXZOdW1PZlN0ZXBzKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uaW5uZXJIVE1MID0gJzxzcGFuPjwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgc2NhbGUuYXBwZW5kKGRpdmlzaW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VTY2FsZURpdmlzaW9uKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZGl2aXNpb246IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgbGV0IG1hc2s6IHN0cmluZyA9IHRoaXMuX3NjYWxlTWFzaztcclxuXHJcbiAgICAgICAgLy9sZXQgbW9kZWxTdGVwOiBudW1iZXIgPSBtb2RlbC5nZXRTdGVwKCk7XHJcblxyXG4gICAgICAgIC8vINC80L3QvtC20LjRgtC10LvRjC4g0LLQviDRgdC60L7Qu9GM0LrQviDRgNCw0Lcg0YjQsNCzINCyINC80L7QtNC10LvQtSDQvNC10L3RjNGI0LUg0YjQsNCz0LAg0YjQutCw0LvRi1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3NjYWxlU3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyhtb2RlbC5nZXRTdGVwKCkpICk7XHJcbiAgICAgICAgbGV0IG11bHQ6IG51bWJlciA9IHRoaXMuX3NjYWxlU3RlcCAvIG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICBtdWx0ID0gK211bHQudG9GaXhlZChuKTtcclxuICAgICAgICBtdWx0ID0gTWF0aC5hYnMobXVsdCk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8PSBtb2RlbC5udW1iZXJPZlN0ZXBzKCk7IGkgPSBpICsgbXVsdCkge1xyXG5cclxuICAgICAgICAgICAgLy8gaSArIG11bHQg0LLQvtC30LLRgNCw0YnQsNC10YIg0L3QsCDQutCw0LrQvtC5INGI0LDQsyDQvNC+0LTQtdC70Lgg0L/QvtC/0LDQtNCw0LXRgiDRiNCw0LMg0YjQutCw0LvRi1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGVCeVN0ZXAoaSk7XHJcblxyXG4gICAgICAgICAgICBkaXZpc2lvbiA9IHRoaXMuZ2V0U2NhbGUoKS5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpW2kgLyBtdWx0XSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICAgICAgZGl2aXNpb24ucXVlcnlTZWxlY3Rvcignc3BhbicpLnRleHRDb250ZW50ID0gJycgKyBldmFsKG1hc2spO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUudG9wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLmxlZnQgPSB0aGlzLm9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUubGVmdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS50b3AgPSB0aGlzLm9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcblxyXG4gICAgc2V0VGh1bWJQb3NpdGlvbih0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCB0aHVtYlBvc2l0aW9uOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLnRvcCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS5sZWZ0ID0gdGh1bWJQb3NpdGlvbiAtIHRodW1iTm9kZS5vZmZzZXRXaWR0aC8yICsgJ3B4JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUubGVmdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS50b3AgPSB0aHVtYlBvc2l0aW9uIC0gdGh1bWJOb2RlLm9mZnNldFdpZHRoLzIgKyAncHgnOyAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC+0LHQsCDQsdC10LPRg9C90LrQsCDRgdC/0YDQsNCy0LAsINC00L7QsdCw0LLQu9C10LwgeiBpbmRleCDQtNC70Y8g0L3QuNC20L3QtdCz0L5cclxuICAgICAgICBpZiAoIHRoaXMuZ2V0VGh1bWIoMSkgKSB7XHJcbiAgICAgICAgICAgIGlmICggIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAodGhpcy5nZXRUaHVtYigxKS5zdHlsZS5sZWZ0ID09ICh0aGlzLmdldExlbmdodCgpIC0gdGhpcy5nZXRUaHVtYigxKS5jbGllbnRXaWR0aC8yKSArICdweCcpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gJzEwMCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAodGhpcy5nZXRUaHVtYigxKS5zdHlsZS50b3AgPT0gKHRoaXMuZ2V0TGVuZ2h0KCkgLSB0aGlzLmdldFRodW1iKDEpLmNsaWVudEhlaWdodC8yKSArICdweCcpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gJzEwMCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWxUb1Rvb2x0aXAodG9vbHRpcE5vZGU6IEhUTUxEaXZFbGVtZW50LCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGUsIG1hc2s6IHN0cmluZyA9ICd2YWwnKTogdm9pZCB7XHJcbiAgICAgICAgdG9vbHRpcE5vZGUudGV4dENvbnRlbnQgPSBldmFsKG1hc2spO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRUaHVtYlBvc2l0aW9uKG5ld1N0ZXAsIG51bU9mU3RlcHMpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldExlbmdodCgpIC8gbnVtT2ZTdGVwcyAqIG5ld1N0ZXA7XHJcbiAgICB9XHJcblxyXG4gICAgb25lU3RlcExlbmdodCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRMZW5naHQoKSAvIHRoaXMuX251bWJlck9mU3RlcHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlTm9kZShub2RlOiBIVE1MRGl2RWxlbWVudCk6IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbm9kZS5yZW1vdmUoKTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNjYWxlU3RlcFZhbGlkYXRpb24obW9kZWw6IElNb2RlbCwgc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgbGV0IHN0ZXBJc1ZhbGlkOiBib29sZWFuO1xyXG4gICAgICAgIGxldCB0ZXN0OiBudW1iZXJcclxuXHJcbiAgICAgICAgLy8g0L7QutGA0YPQs9C70Y/QtdC8LCDRh9GC0L7QsdGLINC40LfQsdC10LbQsNGC0Ywg0L/RgNC+0LHQu9C10Lwg0L/RgNC4INCy0YvRh9C40YHQu9C10L3QuNGP0YUg0YEg0L/Qu9Cw0LLQsNGO0YnQtdC5INGC0L7Rh9C60L7QuVxyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHN0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG5cclxuICAgICAgICBzdGVwSXNWYWxpZCA9IHRoaXMuaXNOdW1lcmljKHN0ZXApO1xyXG5cclxuICAgICAgICBpZiAoIG1vZGVsLmdldERhdGFGb3JtYXQoKSA9PSAnZGF0ZScgJiYgKCBzdGVwICUgKDI0ICogMzYwMCAqIDEwMDApICE9IDAgKSkge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcCAqIDI0ICogMzYwMCAqIDEwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlc3QgPSAoc3RlcCAqIE1hdGgucG93KDEwLCBuKSkgLyAobW9kZWwuZ2V0U3RlcCgpICogTWF0aC5wb3coMTAsIG4pKTtcclxuICAgICAgICB0ZXN0ID0gTWF0aC5hYnModGVzdCk7XHJcblxyXG4gICAgICAgIHN0ZXBJc1ZhbGlkID0gc3RlcElzVmFsaWQgJiYgKCB0ZXN0ICUgMSA9PSAwICk7XHJcblxyXG4gICAgICAgIHRlc3QgPSArKCBtb2RlbC5nZXRNYXhWYWwoKSAtIG1vZGVsLmdldE1pblZhbCgpICkudG9GaXhlZChuKTtcclxuICAgICAgICB0ZXN0ID0gKCB0ZXN0ICogTWF0aC5wb3coMTAsIG4pICkgLyAoIHN0ZXAgKiBNYXRoLnBvdygxMCwgbikgKTtcclxuICAgICAgICB0ZXN0ID0gTWF0aC5hYnModGVzdCk7XHJcblxyXG4gICAgICAgIHN0ZXBJc1ZhbGlkID0gc3RlcElzVmFsaWQgJiYgKCB0ZXN0ICUgMSA9PSAwICk7XHJcblxyXG4gICAgICAgIHN0ZXAgPSBzdGVwSXNWYWxpZCA/IHN0ZXAgOiBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgcmV0dXJuIHN0ZXA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vINC/0YDQuNCy0LDRgtC90YvQtSDRhNGD0L3QutGG0LjQuFxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRUaHVtYihzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCwgdGh1bWJDbGFzcz86IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBsZXQgdGh1bWI6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7ICAgICBcclxuICAgICAgICB0aHVtYi5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3RodW1iJyk7XHJcbiAgICAgICAgdGh1bWJDbGFzcyA/IHRodW1iLmNsYXNzTGlzdC5hZGQodGh1bWJDbGFzcykgOiBmYWxzZTtcclxuICAgICAgICBzbGlkZXJOb2RlLmFwcGVuZCh0aHVtYik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aHVtYjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkVG9vbHRpcCh0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCB0b29sdGlwQ2xhc3M/OiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IHRvb2x0aXA6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3Rvb2x0aXAnKTtcclxuICAgICAgICB0b29sdGlwQ2xhc3MgPyB0b29sdGlwLmNsYXNzTGlzdC5hZGQodG9vbHRpcENsYXNzKSA6IGZhbHNlO1xyXG4gICAgICAgIHRodW1iTm9kZS5hcHBlbmQodG9vbHRpcCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0b29sdGlwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGxlbmd0aFZhbGlkYXRpb24oc3RyOiBhbnkpIHtcclxuICAgICAgICBpZiAoIHR5cGVvZiAoJycgKyBzdHIpID09ICdzdHJpbmcnICkge1xyXG4gICAgICAgICAgICBsZXQgciA9ICgnJyArIHN0cikubWF0Y2goL15cXGR7MSwzfVsuLF0/XFxkKihweHxlbXxyZW18JSk/JC9pKTtcclxuICAgICAgICAgICAgaWYgKCByICYmIHRoaXMuaXNOdW1lcmljKHJbMF0pICkgeyBcclxuICAgICAgICAgICAgICAgIHJldHVybiByWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnLCcsICcuJykgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCByICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcsJywgJy4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dpZHRoIChvciBoZWlnaHQpIHNob3VsZCBiZSB2YWxpZCB0byBjc3MnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTnVtZXJpYyhuOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmICFpc05hTihuIC0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNpbWFsUGxhY2VzKG51bTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDQt9C90LDQutC+0LIg0L/QvtGB0LvQtSDQt9Cw0L/Rj9GC0L7QuVxyXG4gICAgICAgIHJldHVybiB+KG51bSArICcnKS5pbmRleE9mKCcuJykgPyAobnVtICsgJycpLnNwbGl0KCcuJylbMV0ubGVuZ3RoIDogMDtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBJT3B0aW9ucyB7XHJcbiAgICAvLyBNb2RlbCBvcHRpb25zXHJcbiAgICBkYXRhRm9ybWF0OiBhbnk7XHJcbiAgICBpbml0aWFsVmFsOiBhbnk7XHJcbiAgICBtaW5WYWw6IGFueTtcclxuICAgIG1heFZhbDogYW55O1xyXG4gICAgc3RlcDogYW55OyAgICBcclxuICAgIHJldmVyc2U6IGFueTtcclxuICAgIHJhbmdlOiBhbnk7IFxyXG4gICAgY3VzdG9tVmFsdWVzPzogYW55O1xyXG4gICAgaW5pdGlhbFZhbEluQ3VzdG9tVmFsdWVzPzogYW55O1xyXG4gICAgaW5pdGlhbFZhbE51bUluQ3VzdG9tVmFsdWVzPzogYW55O1xyXG4gICAgcmFuZ2VJbkN1c3RvbVZhbHVlcz86IGFueTtcclxuICAgIHJhbmdlTnVtSW5DdXN0b21WYWx1ZXM/OiBhbnk7XHJcblxyXG5cclxuICAgIC8vIFZpZXcgb3B0aW9uc1xyXG4gICAgbGVuZ3RoOiBhbnk7XHJcbiAgICB2ZXJ0aWNhbDogYW55O1xyXG4gICAgdG9vbHRpcDogYW55O1xyXG4gICAgdG9vbHRpcE1hc2s6IGFueTtcclxuICAgIHNjYWxlOiBhbnk7XHJcbiAgICBzY2FsZVN0ZXA6IGFueTtcclxuICAgIHNjYWxlTWFzazogYW55O1xyXG59XHJcblxyXG52YXIgZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zID0ge1xyXG4gICAgLy8gTW9kZWwgb3B0aW9uc1xyXG4gICAgLy8g0LIgcmFuZ2Ug0Lgg0LIgbWluINC4IG1heCDRgdC70LXQstCwINGC0L4sINGH0YLQviDRgdC70LXQstCwINC90LAg0YHQu9Cw0LnQtNC10YDQtVxyXG4gICAgZGF0YUZvcm1hdDogJ251bWVyaWMnLFxyXG4gICAgaW5pdGlhbFZhbDogbnVsbCwgLy8g0LLQvdC40LzQsNC90LjQtSEg0LIg0L3QsNGH0LDQu9GM0L3Ri9GFINC90LDRgdGC0YDQvtC50LrQsNGFINC90LUg0L7Qv9GA0LXQtNC10LvQtdC90YtcclxuICAgIG1pblZhbDogMCwgICAgICAgIC8vINC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1INC40LvQuCDQv9GA0L7QvNC10LbRg9GC0L7Qui5cclxuICAgIG1heFZhbDogMTAsICAgICAgIC8vINC10YHQu9C4INC+0L3QuCDQvdC1INGD0LrQsNC30LDQvdGLINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8LCDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSBcclxuICAgIHN0ZXA6IDEsICAgICAgICAgIC8vIChpbml0aWFsVmFsKSDQuCDQv9C+0LfQuNGG0LjRjyDQsdC10LPRg9C90LrQsCDRgNCw0LLQvdGLINC80LjQvdC40LzQsNC70YzQvdC+0LzRgyDQt9C90LDRh9C10L3QuNGOXHJcbiAgICByZXZlcnNlOiBmYWxzZSxcclxuICAgIHJhbmdlOiBudWxsLFxyXG4gICAgXHJcbiAgICBsZW5ndGg6ICczMDBweCcsXHJcbiAgICB2ZXJ0aWNhbDogZmFsc2UsXHJcbiAgICB0b29sdGlwOiBmYWxzZSxcclxuICAgIHRvb2x0aXBNYXNrOiBcInZhbFwiLFxyXG4gICAgc2NhbGU6IGZhbHNlLFxyXG4gICAgc2NhbGVTdGVwOiBudWxsLFxyXG4gICAgc2NhbGVNYXNrOiBcInZhbFwiLFxyXG59XHJcblxyXG5leHBvcnQgeyBkZWZhdWx0T3B0aW9ucyB9O1xyXG4iLCJpbXBvcnQgTW9kZWwsIHtJTW9kZWx9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgVmlldywge0lWaWV3fSBmcm9tICcuL1ZpZXcnO1xyXG5pbXBvcnQgUHJlc2VudGVyIGZyb20gJy4vUHJlc2VudGVyJztcclxuaW1wb3J0IHtkZWZhdWx0T3B0aW9uc30gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcblxyXG5pbXBvcnQge09ic2VydmVyfSBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IHtJT2JzZXJ2ZXJ9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5pbXBvcnQgU3ViamVjdCAgZnJvbSAnLi9PYnNlcnZlcic7XHJcblxyXG5cclxuKGZ1bmN0aW9uKCQpe1xyXG5cclxuICB2YXIgbWV0aG9kczogT2JqZWN0ID0ge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zPzogYW55ICkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICBcclxuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBkYXRhID0gJHRoaXMuZGF0YSgnc2xpZGVyRGF0YScpO1xyXG4gICAgICAgIGxldCBzbGlkZXIgPSAkdGhpcztcclxuICAgICAgICBcclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C70LDQs9C40L0g0LXRidGRINC90LUg0L/RgNC+0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNC9XHJcbiAgICAgICAgaWYgKCAhIGRhdGEgKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICBsZXQgbW9kZWw6IElNb2RlbCA9IG5ldyBNb2RlbChvcHRpb25zKTtcclxuICAgICAgICAgIC8vINC/0LXRgNC10LTQsNC10Lwg0LzQvtC00LXQu9GMINCyINC/0YDQtdC00YHRgtCw0LLQu9C10L3QuNC1INC00LvRjyDQv9C+0LvRg9GH0LXQvdC40Y8g0LjQtyDQvdC10LUgXHJcbiAgICAgICAgICAvLyDQutC+0YDRgNC10LrRgtC90YvRhSDQtNCw0L3QvdGL0YVcclxuICAgICAgICAgIGxldCB2aWV3OiBJVmlldyA9IG5ldyBWaWV3KG1vZGVsLCBvcHRpb25zLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAvLyDRgdGD0LHRitC10LrRgiAtINGN0YLQviDQvdCw0LHQu9GO0LTQtdC90LjQtVxyXG4gICAgICAgICAgLy8g0L7QvSDRhdGA0LDQvdC40YIg0LfQvdCw0YfQtdC90LjQtSB2YWwg0LjQu9C4INC/0YDQvtC80LXQttGD0YLQvtC6XHJcbiAgICAgICAgICBsZXQgdmFsOiBhbnkgfCBbYW55LCBhbnldO1xyXG4gICAgICAgICAgdmFsID0gbW9kZWwuZ2V0VmFsKCkgfHwgbW9kZWwuZ2V0UmFuZ2UoKTsgXHJcbiAgICAgICAgICBsZXQgc3ViamVjdCA9IG5ldyBTdWJqZWN0KHZhbCk7XHJcblxyXG4gICAgICAgICAgbGV0IHByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIobW9kZWwsIHZpZXcsIHN1YmplY3QpO1xyXG5cclxuICAgICAgICAgICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScsIHtcclxuICAgICAgICAgICAgc2xpZGVyIDogc2xpZGVyLFxyXG4gICAgICAgICAgICBtb2RlbDogbW9kZWwsXHJcbiAgICAgICAgICAgIHZpZXc6IHZpZXcsXHJcbiAgICAgICAgICAgIHByZXNlbnRlcjogcHJlc2VudGVyLFxyXG4gICAgICAgICAgICBzdWJqZWN0OiBzdWJqZWN0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRlc3Q6IGZ1bmN0aW9uKCBjb250ZW50ICkge1xyXG4gICAgICBjb25zb2xlLmxvZygnaXRzIHRlc3Q6ICAnICsgY29udGVudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZTogZnVuY3Rpb24oIG9wdGlvbnM6IGFueSApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBwcmVzZW50ZXIgPSAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnKS5wcmVzZW50ZXI7XHJcbiAgICAgICAgcHJlc2VudGVyLmNoYW5nZShvcHRpb25zKTtcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSAkdGhpcy5kYXRhKCdzbGlkZXJEYXRhJyk7XHJcblxyXG4gICAgICAgICQod2luZG93KS51bmJpbmQoJy5zbGlkZXInKTtcclxuICAgICAgICBkYXRhLnNsaWRlci5yZW1vdmUoKTtcclxuICAgICAgICAkdGhpcy5yZW1vdmVEYXRhKCdzbGlkZXJEYXRhJyk7XHJcbiAgICAgICAgXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBvYnNlcnZlOiBmdW5jdGlvbiggZnVuYyApIHtcclxuXHJcbiAgICAgIC8vINC00L7QsdCw0LLQu9GP0LXQvCDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPXHJcbiAgICAgIC8vINCw0YDQs9GD0LzQtdC90YIgLSDRjdGC0LAg0YTRg9C90LrRhtC40Y8g0LrQvtGC0L7RgNCw0Y8g0LHRg9C00LXRgiDQvtCx0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0LjQt9C80LXQvdC10L3QuNGPXHJcbiAgICAgIGxldCBzdWJqZWN0ID0gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykuc3ViamVjdDtcclxuICAgICAgbGV0IG9ic2VydmVyOiBJT2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXIoIGZ1bmMgKTtcclxuXHJcbiAgICAgIHN1YmplY3QuYXR0YWNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFxyXG4gIGpRdWVyeS5mbi5zbGlkZXIgPSBmdW5jdGlvbiggbWV0aG9kICkge1xyXG5cclxuICAgIC8vINC70L7Qs9C40LrQsCDQstGL0LfQvtCy0LAg0LzQtdGC0L7QtNCwXHJcbiAgICBpZiAoIG1ldGhvZHNbbWV0aG9kIGFzIHN0cmluZ10gKSB7XHJcbiAgICAgIHJldHVybiBtZXRob2RzWyBtZXRob2QgYXMgc3RyaW5nIF0uYXBwbHkoIHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCBhcmd1bWVudHMsIDEgKSk7XHJcbiAgICB9IGVsc2UgaWYgKCB0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhIG1ldGhvZCApIHtcclxuXHJcbiAgICAgIC8vID8/Pz9cclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQuZXJyb3IoICdNZXRob2QgY2FsbGVkICcgKyAgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBmb3IgSlF1ZXJ5LnNsaWRlcicgKTtcclxuICAgIH0gXHJcblxyXG4gIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG5cclxuXHJcblxyXG4vKiAkKCcudGVzdCcpLnNsaWRlcih7XHJcbiAgZGF0YUZvcm1hdDogJ2RhdGUnLFxyXG4gIG1pblZhbDogJzExLzExLzIwMTknLFxyXG4gIG1heFZhbDogJzIzLzEyLzIwMTknLFxyXG4gIGluaXRpYWxWYWw6ICcxOC8xMS8yMDE5JyxcclxuICBzdGVwOiAxLFxyXG4gIHNjYWxlU3RlcDogNyxcclxuICAvL3NjYWxlTWFzazogJ3ZhbCcsXHJcbiAgc2NhbGVNYXNrOiBcIignMCcrdmFsLmdldERhdGUoKSkuc2xpY2UoLTIpICsgJy4nICsgKCcwJysoMSt2YWwuZ2V0TW9udGgoKSkpLnNsaWNlKC0yKVwiLFxyXG4gIHNjYWxlOiB0cnVlLFxyXG4gIHZlcnRpY2FsOiB0cnVlLFxyXG4gIHRvb2x0aXA6IHRydWUsXHJcbiAgdG9vbHRpcE1hc2s6IFwiKCcwJyt2YWwuZ2V0RGF0ZSgpKS5zbGljZSgtMikgKyAnLicgKyAoJzAnKygxK3ZhbC5nZXRNb250aCgpKSkuc2xpY2UoLTIpXCIsXHJcbiAgLy90b29sdGlwTWFzazogJ3ZhbCcsXHJcbn0pOyAqL1xyXG5cclxuLyogICQoJy50ZXN0Jykuc2xpZGVyKCdjaGFuZ2UnLCB7XHJcbiAgcmFuZ2U6IFsnMTgvMTEvMjAxOScsICcyNS8xMS8yMDE5J10sXHJcbn0pO1xyXG5cclxuJCgnLnRlc3QnKS5zbGlkZXIoJ2NoYW5nZScsIHtcclxuICBzdGVwOiA3LFxyXG59KTtcclxuXHJcbiQoJy50ZXN0Jykuc2xpZGVyKCdjaGFuZ2UnLCB7XHJcbiAgbWluVmFsOiAnMTgvMTEvMjAxOScsXHJcbn0pO1xyXG5cclxuJCgnLnRlc3QnKS5zbGlkZXIoJ2NoYW5nZScsIHtcclxuICBzdGVwOiAxLFxyXG59KTtcclxuXHJcbiQoJy50ZXN0Jykuc2xpZGVyKCdjaGFuZ2UnLCB7XHJcbiAgcmFuZ2U6IG51bGwsXHJcbiAgaW5pdGlhbFZhbDogJzE4LzExLzIwMTknXHJcbn0pOyAgKi9cclxuXHJcblxyXG5cclxuLyogJCgnLnRlc3QnKS5zbGlkZXIoe1xyXG4gIGRhdGFGb3JtYXQ6ICdjdXN0b20nLFxyXG4gIGN1c3RvbVZhbHVlczogWydhJywnYicsJ2MnLCdkJ10sXHJcbiAgaW5pdGlhbFZhbDogMSxcclxuICB0b29sdGlwOiB0cnVlLFxyXG59KVxyXG5cclxuJCgnLnRlc3QnKS5zbGlkZXIoJ2NoYW5nZScsIHtcclxuICBjdXN0b21WYWx1ZXM6IFsnYScsJ2InLCdjJywnZCcsICdyJ10sXHJcbiAgcmFuZ2U6IFsxLDJdLFxyXG59KVxyXG4kKCcudGVzdCcpLnNsaWRlcignY2hhbmdlJywge1xyXG4gIHJldmVyc2U6IHRydWUsXHJcbiAgc2NhbGU6dHJ1ZSxcclxufSlcclxuJCgnLnRlc3QnKS5zbGlkZXIoJ2NoYW5nZScsIHtcclxuICBpbml0aWFsVmFsOiAyLFxyXG4gIHJhbmdlOiBmYWxzZSxcclxufSk7ICovIl0sInNvdXJjZVJvb3QiOiIifQ==