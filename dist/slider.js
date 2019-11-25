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
                options.range = [0, 0];
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
        this._line = this.buildLine(this._slider);
        var pos;
        if (!this._range) {
            this._thumb = this.buildThumb(this._slider);
            pos = this.findThumbPosition(model.getStepNumber(model.getVal()), model.numberOfSteps());
            this.setThumbPosition(this._thumb, pos);
        }
        else {
            this._thumbLeft = this.buildThumb(this._slider, 'slider__thumb_left');
            this._thumbRight = this.buildThumb(this._slider, 'slider__thumb_right');
            pos = this.findThumbPosition(model.getStepNumber(model.getRange()[0]), model.numberOfSteps());
            this.setThumbPosition(this._thumbLeft, pos);
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
        this._range = false;
        this._thumb = this.buildThumb(this._slider);
        this._thumbLeft = this.removeNode(this._thumbLeft);
        this._thumbRight = this.removeNode(this._thumbRight);
        pos = this.findThumbPosition(model.getStepNumber(model.getVal()), model.numberOfSteps());
        this.setThumbPosition(this._thumb, pos);
    };
    View.prototype.changeValToRange = function (model) {
        var pos;
        this._range = true;
        this._thumb = this.removeNode(this._thumb);
        this._thumbLeft = this.buildThumb(this._slider, 'slider__thumb_left');
        this._thumbRight = this.buildThumb(this._slider, 'slider__thumb_right');
        pos = this.findThumbPosition(model.getStepNumber(model.getRange()[0]), model.numberOfSteps());
        this.setThumbPosition(this._thumbLeft, pos);
        pos = this.findThumbPosition(model.getStepNumber(model.getRange()[1]), model.numberOfSteps());
        this.setThumbPosition(this._thumbRight, pos);
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
    View.prototype.changeLine = function () {
        this._line.style.left = null;
        this._line.style.top = null;
        this._line.style.width = null;
        this._line.style.height = null;
        if (!this._range) {
            if (!this._vertical) {
                this._line.style.height = '100%';
                this._line.style.top = '0px';
                this._line.style.left = '0px';
                this._line.style.width = parseInt(this._thumb.style.left) + this._thumb.clientWidth / 2 + 'px';
            }
            else {
                this._line.style.width = '100%';
                this._line.style.left = '0px';
                this._line.style.top = '0px';
                this._line.style.height = parseInt(this._thumb.style.top) + this._thumb.clientHeight / 2 + 'px';
            }
        }
        else {
            if (!this._vertical) {
                this._line.style.height = '100%';
                this._line.style.top = '0px';
                this._line.style.left = parseInt(this._thumbLeft.style.left) + this._thumbLeft.clientWidth / 2 + 'px';
                this._line.style.width = (parseInt(this._thumbRight.style.left) - parseInt(this._thumbLeft.style.left)) + 'px';
            }
            else {
                this._line.style.width = '100%';
                this._line.style.left = '0px';
                this._line.style.top = parseInt(this._thumbLeft.style.top) + this._thumbLeft.clientHeight / 2 + 'px';
                this._line.style.height = (parseInt(this._thumbRight.style.top) - parseInt(this._thumbLeft.style.top)) + 'px';
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
        this.changeLine();
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
    View.prototype.buildLine = function (sliderNode, lineClass) {
        var line = document.createElement('div');
        line.classList.add('slider__line');
        lineClass ? line.classList.add(lineClass) : false;
        sliderNode.append(line);
        return line;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0T3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDhGQUE0RDtBQTRDNUQ7SUFZSSxlQUFZLFVBQW9CO1FBRTVCLElBQUksT0FBTyxHQUFhLFVBQVUsQ0FBQztRQUluQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FB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QUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsV0FBVyxHQUFHLFdBQVcsSUFBSSxDQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7UUFFL0MsSUFBSSxHQUFHLENBQUMsQ0FBRSxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksR0FBRyxDQUFFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFFLENBQUM7UUFDL0QsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsV0FBVyxHQUFHLFdBQVcsSUFBSSxDQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7UUFFL0MsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUtPLHlCQUFVLEdBQWxCLFVBQW1CLFVBQTBCLEVBQUUsVUFBbUI7UUFDOUQsSUFBSSxLQUFLLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3JELFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVPLHdC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TUFBZ0IsQ0FBQyxFQUFHO1lBQy9CLE9BQU8sT0FBTyxDQUFFLE1BQWdCLENBQUUsQ0FBQyxLQUFLLENBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBRSxTQUFTLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQztTQUM3RjthQUFNLElBQUssT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLENBQUUsTUFBTSxFQUFHO1lBSW5ELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBRSxDQUFDO1NBQzlDO2FBQU07WUFDTCxDQUFDLENBQUMsS0FBSyxDQUFFLGdCQUFnQixHQUFJLE1BQU0sR0FBRyxtQ0FBbUMsQ0FBRSxDQUFDO1NBQzdFO0lBRUgsQ0FBQyxDQUFDO0FBRUosQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMiLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgSU9wdGlvbnMsIHsgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1vZGVsIHtcclxuICAgIC8vIDFcclxuICAgIGdldFZhbCgpOiBudW1iZXI7XHJcbiAgICBzZXRWYWwobmV3VmFsOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgLy8gMlxyXG4gICAgZ2V0UmFuZ2UoKTogW251bWJlciwgbnVtYmVyXTtcclxuICAgIHNldFJhbmdlKG5ld1JhbmdlOiBbbnVtYmVyLCBudW1iZXJdKTogdm9pZDtcclxuICAgIC8vIDNcclxuICAgIGdldFN0ZXAoKTogbnVtYmVyO1xyXG4gICAgLy8gNFxyXG4gICAgZ2V0TWluVmFsKCk6IG51bWJlcjtcclxuICAgIC8vIDVcclxuICAgIGdldE1heFZhbCgpOiBudW1iZXI7XHJcbiAgICAvLyA2XHJcbiAgICBnZXRSZXZlcnNlKCk6IGJvb2xlYW47XHJcbiAgICAvLyA3XHJcbiAgICBnZXRDdXN0b21WYWx1ZXMoKTogc3RyaW5nW10gfCB1bmRlZmluZWQ7XHJcbiAgICAvLyA4XHJcbiAgICBnZXREYXRhRm9ybWF0KCk6IHN0cmluZztcclxuICAgIC8vIDlcclxuICAgIGdldE9wdGlvbnMoKTogSU1vZGVsT3B0aW9ucztcclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBmaW5kUG9zaXRpb25JbkFycih2YWw6IGFueSwgYXJyPzogYW55W10pOiBudW1iZXI7XHJcbiAgICBnZXRTdGVwTnVtYmVyKHZhbDogbnVtYmVyKTogbnVtYmVyO1xyXG4gICAgdHJhbnNsYXRlQnlTdGVwKHN0ZXA6IG51bWJlcik6IG51bWJlciB8IHN0cmluZyB8IERhdGU7IC8vINC/0L4g0YjQsNCz0YNcclxuICAgIHRyYW5zbGF0ZSh2YWw6IG51bWJlcik6IG51bWJlciB8IHN0cmluZyB8IERhdGU7IC8vINC/0L4g0LLQsNC70LjQtNC90L7QvNGDINC30L3QsNGH0LXQvdC40Y5cclxuICAgIG51bWJlck9mU3RlcHMoKTogbnVtYmVyO1xyXG4gICAgY2hhbmdlKG5ld09wdGlvbnM6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1vZGVsT3B0aW9ucyB7XHJcbiAgICBkYXRhRm9ybWF0OiBzdHJpbmc7XHJcbiAgICB2YWx1ZTogbnVtYmVyIHwgbnVsbDtcclxuICAgIG1pblZhbDogbnVtYmVyO1xyXG4gICAgbWF4VmFsOiBudW1iZXI7XHJcbiAgICBzdGVwOiBudW1iZXI7XHJcbiAgICByZXZlcnNlOiBib29sZWFuO1xyXG4gICAgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gfCBudWxsOyBcclxuICAgIGN1c3RvbVZhbHVlcz86IHN0cmluZ1tdO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbCBpbXBsZW1lbnRzIElNb2RlbCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YUZvcm1hdDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdmFsOiBudW1iZXIgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbWluVmFsOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9tYXhWYWw6bnVtYmVyOyAgIFxyXG4gICAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfcmV2ZXJzZTogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3JhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2N1c3RvbVZhbHVlcz86IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogSU1vZGVsT3B0aW9ucyB8IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhbGxPcHRpb25zOiBJT3B0aW9ucykge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnMgPSBhbGxPcHRpb25zO1xyXG4gICAgICAgIC8vINC10YHQu9C4INC90LUg0YPQutCw0LfQsNC90L4g0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUsINGD0LrQsNC30YvQstCw0LXQvCDQvNC40L3QuNC80LDQu9GM0L3QvtC1LlxyXG4gICAgICAgIC8vINGN0YLQviDQvdC10L7QsdGF0L7QtNC40LzQviDRh9GC0L7QsdGLINC/0YDQvtC50YLQuCDQstCw0LvQuNC00LDRhtC40Y4g0Lgg0L/QvtGB0YLQsNCy0LjRgtGMINCx0LXQs9GD0L3QvtC6INGB0L7Qs9C70LDRgdC90L4g0YjQsNCz0YMuXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0YPQutCw0LfQsNC9IHJhbmdlLCDQvNC10L3Rj9C10Lwg0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0L3QsCBudWxsXHJcbiAgICAgICAgb3B0aW9ucy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgPyBvcHRpb25zLnZhbHVlIDogb3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgbGV0IHZhbGlkT3B0aW9uczogSU1vZGVsT3B0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ251bWVyaWMnICkge1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLm51bWVyaWNGb3JtYXRWYWxpZGF0aW9uKG9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdkYXRlJyApIHtcclxuICAgICAgICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC00LDRgtGLINCyINC90LDRh9Cw0LvRjNC90L7QvCDRhNC+0YLRgNC80LDRgtC1LCDQvdCw0L/RgCBkZC9tbS95eXl5XHJcbiAgICAgICAgICAgIC8vINGH0YLQvtCx0Ysg0LzQvtC20L3QviDQsdGL0LvQviDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0LjRhSDQtNC70Y8g0LjQt9C80LXQvdC10L3QuNGPINC80L7QtNC10LvQuFxyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgYWxsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMuZGF0ZUZvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ2N1c3RvbScgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMuY3VzdG9tRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXMgPSBvcHRpb25zLmN1c3RvbVZhbHVlcztcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGZvcm1hdCBvZiBkYXRhJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kYXRhRm9ybWF0ID0gdmFsaWRPcHRpb25zLmRhdGFGb3JtYXQ7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gdmFsaWRPcHRpb25zLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX21pblZhbCA9IHZhbGlkT3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgdGhpcy5fbWF4VmFsID0gdmFsaWRPcHRpb25zLm1heFZhbDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gdmFsaWRPcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZSA9IHZhbGlkT3B0aW9ucy5yZXZlcnNlO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gdmFsaWRPcHRpb25zLnJhbmdlO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVZhbHVlcyA9IHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXM7ICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgIT0gJ2RhdGUnKSB0aGlzLl9vcHRpb25zID0gdmFsaWRPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDFcclxuICAgIGdldFZhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWw7XHJcbiAgICB9XHJcbiAgICBzZXRWYWwobmV3VmFsOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFyZU51bWVyaWMobmV3VmFsKTtcclxuICAgICAgICB0aGlzLm9uZVZhbHVlVmFsaWRhdGlvbih0aGlzLl9taW5WYWwsIHRoaXMuX21heFZhbCwgbmV3VmFsLCB0aGlzLl9zdGVwKTtcclxuICAgICAgICB0aGlzLl92YWwgPSBuZXdWYWw7XHJcbiAgICB9XHJcbiAgICAvLyAyXHJcbiAgICBnZXRSYW5nZSgpOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmFuZ2U7XHJcbiAgICB9XHJcbiAgICBzZXRSYW5nZShuZXdSYW5nZTogW251bWJlciwgbnVtYmVyXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXJlTnVtZXJpYyhuZXdSYW5nZVswXSwgbmV3UmFuZ2VbMV0pXHJcbiAgICAgICAgdGhpcy5yYW5nZVZhbGlkYXRpb24odGhpcy5fbWluVmFsLCB0aGlzLl9tYXhWYWwsIG5ld1JhbmdlLCB0aGlzLl9zdGVwKTtcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLm1pbk1heFZhbGlkYXRpb24obmV3UmFuZ2VbMF0sIG5ld1JhbmdlWzFdLCB0aGlzLl9yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFuZ2UgPSBuZXdSYW5nZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9yYW5nZSA9IFtuZXdSYW5nZVsxXSwgbmV3UmFuZ2VbMF1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBuZXdSYW5nZTtcclxuICAgIH1cclxuICAgIC8vIDNcclxuICAgIGdldFN0ZXAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcDtcclxuICAgIH1cclxuICAgIC8vIDRcclxuICAgIGdldE1pblZhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5WYWw7XHJcbiAgICB9XHJcbiAgICAvLyA1XHJcbiAgICBnZXRNYXhWYWwoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4VmFsO1xyXG4gICAgfVxyXG4gICAgLy8gNlxyXG4gICAgZ2V0UmV2ZXJzZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmV2ZXJzZTtcclxuICAgIH1cclxuICAgIC8vIDdcclxuICAgIGdldEN1c3RvbVZhbHVlcygpOiBhbnlbXSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1c3RvbVZhbHVlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gOFxyXG4gICAgZ2V0RGF0YUZvcm1hdCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhRm9ybWF0O1xyXG4gICAgfVxyXG4gICAgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zIHtcclxuXHJcbiAgICAgICAgbGV0IG9wdHM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLl9vcHRpb25zO1xyXG4gICAgICAgIGlmICggIXRoaXMuX3JhbmdlICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbDogYW55O1xyXG4gICAgICAgICAgICAvL3ZhbCA9IHRoaXMudHJhbnNsYXRlKCB0aGlzLl92YWwgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdkYXRlJykge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3ZhbCApO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9ICgnMCcgKyB2YWwuZ2V0RGF0ZSgpKS5zbGljZSgtMikgKyBcclxuICAgICAgICAgICAgICAgICcvJyArICgnMCcgKyAoMSArIHZhbC5nZXRNb250aCgpKSApLnNsaWNlKC0yKSArXHJcbiAgICAgICAgICAgICAgICAnLycgKyAoIHZhbC5nZXRGdWxsWWVhcigpICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLl92YWw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9wdHMudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIG9wdHMucmFuZ2UgPSBudWxsO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbDogYW55O1xyXG4gICAgICAgICAgICBsZXQgYXJyOiBbYW55LCBhbnldID0gW251bGwsIG51bGxdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgIT0gJ2RhdGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgYXJyID0gdGhpcy5fcmFuZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3JhbmdlWzBdICk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSAoJzAnICsgdmFsLmdldERhdGUoKSkuc2xpY2UoLTIpICsgXHJcbiAgICAgICAgICAgICAgICAnLycgKyAoJzAnICsgKDEgKyB2YWwuZ2V0TW9udGgoKSkgKS5zbGljZSgtMikgK1xyXG4gICAgICAgICAgICAgICAgJy8nICsgdmFsLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXJyWzBdID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudHJhbnNsYXRlKCB0aGlzLl9yYW5nZVsxXSApO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gKCcwJyArIHZhbC5nZXREYXRlKCkpLnNsaWNlKC0yKSArIFxyXG4gICAgICAgICAgICAgICAgJy8nICsgKCcwJyArICgxICsgdmFsLmdldE1vbnRoKCkpICkuc2xpY2UoLTIpICtcclxuICAgICAgICAgICAgICAgICcvJyArIHZhbC5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGFyclsxXSA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0cy52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIG9wdHMucmFuZ2UgPSBhcnI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0cztcclxuICAgIH1cclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBmaW5kUG9zaXRpb25JbkFycih2YWw6IGFueSwgYXJyPzogYW55W10pOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC40YnQtdGCINC/0L7Qt9C40YbQuNGOIHZhbCDQsiBjdXN0b20gdmFsdWVzXHJcbiAgICAgICAgLy8g0YLQsNC6INC20LUg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNGB0L/QvtC70YzQt9C+0LLQsNC9INGBINC70Y7QsdGL0Lwg0LTRgNGD0LPQuCDQvNCw0YHRgdC40LLQvtC8XHJcbiAgICAgICAgaWYgKCBhcnIgJiYgYXJyLmluZGV4T2YodmFsKSAhPSAtMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFyci5pbmRleE9mKHZhbCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICggYXJyICYmIGFyci5pbmRleE9mKHZhbCkgPT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudCBmaW5kIHZhbHVlIGluIGFycmF5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICF0aGlzLl9jdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHRoaXMuX2N1c3RvbVZhbHVlcy5pbmRleE9mKHZhbCkgIT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXMuaW5kZXhPZih2YWwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHZhbGlkIHZhbHVlIGZvciBjdXN0b20gdmFsdWVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0ZXBOdW1iZXIodmFsOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC90LDRhdC+0LTQuNGCLCDQvdCwINC60LDQutC+0Lwg0L/QviDRgdGH0LXRgtGDINGI0LDQs9C1INGB0YLQvtC40YIgdmFsXHJcbiAgICAgICAgLy8g0L/RgNC40LzQtdC90Y/RgtGMINGC0L7Qu9GM0LrQviDQtNC70Y8g0L3QtdGC0YDQsNC90YHRhNC+0YDQvNC40YDQvtCy0LDQvdC90YvRhSwg0L/RgNCw0LLQuNC70YzQvdGL0YUg0LfQvdCw0YfQtdC90LjQuSFcclxuICAgICAgICBsZXQgc3RlcE51bTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fbWluVmFsKSApO1xyXG5cclxuICAgICAgICBsZXQgYTogbnVtYmVyID0gKyh2YWwgLSB0aGlzLl9taW5WYWwpLnRvRml4ZWQobik7XHJcbiAgICAgICAgbGV0IGI6IG51bWJlciA9ICsodGhpcy5fbWF4VmFsIC0gdGhpcy5fbWluVmFsKS50b0ZpeGVkKG4pXHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RlcE51bSA9ICsoIGEgKiB0aGlzLm51bWJlck9mU3RlcHMoKSAvIGIgKS50b0ZpeGVkKCk7XHJcbiAgICAgICAgc3RlcE51bSA9IE1hdGguYWJzKHN0ZXBOdW0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc3RlcE51bTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2xhdGVCeVN0ZXAoc3RlcDogbnVtYmVyKTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2N1c3RvbScpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICggIXRoaXMuX3JldmVyc2UgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzW3N0ZXBdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbVZhbHVlc1t0aGlzLl9jdXN0b21WYWx1ZXMubGVuZ3RoIC0gc3RlcCAtIDFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fbWluVmFsKSApO1xyXG4gICAgICAgICAgICBsZXQgcjogbnVtYmVyID0gIXRoaXMuX3JldmVyc2UgPyAxIDogLTE7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciA9ICsoICgrdGhpcy5fbWluVmFsKSArICgrdGhpcy5fc3RlcCkgKiAoK3N0ZXApICogKCtyKSApLnRvRml4ZWQobik7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnZGF0ZScpIHsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodmFsKTsgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiB2YWw7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zbGF0ZSh2YWwpOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2N1c3RvbScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbVZhbHVlc1t2YWxdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpOyBcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG51bWJlck9mU3RlcHMoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuICAgICAgICBuID0gTWF0aC5wb3coMTAsIG4pO1xyXG4gICAgICAgIHJldHVybiAoIE1hdGguYWJzKHRoaXMuX21heFZhbCAtIHRoaXMuX21pblZhbCkgKiBuICkgLyAoIHRoaXMuX3N0ZXAgKiBuICk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlKG5ld09wdGlvbnM6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgcHJldk9wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLl9vcHRpb25zO1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBhbnkgPSBPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgbmV3T3B0aW9ucyk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMudmFsdWUgPSBvcHRpb25zLnZhbHVlICE9IG51bGwgPyBvcHRpb25zLnZhbHVlIDogb3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgbGV0IHZhbGlkT3B0aW9uczogSU1vZGVsT3B0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ251bWVyaWMnICkge1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLm51bWVyaWNGb3JtYXRWYWxpZGF0aW9uKG9wdGlvbnMsIHByZXZPcHRpb25zIGFzIElPcHRpb25zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdkYXRlJyApIHtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy5kYXRlRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBwcmV2T3B0aW9ucyBhcyBJT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgbmV3T3B0aW9ucyk7XHJcblxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ2N1c3RvbScgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMuY3VzdG9tRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBwcmV2T3B0aW9ucyBhcyBJT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXMgPSBvcHRpb25zLmN1c3RvbVZhbHVlcztcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGZvcm1hdCBvZiBkYXRhJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kYXRhRm9ybWF0ID0gdmFsaWRPcHRpb25zLmRhdGFGb3JtYXQ7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gdmFsaWRPcHRpb25zLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX21pblZhbCA9IHZhbGlkT3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgdGhpcy5fbWF4VmFsID0gdmFsaWRPcHRpb25zLm1heFZhbDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gdmFsaWRPcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZSA9IHZhbGlkT3B0aW9ucy5yZXZlcnNlO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gdmFsaWRPcHRpb25zLnJhbmdlO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVZhbHVlcyA9IHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXM7ICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgIT0gJ2RhdGUnKSB0aGlzLl9vcHRpb25zID0gdmFsaWRPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24oYWxsT3B0aW9uczogSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyk6IElNb2RlbE9wdGlvbnMge1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBJT3B0aW9ucyA9IGFsbE9wdGlvbnM7XHJcbiAgICAgICAgLy8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQvdCw0YfQsNC70YzQvdGL0Lwg0L7Qv9GG0LjRj9C8INC00LXRhNC+0LvRgtC90YvQtSDQt9C90LDRh9C10L3QuNGPINC40LcgZGVmYXVsdE9wdGlvbnNcclxuICAgICAgICAvLyDQvdCw0YfQsNC70YzQvdC+0LzRgyDQt9C90LDRh9C10L3QuNGOINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0LzQuNC90LjQvNCw0LvRjNC90L7QtVxyXG4gICAgICAgIC8vINC/0L4g0LzQtdGA0LUg0L/RgNC+0YXQvtC20LTQtdC90LjRjyDQstCw0LvQuNC00LDRhtC40LgsINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPINC90LAg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC40LVcclxuICAgICAgICBsZXQgbmV3T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgZGF0YUZvcm1hdDogJ251bWVyaWMnLFxyXG4gICAgICAgICAgICB2YWx1ZTogZGVmYXVsdE9wdGlvbnMubWluVmFsIGFzIG51bWJlcixcclxuICAgICAgICAgICAgbWluVmFsOiBkZWZhdWx0T3B0aW9ucy5taW5WYWwgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICBtYXhWYWw6IGRlZmF1bHRPcHRpb25zLm1heFZhbCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgIHN0ZXA6IGRlZmF1bHRPcHRpb25zLnN0ZXAsXHJcbiAgICAgICAgICAgIHJldmVyc2U6IGRlZmF1bHRPcHRpb25zLnJldmVyc2UsXHJcbiAgICAgICAgICAgIHJhbmdlOiBkZWZhdWx0T3B0aW9ucy5yYW5nZSBhcyBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hcmVOdW1lcmljKG9wdGlvbnMubWF4VmFsLCBvcHRpb25zLm1pblZhbCwgb3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgbmV3T3B0aW9ucy5zdGVwID0gTWF0aC5hYnMob3B0aW9ucy5zdGVwKTtcclxuICAgICAgICBuZXdPcHRpb25zLnJldmVyc2UgPSBvcHRpb25zLnJldmVyc2UgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgbmV3T3B0aW9ucy5kYXRhRm9ybWF0ID0gb3B0aW9ucy5kYXRhRm9ybWF0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc3RlcFZhbGlkYXRpb24ob3B0aW9ucy5taW5WYWwgYXMgbnVtYmVyLCBvcHRpb25zLm1heFZhbCBhcyBudW1iZXIsIG5ld09wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC80LjQvSDQuCDQvNCw0LrRgSDQv9C10YDQtdC/0YPRgtCw0L3RiyDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvCwg0LzQtdC90Y/QtdC8INC/0L7RgNGP0LTQvtC6XHJcbiAgICAgICAgLy8g0L/QvtC00YDQsNC30YPQvNC10LLQsNC10YLRgdGPLCDRh9GC0L4gbWluIC0g0Y3RgtC+INGC0L4g0YfRgtC+INGB0LvQtdCy0LAg0L3QsCDRgdC70LDQudC00LXRgNC1LCBtYXggLSDRgdC/0YDQsNCy0LBcclxuICAgICAgICBpZiAoIHRoaXMubWluTWF4VmFsaWRhdGlvbihvcHRpb25zLm1pblZhbCBhcyBudW1iZXIsIG9wdGlvbnMubWF4VmFsIGFzIG51bWJlciwgbmV3T3B0aW9ucy5yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5taW5WYWwgPSBvcHRpb25zLm1pblZhbCBhcyBudW1iZXI7XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMubWF4VmFsID0gb3B0aW9ucy5tYXhWYWwgYXMgbnVtYmVyOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMubWluVmFsID0gb3B0aW9ucy5tYXhWYWwgYXMgbnVtYmVyO1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLm1heFZhbCA9IG9wdGlvbnMubWluVmFsIGFzIG51bWJlcjsgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnJhbmdlICkge1xyXG4gICAgICAgICAgICB0aGlzLnJhbmdlVmFsaWRhdGlvbihuZXdPcHRpb25zLm1pblZhbCwgbmV3T3B0aW9ucy5tYXhWYWwsIG9wdGlvbnMucmFuZ2UgYXMgW251bWJlciwgbnVtYmVyXSwgbmV3T3B0aW9ucy5zdGVwKTtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LzQuNC9INC4INC80LDQutGBINCyINC00LjQsNC/0LDQt9C+0L3QtSByYW5nZSDQv9C10YDQtdC/0YPRgtCw0L3RiyDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvCwg0LzQtdC90Y/QtdC8INC/0L7RgNGP0LTQvtC6XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5taW5NYXhWYWxpZGF0aW9uKG9wdGlvbnMucmFuZ2VbMF0gYXMgbnVtYmVyLCBvcHRpb25zLnJhbmdlWzFdIGFzIG51bWJlciwgbmV3T3B0aW9ucy5yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgICAgIG5ld09wdGlvbnMucmFuZ2UgPSBvcHRpb25zLnJhbmdlIGFzIFtudW1iZXIsIG51bWJlcl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdPcHRpb25zLnJhbmdlID0gW29wdGlvbnMucmFuZ2VbMV0gYXMgbnVtYmVyLCBvcHRpb25zLnJhbmdlWzBdIGFzIG51bWJlcl07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vINC+0YLQvNC10L3Rj9C10Lwg0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUsINC00LDQttC1INC10YHQu9C4INC+0L3QviDQstCy0LXQtNC10L3QviDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvFxyXG4gICAgICAgICAgICBuZXdPcHRpb25zLnZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0LfQsNC/0YPRgdC60LDQtdC8INC/0YDQvtCy0LXRgNC60Lgg0LTQu9GPINC90LDRh9Cw0LvRjNC90L7Qs9C+INC30L3QsNGH0LXQvdC40Y8sINGC0L7Qu9GM0LrQviDQtdGB0LvQuCDQvdC1INGD0LrQsNC30LDQvSDQtNC40LDQv9Cw0LfQvtC9IHJhbmdlXHJcbiAgICAgICAgICAgIHRoaXMuYXJlTnVtZXJpYyhvcHRpb25zLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5vbmVWYWx1ZVZhbGlkYXRpb24obmV3T3B0aW9ucy5taW5WYWwsIG5ld09wdGlvbnMubWF4VmFsLCBvcHRpb25zLnZhbHVlIGFzIG51bWJlciwgbmV3T3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMudmFsdWUgPSBvcHRpb25zLnZhbHVlIGFzIG51bWJlcjtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5yYW5nZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXdPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGRhdGVGb3JtYXRWYWxpZGF0aW9uKGFsbE9wdGlvbnM6IElPcHRpb25zLCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMpOiBJTW9kZWxPcHRpb25zIHtcclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnMgPSBhbGxPcHRpb25zO1xyXG5cclxuICAgICAgICB0aGlzLmN1c3RvbURhdGVWYWxpZGF0aW9uKG9wdGlvbnMubWluVmFsLCBvcHRpb25zLm1heFZhbCk7XHJcbiAgICAgICAgb3B0aW9ucy5taW5WYWwgPSB0aGlzLnRyYW5zbGF0ZURhdGVUb051bWJlcihvcHRpb25zLm1pblZhbCBhcyBzdHJpbmcpO1xyXG4gICAgICAgIG9wdGlvbnMubWF4VmFsID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5tYXhWYWwgYXMgc3RyaW5nKTtcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSB0aGlzLnRyYW5sYXRlU3RlcFRvRGF0ZUZvcm1hdChvcHRpb25zLnN0ZXApO1xyXG5cclxuICAgICAgICBpZiAoIEFycmF5LmlzQXJyYXkob3B0aW9ucy5yYW5nZSkgJiYgb3B0aW9ucy5yYW5nZS5sZW5ndGggPT0gMiApIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINCy0LLQtdC7INGH0YLQviDRgtC+INC00YDRg9Cz0L7QtSwg0LAg0L3QtSByYW5nZSwg0L3QsCDRjdGC0L7QvFxyXG4gICAgICAgICAgICAvLyDRjdGC0LDQv9C1INC+0YjQuNCx0LrQuCDQvdC1INCx0YPQtNC10YIuINCe0L3QsCDQv9C+0Y/QstC40YLRgdGPINC/0YDQuCDQv9GA0L7QstC10YDQutC1INC90LAgbnVtZXJpY0Zvcm1hdFZhbGlkYXRpb25cclxuICAgICAgICAgICAgLy8gKNC/0L7RgtC+0LzRgyDRh9GC0L4gcmFuZ2Ug0YLQsNC6INC4INC+0YHRgtCw0LXRgtGB0Y8gdHJ1ZSlcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRlVmFsaWRhdGlvbihvcHRpb25zLnJhbmdlWzBdLCBvcHRpb25zLnJhbmdlWzFdKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVswXSA9IHRoaXMudHJhbnNsYXRlRGF0ZVRvTnVtYmVyKG9wdGlvbnMucmFuZ2VbMF0gYXMgc3RyaW5nKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVsxXSA9IHRoaXMudHJhbnNsYXRlRGF0ZVRvTnVtYmVyKG9wdGlvbnMucmFuZ2VbMV0gYXMgc3RyaW5nKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRlVmFsaWRhdGlvbihvcHRpb25zLnZhbHVlKTtcclxuICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMudHJhbnNsYXRlRGF0ZVRvTnVtYmVyKG9wdGlvbnMudmFsdWUgYXMgc3RyaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGN1c3RvbUZvcm1hdFZhbGlkYXRpb24oYWxsT3B0aW9uczogSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyk6IElNb2RlbE9wdGlvbnMge1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBJT3B0aW9ucyA9IGFsbE9wdGlvbnM7XHJcblxyXG4gICAgICAgIGlmICggIW9wdGlvbnMuY3VzdG9tVmFsdWVzICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2N1c3RvbVZhbHVlcyBpcyByZXF1aXJlZCBvcHRpb24gZm9yIGN1c3RvbSBmb3JtYXQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCAhQXJyYXkuaXNBcnJheShvcHRpb25zLmN1c3RvbVZhbHVlcykgfHwgb3B0aW9ucy5jdXN0b21WYWx1ZXMubGVuZ3RoIDwgMiApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjdXN0b21WYWx1ZXMgc2hvdWxkIGJlIGEgcmFuZ2Ugd2l0aCB0d28gb3IgbW9yZSBpdGVtcywgbGlrZSBbMSwgMiwgXCJhXCJdJyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgb3B0aW9ucy5taW5WYWwgPSAwO1xyXG4gICAgICAgIG9wdGlvbnMubWF4VmFsID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSAxO1xyXG5cclxuICAgICAgICAvLyDQv9GA0LjQvtGA0LjRgtC10YLRiyDQvtC/0YbQuNC5OlxyXG4gICAgICAgIC8vIDEuIHJhbmdlINCyINGH0LjRgdC70LDRhVxyXG4gICAgICAgIC8vIDIuIHJhbmdlINCyINC30L3QsNGH0LXQvdC40Y/RhVxyXG4gICAgICAgIC8vIDMuIHZhbHVlINC60LDQuiDRh9C40YHQu9C+XHJcbiAgICAgICAgLy8gNC4gdmFsdWUg0LrQsNC6INC30L3QsNGH0LXQvdC40LUgXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnJhbmdlIHx8IG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlcyApIHtcclxuXHJcbiAgICAgICAgICAgIGlmICggIW9wdGlvbnMucmFuZ2UgJiYgQXJyYXkuaXNBcnJheShvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXMpICYmIG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlcy5sZW5ndGggPT0gMiApIHtcclxuICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQstCy0LXQuyDRh9GC0L4g0YLQviDQtNGA0YPQs9C+0LUsINCwINC90LUgcmFuZ2UsINC90LAg0Y3RgtC+0LxcclxuICAgICAgICAgICAgICAgIC8vINGN0YLQsNC/0LUg0L7RiNC40LHQutC4INC90LUg0LHRg9C00LXRgi4g0J7QvdCwINC/0L7Rj9Cy0LjRgtGB0Y8g0L/RgNC4INC/0YDQvtCy0LXRgNC60LUg0L3QsCBudW1lcmljRm9ybWF0VmFsaWRhdGlvblxyXG4gICAgICAgICAgICAgICAgLy8gKNC/0L7RgtC+0LzRgyDRh9GC0L4gcmFuZ2Ug0YLQsNC6INC4INC+0YHRgtCw0LXRgtGB0Y8gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2UgPSBbMCwgMF07XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJhbmdlWzBdID0gdGhpcy5maW5kUG9zaXRpb25JbkFycihvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXNbMF0sIG9wdGlvbnMuY3VzdG9tVmFsdWVzKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMV0gPSB0aGlzLmZpbmRQb3NpdGlvbkluQXJyKG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlc1sxXSwgb3B0aW9ucy5jdXN0b21WYWx1ZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC90LUg0LLQstC10LTQtdC90YsgdmFsINC40LvQuCByYW5nZSDQsiBjdXN0b20gdmFsdWVzXHJcbiAgICAgICAgICAgIC8vINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0L/RgNC+0YHRgtGL0LUgdmFsdWUg0LjQu9C4IHJhbmdlLCDQtdGB0LvQuCDQvtC90Lgg0LXRgdGC0YwgXHJcbiAgICAgICAgICAgIGlmICggIW9wdGlvbnMudmFsdWUgJiYgb3B0aW9ucy52YWx1ZUluQ3VzdG9tVmFsdWVzICkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMuZmluZFBvc2l0aW9uSW5BcnIob3B0aW9ucy52YWx1ZUluQ3VzdG9tVmFsdWVzLCBvcHRpb25zLmN1c3RvbVZhbHVlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFyZU51bWVyaWMoLi4udmFsczogYW55KSB7XHJcbiAgICAgICAgZm9yIChsZXQgdmFsIG9mIHZhbHMpIHtcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5pc051bWVyaWModmFsKSApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIHZhbHVlcyBpbiBudW1lcmljIGZvcm1hdCBzaG91bGQgYmUgbnVtYmVycycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWluTWF4VmFsaWRhdGlvbihtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIsIHJldmVyc2U6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoICFyZXZlcnNlICYmIChtaW5WYWwgPj0gbWF4VmFsKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHJldmVyc2UgJiYgKG1pblZhbCA8PSBtYXhWYWwpICkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RlcFZhbGlkYXRpb24obWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyhzdGVwKSApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGVwIHNob3VsZCBiZSBhIG51bWJlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHN0ZXAgPT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGVwIGNhbnQgYmUgZXF1YWwgdG8gMCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcbiAgICAgICAgbGV0IHRlc3Q6IG51bWJlciA9ICsobWF4VmFsIC0gbWluVmFsKS50b0ZpeGVkKG4pXHJcbiAgICAgICAgdGVzdCA9ICggdGVzdCAqIE1hdGgucG93KDEwLCBuKSApIC8gKCBzdGVwICogTWF0aC5wb3coMTAsIG4pICk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBpZiAoIHRlc3QgJSAxICE9IDAgKSB7XHJcbiAgICAgICAgICAgIC8vINCyINGC0L7QvCDRh9C40YHQu9C1INGN0YLQviDQv9GA0L7QstC10YDQutCwINGH0YLQvtCx0Ysg0YjQsNCzINCx0YvQuyDQvdC1INCx0L7Qu9GM0YjQtSDQstGB0LXQs9C+INC/0YDQvtC80LXQttGD0YLQutCwXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignKE1heCB2YWx1ZSAtIG1pbiB2YWx1ZSkgZGl2aWRlZCBieSBzdGVwIHNob3VsZCByZXR1cm4gaW50ZWdlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uZVZhbHVlVmFsaWRhdGlvbihtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIsIHZhbDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXMoc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyhtaW5WYWwpICk7XHJcblxyXG4gICAgICAgIGxldCB0ZXN0OiBudW1iZXIgPSArKHZhbCAtIG1pblZhbCkudG9GaXhlZChuKVxyXG4gICAgICAgIHRlc3QgPSAoIHRlc3QgKiBNYXRoLnBvdygxMCwgbikgKSAvICggc3RlcCAqIE1hdGgucG93KDEwLCBuKSApO1xyXG4gICAgICAgIHRlc3QgPSBNYXRoLmFicyh0ZXN0KTtcclxuXHJcbiAgICAgICAgaWYgKCBNYXRoLm1heChtaW5WYWwsIG1heFZhbCkgPCB2YWwgIHx8ICBNYXRoLm1pbihtaW5WYWwsIG1heFZhbCkgPiB2YWwgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGluaXRpYWwgdmFsdWUgc2hvdWxkIGJlIHdpdGhpbiBtaW4gYW5kIG1heCB2YWx1ZXMnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHRlc3QgJSAxICE9IDAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWUgc2hvdWxkIGJlIHNldCBvbiBzdGVwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZ2VWYWxpZGF0aW9uKG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlciwgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0sIHN0ZXA6IG51bWJlcikge1xyXG5cclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuXHJcbiAgICAgICAgbGV0IHRlc3RMZWZ0OiBudW1iZXIgPSAocmFuZ2VbMF0gLSBtaW5WYWwpIC8gc3RlcDtcclxuICAgICAgICB0ZXN0TGVmdCA9ICt0ZXN0TGVmdC50b0ZpeGVkKG4pO1xyXG4gICAgICAgIHRlc3RMZWZ0ID0gTWF0aC5hYnModGVzdExlZnQpO1xyXG5cclxuICAgICAgICBsZXQgdGVzdFJpZ2h0OiBudW1iZXIgPSAocmFuZ2VbMV0gLSBtaW5WYWwpIC8gc3RlcDtcclxuICAgICAgICB0ZXN0UmlnaHQgPSArdGVzdFJpZ2h0LnRvRml4ZWQobik7XHJcbiAgICAgICAgdGVzdFJpZ2h0ID0gTWF0aC5hYnModGVzdFJpZ2h0KTtcclxuXHJcbiAgICAgICAgaWYgKCByYW5nZS5sZW5ndGggIT0gMiApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSYW5nZSBzaG91bGQgY29udGFpbiB0d28gdmFsdWVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggIXRoaXMuaXNOdW1lcmljKHJhbmdlWzBdKSB8fCAhdGhpcy5pc051bWVyaWMocmFuZ2VbMV0pICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlcyBpbiByYW5nZSBzaG91bGQgYmUgbnVtYmVycycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIE1hdGgubWF4KG1pblZhbCwgbWF4VmFsKSA8IE1hdGgubWF4KHJhbmdlWzBdLCByYW5nZVsxXSkgIHx8ICBNYXRoLm1pbihtaW5WYWwsIG1heFZhbCkgPiBNYXRoLm1pbihyYW5nZVswXSwgcmFuZ2VbMV0pICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSByYW5nZSBzaG91bGQgYmUgd2l0aGluIG1pbiBhbmQgbWF4IHZhbHVlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHRlc3RMZWZ0ICUgMSAhPSAwIHx8IHRlc3RSaWdodCAlIDEgIT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcmFuZ2Ugc2hvdWxkIGJlIHNldCBvbiBzdGVwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3VzdG9tRGF0ZVZhbGlkYXRpb24oLi4udmFsczogYW55W10pIHtcclxuICAgICAgICBmb3IgKCBsZXQgdmFsIG9mIHZhbHMgKSB7XHJcbiAgICAgICAgICAgIGlmICggISgnJyArIHZhbCkubWF0Y2goL15cXGR7Mn1bLlxcLy1dXFxkezJ9Wy5cXC8tXVxcZHs0fSQvKSApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIHZhbHVlcyBpbiBkYXRlIGZvcm1hdCBzaG91bGQgYmUgZGF0ZXMsIGxpa2UgZGQubW0ueXl5eSBvciBkZC9tbS95eXl5IG9yIGRkLW1tLXl5eXknKTsgXHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVEYXRlVG9OdW1iZXIoc3RyOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBhcnIgPSBzdHIuc3BsaXQoc3RyWzJdKTtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCthcnJbMl0sICthcnJbMV0gLSAxLCArYXJyWzBdKTtcclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LLQstC+0LTQuNGCINGB0YLRgNCw0L3QvdGL0LUg0LTQsNC90L3Ri9C1LCDQvtC9INCy0YHQtSDRgNCw0LLQvdC+INC/0L7Qu9GD0YfQuNGCINGA0LXQt9GD0LvRjNGC0LDRgi5cclxuICAgICAgICAvLyDQodC60L7RgNC10LUg0LLRgdC10LPQviwg0Y3RgtC+INCz0L7QstC+0YDQuNGCINC+INGC0L7QvCwg0YfRgtC+INC+0L0g0L/QtdGA0LXQv9GD0YLQsNC7INC/0L7RgNGP0LTQvtC6LiDQn9C+0Y/QstC40YLRgdGPINC/0YDQtdC00YPQv9GA0LXQttC00LXQvdC40LVcclxuICAgICAgICBpZiAoK2FyclswXSA+IDMxIHx8ICthcnJbMV0gPiAxMikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VzZSBkZC5tbS55eXl5IG9yIGRkL21tL3l5eXkgb3IgZGQtbW0teXl5eSBmb3IgZGF0ZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IGRhdGUsIHRyeSBkZC5tbS55eXl5IG9yIGRkL21tL3l5eXkgb3IgZGQtbW0teXl5eScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gK2RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFubGF0ZVN0ZXBUb0RhdGVGb3JtYXQoc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyhzdGVwKSB8fCBzdGVwICUgMSAhPSAwICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0ZXAgaW4gZGF0ZSBmb3JtYXQgc2hvdWxkIGJlIGludGVnZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0ZXAgKiAyNCAqIDM2MDAgKiAxMDAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGlzTnVtZXJpYyhuOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmICFpc05hTihuIC0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNpbWFsUGxhY2VzKG51bTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDQt9C90LDQutC+0LIg0L/QvtGB0LvQtSDQt9Cw0L/Rj9GC0L7QuVxyXG4gICAgICAgIHJldHVybiB+KG51bSArICcnKS5pbmRleE9mKCcuJykgPyAobnVtICsgJycpLnNwbGl0KCcuJylbMV0ubGVuZ3RoIDogMDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiDQmNC90YLRhNC10YDRhNC10LnRgSDQuNC30LTQsNGC0LXQu9GPINC+0LHRitGP0LLQu9GP0LXRgiDQvdCw0LHQvtGAINC80LXRgtC+0LTQvtCyINC00LvRjyDRg9C/0YDQsNCy0LvQtdC90LjRj9C80Lgg0L/QvtC00L/QuNGB0LrQuNGH0LDQvNC4LlxyXG4gKi9cclxuaW50ZXJmYWNlIElTdWJqZWN0IHtcclxuXHJcbiAgICB2YWw6IGFueSB8IFthbnksIGFueV07IFxyXG5cclxuICAgIC8vINCf0YDQuNGB0L7QtdC00LjQvdGP0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPINC6INC40LfQtNCw0YLQtdC70Y4uXHJcbiAgICBhdHRhY2gob2JzZXJ2ZXI6IElPYnNlcnZlcik6IHZvaWQ7XHJcblxyXG4gICAgLy8g0J7RgtGB0L7QtdC00LjQvdGP0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPINC+0YIg0LjQt9C00LDRgtC10LvRjy5cclxuICAgIGRldGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZDtcclxuXHJcbiAgICAvLyDQo9Cy0LXQtNC+0LzQu9GP0LXRgiDQstGB0LXRhSDQvdCw0LHQu9GO0LTQsNGC0LXQu9C10Lkg0L4g0YHQvtCx0YvRgtC40LguXHJcbiAgICBub3RpZnkoKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqINCY0LfQtNCw0YLQtdC70Ywg0LLQu9Cw0LTQtdC10YIg0L3QtdC60L7RgtC+0YDRi9C8INCy0LDQttC90YvQvCDRgdC+0YHRgtC+0Y/QvdC40LXQvCDQuCDQvtC/0L7QstC10YnQsNC10YIg0L3QsNCx0LvRjtC00LDRgtC10LvQtdC5INC+INC10LPQvlxyXG4gKiDQuNC30LzQtdC90LXQvdC40Y/RhS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YmplY3QgaW1wbGVtZW50cyBJU3ViamVjdCB7XHJcblxyXG4gICAgdmFsOiBhbnkgfCBbYW55LCBhbnldOyBcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggdmFsOiBhbnkgfCBbYW55LCBhbnldICkge1xyXG4gICAgICAgIHRoaXMudmFsID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge09ic2VydmVyW119INCh0L/QuNGB0L7QuiDQv9C+0LTQv9C40YHRh9C40LrQvtCyLiDQkiDRgNC10LDQu9GM0L3QvtC5INC20LjQt9C90Lgg0YHQv9C40YHQvtC6XHJcbiAgICAgKiDQv9C+0LTQv9C40YHRh9C40LrQvtCyINC80L7QttC10YIg0YXRgNCw0L3QuNGC0YzRgdGPINCyINCx0L7Qu9C10LUg0L/QvtC00YDQvtCx0L3QvtC8INCy0LjQtNC1ICjQutC70LDRgdGB0LjRhNC40YbQuNGA0YPQtdGC0YHRjyDQv9C+XHJcbiAgICAgKiDRgtC40L/RgyDRgdC+0LHRi9GC0LjRjyDQuCDRgi7QtC4pXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZXJzOiBJT2JzZXJ2ZXJbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JzQtdGC0L7QtNGLINGD0L/RgNCw0LLQu9C10L3QuNGPINC/0L7QtNC/0LjRgdC60L7QuS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJJbmRleCA9IHRoaXMub2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLnNwbGljZShvYnNlcnZlckluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCX0LDQv9GD0YHQuiDQvtCx0L3QvtCy0LvQtdC90LjRjyDQsiDQutCw0LbQtNC+0Lwg0L/QvtC00L/QuNGB0YfQuNC60LUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBub3RpZnkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qgb2JzZXJ2ZXIgb2YgdGhpcy5vYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIudXBkYXRlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCY0L3RgtC10YDRhNC10LnRgSDQndCw0LHQu9GO0LTQsNGC0LXQu9GPINC+0LHRitGP0LLQu9GP0LXRgiDQvNC10YLQvtC0INGD0LLQtdC00L7QvNC70LXQvdC40Y8sINC60L7RgtC+0YDRi9C5INC40LfQtNCw0YLQtdC70LhcclxuICog0LjRgdC/0L7Qu9GM0LfRg9GO0YIg0LTQu9GPINC+0L/QvtCy0LXRidC10L3QuNGPINGB0LLQvtC40YUg0L/QvtC00L/QuNGB0YfQuNC60L7Qsi5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmVyIHtcclxuICAgIGZ1bmM6IGFueTtcclxuICAgIC8vINCf0L7Qu9GD0YfQuNGC0Ywg0L7QsdC90L7QstC70LXQvdC40LUg0L7RgiDRgdGD0LHRitC10LrRgtCwLlxyXG4gICAgdXBkYXRlKHN1YmplY3Q6IFN1YmplY3QpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICog0JrQvtC90LrRgNC10YLQvdGL0LUg0J3QsNCx0LvRjtC00LDRgtC10LvQuCDRgNC10LDQs9C40YDRg9GO0YIg0L3QsCDQvtCx0L3QvtCy0LvQtdC90LjRjywg0LLRi9C/0YPRidC10L3QvdGL0LUg0JjQt9C00LDRgtC10LvQtdC8LCDQulxyXG4gKiDQutC+0YLQvtGA0L7QvNGDINC+0L3QuCDQv9GA0LjQutGA0LXQv9C70LXQvdGLLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9ic2VydmVyIGltcGxlbWVudHMgSU9ic2VydmVyIHtcclxuXHJcbiAgICBmdW5jOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZnVuYzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmZ1bmMgPSBmdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoc3ViamVjdDogU3ViamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnVuYyggc3ViamVjdC52YWwgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtJU3ViamVjdH07IiwiaW1wb3J0IElPcHRpb25zLCB7IGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCB7SU1vZGVsfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IHtJTW9kZWxPcHRpb25zfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IHtJVmlld30gZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IHtJU3ViamVjdH0gIGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlc2VudGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9tb2RlbDogSU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBfdmlldzogSVZpZXc7XHJcbiAgICBwcml2YXRlIF9zdWJqZWN0OiBJU3ViamVjdDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVUaHVtYjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IobW9kZWw6IElNb2RlbCwgdmlldzogSVZpZXcsIHN1YmplY3Q6IElTdWJqZWN0KSB7XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XHJcbiAgICAgICAgdGhpcy5fc3ViamVjdCA9IHN1YmplY3Q7XHJcblxyXG4gICAgICAgIHRoaXMudGh1bWJPbk1vdXNlRG93biA9IHRoaXMudGh1bWJPbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudGh1bWJPbk1vdXNlTW92ZSA9IHRoaXMudGh1bWJPbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudGh1bWJPbk1vdXNlVXAgPSB0aGlzLnRodW1iT25Nb3VzZVVwLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyT25Nb3VzZUNsaWNrID0gdGhpcy5zbGlkZXJPbk1vdXNlQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoICFtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICB0aGlzLl92aWV3LmdldFRodW1iKCkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Nb3VzZURvd24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMSkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Nb3VzZURvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDIpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy50aHVtYk9uTW91c2VEb3duKTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgdmlldy5nZXRTbGlkZXIoKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zbGlkZXJPbk1vdXNlQ2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHRodW1iT25Nb3VzZURvd24oZXZlbnQpIHtcclxuICAgICAgICAvLyDQv9GA0LXQtNC+0YLQstGA0LDRgtC40YLRjCDQt9Cw0L/Rg9GB0Log0LLRi9C00LXQu9C10L3QuNGPICjQtNC10LnRgdGC0LLQuNC1INCx0YDQsNGD0LfQtdGA0LApXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGh1bWIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnRodW1iT25Nb3VzZU1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnRodW1iT25Nb3VzZVVwKTtcclxuICAgICAgfVxyXG5cclxuICAgIHRodW1iT25Nb3VzZU1vdmUoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgbGV0IG1vZGVsOiBJTW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuICAgICAgICBsZXQgdmlldzogSVZpZXcgPSB0aGlzLl92aWV3O1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQgPSB0aGlzLl92aWV3LmdldFNsaWRlcigpO1xyXG4gICAgICBcclxuICAgICAgICBsZXQgbWluVmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNaW5WYWwoKTtcclxuICAgICAgICBsZXQgbWF4VmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNYXhWYWwoKTtcclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIGxldCByZXZlcnNlOiBudW1iZXIgPSAhdGhpcy5fbW9kZWwuZ2V0UmV2ZXJzZSgpID8gMSA6IC0xO1xyXG4gICAgICAgIGxldCBzbGlkZXJMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcuZ2V0TGVuZ2h0KCk7XHJcbiAgICAgICAgbGV0IHN0ZXBMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcub25lU3RlcExlbmdodCgpO1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyQm9yZGVyOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGV2ZW50UG9zOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHRodW1iUG9zaXRpb246IG51bWJlcjtcclxuICAgICAgICBsZXQgbGVmdFBvaW50OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHJpZ2h0UG9pbnQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgbmV3VmFsOiBudW1iZXI7XHJcblxyXG4gICAgICAgIC8vINCf0L7Qt9C40YbQuNGPINCx0LXQs9GD0L3QutCwINCyIHB4INCy0YvRh9C40YHQu9GP0LXRgtGB0Y8g0L7RgtC90L7RgdC40YLQtdC70YzQvdC+INC90LDRh9Cw0LvQsCDRgdC70LDQudC00LXRgNCwLlxyXG4gICAgICAgIC8vINCS0L3QsNGH0LDQu9C1IG5ld1ZhbCDQstGL0YfQuNGB0LvRj9C10YLRgdGPINC60LDQuiDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyINC+0YIg0L3QsNGH0LDQu9CwICjQvtGCIDApLFxyXG4gICAgICAgIC8vICjRgtC+INC10YHRgtGMINC30L3QsNGH0LXQvdC40Y8gbWluLCBtYXgsIHJldmVyc2Ug0L3QtSDQuNC80LXRjtGCINC30L3QsNGH0LXQvdC40Y8pLlxyXG5cclxuICAgICAgICBpZiAoICF2aWV3LmdldFZlcnRpY2FsKCkgKSB7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJCb3JkZXIgPSAoc2xpZGVyTm9kZS5vZmZzZXRXaWR0aCAtIHNsaWRlckxlbmdodCkgLyAyO1xyXG4gICAgICAgICAgICBldmVudFBvcyA9IGV2ZW50LmNsaWVudFg7ICAgICAgICAgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBldmVudFBvcyAtIHNsaWRlck5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHNsaWRlckJvcmRlcjtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHNsaWRlckJvcmRlciA9IChzbGlkZXJOb2RlLm9mZnNldEhlaWdodCAtIHNsaWRlckxlbmdodCkgLyAyO1xyXG4gICAgICAgICAgICBldmVudFBvcyA9IGV2ZW50LmNsaWVudFk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBldmVudFBvcyAtIHNsaWRlck5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gc2xpZGVyQm9yZGVyO1xyXG5cclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICBuZXdWYWwgPSBNYXRoLnJvdW5kKHRodW1iUG9zaXRpb24gLyBzdGVwTGVuZ2h0KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIG1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fYWN0aXZlVGh1bWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX3RodW1iX3JpZ2h0JykgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9GA0L7QvNC10LbRg9GC0L7Quiwg0YLQviDQu9C10LLQsNGPINCz0YDQsNC90LjRhtCwIC0g0Y3RgtC+INC70LXQstGL0Lkg0LHQtdCz0YPQvdC+0LpcclxuICAgICAgICAgICAgICAgIC8vINC30LTQtdGB0Ywg0YDQsNGB0YHRh9C40YLRi9Cy0LDQtdGC0YHRjyDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyINC+0YIg0L3QsNGH0LDQu9CwICjQvtGCIDApLCBcclxuICAgICAgICAgICAgICAgIC8vINC30LDRgtC10Lwg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0LIgcHgg0L7RgiDQvdCw0YfQsNC70LAg0YHQu9Cw0LnQtNC10YDQsC5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDQntGI0LjQsdC60Lgg0LIg0LLRi9GH0LjRgdC70LXQvdC40Y/RhSDRgSBmbG9hdCDQt9C00LXRgdGMINC80L7QttC90L4g0L/RgNC+0LjQs9C90L7RgNC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgICAgICAgICBsZWZ0UG9pbnQgPSAobW9kZWwuZ2V0UmFuZ2UoKVswXSAtIG1pblZhbCkgKiByZXZlcnNlIC8gc3RlcDtcclxuICAgICAgICAgICAgICAgIGxlZnRQb2ludCA9IGxlZnRQb2ludCAqIHN0ZXBMZW5naHQ7XHJcbiAgICAgICAgICAgICAgICByaWdodFBvaW50ID0gc2xpZGVyTGVuZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblZhbCA9IG1vZGVsLmdldFJhbmdlKClbMF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByaWdodFBvaW50ID0gKG1vZGVsLmdldFJhbmdlKClbMV0gLSBtaW5WYWwpICogcmV2ZXJzZSAvIHN0ZXA7XHJcbiAgICAgICAgICAgICAgICByaWdodFBvaW50ID0gcmlnaHRQb2ludCAqIHN0ZXBMZW5naHQ7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UG9pbnQgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIG1heFZhbCA9IG1vZGVsLmdldFJhbmdlKClbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZWZ0UG9pbnQgPSAwO1xyXG4gICAgICAgICAgICByaWdodFBvaW50ID0gc2xpZGVyTGVuZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICggdGh1bWJQb3NpdGlvbiA8PSBsZWZ0UG9pbnQpIHtcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGxlZnRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWluVmFsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHRodW1iUG9zaXRpb24gPj0gcmlnaHRQb2ludCkge1xyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gcmlnaHRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWF4VmFsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCx0LXQs9GD0L3QvtC6INC90LUg0LLRi9GI0LXQuyDQt9CwINCz0YDQsNC90LjRhtGLLCDRgdGC0LDQstC40Lwg0LXQs9C+INC90LAg0LHQu9C40LbQsNC50YjQtdC1INC30L3QsNGH0LXQvdC40LUsXHJcbiAgICAgICAgICAgIC8vINC60YDQsNGC0L3QvtC1INGI0LDQs9GDLlxyXG4gICAgICAgICAgICAvLyDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDRjdGC0L7Qs9C+INC/0YDQtdC+0LHRgNCw0LfRg9C10Lwg0LXQs9C+INC00LvRjyDQvNC+0LTQtdC70LguINCV0YHQu9C4IHJldmVyc2UgPT0gdHJ1ZSwg0YLQviA9PSAtMSBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IG5ld1ZhbCAqIHN0ZXBMZW5naHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmID0geCA9PiAoICh4LnRvU3RyaW5nKCkuaW5jbHVkZXMoJy4nKSkgPyAoeC50b1N0cmluZygpLnNwbGl0KCcuJykucG9wKCkubGVuZ3RoKSA6ICgwKSApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG4gPSBmKHN0ZXApICsgZihtaW5WYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSAoIG5ld1ZhbCAqIE1hdGgucG93KDEwLCBuKSAqIHN0ZXAgKiByZXZlcnNlICApIC8gTWF0aC5wb3coMTAsIG4pO1xyXG5cclxuICAgICAgICAgICAgbiA9IE1hdGgubWF4KCBmKHN0ZXApLCBmKG1pblZhbCkgKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKygoK25ld1ZhbCkudG9GaXhlZChuKSk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICgrbW9kZWwuZ2V0TWluVmFsKCkpICsgKCtuZXdWYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSArKCgrbmV3VmFsKS50b0ZpeGVkKG4pKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIG1vZGVsLmdldFJhbmdlKCkgJiYgdGhpcy5fYWN0aXZlVGh1bWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX3RodW1iX2xlZnQnKSkge1xyXG4gICAgICAgICAgICBtb2RlbC5zZXRSYW5nZSggW25ld1ZhbCwgbW9kZWwuZ2V0UmFuZ2UoKVsxXV0gKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmICggbW9kZWwuZ2V0UmFuZ2UoKSAmJiB0aGlzLl9hY3RpdmVUaHVtYi5jbGFzc0xpc3QuY29udGFpbnMoJ3NsaWRlcl9fdGh1bWJfcmlnaHQnKSkge1xyXG4gICAgICAgICAgICBtb2RlbC5zZXRSYW5nZSggW21vZGVsLmdldFJhbmdlKClbMF0sIG5ld1ZhbF0gKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0VmFsKG5ld1ZhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24odGhpcy5fYWN0aXZlVGh1bWIsIHRodW1iUG9zaXRpb24pO1xyXG5cclxuICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgpIHx8IHZpZXcuZ2V0VG9vbHRpcCgxKSApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKG5ld1ZhbCk7XHJcblxyXG4gICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggdGhpcy5fYWN0aXZlVGh1bWIucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fdG9vbHRpcCcpLCB2YWwsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRodW1iT25Nb3VzZVVwKGV2ZW50KSB7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMudGh1bWJPbk1vdXNlVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMudGh1bWJPbk1vdXNlTW92ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVRodW1iID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIC8vINC90LDQsdC70Y7QtNCw0YLQtdC70YxcclxuICAgICAgICBsZXQgbW9kZWw6IElNb2RlbCA9IHRoaXMuX21vZGVsO1xyXG5cclxuICAgICAgICBpZiAoIG1vZGVsLmdldFZhbCgpICE9IG51bGwgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSB2YWw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gW107XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMV0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2xpZGVyT25Nb3VzZUNsaWNrKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGxldCBtb2RlbDogSU1vZGVsID0gdGhpcy5fbW9kZWw7XHJcbiAgICAgICAgbGV0IHZpZXc6IElWaWV3ID0gdGhpcy5fdmlldztcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5fdmlldy5nZXRTbGlkZXIoKTtcclxuICAgICAgICBsZXQgY2hhbmdpbmdUaHVtYjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgIFxyXG4gICAgICAgIGxldCBtaW5WYWw6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldE1pblZhbCgpO1xyXG4gICAgICAgIGxldCBtYXhWYWw6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldE1heFZhbCgpO1xyXG4gICAgICAgIGxldCBzdGVwOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbGV0IHJldmVyc2U6IG51bWJlciA9ICF0aGlzLl9tb2RlbC5nZXRSZXZlcnNlKCkgPyAxIDogLTE7XHJcbiAgICAgICAgbGV0IHNsaWRlckxlbmdodDogbnVtYmVyID0gdGhpcy5fdmlldy5nZXRMZW5naHQoKTtcclxuICAgICAgICBsZXQgc3RlcExlbmdodDogbnVtYmVyID0gdGhpcy5fdmlldy5vbmVTdGVwTGVuZ2h0KCk7XHJcblxyXG4gICAgICAgIGxldCBzbGlkZXJCb3JkZXI6IG51bWJlcjtcclxuICAgICAgICBsZXQgZXZlbnRQb3M6IG51bWJlcjtcclxuICAgICAgICBsZXQgdGh1bWJQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZWZ0UG9pbnQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgcmlnaHRQb2ludDogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuZXdWYWw6IG51bWJlcjtcclxuXHJcbiAgICAgICAgLy8g0J/QvtC30LjRhtC40Y8g0LHQtdCz0YPQvdC60LAg0LIgcHgg0LLRi9GH0LjRgdC70Y/QtdGC0YHRjyDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L4g0L3QsNGH0LDQu9CwINGB0LvQsNC50LTQtdGA0LAuXHJcbiAgICAgICAgLy8g0JLQvdCw0YfQsNC70LUgbmV3VmFsINCy0YvRh9C40YHQu9GP0LXRgtGB0Y8g0LrQsNC6INC60L7Qu9C40YfQtdGB0YLQstC+INGI0LDQs9C+0LIg0L7RgiDQvdCw0YfQsNC70LAgKNC+0YIgMCksXHJcbiAgICAgICAgLy8gKNGC0L4g0LXRgdGC0Ywg0LfQvdCw0YfQtdC90LjRjyBtaW4sIG1heCwgcmV2ZXJzZSDQvdC1INC40LzQtdGO0YIg0LfQvdCw0YfQtdC90LjRjykuXHJcblxyXG4gICAgICAgIGlmICggIXRoaXMuX3ZpZXcuZ2V0VmVydGljYWwoKSApIHtcclxuXHJcbiAgICAgICAgICAgIHNsaWRlckJvcmRlciA9IChzbGlkZXJOb2RlLm9mZnNldFdpZHRoIC0gc2xpZGVyTGVuZ2h0KSAvIDI7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gZXZlbnQuY2xpZW50WDsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGV2ZW50UG9zIC0gc2xpZGVyTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gc2xpZGVyQm9yZGVyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJCb3JkZXIgPSAoc2xpZGVyTm9kZS5vZmZzZXRIZWlnaHQgLSBzbGlkZXJMZW5naHQpIC8gMjtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSBldmVudC5jbGllbnRZOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gZXZlbnRQb3MgLSBzbGlkZXJOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHNsaWRlckJvcmRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5ld1ZhbCA9IE1hdGgucm91bmQodGh1bWJQb3NpdGlvbiAvIHN0ZXBMZW5naHQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxlZnRQb2ludCA9IDA7XHJcbiAgICAgICAgcmlnaHRQb2ludCA9IHNsaWRlckxlbmdodDtcclxuICAgIFxyXG4gICAgICAgIGlmICggdGh1bWJQb3NpdGlvbiA8PSBsZWZ0UG9pbnQpIHtcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGxlZnRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWluVmFsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHRodW1iUG9zaXRpb24gPj0gcmlnaHRQb2ludCkge1xyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gcmlnaHRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWF4VmFsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCx0LXQs9GD0L3QvtC6INC90LUg0LLRi9GI0LXQuyDQt9CwINCz0YDQsNC90LjRhtGLLCDRgdGC0LDQstC40Lwg0LXQs9C+INC90LAg0LHQu9C40LbQsNC50YjQtdC1INC30L3QsNGH0LXQvdC40LUsXHJcbiAgICAgICAgICAgIC8vINC60YDQsNGC0L3QvtC1INGI0LDQs9GDLlxyXG4gICAgICAgICAgICAvLyDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDRjdGC0L7Qs9C+INC/0YDQtdC+0LHRgNCw0LfRg9C10Lwg0LXQs9C+INC00LvRjyDQvNC+0LTQtdC70LguINCV0YHQu9C4IHJldmVyc2UgPT0gdHJ1ZSwg0YLQviA9PSAtMSBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IG5ld1ZhbCAqIHN0ZXBMZW5naHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmID0geCA9PiAoICh4LnRvU3RyaW5nKCkuaW5jbHVkZXMoJy4nKSkgPyAoeC50b1N0cmluZygpLnNwbGl0KCcuJykucG9wKCkubGVuZ3RoKSA6ICgwKSApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG4gPSBmKHN0ZXApICsgZihtaW5WYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSAoIG5ld1ZhbCAqIE1hdGgucG93KDEwLCBuKSAqIHN0ZXAgKiByZXZlcnNlICApIC8gTWF0aC5wb3coMTAsIG4pO1xyXG5cclxuICAgICAgICAgICAgbiA9IE1hdGgubWF4KCBmKHN0ZXApLCBmKG1pblZhbCkgKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKygoK25ld1ZhbCkudG9GaXhlZChuKSk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICgrbW9kZWwuZ2V0TWluVmFsKCkpICsgKCtuZXdWYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSArKCgrbmV3VmFsKS50b0ZpeGVkKG4pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggIW1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgIG1vZGVsLnNldFZhbChuZXdWYWwpO1xyXG4gICAgICAgICAgICBjaGFuZ2luZ1RodW1iID0gdmlldy5nZXRUaHVtYigpO1xyXG4gICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oY2hhbmdpbmdUaHVtYiwgdGh1bWJQb3NpdGlvbik7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICggTWF0aC5hYnMobmV3VmFsIC0gbW9kZWwuZ2V0UmFuZ2UoKVswXSkgPCBNYXRoLmFicyhuZXdWYWwgLSBtb2RlbC5nZXRSYW5nZSgpWzFdKSApIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsLnNldFJhbmdlKFsgbmV3VmFsLCBtb2RlbC5nZXRSYW5nZSgpWzFdIF0pO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdpbmdUaHVtYiA9IHZpZXcuZ2V0VGh1bWIoMSk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oY2hhbmdpbmdUaHVtYiwgdGh1bWJQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb2RlbC5zZXRSYW5nZShbIG1vZGVsLmdldFJhbmdlKClbMF0sIG5ld1ZhbCBdKTtcclxuICAgICAgICAgICAgICAgIGNoYW5naW5nVGh1bWIgPSB2aWV3LmdldFRodW1iKDIpO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKGNoYW5naW5nVGh1bWIsIHRodW1iUG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoKSB8fCB2aWV3LmdldFRvb2x0aXAoMSkgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZShuZXdWYWwpO1xyXG5cclxuICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIGNoYW5naW5nVGh1bWIucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fdG9vbHRpcCcpLCB2YWwsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC90LDQsdC70Y7QtNCw0YLQtdC70YxcclxuICAgICAgICBpZiAoIG1vZGVsLmdldFZhbCgpICE9IG51bGwgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSB2YWw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gW107XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMV0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlKG9wdGlvbnM6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuICAgICAgICBsZXQgdmlldyA9IHRoaXMuX3ZpZXc7XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VUaHVtYlBvc2l0aW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNoYW5nZVRvb2x0aXBWYWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhbmdlU2NhbGVEaXZpc2lvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjaGFuZ2VWYWxUb1JhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNoYW5nZVJhbmdlVG9WYWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgcmVidWlsZFNjYWxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHJlYnVpbGRUb29sdGlwOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIDEuINCc0J7QlNCV0JvQrFxyXG4gICAgICAgIC8vINC10YHQu9C4INC80LXQvdGP0LXRgtGB0Y8g0LrQsNC60L7QuSDQu9C40LHQviDQv9Cw0YDQsNC80LXRgtGAINCyINC80L7QtNC10LvQuCwg0LfQsNC/0YPRgdC60LDQtdC8INC/0YDQvtCy0LXRgNC60Lgg0LzQvtC00LXQu9C4LFxyXG4gICAgICAgIC8vINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0L3QvtCy0YvQtSDQt9C90LDRh9C10L3QuNGPLlxyXG4gICAgICAgIC8vINC30LDQv9C+0LzQuNC90LDQtdC8LCDRh9GC0L4g0L3Rg9C20L3QviDQuNC30LzQtdC90LjRgtGMINC/0L7Qu9C+0LbQtdC90LjRjyDQv9C+0LvQt9GD0L3QutC+0LIsINC30L3QsNGH0LXQvdC40Y8g0LIg0L/QvtC00YHQutCw0LfQutCw0YUsXHJcbiAgICAgICAgLy8g0LTQtdC70LXQvdC40Lkg0YjQutCw0LvRiyAo0LfQvdCw0YfQtdC90LjRjyDQuCBsZWZ0KS4gXHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0LjQt9C80LXQvdC40LvQvtGB0Ywg0LrQvtC70LjRh9C10YHRgtCy0L4g0YjQsNCz0L7QsiAtIHRydWUg0L3QsCDQv9C10YDQtdGA0LjRgdC+0LLQsNGC0Ywg0YjQutCw0LvRgy5cclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C+0LzQtdC90Y/Qu9C+0YHRjCB2YWwg0L3QsCByYW5nZSwg0LjQu9C4INC90LDQvtCx0L7RgNC+0YIgLSB0cnVlINC90LAg0L/QvtGB0YLRgNC+0LjRgtGMISDQsdC10LPRg9C90LrQuC5cclxuXHJcblxyXG4gICAgICAgIGxldCBtb2RlbE9wdGlvbnMgPSBbJ2RhdGFGb3JtYXQnLCAndmFsdWUnLCAnbWluVmFsJywgJ21heFZhbCcsICdzdGVwJywgJ3JldmVyc2UnLCAncmFuZ2UnLCAnY3VzdG9tVmFsdWVzJywgJ3ZhbHVlSW5DdXN0b21WYWx1ZXMnLCAncmFuZ2VJbkN1c3RvbVZhbHVlcyddO1xyXG5cclxuICAgICAgICBsZXQgdGVzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG1vZGVsT3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KGl0ZW0pICkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIHRlc3QgKSB7XHJcbiAgICAgICAgICAgIGxldCBwcmV2TnVtT2ZTdGVwczogbnVtYmVyID0gbW9kZWwubnVtYmVyT2ZTdGVwcygpO1xyXG4gICAgICAgICAgICBsZXQgcHJldk9wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSBtb2RlbC5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdPcHRpb25zOiBJT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGVsLmNoYW5nZShuZXdPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIHZpZXcuc2V0TnVtYmVyT2ZTdGVwcyggbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGVTdGVwKCB2aWV3LnNjYWxlU3RlcFZhbGlkYXRpb24oIG1vZGVsLCB2aWV3LmdldFNjYWxlU3RlcCgpICkgKTtcclxuXHJcbiAgICAgICAgICAgIGNoYW5nZVRodW1iUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHByZXZOdW1PZlN0ZXBzICE9IG1vZGVsLm51bWJlck9mU3RlcHMoKSApIHtcclxuICAgICAgICAgICAgICAgIHJlYnVpbGRTY2FsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCB2aWV3LmdldFJhbmdlKCkgJiYgIW1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VSYW5nZVRvVmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlYnVpbGRUb29sdGlwID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoICF2aWV3LmdldFJhbmdlKCkgJiYgbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZVZhbFRvUmFuZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVidWlsZFRvb2x0aXAgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAyLiDQktCY0JRcclxuICAgICAgICAvLyDQn9C10YDQtdGA0LjRgdC+0LLRi9Cy0LDQtdC8INCy0LjQtCDQvtGCINGB0LDQvNGL0YUg0LPQu9C+0LHQsNC70YzQvdGL0YUg0LjQt9C80LXQvdC10L3QuNC5INC6INGB0LDQvNGL0Lwg0L3QtdC30L3QsNGH0LjRgtC10LvRjNC90YvQvC5cclxuICAgICAgICBcclxuICAgICAgICAvLyAyLjEg0KHQsNC80L7QtSDQsdC+0LvRjNGI0L7QtSDQuNC30LzQtdC90LXQvdC40LUgLSDRjdGC0L4g0LLQuNC0INC+0YHQvdC+0LLRiyDRiNC60LDQu9GLLlxyXG4gICAgICAgIC8vINCV0LUg0LjQt9C80LXQvdC10L3QuNC1INCy0YvQt9GL0LLQsNC10YI6INC40LfQvNC10L3QuNGC0Ywg0L/QvtC70L7QttC10L3QuNGPINCx0LXQs9GD0L3QutC+0LIsINC00LXQu9C10L3QuNC5INGI0LrQsNC70YtcclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCd2ZXJ0aWNhbCcpIHx8IG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2xlbmd0aCcpICkge1xyXG4gICAgICAgICAgICB2aWV3LmNoYW5nZVNsaWRlckJhc2Uob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNoYW5nZVRodW1iUG9zaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDIuMiDQnNC10L3Rj9C10Lwg0LrQvtC70LjRh9C10YHRgtCy0L4g0LHQtdCz0YPQvdC60L7Qsiwg0LXRgdC70Lgg0L3Rg9C20L3QvlxyXG4gICAgICAgIC8vINCV0YHQu9C4INGC0LDQutC+0LUg0LjQt9C80LXQvdC10L3QuNC1INCx0YvQu9C+LCDQt9C90LDRh9C40YIg0LLQtdC30LTQtSxcclxuICAgICAgICAvLyDQs9C00LUg0L3QsNC00L4sINGD0LbQtSDRgdGC0L7QuNGCIHRydWVcclxuXHJcbiAgICAgICAgaWYgKCBjaGFuZ2VSYW5nZVRvVmFsICkge1xyXG4gICAgICAgICAgICB2aWV3LmNoYW5nZVJhbmdlVG9WYWwobW9kZWwpO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKCkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Nb3VzZURvd24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIGNoYW5nZVZhbFRvUmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlVmFsVG9SYW5nZShtb2RlbCk7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMSkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Nb3VzZURvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDIpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy50aHVtYk9uTW91c2VEb3duKTtcclxuICAgICAgICB9ICAgXHJcblxyXG4gICAgICAgIC8vIDIuMyDQqNC60LDQu9CwLiDQo9C00LDQu9GP0LXQvCwg0YHRgtGA0L7QuNC8INC40LvQuCDQv9C10YDQtdGB0YLRgNCw0LjQstCw0LXQvC4g0JjQt9C80LXQvdGP0LXQvCDQtNC10LvQtdC90LjRjy5cclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCdzY2FsZVN0ZXAnKSAmJiBvcHRpb25zLnNjYWxlU3RlcCAhPSB2aWV3LmdldFNjYWxlU3RlcCgpICkge1xyXG4gICAgICAgICAgICB2aWV3LnNldFNjYWxlU3RlcCggdmlldy5zY2FsZVN0ZXBWYWxpZGF0aW9uKG1vZGVsLCBvcHRpb25zLnNjYWxlU3RlcCkgKTtcclxuICAgICAgICAgICAgcmVidWlsZFNjYWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2NhbGVNYXNrJykgJiYgb3B0aW9ucy5zY2FsZU1hc2sgIT0gdmlldy5nZXRTY2FsZU1hc2soKSApIHtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZU1hc2soIG9wdGlvbnMuc2NhbGVNYXNrICk7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDRg9C00LDQu9GP0LXQvFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2NhbGUnKSAmJiBvcHRpb25zLnNjYWxlID09IGZhbHNlICYmIHZpZXcuZ2V0U2NhbGUoKSApIHtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZSggdmlldy5yZW1vdmVOb2RlKCB2aWV3LmdldFNjYWxlKCkgKSApO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJlYnVpbGRTY2FsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDRgdGC0YDQvtC40LxcclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NjYWxlJykgJiYgb3B0aW9ucy5zY2FsZSA9PSB0cnVlICYmICF2aWV3LmdldFNjYWxlKCkgKSB7XHJcbiAgICAgICAgICAgIGxldCBzY2FsZTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHNjYWxlID0gdmlldy5idWlsZFNjYWxlKHZpZXcuZ2V0U2xpZGVyKCksIHZpZXcuZ2V0U2NhbGVTdGVwKCksIG1vZGVsLCB2aWV3LmdldFNjYWxlTWFzaygpICk7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGUoc2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgcmVidWlsZFNjYWxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgdGC0YDQsNC40LLQsNC10LxcclxuICAgICAgICBpZiAoIHJlYnVpbGRTY2FsZSAmJiB2aWV3LmdldFNjYWxlKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcucmVidWlsZFNjYWxlKG1vZGVsKTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC40LfQvNC10L3Rj9C10Lwg0LTQtdC70LXQvdC40Y8uINC30L3QsNGH0LXQvdC40LUg0LggbGVmdFxyXG4gICAgICAgIGlmICggY2hhbmdlU2NhbGVEaXZpc2lvbiAmJiB2aWV3LmdldFNjYWxlKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlU2NhbGVEaXZpc2lvbihtb2RlbCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gMi40INCf0L7QtNGB0LrQsNC30LrQuC4g0KPQtNCw0LvRj9C10LwuINCh0YLRgNC+0LjQvC4g0JzQtdC90Y/QtdC8INC30L3QsNGH0LXQvdC40Y9cclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCd0b29sdGlwTWFzaycpICYmIG9wdGlvbnMudG9vbHRpcE1hc2sgIT0gdmlldy5nZXRUb29sdGlwTWFzaygpICkge1xyXG4gICAgICAgICAgICB2aWV3LnNldFRvb2x0aXBNYXNrKCBvcHRpb25zLnRvb2x0aXBNYXNrICk7XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoICF2aWV3LmdldFRvb2x0aXAoKSAmJiAhdmlldy5nZXRUb29sdGlwKDEpICYmICFvcHRpb25zLmhhc093blByb3BlcnR5KCd0b29sdGlwJykgKSB7XHJcbiAgICAgICAgICAgIHJlYnVpbGRUb29sdGlwID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0YPQtNCw0LvRj9C10LxcclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCA9PSBmYWxzZSB8fCByZWJ1aWxkVG9vbHRpcCApIHtcclxuXHJcbiAgICAgICAgICAgIC8vINC/0L7Rh9C10LzRgyDQsiDQtNGA0YPQs9C+0Lwg0L/QvtGA0Y/QtNC60LUg0L3QtSDRgNCw0LHQvtGC0LDQtdGCXHJcbiAgICAgICAgICAgIGlmICggdmlldy5nZXRUb29sdGlwKDIpICkgdmlldy5zZXRUb29sdGlwKCB2aWV3LnJlbW92ZU5vZGUodmlldy5nZXRUb29sdGlwKDIpKSwgMiApO1xyXG4gICAgICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgxKSApIHZpZXcuc2V0VG9vbHRpcCggdmlldy5yZW1vdmVOb2RlKHZpZXcuZ2V0VG9vbHRpcCgxKSksIDEgKTtcclxuICAgICAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoKSApIHZpZXcuc2V0VG9vbHRpcCggdmlldy5yZW1vdmVOb2RlKHZpZXcuZ2V0VG9vbHRpcCgwKSksIDAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICggb3B0aW9ucy50b29sdGlwID09IGZhbHNlICkge1xyXG4gICAgICAgICAgICAgICAgcmVidWlsZFRvb2x0aXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC/0LXRgNC10YHRgtGA0LDQuNCy0LDQtdC8XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnRvb2x0aXAgfHwgcmVidWlsZFRvb2x0aXAgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuYnVpbGRWYWxpZFRvb2x0aXBzKG1vZGVsKTtcclxuICAgICAgICAgICAgY2hhbmdlVG9vbHRpcFZhbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQvNC10L3Rj9C10Lwg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICAgIGlmICggY2hhbmdlVG9vbHRpcFZhbCAmJiAodmlldy5nZXRUb29sdGlwKCkgfHwgdmlldy5nZXRUb29sdGlwKDEpKSApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbW9kZWwuZ2V0UmFuZ2UoKSkgeyBcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRWYWwoKSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIHZpZXcuZ2V0VG9vbHRpcCgpLCB2YWwgYXMgc3RyaW5nLCB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKTsgICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VmFsVG9Ub29sdGlwKCB2aWV3LmdldFRvb2x0aXAoMSksIHZhbCBhcyBzdHJpbmcsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggdmlldy5nZXRUb29sdGlwKDIpLCB2YWwgYXMgc3RyaW5nLCB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG5cclxuXHJcbiAgICAgICAgLy8gMi41INCf0L7Qu9C+0LbQtdC90LjRjyDQsdC10LPRg9C90LrQvtCyXHJcblxyXG4gICAgICAgIGlmICggY2hhbmdlVGh1bWJQb3NpdGlvbiApIHtcclxuICAgICAgICAgICAgbGV0IHBvczogbnVtYmVyO1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwb3MgPSB2aWV3LmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFZhbCgpKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oIHZpZXcuZ2V0VGh1bWIoKSwgcG9zKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7ICAgICBcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgcG9zID0gdmlldy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzBdKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oIHZpZXcuZ2V0VGh1bWIoMSksIHBvcyk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHBvcyA9IHZpZXcuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVsxXSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKCB2aWV3LmdldFRodW1iKDIpLCBwb3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDQvdCw0LHQu9GO0LTQsNGC0LXQu9GMXHJcbiAgICAgICAgICAgIC8vINCy0YvQt9GL0LLQsNC10Lwg0LXRgdC70Lgg0LHRi9C70Lgg0LjQt9C80LXQvdC10L3QuNGPINGB0LLRj9C30LDQvdC90YvQtSDRgSDQsdC10LPRg9C90LrQsNC80LhcclxuICAgICAgICAgICAgLy8g0L3QtSDQt9Cw0YLRgNC+0L3QtdGCLCDQvdCw0L/RgNC40LzQtdGALCDQtNC+0LHQsNCy0LvQtdC90LjQtSDRiNC60LDQu9GLXHJcbiAgICAgICAgICAgIGlmICggbW9kZWwuZ2V0VmFsKCkgIT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IHZhbDtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzBdID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVsxXSApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMV0gPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC5ub3RpZnkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgSU9wdGlvbnMgZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCBNb2RlbCwge0lNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCB7IHJ1bkluTmV3Q29udGV4dCB9IGZyb20gJ3ZtJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZpZXcge1xyXG5cclxuICAgIC8vINCz0LXRgtGC0LXRgNGLINC4INGB0LXRgtGC0LXRgNGLXHJcbiAgICBnZXRMZW5naHQoKTogbnVtYmVyO1xyXG4gICAgZ2V0VmVydGljYWwoKTogYm9vbGVhbjtcclxuICAgIGdldFJhbmdlKCk6IGJvb2xlYW47XHJcbiAgICBnZXRUb29sdGlwTWFzaygpOiBzdHJpbmc7XHJcbiAgICBzZXRUb29sdGlwTWFzayhtYXNrOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgZ2V0U2NhbGVTdGVwKCk6IG51bWJlcjtcclxuICAgIHNldFNjYWxlU3RlcChzdGVwOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgZ2V0U2NhbGVNYXNrKCk6IHN0cmluZztcclxuICAgIHNldFNjYWxlTWFzayhtYXNrOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgZ2V0TnVtYmVyT2ZTdGVwcygpOiBudW1iZXI7XHJcbiAgICBzZXROdW1iZXJPZlN0ZXBzKG51bTogbnVtYmVyKTogdm9pZDtcclxuXHJcbiAgICBnZXRTbGlkZXIoKTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRUaHVtYihudW0/OiBudW1iZXIpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFRvb2x0aXAobnVtPzogbnVtYmVyKTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBzZXRUb29sdGlwKHRvb2x0aXA6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkLCBudW0/OiBudW1iZXIpOiB2b2lkO1xyXG4gICAgZ2V0U2NhbGUoKTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBzZXRTY2FsZShzY2FsZTogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQpOiB2b2lkO1xyXG5cclxuXHJcbiAgICAvLyDQvNC10YLQvtC00Ysg0LTQu9GPINGB0L7Qt9C00LDQvdC40Y8g0Lgg0LjQt9C80LXQvdC10L3QuNGPIHZpZXdcclxuICAgIGNoYW5nZVNsaWRlckJhc2UgKG9wdGlvbnM6IGFueSk6IHZvaWQ7XHJcbiAgICBjaGFuZ2VSYW5nZVRvVmFsIChtb2RlbDogSU1vZGVsKTogdm9pZDtcclxuICAgIGNoYW5nZVZhbFRvUmFuZ2UgKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgYnVpbGRWYWxpZFRvb2x0aXBzKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgYnVpbGRTY2FsZShzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCwgc3RlcDogbnVtYmVyLCBtb2RlbDogSU1vZGVsLCBtYXNrOiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHJlYnVpbGRTY2FsZShtb2RlbDogSU1vZGVsKTogdm9pZDtcclxuICAgIGNoYW5nZVNjYWxlRGl2aXNpb24obW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcbiAgICBjaGFuZ2VMaW5lKCk6IHZvaWQ7XHJcblxyXG4gICAgLy8g0LLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3Ri9C1INC80LXRgtC+0LTRi1xyXG4gICAgc2V0VGh1bWJQb3NpdGlvbih0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCB0aHVtYlBvc2l0aW9uOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgc2V0VmFsVG9Ub29sdGlwKHRvb2x0aXBOb2RlOiBIVE1MRGl2RWxlbWVudCwgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlLCBtYXNrOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgZmluZFRodW1iUG9zaXRpb24obmV3U3RlcCwgbnVtT2ZTdGVwcyk6IG51bWJlcjtcclxuICAgIG9uZVN0ZXBMZW5naHQoKTogbnVtYmVyO1xyXG4gICAgcmVtb3ZlTm9kZShub2RlOiBIVE1MRGl2RWxlbWVudCk6IHVuZGVmaW5lZDtcclxuICAgIHNjYWxlU3RlcFZhbGlkYXRpb24obW9kZWw6IElNb2RlbCwgc3RlcDogbnVtYmVyKTogbnVtYmVyOyAgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcgaW1wbGVtZW50cyBJVmlldyB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGVuZ2h0OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF92ZXJ0aWNhbDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3JhbmdlOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcE1hc2s6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3NjYWxlTWFzaz86IHN0cmluZztcclxuICAgIHByaXZhdGUgX3NjYWxlU3RlcD86IG51bWJlcjtcclxuICAgIHByaXZhdGUgX251bWJlck9mU3RlcHM6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9zbGlkZXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfdGh1bWI/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3RodW1iTGVmdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdGh1bWJSaWdodD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfbGluZTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwTGVmdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcFJpZ2h0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9zY2FsZT86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgXHJcblxyXG4gICAgY29uc3RydWN0b3IobW9kZWw6IElNb2RlbCwgb3B0aW9uczogSU9wdGlvbnMsIHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50KSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3NsaWRlciA9IHNsaWRlck5vZGU7XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcicpO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gbW9kZWwuZ2V0UmFuZ2UoKSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICB0aGlzLl9udW1iZXJPZlN0ZXBzID0gbW9kZWwubnVtYmVyT2ZTdGVwcygpO1xyXG4gICAgICAgIHRoaXMuX2xlbmdodCA9IHRoaXMubGVuZ3RoVmFsaWRhdGlvbihvcHRpb25zLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGlmICggIW9wdGlvbnMudmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS53aWR0aCA9IHRoaXMuX2xlbmdodDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fbGVuZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX3ZlcnRpY2FsJyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9saW5lID0gdGhpcy5idWlsZExpbmUodGhpcy5fc2xpZGVyKTtcclxuXHJcbiAgICAgICAgbGV0IHBvczogbnVtYmVyO1xyXG4gICAgICAgIGlmICggIXRoaXMuX3JhbmdlICkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdGh1bWIgPSB0aGlzLmJ1aWxkVGh1bWIodGhpcy5fc2xpZGVyKTtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRWYWwoKSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iLCBwb3MpO1xyXG4gICAgICAgIH0gZWxzZSB7ICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iTGVmdCA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iX2xlZnQnKTtcclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJSaWdodCA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iX3JpZ2h0Jyk7XHJcblxyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMF0pLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYkxlZnQsIHBvcyk7XHJcblxyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMV0pLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYlJpZ2h0LCBwb3MpO1xyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIC8vINC80LDRgdC60LAg0LTQu9GPINC/0L7QtNGB0LrQsNC30L7QulxyXG4gICAgICAgIC8vINC10YHQu9C4INC10LUg0L3QtdGCLCDQv9GA0LjQvNC10L3Rj9C10YLRgdGPINC+0LHRi9GH0L3QsNGPLCDQutC+0YLQvtGA0LDRjyDQv9C+INC00LXRhNC+0LvRgtGDINCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC/0YDQvtGB0YLQviB2YWxcclxuICAgICAgICAvLyAo0LIg0YTQvtGA0LzQsNGC0LUg0LTQsNGCINCy0LXRgNC90LXRgtGB0Y8g0L7QsdGK0LXQutGCINC00LDRgtCwKVxyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXBNYXNrID0gb3B0aW9ucy50b29sdGlwTWFzaztcclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnRvb2x0aXAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRWYWxpZFRvb2x0aXBzKG1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc2NhbGVNYXNrID0gb3B0aW9ucy5zY2FsZU1hc2s7XHJcblxyXG4gICAgICAgIGxldCBzdGVwOiBudW1iZXI7XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnNjYWxlU3RlcCApIHtcclxuICAgICAgICAgICAgc3RlcCA9IHRoaXMuc2NhbGVTdGVwVmFsaWRhdGlvbihtb2RlbCwgb3B0aW9ucy5zY2FsZVN0ZXApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NjYWxlU3RlcCA9IHN0ZXA7XHJcblxyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuc2NhbGUgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NjYWxlID0gdGhpcy5idWlsZFNjYWxlKHRoaXMuX3NsaWRlciwgc3RlcCwgbW9kZWwsIHRoaXMuX3NjYWxlTWFzayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vINCz0LXRgtGC0LXRgNGLINC4INGB0LXRgtGC0LXRgNGLXHJcbiAgICBnZXRMZW5naHQoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlci5jbGllbnRXaWR0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVyLmNsaWVudEhlaWdodDtcclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG4gICAgZ2V0VmVydGljYWwoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2FsO1xyXG4gICAgfVxyXG4gICAgZ2V0UmFuZ2UoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JhbmdlO1xyXG4gICAgfVxyXG4gICAgZ2V0VG9vbHRpcE1hc2soKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcE1hc2s7XHJcbiAgICB9XHJcbiAgICBzZXRUb29sdGlwTWFzayhtYXNrOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl90b29sdGlwTWFzayA9IG1hc2s7XHJcbiAgICB9XHJcbiAgICBnZXRTY2FsZVN0ZXAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVTdGVwO1xyXG4gICAgfVxyXG4gICAgc2V0U2NhbGVTdGVwKHN0ZXA6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NjYWxlU3RlcCA9IHN0ZXA7XHJcbiAgICB9XHJcbiAgICBnZXRTY2FsZU1hc2soKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVNYXNrO1xyXG4gICAgfVxyXG4gICAgc2V0U2NhbGVNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NjYWxlTWFzayA9IG1hc2s7XHJcbiAgICB9XHJcbiAgICBnZXROdW1iZXJPZlN0ZXBzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bWJlck9mU3RlcHM7XHJcbiAgICB9O1xyXG4gICAgc2V0TnVtYmVyT2ZTdGVwcyhudW06IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX251bWJlck9mU3RlcHMgPSBudW07XHJcbiAgICB9O1xyXG4gICAgXHJcblxyXG5cclxuICAgIGdldFNsaWRlcigpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlcjtcclxuICAgIH1cclxuICAgIGdldFRodW1iKG51bTogbnVtYmVyID0gMCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBpZiAoIG51bSA9PSAwICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGh1bWI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggbnVtID09IDEgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aHVtYkxlZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggbnVtID09IDIgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aHVtYlJpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fdGh1bWI7XHJcbiAgICB9XHJcbiAgICBnZXRUb29sdGlwKG51bTogbnVtYmVyID0gMCk6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXAgfHwgdGhpcy5fdG9vbHRpcExlZnQgKSB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcCAmJiBudW0gPT0gMCApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcExlZnQgJiYgbnVtID09IDEgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcExlZnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwUmlnaHQgJiYgbnVtID09IDIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcFJpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRUb29sdGlwKHRvb2x0aXA6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkLCBudW06IG51bWJlciA9IDApIHtcclxuICAgICAgICBpZiAoIG51bSA9PSAwICkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwID0gdG9vbHRpcDtcclxuICAgICAgICB9IGVsc2UgaWYgKCBudW0gPT0gMSApIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcExlZnQgPSB0b29sdGlwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIG51bSA9PSAyICkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwUmlnaHQgPSB0b29sdGlwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFNjYWxlKCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGU7XHJcbiAgICB9XHJcbiAgICBzZXRTY2FsZShzY2FsZTogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDQvNC10YLQvtC00Ysg0LTQu9GPINGB0L7Qt9C00LDQvdC40Y8g0Lgg0LjQt9C80LXQvdC10L3QuNGPIHZpZXdcclxuXHJcbiAgICBjaGFuZ2VTbGlkZXJCYXNlIChvcHRpb25zOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IGxlbmdodENoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8g0YjQuNGA0LjQvdCwIC8g0LTQu9C40L3QsFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5sZW5ndGggJiYgdGhpcy5fbGVuZ2h0ICE9IG9wdGlvbnMubGVuZ3RoICkge1xyXG4gICAgICAgICAgICB0aGlzLl9sZW5naHQgPSBvcHRpb25zLmxlbmd0aDtcclxuICAgICAgICAgICAgbGVuZ2h0Q2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQvtGA0LjQtdC90YLQsNGG0LjRj1xyXG4gICAgICAgIGlmICggb3B0aW9ucy52ZXJ0aWNhbCAmJiAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl9ob3Jpem9udGFsJylcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xyXG5cclxuICAgICAgICAgICAgbGVuZ2h0Q2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggb3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UgJiYgdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfdmVydGljYWwnKVxyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2hvcml6b250YWwnKTtcclxuXHJcbiAgICAgICAgICAgIGxlbmdodENoYW5nZWQgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGVuZ2h0Q2hhbmdlZCAmJiAhdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS53aWR0aCA9IHRoaXMuX2xlbmdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxlbmdodENoYW5nZWQgJiYgdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLndpZHRoID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IHRoaXMuX2xlbmdodDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUmFuZ2VUb1ZhbCAobW9kZWw6IElNb2RlbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwb3M6IG51bWJlcjtcclxuXHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl90aHVtYiA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIpO1xyXG4gICAgICAgIHRoaXMuX3RodW1iTGVmdCA9IHRoaXMucmVtb3ZlTm9kZSh0aGlzLl90aHVtYkxlZnQpO1xyXG4gICAgICAgIHRoaXMuX3RodW1iUmlnaHQgPSB0aGlzLnJlbW92ZU5vZGUodGhpcy5fdGh1bWJSaWdodCk7XHJcblxyXG4gICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0VmFsKCkpLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iLCBwb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVZhbFRvUmFuZ2UgKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGh1bWIgPSB0aGlzLnJlbW92ZU5vZGUodGhpcy5fdGh1bWIpO1xyXG4gICAgICAgIHRoaXMuX3RodW1iTGVmdCA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iX2xlZnQnKTsgXHJcbiAgICAgICAgdGhpcy5fdGh1bWJSaWdodCA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iX3JpZ2h0Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzBdKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYkxlZnQsIHBvcyk7XHJcblxyXG4gICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVsxXSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy5fdGh1bWJSaWdodCwgcG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZFZhbGlkVG9vbHRpcHMobW9kZWw6IElNb2RlbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fcmFuZ2UpIHsgXHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXAgKSB0aGlzLl90b29sdGlwID0gdGhpcy5yZW1vdmVOb2RlKCB0aGlzLl90b29sdGlwICk7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IHRoaXMuYnVpbGRUb29sdGlwKHRoaXMuX3RodW1iKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWxUb1Rvb2x0aXAoIHRoaXMuX3Rvb2x0aXAsIHZhbCwgdGhpcy5fdG9vbHRpcE1hc2sgKTsgICBcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwTGVmdCApIHRoaXMuX3Rvb2x0aXBMZWZ0ID0gdGhpcy5yZW1vdmVOb2RlKCB0aGlzLl90b29sdGlwTGVmdCApO1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcExlZnQgPSB0aGlzLmJ1aWxkVG9vbHRpcCh0aGlzLl90aHVtYkxlZnQsICdzbGlkZXJfX3Rvb2x0aXBfbGVmdCcpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbFRvVG9vbHRpcCggdGhpcy5fdG9vbHRpcExlZnQsIHZhbCwgdGhpcy5fdG9vbHRpcE1hc2sgKTsgIFxyXG5cclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwUmlnaHQgKSB0aGlzLl90b29sdGlwUmlnaHQgPSB0aGlzLnJlbW92ZU5vZGUoIHRoaXMuX3Rvb2x0aXBSaWdodCApO1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFJpZ2h0ID0gdGhpcy5idWlsZFRvb2x0aXAodGhpcy5fdGh1bWJSaWdodCwgJ3NsaWRlcl9fdG9vbHRpcF9yaWdodCcpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbFRvVG9vbHRpcCggdGhpcy5fdG9vbHRpcFJpZ2h0LCB2YWwsIHRoaXMuX3Rvb2x0aXBNYXNrICk7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBidWlsZFNjYWxlKHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50LCBzdGVwOiBudW1iZXIsIG1vZGVsOiBJTW9kZWwsIG1hc2s6IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBsZXQgc2NhbGU6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbGV0IGRpdmlzaW9uOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG5cclxuICAgICAgICBzY2FsZS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3NjYWxlJyk7XHJcbiAgICAgICAgc2xpZGVyTm9kZS5wcmVwZW5kKHNjYWxlKTtcclxuXHJcbiAgICAgICAgLy8g0LzQvdC+0LbQuNGC0LXQu9GMLiDQstC+INGB0LrQvtC70YzQutC+INGA0LDQtyDRiNCw0LMg0LIg0LzQvtC00LXQu9C1INC80LXQvdGM0YjQtSDRiNCw0LPQsCDRiNC60LDQu9GLXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXMoc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyhtb2RlbC5nZXRTdGVwKCkpICk7XHJcbiAgICAgICAgbGV0IG11bHQ6IG51bWJlciA9IHN0ZXAgLyBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbXVsdCA9ICsoK211bHQpLnRvRml4ZWQobik7XHJcbiAgICAgICAgbXVsdCA9IE1hdGguYWJzKG11bHQpOyAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8PSBtb2RlbC5udW1iZXJPZlN0ZXBzKCk7IGkgPSBpICsgbXVsdCkge1xyXG5cclxuICAgICAgICAgICAgLy8gaSArIG11bHQg0LLQvtC30LLRgNCw0YnQsNC10YIg0L3QsCDQutCw0LrQvtC5INGI0LDQsyDQvNC+0LTQtdC70Lgg0L/QvtC/0LDQtNCw0LXRgiDRiNCw0LMg0YjQutCw0LvRi1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGVCeVN0ZXAoaSk7XHJcblxyXG4gICAgICAgICAgICBkaXZpc2lvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXZpc2lvbi5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3NjYWxlLWRpdmlzaW9uJyk7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLmlubmVySFRNTCA9ICc8c3Bhbj4nICsgIGV2YWwobWFzaykgKyAnPC9zcGFuPic7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3ZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS5sZWZ0ID0gdGhpcy5vbmVTdGVwTGVuZ2h0KCkgKiBpICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLnRvcCA9IHRoaXMub25lU3RlcExlbmdodCgpICogaSArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNjYWxlLmFwcGVuZChkaXZpc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICByZWJ1aWxkU2NhbGUobW9kZWw6IElNb2RlbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzY2FsZTogSFRNTERpdkVsZW1lbnQgPSB0aGlzLmdldFNjYWxlKCk7XHJcbiAgICAgICAgbGV0IHByZXZOdW1PZlN0ZXBzOiBudW1iZXIgPSBzY2FsZS5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgbGV0IG5ld051bU9mU3RlcHM6IG51bWJlcjtcclxuICAgICAgICBsZXQgZGl2aXNpb246IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vINC80L3QvtC20LjRgtC10LvRjC4g0LLQviDRgdC60L7Qu9GM0LrQviDRgNCw0Lcg0YjQsNCzINCyINC80L7QtNC10LvQtSDQvNC10L3RjNGI0LUg0YjQsNCz0LAg0YjQutCw0LvRi1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3NjYWxlU3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyhtb2RlbC5nZXRTdGVwKCkpICk7XHJcbiAgICAgICAgbGV0IG11bHQ6IG51bWJlciA9IHRoaXMuX3NjYWxlU3RlcCAvIG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICBtdWx0ID0gK211bHQudG9GaXhlZChuKTtcclxuICAgICAgICBtdWx0ID0gTWF0aC5hYnMobXVsdCk7XHJcblxyXG4gICAgICAgIG5ld051bU9mU3RlcHMgPSBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgLyBtdWx0O1xyXG5cclxuICAgICAgICBpZiAoIHByZXZOdW1PZlN0ZXBzID4gbmV3TnVtT2ZTdGVwcyApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IChwcmV2TnVtT2ZTdGVwcyAtIG5ld051bU9mU3RlcHMpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlLmxhc3RDaGlsZC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHByZXZOdW1PZlN0ZXBzIDwgbmV3TnVtT2ZTdGVwcyApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IChuZXdOdW1PZlN0ZXBzIC0gcHJldk51bU9mU3RlcHMpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3NjYWxlLWRpdmlzaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5pbm5lckhUTUwgPSAnPHNwYW4+PC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICBzY2FsZS5hcHBlbmQoZGl2aXNpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVNjYWxlRGl2aXNpb24obW9kZWw6IElNb2RlbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBkaXZpc2lvbjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICBsZXQgbWFzazogc3RyaW5nID0gdGhpcy5fc2NhbGVNYXNrO1xyXG5cclxuICAgICAgICAvLyDQvNC90L7QttC40YLQtdC70YwuINCy0L4g0YHQutC+0LvRjNC60L4g0YDQsNC3INGI0LDQsyDQsiDQvNC+0LTQtdC70LUg0LzQtdC90YzRiNC1INGI0LDQs9CwINGI0LrQsNC70YtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9zY2FsZVN0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG4gICAgICAgIGxldCBtdWx0OiBudW1iZXIgPSB0aGlzLl9zY2FsZVN0ZXAgLyBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbXVsdCA9ICttdWx0LnRvRml4ZWQobik7XHJcbiAgICAgICAgbXVsdCA9IE1hdGguYWJzKG11bHQpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPD0gbW9kZWwubnVtYmVyT2ZTdGVwcygpOyBpID0gaSArIG11bHQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGkgKyBtdWx0INCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC90LAg0LrQsNC60L7QuSDRiNCw0LMg0LzQvtC00LXQu9C4INC/0L7Qv9Cw0LTQsNC10YIg0YjQsNCzINGI0LrQsNC70YtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlQnlTdGVwKGkpO1xyXG5cclxuICAgICAgICAgICAgZGl2aXNpb24gPSB0aGlzLmdldFNjYWxlKCkucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlcl9fc2NhbGUtZGl2aXNpb24nKVtpIC8gbXVsdF0gYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS50ZXh0Q29udGVudCA9ICcnICsgZXZhbChtYXNrKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLnRvcCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS5sZWZ0ID0gdGhpcy5vbmVTdGVwTGVuZ2h0KCkgKiBpICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLmxlZnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUudG9wID0gdGhpcy5vbmVTdGVwTGVuZ2h0KCkgKiBpICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VMaW5lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xpbmUuc3R5bGUubGVmdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGluZS5zdHlsZS50b3AgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xpbmUuc3R5bGUud2lkdGggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xpbmUuc3R5bGUuaGVpZ2h0ID0gbnVsbDsgIFxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3JhbmdlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3ZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmhlaWdodCA9ICcxMDAlJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS50b3AgPSAnMHB4J1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5sZWZ0ID0gJzBweCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLndpZHRoID0gcGFyc2VJbnQodGhpcy5fdGh1bWIuc3R5bGUubGVmdCkgKyB0aGlzLl90aHVtYi5jbGllbnRXaWR0aC8yICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUud2lkdGggPSAnMTAwJSdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUubGVmdCA9ICcwcHgnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLnRvcCA9ICcwcHgnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5oZWlnaHQgPSBwYXJzZUludCh0aGlzLl90aHVtYi5zdHlsZS50b3ApICsgdGhpcy5fdGh1bWIuY2xpZW50SGVpZ2h0LzIgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3ZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmhlaWdodCA9ICcxMDAlJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS50b3AgPSAnMHB4J1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5sZWZ0ID0gcGFyc2VJbnQodGhpcy5fdGh1bWJMZWZ0LnN0eWxlLmxlZnQpICsgdGhpcy5fdGh1bWJMZWZ0LmNsaWVudFdpZHRoLzIgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS53aWR0aCA9ICggcGFyc2VJbnQodGhpcy5fdGh1bWJSaWdodC5zdHlsZS5sZWZ0KSAtIHBhcnNlSW50KHRoaXMuX3RodW1iTGVmdC5zdHlsZS5sZWZ0KSApICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUud2lkdGggPSAnMTAwJSdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUubGVmdCA9ICcwcHgnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLnRvcCA9IHBhcnNlSW50KHRoaXMuX3RodW1iTGVmdC5zdHlsZS50b3ApICArIHRoaXMuX3RodW1iTGVmdC5jbGllbnRIZWlnaHQvMiArICdweCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmhlaWdodCA9ICggcGFyc2VJbnQodGhpcy5fdGh1bWJSaWdodC5zdHlsZS50b3ApIC0gcGFyc2VJbnQodGhpcy5fdGh1bWJMZWZ0LnN0eWxlLnRvcCkgKSArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vINCy0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90YvQtSDQvNC10YLQvtC00YtcclxuXHJcbiAgICBzZXRUaHVtYlBvc2l0aW9uKHRodW1iTm9kZTogSFRNTERpdkVsZW1lbnQsIHRodW1iUG9zaXRpb246IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICggIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUudG9wID0gbnVsbDtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLmxlZnQgPSB0aHVtYlBvc2l0aW9uIC0gdGh1bWJOb2RlLm9mZnNldFdpZHRoLzIgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS5sZWZ0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLnRvcCA9IHRodW1iUG9zaXRpb24gLSB0aHVtYk5vZGUub2Zmc2V0V2lkdGgvMiArICdweCc7ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0L7QsdCwINCx0LXQs9GD0L3QutCwINGB0L/RgNCw0LLQsCwg0LTQvtCx0LDQstC70LXQvCB6IGluZGV4INC00LvRjyDQvdC40LbQvdC10LPQvlxyXG4gICAgICAgIGlmICggdGhpcy5nZXRUaHVtYigxKSApIHtcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoICh0aGlzLmdldFRodW1iKDEpLnN0eWxlLmxlZnQgPT0gKHRoaXMuZ2V0TGVuZ2h0KCkgLSB0aGlzLmdldFRodW1iKDEpLmNsaWVudFdpZHRoLzIpICsgJ3B4JykgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUaHVtYigxKS5zdHlsZS56SW5kZXggPSAnMTAwJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUaHVtYigxKS5zdHlsZS56SW5kZXggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoICh0aGlzLmdldFRodW1iKDEpLnN0eWxlLnRvcCA9PSAodGhpcy5nZXRMZW5naHQoKSAtIHRoaXMuZ2V0VGh1bWIoMSkuY2xpZW50SGVpZ2h0LzIpICsgJ3B4JykgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUaHVtYigxKS5zdHlsZS56SW5kZXggPSAnMTAwJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUaHVtYigxKS5zdHlsZS56SW5kZXggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgIFxyXG4gICAgICAgICAgICB9ICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNoYW5nZUxpbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWxUb1Rvb2x0aXAodG9vbHRpcE5vZGU6IEhUTUxEaXZFbGVtZW50LCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGUsIG1hc2s6IHN0cmluZyA9ICd2YWwnKTogdm9pZCB7XHJcbiAgICAgICAgdG9vbHRpcE5vZGUudGV4dENvbnRlbnQgPSBldmFsKG1hc2spO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRUaHVtYlBvc2l0aW9uKG5ld1N0ZXAsIG51bU9mU3RlcHMpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldExlbmdodCgpIC8gbnVtT2ZTdGVwcyAqIG5ld1N0ZXA7XHJcbiAgICB9XHJcblxyXG4gICAgb25lU3RlcExlbmdodCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRMZW5naHQoKSAvIHRoaXMuX251bWJlck9mU3RlcHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlTm9kZShub2RlOiBIVE1MRGl2RWxlbWVudCk6IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbm9kZS5yZW1vdmUoKTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNjYWxlU3RlcFZhbGlkYXRpb24obW9kZWw6IElNb2RlbCwgc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgbGV0IHN0ZXBJc1ZhbGlkOiBib29sZWFuO1xyXG4gICAgICAgIGxldCB0ZXN0OiBudW1iZXJcclxuXHJcbiAgICAgICAgLy8g0L7QutGA0YPQs9C70Y/QtdC8LCDRh9GC0L7QsdGLINC40LfQsdC10LbQsNGC0Ywg0L/RgNC+0LHQu9C10Lwg0L/RgNC4INCy0YvRh9C40YHQu9C10L3QuNGP0YUg0YEg0L/Qu9Cw0LLQsNGO0YnQtdC5INGC0L7Rh9C60L7QuVxyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHN0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG5cclxuICAgICAgICBzdGVwSXNWYWxpZCA9IHRoaXMuaXNOdW1lcmljKHN0ZXApO1xyXG5cclxuICAgICAgICBpZiAoIG1vZGVsLmdldERhdGFGb3JtYXQoKSA9PSAnZGF0ZScgJiYgKCBzdGVwICUgKDI0ICogMzYwMCAqIDEwMDApICE9IDAgKSkge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcCAqIDI0ICogMzYwMCAqIDEwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlc3QgPSAoc3RlcCAqIE1hdGgucG93KDEwLCBuKSkgLyAobW9kZWwuZ2V0U3RlcCgpICogTWF0aC5wb3coMTAsIG4pKTtcclxuICAgICAgICB0ZXN0ID0gTWF0aC5hYnModGVzdCk7XHJcblxyXG4gICAgICAgIHN0ZXBJc1ZhbGlkID0gc3RlcElzVmFsaWQgJiYgKCB0ZXN0ICUgMSA9PSAwICk7XHJcblxyXG4gICAgICAgIHRlc3QgPSArKCBtb2RlbC5nZXRNYXhWYWwoKSAtIG1vZGVsLmdldE1pblZhbCgpICkudG9GaXhlZChuKTtcclxuICAgICAgICB0ZXN0ID0gKCB0ZXN0ICogTWF0aC5wb3coMTAsIG4pICkgLyAoIHN0ZXAgKiBNYXRoLnBvdygxMCwgbikgKTtcclxuICAgICAgICB0ZXN0ID0gTWF0aC5hYnModGVzdCk7XHJcblxyXG4gICAgICAgIHN0ZXBJc1ZhbGlkID0gc3RlcElzVmFsaWQgJiYgKCB0ZXN0ICUgMSA9PSAwICk7XHJcblxyXG4gICAgICAgIHN0ZXAgPSBzdGVwSXNWYWxpZCA/IHN0ZXAgOiBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgcmV0dXJuIHN0ZXA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vINC/0YDQuNCy0LDRgtC90YvQtSDRhNGD0L3QutGG0LjQuFxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRUaHVtYihzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCwgdGh1bWJDbGFzcz86IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBsZXQgdGh1bWI6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7ICAgICBcclxuICAgICAgICB0aHVtYi5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3RodW1iJyk7XHJcbiAgICAgICAgdGh1bWJDbGFzcyA/IHRodW1iLmNsYXNzTGlzdC5hZGQodGh1bWJDbGFzcykgOiBmYWxzZTtcclxuICAgICAgICBzbGlkZXJOb2RlLmFwcGVuZCh0aHVtYik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aHVtYjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkTGluZShzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCwgbGluZUNsYXNzPzogc3RyaW5nKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGxldCBsaW5lOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAgICAgXHJcbiAgICAgICAgbGluZS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2xpbmUnKTtcclxuICAgICAgICBsaW5lQ2xhc3MgPyBsaW5lLmNsYXNzTGlzdC5hZGQobGluZUNsYXNzKSA6IGZhbHNlO1xyXG4gICAgICAgIHNsaWRlck5vZGUuYXBwZW5kKGxpbmUpO1xyXG5cclxuICAgICAgICByZXR1cm4gbGluZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkVG9vbHRpcCh0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCB0b29sdGlwQ2xhc3M/OiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IHRvb2x0aXA6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3Rvb2x0aXAnKTtcclxuICAgICAgICB0b29sdGlwQ2xhc3MgPyB0b29sdGlwLmNsYXNzTGlzdC5hZGQodG9vbHRpcENsYXNzKSA6IGZhbHNlO1xyXG4gICAgICAgIHRodW1iTm9kZS5hcHBlbmQodG9vbHRpcCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0b29sdGlwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGxlbmd0aFZhbGlkYXRpb24oc3RyOiBhbnkpIHtcclxuICAgICAgICBpZiAoIHR5cGVvZiAoJycgKyBzdHIpID09ICdzdHJpbmcnICkge1xyXG4gICAgICAgICAgICBsZXQgciA9ICgnJyArIHN0cikubWF0Y2goL15cXGR7MSwzfVsuLF0/XFxkKihweHxlbXxyZW18JSk/JC9pKTtcclxuICAgICAgICAgICAgaWYgKCByICYmIHRoaXMuaXNOdW1lcmljKHJbMF0pICkgeyBcclxuICAgICAgICAgICAgICAgIHJldHVybiByWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnLCcsICcuJykgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCByICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcsJywgJy4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dpZHRoIChvciBoZWlnaHQpIHNob3VsZCBiZSB2YWxpZCB0byBjc3MnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTnVtZXJpYyhuOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmICFpc05hTihuIC0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNpbWFsUGxhY2VzKG51bTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDQt9C90LDQutC+0LIg0L/QvtGB0LvQtSDQt9Cw0L/Rj9GC0L7QuVxyXG4gICAgICAgIHJldHVybiB+KG51bSArICcnKS5pbmRleE9mKCcuJykgPyAobnVtICsgJycpLnNwbGl0KCcuJylbMV0ubGVuZ3RoIDogMDtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBJT3B0aW9ucyB7XHJcbiAgICAvLyBNb2RlbCBvcHRpb25zXHJcbiAgICBkYXRhRm9ybWF0OiBzdHJpbmc7XHJcbiAgICB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbDtcclxuICAgIG1pblZhbDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgbWF4VmFsOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICBzdGVwOiBudW1iZXI7ICAgIFxyXG4gICAgcmV2ZXJzZTogYm9vbGVhbjtcclxuICAgIHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgW3N0cmluZywgc3RyaW5nXSB8IG51bGw7IFxyXG4gICAgY3VzdG9tVmFsdWVzPzogc3RyaW5nW107XHJcbiAgICB2YWx1ZUluQ3VzdG9tVmFsdWVzPzogc3RyaW5nO1xyXG4gICAgcmFuZ2VJbkN1c3RvbVZhbHVlcz86IHN0cmluZztcclxuXHJcblxyXG4gICAgLy8gVmlldyBvcHRpb25zXHJcbiAgICBsZW5ndGg6IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHZlcnRpY2FsOiBib29sZWFuO1xyXG4gICAgdG9vbHRpcDogYm9vbGVhbjtcclxuICAgIHRvb2x0aXBNYXNrOiBzdHJpbmc7XHJcbiAgICBzY2FsZTogYm9vbGVhbjtcclxuICAgIHNjYWxlU3RlcDogbnVtYmVyO1xyXG4gICAgc2NhbGVNYXNrOiBzdHJpbmc7XHJcbn1cclxuXHJcbnZhciBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMgPSB7XHJcbiAgICAvLyBNb2RlbCBvcHRpb25zXHJcbiAgICAvLyDQsiByYW5nZSDQuCDQsiBtaW4g0LggbWF4INGB0LvQtdCy0LAg0YLQviwg0YfRgtC+INGB0LvQtdCy0LAg0L3QsCDRgdC70LDQudC00LXRgNC1XHJcbiAgICBkYXRhRm9ybWF0OiAnbnVtZXJpYycsXHJcbiAgICB2YWx1ZTogbnVsbCwgICAgICAvLyDQsiDQvdCw0YfQsNC70YzQvdGL0YUg0L3QsNGB0YLRgNC+0LnQutCw0YUg0L3QtSDQvtC/0YDQtdC00LXQu9C10L3Ri1xyXG4gICAgbWluVmFsOiAwLCAgICAgICAgLy8g0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0LjQu9C4INC/0YDQvtC80LXQttGD0YLQvtC6LlxyXG4gICAgbWF4VmFsOiAxMCwgICAgICAgLy8g0LXRgdC70Lgg0L7QvdC4INC90LUg0YPQutCw0LfQsNC90Ysg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10LwsINC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1IFxyXG4gICAgc3RlcDogMSwgICAgICAgICAgLy8gKHZhbHVlKSDQuCDQv9C+0LfQuNGG0LjRjyDQsdC10LPRg9C90LrQsCDRgNCw0LLQvdGLINC80LjQvdC40LzQsNC70YzQvdC+0LzRgyDQt9C90LDRh9C10L3QuNGOXHJcbiAgICByZXZlcnNlOiBmYWxzZSxcclxuICAgIHJhbmdlOiBudWxsLFxyXG4gICAgXHJcbiAgICBsZW5ndGg6ICczMDBweCcsXHJcbiAgICB2ZXJ0aWNhbDogZmFsc2UsXHJcbiAgICB0b29sdGlwOiBmYWxzZSxcclxuICAgIHRvb2x0aXBNYXNrOiBcInZhbFwiLFxyXG4gICAgc2NhbGU6IGZhbHNlLFxyXG4gICAgc2NhbGVTdGVwOiBudWxsLFxyXG4gICAgc2NhbGVNYXNrOiBcInZhbFwiLFxyXG59XHJcblxyXG5leHBvcnQgeyBkZWZhdWx0T3B0aW9ucyB9O1xyXG4iLCJpbXBvcnQgTW9kZWwsIHtJTW9kZWx9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgVmlldywge0lWaWV3fSBmcm9tICcuL1ZpZXcnO1xyXG5pbXBvcnQgUHJlc2VudGVyIGZyb20gJy4vUHJlc2VudGVyJztcclxuaW1wb3J0IHtkZWZhdWx0T3B0aW9uc30gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcblxyXG5pbXBvcnQge09ic2VydmVyfSBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IHtJT2JzZXJ2ZXJ9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5pbXBvcnQgU3ViamVjdCAgZnJvbSAnLi9PYnNlcnZlcic7XHJcblxyXG5cclxuKGZ1bmN0aW9uKCQpe1xyXG5cclxuICB2YXIgbWV0aG9kczogT2JqZWN0ID0ge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zPzogYW55ICkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICBcclxuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBkYXRhID0gJHRoaXMuZGF0YSgnc2xpZGVyRGF0YScpO1xyXG4gICAgICAgIGxldCBzbGlkZXIgPSAkdGhpcztcclxuICAgICAgICBcclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C70LDQs9C40L0g0LXRidGRINC90LUg0L/RgNC+0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNC9XHJcbiAgICAgICAgaWYgKCAhIGRhdGEgKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICBsZXQgbW9kZWw6IElNb2RlbCA9IG5ldyBNb2RlbChvcHRpb25zKTtcclxuICAgICAgICAgIC8vINC/0LXRgNC10LTQsNC10Lwg0LzQvtC00LXQu9GMINCyINC/0YDQtdC00YHRgtCw0LLQu9C10L3QuNC1INC00LvRjyDQv9C+0LvRg9GH0LXQvdC40Y8g0LjQtyDQvdC10LUgXHJcbiAgICAgICAgICAvLyDQutC+0YDRgNC10LrRgtC90YvRhSDQtNCw0L3QvdGL0YVcclxuICAgICAgICAgIGxldCB2aWV3OiBJVmlldyA9IG5ldyBWaWV3KG1vZGVsLCBvcHRpb25zLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAvLyDRgdGD0LHRitC10LrRgiAtINGN0YLQviDQvdCw0LHQu9GO0LTQtdC90LjQtVxyXG4gICAgICAgICAgLy8g0L7QvSDRhdGA0LDQvdC40YIg0LfQvdCw0YfQtdC90LjQtSB2YWwg0LjQu9C4INC/0YDQvtC80LXQttGD0YLQvtC6XHJcbiAgICAgICAgICBsZXQgdmFsOiBhbnkgfCBbYW55LCBhbnldO1xyXG4gICAgICAgICAgdmFsID0gbW9kZWwuZ2V0VmFsKCkgfHwgbW9kZWwuZ2V0UmFuZ2UoKTsgXHJcbiAgICAgICAgICBsZXQgc3ViamVjdCA9IG5ldyBTdWJqZWN0KHZhbCk7XHJcblxyXG4gICAgICAgICAgbGV0IHByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIobW9kZWwsIHZpZXcsIHN1YmplY3QpO1xyXG5cclxuICAgICAgICAgICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScsIHtcclxuICAgICAgICAgICAgc2xpZGVyIDogc2xpZGVyLFxyXG4gICAgICAgICAgICBtb2RlbDogbW9kZWwsXHJcbiAgICAgICAgICAgIHZpZXc6IHZpZXcsXHJcbiAgICAgICAgICAgIHByZXNlbnRlcjogcHJlc2VudGVyLFxyXG4gICAgICAgICAgICBzdWJqZWN0OiBzdWJqZWN0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZTogZnVuY3Rpb24oIG9wdGlvbnM6IGFueSApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBwcmVzZW50ZXIgPSAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnKS5wcmVzZW50ZXI7XHJcbiAgICAgICAgcHJlc2VudGVyLmNoYW5nZShvcHRpb25zKTtcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSAkdGhpcy5kYXRhKCdzbGlkZXJEYXRhJyk7XHJcblxyXG4gICAgICAgICQod2luZG93KS51bmJpbmQoJy5zbGlkZXInKTtcclxuICAgICAgICBkYXRhLnNsaWRlci5yZW1vdmUoKTtcclxuICAgICAgICAkdGhpcy5yZW1vdmVEYXRhKCdzbGlkZXJEYXRhJyk7XHJcbiAgICAgICAgXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBvYnNlcnZlOiBmdW5jdGlvbiggZnVuYyApIHtcclxuXHJcbiAgICAgIC8vINC00L7QsdCw0LLQu9GP0LXQvCDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPXHJcbiAgICAgIC8vINCw0YDQs9GD0LzQtdC90YIgLSDRjdGC0LAg0YTRg9C90LrRhtC40Y8g0LrQvtGC0L7RgNCw0Y8g0LHRg9C00LXRgiDQvtCx0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0LjQt9C80LXQvdC10L3QuNGPXHJcbiAgICAgIGxldCBzdWJqZWN0ID0gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykuc3ViamVjdDtcclxuICAgICAgbGV0IG9ic2VydmVyOiBJT2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXIoIGZ1bmMgKTtcclxuXHJcbiAgICAgIHN1YmplY3QuYXR0YWNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFxyXG4gIGpRdWVyeS5mbi5zbGlkZXIgPSBmdW5jdGlvbiggbWV0aG9kICkge1xyXG5cclxuICAgIC8vINC70L7Qs9C40LrQsCDQstGL0LfQvtCy0LAg0LzQtdGC0L7QtNCwXHJcbiAgICBpZiAoIG1ldGhvZHNbbWV0aG9kIGFzIHN0cmluZ10gKSB7XHJcbiAgICAgIHJldHVybiBtZXRob2RzWyBtZXRob2QgYXMgc3RyaW5nIF0uYXBwbHkoIHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCBhcmd1bWVudHMsIDEgKSk7XHJcbiAgICB9IGVsc2UgaWYgKCB0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhIG1ldGhvZCApIHtcclxuXHJcbiAgICAgIC8vID8/Pz9cclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQuZXJyb3IoICdNZXRob2QgY2FsbGVkICcgKyAgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBmb3IgSlF1ZXJ5LnNsaWRlcicgKTtcclxuICAgIH0gXHJcblxyXG4gIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9