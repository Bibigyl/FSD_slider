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
    View.prototype.setNumberOfSteps = function (num) {
        this._numberOfSteps = num;
    };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0T3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDhGQUE0RDtBQTRDNUQ7SUFZSSxlQUFZLFVBQW9CO1FBRTVCLElBQUksT0FBTyxHQUFhLFVBQVUsQ0FBQztRQUluQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDL0QsSUFBSSxZQUEyQixDQUFDO1FBRWhDLElBQUssT0FBTyxDQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUc7WUFDbkMsWUFBWSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsK0JBQWMsQ0FBQyxDQUFDO1NBRXRFO2FBQU0sSUFBSyxPQUFPLENBQUMsVUFBVSxJQUFJLE1BQU0sRUFBRztZQUd2QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzlDLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLCtCQUFjLENBQUMsQ0FBQztTQUVuRTthQUFNLElBQUssT0FBTyxDQUFDLFVBQVUsSUFBSSxRQUFRLEVBQUc7WUFDekMsWUFBWSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsK0JBQWMsQ0FBQyxDQUFDO1lBQ2xFLFlBQVksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztTQUVwRDthQUFNO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUUvQyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksTUFBTTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO0lBQ2pFLENBQUM7SUFHRCxzQkFBTSxHQUFOO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxzQkFBTSxHQUFOLFVBQU8sTUFBYztRQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELHdCQUFRLEdBQVI7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNELHdCQUFRLEdBQVIsVUFBUyxRQUEwQjtRQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVwRSxJQUFLLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUc7WUFDaEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7U0FDMUI7YUFBTTtZQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUM7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsdUJBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQseUJBQVMsR0FBVDtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQseUJBQVMsR0FBVDtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsMEJBQVUsR0FBVjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsK0JBQWUsR0FBZjtRQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDN0I7YUFBTTtZQUNILE9BQU8sU0FBUyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVELDZCQUFhLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUNELDBCQUFVLEdBQVY7UUFFSSxJQUFJLElBQUksR0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN4QyxJQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRztZQUVoQixJQUFJLEdBQUcsU0FBSyxDQUFDO1lBR2IsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLE1BQU0sRUFBRTtnQkFDNUIsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBRSxDQUFDO2dCQUVsQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdDLEdBQUcsR0FBRyxDQUFFLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBRSxDQUFDO2FBQy9CO2lCQUFNO2dCQUNILEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ25CO1lBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FFckI7YUFBTTtZQUVILElBQUksR0FBRyxTQUFLLENBQUM7WUFDYixJQUFJLEdBQUcsR0FBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVuQyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksTUFBTSxFQUFFO2dCQUU1QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNyQjtZQUNELElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLEVBQUU7Z0JBRTVCLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztnQkFDdkMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUV4QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUViLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztnQkFDdkMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUV4QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ2hCO1lBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7U0FDcEI7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBR0QsaUNBQWlCLEdBQWpCLFVBQWtCLEdBQVEsRUFBRSxHQUFXO1FBR25DLElBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUc7WUFDakMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNCO2FBQU0sSUFBSyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRztZQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDL0M7UUFFRCxJQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRztZQUN2QixPQUFPLEdBQUcsQ0FBQztTQUNkO1FBRUQsSUFBSyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRztZQUN6QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFDO2FBQU07WUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7U0FDeEQ7SUFDTCxDQUFDO0lBRUQsNkJBQWEsR0FBYixVQUFjLEdBQVc7UUFHckIsSUFBSSxPQUFlLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUUsQ0FBQztRQUVyRyxJQUFJLENBQUMsR0FBVyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLEdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFekQsT0FBTyxHQUFHLENBQUMsQ0FBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekQsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFNUIsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELCtCQUFlLEdBQWYsVUFBZ0IsSUFBWTtRQUV4QixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksUUFBUSxFQUFFO1lBRTlCLElBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFHO2dCQUNsQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkM7aUJBQU07Z0JBQ0gsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNuRTtTQUVKO2FBQU07WUFDSCxJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBRSxDQUFDO1lBQ3JHLElBQUksQ0FBQyxHQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLEdBQUcsR0FBVyxDQUFDLENBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkYsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLE1BQU0sRUFBRTtnQkFDNUIsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4QjtpQkFBTTtnQkFDSixPQUFPLEdBQUcsQ0FBQzthQUNiO1NBQ0o7SUFDTCxDQUFDO0lBRUQseUJBQVMsR0FBVCxVQUFVLEdBQUc7UUFFVCxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksUUFBUSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUVsQzthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLEVBQUU7WUFDbkMsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUV4QjthQUFNO1lBQ0gsT0FBTyxHQUFHLENBQUM7U0FDZDtJQUNMLENBQUM7SUFFRCxnQ0FBZ0IsR0FBaEI7UUFDSSxJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBRSxDQUFDO1FBQ3JHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUUsR0FBRyxDQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFFLENBQUM7SUFDOUUsQ0FBQztJQUVELHNCQUFNLEdBQU4sVUFBTyxVQUFlO1FBRWxCLElBQUksV0FBVyxHQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9DLElBQUksT0FBTyxHQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUU5RCxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3ZFLElBQUksWUFBMkIsQ0FBQztRQUVoQyxJQUFLLE9BQU8sQ0FBQyxVQUFVLElBQUksU0FBUyxFQUFHO1lBQ25DLFlBQVksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLFdBQXVCLENBQUMsQ0FBQztTQUUvRTthQUFNLElBQUssT0FBTyxDQUFDLFVBQVUsSUFBSSxNQUFNLEVBQUc7WUFDdkMsWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsV0FBdUIsQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBRzlEO2FBQU0sSUFBSyxPQUFPLENBQUMsVUFBVSxJQUFJLFFBQVEsRUFBRztZQUN6QyxZQUFZLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxXQUF1QixDQUFDLENBQUM7WUFDM0UsWUFBWSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1NBRXBEO2FBQU07WUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7U0FDN0M7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO1FBRS9DLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7SUFDakUsQ0FBQztJQUVPLHFDQUFxQixHQUE3QixVQUE4QixVQUFvQixFQUFFLGNBQXdCO1FBQ3hFLElBQUksT0FBTyxHQUFhLFVBQVUsQ0FBQztRQUluQyxJQUFJLFVBQVUsR0FBa0I7WUFDNUIsVUFBVSxFQUFFLFNBQVM7WUFDckIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxNQUFnQjtZQUN0QyxNQUFNLEVBQUUsY0FBYyxDQUFDLE1BQWdCO1lBQ3ZDLE1BQU0sRUFBRSxjQUFjLENBQUMsTUFBZ0I7WUFDdkMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJO1lBQ3pCLE9BQU8sRUFBRSxjQUFjLENBQUMsT0FBTztZQUMvQixLQUFLLEVBQUUsY0FBYyxDQUFDLEtBQXlCO1NBQ2xEO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlELFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNwRCxVQUFVLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFFM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBZ0IsRUFBRSxPQUFPLENBQUMsTUFBZ0IsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFJdEYsSUFBSyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFnQixFQUFFLE9BQU8sQ0FBQyxNQUFnQixFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRztZQUMvRixVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFnQixDQUFDO1lBQzdDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQWdCLENBQUM7U0FDaEQ7YUFBTTtZQUNILFVBQVUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQWdCLENBQUM7WUFDN0MsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBZ0IsQ0FBQztTQUNoRDtRQUVELElBQUssT0FBTyxDQUFDLEtBQUssRUFBRztZQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBeUIsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFNUcsSUFBSyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFXLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQVcsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUc7Z0JBQ25HLFVBQVUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQXlCLENBQUM7YUFDeEQ7aUJBQU07Z0JBQ0gsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFXLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFDO2FBQy9FO1lBR0QsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FFM0I7YUFBTTtZQUVILElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFlLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXJHLFVBQVUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQWUsQ0FBQztZQUMzQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUMzQjtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFHTyxrQ0FBa0IsR0FBMUIsVUFBMkIsVUFBb0IsRUFBRSxjQUF3QjtRQUNyRSxJQUFJLE9BQU8sR0FBYSxVQUFVLENBQUM7UUFFbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxNQUFnQixDQUFDLENBQUM7UUFDdEUsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLE1BQWdCLENBQUMsQ0FBQztRQUN0RSxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFM0QsSUFBSyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUc7WUFJN0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQztZQUMxRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUM7U0FFN0U7YUFBTTtZQUNILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLEtBQWUsQ0FBQyxDQUFDO1NBQ3ZFO1FBQ0QsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFHTyxvQ0FBb0IsR0FBNUIsVUFBNkIsVUFBb0IsRUFBRSxjQUF3QjtRQUN2RSxJQUFJLE9BQU8sR0FBYSxVQUFVLENBQUM7UUFFbkMsSUFBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUc7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1NBQ3hFO2FBQU0sSUFBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRztZQUNsRixNQUFNLElBQUksS0FBSyxDQUFDLHlFQUF5RSxDQUFDLENBQUM7U0FDOUY7UUFHRCxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNuQixPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQU9qQixJQUFLLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLG1CQUFtQixFQUFHO1lBRWhELElBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksT0FBTyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUc7Z0JBSTNHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2hHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbkc7U0FFSjthQUFNO1lBR0gsSUFBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLG1CQUFtQixFQUFHO2dCQUNqRCxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzdGO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUdPLDBCQUFVLEdBQWxCO1FBQW1CLGNBQVk7YUFBWixVQUFZLEVBQVoscUJBQVksRUFBWixJQUFZO1lBQVoseUJBQVk7O1FBQzNCLEtBQWdCLFVBQUksRUFBSixhQUFJLEVBQUosa0JBQUksRUFBSixJQUFJLEVBQUU7WUFBakIsSUFBSSxHQUFHO1lBQ1IsSUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUc7Z0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQzthQUNyRTtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLDhCQUFjLEdBQXRCLFVBQXVCLE1BQWMsRUFBRSxNQUFjLEVBQUUsT0FBZ0I7UUFDbkUsSUFBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsRUFBRztZQUNsQyxPQUFPLEtBQUssQ0FBQztTQUNoQjthQUFNLElBQUssT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxFQUFHO1lBQ3hDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVPLDJCQUFXLEdBQW5CLFVBQW9CLE1BQWMsRUFBRSxNQUFjLEVBQUUsSUFBWTtRQUU1RCxJQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRztZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFLLElBQUksSUFBSSxDQUFDLEVBQUc7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDOUM7UUFFRCxJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBRSxDQUFDO1FBQ3JHLElBQUksSUFBSSxHQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFJLEdBQUcsQ0FBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUUsR0FBRyxDQUFFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBRSxDQUFDO1FBQy9ELElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLElBQUssSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUc7WUFFakIsTUFBTSxJQUFJLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1NBQ3BGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLCtCQUFlLEdBQXZCLFVBQXdCLE1BQWMsRUFBRSxNQUFjLEVBQUUsR0FBVyxFQUFFLElBQVk7UUFFN0UsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFFLENBQUM7UUFFekYsSUFBSSxJQUFJLEdBQVcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksR0FBRyxDQUFFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFFLENBQUM7UUFDL0QsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsSUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLElBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFHO1lBQ3RFLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUM7U0FDM0U7UUFDRCxJQUFLLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFHO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztTQUNsRDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyw0QkFBWSxHQUFwQixVQUFxQixNQUFjLEVBQUUsTUFBYyxFQUFFLEtBQXVCLEVBQUUsSUFBWTtRQUV0RixJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBRSxDQUFDO1FBRXJHLElBQUksUUFBUSxHQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNsRCxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlCLElBQUksU0FBUyxHQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNuRCxTQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWhDLElBQUssS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUc7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFHO1lBQzFELE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztTQUN4RDtRQUNELElBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUc7WUFDeEgsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsSUFBSyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRztZQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7U0FDdEQ7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8saUNBQWlCLEdBQXpCO1FBQTBCLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBQ3BDLEtBQWlCLFVBQUksRUFBSixhQUFJLEVBQUosa0JBQUksRUFBSixJQUFJLEVBQUc7WUFBbEIsSUFBSSxHQUFHO1lBQ1QsSUFBSyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxFQUFHO2dCQUN0RCxNQUFNLElBQUksS0FBSyxDQUFDLHdGQUF3RixDQUFDLENBQUM7YUFDN0c7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyxxQ0FBcUIsR0FBN0IsVUFBOEIsR0FBVztRQUNyQyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBR25ELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLHNEQUFzRCxDQUFDLENBQUM7U0FDeEU7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO1NBQ2pGO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNqQixDQUFDO0lBRU8sd0NBQXdCLEdBQWhDLFVBQWlDLElBQVk7UUFDekMsSUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUc7WUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsT0FBTyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVPLHlCQUFTLEdBQWpCLFVBQWtCLENBQU07UUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVPLGlDQUFpQixHQUF6QixVQUEwQixHQUFXO1FBRWpDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBQ0wsWUFBQztBQUFELENBQUM7QUFLRCxrQkFBZSxLQUFLLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2hpQnJCO0lBSUksaUJBQWEsR0FBcUI7UUFTMUIsY0FBUyxHQUFnQixFQUFFLENBQUM7UUFSaEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQVlNLHdCQUFNLEdBQWIsVUFBYyxRQUFtQjtRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sd0JBQU0sR0FBYixVQUFjLFFBQW1CO1FBQzdCLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBS00sd0JBQU0sR0FBYjtRQUVJLEtBQXVCLFVBQWMsRUFBZCxTQUFJLENBQUMsU0FBUyxFQUFkLGNBQWMsRUFBZCxJQUFjLEVBQUU7WUFBbEMsSUFBTSxRQUFRO1lBQ2YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQzs7QUFnQkQ7SUFJSSxrQkFBWSxJQUFjO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFTSx5QkFBTSxHQUFiLFVBQWMsT0FBZ0I7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBRSxPQUFPLENBQUMsR0FBRyxDQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQUFDO0FBWFksNEJBQVE7Ozs7Ozs7Ozs7Ozs7OztBQ25FckI7SUFRSSxtQkFBWSxLQUFhLEVBQUUsSUFBVyxFQUFFLE9BQWlCO1FBRXJELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBRXhCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkQsSUFBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRztZQUNyQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNwRTthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVqRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3JFO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVPLCtCQUFXLEdBQW5CLFVBQW9CLEtBQUs7UUFFckIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFFeEMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVPLCtCQUFXLEdBQW5CLFVBQW9CLEtBQUs7UUFFckIsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRTdCLElBQUksVUFBVSxHQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXhELElBQUksTUFBTSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0MsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QyxJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pDLElBQUksT0FBTyxHQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLFlBQVksR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xELElBQUksVUFBVSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV4RCxJQUFJLFlBQW9CLENBQUM7UUFDekIsSUFBSSxRQUFnQixDQUFDO1FBQ3JCLElBQUksYUFBcUIsQ0FBQztRQUMxQixJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSSxVQUFrQixDQUFDO1FBQ3ZCLElBQUksTUFBYyxDQUFDO1FBTW5CLElBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUc7WUFFdkIsWUFBWSxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0QsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDckQsYUFBYSxHQUFHLFFBQVEsR0FBRyxVQUFVLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1NBRXJGO2FBQU07WUFFSCxZQUFZLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1RCxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNyRCxhQUFhLEdBQUcsUUFBUSxHQUFHLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUM7U0FDcEY7UUFFRCxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLENBQUM7UUFFaEQsSUFBSyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUc7WUFDcEIsSUFBSyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsRUFBRztnQkFNL0QsU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQzVELFNBQVMsR0FBRyxTQUFTLEdBQUcsVUFBVSxDQUFDO2dCQUNuQyxVQUFVLEdBQUcsWUFBWSxDQUFDO2dCQUUxQixNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNO2dCQUNILFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUM3RCxVQUFVLEdBQUcsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDckMsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFFZCxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7YUFBTTtZQUNILFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDZCxVQUFVLEdBQUcsWUFBWSxDQUFDO1NBQzdCO1FBRUQsSUFBSyxhQUFhLElBQUksU0FBUyxFQUFFO1lBQzdCLGFBQWEsR0FBRyxTQUFTLENBQUM7WUFDMUIsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUNuQjthQUFNLElBQUssYUFBYSxJQUFJLFVBQVUsRUFBRTtZQUNyQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1lBQzNCLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDbkI7YUFBTTtZQUlILGFBQWEsR0FBRyxNQUFNLEdBQUcsVUFBVSxDQUFDO1lBRXBDLElBQU0sQ0FBQyxHQUFHLFdBQUMsSUFBSSxRQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsRUFBL0UsQ0FBK0UsQ0FBQztZQUUvRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLE1BQU0sR0FBRyxDQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFMUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBRSxDQUFDO1lBQ25DLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsSUFBSyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDakYsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO1NBRW5EO2FBQU0sSUFBSyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7WUFDekYsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBRSxDQUFDO1NBRW5EO2FBQU07WUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFeEQsSUFBSyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRztZQUMzQyxJQUFJLEdBQUcsU0FBd0IsQ0FBQztZQUNoQyxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU5QixJQUFJLENBQUMsZUFBZSxDQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBRSxDQUFDO1NBQzNHO0lBQ0wsQ0FBQztJQUVPLDZCQUFTLEdBQWpCLFVBQWtCLEtBQUs7UUFFbkIsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUQsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekQsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7UUFFOUIsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUVoQyxJQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLEVBQUc7WUFDMUIsSUFBSSxHQUFHLFNBQXdCLENBQUM7WUFDaEMsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBRTNCO2FBQU07WUFDSCxJQUFJLEdBQUcsU0FBd0IsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFFdkIsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRTNCLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUM5QjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLGlDQUFhLEdBQXJCLFVBQXNCLEtBQUs7UUFFdkIsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRTdCLElBQUksVUFBVSxHQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3hELElBQUksYUFBNkIsQ0FBQztRQUVsQyxJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzdDLElBQUksTUFBTSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0MsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN6QyxJQUFJLE9BQU8sR0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBSSxZQUFZLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsRCxJQUFJLFVBQVUsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFeEQsSUFBSSxZQUFvQixDQUFDO1FBQ3pCLElBQUksUUFBZ0IsQ0FBQztRQUNyQixJQUFJLGFBQXFCLENBQUM7UUFDMUIsSUFBSSxTQUFpQixDQUFDO1FBQ3RCLElBQUksVUFBa0IsQ0FBQztRQUN2QixJQUFJLE1BQWMsQ0FBQztRQU1uQixJQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFHO1lBRXZCLFlBQVksR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNELFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3JELGFBQWEsR0FBRyxRQUFRLEdBQUcsVUFBVSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztTQUVyRjthQUFNO1lBRUgsWUFBWSxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUQsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDckQsYUFBYSxHQUFHLFFBQVEsR0FBRyxVQUFVLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDO1NBQ3BGO1FBRUQsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBRWhELFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxVQUFVLEdBQUcsWUFBWSxDQUFDO1FBRTFCLElBQUssYUFBYSxJQUFJLFNBQVMsRUFBRTtZQUM3QixhQUFhLEdBQUcsU0FBUyxDQUFDO1lBQzFCLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDbkI7YUFBTSxJQUFLLGFBQWEsSUFBSSxVQUFVLEVBQUU7WUFDckMsYUFBYSxHQUFHLFVBQVUsQ0FBQztZQUMzQixNQUFNLEdBQUcsTUFBTSxDQUFDO1NBQ25CO2FBQU07WUFJSCxhQUFhLEdBQUcsTUFBTSxHQUFHLFVBQVUsQ0FBQztZQUVwQyxJQUFNLENBQUMsR0FBRyxXQUFDLElBQUksUUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLEVBQS9FLENBQStFLENBQUM7WUFFL0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QixNQUFNLEdBQUcsQ0FBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRTFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUUsQ0FBQztZQUNuQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQztRQUVELElBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUc7WUFDckIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQixhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FFdkQ7YUFBTTtZQUNILElBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUc7Z0JBQ25GLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQztnQkFDaEQsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7YUFDdkQ7aUJBQU07Z0JBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUUsQ0FBQyxDQUFDO2dCQUNoRCxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQzthQUN2RDtTQUNKO1FBRUQsSUFBSyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRztZQUMzQyxJQUFJLEdBQUcsU0FBd0IsQ0FBQztZQUNoQyxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU5QixJQUFJLENBQUMsZUFBZSxDQUFFLGFBQWEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFFLENBQUM7U0FDdkc7UUFHRCxJQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLEVBQUc7WUFDMUIsSUFBSSxHQUFHLFNBQXdCLENBQUM7WUFDaEMsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBRTNCO2FBQU07WUFDSCxJQUFJLEdBQUcsU0FBd0IsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFFdkIsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRTNCLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUM5QjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDBCQUFNLEdBQU4sVUFBTyxPQUFZO1FBRWYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN4QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRXRCLElBQUksbUJBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3pDLElBQUksZ0JBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ3RDLElBQUksbUJBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3pDLElBQUksZ0JBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ3RDLElBQUksZ0JBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ3RDLElBQUksWUFBWSxHQUFZLEtBQUssQ0FBQztRQUNsQyxJQUFJLGNBQWMsR0FBWSxLQUFLLENBQUM7UUFXcEMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFFekosSUFBSSxJQUFJLEdBQVksS0FBSyxDQUFDO1FBRTFCLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBUyxJQUFJO1lBQzlCLElBQUssT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRztnQkFDaEMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDWixPQUFPO2FBQ1Y7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUssSUFBSSxFQUFHO1lBQ1IsSUFBSSxjQUFjLEdBQVcsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDdEQsSUFBSSxXQUFXLEdBQWtCLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNwRCxJQUFJLFVBQVUsR0FBYSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFbkUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV6QixJQUFJLENBQUMsZ0JBQWdCLENBQUUsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUUsQ0FBQztZQUNsRCxJQUFJLENBQUMsWUFBWSxDQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFFLENBQUUsQ0FBQztZQUUzRSxtQkFBbUIsR0FBRyxJQUFJLENBQUM7WUFDM0IsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUUzQixJQUFLLGNBQWMsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsRUFBRztnQkFDOUMsWUFBWSxHQUFHLElBQUksQ0FBQzthQUN2QjtZQUNELElBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFHO2dCQUN4QyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDekI7WUFDRCxJQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRztnQkFDeEMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixjQUFjLEdBQUcsSUFBSSxDQUFDO2FBQ3pCO1NBQ0o7UUFRRCxJQUFLLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRztZQUMxRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1lBQzNCLG1CQUFtQixHQUFHLElBQUksQ0FBQztTQUM5QjtRQU1ELElBQUssZ0JBQWdCLEVBQUc7WUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTdCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsSUFBSyxnQkFBZ0IsRUFBRztZQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3JFO1FBSUQsSUFBSyxPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFHO1lBQ25GLElBQUksQ0FBQyxZQUFZLENBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUUsQ0FBQztZQUN2RSxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLG1CQUFtQixHQUFHLElBQUksQ0FBQztTQUM5QjtRQUNELElBQUssT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRztZQUNuRixJQUFJLENBQUMsWUFBWSxDQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUUsQ0FBQztZQUN2QyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7U0FDOUI7UUFFRCxJQUFLLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFHO1lBQ2hGLElBQUksQ0FBQyxRQUFRLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUUsQ0FBRSxDQUFDO1lBQ3BELG1CQUFtQixHQUFHLEtBQUssQ0FBQztZQUM1QixZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO1FBRUQsSUFBSyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFHO1lBQ2hGLElBQUksS0FBSyxTQUFnQixDQUFDO1lBQzFCLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBRSxDQUFDO1lBQzVGLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFckIsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUNyQixtQkFBbUIsR0FBRyxLQUFLLENBQUM7U0FDL0I7UUFFRCxJQUFLLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUc7WUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixtQkFBbUIsR0FBRyxJQUFJLENBQUM7U0FDOUI7UUFFRCxJQUFLLG1CQUFtQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRztZQUMxQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkM7UUFLRCxJQUFLLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUc7WUFDekYsSUFBSSxDQUFDLGNBQWMsQ0FBRSxPQUFPLENBQUMsV0FBVyxDQUFFLENBQUM7WUFDM0MsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQzNCO1FBQ0QsSUFBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFHO1lBQ25GLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDdkIsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1NBQzVCO1FBRUQsSUFBSyxPQUFPLENBQUMsT0FBTyxJQUFJLEtBQUssSUFBSSxjQUFjLEVBQUc7WUFHOUMsSUFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFBRyxJQUFJLENBQUMsVUFBVSxDQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO1lBQ3BGLElBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztZQUNwRixJQUFLLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztZQUVuRixJQUFLLE9BQU8sQ0FBQyxPQUFPLElBQUksS0FBSyxFQUFHO2dCQUM1QixjQUFjLEdBQUcsS0FBSyxDQUFDO2FBQzFCO1lBQ0QsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1NBQzVCO1FBRUQsSUFBSyxPQUFPLENBQUMsT0FBTyxJQUFJLGNBQWMsRUFBRztZQUNyQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1NBQzVCO1FBRUQsSUFBSyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUc7WUFDakUsSUFBSSxHQUFHLFNBQXdCLENBQUM7WUFFaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFFbkIsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFFLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLEdBQWEsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUUsQ0FBQzthQUNuRjtpQkFBTTtnQkFFSCxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLGVBQWUsQ0FBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQWEsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUUsQ0FBQztnQkFFakYsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxlQUFlLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFFLENBQUM7YUFDcEY7U0FDSjtRQUtELElBQUssbUJBQW1CLEVBQUc7WUFDdkIsSUFBSSxHQUFHLFNBQVEsQ0FBQztZQUVoQixJQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFHO2dCQUVyQixHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUUsQ0FBQztnQkFDOUYsSUFBSSxDQUFDLGdCQUFnQixDQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUVoRDtpQkFBTTtnQkFFSCxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUUsQ0FBQztnQkFDbkcsSUFBSSxDQUFDLGdCQUFnQixDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRTlDLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBRSxDQUFDO2dCQUNuRyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNqRDtZQUtELElBQUssS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksRUFBRztnQkFDMUIsSUFBSSxHQUFHLFNBQXdCLENBQUM7Z0JBQ2hDLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBRSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7YUFFM0I7aUJBQU07Z0JBQ0gsSUFBSSxHQUFHLFNBQXdCLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFFdkIsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFFM0IsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUM5QjtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDO0FBRUQsa0JBQWUsU0FBUzs7Ozs7Ozs7Ozs7Ozs7O0FDcmR4QjtJQXFCSSxjQUFZLEtBQWEsRUFBRSxPQUFpQixFQUFFLFVBQTBCO1FBRXBFLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBELElBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFHO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ25EO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRTFELElBQUksR0FBVyxDQUFDO1FBQ2hCLElBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFHO1lBRWhCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzVELEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBRSxDQUFDO1lBQzlGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFFSCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCLENBQUMsQ0FBQztZQUV4RixHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUUsQ0FBQztZQUNuRyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUU3QyxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUUsQ0FBQztZQUNuRyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNqRDtRQUtELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUV4QyxJQUFLLE9BQU8sQ0FBQyxPQUFPLEVBQUc7WUFDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBRXBDLElBQUksSUFBWSxDQUFDO1FBQ2pCLElBQUssT0FBTyxDQUFDLFNBQVMsRUFBRztZQUNyQixJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUQ7YUFBTTtZQUNILElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUd2QixJQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUc7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDN0U7SUFDTCxDQUFDO0lBR0Qsd0JBQVMsR0FBVDtRQUNJLElBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFHO1lBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7U0FDbkM7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBQ0QsMEJBQVcsR0FBWDtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsdUJBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ0QsNkJBQWMsR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBQ0QsNkJBQWMsR0FBZCxVQUFlLElBQVk7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUNELDJCQUFZLEdBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUNELDJCQUFZLEdBQVosVUFBYSxJQUFZO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFDRCwyQkFBWSxHQUFaO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFDRCwyQkFBWSxHQUFaLFVBQWEsSUFBWTtRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBQ0QsK0JBQWdCLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7SUFDRCwrQkFBZ0IsR0FBaEIsVUFBaUIsR0FBVztRQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQztJQUM5QixDQUFDO0lBSUQsd0JBQVMsR0FBVDtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBQ0QsdUJBQVEsR0FBUixVQUFTLEdBQWU7UUFBZiw2QkFBZTtRQUNwQixJQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUc7WUFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7UUFDRCxJQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUc7WUFDWixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDMUI7UUFDRCxJQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUc7WUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDM0I7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNELHlCQUFVLEdBQVYsVUFBVyxHQUFlO1FBQWYsNkJBQWU7UUFDdEIsSUFBSyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUc7WUFDdEMsSUFBSyxJQUFJLENBQUMsUUFBUSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUc7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN4QjtZQUNELElBQUssSUFBSSxDQUFDLFlBQVksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFHO2dCQUNqQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDNUI7WUFDRCxJQUFLLElBQUksQ0FBQyxhQUFhLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRztnQkFDbEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQzdCO1NBQ0o7YUFBTTtZQUNILE9BQU8sU0FBUyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUNELHlCQUFVLEdBQVYsVUFBVyxPQUFtQyxFQUFFLEdBQWU7UUFBZiw2QkFBZTtRQUMzRCxJQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUc7WUFDWixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztTQUMzQjthQUFNLElBQUssR0FBRyxJQUFJLENBQUMsRUFBRztZQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztTQUMvQjthQUFNLElBQUssR0FBRyxJQUFJLENBQUMsRUFBRztZQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztTQUNoQztJQUNMLENBQUM7SUFDRCx1QkFBUSxHQUFSO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCx1QkFBUSxHQUFSLFVBQVMsS0FBaUM7UUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUtELCtCQUFnQixHQUFoQixVQUFrQixPQUFZO1FBRTFCLElBQUksYUFBYSxHQUFZLEtBQUssQ0FBQztRQUduQyxJQUFLLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFHO1lBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUM5QixhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO1FBR0QsSUFBSyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRztZQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUM7WUFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFOUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUN4QjtRQUNELElBQUssT0FBTyxDQUFDLFFBQVEsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRztZQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUM7WUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFaEQsYUFBYSxHQUFHLElBQUk7U0FDdkI7UUFFRCxJQUFJLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUMzQztRQUNELElBQUksYUFBYSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUM1QztJQUNMLENBQUM7SUFFRCwrQkFBZ0IsR0FBaEIsVUFBa0IsS0FBYTtRQUMzQixJQUFJLEdBQVcsQ0FBQztRQUVoQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFckQsR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFFLENBQUM7UUFDOUYsSUFBSSxDQUFDLGdCQUFnQixDQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELCtCQUFnQixHQUFoQixVQUFrQixLQUFhO1FBQzNCLElBQUksR0FBVyxDQUFDO1FBRWhCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFFeEYsR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFFLENBQUM7UUFDbkcsSUFBSSxDQUFDLGdCQUFnQixDQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFN0MsR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFFLENBQUM7UUFDbkcsSUFBSSxDQUFDLGdCQUFnQixDQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELGlDQUFrQixHQUFsQixVQUFtQixLQUFhO1FBQzVCLElBQUksR0FBMkIsQ0FBQztRQUVoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUVkLElBQUssSUFBSSxDQUFDLFFBQVE7Z0JBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQztZQUN0RSxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxlQUFlLENBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBRSxDQUFDO1NBRWpFO2FBQU07WUFDSCxJQUFLLElBQUksQ0FBQyxZQUFZO2dCQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUMsWUFBWSxDQUFFLENBQUM7WUFDbEYsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsZUFBZSxDQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUUsQ0FBQztZQUVsRSxJQUFLLElBQUksQ0FBQyxhQUFhO2dCQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFFLENBQUM7WUFDckYsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztZQUMvRSxJQUFJLENBQUMsZUFBZSxDQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUUsQ0FBQztTQUN0RTtJQUNMLENBQUM7SUFFRCx5QkFBVSxHQUFWLFVBQVcsVUFBMEIsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLElBQVk7UUFDNUUsSUFBSSxLQUFLLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsSUFBSSxRQUF3QixDQUFDO1FBQzdCLElBQUksR0FBMkIsQ0FBQztRQUVoQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRzFCLElBQUksQ0FBQyxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBRSxDQUFDO1FBQ2xHLElBQUksSUFBSSxHQUFXLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QixLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUU7WUFHakUsR0FBRyxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFL0IsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNqRCxRQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBRXhELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNqQixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQzdEO2lCQUFNO2dCQUNILFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDNUQ7WUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELDJCQUFZLEdBQVosVUFBYSxLQUFhO1FBQ3RCLElBQUksS0FBSyxHQUFtQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUMsSUFBSSxjQUFjLEdBQVcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLHlCQUF5QixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMxRixJQUFJLGFBQXFCLENBQUM7UUFDMUIsSUFBSSxRQUF3QixDQUFDO1FBRzdCLElBQUksQ0FBQyxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUUsQ0FBQztRQUM3RyxJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLGFBQWEsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFaEQsSUFBSyxjQUFjLEdBQUcsYUFBYSxFQUFHO1lBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUM1QjtTQUNKO1FBQ0QsSUFBSyxjQUFjLEdBQUcsYUFBYSxFQUFHO1lBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0QsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQ2pELFFBQVEsQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO2dCQUNyQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzFCO1NBQ0o7SUFDTCxDQUFDO0lBRUQsa0NBQW1CLEdBQW5CLFVBQW9CLEtBQWE7UUFDN0IsSUFBSSxRQUF3QixDQUFDO1FBQzdCLElBQUksR0FBMkIsQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBR25DLElBQUksQ0FBQyxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUUsQ0FBQztRQUM3RyxJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLEtBQUssSUFBSSxDQUFDLEdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRTtZQUdqRSxHQUFHLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUvQixRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLGdCQUFnQixDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBbUIsQ0FBQztZQUNuRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTdELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNqQixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDN0Q7aUJBQU07Z0JBQ0gsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQzVEO1NBQ0o7SUFDTCxDQUFDO0lBRUQseUJBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFFZCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU07Z0JBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLO2dCQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDaEc7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU07Z0JBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLO2dCQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDakc7U0FFSjthQUFNO1lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNO2dCQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSztnQkFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNwRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFFLEdBQUcsSUFBSSxDQUFDO2FBQ3BIO2lCQUFNO2dCQUNILElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNO2dCQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSztnQkFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNwRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFFLEdBQUcsSUFBSSxDQUFDO2FBQ25IO1NBQ0o7SUFDTCxDQUFDO0lBS0QsK0JBQWdCLEdBQWhCLFVBQWlCLFNBQXlCLEVBQUUsYUFBcUI7UUFDN0QsSUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUc7WUFDbkIsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUMsV0FBVyxHQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDekU7YUFBTTtZQUNILFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUM1QixTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxhQUFhLEdBQUcsU0FBUyxDQUFDLFdBQVcsR0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ3hFO1FBR0QsSUFBSyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFHO1lBQ3BCLElBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFHO2dCQUNuQixJQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFHO29CQUMvRixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUN6QztxQkFBTTtvQkFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUN4QzthQUNKO2lCQUFNO2dCQUNILElBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUc7b0JBQy9GLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7aUJBQ3pDO3FCQUFNO29CQUNILElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQ3hDO2FBQ0o7U0FDSjtRQUVELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsOEJBQWUsR0FBZixVQUFnQixXQUEyQixFQUFFLEdBQTJCLEVBQUUsSUFBb0I7UUFBcEIsbUNBQW9CO1FBQzFGLFdBQVcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxnQ0FBaUIsR0FBakIsVUFBa0IsT0FBTyxFQUFFLFVBQVU7UUFDakMsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsVUFBVSxHQUFHLE9BQU8sQ0FBQztJQUNuRCxDQUFDO0lBRUQsZ0NBQWlCLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUNsRCxDQUFDO0lBRUQseUJBQVUsR0FBVixVQUFXLElBQW9CO1FBQzNCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpQ0FBa0IsR0FBbEIsVUFBbUIsS0FBYSxFQUFFLElBQVk7UUFFMUMsSUFBSSxXQUFvQixDQUFDO1FBQ3pCLElBQUksSUFBWTtRQUdoQixJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUUsQ0FBQztRQUVsRyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuQyxJQUFLLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxNQUFNLElBQUksQ0FBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBRSxFQUFFO1lBQ3hFLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7U0FDbEM7UUFDRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLFdBQVcsR0FBRyxXQUFXLElBQUksQ0FBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDO1FBRS9DLElBQUksR0FBRyxDQUFDLENBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLEdBQUcsQ0FBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUUsR0FBRyxDQUFFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBRSxDQUFDO1FBQy9ELElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLFdBQVcsR0FBRyxXQUFXLElBQUksQ0FBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDO1FBRS9DLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFLTyx3QkFBUyxHQUFqQixVQUFrQixVQUEwQjtRQUFFLGlCQUFvQjthQUFwQixVQUFvQixFQUFwQixxQkFBb0IsRUFBcEIsSUFBb0I7WUFBcEIsZ0NBQW9COztRQUM5RCxJQUFJLElBQUksR0FBbUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6RCxLQUFNLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRztZQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQztRQUNELFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLDhCQUFlLEdBQXZCLFVBQXdCLEdBQVE7UUFDNUIsSUFBSyxJQUE2QixFQUFHO1lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQzdELElBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUc7Z0JBQzdCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ3REO2lCQUFNLElBQUssQ0FBQyxFQUFHO2dCQUNaLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDL0M7U0FDSjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU8sd0JBQVMsR0FBakIsVUFBa0IsQ0FBTTtRQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU8sZ0NBQWlCLEdBQXpCLFVBQTBCLEdBQVc7UUFFakMsT0FBTyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQztBQUlELGtCQUFlLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDOWdCcEIsSUFBSSxjQUFjLEdBQWE7SUFHM0IsVUFBVSxFQUFFLFNBQVM7SUFDckIsS0FBSyxFQUFFLElBQUk7SUFDWCxNQUFNLEVBQUUsQ0FBQztJQUNULE1BQU0sRUFBRSxFQUFFO0lBQ1YsSUFBSSxFQUFFLENBQUM7SUFDUCxPQUFPLEVBQUUsS0FBSztJQUNkLEtBQUssRUFBRSxJQUFJO0lBRVgsTUFBTSxFQUFFLE9BQU87SUFDZixRQUFRLEVBQUUsS0FBSztJQUNmLE9BQU8sRUFBRSxLQUFLO0lBQ2QsV0FBVyxFQUFFLEtBQUs7SUFDbEIsS0FBSyxFQUFFLEtBQUs7SUFDWixTQUFTLEVBQUUsSUFBSTtJQUNmLFNBQVMsRUFBRSxLQUFLO0NBQ25CO0FBRVEsd0NBQWM7Ozs7Ozs7Ozs7Ozs7OztBQzVDdkIsbUVBQXNDO0FBQ3RDLGdFQUFtQztBQUNuQywrRUFBb0M7QUFDcEMsOEZBQWdEO0FBRWhELDRFQUFvQztBQUVwQyw0RUFBa0M7QUFHbEMsQ0FBQyxVQUFTLENBQUM7SUFFVCxJQUFJLE9BQU8sR0FBVztRQUVwQixJQUFJLEVBQUUsVUFBVSxPQUFhO1lBRTNCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztnQkFFZixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3BDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFHbkIsSUFBSyxDQUFFLElBQUksRUFBRztvQkFFWixPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsK0JBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFFaEQsSUFBSSxLQUFLLEdBQVcsSUFBSSxlQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBR3ZDLElBQUksSUFBSSxHQUFVLElBQUksY0FBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBSWpELElBQUksR0FBRyxTQUFrQixDQUFDO29CQUMxQixHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDekMsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUUvQixJQUFJLFNBQVMsR0FBRyxJQUFJLG1CQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFFcEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7d0JBQ3pCLE1BQU0sRUFBRyxNQUFNO3dCQUNmLEtBQUssRUFBRSxLQUFLO3dCQUNaLElBQUksRUFBRSxJQUFJO3dCQUNWLFNBQVMsRUFBRSxTQUFTO3dCQUNwQixPQUFPLEVBQUUsT0FBTztxQkFDakIsQ0FBQyxDQUFDO2lCQUVKO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxFQUFFLFVBQVUsT0FBWTtZQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUU7Z0JBRWhCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUNyRCxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTVCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE9BQU8sRUFBRTtZQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBRTtnQkFFaEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUVwQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNyQixLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRWpDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE9BQU8sRUFBRSxVQUFVLElBQUk7WUFJckIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDakQsSUFBSSxRQUFRLEdBQWMsSUFBSSxtQkFBUSxDQUFFLElBQUksQ0FBRSxDQUFDO1lBRS9DLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsQ0FBQztLQUNGO0lBR0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxNQUFNO1FBR2pDLElBQUssT0FBTyxDQUFDLE1BQWdCLENBQUMsRUFBRztZQUMvQixPQUFPLE9BQU8sQ0FBRSxNQUFnQixDQUFFLENBQUMsS0FBSyxDQUFFLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUUsU0FBUyxFQUFFLENBQUMsQ0FBRSxDQUFDLENBQUM7U0FDN0Y7YUFBTSxJQUFLLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFFLE1BQU0sRUFBRztZQUluRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFFLElBQUksRUFBRSxTQUFTLENBQUUsQ0FBQztTQUM5QzthQUFNO1lBQ0wsQ0FBQyxDQUFDLEtBQUssQ0FBRSxnQkFBZ0IsR0FBSSxNQUFNLEdBQUcsbUNBQW1DLENBQUUsQ0FBQztTQUM3RTtJQUVILENBQUMsQ0FBQztBQUVKLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwiZmlsZSI6InNsaWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IElPcHRpb25zLCB7IGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcblxyXG5pbnRlcmZhY2UgSU1vZGVsIHtcclxuICAgIC8vIDFcclxuICAgIGdldFZhbCgpOiBudW1iZXI7XHJcbiAgICBzZXRWYWwobmV3VmFsOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgLy8gMlxyXG4gICAgZ2V0UmFuZ2UoKTogW251bWJlciwgbnVtYmVyXTtcclxuICAgIHNldFJhbmdlKG5ld1JhbmdlOiBbbnVtYmVyLCBudW1iZXJdKTogdm9pZDtcclxuICAgIC8vIDNcclxuICAgIGdldFN0ZXAoKTogbnVtYmVyO1xyXG4gICAgLy8gNFxyXG4gICAgZ2V0TWluVmFsKCk6IG51bWJlcjtcclxuICAgIC8vIDVcclxuICAgIGdldE1heFZhbCgpOiBudW1iZXI7XHJcbiAgICAvLyA2XHJcbiAgICBnZXRSZXZlcnNlKCk6IGJvb2xlYW47XHJcbiAgICAvLyA3XHJcbiAgICBnZXRDdXN0b21WYWx1ZXMoKTogc3RyaW5nW10gfCB1bmRlZmluZWQ7XHJcbiAgICAvLyA4XHJcbiAgICBnZXREYXRhRm9ybWF0KCk6IHN0cmluZztcclxuICAgIC8vIDlcclxuICAgIGdldE9wdGlvbnMoKTogSU1vZGVsT3B0aW9ucztcclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBmaW5kUG9zaXRpb25JbkFycih2YWw6IGFueSwgYXJyPzogYW55W10pOiBudW1iZXI7XHJcbiAgICBnZXRTdGVwTnVtYmVyKHZhbDogbnVtYmVyKTogbnVtYmVyO1xyXG4gICAgdHJhbnNsYXRlQnlTdGVwKHN0ZXA6IG51bWJlcik6IG51bWJlciB8IHN0cmluZyB8IERhdGU7IC8vINC/0L4g0YjQsNCz0YNcclxuICAgIHRyYW5zbGF0ZSh2YWw6IG51bWJlcik6IG51bWJlciB8IHN0cmluZyB8IERhdGU7IC8vINC/0L4g0LLQsNC70LjQtNC90L7QvNGDINC30L3QsNGH0LXQvdC40Y5cclxuICAgIGdldE51bWJlck9mU3RlcHMoKTogbnVtYmVyO1xyXG4gICAgY2hhbmdlKG5ld09wdGlvbnM6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJTW9kZWxPcHRpb25zIHtcclxuICAgIGRhdGFGb3JtYXQ6IHN0cmluZztcclxuICAgIHZhbHVlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgbWluVmFsOiBudW1iZXI7XHJcbiAgICBtYXhWYWw6IG51bWJlcjtcclxuICAgIHN0ZXA6IG51bWJlcjtcclxuICAgIHJldmVyc2U6IGJvb2xlYW47XHJcbiAgICByYW5nZTogW251bWJlciwgbnVtYmVyXSB8IG51bGw7IFxyXG4gICAgY3VzdG9tVmFsdWVzPzogc3RyaW5nW107XHJcbn1cclxuXHJcbmNsYXNzIE1vZGVsIGltcGxlbWVudHMgSU1vZGVsIHtcclxuXHJcbiAgICBwcml2YXRlIF9kYXRhRm9ybWF0OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF92YWw6IG51bWJlciB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9taW5WYWw6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX21heFZhbDpudW1iZXI7ICAgXHJcbiAgICBwcml2YXRlIF9zdGVwOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9yZXZlcnNlOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBfY3VzdG9tVmFsdWVzPzogc3RyaW5nW10gfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9vcHRpb25zOiBJTW9kZWxPcHRpb25zIHwgYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFsbE9wdGlvbnM6IElPcHRpb25zKSB7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zOiBJT3B0aW9ucyA9IGFsbE9wdGlvbnM7XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0L3QtSDRg9C60LDQt9Cw0L3QviDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwg0YPQutCw0LfRi9Cy0LDQtdC8INC80LjQvdC40LzQsNC70YzQvdC+0LUuXHJcbiAgICAgICAgLy8g0Y3RgtC+INC90LXQvtCx0YXQvtC00LjQvNC+INGH0YLQvtCx0Ysg0L/RgNC+0LnRgtC4INCy0LDQu9C40LTQsNGG0LjRjiDQuCDQv9C+0YHRgtCw0LLQuNGC0Ywg0LHQtdCz0YPQvdC+0Log0YHQvtCz0LvQsNGB0L3QviDRiNCw0LPRgy5cclxuICAgICAgICAvLyDQtdGB0LvQuCDRg9C60LDQt9Cw0L0gcmFuZ2UsINC80LXQvdGP0LXQvCDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQvdCwIG51bGxcclxuICAgICAgICBvcHRpb25zLnZhbHVlID0gb3B0aW9ucy52YWx1ZSA/IG9wdGlvbnMudmFsdWUgOiBvcHRpb25zLm1pblZhbDtcclxuICAgICAgICBsZXQgdmFsaWRPcHRpb25zOiBJTW9kZWxPcHRpb25zO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnbnVtZXJpYycgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMudmFsaWRhdGVOdW1lcmljRm9ybWF0KG9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdkYXRlJyApIHtcclxuICAgICAgICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC00LDRgtGLINCyINC90LDRh9Cw0LvRjNC90L7QvCDRhNC+0YLRgNC80LDRgtC1LCDQvdCw0L/RgCBkZC9tbS95eXl5XHJcbiAgICAgICAgICAgIC8vINGH0YLQvtCx0Ysg0LzQvtC20L3QviDQsdGL0LvQviDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0LjRhSDQtNC70Y8g0LjQt9C80LXQvdC10L3QuNGPINC80L7QtNC10LvQuFxyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgYWxsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMudmFsaWRhdGVEYXRlRm9ybWF0KG9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdjdXN0b20nICkge1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLnZhbGlkYXRlQ3VzdG9tRm9ybWF0KG9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlcyA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9mIGRhdGEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RhdGFGb3JtYXQgPSB2YWxpZE9wdGlvbnMuZGF0YUZvcm1hdDtcclxuICAgICAgICB0aGlzLl92YWwgPSB2YWxpZE9wdGlvbnMudmFsdWU7XHJcbiAgICAgICAgdGhpcy5fbWluVmFsID0gdmFsaWRPcHRpb25zLm1pblZhbDtcclxuICAgICAgICB0aGlzLl9tYXhWYWwgPSB2YWxpZE9wdGlvbnMubWF4VmFsO1xyXG4gICAgICAgIHRoaXMuX3N0ZXAgPSB2YWxpZE9wdGlvbnMuc3RlcDtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlID0gdmFsaWRPcHRpb25zLnJldmVyc2U7XHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSB2YWxpZE9wdGlvbnMucmFuZ2U7XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tVmFsdWVzID0gdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlczsgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCAhPSAnZGF0ZScpIHRoaXMuX29wdGlvbnMgPSB2YWxpZE9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMVxyXG4gICAgZ2V0VmFsKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbDtcclxuICAgIH1cclxuICAgIHNldFZhbChuZXdWYWw6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXJlTnVtZXJpYyhuZXdWYWwpO1xyXG4gICAgICAgIHRoaXMuaXNPbmVWYWx1ZVZhbGlkKHRoaXMuX21pblZhbCwgdGhpcy5fbWF4VmFsLCBuZXdWYWwsIHRoaXMuX3N0ZXApO1xyXG4gICAgICAgIHRoaXMuX3ZhbCA9IG5ld1ZhbDtcclxuICAgIH1cclxuICAgIC8vIDJcclxuICAgIGdldFJhbmdlKCk6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYW5nZTtcclxuICAgIH1cclxuICAgIHNldFJhbmdlKG5ld1JhbmdlOiBbbnVtYmVyLCBudW1iZXJdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcmVOdW1lcmljKG5ld1JhbmdlWzBdLCBuZXdSYW5nZVsxXSlcclxuICAgICAgICB0aGlzLmlzUmFuZ2VWYWxpZCh0aGlzLl9taW5WYWwsIHRoaXMuX21heFZhbCwgbmV3UmFuZ2UsIHRoaXMuX3N0ZXApO1xyXG5cclxuICAgICAgICBpZiAoIHRoaXMuYXJlTWluTWF4VmFsaWQobmV3UmFuZ2VbMF0sIG5ld1JhbmdlWzFdLCB0aGlzLl9yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFuZ2UgPSBuZXdSYW5nZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9yYW5nZSA9IFtuZXdSYW5nZVsxXSwgbmV3UmFuZ2VbMF1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBuZXdSYW5nZTtcclxuICAgIH1cclxuICAgIC8vIDNcclxuICAgIGdldFN0ZXAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcDtcclxuICAgIH1cclxuICAgIC8vIDRcclxuICAgIGdldE1pblZhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5WYWw7XHJcbiAgICB9XHJcbiAgICAvLyA1XHJcbiAgICBnZXRNYXhWYWwoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4VmFsO1xyXG4gICAgfVxyXG4gICAgLy8gNlxyXG4gICAgZ2V0UmV2ZXJzZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmV2ZXJzZTtcclxuICAgIH1cclxuICAgIC8vIDdcclxuICAgIGdldEN1c3RvbVZhbHVlcygpOiBhbnlbXSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1c3RvbVZhbHVlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gOFxyXG4gICAgZ2V0RGF0YUZvcm1hdCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhRm9ybWF0O1xyXG4gICAgfVxyXG4gICAgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zIHtcclxuXHJcbiAgICAgICAgbGV0IG9wdHM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLl9vcHRpb25zO1xyXG4gICAgICAgIGlmICggIXRoaXMuX3JhbmdlICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbDogYW55O1xyXG4gICAgICAgICAgICAvL3ZhbCA9IHRoaXMudHJhbnNsYXRlKCB0aGlzLl92YWwgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdkYXRlJykge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3ZhbCApO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9ICgnMCcgKyB2YWwuZ2V0RGF0ZSgpKS5zbGljZSgtMikgKyBcclxuICAgICAgICAgICAgICAgICcvJyArICgnMCcgKyAoMSArIHZhbC5nZXRNb250aCgpKSApLnNsaWNlKC0yKSArXHJcbiAgICAgICAgICAgICAgICAnLycgKyAoIHZhbC5nZXRGdWxsWWVhcigpICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLl92YWw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9wdHMudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIG9wdHMucmFuZ2UgPSBudWxsO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbDogYW55O1xyXG4gICAgICAgICAgICBsZXQgYXJyOiBbYW55LCBhbnldID0gW251bGwsIG51bGxdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgIT0gJ2RhdGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgYXJyID0gdGhpcy5fcmFuZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3JhbmdlWzBdICk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSAoJzAnICsgdmFsLmdldERhdGUoKSkuc2xpY2UoLTIpICsgXHJcbiAgICAgICAgICAgICAgICAnLycgKyAoJzAnICsgKDEgKyB2YWwuZ2V0TW9udGgoKSkgKS5zbGljZSgtMikgK1xyXG4gICAgICAgICAgICAgICAgJy8nICsgdmFsLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXJyWzBdID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudHJhbnNsYXRlKCB0aGlzLl9yYW5nZVsxXSApO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gKCcwJyArIHZhbC5nZXREYXRlKCkpLnNsaWNlKC0yKSArIFxyXG4gICAgICAgICAgICAgICAgJy8nICsgKCcwJyArICgxICsgdmFsLmdldE1vbnRoKCkpICkuc2xpY2UoLTIpICtcclxuICAgICAgICAgICAgICAgICcvJyArIHZhbC5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGFyclsxXSA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0cy52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIG9wdHMucmFuZ2UgPSBhcnI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0cztcclxuICAgIH1cclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBmaW5kUG9zaXRpb25JbkFycih2YWw6IGFueSwgYXJyPzogYW55W10pOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC40YnQtdGCINC/0L7Qt9C40YbQuNGOIHZhbCDQsiBjdXN0b20gdmFsdWVzXHJcbiAgICAgICAgLy8g0YLQsNC6INC20LUg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNGB0L/QvtC70YzQt9C+0LLQsNC9INGBINC70Y7QsdGL0Lwg0LTRgNGD0LPQuCDQvNCw0YHRgdC40LLQvtC8XHJcbiAgICAgICAgaWYgKCBhcnIgJiYgYXJyLmluZGV4T2YodmFsKSAhPSAtMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFyci5pbmRleE9mKHZhbCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICggYXJyICYmIGFyci5pbmRleE9mKHZhbCkgPT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudCBmaW5kIHZhbHVlIGluIGFycmF5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICF0aGlzLl9jdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHRoaXMuX2N1c3RvbVZhbHVlcy5pbmRleE9mKHZhbCkgIT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXMuaW5kZXhPZih2YWwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHZhbGlkIHZhbHVlIGZvciBjdXN0b20gdmFsdWVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0ZXBOdW1iZXIodmFsOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC90LDRhdC+0LTQuNGCLCDQvdCwINC60LDQutC+0Lwg0L/QviDRgdGH0LXRgtGDINGI0LDQs9C1INGB0YLQvtC40YIgdmFsXHJcbiAgICAgICAgLy8g0L/RgNC40LzQtdC90Y/RgtGMINGC0L7Qu9GM0LrQviDQtNC70Y8g0L3QtdGC0YDQsNC90YHRhNC+0YDQvNC40YDQvtCy0LDQvdC90YvRhSwg0L/RgNCw0LLQuNC70YzQvdGL0YUg0LfQvdCw0YfQtdC90LjQuSFcclxuICAgICAgICBsZXQgc3RlcE51bTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5maW5kRGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5maW5kRGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcblxyXG4gICAgICAgIGxldCBhOiBudW1iZXIgPSArKHZhbCAtIHRoaXMuX21pblZhbCkudG9GaXhlZChuKTtcclxuICAgICAgICBsZXQgYjogbnVtYmVyID0gKyh0aGlzLl9tYXhWYWwgLSB0aGlzLl9taW5WYWwpLnRvRml4ZWQobilcclxuICAgICAgICBcclxuICAgICAgICBzdGVwTnVtID0gKyggYSAqIHRoaXMuZ2V0TnVtYmVyT2ZTdGVwcygpIC8gYiApLnRvRml4ZWQoKTtcclxuICAgICAgICBzdGVwTnVtID0gTWF0aC5hYnMoc3RlcE51bSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGVwTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zbGF0ZUJ5U3RlcChzdGVwOiBudW1iZXIpOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnY3VzdG9tJykge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5fcmV2ZXJzZSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXNbc3RlcF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzW3RoaXMuX2N1c3RvbVZhbHVlcy5sZW5ndGggLSBzdGVwIC0gMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuICAgICAgICAgICAgbGV0IHI6IG51bWJlciA9ICF0aGlzLl9yZXZlcnNlID8gMSA6IC0xO1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgPSArKCAoK3RoaXMuX21pblZhbCkgKyAoK3RoaXMuX3N0ZXApICogKCtzdGVwKSAqICgrcikgKS50b0ZpeGVkKG4pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbCk7IFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICByZXR1cm4gdmFsOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2xhdGUodmFsKTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdjdXN0b20nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXNbdmFsXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdkYXRlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodmFsKTsgXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXROdW1iZXJPZlN0ZXBzKCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuICAgICAgICBuID0gTWF0aC5wb3coMTAsIG4pO1xyXG4gICAgICAgIHJldHVybiAoIE1hdGguYWJzKHRoaXMuX21heFZhbCAtIHRoaXMuX21pblZhbCkgKiBuICkgLyAoIHRoaXMuX3N0ZXAgKiBuICk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlKG5ld09wdGlvbnM6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgcHJldk9wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLl9vcHRpb25zO1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBhbnkgPSBPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgbmV3T3B0aW9ucyk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMudmFsdWUgPSBvcHRpb25zLnZhbHVlICE9IG51bGwgPyBvcHRpb25zLnZhbHVlIDogb3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgbGV0IHZhbGlkT3B0aW9uczogSU1vZGVsT3B0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ251bWVyaWMnICkge1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLnZhbGlkYXRlTnVtZXJpY0Zvcm1hdChvcHRpb25zLCBwcmV2T3B0aW9ucyBhcyBJT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnZGF0ZScgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMudmFsaWRhdGVEYXRlRm9ybWF0KG9wdGlvbnMsIHByZXZPcHRpb25zIGFzIElPcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBuZXdPcHRpb25zKTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnY3VzdG9tJyApIHtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy52YWxpZGF0ZUN1c3RvbUZvcm1hdChvcHRpb25zLCBwcmV2T3B0aW9ucyBhcyBJT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXMgPSBvcHRpb25zLmN1c3RvbVZhbHVlcztcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGZvcm1hdCBvZiBkYXRhJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kYXRhRm9ybWF0ID0gdmFsaWRPcHRpb25zLmRhdGFGb3JtYXQ7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gdmFsaWRPcHRpb25zLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX21pblZhbCA9IHZhbGlkT3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgdGhpcy5fbWF4VmFsID0gdmFsaWRPcHRpb25zLm1heFZhbDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gdmFsaWRPcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZSA9IHZhbGlkT3B0aW9ucy5yZXZlcnNlO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gdmFsaWRPcHRpb25zLnJhbmdlO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVZhbHVlcyA9IHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXM7ICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgIT0gJ2RhdGUnKSB0aGlzLl9vcHRpb25zID0gdmFsaWRPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVOdW1lcmljRm9ybWF0KGFsbE9wdGlvbnM6IElPcHRpb25zLCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMpOiBJTW9kZWxPcHRpb25zIHtcclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnMgPSBhbGxPcHRpb25zO1xyXG4gICAgICAgIC8vINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0L3QsNGH0LDQu9GM0L3Ri9C8INC+0L/RhtC40Y/QvCDQtNC10YTQvtC70YLQvdGL0LUg0LfQvdCw0YfQtdC90LjRjyDQuNC3IGRlZmF1bHRPcHRpb25zXHJcbiAgICAgICAgLy8g0L3QsNGH0LDQu9GM0L3QvtC80YMg0LfQvdCw0YfQtdC90LjRjiDQv9GA0LjRgdCy0LDQuNCy0LDQtdC8INC80LjQvdC40LzQsNC70YzQvdC+0LVcclxuICAgICAgICAvLyDQv9C+INC80LXRgNC1INC/0YDQvtGF0L7QttC00LXQvdC40Y8g0LLQsNC70LjQtNCw0YbQuNC4LCDQvNC10L3Rj9C10Lwg0LfQvdCw0YfQtdC90LjRjyDQvdCwINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjNGB0LrQuNC1XHJcbiAgICAgICAgbGV0IG5ld09wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGRhdGFGb3JtYXQ6ICdudW1lcmljJyxcclxuICAgICAgICAgICAgdmFsdWU6IGRlZmF1bHRPcHRpb25zLm1pblZhbCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgIG1pblZhbDogZGVmYXVsdE9wdGlvbnMubWluVmFsIGFzIG51bWJlcixcclxuICAgICAgICAgICAgbWF4VmFsOiBkZWZhdWx0T3B0aW9ucy5tYXhWYWwgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICBzdGVwOiBkZWZhdWx0T3B0aW9ucy5zdGVwLFxyXG4gICAgICAgICAgICByZXZlcnNlOiBkZWZhdWx0T3B0aW9ucy5yZXZlcnNlLFxyXG4gICAgICAgICAgICByYW5nZTogZGVmYXVsdE9wdGlvbnMucmFuZ2UgYXMgW251bWJlciwgbnVtYmVyXSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYXJlTnVtZXJpYyhvcHRpb25zLm1heFZhbCwgb3B0aW9ucy5taW5WYWwsIG9wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgIG5ld09wdGlvbnMuc3RlcCA9IE1hdGguYWJzKG9wdGlvbnMuc3RlcCk7XHJcbiAgICAgICAgbmV3T3B0aW9ucy5yZXZlcnNlID0gb3B0aW9ucy5yZXZlcnNlID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIG5ld09wdGlvbnMuZGF0YUZvcm1hdCA9IG9wdGlvbnMuZGF0YUZvcm1hdDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmlzU3RlcFZhbGlkKG9wdGlvbnMubWluVmFsIGFzIG51bWJlciwgb3B0aW9ucy5tYXhWYWwgYXMgbnVtYmVyLCBuZXdPcHRpb25zLnN0ZXApO1xyXG5cclxuICAgICAgICAvLyDQtdGB0LvQuCDQvNC40L0g0Lgg0LzQsNC60YEg0L/QtdGA0LXQv9GD0YLQsNC90Ysg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10LwsINC80LXQvdGP0LXQvCDQv9C+0YDRj9C00L7QulxyXG4gICAgICAgIC8vINC/0L7QtNGA0LDQt9GD0LzQtdCy0LDQtdGC0YHRjywg0YfRgtC+IG1pbiAtINGN0YLQviDRgtC+INGH0YLQviDRgdC70LXQstCwINC90LAg0YHQu9Cw0LnQtNC10YDQtSwgbWF4IC0g0YHQv9GA0LDQstCwXHJcbiAgICAgICAgaWYgKCB0aGlzLmFyZU1pbk1heFZhbGlkKG9wdGlvbnMubWluVmFsIGFzIG51bWJlciwgb3B0aW9ucy5tYXhWYWwgYXMgbnVtYmVyLCBuZXdPcHRpb25zLnJldmVyc2UpICkge1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLm1pblZhbCA9IG9wdGlvbnMubWluVmFsIGFzIG51bWJlcjtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5tYXhWYWwgPSBvcHRpb25zLm1heFZhbCBhcyBudW1iZXI7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5taW5WYWwgPSBvcHRpb25zLm1heFZhbCBhcyBudW1iZXI7XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMubWF4VmFsID0gb3B0aW9ucy5taW5WYWwgYXMgbnVtYmVyOyAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMucmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNSYW5nZVZhbGlkKG5ld09wdGlvbnMubWluVmFsLCBuZXdPcHRpb25zLm1heFZhbCwgb3B0aW9ucy5yYW5nZSBhcyBbbnVtYmVyLCBudW1iZXJdLCBuZXdPcHRpb25zLnN0ZXApO1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQvNC40L0g0Lgg0LzQsNC60YEg0LIg0LTQuNCw0L/QsNC30L7QvdC1IHJhbmdlINC/0LXRgNC10L/Rg9GC0LDQvdGLINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8LCDQvNC10L3Rj9C10Lwg0L/QvtGA0Y/QtNC+0LpcclxuICAgICAgICAgICAgaWYgKCB0aGlzLmFyZU1pbk1heFZhbGlkKG9wdGlvbnMucmFuZ2VbMF0gYXMgbnVtYmVyLCBvcHRpb25zLnJhbmdlWzFdIGFzIG51bWJlciwgbmV3T3B0aW9ucy5yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgICAgIG5ld09wdGlvbnMucmFuZ2UgPSBvcHRpb25zLnJhbmdlIGFzIFtudW1iZXIsIG51bWJlcl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdPcHRpb25zLnJhbmdlID0gW29wdGlvbnMucmFuZ2VbMV0gYXMgbnVtYmVyLCBvcHRpb25zLnJhbmdlWzBdIGFzIG51bWJlcl07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vINC+0YLQvNC10L3Rj9C10Lwg0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUsINC00LDQttC1INC10YHQu9C4INC+0L3QviDQstCy0LXQtNC10L3QviDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvFxyXG4gICAgICAgICAgICBuZXdPcHRpb25zLnZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0LfQsNC/0YPRgdC60LDQtdC8INC/0YDQvtCy0LXRgNC60Lgg0LTQu9GPINC90LDRh9Cw0LvRjNC90L7Qs9C+INC30L3QsNGH0LXQvdC40Y8sINGC0L7Qu9GM0LrQviDQtdGB0LvQuCDQvdC1INGD0LrQsNC30LDQvSDQtNC40LDQv9Cw0LfQvtC9IHJhbmdlXHJcbiAgICAgICAgICAgIHRoaXMuYXJlTnVtZXJpYyhvcHRpb25zLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5pc09uZVZhbHVlVmFsaWQobmV3T3B0aW9ucy5taW5WYWwsIG5ld09wdGlvbnMubWF4VmFsLCBvcHRpb25zLnZhbHVlIGFzIG51bWJlciwgbmV3T3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMudmFsdWUgPSBvcHRpb25zLnZhbHVlIGFzIG51bWJlcjtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5yYW5nZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXdPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlRGF0ZUZvcm1hdChhbGxPcHRpb25zOiBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zKTogSU1vZGVsT3B0aW9ucyB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IElPcHRpb25zID0gYWxsT3B0aW9ucztcclxuXHJcbiAgICAgICAgdGhpcy5pc0N1c3RvbURhdGVWYWxpZChvcHRpb25zLm1pblZhbCwgb3B0aW9ucy5tYXhWYWwpO1xyXG4gICAgICAgIG9wdGlvbnMubWluVmFsID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5taW5WYWwgYXMgc3RyaW5nKTtcclxuICAgICAgICBvcHRpb25zLm1heFZhbCA9IHRoaXMudHJhbnNsYXRlRGF0ZVRvTnVtYmVyKG9wdGlvbnMubWF4VmFsIGFzIHN0cmluZyk7XHJcbiAgICAgICAgb3B0aW9ucy5zdGVwID0gdGhpcy50cmFubGF0ZVN0ZXBUb0RhdGVGb3JtYXQob3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgaWYgKCBBcnJheS5pc0FycmF5KG9wdGlvbnMucmFuZ2UpICYmIG9wdGlvbnMucmFuZ2UubGVuZ3RoID09IDIgKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQstCy0LXQuyDRh9GC0L4g0YLQviDQtNGA0YPQs9C+0LUsINCwINC90LUgcmFuZ2UsINC90LAg0Y3RgtC+0LxcclxuICAgICAgICAgICAgLy8g0Y3RgtCw0L/QtSDQvtGI0LjQsdC60Lgg0L3QtSDQsdGD0LTQtdGCLiDQntC90LAg0L/QvtGP0LLQuNGC0YHRjyDQv9GA0Lgg0L/RgNC+0LLQtdGA0LrQtSDQvdCwIHZhbGlkYXRlTnVtZXJpY0Zvcm1hdFxyXG4gICAgICAgICAgICAvLyAo0L/QvtGC0L7QvNGDINGH0YLQviByYW5nZSDRgtCw0Log0Lgg0L7RgdGC0LDQtdGC0YHRjyB0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLmlzQ3VzdG9tRGF0ZVZhbGlkKG9wdGlvbnMucmFuZ2VbMF0sIG9wdGlvbnMucmFuZ2VbMV0pO1xyXG4gICAgICAgICAgICBvcHRpb25zLnJhbmdlWzBdID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5yYW5nZVswXSBhcyBzdHJpbmcpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnJhbmdlWzFdID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5yYW5nZVsxXSBhcyBzdHJpbmcpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmlzQ3VzdG9tRGF0ZVZhbGlkKG9wdGlvbnMudmFsdWUpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy52YWx1ZSBhcyBzdHJpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZU51bWVyaWNGb3JtYXQob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlQ3VzdG9tRm9ybWF0KGFsbE9wdGlvbnM6IElPcHRpb25zLCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMpOiBJTW9kZWxPcHRpb25zIHtcclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnMgPSBhbGxPcHRpb25zO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLmN1c3RvbVZhbHVlcyApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjdXN0b21WYWx1ZXMgaXMgcmVxdWlyZWQgb3B0aW9uIGZvciBjdXN0b20gZm9ybWF0Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICggIUFycmF5LmlzQXJyYXkob3B0aW9ucy5jdXN0b21WYWx1ZXMpIHx8IG9wdGlvbnMuY3VzdG9tVmFsdWVzLmxlbmd0aCA8IDIgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY3VzdG9tVmFsdWVzIHNob3VsZCBiZSBhIHJhbmdlIHdpdGggdHdvIG9yIG1vcmUgaXRlbXMsIGxpa2UgWzEsIDIsIFwiYVwiXScpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIG9wdGlvbnMubWluVmFsID0gMDtcclxuICAgICAgICBvcHRpb25zLm1heFZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgb3B0aW9ucy5zdGVwID0gMTtcclxuXHJcbiAgICAgICAgLy8g0L/RgNC40L7RgNC40YLQtdGC0Ysg0L7Qv9GG0LjQuTpcclxuICAgICAgICAvLyAxLiByYW5nZSDQsiDRh9C40YHQu9Cw0YVcclxuICAgICAgICAvLyAyLiByYW5nZSDQsiDQt9C90LDRh9C10L3QuNGP0YVcclxuICAgICAgICAvLyAzLiB2YWx1ZSDQutCw0Log0YfQuNGB0LvQvlxyXG4gICAgICAgIC8vIDQuIHZhbHVlINC60LDQuiDQt9C90LDRh9C10L3QuNC1IFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5yYW5nZSB8fCBvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXMgKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFvcHRpb25zLnJhbmdlICYmIEFycmF5LmlzQXJyYXkob3B0aW9ucy5yYW5nZUluQ3VzdG9tVmFsdWVzKSAmJiBvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXMubGVuZ3RoID09IDIgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LLQstC10Lsg0YfRgtC+INGC0L4g0LTRgNGD0LPQvtC1LCDQsCDQvdC1IHJhbmdlLCDQvdCwINGN0YLQvtC8XHJcbiAgICAgICAgICAgICAgICAvLyDRjdGC0LDQv9C1INC+0YjQuNCx0LrQuCDQvdC1INCx0YPQtNC10YIuINCe0L3QsCDQv9C+0Y/QstC40YLRgdGPINC/0YDQuCDQv9GA0L7QstC10YDQutC1INC90LAgdmFsaWRhdGVOdW1lcmljRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAvLyAo0L/QvtGC0L7QvNGDINGH0YLQviByYW5nZSDRgtCw0Log0Lgg0L7RgdGC0LDQtdGC0YHRjyB0cnVlKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IFswLCAwXTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMF0gPSB0aGlzLmZpbmRQb3NpdGlvbkluQXJyKG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlc1swXSwgb3B0aW9ucy5jdXN0b21WYWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVsxXSA9IHRoaXMuZmluZFBvc2l0aW9uSW5BcnIob3B0aW9ucy5yYW5nZUluQ3VzdG9tVmFsdWVzWzFdLCBvcHRpb25zLmN1c3RvbVZhbHVlcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L3QtSDQstCy0LXQtNC10L3RiyB2YWwg0LjQu9C4IHJhbmdlINCyIGN1c3RvbSB2YWx1ZXNcclxuICAgICAgICAgICAgLy8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQv9GA0L7RgdGC0YvQtSB2YWx1ZSDQuNC70LggcmFuZ2UsINC10YHQu9C4INC+0L3QuCDQtdGB0YLRjCBcclxuICAgICAgICAgICAgaWYgKCAhb3B0aW9ucy52YWx1ZSAmJiBvcHRpb25zLnZhbHVlSW5DdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gdGhpcy5maW5kUG9zaXRpb25JbkFycihvcHRpb25zLnZhbHVlSW5DdXN0b21WYWx1ZXMsIG9wdGlvbnMuY3VzdG9tVmFsdWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZU51bWVyaWNGb3JtYXQob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFyZU51bWVyaWMoLi4udmFsczogYW55KSB7XHJcbiAgICAgICAgZm9yIChsZXQgdmFsIG9mIHZhbHMpIHtcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5pc051bWVyaWModmFsKSApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIHZhbHVlcyBpbiBudW1lcmljIGZvcm1hdCBzaG91bGQgYmUgbnVtYmVycycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXJlTWluTWF4VmFsaWQobWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyLCByZXZlcnNlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCAhcmV2ZXJzZSAmJiAobWluVmFsID49IG1heFZhbCkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCByZXZlcnNlICYmIChtaW5WYWwgPD0gbWF4VmFsKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzU3RlcFZhbGlkKG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlciwgc3RlcDogbnVtYmVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCAhdGhpcy5pc051bWVyaWMoc3RlcCkgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RlcCBzaG91bGQgYmUgYSBudW1iZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBzdGVwID09IDAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RlcCBjYW50IGJlIGVxdWFsIHRvIDAnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5maW5kRGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5maW5kRGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcbiAgICAgICAgbGV0IHRlc3Q6IG51bWJlciA9ICsobWF4VmFsIC0gbWluVmFsKS50b0ZpeGVkKG4pXHJcbiAgICAgICAgdGVzdCA9ICggdGVzdCAqIE1hdGgucG93KDEwLCBuKSApIC8gKCBzdGVwICogTWF0aC5wb3coMTAsIG4pICk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBpZiAoIHRlc3QgJSAxICE9IDAgKSB7XHJcbiAgICAgICAgICAgIC8vINCyINGC0L7QvCDRh9C40YHQu9C1INGN0YLQviDQv9GA0L7QstC10YDQutCwINGH0YLQvtCx0Ysg0YjQsNCzINCx0YvQuyDQvdC1INCx0L7Qu9GM0YjQtSDQstGB0LXQs9C+INC/0YDQvtC80LXQttGD0YLQutCwXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignKE1heCB2YWx1ZSAtIG1pbiB2YWx1ZSkgZGl2aWRlZCBieSBzdGVwIHNob3VsZCByZXR1cm4gaW50ZWdlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzT25lVmFsdWVWYWxpZChtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIsIHZhbDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHN0ZXApLCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKG1pblZhbCkgKTtcclxuXHJcbiAgICAgICAgbGV0IHRlc3Q6IG51bWJlciA9ICsodmFsIC0gbWluVmFsKS50b0ZpeGVkKG4pXHJcbiAgICAgICAgdGVzdCA9ICggdGVzdCAqIE1hdGgucG93KDEwLCBuKSApIC8gKCBzdGVwICogTWF0aC5wb3coMTAsIG4pICk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBpZiAoIE1hdGgubWF4KG1pblZhbCwgbWF4VmFsKSA8IHZhbCAgfHwgIE1hdGgubWluKG1pblZhbCwgbWF4VmFsKSA+IHZhbCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgaW5pdGlhbCB2YWx1ZSBzaG91bGQgYmUgd2l0aGluIG1pbiBhbmQgbWF4IHZhbHVlcycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGVzdCAlIDEgIT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBzaG91bGQgYmUgc2V0IG9uIHN0ZXAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1JhbmdlVmFsaWQobWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyLCByYW5nZTogW251bWJlciwgbnVtYmVyXSwgc3RlcDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5maW5kRGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5maW5kRGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcblxyXG4gICAgICAgIGxldCB0ZXN0TGVmdDogbnVtYmVyID0gKHJhbmdlWzBdIC0gbWluVmFsKSAvIHN0ZXA7XHJcbiAgICAgICAgdGVzdExlZnQgPSArdGVzdExlZnQudG9GaXhlZChuKTtcclxuICAgICAgICB0ZXN0TGVmdCA9IE1hdGguYWJzKHRlc3RMZWZ0KTtcclxuXHJcbiAgICAgICAgbGV0IHRlc3RSaWdodDogbnVtYmVyID0gKHJhbmdlWzFdIC0gbWluVmFsKSAvIHN0ZXA7XHJcbiAgICAgICAgdGVzdFJpZ2h0ID0gK3Rlc3RSaWdodC50b0ZpeGVkKG4pO1xyXG4gICAgICAgIHRlc3RSaWdodCA9IE1hdGguYWJzKHRlc3RSaWdodCk7XHJcblxyXG4gICAgICAgIGlmICggcmFuZ2UubGVuZ3RoICE9IDIgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmFuZ2Ugc2hvdWxkIGNvbnRhaW4gdHdvIHZhbHVlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyhyYW5nZVswXSkgfHwgIXRoaXMuaXNOdW1lcmljKHJhbmdlWzFdKSApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZXMgaW4gcmFuZ2Ugc2hvdWxkIGJlIG51bWJlcnMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBNYXRoLm1heChtaW5WYWwsIG1heFZhbCkgPCBNYXRoLm1heChyYW5nZVswXSwgcmFuZ2VbMV0pICB8fCAgTWF0aC5taW4obWluVmFsLCBtYXhWYWwpID4gTWF0aC5taW4ocmFuZ2VbMF0sIHJhbmdlWzFdKSApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcmFuZ2Ugc2hvdWxkIGJlIHdpdGhpbiBtaW4gYW5kIG1heCB2YWx1ZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0ZXN0TGVmdCAlIDEgIT0gMCB8fCB0ZXN0UmlnaHQgJSAxICE9IDAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHJhbmdlIHNob3VsZCBiZSBzZXQgb24gc3RlcCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzQ3VzdG9tRGF0ZVZhbGlkKC4uLnZhbHM6IGFueVtdKSB7XHJcbiAgICAgICAgZm9yICggbGV0IHZhbCBvZiB2YWxzICkge1xyXG4gICAgICAgICAgICBpZiAoICEoJycgKyB2YWwpLm1hdGNoKC9eXFxkezJ9Wy5cXC8tXVxcZHsyfVsuXFwvLV1cXGR7NH0kLykgKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FsbCB2YWx1ZXMgaW4gZGF0ZSBmb3JtYXQgc2hvdWxkIGJlIGRhdGVzLCBsaWtlIGRkLm1tLnl5eXkgb3IgZGQvbW0veXl5eSBvciBkZC1tbS15eXl5Jyk7IFxyXG4gICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJhbnNsYXRlRGF0ZVRvTnVtYmVyKHN0cjogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgYXJyID0gc3RyLnNwbGl0KHN0clsyXSk7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgrYXJyWzJdLCArYXJyWzFdIC0gMSwgK2FyclswXSk7XHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINCy0LLQvtC00LjRgiDRgdGC0YDQsNC90L3Ri9C1INC00LDQvdC90YvQtSwg0L7QvSDQstGB0LUg0YDQsNCy0L3QviDQv9C+0LvRg9GH0LjRgiDRgNC10LfRg9C70YzRgtCw0YIuXHJcbiAgICAgICAgLy8g0KHQutC+0YDQtdC1INCy0YHQtdCz0L4sINGN0YLQviDQs9C+0LLQvtGA0LjRgiDQviDRgtC+0LwsINGH0YLQviDQvtC9INC/0LXRgNC10L/Rg9GC0LDQuyDQv9C+0YDRj9C00L7Qui4g0J/QvtGP0LLQuNGC0YHRjyDQv9GA0LXQtNGD0L/RgNC10LbQtNC10L3QuNC1XHJcbiAgICAgICAgaWYgKCthcnJbMF0gPiAzMSB8fCArYXJyWzFdID4gMTIpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVc2UgZGQubW0ueXl5eSBvciBkZC9tbS95eXl5IG9yIGRkLW1tLXl5eXkgZm9yIGRhdGVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGF0ZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29ycmVjdCBkYXRlLCB0cnkgZGQubW0ueXl5eSBvciBkZC9tbS95eXl5IG9yIGRkLW1tLXl5eXknKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICtkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJhbmxhdGVTdGVwVG9EYXRlRm9ybWF0KHN0ZXA6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5pc051bWVyaWMoc3RlcCkgfHwgc3RlcCAlIDEgIT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGVwIGluIGRhdGUgZm9ybWF0IHNob3VsZCBiZSBpbnRlZ2VyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdGVwICogMjQgKiAzNjAwICogMTAwMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBpc051bWVyaWMobjogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiAhaXNOYU4obiAtIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmluZERlY2ltYWxQbGFjZXMobnVtOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC60L7Qu9C40YfQtdGB0YLQstC+INC30L3QsNC60L7QsiDQv9C+0YHQu9C1INC30LDQv9GP0YLQvtC5XHJcbiAgICAgICAgcmV0dXJuIH4obnVtICsgJycpLmluZGV4T2YoJy4nKSA/IChudW0gKyAnJykuc3BsaXQoJy4nKVsxXS5sZW5ndGggOiAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgSU1vZGVsIH07XHJcbmV4cG9ydCB7IElNb2RlbE9wdGlvbnMgfTtcclxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7XHJcbiIsIi8qKlxyXG4gKiDQmNC90YLRhNC10YDRhNC10LnRgSDQuNC30LTQsNGC0LXQu9GPINC+0LHRitGP0LLQu9GP0LXRgiDQvdCw0LHQvtGAINC80LXRgtC+0LTQvtCyINC00LvRjyDRg9C/0YDQsNCy0LvQtdC90LjRj9C80Lgg0L/QvtC00L/QuNGB0LrQuNGH0LDQvNC4LlxyXG4gKi9cclxuaW50ZXJmYWNlIElTdWJqZWN0IHtcclxuXHJcbiAgICB2YWw6IGFueSB8IFthbnksIGFueV07IFxyXG5cclxuICAgIC8vINCf0YDQuNGB0L7QtdC00LjQvdGP0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPINC6INC40LfQtNCw0YLQtdC70Y4uXHJcbiAgICBhdHRhY2gob2JzZXJ2ZXI6IElPYnNlcnZlcik6IHZvaWQ7XHJcblxyXG4gICAgLy8g0J7RgtGB0L7QtdC00LjQvdGP0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPINC+0YIg0LjQt9C00LDRgtC10LvRjy5cclxuICAgIGRldGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZDtcclxuXHJcbiAgICAvLyDQo9Cy0LXQtNC+0LzQu9GP0LXRgiDQstGB0LXRhSDQvdCw0LHQu9GO0LTQsNGC0LXQu9C10Lkg0L4g0YHQvtCx0YvRgtC40LguXHJcbiAgICBub3RpZnkoKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqINCY0LfQtNCw0YLQtdC70Ywg0LLQu9Cw0LTQtdC10YIg0L3QtdC60L7RgtC+0YDRi9C8INCy0LDQttC90YvQvCDRgdC+0YHRgtC+0Y/QvdC40LXQvCDQuCDQvtC/0L7QstC10YnQsNC10YIg0L3QsNCx0LvRjtC00LDRgtC10LvQtdC5INC+INC10LPQvlxyXG4gKiDQuNC30LzQtdC90LXQvdC40Y/RhS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YmplY3QgaW1wbGVtZW50cyBJU3ViamVjdCB7XHJcblxyXG4gICAgdmFsOiBhbnkgfCBbYW55LCBhbnldOyBcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggdmFsOiBhbnkgfCBbYW55LCBhbnldICkge1xyXG4gICAgICAgIHRoaXMudmFsID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge09ic2VydmVyW119INCh0L/QuNGB0L7QuiDQv9C+0LTQv9C40YHRh9C40LrQvtCyLiDQkiDRgNC10LDQu9GM0L3QvtC5INC20LjQt9C90Lgg0YHQv9C40YHQvtC6XHJcbiAgICAgKiDQv9C+0LTQv9C40YHRh9C40LrQvtCyINC80L7QttC10YIg0YXRgNCw0L3QuNGC0YzRgdGPINCyINCx0L7Qu9C10LUg0L/QvtC00YDQvtCx0L3QvtC8INCy0LjQtNC1ICjQutC70LDRgdGB0LjRhNC40YbQuNGA0YPQtdGC0YHRjyDQv9C+XHJcbiAgICAgKiDRgtC40L/RgyDRgdC+0LHRi9GC0LjRjyDQuCDRgi7QtC4pXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZXJzOiBJT2JzZXJ2ZXJbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JzQtdGC0L7QtNGLINGD0L/RgNCw0LLQu9C10L3QuNGPINC/0L7QtNC/0LjRgdC60L7QuS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJJbmRleCA9IHRoaXMub2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLnNwbGljZShvYnNlcnZlckluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCX0LDQv9GD0YHQuiDQvtCx0L3QvtCy0LvQtdC90LjRjyDQsiDQutCw0LbQtNC+0Lwg0L/QvtC00L/QuNGB0YfQuNC60LUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBub3RpZnkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qgb2JzZXJ2ZXIgb2YgdGhpcy5vYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIudXBkYXRlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCY0L3RgtC10YDRhNC10LnRgSDQndCw0LHQu9GO0LTQsNGC0LXQu9GPINC+0LHRitGP0LLQu9GP0LXRgiDQvNC10YLQvtC0INGD0LLQtdC00L7QvNC70LXQvdC40Y8sINC60L7RgtC+0YDRi9C5INC40LfQtNCw0YLQtdC70LhcclxuICog0LjRgdC/0L7Qu9GM0LfRg9GO0YIg0LTQu9GPINC+0L/QvtCy0LXRidC10L3QuNGPINGB0LLQvtC40YUg0L/QvtC00L/QuNGB0YfQuNC60L7Qsi5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmVyIHtcclxuICAgIGZ1bmM6IGFueTtcclxuICAgIC8vINCf0L7Qu9GD0YfQuNGC0Ywg0L7QsdC90L7QstC70LXQvdC40LUg0L7RgiDRgdGD0LHRitC10LrRgtCwLlxyXG4gICAgdXBkYXRlKHN1YmplY3Q6IFN1YmplY3QpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICog0JrQvtC90LrRgNC10YLQvdGL0LUg0J3QsNCx0LvRjtC00LDRgtC10LvQuCDRgNC10LDQs9C40YDRg9GO0YIg0L3QsCDQvtCx0L3QvtCy0LvQtdC90LjRjywg0LLRi9C/0YPRidC10L3QvdGL0LUg0JjQt9C00LDRgtC10LvQtdC8LCDQulxyXG4gKiDQutC+0YLQvtGA0L7QvNGDINC+0L3QuCDQv9GA0LjQutGA0LXQv9C70LXQvdGLLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9ic2VydmVyIGltcGxlbWVudHMgSU9ic2VydmVyIHtcclxuXHJcbiAgICBmdW5jOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZnVuYzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmZ1bmMgPSBmdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoc3ViamVjdDogU3ViamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnVuYyggc3ViamVjdC52YWwgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtJU3ViamVjdH07IiwiaW1wb3J0IElPcHRpb25zIGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQge0lNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCB7SU1vZGVsT3B0aW9uc30gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCB7SVZpZXd9IGZyb20gJy4vVmlldyc7XHJcbmltcG9ydCB7SVN1YmplY3R9ICBmcm9tICcuL09ic2VydmVyJztcclxuXHJcbmNsYXNzIFByZXNlbnRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW9kZWw6IElNb2RlbDtcclxuICAgIHByaXZhdGUgX3ZpZXc6IElWaWV3O1xyXG4gICAgcHJpdmF0ZSBfc3ViamVjdDogSVN1YmplY3Q7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0aXZlVGh1bWI6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1vZGVsOiBJTW9kZWwsIHZpZXc6IElWaWV3LCBzdWJqZWN0OiBJU3ViamVjdCkge1xyXG5cclxuICAgICAgICB0aGlzLl9tb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xyXG4gICAgICAgIHRoaXMuX3N1YmplY3QgPSBzdWJqZWN0O1xyXG5cclxuICAgICAgICB0aGlzLnRodW1iT25Eb3duID0gdGhpcy50aHVtYk9uRG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudGh1bWJPbk1vdmUgPSB0aGlzLnRodW1iT25Nb3ZlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy50aHVtYk9uVXAgPSB0aGlzLnRodW1iT25VcC5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlck9uQ2xpY2sgPSB0aGlzLnNsaWRlck9uQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgXHJcbiAgICAgICAgaWYgKCAhbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoKS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRodW1iT25Eb3duKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDEpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMikuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Eb3duKTtcclxuXHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMSkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMikuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgfSAgXHJcblxyXG4gICAgICAgIHZpZXcuZ2V0U2xpZGVyKCkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc2xpZGVyT25DbGljayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aHVtYk9uRG93bihldmVudCk6IHZvaWQge1xyXG4gICAgICAgIC8vINC/0YDQtdC00L7RgtCy0YDQsNGC0LjRgtGMINC30LDQv9GD0YHQuiDQstGL0LTQtdC70LXQvdC40Y8gKNC00LXQudGB0YLQstC40LUg0LHRgNCw0YPQt9C10YDQsClcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHVtYiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMudGh1bWJPbk1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnRodW1iT25VcCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy50aHVtYk9uTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRodW1iT25VcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aHVtYk9uTW92ZShldmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbW9kZWw6IElNb2RlbCA9IHRoaXMuX21vZGVsO1xyXG4gICAgICAgIGxldCB2aWV3OiBJVmlldyA9IHRoaXMuX3ZpZXc7XHJcblxyXG4gICAgICAgIGxldCBzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuX3ZpZXcuZ2V0U2xpZGVyKCk7XHJcbiAgICAgIFxyXG4gICAgICAgIGxldCBtaW5WYWw6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldE1pblZhbCgpO1xyXG4gICAgICAgIGxldCBtYXhWYWw6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldE1heFZhbCgpO1xyXG4gICAgICAgIGxldCBzdGVwOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbGV0IHJldmVyc2U6IG51bWJlciA9ICF0aGlzLl9tb2RlbC5nZXRSZXZlcnNlKCkgPyAxIDogLTE7XHJcbiAgICAgICAgbGV0IHNsaWRlckxlbmdodDogbnVtYmVyID0gdGhpcy5fdmlldy5nZXRMZW5naHQoKTtcclxuICAgICAgICBsZXQgc3RlcExlbmdodDogbnVtYmVyID0gdGhpcy5fdmlldy5maW5kT25lU3RlcExlbmdodCgpO1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyQm9yZGVyOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGV2ZW50UG9zOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHRodW1iUG9zaXRpb246IG51bWJlcjtcclxuICAgICAgICBsZXQgbGVmdFBvaW50OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHJpZ2h0UG9pbnQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgbmV3VmFsOiBudW1iZXI7XHJcblxyXG4gICAgICAgIC8vINCf0L7Qt9C40YbQuNGPINCx0LXQs9GD0L3QutCwINCyIHB4INCy0YvRh9C40YHQu9GP0LXRgtGB0Y8g0L7RgtC90L7RgdC40YLQtdC70YzQvdC+INC90LDRh9Cw0LvQsCDRgdC70LDQudC00LXRgNCwLlxyXG4gICAgICAgIC8vINCS0L3QsNGH0LDQu9C1IG5ld1ZhbCDQstGL0YfQuNGB0LvRj9C10YLRgdGPINC60LDQuiDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyINC+0YIg0L3QsNGH0LDQu9CwICjQvtGCIDApLFxyXG4gICAgICAgIC8vICjRgtC+INC10YHRgtGMINC30L3QsNGH0LXQvdC40Y8gbWluLCBtYXgsIHJldmVyc2Ug0L3QtSDQuNC80LXRjtGCINC30L3QsNGH0LXQvdC40Y8pLlxyXG5cclxuICAgICAgICBpZiAoICF2aWV3LmdldFZlcnRpY2FsKCkgKSB7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJCb3JkZXIgPSAoc2xpZGVyTm9kZS5vZmZzZXRXaWR0aCAtIHNsaWRlckxlbmdodCkgLyAyO1xyXG4gICAgICAgICAgICBldmVudFBvcyA9IGV2ZW50LmNsaWVudFggfHwgZXZlbnQudG91Y2hlc1swXS5jbGllbnRYOyAgICAgICAgIFxyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gZXZlbnRQb3MgLSBzbGlkZXJOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSBzbGlkZXJCb3JkZXI7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJCb3JkZXIgPSAoc2xpZGVyTm9kZS5vZmZzZXRIZWlnaHQgLSBzbGlkZXJMZW5naHQpIC8gMjtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSBldmVudC5jbGllbnRZIHx8IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGV2ZW50UG9zIC0gc2xpZGVyTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSBzbGlkZXJCb3JkZXI7XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgbmV3VmFsID0gTWF0aC5yb3VuZCh0aHVtYlBvc2l0aW9uIC8gc3RlcExlbmdodCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX2FjdGl2ZVRodW1iLmNsYXNzTGlzdC5jb250YWlucygnc2xpZGVyX190aHVtYl9yaWdodCcpICkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/RgNC+0LzQtdC20YPRgtC+0LosINGC0L4g0LvQtdCy0LDRjyDQs9GA0LDQvdC40YbQsCAtINGN0YLQviDQu9C10LLRi9C5INCx0LXQs9GD0L3QvtC6XHJcbiAgICAgICAgICAgICAgICAvLyDQt9C00LXRgdGMINGA0LDRgdGB0YfQuNGC0YvQstCw0LXRgtGB0Y8g0LrQvtC70LjRh9C10YHRgtCy0L4g0YjQsNCz0L7QsiDQvtGCINC90LDRh9Cw0LvQsCAo0L7RgiAwKSwgXHJcbiAgICAgICAgICAgICAgICAvLyDQt9Cw0YLQtdC8INGA0LDRgdGB0YLQvtGP0L3QuNC1INCyIHB4INC+0YIg0L3QsNGH0LDQu9CwINGB0LvQsNC50LTQtdGA0LAuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8g0J7RiNC40LHQutC4INCyINCy0YvRh9C40YHQu9C10L3QuNGP0YUg0YEgZmxvYXQg0LfQtNC10YHRjCDQvNC+0LbQvdC+INC/0YDQvtC40LPQvdC+0YDQuNGA0L7QstCw0YLRjFxyXG4gICAgICAgICAgICAgICAgbGVmdFBvaW50ID0gKG1vZGVsLmdldFJhbmdlKClbMF0gLSBtaW5WYWwpICogcmV2ZXJzZSAvIHN0ZXA7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UG9pbnQgPSBsZWZ0UG9pbnQgKiBzdGVwTGVuZ2h0O1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQb2ludCA9IHNsaWRlckxlbmdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5WYWwgPSBtb2RlbC5nZXRSYW5nZSgpWzBdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQb2ludCA9IChtb2RlbC5nZXRSYW5nZSgpWzFdIC0gbWluVmFsKSAqIHJldmVyc2UgLyBzdGVwO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQb2ludCA9IHJpZ2h0UG9pbnQgKiBzdGVwTGVuZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGVmdFBvaW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXhWYWwgPSBtb2RlbC5nZXRSYW5nZSgpWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGVmdFBvaW50ID0gMDtcclxuICAgICAgICAgICAgcmlnaHRQb2ludCA9IHNsaWRlckxlbmdodDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIHRodW1iUG9zaXRpb24gPD0gbGVmdFBvaW50KSB7XHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBsZWZ0UG9pbnQ7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IG1pblZhbDtcclxuICAgICAgICB9IGVsc2UgaWYgKCB0aHVtYlBvc2l0aW9uID49IHJpZ2h0UG9pbnQpIHtcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IHJpZ2h0UG9pbnQ7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IG1heFZhbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQsdC10LPRg9C90L7QuiDQvdC1INCy0YvRiNC10Lsg0LfQsCDQs9GA0LDQvdC40YbRiywg0YHRgtCw0LLQuNC8INC10LPQviDQvdCwINCx0LvQuNC20LDQudGI0LXQtSDQt9C90LDRh9C10L3QuNC1LFxyXG4gICAgICAgICAgICAvLyDQutGA0LDRgtC90L7QtSDRiNCw0LPRgy5cclxuICAgICAgICAgICAgLy8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0Y3RgtC+0LPQviDQv9GA0LXQvtCx0YDQsNC30YPQtdC8INC10LPQviDQtNC70Y8g0LzQvtC00LXQu9C4LiDQldGB0LvQuCByZXZlcnNlID09IHRydWUsINGC0L4gPT0gLTEgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBuZXdWYWwgKiBzdGVwTGVuZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZiA9IHggPT4gKCAoeC50b1N0cmluZygpLmluY2x1ZGVzKCcuJykpID8gKHgudG9TdHJpbmcoKS5zcGxpdCgnLicpLnBvcCgpLmxlbmd0aCkgOiAoMCkgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBuID0gZihzdGVwKSArIGYobWluVmFsKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKCBuZXdWYWwgKiBNYXRoLnBvdygxMCwgbikgKiBzdGVwICogcmV2ZXJzZSAgKSAvIE1hdGgucG93KDEwLCBuKTtcclxuXHJcbiAgICAgICAgICAgIG4gPSBNYXRoLm1heCggZihzdGVwKSwgZihtaW5WYWwpICk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICsoKCtuZXdWYWwpLnRvRml4ZWQobikpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSAoK21vZGVsLmdldE1pblZhbCgpKSArICgrbmV3VmFsKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKygoK25ld1ZhbCkudG9GaXhlZChuKSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXRSYW5nZSgpICYmIHRoaXMuX2FjdGl2ZVRodW1iLmNsYXNzTGlzdC5jb250YWlucygnc2xpZGVyX190aHVtYl9sZWZ0JykpIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0UmFuZ2UoIFtuZXdWYWwsIG1vZGVsLmdldFJhbmdlKClbMV1dICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG1vZGVsLmdldFJhbmdlKCkgJiYgdGhpcy5fYWN0aXZlVGh1bWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX3RodW1iX3JpZ2h0JykpIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0UmFuZ2UoIFttb2RlbC5nZXRSYW5nZSgpWzBdLCBuZXdWYWxdICk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1vZGVsLnNldFZhbChuZXdWYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMuX2FjdGl2ZVRodW1iLCB0aHVtYlBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoKSB8fCB2aWV3LmdldFRvb2x0aXAoMSkgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZShuZXdWYWwpO1xyXG5cclxuICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIHRoaXMuX2FjdGl2ZVRodW1iLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX3Rvb2x0aXAnKSwgdmFsLCB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHRodW1iT25VcChldmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy50aHVtYk9uVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMudGh1bWJPbk1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50aHVtYk9uVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudGh1bWJPbk1vdmUpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHVtYiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAvLyDQvdCw0LHQu9GO0LTQsNGC0LXQu9GMXHJcbiAgICAgICAgbGV0IG1vZGVsOiBJTW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXRWYWwoKSAhPSBudWxsICkge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gdmFsO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzBdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzBdID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzFdID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2xpZGVyT25DbGljayhldmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbW9kZWw6IElNb2RlbCA9IHRoaXMuX21vZGVsO1xyXG4gICAgICAgIGxldCB2aWV3OiBJVmlldyA9IHRoaXMuX3ZpZXc7XHJcblxyXG4gICAgICAgIGxldCBzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuX3ZpZXcuZ2V0U2xpZGVyKCk7XHJcbiAgICAgICAgbGV0IGNoYW5naW5nVGh1bWI6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICBcclxuICAgICAgICBsZXQgbWluVmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNaW5WYWwoKTtcclxuICAgICAgICBsZXQgbWF4VmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNYXhWYWwoKTtcclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIGxldCByZXZlcnNlOiBudW1iZXIgPSAhdGhpcy5fbW9kZWwuZ2V0UmV2ZXJzZSgpID8gMSA6IC0xO1xyXG4gICAgICAgIGxldCBzbGlkZXJMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcuZ2V0TGVuZ2h0KCk7XHJcbiAgICAgICAgbGV0IHN0ZXBMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcuZmluZE9uZVN0ZXBMZW5naHQoKTtcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlckJvcmRlcjogbnVtYmVyO1xyXG4gICAgICAgIGxldCBldmVudFBvczogbnVtYmVyO1xyXG4gICAgICAgIGxldCB0aHVtYlBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGxlZnRQb2ludDogbnVtYmVyO1xyXG4gICAgICAgIGxldCByaWdodFBvaW50OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG5ld1ZhbDogbnVtYmVyO1xyXG5cclxuICAgICAgICAvLyDQn9C+0LfQuNGG0LjRjyDQsdC10LPRg9C90LrQsCDQsiBweCDQstGL0YfQuNGB0LvRj9C10YLRgdGPINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDQvdCw0YfQsNC70LAg0YHQu9Cw0LnQtNC10YDQsC5cclxuICAgICAgICAvLyDQktC90LDRh9Cw0LvQtSBuZXdWYWwg0LLRi9GH0LjRgdC70Y/QtdGC0YHRjyDQutCw0Log0LrQvtC70LjRh9C10YHRgtCy0L4g0YjQsNCz0L7QsiDQvtGCINC90LDRh9Cw0LvQsCAo0L7RgiAwKSxcclxuICAgICAgICAvLyAo0YLQviDQtdGB0YLRjCDQt9C90LDRh9C10L3QuNGPIG1pbiwgbWF4LCByZXZlcnNlINC90LUg0LjQvNC10Y7RgiDQt9C90LDRh9C10L3QuNGPKS5cclxuXHJcbiAgICAgICAgaWYgKCAhdmlldy5nZXRWZXJ0aWNhbCgpICkge1xyXG5cclxuICAgICAgICAgICAgc2xpZGVyQm9yZGVyID0gKHNsaWRlck5vZGUub2Zmc2V0V2lkdGggLSBzbGlkZXJMZW5naHQpIC8gMjtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSBldmVudC5jbGllbnRYIHx8IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WDsgICAgICAgICBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGV2ZW50UG9zIC0gc2xpZGVyTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gc2xpZGVyQm9yZGVyO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgc2xpZGVyQm9yZGVyID0gKHNsaWRlck5vZGUub2Zmc2V0SGVpZ2h0IC0gc2xpZGVyTGVuZ2h0KSAvIDI7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gZXZlbnQuY2xpZW50WSB8fCBldmVudC50b3VjaGVzWzBdLmNsaWVudFk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBldmVudFBvcyAtIHNsaWRlck5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gc2xpZGVyQm9yZGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV3VmFsID0gTWF0aC5yb3VuZCh0aHVtYlBvc2l0aW9uIC8gc3RlcExlbmdodCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGVmdFBvaW50ID0gMDtcclxuICAgICAgICByaWdodFBvaW50ID0gc2xpZGVyTGVuZ2h0O1xyXG4gICAgXHJcbiAgICAgICAgaWYgKCB0aHVtYlBvc2l0aW9uIDw9IGxlZnRQb2ludCkge1xyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gbGVmdFBvaW50O1xyXG4gICAgICAgICAgICBuZXdWYWwgPSBtaW5WYWw7XHJcbiAgICAgICAgfSBlbHNlIGlmICggdGh1bWJQb3NpdGlvbiA+PSByaWdodFBvaW50KSB7XHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSByaWdodFBvaW50O1xyXG4gICAgICAgICAgICBuZXdWYWwgPSBtYXhWYWw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LHQtdCz0YPQvdC+0Log0L3QtSDQstGL0YjQtdC7INC30LAg0LPRgNCw0L3QuNGG0YssINGB0YLQsNCy0LjQvCDQtdCz0L4g0L3QsCDQsdC70LjQttCw0LnRiNC10LUg0LfQvdCw0YfQtdC90LjQtSxcclxuICAgICAgICAgICAgLy8g0LrRgNCw0YLQvdC+0LUg0YjQsNCz0YMuXHJcbiAgICAgICAgICAgIC8vINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INGN0YLQvtCz0L4g0L/RgNC10L7QsdGA0LDQt9GD0LXQvCDQtdCz0L4g0LTQu9GPINC80L7QtNC10LvQuC4g0JXRgdC70LggcmV2ZXJzZSA9PSB0cnVlLCDRgtC+ID09IC0xIFxyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gbmV3VmFsICogc3RlcExlbmdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGYgPSB4ID0+ICggKHgudG9TdHJpbmcoKS5pbmNsdWRlcygnLicpKSA/ICh4LnRvU3RyaW5nKCkuc3BsaXQoJy4nKS5wb3AoKS5sZW5ndGgpIDogKDApICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbiA9IGYoc3RlcCkgKyBmKG1pblZhbCk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICggbmV3VmFsICogTWF0aC5wb3coMTAsIG4pICogc3RlcCAqIHJldmVyc2UgICkgLyBNYXRoLnBvdygxMCwgbik7XHJcblxyXG4gICAgICAgICAgICBuID0gTWF0aC5tYXgoIGYoc3RlcCksIGYobWluVmFsKSApO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSArKCgrbmV3VmFsKS50b0ZpeGVkKG4pKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKCttb2RlbC5nZXRNaW5WYWwoKSkgKyAoK25ld1ZhbCk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICsoKCtuZXdWYWwpLnRvRml4ZWQobikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0VmFsKG5ld1ZhbCk7XHJcbiAgICAgICAgICAgIGNoYW5naW5nVGh1bWIgPSB2aWV3LmdldFRodW1iKCk7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbihjaGFuZ2luZ1RodW1iLCB0aHVtYlBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCBNYXRoLmFicyhuZXdWYWwgLSBtb2RlbC5nZXRSYW5nZSgpWzBdKSA8IE1hdGguYWJzKG5ld1ZhbCAtIG1vZGVsLmdldFJhbmdlKClbMV0pICkge1xyXG4gICAgICAgICAgICAgICAgbW9kZWwuc2V0UmFuZ2UoWyBuZXdWYWwsIG1vZGVsLmdldFJhbmdlKClbMV0gXSk7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2luZ1RodW1iID0gdmlldy5nZXRUaHVtYigxKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbihjaGFuZ2luZ1RodW1iLCB0aHVtYlBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsLnNldFJhbmdlKFsgbW9kZWwuZ2V0UmFuZ2UoKVswXSwgbmV3VmFsIF0pO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdpbmdUaHVtYiA9IHZpZXcuZ2V0VGh1bWIoMik7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oY2hhbmdpbmdUaHVtYiwgdGh1bWJQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgpIHx8IHZpZXcuZ2V0VG9vbHRpcCgxKSApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKG5ld1ZhbCk7XHJcblxyXG4gICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggY2hhbmdpbmdUaHVtYi5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX190b29sdGlwJyksIHZhbCwgdmlldy5nZXRUb29sdGlwTWFzaygpICk7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0L3QsNCx0LvRjtC00LDRgtC10LvRjFxyXG4gICAgICAgIGlmICggbW9kZWwuZ2V0VmFsKCkgIT0gbnVsbCApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRWYWwoKSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IHZhbDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFswXSA9IHZhbDtcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVsxXSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFsxXSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3ViamVjdC5ub3RpZnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2Uob3B0aW9uczogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXMuX21vZGVsO1xyXG4gICAgICAgIGxldCB2aWV3ID0gdGhpcy5fdmlldztcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZVRodW1iUG9zaXRpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhbmdlVG9vbHRpcFZhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjaGFuZ2VTY2FsZURpdmlzaW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNoYW5nZVZhbFRvUmFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhbmdlUmFuZ2VUb1ZhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCByZWJ1aWxkU2NhbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgcmVidWlsZFRvb2x0aXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gMS4g0JzQntCU0JXQm9CsXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0LzQtdC90Y/QtdGC0YHRjyDQutCw0LrQvtC5INC70LjQsdC+INC/0LDRgNCw0LzQtdGC0YAg0LIg0LzQvtC00LXQu9C4LCDQt9Cw0L/Rg9GB0LrQsNC10Lwg0L/RgNC+0LLQtdGA0LrQuCDQvNC+0LTQtdC70LgsXHJcbiAgICAgICAgLy8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQvdC+0LLRi9C1INC30L3QsNGH0LXQvdC40Y8uXHJcbiAgICAgICAgLy8g0LfQsNC/0L7QvNC40L3QsNC10LwsINGH0YLQviDQvdGD0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0L/QvtC70L7QttC10L3QuNGPINC/0L7Qu9C30YPQvdC60L7Qsiwg0LfQvdCw0YfQtdC90LjRjyDQsiDQv9C+0LTRgdC60LDQt9C60LDRhSxcclxuICAgICAgICAvLyDQtNC10LvQtdC90LjQuSDRiNC60LDQu9GLICjQt9C90LDRh9C10L3QuNGPINC4IGxlZnQpLiBcclxuICAgICAgICAvLyDQldGB0LvQuCDQuNC30LzQtdC90LjQu9C+0YHRjCDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyIC0gdHJ1ZSDQvdCwINC/0LXRgNC10YDQuNGB0L7QstCw0YLRjCDRiNC60LDQu9GDLlxyXG4gICAgICAgIC8vINCV0YHQu9C4INC/0L7QvNC10L3Rj9C70L7RgdGMIHZhbCDQvdCwIHJhbmdlLCDQuNC70Lgg0L3QsNC+0LHQvtGA0L7RgiAtIHRydWUg0L3QsCDQv9C+0YHRgtGA0L7QuNGC0YwhINCx0LXQs9GD0L3QutC4LlxyXG5cclxuXHJcbiAgICAgICAgbGV0IG1vZGVsT3B0aW9ucyA9IFsnZGF0YUZvcm1hdCcsICd2YWx1ZScsICdtaW5WYWwnLCAnbWF4VmFsJywgJ3N0ZXAnLCAncmV2ZXJzZScsICdyYW5nZScsICdjdXN0b21WYWx1ZXMnLCAndmFsdWVJbkN1c3RvbVZhbHVlcycsICdyYW5nZUluQ3VzdG9tVmFsdWVzJ107XHJcblxyXG4gICAgICAgIGxldCB0ZXN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbW9kZWxPcHRpb25zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoaXRlbSkgKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICggdGVzdCApIHtcclxuICAgICAgICAgICAgbGV0IHByZXZOdW1PZlN0ZXBzOiBudW1iZXIgPSBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCk7XHJcbiAgICAgICAgICAgIGxldCBwcmV2T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IG1vZGVsLmdldE9wdGlvbnMoKTtcclxuICAgICAgICAgICAgbGV0IG5ld09wdGlvbnM6IElPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJldk9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgbW9kZWwuY2hhbmdlKG5ld09wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgdmlldy5zZXROdW1iZXJPZlN0ZXBzKCBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZVN0ZXAoIHZpZXcuZmluZFZhbGlkU2NhbGVTdGVwKCBtb2RlbCwgdmlldy5nZXRTY2FsZVN0ZXAoKSApICk7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VUaHVtYlBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2hhbmdlVG9vbHRpcFZhbCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBwcmV2TnVtT2ZTdGVwcyAhPSBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgKSB7XHJcbiAgICAgICAgICAgICAgICByZWJ1aWxkU2NhbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggdmlldy5nZXRSYW5nZSgpICYmICFtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlUmFuZ2VUb1ZhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZWJ1aWxkVG9vbHRpcCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCAhdmlldy5nZXRSYW5nZSgpICYmIG1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VWYWxUb1JhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlYnVpbGRUb29sdGlwID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMi4g0JLQmNCUXHJcbiAgICAgICAgLy8g0J/QtdGA0LXRgNC40YHQvtCy0YvQstCw0LXQvCDQstC40LQg0L7RgiDRgdCw0LzRi9GFINCz0LvQvtCx0LDQu9GM0L3Ri9GFINC40LfQvNC10L3QtdC90LjQuSDQuiDRgdCw0LzRi9C8INC90LXQt9C90LDRh9C40YLQtdC70YzQvdGL0LwuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gMi4xINCh0LDQvNC+0LUg0LHQvtC70YzRiNC+0LUg0LjQt9C80LXQvdC10L3QuNC1IC0g0Y3RgtC+INCy0LjQtCDQvtGB0L3QvtCy0Ysg0YjQutCw0LvRiy5cclxuICAgICAgICAvLyDQldC1INC40LfQvNC10L3QtdC90LjQtSDQstGL0LfRi9Cy0LDQtdGCOiDQuNC30LzQtdC90LjRgtGMINC/0L7Qu9C+0LbQtdC90LjRjyDQsdC10LPRg9C90LrQvtCyLCDQtNC10LvQtdC90LjQuSDRiNC60LDQu9GLXHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgndmVydGljYWwnKSB8fCBvcHRpb25zLmhhc093blByb3BlcnR5KCdsZW5ndGgnKSApIHtcclxuICAgICAgICAgICAgdmlldy5jaGFuZ2VTbGlkZXJCYXNlKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjaGFuZ2VUaHVtYlBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAyLjIg0JzQtdC90Y/QtdC8INC60L7Qu9C40YfQtdGB0YLQstC+INCx0LXQs9GD0L3QutC+0LIsINC10YHQu9C4INC90YPQttC90L5cclxuICAgICAgICAvLyDQldGB0LvQuCDRgtCw0LrQvtC1INC40LfQvNC10L3QtdC90LjQtSDQsdGL0LvQviwg0LfQvdCw0YfQuNGCINCy0LXQt9C00LUsXHJcbiAgICAgICAgLy8g0LPQtNC1INC90LDQtNC+LCDRg9C20LUg0YHRgtC+0LjRgiB0cnVlXHJcblxyXG4gICAgICAgIGlmICggY2hhbmdlUmFuZ2VUb1ZhbCApIHtcclxuICAgICAgICAgICAgdmlldy5jaGFuZ2VSYW5nZVRvVmFsKG1vZGVsKTtcclxuXHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKCkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggY2hhbmdlVmFsVG9SYW5nZSApIHtcclxuICAgICAgICAgICAgdmlldy5jaGFuZ2VWYWxUb1JhbmdlKG1vZGVsKTtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigxKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDIpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMSkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMikuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgfSAgIFxyXG5cclxuICAgICAgICAvLyAyLjMg0KjQutCw0LvQsC4g0KPQtNCw0LvRj9C10LwsINGB0YLRgNC+0LjQvCDQuNC70Lgg0L/QtdGA0LXRgdGC0YDQsNC40LLQsNC10LwuINCY0LfQvNC10L3Rj9C10Lwg0LTQtdC70LXQvdC40Y8uXHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2NhbGVTdGVwJykgJiYgb3B0aW9ucy5zY2FsZVN0ZXAgIT0gdmlldy5nZXRTY2FsZVN0ZXAoKSApIHtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZVN0ZXAoIHZpZXcuZmluZFZhbGlkU2NhbGVTdGVwKG1vZGVsLCBvcHRpb25zLnNjYWxlU3RlcCkgKTtcclxuICAgICAgICAgICAgcmVidWlsZFNjYWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2NhbGVNYXNrJykgJiYgb3B0aW9ucy5zY2FsZU1hc2sgIT0gdmlldy5nZXRTY2FsZU1hc2soKSApIHtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZU1hc2soIG9wdGlvbnMuc2NhbGVNYXNrICk7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDRg9C00LDQu9GP0LXQvFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2NhbGUnKSAmJiBvcHRpb25zLnNjYWxlID09IGZhbHNlICYmIHZpZXcuZ2V0U2NhbGUoKSApIHtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZSggdmlldy5yZW1vdmVOb2RlKCB2aWV3LmdldFNjYWxlKCkgKSApO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJlYnVpbGRTY2FsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDRgdGC0YDQvtC40LxcclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NjYWxlJykgJiYgb3B0aW9ucy5zY2FsZSA9PSB0cnVlICYmICF2aWV3LmdldFNjYWxlKCkgKSB7XHJcbiAgICAgICAgICAgIGxldCBzY2FsZTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHNjYWxlID0gdmlldy5idWlsZFNjYWxlKHZpZXcuZ2V0U2xpZGVyKCksIHZpZXcuZ2V0U2NhbGVTdGVwKCksIG1vZGVsLCB2aWV3LmdldFNjYWxlTWFzaygpICk7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGUoc2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgcmVidWlsZFNjYWxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgdGC0YDQsNC40LLQsNC10LxcclxuICAgICAgICBpZiAoIHJlYnVpbGRTY2FsZSAmJiB2aWV3LmdldFNjYWxlKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcucmVidWlsZFNjYWxlKG1vZGVsKTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC40LfQvNC10L3Rj9C10Lwg0LTQtdC70LXQvdC40Y8uINC30L3QsNGH0LXQvdC40LUg0LggbGVmdFxyXG4gICAgICAgIGlmICggY2hhbmdlU2NhbGVEaXZpc2lvbiAmJiB2aWV3LmdldFNjYWxlKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlU2NhbGVEaXZpc2lvbihtb2RlbCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gMi40INCf0L7QtNGB0LrQsNC30LrQuC4g0KPQtNCw0LvRj9C10LwuINCh0YLRgNC+0LjQvC4g0JzQtdC90Y/QtdC8INC30L3QsNGH0LXQvdC40Y9cclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCd0b29sdGlwTWFzaycpICYmIG9wdGlvbnMudG9vbHRpcE1hc2sgIT0gdmlldy5nZXRUb29sdGlwTWFzaygpICkge1xyXG4gICAgICAgICAgICB2aWV3LnNldFRvb2x0aXBNYXNrKCBvcHRpb25zLnRvb2x0aXBNYXNrICk7XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoICF2aWV3LmdldFRvb2x0aXAoKSAmJiAhdmlldy5nZXRUb29sdGlwKDEpICYmICFvcHRpb25zLmhhc093blByb3BlcnR5KCd0b29sdGlwJykgKSB7XHJcbiAgICAgICAgICAgIHJlYnVpbGRUb29sdGlwID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0YPQtNCw0LvRj9C10LxcclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCA9PSBmYWxzZSB8fCByZWJ1aWxkVG9vbHRpcCApIHtcclxuXHJcbiAgICAgICAgICAgIC8vINC/0L7Rh9C10LzRgyDQsiDQtNGA0YPQs9C+0Lwg0L/QvtGA0Y/QtNC60LUg0L3QtSDRgNCw0LHQvtGC0LDQtdGCXHJcbiAgICAgICAgICAgIGlmICggdmlldy5nZXRUb29sdGlwKDIpICkgdmlldy5zZXRUb29sdGlwKCB2aWV3LnJlbW92ZU5vZGUodmlldy5nZXRUb29sdGlwKDIpKSwgMiApO1xyXG4gICAgICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgxKSApIHZpZXcuc2V0VG9vbHRpcCggdmlldy5yZW1vdmVOb2RlKHZpZXcuZ2V0VG9vbHRpcCgxKSksIDEgKTtcclxuICAgICAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoKSApIHZpZXcuc2V0VG9vbHRpcCggdmlldy5yZW1vdmVOb2RlKHZpZXcuZ2V0VG9vbHRpcCgwKSksIDAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICggb3B0aW9ucy50b29sdGlwID09IGZhbHNlICkge1xyXG4gICAgICAgICAgICAgICAgcmVidWlsZFRvb2x0aXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC/0LXRgNC10YHRgtGA0LDQuNCy0LDQtdC8XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnRvb2x0aXAgfHwgcmVidWlsZFRvb2x0aXAgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuYnVpbGRWYWxpZFRvb2x0aXBzKG1vZGVsKTtcclxuICAgICAgICAgICAgY2hhbmdlVG9vbHRpcFZhbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQvNC10L3Rj9C10Lwg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICAgIGlmICggY2hhbmdlVG9vbHRpcFZhbCAmJiAodmlldy5nZXRUb29sdGlwKCkgfHwgdmlldy5nZXRUb29sdGlwKDEpKSApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbW9kZWwuZ2V0UmFuZ2UoKSkgeyBcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRWYWwoKSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIHZpZXcuZ2V0VG9vbHRpcCgpLCB2YWwgYXMgc3RyaW5nLCB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKTsgICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VmFsVG9Ub29sdGlwKCB2aWV3LmdldFRvb2x0aXAoMSksIHZhbCBhcyBzdHJpbmcsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggdmlldy5nZXRUb29sdGlwKDIpLCB2YWwgYXMgc3RyaW5nLCB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG5cclxuXHJcbiAgICAgICAgLy8gMi41INCf0L7Qu9C+0LbQtdC90LjRjyDQsdC10LPRg9C90LrQvtCyXHJcblxyXG4gICAgICAgIGlmICggY2hhbmdlVGh1bWJQb3NpdGlvbiApIHtcclxuICAgICAgICAgICAgbGV0IHBvczogbnVtYmVyO1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwb3MgPSB2aWV3LmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFZhbCgpKSwgbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oIHZpZXcuZ2V0VGh1bWIoKSwgcG9zKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7ICAgICBcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgcG9zID0gdmlldy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzBdKSwgbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oIHZpZXcuZ2V0VGh1bWIoMSksIHBvcyk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHBvcyA9IHZpZXcuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVsxXSksIG1vZGVsLmdldE51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKCB2aWV3LmdldFRodW1iKDIpLCBwb3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDQvdCw0LHQu9GO0LTQsNGC0LXQu9GMXHJcbiAgICAgICAgICAgIC8vINCy0YvQt9GL0LLQsNC10Lwg0LXRgdC70Lgg0LHRi9C70Lgg0LjQt9C80LXQvdC10L3QuNGPINGB0LLRj9C30LDQvdC90YvQtSDRgSDQsdC10LPRg9C90LrQsNC80LhcclxuICAgICAgICAgICAgLy8g0L3QtSDQt9Cw0YLRgNC+0L3QtdGCLCDQvdCw0L/RgNC40LzQtdGALCDQtNC+0LHQsNCy0LvQtdC90LjQtSDRiNC60LDQu9GLXHJcbiAgICAgICAgICAgIGlmICggbW9kZWwuZ2V0VmFsKCkgIT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IHZhbDtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzBdID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVsxXSApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMV0gPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC5ub3RpZnkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByZXNlbnRlciIsImltcG9ydCBJT3B0aW9ucyBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IHtJTW9kZWx9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgeyBydW5Jbk5ld0NvbnRleHQgfSBmcm9tICd2bSc7XHJcblxyXG5pbnRlcmZhY2UgSVZpZXcge1xyXG5cclxuICAgIC8vINCz0LXRgtGC0LXRgNGLINC4INGB0LXRgtGC0LXRgNGLXHJcbiAgICBnZXRMZW5naHQoKTogbnVtYmVyO1xyXG4gICAgZ2V0VmVydGljYWwoKTogYm9vbGVhbjtcclxuICAgIGdldFJhbmdlKCk6IGJvb2xlYW47XHJcbiAgICBnZXRUb29sdGlwTWFzaygpOiBzdHJpbmc7XHJcbiAgICBzZXRUb29sdGlwTWFzayhtYXNrOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgZ2V0U2NhbGVTdGVwKCk6IG51bWJlcjtcclxuICAgIHNldFNjYWxlU3RlcChzdGVwOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgZ2V0U2NhbGVNYXNrKCk6IHN0cmluZztcclxuICAgIHNldFNjYWxlTWFzayhtYXNrOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgZ2V0TnVtYmVyT2ZTdGVwcygpOiBudW1iZXI7XHJcbiAgICBzZXROdW1iZXJPZlN0ZXBzKG51bTogbnVtYmVyKTogdm9pZDtcclxuXHJcbiAgICBnZXRTbGlkZXIoKTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRUaHVtYihudW0/OiBudW1iZXIpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFRvb2x0aXAobnVtPzogbnVtYmVyKTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBzZXRUb29sdGlwKHRvb2x0aXA6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkLCBudW0/OiBudW1iZXIpOiB2b2lkO1xyXG4gICAgZ2V0U2NhbGUoKTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBzZXRTY2FsZShzY2FsZTogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQpOiB2b2lkO1xyXG5cclxuXHJcbiAgICAvLyDQvNC10YLQvtC00Ysg0LTQu9GPINGB0L7Qt9C00LDQvdC40Y8g0Lgg0LjQt9C80LXQvdC10L3QuNGPIHZpZXdcclxuICAgIGNoYW5nZVNsaWRlckJhc2UgKG9wdGlvbnM6IGFueSk6IHZvaWQ7XHJcbiAgICBjaGFuZ2VSYW5nZVRvVmFsIChtb2RlbDogSU1vZGVsKTogdm9pZDtcclxuICAgIGNoYW5nZVZhbFRvUmFuZ2UgKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgYnVpbGRWYWxpZFRvb2x0aXBzKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgYnVpbGRTY2FsZShzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCwgc3RlcDogbnVtYmVyLCBtb2RlbDogSU1vZGVsLCBtYXNrOiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHJlYnVpbGRTY2FsZShtb2RlbDogSU1vZGVsKTogdm9pZDtcclxuICAgIGNoYW5nZVNjYWxlRGl2aXNpb24obW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcbiAgICBjaGFuZ2VMaW5lKCk6IHZvaWQ7XHJcblxyXG4gICAgLy8g0LLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3Ri9C1INC80LXRgtC+0LTRi1xyXG4gICAgc2V0VGh1bWJQb3NpdGlvbih0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCB0aHVtYlBvc2l0aW9uOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgc2V0VmFsVG9Ub29sdGlwKHRvb2x0aXBOb2RlOiBIVE1MRGl2RWxlbWVudCwgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlLCBtYXNrOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgZmluZFRodW1iUG9zaXRpb24obmV3U3RlcCwgbnVtT2ZTdGVwcyk6IG51bWJlcjtcclxuICAgIGZpbmRPbmVTdGVwTGVuZ2h0KCk6IG51bWJlcjtcclxuICAgIHJlbW92ZU5vZGUobm9kZTogSFRNTERpdkVsZW1lbnQpOiB1bmRlZmluZWQ7XHJcbiAgICBmaW5kVmFsaWRTY2FsZVN0ZXAobW9kZWw6IElNb2RlbCwgc3RlcDogbnVtYmVyKTogbnVtYmVyOyAgXHJcbn1cclxuXHJcbmNsYXNzIFZpZXcgaW1wbGVtZW50cyBJVmlldyB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGVuZ2h0OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF92ZXJ0aWNhbDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3JhbmdlOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcE1hc2s6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3NjYWxlTWFzaz86IHN0cmluZztcclxuICAgIHByaXZhdGUgX3NjYWxlU3RlcD86IG51bWJlcjtcclxuICAgIHByaXZhdGUgX251bWJlck9mU3RlcHM6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9zbGlkZXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfdGh1bWI/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3RodW1iTGVmdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdGh1bWJSaWdodD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfbGluZTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwTGVmdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcFJpZ2h0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9zY2FsZT86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgXHJcblxyXG4gICAgY29uc3RydWN0b3IobW9kZWw6IElNb2RlbCwgb3B0aW9uczogSU9wdGlvbnMsIHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50KSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3NsaWRlciA9IHNsaWRlck5vZGU7XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcicpO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gbW9kZWwuZ2V0UmFuZ2UoKSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICB0aGlzLl9udW1iZXJPZlN0ZXBzID0gbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpO1xyXG4gICAgICAgIHRoaXMuX2xlbmdodCA9IHRoaXMuZmluZFZhbGlkTGVuZ3RoKG9wdGlvbnMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy52ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLndpZHRoID0gdGhpcy5fbGVuZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2hvcml6b250YWwnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS5oZWlnaHQgPSB0aGlzLl9sZW5naHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfdmVydGljYWwnKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xpbmUgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX2xpbmUnKTtcclxuXHJcbiAgICAgICAgbGV0IHBvczogbnVtYmVyO1xyXG4gICAgICAgIGlmICggIXRoaXMuX3JhbmdlICkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdGh1bWIgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iJyk7XHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0VmFsKCkpLCBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYiwgcG9zKTtcclxuICAgICAgICB9IGVsc2UgeyAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkxlZnQgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iJywgJ3NsaWRlcl9fdGh1bWJfbGVmdCcpO1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYlJpZ2h0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYicsICdzbGlkZXJfX3RodW1iX3JpZ2h0Jyk7XHJcblxyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMF0pLCBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYkxlZnQsIHBvcyk7XHJcblxyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMV0pLCBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYlJpZ2h0LCBwb3MpO1xyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIC8vINC80LDRgdC60LAg0LTQu9GPINC/0L7QtNGB0LrQsNC30L7QulxyXG4gICAgICAgIC8vINC10YHQu9C4INC10LUg0L3QtdGCLCDQv9GA0LjQvNC10L3Rj9C10YLRgdGPINC+0LHRi9GH0L3QsNGPLCDQutC+0YLQvtGA0LDRjyDQv9C+INC00LXRhNC+0LvRgtGDINCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC/0YDQvtGB0YLQviB2YWxcclxuICAgICAgICAvLyAo0LIg0YTQvtGA0LzQsNGC0LUg0LTQsNGCINCy0LXRgNC90LXRgtGB0Y8g0L7QsdGK0LXQutGCINC00LDRgtCwKVxyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXBNYXNrID0gb3B0aW9ucy50b29sdGlwTWFzaztcclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnRvb2x0aXAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRWYWxpZFRvb2x0aXBzKG1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc2NhbGVNYXNrID0gb3B0aW9ucy5zY2FsZU1hc2s7XHJcblxyXG4gICAgICAgIGxldCBzdGVwOiBudW1iZXI7XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnNjYWxlU3RlcCApIHtcclxuICAgICAgICAgICAgc3RlcCA9IHRoaXMuZmluZFZhbGlkU2NhbGVTdGVwKG1vZGVsLCBvcHRpb25zLnNjYWxlU3RlcCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RlcCA9IG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2NhbGVTdGVwID0gc3RlcDtcclxuXHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5zY2FsZSApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2NhbGUgPSB0aGlzLmJ1aWxkU2NhbGUodGhpcy5fc2xpZGVyLCBzdGVwLCBtb2RlbCwgdGhpcy5fc2NhbGVNYXNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0LPQtdGC0YLQtdGA0Ysg0Lgg0YHQtdGC0YLQtdGA0YtcclxuICAgIGdldExlbmdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICggIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVyLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zbGlkZXIuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIH0gICAgXHJcbiAgICB9XHJcbiAgICBnZXRWZXJ0aWNhbCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmVydGljYWw7XHJcbiAgICB9XHJcbiAgICBnZXRSYW5nZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmFuZ2U7XHJcbiAgICB9XHJcbiAgICBnZXRUb29sdGlwTWFzaygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwTWFzaztcclxuICAgIH1cclxuICAgIHNldFRvb2x0aXBNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXBNYXNrID0gbWFzaztcclxuICAgIH1cclxuICAgIGdldFNjYWxlU3RlcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVN0ZXA7XHJcbiAgICB9XHJcbiAgICBzZXRTY2FsZVN0ZXAoc3RlcDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2NhbGVTdGVwID0gc3RlcDtcclxuICAgIH1cclxuICAgIGdldFNjYWxlTWFzaygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZU1hc2s7XHJcbiAgICB9XHJcbiAgICBzZXRTY2FsZU1hc2sobWFzazogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2NhbGVNYXNrID0gbWFzaztcclxuICAgIH1cclxuICAgIGdldE51bWJlck9mU3RlcHMoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZTdGVwcztcclxuICAgIH1cclxuICAgIHNldE51bWJlck9mU3RlcHMobnVtOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9udW1iZXJPZlN0ZXBzID0gbnVtO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG5cclxuICAgIGdldFNsaWRlcigpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlcjtcclxuICAgIH1cclxuICAgIGdldFRodW1iKG51bTogbnVtYmVyID0gMCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBpZiAoIG51bSA9PSAwICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGh1bWI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggbnVtID09IDEgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aHVtYkxlZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggbnVtID09IDIgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aHVtYlJpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fdGh1bWI7XHJcbiAgICB9XHJcbiAgICBnZXRUb29sdGlwKG51bTogbnVtYmVyID0gMCk6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXAgfHwgdGhpcy5fdG9vbHRpcExlZnQgKSB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcCAmJiBudW0gPT0gMCApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcExlZnQgJiYgbnVtID09IDEgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcExlZnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwUmlnaHQgJiYgbnVtID09IDIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcFJpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRUb29sdGlwKHRvb2x0aXA6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkLCBudW06IG51bWJlciA9IDApIHtcclxuICAgICAgICBpZiAoIG51bSA9PSAwICkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwID0gdG9vbHRpcDtcclxuICAgICAgICB9IGVsc2UgaWYgKCBudW0gPT0gMSApIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcExlZnQgPSB0b29sdGlwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIG51bSA9PSAyICkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwUmlnaHQgPSB0b29sdGlwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFNjYWxlKCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGU7XHJcbiAgICB9XHJcbiAgICBzZXRTY2FsZShzY2FsZTogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDQvNC10YLQvtC00Ysg0LTQu9GPINGB0L7Qt9C00LDQvdC40Y8g0Lgg0LjQt9C80LXQvdC10L3QuNGPIHZpZXdcclxuXHJcbiAgICBjaGFuZ2VTbGlkZXJCYXNlIChvcHRpb25zOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IGxlbmdodENoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8g0YjQuNGA0LjQvdCwIC8g0LTQu9C40L3QsFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5sZW5ndGggJiYgdGhpcy5fbGVuZ2h0ICE9IG9wdGlvbnMubGVuZ3RoICkge1xyXG4gICAgICAgICAgICB0aGlzLl9sZW5naHQgPSBvcHRpb25zLmxlbmd0aDtcclxuICAgICAgICAgICAgbGVuZ2h0Q2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQvtGA0LjQtdC90YLQsNGG0LjRj1xyXG4gICAgICAgIGlmICggb3B0aW9ucy52ZXJ0aWNhbCAmJiAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl9ob3Jpem9udGFsJylcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl92ZXJ0aWNhbCcpO1xyXG5cclxuICAgICAgICAgICAgbGVuZ2h0Q2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggb3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UgJiYgdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfdmVydGljYWwnKVxyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2hvcml6b250YWwnKTtcclxuXHJcbiAgICAgICAgICAgIGxlbmdodENoYW5nZWQgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGVuZ2h0Q2hhbmdlZCAmJiAhdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS53aWR0aCA9IHRoaXMuX2xlbmdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxlbmdodENoYW5nZWQgJiYgdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLndpZHRoID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IHRoaXMuX2xlbmdodDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUmFuZ2VUb1ZhbCAobW9kZWw6IElNb2RlbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwb3M6IG51bWJlcjtcclxuXHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl90aHVtYiA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWInKTtcclxuICAgICAgICB0aGlzLl90aHVtYkxlZnQgPSB0aGlzLnJlbW92ZU5vZGUodGhpcy5fdGh1bWJMZWZ0KTtcclxuICAgICAgICB0aGlzLl90aHVtYlJpZ2h0ID0gdGhpcy5yZW1vdmVOb2RlKHRoaXMuX3RodW1iUmlnaHQpO1xyXG5cclxuICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFZhbCgpKSwgbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYiwgcG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VWYWxUb1JhbmdlIChtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHBvczogbnVtYmVyO1xyXG5cclxuICAgICAgICB0aGlzLl9yYW5nZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuX3RodW1iID0gdGhpcy5yZW1vdmVOb2RlKHRoaXMuX3RodW1iKTtcclxuICAgICAgICB0aGlzLl90aHVtYkxlZnQgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iJywgJ3NsaWRlcl9fdGh1bWJfbGVmdCcpOyBcclxuICAgICAgICB0aGlzLl90aHVtYlJpZ2h0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYicsICdzbGlkZXJfX3RodW1iX3JpZ2h0Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzBdKSwgbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYkxlZnQsIHBvcyk7XHJcblxyXG4gICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVsxXSksIG1vZGVsLmdldE51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy5fdGh1bWJSaWdodCwgcG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZFZhbGlkVG9vbHRpcHMobW9kZWw6IElNb2RlbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fcmFuZ2UpIHsgXHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXAgKSB0aGlzLl90b29sdGlwID0gdGhpcy5yZW1vdmVOb2RlKCB0aGlzLl90b29sdGlwICk7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3RodW1iLCAnc2xpZGVyX190b29sdGlwJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsVG9Ub29sdGlwKCB0aGlzLl90b29sdGlwLCB2YWwsIHRoaXMuX3Rvb2x0aXBNYXNrICk7ICAgXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcExlZnQgKSB0aGlzLl90b29sdGlwTGVmdCA9IHRoaXMucmVtb3ZlTm9kZSggdGhpcy5fdG9vbHRpcExlZnQgKTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzBdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBMZWZ0ID0gdGhpcy5idWlsZE5vZGUodGhpcy5fdGh1bWJMZWZ0LCAnc2xpZGVyX190b29sdGlwX2xlZnQnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWxUb1Rvb2x0aXAoIHRoaXMuX3Rvb2x0aXBMZWZ0LCB2YWwsIHRoaXMuX3Rvb2x0aXBNYXNrICk7ICBcclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcFJpZ2h0ICkgdGhpcy5fdG9vbHRpcFJpZ2h0ID0gdGhpcy5yZW1vdmVOb2RlKCB0aGlzLl90b29sdGlwUmlnaHQgKTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBSaWdodCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3RodW1iUmlnaHQsICdzbGlkZXJfX3Rvb2x0aXBfcmlnaHQnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWxUb1Rvb2x0aXAoIHRoaXMuX3Rvb2x0aXBSaWdodCwgdmFsLCB0aGlzLl90b29sdGlwTWFzayApOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRTY2FsZShzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCwgc3RlcDogbnVtYmVyLCBtb2RlbDogSU1vZGVsLCBtYXNrOiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IHNjYWxlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxldCBkaXZpc2lvbjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuXHJcbiAgICAgICAgc2NhbGUuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZScpO1xyXG4gICAgICAgIHNsaWRlck5vZGUucHJlcGVuZChzY2FsZSk7XHJcblxyXG4gICAgICAgIC8vINC80L3QvtC20LjRgtC10LvRjC4g0LLQviDRgdC60L7Qu9GM0LrQviDRgNCw0Lcg0YjQsNCzINCyINC80L7QtNC10LvQtSDQvNC10L3RjNGI0LUg0YjQsNCz0LAg0YjQutCw0LvRi1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5maW5kRGVjaW1hbFBsYWNlcyhzdGVwKSwgdGhpcy5maW5kRGVjaW1hbFBsYWNlcyhtb2RlbC5nZXRTdGVwKCkpICk7XHJcbiAgICAgICAgbGV0IG11bHQ6IG51bWJlciA9IHN0ZXAgLyBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbXVsdCA9ICsoK211bHQpLnRvRml4ZWQobik7XHJcbiAgICAgICAgbXVsdCA9IE1hdGguYWJzKG11bHQpOyAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8PSBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCk7IGkgPSBpICsgbXVsdCkge1xyXG5cclxuICAgICAgICAgICAgLy8gaSArIG11bHQg0LLQvtC30LLRgNCw0YnQsNC10YIg0L3QsCDQutCw0LrQvtC5INGI0LDQsyDQvNC+0LTQtdC70Lgg0L/QvtC/0LDQtNCw0LXRgiDRiNCw0LMg0YjQutCw0LvRi1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGVCeVN0ZXAoaSk7XHJcblxyXG4gICAgICAgICAgICBkaXZpc2lvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXZpc2lvbi5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3NjYWxlLWRpdmlzaW9uJyk7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLmlubmVySFRNTCA9ICc8c3Bhbj4nICsgIGV2YWwobWFzaykgKyAnPC9zcGFuPic7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3ZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS5sZWZ0ID0gdGhpcy5maW5kT25lU3RlcExlbmdodCgpICogaSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS50b3AgPSB0aGlzLmZpbmRPbmVTdGVwTGVuZ2h0KCkgKiBpICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2NhbGUuYXBwZW5kKGRpdmlzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlYnVpbGRTY2FsZShtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNjYWxlOiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuZ2V0U2NhbGUoKTtcclxuICAgICAgICBsZXQgcHJldk51bU9mU3RlcHM6IG51bWJlciA9IHNjYWxlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXJfX3NjYWxlLWRpdmlzaW9uJykubGVuZ3RoIC0gMTtcclxuICAgICAgICBsZXQgbmV3TnVtT2ZTdGVwczogbnVtYmVyO1xyXG4gICAgICAgIGxldCBkaXZpc2lvbjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g0LzQvdC+0LbQuNGC0LXQu9GMLiDQstC+INGB0LrQvtC70YzQutC+INGA0LDQtyDRiNCw0LMg0LIg0LzQvtC00LXQu9C1INC80LXQvdGM0YjQtSDRiNCw0LPQsCDRiNC60LDQu9GLXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX3NjYWxlU3RlcCksIHRoaXMuZmluZERlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG4gICAgICAgIGxldCBtdWx0OiBudW1iZXIgPSB0aGlzLl9zY2FsZVN0ZXAgLyBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbXVsdCA9ICttdWx0LnRvRml4ZWQobik7XHJcbiAgICAgICAgbXVsdCA9IE1hdGguYWJzKG11bHQpO1xyXG5cclxuICAgICAgICBuZXdOdW1PZlN0ZXBzID0gbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpIC8gbXVsdDtcclxuXHJcbiAgICAgICAgaWYgKCBwcmV2TnVtT2ZTdGVwcyA+IG5ld051bU9mU3RlcHMgKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCAocHJldk51bU9mU3RlcHMgLSBuZXdOdW1PZlN0ZXBzKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZS5sYXN0Q2hpbGQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBwcmV2TnVtT2ZTdGVwcyA8IG5ld051bU9mU3RlcHMgKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCAobmV3TnVtT2ZTdGVwcyAtIHByZXZOdW1PZlN0ZXBzKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uaW5uZXJIVE1MID0gJzxzcGFuPjwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgc2NhbGUuYXBwZW5kKGRpdmlzaW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VTY2FsZURpdmlzaW9uKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZGl2aXNpb246IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgbGV0IG1hc2s6IHN0cmluZyA9IHRoaXMuX3NjYWxlTWFzaztcclxuXHJcbiAgICAgICAgLy8g0LzQvdC+0LbQuNGC0LXQu9GMLiDQstC+INGB0LrQvtC70YzQutC+INGA0LDQtyDRiNCw0LMg0LIg0LzQvtC00LXQu9C1INC80LXQvdGM0YjQtSDRiNCw0LPQsCDRiNC60LDQu9GLXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX3NjYWxlU3RlcCksIHRoaXMuZmluZERlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG4gICAgICAgIGxldCBtdWx0OiBudW1iZXIgPSB0aGlzLl9zY2FsZVN0ZXAgLyBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbXVsdCA9ICttdWx0LnRvRml4ZWQobik7XHJcbiAgICAgICAgbXVsdCA9IE1hdGguYWJzKG11bHQpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPD0gbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpOyBpID0gaSArIG11bHQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGkgKyBtdWx0INCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC90LAg0LrQsNC60L7QuSDRiNCw0LMg0LzQvtC00LXQu9C4INC/0L7Qv9Cw0LTQsNC10YIg0YjQsNCzINGI0LrQsNC70YtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlQnlTdGVwKGkpO1xyXG5cclxuICAgICAgICAgICAgZGl2aXNpb24gPSB0aGlzLmdldFNjYWxlKCkucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlcl9fc2NhbGUtZGl2aXNpb24nKVtpIC8gbXVsdF0gYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS50ZXh0Q29udGVudCA9ICcnICsgZXZhbChtYXNrKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLnRvcCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS5sZWZ0ID0gdGhpcy5maW5kT25lU3RlcExlbmdodCgpICogaSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS5sZWZ0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLnRvcCA9IHRoaXMuZmluZE9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUxpbmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5sZWZ0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9saW5lLnN0eWxlLnRvcCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGluZS5zdHlsZS53aWR0aCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5oZWlnaHQgPSBudWxsOyAgXHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fcmFuZ2UpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLnRvcCA9ICcwcHgnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmxlZnQgPSAnMHB4JztcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUud2lkdGggPSBwYXJzZUludCh0aGlzLl90aHVtYi5zdHlsZS5sZWZ0KSArIHRoaXMuX3RodW1iLmNsaWVudFdpZHRoLzIgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS53aWR0aCA9ICcxMDAlJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5sZWZ0ID0gJzBweCdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUudG9wID0gJzBweCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmhlaWdodCA9IHBhcnNlSW50KHRoaXMuX3RodW1iLnN0eWxlLnRvcCkgKyB0aGlzLl90aHVtYi5jbGllbnRIZWlnaHQvMiArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLnRvcCA9ICcwcHgnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmxlZnQgPSBwYXJzZUludCh0aGlzLl90aHVtYkxlZnQuc3R5bGUubGVmdCkgKyB0aGlzLl90aHVtYkxlZnQuY2xpZW50V2lkdGgvMiArICdweCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLndpZHRoID0gKCBwYXJzZUludCh0aGlzLl90aHVtYlJpZ2h0LnN0eWxlLmxlZnQpIC0gcGFyc2VJbnQodGhpcy5fdGh1bWJMZWZ0LnN0eWxlLmxlZnQpICkgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS53aWR0aCA9ICcxMDAlJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5sZWZ0ID0gJzBweCdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUudG9wID0gcGFyc2VJbnQodGhpcy5fdGh1bWJMZWZ0LnN0eWxlLnRvcCkgICsgdGhpcy5fdGh1bWJMZWZ0LmNsaWVudEhlaWdodC8yICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUuaGVpZ2h0ID0gKCBwYXJzZUludCh0aGlzLl90aHVtYlJpZ2h0LnN0eWxlLnRvcCkgLSBwYXJzZUludCh0aGlzLl90aHVtYkxlZnQuc3R5bGUudG9wKSApICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g0LLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3Ri9C1INC80LXRgtC+0LTRi1xyXG5cclxuICAgIHNldFRodW1iUG9zaXRpb24odGh1bWJOb2RlOiBIVE1MRGl2RWxlbWVudCwgdGh1bWJQb3NpdGlvbjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS50b3AgPSBudWxsO1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUubGVmdCA9IHRodW1iUG9zaXRpb24gLSB0aHVtYk5vZGUub2Zmc2V0V2lkdGgvMiArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLmxlZnQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUudG9wID0gdGh1bWJQb3NpdGlvbiAtIHRodW1iTm9kZS5vZmZzZXRXaWR0aC8yICsgJ3B4JzsgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQtdGB0LvQuCDQvtCx0LAg0LHQtdCz0YPQvdC60LAg0YHQv9GA0LDQstCwLCDQtNC+0LHQsNCy0LvQtdC8IHogaW5kZXgg0LTQu9GPINC90LjQttC90LXQs9C+XHJcbiAgICAgICAgaWYgKCB0aGlzLmdldFRodW1iKDEpICkge1xyXG4gICAgICAgICAgICBpZiAoICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgICAgIGlmICggKHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUubGVmdCA9PSAodGhpcy5nZXRMZW5naHQoKSAtIHRoaXMuZ2V0VGh1bWIoMSkuY2xpZW50V2lkdGgvMikgKyAncHgnKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRodW1iKDEpLnN0eWxlLnpJbmRleCA9ICcxMDAnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRodW1iKDEpLnN0eWxlLnpJbmRleCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICggKHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUudG9wID09ICh0aGlzLmdldExlbmdodCgpIC0gdGhpcy5nZXRUaHVtYigxKS5jbGllbnRIZWlnaHQvMikgKyAncHgnKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRodW1iKDEpLnN0eWxlLnpJbmRleCA9ICcxMDAnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRodW1iKDEpLnN0eWxlLnpJbmRleCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlTGluZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZhbFRvVG9vbHRpcCh0b29sdGlwTm9kZTogSFRNTERpdkVsZW1lbnQsIHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZSwgbWFzazogc3RyaW5nID0gJ3ZhbCcpOiB2b2lkIHtcclxuICAgICAgICB0b29sdGlwTm9kZS50ZXh0Q29udGVudCA9IGV2YWwobWFzayk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZFRodW1iUG9zaXRpb24obmV3U3RlcCwgbnVtT2ZTdGVwcyk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGVuZ2h0KCkgLyBudW1PZlN0ZXBzICogbmV3U3RlcDtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kT25lU3RlcExlbmdodCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRMZW5naHQoKSAvIHRoaXMuX251bWJlck9mU3RlcHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlTm9kZShub2RlOiBIVE1MRGl2RWxlbWVudCk6IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbm9kZS5yZW1vdmUoKTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRWYWxpZFNjYWxlU3RlcChtb2RlbDogSU1vZGVsLCBzdGVwOiBudW1iZXIpOiBudW1iZXIge1xyXG5cclxuICAgICAgICBsZXQgc3RlcElzVmFsaWQ6IGJvb2xlYW47XHJcbiAgICAgICAgbGV0IHRlc3Q6IG51bWJlclxyXG5cclxuICAgICAgICAvLyDQvtC60YDRg9Cz0LvRj9C10LwsINGH0YLQvtCx0Ysg0LjQt9Cx0LXQttCw0YLRjCDQv9GA0L7QsdC70LXQvCDQv9GA0Lgg0LLRi9GH0LjRgdC70LXQvdC40Y/RhSDRgSDQv9C70LDQstCw0Y7RidC10Lkg0YLQvtGH0LrQvtC5XHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHN0ZXApLCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKG1vZGVsLmdldFN0ZXAoKSkgKTtcclxuXHJcbiAgICAgICAgc3RlcElzVmFsaWQgPSB0aGlzLmlzTnVtZXJpYyhzdGVwKTtcclxuXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXREYXRhRm9ybWF0KCkgPT0gJ2RhdGUnICYmICggc3RlcCAlICgyNCAqIDM2MDAgKiAxMDAwKSAhPSAwICkpIHtcclxuICAgICAgICAgICAgc3RlcCA9IHN0ZXAgKiAyNCAqIDM2MDAgKiAxMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZXN0ID0gKHN0ZXAgKiBNYXRoLnBvdygxMCwgbikpIC8gKG1vZGVsLmdldFN0ZXAoKSAqIE1hdGgucG93KDEwLCBuKSk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBzdGVwSXNWYWxpZCA9IHN0ZXBJc1ZhbGlkICYmICggdGVzdCAlIDEgPT0gMCApO1xyXG5cclxuICAgICAgICB0ZXN0ID0gKyggbW9kZWwuZ2V0TWF4VmFsKCkgLSBtb2RlbC5nZXRNaW5WYWwoKSApLnRvRml4ZWQobik7XHJcbiAgICAgICAgdGVzdCA9ICggdGVzdCAqIE1hdGgucG93KDEwLCBuKSApIC8gKCBzdGVwICogTWF0aC5wb3coMTAsIG4pICk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBzdGVwSXNWYWxpZCA9IHN0ZXBJc1ZhbGlkICYmICggdGVzdCAlIDEgPT0gMCApO1xyXG5cclxuICAgICAgICBzdGVwID0gc3RlcElzVmFsaWQgPyBzdGVwIDogbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIHJldHVybiBzdGVwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDQv9GA0LjQstCw0YLQvdGL0LUg0YTRg9C90LrRhtC40LhcclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkTm9kZShwYXJlbnROb2RlOiBIVE1MRGl2RWxlbWVudCwgLi4uY2xhc3Nlczogc3RyaW5nW10pOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IG5vZGU6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7ICAgICBcclxuXHJcbiAgICAgICAgZm9yICggbGV0IGk6IG51bWJlciA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZChhcmd1bWVudHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwYXJlbnROb2RlLmFwcGVuZChub2RlKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBmaW5kVmFsaWRMZW5ndGgoc3RyOiBhbnkpIHtcclxuICAgICAgICBpZiAoIHR5cGVvZiAoJycgKyBzdHIpID09ICdzdHJpbmcnICkge1xyXG4gICAgICAgICAgICBsZXQgciA9ICgnJyArIHN0cikubWF0Y2goL15cXGR7MSwzfVsuLF0/XFxkKihweHxlbXxyZW18JSk/JC9pKTtcclxuICAgICAgICAgICAgaWYgKCByICYmIHRoaXMuaXNOdW1lcmljKHJbMF0pICkgeyBcclxuICAgICAgICAgICAgICAgIHJldHVybiByWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnLCcsICcuJykgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCByICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcsJywgJy4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dpZHRoIChvciBoZWlnaHQpIHNob3VsZCBiZSB2YWxpZCB0byBjc3MnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTnVtZXJpYyhuOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmICFpc05hTihuIC0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kRGVjaW1hbFBsYWNlcyhudW06IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgLy8g0LrQvtC70LjRh9C10YHRgtCy0L4g0LfQvdCw0LrQvtCyINC/0L7RgdC70LUg0LfQsNC/0Y/RgtC+0LlcclxuICAgICAgICByZXR1cm4gfihudW0gKyAnJykuaW5kZXhPZignLicpID8gKG51bSArICcnKS5zcGxpdCgnLicpWzFdLmxlbmd0aCA6IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBJVmlldyB9O1xyXG5leHBvcnQgZGVmYXVsdCBWaWV3OyIsImV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBJT3B0aW9ucyB7XHJcbiAgICAvLyBNb2RlbCBvcHRpb25zXHJcbiAgICBkYXRhRm9ybWF0OiBzdHJpbmc7XHJcbiAgICB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbDtcclxuICAgIG1pblZhbDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgbWF4VmFsOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICBzdGVwOiBudW1iZXI7ICAgIFxyXG4gICAgcmV2ZXJzZTogYm9vbGVhbjtcclxuICAgIHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgW3N0cmluZywgc3RyaW5nXSB8IG51bGw7IFxyXG4gICAgY3VzdG9tVmFsdWVzPzogc3RyaW5nW107XHJcbiAgICB2YWx1ZUluQ3VzdG9tVmFsdWVzPzogc3RyaW5nO1xyXG4gICAgcmFuZ2VJbkN1c3RvbVZhbHVlcz86IHN0cmluZztcclxuXHJcblxyXG4gICAgLy8gVmlldyBvcHRpb25zXHJcbiAgICBsZW5ndGg6IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHZlcnRpY2FsOiBib29sZWFuO1xyXG4gICAgdG9vbHRpcDogYm9vbGVhbjtcclxuICAgIHRvb2x0aXBNYXNrOiBzdHJpbmc7XHJcbiAgICBzY2FsZTogYm9vbGVhbjtcclxuICAgIHNjYWxlU3RlcDogbnVtYmVyO1xyXG4gICAgc2NhbGVNYXNrOiBzdHJpbmc7XHJcbn1cclxuXHJcbnZhciBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMgPSB7XHJcbiAgICAvLyBNb2RlbCBvcHRpb25zXHJcbiAgICAvLyDQsiByYW5nZSDQuCDQsiBtaW4g0LggbWF4INGB0LvQtdCy0LAg0YLQviwg0YfRgtC+INGB0LvQtdCy0LAg0L3QsCDRgdC70LDQudC00LXRgNC1XHJcbiAgICBkYXRhRm9ybWF0OiAnbnVtZXJpYycsXHJcbiAgICB2YWx1ZTogbnVsbCwgICAgICAvLyDQsiDQvdCw0YfQsNC70YzQvdGL0YUg0L3QsNGB0YLRgNC+0LnQutCw0YUg0L3QtSDQvtC/0YDQtdC00LXQu9C10L3Ri1xyXG4gICAgbWluVmFsOiAwLCAgICAgICAgLy8g0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0LjQu9C4INC/0YDQvtC80LXQttGD0YLQvtC6LlxyXG4gICAgbWF4VmFsOiAxMCwgICAgICAgLy8g0LXRgdC70Lgg0L7QvdC4INC90LUg0YPQutCw0LfQsNC90Ysg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10LwsINC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1IFxyXG4gICAgc3RlcDogMSwgICAgICAgICAgLy8gKHZhbHVlKSDQuCDQv9C+0LfQuNGG0LjRjyDQsdC10LPRg9C90LrQsCDRgNCw0LLQvdGLINC80LjQvdC40LzQsNC70YzQvdC+0LzRgyDQt9C90LDRh9C10L3QuNGOXHJcbiAgICByZXZlcnNlOiBmYWxzZSxcclxuICAgIHJhbmdlOiBudWxsLFxyXG4gICAgXHJcbiAgICBsZW5ndGg6ICczMDBweCcsXHJcbiAgICB2ZXJ0aWNhbDogZmFsc2UsXHJcbiAgICB0b29sdGlwOiBmYWxzZSxcclxuICAgIHRvb2x0aXBNYXNrOiBcInZhbFwiLFxyXG4gICAgc2NhbGU6IGZhbHNlLFxyXG4gICAgc2NhbGVTdGVwOiBudWxsLFxyXG4gICAgc2NhbGVNYXNrOiBcInZhbFwiLFxyXG59XHJcblxyXG5leHBvcnQgeyBkZWZhdWx0T3B0aW9ucyB9O1xyXG4iLCJpbXBvcnQgTW9kZWwsIHtJTW9kZWx9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgVmlldywge0lWaWV3fSBmcm9tICcuL1ZpZXcnO1xyXG5pbXBvcnQgUHJlc2VudGVyIGZyb20gJy4vUHJlc2VudGVyJztcclxuaW1wb3J0IHtkZWZhdWx0T3B0aW9uc30gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcblxyXG5pbXBvcnQge09ic2VydmVyfSBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IHtJT2JzZXJ2ZXJ9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5pbXBvcnQgU3ViamVjdCAgZnJvbSAnLi9PYnNlcnZlcic7XHJcblxyXG5cclxuKGZ1bmN0aW9uKCQpe1xyXG5cclxuICB2YXIgbWV0aG9kczogT2JqZWN0ID0ge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zPzogYW55ICkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICBcclxuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBkYXRhID0gJHRoaXMuZGF0YSgnc2xpZGVyRGF0YScpO1xyXG4gICAgICAgIGxldCBzbGlkZXIgPSAkdGhpcztcclxuICAgICAgICBcclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C70LDQs9C40L0g0LXRidGRINC90LUg0L/RgNC+0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNC9XHJcbiAgICAgICAgaWYgKCAhIGRhdGEgKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICBsZXQgbW9kZWw6IElNb2RlbCA9IG5ldyBNb2RlbChvcHRpb25zKTtcclxuICAgICAgICAgIC8vINC/0LXRgNC10LTQsNC10Lwg0LzQvtC00LXQu9GMINCyINC/0YDQtdC00YHRgtCw0LLQu9C10L3QuNC1INC00LvRjyDQv9C+0LvRg9GH0LXQvdC40Y8g0LjQtyDQvdC10LUgXHJcbiAgICAgICAgICAvLyDQutC+0YDRgNC10LrRgtC90YvRhSDQtNCw0L3QvdGL0YVcclxuICAgICAgICAgIGxldCB2aWV3OiBJVmlldyA9IG5ldyBWaWV3KG1vZGVsLCBvcHRpb25zLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAvLyDRgdGD0LHRitC10LrRgiAtINGN0YLQviDQvdCw0LHQu9GO0LTQtdC90LjQtVxyXG4gICAgICAgICAgLy8g0L7QvSDRhdGA0LDQvdC40YIg0LfQvdCw0YfQtdC90LjQtSB2YWwg0LjQu9C4INC/0YDQvtC80LXQttGD0YLQvtC6XHJcbiAgICAgICAgICBsZXQgdmFsOiBhbnkgfCBbYW55LCBhbnldO1xyXG4gICAgICAgICAgdmFsID0gbW9kZWwuZ2V0VmFsKCkgfHwgbW9kZWwuZ2V0UmFuZ2UoKTsgXHJcbiAgICAgICAgICBsZXQgc3ViamVjdCA9IG5ldyBTdWJqZWN0KHZhbCk7XHJcblxyXG4gICAgICAgICAgbGV0IHByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIobW9kZWwsIHZpZXcsIHN1YmplY3QpO1xyXG5cclxuICAgICAgICAgICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScsIHtcclxuICAgICAgICAgICAgc2xpZGVyIDogc2xpZGVyLFxyXG4gICAgICAgICAgICBtb2RlbDogbW9kZWwsXHJcbiAgICAgICAgICAgIHZpZXc6IHZpZXcsXHJcbiAgICAgICAgICAgIHByZXNlbnRlcjogcHJlc2VudGVyLFxyXG4gICAgICAgICAgICBzdWJqZWN0OiBzdWJqZWN0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZTogZnVuY3Rpb24oIG9wdGlvbnM6IGFueSApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBwcmVzZW50ZXIgPSAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnKS5wcmVzZW50ZXI7XHJcbiAgICAgICAgcHJlc2VudGVyLmNoYW5nZShvcHRpb25zKTtcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSAkdGhpcy5kYXRhKCdzbGlkZXJEYXRhJyk7XHJcblxyXG4gICAgICAgICQod2luZG93KS51bmJpbmQoJy5zbGlkZXInKTtcclxuICAgICAgICBkYXRhLnNsaWRlci5yZW1vdmUoKTtcclxuICAgICAgICAkdGhpcy5yZW1vdmVEYXRhKCdzbGlkZXJEYXRhJyk7XHJcbiAgICAgICAgXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBvYnNlcnZlOiBmdW5jdGlvbiggZnVuYyApIHtcclxuXHJcbiAgICAgIC8vINC00L7QsdCw0LLQu9GP0LXQvCDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPXHJcbiAgICAgIC8vINCw0YDQs9GD0LzQtdC90YIgLSDRjdGC0LAg0YTRg9C90LrRhtC40Y8g0LrQvtGC0L7RgNCw0Y8g0LHRg9C00LXRgiDQvtCx0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0LjQt9C80LXQvdC10L3QuNGPXHJcbiAgICAgIGxldCBzdWJqZWN0ID0gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykuc3ViamVjdDtcclxuICAgICAgbGV0IG9ic2VydmVyOiBJT2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXIoIGZ1bmMgKTtcclxuXHJcbiAgICAgIHN1YmplY3QuYXR0YWNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFxyXG4gIGpRdWVyeS5mbi5zbGlkZXIgPSBmdW5jdGlvbiggbWV0aG9kICkge1xyXG5cclxuICAgIC8vINC70L7Qs9C40LrQsCDQstGL0LfQvtCy0LAg0LzQtdGC0L7QtNCwXHJcbiAgICBpZiAoIG1ldGhvZHNbbWV0aG9kIGFzIHN0cmluZ10gKSB7XHJcbiAgICAgIHJldHVybiBtZXRob2RzWyBtZXRob2QgYXMgc3RyaW5nIF0uYXBwbHkoIHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCBhcmd1bWVudHMsIDEgKSk7XHJcbiAgICB9IGVsc2UgaWYgKCB0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhIG1ldGhvZCApIHtcclxuXHJcbiAgICAgIC8vID8/Pz9cclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQuZXJyb3IoICdNZXRob2QgY2FsbGVkICcgKyAgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBmb3IgSlF1ZXJ5LnNsaWRlcicgKTtcclxuICAgIH0gXHJcblxyXG4gIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9