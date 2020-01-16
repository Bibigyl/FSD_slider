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
            val = model.translate(model.getVal());
            this._tooltip = this.buildNode(this._thumb, 'slider__tooltip');
            this.setValToTooltip(this._tooltip, val, this._tooltipMask);
        }
        else {
            val = model.translate(model.getRange()[0]);
            this._tooltipLeft = this.buildNode(this._thumbLeft, 'slider__tooltip', 'slider__tooltip_left');
            this.setValToTooltip(this._tooltipLeft, val, this._tooltipMask);
            val = model.translate(model.getRange()[1]);
            this._tooltipRight = this.buildNode(this._thumbRight, 'slider__tooltip', 'slider__tooltip_right');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0T3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDhGQUE0RDtBQTRDNUQ7SUFZSSxlQUFZLFVBQW9CO1FBRTVCLElBQUksT0FBTyxHQUFhLFVBQVUsQ0FBQztRQUluQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FB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Q0FBQztRQUVELE9BQU8sRUFBRSxVQUFVLElBQUk7WUFJckIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDakQsSUFBSSxRQUFRLEdBQWMsSUFBSSxtQkFBUSxDQUFFLElBQUksQ0FBRSxDQUFDO1lBRS9DLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsQ0FBQztLQUNGO0lBR0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxNQUFNO1FBR2pDLElBQUssT0FBTyxDQUFDLE1BQWdCLENBQUMsRUFBRztZQUMvQixPQUFPLE9BQU8sQ0FBRSxNQUFnQixDQUFFLENBQUMsS0FBSyxDQUFFLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUUsU0FBUyxFQUFFLENBQUMsQ0FBRSxDQUFDLENBQUM7U0FDN0Y7YUFBTSxJQUFLLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFFLE1BQU0sRUFBRztZQUluRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFFLElBQUksRUFBRSxTQUFTLENBQUUsQ0FBQztTQUM5QzthQUFNO1lBQ0wsQ0FBQyxDQUFDLEtBQUssQ0FBRSxnQkFBZ0IsR0FBSSxNQUFNLEdBQUcsbUNBQW1DLENBQUUsQ0FBQztTQUM3RTtJQUVILENBQUMsQ0FBQztBQUVKLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwiZmlsZSI6InNsaWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IElPcHRpb25zLCB7IGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcblxyXG5pbnRlcmZhY2UgSU1vZGVsIHtcclxuICAgIC8vIDFcclxuICAgIGdldFZhbCgpOiBudW1iZXI7XHJcbiAgICBzZXRWYWwobmV3VmFsOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgLy8gMlxyXG4gICAgZ2V0UmFuZ2UoKTogW251bWJlciwgbnVtYmVyXTtcclxuICAgIHNldFJhbmdlKG5ld1JhbmdlOiBbbnVtYmVyLCBudW1iZXJdKTogdm9pZDtcclxuICAgIC8vIDNcclxuICAgIGdldFN0ZXAoKTogbnVtYmVyO1xyXG4gICAgLy8gNFxyXG4gICAgZ2V0TWluVmFsKCk6IG51bWJlcjtcclxuICAgIC8vIDVcclxuICAgIGdldE1heFZhbCgpOiBudW1iZXI7XHJcbiAgICAvLyA2XHJcbiAgICBnZXRSZXZlcnNlKCk6IGJvb2xlYW47XHJcbiAgICAvLyA3XHJcbiAgICBnZXRDdXN0b21WYWx1ZXMoKTogc3RyaW5nW10gfCB1bmRlZmluZWQ7XHJcbiAgICAvLyA4XHJcbiAgICBnZXREYXRhRm9ybWF0KCk6IHN0cmluZztcclxuICAgIC8vIDlcclxuICAgIGdldE9wdGlvbnMoKTogSU1vZGVsT3B0aW9ucztcclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBmaW5kUG9zaXRpb25JbkFycih2YWw6IGFueSwgYXJyPzogYW55W10pOiBudW1iZXI7XHJcbiAgICBnZXRTdGVwTnVtYmVyKHZhbDogbnVtYmVyKTogbnVtYmVyO1xyXG4gICAgdHJhbnNsYXRlQnlTdGVwKHN0ZXA6IG51bWJlcik6IG51bWJlciB8IHN0cmluZyB8IERhdGU7IC8vINC/0L4g0YjQsNCz0YNcclxuICAgIHRyYW5zbGF0ZSh2YWw6IG51bWJlcik6IG51bWJlciB8IHN0cmluZyB8IERhdGU7IC8vINC/0L4g0LLQsNC70LjQtNC90L7QvNGDINC30L3QsNGH0LXQvdC40Y5cclxuICAgIGdldE51bWJlck9mU3RlcHMoKTogbnVtYmVyO1xyXG4gICAgY2hhbmdlKG5ld09wdGlvbnM6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJTW9kZWxPcHRpb25zIHtcclxuICAgIGRhdGFGb3JtYXQ6IHN0cmluZztcclxuICAgIHZhbHVlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgbWluVmFsOiBudW1iZXI7XHJcbiAgICBtYXhWYWw6IG51bWJlcjtcclxuICAgIHN0ZXA6IG51bWJlcjtcclxuICAgIHJldmVyc2U6IGJvb2xlYW47XHJcbiAgICByYW5nZTogW251bWJlciwgbnVtYmVyXSB8IG51bGw7IFxyXG4gICAgY3VzdG9tVmFsdWVzPzogc3RyaW5nW107XHJcbn1cclxuXHJcbmNsYXNzIE1vZGVsIGltcGxlbWVudHMgSU1vZGVsIHtcclxuXHJcbiAgICBwcml2YXRlIF9kYXRhRm9ybWF0OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF92YWw6IG51bWJlciB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9taW5WYWw6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX21heFZhbDpudW1iZXI7ICAgXHJcbiAgICBwcml2YXRlIF9zdGVwOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9yZXZlcnNlOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBfY3VzdG9tVmFsdWVzPzogc3RyaW5nW10gfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9vcHRpb25zOiBJTW9kZWxPcHRpb25zIHwgYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFsbE9wdGlvbnM6IElPcHRpb25zKSB7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zOiBJT3B0aW9ucyA9IGFsbE9wdGlvbnM7XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0L3QtSDRg9C60LDQt9Cw0L3QviDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwg0YPQutCw0LfRi9Cy0LDQtdC8INC80LjQvdC40LzQsNC70YzQvdC+0LUuXHJcbiAgICAgICAgLy8g0Y3RgtC+INC90LXQvtCx0YXQvtC00LjQvNC+INGH0YLQvtCx0Ysg0L/RgNC+0LnRgtC4INCy0LDQu9C40LTQsNGG0LjRjiDQuCDQv9C+0YHRgtCw0LLQuNGC0Ywg0LHQtdCz0YPQvdC+0Log0YHQvtCz0LvQsNGB0L3QviDRiNCw0LPRgy5cclxuICAgICAgICAvLyDQtdGB0LvQuCDRg9C60LDQt9Cw0L0gcmFuZ2UsINC80LXQvdGP0LXQvCDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQvdCwIG51bGxcclxuICAgICAgICBvcHRpb25zLnZhbHVlID0gb3B0aW9ucy52YWx1ZSA/IG9wdGlvbnMudmFsdWUgOiBvcHRpb25zLm1pblZhbDtcclxuICAgICAgICBsZXQgdmFsaWRPcHRpb25zOiBJTW9kZWxPcHRpb25zO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnbnVtZXJpYycgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMudmFsaWRhdGVOdW1lcmljRm9ybWF0KG9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdkYXRlJyApIHtcclxuICAgICAgICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC00LDRgtGLINCyINC90LDRh9Cw0LvRjNC90L7QvCDRhNC+0YLRgNC80LDRgtC1LCDQvdCw0L/RgCBkZC9tbS95eXl5XHJcbiAgICAgICAgICAgIC8vINGH0YLQvtCx0Ysg0LzQvtC20L3QviDQsdGL0LvQviDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0LjRhSDQtNC70Y8g0LjQt9C80LXQvdC10L3QuNGPINC80L7QtNC10LvQuFxyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgYWxsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMudmFsaWRhdGVEYXRlRm9ybWF0KG9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdjdXN0b20nICkge1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLnZhbGlkYXRlQ3VzdG9tRm9ybWF0KG9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlcyA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9mIGRhdGEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RhdGFGb3JtYXQgPSB2YWxpZE9wdGlvbnMuZGF0YUZvcm1hdDtcclxuICAgICAgICB0aGlzLl92YWwgPSB2YWxpZE9wdGlvbnMudmFsdWU7XHJcbiAgICAgICAgdGhpcy5fbWluVmFsID0gdmFsaWRPcHRpb25zLm1pblZhbDtcclxuICAgICAgICB0aGlzLl9tYXhWYWwgPSB2YWxpZE9wdGlvbnMubWF4VmFsO1xyXG4gICAgICAgIHRoaXMuX3N0ZXAgPSB2YWxpZE9wdGlvbnMuc3RlcDtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlID0gdmFsaWRPcHRpb25zLnJldmVyc2U7XHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSB2YWxpZE9wdGlvbnMucmFuZ2U7XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tVmFsdWVzID0gdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlczsgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCAhPSAnZGF0ZScpIHRoaXMuX29wdGlvbnMgPSB2YWxpZE9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMVxyXG4gICAgZ2V0VmFsKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbDtcclxuICAgIH1cclxuICAgIHNldFZhbChuZXdWYWw6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXJlTnVtZXJpYyhuZXdWYWwpO1xyXG4gICAgICAgIHRoaXMuaXNPbmVWYWx1ZVZhbGlkKHRoaXMuX21pblZhbCwgdGhpcy5fbWF4VmFsLCBuZXdWYWwsIHRoaXMuX3N0ZXApO1xyXG4gICAgICAgIHRoaXMuX3ZhbCA9IG5ld1ZhbDtcclxuICAgIH1cclxuICAgIC8vIDJcclxuICAgIGdldFJhbmdlKCk6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYW5nZTtcclxuICAgIH1cclxuICAgIHNldFJhbmdlKG5ld1JhbmdlOiBbbnVtYmVyLCBudW1iZXJdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcmVOdW1lcmljKG5ld1JhbmdlWzBdLCBuZXdSYW5nZVsxXSlcclxuICAgICAgICB0aGlzLmlzUmFuZ2VWYWxpZCh0aGlzLl9taW5WYWwsIHRoaXMuX21heFZhbCwgbmV3UmFuZ2UsIHRoaXMuX3N0ZXApO1xyXG5cclxuICAgICAgICBpZiAoIHRoaXMuYXJlTWluTWF4VmFsaWQobmV3UmFuZ2VbMF0sIG5ld1JhbmdlWzFdLCB0aGlzLl9yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFuZ2UgPSBuZXdSYW5nZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9yYW5nZSA9IFtuZXdSYW5nZVsxXSwgbmV3UmFuZ2VbMF1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBuZXdSYW5nZTtcclxuICAgIH1cclxuICAgIC8vIDNcclxuICAgIGdldFN0ZXAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcDtcclxuICAgIH1cclxuICAgIC8vIDRcclxuICAgIGdldE1pblZhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5WYWw7XHJcbiAgICB9XHJcbiAgICAvLyA1XHJcbiAgICBnZXRNYXhWYWwoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4VmFsO1xyXG4gICAgfVxyXG4gICAgLy8gNlxyXG4gICAgZ2V0UmV2ZXJzZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmV2ZXJzZTtcclxuICAgIH1cclxuICAgIC8vIDdcclxuICAgIGdldEN1c3RvbVZhbHVlcygpOiBhbnlbXSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1c3RvbVZhbHVlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gOFxyXG4gICAgZ2V0RGF0YUZvcm1hdCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhRm9ybWF0O1xyXG4gICAgfVxyXG4gICAgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zIHtcclxuXHJcbiAgICAgICAgbGV0IG9wdHM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLl9vcHRpb25zO1xyXG4gICAgICAgIGlmICggIXRoaXMuX3JhbmdlICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbDogYW55O1xyXG4gICAgICAgICAgICAvL3ZhbCA9IHRoaXMudHJhbnNsYXRlKCB0aGlzLl92YWwgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdkYXRlJykge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3ZhbCApO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9ICgnMCcgKyB2YWwuZ2V0RGF0ZSgpKS5zbGljZSgtMikgKyBcclxuICAgICAgICAgICAgICAgICcvJyArICgnMCcgKyAoMSArIHZhbC5nZXRNb250aCgpKSApLnNsaWNlKC0yKSArXHJcbiAgICAgICAgICAgICAgICAnLycgKyAoIHZhbC5nZXRGdWxsWWVhcigpICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLl92YWw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9wdHMudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIG9wdHMucmFuZ2UgPSBudWxsO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbDogYW55O1xyXG4gICAgICAgICAgICBsZXQgYXJyOiBbYW55LCBhbnldID0gW251bGwsIG51bGxdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgIT0gJ2RhdGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgYXJyID0gdGhpcy5fcmFuZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3JhbmdlWzBdICk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSAoJzAnICsgdmFsLmdldERhdGUoKSkuc2xpY2UoLTIpICsgXHJcbiAgICAgICAgICAgICAgICAnLycgKyAoJzAnICsgKDEgKyB2YWwuZ2V0TW9udGgoKSkgKS5zbGljZSgtMikgK1xyXG4gICAgICAgICAgICAgICAgJy8nICsgdmFsLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXJyWzBdID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudHJhbnNsYXRlKCB0aGlzLl9yYW5nZVsxXSApO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gKCcwJyArIHZhbC5nZXREYXRlKCkpLnNsaWNlKC0yKSArIFxyXG4gICAgICAgICAgICAgICAgJy8nICsgKCcwJyArICgxICsgdmFsLmdldE1vbnRoKCkpICkuc2xpY2UoLTIpICtcclxuICAgICAgICAgICAgICAgICcvJyArIHZhbC5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGFyclsxXSA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0cy52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIG9wdHMucmFuZ2UgPSBhcnI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0cztcclxuICAgIH1cclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBmaW5kUG9zaXRpb25JbkFycih2YWw6IGFueSwgYXJyPzogYW55W10pOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC40YnQtdGCINC/0L7Qt9C40YbQuNGOIHZhbCDQsiBjdXN0b20gdmFsdWVzXHJcbiAgICAgICAgLy8g0YLQsNC6INC20LUg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNGB0L/QvtC70YzQt9C+0LLQsNC9INGBINC70Y7QsdGL0Lwg0LTRgNGD0LPQuCDQvNCw0YHRgdC40LLQvtC8XHJcbiAgICAgICAgaWYgKCBhcnIgJiYgYXJyLmluZGV4T2YodmFsKSAhPSAtMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFyci5pbmRleE9mKHZhbCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICggYXJyICYmIGFyci5pbmRleE9mKHZhbCkgPT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudCBmaW5kIHZhbHVlIGluIGFycmF5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICF0aGlzLl9jdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHRoaXMuX2N1c3RvbVZhbHVlcy5pbmRleE9mKHZhbCkgIT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXMuaW5kZXhPZih2YWwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHZhbGlkIHZhbHVlIGZvciBjdXN0b20gdmFsdWVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0ZXBOdW1iZXIodmFsOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC90LDRhdC+0LTQuNGCLCDQvdCwINC60LDQutC+0Lwg0L/QviDRgdGH0LXRgtGDINGI0LDQs9C1INGB0YLQvtC40YIgdmFsXHJcbiAgICAgICAgLy8g0L/RgNC40LzQtdC90Y/RgtGMINGC0L7Qu9GM0LrQviDQtNC70Y8g0L3QtdGC0YDQsNC90YHRhNC+0YDQvNC40YDQvtCy0LDQvdC90YvRhSwg0L/RgNCw0LLQuNC70YzQvdGL0YUg0LfQvdCw0YfQtdC90LjQuSFcclxuICAgICAgICBsZXQgc3RlcE51bTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5maW5kRGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5maW5kRGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcblxyXG4gICAgICAgIGxldCBhOiBudW1iZXIgPSArKHZhbCAtIHRoaXMuX21pblZhbCkudG9GaXhlZChuKTtcclxuICAgICAgICBsZXQgYjogbnVtYmVyID0gKyh0aGlzLl9tYXhWYWwgLSB0aGlzLl9taW5WYWwpLnRvRml4ZWQobilcclxuICAgICAgICBcclxuICAgICAgICBzdGVwTnVtID0gKyggYSAqIHRoaXMuZ2V0TnVtYmVyT2ZTdGVwcygpIC8gYiApLnRvRml4ZWQoKTtcclxuICAgICAgICBzdGVwTnVtID0gTWF0aC5hYnMoc3RlcE51bSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGVwTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zbGF0ZUJ5U3RlcChzdGVwOiBudW1iZXIpOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnY3VzdG9tJykge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5fcmV2ZXJzZSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXNbc3RlcF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzW3RoaXMuX2N1c3RvbVZhbHVlcy5sZW5ndGggLSBzdGVwIC0gMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuICAgICAgICAgICAgbGV0IHI6IG51bWJlciA9ICF0aGlzLl9yZXZlcnNlID8gMSA6IC0xO1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgPSArKCAoK3RoaXMuX21pblZhbCkgKyAoK3RoaXMuX3N0ZXApICogKCtzdGVwKSAqICgrcikgKS50b0ZpeGVkKG4pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbCk7IFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICByZXR1cm4gdmFsOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2xhdGUodmFsKTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdjdXN0b20nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXNbdmFsXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdkYXRlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodmFsKTsgXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXROdW1iZXJPZlN0ZXBzKCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuICAgICAgICBuID0gTWF0aC5wb3coMTAsIG4pO1xyXG4gICAgICAgIHJldHVybiAoIE1hdGguYWJzKHRoaXMuX21heFZhbCAtIHRoaXMuX21pblZhbCkgKiBuICkgLyAoIHRoaXMuX3N0ZXAgKiBuICk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlKG5ld09wdGlvbnM6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgcHJldk9wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLl9vcHRpb25zO1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBhbnkgPSBPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgbmV3T3B0aW9ucyk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMudmFsdWUgPSBvcHRpb25zLnZhbHVlICE9IG51bGwgPyBvcHRpb25zLnZhbHVlIDogb3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgbGV0IHZhbGlkT3B0aW9uczogSU1vZGVsT3B0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ251bWVyaWMnICkge1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLnZhbGlkYXRlTnVtZXJpY0Zvcm1hdChvcHRpb25zLCBwcmV2T3B0aW9ucyBhcyBJT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnZGF0ZScgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMudmFsaWRhdGVEYXRlRm9ybWF0KG9wdGlvbnMsIHByZXZPcHRpb25zIGFzIElPcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBuZXdPcHRpb25zKTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnY3VzdG9tJyApIHtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy52YWxpZGF0ZUN1c3RvbUZvcm1hdChvcHRpb25zLCBwcmV2T3B0aW9ucyBhcyBJT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXMgPSBvcHRpb25zLmN1c3RvbVZhbHVlcztcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGZvcm1hdCBvZiBkYXRhJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kYXRhRm9ybWF0ID0gdmFsaWRPcHRpb25zLmRhdGFGb3JtYXQ7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gdmFsaWRPcHRpb25zLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX21pblZhbCA9IHZhbGlkT3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgdGhpcy5fbWF4VmFsID0gdmFsaWRPcHRpb25zLm1heFZhbDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gdmFsaWRPcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZSA9IHZhbGlkT3B0aW9ucy5yZXZlcnNlO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gdmFsaWRPcHRpb25zLnJhbmdlO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVZhbHVlcyA9IHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXM7ICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgIT0gJ2RhdGUnKSB0aGlzLl9vcHRpb25zID0gdmFsaWRPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVOdW1lcmljRm9ybWF0KGFsbE9wdGlvbnM6IElPcHRpb25zLCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMpOiBJTW9kZWxPcHRpb25zIHtcclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnMgPSBhbGxPcHRpb25zO1xyXG4gICAgICAgIC8vINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0L3QsNGH0LDQu9GM0L3Ri9C8INC+0L/RhtC40Y/QvCDQtNC10YTQvtC70YLQvdGL0LUg0LfQvdCw0YfQtdC90LjRjyDQuNC3IGRlZmF1bHRPcHRpb25zXHJcbiAgICAgICAgLy8g0L3QsNGH0LDQu9GM0L3QvtC80YMg0LfQvdCw0YfQtdC90LjRjiDQv9GA0LjRgdCy0LDQuNCy0LDQtdC8INC80LjQvdC40LzQsNC70YzQvdC+0LVcclxuICAgICAgICAvLyDQv9C+INC80LXRgNC1INC/0YDQvtGF0L7QttC00LXQvdC40Y8g0LLQsNC70LjQtNCw0YbQuNC4LCDQvNC10L3Rj9C10Lwg0LfQvdCw0YfQtdC90LjRjyDQvdCwINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjNGB0LrQuNC1XHJcbiAgICAgICAgbGV0IG5ld09wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGRhdGFGb3JtYXQ6ICdudW1lcmljJyxcclxuICAgICAgICAgICAgdmFsdWU6IGRlZmF1bHRPcHRpb25zLm1pblZhbCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgIG1pblZhbDogZGVmYXVsdE9wdGlvbnMubWluVmFsIGFzIG51bWJlcixcclxuICAgICAgICAgICAgbWF4VmFsOiBkZWZhdWx0T3B0aW9ucy5tYXhWYWwgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICBzdGVwOiBkZWZhdWx0T3B0aW9ucy5zdGVwLFxyXG4gICAgICAgICAgICByZXZlcnNlOiBkZWZhdWx0T3B0aW9ucy5yZXZlcnNlLFxyXG4gICAgICAgICAgICByYW5nZTogZGVmYXVsdE9wdGlvbnMucmFuZ2UgYXMgW251bWJlciwgbnVtYmVyXSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYXJlTnVtZXJpYyhvcHRpb25zLm1heFZhbCwgb3B0aW9ucy5taW5WYWwsIG9wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgIG5ld09wdGlvbnMuc3RlcCA9IE1hdGguYWJzKG9wdGlvbnMuc3RlcCk7XHJcbiAgICAgICAgbmV3T3B0aW9ucy5yZXZlcnNlID0gb3B0aW9ucy5yZXZlcnNlID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIG5ld09wdGlvbnMuZGF0YUZvcm1hdCA9IG9wdGlvbnMuZGF0YUZvcm1hdDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmlzU3RlcFZhbGlkKG9wdGlvbnMubWluVmFsIGFzIG51bWJlciwgb3B0aW9ucy5tYXhWYWwgYXMgbnVtYmVyLCBuZXdPcHRpb25zLnN0ZXApO1xyXG5cclxuICAgICAgICAvLyDQtdGB0LvQuCDQvNC40L0g0Lgg0LzQsNC60YEg0L/QtdGA0LXQv9GD0YLQsNC90Ysg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10LwsINC80LXQvdGP0LXQvCDQv9C+0YDRj9C00L7QulxyXG4gICAgICAgIC8vINC/0L7QtNGA0LDQt9GD0LzQtdCy0LDQtdGC0YHRjywg0YfRgtC+IG1pbiAtINGN0YLQviDRgtC+INGH0YLQviDRgdC70LXQstCwINC90LAg0YHQu9Cw0LnQtNC10YDQtSwgbWF4IC0g0YHQv9GA0LDQstCwXHJcbiAgICAgICAgaWYgKCB0aGlzLmFyZU1pbk1heFZhbGlkKG9wdGlvbnMubWluVmFsIGFzIG51bWJlciwgb3B0aW9ucy5tYXhWYWwgYXMgbnVtYmVyLCBuZXdPcHRpb25zLnJldmVyc2UpICkge1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLm1pblZhbCA9IG9wdGlvbnMubWluVmFsIGFzIG51bWJlcjtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5tYXhWYWwgPSBvcHRpb25zLm1heFZhbCBhcyBudW1iZXI7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5taW5WYWwgPSBvcHRpb25zLm1heFZhbCBhcyBudW1iZXI7XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMubWF4VmFsID0gb3B0aW9ucy5taW5WYWwgYXMgbnVtYmVyOyAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMucmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNSYW5nZVZhbGlkKG5ld09wdGlvbnMubWluVmFsLCBuZXdPcHRpb25zLm1heFZhbCwgb3B0aW9ucy5yYW5nZSBhcyBbbnVtYmVyLCBudW1iZXJdLCBuZXdPcHRpb25zLnN0ZXApO1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQvNC40L0g0Lgg0LzQsNC60YEg0LIg0LTQuNCw0L/QsNC30L7QvdC1IHJhbmdlINC/0LXRgNC10L/Rg9GC0LDQvdGLINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8LCDQvNC10L3Rj9C10Lwg0L/QvtGA0Y/QtNC+0LpcclxuICAgICAgICAgICAgaWYgKCB0aGlzLmFyZU1pbk1heFZhbGlkKG9wdGlvbnMucmFuZ2VbMF0gYXMgbnVtYmVyLCBvcHRpb25zLnJhbmdlWzFdIGFzIG51bWJlciwgbmV3T3B0aW9ucy5yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgICAgIG5ld09wdGlvbnMucmFuZ2UgPSBvcHRpb25zLnJhbmdlIGFzIFtudW1iZXIsIG51bWJlcl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdPcHRpb25zLnJhbmdlID0gW29wdGlvbnMucmFuZ2VbMV0gYXMgbnVtYmVyLCBvcHRpb25zLnJhbmdlWzBdIGFzIG51bWJlcl07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vINC+0YLQvNC10L3Rj9C10Lwg0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUsINC00LDQttC1INC10YHQu9C4INC+0L3QviDQstCy0LXQtNC10L3QviDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvFxyXG4gICAgICAgICAgICBuZXdPcHRpb25zLnZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0LfQsNC/0YPRgdC60LDQtdC8INC/0YDQvtCy0LXRgNC60Lgg0LTQu9GPINC90LDRh9Cw0LvRjNC90L7Qs9C+INC30L3QsNGH0LXQvdC40Y8sINGC0L7Qu9GM0LrQviDQtdGB0LvQuCDQvdC1INGD0LrQsNC30LDQvSDQtNC40LDQv9Cw0LfQvtC9IHJhbmdlXHJcbiAgICAgICAgICAgIHRoaXMuYXJlTnVtZXJpYyhvcHRpb25zLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5pc09uZVZhbHVlVmFsaWQobmV3T3B0aW9ucy5taW5WYWwsIG5ld09wdGlvbnMubWF4VmFsLCBvcHRpb25zLnZhbHVlIGFzIG51bWJlciwgbmV3T3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMudmFsdWUgPSBvcHRpb25zLnZhbHVlIGFzIG51bWJlcjtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5yYW5nZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXdPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlRGF0ZUZvcm1hdChhbGxPcHRpb25zOiBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zKTogSU1vZGVsT3B0aW9ucyB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IElPcHRpb25zID0gYWxsT3B0aW9ucztcclxuXHJcbiAgICAgICAgdGhpcy5pc0N1c3RvbURhdGVWYWxpZChvcHRpb25zLm1pblZhbCwgb3B0aW9ucy5tYXhWYWwpO1xyXG4gICAgICAgIG9wdGlvbnMubWluVmFsID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5taW5WYWwgYXMgc3RyaW5nKTtcclxuICAgICAgICBvcHRpb25zLm1heFZhbCA9IHRoaXMudHJhbnNsYXRlRGF0ZVRvTnVtYmVyKG9wdGlvbnMubWF4VmFsIGFzIHN0cmluZyk7XHJcbiAgICAgICAgb3B0aW9ucy5zdGVwID0gdGhpcy50cmFubGF0ZVN0ZXBUb0RhdGVGb3JtYXQob3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgaWYgKCBBcnJheS5pc0FycmF5KG9wdGlvbnMucmFuZ2UpICYmIG9wdGlvbnMucmFuZ2UubGVuZ3RoID09IDIgKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQstCy0LXQuyDRh9GC0L4g0YLQviDQtNGA0YPQs9C+0LUsINCwINC90LUgcmFuZ2UsINC90LAg0Y3RgtC+0LxcclxuICAgICAgICAgICAgLy8g0Y3RgtCw0L/QtSDQvtGI0LjQsdC60Lgg0L3QtSDQsdGD0LTQtdGCLiDQntC90LAg0L/QvtGP0LLQuNGC0YHRjyDQv9GA0Lgg0L/RgNC+0LLQtdGA0LrQtSDQvdCwIHZhbGlkYXRlTnVtZXJpY0Zvcm1hdFxyXG4gICAgICAgICAgICAvLyAo0L/QvtGC0L7QvNGDINGH0YLQviByYW5nZSDRgtCw0Log0Lgg0L7RgdGC0LDQtdGC0YHRjyB0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLmlzQ3VzdG9tRGF0ZVZhbGlkKG9wdGlvbnMucmFuZ2VbMF0sIG9wdGlvbnMucmFuZ2VbMV0pO1xyXG4gICAgICAgICAgICBvcHRpb25zLnJhbmdlWzBdID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5yYW5nZVswXSBhcyBzdHJpbmcpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnJhbmdlWzFdID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5yYW5nZVsxXSBhcyBzdHJpbmcpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmlzQ3VzdG9tRGF0ZVZhbGlkKG9wdGlvbnMudmFsdWUpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy52YWx1ZSBhcyBzdHJpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZU51bWVyaWNGb3JtYXQob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlQ3VzdG9tRm9ybWF0KGFsbE9wdGlvbnM6IElPcHRpb25zLCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMpOiBJTW9kZWxPcHRpb25zIHtcclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnMgPSBhbGxPcHRpb25zO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLmN1c3RvbVZhbHVlcyApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjdXN0b21WYWx1ZXMgaXMgcmVxdWlyZWQgb3B0aW9uIGZvciBjdXN0b20gZm9ybWF0Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICggIUFycmF5LmlzQXJyYXkob3B0aW9ucy5jdXN0b21WYWx1ZXMpIHx8IG9wdGlvbnMuY3VzdG9tVmFsdWVzLmxlbmd0aCA8IDIgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY3VzdG9tVmFsdWVzIHNob3VsZCBiZSBhIHJhbmdlIHdpdGggdHdvIG9yIG1vcmUgaXRlbXMsIGxpa2UgWzEsIDIsIFwiYVwiXScpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIG9wdGlvbnMubWluVmFsID0gMDtcclxuICAgICAgICBvcHRpb25zLm1heFZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgb3B0aW9ucy5zdGVwID0gMTtcclxuXHJcbiAgICAgICAgLy8g0L/RgNC40L7RgNC40YLQtdGC0Ysg0L7Qv9GG0LjQuTpcclxuICAgICAgICAvLyAxLiByYW5nZSDQsiDRh9C40YHQu9Cw0YVcclxuICAgICAgICAvLyAyLiByYW5nZSDQsiDQt9C90LDRh9C10L3QuNGP0YVcclxuICAgICAgICAvLyAzLiB2YWx1ZSDQutCw0Log0YfQuNGB0LvQvlxyXG4gICAgICAgIC8vIDQuIHZhbHVlINC60LDQuiDQt9C90LDRh9C10L3QuNC1IFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5yYW5nZSB8fCBvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXMgKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFvcHRpb25zLnJhbmdlICYmIEFycmF5LmlzQXJyYXkob3B0aW9ucy5yYW5nZUluQ3VzdG9tVmFsdWVzKSAmJiBvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXMubGVuZ3RoID09IDIgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LLQstC10Lsg0YfRgtC+INGC0L4g0LTRgNGD0LPQvtC1LCDQsCDQvdC1IHJhbmdlLCDQvdCwINGN0YLQvtC8XHJcbiAgICAgICAgICAgICAgICAvLyDRjdGC0LDQv9C1INC+0YjQuNCx0LrQuCDQvdC1INCx0YPQtNC10YIuINCe0L3QsCDQv9C+0Y/QstC40YLRgdGPINC/0YDQuCDQv9GA0L7QstC10YDQutC1INC90LAgdmFsaWRhdGVOdW1lcmljRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAvLyAo0L/QvtGC0L7QvNGDINGH0YLQviByYW5nZSDRgtCw0Log0Lgg0L7RgdGC0LDQtdGC0YHRjyB0cnVlKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IFswLCAwXTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMF0gPSB0aGlzLmZpbmRQb3NpdGlvbkluQXJyKG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlc1swXSwgb3B0aW9ucy5jdXN0b21WYWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVsxXSA9IHRoaXMuZmluZFBvc2l0aW9uSW5BcnIob3B0aW9ucy5yYW5nZUluQ3VzdG9tVmFsdWVzWzFdLCBvcHRpb25zLmN1c3RvbVZhbHVlcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L3QtSDQstCy0LXQtNC10L3RiyB2YWwg0LjQu9C4IHJhbmdlINCyIGN1c3RvbSB2YWx1ZXNcclxuICAgICAgICAgICAgLy8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQv9GA0L7RgdGC0YvQtSB2YWx1ZSDQuNC70LggcmFuZ2UsINC10YHQu9C4INC+0L3QuCDQtdGB0YLRjCBcclxuICAgICAgICAgICAgaWYgKCAhb3B0aW9ucy52YWx1ZSAmJiBvcHRpb25zLnZhbHVlSW5DdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gdGhpcy5maW5kUG9zaXRpb25JbkFycihvcHRpb25zLnZhbHVlSW5DdXN0b21WYWx1ZXMsIG9wdGlvbnMuY3VzdG9tVmFsdWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZU51bWVyaWNGb3JtYXQob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFyZU51bWVyaWMoLi4udmFsczogYW55KSB7XHJcbiAgICAgICAgZm9yIChsZXQgdmFsIG9mIHZhbHMpIHtcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5pc051bWVyaWModmFsKSApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIHZhbHVlcyBpbiBudW1lcmljIGZvcm1hdCBzaG91bGQgYmUgbnVtYmVycycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXJlTWluTWF4VmFsaWQobWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyLCByZXZlcnNlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCAhcmV2ZXJzZSAmJiAobWluVmFsID49IG1heFZhbCkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCByZXZlcnNlICYmIChtaW5WYWwgPD0gbWF4VmFsKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzU3RlcFZhbGlkKG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlciwgc3RlcDogbnVtYmVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCAhdGhpcy5pc051bWVyaWMoc3RlcCkgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RlcCBzaG91bGQgYmUgYSBudW1iZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBzdGVwID09IDAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RlcCBjYW50IGJlIGVxdWFsIHRvIDAnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5maW5kRGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5maW5kRGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcbiAgICAgICAgbGV0IHRlc3Q6IG51bWJlciA9ICsobWF4VmFsIC0gbWluVmFsKS50b0ZpeGVkKG4pXHJcbiAgICAgICAgdGVzdCA9ICggdGVzdCAqIE1hdGgucG93KDEwLCBuKSApIC8gKCBzdGVwICogTWF0aC5wb3coMTAsIG4pICk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBpZiAoIHRlc3QgJSAxICE9IDAgKSB7XHJcbiAgICAgICAgICAgIC8vINCyINGC0L7QvCDRh9C40YHQu9C1INGN0YLQviDQv9GA0L7QstC10YDQutCwINGH0YLQvtCx0Ysg0YjQsNCzINCx0YvQuyDQvdC1INCx0L7Qu9GM0YjQtSDQstGB0LXQs9C+INC/0YDQvtC80LXQttGD0YLQutCwXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignKE1heCB2YWx1ZSAtIG1pbiB2YWx1ZSkgZGl2aWRlZCBieSBzdGVwIHNob3VsZCByZXR1cm4gaW50ZWdlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzT25lVmFsdWVWYWxpZChtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIsIHZhbDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHN0ZXApLCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKG1pblZhbCkgKTtcclxuXHJcbiAgICAgICAgbGV0IHRlc3Q6IG51bWJlciA9ICsodmFsIC0gbWluVmFsKS50b0ZpeGVkKG4pXHJcbiAgICAgICAgdGVzdCA9ICggdGVzdCAqIE1hdGgucG93KDEwLCBuKSApIC8gKCBzdGVwICogTWF0aC5wb3coMTAsIG4pICk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBpZiAoIE1hdGgubWF4KG1pblZhbCwgbWF4VmFsKSA8IHZhbCAgfHwgIE1hdGgubWluKG1pblZhbCwgbWF4VmFsKSA+IHZhbCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgaW5pdGlhbCB2YWx1ZSBzaG91bGQgYmUgd2l0aGluIG1pbiBhbmQgbWF4IHZhbHVlcycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGVzdCAlIDEgIT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBzaG91bGQgYmUgc2V0IG9uIHN0ZXAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1JhbmdlVmFsaWQobWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyLCByYW5nZTogW251bWJlciwgbnVtYmVyXSwgc3RlcDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5maW5kRGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5maW5kRGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcblxyXG4gICAgICAgIGxldCB0ZXN0TGVmdDogbnVtYmVyID0gKHJhbmdlWzBdIC0gbWluVmFsKSAvIHN0ZXA7XHJcbiAgICAgICAgdGVzdExlZnQgPSArdGVzdExlZnQudG9GaXhlZChuKTtcclxuICAgICAgICB0ZXN0TGVmdCA9IE1hdGguYWJzKHRlc3RMZWZ0KTtcclxuXHJcbiAgICAgICAgbGV0IHRlc3RSaWdodDogbnVtYmVyID0gKHJhbmdlWzFdIC0gbWluVmFsKSAvIHN0ZXA7XHJcbiAgICAgICAgdGVzdFJpZ2h0ID0gK3Rlc3RSaWdodC50b0ZpeGVkKG4pO1xyXG4gICAgICAgIHRlc3RSaWdodCA9IE1hdGguYWJzKHRlc3RSaWdodCk7XHJcblxyXG4gICAgICAgIGlmICggcmFuZ2UubGVuZ3RoICE9IDIgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmFuZ2Ugc2hvdWxkIGNvbnRhaW4gdHdvIHZhbHVlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyhyYW5nZVswXSkgfHwgIXRoaXMuaXNOdW1lcmljKHJhbmdlWzFdKSApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZXMgaW4gcmFuZ2Ugc2hvdWxkIGJlIG51bWJlcnMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBNYXRoLm1heChtaW5WYWwsIG1heFZhbCkgPCBNYXRoLm1heChyYW5nZVswXSwgcmFuZ2VbMV0pICB8fCAgTWF0aC5taW4obWluVmFsLCBtYXhWYWwpID4gTWF0aC5taW4ocmFuZ2VbMF0sIHJhbmdlWzFdKSApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcmFuZ2Ugc2hvdWxkIGJlIHdpdGhpbiBtaW4gYW5kIG1heCB2YWx1ZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0ZXN0TGVmdCAlIDEgIT0gMCB8fCB0ZXN0UmlnaHQgJSAxICE9IDAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHJhbmdlIHNob3VsZCBiZSBzZXQgb24gc3RlcCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzQ3VzdG9tRGF0ZVZhbGlkKC4uLnZhbHM6IGFueVtdKSB7XHJcbiAgICAgICAgZm9yICggbGV0IHZhbCBvZiB2YWxzICkge1xyXG4gICAgICAgICAgICBpZiAoICEoJycgKyB2YWwpLm1hdGNoKC9eXFxkezJ9Wy5cXC8tXVxcZHsyfVsuXFwvLV1cXGR7NH0kLykgKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FsbCB2YWx1ZXMgaW4gZGF0ZSBmb3JtYXQgc2hvdWxkIGJlIGRhdGVzLCBsaWtlIGRkLm1tLnl5eXkgb3IgZGQvbW0veXl5eSBvciBkZC1tbS15eXl5Jyk7IFxyXG4gICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJhbnNsYXRlRGF0ZVRvTnVtYmVyKHN0cjogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgYXJyID0gc3RyLnNwbGl0KHN0clsyXSk7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgrYXJyWzJdLCArYXJyWzFdIC0gMSwgK2FyclswXSk7XHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINCy0LLQvtC00LjRgiDRgdGC0YDQsNC90L3Ri9C1INC00LDQvdC90YvQtSwg0L7QvSDQstGB0LUg0YDQsNCy0L3QviDQv9C+0LvRg9GH0LjRgiDRgNC10LfRg9C70YzRgtCw0YIuXHJcbiAgICAgICAgLy8g0KHQutC+0YDQtdC1INCy0YHQtdCz0L4sINGN0YLQviDQs9C+0LLQvtGA0LjRgiDQviDRgtC+0LwsINGH0YLQviDQvtC9INC/0LXRgNC10L/Rg9GC0LDQuyDQv9C+0YDRj9C00L7Qui4g0J/QvtGP0LLQuNGC0YHRjyDQv9GA0LXQtNGD0L/RgNC10LbQtNC10L3QuNC1XHJcbiAgICAgICAgaWYgKCthcnJbMF0gPiAzMSB8fCArYXJyWzFdID4gMTIpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVc2UgZGQubW0ueXl5eSBvciBkZC9tbS95eXl5IG9yIGRkLW1tLXl5eXkgZm9yIGRhdGVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGF0ZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29ycmVjdCBkYXRlLCB0cnkgZGQubW0ueXl5eSBvciBkZC9tbS95eXl5IG9yIGRkLW1tLXl5eXknKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICtkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJhbmxhdGVTdGVwVG9EYXRlRm9ybWF0KHN0ZXA6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5pc051bWVyaWMoc3RlcCkgfHwgc3RlcCAlIDEgIT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGVwIGluIGRhdGUgZm9ybWF0IHNob3VsZCBiZSBpbnRlZ2VyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdGVwICogMjQgKiAzNjAwICogMTAwMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBpc051bWVyaWMobjogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiAhaXNOYU4obiAtIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmluZERlY2ltYWxQbGFjZXMobnVtOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC60L7Qu9C40YfQtdGB0YLQstC+INC30L3QsNC60L7QsiDQv9C+0YHQu9C1INC30LDQv9GP0YLQvtC5XHJcbiAgICAgICAgcmV0dXJuIH4obnVtICsgJycpLmluZGV4T2YoJy4nKSA/IChudW0gKyAnJykuc3BsaXQoJy4nKVsxXS5sZW5ndGggOiAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgSU1vZGVsIH07XHJcbmV4cG9ydCB7IElNb2RlbE9wdGlvbnMgfTtcclxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7XHJcbiIsIi8qKlxyXG4gKiDQmNC90YLRhNC10YDRhNC10LnRgSDQuNC30LTQsNGC0LXQu9GPINC+0LHRitGP0LLQu9GP0LXRgiDQvdCw0LHQvtGAINC80LXRgtC+0LTQvtCyINC00LvRjyDRg9C/0YDQsNCy0LvQtdC90LjRj9C80Lgg0L/QvtC00L/QuNGB0LrQuNGH0LDQvNC4LlxyXG4gKi9cclxuaW50ZXJmYWNlIElTdWJqZWN0IHtcclxuXHJcbiAgICB2YWw6IGFueSB8IFthbnksIGFueV07IFxyXG5cclxuICAgIC8vINCf0YDQuNGB0L7QtdC00LjQvdGP0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPINC6INC40LfQtNCw0YLQtdC70Y4uXHJcbiAgICBhdHRhY2gob2JzZXJ2ZXI6IElPYnNlcnZlcik6IHZvaWQ7XHJcblxyXG4gICAgLy8g0J7RgtGB0L7QtdC00LjQvdGP0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPINC+0YIg0LjQt9C00LDRgtC10LvRjy5cclxuICAgIGRldGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZDtcclxuXHJcbiAgICAvLyDQo9Cy0LXQtNC+0LzQu9GP0LXRgiDQstGB0LXRhSDQvdCw0LHQu9GO0LTQsNGC0LXQu9C10Lkg0L4g0YHQvtCx0YvRgtC40LguXHJcbiAgICBub3RpZnkoKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqINCY0LfQtNCw0YLQtdC70Ywg0LLQu9Cw0LTQtdC10YIg0L3QtdC60L7RgtC+0YDRi9C8INCy0LDQttC90YvQvCDRgdC+0YHRgtC+0Y/QvdC40LXQvCDQuCDQvtC/0L7QstC10YnQsNC10YIg0L3QsNCx0LvRjtC00LDRgtC10LvQtdC5INC+INC10LPQvlxyXG4gKiDQuNC30LzQtdC90LXQvdC40Y/RhS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YmplY3QgaW1wbGVtZW50cyBJU3ViamVjdCB7XHJcblxyXG4gICAgdmFsOiBhbnkgfCBbYW55LCBhbnldOyBcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggdmFsOiBhbnkgfCBbYW55LCBhbnldICkge1xyXG4gICAgICAgIHRoaXMudmFsID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge09ic2VydmVyW119INCh0L/QuNGB0L7QuiDQv9C+0LTQv9C40YHRh9C40LrQvtCyLiDQkiDRgNC10LDQu9GM0L3QvtC5INC20LjQt9C90Lgg0YHQv9C40YHQvtC6XHJcbiAgICAgKiDQv9C+0LTQv9C40YHRh9C40LrQvtCyINC80L7QttC10YIg0YXRgNCw0L3QuNGC0YzRgdGPINCyINCx0L7Qu9C10LUg0L/QvtC00YDQvtCx0L3QvtC8INCy0LjQtNC1ICjQutC70LDRgdGB0LjRhNC40YbQuNGA0YPQtdGC0YHRjyDQv9C+XHJcbiAgICAgKiDRgtC40L/RgyDRgdC+0LHRi9GC0LjRjyDQuCDRgi7QtC4pXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZXJzOiBJT2JzZXJ2ZXJbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JzQtdGC0L7QtNGLINGD0L/RgNCw0LLQu9C10L3QuNGPINC/0L7QtNC/0LjRgdC60L7QuS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJJbmRleCA9IHRoaXMub2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLnNwbGljZShvYnNlcnZlckluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCX0LDQv9GD0YHQuiDQvtCx0L3QvtCy0LvQtdC90LjRjyDQsiDQutCw0LbQtNC+0Lwg0L/QvtC00L/QuNGB0YfQuNC60LUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBub3RpZnkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qgb2JzZXJ2ZXIgb2YgdGhpcy5vYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIudXBkYXRlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCY0L3RgtC10YDRhNC10LnRgSDQndCw0LHQu9GO0LTQsNGC0LXQu9GPINC+0LHRitGP0LLQu9GP0LXRgiDQvNC10YLQvtC0INGD0LLQtdC00L7QvNC70LXQvdC40Y8sINC60L7RgtC+0YDRi9C5INC40LfQtNCw0YLQtdC70LhcclxuICog0LjRgdC/0L7Qu9GM0LfRg9GO0YIg0LTQu9GPINC+0L/QvtCy0LXRidC10L3QuNGPINGB0LLQvtC40YUg0L/QvtC00L/QuNGB0YfQuNC60L7Qsi5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmVyIHtcclxuICAgIGZ1bmM6IGFueTtcclxuICAgIC8vINCf0L7Qu9GD0YfQuNGC0Ywg0L7QsdC90L7QstC70LXQvdC40LUg0L7RgiDRgdGD0LHRitC10LrRgtCwLlxyXG4gICAgdXBkYXRlKHN1YmplY3Q6IFN1YmplY3QpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICog0JrQvtC90LrRgNC10YLQvdGL0LUg0J3QsNCx0LvRjtC00LDRgtC10LvQuCDRgNC10LDQs9C40YDRg9GO0YIg0L3QsCDQvtCx0L3QvtCy0LvQtdC90LjRjywg0LLRi9C/0YPRidC10L3QvdGL0LUg0JjQt9C00LDRgtC10LvQtdC8LCDQulxyXG4gKiDQutC+0YLQvtGA0L7QvNGDINC+0L3QuCDQv9GA0LjQutGA0LXQv9C70LXQvdGLLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9ic2VydmVyIGltcGxlbWVudHMgSU9ic2VydmVyIHtcclxuXHJcbiAgICBmdW5jOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZnVuYzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmZ1bmMgPSBmdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoc3ViamVjdDogU3ViamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnVuYyggc3ViamVjdC52YWwgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtJU3ViamVjdH07IiwiaW1wb3J0IElPcHRpb25zIGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQge0lNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCB7SU1vZGVsT3B0aW9uc30gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCB7SVZpZXd9IGZyb20gJy4vVmlldyc7XHJcbmltcG9ydCB7SVN1YmplY3R9ICBmcm9tICcuL09ic2VydmVyJztcclxuXHJcbmNsYXNzIFByZXNlbnRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW9kZWw6IElNb2RlbDtcclxuICAgIHByaXZhdGUgX3ZpZXc6IElWaWV3O1xyXG4gICAgcHJpdmF0ZSBfc3ViamVjdDogSVN1YmplY3Q7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0aXZlVGh1bWI6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1vZGVsOiBJTW9kZWwsIHZpZXc6IElWaWV3LCBzdWJqZWN0OiBJU3ViamVjdCkge1xyXG5cclxuICAgICAgICB0aGlzLl9tb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xyXG4gICAgICAgIHRoaXMuX3N1YmplY3QgPSBzdWJqZWN0O1xyXG5cclxuICAgICAgICB0aGlzLnRodW1iT25Eb3duID0gdGhpcy50aHVtYk9uRG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudGh1bWJPbk1vdmUgPSB0aGlzLnRodW1iT25Nb3ZlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy50aHVtYk9uVXAgPSB0aGlzLnRodW1iT25VcC5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlck9uQ2xpY2sgPSB0aGlzLnNsaWRlck9uQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgXHJcbiAgICAgICAgaWYgKCAhbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoKS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRodW1iT25Eb3duKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDEpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMikuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Eb3duKTtcclxuXHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMSkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMikuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgfSAgXHJcblxyXG4gICAgICAgIHZpZXcuZ2V0U2xpZGVyKCkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc2xpZGVyT25DbGljayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aHVtYk9uRG93bihldmVudCk6IHZvaWQge1xyXG4gICAgICAgIC8vINC/0YDQtdC00L7RgtCy0YDQsNGC0LjRgtGMINC30LDQv9GD0YHQuiDQstGL0LTQtdC70LXQvdC40Y8gKNC00LXQudGB0YLQstC40LUg0LHRgNCw0YPQt9C10YDQsClcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHVtYiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMudGh1bWJPbk1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnRodW1iT25VcCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy50aHVtYk9uTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRodW1iT25VcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aHVtYk9uTW92ZShldmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbW9kZWw6IElNb2RlbCA9IHRoaXMuX21vZGVsO1xyXG4gICAgICAgIGxldCB2aWV3OiBJVmlldyA9IHRoaXMuX3ZpZXc7XHJcblxyXG4gICAgICAgIGxldCBzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuX3ZpZXcuZ2V0U2xpZGVyKCk7XHJcbiAgICAgIFxyXG4gICAgICAgIGxldCBtaW5WYWw6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldE1pblZhbCgpO1xyXG4gICAgICAgIGxldCBtYXhWYWw6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldE1heFZhbCgpO1xyXG4gICAgICAgIGxldCBzdGVwOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbGV0IHJldmVyc2U6IG51bWJlciA9ICF0aGlzLl9tb2RlbC5nZXRSZXZlcnNlKCkgPyAxIDogLTE7XHJcbiAgICAgICAgbGV0IHNsaWRlckxlbmdodDogbnVtYmVyID0gdGhpcy5fdmlldy5nZXRMZW5naHQoKTtcclxuICAgICAgICBsZXQgc3RlcExlbmdodDogbnVtYmVyID0gdGhpcy5fdmlldy5maW5kT25lU3RlcExlbmdodCgpO1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyQm9yZGVyOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGV2ZW50UG9zOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHRodW1iUG9zaXRpb246IG51bWJlcjtcclxuICAgICAgICBsZXQgbGVmdFBvaW50OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHJpZ2h0UG9pbnQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgbmV3VmFsOiBudW1iZXI7XHJcblxyXG4gICAgICAgIC8vINCf0L7Qt9C40YbQuNGPINCx0LXQs9GD0L3QutCwINCyIHB4INCy0YvRh9C40YHQu9GP0LXRgtGB0Y8g0L7RgtC90L7RgdC40YLQtdC70YzQvdC+INC90LDRh9Cw0LvQsCDRgdC70LDQudC00LXRgNCwLlxyXG4gICAgICAgIC8vINCS0L3QsNGH0LDQu9C1IG5ld1ZhbCDQstGL0YfQuNGB0LvRj9C10YLRgdGPINC60LDQuiDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyINC+0YIg0L3QsNGH0LDQu9CwICjQvtGCIDApLFxyXG4gICAgICAgIC8vICjRgtC+INC10YHRgtGMINC30L3QsNGH0LXQvdC40Y8gbWluLCBtYXgsIHJldmVyc2Ug0L3QtSDQuNC80LXRjtGCINC30L3QsNGH0LXQvdC40Y8pLlxyXG5cclxuICAgICAgICBpZiAoICF2aWV3LmdldFZlcnRpY2FsKCkgKSB7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJCb3JkZXIgPSAoc2xpZGVyTm9kZS5vZmZzZXRXaWR0aCAtIHNsaWRlckxlbmdodCkgLyAyO1xyXG4gICAgICAgICAgICBldmVudFBvcyA9IGV2ZW50LmNsaWVudFggfHwgZXZlbnQudG91Y2hlc1swXS5jbGllbnRYOyAgICAgICAgIFxyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gZXZlbnRQb3MgLSBzbGlkZXJOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSBzbGlkZXJCb3JkZXI7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJCb3JkZXIgPSAoc2xpZGVyTm9kZS5vZmZzZXRIZWlnaHQgLSBzbGlkZXJMZW5naHQpIC8gMjtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSBldmVudC5jbGllbnRZIHx8IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGV2ZW50UG9zIC0gc2xpZGVyTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSBzbGlkZXJCb3JkZXI7XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgbmV3VmFsID0gTWF0aC5yb3VuZCh0aHVtYlBvc2l0aW9uIC8gc3RlcExlbmdodCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX2FjdGl2ZVRodW1iLmNsYXNzTGlzdC5jb250YWlucygnc2xpZGVyX190aHVtYl9yaWdodCcpICkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/RgNC+0LzQtdC20YPRgtC+0LosINGC0L4g0LvQtdCy0LDRjyDQs9GA0LDQvdC40YbQsCAtINGN0YLQviDQu9C10LLRi9C5INCx0LXQs9GD0L3QvtC6XHJcbiAgICAgICAgICAgICAgICAvLyDQt9C00LXRgdGMINGA0LDRgdGB0YfQuNGC0YvQstCw0LXRgtGB0Y8g0LrQvtC70LjRh9C10YHRgtCy0L4g0YjQsNCz0L7QsiDQvtGCINC90LDRh9Cw0LvQsCAo0L7RgiAwKSwgXHJcbiAgICAgICAgICAgICAgICAvLyDQt9Cw0YLQtdC8INGA0LDRgdGB0YLQvtGP0L3QuNC1INCyIHB4INC+0YIg0L3QsNGH0LDQu9CwINGB0LvQsNC50LTQtdGA0LAuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8g0J7RiNC40LHQutC4INCyINCy0YvRh9C40YHQu9C10L3QuNGP0YUg0YEgZmxvYXQg0LfQtNC10YHRjCDQvNC+0LbQvdC+INC/0YDQvtC40LPQvdC+0YDQuNGA0L7QstCw0YLRjFxyXG4gICAgICAgICAgICAgICAgbGVmdFBvaW50ID0gKG1vZGVsLmdldFJhbmdlKClbMF0gLSBtaW5WYWwpICogcmV2ZXJzZSAvIHN0ZXA7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UG9pbnQgPSBsZWZ0UG9pbnQgKiBzdGVwTGVuZ2h0O1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQb2ludCA9IHNsaWRlckxlbmdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5WYWwgPSBtb2RlbC5nZXRSYW5nZSgpWzBdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQb2ludCA9IChtb2RlbC5nZXRSYW5nZSgpWzFdIC0gbWluVmFsKSAqIHJldmVyc2UgLyBzdGVwO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQb2ludCA9IHJpZ2h0UG9pbnQgKiBzdGVwTGVuZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGVmdFBvaW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXhWYWwgPSBtb2RlbC5nZXRSYW5nZSgpWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGVmdFBvaW50ID0gMDtcclxuICAgICAgICAgICAgcmlnaHRQb2ludCA9IHNsaWRlckxlbmdodDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIHRodW1iUG9zaXRpb24gPD0gbGVmdFBvaW50KSB7XHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBsZWZ0UG9pbnQ7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IG1pblZhbDtcclxuICAgICAgICB9IGVsc2UgaWYgKCB0aHVtYlBvc2l0aW9uID49IHJpZ2h0UG9pbnQpIHtcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IHJpZ2h0UG9pbnQ7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IG1heFZhbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQsdC10LPRg9C90L7QuiDQvdC1INCy0YvRiNC10Lsg0LfQsCDQs9GA0LDQvdC40YbRiywg0YHRgtCw0LLQuNC8INC10LPQviDQvdCwINCx0LvQuNC20LDQudGI0LXQtSDQt9C90LDRh9C10L3QuNC1LFxyXG4gICAgICAgICAgICAvLyDQutGA0LDRgtC90L7QtSDRiNCw0LPRgy5cclxuICAgICAgICAgICAgLy8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0Y3RgtC+0LPQviDQv9GA0LXQvtCx0YDQsNC30YPQtdC8INC10LPQviDQtNC70Y8g0LzQvtC00LXQu9C4LiDQldGB0LvQuCByZXZlcnNlID09IHRydWUsINGC0L4gPT0gLTEgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBuZXdWYWwgKiBzdGVwTGVuZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZiA9IHggPT4gKCAoeC50b1N0cmluZygpLmluY2x1ZGVzKCcuJykpID8gKHgudG9TdHJpbmcoKS5zcGxpdCgnLicpLnBvcCgpLmxlbmd0aCkgOiAoMCkgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBuID0gZihzdGVwKSArIGYobWluVmFsKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKCBuZXdWYWwgKiBNYXRoLnBvdygxMCwgbikgKiBzdGVwICogcmV2ZXJzZSAgKSAvIE1hdGgucG93KDEwLCBuKTtcclxuXHJcbiAgICAgICAgICAgIG4gPSBNYXRoLm1heCggZihzdGVwKSwgZihtaW5WYWwpICk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICsoKCtuZXdWYWwpLnRvRml4ZWQobikpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSAoK21vZGVsLmdldE1pblZhbCgpKSArICgrbmV3VmFsKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKygoK25ld1ZhbCkudG9GaXhlZChuKSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXRSYW5nZSgpICYmIHRoaXMuX2FjdGl2ZVRodW1iLmNsYXNzTGlzdC5jb250YWlucygnc2xpZGVyX190aHVtYl9sZWZ0JykpIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0UmFuZ2UoIFtuZXdWYWwsIG1vZGVsLmdldFJhbmdlKClbMV1dICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG1vZGVsLmdldFJhbmdlKCkgJiYgdGhpcy5fYWN0aXZlVGh1bWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX3RodW1iX3JpZ2h0JykpIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0UmFuZ2UoIFttb2RlbC5nZXRSYW5nZSgpWzBdLCBuZXdWYWxdICk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1vZGVsLnNldFZhbChuZXdWYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMuX2FjdGl2ZVRodW1iLCB0aHVtYlBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoKSB8fCB2aWV3LmdldFRvb2x0aXAoMSkgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZShuZXdWYWwpO1xyXG5cclxuICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIHRoaXMuX2FjdGl2ZVRodW1iLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX3Rvb2x0aXAnKSwgdmFsLCB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHRodW1iT25VcChldmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy50aHVtYk9uVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMudGh1bWJPbk1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50aHVtYk9uVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudGh1bWJPbk1vdmUpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHVtYiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAvLyDQvdCw0LHQu9GO0LTQsNGC0LXQu9GMXHJcbiAgICAgICAgbGV0IG1vZGVsOiBJTW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXRWYWwoKSAhPSBudWxsICkge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gdmFsO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzBdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzBdID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzFdID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2xpZGVyT25DbGljayhldmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbW9kZWw6IElNb2RlbCA9IHRoaXMuX21vZGVsO1xyXG4gICAgICAgIGxldCB2aWV3OiBJVmlldyA9IHRoaXMuX3ZpZXc7XHJcblxyXG4gICAgICAgIGxldCBzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuX3ZpZXcuZ2V0U2xpZGVyKCk7XHJcbiAgICAgICAgbGV0IGNoYW5naW5nVGh1bWI6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICBcclxuICAgICAgICBsZXQgbWluVmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNaW5WYWwoKTtcclxuICAgICAgICBsZXQgbWF4VmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNYXhWYWwoKTtcclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIGxldCByZXZlcnNlOiBudW1iZXIgPSAhdGhpcy5fbW9kZWwuZ2V0UmV2ZXJzZSgpID8gMSA6IC0xO1xyXG4gICAgICAgIGxldCBzbGlkZXJMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcuZ2V0TGVuZ2h0KCk7XHJcbiAgICAgICAgbGV0IHN0ZXBMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcuZmluZE9uZVN0ZXBMZW5naHQoKTtcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlckJvcmRlcjogbnVtYmVyO1xyXG4gICAgICAgIGxldCBldmVudFBvczogbnVtYmVyO1xyXG4gICAgICAgIGxldCB0aHVtYlBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGxlZnRQb2ludDogbnVtYmVyO1xyXG4gICAgICAgIGxldCByaWdodFBvaW50OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG5ld1ZhbDogbnVtYmVyO1xyXG5cclxuICAgICAgICAvLyDQn9C+0LfQuNGG0LjRjyDQsdC10LPRg9C90LrQsCDQsiBweCDQstGL0YfQuNGB0LvRj9C10YLRgdGPINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDQvdCw0YfQsNC70LAg0YHQu9Cw0LnQtNC10YDQsC5cclxuICAgICAgICAvLyDQktC90LDRh9Cw0LvQtSBuZXdWYWwg0LLRi9GH0LjRgdC70Y/QtdGC0YHRjyDQutCw0Log0LrQvtC70LjRh9C10YHRgtCy0L4g0YjQsNCz0L7QsiDQvtGCINC90LDRh9Cw0LvQsCAo0L7RgiAwKSxcclxuICAgICAgICAvLyAo0YLQviDQtdGB0YLRjCDQt9C90LDRh9C10L3QuNGPIG1pbiwgbWF4LCByZXZlcnNlINC90LUg0LjQvNC10Y7RgiDQt9C90LDRh9C10L3QuNGPKS5cclxuXHJcbiAgICAgICAgaWYgKCAhdmlldy5nZXRWZXJ0aWNhbCgpICkge1xyXG5cclxuICAgICAgICAgICAgc2xpZGVyQm9yZGVyID0gKHNsaWRlck5vZGUub2Zmc2V0V2lkdGggLSBzbGlkZXJMZW5naHQpIC8gMjtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSBldmVudC5jbGllbnRYIHx8IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WDsgICAgICAgICBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGV2ZW50UG9zIC0gc2xpZGVyTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gc2xpZGVyQm9yZGVyO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgc2xpZGVyQm9yZGVyID0gKHNsaWRlck5vZGUub2Zmc2V0SGVpZ2h0IC0gc2xpZGVyTGVuZ2h0KSAvIDI7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gZXZlbnQuY2xpZW50WSB8fCBldmVudC50b3VjaGVzWzBdLmNsaWVudFk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBldmVudFBvcyAtIHNsaWRlck5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gc2xpZGVyQm9yZGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV3VmFsID0gTWF0aC5yb3VuZCh0aHVtYlBvc2l0aW9uIC8gc3RlcExlbmdodCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGVmdFBvaW50ID0gMDtcclxuICAgICAgICByaWdodFBvaW50ID0gc2xpZGVyTGVuZ2h0O1xyXG4gICAgXHJcbiAgICAgICAgaWYgKCB0aHVtYlBvc2l0aW9uIDw9IGxlZnRQb2ludCkge1xyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gbGVmdFBvaW50O1xyXG4gICAgICAgICAgICBuZXdWYWwgPSBtaW5WYWw7XHJcbiAgICAgICAgfSBlbHNlIGlmICggdGh1bWJQb3NpdGlvbiA+PSByaWdodFBvaW50KSB7XHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSByaWdodFBvaW50O1xyXG4gICAgICAgICAgICBuZXdWYWwgPSBtYXhWYWw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LHQtdCz0YPQvdC+0Log0L3QtSDQstGL0YjQtdC7INC30LAg0LPRgNCw0L3QuNGG0YssINGB0YLQsNCy0LjQvCDQtdCz0L4g0L3QsCDQsdC70LjQttCw0LnRiNC10LUg0LfQvdCw0YfQtdC90LjQtSxcclxuICAgICAgICAgICAgLy8g0LrRgNCw0YLQvdC+0LUg0YjQsNCz0YMuXHJcbiAgICAgICAgICAgIC8vINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INGN0YLQvtCz0L4g0L/RgNC10L7QsdGA0LDQt9GD0LXQvCDQtdCz0L4g0LTQu9GPINC80L7QtNC10LvQuC4g0JXRgdC70LggcmV2ZXJzZSA9PSB0cnVlLCDRgtC+ID09IC0xIFxyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gbmV3VmFsICogc3RlcExlbmdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGYgPSB4ID0+ICggKHgudG9TdHJpbmcoKS5pbmNsdWRlcygnLicpKSA/ICh4LnRvU3RyaW5nKCkuc3BsaXQoJy4nKS5wb3AoKS5sZW5ndGgpIDogKDApICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbiA9IGYoc3RlcCkgKyBmKG1pblZhbCk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICggbmV3VmFsICogTWF0aC5wb3coMTAsIG4pICogc3RlcCAqIHJldmVyc2UgICkgLyBNYXRoLnBvdygxMCwgbik7XHJcblxyXG4gICAgICAgICAgICBuID0gTWF0aC5tYXgoIGYoc3RlcCksIGYobWluVmFsKSApO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSArKCgrbmV3VmFsKS50b0ZpeGVkKG4pKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKCttb2RlbC5nZXRNaW5WYWwoKSkgKyAoK25ld1ZhbCk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICsoKCtuZXdWYWwpLnRvRml4ZWQobikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0VmFsKG5ld1ZhbCk7XHJcbiAgICAgICAgICAgIGNoYW5naW5nVGh1bWIgPSB2aWV3LmdldFRodW1iKCk7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbihjaGFuZ2luZ1RodW1iLCB0aHVtYlBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCBNYXRoLmFicyhuZXdWYWwgLSBtb2RlbC5nZXRSYW5nZSgpWzBdKSA8IE1hdGguYWJzKG5ld1ZhbCAtIG1vZGVsLmdldFJhbmdlKClbMV0pICkge1xyXG4gICAgICAgICAgICAgICAgbW9kZWwuc2V0UmFuZ2UoWyBuZXdWYWwsIG1vZGVsLmdldFJhbmdlKClbMV0gXSk7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2luZ1RodW1iID0gdmlldy5nZXRUaHVtYigxKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbihjaGFuZ2luZ1RodW1iLCB0aHVtYlBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsLnNldFJhbmdlKFsgbW9kZWwuZ2V0UmFuZ2UoKVswXSwgbmV3VmFsIF0pO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdpbmdUaHVtYiA9IHZpZXcuZ2V0VGh1bWIoMik7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oY2hhbmdpbmdUaHVtYiwgdGh1bWJQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgpIHx8IHZpZXcuZ2V0VG9vbHRpcCgxKSApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKG5ld1ZhbCk7XHJcblxyXG4gICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggY2hhbmdpbmdUaHVtYi5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX190b29sdGlwJyksIHZhbCwgdmlldy5nZXRUb29sdGlwTWFzaygpICk7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0L3QsNCx0LvRjtC00LDRgtC10LvRjFxyXG4gICAgICAgIGlmICggbW9kZWwuZ2V0VmFsKCkgIT0gbnVsbCApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRWYWwoKSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IHZhbDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFswXSA9IHZhbDtcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVsxXSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFsxXSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3ViamVjdC5ub3RpZnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2Uob3B0aW9uczogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXMuX21vZGVsO1xyXG4gICAgICAgIGxldCB2aWV3ID0gdGhpcy5fdmlldztcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZVRodW1iUG9zaXRpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhbmdlVG9vbHRpcFZhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjaGFuZ2VTY2FsZURpdmlzaW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNoYW5nZVZhbFRvUmFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhbmdlUmFuZ2VUb1ZhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCByZWJ1aWxkU2NhbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgcmVidWlsZFRvb2x0aXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gMS4g0JzQntCU0JXQm9CsXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0LzQtdC90Y/QtdGC0YHRjyDQutCw0LrQvtC5INC70LjQsdC+INC/0LDRgNCw0LzQtdGC0YAg0LIg0LzQvtC00LXQu9C4LCDQt9Cw0L/Rg9GB0LrQsNC10Lwg0L/RgNC+0LLQtdGA0LrQuCDQvNC+0LTQtdC70LgsXHJcbiAgICAgICAgLy8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQvdC+0LLRi9C1INC30L3QsNGH0LXQvdC40Y8uXHJcbiAgICAgICAgLy8g0LfQsNC/0L7QvNC40L3QsNC10LwsINGH0YLQviDQvdGD0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0L/QvtC70L7QttC10L3QuNGPINC/0L7Qu9C30YPQvdC60L7Qsiwg0LfQvdCw0YfQtdC90LjRjyDQsiDQv9C+0LTRgdC60LDQt9C60LDRhSxcclxuICAgICAgICAvLyDQtNC10LvQtdC90LjQuSDRiNC60LDQu9GLICjQt9C90LDRh9C10L3QuNGPINC4IGxlZnQpLiBcclxuICAgICAgICAvLyDQldGB0LvQuCDQuNC30LzQtdC90LjQu9C+0YHRjCDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyIC0gdHJ1ZSDQvdCwINC/0LXRgNC10YDQuNGB0L7QstCw0YLRjCDRiNC60LDQu9GDLlxyXG4gICAgICAgIC8vINCV0YHQu9C4INC/0L7QvNC10L3Rj9C70L7RgdGMIHZhbCDQvdCwIHJhbmdlLCDQuNC70Lgg0L3QsNC+0LHQvtGA0L7RgiAtIHRydWUg0L3QsCDQv9C+0YHRgtGA0L7QuNGC0YwhINCx0LXQs9GD0L3QutC4LlxyXG5cclxuXHJcbiAgICAgICAgbGV0IG1vZGVsT3B0aW9ucyA9IFsnZGF0YUZvcm1hdCcsICd2YWx1ZScsICdtaW5WYWwnLCAnbWF4VmFsJywgJ3N0ZXAnLCAncmV2ZXJzZScsICdyYW5nZScsICdjdXN0b21WYWx1ZXMnLCAndmFsdWVJbkN1c3RvbVZhbHVlcycsICdyYW5nZUluQ3VzdG9tVmFsdWVzJ107XHJcblxyXG4gICAgICAgIGxldCB0ZXN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbW9kZWxPcHRpb25zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoaXRlbSkgKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICggdGVzdCApIHtcclxuICAgICAgICAgICAgbGV0IHByZXZOdW1PZlN0ZXBzOiBudW1iZXIgPSBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCk7XHJcbiAgICAgICAgICAgIGxldCBwcmV2T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IG1vZGVsLmdldE9wdGlvbnMoKTtcclxuICAgICAgICAgICAgbGV0IG5ld09wdGlvbnM6IElPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJldk9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgbW9kZWwuY2hhbmdlKG5ld09wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgdmlldy5zZXROdW1iZXJPZlN0ZXBzKCBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZVN0ZXAoIHZpZXcuZmluZFZhbGlkU2NhbGVTdGVwKCBtb2RlbCwgdmlldy5nZXRTY2FsZVN0ZXAoKSApICk7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VUaHVtYlBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2hhbmdlVG9vbHRpcFZhbCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBwcmV2TnVtT2ZTdGVwcyAhPSBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgKSB7XHJcbiAgICAgICAgICAgICAgICByZWJ1aWxkU2NhbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggdmlldy5nZXRSYW5nZSgpICYmICFtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlUmFuZ2VUb1ZhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZWJ1aWxkVG9vbHRpcCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCAhdmlldy5nZXRSYW5nZSgpICYmIG1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VWYWxUb1JhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlYnVpbGRUb29sdGlwID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMi4g0JLQmNCUXHJcbiAgICAgICAgLy8g0J/QtdGA0LXRgNC40YHQvtCy0YvQstCw0LXQvCDQstC40LQg0L7RgiDRgdCw0LzRi9GFINCz0LvQvtCx0LDQu9GM0L3Ri9GFINC40LfQvNC10L3QtdC90LjQuSDQuiDRgdCw0LzRi9C8INC90LXQt9C90LDRh9C40YLQtdC70YzQvdGL0LwuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gMi4xINCh0LDQvNC+0LUg0LHQvtC70YzRiNC+0LUg0LjQt9C80LXQvdC10L3QuNC1IC0g0Y3RgtC+INCy0LjQtCDQvtGB0L3QvtCy0Ysg0YjQutCw0LvRiy5cclxuICAgICAgICAvLyDQldC1INC40LfQvNC10L3QtdC90LjQtSDQstGL0LfRi9Cy0LDQtdGCOiDQuNC30LzQtdC90LjRgtGMINC/0L7Qu9C+0LbQtdC90LjRjyDQsdC10LPRg9C90LrQvtCyLCDQtNC10LvQtdC90LjQuSDRiNC60LDQu9GLXHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgndmVydGljYWwnKSB8fCBvcHRpb25zLmhhc093blByb3BlcnR5KCdsZW5ndGgnKSApIHtcclxuICAgICAgICAgICAgdmlldy5jaGFuZ2VTbGlkZXJCYXNlKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjaGFuZ2VUaHVtYlBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAyLjIg0JzQtdC90Y/QtdC8INC60L7Qu9C40YfQtdGB0YLQstC+INCx0LXQs9GD0L3QutC+0LIsINC10YHQu9C4INC90YPQttC90L5cclxuICAgICAgICAvLyDQldGB0LvQuCDRgtCw0LrQvtC1INC40LfQvNC10L3QtdC90LjQtSDQsdGL0LvQviwg0LfQvdCw0YfQuNGCINCy0LXQt9C00LUsXHJcbiAgICAgICAgLy8g0LPQtNC1INC90LDQtNC+LCDRg9C20LUg0YHRgtC+0LjRgiB0cnVlXHJcblxyXG4gICAgICAgIGlmICggY2hhbmdlUmFuZ2VUb1ZhbCApIHtcclxuICAgICAgICAgICAgdmlldy5jaGFuZ2VSYW5nZVRvVmFsKG1vZGVsKTtcclxuXHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKCkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggY2hhbmdlVmFsVG9SYW5nZSApIHtcclxuICAgICAgICAgICAgdmlldy5jaGFuZ2VWYWxUb1JhbmdlKG1vZGVsKTtcclxuXHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMSkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Eb3duKTtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigyKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDEpLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDIpLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgIH0gICBcclxuXHJcbiAgICAgICAgLy8gMi4zINCo0LrQsNC70LAuINCj0LTQsNC70Y/QtdC8LCDRgdGC0YDQvtC40Lwg0LjQu9C4INC/0LXRgNC10YHRgtGA0LDQuNCy0LDQtdC8LiDQmNC30LzQtdC90Y/QtdC8INC00LXQu9C10L3QuNGPLlxyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NjYWxlU3RlcCcpICYmIG9wdGlvbnMuc2NhbGVTdGVwICE9IHZpZXcuZ2V0U2NhbGVTdGVwKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGVTdGVwKCB2aWV3LmZpbmRWYWxpZFNjYWxlU3RlcChtb2RlbCwgb3B0aW9ucy5zY2FsZVN0ZXApICk7XHJcbiAgICAgICAgICAgIHJlYnVpbGRTY2FsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NjYWxlTWFzaycpICYmIG9wdGlvbnMuc2NhbGVNYXNrICE9IHZpZXcuZ2V0U2NhbGVNYXNrKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGVNYXNrKCBvcHRpb25zLnNjYWxlTWFzayApO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0YPQtNCw0LvRj9C10LxcclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NjYWxlJykgJiYgb3B0aW9ucy5zY2FsZSA9PSBmYWxzZSAmJiB2aWV3LmdldFNjYWxlKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGUoIHZpZXcucmVtb3ZlTm9kZSggdmlldy5nZXRTY2FsZSgpICkgKTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZWJ1aWxkU2NhbGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0YHRgtGA0L7QuNC8XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCdzY2FsZScpICYmIG9wdGlvbnMuc2NhbGUgPT0gdHJ1ZSAmJiAhdmlldy5nZXRTY2FsZSgpICkge1xyXG4gICAgICAgICAgICBsZXQgc2NhbGU6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgICAgICBzY2FsZSA9IHZpZXcuYnVpbGRTY2FsZSh2aWV3LmdldFNsaWRlcigpLCB2aWV3LmdldFNjYWxlU3RlcCgpLCBtb2RlbCwgdmlldy5nZXRTY2FsZU1hc2soKSApO1xyXG4gICAgICAgICAgICB2aWV3LnNldFNjYWxlKHNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgIHJlYnVpbGRTY2FsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC/0LXRgNC10YHRgtGA0LDQuNCy0LDQtdC8XHJcbiAgICAgICAgaWYgKCByZWJ1aWxkU2NhbGUgJiYgdmlldy5nZXRTY2FsZSgpICkge1xyXG4gICAgICAgICAgICB2aWV3LnJlYnVpbGRTY2FsZShtb2RlbCk7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQuNC30LzQtdC90Y/QtdC8INC00LXQu9C10L3QuNGPLiDQt9C90LDRh9C10L3QuNC1INC4IGxlZnRcclxuICAgICAgICBpZiAoIGNoYW5nZVNjYWxlRGl2aXNpb24gJiYgdmlldy5nZXRTY2FsZSgpICkge1xyXG4gICAgICAgICAgICB2aWV3LmNoYW5nZVNjYWxlRGl2aXNpb24obW9kZWwpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIDIuNCDQn9C+0LTRgdC60LDQt9C60LguINCj0LTQsNC70Y/QtdC8LiDQodGC0YDQvtC40LwuINCc0LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPXHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgndG9vbHRpcE1hc2snKSAmJiBvcHRpb25zLnRvb2x0aXBNYXNrICE9IHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApIHtcclxuICAgICAgICAgICAgdmlldy5zZXRUb29sdGlwTWFzayggb3B0aW9ucy50b29sdGlwTWFzayApO1xyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCAhdmlldy5nZXRUb29sdGlwKCkgJiYgIXZpZXcuZ2V0VG9vbHRpcCgxKSAmJiAhb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgndG9vbHRpcCcpICkge1xyXG4gICAgICAgICAgICByZWJ1aWxkVG9vbHRpcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDRg9C00LDQu9GP0LXQvFxyXG4gICAgICAgIGlmICggb3B0aW9ucy50b29sdGlwID09IGZhbHNlIHx8IHJlYnVpbGRUb29sdGlwICkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoMikgKSB2aWV3LnNldFRvb2x0aXAoIHZpZXcucmVtb3ZlTm9kZSh2aWV3LmdldFRvb2x0aXAoMikpLCAyICk7XHJcbiAgICAgICAgICAgIGlmICggdmlldy5nZXRUb29sdGlwKDEpICkgdmlldy5zZXRUb29sdGlwKCB2aWV3LnJlbW92ZU5vZGUodmlldy5nZXRUb29sdGlwKDEpKSwgMSApO1xyXG4gICAgICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgpICkgdmlldy5zZXRUb29sdGlwKCB2aWV3LnJlbW92ZU5vZGUodmlldy5nZXRUb29sdGlwKDApKSwgMCApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLnRvb2x0aXAgPT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgICAgICByZWJ1aWxkVG9vbHRpcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgdGC0YDQsNC40LLQsNC10LxcclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCB8fCByZWJ1aWxkVG9vbHRpcCApIHtcclxuICAgICAgICAgICAgdmlldy5idWlsZFZhbGlkVG9vbHRpcHMobW9kZWwpO1xyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgICAgaWYgKCBjaGFuZ2VUb29sdGlwVmFsICYmICh2aWV3LmdldFRvb2x0aXAoKSB8fCB2aWV3LmdldFRvb2x0aXAoMSkpICkge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFtb2RlbC5nZXRSYW5nZSgpKSB7IFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggdmlldy5nZXRUb29sdGlwKCksIHZhbCBhcyBzdHJpbmcsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyAgIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIHZpZXcuZ2V0VG9vbHRpcCgxKSwgdmFsIGFzIHN0cmluZywgdmlldy5nZXRUb29sdGlwTWFzaygpICk7IFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VmFsVG9Ub29sdGlwKCB2aWV3LmdldFRvb2x0aXAoMiksIHZhbCBhcyBzdHJpbmcsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcblxyXG5cclxuICAgICAgICAvLyAyLjUg0J/QvtC70L7QttC10L3QuNGPINCx0LXQs9GD0L3QutC+0LJcclxuXHJcbiAgICAgICAgaWYgKCBjaGFuZ2VUaHVtYlBvc2l0aW9uICkge1xyXG4gICAgICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFtb2RlbC5nZXRSYW5nZSgpICkge1xyXG5cclxuICAgICAgICAgICAgICAgIHBvcyA9IHZpZXcuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0VmFsKCkpLCBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbiggdmlldy5nZXRUaHVtYigpLCBwb3MpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHsgICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBwb3MgPSB2aWV3LmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMF0pLCBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbiggdmlldy5nZXRUaHVtYigxKSwgcG9zKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgcG9zID0gdmlldy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzFdKSwgbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oIHZpZXcuZ2V0VGh1bWIoMiksIHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vINC90LDQsdC70Y7QtNCw0YLQtdC70YxcclxuICAgICAgICAgICAgLy8g0LLRi9C30YvQstCw0LXQvCDQtdGB0LvQuCDQsdGL0LvQuCDQuNC30LzQtdC90LXQvdC40Y8g0YHQstGP0LfQsNC90L3Ri9C1INGBINCx0LXQs9GD0L3QutCw0LzQuFxyXG4gICAgICAgICAgICAvLyDQvdC1INC30LDRgtGA0L7QvdC10YIsINC90LDQv9GA0LjQvNC10YAsINC00L7QsdCw0LLQu9C10L3QuNC1INGI0LrQsNC70YtcclxuICAgICAgICAgICAgaWYgKCBtb2RlbC5nZXRWYWwoKSAhPSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFsxXSA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJlc2VudGVyIiwiaW1wb3J0IElPcHRpb25zIGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQge0lNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCB7IHJ1bkluTmV3Q29udGV4dCB9IGZyb20gJ3ZtJztcclxuXHJcbmludGVyZmFjZSBJVmlldyB7XHJcblxyXG4gICAgLy8g0LPQtdGC0YLQtdGA0Ysg0Lgg0YHQtdGC0YLQtdGA0YtcclxuICAgIGdldExlbmdodCgpOiBudW1iZXI7XHJcbiAgICBnZXRWZXJ0aWNhbCgpOiBib29sZWFuO1xyXG4gICAgZ2V0UmFuZ2UoKTogYm9vbGVhbjtcclxuICAgIGdldFRvb2x0aXBNYXNrKCk6IHN0cmluZztcclxuICAgIHNldFRvb2x0aXBNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZVN0ZXAoKTogbnVtYmVyO1xyXG4gICAgc2V0U2NhbGVTdGVwKHN0ZXA6IG51bWJlcik6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZU1hc2soKTogc3RyaW5nO1xyXG4gICAgc2V0U2NhbGVNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBnZXROdW1iZXJPZlN0ZXBzKCk6IG51bWJlcjtcclxuICAgIHNldE51bWJlck9mU3RlcHMobnVtOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIGdldFNsaWRlcigpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFRodW1iKG51bT86IG51bWJlcik6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VG9vbHRpcChudW0/OiBudW1iZXIpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHNldFRvb2x0aXAodG9vbHRpcDogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQsIG51bT86IG51bWJlcik6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZSgpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHNldFNjYWxlKHNjYWxlOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCk6IHZvaWQ7XHJcblxyXG5cclxuICAgIC8vINC80LXRgtC+0LTRiyDQtNC70Y8g0YHQvtC30LTQsNC90LjRjyDQuCDQuNC30LzQtdC90LXQvdC40Y8gdmlld1xyXG4gICAgY2hhbmdlU2xpZGVyQmFzZSAob3B0aW9uczogYW55KTogdm9pZDtcclxuICAgIGNoYW5nZVJhbmdlVG9WYWwgKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgY2hhbmdlVmFsVG9SYW5nZSAobW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcbiAgICBidWlsZFZhbGlkVG9vbHRpcHMobW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcbiAgICBidWlsZFNjYWxlKHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50LCBzdGVwOiBudW1iZXIsIG1vZGVsOiBJTW9kZWwsIG1hc2s6IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcmVidWlsZFNjYWxlKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgY2hhbmdlU2NhbGVEaXZpc2lvbihtb2RlbDogSU1vZGVsKTogdm9pZDtcclxuICAgIGNoYW5nZUxpbmUoKTogdm9pZDtcclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBzZXRUaHVtYlBvc2l0aW9uKHRodW1iTm9kZTogSFRNTERpdkVsZW1lbnQsIHRodW1iUG9zaXRpb246IG51bWJlcik6IHZvaWQ7XHJcbiAgICBzZXRWYWxUb1Rvb2x0aXAodG9vbHRpcE5vZGU6IEhUTUxEaXZFbGVtZW50LCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGUsIG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBmaW5kVGh1bWJQb3NpdGlvbihuZXdTdGVwLCBudW1PZlN0ZXBzKTogbnVtYmVyO1xyXG4gICAgZmluZE9uZVN0ZXBMZW5naHQoKTogbnVtYmVyO1xyXG4gICAgcmVtb3ZlTm9kZShub2RlOiBIVE1MRGl2RWxlbWVudCk6IHVuZGVmaW5lZDtcclxuICAgIGZpbmRWYWxpZFNjYWxlU3RlcChtb2RlbDogSU1vZGVsLCBzdGVwOiBudW1iZXIpOiBudW1iZXI7ICBcclxufVxyXG5cclxuY2xhc3MgVmlldyBpbXBsZW1lbnRzIElWaWV3IHtcclxuXHJcbiAgICBwcml2YXRlIF9sZW5naHQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3ZlcnRpY2FsOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfcmFuZ2U6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF90b29sdGlwTWFzazogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGVNYXNrPzogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGVTdGVwPzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbnVtYmVyT2ZTdGVwczogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX3NsaWRlcjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF90aHVtYj86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdGh1bWJMZWZ0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90aHVtYlJpZ2h0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9saW5lOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXA/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBMZWZ0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwUmlnaHQ/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3NjYWxlPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbDogSU1vZGVsLCBvcHRpb25zOiBJT3B0aW9ucywgc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fc2xpZGVyID0gc2xpZGVyTm9kZTtcclxuICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyJyk7XHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBtb2RlbC5nZXRSYW5nZSgpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX251bWJlck9mU3RlcHMgPSBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCk7XHJcbiAgICAgICAgdGhpcy5fbGVuZ2h0ID0gdGhpcy5maW5kVmFsaWRMZW5ndGgob3B0aW9ucy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSB0aGlzLl9sZW5naHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaG9yaXpvbnRhbCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IHRoaXMuX2xlbmdodDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl92ZXJ0aWNhbCcpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbGluZSA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fbGluZScpO1xyXG5cclxuICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fcmFuZ2UgKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl90aHVtYiA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWInKTtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRWYWwoKSksIG1vZGVsLmdldE51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iLCBwb3MpO1xyXG4gICAgICAgIH0gZWxzZSB7ICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iTGVmdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWInLCAnc2xpZGVyX190aHVtYl9sZWZ0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iUmlnaHQgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iJywgJ3NsaWRlcl9fdGh1bWJfcmlnaHQnKTtcclxuXHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVswXSksIG1vZGVsLmdldE51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iTGVmdCwgcG9zKTtcclxuXHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVsxXSksIG1vZGVsLmdldE51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iUmlnaHQsIHBvcyk7XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgLy8g0LzQsNGB0LrQsCDQtNC70Y8g0L/QvtC00YHQutCw0LfQvtC6XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0LXQtSDQvdC10YIsINC/0YDQuNC80LXQvdGP0LXRgtGB0Y8g0L7QsdGL0YfQvdCw0Y8sINC60L7RgtC+0YDQsNGPINC/0L4g0LTQtdGE0L7Qu9GC0YMg0LLQvtC30LLRgNCw0YnQsNC10YIg0L/RgNC+0YHRgtC+IHZhbFxyXG4gICAgICAgIC8vICjQsiDRhNC+0YDQvNCw0YLQtSDQtNCw0YIg0LLQtdGA0L3QtdGC0YHRjyDQvtCx0YrQtdC60YIg0LTQsNGC0LApXHJcbiAgICAgICAgdGhpcy5fdG9vbHRpcE1hc2sgPSBvcHRpb25zLnRvb2x0aXBNYXNrO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCApIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFZhbGlkVG9vbHRpcHMobW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zY2FsZU1hc2sgPSBvcHRpb25zLnNjYWxlTWFzaztcclxuXHJcbiAgICAgICAgbGV0IHN0ZXA6IG51bWJlcjtcclxuICAgICAgICBpZiAoIG9wdGlvbnMuc2NhbGVTdGVwICkge1xyXG4gICAgICAgICAgICBzdGVwID0gdGhpcy5maW5kVmFsaWRTY2FsZVN0ZXAobW9kZWwsIG9wdGlvbnMuc2NhbGVTdGVwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdGVwID0gbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zY2FsZVN0ZXAgPSBzdGVwO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnNjYWxlICkge1xyXG4gICAgICAgICAgICB0aGlzLl9zY2FsZSA9IHRoaXMuYnVpbGRTY2FsZSh0aGlzLl9zbGlkZXIsIHN0ZXAsIG1vZGVsLCB0aGlzLl9zY2FsZU1hc2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDQs9C10YLRgtC10YDRiyDQuCDRgdC10YLRgtC10YDRi1xyXG4gICAgZ2V0TGVuZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zbGlkZXIuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlci5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuICAgIGdldFZlcnRpY2FsKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbDtcclxuICAgIH1cclxuICAgIGdldFJhbmdlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYW5nZTtcclxuICAgIH1cclxuICAgIGdldFRvb2x0aXBNYXNrKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXBNYXNrO1xyXG4gICAgfVxyXG4gICAgc2V0VG9vbHRpcE1hc2sobWFzazogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdG9vbHRpcE1hc2sgPSBtYXNrO1xyXG4gICAgfVxyXG4gICAgZ2V0U2NhbGVTdGVwKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlU3RlcDtcclxuICAgIH1cclxuICAgIHNldFNjYWxlU3RlcChzdGVwOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zY2FsZVN0ZXAgPSBzdGVwO1xyXG4gICAgfVxyXG4gICAgZ2V0U2NhbGVNYXNrKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlTWFzaztcclxuICAgIH1cclxuICAgIHNldFNjYWxlTWFzayhtYXNrOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zY2FsZU1hc2sgPSBtYXNrO1xyXG4gICAgfVxyXG4gICAgZ2V0TnVtYmVyT2ZTdGVwcygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9udW1iZXJPZlN0ZXBzO1xyXG4gICAgfVxyXG4gICAgc2V0TnVtYmVyT2ZTdGVwcyhudW06IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX251bWJlck9mU3RlcHMgPSBudW07XHJcbiAgICB9XHJcbiAgICBcclxuXHJcblxyXG4gICAgZ2V0U2xpZGVyKCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVyO1xyXG4gICAgfVxyXG4gICAgZ2V0VGh1bWIobnVtOiBudW1iZXIgPSAwKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGlmICggbnVtID09IDAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aHVtYjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBudW0gPT0gMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RodW1iTGVmdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBudW0gPT0gMiApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RodW1iUmlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90aHVtYjtcclxuICAgIH1cclxuICAgIGdldFRvb2x0aXAobnVtOiBudW1iZXIgPSAwKTogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICggdGhpcy5fdG9vbHRpcCB8fCB0aGlzLl90b29sdGlwTGVmdCApIHtcclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwICYmIG51bSA9PSAwICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwTGVmdCAmJiBudW0gPT0gMSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwTGVmdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXBSaWdodCAmJiBudW0gPT0gMiApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwUmlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldFRvb2x0aXAodG9vbHRpcDogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQsIG51bTogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIGlmICggbnVtID09IDAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0b29sdGlwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIG51bSA9PSAxICkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwTGVmdCA9IHRvb2x0aXA7XHJcbiAgICAgICAgfSBlbHNlIGlmICggbnVtID09IDIgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBSaWdodCA9IHRvb2x0aXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0U2NhbGUoKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZTtcclxuICAgIH1cclxuICAgIHNldFNjYWxlKHNjYWxlOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vINC80LXRgtC+0LTRiyDQtNC70Y8g0YHQvtC30LTQsNC90LjRjyDQuCDQuNC30LzQtdC90LXQvdC40Y8gdmlld1xyXG5cclxuICAgIGNoYW5nZVNsaWRlckJhc2UgKG9wdGlvbnM6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbGVuZ2h0Q2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyDRiNC40YDQuNC90LAgLyDQtNC70LjQvdCwXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmxlbmd0aCAmJiB0aGlzLl9sZW5naHQgIT0gb3B0aW9ucy5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xlbmdodCA9IG9wdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZW5naHRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC+0YDQuNC10L3RgtCw0YbQuNGPXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnZlcnRpY2FsICYmICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKVxyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX3ZlcnRpY2FsJyk7XHJcblxyXG4gICAgICAgICAgICBsZW5naHRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSAmJiB0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl92ZXJ0aWNhbCcpXHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaG9yaXpvbnRhbCcpO1xyXG5cclxuICAgICAgICAgICAgbGVuZ2h0Q2hhbmdlZCA9IHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsZW5naHRDaGFuZ2VkICYmICF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLndpZHRoID0gdGhpcy5fbGVuZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGVuZ2h0Q2hhbmdlZCAmJiB0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fbGVuZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VSYW5nZVRvVmFsIChtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHBvczogbnVtYmVyO1xyXG5cclxuICAgICAgICB0aGlzLl9yYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3RodW1iID0gdGhpcy5idWlsZE5vZGUodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYicpO1xyXG4gICAgICAgIHRoaXMuX3RodW1iTGVmdCA9IHRoaXMucmVtb3ZlTm9kZSh0aGlzLl90aHVtYkxlZnQpO1xyXG4gICAgICAgIHRoaXMuX3RodW1iUmlnaHQgPSB0aGlzLnJlbW92ZU5vZGUodGhpcy5fdGh1bWJSaWdodCk7XHJcblxyXG4gICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0VmFsKCkpLCBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iLCBwb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVZhbFRvUmFuZ2UgKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGh1bWIgPSB0aGlzLnJlbW92ZU5vZGUodGhpcy5fdGh1bWIpO1xyXG4gICAgICAgIHRoaXMuX3RodW1iTGVmdCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWInLCAnc2xpZGVyX190aHVtYl9sZWZ0Jyk7IFxyXG4gICAgICAgIHRoaXMuX3RodW1iUmlnaHQgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iJywgJ3NsaWRlcl9fdGh1bWJfcmlnaHQnKTtcclxuICAgICAgICBcclxuICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMF0pLCBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iTGVmdCwgcG9zKTtcclxuXHJcbiAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzFdKSwgbW9kZWwuZ2V0TnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYlJpZ2h0LCBwb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkVmFsaWRUb29sdGlwcyhtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9yYW5nZSkgeyBcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IHRoaXMuYnVpbGROb2RlKHRoaXMuX3RodW1iLCAnc2xpZGVyX190b29sdGlwJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsVG9Ub29sdGlwKCB0aGlzLl90b29sdGlwLCB2YWwsIHRoaXMuX3Rvb2x0aXBNYXNrICk7ICAgXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcExlZnQgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl90aHVtYkxlZnQsICdzbGlkZXJfX3Rvb2x0aXAnLCAnc2xpZGVyX190b29sdGlwX2xlZnQnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWxUb1Rvb2x0aXAoIHRoaXMuX3Rvb2x0aXBMZWZ0LCB2YWwsIHRoaXMuX3Rvb2x0aXBNYXNrICk7ICBcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVsxXSApO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwUmlnaHQgPSB0aGlzLmJ1aWxkTm9kZSh0aGlzLl90aHVtYlJpZ2h0LCAnc2xpZGVyX190b29sdGlwJywgJ3NsaWRlcl9fdG9vbHRpcF9yaWdodCcpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbFRvVG9vbHRpcCggdGhpcy5fdG9vbHRpcFJpZ2h0LCB2YWwsIHRoaXMuX3Rvb2x0aXBNYXNrICk7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBidWlsZFNjYWxlKHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50LCBzdGVwOiBudW1iZXIsIG1vZGVsOiBJTW9kZWwsIG1hc2s6IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBsZXQgc2NhbGU6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbGV0IGRpdmlzaW9uOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG5cclxuICAgICAgICBzY2FsZS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3NjYWxlJyk7XHJcbiAgICAgICAgc2xpZGVyTm9kZS5wcmVwZW5kKHNjYWxlKTtcclxuXHJcbiAgICAgICAgLy8g0LzQvdC+0LbQuNGC0LXQu9GMLiDQstC+INGB0LrQvtC70YzQutC+INGA0LDQtyDRiNCw0LMg0LIg0LzQvtC00LXQu9C1INC80LXQvdGM0YjQtSDRiNCw0LPQsCDRiNC60LDQu9GLXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKHN0ZXApLCB0aGlzLmZpbmREZWNpbWFsUGxhY2VzKG1vZGVsLmdldFN0ZXAoKSkgKTtcclxuICAgICAgICBsZXQgbXVsdDogbnVtYmVyID0gc3RlcCAvIG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICBtdWx0ID0gKygrbXVsdCkudG9GaXhlZChuKTtcclxuICAgICAgICBtdWx0ID0gTWF0aC5hYnMobXVsdCk7ICAgICBcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDw9IG1vZGVsLmdldE51bWJlck9mU3RlcHMoKTsgaSA9IGkgKyBtdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBpICsgbXVsdCDQstC+0LfQstGA0LDRidCw0LXRgiDQvdCwINC60LDQutC+0Lkg0YjQsNCzINC80L7QtNC10LvQuCDQv9C+0L/QsNC00LDQtdGCINGI0LDQsyDRiNC60LDQu9GLXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZUJ5U3RlcChpKTtcclxuXHJcbiAgICAgICAgICAgIGRpdmlzaW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUtZGl2aXNpb24nKTtcclxuICAgICAgICAgICAgZGl2aXNpb24uaW5uZXJIVE1MID0gJzxzcGFuPicgKyAgZXZhbChtYXNrKSArICc8L3NwYW4+JztcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLmxlZnQgPSB0aGlzLmZpbmRPbmVTdGVwTGVuZ2h0KCkgKiBpICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLnRvcCA9IHRoaXMuZmluZE9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzY2FsZS5hcHBlbmQoZGl2aXNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVidWlsZFNjYWxlKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2NhbGU6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5nZXRTY2FsZSgpO1xyXG4gICAgICAgIGxldCBwcmV2TnVtT2ZTdGVwczogbnVtYmVyID0gc2NhbGUucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlcl9fc2NhbGUtZGl2aXNpb24nKS5sZW5ndGggLSAxO1xyXG4gICAgICAgIGxldCBuZXdOdW1PZlN0ZXBzOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGRpdmlzaW9uOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBcclxuICAgICAgICAvLyDQvNC90L7QttC40YLQtdC70YwuINCy0L4g0YHQutC+0LvRjNC60L4g0YDQsNC3INGI0LDQsyDQsiDQvNC+0LTQtdC70LUg0LzQtdC90YzRiNC1INGI0LDQs9CwINGI0LrQsNC70YtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZmluZERlY2ltYWxQbGFjZXModGhpcy5fc2NhbGVTdGVwKSwgdGhpcy5maW5kRGVjaW1hbFBsYWNlcyhtb2RlbC5nZXRTdGVwKCkpICk7XHJcbiAgICAgICAgbGV0IG11bHQ6IG51bWJlciA9IHRoaXMuX3NjYWxlU3RlcCAvIG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICBtdWx0ID0gK211bHQudG9GaXhlZChuKTtcclxuICAgICAgICBtdWx0ID0gTWF0aC5hYnMobXVsdCk7XHJcblxyXG4gICAgICAgIG5ld051bU9mU3RlcHMgPSBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCkgLyBtdWx0O1xyXG5cclxuICAgICAgICBpZiAoIHByZXZOdW1PZlN0ZXBzID4gbmV3TnVtT2ZTdGVwcyApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IChwcmV2TnVtT2ZTdGVwcyAtIG5ld051bU9mU3RlcHMpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlLmxhc3RDaGlsZC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHByZXZOdW1PZlN0ZXBzIDwgbmV3TnVtT2ZTdGVwcyApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IChuZXdOdW1PZlN0ZXBzIC0gcHJldk51bU9mU3RlcHMpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3NjYWxlLWRpdmlzaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5pbm5lckhUTUwgPSAnPHNwYW4+PC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICBzY2FsZS5hcHBlbmQoZGl2aXNpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVNjYWxlRGl2aXNpb24obW9kZWw6IElNb2RlbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBkaXZpc2lvbjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICBsZXQgbWFzazogc3RyaW5nID0gdGhpcy5fc2NhbGVNYXNrO1xyXG5cclxuICAgICAgICAvLyDQvNC90L7QttC40YLQtdC70YwuINCy0L4g0YHQutC+0LvRjNC60L4g0YDQsNC3INGI0LDQsyDQsiDQvNC+0LTQtdC70LUg0LzQtdC90YzRiNC1INGI0LDQs9CwINGI0LrQsNC70YtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZmluZERlY2ltYWxQbGFjZXModGhpcy5fc2NhbGVTdGVwKSwgdGhpcy5maW5kRGVjaW1hbFBsYWNlcyhtb2RlbC5nZXRTdGVwKCkpICk7XHJcbiAgICAgICAgbGV0IG11bHQ6IG51bWJlciA9IHRoaXMuX3NjYWxlU3RlcCAvIG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICBtdWx0ID0gK211bHQudG9GaXhlZChuKTtcclxuICAgICAgICBtdWx0ID0gTWF0aC5hYnMobXVsdCk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8PSBtb2RlbC5nZXROdW1iZXJPZlN0ZXBzKCk7IGkgPSBpICsgbXVsdCkge1xyXG5cclxuICAgICAgICAgICAgLy8gaSArIG11bHQg0LLQvtC30LLRgNCw0YnQsNC10YIg0L3QsCDQutCw0LrQvtC5INGI0LDQsyDQvNC+0LTQtdC70Lgg0L/QvtC/0LDQtNCw0LXRgiDRiNCw0LMg0YjQutCw0LvRi1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGVCeVN0ZXAoaSk7XHJcblxyXG4gICAgICAgICAgICBkaXZpc2lvbiA9IHRoaXMuZ2V0U2NhbGUoKS5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpW2kgLyBtdWx0XSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICAgICAgZGl2aXNpb24ucXVlcnlTZWxlY3Rvcignc3BhbicpLnRleHRDb250ZW50ID0gJycgKyBldmFsKG1hc2spO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUudG9wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLmxlZnQgPSB0aGlzLmZpbmRPbmVTdGVwTGVuZ2h0KCkgKiBpICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLmxlZnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUudG9wID0gdGhpcy5maW5kT25lU3RlcExlbmdodCgpICogaSArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlTGluZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmxlZnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xpbmUuc3R5bGUudG9wID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9saW5lLnN0eWxlLndpZHRoID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmhlaWdodCA9IG51bGw7ICBcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9yYW5nZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUudG9wID0gJzBweCdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUubGVmdCA9ICcwcHgnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS53aWR0aCA9IHBhcnNlSW50KHRoaXMuX3RodW1iLnN0eWxlLmxlZnQpICsgdGhpcy5fdGh1bWIuY2xpZW50V2lkdGgvMiArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLndpZHRoID0gJzEwMCUnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmxlZnQgPSAnMHB4J1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS50b3AgPSAnMHB4JztcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUuaGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5fdGh1bWIuc3R5bGUudG9wKSArIHRoaXMuX3RodW1iLmNsaWVudEhlaWdodC8yICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUudG9wID0gJzBweCdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUubGVmdCA9IHBhcnNlSW50KHRoaXMuX3RodW1iTGVmdC5zdHlsZS5sZWZ0KSArIHRoaXMuX3RodW1iTGVmdC5jbGllbnRXaWR0aC8yICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUud2lkdGggPSAoIHBhcnNlSW50KHRoaXMuX3RodW1iUmlnaHQuc3R5bGUubGVmdCkgLSBwYXJzZUludCh0aGlzLl90aHVtYkxlZnQuc3R5bGUubGVmdCkgKSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLndpZHRoID0gJzEwMCUnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmxlZnQgPSAnMHB4J1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS50b3AgPSBwYXJzZUludCh0aGlzLl90aHVtYkxlZnQuc3R5bGUudG9wKSAgKyB0aGlzLl90aHVtYkxlZnQuY2xpZW50SGVpZ2h0LzIgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5oZWlnaHQgPSAoIHBhcnNlSW50KHRoaXMuX3RodW1iUmlnaHQuc3R5bGUudG9wKSAtIHBhcnNlSW50KHRoaXMuX3RodW1iTGVmdC5zdHlsZS50b3ApICkgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcblxyXG4gICAgc2V0VGh1bWJQb3NpdGlvbih0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCB0aHVtYlBvc2l0aW9uOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLnRvcCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS5sZWZ0ID0gdGh1bWJQb3NpdGlvbiAtIHRodW1iTm9kZS5vZmZzZXRXaWR0aC8yICsgJ3B4JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUubGVmdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS50b3AgPSB0aHVtYlBvc2l0aW9uIC0gdGh1bWJOb2RlLm9mZnNldFdpZHRoLzIgKyAncHgnOyAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC+0LHQsCDQsdC10LPRg9C90LrQsCDRgdC/0YDQsNCy0LAsINC00L7QsdCw0LLQu9C10LwgeiBpbmRleCDQtNC70Y8g0L3QuNC20L3QtdCz0L5cclxuICAgICAgICBpZiAoIHRoaXMuZ2V0VGh1bWIoMSkgKSB7XHJcbiAgICAgICAgICAgIGlmICggIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAodGhpcy5nZXRUaHVtYigxKS5zdHlsZS5sZWZ0ID09ICh0aGlzLmdldExlbmdodCgpIC0gdGhpcy5nZXRUaHVtYigxKS5jbGllbnRXaWR0aC8yKSArICdweCcpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gJzEwMCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAodGhpcy5nZXRUaHVtYigxKS5zdHlsZS50b3AgPT0gKHRoaXMuZ2V0TGVuZ2h0KCkgLSB0aGlzLmdldFRodW1iKDEpLmNsaWVudEhlaWdodC8yKSArICdweCcpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gJzEwMCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VMaW5lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsVG9Ub29sdGlwKHRvb2x0aXBOb2RlOiBIVE1MRGl2RWxlbWVudCwgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlLCBtYXNrOiBzdHJpbmcgPSAndmFsJyk6IHZvaWQge1xyXG4gICAgICAgIHRvb2x0aXBOb2RlLnRleHRDb250ZW50ID0gZXZhbChtYXNrKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kVGh1bWJQb3NpdGlvbihuZXdTdGVwLCBudW1PZlN0ZXBzKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRMZW5naHQoKSAvIG51bU9mU3RlcHMgKiBuZXdTdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRPbmVTdGVwTGVuZ2h0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldExlbmdodCgpIC8gdGhpcy5fbnVtYmVyT2ZTdGVwcztcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVOb2RlKG5vZGU6IEhUTUxEaXZFbGVtZW50KTogdW5kZWZpbmVkIHtcclxuICAgICAgICBub2RlLnJlbW92ZSgpO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZFZhbGlkU2NhbGVTdGVwKG1vZGVsOiBJTW9kZWwsIHN0ZXA6IG51bWJlcik6IG51bWJlciB7XHJcblxyXG4gICAgICAgIGxldCBzdGVwSXNWYWxpZDogYm9vbGVhbjtcclxuICAgICAgICBsZXQgdGVzdDogbnVtYmVyXHJcblxyXG4gICAgICAgIC8vINC+0LrRgNGD0LPQu9GP0LXQvCwg0YfRgtC+0LHRiyDQuNC30LHQtdC20LDRgtGMINC/0YDQvtCx0LvQtdC8INC/0YDQuCDQstGL0YfQuNGB0LvQtdC90LjRj9GFINGBINC/0LvQsNCy0LDRjtGJ0LXQuSDRgtC+0YfQutC+0LlcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZmluZERlY2ltYWxQbGFjZXMoc3RlcCksIHRoaXMuZmluZERlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG5cclxuICAgICAgICBzdGVwSXNWYWxpZCA9IHRoaXMuaXNOdW1lcmljKHN0ZXApO1xyXG5cclxuICAgICAgICBpZiAoIG1vZGVsLmdldERhdGFGb3JtYXQoKSA9PSAnZGF0ZScgJiYgKCBzdGVwICUgKDI0ICogMzYwMCAqIDEwMDApICE9IDAgKSkge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcCAqIDI0ICogMzYwMCAqIDEwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlc3QgPSAoc3RlcCAqIE1hdGgucG93KDEwLCBuKSkgLyAobW9kZWwuZ2V0U3RlcCgpICogTWF0aC5wb3coMTAsIG4pKTtcclxuICAgICAgICB0ZXN0ID0gTWF0aC5hYnModGVzdCk7XHJcblxyXG4gICAgICAgIHN0ZXBJc1ZhbGlkID0gc3RlcElzVmFsaWQgJiYgKCB0ZXN0ICUgMSA9PSAwICk7XHJcblxyXG4gICAgICAgIHRlc3QgPSArKCBtb2RlbC5nZXRNYXhWYWwoKSAtIG1vZGVsLmdldE1pblZhbCgpICkudG9GaXhlZChuKTtcclxuICAgICAgICB0ZXN0ID0gKCB0ZXN0ICogTWF0aC5wb3coMTAsIG4pICkgLyAoIHN0ZXAgKiBNYXRoLnBvdygxMCwgbikgKTtcclxuICAgICAgICB0ZXN0ID0gTWF0aC5hYnModGVzdCk7XHJcblxyXG4gICAgICAgIHN0ZXBJc1ZhbGlkID0gc3RlcElzVmFsaWQgJiYgKCB0ZXN0ICUgMSA9PSAwICk7XHJcblxyXG4gICAgICAgIHN0ZXAgPSBzdGVwSXNWYWxpZCA/IHN0ZXAgOiBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgcmV0dXJuIHN0ZXA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vINC/0YDQuNCy0LDRgtC90YvQtSDRhNGD0L3QutGG0LjQuFxyXG5cclxuICAgIHByaXZhdGUgYnVpbGROb2RlKHBhcmVudE5vZGU6IEhUTUxEaXZFbGVtZW50LCAuLi5jbGFzc2VzOiBzdHJpbmdbXSk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBsZXQgbm9kZTogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgICAgIFxyXG5cclxuICAgICAgICBmb3IgKCBsZXQgaTogbnVtYmVyID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKGFyZ3VtZW50c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcmVudE5vZGUuYXBwZW5kKG5vZGUpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGZpbmRWYWxpZExlbmd0aChzdHI6IGFueSkge1xyXG4gICAgICAgIGlmICggdHlwZW9mICgnJyArIHN0cikgPT0gJ3N0cmluZycgKSB7XHJcbiAgICAgICAgICAgIGxldCByID0gKCcnICsgc3RyKS5tYXRjaCgvXlxcZHsxLDN9Wy4sXT9cXGQqKHB4fGVtfHJlbXwlKT8kL2kpO1xyXG4gICAgICAgICAgICBpZiAoIHIgJiYgdGhpcy5pc051bWVyaWMoclswXSkgKSB7IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcsJywgJy4nKSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gclswXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJywnLCAnLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignV2lkdGggKG9yIGhlaWdodCkgc2hvdWxkIGJlIHZhbGlkIHRvIGNzcycpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNOdW1lcmljKG46IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgIWlzTmFOKG4gLSAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmREZWNpbWFsUGxhY2VzKG51bTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDQt9C90LDQutC+0LIg0L/QvtGB0LvQtSDQt9Cw0L/Rj9GC0L7QuVxyXG4gICAgICAgIHJldHVybiB+KG51bSArICcnKS5pbmRleE9mKCcuJykgPyAobnVtICsgJycpLnNwbGl0KCcuJylbMV0ubGVuZ3RoIDogMDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IElWaWV3IH07XHJcbmV4cG9ydCBkZWZhdWx0IFZpZXc7IiwiZXhwb3J0IGRlZmF1bHQgaW50ZXJmYWNlIElPcHRpb25zIHtcclxuICAgIC8vIE1vZGVsIG9wdGlvbnNcclxuICAgIGRhdGFGb3JtYXQ6IHN0cmluZztcclxuICAgIHZhbHVlOiBudW1iZXIgfCBzdHJpbmcgfCBudWxsO1xyXG4gICAgbWluVmFsOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICBtYXhWYWw6IG51bWJlciB8IHN0cmluZztcclxuICAgIHN0ZXA6IG51bWJlcjsgICAgXHJcbiAgICByZXZlcnNlOiBib29sZWFuO1xyXG4gICAgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gfCBbc3RyaW5nLCBzdHJpbmddIHwgbnVsbDsgXHJcbiAgICBjdXN0b21WYWx1ZXM/OiBzdHJpbmdbXTtcclxuICAgIHZhbHVlSW5DdXN0b21WYWx1ZXM/OiBzdHJpbmc7XHJcbiAgICByYW5nZUluQ3VzdG9tVmFsdWVzPzogc3RyaW5nO1xyXG5cclxuXHJcbiAgICAvLyBWaWV3IG9wdGlvbnNcclxuICAgIGxlbmd0aDogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgdmVydGljYWw6IGJvb2xlYW47XHJcbiAgICB0b29sdGlwOiBib29sZWFuO1xyXG4gICAgdG9vbHRpcE1hc2s6IHN0cmluZztcclxuICAgIHNjYWxlOiBib29sZWFuO1xyXG4gICAgc2NhbGVTdGVwOiBudW1iZXI7XHJcbiAgICBzY2FsZU1hc2s6IHN0cmluZztcclxufVxyXG5cclxudmFyIGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyA9IHtcclxuICAgIC8vIE1vZGVsIG9wdGlvbnNcclxuICAgIC8vINCyIHJhbmdlINC4INCyIG1pbiDQuCBtYXgg0YHQu9C10LLQsCDRgtC+LCDRh9GC0L4g0YHQu9C10LLQsCDQvdCwINGB0LvQsNC50LTQtdGA0LVcclxuICAgIGRhdGFGb3JtYXQ6ICdudW1lcmljJyxcclxuICAgIHZhbHVlOiBudWxsLCAgICAgIC8vINCyINC90LDRh9Cw0LvRjNC90YvRhSDQvdCw0YHRgtGA0L7QudC60LDRhSDQvdC1INC+0L/RgNC10LTQtdC70LXQvdGLXHJcbiAgICBtaW5WYWw6IDAsICAgICAgICAvLyDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQuNC70Lgg0L/RgNC+0LzQtdC20YPRgtC+0LouXHJcbiAgICBtYXhWYWw6IDEwLCAgICAgICAvLyDQtdGB0LvQuCDQvtC90Lgg0L3QtSDRg9C60LDQt9Cw0L3RiyDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvCwg0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUgXHJcbiAgICBzdGVwOiAxLCAgICAgICAgICAvLyAodmFsdWUpINC4INC/0L7Qt9C40YbQuNGPINCx0LXQs9GD0L3QutCwINGA0LDQstC90Ysg0LzQuNC90LjQvNCw0LvRjNC90L7QvNGDINC30L3QsNGH0LXQvdC40Y5cclxuICAgIHJldmVyc2U6IGZhbHNlLFxyXG4gICAgcmFuZ2U6IG51bGwsXHJcbiAgICBcclxuICAgIGxlbmd0aDogJzMwMHB4JyxcclxuICAgIHZlcnRpY2FsOiBmYWxzZSxcclxuICAgIHRvb2x0aXA6IGZhbHNlLFxyXG4gICAgdG9vbHRpcE1hc2s6IFwidmFsXCIsXHJcbiAgICBzY2FsZTogZmFsc2UsXHJcbiAgICBzY2FsZVN0ZXA6IG51bGwsXHJcbiAgICBzY2FsZU1hc2s6IFwidmFsXCIsXHJcbn1cclxuXHJcbmV4cG9ydCB7IGRlZmF1bHRPcHRpb25zIH07XHJcbiIsImltcG9ydCBNb2RlbCwge0lNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCBWaWV3LCB7SVZpZXd9IGZyb20gJy4vVmlldyc7XHJcbmltcG9ydCBQcmVzZW50ZXIgZnJvbSAnLi9QcmVzZW50ZXInO1xyXG5pbXBvcnQge2RlZmF1bHRPcHRpb25zfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuXHJcbmltcG9ydCB7T2JzZXJ2ZXJ9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5pbXBvcnQge0lPYnNlcnZlcn0gZnJvbSAnLi9PYnNlcnZlcic7XHJcbmltcG9ydCBTdWJqZWN0ICBmcm9tICcuL09ic2VydmVyJztcclxuXHJcblxyXG4oZnVuY3Rpb24oJCl7XHJcblxyXG4gIHZhciBtZXRob2RzOiBPYmplY3QgPSB7XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnM/OiBhbnkgKSB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgIFxyXG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSAkdGhpcy5kYXRhKCdzbGlkZXJEYXRhJyk7XHJcbiAgICAgICAgbGV0IHNsaWRlciA9ICR0aGlzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vINCV0YHQu9C4INC/0LvQsNCz0LjQvSDQtdGJ0ZEg0L3QtSDQv9GA0L7QuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0L1cclxuICAgICAgICBpZiAoICEgZGF0YSApIHtcclxuICAgICAgICBcclxuICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgIGxldCBtb2RlbDogSU1vZGVsID0gbmV3IE1vZGVsKG9wdGlvbnMpO1xyXG4gICAgICAgICAgLy8g0L/QtdGA0LXQtNCw0LXQvCDQvNC+0LTQtdC70Ywg0LIg0L/RgNC10LTRgdGC0LDQstC70LXQvdC40LUg0LTQu9GPINC/0L7Qu9GD0YfQtdC90LjRjyDQuNC3INC90LXQtSBcclxuICAgICAgICAgIC8vINC60L7RgNGA0LXQutGC0L3Ri9GFINC00LDQvdC90YvRhVxyXG4gICAgICAgICAgbGV0IHZpZXc6IElWaWV3ID0gbmV3IFZpZXcobW9kZWwsIG9wdGlvbnMsIHRoaXMpO1xyXG5cclxuICAgICAgICAgIC8vINGB0YPQsdGK0LXQutGCIC0g0Y3RgtC+INC90LDQsdC70Y7QtNC10L3QuNC1XHJcbiAgICAgICAgICAvLyDQvtC9INGF0YDQsNC90LjRgiDQt9C90LDRh9C10L3QuNC1IHZhbCDQuNC70Lgg0L/RgNC+0LzQtdC20YPRgtC+0LpcclxuICAgICAgICAgIGxldCB2YWw6IGFueSB8IFthbnksIGFueV07XHJcbiAgICAgICAgICB2YWwgPSBtb2RlbC5nZXRWYWwoKSB8fCBtb2RlbC5nZXRSYW5nZSgpOyBcclxuICAgICAgICAgIGxldCBzdWJqZWN0ID0gbmV3IFN1YmplY3QodmFsKTtcclxuXHJcbiAgICAgICAgICBsZXQgcHJlc2VudGVyID0gbmV3IFByZXNlbnRlcihtb2RlbCwgdmlldywgc3ViamVjdCk7XHJcblxyXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJywge1xyXG4gICAgICAgICAgICBzbGlkZXIgOiBzbGlkZXIsXHJcbiAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcclxuICAgICAgICAgICAgdmlldzogdmlldyxcclxuICAgICAgICAgICAgcHJlc2VudGVyOiBwcmVzZW50ZXIsXHJcbiAgICAgICAgICAgIHN1YmplY3Q6IHN1YmplY3RcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hhbmdlOiBmdW5jdGlvbiggb3B0aW9uczogYW55ICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IHByZXNlbnRlciA9ICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScpLnByZXNlbnRlcjtcclxuICAgICAgICBwcmVzZW50ZXIuY2hhbmdlKG9wdGlvbnMpO1xyXG5cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgZGF0YSA9ICR0aGlzLmRhdGEoJ3NsaWRlckRhdGEnKTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnVuYmluZCgnLnNsaWRlcicpO1xyXG4gICAgICAgIGRhdGEuc2xpZGVyLnJlbW92ZSgpO1xyXG4gICAgICAgICR0aGlzLnJlbW92ZURhdGEoJ3NsaWRlckRhdGEnKTtcclxuICAgICAgICBcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9ic2VydmU6IGZ1bmN0aW9uKCBmdW5jICkge1xyXG5cclxuICAgICAgLy8g0LTQvtCx0LDQstC70Y/QtdC8INC90LDQsdC70Y7QtNCw0YLQtdC70Y9cclxuICAgICAgLy8g0LDRgNCz0YPQvNC10L3RgiAtINGN0YLQsCDRhNGD0L3QutGG0LjRjyDQutC+0YLQvtGA0LDRjyDQsdGD0LTQtdGCINC+0LHRgNCw0LHQsNGC0YvQstCw0YLRjCDQuNC30LzQtdC90LXQvdC40Y9cclxuICAgICAgbGV0IHN1YmplY3QgPSAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnKS5zdWJqZWN0O1xyXG4gICAgICBsZXQgb2JzZXJ2ZXI6IElPYnNlcnZlciA9IG5ldyBPYnNlcnZlciggZnVuYyApO1xyXG5cclxuICAgICAgc3ViamVjdC5hdHRhY2gob2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgXHJcbiAgalF1ZXJ5LmZuLnNsaWRlciA9IGZ1bmN0aW9uKCBtZXRob2QgKSB7XHJcblxyXG4gICAgLy8g0LvQvtCz0LjQutCwINCy0YvQt9C+0LLQsCDQvNC10YLQvtC00LBcclxuICAgIGlmICggbWV0aG9kc1ttZXRob2QgYXMgc3RyaW5nXSApIHtcclxuICAgICAgcmV0dXJuIG1ldGhvZHNbIG1ldGhvZCBhcyBzdHJpbmcgXS5hcHBseSggdGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMSApKTtcclxuICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICEgbWV0aG9kICkge1xyXG5cclxuICAgICAgLy8gPz8/P1xyXG4gICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgIHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJC5lcnJvciggJ01ldGhvZCBjYWxsZWQgJyArICBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IGZvciBKUXVlcnkuc2xpZGVyJyApO1xyXG4gICAgfSBcclxuXHJcbiAgfTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=