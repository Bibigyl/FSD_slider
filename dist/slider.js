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
        options.value = options.value ? options.value : options.minVal;
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
        this._val = validOptions.value;
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
            opts.value = val;
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
            opts.value = null;
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
        options.value = options.value != null ? options.value : options.minVal;
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
        this._val = validOptions.value;
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
            value: defaultOptions.minVal,
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
            newOptions.value = null;
        }
        else {
            this.areNumeric(options.value);
            this.oneValueValidation(newOptions.minVal, newOptions.maxVal, options.value, newOptions.step);
            newOptions.value = options.value;
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
            this.customDateValidation(options.value);
            options.value = this.translateDateToNumber(options.value);
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
        if (options.range || options.rangeInCustomValues) {
            if (!options.range && Array.isArray(options.rangeInCustomValues) && options.rangeInCustomValues.length == 2) {
                options.range = [];
                options.range[0] = this.findPositionInArr(options.rangeInCustomValues[0], options.customValues);
                options.range[1] = this.findPositionInArr(options.rangeInCustomValues[1], options.customValues);
            }
        }
        else {
            if (!options.value && options.valueInCustomValues) {
                options.value = this.findPositionInArr(options.valueInCustomValues, options.customValues);
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
        var changeThumbPosition = false;
        var changeTooltipVal = false;
        var changeScaleDivision = false;
        var changeValToRange = false;
        var changeRangeToVal = false;
        var rebuildScale = false;
        var rebuildTooltip = false;
        var modelOptions = ['dataFormat', 'value', 'minVal', 'maxVal', 'step', 'reverse', 'range', 'customValues', 'valueInCustomValues', 'rangeInCustomValues'];
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
    value: null,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0T3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDhGQUE0RDtBQTRDNUQ7SUFZSSxlQUFZLFVBQW9CO1FBRTVCLElBQUksT0FBTyxHQUFhLFVBQVUsQ0FBQztRQUluQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDL0QsSUFBSSxZQUEyQixDQUFDO1FBRWhDLElBQUssT0FBTyxDQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUc7WUFDbkMsWUFBWSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsK0JBQWMsQ0FBQyxDQUFDO1NBRXhFO2FBQU0sSUFBSyxPQUFPLENBQUMsVUFBVSxJQUFJLE1BQU0sRUFBRztZQUd2QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzlDLFlBQVksR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLCtCQUFjLENBQUMsQ0FBQztTQUVyRTthQUFNLElBQUssT0FBTyxDQUFDLFVBQVUsSUFBSSxRQUFRLEVBQUc7WUFDekMsWUFBWSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsK0JBQWMsQ0FBQyxDQUFDO1lBQ3BFLFlBQVksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztTQUVwRDthQUFNO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUUvQyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksTUFBTTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO0lBQ2pFLENBQUM7SUFHRCxzQkFBTSxHQUFOO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxzQkFBTSxHQUFOLFVBQU8sTUFBYztRQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsd0JBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ0Qsd0JBQVEsR0FBUixVQUFTLFFBQTBCO1FBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZFLElBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFHO1lBQ2xFLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1NBQzFCO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVELHVCQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELHlCQUFTLEdBQVQ7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELHlCQUFTLEdBQVQ7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELDBCQUFVLEdBQVY7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELCtCQUFlLEdBQWY7UUFDSSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzdCO2FBQU07WUFDSCxPQUFPLFNBQVMsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFRCw2QkFBYSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFDRCwwQkFBVSxHQUFWO1FBRUksSUFBSSxJQUFJLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDeEMsSUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUc7WUFFaEIsSUFBSSxHQUFHLFNBQUssQ0FBQztZQUdiLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLEVBQUU7Z0JBQzVCLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBQztnQkFFbEMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxHQUFHLEdBQUcsQ0FBRSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUUsQ0FBQzthQUMvQjtpQkFBTTtnQkFDSCxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNuQjtZQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBRXJCO2FBQU07WUFFSCxJQUFJLEdBQUcsU0FBSyxDQUFDO1lBQ2IsSUFBSSxHQUFHLEdBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFbkMsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLE1BQU0sRUFBRTtnQkFFNUIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDckI7WUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksTUFBTSxFQUFFO2dCQUU1QixHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7Z0JBQ3ZDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFFeEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFFYixHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7Z0JBQ3ZDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFFeEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUNoQjtZQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1NBQ3BCO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUdELGlDQUFpQixHQUFqQixVQUFrQixHQUFRLEVBQUUsR0FBVztRQUduQyxJQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFHO1lBQ2pDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzQjthQUFNLElBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUc7WUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1NBQy9DO1FBRUQsSUFBSyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUc7WUFDdkIsT0FBTyxHQUFHLENBQUM7U0FDZDtRQUVELElBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUc7WUFDekMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQztJQUVELDZCQUFhLEdBQWIsVUFBYyxHQUFXO1FBR3JCLElBQUksT0FBZSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUUsQ0FBQztRQUU3RixJQUFJLENBQUMsR0FBVyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLEdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFekQsT0FBTyxHQUFHLENBQUMsQ0FBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RELE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVCLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCwrQkFBZSxHQUFmLFVBQWdCLElBQVk7UUFFeEIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLFFBQVEsRUFBRTtZQUU5QixJQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRztnQkFDbEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25DO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbkU7U0FFSjthQUFNO1lBQ0gsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBRSxDQUFDO1lBQzdGLElBQUksQ0FBQyxHQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLEdBQUcsR0FBVyxDQUFDLENBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkYsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLE1BQU0sRUFBRTtnQkFDNUIsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4QjtpQkFBTTtnQkFDSixPQUFPLEdBQUcsQ0FBQzthQUNiO1NBQ0o7SUFDTCxDQUFDO0lBRUQseUJBQVMsR0FBVCxVQUFVLEdBQUc7UUFFVCxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksUUFBUSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUVsQzthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLEVBQUU7WUFDbkMsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUV4QjthQUFNO1lBQ0gsT0FBTyxHQUFHLENBQUM7U0FDZDtJQUNMLENBQUM7SUFFRCw2QkFBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBRSxDQUFDO1FBQzdGLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUUsR0FBRyxDQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFFLENBQUM7SUFDOUUsQ0FBQztJQUVELHNCQUFNLEdBQU4sVUFBTyxVQUFlO1FBRWxCLElBQUksV0FBVyxHQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9DLElBQUksT0FBTyxHQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUU5RCxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3ZFLElBQUksWUFBMkIsQ0FBQztRQUVoQyxJQUFLLE9BQU8sQ0FBQyxVQUFVLElBQUksU0FBUyxFQUFHO1lBQ25DLFlBQVksR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxFQUFFLFdBQXVCLENBQUMsQ0FBQztTQUVqRjthQUFNLElBQUssT0FBTyxDQUFDLFVBQVUsSUFBSSxNQUFNLEVBQUc7WUFDdkMsWUFBWSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsV0FBdUIsQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBRzlEO2FBQU0sSUFBSyxPQUFPLENBQUMsVUFBVSxJQUFJLFFBQVEsRUFBRztZQUN6QyxZQUFZLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxXQUF1QixDQUFDLENBQUM7WUFDN0UsWUFBWSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1NBRXBEO2FBQU07WUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7U0FDN0M7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO1FBRS9DLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7SUFDakUsQ0FBQztJQUVPLHVDQUF1QixHQUEvQixVQUFnQyxVQUFvQixFQUFFLGNBQXdCO1FBQzFFLElBQUksT0FBTyxHQUFhLFVBQVUsQ0FBQztRQUluQyxJQUFJLFVBQVUsR0FBa0I7WUFDNUIsVUFBVSxFQUFFLFNBQVM7WUFDckIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxNQUFNO1lBQzVCLE1BQU0sRUFBRSxjQUFjLENBQUMsTUFBTTtZQUM3QixNQUFNLEVBQUUsY0FBYyxDQUFDLE1BQU07WUFDN0IsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJO1lBQ3pCLE9BQU8sRUFBRSxjQUFjLENBQUMsT0FBTztZQUMvQixLQUFLLEVBQUUsY0FBYyxDQUFDLEtBQUs7U0FDOUI7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUQsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxVQUFVLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3BELFVBQVUsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUUzQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFJckUsSUFBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRztZQUM3RSxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDbkMsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQ3RDO2FBQU07WUFDSCxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDbkMsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQ3RDO1FBRUQsSUFBSyxPQUFPLENBQUMsS0FBSyxFQUFHO1lBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTNGLElBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUc7Z0JBQ2pGLFVBQVUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQzthQUNwQztpQkFBTTtnQkFDSCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0Q7WUFHRCxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUUzQjthQUFNO1lBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU5RixVQUFVLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDakMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDM0I7UUFFRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBR08sb0NBQW9CLEdBQTVCLFVBQTZCLFVBQW9CLEVBQUUsY0FBd0I7UUFDdkUsSUFBSSxPQUFPLEdBQWEsVUFBVSxDQUFDO1FBRW5DLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzRCxJQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRztZQUk3RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUVuRTthQUFNO1lBQ0gsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUdPLHNDQUFzQixHQUE5QixVQUErQixVQUFvQixFQUFFLGNBQXdCO1FBQ3pFLElBQUksT0FBTyxHQUFhLFVBQVUsQ0FBQztRQUVuQyxJQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRztZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7U0FDeEU7YUFBTSxJQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFHO1lBQ2xGLE1BQU0sSUFBSSxLQUFLLENBQUMseUVBQXlFLENBQUMsQ0FBQztTQUM5RjtRQUdELE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBT2pCLElBQUssT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsbUJBQW1CLEVBQUc7WUFFaEQsSUFBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRztnQkFJM0csT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2hHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbkc7U0FFSjthQUFNO1lBR0gsSUFBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLG1CQUFtQixFQUFHO2dCQUNqRCxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzdGO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUdPLDBCQUFVLEdBQWxCO1FBQW1CLGNBQVk7YUFBWixVQUFZLEVBQVoscUJBQVksRUFBWixJQUFZO1lBQVoseUJBQVk7O1FBQzNCLEtBQWdCLFVBQUksRUFBSixhQUFJLEVBQUosa0JBQUksRUFBSixJQUFJLEVBQUU7WUFBakIsSUFBSSxHQUFHO1lBQ1IsSUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUc7Z0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQzthQUNyRTtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLGdDQUFnQixHQUF4QixVQUF5QixNQUFjLEVBQUUsTUFBYyxFQUFFLE9BQWdCO1FBQ3JFLElBQUssQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLEVBQUc7WUFDbEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7YUFBTSxJQUFLLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsRUFBRztZQUN4QyxPQUFPLEtBQUssQ0FBQztTQUNoQjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFTyw4QkFBYyxHQUF0QixVQUF1QixNQUFjLEVBQUUsTUFBYyxFQUFFLElBQVk7UUFFL0QsSUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUc7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsSUFBSyxJQUFJLElBQUksQ0FBQyxFQUFHO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBRSxDQUFDO1FBQzdGLElBQUksSUFBSSxHQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFJLEdBQUcsQ0FBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUUsR0FBRyxDQUFFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBRSxDQUFDO1FBQy9ELElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLElBQUssSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUc7WUFFakIsTUFBTSxJQUFJLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1NBQ3BGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLGtDQUFrQixHQUExQixVQUEyQixNQUFjLEVBQUUsTUFBYyxFQUFFLEdBQVcsRUFBRSxJQUFZO1FBRWhGLElBQUksQ0FBQyxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFFLENBQUM7UUFFakYsSUFBSSxJQUFJLEdBQVcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksR0FBRyxDQUFFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFFLENBQUM7UUFDL0QsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsSUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLElBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFHO1lBQ3RFLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUM7U0FDM0U7UUFDRCxJQUFLLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFHO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztTQUNsRDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTywrQkFBZSxHQUF2QixVQUF3QixNQUFjLEVBQUUsTUFBYyxFQUFFLEtBQXVCLEVBQUUsSUFBWTtRQUV6RixJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFFLENBQUM7UUFFN0YsSUFBSSxRQUFRLEdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2xELFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUIsSUFBSSxTQUFTLEdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ25ELFNBQVMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFaEMsSUFBSyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRztZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7U0FDdEQ7UUFDRCxJQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUc7WUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsSUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRztZQUN4SCxNQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7U0FDcEU7UUFDRCxJQUFLLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFHO1lBQzNDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztTQUN0RDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyxvQ0FBb0IsR0FBNUI7UUFBNkIsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDdkMsS0FBaUIsVUFBSSxFQUFKLGFBQUksRUFBSixrQkFBSSxFQUFKLElBQUksRUFBRztZQUFsQixJQUFJLEdBQUc7WUFDVCxJQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLEVBQUc7Z0JBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMsd0ZBQXdGLENBQUMsQ0FBQzthQUM3RztTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLHFDQUFxQixHQUE3QixVQUE4QixHQUFXO1FBQ3JDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0RBQXNELENBQUMsQ0FBQztTQUN4RTtRQUNELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLDREQUE0RCxDQUFDLENBQUM7U0FDakY7UUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ2pCLENBQUM7SUFFTyx3Q0FBd0IsR0FBaEMsVUFBaUMsSUFBWTtRQUN6QyxJQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRztZQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxPQUFPLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRU8seUJBQVMsR0FBakIsVUFBa0IsQ0FBTTtRQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU8sNkJBQWEsR0FBckIsVUFBc0IsR0FBVztRQUU3QixPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDM2hCRDtJQUlJLGlCQUFhLEdBQXFCO1FBUzFCLGNBQVMsR0FBZ0IsRUFBRSxDQUFDO1FBUmhDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFZTSx3QkFBTSxHQUFiLFVBQWMsUUFBbUI7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLHdCQUFNLEdBQWIsVUFBYyxRQUFtQjtRQUM3QixJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUtNLHdCQUFNLEdBQWI7UUFFSSxLQUF1QixVQUFjLEVBQWQsU0FBSSxDQUFDLFNBQVMsRUFBZCxjQUFjLEVBQWQsSUFBYyxFQUFFO1lBQWxDLElBQU0sUUFBUTtZQUNmLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBQ0wsY0FBQztBQUFELENBQUM7O0FBZ0JEO0lBSUksa0JBQVksSUFBYztRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRU0seUJBQU0sR0FBYixVQUFjLE9BQWdCO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBRSxDQUFDO0lBQzdCLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQztBQVhZLDRCQUFROzs7Ozs7Ozs7Ozs7Ozs7QUNuRXJCO0lBUUksbUJBQVksS0FBYSxFQUFFLElBQVcsRUFBRSxPQUFpQjtRQUVyRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUV4QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdELElBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUc7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDOUU7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3pFO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsb0NBQWdCLEdBQWhCLFVBQWlCLEtBQUs7UUFFbEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUV4QyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFSCxvQ0FBZ0IsR0FBaEIsVUFBaUIsS0FBSztRQUVsQixJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2hDLElBQUksSUFBSSxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFN0IsSUFBSSxVQUFVLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFeEQsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QyxJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzdDLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekMsSUFBSSxPQUFPLEdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksWUFBWSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbEQsSUFBSSxVQUFVLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVwRCxJQUFJLFlBQW9CLENBQUM7UUFDekIsSUFBSSxRQUFnQixDQUFDO1FBQ3JCLElBQUksYUFBcUIsQ0FBQztRQUMxQixJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSSxVQUFrQixDQUFDO1FBQ3ZCLElBQUksTUFBYyxDQUFDO1FBTW5CLElBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUc7WUFFdkIsWUFBWSxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0QsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDekIsYUFBYSxHQUFHLFFBQVEsR0FBRyxVQUFVLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1NBRXJGO2FBQU07WUFFSCxZQUFZLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1RCxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUN6QixhQUFhLEdBQUcsUUFBUSxHQUFHLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUM7U0FFcEY7UUFFRCxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLENBQUM7UUFFaEQsSUFBSyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUc7WUFDcEIsSUFBSyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsRUFBRztnQkFNL0QsU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQzVELFNBQVMsR0FBRyxTQUFTLEdBQUcsVUFBVSxDQUFDO2dCQUNuQyxVQUFVLEdBQUcsWUFBWSxDQUFDO2dCQUUxQixNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNO2dCQUNILFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUM3RCxVQUFVLEdBQUcsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDckMsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFFZCxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7YUFBTTtZQUNILFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDZCxVQUFVLEdBQUcsWUFBWSxDQUFDO1NBQzdCO1FBRUQsSUFBSyxhQUFhLElBQUksU0FBUyxFQUFFO1lBQzdCLGFBQWEsR0FBRyxTQUFTLENBQUM7WUFDMUIsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUNuQjthQUFNLElBQUssYUFBYSxJQUFJLFVBQVUsRUFBRTtZQUNyQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1lBQzNCLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDbkI7YUFBTTtZQUlILGFBQWEsR0FBRyxNQUFNLEdBQUcsVUFBVSxDQUFDO1lBRXBDLElBQU0sQ0FBQyxHQUFHLFdBQUMsSUFBSSxRQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsRUFBL0UsQ0FBK0UsQ0FBQztZQUUvRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLE1BQU0sR0FBRyxDQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFMUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBRSxDQUFDO1lBQ25DLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsSUFBSyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDakYsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO1NBRW5EO2FBQU0sSUFBSyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7WUFDekYsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBRSxDQUFDO1NBRW5EO2FBQU07WUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFeEQsSUFBSyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRztZQUMzQyxJQUFJLEdBQUcsU0FBd0IsQ0FBQztZQUNoQyxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU5QixJQUFJLENBQUMsZUFBZSxDQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBRSxDQUFDO1NBQzNHO0lBQ0wsQ0FBQztJQUVELGtDQUFjLEdBQWQsVUFBZSxLQUFLO1FBQ2hCLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFakUsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7UUFFOUIsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUVoQyxJQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLEVBQUc7WUFDMUIsSUFBSSxHQUFHLFNBQXdCLENBQUM7WUFDaEMsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBRTNCO2FBQU07WUFDSCxJQUFJLEdBQUcsU0FBd0IsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFFdkIsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRTNCLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUM5QjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELHNDQUFrQixHQUFsQixVQUFtQixLQUFLO1FBRXBCLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUU3QixJQUFJLFVBQVUsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN4RCxJQUFJLGFBQTZCLENBQUM7UUFFbEMsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QyxJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzdDLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekMsSUFBSSxPQUFPLEdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksWUFBWSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbEQsSUFBSSxVQUFVLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVwRCxJQUFJLFlBQW9CLENBQUM7UUFDekIsSUFBSSxRQUFnQixDQUFDO1FBQ3JCLElBQUksYUFBcUIsQ0FBQztRQUMxQixJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSSxVQUFrQixDQUFDO1FBQ3ZCLElBQUksTUFBYyxDQUFDO1FBTW5CLElBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFHO1lBRTdCLFlBQVksR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNELFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ3pCLGFBQWEsR0FBRyxRQUFRLEdBQUcsVUFBVSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztTQUNyRjthQUFNO1lBRUgsWUFBWSxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUQsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDekIsYUFBYSxHQUFHLFFBQVEsR0FBRyxVQUFVLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDO1NBQ3BGO1FBRUQsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBRWhELFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxVQUFVLEdBQUcsWUFBWSxDQUFDO1FBRTFCLElBQUssYUFBYSxJQUFJLFNBQVMsRUFBRTtZQUM3QixhQUFhLEdBQUcsU0FBUyxDQUFDO1lBQzFCLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDbkI7YUFBTSxJQUFLLGFBQWEsSUFBSSxVQUFVLEVBQUU7WUFDckMsYUFBYSxHQUFHLFVBQVUsQ0FBQztZQUMzQixNQUFNLEdBQUcsTUFBTSxDQUFDO1NBQ25CO2FBQU07WUFJSCxhQUFhLEdBQUcsTUFBTSxHQUFHLFVBQVUsQ0FBQztZQUVwQyxJQUFNLENBQUMsR0FBRyxXQUFDLElBQUksUUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLEVBQS9FLENBQStFLENBQUM7WUFFL0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QixNQUFNLEdBQUcsQ0FBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRTFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUUsQ0FBQztZQUNuQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQztRQUVELElBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUc7WUFDckIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQixhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FFdkQ7YUFBTTtZQUNILElBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUc7Z0JBQ25GLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQztnQkFDaEQsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7YUFDdkQ7aUJBQU07Z0JBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUUsQ0FBQyxDQUFDO2dCQUNoRCxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQzthQUN2RDtTQUNKO1FBRUQsSUFBSyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRztZQUMzQyxJQUFJLEdBQUcsU0FBd0IsQ0FBQztZQUNoQyxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU5QixJQUFJLENBQUMsZUFBZSxDQUFFLGFBQWEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFFLENBQUM7U0FDdkc7UUFHRCxJQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLEVBQUc7WUFDMUIsSUFBSSxHQUFHLFNBQXdCLENBQUM7WUFDaEMsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBRTNCO2FBQU07WUFDSCxJQUFJLEdBQUcsU0FBd0IsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFFdkIsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRTNCLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUM5QjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDBCQUFNLEdBQU4sVUFBTyxPQUFZO1FBRWYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN4QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRXRCLElBQUksbUJBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3pDLElBQUksZ0JBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ3RDLElBQUksbUJBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3pDLElBQUksZ0JBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ3RDLElBQUksZ0JBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ3RDLElBQUksWUFBWSxHQUFZLEtBQUssQ0FBQztRQUNsQyxJQUFJLGNBQWMsR0FBWSxLQUFLLENBQUM7UUFXcEMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFFekosSUFBSSxJQUFJLEdBQVksS0FBSyxDQUFDO1FBRTFCLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBUyxJQUFJO1lBQzlCLElBQUssT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRztnQkFDaEMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDWixPQUFPO2FBQ1Y7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUssSUFBSSxFQUFHO1lBQ1IsSUFBSSxjQUFjLEdBQVcsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ25ELElBQUksV0FBVyxHQUFrQixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDcEQsSUFBSSxVQUFVLEdBQWEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRW5FLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFekIsSUFBSSxDQUFDLGdCQUFnQixDQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBRSxDQUFDO1lBQy9DLElBQUksQ0FBQyxZQUFZLENBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUUsQ0FBRSxDQUFDO1lBRTVFLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUMzQixnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDeEIsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1lBRTNCLElBQUssY0FBYyxJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUUsRUFBRztnQkFDM0MsWUFBWSxHQUFHLElBQUksQ0FBQzthQUN2QjtZQUNELElBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFHO2dCQUN4QyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDekI7WUFDRCxJQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRztnQkFDeEMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixjQUFjLEdBQUcsSUFBSSxDQUFDO2FBQ3pCO1NBQ0o7UUFRRCxJQUFLLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRztZQUMxRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1lBQzNCLG1CQUFtQixHQUFHLElBQUksQ0FBQztTQUM5QjtRQU1ELElBQUssZ0JBQWdCLEVBQUc7WUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDeEU7UUFDRCxJQUFLLGdCQUFnQixFQUFHO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN6RTtRQUlELElBQUssT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRztZQUNuRixJQUFJLENBQUMsWUFBWSxDQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFFLENBQUM7WUFDeEUsWUFBWSxHQUFHLElBQUksQ0FBQztZQUNwQixtQkFBbUIsR0FBRyxJQUFJLENBQUM7U0FDOUI7UUFDRCxJQUFLLE9BQU8sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUc7WUFDbkYsSUFBSSxDQUFDLFlBQVksQ0FBRSxPQUFPLENBQUMsU0FBUyxDQUFFLENBQUM7WUFDdkMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1NBQzlCO1FBRUQsSUFBSyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRztZQUNoRixJQUFJLENBQUMsUUFBUSxDQUFFLElBQUksQ0FBQyxVQUFVLENBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFFLENBQUUsQ0FBQztZQUNwRCxtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFDNUIsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUN4QjtRQUVELElBQUssT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRztZQUNoRixJQUFJLEtBQUssU0FBZ0IsQ0FBQztZQUMxQixLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUUsQ0FBQztZQUM1RixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXJCLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDckIsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1NBQy9CO1FBRUQsSUFBSyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFHO1lBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekIsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1NBQzlCO1FBRUQsSUFBSyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUc7WUFDMUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO1FBS0QsSUFBSyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFHO1lBQ3pGLElBQUksQ0FBQyxjQUFjLENBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBRSxDQUFDO1lBQzNDLGdCQUFnQixHQUFHLElBQUksQ0FBQztTQUMzQjtRQUNELElBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRztZQUNuRixjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLGdCQUFnQixHQUFHLEtBQUssQ0FBQztTQUM1QjtRQUVELElBQUssT0FBTyxDQUFDLE9BQU8sSUFBSSxLQUFLLElBQUksY0FBYyxFQUFHO1lBRzlDLElBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztZQUNwRixJQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUFHLElBQUksQ0FBQyxVQUFVLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7WUFDcEYsSUFBSyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUFHLElBQUksQ0FBQyxVQUFVLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7WUFFbkYsSUFBSyxPQUFPLENBQUMsT0FBTyxJQUFJLEtBQUssRUFBRztnQkFDNUIsY0FBYyxHQUFHLEtBQUssQ0FBQzthQUMxQjtZQUNELGdCQUFnQixHQUFHLEtBQUssQ0FBQztTQUM1QjtRQUVELElBQUssT0FBTyxDQUFDLE9BQU8sSUFBSSxjQUFjLEVBQUc7WUFDckMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLGdCQUFnQixHQUFHLEtBQUssQ0FBQztTQUM1QjtRQUVELElBQUssZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFHO1lBQ2pFLElBQUksR0FBRyxTQUF3QixDQUFDO1lBRWhDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBRW5CLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBRSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsZUFBZSxDQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxHQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFFLENBQUM7YUFDbkY7aUJBQU07Z0JBRUgsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxlQUFlLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFFLENBQUM7Z0JBRWpGLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO2dCQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBYSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBRSxDQUFDO2FBQ3BGO1NBQ0o7UUFLRCxJQUFLLG1CQUFtQixFQUFHO1lBQ3ZCLElBQUksR0FBRyxTQUFRLENBQUM7WUFFaEIsSUFBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRztnQkFFckIsR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBRSxDQUFDO2dCQUMzRixJQUFJLENBQUMsZ0JBQWdCLENBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBRWhEO2lCQUFNO2dCQUVILEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUUsQ0FBQztnQkFDaEcsSUFBSSxDQUFDLGdCQUFnQixDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRTlDLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUUsQ0FBQztnQkFDaEcsSUFBSSxDQUFDLGdCQUFnQixDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDakQ7WUFLRCxJQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLEVBQUc7Z0JBQzFCLElBQUksR0FBRyxTQUF3QixDQUFDO2dCQUNoQyxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUUsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2FBRTNCO2lCQUFNO2dCQUNILElBQUksR0FBRyxTQUF3QixDQUFDO2dCQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBRXZCLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO2dCQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBRTNCLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO2dCQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDOUI7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RjRDtJQW9CSSxjQUFZLEtBQWEsRUFBRSxPQUFpQixFQUFFLFVBQTBCO1FBRXBFLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXJELElBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFHO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ25EO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUksR0FBVyxDQUFDO1FBQ2hCLElBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFHO1lBRWhCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUMsR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBRSxDQUFDO1lBQzNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFFSCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3RFLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUUsQ0FBQztZQUNoRyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUU3QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3hFLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUUsQ0FBQztZQUNoRyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNqRDtRQUtELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUV4QyxJQUFLLE9BQU8sQ0FBQyxPQUFPLEVBQUc7WUFDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBRXBDLElBQUksSUFBWSxDQUFDO1FBQ2pCLElBQUssT0FBTyxDQUFDLFNBQVMsRUFBRztZQUNyQixJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDN0Q7YUFBTTtZQUNILElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUd2QixJQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUc7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDN0U7SUFDTCxDQUFDO0lBR0Qsd0JBQVMsR0FBVDtRQUNJLElBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFHO1lBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7U0FDbkM7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBQ0QsMEJBQVcsR0FBWDtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsdUJBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ0QsNkJBQWMsR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBQ0QsNkJBQWMsR0FBZCxVQUFlLElBQVk7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUNELDJCQUFZLEdBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUNELDJCQUFZLEdBQVosVUFBYSxJQUFZO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFDRCwyQkFBWSxHQUFaO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFDRCwyQkFBWSxHQUFaLFVBQWEsSUFBWTtRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBQ0QsK0JBQWdCLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7SUFBQSxDQUFDO0lBQ0YsK0JBQWdCLEdBQWhCLFVBQWlCLEdBQVc7UUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7SUFJRix3QkFBUyxHQUFUO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFDRCx1QkFBUSxHQUFSLFVBQVMsR0FBZTtRQUFmLDZCQUFlO1FBQ3BCLElBQUssR0FBRyxJQUFJLENBQUMsRUFBRztZQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN0QjtRQUNELElBQUssR0FBRyxJQUFJLENBQUMsRUFBRztZQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUMxQjtRQUNELElBQUssR0FBRyxJQUFJLENBQUMsRUFBRztZQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUMzQjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ0QseUJBQVUsR0FBVixVQUFXLEdBQWU7UUFBZiw2QkFBZTtRQUN0QixJQUFLLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRztZQUN0QyxJQUFLLElBQUksQ0FBQyxRQUFRLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRztnQkFDN0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3hCO1lBQ0QsSUFBSyxJQUFJLENBQUMsWUFBWSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUc7Z0JBQ2pDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQzthQUM1QjtZQUNELElBQUssSUFBSSxDQUFDLGFBQWEsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFHO2dCQUNsQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7YUFDN0I7U0FDSjthQUFNO1lBQ0gsT0FBTyxTQUFTLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBQ0QseUJBQVUsR0FBVixVQUFXLE9BQW1DLEVBQUUsR0FBZTtRQUFmLDZCQUFlO1FBQzNELElBQUssR0FBRyxJQUFJLENBQUMsRUFBRztZQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1NBQzNCO2FBQU0sSUFBSyxHQUFHLElBQUksQ0FBQyxFQUFHO1lBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1NBQy9CO2FBQU0sSUFBSyxHQUFHLElBQUksQ0FBQyxFQUFHO1lBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUNELHVCQUFRLEdBQVI7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNELHVCQUFRLEdBQVIsVUFBUyxLQUFpQztRQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBS0QsK0JBQWdCLEdBQWhCLFVBQWtCLE9BQVk7UUFFMUIsSUFBSSxhQUFhLEdBQVksS0FBSyxDQUFDO1FBR25DLElBQUssT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUc7WUFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQzlCLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFHRCxJQUFLLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFHO1lBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztZQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUU5QyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO1FBQ0QsSUFBSyxPQUFPLENBQUMsUUFBUSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFHO1lBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztZQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUVoRCxhQUFhLEdBQUcsSUFBSTtTQUN2QjtRQUVELElBQUksYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxhQUFhLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQUVELCtCQUFnQixHQUFoQixVQUFrQixLQUFhO1FBQzNCLElBQUksR0FBVyxDQUFDO1FBRWhCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUUsQ0FBQztRQUMzRixJQUFJLENBQUMsZ0JBQWdCLENBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRUQsK0JBQWdCLEdBQWhCLFVBQWtCLEtBQWE7UUFDM0IsSUFBSSxHQUFXLENBQUM7UUFFaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3RFLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUUsQ0FBQztRQUNoRyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3hFLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUUsQ0FBQztRQUNoRyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsaUNBQWtCLEdBQWxCLFVBQW1CLEtBQWE7UUFDNUIsSUFBSSxHQUEyQixDQUFDO1FBRWhDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBRWQsSUFBSyxJQUFJLENBQUMsUUFBUTtnQkFBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDO1lBQ3RFLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLGVBQWUsQ0FBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFFLENBQUM7U0FFakU7YUFBTTtZQUNILElBQUssSUFBSSxDQUFDLFlBQVk7Z0JBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFFLElBQUksQ0FBQyxZQUFZLENBQUUsQ0FBQztZQUNsRixHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1lBQy9FLElBQUksQ0FBQyxlQUFlLENBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBRSxDQUFDO1lBRWxFLElBQUssSUFBSSxDQUFDLGFBQWE7Z0JBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUUsQ0FBQztZQUNyRixHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1lBQ2xGLElBQUksQ0FBQyxlQUFlLENBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBRSxDQUFDO1NBQ3RFO0lBQ0wsQ0FBQztJQUVELHlCQUFVLEdBQVYsVUFBVyxVQUEwQixFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsSUFBWTtRQUM1RSxJQUFJLEtBQUssR0FBbUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRCxJQUFJLFFBQXdCLENBQUM7UUFDN0IsSUFBSSxHQUEyQixDQUFDO1FBRWhDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFHMUIsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUUsQ0FBQztRQUMxRixJQUFJLElBQUksR0FBVyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsS0FBSyxJQUFJLENBQUMsR0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRTtZQUc5RCxHQUFHLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUvQixRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ2pELFFBQVEsQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUM7WUFFeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ3pEO2lCQUFNO2dCQUNILFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ3hEO1lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMxQjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCwyQkFBWSxHQUFaLFVBQWEsS0FBYTtRQUN0QixJQUFJLEtBQUssR0FBbUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVDLElBQUksY0FBYyxHQUFXLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDMUYsSUFBSSxhQUFxQixDQUFDO1FBQzFCLElBQUksUUFBd0IsQ0FBQztRQUc3QixJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUUsQ0FBQztRQUNyRyxJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBRTdDLElBQUssY0FBYyxHQUFHLGFBQWEsRUFBRztZQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9ELEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDNUI7U0FDSjtRQUNELElBQUssY0FBYyxHQUFHLGFBQWEsRUFBRztZQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9ELFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUNqRCxRQUFRLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztnQkFDckMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMxQjtTQUNKO0lBQ0wsQ0FBQztJQUVELGtDQUFtQixHQUFuQixVQUFvQixLQUFhO1FBQzdCLElBQUksUUFBd0IsQ0FBQztRQUM3QixJQUFJLEdBQTJCLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUtuQyxJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUUsQ0FBQztRQUNyRyxJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLEtBQUssSUFBSSxDQUFDLEdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUU7WUFHOUQsR0FBRyxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFL0IsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQW1CLENBQUM7WUFDbkcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU3RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDakIsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQzthQUN6RDtpQkFBTTtnQkFDSCxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQzNCLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ3hEO1NBQ0o7SUFDTCxDQUFDO0lBS0QsK0JBQWdCLEdBQWhCLFVBQWlCLFNBQXlCLEVBQUUsYUFBcUI7UUFDN0QsSUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUc7WUFDbkIsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUMsV0FBVyxHQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDekU7YUFBTTtZQUNILFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUM1QixTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxhQUFhLEdBQUcsU0FBUyxDQUFDLFdBQVcsR0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ3hFO1FBR0QsSUFBSyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFHO1lBQ3BCLElBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFHO2dCQUNuQixJQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFHO29CQUMvRixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUN6QztxQkFBTTtvQkFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUN4QzthQUNKO2lCQUFNO2dCQUNILElBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUc7b0JBQy9GLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7aUJBQ3pDO3FCQUFNO29CQUNILElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQ3hDO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFRCw4QkFBZSxHQUFmLFVBQWdCLFdBQTJCLEVBQUUsR0FBMkIsRUFBRSxJQUFvQjtRQUFwQixtQ0FBb0I7UUFDMUYsV0FBVyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELGdDQUFpQixHQUFqQixVQUFrQixPQUFPLEVBQUUsVUFBVTtRQUNqQyxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxVQUFVLEdBQUcsT0FBTyxDQUFDO0lBQ25ELENBQUM7SUFFRCw0QkFBYSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUNsRCxDQUFDO0lBRUQseUJBQVUsR0FBVixVQUFXLElBQW9CO1FBQzNCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxrQ0FBbUIsR0FBbkIsVUFBb0IsS0FBYSxFQUFFLElBQVk7UUFFM0MsSUFBSSxXQUFvQixDQUFDO1FBQ3pCLElBQUksSUFBWTtRQUdoQixJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBRSxDQUFDO1FBRTFGLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5DLElBQUssS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLE1BQU0sSUFBSSxDQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFFLEVBQUU7WUFDeEUsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNsQztRQUNELElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsV0FBVyxHQUFHLFdBQVcsSUFBSSxDQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7UUFFL0MsSUFBSSxHQUFHLENBQUMsQ0FBRSxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksR0FBRyxDQUFFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFFLENBQUM7UUFDL0QsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsV0FBVyxHQUFHLFdBQVcsSUFBSSxDQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7UUFFL0MsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUtPLHlCQUFVLEdBQWxCLFVBQW1CLFVBQTBCLEVBQUUsVUFBbUI7UUFDOUQsSUFBSSxLQUFLLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3JELFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVPLDJCQUFZLEdBQXBCLFVBQXFCLFNBQXlCLEVBQUUsWUFBcUI7UUFDakUsSUFBSSxPQUFPLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN6QyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDM0QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUxQixPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRU8sK0JBQWdCLEdBQXhCLFVBQXlCLEdBQVE7UUFDN0IsSUFBSyxJQUE2QixFQUFHO1lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQzdELElBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUc7Z0JBQzdCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ3REO2lCQUFNLElBQUssQ0FBQyxFQUFHO2dCQUNaLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDL0M7U0FDSjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU8sd0JBQVMsR0FBakIsVUFBa0IsQ0FBTTtRQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU8sNEJBQWEsR0FBckIsVUFBc0IsR0FBVztRQUU3QixPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDemVELElBQUksY0FBYyxHQUFhO0lBRzNCLFVBQVUsRUFBRSxTQUFTO0lBQ3JCLEtBQUssRUFBRSxJQUFJO0lBQ1gsTUFBTSxFQUFFLENBQUM7SUFDVCxNQUFNLEVBQUUsRUFBRTtJQUNWLElBQUksRUFBRSxDQUFDO0lBQ1AsT0FBTyxFQUFFLEtBQUs7SUFDZCxLQUFLLEVBQUUsSUFBSTtJQUVYLE1BQU0sRUFBRSxPQUFPO0lBQ2YsUUFBUSxFQUFFLEtBQUs7SUFDZixPQUFPLEVBQUUsS0FBSztJQUNkLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLEtBQUssRUFBRSxLQUFLO0lBQ1osU0FBUyxFQUFFLElBQUk7SUFDZixTQUFTLEVBQUUsS0FBSztDQUNuQjtBQUVRLHdDQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUM1Q3ZCLG1FQUFzQztBQUN0QyxnRUFBbUM7QUFDbkMsK0VBQW9DO0FBQ3BDLDhGQUFnRDtBQUVoRCw0RUFBb0M7QUFFcEMsNEVBQWtDO0FBR2xDLENBQUMsVUFBUyxDQUFDO0lBRVQsSUFBSSxPQUFPLEdBQVc7UUFFcEIsSUFBSSxFQUFFLFVBQVUsT0FBYTtZQUUzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBRWYsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBR25CLElBQUssQ0FBRSxJQUFJLEVBQUc7b0JBRVosT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLCtCQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBRWhELElBQUksS0FBSyxHQUFXLElBQUksZUFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUd2QyxJQUFJLElBQUksR0FBVSxJQUFJLGNBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUlqRCxJQUFJLEdBQUcsU0FBa0IsQ0FBQztvQkFDMUIsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3pDLElBQUksT0FBTyxHQUFHLElBQUksa0JBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFL0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxtQkFBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBRXBELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO3dCQUN6QixNQUFNLEVBQUcsTUFBTTt3QkFDZixLQUFLLEVBQUUsS0FBSzt3QkFDWixJQUFJLEVBQUUsSUFBSTt3QkFDVixTQUFTLEVBQUUsU0FBUzt3QkFDcEIsT0FBTyxFQUFFLE9BQU87cUJBQ2pCLENBQUMsQ0FBQztpQkFFSjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sRUFBRSxVQUFVLE9BQVk7WUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFFO2dCQUVoQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDckQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU1QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxPQUFPLEVBQUU7WUFDUCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUU7Z0JBRWhCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFFcEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDckIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVqQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxPQUFPLEVBQUUsVUFBVSxJQUFJO1lBSXJCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2pELElBQUksUUFBUSxHQUFjLElBQUksbUJBQVEsQ0FBRSxJQUFJLENBQUUsQ0FBQztZQUUvQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLENBQUM7S0FDRjtJQUdELE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLFVBQVUsTUFBTTtRQUdqQyxJQUFLLE9BQU8sQ0FBQyxNQUFnQixDQUFDLEVBQUc7WUFDL0IsT0FBTyxPQUFPLENBQUUsTUFBZ0IsQ0FBRSxDQUFDLEtBQUssQ0FBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFFLFNBQVMsRUFBRSxDQUFDLENBQUUsQ0FBQyxDQUFDO1NBQzdGO2FBQU0sSUFBSyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBRSxNQUFNLEVBQUc7WUFJbkQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRSxJQUFJLEVBQUUsU0FBUyxDQUFFLENBQUM7U0FDOUM7YUFBTTtZQUNMLENBQUMsQ0FBQyxLQUFLLENBQUUsZ0JBQWdCLEdBQUksTUFBTSxHQUFHLG1DQUFtQyxDQUFFLENBQUM7U0FDN0U7SUFFSCxDQUFDLENBQUM7QUFFSixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyIsImZpbGUiOiJzbGlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCBJT3B0aW9ucywgeyBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTW9kZWwge1xyXG4gICAgLy8gMVxyXG4gICAgZ2V0VmFsKCk6IG51bWJlcjtcclxuICAgIHNldFZhbChuZXdWYWw6IG51bWJlcik6IHZvaWQ7XHJcbiAgICAvLyAyXHJcbiAgICBnZXRSYW5nZSgpOiBbbnVtYmVyLCBudW1iZXJdO1xyXG4gICAgc2V0UmFuZ2UobmV3UmFuZ2U6IFtudW1iZXIsIG51bWJlcl0pOiB2b2lkO1xyXG4gICAgLy8gM1xyXG4gICAgZ2V0U3RlcCgpOiBudW1iZXI7XHJcbiAgICAvLyA0XHJcbiAgICBnZXRNaW5WYWwoKTogbnVtYmVyO1xyXG4gICAgLy8gNVxyXG4gICAgZ2V0TWF4VmFsKCk6IG51bWJlcjtcclxuICAgIC8vIDZcclxuICAgIGdldFJldmVyc2UoKTogYm9vbGVhbjtcclxuICAgIC8vIDdcclxuICAgIGdldEN1c3RvbVZhbHVlcygpOiBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcclxuICAgIC8vIDhcclxuICAgIGdldERhdGFGb3JtYXQoKTogc3RyaW5nO1xyXG4gICAgLy8gOVxyXG4gICAgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zO1xyXG5cclxuICAgIC8vINCy0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90YvQtSDQvNC10YLQvtC00YtcclxuICAgIGZpbmRQb3NpdGlvbkluQXJyKHZhbDogYW55LCBhcnI/OiBhbnlbXSk6IG51bWJlcjtcclxuICAgIGdldFN0ZXBOdW1iZXIodmFsOiBudW1iZXIpOiBudW1iZXI7XHJcbiAgICB0cmFuc2xhdGVCeVN0ZXAoc3RlcDogbnVtYmVyKTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTsgLy8g0L/QviDRiNCw0LPRg1xyXG4gICAgdHJhbnNsYXRlKHZhbDogbnVtYmVyKTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTsgLy8g0L/QviDQstCw0LvQuNC00L3QvtC80YMg0LfQvdCw0YfQtdC90LjRjlxyXG4gICAgbnVtYmVyT2ZTdGVwcygpOiBudW1iZXI7XHJcbiAgICBjaGFuZ2UobmV3T3B0aW9uczogYW55KTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTW9kZWxPcHRpb25zIHtcclxuICAgIGRhdGFGb3JtYXQ6IHN0cmluZztcclxuICAgIHZhbHVlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgbWluVmFsOiBudW1iZXI7XHJcbiAgICBtYXhWYWw6IG51bWJlcjtcclxuICAgIHN0ZXA6IG51bWJlcjtcclxuICAgIHJldmVyc2U6IGJvb2xlYW47XHJcbiAgICByYW5nZTogW251bWJlciwgbnVtYmVyXSB8IG51bGw7IFxyXG4gICAgY3VzdG9tVmFsdWVzPzogc3RyaW5nW107XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGVsIGltcGxlbWVudHMgSU1vZGVsIHtcclxuXHJcbiAgICBwcml2YXRlIF9kYXRhRm9ybWF0OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF92YWw6IG51bWJlciB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9taW5WYWw6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX21heFZhbDpudW1iZXI7ICAgXHJcbiAgICBwcml2YXRlIF9zdGVwOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9yZXZlcnNlOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBfY3VzdG9tVmFsdWVzPzogc3RyaW5nW10gfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9vcHRpb25zOiBJTW9kZWxPcHRpb25zIHwgYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFsbE9wdGlvbnM6IElPcHRpb25zKSB7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zOiBJT3B0aW9ucyA9IGFsbE9wdGlvbnM7XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0L3QtSDRg9C60LDQt9Cw0L3QviDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwg0YPQutCw0LfRi9Cy0LDQtdC8INC80LjQvdC40LzQsNC70YzQvdC+0LUuXHJcbiAgICAgICAgLy8g0Y3RgtC+INC90LXQvtCx0YXQvtC00LjQvNC+INGH0YLQvtCx0Ysg0L/RgNC+0LnRgtC4INCy0LDQu9C40LTQsNGG0LjRjiDQuCDQv9C+0YHRgtCw0LLQuNGC0Ywg0LHQtdCz0YPQvdC+0Log0YHQvtCz0LvQsNGB0L3QviDRiNCw0LPRgy5cclxuICAgICAgICAvLyDQtdGB0LvQuCDRg9C60LDQt9Cw0L0gcmFuZ2UsINC80LXQvdGP0LXQvCDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQvdCwIG51bGxcclxuICAgICAgICBvcHRpb25zLnZhbHVlID0gb3B0aW9ucy52YWx1ZSA/IG9wdGlvbnMudmFsdWUgOiBvcHRpb25zLm1pblZhbDtcclxuICAgICAgICBsZXQgdmFsaWRPcHRpb25zOiBJTW9kZWxPcHRpb25zO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnbnVtZXJpYycgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMubnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ2RhdGUnICkge1xyXG4gICAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LTQsNGC0Ysg0LIg0L3QsNGH0LDQu9GM0L3QvtC8INGE0L7RgtGA0LzQsNGC0LUsINC90LDQv9GAIGRkL21tL3l5eXlcclxuICAgICAgICAgICAgLy8g0YfRgtC+0LHRiyDQvNC+0LbQvdC+INCx0YvQu9C+INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCDQuNGFINC00LvRjyDQuNC30LzQtdC90LXQvdC40Y8g0LzQvtC00LXQu9C4XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBhbGxPcHRpb25zKTtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy5kYXRlRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnY3VzdG9tJyApIHtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy5jdXN0b21Gb3JtYXRWYWxpZGF0aW9uKG9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlcyA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9mIGRhdGEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RhdGFGb3JtYXQgPSB2YWxpZE9wdGlvbnMuZGF0YUZvcm1hdDtcclxuICAgICAgICB0aGlzLl92YWwgPSB2YWxpZE9wdGlvbnMudmFsdWU7XHJcbiAgICAgICAgdGhpcy5fbWluVmFsID0gdmFsaWRPcHRpb25zLm1pblZhbDtcclxuICAgICAgICB0aGlzLl9tYXhWYWwgPSB2YWxpZE9wdGlvbnMubWF4VmFsO1xyXG4gICAgICAgIHRoaXMuX3N0ZXAgPSB2YWxpZE9wdGlvbnMuc3RlcDtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlID0gdmFsaWRPcHRpb25zLnJldmVyc2U7XHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSB2YWxpZE9wdGlvbnMucmFuZ2U7XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tVmFsdWVzID0gdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlczsgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCAhPSAnZGF0ZScpIHRoaXMuX29wdGlvbnMgPSB2YWxpZE9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMVxyXG4gICAgZ2V0VmFsKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbDtcclxuICAgIH1cclxuICAgIHNldFZhbChuZXdWYWw6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXJlTnVtZXJpYyhuZXdWYWwpO1xyXG4gICAgICAgIHRoaXMub25lVmFsdWVWYWxpZGF0aW9uKHRoaXMuX21pblZhbCwgdGhpcy5fbWF4VmFsLCBuZXdWYWwsIHRoaXMuX3N0ZXApO1xyXG4gICAgICAgIHRoaXMuX3ZhbCA9IG5ld1ZhbDtcclxuICAgIH1cclxuICAgIC8vIDJcclxuICAgIGdldFJhbmdlKCk6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYW5nZTtcclxuICAgIH1cclxuICAgIHNldFJhbmdlKG5ld1JhbmdlOiBbbnVtYmVyLCBudW1iZXJdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcmVOdW1lcmljKG5ld1JhbmdlWzBdLCBuZXdSYW5nZVsxXSlcclxuICAgICAgICB0aGlzLnJhbmdlVmFsaWRhdGlvbih0aGlzLl9taW5WYWwsIHRoaXMuX21heFZhbCwgbmV3UmFuZ2UsIHRoaXMuX3N0ZXApO1xyXG5cclxuICAgICAgICBpZiAoIHRoaXMubWluTWF4VmFsaWRhdGlvbihuZXdSYW5nZVswXSwgbmV3UmFuZ2VbMV0sIHRoaXMuX3JldmVyc2UpICkge1xyXG4gICAgICAgICAgICB0aGlzLl9yYW5nZSA9IG5ld1JhbmdlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhbmdlID0gW25ld1JhbmdlWzFdLCBuZXdSYW5nZVswXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yYW5nZSA9IG5ld1JhbmdlO1xyXG4gICAgfVxyXG4gICAgLy8gM1xyXG4gICAgZ2V0U3RlcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwO1xyXG4gICAgfVxyXG4gICAgLy8gNFxyXG4gICAgZ2V0TWluVmFsKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pblZhbDtcclxuICAgIH1cclxuICAgIC8vIDVcclxuICAgIGdldE1heFZhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhWYWw7XHJcbiAgICB9XHJcbiAgICAvLyA2XHJcbiAgICBnZXRSZXZlcnNlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXZlcnNlO1xyXG4gICAgfVxyXG4gICAgLy8gN1xyXG4gICAgZ2V0Q3VzdG9tVmFsdWVzKCk6IGFueVtdIHtcclxuICAgICAgICBpZiAodGhpcy5fY3VzdG9tVmFsdWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyA4XHJcbiAgICBnZXREYXRhRm9ybWF0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFGb3JtYXQ7XHJcbiAgICB9XHJcbiAgICBnZXRPcHRpb25zKCk6IElNb2RlbE9wdGlvbnMge1xyXG5cclxuICAgICAgICBsZXQgb3B0czogSU1vZGVsT3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fcmFuZ2UgKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsOiBhbnk7XHJcbiAgICAgICAgICAgIC8vdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3ZhbCApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnRyYW5zbGF0ZSggdGhpcy5fdmFsICk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gKCcwJyArIHZhbC5nZXREYXRlKCkpLnNsaWNlKC0yKSArIFxyXG4gICAgICAgICAgICAgICAgJy8nICsgKCcwJyArICgxICsgdmFsLmdldE1vbnRoKCkpICkuc2xpY2UoLTIpICtcclxuICAgICAgICAgICAgICAgICcvJyArICggdmFsLmdldEZ1bGxZZWFyKCkgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuX3ZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0cy52YWx1ZSA9IHZhbDtcclxuICAgICAgICAgICAgb3B0cy5yYW5nZSA9IG51bGw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsOiBhbnk7XHJcbiAgICAgICAgICAgIGxldCBhcnI6IFthbnksIGFueV0gPSBbbnVsbCwgbnVsbF07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCAhPSAnZGF0ZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhcnIgPSB0aGlzLl9yYW5nZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnZGF0ZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnRyYW5zbGF0ZSggdGhpcy5fcmFuZ2VbMF0gKTtcclxuICAgICAgICAgICAgICAgIHZhbCA9ICgnMCcgKyB2YWwuZ2V0RGF0ZSgpKS5zbGljZSgtMikgKyBcclxuICAgICAgICAgICAgICAgICcvJyArICgnMCcgKyAoMSArIHZhbC5nZXRNb250aCgpKSApLnNsaWNlKC0yKSArXHJcbiAgICAgICAgICAgICAgICAnLycgKyB2YWwuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhcnJbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3JhbmdlWzFdICk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSAoJzAnICsgdmFsLmdldERhdGUoKSkuc2xpY2UoLTIpICsgXHJcbiAgICAgICAgICAgICAgICAnLycgKyAoJzAnICsgKDEgKyB2YWwuZ2V0TW9udGgoKSkgKS5zbGljZSgtMikgK1xyXG4gICAgICAgICAgICAgICAgJy8nICsgdmFsLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvcHRzLnZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgb3B0cy5yYW5nZSA9IGFycjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINCy0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90YvQtSDQvNC10YLQvtC00YtcclxuICAgIGZpbmRQb3NpdGlvbkluQXJyKHZhbDogYW55LCBhcnI/OiBhbnlbXSk6IG51bWJlciB7XHJcbiAgICAgICAgLy8g0LjRidC10YIg0L/QvtC30LjRhtC40Y4gdmFsINCyIGN1c3RvbSB2YWx1ZXNcclxuICAgICAgICAvLyDRgtCw0Log0LbQtSDQvNC+0LbQtdGCINCx0YvRgtGMINC40YHQv9C+0LvRjNC30L7QstCw0L0g0YEg0LvRjtCx0YvQvCDQtNGA0YPQs9C4INC80LDRgdGB0LjQstC+0LxcclxuICAgICAgICBpZiAoIGFyciAmJiBhcnIuaW5kZXhPZih2YWwpICE9IC0xICkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyLmluZGV4T2YodmFsKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCBhcnIgJiYgYXJyLmluZGV4T2YodmFsKSA9PSAtMSApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW50IGZpbmQgdmFsdWUgaW4gYXJyYXknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggIXRoaXMuX2N1c3RvbVZhbHVlcyApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5fY3VzdG9tVmFsdWVzLmluZGV4T2YodmFsKSAhPSAtMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbVZhbHVlcy5pbmRleE9mKHZhbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgdmFsaWQgdmFsdWUgZm9yIGN1c3RvbSB2YWx1ZXMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RlcE51bWJlcih2YWw6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgLy8g0L3QsNGF0L7QtNC40YIsINC90LAg0LrQsNC60L7QvCDQv9C+INGB0YfQtdGC0YMg0YjQsNCz0LUg0YHRgtC+0LjRgiB2YWxcclxuICAgICAgICAvLyDQv9GA0LjQvNC10L3Rj9GC0Ywg0YLQvtC70YzQutC+INC00LvRjyDQvdC10YLRgNCw0L3RgdGE0L7RgNC80LjRgNC+0LLQsNC90L3Ri9GFLCDQv9GA0LDQstC40LvRjNC90YvRhSDQt9C90LDRh9C10L3QuNC5IVxyXG4gICAgICAgIGxldCBzdGVwTnVtOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcblxyXG4gICAgICAgIGxldCBhOiBudW1iZXIgPSArKHZhbCAtIHRoaXMuX21pblZhbCkudG9GaXhlZChuKTtcclxuICAgICAgICBsZXQgYjogbnVtYmVyID0gKyh0aGlzLl9tYXhWYWwgLSB0aGlzLl9taW5WYWwpLnRvRml4ZWQobilcclxuICAgICAgICBcclxuICAgICAgICBzdGVwTnVtID0gKyggYSAqIHRoaXMubnVtYmVyT2ZTdGVwcygpIC8gYiApLnRvRml4ZWQoKTtcclxuICAgICAgICBzdGVwTnVtID0gTWF0aC5hYnMoc3RlcE51bSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGVwTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zbGF0ZUJ5U3RlcChzdGVwOiBudW1iZXIpOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnY3VzdG9tJykge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5fcmV2ZXJzZSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXNbc3RlcF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzW3RoaXMuX2N1c3RvbVZhbHVlcy5sZW5ndGggLSBzdGVwIC0gMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcbiAgICAgICAgICAgIGxldCByOiBudW1iZXIgPSAhdGhpcy5fcmV2ZXJzZSA/IDEgOiAtMTtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyID0gKyggKCt0aGlzLl9taW5WYWwpICsgKCt0aGlzLl9zdGVwKSAqICgrc3RlcCkgKiAoK3IpICkudG9GaXhlZChuKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdkYXRlJykgeyBcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpOyBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgcmV0dXJuIHZhbDsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNsYXRlKHZhbCk6IG51bWJlciB8IHN0cmluZyB8IERhdGUge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnY3VzdG9tJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzW3ZhbF07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnZGF0ZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbCk7IFxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbnVtYmVyT2ZTdGVwcygpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fbWluVmFsKSApO1xyXG4gICAgICAgIG4gPSBNYXRoLnBvdygxMCwgbik7XHJcbiAgICAgICAgcmV0dXJuICggTWF0aC5hYnModGhpcy5fbWF4VmFsIC0gdGhpcy5fbWluVmFsKSAqIG4gKSAvICggdGhpcy5fc3RlcCAqIG4gKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2UobmV3T3B0aW9uczogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBwcmV2T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IGFueSA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBuZXdPcHRpb25zKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgIT0gbnVsbCA/IG9wdGlvbnMudmFsdWUgOiBvcHRpb25zLm1pblZhbDtcclxuICAgICAgICBsZXQgdmFsaWRPcHRpb25zOiBJTW9kZWxPcHRpb25zO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnbnVtZXJpYycgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMubnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgcHJldk9wdGlvbnMgYXMgSU9wdGlvbnMpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ2RhdGUnICkge1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLmRhdGVGb3JtYXRWYWxpZGF0aW9uKG9wdGlvbnMsIHByZXZPcHRpb25zIGFzIElPcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBuZXdPcHRpb25zKTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnY3VzdG9tJyApIHtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy5jdXN0b21Gb3JtYXRWYWxpZGF0aW9uKG9wdGlvbnMsIHByZXZPcHRpb25zIGFzIElPcHRpb25zKTtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlcyA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9mIGRhdGEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RhdGFGb3JtYXQgPSB2YWxpZE9wdGlvbnMuZGF0YUZvcm1hdDtcclxuICAgICAgICB0aGlzLl92YWwgPSB2YWxpZE9wdGlvbnMudmFsdWU7XHJcbiAgICAgICAgdGhpcy5fbWluVmFsID0gdmFsaWRPcHRpb25zLm1pblZhbDtcclxuICAgICAgICB0aGlzLl9tYXhWYWwgPSB2YWxpZE9wdGlvbnMubWF4VmFsO1xyXG4gICAgICAgIHRoaXMuX3N0ZXAgPSB2YWxpZE9wdGlvbnMuc3RlcDtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlID0gdmFsaWRPcHRpb25zLnJldmVyc2U7XHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSB2YWxpZE9wdGlvbnMucmFuZ2U7XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tVmFsdWVzID0gdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlczsgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCAhPSAnZGF0ZScpIHRoaXMuX29wdGlvbnMgPSB2YWxpZE9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBudW1lcmljRm9ybWF0VmFsaWRhdGlvbihhbGxPcHRpb25zOiBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zKTogSU1vZGVsT3B0aW9ucyB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IElPcHRpb25zID0gYWxsT3B0aW9ucztcclxuICAgICAgICAvLyDQv9GA0LjRgdCy0LDQuNCy0LDQtdC8INC90LDRh9Cw0LvRjNC90YvQvCDQvtC/0YbQuNGP0Lwg0LTQtdGE0L7Qu9GC0L3Ri9C1INC30L3QsNGH0LXQvdC40Y8g0LjQtyBkZWZhdWx0T3B0aW9uc1xyXG4gICAgICAgIC8vINC90LDRh9Cw0LvRjNC90L7QvNGDINC30L3QsNGH0LXQvdC40Y4g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQvNC40L3QuNC80LDQu9GM0L3QvtC1XHJcbiAgICAgICAgLy8g0L/QviDQvNC10YDQtSDQv9GA0L7RhdC+0LbQtNC10L3QuNGPINCy0LDQu9C40LTQsNGG0LjQuCwg0LzQtdC90Y/QtdC8INC30L3QsNGH0LXQvdC40Y8g0L3QsCDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60LjQtVxyXG4gICAgICAgIGxldCBuZXdPcHRpb25zOiBJTW9kZWxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBkYXRhRm9ybWF0OiAnbnVtZXJpYycsXHJcbiAgICAgICAgICAgIHZhbHVlOiBkZWZhdWx0T3B0aW9ucy5taW5WYWwsXHJcbiAgICAgICAgICAgIG1pblZhbDogZGVmYXVsdE9wdGlvbnMubWluVmFsLFxyXG4gICAgICAgICAgICBtYXhWYWw6IGRlZmF1bHRPcHRpb25zLm1heFZhbCxcclxuICAgICAgICAgICAgc3RlcDogZGVmYXVsdE9wdGlvbnMuc3RlcCxcclxuICAgICAgICAgICAgcmV2ZXJzZTogZGVmYXVsdE9wdGlvbnMucmV2ZXJzZSxcclxuICAgICAgICAgICAgcmFuZ2U6IGRlZmF1bHRPcHRpb25zLnJhbmdlLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hcmVOdW1lcmljKG9wdGlvbnMubWF4VmFsLCBvcHRpb25zLm1pblZhbCwgb3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgbmV3T3B0aW9ucy5zdGVwID0gTWF0aC5hYnMob3B0aW9ucy5zdGVwKTtcclxuICAgICAgICBuZXdPcHRpb25zLnJldmVyc2UgPSBvcHRpb25zLnJldmVyc2UgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgbmV3T3B0aW9ucy5kYXRhRm9ybWF0ID0gb3B0aW9ucy5kYXRhRm9ybWF0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc3RlcFZhbGlkYXRpb24ob3B0aW9ucy5taW5WYWwsIG9wdGlvbnMubWF4VmFsLCBuZXdPcHRpb25zLnN0ZXApO1xyXG5cclxuICAgICAgICAvLyDQtdGB0LvQuCDQvNC40L0g0Lgg0LzQsNC60YEg0L/QtdGA0LXQv9GD0YLQsNC90Ysg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10LwsINC80LXQvdGP0LXQvCDQv9C+0YDRj9C00L7QulxyXG4gICAgICAgIC8vINC/0L7QtNGA0LDQt9GD0LzQtdCy0LDQtdGC0YHRjywg0YfRgtC+IG1pbiAtINGN0YLQviDRgtC+INGH0YLQviDRgdC70LXQstCwINC90LAg0YHQu9Cw0LnQtNC10YDQtSwgbWF4IC0g0YHQv9GA0LDQstCwXHJcbiAgICAgICAgaWYgKCB0aGlzLm1pbk1heFZhbGlkYXRpb24ob3B0aW9ucy5taW5WYWwsIG9wdGlvbnMubWF4VmFsLCBuZXdPcHRpb25zLnJldmVyc2UpICkge1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLm1pblZhbCA9IG9wdGlvbnMubWluVmFsO1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLm1heFZhbCA9IG9wdGlvbnMubWF4VmFsOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMubWluVmFsID0gb3B0aW9ucy5tYXhWYWw7XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMubWF4VmFsID0gb3B0aW9ucy5taW5WYWw7ICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgdGhpcy5yYW5nZVZhbGlkYXRpb24obmV3T3B0aW9ucy5taW5WYWwsIG5ld09wdGlvbnMubWF4VmFsLCBvcHRpb25zLnJhbmdlLCBuZXdPcHRpb25zLnN0ZXApO1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQvNC40L0g0Lgg0LzQsNC60YEg0LIg0LTQuNCw0L/QsNC30L7QvdC1IHJhbmdlINC/0LXRgNC10L/Rg9GC0LDQvdGLINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8LCDQvNC10L3Rj9C10Lwg0L/QvtGA0Y/QtNC+0LpcclxuICAgICAgICAgICAgaWYgKCB0aGlzLm1pbk1heFZhbGlkYXRpb24ob3B0aW9ucy5yYW5nZVswXSwgb3B0aW9ucy5yYW5nZVsxXSwgbmV3T3B0aW9ucy5yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgICAgIG5ld09wdGlvbnMucmFuZ2UgPSBvcHRpb25zLnJhbmdlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3T3B0aW9ucy5yYW5nZSA9IFtvcHRpb25zLnJhbmdlWzFdLCBvcHRpb25zLnJhbmdlWzBdXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g0L7RgtC80LXQvdGP0LXQvCDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwg0LTQsNC20LUg0LXRgdC70Lgg0L7QvdC+INCy0LLQtdC00LXQvdC+INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMudmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDQt9Cw0L/Rg9GB0LrQsNC10Lwg0L/RgNC+0LLQtdGA0LrQuCDQtNC70Y8g0L3QsNGH0LDQu9GM0L3QvtCz0L4g0LfQvdCw0YfQtdC90LjRjywg0YLQvtC70YzQutC+INC10YHQu9C4INC90LUg0YPQutCw0LfQsNC9INC00LjQsNC/0LDQt9C+0L0gcmFuZ2VcclxuICAgICAgICAgICAgdGhpcy5hcmVOdW1lcmljKG9wdGlvbnMudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLm9uZVZhbHVlVmFsaWRhdGlvbihuZXdPcHRpb25zLm1pblZhbCwgbmV3T3B0aW9ucy5tYXhWYWwsIG9wdGlvbnMudmFsdWUsIG5ld09wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgICAgICBuZXdPcHRpb25zLnZhbHVlID0gb3B0aW9ucy52YWx1ZTtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5yYW5nZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXdPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGRhdGVGb3JtYXRWYWxpZGF0aW9uKGFsbE9wdGlvbnM6IElPcHRpb25zLCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMpOiBJTW9kZWxPcHRpb25zIHtcclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnMgPSBhbGxPcHRpb25zO1xyXG5cclxuICAgICAgICB0aGlzLmN1c3RvbURhdGVWYWxpZGF0aW9uKG9wdGlvbnMubWluVmFsLCBvcHRpb25zLm1heFZhbCk7XHJcbiAgICAgICAgb3B0aW9ucy5taW5WYWwgPSB0aGlzLnRyYW5zbGF0ZURhdGVUb051bWJlcihvcHRpb25zLm1pblZhbCk7XHJcbiAgICAgICAgb3B0aW9ucy5tYXhWYWwgPSB0aGlzLnRyYW5zbGF0ZURhdGVUb051bWJlcihvcHRpb25zLm1heFZhbCk7XHJcbiAgICAgICAgb3B0aW9ucy5zdGVwID0gdGhpcy50cmFubGF0ZVN0ZXBUb0RhdGVGb3JtYXQob3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgaWYgKCBBcnJheS5pc0FycmF5KG9wdGlvbnMucmFuZ2UpICYmIG9wdGlvbnMucmFuZ2UubGVuZ3RoID09IDIgKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQstCy0LXQuyDRh9GC0L4g0YLQviDQtNGA0YPQs9C+0LUsINCwINC90LUgcmFuZ2UsINC90LAg0Y3RgtC+0LxcclxuICAgICAgICAgICAgLy8g0Y3RgtCw0L/QtSDQvtGI0LjQsdC60Lgg0L3QtSDQsdGD0LTQtdGCLiDQntC90LAg0L/QvtGP0LLQuNGC0YHRjyDQv9GA0Lgg0L/RgNC+0LLQtdGA0LrQtSDQvdCwIG51bWVyaWNGb3JtYXRWYWxpZGF0aW9uXHJcbiAgICAgICAgICAgIC8vICjQv9C+0YLQvtC80YMg0YfRgtC+IHJhbmdlINGC0LDQuiDQuCDQvtGB0YLQsNC10YLRgdGPIHRydWUpXHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0ZVZhbGlkYXRpb24ob3B0aW9ucy5yYW5nZVswXSwgb3B0aW9ucy5yYW5nZVsxXSk7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMF0gPSB0aGlzLnRyYW5zbGF0ZURhdGVUb051bWJlcihvcHRpb25zLnJhbmdlWzBdKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVsxXSA9IHRoaXMudHJhbnNsYXRlRGF0ZVRvTnVtYmVyKG9wdGlvbnMucmFuZ2VbMV0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbURhdGVWYWxpZGF0aW9uKG9wdGlvbnMudmFsdWUpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLm51bWVyaWNGb3JtYXRWYWxpZGF0aW9uKG9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBjdXN0b21Gb3JtYXRWYWxpZGF0aW9uKGFsbE9wdGlvbnM6IElPcHRpb25zLCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMpOiBJTW9kZWxPcHRpb25zIHtcclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnMgPSBhbGxPcHRpb25zO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLmN1c3RvbVZhbHVlcyApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjdXN0b21WYWx1ZXMgaXMgcmVxdWlyZWQgb3B0aW9uIGZvciBjdXN0b20gZm9ybWF0Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICggIUFycmF5LmlzQXJyYXkob3B0aW9ucy5jdXN0b21WYWx1ZXMpIHx8IG9wdGlvbnMuY3VzdG9tVmFsdWVzLmxlbmd0aCA8IDIgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY3VzdG9tVmFsdWVzIHNob3VsZCBiZSBhIHJhbmdlIHdpdGggdHdvIG9yIG1vcmUgaXRlbXMsIGxpa2UgWzEsIDIsIFwiYVwiXScpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIG9wdGlvbnMubWluVmFsID0gMDtcclxuICAgICAgICBvcHRpb25zLm1heFZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgb3B0aW9ucy5zdGVwID0gMTtcclxuXHJcbiAgICAgICAgLy8g0L/RgNC40L7RgNC40YLQtdGC0Ysg0L7Qv9GG0LjQuTpcclxuICAgICAgICAvLyAxLiByYW5nZSDQsiDRh9C40YHQu9Cw0YVcclxuICAgICAgICAvLyAyLiByYW5nZSDQsiDQt9C90LDRh9C10L3QuNGP0YVcclxuICAgICAgICAvLyAzLiB2YWx1ZSDQutCw0Log0YfQuNGB0LvQvlxyXG4gICAgICAgIC8vIDQuIHZhbHVlINC60LDQuiDQt9C90LDRh9C10L3QuNC1IFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5yYW5nZSB8fCBvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXMgKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFvcHRpb25zLnJhbmdlICYmIEFycmF5LmlzQXJyYXkob3B0aW9ucy5yYW5nZUluQ3VzdG9tVmFsdWVzKSAmJiBvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXMubGVuZ3RoID09IDIgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LLQstC10Lsg0YfRgtC+INGC0L4g0LTRgNGD0LPQvtC1LCDQsCDQvdC1IHJhbmdlLCDQvdCwINGN0YLQvtC8XHJcbiAgICAgICAgICAgICAgICAvLyDRjdGC0LDQv9C1INC+0YjQuNCx0LrQuCDQvdC1INCx0YPQtNC10YIuINCe0L3QsCDQv9C+0Y/QstC40YLRgdGPINC/0YDQuCDQv9GA0L7QstC10YDQutC1INC90LAgbnVtZXJpY0Zvcm1hdFZhbGlkYXRpb25cclxuICAgICAgICAgICAgICAgIC8vICjQv9C+0YLQvtC80YMg0YfRgtC+IHJhbmdlINGC0LDQuiDQuCDQvtGB0YLQsNC10YLRgdGPIHRydWUpXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJhbmdlID0gW107XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJhbmdlWzBdID0gdGhpcy5maW5kUG9zaXRpb25JbkFycihvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXNbMF0sIG9wdGlvbnMuY3VzdG9tVmFsdWVzKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMV0gPSB0aGlzLmZpbmRQb3NpdGlvbkluQXJyKG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlc1sxXSwgb3B0aW9ucy5jdXN0b21WYWx1ZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC90LUg0LLQstC10LTQtdC90YsgdmFsINC40LvQuCByYW5nZSDQsiBjdXN0b20gdmFsdWVzXHJcbiAgICAgICAgICAgIC8vINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0L/RgNC+0YHRgtGL0LUgdmFsdWUg0LjQu9C4IHJhbmdlLCDQtdGB0LvQuCDQvtC90Lgg0LXRgdGC0YwgXHJcbiAgICAgICAgICAgIGlmICggIW9wdGlvbnMudmFsdWUgJiYgb3B0aW9ucy52YWx1ZUluQ3VzdG9tVmFsdWVzICkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMuZmluZFBvc2l0aW9uSW5BcnIob3B0aW9ucy52YWx1ZUluQ3VzdG9tVmFsdWVzLCBvcHRpb25zLmN1c3RvbVZhbHVlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFyZU51bWVyaWMoLi4udmFsczogYW55KSB7XHJcbiAgICAgICAgZm9yIChsZXQgdmFsIG9mIHZhbHMpIHtcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5pc051bWVyaWModmFsKSApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIHZhbHVlcyBpbiBudW1lcmljIGZvcm1hdCBzaG91bGQgYmUgbnVtYmVycycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWluTWF4VmFsaWRhdGlvbihtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIsIHJldmVyc2U6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoICFyZXZlcnNlICYmIChtaW5WYWwgPj0gbWF4VmFsKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHJldmVyc2UgJiYgKG1pblZhbCA8PSBtYXhWYWwpICkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RlcFZhbGlkYXRpb24obWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyhzdGVwKSApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGVwIHNob3VsZCBiZSBhIG51bWJlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHN0ZXAgPT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGVwIGNhbnQgYmUgZXF1YWwgdG8gMCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcbiAgICAgICAgbGV0IHRlc3Q6IG51bWJlciA9ICsobWF4VmFsIC0gbWluVmFsKS50b0ZpeGVkKG4pXHJcbiAgICAgICAgdGVzdCA9ICggdGVzdCAqIE1hdGgucG93KDEwLCBuKSApIC8gKCBzdGVwICogTWF0aC5wb3coMTAsIG4pICk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBpZiAoIHRlc3QgJSAxICE9IDAgKSB7XHJcbiAgICAgICAgICAgIC8vINCyINGC0L7QvCDRh9C40YHQu9C1INGN0YLQviDQv9GA0L7QstC10YDQutCwINGH0YLQvtCx0Ysg0YjQsNCzINCx0YvQuyDQvdC1INCx0L7Qu9GM0YjQtSDQstGB0LXQs9C+INC/0YDQvtC80LXQttGD0YLQutCwXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignKE1heCB2YWx1ZSAtIG1pbiB2YWx1ZSkgZGl2aWRlZCBieSBzdGVwIHNob3VsZCByZXR1cm4gaW50ZWdlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uZVZhbHVlVmFsaWRhdGlvbihtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIsIHZhbDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXMoc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyhtaW5WYWwpICk7XHJcblxyXG4gICAgICAgIGxldCB0ZXN0OiBudW1iZXIgPSArKHZhbCAtIG1pblZhbCkudG9GaXhlZChuKVxyXG4gICAgICAgIHRlc3QgPSAoIHRlc3QgKiBNYXRoLnBvdygxMCwgbikgKSAvICggc3RlcCAqIE1hdGgucG93KDEwLCBuKSApO1xyXG4gICAgICAgIHRlc3QgPSBNYXRoLmFicyh0ZXN0KTtcclxuXHJcbiAgICAgICAgaWYgKCBNYXRoLm1heChtaW5WYWwsIG1heFZhbCkgPCB2YWwgIHx8ICBNYXRoLm1pbihtaW5WYWwsIG1heFZhbCkgPiB2YWwgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGluaXRpYWwgdmFsdWUgc2hvdWxkIGJlIHdpdGhpbiBtaW4gYW5kIG1heCB2YWx1ZXMnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHRlc3QgJSAxICE9IDAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWUgc2hvdWxkIGJlIHNldCBvbiBzdGVwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZ2VWYWxpZGF0aW9uKG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlciwgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0sIHN0ZXA6IG51bWJlcikge1xyXG5cclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuXHJcbiAgICAgICAgbGV0IHRlc3RMZWZ0OiBudW1iZXIgPSAocmFuZ2VbMF0gLSBtaW5WYWwpIC8gc3RlcDtcclxuICAgICAgICB0ZXN0TGVmdCA9ICt0ZXN0TGVmdC50b0ZpeGVkKG4pO1xyXG4gICAgICAgIHRlc3RMZWZ0ID0gTWF0aC5hYnModGVzdExlZnQpO1xyXG5cclxuICAgICAgICBsZXQgdGVzdFJpZ2h0OiBudW1iZXIgPSAocmFuZ2VbMV0gLSBtaW5WYWwpIC8gc3RlcDtcclxuICAgICAgICB0ZXN0UmlnaHQgPSArdGVzdFJpZ2h0LnRvRml4ZWQobik7XHJcbiAgICAgICAgdGVzdFJpZ2h0ID0gTWF0aC5hYnModGVzdFJpZ2h0KTtcclxuXHJcbiAgICAgICAgaWYgKCByYW5nZS5sZW5ndGggIT0gMiApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSYW5nZSBzaG91bGQgY29udGFpbiB0d28gdmFsdWVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggIXRoaXMuaXNOdW1lcmljKHJhbmdlWzBdKSB8fCAhdGhpcy5pc051bWVyaWMocmFuZ2VbMV0pICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlcyBpbiByYW5nZSBzaG91bGQgYmUgbnVtYmVycycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIE1hdGgubWF4KG1pblZhbCwgbWF4VmFsKSA8IE1hdGgubWF4KHJhbmdlWzBdLCByYW5nZVsxXSkgIHx8ICBNYXRoLm1pbihtaW5WYWwsIG1heFZhbCkgPiBNYXRoLm1pbihyYW5nZVswXSwgcmFuZ2VbMV0pICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSByYW5nZSBzaG91bGQgYmUgd2l0aGluIG1pbiBhbmQgbWF4IHZhbHVlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHRlc3RMZWZ0ICUgMSAhPSAwIHx8IHRlc3RSaWdodCAlIDEgIT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcmFuZ2Ugc2hvdWxkIGJlIHNldCBvbiBzdGVwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3VzdG9tRGF0ZVZhbGlkYXRpb24oLi4udmFsczogYW55W10pIHtcclxuICAgICAgICBmb3IgKCBsZXQgdmFsIG9mIHZhbHMgKSB7XHJcbiAgICAgICAgICAgIGlmICggISgnJyArIHZhbCkubWF0Y2goL15cXGR7Mn1bLlxcLy1dXFxkezJ9Wy5cXC8tXVxcZHs0fSQvKSApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIHZhbHVlcyBpbiBkYXRlIGZvcm1hdCBzaG91bGQgYmUgZGF0ZXMsIGxpa2UgZGQubW0ueXl5eSBvciBkZC9tbS95eXl5IG9yIGRkLW1tLXl5eXknKTsgXHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVEYXRlVG9OdW1iZXIoc3RyOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBhcnIgPSBzdHIuc3BsaXQoc3RyWzJdKTtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCthcnJbMl0sICthcnJbMV0gLSAxLCArYXJyWzBdKTtcclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LLQstC+0LTQuNGCINGB0YLRgNCw0L3QvdGL0LUg0LTQsNC90L3Ri9C1LCDQvtC9INCy0YHQtSDRgNCw0LLQvdC+INC/0L7Qu9GD0YfQuNGCINGA0LXQt9GD0LvRjNGC0LDRgi5cclxuICAgICAgICAvLyDQodC60L7RgNC10LUg0LLRgdC10LPQviwg0Y3RgtC+INCz0L7QstC+0YDQuNGCINC+INGC0L7QvCwg0YfRgtC+INC+0L0g0L/QtdGA0LXQv9GD0YLQsNC7INC/0L7RgNGP0LTQvtC6LiDQn9C+0Y/QstC40YLRgdGPINC/0YDQtdC00YPQv9GA0LXQttC00LXQvdC40LVcclxuICAgICAgICBpZiAoK2FyclswXSA+IDMxIHx8ICthcnJbMV0gPiAxMikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VzZSBkZC5tbS55eXl5IG9yIGRkL21tL3l5eXkgb3IgZGQtbW0teXl5eSBmb3IgZGF0ZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IGRhdGUsIHRyeSBkZC5tbS55eXl5IG9yIGRkL21tL3l5eXkgb3IgZGQtbW0teXl5eScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gK2RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFubGF0ZVN0ZXBUb0RhdGVGb3JtYXQoc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyhzdGVwKSB8fCBzdGVwICUgMSAhPSAwICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0ZXAgaW4gZGF0ZSBmb3JtYXQgc2hvdWxkIGJlIGludGVnZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0ZXAgKiAyNCAqIDM2MDAgKiAxMDAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGlzTnVtZXJpYyhuOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmICFpc05hTihuIC0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNpbWFsUGxhY2VzKG51bTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDQt9C90LDQutC+0LIg0L/QvtGB0LvQtSDQt9Cw0L/Rj9GC0L7QuVxyXG4gICAgICAgIHJldHVybiB+KG51bSArICcnKS5pbmRleE9mKCcuJykgPyAobnVtICsgJycpLnNwbGl0KCcuJylbMV0ubGVuZ3RoIDogMDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiDQmNC90YLRhNC10YDRhNC10LnRgSDQuNC30LTQsNGC0LXQu9GPINC+0LHRitGP0LLQu9GP0LXRgiDQvdCw0LHQvtGAINC80LXRgtC+0LTQvtCyINC00LvRjyDRg9C/0YDQsNCy0LvQtdC90LjRj9C80Lgg0L/QvtC00L/QuNGB0LrQuNGH0LDQvNC4LlxyXG4gKi9cclxuaW50ZXJmYWNlIElTdWJqZWN0IHtcclxuXHJcbiAgICB2YWw6IGFueSB8IFthbnksIGFueV07IFxyXG5cclxuICAgIC8vINCf0YDQuNGB0L7QtdC00LjQvdGP0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPINC6INC40LfQtNCw0YLQtdC70Y4uXHJcbiAgICBhdHRhY2gob2JzZXJ2ZXI6IElPYnNlcnZlcik6IHZvaWQ7XHJcblxyXG4gICAgLy8g0J7RgtGB0L7QtdC00LjQvdGP0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPINC+0YIg0LjQt9C00LDRgtC10LvRjy5cclxuICAgIGRldGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZDtcclxuXHJcbiAgICAvLyDQo9Cy0LXQtNC+0LzQu9GP0LXRgiDQstGB0LXRhSDQvdCw0LHQu9GO0LTQsNGC0LXQu9C10Lkg0L4g0YHQvtCx0YvRgtC40LguXHJcbiAgICBub3RpZnkoKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqINCY0LfQtNCw0YLQtdC70Ywg0LLQu9Cw0LTQtdC10YIg0L3QtdC60L7RgtC+0YDRi9C8INCy0LDQttC90YvQvCDRgdC+0YHRgtC+0Y/QvdC40LXQvCDQuCDQvtC/0L7QstC10YnQsNC10YIg0L3QsNCx0LvRjtC00LDRgtC10LvQtdC5INC+INC10LPQvlxyXG4gKiDQuNC30LzQtdC90LXQvdC40Y/RhS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YmplY3QgaW1wbGVtZW50cyBJU3ViamVjdCB7XHJcblxyXG4gICAgdmFsOiBhbnkgfCBbYW55LCBhbnldOyBcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggdmFsOiBhbnkgfCBbYW55LCBhbnldICkge1xyXG4gICAgICAgIHRoaXMudmFsID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge09ic2VydmVyW119INCh0L/QuNGB0L7QuiDQv9C+0LTQv9C40YHRh9C40LrQvtCyLiDQkiDRgNC10LDQu9GM0L3QvtC5INC20LjQt9C90Lgg0YHQv9C40YHQvtC6XHJcbiAgICAgKiDQv9C+0LTQv9C40YHRh9C40LrQvtCyINC80L7QttC10YIg0YXRgNCw0L3QuNGC0YzRgdGPINCyINCx0L7Qu9C10LUg0L/QvtC00YDQvtCx0L3QvtC8INCy0LjQtNC1ICjQutC70LDRgdGB0LjRhNC40YbQuNGA0YPQtdGC0YHRjyDQv9C+XHJcbiAgICAgKiDRgtC40L/RgyDRgdC+0LHRi9GC0LjRjyDQuCDRgi7QtC4pXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZXJzOiBJT2JzZXJ2ZXJbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JzQtdGC0L7QtNGLINGD0L/RgNCw0LLQu9C10L3QuNGPINC/0L7QtNC/0LjRgdC60L7QuS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJJbmRleCA9IHRoaXMub2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLnNwbGljZShvYnNlcnZlckluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCX0LDQv9GD0YHQuiDQvtCx0L3QvtCy0LvQtdC90LjRjyDQsiDQutCw0LbQtNC+0Lwg0L/QvtC00L/QuNGB0YfQuNC60LUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBub3RpZnkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qgb2JzZXJ2ZXIgb2YgdGhpcy5vYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIudXBkYXRlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCY0L3RgtC10YDRhNC10LnRgSDQndCw0LHQu9GO0LTQsNGC0LXQu9GPINC+0LHRitGP0LLQu9GP0LXRgiDQvNC10YLQvtC0INGD0LLQtdC00L7QvNC70LXQvdC40Y8sINC60L7RgtC+0YDRi9C5INC40LfQtNCw0YLQtdC70LhcclxuICog0LjRgdC/0L7Qu9GM0LfRg9GO0YIg0LTQu9GPINC+0L/QvtCy0LXRidC10L3QuNGPINGB0LLQvtC40YUg0L/QvtC00L/QuNGB0YfQuNC60L7Qsi5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmVyIHtcclxuICAgIGZ1bmM6IGFueTtcclxuICAgIC8vINCf0L7Qu9GD0YfQuNGC0Ywg0L7QsdC90L7QstC70LXQvdC40LUg0L7RgiDRgdGD0LHRitC10LrRgtCwLlxyXG4gICAgdXBkYXRlKHN1YmplY3Q6IFN1YmplY3QpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICog0JrQvtC90LrRgNC10YLQvdGL0LUg0J3QsNCx0LvRjtC00LDRgtC10LvQuCDRgNC10LDQs9C40YDRg9GO0YIg0L3QsCDQvtCx0L3QvtCy0LvQtdC90LjRjywg0LLRi9C/0YPRidC10L3QvdGL0LUg0JjQt9C00LDRgtC10LvQtdC8LCDQulxyXG4gKiDQutC+0YLQvtGA0L7QvNGDINC+0L3QuCDQv9GA0LjQutGA0LXQv9C70LXQvdGLLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9ic2VydmVyIGltcGxlbWVudHMgSU9ic2VydmVyIHtcclxuXHJcbiAgICBmdW5jOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZnVuYzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmZ1bmMgPSBmdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoc3ViamVjdDogU3ViamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnVuYyggc3ViamVjdC52YWwgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtJU3ViamVjdH07IiwiaW1wb3J0IElPcHRpb25zLCB7IGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCB7SU1vZGVsfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IHtJTW9kZWxPcHRpb25zfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IHtJVmlld30gZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IHtJU3ViamVjdH0gIGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlc2VudGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9tb2RlbDogSU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBfdmlldzogSVZpZXc7XHJcbiAgICBwcml2YXRlIF9zdWJqZWN0OiBJU3ViamVjdDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVUaHVtYjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IobW9kZWw6IElNb2RlbCwgdmlldzogSVZpZXcsIHN1YmplY3Q6IElTdWJqZWN0KSB7XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XHJcbiAgICAgICAgdGhpcy5fc3ViamVjdCA9IHN1YmplY3Q7XHJcblxyXG4gICAgICAgIHRoaXMudGh1bWJPbk1vdXNlRG93biA9IHRoaXMudGh1bWJPbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudGh1bWJPbk1vdXNlTW92ZSA9IHRoaXMudGh1bWJPbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudGh1bWJPbk1vdXNlVXAgPSB0aGlzLnRodW1iT25Nb3VzZVVwLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyT25Nb3VzZUNsaWNrID0gdGhpcy5zbGlkZXJPbk1vdXNlQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoICFtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICB0aGlzLl92aWV3LmdldFRodW1iKCkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Nb3VzZURvd24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMSkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Nb3VzZURvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDIpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy50aHVtYk9uTW91c2VEb3duKTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgdmlldy5nZXRTbGlkZXIoKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zbGlkZXJPbk1vdXNlQ2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHRodW1iT25Nb3VzZURvd24oZXZlbnQpIHtcclxuICAgICAgICAvLyDQv9GA0LXQtNC+0YLQstGA0LDRgtC40YLRjCDQt9Cw0L/Rg9GB0Log0LLRi9C00LXQu9C10L3QuNGPICjQtNC10LnRgdGC0LLQuNC1INCx0YDQsNGD0LfQtdGA0LApXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGh1bWIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnRodW1iT25Nb3VzZU1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnRodW1iT25Nb3VzZVVwKTtcclxuICAgICAgfVxyXG5cclxuICAgIHRodW1iT25Nb3VzZU1vdmUoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgbGV0IG1vZGVsOiBJTW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuICAgICAgICBsZXQgdmlldzogSVZpZXcgPSB0aGlzLl92aWV3O1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQgPSB0aGlzLl92aWV3LmdldFNsaWRlcigpO1xyXG4gICAgICBcclxuICAgICAgICBsZXQgbWluVmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNaW5WYWwoKTtcclxuICAgICAgICBsZXQgbWF4VmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNYXhWYWwoKTtcclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIGxldCByZXZlcnNlOiBudW1iZXIgPSAhdGhpcy5fbW9kZWwuZ2V0UmV2ZXJzZSgpID8gMSA6IC0xO1xyXG4gICAgICAgIGxldCBzbGlkZXJMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcuZ2V0TGVuZ2h0KCk7XHJcbiAgICAgICAgbGV0IHN0ZXBMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcub25lU3RlcExlbmdodCgpO1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyQm9yZGVyOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGV2ZW50UG9zOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHRodW1iUG9zaXRpb246IG51bWJlcjtcclxuICAgICAgICBsZXQgbGVmdFBvaW50OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHJpZ2h0UG9pbnQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgbmV3VmFsOiBudW1iZXI7XHJcblxyXG4gICAgICAgIC8vINCf0L7Qt9C40YbQuNGPINCx0LXQs9GD0L3QutCwINCyIHB4INCy0YvRh9C40YHQu9GP0LXRgtGB0Y8g0L7RgtC90L7RgdC40YLQtdC70YzQvdC+INC90LDRh9Cw0LvQsCDRgdC70LDQudC00LXRgNCwLlxyXG4gICAgICAgIC8vINCS0L3QsNGH0LDQu9C1IG5ld1ZhbCDQstGL0YfQuNGB0LvRj9C10YLRgdGPINC60LDQuiDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyINC+0YIg0L3QsNGH0LDQu9CwICjQvtGCIDApLFxyXG4gICAgICAgIC8vICjRgtC+INC10YHRgtGMINC30L3QsNGH0LXQvdC40Y8gbWluLCBtYXgsIHJldmVyc2Ug0L3QtSDQuNC80LXRjtGCINC30L3QsNGH0LXQvdC40Y8pLlxyXG5cclxuICAgICAgICBpZiAoICF2aWV3LmdldFZlcnRpY2FsKCkgKSB7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJCb3JkZXIgPSAoc2xpZGVyTm9kZS5vZmZzZXRXaWR0aCAtIHNsaWRlckxlbmdodCkgLyAyO1xyXG4gICAgICAgICAgICBldmVudFBvcyA9IGV2ZW50LmNsaWVudFg7ICAgICAgICAgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBldmVudFBvcyAtIHNsaWRlck5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHNsaWRlckJvcmRlcjtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHNsaWRlckJvcmRlciA9IChzbGlkZXJOb2RlLm9mZnNldEhlaWdodCAtIHNsaWRlckxlbmdodCkgLyAyO1xyXG4gICAgICAgICAgICBldmVudFBvcyA9IGV2ZW50LmNsaWVudFk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBldmVudFBvcyAtIHNsaWRlck5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gc2xpZGVyQm9yZGVyO1xyXG5cclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICBuZXdWYWwgPSBNYXRoLnJvdW5kKHRodW1iUG9zaXRpb24gLyBzdGVwTGVuZ2h0KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIG1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fYWN0aXZlVGh1bWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX3RodW1iX3JpZ2h0JykgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9GA0L7QvNC10LbRg9GC0L7Quiwg0YLQviDQu9C10LLQsNGPINCz0YDQsNC90LjRhtCwIC0g0Y3RgtC+INC70LXQstGL0Lkg0LHQtdCz0YPQvdC+0LpcclxuICAgICAgICAgICAgICAgIC8vINC30LTQtdGB0Ywg0YDQsNGB0YHRh9C40YLRi9Cy0LDQtdGC0YHRjyDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyINC+0YIg0L3QsNGH0LDQu9CwICjQvtGCIDApLCBcclxuICAgICAgICAgICAgICAgIC8vINC30LDRgtC10Lwg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0LIgcHgg0L7RgiDQvdCw0YfQsNC70LAg0YHQu9Cw0LnQtNC10YDQsC5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDQntGI0LjQsdC60Lgg0LIg0LLRi9GH0LjRgdC70LXQvdC40Y/RhSDRgSBmbG9hdCDQt9C00LXRgdGMINC80L7QttC90L4g0L/RgNC+0LjQs9C90L7RgNC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgICAgICAgICBsZWZ0UG9pbnQgPSAobW9kZWwuZ2V0UmFuZ2UoKVswXSAtIG1pblZhbCkgKiByZXZlcnNlIC8gc3RlcDtcclxuICAgICAgICAgICAgICAgIGxlZnRQb2ludCA9IGxlZnRQb2ludCAqIHN0ZXBMZW5naHQ7XHJcbiAgICAgICAgICAgICAgICByaWdodFBvaW50ID0gc2xpZGVyTGVuZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblZhbCA9IG1vZGVsLmdldFJhbmdlKClbMF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByaWdodFBvaW50ID0gKG1vZGVsLmdldFJhbmdlKClbMV0gLSBtaW5WYWwpICogcmV2ZXJzZSAvIHN0ZXA7XHJcbiAgICAgICAgICAgICAgICByaWdodFBvaW50ID0gcmlnaHRQb2ludCAqIHN0ZXBMZW5naHQ7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UG9pbnQgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIG1heFZhbCA9IG1vZGVsLmdldFJhbmdlKClbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZWZ0UG9pbnQgPSAwO1xyXG4gICAgICAgICAgICByaWdodFBvaW50ID0gc2xpZGVyTGVuZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICggdGh1bWJQb3NpdGlvbiA8PSBsZWZ0UG9pbnQpIHtcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGxlZnRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWluVmFsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHRodW1iUG9zaXRpb24gPj0gcmlnaHRQb2ludCkge1xyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gcmlnaHRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWF4VmFsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCx0LXQs9GD0L3QvtC6INC90LUg0LLRi9GI0LXQuyDQt9CwINCz0YDQsNC90LjRhtGLLCDRgdGC0LDQstC40Lwg0LXQs9C+INC90LAg0LHQu9C40LbQsNC50YjQtdC1INC30L3QsNGH0LXQvdC40LUsXHJcbiAgICAgICAgICAgIC8vINC60YDQsNGC0L3QvtC1INGI0LDQs9GDLlxyXG4gICAgICAgICAgICAvLyDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDRjdGC0L7Qs9C+INC/0YDQtdC+0LHRgNCw0LfRg9C10Lwg0LXQs9C+INC00LvRjyDQvNC+0LTQtdC70LguINCV0YHQu9C4IHJldmVyc2UgPT0gdHJ1ZSwg0YLQviA9PSAtMSBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IG5ld1ZhbCAqIHN0ZXBMZW5naHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmID0geCA9PiAoICh4LnRvU3RyaW5nKCkuaW5jbHVkZXMoJy4nKSkgPyAoeC50b1N0cmluZygpLnNwbGl0KCcuJykucG9wKCkubGVuZ3RoKSA6ICgwKSApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG4gPSBmKHN0ZXApICsgZihtaW5WYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSAoIG5ld1ZhbCAqIE1hdGgucG93KDEwLCBuKSAqIHN0ZXAgKiByZXZlcnNlICApIC8gTWF0aC5wb3coMTAsIG4pO1xyXG5cclxuICAgICAgICAgICAgbiA9IE1hdGgubWF4KCBmKHN0ZXApLCBmKG1pblZhbCkgKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKygoK25ld1ZhbCkudG9GaXhlZChuKSk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICgrbW9kZWwuZ2V0TWluVmFsKCkpICsgKCtuZXdWYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSArKCgrbmV3VmFsKS50b0ZpeGVkKG4pKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIG1vZGVsLmdldFJhbmdlKCkgJiYgdGhpcy5fYWN0aXZlVGh1bWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX3RodW1iX2xlZnQnKSkge1xyXG4gICAgICAgICAgICBtb2RlbC5zZXRSYW5nZSggW25ld1ZhbCwgbW9kZWwuZ2V0UmFuZ2UoKVsxXV0gKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmICggbW9kZWwuZ2V0UmFuZ2UoKSAmJiB0aGlzLl9hY3RpdmVUaHVtYi5jbGFzc0xpc3QuY29udGFpbnMoJ3NsaWRlcl9fdGh1bWJfcmlnaHQnKSkge1xyXG4gICAgICAgICAgICBtb2RlbC5zZXRSYW5nZSggW21vZGVsLmdldFJhbmdlKClbMF0sIG5ld1ZhbF0gKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0VmFsKG5ld1ZhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24odGhpcy5fYWN0aXZlVGh1bWIsIHRodW1iUG9zaXRpb24pO1xyXG5cclxuICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgpIHx8IHZpZXcuZ2V0VG9vbHRpcCgxKSApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKG5ld1ZhbCk7XHJcblxyXG4gICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggdGhpcy5fYWN0aXZlVGh1bWIucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fdG9vbHRpcCcpLCB2YWwsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRodW1iT25Nb3VzZVVwKGV2ZW50KSB7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMudGh1bWJPbk1vdXNlVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMudGh1bWJPbk1vdXNlTW92ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVRodW1iID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIC8vINC90LDQsdC70Y7QtNCw0YLQtdC70YxcclxuICAgICAgICBsZXQgbW9kZWw6IElNb2RlbCA9IHRoaXMuX21vZGVsO1xyXG5cclxuICAgICAgICBpZiAoIG1vZGVsLmdldFZhbCgpICE9IG51bGwgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSB2YWw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gW107XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMV0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2xpZGVyT25Nb3VzZUNsaWNrKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGxldCBtb2RlbDogSU1vZGVsID0gdGhpcy5fbW9kZWw7XHJcbiAgICAgICAgbGV0IHZpZXc6IElWaWV3ID0gdGhpcy5fdmlldztcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5fdmlldy5nZXRTbGlkZXIoKTtcclxuICAgICAgICBsZXQgY2hhbmdpbmdUaHVtYjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgIFxyXG4gICAgICAgIGxldCBtaW5WYWw6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldE1pblZhbCgpO1xyXG4gICAgICAgIGxldCBtYXhWYWw6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldE1heFZhbCgpO1xyXG4gICAgICAgIGxldCBzdGVwOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbGV0IHJldmVyc2U6IG51bWJlciA9ICF0aGlzLl9tb2RlbC5nZXRSZXZlcnNlKCkgPyAxIDogLTE7XHJcbiAgICAgICAgbGV0IHNsaWRlckxlbmdodDogbnVtYmVyID0gdGhpcy5fdmlldy5nZXRMZW5naHQoKTtcclxuICAgICAgICBsZXQgc3RlcExlbmdodDogbnVtYmVyID0gdGhpcy5fdmlldy5vbmVTdGVwTGVuZ2h0KCk7XHJcblxyXG4gICAgICAgIGxldCBzbGlkZXJCb3JkZXI6IG51bWJlcjtcclxuICAgICAgICBsZXQgZXZlbnRQb3M6IG51bWJlcjtcclxuICAgICAgICBsZXQgdGh1bWJQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZWZ0UG9pbnQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgcmlnaHRQb2ludDogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuZXdWYWw6IG51bWJlcjtcclxuXHJcbiAgICAgICAgLy8g0J/QvtC30LjRhtC40Y8g0LHQtdCz0YPQvdC60LAg0LIgcHgg0LLRi9GH0LjRgdC70Y/QtdGC0YHRjyDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L4g0L3QsNGH0LDQu9CwINGB0LvQsNC50LTQtdGA0LAuXHJcbiAgICAgICAgLy8g0JLQvdCw0YfQsNC70LUgbmV3VmFsINCy0YvRh9C40YHQu9GP0LXRgtGB0Y8g0LrQsNC6INC60L7Qu9C40YfQtdGB0YLQstC+INGI0LDQs9C+0LIg0L7RgiDQvdCw0YfQsNC70LAgKNC+0YIgMCksXHJcbiAgICAgICAgLy8gKNGC0L4g0LXRgdGC0Ywg0LfQvdCw0YfQtdC90LjRjyBtaW4sIG1heCwgcmV2ZXJzZSDQvdC1INC40LzQtdGO0YIg0LfQvdCw0YfQtdC90LjRjykuXHJcblxyXG4gICAgICAgIGlmICggIXRoaXMuX3ZpZXcuZ2V0VmVydGljYWwoKSApIHtcclxuXHJcbiAgICAgICAgICAgIHNsaWRlckJvcmRlciA9IChzbGlkZXJOb2RlLm9mZnNldFdpZHRoIC0gc2xpZGVyTGVuZ2h0KSAvIDI7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gZXZlbnQuY2xpZW50WDsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGV2ZW50UG9zIC0gc2xpZGVyTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gc2xpZGVyQm9yZGVyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJCb3JkZXIgPSAoc2xpZGVyTm9kZS5vZmZzZXRIZWlnaHQgLSBzbGlkZXJMZW5naHQpIC8gMjtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSBldmVudC5jbGllbnRZOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gZXZlbnRQb3MgLSBzbGlkZXJOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHNsaWRlckJvcmRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5ld1ZhbCA9IE1hdGgucm91bmQodGh1bWJQb3NpdGlvbiAvIHN0ZXBMZW5naHQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxlZnRQb2ludCA9IDA7XHJcbiAgICAgICAgcmlnaHRQb2ludCA9IHNsaWRlckxlbmdodDtcclxuICAgIFxyXG4gICAgICAgIGlmICggdGh1bWJQb3NpdGlvbiA8PSBsZWZ0UG9pbnQpIHtcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGxlZnRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWluVmFsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHRodW1iUG9zaXRpb24gPj0gcmlnaHRQb2ludCkge1xyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gcmlnaHRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWF4VmFsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCx0LXQs9GD0L3QvtC6INC90LUg0LLRi9GI0LXQuyDQt9CwINCz0YDQsNC90LjRhtGLLCDRgdGC0LDQstC40Lwg0LXQs9C+INC90LAg0LHQu9C40LbQsNC50YjQtdC1INC30L3QsNGH0LXQvdC40LUsXHJcbiAgICAgICAgICAgIC8vINC60YDQsNGC0L3QvtC1INGI0LDQs9GDLlxyXG4gICAgICAgICAgICAvLyDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDRjdGC0L7Qs9C+INC/0YDQtdC+0LHRgNCw0LfRg9C10Lwg0LXQs9C+INC00LvRjyDQvNC+0LTQtdC70LguINCV0YHQu9C4IHJldmVyc2UgPT0gdHJ1ZSwg0YLQviA9PSAtMSBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IG5ld1ZhbCAqIHN0ZXBMZW5naHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmID0geCA9PiAoICh4LnRvU3RyaW5nKCkuaW5jbHVkZXMoJy4nKSkgPyAoeC50b1N0cmluZygpLnNwbGl0KCcuJykucG9wKCkubGVuZ3RoKSA6ICgwKSApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG4gPSBmKHN0ZXApICsgZihtaW5WYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSAoIG5ld1ZhbCAqIE1hdGgucG93KDEwLCBuKSAqIHN0ZXAgKiByZXZlcnNlICApIC8gTWF0aC5wb3coMTAsIG4pO1xyXG5cclxuICAgICAgICAgICAgbiA9IE1hdGgubWF4KCBmKHN0ZXApLCBmKG1pblZhbCkgKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKygoK25ld1ZhbCkudG9GaXhlZChuKSk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICgrbW9kZWwuZ2V0TWluVmFsKCkpICsgKCtuZXdWYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSArKCgrbmV3VmFsKS50b0ZpeGVkKG4pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggIW1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgIG1vZGVsLnNldFZhbChuZXdWYWwpO1xyXG4gICAgICAgICAgICBjaGFuZ2luZ1RodW1iID0gdmlldy5nZXRUaHVtYigpO1xyXG4gICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oY2hhbmdpbmdUaHVtYiwgdGh1bWJQb3NpdGlvbik7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICggTWF0aC5hYnMobmV3VmFsIC0gbW9kZWwuZ2V0UmFuZ2UoKVswXSkgPCBNYXRoLmFicyhuZXdWYWwgLSBtb2RlbC5nZXRSYW5nZSgpWzFdKSApIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsLnNldFJhbmdlKFsgbmV3VmFsLCBtb2RlbC5nZXRSYW5nZSgpWzFdIF0pO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdpbmdUaHVtYiA9IHZpZXcuZ2V0VGh1bWIoMSk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oY2hhbmdpbmdUaHVtYiwgdGh1bWJQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb2RlbC5zZXRSYW5nZShbIG1vZGVsLmdldFJhbmdlKClbMF0sIG5ld1ZhbCBdKTtcclxuICAgICAgICAgICAgICAgIGNoYW5naW5nVGh1bWIgPSB2aWV3LmdldFRodW1iKDIpO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKGNoYW5naW5nVGh1bWIsIHRodW1iUG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoKSB8fCB2aWV3LmdldFRvb2x0aXAoMSkgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZShuZXdWYWwpO1xyXG5cclxuICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIGNoYW5naW5nVGh1bWIucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fdG9vbHRpcCcpLCB2YWwsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC90LDQsdC70Y7QtNCw0YLQtdC70YxcclxuICAgICAgICBpZiAoIG1vZGVsLmdldFZhbCgpICE9IG51bGwgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSB2YWw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gW107XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMV0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlKG9wdGlvbnM6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuICAgICAgICBsZXQgdmlldyA9IHRoaXMuX3ZpZXc7XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VUaHVtYlBvc2l0aW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNoYW5nZVRvb2x0aXBWYWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhbmdlU2NhbGVEaXZpc2lvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjaGFuZ2VWYWxUb1JhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNoYW5nZVJhbmdlVG9WYWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgcmVidWlsZFNjYWxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHJlYnVpbGRUb29sdGlwOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIDEuINCc0J7QlNCV0JvQrFxyXG4gICAgICAgIC8vINC10YHQu9C4INC80LXQvdGP0LXRgtGB0Y8g0LrQsNC60L7QuSDQu9C40LHQviDQv9Cw0YDQsNC80LXRgtGAINCyINC80L7QtNC10LvQuCwg0LfQsNC/0YPRgdC60LDQtdC8INC/0YDQvtCy0LXRgNC60Lgg0LzQvtC00LXQu9C4LFxyXG4gICAgICAgIC8vINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0L3QvtCy0YvQtSDQt9C90LDRh9C10L3QuNGPLlxyXG4gICAgICAgIC8vINC30LDQv9C+0LzQuNC90LDQtdC8LCDRh9GC0L4g0L3Rg9C20L3QviDQuNC30LzQtdC90LjRgtGMINC/0L7Qu9C+0LbQtdC90LjRjyDQv9C+0LvQt9GD0L3QutC+0LIsINC30L3QsNGH0LXQvdC40Y8g0LIg0L/QvtC00YHQutCw0LfQutCw0YUsXHJcbiAgICAgICAgLy8g0LTQtdC70LXQvdC40Lkg0YjQutCw0LvRiyAo0LfQvdCw0YfQtdC90LjRjyDQuCBsZWZ0KS4gXHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0LjQt9C80LXQvdC40LvQvtGB0Ywg0LrQvtC70LjRh9C10YHRgtCy0L4g0YjQsNCz0L7QsiAtIHRydWUg0L3QsCDQv9C10YDQtdGA0LjRgdC+0LLQsNGC0Ywg0YjQutCw0LvRgy5cclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C+0LzQtdC90Y/Qu9C+0YHRjCB2YWwg0L3QsCByYW5nZSwg0LjQu9C4INC90LDQvtCx0L7RgNC+0YIgLSB0cnVlINC90LAg0L/QvtGB0YLRgNC+0LjRgtGMISDQsdC10LPRg9C90LrQuC5cclxuXHJcblxyXG4gICAgICAgIGxldCBtb2RlbE9wdGlvbnMgPSBbJ2RhdGFGb3JtYXQnLCAndmFsdWUnLCAnbWluVmFsJywgJ21heFZhbCcsICdzdGVwJywgJ3JldmVyc2UnLCAncmFuZ2UnLCAnY3VzdG9tVmFsdWVzJywgJ3ZhbHVlSW5DdXN0b21WYWx1ZXMnLCAncmFuZ2VJbkN1c3RvbVZhbHVlcyddO1xyXG5cclxuICAgICAgICBsZXQgdGVzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG1vZGVsT3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KGl0ZW0pICkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIHRlc3QgKSB7XHJcbiAgICAgICAgICAgIGxldCBwcmV2TnVtT2ZTdGVwczogbnVtYmVyID0gbW9kZWwubnVtYmVyT2ZTdGVwcygpO1xyXG4gICAgICAgICAgICBsZXQgcHJldk9wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSBtb2RlbC5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdPcHRpb25zOiBJT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGVsLmNoYW5nZShuZXdPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIHZpZXcuc2V0TnVtYmVyT2ZTdGVwcyggbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGVTdGVwKCB2aWV3LnNjYWxlU3RlcFZhbGlkYXRpb24oIG1vZGVsLCB2aWV3LmdldFNjYWxlU3RlcCgpICkgKTtcclxuXHJcbiAgICAgICAgICAgIGNoYW5nZVRodW1iUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHByZXZOdW1PZlN0ZXBzICE9IG1vZGVsLm51bWJlck9mU3RlcHMoKSApIHtcclxuICAgICAgICAgICAgICAgIHJlYnVpbGRTY2FsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCB2aWV3LmdldFJhbmdlKCkgJiYgIW1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VSYW5nZVRvVmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlYnVpbGRUb29sdGlwID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoICF2aWV3LmdldFJhbmdlKCkgJiYgbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZVZhbFRvUmFuZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVidWlsZFRvb2x0aXAgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAyLiDQktCY0JRcclxuICAgICAgICAvLyDQn9C10YDQtdGA0LjRgdC+0LLRi9Cy0LDQtdC8INCy0LjQtCDQvtGCINGB0LDQvNGL0YUg0LPQu9C+0LHQsNC70YzQvdGL0YUg0LjQt9C80LXQvdC10L3QuNC5INC6INGB0LDQvNGL0Lwg0L3QtdC30L3QsNGH0LjRgtC10LvRjNC90YvQvC5cclxuICAgICAgICBcclxuICAgICAgICAvLyAyLjEg0KHQsNC80L7QtSDQsdC+0LvRjNGI0L7QtSDQuNC30LzQtdC90LXQvdC40LUgLSDRjdGC0L4g0LLQuNC0INC+0YHQvdC+0LLRiyDRiNC60LDQu9GLLlxyXG4gICAgICAgIC8vINCV0LUg0LjQt9C80LXQvdC10L3QuNC1INCy0YvQt9GL0LLQsNC10YI6INC40LfQvNC10L3QuNGC0Ywg0L/QvtC70L7QttC10L3QuNGPINCx0LXQs9GD0L3QutC+0LIsINC00LXQu9C10L3QuNC5INGI0LrQsNC70YtcclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCd2ZXJ0aWNhbCcpIHx8IG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2xlbmd0aCcpICkge1xyXG4gICAgICAgICAgICB2aWV3LmNoYW5nZVNsaWRlckJhc2Uob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNoYW5nZVRodW1iUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDIuMiDQnNC10L3Rj9C10Lwg0LrQvtC70LjRh9C10YHRgtCy0L4g0LHQtdCz0YPQvdC60L7Qsiwg0LXRgdC70Lgg0L3Rg9C20L3QvlxyXG4gICAgICAgIC8vINCV0YHQu9C4INGC0LDQutC+0LUg0LjQt9C80LXQvdC10L3QuNC1INCx0YvQu9C+LCDQt9C90LDRh9C40YIg0LLQtdC30LTQtSxcclxuICAgICAgICAvLyDQs9C00LUg0L3QsNC00L4sINGD0LbQtSDRgdGC0L7QuNGCIHRydWVcclxuXHJcbiAgICAgICAgaWYgKCBjaGFuZ2VSYW5nZVRvVmFsICkge1xyXG4gICAgICAgICAgICB2aWV3LmNoYW5nZVJhbmdlVG9WYWwobW9kZWwpO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKCkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Nb3VzZURvd24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIGNoYW5nZVZhbFRvUmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlVmFsVG9SYW5nZShtb2RlbCk7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMSkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Nb3VzZURvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDIpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy50aHVtYk9uTW91c2VEb3duKTtcclxuICAgICAgICB9ICAgXHJcblxyXG4gICAgICAgIC8vIDIuMyDQqNC60LDQu9CwLiDQo9C00LDQu9GP0LXQvCwg0YHRgtGA0L7QuNC8INC40LvQuCDQv9C10YDQtdGB0YLRgNCw0LjQstCw0LXQvC4g0JjQt9C80LXQvdGP0LXQvCDQtNC10LvQtdC90LjRjy5cclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCdzY2FsZVN0ZXAnKSAmJiBvcHRpb25zLnNjYWxlU3RlcCAhPSB2aWV3LmdldFNjYWxlU3RlcCgpICkge1xyXG4gICAgICAgICAgICB2aWV3LnNldFNjYWxlU3RlcCggdmlldy5zY2FsZVN0ZXBWYWxpZGF0aW9uKG1vZGVsLCBvcHRpb25zLnNjYWxlU3RlcCkgKTtcclxuICAgICAgICAgICAgcmVidWlsZFNjYWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2NhbGVNYXNrJykgJiYgb3B0aW9ucy5zY2FsZU1hc2sgIT0gdmlldy5nZXRTY2FsZU1hc2soKSApIHtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZU1hc2soIG9wdGlvbnMuc2NhbGVNYXNrICk7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDRg9C00LDQu9GP0LXQvFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2NhbGUnKSAmJiBvcHRpb25zLnNjYWxlID09IGZhbHNlICYmIHZpZXcuZ2V0U2NhbGUoKSApIHtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZSggdmlldy5yZW1vdmVOb2RlKCB2aWV3LmdldFNjYWxlKCkgKSApO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJlYnVpbGRTY2FsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDRgdGC0YDQvtC40LxcclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NjYWxlJykgJiYgb3B0aW9ucy5zY2FsZSA9PSB0cnVlICYmICF2aWV3LmdldFNjYWxlKCkgKSB7XHJcbiAgICAgICAgICAgIGxldCBzY2FsZTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHNjYWxlID0gdmlldy5idWlsZFNjYWxlKHZpZXcuZ2V0U2xpZGVyKCksIHZpZXcuZ2V0U2NhbGVTdGVwKCksIG1vZGVsLCB2aWV3LmdldFNjYWxlTWFzaygpICk7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGUoc2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgcmVidWlsZFNjYWxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgdGC0YDQsNC40LLQsNC10LxcclxuICAgICAgICBpZiAoIHJlYnVpbGRTY2FsZSAmJiB2aWV3LmdldFNjYWxlKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcucmVidWlsZFNjYWxlKG1vZGVsKTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC40LfQvNC10L3Rj9C10Lwg0LTQtdC70LXQvdC40Y8uINC30L3QsNGH0LXQvdC40LUg0LggbGVmdFxyXG4gICAgICAgIGlmICggY2hhbmdlU2NhbGVEaXZpc2lvbiAmJiB2aWV3LmdldFNjYWxlKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlU2NhbGVEaXZpc2lvbihtb2RlbCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gMi40INCf0L7QtNGB0LrQsNC30LrQuC4g0KPQtNCw0LvRj9C10LwuINCh0YLRgNC+0LjQvC4g0JzQtdC90Y/QtdC8INC30L3QsNGH0LXQvdC40Y9cclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCd0b29sdGlwTWFzaycpICYmIG9wdGlvbnMudG9vbHRpcE1hc2sgIT0gdmlldy5nZXRUb29sdGlwTWFzaygpICkge1xyXG4gICAgICAgICAgICB2aWV3LnNldFRvb2x0aXBNYXNrKCBvcHRpb25zLnRvb2x0aXBNYXNrICk7XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoICF2aWV3LmdldFRvb2x0aXAoKSAmJiAhdmlldy5nZXRUb29sdGlwKDEpICYmICFvcHRpb25zLmhhc093blByb3BlcnR5KCd0b29sdGlwJykgKSB7XHJcbiAgICAgICAgICAgIHJlYnVpbGRUb29sdGlwID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0YPQtNCw0LvRj9C10LxcclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCA9PSBmYWxzZSB8fCByZWJ1aWxkVG9vbHRpcCApIHtcclxuXHJcbiAgICAgICAgICAgIC8vINC/0L7Rh9C10LzRgyDQsiDQtNGA0YPQs9C+0Lwg0L/QvtGA0Y/QtNC60LUg0L3QtSDRgNCw0LHQvtGC0LDQtdGCXHJcbiAgICAgICAgICAgIGlmICggdmlldy5nZXRUb29sdGlwKDIpICkgdmlldy5zZXRUb29sdGlwKCB2aWV3LnJlbW92ZU5vZGUodmlldy5nZXRUb29sdGlwKDIpKSwgMiApO1xyXG4gICAgICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgxKSApIHZpZXcuc2V0VG9vbHRpcCggdmlldy5yZW1vdmVOb2RlKHZpZXcuZ2V0VG9vbHRpcCgxKSksIDEgKTtcclxuICAgICAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoKSApIHZpZXcuc2V0VG9vbHRpcCggdmlldy5yZW1vdmVOb2RlKHZpZXcuZ2V0VG9vbHRpcCgwKSksIDAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICggb3B0aW9ucy50b29sdGlwID09IGZhbHNlICkge1xyXG4gICAgICAgICAgICAgICAgcmVidWlsZFRvb2x0aXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC/0LXRgNC10YHRgtGA0LDQuNCy0LDQtdC8XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnRvb2x0aXAgfHwgcmVidWlsZFRvb2x0aXAgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuYnVpbGRWYWxpZFRvb2x0aXBzKG1vZGVsKTtcclxuICAgICAgICAgICAgY2hhbmdlVG9vbHRpcFZhbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQvNC10L3Rj9C10Lwg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICAgIGlmICggY2hhbmdlVG9vbHRpcFZhbCAmJiAodmlldy5nZXRUb29sdGlwKCkgfHwgdmlldy5nZXRUb29sdGlwKDEpKSApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbW9kZWwuZ2V0UmFuZ2UoKSkgeyBcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRWYWwoKSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIHZpZXcuZ2V0VG9vbHRpcCgpLCB2YWwgYXMgc3RyaW5nLCB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKTsgICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VmFsVG9Ub29sdGlwKCB2aWV3LmdldFRvb2x0aXAoMSksIHZhbCBhcyBzdHJpbmcsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggdmlldy5nZXRUb29sdGlwKDIpLCB2YWwgYXMgc3RyaW5nLCB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG5cclxuXHJcbiAgICAgICAgLy8gMi41INCf0L7Qu9C+0LbQtdC90LjRjyDQsdC10LPRg9C90LrQvtCyXHJcblxyXG4gICAgICAgIGlmICggY2hhbmdlVGh1bWJQb3NpdGlvbiApIHtcclxuICAgICAgICAgICAgbGV0IHBvczogbnVtYmVyO1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwb3MgPSB2aWV3LmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFZhbCgpKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oIHZpZXcuZ2V0VGh1bWIoKSwgcG9zKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7ICAgICBcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgcG9zID0gdmlldy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzBdKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oIHZpZXcuZ2V0VGh1bWIoMSksIHBvcyk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHBvcyA9IHZpZXcuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVsxXSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKCB2aWV3LmdldFRodW1iKDIpLCBwb3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDQvdCw0LHQu9GO0LTQsNGC0LXQu9GMXHJcbiAgICAgICAgICAgIC8vINCy0YvQt9GL0LLQsNC10Lwg0LXRgdC70Lgg0LHRi9C70Lgg0LjQt9C80LXQvdC10L3QuNGPINGB0LLRj9C30LDQvdC90YvQtSDRgSDQsdC10LPRg9C90LrQsNC80LhcclxuICAgICAgICAgICAgLy8g0L3QtSDQt9Cw0YLRgNC+0L3QtdGCLCDQvdCw0L/RgNC40LzQtdGALCDQtNC+0LHQsNCy0LvQtdC90LjQtSDRiNC60LDQu9GLXHJcbiAgICAgICAgICAgIGlmICggbW9kZWwuZ2V0VmFsKCkgIT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IHZhbDtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzBdID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVsxXSApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMV0gPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC5ub3RpZnkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgSU9wdGlvbnMgZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCBNb2RlbCwge0lNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCB7IHJ1bkluTmV3Q29udGV4dCB9IGZyb20gJ3ZtJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZpZXcge1xyXG5cclxuICAgIC8vINCz0LXRgtGC0LXRgNGLINC4INGB0LXRgtGC0LXRgNGLXHJcbiAgICBnZXRMZW5naHQoKTogbnVtYmVyO1xyXG4gICAgZ2V0VmVydGljYWwoKTogYm9vbGVhbjtcclxuICAgIGdldFJhbmdlKCk6IGJvb2xlYW47XHJcbiAgICBnZXRUb29sdGlwTWFzaygpOiBzdHJpbmc7XHJcbiAgICBzZXRUb29sdGlwTWFzayhtYXNrOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgZ2V0U2NhbGVTdGVwKCk6IG51bWJlcjtcclxuICAgIHNldFNjYWxlU3RlcChzdGVwOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgZ2V0U2NhbGVNYXNrKCk6IHN0cmluZztcclxuICAgIHNldFNjYWxlTWFzayhtYXNrOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgZ2V0TnVtYmVyT2ZTdGVwcygpOiBudW1iZXI7XHJcbiAgICBzZXROdW1iZXJPZlN0ZXBzKG51bTogbnVtYmVyKTogdm9pZDtcclxuXHJcbiAgICBnZXRTbGlkZXIoKTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRUaHVtYihudW0/OiBudW1iZXIpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFRvb2x0aXAobnVtPzogbnVtYmVyKTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBzZXRUb29sdGlwKHRvb2x0aXA6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkLCBudW0/OiBudW1iZXIpOiB2b2lkO1xyXG4gICAgZ2V0U2NhbGUoKTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBzZXRTY2FsZShzY2FsZTogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQpOiB2b2lkO1xyXG5cclxuXHJcbiAgICAvLyDQvNC10YLQvtC00Ysg0LTQu9GPINGB0L7Qt9C00LDQvdC40Y8g0Lgg0LjQt9C80LXQvdC10L3QuNGPIHZpZXdcclxuICAgIGNoYW5nZVNsaWRlckJhc2UgKG9wdGlvbnM6IGFueSk6IHZvaWQ7XHJcbiAgICBjaGFuZ2VSYW5nZVRvVmFsIChtb2RlbDogSU1vZGVsKTogdm9pZDtcclxuICAgIGNoYW5nZVZhbFRvUmFuZ2UgKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgYnVpbGRWYWxpZFRvb2x0aXBzKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgYnVpbGRTY2FsZShzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCwgc3RlcDogbnVtYmVyLCBtb2RlbDogSU1vZGVsLCBtYXNrOiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHJlYnVpbGRTY2FsZShtb2RlbDogSU1vZGVsKTogdm9pZDtcclxuICAgIGNoYW5nZVNjYWxlRGl2aXNpb24obW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcblxyXG4gICAgLy8g0LLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3Ri9C1INC80LXRgtC+0LTRi1xyXG4gICAgc2V0VGh1bWJQb3NpdGlvbih0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCB0aHVtYlBvc2l0aW9uOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgc2V0VmFsVG9Ub29sdGlwKHRvb2x0aXBOb2RlOiBIVE1MRGl2RWxlbWVudCwgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlLCBtYXNrOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgZmluZFRodW1iUG9zaXRpb24obmV3U3RlcCwgbnVtT2ZTdGVwcyk6IG51bWJlcjtcclxuICAgIG9uZVN0ZXBMZW5naHQoKTogbnVtYmVyO1xyXG4gICAgcmVtb3ZlTm9kZShub2RlOiBIVE1MRGl2RWxlbWVudCk6IHVuZGVmaW5lZDtcclxuICAgIHNjYWxlU3RlcFZhbGlkYXRpb24obW9kZWw6IElNb2RlbCwgc3RlcDogbnVtYmVyKTogbnVtYmVyOyAgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcgaW1wbGVtZW50cyBJVmlldyB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGVuZ2h0OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF92ZXJ0aWNhbDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3JhbmdlOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcE1hc2s6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3NjYWxlTWFzaz86IHN0cmluZztcclxuICAgIHByaXZhdGUgX3NjYWxlU3RlcD86IG51bWJlcjtcclxuICAgIHByaXZhdGUgX251bWJlck9mU3RlcHM6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9zbGlkZXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfdGh1bWI/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3RodW1iTGVmdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdGh1bWJSaWdodD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcExlZnQ/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBSaWdodD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGU/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1vZGVsOiBJTW9kZWwsIG9wdGlvbnM6IElPcHRpb25zLCBzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCkge1xyXG5cclxuICAgICAgICB0aGlzLl9zbGlkZXIgPSBzbGlkZXJOb2RlO1xyXG4gICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXInKTtcclxuICAgICAgICB0aGlzLl9yYW5nZSA9IG1vZGVsLmdldFJhbmdlKCkgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbnVtYmVyT2ZTdGVwcyA9IG1vZGVsLm51bWJlck9mU3RlcHMoKTtcclxuICAgICAgICB0aGlzLl9sZW5naHQgPSB0aGlzLmxlbmd0aFZhbGlkYXRpb24ob3B0aW9ucy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSB0aGlzLl9sZW5naHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaG9yaXpvbnRhbCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IHRoaXMuX2xlbmdodDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl92ZXJ0aWNhbCcpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBvczogbnVtYmVyO1xyXG4gICAgICAgIGlmICggIXRoaXMuX3JhbmdlICkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdGh1bWIgPSB0aGlzLmJ1aWxkVGh1bWIodGhpcy5fc2xpZGVyKTtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRWYWwoKSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iLCBwb3MpO1xyXG4gICAgICAgIH0gZWxzZSB7ICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iTGVmdCA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iX2xlZnQnKTsgXHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVswXSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iTGVmdCwgcG9zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iUmlnaHQgPSB0aGlzLmJ1aWxkVGh1bWIodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYl9yaWdodCcpO1xyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMV0pLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYlJpZ2h0LCBwb3MpO1xyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIC8vINC80LDRgdC60LAg0LTQu9GPINC/0L7QtNGB0LrQsNC30L7QulxyXG4gICAgICAgIC8vINC10YHQu9C4INC10LUg0L3QtdGCLCDQv9GA0LjQvNC10L3Rj9C10YLRgdGPINC+0LHRi9GH0L3QsNGPLCDQutC+0YLQvtGA0LDRjyDQv9C+INC00LXRhNC+0LvRgtGDINCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC/0YDQvtGB0YLQviB2YWxcclxuICAgICAgICAvLyAo0LIg0YTQvtGA0LzQsNGC0LUg0LTQsNGCINCy0LXRgNC90LXRgtGB0Y8g0L7QsdGK0LXQutGCINC00LDRgtCwKVxyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXBNYXNrID0gb3B0aW9ucy50b29sdGlwTWFzaztcclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnRvb2x0aXAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRWYWxpZFRvb2x0aXBzKG1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc2NhbGVNYXNrID0gb3B0aW9ucy5zY2FsZU1hc2s7XHJcblxyXG4gICAgICAgIGxldCBzdGVwOiBudW1iZXI7XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnNjYWxlU3RlcCApIHtcclxuICAgICAgICAgICAgc3RlcCA9IHRoaXMuc2NhbGVTdGVwVmFsaWRhdGlvbihtb2RlbCwgb3B0aW9ucy5zY2FsZVN0ZXApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NjYWxlU3RlcCA9IHN0ZXA7XHJcblxyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuc2NhbGUgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NjYWxlID0gdGhpcy5idWlsZFNjYWxlKHRoaXMuX3NsaWRlciwgc3RlcCwgbW9kZWwsIHRoaXMuX3NjYWxlTWFzayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vINCz0LXRgtGC0LXRgNGLINC4INGB0LXRgtGC0LXRgNGLXHJcbiAgICBnZXRMZW5naHQoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlci5jbGllbnRXaWR0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVyLmNsaWVudEhlaWdodDtcclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG4gICAgZ2V0VmVydGljYWwoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2FsO1xyXG4gICAgfVxyXG4gICAgZ2V0UmFuZ2UoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JhbmdlO1xyXG4gICAgfVxyXG4gICAgZ2V0VG9vbHRpcE1hc2soKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcE1hc2s7XHJcbiAgICB9XHJcbiAgICBzZXRUb29sdGlwTWFzayhtYXNrOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl90b29sdGlwTWFzayA9IG1hc2s7XHJcbiAgICB9XHJcbiAgICBnZXRTY2FsZVN0ZXAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVTdGVwO1xyXG4gICAgfVxyXG4gICAgc2V0U2NhbGVTdGVwKHN0ZXA6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NjYWxlU3RlcCA9IHN0ZXA7XHJcbiAgICB9XHJcbiAgICBnZXRTY2FsZU1hc2soKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVNYXNrO1xyXG4gICAgfVxyXG4gICAgc2V0U2NhbGVNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NjYWxlTWFzayA9IG1hc2s7XHJcbiAgICB9XHJcbiAgICBnZXROdW1iZXJPZlN0ZXBzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bWJlck9mU3RlcHM7XHJcbiAgICB9O1xyXG4gICAgc2V0TnVtYmVyT2ZTdGVwcyhudW06IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX251bWJlck9mU3RlcHMgPSBudW07XHJcbiAgICB9O1xyXG4gICAgXHJcblxyXG5cclxuICAgIGdldFNsaWRlcigpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlcjtcclxuICAgIH1cclxuICAgIGdldFRodW1iKG51bTogbnVtYmVyID0gMCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBpZiAoIG51bSA9PSAwICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGh1bWI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggbnVtID09IDEgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aHVtYkxlZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggbnVtID09IDIgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aHVtYlJpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fdGh1bWI7XHJcbiAgICB9XHJcbiAgICBnZXRUb29sdGlwKG51bTogbnVtYmVyID0gMCk6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXAgfHwgdGhpcy5fdG9vbHRpcExlZnQgKSB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcCAmJiBudW0gPT0gMCApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcExlZnQgJiYgbnVtID09IDEgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcExlZnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwUmlnaHQgJiYgbnVtID09IDIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcFJpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRUb29sdGlwKHRvb2x0aXA6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkLCBudW06IG51bWJlciA9IDApIHtcclxuICAgICAgICBpZiAoIG51bSA9PSAwICkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwID0gdG9vbHRpcDtcclxuICAgICAgICB9IGVsc2UgaWYgKCBudW0gPT0gMSApIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcExlZnQgPSB0b29sdGlwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIG51bSA9PSAyICkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwUmlnaHQgPSB0b29sdGlwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFNjYWxlKCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGU7XHJcbiAgICB9XHJcbiAgICBzZXRTY2FsZShzY2FsZTogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDQvNC10YLQvtC00Ysg0LTQu9GPINGB0L7Qt9C00LDQvdC40Y8g0Lgg0LjQt9C80LXQvdC10L3QuNGPIHZpZXdcclxuXHJcbiAgICBjaGFuZ2VTbGlkZXJCYXNlIChvcHRpb25zOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IGxlbmdodENoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8g0YjQuNGA0LjQvdCwIC8g0LTQu9C40L3QsFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5sZW5ndGggJiYgdGhpcy5fbGVuZ2h0ICE9IG9wdGlvbnMubGVuZ3RoICkge1xyXG4gICAgICAgICAgICB0aGlzLl9sZW5naHQgPSBvcHRpb25zLmxlbmd0aDtcclxuICAgICAgICAgICAgbGVuZ2h0Q2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQvtGA0LjQtdC90YLQsNGG0LjRj1xyXG4gICAgICAgIGlmICggb3B0aW9ucy52ZXJ0aWNhbCAmJiAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl9ob3Jpem9udGFsJylcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xyXG5cclxuICAgICAgICAgICAgbGVuZ2h0Q2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggb3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UgJiYgdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfdmVydGljYWwnKVxyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2hvcml6b250YWwnKTtcclxuXHJcbiAgICAgICAgICAgIGxlbmdodENoYW5nZWQgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGVuZ2h0Q2hhbmdlZCAmJiAhdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS53aWR0aCA9IHRoaXMuX2xlbmdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxlbmdodENoYW5nZWQgJiYgdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLndpZHRoID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IHRoaXMuX2xlbmdodDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUmFuZ2VUb1ZhbCAobW9kZWw6IElNb2RlbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwb3M6IG51bWJlcjtcclxuXHJcbiAgICAgICAgdGhpcy5fdGh1bWJMZWZ0ID0gdGhpcy5yZW1vdmVOb2RlKHRoaXMuX3RodW1iTGVmdCk7XHJcbiAgICAgICAgdGhpcy5fdGh1bWJSaWdodCA9IHRoaXMucmVtb3ZlTm9kZSh0aGlzLl90aHVtYlJpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGh1bWIgPSB0aGlzLmJ1aWxkVGh1bWIodGhpcy5fc2xpZGVyKTtcclxuICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFZhbCgpKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYiwgcG9zKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VWYWxUb1JhbmdlIChtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHBvczogbnVtYmVyO1xyXG5cclxuICAgICAgICB0aGlzLl90aHVtYiA9IHRoaXMucmVtb3ZlTm9kZSh0aGlzLl90aHVtYik7XHJcblxyXG4gICAgICAgIHRoaXMuX3RodW1iTGVmdCA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iX2xlZnQnKTsgXHJcbiAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzBdKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYkxlZnQsIHBvcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RodW1iUmlnaHQgPSB0aGlzLmJ1aWxkVGh1bWIodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYl9yaWdodCcpO1xyXG4gICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVsxXSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy5fdGh1bWJSaWdodCwgcG9zKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkVmFsaWRUb29sdGlwcyhtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9yYW5nZSkgeyBcclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcCApIHRoaXMuX3Rvb2x0aXAgPSB0aGlzLnJlbW92ZU5vZGUoIHRoaXMuX3Rvb2x0aXAgKTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRWYWwoKSApO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwID0gdGhpcy5idWlsZFRvb2x0aXAodGhpcy5fdGh1bWIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbFRvVG9vbHRpcCggdGhpcy5fdG9vbHRpcCwgdmFsLCB0aGlzLl90b29sdGlwTWFzayApOyAgIFxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXBMZWZ0ICkgdGhpcy5fdG9vbHRpcExlZnQgPSB0aGlzLnJlbW92ZU5vZGUoIHRoaXMuX3Rvb2x0aXBMZWZ0ICk7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwTGVmdCA9IHRoaXMuYnVpbGRUb29sdGlwKHRoaXMuX3RodW1iTGVmdCwgJ3NsaWRlcl9fdG9vbHRpcF9sZWZ0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsVG9Ub29sdGlwKCB0aGlzLl90b29sdGlwTGVmdCwgdmFsLCB0aGlzLl90b29sdGlwTWFzayApOyAgXHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXBSaWdodCApIHRoaXMuX3Rvb2x0aXBSaWdodCA9IHRoaXMucmVtb3ZlTm9kZSggdGhpcy5fdG9vbHRpcFJpZ2h0ICk7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVsxXSApO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwUmlnaHQgPSB0aGlzLmJ1aWxkVG9vbHRpcCh0aGlzLl90aHVtYlJpZ2h0LCAnc2xpZGVyX190b29sdGlwX3JpZ2h0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsVG9Ub29sdGlwKCB0aGlzLl90b29sdGlwUmlnaHQsIHZhbCwgdGhpcy5fdG9vbHRpcE1hc2sgKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkU2NhbGUoc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQsIHN0ZXA6IG51bWJlciwgbW9kZWw6IElNb2RlbCwgbWFzazogc3RyaW5nKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGxldCBzY2FsZTogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBsZXQgZGl2aXNpb246IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcblxyXG4gICAgICAgIHNjYWxlLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUnKTtcclxuICAgICAgICBzbGlkZXJOb2RlLnByZXBlbmQoc2NhbGUpO1xyXG5cclxuICAgICAgICAvLyDQvNC90L7QttC40YLQtdC70YwuINCy0L4g0YHQutC+0LvRjNC60L4g0YDQsNC3INGI0LDQsyDQsiDQvNC+0LTQtdC70LUg0LzQtdC90YzRiNC1INGI0LDQs9CwINGI0LrQsNC70YtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyhzdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKG1vZGVsLmdldFN0ZXAoKSkgKTtcclxuICAgICAgICBsZXQgbXVsdDogbnVtYmVyID0gc3RlcCAvIG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICBtdWx0ID0gKygrbXVsdCkudG9GaXhlZChuKTtcclxuICAgICAgICBtdWx0ID0gTWF0aC5hYnMobXVsdCk7ICAgICBcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDw9IG1vZGVsLm51bWJlck9mU3RlcHMoKTsgaSA9IGkgKyBtdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBpICsgbXVsdCDQstC+0LfQstGA0LDRidCw0LXRgiDQvdCwINC60LDQutC+0Lkg0YjQsNCzINC80L7QtNC10LvQuCDQv9C+0L/QsNC00LDQtdGCINGI0LDQsyDRiNC60LDQu9GLXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZUJ5U3RlcChpKTtcclxuXHJcbiAgICAgICAgICAgIGRpdmlzaW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUtZGl2aXNpb24nKTtcclxuICAgICAgICAgICAgZGl2aXNpb24uaW5uZXJIVE1MID0gJzxzcGFuPicgKyAgZXZhbChtYXNrKSArICc8L3NwYW4+JztcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLmxlZnQgPSB0aGlzLm9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUudG9wID0gdGhpcy5vbmVTdGVwTGVuZ2h0KCkgKiBpICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2NhbGUuYXBwZW5kKGRpdmlzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlYnVpbGRTY2FsZShtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNjYWxlOiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuZ2V0U2NhbGUoKTtcclxuICAgICAgICBsZXQgcHJldk51bU9mU3RlcHM6IG51bWJlciA9IHNjYWxlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXJfX3NjYWxlLWRpdmlzaW9uJykubGVuZ3RoIC0gMTtcclxuICAgICAgICBsZXQgbmV3TnVtT2ZTdGVwczogbnVtYmVyO1xyXG4gICAgICAgIGxldCBkaXZpc2lvbjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g0LzQvdC+0LbQuNGC0LXQu9GMLiDQstC+INGB0LrQvtC70YzQutC+INGA0LDQtyDRiNCw0LMg0LIg0LzQvtC00LXQu9C1INC80LXQvdGM0YjQtSDRiNCw0LPQsCDRiNC60LDQu9GLXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fc2NhbGVTdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKG1vZGVsLmdldFN0ZXAoKSkgKTtcclxuICAgICAgICBsZXQgbXVsdDogbnVtYmVyID0gdGhpcy5fc2NhbGVTdGVwIC8gbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIG11bHQgPSArbXVsdC50b0ZpeGVkKG4pO1xyXG4gICAgICAgIG11bHQgPSBNYXRoLmFicyhtdWx0KTtcclxuXHJcbiAgICAgICAgbmV3TnVtT2ZTdGVwcyA9IG1vZGVsLm51bWJlck9mU3RlcHMoKSAvIG11bHQ7XHJcblxyXG4gICAgICAgIGlmICggcHJldk51bU9mU3RlcHMgPiBuZXdOdW1PZlN0ZXBzICkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgKHByZXZOdW1PZlN0ZXBzIC0gbmV3TnVtT2ZTdGVwcyk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUubGFzdENoaWxkLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggcHJldk51bU9mU3RlcHMgPCBuZXdOdW1PZlN0ZXBzICkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgKG5ld051bU9mU3RlcHMgLSBwcmV2TnVtT2ZTdGVwcyk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUtZGl2aXNpb24nKTtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLmlubmVySFRNTCA9ICc8c3Bhbj48L3NwYW4+JztcclxuICAgICAgICAgICAgICAgIHNjYWxlLmFwcGVuZChkaXZpc2lvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlU2NhbGVEaXZpc2lvbihtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGRpdmlzaW9uOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgIGxldCBtYXNrOiBzdHJpbmcgPSB0aGlzLl9zY2FsZU1hc2s7XHJcblxyXG4gICAgICAgIC8vbGV0IG1vZGVsU3RlcDogbnVtYmVyID0gbW9kZWwuZ2V0U3RlcCgpO1xyXG5cclxuICAgICAgICAvLyDQvNC90L7QttC40YLQtdC70YwuINCy0L4g0YHQutC+0LvRjNC60L4g0YDQsNC3INGI0LDQsyDQsiDQvNC+0LTQtdC70LUg0LzQtdC90YzRiNC1INGI0LDQs9CwINGI0LrQsNC70YtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9zY2FsZVN0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG4gICAgICAgIGxldCBtdWx0OiBudW1iZXIgPSB0aGlzLl9zY2FsZVN0ZXAgLyBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbXVsdCA9ICttdWx0LnRvRml4ZWQobik7XHJcbiAgICAgICAgbXVsdCA9IE1hdGguYWJzKG11bHQpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPD0gbW9kZWwubnVtYmVyT2ZTdGVwcygpOyBpID0gaSArIG11bHQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGkgKyBtdWx0INCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC90LAg0LrQsNC60L7QuSDRiNCw0LMg0LzQvtC00LXQu9C4INC/0L7Qv9Cw0LTQsNC10YIg0YjQsNCzINGI0LrQsNC70YtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlQnlTdGVwKGkpO1xyXG5cclxuICAgICAgICAgICAgZGl2aXNpb24gPSB0aGlzLmdldFNjYWxlKCkucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlcl9fc2NhbGUtZGl2aXNpb24nKVtpIC8gbXVsdF0gYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS50ZXh0Q29udGVudCA9ICcnICsgZXZhbChtYXNrKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLnRvcCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS5sZWZ0ID0gdGhpcy5vbmVTdGVwTGVuZ2h0KCkgKiBpICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLmxlZnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUudG9wID0gdGhpcy5vbmVTdGVwTGVuZ2h0KCkgKiBpICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g0LLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3Ri9C1INC80LXRgtC+0LTRi1xyXG5cclxuICAgIHNldFRodW1iUG9zaXRpb24odGh1bWJOb2RlOiBIVE1MRGl2RWxlbWVudCwgdGh1bWJQb3NpdGlvbjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS50b3AgPSBudWxsO1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUubGVmdCA9IHRodW1iUG9zaXRpb24gLSB0aHVtYk5vZGUub2Zmc2V0V2lkdGgvMiArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLmxlZnQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUudG9wID0gdGh1bWJQb3NpdGlvbiAtIHRodW1iTm9kZS5vZmZzZXRXaWR0aC8yICsgJ3B4JzsgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQtdGB0LvQuCDQvtCx0LAg0LHQtdCz0YPQvdC60LAg0YHQv9GA0LDQstCwLCDQtNC+0LHQsNCy0LvQtdC8IHogaW5kZXgg0LTQu9GPINC90LjQttC90LXQs9C+XHJcbiAgICAgICAgaWYgKCB0aGlzLmdldFRodW1iKDEpICkge1xyXG4gICAgICAgICAgICBpZiAoICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgICAgIGlmICggKHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUubGVmdCA9PSAodGhpcy5nZXRMZW5naHQoKSAtIHRoaXMuZ2V0VGh1bWIoMSkuY2xpZW50V2lkdGgvMikgKyAncHgnKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRodW1iKDEpLnN0eWxlLnpJbmRleCA9ICcxMDAnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRodW1iKDEpLnN0eWxlLnpJbmRleCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICggKHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUudG9wID09ICh0aGlzLmdldExlbmdodCgpIC0gdGhpcy5nZXRUaHVtYigxKS5jbGllbnRIZWlnaHQvMikgKyAncHgnKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRodW1iKDEpLnN0eWxlLnpJbmRleCA9ICcxMDAnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRodW1iKDEpLnN0eWxlLnpJbmRleCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsVG9Ub29sdGlwKHRvb2x0aXBOb2RlOiBIVE1MRGl2RWxlbWVudCwgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlLCBtYXNrOiBzdHJpbmcgPSAndmFsJyk6IHZvaWQge1xyXG4gICAgICAgIHRvb2x0aXBOb2RlLnRleHRDb250ZW50ID0gZXZhbChtYXNrKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kVGh1bWJQb3NpdGlvbihuZXdTdGVwLCBudW1PZlN0ZXBzKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRMZW5naHQoKSAvIG51bU9mU3RlcHMgKiBuZXdTdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIG9uZVN0ZXBMZW5naHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGVuZ2h0KCkgLyB0aGlzLl9udW1iZXJPZlN0ZXBzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZU5vZGUobm9kZTogSFRNTERpdkVsZW1lbnQpOiB1bmRlZmluZWQge1xyXG4gICAgICAgIG5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBzY2FsZVN0ZXBWYWxpZGF0aW9uKG1vZGVsOiBJTW9kZWwsIHN0ZXA6IG51bWJlcik6IG51bWJlciB7XHJcblxyXG4gICAgICAgIGxldCBzdGVwSXNWYWxpZDogYm9vbGVhbjtcclxuICAgICAgICBsZXQgdGVzdDogbnVtYmVyXHJcblxyXG4gICAgICAgIC8vINC+0LrRgNGD0LPQu9GP0LXQvCwg0YfRgtC+0LHRiyDQuNC30LHQtdC20LDRgtGMINC/0YDQvtCx0LvQtdC8INC/0YDQuCDQstGL0YfQuNGB0LvQtdC90LjRj9GFINGBINC/0LvQsNCy0LDRjtGJ0LXQuSDRgtC+0YfQutC+0LlcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyhzdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKG1vZGVsLmdldFN0ZXAoKSkgKTtcclxuXHJcbiAgICAgICAgc3RlcElzVmFsaWQgPSB0aGlzLmlzTnVtZXJpYyhzdGVwKTtcclxuXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXREYXRhRm9ybWF0KCkgPT0gJ2RhdGUnICYmICggc3RlcCAlICgyNCAqIDM2MDAgKiAxMDAwKSAhPSAwICkpIHtcclxuICAgICAgICAgICAgc3RlcCA9IHN0ZXAgKiAyNCAqIDM2MDAgKiAxMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZXN0ID0gKHN0ZXAgKiBNYXRoLnBvdygxMCwgbikpIC8gKG1vZGVsLmdldFN0ZXAoKSAqIE1hdGgucG93KDEwLCBuKSk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBzdGVwSXNWYWxpZCA9IHN0ZXBJc1ZhbGlkICYmICggdGVzdCAlIDEgPT0gMCApO1xyXG5cclxuICAgICAgICB0ZXN0ID0gKyggbW9kZWwuZ2V0TWF4VmFsKCkgLSBtb2RlbC5nZXRNaW5WYWwoKSApLnRvRml4ZWQobik7XHJcbiAgICAgICAgdGVzdCA9ICggdGVzdCAqIE1hdGgucG93KDEwLCBuKSApIC8gKCBzdGVwICogTWF0aC5wb3coMTAsIG4pICk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBzdGVwSXNWYWxpZCA9IHN0ZXBJc1ZhbGlkICYmICggdGVzdCAlIDEgPT0gMCApO1xyXG5cclxuICAgICAgICBzdGVwID0gc3RlcElzVmFsaWQgPyBzdGVwIDogbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIHJldHVybiBzdGVwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDQv9GA0LjQstCw0YLQvdGL0LUg0YTRg9C90LrRhtC40LhcclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkVGh1bWIoc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQsIHRodW1iQ2xhc3M/OiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IHRodW1iOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAgICAgXHJcbiAgICAgICAgdGh1bWIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX190aHVtYicpO1xyXG4gICAgICAgIHRodW1iQ2xhc3MgPyB0aHVtYi5jbGFzc0xpc3QuYWRkKHRodW1iQ2xhc3MpIDogZmFsc2U7XHJcbiAgICAgICAgc2xpZGVyTm9kZS5hcHBlbmQodGh1bWIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGh1bWI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZFRvb2x0aXAodGh1bWJOb2RlOiBIVE1MRGl2RWxlbWVudCwgdG9vbHRpcENsYXNzPzogc3RyaW5nKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGxldCB0b29sdGlwOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRvb2x0aXAuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX190b29sdGlwJyk7XHJcbiAgICAgICAgdG9vbHRpcENsYXNzID8gdG9vbHRpcC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBDbGFzcykgOiBmYWxzZTtcclxuICAgICAgICB0aHVtYk5vZGUuYXBwZW5kKHRvb2x0aXApO1xyXG5cclxuICAgICAgICByZXR1cm4gdG9vbHRpcDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBsZW5ndGhWYWxpZGF0aW9uKHN0cjogYW55KSB7XHJcbiAgICAgICAgaWYgKCB0eXBlb2YgKCcnICsgc3RyKSA9PSAnc3RyaW5nJyApIHtcclxuICAgICAgICAgICAgbGV0IHIgPSAoJycgKyBzdHIpLm1hdGNoKC9eXFxkezEsM31bLixdP1xcZCoocHh8ZW18cmVtfCUpPyQvaSk7XHJcbiAgICAgICAgICAgIGlmICggciAmJiB0aGlzLmlzTnVtZXJpYyhyWzBdKSApIHsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gclswXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJywnLCAnLicpICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggciApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnLCcsICcuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaWR0aCAob3IgaGVpZ2h0KSBzaG91bGQgYmUgdmFsaWQgdG8gY3NzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc051bWVyaWMobjogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiAhaXNOYU4obiAtIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVjaW1hbFBsYWNlcyhudW06IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgLy8g0LrQvtC70LjRh9C10YHRgtCy0L4g0LfQvdCw0LrQvtCyINC/0L7RgdC70LUg0LfQsNC/0Y/RgtC+0LlcclxuICAgICAgICByZXR1cm4gfihudW0gKyAnJykuaW5kZXhPZignLicpID8gKG51bSArICcnKS5zcGxpdCgnLicpWzFdLmxlbmd0aCA6IDA7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBpbnRlcmZhY2UgSU9wdGlvbnMge1xyXG4gICAgLy8gTW9kZWwgb3B0aW9uc1xyXG4gICAgZGF0YUZvcm1hdDogYW55O1xyXG4gICAgdmFsdWU6IGFueTtcclxuICAgIG1pblZhbDogYW55O1xyXG4gICAgbWF4VmFsOiBhbnk7XHJcbiAgICBzdGVwOiBhbnk7ICAgIFxyXG4gICAgcmV2ZXJzZTogYW55O1xyXG4gICAgcmFuZ2U6IGFueTsgXHJcbiAgICBjdXN0b21WYWx1ZXM/OiBhbnk7XHJcbiAgICB2YWx1ZUluQ3VzdG9tVmFsdWVzPzogYW55O1xyXG4gICAgcmFuZ2VJbkN1c3RvbVZhbHVlcz86IGFueTtcclxuXHJcblxyXG4gICAgLy8gVmlldyBvcHRpb25zXHJcbiAgICBsZW5ndGg6IGFueTtcclxuICAgIHZlcnRpY2FsOiBhbnk7XHJcbiAgICB0b29sdGlwOiBhbnk7XHJcbiAgICB0b29sdGlwTWFzazogYW55O1xyXG4gICAgc2NhbGU6IGFueTtcclxuICAgIHNjYWxlU3RlcDogYW55O1xyXG4gICAgc2NhbGVNYXNrOiBhbnk7XHJcbn1cclxuXHJcbnZhciBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMgPSB7XHJcbiAgICAvLyBNb2RlbCBvcHRpb25zXHJcbiAgICAvLyDQsiByYW5nZSDQuCDQsiBtaW4g0LggbWF4INGB0LvQtdCy0LAg0YLQviwg0YfRgtC+INGB0LvQtdCy0LAg0L3QsCDRgdC70LDQudC00LXRgNC1XHJcbiAgICBkYXRhRm9ybWF0OiAnbnVtZXJpYycsXHJcbiAgICB2YWx1ZTogbnVsbCwgICAgICAvLyDQsiDQvdCw0YfQsNC70YzQvdGL0YUg0L3QsNGB0YLRgNC+0LnQutCw0YUg0L3QtSDQvtC/0YDQtdC00LXQu9C10L3Ri1xyXG4gICAgbWluVmFsOiAwLCAgICAgICAgLy8g0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0LjQu9C4INC/0YDQvtC80LXQttGD0YLQvtC6LlxyXG4gICAgbWF4VmFsOiAxMCwgICAgICAgLy8g0LXRgdC70Lgg0L7QvdC4INC90LUg0YPQutCw0LfQsNC90Ysg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10LwsINC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1IFxyXG4gICAgc3RlcDogMSwgICAgICAgICAgLy8gKHZhbHVlKSDQuCDQv9C+0LfQuNGG0LjRjyDQsdC10LPRg9C90LrQsCDRgNCw0LLQvdGLINC80LjQvdC40LzQsNC70YzQvdC+0LzRgyDQt9C90LDRh9C10L3QuNGOXHJcbiAgICByZXZlcnNlOiBmYWxzZSxcclxuICAgIHJhbmdlOiBudWxsLFxyXG4gICAgXHJcbiAgICBsZW5ndGg6ICczMDBweCcsXHJcbiAgICB2ZXJ0aWNhbDogZmFsc2UsXHJcbiAgICB0b29sdGlwOiBmYWxzZSxcclxuICAgIHRvb2x0aXBNYXNrOiBcInZhbFwiLFxyXG4gICAgc2NhbGU6IGZhbHNlLFxyXG4gICAgc2NhbGVTdGVwOiBudWxsLFxyXG4gICAgc2NhbGVNYXNrOiBcInZhbFwiLFxyXG59XHJcblxyXG5leHBvcnQgeyBkZWZhdWx0T3B0aW9ucyB9O1xyXG4iLCJpbXBvcnQgTW9kZWwsIHtJTW9kZWx9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgVmlldywge0lWaWV3fSBmcm9tICcuL1ZpZXcnO1xyXG5pbXBvcnQgUHJlc2VudGVyIGZyb20gJy4vUHJlc2VudGVyJztcclxuaW1wb3J0IHtkZWZhdWx0T3B0aW9uc30gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcblxyXG5pbXBvcnQge09ic2VydmVyfSBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IHtJT2JzZXJ2ZXJ9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5pbXBvcnQgU3ViamVjdCAgZnJvbSAnLi9PYnNlcnZlcic7XHJcblxyXG5cclxuKGZ1bmN0aW9uKCQpe1xyXG5cclxuICB2YXIgbWV0aG9kczogT2JqZWN0ID0ge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zPzogYW55ICkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICBcclxuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBkYXRhID0gJHRoaXMuZGF0YSgnc2xpZGVyRGF0YScpO1xyXG4gICAgICAgIGxldCBzbGlkZXIgPSAkdGhpcztcclxuICAgICAgICBcclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C70LDQs9C40L0g0LXRidGRINC90LUg0L/RgNC+0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNC9XHJcbiAgICAgICAgaWYgKCAhIGRhdGEgKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICBsZXQgbW9kZWw6IElNb2RlbCA9IG5ldyBNb2RlbChvcHRpb25zKTtcclxuICAgICAgICAgIC8vINC/0LXRgNC10LTQsNC10Lwg0LzQvtC00LXQu9GMINCyINC/0YDQtdC00YHRgtCw0LLQu9C10L3QuNC1INC00LvRjyDQv9C+0LvRg9GH0LXQvdC40Y8g0LjQtyDQvdC10LUgXHJcbiAgICAgICAgICAvLyDQutC+0YDRgNC10LrRgtC90YvRhSDQtNCw0L3QvdGL0YVcclxuICAgICAgICAgIGxldCB2aWV3OiBJVmlldyA9IG5ldyBWaWV3KG1vZGVsLCBvcHRpb25zLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAvLyDRgdGD0LHRitC10LrRgiAtINGN0YLQviDQvdCw0LHQu9GO0LTQtdC90LjQtVxyXG4gICAgICAgICAgLy8g0L7QvSDRhdGA0LDQvdC40YIg0LfQvdCw0YfQtdC90LjQtSB2YWwg0LjQu9C4INC/0YDQvtC80LXQttGD0YLQvtC6XHJcbiAgICAgICAgICBsZXQgdmFsOiBhbnkgfCBbYW55LCBhbnldO1xyXG4gICAgICAgICAgdmFsID0gbW9kZWwuZ2V0VmFsKCkgfHwgbW9kZWwuZ2V0UmFuZ2UoKTsgXHJcbiAgICAgICAgICBsZXQgc3ViamVjdCA9IG5ldyBTdWJqZWN0KHZhbCk7XHJcblxyXG4gICAgICAgICAgbGV0IHByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIobW9kZWwsIHZpZXcsIHN1YmplY3QpO1xyXG5cclxuICAgICAgICAgICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScsIHtcclxuICAgICAgICAgICAgc2xpZGVyIDogc2xpZGVyLFxyXG4gICAgICAgICAgICBtb2RlbDogbW9kZWwsXHJcbiAgICAgICAgICAgIHZpZXc6IHZpZXcsXHJcbiAgICAgICAgICAgIHByZXNlbnRlcjogcHJlc2VudGVyLFxyXG4gICAgICAgICAgICBzdWJqZWN0OiBzdWJqZWN0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZTogZnVuY3Rpb24oIG9wdGlvbnM6IGFueSApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBwcmVzZW50ZXIgPSAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnKS5wcmVzZW50ZXI7XHJcbiAgICAgICAgcHJlc2VudGVyLmNoYW5nZShvcHRpb25zKTtcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSAkdGhpcy5kYXRhKCdzbGlkZXJEYXRhJyk7XHJcblxyXG4gICAgICAgICQod2luZG93KS51bmJpbmQoJy5zbGlkZXInKTtcclxuICAgICAgICBkYXRhLnNsaWRlci5yZW1vdmUoKTtcclxuICAgICAgICAkdGhpcy5yZW1vdmVEYXRhKCdzbGlkZXJEYXRhJyk7XHJcbiAgICAgICAgXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBvYnNlcnZlOiBmdW5jdGlvbiggZnVuYyApIHtcclxuXHJcbiAgICAgIC8vINC00L7QsdCw0LLQu9GP0LXQvCDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPXHJcbiAgICAgIC8vINCw0YDQs9GD0LzQtdC90YIgLSDRjdGC0LAg0YTRg9C90LrRhtC40Y8g0LrQvtGC0L7RgNCw0Y8g0LHRg9C00LXRgiDQvtCx0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0LjQt9C80LXQvdC10L3QuNGPXHJcbiAgICAgIGxldCBzdWJqZWN0ID0gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykuc3ViamVjdDtcclxuICAgICAgbGV0IG9ic2VydmVyOiBJT2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXIoIGZ1bmMgKTtcclxuXHJcbiAgICAgIHN1YmplY3QuYXR0YWNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFxyXG4gIGpRdWVyeS5mbi5zbGlkZXIgPSBmdW5jdGlvbiggbWV0aG9kICkge1xyXG5cclxuICAgIC8vINC70L7Qs9C40LrQsCDQstGL0LfQvtCy0LAg0LzQtdGC0L7QtNCwXHJcbiAgICBpZiAoIG1ldGhvZHNbbWV0aG9kIGFzIHN0cmluZ10gKSB7XHJcbiAgICAgIHJldHVybiBtZXRob2RzWyBtZXRob2QgYXMgc3RyaW5nIF0uYXBwbHkoIHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCBhcmd1bWVudHMsIDEgKSk7XHJcbiAgICB9IGVsc2UgaWYgKCB0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhIG1ldGhvZCApIHtcclxuXHJcbiAgICAgIC8vID8/Pz9cclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQuZXJyb3IoICdNZXRob2QgY2FsbGVkICcgKyAgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBmb3IgSlF1ZXJ5LnNsaWRlcicgKTtcclxuICAgIH0gXHJcblxyXG4gIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9