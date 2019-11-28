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
            validOptions = this.validateNumericFormat(options, defaultOptions_1.defaultOptions);
        }
        else if (options.dataFormat == 'date') {
            this._options = Object.assign({}, allOptions);
            validOptions = this.validateDateFormat(options, defaultOptions_1.defaultOptions);
        }
        else if (options.dataFormat == 'custom') {
            validOptions = this.validateCustomFormat(options, defaultOptions_1.defaultOptions);
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
        this.isOneValueValid(this._minVal, this._maxVal, newVal, this._step);
        this._val = newVal;
    };
    Model.prototype.getRange = function () {
        return this._range;
    };
    Model.prototype.setRange = function (newRange) {
        this.areNumeric(newRange[0], newRange[1]);
        this.isRangeValid(this._minVal, this._maxVal, newRange, this._step);
        if (this.areMinMaxValid(newRange[0], newRange[1], this._reverse)) {
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
        var n = Math.max(this.findDecimalPlaces(this._step), this.findDecimalPlaces(this._minVal));
        var a = +(val - this._minVal).toFixed(n);
        var b = +(this._maxVal - this._minVal).toFixed(n);
        stepNum = +(a * this.getNumberOfSteps() / b).toFixed();
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
            var n = Math.max(this.findDecimalPlaces(this._step), this.findDecimalPlaces(this._minVal));
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
    Model.prototype.getNumberOfSteps = function () {
        var n = Math.max(this.findDecimalPlaces(this._step), this.findDecimalPlaces(this._minVal));
        n = Math.pow(10, n);
        return (Math.abs(this._maxVal - this._minVal) * n) / (this._step * n);
    };
    Model.prototype.change = function (newOptions) {
        var prevOptions = this._options;
        var options = Object.assign({}, prevOptions, newOptions);
        options.value = options.value != null ? options.value : options.minVal;
        var validOptions;
        if (options.dataFormat == 'numeric') {
            validOptions = this.validateNumericFormat(options, prevOptions);
        }
        else if (options.dataFormat == 'date') {
            validOptions = this.validateDateFormat(options, prevOptions);
            this._options = Object.assign({}, prevOptions, newOptions);
        }
        else if (options.dataFormat == 'custom') {
            validOptions = this.validateCustomFormat(options, prevOptions);
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
    Model.prototype.validateNumericFormat = function (allOptions, defaultOptions) {
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
        this.isStepValid(options.minVal, options.maxVal, newOptions.step);
        if (this.areMinMaxValid(options.minVal, options.maxVal, newOptions.reverse)) {
            newOptions.minVal = options.minVal;
            newOptions.maxVal = options.maxVal;
        }
        else {
            newOptions.minVal = options.maxVal;
            newOptions.maxVal = options.minVal;
        }
        if (options.range) {
            this.isRangeValid(newOptions.minVal, newOptions.maxVal, options.range, newOptions.step);
            if (this.areMinMaxValid(options.range[0], options.range[1], newOptions.reverse)) {
                newOptions.range = options.range;
            }
            else {
                newOptions.range = [options.range[1], options.range[0]];
            }
            newOptions.value = null;
        }
        else {
            this.areNumeric(options.value);
            this.isOneValueValid(newOptions.minVal, newOptions.maxVal, options.value, newOptions.step);
            newOptions.value = options.value;
            newOptions.range = null;
        }
        return newOptions;
    };
    Model.prototype.validateDateFormat = function (allOptions, defaultOptions) {
        var options = allOptions;
        this.isCustomDateValid(options.minVal, options.maxVal);
        options.minVal = this.translateDateToNumber(options.minVal);
        options.maxVal = this.translateDateToNumber(options.maxVal);
        options.step = this.tranlateStepToDateFormat(options.step);
        if (Array.isArray(options.range) && options.range.length == 2) {
            this.isCustomDateValid(options.range[0], options.range[1]);
            options.range[0] = this.translateDateToNumber(options.range[0]);
            options.range[1] = this.translateDateToNumber(options.range[1]);
        }
        else {
            this.isCustomDateValid(options.value);
            options.value = this.translateDateToNumber(options.value);
        }
        return this.validateNumericFormat(options, defaultOptions);
    };
    Model.prototype.validateCustomFormat = function (allOptions, defaultOptions) {
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
        return this.validateNumericFormat(options, defaultOptions);
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
    Model.prototype.areMinMaxValid = function (minVal, maxVal, reverse) {
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
    Model.prototype.isStepValid = function (minVal, maxVal, step) {
        if (!this.isNumeric(step)) {
            throw new Error('Step should be a number');
        }
        if (step == 0) {
            throw new Error('Step cant be equal to 0');
        }
        var n = Math.max(this.findDecimalPlaces(this._step), this.findDecimalPlaces(this._minVal));
        var test = +(maxVal - minVal).toFixed(n);
        test = (test * Math.pow(10, n)) / (step * Math.pow(10, n));
        test = Math.abs(test);
        if (test % 1 != 0) {
            throw new Error('(Max value - min value) divided by step should return integer');
        }
        return true;
    };
    Model.prototype.isOneValueValid = function (minVal, maxVal, val, step) {
        var n = Math.max(this.findDecimalPlaces(step), this.findDecimalPlaces(minVal));
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
    Model.prototype.isRangeValid = function (minVal, maxVal, range, step) {
        var n = Math.max(this.findDecimalPlaces(this._step), this.findDecimalPlaces(this._minVal));
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
    Model.prototype.isCustomDateValid = function () {
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
    Model.prototype.findDecimalPlaces = function (num) {
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
        this.thumbOnDown = this.thumbOnDown.bind(this);
        this.thumbOnMove = this.thumbOnMove.bind(this);
        this.thumbOnUp = this.thumbOnUp.bind(this);
        this.sliderOnClick = this.sliderOnClick.bind(this);
        if (!model.getRange()) {
            view.getThumb().addEventListener("mousedown", this.thumbOnDown);
            view.getThumb().addEventListener("touchstart", this.thumbOnDown);
        }
        else {
            view.getThumb(1).addEventListener("mousedown", this.thumbOnDown);
            view.getThumb(2).addEventListener("mousedown", this.thumbOnDown);
            view.getThumb(1).addEventListener("touchstart", this.thumbOnDown);
            view.getThumb(2).addEventListener("touchstart", this.thumbOnDown);
        }
        view.getSlider().addEventListener("click", this.sliderOnClick);
    }
    Presenter.prototype.thumbOnDown = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this._activeThumb = event.currentTarget;
        document.addEventListener('mousemove', this.thumbOnMove);
        document.addEventListener('mouseup', this.thumbOnUp);
        document.addEventListener('touchmove', this.thumbOnMove);
        document.addEventListener('touchend', this.thumbOnUp);
    };
    Presenter.prototype.thumbOnMove = function (event) {
        var model = this._model;
        var view = this._view;
        var sliderNode = this._view.getSlider();
        var minVal = this._model.getMinVal();
        var maxVal = this._model.getMaxVal();
        var step = this._model.getStep();
        var reverse = !this._model.getReverse() ? 1 : -1;
        var sliderLenght = this._view.getLenght();
        var stepLenght = this._view.findOneStepLenght();
        var sliderBorder;
        var eventPos;
        var thumbPosition;
        var leftPoint;
        var rightPoint;
        var newVal;
        if (!view.getVertical()) {
            sliderBorder = (sliderNode.offsetWidth - sliderLenght) / 2;
            eventPos = event.clientX || event.touches[0].clientX;
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().left - sliderBorder;
        }
        else {
            sliderBorder = (sliderNode.offsetHeight - sliderLenght) / 2;
            eventPos = event.clientY || event.touches[0].clientY;
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
    Presenter.prototype.thumbOnUp = function (event) {
        document.removeEventListener('mouseup', this.thumbOnUp);
        document.removeEventListener('mousemove', this.thumbOnMove);
        document.removeEventListener('touchend', this.thumbOnUp);
        document.removeEventListener('touchmove', this.thumbOnMove);
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
    Presenter.prototype.sliderOnClick = function (event) {
        var model = this._model;
        var view = this._view;
        var sliderNode = this._view.getSlider();
        var changingThumb;
        var minVal = this._model.getMinVal();
        var maxVal = this._model.getMaxVal();
        var step = this._model.getStep();
        var reverse = !this._model.getReverse() ? 1 : -1;
        var sliderLenght = this._view.getLenght();
        var stepLenght = this._view.findOneStepLenght();
        var sliderBorder;
        var eventPos;
        var thumbPosition;
        var leftPoint;
        var rightPoint;
        var newVal;
        if (!view.getVertical()) {
            sliderBorder = (sliderNode.offsetWidth - sliderLenght) / 2;
            eventPos = event.clientX || event.touches[0].clientX;
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().left - sliderBorder;
        }
        else {
            sliderBorder = (sliderNode.offsetHeight - sliderLenght) / 2;
            eventPos = event.clientY || event.touches[0].clientY;
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
            var prevNumOfSteps = model.getNumberOfSteps();
            var prevOptions = model.getOptions();
            var newOptions = Object.assign({}, prevOptions, options);
            model.change(newOptions);
            view.setNumberOfSteps(model.getNumberOfSteps());
            view.setScaleStep(view.findValidScaleStep(model, view.getScaleStep()));
            changeThumbPosition = true;
            changeTooltipVal = true;
            changeScaleDivision = true;
            if (prevNumOfSteps != model.getNumberOfSteps()) {
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
            view.getThumb().addEventListener("mousedown", this.thumbOnDown);
            view.getThumb().addEventListener("touchstart", this.thumbOnDown);
        }
        if (changeValToRange) {
            view.changeValToRange(model);
            view.getThumb(1).addEventListener("mousedown", this.thumbOnDown);
            view.getThumb(2).addEventListener("mousedown", this.thumbOnDown);
            view.getThumb(1).addEventListener("touchstart", this.thumbOnDown);
            view.getThumb(2).addEventListener("touchstart", this.thumbOnDown);
        }
        if (options.hasOwnProperty('scaleStep') && options.scaleStep != view.getScaleStep()) {
            view.setScaleStep(view.findValidScaleStep(model, options.scaleStep));
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
                pos = view.findThumbPosition(model.getStepNumber(model.getVal()), model.getNumberOfSteps());
                view.setThumbPosition(view.getThumb(), pos);
            }
            else {
                pos = view.findThumbPosition(model.getStepNumber(model.getRange()[0]), model.getNumberOfSteps());
                view.setThumbPosition(view.getThumb(1), pos);
                pos = view.findThumbPosition(model.getStepNumber(model.getRange()[1]), model.getNumberOfSteps());
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
        this._numberOfSteps = model.getNumberOfSteps();
        this._lenght = this.findValidLength(options.length);
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
        this._line = this.buildNode(this._slider, 'slider__line');
        var pos;
        if (!this._range) {
            this._thumb = this.buildNode(this._slider, 'slider__thumb');
            pos = this.findThumbPosition(model.getStepNumber(model.getVal()), model.getNumberOfSteps());
            this.setThumbPosition(this._thumb, pos);
        }
        else {
            this._thumbLeft = this.buildNode(this._slider, 'slider__thumb', 'slider__thumb_left');
            this._thumbRight = this.buildNode(this._slider, 'slider__thumb', 'slider__thumb_right');
            pos = this.findThumbPosition(model.getStepNumber(model.getRange()[0]), model.getNumberOfSteps());
            this.setThumbPosition(this._thumbLeft, pos);
            pos = this.findThumbPosition(model.getStepNumber(model.getRange()[1]), model.getNumberOfSteps());
            this.setThumbPosition(this._thumbRight, pos);
        }
        this._tooltipMask = options.tooltipMask;
        if (options.tooltip) {
            this.buildValidTooltips(model);
        }
        this._scaleMask = options.scaleMask;
        var step;
        if (options.scaleStep) {
            step = this.findValidScaleStep(model, options.scaleStep);
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
        this._thumb = this.buildNode(this._slider, 'slider__thumb');
        this._thumbLeft = this.removeNode(this._thumbLeft);
        this._thumbRight = this.removeNode(this._thumbRight);
        pos = this.findThumbPosition(model.getStepNumber(model.getVal()), model.getNumberOfSteps());
        this.setThumbPosition(this._thumb, pos);
    };
    View.prototype.changeValToRange = function (model) {
        var pos;
        this._range = true;
        this._thumb = this.removeNode(this._thumb);
        this._thumbLeft = this.buildNode(this._slider, 'slider__thumb', 'slider__thumb_left');
        this._thumbRight = this.buildNode(this._slider, 'slider__thumb', 'slider__thumb_right');
        pos = this.findThumbPosition(model.getStepNumber(model.getRange()[0]), model.getNumberOfSteps());
        this.setThumbPosition(this._thumbLeft, pos);
        pos = this.findThumbPosition(model.getStepNumber(model.getRange()[1]), model.getNumberOfSteps());
        this.setThumbPosition(this._thumbRight, pos);
    };
    View.prototype.buildValidTooltips = function (model) {
        var val;
        if (!this._range) {
            if (this._tooltip)
                this._tooltip = this.removeNode(this._tooltip);
            val = model.translate(model.getVal());
            this._tooltip = this.buildNode(this._thumb, 'slider__tooltip');
            this.setValToTooltip(this._tooltip, val, this._tooltipMask);
        }
        else {
            if (this._tooltipLeft)
                this._tooltipLeft = this.removeNode(this._tooltipLeft);
            val = model.translate(model.getRange()[0]);
            this._tooltipLeft = this.buildNode(this._thumbLeft, 'slider__tooltip_left');
            this.setValToTooltip(this._tooltipLeft, val, this._tooltipMask);
            if (this._tooltipRight)
                this._tooltipRight = this.removeNode(this._tooltipRight);
            val = model.translate(model.getRange()[1]);
            this._tooltipRight = this.buildNode(this._thumbRight, 'slider__tooltip_right');
            this.setValToTooltip(this._tooltipRight, val, this._tooltipMask);
        }
    };
    View.prototype.buildScale = function (sliderNode, step, model, mask) {
        var scale = document.createElement('div');
        var division;
        var val;
        scale.classList.add('slider__scale');
        sliderNode.prepend(scale);
        var n = Math.max(this.findDecimalPlaces(step), this.findDecimalPlaces(model.getStep()));
        var mult = step / model.getStep();
        mult = +(+mult).toFixed(n);
        mult = Math.abs(mult);
        for (var i = 0; i <= model.getNumberOfSteps(); i = i + mult) {
            val = model.translateByStep(i);
            division = document.createElement('div');
            division.classList.add('slider__scale-division');
            division.innerHTML = '<span>' + eval(mask) + '</span>';
            if (!this._vertical) {
                division.style.left = this.findOneStepLenght() * i + 'px';
            }
            else {
                division.style.top = this.findOneStepLenght() * i + 'px';
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
        var n = Math.max(this.findDecimalPlaces(this._scaleStep), this.findDecimalPlaces(model.getStep()));
        var mult = this._scaleStep / model.getStep();
        mult = +mult.toFixed(n);
        mult = Math.abs(mult);
        newNumOfSteps = model.getNumberOfSteps() / mult;
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
        var n = Math.max(this.findDecimalPlaces(this._scaleStep), this.findDecimalPlaces(model.getStep()));
        var mult = this._scaleStep / model.getStep();
        mult = +mult.toFixed(n);
        mult = Math.abs(mult);
        for (var i = 0; i <= model.getNumberOfSteps(); i = i + mult) {
            val = model.translateByStep(i);
            division = this.getScale().querySelectorAll('.slider__scale-division')[i / mult];
            division.querySelector('span').textContent = '' + eval(mask);
            if (!this._vertical) {
                division.style.top = null;
                division.style.left = this.findOneStepLenght() * i + 'px';
            }
            else {
                division.style.left = null;
                division.style.top = this.findOneStepLenght() * i + 'px';
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
    View.prototype.findOneStepLenght = function () {
        return this.getLenght() / this._numberOfSteps;
    };
    View.prototype.removeNode = function (node) {
        node.remove();
        return undefined;
    };
    View.prototype.findValidScaleStep = function (model, step) {
        var stepIsValid;
        var test;
        var n = Math.max(this.findDecimalPlaces(step), this.findDecimalPlaces(model.getStep()));
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
    View.prototype.findValidLength = function (str) {
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
    View.prototype.findDecimalPlaces = function (num) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0T3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDhGQUE0RDtBQTRDNUQ7SUFZSSxlQUFZLFVBQW9CO1FBRTVCLElBQUksT0FBTyxHQUFhLFVBQVUsQ0FBQztRQUluQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FB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bUMsQ0FBRSxDQUFDO1NBQzdFO0lBRUgsQ0FBQyxDQUFDO0FBRUosQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMiLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgSU9wdGlvbnMsIHsgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuXHJcbmludGVyZmFjZSBJTW9kZWwge1xyXG4gICAgLy8gMVxyXG4gICAgZ2V0VmFsKCk6IG51bWJlcjtcclxuICAgIHNldFZhbChuZXdWYWw6IG51bWJlcik6IHZvaWQ7XHJcbiAgICAvLyAyXHJcbiAgICBnZXRSYW5nZSgpOiBbbnVtYmVyLCBudW1iZXJdO1xyXG4gICAgc2V0UmFuZ2UobmV3UmFuZ2U6IFtudW1iZXIsIG51bWJlcl0pOiB2b2lkO1xyXG4gICAgLy8gM1xyXG4gICAgZ2V0U3RlcCgpOiBudW1iZXI7XHJcbiAgICAvLyA0XHJcbiAgICBnZXRNaW5WYWwoKTogbnVtYmVyO1xyXG4gICAgLy8gNVxyXG4gICAgZ2V0TWF4VmFsKCk6IG51bWJlcjtcclxuICAgIC8vIDZcclxuICAgIGdldFJldmVyc2UoKTogYm9vbGVhbjtcclxuICAgIC8vIDdcclxuICAgIGdldEN1c3RvbVZhbHVlcygpOiBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcclxuICAgIC8vIDhcclxuICAgIGdldERhdGFGb3JtYXQoKTogc3RyaW5nO1xyXG4gICAgLy8gOVxyXG4gICAgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zO1xyXG5cclxuICAgIC8vINCy0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90YvQtSDQvNC10YLQvtC00YtcclxuICAgIGZpbmRQb3NpdGlvbkluQXJyKHZhbDogYW55LCBhcnI/OiBhbnlbXSk6IG51bWJlcjtcclxuICAgIGdldFN0ZXBOdW1iZXIodmFsOiBudW1iZXIpOiBudW1iZXI7XHJcbiAgICB0cmFuc2xhdGVCeVN0ZXAoc3RlcDogbnVtYmVyKTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTsgLy8g0L/QviDRiNCw0LPRg1xyXG4gICAgdHJhbnNsYXRlKHZhbDogbnVtYmVyKTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTsgLy8g0L/QviDQstCw0LvQuNC00L3QvtC80YMg0LfQvdCw0YfQtdC90LjRjlxyXG4gICAgZ2V0TnVtYmVyT2ZTdGVwcygpOiBudW1iZXI7XHJcbiAgICBjaGFuZ2UobmV3T3B0aW9uczogYW55KTogdm9pZDtcclxufVxyXG5cclxuaW50ZXJmYWNlIElNb2RlbE9wdGlvbnMge1xyXG4gICAgZGF0YUZvcm1hdDogc3RyaW5nO1xyXG4gICAgdmFsdWU6IG51bWJlciB8IG51bGw7XHJcbiAgICBtaW5WYWw6IG51bWJlcjtcclxuICAgIG1heFZhbDogbnVtYmVyO1xyXG4gICAgc3RlcDogbnVtYmVyO1xyXG4gICAgcmV2ZXJzZTogYm9vbGVhbjtcclxuICAgIHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDsgXHJcbiAgICBjdXN0b21WYWx1ZXM/OiBzdHJpbmdbXTtcclxufVxyXG5cclxuY2xhc3MgTW9kZWwgaW1wbGVtZW50cyBJTW9kZWwge1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGFGb3JtYXQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3ZhbDogbnVtYmVyIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX21pblZhbDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbWF4VmFsOm51bWJlcjsgICBcclxuICAgIHByaXZhdGUgX3N0ZXA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3JldmVyc2U6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9yYW5nZTogW251bWJlciwgbnVtYmVyXSB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9jdXN0b21WYWx1ZXM/OiBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX29wdGlvbnM6IElNb2RlbE9wdGlvbnMgfCBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWxsT3B0aW9uczogSU9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IElPcHRpb25zID0gYWxsT3B0aW9ucztcclxuICAgICAgICAvLyDQtdGB0LvQuCDQvdC1INGD0LrQsNC30LDQvdC+INC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1LCDRg9C60LDQt9GL0LLQsNC10Lwg0LzQuNC90LjQvNCw0LvRjNC90L7QtS5cclxuICAgICAgICAvLyDRjdGC0L4g0L3QtdC+0LHRhdC+0LTQuNC80L4g0YfRgtC+0LHRiyDQv9GA0L7QudGC0Lgg0LLQsNC70LjQtNCw0YbQuNGOINC4INC/0L7RgdGC0LDQstC40YLRjCDQsdC10LPRg9C90L7QuiDRgdC+0LPQu9Cw0YHQvdC+INGI0LDQs9GDLlxyXG4gICAgICAgIC8vINC10YHQu9C4INGD0LrQsNC30LDQvSByYW5nZSwg0LzQtdC90Y/QtdC8INC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1INC90LAgbnVsbFxyXG4gICAgICAgIG9wdGlvbnMudmFsdWUgPSBvcHRpb25zLnZhbHVlID8gb3B0aW9ucy52YWx1ZSA6IG9wdGlvbnMubWluVmFsO1xyXG4gICAgICAgIGxldCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnM7XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdudW1lcmljJyApIHtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy52YWxpZGF0ZU51bWVyaWNGb3JtYXQob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ2RhdGUnICkge1xyXG4gICAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LTQsNGC0Ysg0LIg0L3QsNGH0LDQu9GM0L3QvtC8INGE0L7RgtGA0LzQsNGC0LUsINC90LDQv9GAIGRkL21tL3l5eXlcclxuICAgICAgICAgICAgLy8g0YfRgtC+0LHRiyDQvNC+0LbQvdC+INCx0YvQu9C+INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCDQuNGFINC00LvRjyDQuNC30LzQtdC90LXQvdC40Y8g0LzQvtC00LXQu9C4XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBhbGxPcHRpb25zKTtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy52YWxpZGF0ZURhdGVGb3JtYXQob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ2N1c3RvbScgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMudmFsaWRhdGVDdXN0b21Gb3JtYXQob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMuY3VzdG9tVmFsdWVzID0gb3B0aW9ucy5jdXN0b21WYWx1ZXM7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBmb3JtYXQgb2YgZGF0YScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGF0YUZvcm1hdCA9IHZhbGlkT3B0aW9ucy5kYXRhRm9ybWF0O1xyXG4gICAgICAgIHRoaXMuX3ZhbCA9IHZhbGlkT3B0aW9ucy52YWx1ZTtcclxuICAgICAgICB0aGlzLl9taW5WYWwgPSB2YWxpZE9wdGlvbnMubWluVmFsO1xyXG4gICAgICAgIHRoaXMuX21heFZhbCA9IHZhbGlkT3B0aW9ucy5tYXhWYWw7XHJcbiAgICAgICAgdGhpcy5fc3RlcCA9IHZhbGlkT3B0aW9ucy5zdGVwO1xyXG4gICAgICAgIHRoaXMuX3JldmVyc2UgPSB2YWxpZE9wdGlvbnMucmV2ZXJzZTtcclxuICAgICAgICB0aGlzLl9yYW5nZSA9IHZhbGlkT3B0aW9ucy5yYW5nZTtcclxuICAgICAgICB0aGlzLl9jdXN0b21WYWx1ZXMgPSB2YWxpZE9wdGlvbnMuY3VzdG9tVmFsdWVzOyAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhRm9ybWF0ICE9ICdkYXRlJykgdGhpcy5fb3B0aW9ucyA9IHZhbGlkT3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvLyAxXHJcbiAgICBnZXRWYWwoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsO1xyXG4gICAgfVxyXG4gICAgc2V0VmFsKG5ld1ZhbDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcmVOdW1lcmljKG5ld1ZhbCk7XHJcbiAgICAgICAgdGhpcy5pc09uZVZhbHVlVmFsaWQodGhpcy5fbWluVmFsLCB0aGlzLl9tYXhWYWwsIG5ld1ZhbCwgdGhpcy5fc3RlcCk7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gbmV3VmFsO1xyXG4gICAgfVxyXG4gICAgLy8gMlxyXG4gICAgZ2V0UmFuZ2UoKTogW251bWJlciwgbnVtYmVyXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JhbmdlO1xyXG4gICAgfVxyXG4gICAgc2V0UmFuZ2UobmV3UmFuZ2U6IFtudW1iZXIsIG51bWJlcl0pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFyZU51bWVyaWMobmV3UmFuZ2VbMF0sIG5ld1JhbmdlWzFdKVxyXG4gICAgICAgIHRoaXMuaXNSYW5nZVZhbGlkKHRoaXMuX21pblZhbCwgdGhpcy5fbWF4VmFsLCBuZXdSYW5nZSwgdGhpcy5fc3RlcCk7XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5hcmVNaW5NYXhWYWxpZChuZXdSYW5nZVswXSwgbmV3UmFuZ2VbMV0sIHRoaXMuX3JldmVyc2UpICkge1xyXG4gICAgICAgICAgICB0aGlzLl9yYW5nZSA9IG5ld1JhbmdlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhbmdlID0gW25ld1JhbmdlWzFdLCBuZXdSYW5nZVswXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yYW5nZSA9IG5ld1JhbmdlO1xyXG4gICAgfVxyXG4gICAgLy8gM1xyXG4gICAgZ2V0U3RlcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwO1xyXG4gICAgfVxyXG4gICAgLy8gNFxyXG4gICAgZ2V0TWluVmFsKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pblZhbDtcclxuICAgIH1cclxuICAgIC8vIDVcclxuICAgIGdldE1heFZhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhWYWw7XHJcbiAgICB9XHJcbiAgICAvLyA2XHJcbiAgICBnZXRSZXZlcnNlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXZlcnNlO1xyXG4gICAgfVxyXG4gICAgLy8gN1xyXG4gICAgZ2V0Q3VzdG9tVmFsdWVzKCk6IGFueVtdIHtcclxuICAgICAgICBpZiAodGhpcy5fY3VzdG9tVmFsdWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyA4XHJcbiAgICBnZXREYXRhRm9ybWF0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFGb3JtYXQ7XHJcbiAgICB9XHJcbiAgICBnZXRPcHRpb25zKCk6IElNb2RlbE9wdGlvbnMge1xyXG5cclxuICAgICAgICBsZXQgb3B0czogSU1vZGVsT3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fcmFuZ2UgKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsOiBhbnk7XHJcbiAgICAgICAgICAgIC8vdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3ZhbCApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnRyYW5zbGF0ZSggdGhpcy5fdmFsICk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gKCcwJyArIHZhbC5nZXREYXRlKCkpLnNsaWNlKC0yKSArIFxyXG4gICAgICAgICAgICAgICAgJy8nICsgKCcwJyArICgxICsgdmFsLmdldE1vbnRoKCkpICkuc2xpY2UoLTIpICtcclxuICAgICAgICAgICAgICAgICcvJyArICggdmFsLmdldEZ1bGxZZWFyKCkgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuX3ZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0cy52YWx1ZSA9IHZhbDtcclxuICAgICAgICAgICAgb3B0cy5yYW5nZSA9IG51bGw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsOiBhbnk7XHJcbiAgICAgICAgICAgIGxldCBhcnI6IFthbnksIGFueV0gPSBbbnVsbCwgbnVsbF07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCAhPSAnZGF0ZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhcnIgPSB0aGlzLl9yYW5nZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnZGF0ZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnRyYW5zbGF0ZSggdGhpcy5fcmFuZ2VbMF0gKTtcclxuICAgICAgICAgICAgICAgIHZhbCA9ICgnMCcgKyB2YWwuZ2V0RGF0ZSgpKS5zbGljZSgtMikgKyBcclxuICAgICAgICAgICAgICAgICcvJyArICgnMCcgKyAoMSArIHZhbC5nZXRNb250aCgpKSApLnNsaWNlKC0yKSArXHJcbiAgICAgICAgICAgICAgICAnLycgKyB2YWwuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhcnJbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3JhbmdlWzFdICk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSAoJzAnICsgdmFsLmdldERhdGUoKSkuc2xpY2UoLTIpICsgXHJcbiAgICAgICAgICAgICAgICAnLycgKyAoJzAnICsgKDEgKyB2YWwuZ2V0TW9udGgoKSkgKS5zbGljZSgtMikgK1xyXG4gICAgICAgICAgICAgICAgJy8nICsgdmFsLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvcHRzLnZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgb3B0cy5yYW5nZSA9IGFycjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINCy0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90YvQtSDQvNC10YLQvtC00YtcclxuICAgIGZpbmRQb3NpdGlvbkluQXJyKHZhbDogYW55LCBhcnI/OiBhbnlbXSk6IG51bWJlciB7XHJcbiAgICAgICAgLy8g0LjRidC10YIg0L/QvtC30LjRhtC40Y4gdmFsINCyIGN1c3RvbSB2YWx1ZXNcclxuICAgICAgICAvLyDRgtCw0Log0LbQtSDQvNC+0LbQtdGCINCx0YvRgtGMINC40YHQv9C+0LvRjNC30L7QstCw0L0g0YEg0LvRjtCx0YvQvCDQtNGA0YPQs9C4INC80LDRgdGB0LjQstC+0LxcclxuICAgICAgICBpZiAoIGFyciAmJiBhcnIuaW5kZXhPZih2YWwpICE9IC0xICkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyLmluZGV4T2YodmFsKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCBhcnIgJiYgYXJyLmluZGV4T2YodmFsKSA9PSAtMSApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW50IGZpbmQgdmFsdWUgaW4gYXJyYXknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggIXRoaXMuX2N1c3RvbVZhbHVlcyApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5fY3VzdG9tVmFsdWVzLmluZGV4T2YodmFsKSAhPSAtMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbVZhbHVlcy5pbmRleE9mKHZhbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgdmFsaWQgdmFsdWUgZm9yIGN1c3RvbSB2YWx1ZXMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RlcE51bWJlcih2YWw6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgLy8g0L3QsNGF0L7QtNC40YIsINC90LAg0LrQsNC60L7QvCDQv9C+INGB0YfQtdGC0YMg0YjQsNCz0LUg0YHRgtC+0LjRgiB2YWxcclxuICAgICAgICAvLyDQv9GA0LjQvNC10L3Rj9GC0Ywg0YLQvtC70YzQutC+INC00LvRjyDQvdC10YLRgNCw0L3RgdGE0L7RgNC80LjRgNC+0LLQsNC90L3Ri9GFLCDQv9GA0LDQstC40LvRjNC90YvRhSDQt9C90LDRh9C10L3QuNC5IVxyXG4gICAgICAgIGxldCBzdGVwTnVtOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuXHJcbiAgICAgICAgbGV0IGE6IG51bWJlciA9ICsodmFsIC0gdGhpcy5fbWluVmFsKS50b0ZpeGVkKG4pO1xyXG4gICAgICAgIGxldCBiOiBudW1iZXIgPSArKHRoaXMuX21heFZhbCAtIHRoaXMuX21pblZhbCkudG9GaXhlZChuKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHN0ZXBOdW0gPSArKCBhICogdGhpcy5nZXROdW1iZXJPZlN0ZXBzKCkgLyBiICkudG9GaXhlZCgpO1xyXG4gICAgICAgIHN0ZXBOdW0gPSBNYXRoLmFicyhzdGVwTnVtKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0ZXBOdW07XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNsYXRlQnlTdGVwKHN0ZXA6IG51bWJlcik6IG51bWJlciB8IHN0cmluZyB8IERhdGUge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdjdXN0b20nKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICF0aGlzLl9yZXZlcnNlICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbVZhbHVlc1tzdGVwXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXNbdGhpcy5fY3VzdG9tVmFsdWVzLmxlbmd0aCAtIHN0ZXAgLSAxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZmluZERlY2ltYWxQbGFjZXModGhpcy5fc3RlcCksIHRoaXMuZmluZERlY2ltYWxQbGFjZXModGhpcy5fbWluVmFsKSApO1xyXG4gICAgICAgICAgICBsZXQgcjogbnVtYmVyID0gIXRoaXMuX3JldmVyc2UgPyAxIDogLTE7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciA9ICsoICgrdGhpcy5fbWluVmFsKSArICgrdGhpcy5fc3RlcCkgKiAoK3N0ZXApICogKCtyKSApLnRvRml4ZWQobik7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnZGF0ZScpIHsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodmFsKTsgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiB2YWw7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zbGF0ZSh2YWwpOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2N1c3RvbScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbVZhbHVlc1t2YWxdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpOyBcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE51bWJlck9mU3RlcHMoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZmluZERlY2ltYWxQbGFjZXModGhpcy5fc3RlcCksIHRoaXMuZmluZERlY2ltYWxQbGFjZXModGhpcy5fbWluVmFsKSApO1xyXG4gICAgICAgIG4gPSBNYXRoLnBvdygxMCwgbik7XHJcbiAgICAgICAgcmV0dXJuICggTWF0aC5hYnModGhpcy5fbWF4VmFsIC0gdGhpcy5fbWluVmFsKSAqIG4gKSAvICggdGhpcy5fc3RlcCAqIG4gKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2UobmV3T3B0aW9uczogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBwcmV2T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IGFueSA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBuZXdPcHRpb25zKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgIT0gbnVsbCA/IG9wdGlvbnMudmFsdWUgOiBvcHRpb25zLm1pblZhbDtcclxuICAgICAgICBsZXQgdmFsaWRPcHRpb25zOiBJTW9kZWxPcHRpb25zO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnbnVtZXJpYycgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMudmFsaWRhdGVOdW1lcmljRm9ybWF0KG9wdGlvbnMsIHByZXZPcHRpb25zIGFzIElPcHRpb25zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdkYXRlJyApIHtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy52YWxpZGF0ZURhdGVGb3JtYXQob3B0aW9ucywgcHJldk9wdGlvbnMgYXMgSU9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJldk9wdGlvbnMsIG5ld09wdGlvbnMpO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdjdXN0b20nICkge1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLnZhbGlkYXRlQ3VzdG9tRm9ybWF0KG9wdGlvbnMsIHByZXZPcHRpb25zIGFzIElPcHRpb25zKTtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlcyA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9mIGRhdGEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RhdGFGb3JtYXQgPSB2YWxpZE9wdGlvbnMuZGF0YUZvcm1hdDtcclxuICAgICAgICB0aGlzLl92YWwgPSB2YWxpZE9wdGlvbnMudmFsdWU7XHJcbiAgICAgICAgdGhpcy5fbWluVmFsID0gdmFsaWRPcHRpb25zLm1pblZhbDtcclxuICAgICAgICB0aGlzLl9tYXhWYWwgPSB2YWxpZE9wdGlvbnMubWF4VmFsO1xyXG4gICAgICAgIHRoaXMuX3N0ZXAgPSB2YWxpZE9wdGlvbnMuc3RlcDtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlID0gdmFsaWRPcHRpb25zLnJldmVyc2U7XHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSB2YWxpZE9wdGlvbnMucmFuZ2U7XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tVmFsdWVzID0gdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlczsgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCAhPSAnZGF0ZScpIHRoaXMuX29wdGlvbnMgPSB2YWxpZE9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZU51bWVyaWNGb3JtYXQoYWxsT3B0aW9uczogSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyk6IElNb2RlbE9wdGlvbnMge1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBJT3B0aW9ucyA9IGFsbE9wdGlvbnM7XHJcbiAgICAgICAgLy8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQvdCw0YfQsNC70YzQvdGL0Lwg0L7Qv9GG0LjRj9C8INC00LXRhNC+0LvRgtC90YvQtSDQt9C90LDRh9C10L3QuNGPINC40LcgZGVmYXVsdE9wdGlvbnNcclxuICAgICAgICAvLyDQvdCw0YfQsNC70YzQvdC+0LzRgyDQt9C90LDRh9C10L3QuNGOINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0LzQuNC90LjQvNCw0LvRjNC90L7QtVxyXG4gICAgICAgIC8vINC/0L4g0LzQtdGA0LUg0L/RgNC+0YXQvtC20LTQtdC90LjRjyDQstCw0LvQuNC00LDRhtC40LgsINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPINC90LAg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC40LVcclxuICAgICAgICBsZXQgbmV3T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgZGF0YUZvcm1hdDogJ251bWVyaWMnLFxyXG4gICAgICAgICAgICB2YWx1ZTogZGVmYXVsdE9wdGlvbnMubWluVmFsIGFzIG51bWJlcixcclxuICAgICAgICAgICAgbWluVmFsOiBkZWZhdWx0T3B0aW9ucy5taW5WYWwgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICBtYXhWYWw6IGRlZmF1bHRPcHRpb25zLm1heFZhbCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgIHN0ZXA6IGRlZmF1bHRPcHRpb25zLnN0ZXAsXHJcbiAgICAgICAgICAgIHJldmVyc2U6IGRlZmF1bHRPcHRpb25zLnJldmVyc2UsXHJcbiAgICAgICAgICAgIHJhbmdlOiBkZWZhdWx0T3B0aW9ucy5yYW5nZSBhcyBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hcmVOdW1lcmljKG9wdGlvbnMubWF4VmFsLCBvcHRpb25zLm1pblZhbCwgb3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgbmV3T3B0aW9ucy5zdGVwID0gTWF0aC5hYnMob3B0aW9ucy5zdGVwKTtcclxuICAgICAgICBuZXdPcHRpb25zLnJldmVyc2UgPSBvcHRpb25zLnJldmVyc2UgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgbmV3T3B0aW9ucy5kYXRhRm9ybWF0ID0gb3B0aW9ucy5kYXRhRm9ybWF0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaXNTdGVwVmFsaWQob3B0aW9ucy5taW5WYWwgYXMgbnVtYmVyLCBvcHRpb25zLm1heFZhbCBhcyBudW1iZXIsIG5ld09wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC80LjQvSDQuCDQvNCw0LrRgSDQv9C10YDQtdC/0YPRgtCw0L3RiyDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvCwg0LzQtdC90Y/QtdC8INC/0L7RgNGP0LTQvtC6XHJcbiAgICAgICAgLy8g0L/QvtC00YDQsNC30YPQvNC10LLQsNC10YLRgdGPLCDRh9GC0L4gbWluIC0g0Y3RgtC+INGC0L4g0YfRgtC+INGB0LvQtdCy0LAg0L3QsCDRgdC70LDQudC00LXRgNC1LCBtYXggLSDRgdC/0YDQsNCy0LBcclxuICAgICAgICBpZiAoIHRoaXMuYXJlTWluTWF4VmFsaWQob3B0aW9ucy5taW5WYWwgYXMgbnVtYmVyLCBvcHRpb25zLm1heFZhbCBhcyBudW1iZXIsIG5ld09wdGlvbnMucmV2ZXJzZSkgKSB7XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMubWluVmFsID0gb3B0aW9ucy5taW5WYWwgYXMgbnVtYmVyO1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLm1heFZhbCA9IG9wdGlvbnMubWF4VmFsIGFzIG51bWJlcjsgICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLm1pblZhbCA9IG9wdGlvbnMubWF4VmFsIGFzIG51bWJlcjtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5tYXhWYWwgPSBvcHRpb25zLm1pblZhbCBhcyBudW1iZXI7ICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5yYW5nZSApIHtcclxuICAgICAgICAgICAgdGhpcy5pc1JhbmdlVmFsaWQobmV3T3B0aW9ucy5taW5WYWwsIG5ld09wdGlvbnMubWF4VmFsLCBvcHRpb25zLnJhbmdlIGFzIFtudW1iZXIsIG51bWJlcl0sIG5ld09wdGlvbnMuc3RlcCk7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC80LjQvSDQuCDQvNCw0LrRgSDQsiDQtNC40LDQv9Cw0LfQvtC90LUgcmFuZ2Ug0L/QtdGA0LXQv9GD0YLQsNC90Ysg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10LwsINC80LXQvdGP0LXQvCDQv9C+0YDRj9C00L7QulxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuYXJlTWluTWF4VmFsaWQob3B0aW9ucy5yYW5nZVswXSBhcyBudW1iZXIsIG9wdGlvbnMucmFuZ2VbMV0gYXMgbnVtYmVyLCBuZXdPcHRpb25zLnJldmVyc2UpICkge1xyXG4gICAgICAgICAgICAgICAgbmV3T3B0aW9ucy5yYW5nZSA9IG9wdGlvbnMucmFuZ2UgYXMgW251bWJlciwgbnVtYmVyXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld09wdGlvbnMucmFuZ2UgPSBbb3B0aW9ucy5yYW5nZVsxXSBhcyBudW1iZXIsIG9wdGlvbnMucmFuZ2VbMF0gYXMgbnVtYmVyXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g0L7RgtC80LXQvdGP0LXQvCDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwg0LTQsNC20LUg0LXRgdC70Lgg0L7QvdC+INCy0LLQtdC00LXQvdC+INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMudmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDQt9Cw0L/Rg9GB0LrQsNC10Lwg0L/RgNC+0LLQtdGA0LrQuCDQtNC70Y8g0L3QsNGH0LDQu9GM0L3QvtCz0L4g0LfQvdCw0YfQtdC90LjRjywg0YLQvtC70YzQutC+INC10YHQu9C4INC90LUg0YPQutCw0LfQsNC9INC00LjQsNC/0LDQt9C+0L0gcmFuZ2VcclxuICAgICAgICAgICAgdGhpcy5hcmVOdW1lcmljKG9wdGlvbnMudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmlzT25lVmFsdWVWYWxpZChuZXdPcHRpb25zLm1pblZhbCwgbmV3T3B0aW9ucy5tYXhWYWwsIG9wdGlvbnMudmFsdWUgYXMgbnVtYmVyLCBuZXdPcHRpb25zLnN0ZXApO1xyXG5cclxuICAgICAgICAgICAgbmV3T3B0aW9ucy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgYXMgbnVtYmVyO1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLnJhbmdlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG5ld09wdGlvbnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVEYXRlRm9ybWF0KGFsbE9wdGlvbnM6IElPcHRpb25zLCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMpOiBJTW9kZWxPcHRpb25zIHtcclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnMgPSBhbGxPcHRpb25zO1xyXG5cclxuICAgICAgICB0aGlzLmlzQ3VzdG9tRGF0ZVZhbGlkKG9wdGlvbnMubWluVmFsLCBvcHRpb25zLm1heFZhbCk7XHJcbiAgICAgICAgb3B0aW9ucy5taW5WYWwgPSB0aGlzLnRyYW5zbGF0ZURhdGVUb051bWJlcihvcHRpb25zLm1pblZhbCBhcyBzdHJpbmcpO1xyXG4gICAgICAgIG9wdGlvbnMubWF4VmFsID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5tYXhWYWwgYXMgc3RyaW5nKTtcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSB0aGlzLnRyYW5sYXRlU3RlcFRvRGF0ZUZvcm1hdChvcHRpb25zLnN0ZXApO1xyXG5cclxuICAgICAgICBpZiAoIEFycmF5LmlzQXJyYXkob3B0aW9ucy5yYW5nZSkgJiYgb3B0aW9ucy5yYW5nZS5sZW5ndGggPT0gMiApIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINCy0LLQtdC7INGH0YLQviDRgtC+INC00YDRg9Cz0L7QtSwg0LAg0L3QtSByYW5nZSwg0L3QsCDRjdGC0L7QvFxyXG4gICAgICAgICAgICAvLyDRjdGC0LDQv9C1INC+0YjQuNCx0LrQuCDQvdC1INCx0YPQtNC10YIuINCe0L3QsCDQv9C+0Y/QstC40YLRgdGPINC/0YDQuCDQv9GA0L7QstC10YDQutC1INC90LAgdmFsaWRhdGVOdW1lcmljRm9ybWF0XHJcbiAgICAgICAgICAgIC8vICjQv9C+0YLQvtC80YMg0YfRgtC+IHJhbmdlINGC0LDQuiDQuCDQvtGB0YLQsNC10YLRgdGPIHRydWUpXHJcbiAgICAgICAgICAgIHRoaXMuaXNDdXN0b21EYXRlVmFsaWQob3B0aW9ucy5yYW5nZVswXSwgb3B0aW9ucy5yYW5nZVsxXSk7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMF0gPSB0aGlzLnRyYW5zbGF0ZURhdGVUb051bWJlcihvcHRpb25zLnJhbmdlWzBdIGFzIHN0cmluZyk7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMV0gPSB0aGlzLnRyYW5zbGF0ZURhdGVUb051bWJlcihvcHRpb25zLnJhbmdlWzFdIGFzIHN0cmluZyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNDdXN0b21EYXRlVmFsaWQob3B0aW9ucy52YWx1ZSk7XHJcbiAgICAgICAgICAgIG9wdGlvbnMudmFsdWUgPSB0aGlzLnRyYW5zbGF0ZURhdGVUb051bWJlcihvcHRpb25zLnZhbHVlIGFzIHN0cmluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTnVtZXJpY0Zvcm1hdChvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVDdXN0b21Gb3JtYXQoYWxsT3B0aW9uczogSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyk6IElNb2RlbE9wdGlvbnMge1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBJT3B0aW9ucyA9IGFsbE9wdGlvbnM7XHJcblxyXG4gICAgICAgIGlmICggIW9wdGlvbnMuY3VzdG9tVmFsdWVzICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2N1c3RvbVZhbHVlcyBpcyByZXF1aXJlZCBvcHRpb24gZm9yIGN1c3RvbSBmb3JtYXQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCAhQXJyYXkuaXNBcnJheShvcHRpb25zLmN1c3RvbVZhbHVlcykgfHwgb3B0aW9ucy5jdXN0b21WYWx1ZXMubGVuZ3RoIDwgMiApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjdXN0b21WYWx1ZXMgc2hvdWxkIGJlIGEgcmFuZ2Ugd2l0aCB0d28gb3IgbW9yZSBpdGVtcywgbGlrZSBbMSwgMiwgXCJhXCJdJyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgb3B0aW9ucy5taW5WYWwgPSAwO1xyXG4gICAgICAgIG9wdGlvbnMubWF4VmFsID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSAxO1xyXG5cclxuICAgICAgICAvLyDQv9GA0LjQvtGA0LjRgtC10YLRiyDQvtC/0YbQuNC5OlxyXG4gICAgICAgIC8vIDEuIHJhbmdlINCyINGH0LjRgdC70LDRhVxyXG4gICAgICAgIC8vIDIuIHJhbmdlINCyINC30L3QsNGH0LXQvdC40Y/RhVxyXG4gICAgICAgIC8vIDMuIHZhbHVlINC60LDQuiDRh9C40YHQu9C+XHJcbiAgICAgICAgLy8gNC4gdmFsdWUg0LrQsNC6INC30L3QsNGH0LXQvdC40LUgXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnJhbmdlIHx8IG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlcyApIHtcclxuXHJcbiAgICAgICAgICAgIGlmICggIW9wdGlvbnMucmFuZ2UgJiYgQXJyYXkuaXNBcnJheShvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXMpICYmIG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlcy5sZW5ndGggPT0gMiApIHtcclxuICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQstCy0LXQuyDRh9GC0L4g0YLQviDQtNGA0YPQs9C+0LUsINCwINC90LUgcmFuZ2UsINC90LAg0Y3RgtC+0LxcclxuICAgICAgICAgICAgICAgIC8vINGN0YLQsNC/0LUg0L7RiNC40LHQutC4INC90LUg0LHRg9C00LXRgi4g0J7QvdCwINC/0L7Rj9Cy0LjRgtGB0Y8g0L/RgNC4INC/0YDQvtCy0LXRgNC60LUg0L3QsCB2YWxpZGF0ZU51bWVyaWNGb3JtYXRcclxuICAgICAgICAgICAgICAgIC8vICjQv9C+0YLQvtC80YMg0YfRgtC+IHJhbmdlINGC0LDQuiDQuCDQvtGB0YLQsNC10YLRgdGPIHRydWUpXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJhbmdlID0gWzAsIDBdO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVswXSA9IHRoaXMuZmluZFBvc2l0aW9uSW5BcnIob3B0aW9ucy5yYW5nZUluQ3VzdG9tVmFsdWVzWzBdLCBvcHRpb25zLmN1c3RvbVZhbHVlcyk7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJhbmdlWzFdID0gdGhpcy5maW5kUG9zaXRpb25JbkFycihvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXNbMV0sIG9wdGlvbnMuY3VzdG9tVmFsdWVzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQvdC1INCy0LLQtdC00LXQvdGLIHZhbCDQuNC70LggcmFuZ2Ug0LIgY3VzdG9tIHZhbHVlc1xyXG4gICAgICAgICAgICAvLyDQv9GA0LjRgdCy0LDQuNCy0LDQtdC8INC/0YDQvtGB0YLRi9C1IHZhbHVlINC40LvQuCByYW5nZSwg0LXRgdC70Lgg0L7QvdC4INC10YHRgtGMIFxyXG4gICAgICAgICAgICBpZiAoICFvcHRpb25zLnZhbHVlICYmIG9wdGlvbnMudmFsdWVJbkN1c3RvbVZhbHVlcyApIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMudmFsdWUgPSB0aGlzLmZpbmRQb3NpdGlvbkluQXJyKG9wdGlvbnMudmFsdWVJbkN1c3RvbVZhbHVlcywgb3B0aW9ucy5jdXN0b21WYWx1ZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTnVtZXJpY0Zvcm1hdChvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgYXJlTnVtZXJpYyguLi52YWxzOiBhbnkpIHtcclxuICAgICAgICBmb3IgKGxldCB2YWwgb2YgdmFscykge1xyXG4gICAgICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyh2YWwpICkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgdmFsdWVzIGluIG51bWVyaWMgZm9ybWF0IHNob3VsZCBiZSBudW1iZXJzJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhcmVNaW5NYXhWYWxpZChtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIsIHJldmVyc2U6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoICFyZXZlcnNlICYmIChtaW5WYWwgPj0gbWF4VmFsKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHJldmVyc2UgJiYgKG1pblZhbCA8PSBtYXhWYWwpICkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNTdGVwVmFsaWQobWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyhzdGVwKSApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGVwIHNob3VsZCBiZSBhIG51bWJlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHN0ZXAgPT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGVwIGNhbnQgYmUgZXF1YWwgdG8gMCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuICAgICAgICBsZXQgdGVzdDogbnVtYmVyID0gKyhtYXhWYWwgLSBtaW5WYWwpLnRvRml4ZWQobilcclxuICAgICAgICB0ZXN0ID0gKCB0ZXN0ICogTWF0aC5wb3coMTAsIG4pICkgLyAoIHN0ZXAgKiBNYXRoLnBvdygxMCwgbikgKTtcclxuICAgICAgICB0ZXN0ID0gTWF0aC5hYnModGVzdCk7XHJcblxyXG4gICAgICAgIGlmICggdGVzdCAlIDEgIT0gMCApIHtcclxuICAgICAgICAgICAgLy8g0LIg0YLQvtC8INGH0LjRgdC70LUg0Y3RgtC+INC/0YDQvtCy0LXRgNC60LAg0YfRgtC+0LHRiyDRiNCw0LMg0LHRi9C7INC90LUg0LHQvtC70YzRiNC1INCy0YHQtdCz0L4g0L/RgNC+0LzQtdC20YPRgtC60LBcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCcoTWF4IHZhbHVlIC0gbWluIHZhbHVlKSBkaXZpZGVkIGJ5IHN0ZXAgc2hvdWxkIHJldHVybiBpbnRlZ2VyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNPbmVWYWx1ZVZhbGlkKG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlciwgdmFsOiBudW1iZXIsIHN0ZXA6IG51bWJlcikge1xyXG5cclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZmluZERlY2ltYWxQbGFjZXMoc3RlcCksIHRoaXMuZmluZERlY2ltYWxQbGFjZXMobWluVmFsKSApO1xyXG5cclxuICAgICAgICBsZXQgdGVzdDogbnVtYmVyID0gKyh2YWwgLSBtaW5WYWwpLnRvRml4ZWQobilcclxuICAgICAgICB0ZXN0ID0gKCB0ZXN0ICogTWF0aC5wb3coMTAsIG4pICkgLyAoIHN0ZXAgKiBNYXRoLnBvdygxMCwgbikgKTtcclxuICAgICAgICB0ZXN0ID0gTWF0aC5hYnModGVzdCk7XHJcblxyXG4gICAgICAgIGlmICggTWF0aC5tYXgobWluVmFsLCBtYXhWYWwpIDwgdmFsICB8fCAgTWF0aC5taW4obWluVmFsLCBtYXhWYWwpID4gdmFsICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBpbml0aWFsIHZhbHVlIHNob3VsZCBiZSB3aXRoaW4gbWluIGFuZCBtYXggdmFsdWVzJylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0ZXN0ICUgMSAhPSAwICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIHNob3VsZCBiZSBzZXQgb24gc3RlcCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzUmFuZ2VWYWxpZChtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIsIHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdLCBzdGVwOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuXHJcbiAgICAgICAgbGV0IHRlc3RMZWZ0OiBudW1iZXIgPSAocmFuZ2VbMF0gLSBtaW5WYWwpIC8gc3RlcDtcclxuICAgICAgICB0ZXN0TGVmdCA9ICt0ZXN0TGVmdC50b0ZpeGVkKG4pO1xyXG4gICAgICAgIHRlc3RMZWZ0ID0gTWF0aC5hYnModGVzdExlZnQpO1xyXG5cclxuICAgICAgICBsZXQgdGVzdFJpZ2h0OiBudW1iZXIgPSAocmFuZ2VbMV0gLSBtaW5WYWwpIC8gc3RlcDtcclxuICAgICAgICB0ZXN0UmlnaHQgPSArdGVzdFJpZ2h0LnRvRml4ZWQobik7XHJcbiAgICAgICAgdGVzdFJpZ2h0ID0gTWF0aC5hYnModGVzdFJpZ2h0KTtcclxuXHJcbiAgICAgICAgaWYgKCByYW5nZS5sZW5ndGggIT0gMiApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSYW5nZSBzaG91bGQgY29udGFpbiB0d28gdmFsdWVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggIXRoaXMuaXNOdW1lcmljKHJhbmdlWzBdKSB8fCAhdGhpcy5pc051bWVyaWMocmFuZ2VbMV0pICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlcyBpbiByYW5nZSBzaG91bGQgYmUgbnVtYmVycycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIE1hdGgubWF4KG1pblZhbCwgbWF4VmFsKSA8IE1hdGgubWF4KHJhbmdlWzBdLCByYW5nZVsxXSkgIHx8ICBNYXRoLm1pbihtaW5WYWwsIG1heFZhbCkgPiBNYXRoLm1pbihyYW5nZVswXSwgcmFuZ2VbMV0pICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSByYW5nZSBzaG91bGQgYmUgd2l0aGluIG1pbiBhbmQgbWF4IHZhbHVlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHRlc3RMZWZ0ICUgMSAhPSAwIHx8IHRlc3RSaWdodCAlIDEgIT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcmFuZ2Ugc2hvdWxkIGJlIHNldCBvbiBzdGVwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNDdXN0b21EYXRlVmFsaWQoLi4udmFsczogYW55W10pIHtcclxuICAgICAgICBmb3IgKCBsZXQgdmFsIG9mIHZhbHMgKSB7XHJcbiAgICAgICAgICAgIGlmICggISgnJyArIHZhbCkubWF0Y2goL15cXGR7Mn1bLlxcLy1dXFxkezJ9Wy5cXC8tXVxcZHs0fSQvKSApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIHZhbHVlcyBpbiBkYXRlIGZvcm1hdCBzaG91bGQgYmUgZGF0ZXMsIGxpa2UgZGQubW0ueXl5eSBvciBkZC9tbS95eXl5IG9yIGRkLW1tLXl5eXknKTsgXHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVEYXRlVG9OdW1iZXIoc3RyOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBhcnIgPSBzdHIuc3BsaXQoc3RyWzJdKTtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCthcnJbMl0sICthcnJbMV0gLSAxLCArYXJyWzBdKTtcclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LLQstC+0LTQuNGCINGB0YLRgNCw0L3QvdGL0LUg0LTQsNC90L3Ri9C1LCDQvtC9INCy0YHQtSDRgNCw0LLQvdC+INC/0L7Qu9GD0YfQuNGCINGA0LXQt9GD0LvRjNGC0LDRgi5cclxuICAgICAgICAvLyDQodC60L7RgNC10LUg0LLRgdC10LPQviwg0Y3RgtC+INCz0L7QstC+0YDQuNGCINC+INGC0L7QvCwg0YfRgtC+INC+0L0g0L/QtdGA0LXQv9GD0YLQsNC7INC/0L7RgNGP0LTQvtC6LiDQn9C+0Y/QstC40YLRgdGPINC/0YDQtdC00YPQv9GA0LXQttC00LXQvdC40LVcclxuICAgICAgICBpZiAoK2FyclswXSA+IDMxIHx8ICthcnJbMV0gPiAxMikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VzZSBkZC5tbS55eXl5IG9yIGRkL21tL3l5eXkgb3IgZGQtbW0teXl5eSBmb3IgZGF0ZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IGRhdGUsIHRyeSBkZC5tbS55eXl5IG9yIGRkL21tL3l5eXkgb3IgZGQtbW0teXl5eScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gK2RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFubGF0ZVN0ZXBUb0RhdGVGb3JtYXQoc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyhzdGVwKSB8fCBzdGVwICUgMSAhPSAwICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0ZXAgaW4gZGF0ZSBmb3JtYXQgc2hvdWxkIGJlIGludGVnZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0ZXAgKiAyNCAqIDM2MDAgKiAxMDAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGlzTnVtZXJpYyhuOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmICFpc05hTihuIC0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kRGVjaW1hbFBsYWNlcyhudW06IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgLy8g0LrQvtC70LjRh9C10YHRgtCy0L4g0LfQvdCw0LrQvtCyINC/0L7RgdC70LUg0LfQsNC/0Y/RgtC+0LlcclxuICAgICAgICByZXR1cm4gfihudW0gKyAnJykuaW5kZXhPZignLicpID8gKG51bSArICcnKS5zcGxpdCgnLicpWzFdLmxlbmd0aCA6IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBJTW9kZWwgfTtcclxuZXhwb3J0IHsgSU1vZGVsT3B0aW9ucyB9O1xyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuIiwiLyoqXHJcbiAqINCY0L3RgtGE0LXRgNGE0LXQudGBINC40LfQtNCw0YLQtdC70Y8g0L7QsdGK0Y/QstC70Y/QtdGCINC90LDQsdC+0YAg0LzQtdGC0L7QtNC+0LIg0LTQu9GPINGD0L/RgNCw0LLQu9C10L3QuNGP0LzQuCDQv9C+0LTQv9C40YHQutC40YfQsNC80LguXHJcbiAqL1xyXG5pbnRlcmZhY2UgSVN1YmplY3Qge1xyXG5cclxuICAgIHZhbDogYW55IHwgW2FueSwgYW55XTsgXHJcblxyXG4gICAgLy8g0J/RgNC40YHQvtC10LTQuNC90Y/QtdGCINC90LDQsdC70Y7QtNCw0YLQtdC70Y8g0Log0LjQt9C00LDRgtC10LvRji5cclxuICAgIGF0dGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZDtcclxuXHJcbiAgICAvLyDQntGC0YHQvtC10LTQuNC90Y/QtdGCINC90LDQsdC70Y7QtNCw0YLQtdC70Y8g0L7RgiDQuNC30LTQsNGC0LXQu9GPLlxyXG4gICAgZGV0YWNoKG9ic2VydmVyOiBJT2JzZXJ2ZXIpOiB2b2lkO1xyXG5cclxuICAgIC8vINCj0LLQtdC00L7QvNC70Y/QtdGCINCy0YHQtdGFINC90LDQsdC70Y7QtNCw0YLQtdC70LXQuSDQviDRgdC+0LHRi9GC0LjQuC5cclxuICAgIG5vdGlmeSgpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICog0JjQt9C00LDRgtC10LvRjCDQstC70LDQtNC10LXRgiDQvdC10LrQvtGC0L7RgNGL0Lwg0LLQsNC20L3Ri9C8INGB0L7RgdGC0L7Rj9C90LjQtdC8INC4INC+0L/QvtCy0LXRidCw0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9C10Lkg0L4g0LXQs9C+XHJcbiAqINC40LfQvNC10L3QtdC90LjRj9GFLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ViamVjdCBpbXBsZW1lbnRzIElTdWJqZWN0IHtcclxuXHJcbiAgICB2YWw6IGFueSB8IFthbnksIGFueV07IFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCB2YWw6IGFueSB8IFthbnksIGFueV0gKSB7XHJcbiAgICAgICAgdGhpcy52YWwgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7T2JzZXJ2ZXJbXX0g0KHQv9C40YHQvtC6INC/0L7QtNC/0LjRgdGH0LjQutC+0LIuINCSINGA0LXQsNC70YzQvdC+0Lkg0LbQuNC30L3QuCDRgdC/0LjRgdC+0LpcclxuICAgICAqINC/0L7QtNC/0LjRgdGH0LjQutC+0LIg0LzQvtC20LXRgiDRhdGA0LDQvdC40YLRjNGB0Y8g0LIg0LHQvtC70LXQtSDQv9C+0LTRgNC+0LHQvdC+0Lwg0LLQuNC00LUgKNC60LvQsNGB0YHQuNGE0LjRhtC40YDRg9C10YLRgdGPINC/0L5cclxuICAgICAqINGC0LjQv9GDINGB0L7QsdGL0YLQuNGPINC4INGCLtC0LilcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvYnNlcnZlcnM6IElPYnNlcnZlcltdID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQnNC10YLQvtC00Ysg0YPQv9GA0LDQstC70LXQvdC40Y8g0L/QvtC00L/QuNGB0LrQvtC5LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNoKG9ic2VydmVyOiBJT2JzZXJ2ZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGV0YWNoKG9ic2VydmVyOiBJT2JzZXJ2ZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvYnNlcnZlckluZGV4ID0gdGhpcy5vYnNlcnZlcnMuaW5kZXhPZihvYnNlcnZlcik7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMuc3BsaWNlKG9ic2VydmVySW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JfQsNC/0YPRgdC6INC+0LHQvdC+0LLQu9C10L3QuNGPINCyINC60LDQttC00L7QvCDQv9C+0LTQv9C40YHRh9C40LrQtS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG5vdGlmeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBvYnNlcnZlciBvZiB0aGlzLm9ic2VydmVycykge1xyXG4gICAgICAgICAgICBvYnNlcnZlci51cGRhdGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog0JjQvdGC0LXRgNGE0LXQudGBINCd0LDQsdC70Y7QtNCw0YLQtdC70Y8g0L7QsdGK0Y/QstC70Y/QtdGCINC80LXRgtC+0LQg0YPQstC10LTQvtC80LvQtdC90LjRjywg0LrQvtGC0L7RgNGL0Lkg0LjQt9C00LDRgtC10LvQuFxyXG4gKiDQuNGB0L/QvtC70YzQt9GD0Y7RgiDQtNC70Y8g0L7Qv9C+0LLQtdGJ0LXQvdC40Y8g0YHQstC+0LjRhSDQv9C+0LTQv9C40YHRh9C40LrQvtCyLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2ZXIge1xyXG4gICAgZnVuYzogYW55O1xyXG4gICAgLy8g0J/QvtC70YPRh9C40YLRjCDQvtCx0L3QvtCy0LvQtdC90LjQtSDQvtGCINGB0YPQsdGK0LXQutGC0LAuXHJcbiAgICB1cGRhdGUoc3ViamVjdDogU3ViamVjdCk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQmtC+0L3QutGA0LXRgtC90YvQtSDQndCw0LHQu9GO0LTQsNGC0LXQu9C4INGA0LXQsNCz0LjRgNGD0Y7RgiDQvdCwINC+0LHQvdC+0LLQu9C10L3QuNGPLCDQstGL0L/Rg9GJ0LXQvdC90YvQtSDQmNC30LTQsNGC0LXQu9C10LwsINC6XHJcbiAqINC60L7RgtC+0YDQvtC80YMg0L7QvdC4INC/0YDQuNC60YDQtdC/0LvQtdC90YsuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT2JzZXJ2ZXIgaW1wbGVtZW50cyBJT2JzZXJ2ZXIge1xyXG5cclxuICAgIGZ1bmM6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihmdW5jOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuZnVuYyA9IGZ1bmM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShzdWJqZWN0OiBTdWJqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mdW5jKCBzdWJqZWN0LnZhbCApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0lTdWJqZWN0fTsiLCJpbXBvcnQgSU9wdGlvbnMsIHsgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IHtJTW9kZWx9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQge0lNb2RlbE9wdGlvbnN9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQge0lWaWV3fSBmcm9tICcuL1ZpZXcnO1xyXG5pbXBvcnQge0lTdWJqZWN0fSAgZnJvbSAnLi9PYnNlcnZlcic7XHJcblxyXG5jbGFzcyBQcmVzZW50ZXIge1xyXG5cclxuICAgIHByaXZhdGUgX21vZGVsOiBJTW9kZWw7XHJcbiAgICBwcml2YXRlIF92aWV3OiBJVmlldztcclxuICAgIHByaXZhdGUgX3N1YmplY3Q6IElTdWJqZWN0O1xyXG5cclxuICAgIHByaXZhdGUgX2FjdGl2ZVRodW1iOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbDogSU1vZGVsLCB2aWV3OiBJVmlldywgc3ViamVjdDogSVN1YmplY3QpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fbW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB0aGlzLl92aWV3ID0gdmlldztcclxuICAgICAgICB0aGlzLl9zdWJqZWN0ID0gc3ViamVjdDtcclxuXHJcbiAgICAgICAgdGhpcy50aHVtYk9uRG93biA9IHRoaXMudGh1bWJPbkRvd24uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnRodW1iT25Nb3ZlID0gdGhpcy50aHVtYk9uTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudGh1bWJPblVwID0gdGhpcy50aHVtYk9uVXAuYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zbGlkZXJPbkNsaWNrID0gdGhpcy5zbGlkZXJPbkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgIFxyXG4gICAgICAgIGlmICggIW1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKCkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigxKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDIpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy50aHVtYk9uRG93bik7XHJcblxyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDEpLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDIpLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgIH0gIFxyXG5cclxuICAgICAgICB2aWV3LmdldFNsaWRlcigpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnNsaWRlck9uQ2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGh1bWJPbkRvd24oZXZlbnQpOiB2b2lkIHtcclxuICAgICAgICAvLyDQv9GA0LXQtNC+0YLQstGA0LDRgtC40YLRjCDQt9Cw0L/Rg9GB0Log0LLRi9C00LXQu9C10L3QuNGPICjQtNC10LnRgdGC0LLQuNC1INCx0YDQsNGD0LfQtdGA0LApXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGh1bWIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnRodW1iT25Nb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy50aHVtYk9uVXApO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudGh1bWJPbk1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50aHVtYk9uVXApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGh1bWJPbk1vdmUoZXZlbnQpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IG1vZGVsOiBJTW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuICAgICAgICBsZXQgdmlldzogSVZpZXcgPSB0aGlzLl92aWV3O1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQgPSB0aGlzLl92aWV3LmdldFNsaWRlcigpO1xyXG4gICAgICBcclxuICAgICAgICBsZXQgbWluVmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNaW5WYWwoKTtcclxuICAgICAgICBsZXQgbWF4VmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNYXhWYWwoKTtcclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIGxldCByZXZlcnNlOiBudW1iZXIgPSAhdGhpcy5fbW9kZWwuZ2V0UmV2ZXJzZSgpID8gMSA6IC0xO1xyXG4gICAgICAgIGxldCBzbGlkZXJMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcuZ2V0TGVuZ2h0KCk7XHJcbiAgICAgICAgbGV0IHN0ZXBMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcuZmluZE9uZVN0ZXBMZW5naHQoKTtcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlckJvcmRlcjogbnVtYmVyO1xyXG4gICAgICAgIGxldCBldmVudFBvczogbnVtYmVyO1xyXG4gICAgICAgIGxldCB0aHVtYlBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGxlZnRQb2ludDogbnVtYmVyO1xyXG4gICAgICAgIGxldCByaWdodFBvaW50OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG5ld1ZhbDogbnVtYmVyO1xyXG5cclxuICAgICAgICAvLyDQn9C+0LfQuNGG0LjRjyDQsdC10LPRg9C90LrQsCDQsiBweCDQstGL0YfQuNGB0LvRj9C10YLRgdGPINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDQvdCw0YfQsNC70LAg0YHQu9Cw0LnQtNC10YDQsC5cclxuICAgICAgICAvLyDQktC90LDRh9Cw0LvQtSBuZXdWYWwg0LLRi9GH0LjRgdC70Y/QtdGC0YHRjyDQutCw0Log0LrQvtC70LjRh9C10YHRgtCy0L4g0YjQsNCz0L7QsiDQvtGCINC90LDRh9Cw0LvQsCAo0L7RgiAwKSxcclxuICAgICAgICAvLyAo0YLQviDQtdGB0YLRjCDQt9C90LDRh9C10L3QuNGPIG1pbiwgbWF4LCByZXZlcnNlINC90LUg0LjQvNC10Y7RgiDQt9C90LDRh9C10L3QuNGPKS5cclxuXHJcbiAgICAgICAgaWYgKCAhdmlldy5nZXRWZXJ0aWNhbCgpICkge1xyXG5cclxuICAgICAgICAgICAgc2xpZGVyQm9yZGVyID0gKHNsaWRlck5vZGUub2Zmc2V0V2lkdGggLSBzbGlkZXJMZW5naHQpIC8gMjtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSBldmVudC5jbGllbnRYIHx8IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WDsgICAgICAgICBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGV2ZW50UG9zIC0gc2xpZGVyTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gc2xpZGVyQm9yZGVyO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgc2xpZGVyQm9yZGVyID0gKHNsaWRlck5vZGUub2Zmc2V0SGVpZ2h0IC0gc2xpZGVyTGVuZ2h0KSAvIDI7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gZXZlbnQuY2xpZW50WSB8fCBldmVudC50b3VjaGVzWzBdLmNsaWVudFk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBldmVudFBvcyAtIHNsaWRlck5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gc2xpZGVyQm9yZGVyO1xyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIG5ld1ZhbCA9IE1hdGgucm91bmQodGh1bWJQb3NpdGlvbiAvIHN0ZXBMZW5naHQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICggbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuICAgICAgICAgICAgaWYgKCB0aGlzLl9hY3RpdmVUaHVtYi5jbGFzc0xpc3QuY29udGFpbnMoJ3NsaWRlcl9fdGh1bWJfcmlnaHQnKSApIHtcclxuICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INC/0YDQvtC80LXQttGD0YLQvtC6LCDRgtC+INC70LXQstCw0Y8g0LPRgNCw0L3QuNGG0LAgLSDRjdGC0L4g0LvQtdCy0YvQuSDQsdC10LPRg9C90L7QulxyXG4gICAgICAgICAgICAgICAgLy8g0LfQtNC10YHRjCDRgNCw0YHRgdGH0LjRgtGL0LLQsNC10YLRgdGPINC60L7Qu9C40YfQtdGB0YLQstC+INGI0LDQs9C+0LIg0L7RgiDQvdCw0YfQsNC70LAgKNC+0YIgMCksIFxyXG4gICAgICAgICAgICAgICAgLy8g0LfQsNGC0LXQvCDRgNCw0YHRgdGC0L7Rj9C90LjQtSDQsiBweCDQvtGCINC90LDRh9Cw0LvQsCDRgdC70LDQudC00LXRgNCwLlxyXG5cclxuICAgICAgICAgICAgICAgIC8vINCe0YjQuNCx0LrQuCDQsiDQstGL0YfQuNGB0LvQtdC90LjRj9GFINGBIGZsb2F0INC30LTQtdGB0Ywg0LzQvtC20L3QviDQv9GA0L7QuNCz0L3QvtGA0LjRgNC+0LLQsNGC0YxcclxuICAgICAgICAgICAgICAgIGxlZnRQb2ludCA9IChtb2RlbC5nZXRSYW5nZSgpWzBdIC0gbWluVmFsKSAqIHJldmVyc2UgLyBzdGVwO1xyXG4gICAgICAgICAgICAgICAgbGVmdFBvaW50ID0gbGVmdFBvaW50ICogc3RlcExlbmdodDtcclxuICAgICAgICAgICAgICAgIHJpZ2h0UG9pbnQgPSBzbGlkZXJMZW5naHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluVmFsID0gbW9kZWwuZ2V0UmFuZ2UoKVswXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0UG9pbnQgPSAobW9kZWwuZ2V0UmFuZ2UoKVsxXSAtIG1pblZhbCkgKiByZXZlcnNlIC8gc3RlcDtcclxuICAgICAgICAgICAgICAgIHJpZ2h0UG9pbnQgPSByaWdodFBvaW50ICogc3RlcExlbmdodDtcclxuICAgICAgICAgICAgICAgIGxlZnRQb2ludCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgbWF4VmFsID0gbW9kZWwuZ2V0UmFuZ2UoKVsxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxlZnRQb2ludCA9IDA7XHJcbiAgICAgICAgICAgIHJpZ2h0UG9pbnQgPSBzbGlkZXJMZW5naHQ7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCB0aHVtYlBvc2l0aW9uIDw9IGxlZnRQb2ludCkge1xyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gbGVmdFBvaW50O1xyXG4gICAgICAgICAgICBuZXdWYWwgPSBtaW5WYWw7XHJcbiAgICAgICAgfSBlbHNlIGlmICggdGh1bWJQb3NpdGlvbiA+PSByaWdodFBvaW50KSB7XHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSByaWdodFBvaW50O1xyXG4gICAgICAgICAgICBuZXdWYWwgPSBtYXhWYWw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LHQtdCz0YPQvdC+0Log0L3QtSDQstGL0YjQtdC7INC30LAg0LPRgNCw0L3QuNGG0YssINGB0YLQsNCy0LjQvCDQtdCz0L4g0L3QsCDQsdC70LjQttCw0LnRiNC10LUg0LfQvdCw0YfQtdC90LjQtSxcclxuICAgICAgICAgICAgLy8g0LrRgNCw0YLQvdC+0LUg0YjQsNCz0YMuXHJcbiAgICAgICAgICAgIC8vINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INGN0YLQvtCz0L4g0L/RgNC10L7QsdGA0LDQt9GD0LXQvCDQtdCz0L4g0LTQu9GPINC80L7QtNC10LvQuC4g0JXRgdC70LggcmV2ZXJzZSA9PSB0cnVlLCDRgtC+ID09IC0xIFxyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gbmV3VmFsICogc3RlcExlbmdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGYgPSB4ID0+ICggKHgudG9TdHJpbmcoKS5pbmNsdWRlcygnLicpKSA/ICh4LnRvU3RyaW5nKCkuc3BsaXQoJy4nKS5wb3AoKS5sZW5ndGgpIDogKDApICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbiA9IGYoc3RlcCkgKyBmKG1pblZhbCk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICggbmV3VmFsICogTWF0aC5wb3coMTAsIG4pICogc3RlcCAqIHJldmVyc2UgICkgLyBNYXRoLnBvdygxMCwgbik7XHJcblxyXG4gICAgICAgICAgICBuID0gTWF0aC5tYXgoIGYoc3RlcCksIGYobWluVmFsKSApO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSArKCgrbmV3VmFsKS50b0ZpeGVkKG4pKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKCttb2RlbC5nZXRNaW5WYWwoKSkgKyAoK25ld1ZhbCk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICsoKCtuZXdWYWwpLnRvRml4ZWQobikpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICggbW9kZWwuZ2V0UmFuZ2UoKSAmJiB0aGlzLl9hY3RpdmVUaHVtYi5jbGFzc0xpc3QuY29udGFpbnMoJ3NsaWRlcl9fdGh1bWJfbGVmdCcpKSB7XHJcbiAgICAgICAgICAgIG1vZGVsLnNldFJhbmdlKCBbbmV3VmFsLCBtb2RlbC5nZXRSYW5nZSgpWzFdXSApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKCBtb2RlbC5nZXRSYW5nZSgpICYmIHRoaXMuX2FjdGl2ZVRodW1iLmNsYXNzTGlzdC5jb250YWlucygnc2xpZGVyX190aHVtYl9yaWdodCcpKSB7XHJcbiAgICAgICAgICAgIG1vZGVsLnNldFJhbmdlKCBbbW9kZWwuZ2V0UmFuZ2UoKVswXSwgbmV3VmFsXSApO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtb2RlbC5zZXRWYWwobmV3VmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbih0aGlzLl9hY3RpdmVUaHVtYiwgdGh1bWJQb3NpdGlvbik7XHJcblxyXG4gICAgICAgIGlmICggdmlldy5nZXRUb29sdGlwKCkgfHwgdmlldy5nZXRUb29sdGlwKDEpICkge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUobmV3VmFsKTtcclxuXHJcbiAgICAgICAgICAgIHZpZXcuc2V0VmFsVG9Ub29sdGlwKCB0aGlzLl9hY3RpdmVUaHVtYi5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX190b29sdGlwJyksIHZhbCwgdmlldy5nZXRUb29sdGlwTWFzaygpICk7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSB0aHVtYk9uVXAoZXZlbnQpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMudGh1bWJPblVwKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnRodW1iT25Nb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudGh1bWJPblVwKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnRodW1iT25Nb3ZlKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGh1bWIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgLy8g0L3QsNCx0LvRjtC00LDRgtC10LvRjFxyXG4gICAgICAgIGxldCBtb2RlbDogSU1vZGVsID0gdGhpcy5fbW9kZWw7XHJcblxyXG4gICAgICAgIGlmICggbW9kZWwuZ2V0VmFsKCkgIT0gbnVsbCApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRWYWwoKSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IHZhbDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFswXSA9IHZhbDtcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVsxXSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFsxXSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3ViamVjdC5ub3RpZnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNsaWRlck9uQ2xpY2soZXZlbnQpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IG1vZGVsOiBJTW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuICAgICAgICBsZXQgdmlldzogSVZpZXcgPSB0aGlzLl92aWV3O1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQgPSB0aGlzLl92aWV3LmdldFNsaWRlcigpO1xyXG4gICAgICAgIGxldCBjaGFuZ2luZ1RodW1iOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgXHJcbiAgICAgICAgbGV0IG1pblZhbDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0TWluVmFsKCk7XHJcbiAgICAgICAgbGV0IG1heFZhbDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0TWF4VmFsKCk7XHJcbiAgICAgICAgbGV0IHN0ZXA6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICBsZXQgcmV2ZXJzZTogbnVtYmVyID0gIXRoaXMuX21vZGVsLmdldFJldmVyc2UoKSA/IDEgOiAtMTtcclxuICAgICAgICBsZXQgc2xpZGVyTGVuZ2h0OiBudW1iZXIgPSB0aGlzLl92aWV3LmdldExlbmdodCgpO1xyXG4gICAgICAgIGxldCBzdGVwTGVuZ2h0OiBudW1iZXIgPSB0aGlzLl92aWV3LmZpbmRPbmVTdGVwTGVuZ2h0KCk7XHJcblxyXG4gICAgICAgIGxldCBzbGlkZXJCb3JkZXI6IG51bWJlcjtcclxuICAgICAgICBsZXQgZXZlbnRQb3M6IG51bWJlcjtcclxuICAgICAgICBsZXQgdGh1bWJQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZWZ0UG9pbnQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgcmlnaHRQb2ludDogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuZXdWYWw6IG51bWJlcjtcclxuXHJcbiAgICAgICAgLy8g0J/QvtC30LjRhtC40Y8g0LHQtdCz0YPQvdC60LAg0LIgcHgg0LLRi9GH0LjRgdC70Y/QtdGC0YHRjyDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L4g0L3QsNGH0LDQu9CwINGB0LvQsNC50LTQtdGA0LAuXHJcbiAgICAgICAgLy8g0JLQvdCw0YfQsNC70LUgbmV3VmFsINCy0YvRh9C40YHQu9GP0LXRgtGB0Y8g0LrQsNC6INC60L7Qu9C40YfQtdGB0YLQstC+INGI0LDQs9C+0LIg0L7RgiDQvdCw0YfQsNC70LAgKNC+0YIgMCksXHJcbiAgICAgICAgLy8gKNGC0L4g0LXRgdGC0Ywg0LfQvdCw0YfQtdC90LjRjyBtaW4sIG1heCwgcmV2ZXJzZSDQvdC1INC40LzQtdGO0YIg0LfQvdCw0YfQtdC90LjRjykuXHJcblxyXG4gICAgICAgIGlmICggIXZpZXcuZ2V0VmVydGljYWwoKSApIHtcclxuXHJcbiAgICAgICAgICAgIHNsaWRlckJvcmRlciA9IChzbGlkZXJOb2RlLm9mZnNldFdpZHRoIC0gc2xpZGVyTGVuZ2h0KSAvIDI7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gZXZlbnQuY2xpZW50WCB8fCBldmVudC50b3VjaGVzWzBdLmNsaWVudFg7ICAgICAgICAgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBldmVudFBvcyAtIHNsaWRlck5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHNsaWRlckJvcmRlcjtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHNsaWRlckJvcmRlciA9IChzbGlkZXJOb2RlLm9mZnNldEhlaWdodCAtIHNsaWRlckxlbmdodCkgLyAyO1xyXG4gICAgICAgICAgICBldmVudFBvcyA9IGV2ZW50LmNsaWVudFkgfHwgZXZlbnQudG91Y2hlc1swXS5jbGllbnRZOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gZXZlbnRQb3MgLSBzbGlkZXJOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHNsaWRlckJvcmRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5ld1ZhbCA9IE1hdGgucm91bmQodGh1bWJQb3NpdGlvbiAvIHN0ZXBMZW5naHQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxlZnRQb2ludCA9IDA7XHJcbiAgICAgICAgcmlnaHRQb2ludCA9IHNsaWRlckxlbmdodDtcclxuICAgIFxyXG4gICAgICAgIGlmICggdGh1bWJQb3NpdGlvbiA8PSBsZWZ0UG9pbnQpIHtcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGxlZnRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWluVmFsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHRodW1iUG9zaXRpb24gPj0gcmlnaHRQb2ludCkge1xyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gcmlnaHRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWF4VmFsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCx0LXQs9GD0L3QvtC6INC90LUg0LLRi9GI0LXQuyDQt9CwINCz0YDQsNC90LjRhtGLLCDRgdGC0LDQstC40Lwg0LXQs9C+INC90LAg0LHQu9C40LbQsNC50YjQtdC1INC30L3QsNGH0LXQvdC40LUsXHJcbiAgICAgICAgICAgIC8vINC60YDQsNGC0L3QvtC1INGI0LDQs9GDLlxyXG4gICAgICAgICAgICAvLyDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDRjdGC0L7Qs9C+INC/0YDQtdC+0LHRgNCw0LfRg9C10Lwg0LXQs9C+INC00LvRjyDQvNC+0LTQtdC70LguINCV0YHQu9C4IHJldmVyc2UgPT0gdHJ1ZSwg0YLQviA9PSAtMSBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IG5ld1ZhbCAqIHN0ZXBMZW5naHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmID0geCA9PiAoICh4LnRvU3RyaW5nKCkuaW5jbHVkZXMoJy4nKSkgPyAoeC50b1N0cmluZygpLnNwbGl0KCcuJykucG9wKCkubGVuZ3RoKSA6ICgwKSApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG4gPSBmKHN0ZXApICsgZihtaW5WYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSAoIG5ld1ZhbCAqIE1hdGgucG93KDEwLCBuKSAqIHN0ZXAgKiByZXZlcnNlICApIC8gTWF0aC5wb3coMTAsIG4pO1xyXG5cclxuICAgICAgICAgICAgbiA9IE1hdGgubWF4KCBmKHN0ZXApLCBmKG1pblZhbCkgKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKygoK25ld1ZhbCkudG9GaXhlZChuKSk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICgrbW9kZWwuZ2V0TWluVmFsKCkpICsgKCtuZXdWYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSArKCgrbmV3VmFsKS50b0ZpeGVkKG4pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggIW1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgIG1vZGVsLnNldFZhbChuZXdWYWwpO1xyXG4gICAgICAgICAgICBjaGFuZ2luZ1RodW1iID0gdmlldy5nZXRUaHVtYigpO1xyXG4gICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oY2hhbmdpbmdUaHVtYiwgdGh1bWJQb3NpdGlvbik7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICggTWF0aC5hYnMobmV3VmFsIC0gbW9kZWwuZ2V0UmFuZ2UoKVswXSkgPCBNYXRoLmFicyhuZXdWYWwgLSBtb2RlbC5nZXRSYW5nZSgpWzFdKSApIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsLnNldFJhbmdlKFsgbmV3VmFsLCBtb2RlbC5nZXRSYW5nZSgpWzFdIF0pO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdpbmdUaHVtYiA9IHZpZXcuZ2V0VGh1bWIoMSk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oY2hhbmdpbmdUaHVtYiwgdGh1bWJQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb2RlbC5zZXRSYW5nZShbIG1vZGVsLmdldFJhbmdlKClbMF0sIG5ld1ZhbCBdKTtcclxuICAgICAgICAgICAgICAgIGNoYW5naW5nVGh1bWIgPSB2aWV3LmdldFRodW1iKDIpO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKGNoYW5naW5nVGh1bWIsIHRodW1iUG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoKSB8fCB2aWV3LmdldFRvb2x0aXAoMSkgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZShuZXdWYWwpO1xyXG5cclxuICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIGNoYW5naW5nVGh1bWIucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fdG9vbHRpcCcpLCB2YWwsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC90LDQsdC70Y7QtNCw0YLQtdC70YxcclxuICAgICAgICBpZiAoIG1vZGVsLmdldFZhbCgpICE9IG51bGwgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSB2YWw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gW107XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMV0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlKG9wdGlvbnM6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuICAgICAgICBsZXQgdmlldyA9IHRoaXMuX3ZpZXc7XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VUaHVtYlBvc2l0aW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNoYW5nZVRvb2x0aXBWYWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhbmdlU2NhbGVEaXZpc2lvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjaGFuZ2VWYWxUb1JhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNoYW5nZVJhbmdlVG9WYWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgcmVidWlsZFNjYWxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHJlYnVpbGRUb29sdGlwOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIDEuINCc0J7QlNCV0JvQrFxyXG4gICAgICAgIC8vINC10YHQu9C4INC80LXQvdGP0LXRgtGB0Y8g0LrQsNC60L7QuSDQu9C40LHQviDQv9Cw0YDQsNC80LXRgtGAINCyINC80L7QtNC10LvQuCwg0LfQsNC/0YPRgdC60LDQtdC8INC/0YDQvtCy0LXRgNC60Lgg0LzQvtC00LXQu9C4LFxyXG4gICAgICAgIC8vINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0L3QvtCy0YvQtSDQt9C90LDRh9C10L3QuNGPLlxyXG4gICAgICAgIC8vINC30LDQv9C+0LzQuNC90LDQtdC8LCDRh9GC0L4g0L3Rg9C20L3QviDQuNC30LzQtdC90LjRgtGMINC/0L7Qu9C+0LbQtdC90LjRjyDQv9C+0LvQt9GD0L3QutC+0LIsINC30L3QsNGH0LXQvdC40Y8g0LIg0L/QvtC00YHQutCw0LfQutCw0YUsXHJcbiAgICAgICAgLy8g0LTQtdC70LXQvdC40Lkg0YjQutCw0LvRiyAo0LfQvdCw0YfQtdC90LjRjyDQuCBsZWZ0KS4gXHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0LjQt9C80LXQvdC40LvQvtGB0Ywg0LrQvtC70LjRh9C10YHRgtCy0L4g0YjQsNCz0L7QsiAtIHRydWUg0L3QsCDQv9C10YDQtdGA0LjRgdC+0LLQsNGC0Ywg0YjQutCw0LvRgy5cclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C+0LzQtdC90Y/Qu9C+0YHRjCB2YWwg0L3QsCByYW5nZSwg0LjQu9C4INC90LDQvtCx0L7RgNC+0YIgLSB0cnVlINC90LAg0L/QvtGB0YLRgNC+0LjRgtGMISDQsdC10LPRg9C90LrQuC5cclxuXHJcblxyXG4gICAgICAgIGxldCBtb2RlbE9wdGlvbnMgPSBbJ2RhdGFGb3JtYXQnLCAndmFsdWUnLCAnbWluVmFsJywgJ21heFZhbCcsICdzdGVwJywgJ3JldmVyc2UnLCAncmFuZ2UnLCAnY3VzdG9tVmFsdWVzJywgJ3ZhbHVlSW5DdXN0b21WYWx1ZXMnLCAncmFuZ2VJbkN1c3RvbVZhbHVlcyddO1xyXG5cclxuICAgICAgICBsZXQgdGVzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG1vZGVsT3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KGl0ZW0pICkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIHRlc3QgKSB7XHJcbiAgICAgICAgICAgIGxldCBwcmV2TnVtT2ZTdGVwczogbnVtYmVyID0gbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpO1xyXG4gICAgICAgICAgICBsZXQgcHJldk9wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSBtb2RlbC5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdPcHRpb25zOiBJT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGVsLmNoYW5nZShuZXdPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIHZpZXcuc2V0TnVtYmVyT2ZTdGVwcyggbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGVTdGVwKCB2aWV3LmZpbmRWYWxpZFNjYWxlU3RlcCggbW9kZWwsIHZpZXcuZ2V0U2NhbGVTdGVwKCkgKSApO1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlVGh1bWJQb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICggcHJldk51bU9mU3RlcHMgIT0gbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpICkge1xyXG4gICAgICAgICAgICAgICAgcmVidWlsZFNjYWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIHZpZXcuZ2V0UmFuZ2UoKSAmJiAhbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZVJhbmdlVG9WYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVidWlsZFRvb2x0aXAgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggIXZpZXcuZ2V0UmFuZ2UoKSAmJiBtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlVmFsVG9SYW5nZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZWJ1aWxkVG9vbHRpcCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDIuINCS0JjQlFxyXG4gICAgICAgIC8vINCf0LXRgNC10YDQuNGB0L7QstGL0LLQsNC10Lwg0LLQuNC0INC+0YIg0YHQsNC80YvRhSDQs9C70L7QsdCw0LvRjNC90YvRhSDQuNC30LzQtdC90LXQvdC40Lkg0Log0YHQsNC80YvQvCDQvdC10LfQvdCw0YfQuNGC0LXQu9GM0L3Ri9C8LlxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIDIuMSDQodCw0LzQvtC1INCx0L7Qu9GM0YjQvtC1INC40LfQvNC10L3QtdC90LjQtSAtINGN0YLQviDQstC40LQg0L7RgdC90L7QstGLINGI0LrQsNC70YsuXHJcbiAgICAgICAgLy8g0JXQtSDQuNC30LzQtdC90LXQvdC40LUg0LLRi9C30YvQstCw0LXRgjog0LjQt9C80LXQvdC40YLRjCDQv9C+0LvQvtC20LXQvdC40Y8g0LHQtdCz0YPQvdC60L7Qsiwg0LTQtdC70LXQvdC40Lkg0YjQutCw0LvRi1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3ZlcnRpY2FsJykgfHwgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnbGVuZ3RoJykgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlU2xpZGVyQmFzZShvcHRpb25zKTtcclxuICAgICAgICAgICAgY2hhbmdlVGh1bWJQb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMi4yINCc0LXQvdGP0LXQvCDQutC+0LvQuNGH0LXRgdGC0LLQviDQsdC10LPRg9C90LrQvtCyLCDQtdGB0LvQuCDQvdGD0LbQvdC+XHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0YLQsNC60L7QtSDQuNC30LzQtdC90LXQvdC40LUg0LHRi9C70L4sINC30L3QsNGH0LjRgiDQstC10LfQtNC1LFxyXG4gICAgICAgIC8vINCz0LTQtSDQvdCw0LTQviwg0YPQttC1INGB0YLQvtC40YIgdHJ1ZVxyXG5cclxuICAgICAgICBpZiAoIGNoYW5nZVJhbmdlVG9WYWwgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlUmFuZ2VUb1ZhbChtb2RlbCk7XHJcblxyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKCkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Eb3duKTtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigpLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIGNoYW5nZVZhbFRvUmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlVmFsVG9SYW5nZShtb2RlbCk7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMSkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Eb3duKTtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigyKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDEpLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDIpLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgIH0gICBcclxuXHJcbiAgICAgICAgLy8gMi4zINCo0LrQsNC70LAuINCj0LTQsNC70Y/QtdC8LCDRgdGC0YDQvtC40Lwg0LjQu9C4INC/0LXRgNC10YHRgtGA0LDQuNCy0LDQtdC8LiDQmNC30LzQtdC90Y/QtdC8INC00LXQu9C10L3QuNGPLlxyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NjYWxlU3RlcCcpICYmIG9wdGlvbnMuc2NhbGVTdGVwICE9IHZpZXcuZ2V0U2NhbGVTdGVwKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGVTdGVwKCB2aWV3LmZpbmRWYWxpZFNjYWxlU3RlcChtb2RlbCwgb3B0aW9ucy5zY2FsZVN0ZXApICk7XHJcbiAgICAgICAgICAgIHJlYnVpbGRTY2FsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NjYWxlTWFzaycpICYmIG9wdGlvbnMuc2NhbGVNYXNrICE9IHZpZXcuZ2V0U2NhbGVNYXNrKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGVNYXNrKCBvcHRpb25zLnNjYWxlTWFzayApO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0YPQtNCw0LvRj9C10LxcclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NjYWxlJykgJiYgb3B0aW9ucy5zY2FsZSA9PSBmYWxzZSAmJiB2aWV3LmdldFNjYWxlKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGUoIHZpZXcucmVtb3ZlTm9kZSggdmlldy5nZXRTY2FsZSgpICkgKTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZWJ1aWxkU2NhbGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0YHRgtGA0L7QuNC8XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCdzY2FsZScpICYmIG9wdGlvbnMuc2NhbGUgPT0gdHJ1ZSAmJiAhdmlldy5nZXRTY2FsZSgpICkge1xyXG4gICAgICAgICAgICBsZXQgc2NhbGU6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgICAgICBzY2FsZSA9IHZpZXcuYnVpbGRTY2FsZSh2aWV3LmdldFNsaWRlcigpLCB2aWV3LmdldFNjYWxlU3RlcCgpLCBtb2RlbCwgdmlldy5nZXRTY2FsZU1hc2soKSApO1xyXG4gICAgICAgICAgICB2aWV3LnNldFNjYWxlKHNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgIHJlYnVpbGRTY2FsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC/0LXRgNC10YHRgtGA0LDQuNCy0LDQtdC8XHJcbiAgICAgICAgaWYgKCByZWJ1aWxkU2NhbGUgJiYgdmlldy5nZXRTY2FsZSgpICkge1xyXG4gICAgICAgICAgICB2aWV3LnJlYnVpbGRTY2FsZShtb2RlbCk7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQuNC30LzQtdC90Y/QtdC8INC00LXQu9C10L3QuNGPLiDQt9C90LDRh9C10L3QuNC1INC4IGxlZnRcclxuICAgICAgICBpZiAoIGNoYW5nZVNjYWxlRGl2aXNpb24gJiYgdmlldy5nZXRTY2FsZSgpICkge1xyXG4gICAgICAgICAgICB2aWV3LmNoYW5nZVNjYWxlRGl2aXNpb24obW9kZWwpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIDIuNCDQn9C+0LTRgdC60LDQt9C60LguINCj0LTQsNC70Y/QtdC8LiDQodGC0YDQvtC40LwuINCc0LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPXHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgndG9vbHRpcE1hc2snKSAmJiBvcHRpb25zLnRvb2x0aXBNYXNrICE9IHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApIHtcclxuICAgICAgICAgICAgdmlldy5zZXRUb29sdGlwTWFzayggb3B0aW9ucy50b29sdGlwTWFzayApO1xyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCAhdmlldy5nZXRUb29sdGlwKCkgJiYgIXZpZXcuZ2V0VG9vbHRpcCgxKSAmJiAhb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgndG9vbHRpcCcpICkge1xyXG4gICAgICAgICAgICByZWJ1aWxkVG9vbHRpcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINGD0LTQsNC70Y/QtdC8XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnRvb2x0aXAgPT0gZmFsc2UgfHwgcmVidWlsZFRvb2x0aXAgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyDQv9C+0YfQtdC80YMg0LIg0LTRgNGD0LPQvtC8INC/0L7RgNGP0LTQutC1INC90LUg0YDQsNCx0L7RgtCw0LXRglxyXG4gICAgICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgyKSApIHZpZXcuc2V0VG9vbHRpcCggdmlldy5yZW1vdmVOb2RlKHZpZXcuZ2V0VG9vbHRpcCgyKSksIDIgKTtcclxuICAgICAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoMSkgKSB2aWV3LnNldFRvb2x0aXAoIHZpZXcucmVtb3ZlTm9kZSh2aWV3LmdldFRvb2x0aXAoMSkpLCAxICk7XHJcbiAgICAgICAgICAgIGlmICggdmlldy5nZXRUb29sdGlwKCkgKSB2aWV3LnNldFRvb2x0aXAoIHZpZXcucmVtb3ZlTm9kZSh2aWV3LmdldFRvb2x0aXAoMCkpLCAwICk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCA9PSBmYWxzZSApIHtcclxuICAgICAgICAgICAgICAgIHJlYnVpbGRUb29sdGlwID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2hhbmdlVG9vbHRpcFZhbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQv9C10YDQtdGB0YLRgNCw0LjQstCw0LXQvFxyXG4gICAgICAgIGlmICggb3B0aW9ucy50b29sdGlwIHx8IHJlYnVpbGRUb29sdGlwICkge1xyXG4gICAgICAgICAgICB2aWV3LmJ1aWxkVmFsaWRUb29sdGlwcyhtb2RlbCk7XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0LzQtdC90Y/QtdC8INC30L3QsNGH0LXQvdC40Y9cclxuICAgICAgICBpZiAoIGNoYW5nZVRvb2x0aXBWYWwgJiYgKHZpZXcuZ2V0VG9vbHRpcCgpIHx8IHZpZXcuZ2V0VG9vbHRpcCgxKSkgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW1vZGVsLmdldFJhbmdlKCkpIHsgXHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VmFsVG9Ub29sdGlwKCB2aWV3LmdldFRvb2x0aXAoKSwgdmFsIGFzIHN0cmluZywgdmlldy5nZXRUb29sdGlwTWFzaygpICk7ICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzBdICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggdmlldy5nZXRUb29sdGlwKDEpLCB2YWwgYXMgc3RyaW5nLCB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKTsgXHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVsxXSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIHZpZXcuZ2V0VG9vbHRpcCgyKSwgdmFsIGFzIHN0cmluZywgdmlldy5nZXRUb29sdGlwTWFzaygpICk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuXHJcblxyXG4gICAgICAgIC8vIDIuNSDQn9C+0LvQvtC20LXQvdC40Y8g0LHQtdCz0YPQvdC60L7QslxyXG5cclxuICAgICAgICBpZiAoIGNoYW5nZVRodW1iUG9zaXRpb24gKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3M6IG51bWJlcjtcclxuXHJcbiAgICAgICAgICAgIGlmICggIW1vZGVsLmdldFJhbmdlKCkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcG9zID0gdmlldy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRWYWwoKSksIG1vZGVsLmdldE51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKCB2aWV3LmdldFRodW1iKCksIHBvcyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgeyAgICAgXHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHBvcyA9IHZpZXcuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVswXSksIG1vZGVsLmdldE51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKCB2aWV3LmdldFRodW1iKDEpLCBwb3MpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBwb3MgPSB2aWV3LmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMV0pLCBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbiggdmlldy5nZXRUaHVtYigyKSwgcG9zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g0L3QsNCx0LvRjtC00LDRgtC10LvRjFxyXG4gICAgICAgICAgICAvLyDQstGL0LfRi9Cy0LDQtdC8INC10YHQu9C4INCx0YvQu9C4INC40LfQvNC10L3QtdC90LjRjyDRgdCy0Y/Qt9Cw0L3QvdGL0LUg0YEg0LHQtdCz0YPQvdC60LDQvNC4XHJcbiAgICAgICAgICAgIC8vINC90LUg0LfQsNGC0YDQvtC90LXRgiwg0L3QsNC/0YDQuNC80LXRgCwg0LTQvtCx0LDQstC70LXQvdC40LUg0YjQutCw0LvRi1xyXG4gICAgICAgICAgICBpZiAoIG1vZGVsLmdldFZhbCgpICE9IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRWYWwoKSApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSB2YWw7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzBdICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFswXSA9IHZhbDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzFdID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcmVzZW50ZXIiLCJpbXBvcnQgSU9wdGlvbnMgZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCBNb2RlbCwge0lNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCB7IHJ1bkluTmV3Q29udGV4dCB9IGZyb20gJ3ZtJztcclxuXHJcbmludGVyZmFjZSBJVmlldyB7XHJcblxyXG4gICAgLy8g0LPQtdGC0YLQtdGA0Ysg0Lgg0YHQtdGC0YLQtdGA0YtcclxuICAgIGdldExlbmdodCgpOiBudW1iZXI7XHJcbiAgICBnZXRWZXJ0aWNhbCgpOiBib29sZWFuO1xyXG4gICAgZ2V0UmFuZ2UoKTogYm9vbGVhbjtcclxuICAgIGdldFRvb2x0aXBNYXNrKCk6IHN0cmluZztcclxuICAgIHNldFRvb2x0aXBNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZVN0ZXAoKTogbnVtYmVyO1xyXG4gICAgc2V0U2NhbGVTdGVwKHN0ZXA6IG51bWJlcik6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZU1hc2soKTogc3RyaW5nO1xyXG4gICAgc2V0U2NhbGVNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBnZXROdW1iZXJPZlN0ZXBzKCk6IG51bWJlcjtcclxuICAgIHNldE51bWJlck9mU3RlcHMobnVtOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIGdldFNsaWRlcigpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFRodW1iKG51bT86IG51bWJlcik6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VG9vbHRpcChudW0/OiBudW1iZXIpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHNldFRvb2x0aXAodG9vbHRpcDogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQsIG51bT86IG51bWJlcik6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZSgpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHNldFNjYWxlKHNjYWxlOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCk6IHZvaWQ7XHJcblxyXG5cclxuICAgIC8vINC80LXRgtC+0LTRiyDQtNC70Y8g0YHQvtC30LTQsNC90LjRjyDQuCDQuNC30LzQtdC90LXQvdC40Y8gdmlld1xyXG4gICAgY2hhbmdlU2xpZGVyQmFzZSAob3B0aW9uczogYW55KTogdm9pZDtcclxuICAgIGNoYW5nZVJhbmdlVG9WYWwgKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgY2hhbmdlVmFsVG9SYW5nZSAobW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcbiAgICBidWlsZFZhbGlkVG9vbHRpcHMobW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcbiAgICBidWlsZFNjYWxlKHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50LCBzdGVwOiBudW1iZXIsIG1vZGVsOiBJTW9kZWwsIG1hc2s6IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcmVidWlsZFNjYWxlKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgY2hhbmdlU2NhbGVEaXZpc2lvbihtb2RlbDogSU1vZGVsKTogdm9pZDtcclxuICAgIGNoYW5nZUxpbmUoKTogdm9pZDtcclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBzZXRUaHVtYlBvc2l0aW9uKHRodW1iTm9kZTogSFRNTERpdkVsZW1lbnQsIHRodW1iUG9zaXRpb246IG51bWJlcik6IHZvaWQ7XHJcbiAgICBzZXRWYWxUb1Rvb2x0aXAodG9vbHRpcE5vZGU6IEhUTUxEaXZFbGVtZW50LCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGUsIG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBmaW5kVGh1bWJQb3NpdGlvbihuZXdTdGVwLCBudW1PZlN0ZXBzKTogbnVtYmVyO1xyXG4gICAgZmluZE9uZVN0ZXBMZW5naHQoKTogbnVtYmVyO1xyXG4gICAgcmVtb3ZlTm9kZShub2RlOiBIVE1MRGl2RWxlbWVudCk6IHVuZGVmaW5lZDtcclxuICAgIGZpbmRWYWxpZFNjYWxlU3RlcChtb2RlbDogSU1vZGVsLCBzdGVwOiBudW1iZXIpOiBudW1iZXI7ICBcclxufVxyXG5cclxuY2xhc3MgVmlldyBpbXBsZW1lbnRzIElWaWV3IHtcclxuXHJcbiAgICBwcml2YXRlIF9sZW5naHQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3ZlcnRpY2FsOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfcmFuZ2U6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF90b29sdGlwTWFzazogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGVNYXNrPzogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGVTdGVwPzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbnVtYmVyT2ZTdGVwczogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX3NsaWRlcjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF90aHVtYj86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdGh1bWJMZWZ0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90aHVtYlJpZ2h0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9saW5lOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXA/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBMZWZ0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwUmlnaHQ/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3NjYWxlPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbDogSU1vZGVsLCBvcHRpb25zOiBJT3B0aW9ucywgc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fc2xpZGVyID0gc2xpZGVyTm9kZTtcclxuICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyJyk7XHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBtb2RlbC5nZXRSYW5nZSgpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX251bWJlck9mU3RlcHMgPSBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCk7XHJcbiAgICAgICAgdGhpcy5fbGVuZ2h0ID0gdGhpcy5maW5kVmFsaWRMZW5ndGgob3B0aW9ucy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSB0aGlzLl9sZW5naHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaG9yaXpvbnRhbCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IHRoaXMuX2xlbmdodDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl92ZXJ0aWNhbCcpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbGluZSA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fbGluZScpO1xyXG5cclxuICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fcmFuZ2UgKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl90aHVtYiA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWInKTtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRWYWwoKSksIG1vZGVsLmdldE51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iLCBwb3MpO1xyXG4gICAgICAgIH0gZWxzZSB7ICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iTGVmdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWInLCAnc2xpZGVyX190aHVtYl9sZWZ0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iUmlnaHQgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iJywgJ3NsaWRlcl9fdGh1bWJfcmlnaHQnKTtcclxuXHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVswXSksIG1vZGVsLmdldE51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iTGVmdCwgcG9zKTtcclxuXHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVsxXSksIG1vZGVsLmdldE51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iUmlnaHQsIHBvcyk7XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgLy8g0LzQsNGB0LrQsCDQtNC70Y8g0L/QvtC00YHQutCw0LfQvtC6XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0LXQtSDQvdC10YIsINC/0YDQuNC80LXQvdGP0LXRgtGB0Y8g0L7QsdGL0YfQvdCw0Y8sINC60L7RgtC+0YDQsNGPINC/0L4g0LTQtdGE0L7Qu9GC0YMg0LLQvtC30LLRgNCw0YnQsNC10YIg0L/RgNC+0YHRgtC+IHZhbFxyXG4gICAgICAgIC8vICjQsiDRhNC+0YDQvNCw0YLQtSDQtNCw0YIg0LLQtdGA0L3QtdGC0YHRjyDQvtCx0YrQtdC60YIg0LTQsNGC0LApXHJcbiAgICAgICAgdGhpcy5fdG9vbHRpcE1hc2sgPSBvcHRpb25zLnRvb2x0aXBNYXNrO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCApIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFZhbGlkVG9vbHRpcHMobW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zY2FsZU1hc2sgPSBvcHRpb25zLnNjYWxlTWFzaztcclxuXHJcbiAgICAgICAgbGV0IHN0ZXA6IG51bWJlcjtcclxuICAgICAgICBpZiAoIG9wdGlvbnMuc2NhbGVTdGVwICkge1xyXG4gICAgICAgICAgICBzdGVwID0gdGhpcy5maW5kVmFsaWRTY2FsZVN0ZXAobW9kZWwsIG9wdGlvbnMuc2NhbGVTdGVwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdGVwID0gbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zY2FsZVN0ZXAgPSBzdGVwO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnNjYWxlICkge1xyXG4gICAgICAgICAgICB0aGlzLl9zY2FsZSA9IHRoaXMuYnVpbGRTY2FsZSh0aGlzLl9zbGlkZXIsIHN0ZXAsIG1vZGVsLCB0aGlzLl9zY2FsZU1hc2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDQs9C10YLRgtC10YDRiyDQuCDRgdC10YLRgtC10YDRi1xyXG4gICAgZ2V0TGVuZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zbGlkZXIuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlci5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuICAgIGdldFZlcnRpY2FsKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbDtcclxuICAgIH1cclxuICAgIGdldFJhbmdlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYW5nZTtcclxuICAgIH1cclxuICAgIGdldFRvb2x0aXBNYXNrKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXBNYXNrO1xyXG4gICAgfVxyXG4gICAgc2V0VG9vbHRpcE1hc2sobWFzazogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdG9vbHRpcE1hc2sgPSBtYXNrO1xyXG4gICAgfVxyXG4gICAgZ2V0U2NhbGVTdGVwKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlU3RlcDtcclxuICAgIH1cclxuICAgIHNldFNjYWxlU3RlcChzdGVwOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zY2FsZVN0ZXAgPSBzdGVwO1xyXG4gICAgfVxyXG4gICAgZ2V0U2NhbGVNYXNrKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlTWFzaztcclxuICAgIH1cclxuICAgIHNldFNjYWxlTWFzayhtYXNrOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zY2FsZU1hc2sgPSBtYXNrO1xyXG4gICAgfVxyXG4gICAgZ2V0TnVtYmVyT2ZTdGVwcygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9udW1iZXJPZlN0ZXBzO1xyXG4gICAgfTtcclxuICAgIHNldE51bWJlck9mU3RlcHMobnVtOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9udW1iZXJPZlN0ZXBzID0gbnVtO1xyXG4gICAgfTtcclxuICAgIFxyXG5cclxuXHJcbiAgICBnZXRTbGlkZXIoKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zbGlkZXI7XHJcbiAgICB9XHJcbiAgICBnZXRUaHVtYihudW06IG51bWJlciA9IDApOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgaWYgKCBudW0gPT0gMCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RodW1iO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIG51bSA9PSAxICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGh1bWJMZWZ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIG51bSA9PSAyICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGh1bWJSaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RodW1iO1xyXG4gICAgfVxyXG4gICAgZ2V0VG9vbHRpcChudW06IG51bWJlciA9IDApOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwIHx8IHRoaXMuX3Rvb2x0aXBMZWZ0ICkge1xyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXAgJiYgbnVtID09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXBMZWZ0ICYmIG51bSA9PSAxICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXBMZWZ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcFJpZ2h0ICYmIG51bSA9PSAyICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXBSaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0VG9vbHRpcCh0b29sdGlwOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCwgbnVtOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgaWYgKCBudW0gPT0gMCApIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IHRvb2x0aXA7XHJcbiAgICAgICAgfSBlbHNlIGlmICggbnVtID09IDEgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBMZWZ0ID0gdG9vbHRpcDtcclxuICAgICAgICB9IGVsc2UgaWYgKCBudW0gPT0gMiApIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFJpZ2h0ID0gdG9vbHRpcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRTY2FsZSgpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xyXG4gICAgfVxyXG4gICAgc2V0U2NhbGUoc2NhbGU6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g0LzQtdGC0L7QtNGLINC00LvRjyDRgdC+0LfQtNCw0L3QuNGPINC4INC40LfQvNC10L3QtdC90LjRjyB2aWV3XHJcblxyXG4gICAgY2hhbmdlU2xpZGVyQmFzZSAob3B0aW9uczogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBsZW5naHRDaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vINGI0LjRgNC40L3QsCAvINC00LvQuNC90LBcclxuICAgICAgICBpZiAoIG9wdGlvbnMubGVuZ3RoICYmIHRoaXMuX2xlbmdodCAhPSBvcHRpb25zLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgdGhpcy5fbGVuZ2h0ID0gb3B0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxlbmdodENoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0L7RgNC40LXQvdGC0LDRhtC40Y9cclxuICAgICAgICBpZiAoIG9wdGlvbnMudmVydGljYWwgJiYgIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfaG9yaXpvbnRhbCcpXHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfdmVydGljYWwnKTtcclxuXHJcbiAgICAgICAgICAgIGxlbmdodENoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIG9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlICYmIHRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX3ZlcnRpY2FsJylcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XHJcblxyXG4gICAgICAgICAgICBsZW5naHRDaGFuZ2VkID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxlbmdodENoYW5nZWQgJiYgIXRoaXMuX3ZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS5oZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSB0aGlzLl9sZW5naHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsZW5naHRDaGFuZ2VkICYmIHRoaXMuX3ZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS53aWR0aCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS5oZWlnaHQgPSB0aGlzLl9sZW5naHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVJhbmdlVG9WYWwgKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fdGh1bWIgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iJyk7XHJcbiAgICAgICAgdGhpcy5fdGh1bWJMZWZ0ID0gdGhpcy5yZW1vdmVOb2RlKHRoaXMuX3RodW1iTGVmdCk7XHJcbiAgICAgICAgdGhpcy5fdGh1bWJSaWdodCA9IHRoaXMucmVtb3ZlTm9kZSh0aGlzLl90aHVtYlJpZ2h0KTtcclxuXHJcbiAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRWYWwoKSksIG1vZGVsLmdldE51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy5fdGh1bWIsIHBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlVmFsVG9SYW5nZSAobW9kZWw6IElNb2RlbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwb3M6IG51bWJlcjtcclxuXHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLl90aHVtYiA9IHRoaXMucmVtb3ZlTm9kZSh0aGlzLl90aHVtYik7XHJcbiAgICAgICAgdGhpcy5fdGh1bWJMZWZ0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYicsICdzbGlkZXJfX3RodW1iX2xlZnQnKTsgXHJcbiAgICAgICAgdGhpcy5fdGh1bWJSaWdodCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWInLCAnc2xpZGVyX190aHVtYl9yaWdodCcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVswXSksIG1vZGVsLmdldE51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy5fdGh1bWJMZWZ0LCBwb3MpO1xyXG5cclxuICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMV0pLCBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iUmlnaHQsIHBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRWYWxpZFRvb2x0aXBzKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3JhbmdlKSB7IFxyXG5cclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwICkgdGhpcy5fdG9vbHRpcCA9IHRoaXMucmVtb3ZlTm9kZSggdGhpcy5fdG9vbHRpcCApO1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl90aHVtYiwgJ3NsaWRlcl9fdG9vbHRpcCcpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbFRvVG9vbHRpcCggdGhpcy5fdG9vbHRpcCwgdmFsLCB0aGlzLl90b29sdGlwTWFzayApOyAgIFxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXBMZWZ0ICkgdGhpcy5fdG9vbHRpcExlZnQgPSB0aGlzLnJlbW92ZU5vZGUoIHRoaXMuX3Rvb2x0aXBMZWZ0ICk7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwTGVmdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3RodW1iTGVmdCwgJ3NsaWRlcl9fdG9vbHRpcF9sZWZ0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsVG9Ub29sdGlwKCB0aGlzLl90b29sdGlwTGVmdCwgdmFsLCB0aGlzLl90b29sdGlwTWFzayApOyAgXHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXBSaWdodCApIHRoaXMuX3Rvb2x0aXBSaWdodCA9IHRoaXMucmVtb3ZlTm9kZSggdGhpcy5fdG9vbHRpcFJpZ2h0ICk7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVsxXSApO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwUmlnaHQgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl90aHVtYlJpZ2h0LCAnc2xpZGVyX190b29sdGlwX3JpZ2h0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsVG9Ub29sdGlwKCB0aGlzLl90b29sdGlwUmlnaHQsIHZhbCwgdGhpcy5fdG9vbHRpcE1hc2sgKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkU2NhbGUoc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQsIHN0ZXA6IG51bWJlciwgbW9kZWw6IElNb2RlbCwgbWFzazogc3RyaW5nKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGxldCBzY2FsZTogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBsZXQgZGl2aXNpb246IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcblxyXG4gICAgICAgIHNjYWxlLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUnKTtcclxuICAgICAgICBzbGlkZXJOb2RlLnByZXBlbmQoc2NhbGUpO1xyXG5cclxuICAgICAgICAvLyDQvNC90L7QttC40YLQtdC70YwuINCy0L4g0YHQutC+0LvRjNC60L4g0YDQsNC3INGI0LDQsyDQsiDQvNC+0LTQtdC70LUg0LzQtdC90YzRiNC1INGI0LDQs9CwINGI0LrQsNC70YtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZmluZERlY2ltYWxQbGFjZXMoc3RlcCksIHRoaXMuZmluZERlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG4gICAgICAgIGxldCBtdWx0OiBudW1iZXIgPSBzdGVwIC8gbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIG11bHQgPSArKCttdWx0KS50b0ZpeGVkKG4pO1xyXG4gICAgICAgIG11bHQgPSBNYXRoLmFicyhtdWx0KTsgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPD0gbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpOyBpID0gaSArIG11bHQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGkgKyBtdWx0INCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC90LAg0LrQsNC60L7QuSDRiNCw0LMg0LzQvtC00LXQu9C4INC/0L7Qv9Cw0LTQsNC10YIg0YjQsNCzINGI0LrQsNC70YtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlQnlTdGVwKGkpO1xyXG5cclxuICAgICAgICAgICAgZGl2aXNpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2aXNpb24uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpO1xyXG4gICAgICAgICAgICBkaXZpc2lvbi5pbm5lckhUTUwgPSAnPHNwYW4+JyArICBldmFsKG1hc2spICsgJzwvc3Bhbj4nO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUubGVmdCA9IHRoaXMuZmluZE9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUudG9wID0gdGhpcy5maW5kT25lU3RlcExlbmdodCgpICogaSArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNjYWxlLmFwcGVuZChkaXZpc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICByZWJ1aWxkU2NhbGUobW9kZWw6IElNb2RlbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzY2FsZTogSFRNTERpdkVsZW1lbnQgPSB0aGlzLmdldFNjYWxlKCk7XHJcbiAgICAgICAgbGV0IHByZXZOdW1PZlN0ZXBzOiBudW1iZXIgPSBzY2FsZS5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgbGV0IG5ld051bU9mU3RlcHM6IG51bWJlcjtcclxuICAgICAgICBsZXQgZGl2aXNpb246IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vINC80L3QvtC20LjRgtC10LvRjC4g0LLQviDRgdC60L7Qu9GM0LrQviDRgNCw0Lcg0YjQsNCzINCyINC80L7QtNC10LvQtSDQvNC10L3RjNGI0LUg0YjQsNCz0LAg0YjQutCw0LvRi1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5maW5kRGVjaW1hbFBsYWNlcyh0aGlzLl9zY2FsZVN0ZXApLCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKG1vZGVsLmdldFN0ZXAoKSkgKTtcclxuICAgICAgICBsZXQgbXVsdDogbnVtYmVyID0gdGhpcy5fc2NhbGVTdGVwIC8gbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIG11bHQgPSArbXVsdC50b0ZpeGVkKG4pO1xyXG4gICAgICAgIG11bHQgPSBNYXRoLmFicyhtdWx0KTtcclxuXHJcbiAgICAgICAgbmV3TnVtT2ZTdGVwcyA9IG1vZGVsLmdldE51bWJlck9mU3RlcHMoKSAvIG11bHQ7XHJcblxyXG4gICAgICAgIGlmICggcHJldk51bU9mU3RlcHMgPiBuZXdOdW1PZlN0ZXBzICkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgKHByZXZOdW1PZlN0ZXBzIC0gbmV3TnVtT2ZTdGVwcyk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUubGFzdENoaWxkLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggcHJldk51bU9mU3RlcHMgPCBuZXdOdW1PZlN0ZXBzICkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgKG5ld051bU9mU3RlcHMgLSBwcmV2TnVtT2ZTdGVwcyk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUtZGl2aXNpb24nKTtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLmlubmVySFRNTCA9ICc8c3Bhbj48L3NwYW4+JztcclxuICAgICAgICAgICAgICAgIHNjYWxlLmFwcGVuZChkaXZpc2lvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlU2NhbGVEaXZpc2lvbihtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGRpdmlzaW9uOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgIGxldCBtYXNrOiBzdHJpbmcgPSB0aGlzLl9zY2FsZU1hc2s7XHJcblxyXG4gICAgICAgIC8vINC80L3QvtC20LjRgtC10LvRjC4g0LLQviDRgdC60L7Qu9GM0LrQviDRgNCw0Lcg0YjQsNCzINCyINC80L7QtNC10LvQtSDQvNC10L3RjNGI0LUg0YjQsNCz0LAg0YjQutCw0LvRi1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5maW5kRGVjaW1hbFBsYWNlcyh0aGlzLl9zY2FsZVN0ZXApLCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKG1vZGVsLmdldFN0ZXAoKSkgKTtcclxuICAgICAgICBsZXQgbXVsdDogbnVtYmVyID0gdGhpcy5fc2NhbGVTdGVwIC8gbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIG11bHQgPSArbXVsdC50b0ZpeGVkKG4pO1xyXG4gICAgICAgIG11bHQgPSBNYXRoLmFicyhtdWx0KTsgICBcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDw9IG1vZGVsLmdldE51bWJlck9mU3RlcHMoKTsgaSA9IGkgKyBtdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBpICsgbXVsdCDQstC+0LfQstGA0LDRidCw0LXRgiDQvdCwINC60LDQutC+0Lkg0YjQsNCzINC80L7QtNC10LvQuCDQv9C+0L/QsNC00LDQtdGCINGI0LDQsyDRiNC60LDQu9GLXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZUJ5U3RlcChpKTtcclxuXHJcbiAgICAgICAgICAgIGRpdmlzaW9uID0gdGhpcy5nZXRTY2FsZSgpLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXJfX3NjYWxlLWRpdmlzaW9uJylbaSAvIG11bHRdIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgICAgICBkaXZpc2lvbi5xdWVyeVNlbGVjdG9yKCdzcGFuJykudGV4dENvbnRlbnQgPSAnJyArIGV2YWwobWFzayk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3ZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS50b3AgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUubGVmdCA9IHRoaXMuZmluZE9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUubGVmdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS50b3AgPSB0aGlzLmZpbmRPbmVTdGVwTGVuZ2h0KCkgKiBpICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VMaW5lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xpbmUuc3R5bGUubGVmdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGluZS5zdHlsZS50b3AgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xpbmUuc3R5bGUud2lkdGggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xpbmUuc3R5bGUuaGVpZ2h0ID0gbnVsbDsgIFxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3JhbmdlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3ZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmhlaWdodCA9ICcxMDAlJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS50b3AgPSAnMHB4J1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5sZWZ0ID0gJzBweCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLndpZHRoID0gcGFyc2VJbnQodGhpcy5fdGh1bWIuc3R5bGUubGVmdCkgKyB0aGlzLl90aHVtYi5jbGllbnRXaWR0aC8yICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUud2lkdGggPSAnMTAwJSdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUubGVmdCA9ICcwcHgnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLnRvcCA9ICcwcHgnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5oZWlnaHQgPSBwYXJzZUludCh0aGlzLl90aHVtYi5zdHlsZS50b3ApICsgdGhpcy5fdGh1bWIuY2xpZW50SGVpZ2h0LzIgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3ZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmhlaWdodCA9ICcxMDAlJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS50b3AgPSAnMHB4J1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5sZWZ0ID0gcGFyc2VJbnQodGhpcy5fdGh1bWJMZWZ0LnN0eWxlLmxlZnQpICsgdGhpcy5fdGh1bWJMZWZ0LmNsaWVudFdpZHRoLzIgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS53aWR0aCA9ICggcGFyc2VJbnQodGhpcy5fdGh1bWJSaWdodC5zdHlsZS5sZWZ0KSAtIHBhcnNlSW50KHRoaXMuX3RodW1iTGVmdC5zdHlsZS5sZWZ0KSApICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUud2lkdGggPSAnMTAwJSdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUubGVmdCA9ICcwcHgnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLnRvcCA9IHBhcnNlSW50KHRoaXMuX3RodW1iTGVmdC5zdHlsZS50b3ApICArIHRoaXMuX3RodW1iTGVmdC5jbGllbnRIZWlnaHQvMiArICdweCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmhlaWdodCA9ICggcGFyc2VJbnQodGhpcy5fdGh1bWJSaWdodC5zdHlsZS50b3ApIC0gcGFyc2VJbnQodGhpcy5fdGh1bWJMZWZ0LnN0eWxlLnRvcCkgKSArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vINCy0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90YvQtSDQvNC10YLQvtC00YtcclxuXHJcbiAgICBzZXRUaHVtYlBvc2l0aW9uKHRodW1iTm9kZTogSFRNTERpdkVsZW1lbnQsIHRodW1iUG9zaXRpb246IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICggIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUudG9wID0gbnVsbDtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLmxlZnQgPSB0aHVtYlBvc2l0aW9uIC0gdGh1bWJOb2RlLm9mZnNldFdpZHRoLzIgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS5sZWZ0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLnRvcCA9IHRodW1iUG9zaXRpb24gLSB0aHVtYk5vZGUub2Zmc2V0V2lkdGgvMiArICdweCc7ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0L7QsdCwINCx0LXQs9GD0L3QutCwINGB0L/RgNCw0LLQsCwg0LTQvtCx0LDQstC70LXQvCB6IGluZGV4INC00LvRjyDQvdC40LbQvdC10LPQvlxyXG4gICAgICAgIGlmICggdGhpcy5nZXRUaHVtYigxKSApIHtcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoICh0aGlzLmdldFRodW1iKDEpLnN0eWxlLmxlZnQgPT0gKHRoaXMuZ2V0TGVuZ2h0KCkgLSB0aGlzLmdldFRodW1iKDEpLmNsaWVudFdpZHRoLzIpICsgJ3B4JykgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUaHVtYigxKS5zdHlsZS56SW5kZXggPSAnMTAwJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUaHVtYigxKS5zdHlsZS56SW5kZXggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoICh0aGlzLmdldFRodW1iKDEpLnN0eWxlLnRvcCA9PSAodGhpcy5nZXRMZW5naHQoKSAtIHRoaXMuZ2V0VGh1bWIoMSkuY2xpZW50SGVpZ2h0LzIpICsgJ3B4JykgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUaHVtYigxKS5zdHlsZS56SW5kZXggPSAnMTAwJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUaHVtYigxKS5zdHlsZS56SW5kZXggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgIFxyXG4gICAgICAgICAgICB9ICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNoYW5nZUxpbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWxUb1Rvb2x0aXAodG9vbHRpcE5vZGU6IEhUTUxEaXZFbGVtZW50LCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGUsIG1hc2s6IHN0cmluZyA9ICd2YWwnKTogdm9pZCB7XHJcbiAgICAgICAgdG9vbHRpcE5vZGUudGV4dENvbnRlbnQgPSBldmFsKG1hc2spO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRUaHVtYlBvc2l0aW9uKG5ld1N0ZXAsIG51bU9mU3RlcHMpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldExlbmdodCgpIC8gbnVtT2ZTdGVwcyAqIG5ld1N0ZXA7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZE9uZVN0ZXBMZW5naHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGVuZ2h0KCkgLyB0aGlzLl9udW1iZXJPZlN0ZXBzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZU5vZGUobm9kZTogSFRNTERpdkVsZW1lbnQpOiB1bmRlZmluZWQge1xyXG4gICAgICAgIG5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kVmFsaWRTY2FsZVN0ZXAobW9kZWw6IElNb2RlbCwgc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgbGV0IHN0ZXBJc1ZhbGlkOiBib29sZWFuO1xyXG4gICAgICAgIGxldCB0ZXN0OiBudW1iZXJcclxuXHJcbiAgICAgICAgLy8g0L7QutGA0YPQs9C70Y/QtdC8LCDRh9GC0L7QsdGLINC40LfQsdC10LbQsNGC0Ywg0L/RgNC+0LHQu9C10Lwg0L/RgNC4INCy0YvRh9C40YHQu9C10L3QuNGP0YUg0YEg0L/Qu9Cw0LLQsNGO0YnQtdC5INGC0L7Rh9C60L7QuVxyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5maW5kRGVjaW1hbFBsYWNlcyhzdGVwKSwgdGhpcy5maW5kRGVjaW1hbFBsYWNlcyhtb2RlbC5nZXRTdGVwKCkpICk7XHJcblxyXG4gICAgICAgIHN0ZXBJc1ZhbGlkID0gdGhpcy5pc051bWVyaWMoc3RlcCk7XHJcblxyXG4gICAgICAgIGlmICggbW9kZWwuZ2V0RGF0YUZvcm1hdCgpID09ICdkYXRlJyAmJiAoIHN0ZXAgJSAoMjQgKiAzNjAwICogMTAwMCkgIT0gMCApKSB7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBzdGVwICogMjQgKiAzNjAwICogMTAwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGVzdCA9IChzdGVwICogTWF0aC5wb3coMTAsIG4pKSAvIChtb2RlbC5nZXRTdGVwKCkgKiBNYXRoLnBvdygxMCwgbikpO1xyXG4gICAgICAgIHRlc3QgPSBNYXRoLmFicyh0ZXN0KTtcclxuXHJcbiAgICAgICAgc3RlcElzVmFsaWQgPSBzdGVwSXNWYWxpZCAmJiAoIHRlc3QgJSAxID09IDAgKTtcclxuXHJcbiAgICAgICAgdGVzdCA9ICsoIG1vZGVsLmdldE1heFZhbCgpIC0gbW9kZWwuZ2V0TWluVmFsKCkgKS50b0ZpeGVkKG4pO1xyXG4gICAgICAgIHRlc3QgPSAoIHRlc3QgKiBNYXRoLnBvdygxMCwgbikgKSAvICggc3RlcCAqIE1hdGgucG93KDEwLCBuKSApO1xyXG4gICAgICAgIHRlc3QgPSBNYXRoLmFicyh0ZXN0KTtcclxuXHJcbiAgICAgICAgc3RlcElzVmFsaWQgPSBzdGVwSXNWYWxpZCAmJiAoIHRlc3QgJSAxID09IDAgKTtcclxuXHJcbiAgICAgICAgc3RlcCA9IHN0ZXBJc1ZhbGlkID8gc3RlcCA6IG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICByZXR1cm4gc3RlcDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g0L/RgNC40LLQsNGC0L3Ri9C1INGE0YPQvdC60YbQuNC4XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZE5vZGUocGFyZW50Tm9kZTogSFRNTERpdkVsZW1lbnQsIC4uLmNsYXNzZXM6IHN0cmluZ1tdKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGxldCBub2RlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAgICAgXHJcblxyXG4gICAgICAgIGZvciAoIGxldCBpOiBudW1iZXIgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoYXJndW1lbnRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGFyZW50Tm9kZS5hcHBlbmQobm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgZmluZFZhbGlkTGVuZ3RoKHN0cjogYW55KSB7XHJcbiAgICAgICAgaWYgKCB0eXBlb2YgKCcnICsgc3RyKSA9PSAnc3RyaW5nJyApIHtcclxuICAgICAgICAgICAgbGV0IHIgPSAoJycgKyBzdHIpLm1hdGNoKC9eXFxkezEsM31bLixdP1xcZCoocHh8ZW18cmVtfCUpPyQvaSk7XHJcbiAgICAgICAgICAgIGlmICggciAmJiB0aGlzLmlzTnVtZXJpYyhyWzBdKSApIHsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gclswXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJywnLCAnLicpICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggciApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnLCcsICcuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaWR0aCAob3IgaGVpZ2h0KSBzaG91bGQgYmUgdmFsaWQgdG8gY3NzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc051bWVyaWMobjogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiAhaXNOYU4obiAtIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmluZERlY2ltYWxQbGFjZXMobnVtOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC60L7Qu9C40YfQtdGB0YLQstC+INC30L3QsNC60L7QsiDQv9C+0YHQu9C1INC30LDQv9GP0YLQvtC5XHJcbiAgICAgICAgcmV0dXJuIH4obnVtICsgJycpLmluZGV4T2YoJy4nKSA/IChudW0gKyAnJykuc3BsaXQoJy4nKVsxXS5sZW5ndGggOiAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgSVZpZXcgfTtcclxuZXhwb3J0IGRlZmF1bHQgVmlldzsiLCJleHBvcnQgZGVmYXVsdCBpbnRlcmZhY2UgSU9wdGlvbnMge1xyXG4gICAgLy8gTW9kZWwgb3B0aW9uc1xyXG4gICAgZGF0YUZvcm1hdDogc3RyaW5nO1xyXG4gICAgdmFsdWU6IG51bWJlciB8IHN0cmluZyB8IG51bGw7XHJcbiAgICBtaW5WYWw6IG51bWJlciB8IHN0cmluZztcclxuICAgIG1heFZhbDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgc3RlcDogbnVtYmVyOyAgICBcclxuICAgIHJldmVyc2U6IGJvb2xlYW47XHJcbiAgICByYW5nZTogW251bWJlciwgbnVtYmVyXSB8IFtzdHJpbmcsIHN0cmluZ10gfCBudWxsOyBcclxuICAgIGN1c3RvbVZhbHVlcz86IHN0cmluZ1tdO1xyXG4gICAgdmFsdWVJbkN1c3RvbVZhbHVlcz86IHN0cmluZztcclxuICAgIHJhbmdlSW5DdXN0b21WYWx1ZXM/OiBzdHJpbmc7XHJcblxyXG5cclxuICAgIC8vIFZpZXcgb3B0aW9uc1xyXG4gICAgbGVuZ3RoOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICB2ZXJ0aWNhbDogYm9vbGVhbjtcclxuICAgIHRvb2x0aXA6IGJvb2xlYW47XHJcbiAgICB0b29sdGlwTWFzazogc3RyaW5nO1xyXG4gICAgc2NhbGU6IGJvb2xlYW47XHJcbiAgICBzY2FsZVN0ZXA6IG51bWJlcjtcclxuICAgIHNjYWxlTWFzazogc3RyaW5nO1xyXG59XHJcblxyXG52YXIgZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zID0ge1xyXG4gICAgLy8gTW9kZWwgb3B0aW9uc1xyXG4gICAgLy8g0LIgcmFuZ2Ug0Lgg0LIgbWluINC4IG1heCDRgdC70LXQstCwINGC0L4sINGH0YLQviDRgdC70LXQstCwINC90LAg0YHQu9Cw0LnQtNC10YDQtVxyXG4gICAgZGF0YUZvcm1hdDogJ251bWVyaWMnLFxyXG4gICAgdmFsdWU6IG51bGwsICAgICAgLy8g0LIg0L3QsNGH0LDQu9GM0L3Ri9GFINC90LDRgdGC0YDQvtC50LrQsNGFINC90LUg0L7Qv9GA0LXQtNC10LvQtdC90YtcclxuICAgIG1pblZhbDogMCwgICAgICAgIC8vINC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1INC40LvQuCDQv9GA0L7QvNC10LbRg9GC0L7Qui5cclxuICAgIG1heFZhbDogMTAsICAgICAgIC8vINC10YHQu9C4INC+0L3QuCDQvdC1INGD0LrQsNC30LDQvdGLINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8LCDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSBcclxuICAgIHN0ZXA6IDEsICAgICAgICAgIC8vICh2YWx1ZSkg0Lgg0L/QvtC30LjRhtC40Y8g0LHQtdCz0YPQvdC60LAg0YDQsNCy0L3RiyDQvNC40L3QuNC80LDQu9GM0L3QvtC80YMg0LfQvdCw0YfQtdC90LjRjlxyXG4gICAgcmV2ZXJzZTogZmFsc2UsXHJcbiAgICByYW5nZTogbnVsbCxcclxuICAgIFxyXG4gICAgbGVuZ3RoOiAnMzAwcHgnLFxyXG4gICAgdmVydGljYWw6IGZhbHNlLFxyXG4gICAgdG9vbHRpcDogZmFsc2UsXHJcbiAgICB0b29sdGlwTWFzazogXCJ2YWxcIixcclxuICAgIHNjYWxlOiBmYWxzZSxcclxuICAgIHNjYWxlU3RlcDogbnVsbCxcclxuICAgIHNjYWxlTWFzazogXCJ2YWxcIixcclxufVxyXG5cclxuZXhwb3J0IHsgZGVmYXVsdE9wdGlvbnMgfTtcclxuIiwiaW1wb3J0IE1vZGVsLCB7SU1vZGVsfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IFZpZXcsIHtJVmlld30gZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IFByZXNlbnRlciBmcm9tICcuL1ByZXNlbnRlcic7XHJcbmltcG9ydCB7ZGVmYXVsdE9wdGlvbnN9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5cclxuaW1wb3J0IHtPYnNlcnZlcn0gZnJvbSAnLi9PYnNlcnZlcic7XHJcbmltcG9ydCB7SU9ic2VydmVyfSBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IFN1YmplY3QgIGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5cclxuXHJcbihmdW5jdGlvbigkKXtcclxuXHJcbiAgdmFyIG1ldGhvZHM6IE9iamVjdCA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiggb3B0aW9ucz86IGFueSApIHtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgXHJcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgZGF0YSA9ICR0aGlzLmRhdGEoJ3NsaWRlckRhdGEnKTtcclxuICAgICAgICBsZXQgc2xpZGVyID0gJHRoaXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0L/Qu9Cw0LPQuNC9INC10YnRkSDQvdC1INC/0YDQvtC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDQvVxyXG4gICAgICAgIGlmICggISBkYXRhICkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgbGV0IG1vZGVsOiBJTW9kZWwgPSBuZXcgTW9kZWwob3B0aW9ucyk7XHJcbiAgICAgICAgICAvLyDQv9C10YDQtdC00LDQtdC8INC80L7QtNC10LvRjCDQsiDQv9GA0LXQtNGB0YLQsNCy0LvQtdC90LjQtSDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINC40Lcg0L3QtdC1IFxyXG4gICAgICAgICAgLy8g0LrQvtGA0YDQtdC60YLQvdGL0YUg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgICBsZXQgdmlldzogSVZpZXcgPSBuZXcgVmlldyhtb2RlbCwgb3B0aW9ucywgdGhpcyk7XHJcblxyXG4gICAgICAgICAgLy8g0YHRg9Cx0YrQtdC60YIgLSDRjdGC0L4g0L3QsNCx0LvRjtC00LXQvdC40LVcclxuICAgICAgICAgIC8vINC+0L0g0YXRgNCw0L3QuNGCINC30L3QsNGH0LXQvdC40LUgdmFsINC40LvQuCDQv9GA0L7QvNC10LbRg9GC0L7QulxyXG4gICAgICAgICAgbGV0IHZhbDogYW55IHwgW2FueSwgYW55XTtcclxuICAgICAgICAgIHZhbCA9IG1vZGVsLmdldFZhbCgpIHx8IG1vZGVsLmdldFJhbmdlKCk7IFxyXG4gICAgICAgICAgbGV0IHN1YmplY3QgPSBuZXcgU3ViamVjdCh2YWwpO1xyXG5cclxuICAgICAgICAgIGxldCBwcmVzZW50ZXIgPSBuZXcgUHJlc2VudGVyKG1vZGVsLCB2aWV3LCBzdWJqZWN0KTtcclxuXHJcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnLCB7XHJcbiAgICAgICAgICAgIHNsaWRlciA6IHNsaWRlcixcclxuICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxyXG4gICAgICAgICAgICB2aWV3OiB2aWV3LFxyXG4gICAgICAgICAgICBwcmVzZW50ZXI6IHByZXNlbnRlcixcclxuICAgICAgICAgICAgc3ViamVjdDogc3ViamVjdFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uKCBvcHRpb25zOiBhbnkgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgcHJlc2VudGVyID0gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykucHJlc2VudGVyO1xyXG4gICAgICAgIHByZXNlbnRlci5jaGFuZ2Uob3B0aW9ucyk7XHJcblxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBkYXRhID0gJHRoaXMuZGF0YSgnc2xpZGVyRGF0YScpO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykudW5iaW5kKCcuc2xpZGVyJyk7XHJcbiAgICAgICAgZGF0YS5zbGlkZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgJHRoaXMucmVtb3ZlRGF0YSgnc2xpZGVyRGF0YScpO1xyXG4gICAgICAgIFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgb2JzZXJ2ZTogZnVuY3Rpb24oIGZ1bmMgKSB7XHJcblxyXG4gICAgICAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0L3QsNCx0LvRjtC00LDRgtC10LvRj1xyXG4gICAgICAvLyDQsNGA0LPRg9C80LXQvdGCIC0g0Y3RgtCwINGE0YPQvdC60YbQuNGPINC60L7RgtC+0YDQsNGPINCx0YPQtNC10YIg0L7QsdGA0LDQsdCw0YLRi9Cy0LDRgtGMINC40LfQvNC10L3QtdC90LjRj1xyXG4gICAgICBsZXQgc3ViamVjdCA9ICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScpLnN1YmplY3Q7XHJcbiAgICAgIGxldCBvYnNlcnZlcjogSU9ic2VydmVyID0gbmV3IE9ic2VydmVyKCBmdW5jICk7XHJcblxyXG4gICAgICBzdWJqZWN0LmF0dGFjaChvYnNlcnZlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBcclxuICBqUXVlcnkuZm4uc2xpZGVyID0gZnVuY3Rpb24oIG1ldGhvZCApIHtcclxuXHJcbiAgICAvLyDQu9C+0LPQuNC60LAg0LLRi9C30L7QstCwINC80LXRgtC+0LTQsFxyXG4gICAgaWYgKCBtZXRob2RzW21ldGhvZCBhcyBzdHJpbmddICkge1xyXG4gICAgICByZXR1cm4gbWV0aG9kc1sgbWV0aG9kIGFzIHN0cmluZyBdLmFwcGx5KCB0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCggYXJndW1lbnRzLCAxICkpO1xyXG4gICAgfSBlbHNlIGlmICggdHlwZW9mIG1ldGhvZCA9PT0gJ29iamVjdCcgfHwgISBtZXRob2QgKSB7XHJcblxyXG4gICAgICAvLyA/Pz8/XHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgcmV0dXJuIG1ldGhvZHMuaW5pdC5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkLmVycm9yKCAnTWV0aG9kIGNhbGxlZCAnICsgIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3QgZm9yIEpRdWVyeS5zbGlkZXInICk7XHJcbiAgICB9IFxyXG5cclxuICB9O1xyXG5cclxufSkoalF1ZXJ5KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==