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
        var stepLenght = this._view.oneStepLenght();
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
        var stepLenght = this._view.oneStepLenght();
        var sliderBorder;
        var eventPos;
        var thumbPosition;
        var leftPoint;
        var rightPoint;
        var newVal;
        if (!this._view.getVertical()) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0T3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDhGQUE0RDtBQTRDNUQ7SUFZSSxlQUFZLFVBQW9CO1FBRTVCLElBQUksT0FBTyxHQUFhLFVBQVUsQ0FBQztRQUluQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FB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QyxDQUFDLENBQUM7UUFDdEUsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsV0FBVyxHQUFHLFdBQVcsSUFBSSxDQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7UUFFL0MsSUFBSSxHQUFHLENBQUMsQ0FBRSxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksR0FBRyxDQUFFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFFLENBQUM7UUFDL0QsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsV0FBVyxHQUFHLFdBQVcsSUFBSSxDQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7UUFFL0MsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUtPLHlCQUFVLEdBQWxCLFVBQW1CLFVBQTBCLEVBQUUsVUFBbUI7UUFDOUQsSUFBSSxLQUFLLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3JELFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekIsT0FB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QUFVLE1BQU07UUFHakMsSUFBSyxPQUFPLENBQUMsTUFBZ0IsQ0FBQyxFQUFHO1lBQy9CLE9BQU8sT0FBTyxDQUFFLE1BQWdCLENBQUUsQ0FBQyxLQUFLLENBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBRSxTQUFTLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQztTQUM3RjthQUFNLElBQUssT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLENBQUUsTUFBTSxFQUFHO1lBSW5ELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBRSxDQUFDO1NBQzlDO2FBQU07WUFDTCxDQUFDLENBQUMsS0FBSyxDQUFFLGdCQUFnQixHQUFJLE1BQU0sR0FBRyxtQ0FBbUMsQ0FBRSxDQUFDO1NBQzdFO0lBRUgsQ0FBQyxDQUFDO0FBRUosQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMiLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgSU9wdGlvbnMsIHsgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1vZGVsIHtcclxuICAgIC8vIDFcclxuICAgIGdldFZhbCgpOiBudW1iZXI7XHJcbiAgICBzZXRWYWwobmV3VmFsOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgLy8gMlxyXG4gICAgZ2V0UmFuZ2UoKTogW251bWJlciwgbnVtYmVyXTtcclxuICAgIHNldFJhbmdlKG5ld1JhbmdlOiBbbnVtYmVyLCBudW1iZXJdKTogdm9pZDtcclxuICAgIC8vIDNcclxuICAgIGdldFN0ZXAoKTogbnVtYmVyO1xyXG4gICAgLy8gNFxyXG4gICAgZ2V0TWluVmFsKCk6IG51bWJlcjtcclxuICAgIC8vIDVcclxuICAgIGdldE1heFZhbCgpOiBudW1iZXI7XHJcbiAgICAvLyA2XHJcbiAgICBnZXRSZXZlcnNlKCk6IGJvb2xlYW47XHJcbiAgICAvLyA3XHJcbiAgICBnZXRDdXN0b21WYWx1ZXMoKTogc3RyaW5nW10gfCB1bmRlZmluZWQ7XHJcbiAgICAvLyA4XHJcbiAgICBnZXREYXRhRm9ybWF0KCk6IHN0cmluZztcclxuICAgIC8vIDlcclxuICAgIGdldE9wdGlvbnMoKTogSU1vZGVsT3B0aW9ucztcclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBmaW5kUG9zaXRpb25JbkFycih2YWw6IGFueSwgYXJyPzogYW55W10pOiBudW1iZXI7XHJcbiAgICBnZXRTdGVwTnVtYmVyKHZhbDogbnVtYmVyKTogbnVtYmVyO1xyXG4gICAgdHJhbnNsYXRlQnlTdGVwKHN0ZXA6IG51bWJlcik6IG51bWJlciB8IHN0cmluZyB8IERhdGU7IC8vINC/0L4g0YjQsNCz0YNcclxuICAgIHRyYW5zbGF0ZSh2YWw6IG51bWJlcik6IG51bWJlciB8IHN0cmluZyB8IERhdGU7IC8vINC/0L4g0LLQsNC70LjQtNC90L7QvNGDINC30L3QsNGH0LXQvdC40Y5cclxuICAgIG51bWJlck9mU3RlcHMoKTogbnVtYmVyO1xyXG4gICAgY2hhbmdlKG5ld09wdGlvbnM6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1vZGVsT3B0aW9ucyB7XHJcbiAgICBkYXRhRm9ybWF0OiBzdHJpbmc7XHJcbiAgICB2YWx1ZTogbnVtYmVyIHwgbnVsbDtcclxuICAgIG1pblZhbDogbnVtYmVyO1xyXG4gICAgbWF4VmFsOiBudW1iZXI7XHJcbiAgICBzdGVwOiBudW1iZXI7XHJcbiAgICByZXZlcnNlOiBib29sZWFuO1xyXG4gICAgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gfCBudWxsOyBcclxuICAgIGN1c3RvbVZhbHVlcz86IHN0cmluZ1tdO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbCBpbXBsZW1lbnRzIElNb2RlbCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YUZvcm1hdDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdmFsOiBudW1iZXIgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbWluVmFsOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9tYXhWYWw6bnVtYmVyOyAgIFxyXG4gICAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfcmV2ZXJzZTogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3JhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2N1c3RvbVZhbHVlcz86IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogSU1vZGVsT3B0aW9ucyB8IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhbGxPcHRpb25zOiBJT3B0aW9ucykge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnMgPSBhbGxPcHRpb25zO1xyXG4gICAgICAgIC8vINC10YHQu9C4INC90LUg0YPQutCw0LfQsNC90L4g0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUsINGD0LrQsNC30YvQstCw0LXQvCDQvNC40L3QuNC80LDQu9GM0L3QvtC1LlxyXG4gICAgICAgIC8vINGN0YLQviDQvdC10L7QsdGF0L7QtNC40LzQviDRh9GC0L7QsdGLINC/0YDQvtC50YLQuCDQstCw0LvQuNC00LDRhtC40Y4g0Lgg0L/QvtGB0YLQsNCy0LjRgtGMINCx0LXQs9GD0L3QvtC6INGB0L7Qs9C70LDRgdC90L4g0YjQsNCz0YMuXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0YPQutCw0LfQsNC9IHJhbmdlLCDQvNC10L3Rj9C10Lwg0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0L3QsCBudWxsXHJcbiAgICAgICAgb3B0aW9ucy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgPyBvcHRpb25zLnZhbHVlIDogb3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgbGV0IHZhbGlkT3B0aW9uczogSU1vZGVsT3B0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ251bWVyaWMnICkge1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLm51bWVyaWNGb3JtYXRWYWxpZGF0aW9uKG9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdkYXRlJyApIHtcclxuICAgICAgICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC00LDRgtGLINCyINC90LDRh9Cw0LvRjNC90L7QvCDRhNC+0YLRgNC80LDRgtC1LCDQvdCw0L/RgCBkZC9tbS95eXl5XHJcbiAgICAgICAgICAgIC8vINGH0YLQvtCx0Ysg0LzQvtC20L3QviDQsdGL0LvQviDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0LjRhSDQtNC70Y8g0LjQt9C80LXQvdC10L3QuNGPINC80L7QtNC10LvQuFxyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgYWxsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMuZGF0ZUZvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ2N1c3RvbScgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMuY3VzdG9tRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXMgPSBvcHRpb25zLmN1c3RvbVZhbHVlcztcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGZvcm1hdCBvZiBkYXRhJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kYXRhRm9ybWF0ID0gdmFsaWRPcHRpb25zLmRhdGFGb3JtYXQ7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gdmFsaWRPcHRpb25zLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX21pblZhbCA9IHZhbGlkT3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgdGhpcy5fbWF4VmFsID0gdmFsaWRPcHRpb25zLm1heFZhbDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gdmFsaWRPcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZSA9IHZhbGlkT3B0aW9ucy5yZXZlcnNlO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gdmFsaWRPcHRpb25zLnJhbmdlO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVZhbHVlcyA9IHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXM7ICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgIT0gJ2RhdGUnKSB0aGlzLl9vcHRpb25zID0gdmFsaWRPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDFcclxuICAgIGdldFZhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWw7XHJcbiAgICB9XHJcbiAgICBzZXRWYWwobmV3VmFsOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFyZU51bWVyaWMobmV3VmFsKTtcclxuICAgICAgICB0aGlzLm9uZVZhbHVlVmFsaWRhdGlvbih0aGlzLl9taW5WYWwsIHRoaXMuX21heFZhbCwgbmV3VmFsLCB0aGlzLl9zdGVwKTtcclxuICAgICAgICB0aGlzLl92YWwgPSBuZXdWYWw7XHJcbiAgICB9XHJcbiAgICAvLyAyXHJcbiAgICBnZXRSYW5nZSgpOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmFuZ2U7XHJcbiAgICB9XHJcbiAgICBzZXRSYW5nZShuZXdSYW5nZTogW251bWJlciwgbnVtYmVyXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXJlTnVtZXJpYyhuZXdSYW5nZVswXSwgbmV3UmFuZ2VbMV0pXHJcbiAgICAgICAgdGhpcy5yYW5nZVZhbGlkYXRpb24odGhpcy5fbWluVmFsLCB0aGlzLl9tYXhWYWwsIG5ld1JhbmdlLCB0aGlzLl9zdGVwKTtcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLm1pbk1heFZhbGlkYXRpb24obmV3UmFuZ2VbMF0sIG5ld1JhbmdlWzFdLCB0aGlzLl9yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFuZ2UgPSBuZXdSYW5nZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9yYW5nZSA9IFtuZXdSYW5nZVsxXSwgbmV3UmFuZ2VbMF1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBuZXdSYW5nZTtcclxuICAgIH1cclxuICAgIC8vIDNcclxuICAgIGdldFN0ZXAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcDtcclxuICAgIH1cclxuICAgIC8vIDRcclxuICAgIGdldE1pblZhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5WYWw7XHJcbiAgICB9XHJcbiAgICAvLyA1XHJcbiAgICBnZXRNYXhWYWwoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4VmFsO1xyXG4gICAgfVxyXG4gICAgLy8gNlxyXG4gICAgZ2V0UmV2ZXJzZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmV2ZXJzZTtcclxuICAgIH1cclxuICAgIC8vIDdcclxuICAgIGdldEN1c3RvbVZhbHVlcygpOiBhbnlbXSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1c3RvbVZhbHVlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gOFxyXG4gICAgZ2V0RGF0YUZvcm1hdCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhRm9ybWF0O1xyXG4gICAgfVxyXG4gICAgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zIHtcclxuXHJcbiAgICAgICAgbGV0IG9wdHM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLl9vcHRpb25zO1xyXG4gICAgICAgIGlmICggIXRoaXMuX3JhbmdlICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbDogYW55O1xyXG4gICAgICAgICAgICAvL3ZhbCA9IHRoaXMudHJhbnNsYXRlKCB0aGlzLl92YWwgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdkYXRlJykge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3ZhbCApO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9ICgnMCcgKyB2YWwuZ2V0RGF0ZSgpKS5zbGljZSgtMikgKyBcclxuICAgICAgICAgICAgICAgICcvJyArICgnMCcgKyAoMSArIHZhbC5nZXRNb250aCgpKSApLnNsaWNlKC0yKSArXHJcbiAgICAgICAgICAgICAgICAnLycgKyAoIHZhbC5nZXRGdWxsWWVhcigpICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLl92YWw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9wdHMudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIG9wdHMucmFuZ2UgPSBudWxsO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbDogYW55O1xyXG4gICAgICAgICAgICBsZXQgYXJyOiBbYW55LCBhbnldID0gW251bGwsIG51bGxdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgIT0gJ2RhdGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgYXJyID0gdGhpcy5fcmFuZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3JhbmdlWzBdICk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSAoJzAnICsgdmFsLmdldERhdGUoKSkuc2xpY2UoLTIpICsgXHJcbiAgICAgICAgICAgICAgICAnLycgKyAoJzAnICsgKDEgKyB2YWwuZ2V0TW9udGgoKSkgKS5zbGljZSgtMikgK1xyXG4gICAgICAgICAgICAgICAgJy8nICsgdmFsLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXJyWzBdID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudHJhbnNsYXRlKCB0aGlzLl9yYW5nZVsxXSApO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gKCcwJyArIHZhbC5nZXREYXRlKCkpLnNsaWNlKC0yKSArIFxyXG4gICAgICAgICAgICAgICAgJy8nICsgKCcwJyArICgxICsgdmFsLmdldE1vbnRoKCkpICkuc2xpY2UoLTIpICtcclxuICAgICAgICAgICAgICAgICcvJyArIHZhbC5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGFyclsxXSA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0cy52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIG9wdHMucmFuZ2UgPSBhcnI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0cztcclxuICAgIH1cclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBmaW5kUG9zaXRpb25JbkFycih2YWw6IGFueSwgYXJyPzogYW55W10pOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC40YnQtdGCINC/0L7Qt9C40YbQuNGOIHZhbCDQsiBjdXN0b20gdmFsdWVzXHJcbiAgICAgICAgLy8g0YLQsNC6INC20LUg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNGB0L/QvtC70YzQt9C+0LLQsNC9INGBINC70Y7QsdGL0Lwg0LTRgNGD0LPQuCDQvNCw0YHRgdC40LLQvtC8XHJcbiAgICAgICAgaWYgKCBhcnIgJiYgYXJyLmluZGV4T2YodmFsKSAhPSAtMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFyci5pbmRleE9mKHZhbCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICggYXJyICYmIGFyci5pbmRleE9mKHZhbCkgPT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudCBmaW5kIHZhbHVlIGluIGFycmF5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICF0aGlzLl9jdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHRoaXMuX2N1c3RvbVZhbHVlcy5pbmRleE9mKHZhbCkgIT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXMuaW5kZXhPZih2YWwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHZhbGlkIHZhbHVlIGZvciBjdXN0b20gdmFsdWVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0ZXBOdW1iZXIodmFsOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC90LDRhdC+0LTQuNGCLCDQvdCwINC60LDQutC+0Lwg0L/QviDRgdGH0LXRgtGDINGI0LDQs9C1INGB0YLQvtC40YIgdmFsXHJcbiAgICAgICAgLy8g0L/RgNC40LzQtdC90Y/RgtGMINGC0L7Qu9GM0LrQviDQtNC70Y8g0L3QtdGC0YDQsNC90YHRhNC+0YDQvNC40YDQvtCy0LDQvdC90YvRhSwg0L/RgNCw0LLQuNC70YzQvdGL0YUg0LfQvdCw0YfQtdC90LjQuSFcclxuICAgICAgICBsZXQgc3RlcE51bTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fbWluVmFsKSApO1xyXG5cclxuICAgICAgICBsZXQgYTogbnVtYmVyID0gKyh2YWwgLSB0aGlzLl9taW5WYWwpLnRvRml4ZWQobik7XHJcbiAgICAgICAgbGV0IGI6IG51bWJlciA9ICsodGhpcy5fbWF4VmFsIC0gdGhpcy5fbWluVmFsKS50b0ZpeGVkKG4pXHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RlcE51bSA9ICsoIGEgKiB0aGlzLm51bWJlck9mU3RlcHMoKSAvIGIgKS50b0ZpeGVkKCk7XHJcbiAgICAgICAgc3RlcE51bSA9IE1hdGguYWJzKHN0ZXBOdW0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc3RlcE51bTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2xhdGVCeVN0ZXAoc3RlcDogbnVtYmVyKTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2N1c3RvbScpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICggIXRoaXMuX3JldmVyc2UgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzW3N0ZXBdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbVZhbHVlc1t0aGlzLl9jdXN0b21WYWx1ZXMubGVuZ3RoIC0gc3RlcCAtIDFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fbWluVmFsKSApO1xyXG4gICAgICAgICAgICBsZXQgcjogbnVtYmVyID0gIXRoaXMuX3JldmVyc2UgPyAxIDogLTE7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciA9ICsoICgrdGhpcy5fbWluVmFsKSArICgrdGhpcy5fc3RlcCkgKiAoK3N0ZXApICogKCtyKSApLnRvRml4ZWQobik7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnZGF0ZScpIHsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodmFsKTsgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiB2YWw7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zbGF0ZSh2YWwpOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2N1c3RvbScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbVZhbHVlc1t2YWxdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpOyBcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG51bWJlck9mU3RlcHMoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuICAgICAgICBuID0gTWF0aC5wb3coMTAsIG4pO1xyXG4gICAgICAgIHJldHVybiAoIE1hdGguYWJzKHRoaXMuX21heFZhbCAtIHRoaXMuX21pblZhbCkgKiBuICkgLyAoIHRoaXMuX3N0ZXAgKiBuICk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlKG5ld09wdGlvbnM6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgcHJldk9wdGlvbnM6IElNb2RlbE9wdGlvbnMgPSB0aGlzLl9vcHRpb25zO1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBhbnkgPSBPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgbmV3T3B0aW9ucyk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMudmFsdWUgPSBvcHRpb25zLnZhbHVlICE9IG51bGwgPyBvcHRpb25zLnZhbHVlIDogb3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgbGV0IHZhbGlkT3B0aW9uczogSU1vZGVsT3B0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ251bWVyaWMnICkge1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLm51bWVyaWNGb3JtYXRWYWxpZGF0aW9uKG9wdGlvbnMsIHByZXZPcHRpb25zIGFzIElPcHRpb25zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdkYXRlJyApIHtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy5kYXRlRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBwcmV2T3B0aW9ucyBhcyBJT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgbmV3T3B0aW9ucyk7XHJcblxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ2N1c3RvbScgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMuY3VzdG9tRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBwcmV2T3B0aW9ucyBhcyBJT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXMgPSBvcHRpb25zLmN1c3RvbVZhbHVlcztcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGZvcm1hdCBvZiBkYXRhJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kYXRhRm9ybWF0ID0gdmFsaWRPcHRpb25zLmRhdGFGb3JtYXQ7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gdmFsaWRPcHRpb25zLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX21pblZhbCA9IHZhbGlkT3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgdGhpcy5fbWF4VmFsID0gdmFsaWRPcHRpb25zLm1heFZhbDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gdmFsaWRPcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZSA9IHZhbGlkT3B0aW9ucy5yZXZlcnNlO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gdmFsaWRPcHRpb25zLnJhbmdlO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVZhbHVlcyA9IHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXM7ICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgIT0gJ2RhdGUnKSB0aGlzLl9vcHRpb25zID0gdmFsaWRPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24oYWxsT3B0aW9uczogSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyk6IElNb2RlbE9wdGlvbnMge1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBJT3B0aW9ucyA9IGFsbE9wdGlvbnM7XHJcbiAgICAgICAgLy8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQvdCw0YfQsNC70YzQvdGL0Lwg0L7Qv9GG0LjRj9C8INC00LXRhNC+0LvRgtC90YvQtSDQt9C90LDRh9C10L3QuNGPINC40LcgZGVmYXVsdE9wdGlvbnNcclxuICAgICAgICAvLyDQvdCw0YfQsNC70YzQvdC+0LzRgyDQt9C90LDRh9C10L3QuNGOINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0LzQuNC90LjQvNCw0LvRjNC90L7QtVxyXG4gICAgICAgIC8vINC/0L4g0LzQtdGA0LUg0L/RgNC+0YXQvtC20LTQtdC90LjRjyDQstCw0LvQuNC00LDRhtC40LgsINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPINC90LAg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC40LVcclxuICAgICAgICBsZXQgbmV3T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgZGF0YUZvcm1hdDogJ251bWVyaWMnLFxyXG4gICAgICAgICAgICB2YWx1ZTogZGVmYXVsdE9wdGlvbnMubWluVmFsIGFzIG51bWJlcixcclxuICAgICAgICAgICAgbWluVmFsOiBkZWZhdWx0T3B0aW9ucy5taW5WYWwgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICBtYXhWYWw6IGRlZmF1bHRPcHRpb25zLm1heFZhbCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgIHN0ZXA6IGRlZmF1bHRPcHRpb25zLnN0ZXAsXHJcbiAgICAgICAgICAgIHJldmVyc2U6IGRlZmF1bHRPcHRpb25zLnJldmVyc2UsXHJcbiAgICAgICAgICAgIHJhbmdlOiBkZWZhdWx0T3B0aW9ucy5yYW5nZSBhcyBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hcmVOdW1lcmljKG9wdGlvbnMubWF4VmFsLCBvcHRpb25zLm1pblZhbCwgb3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgbmV3T3B0aW9ucy5zdGVwID0gTWF0aC5hYnMob3B0aW9ucy5zdGVwKTtcclxuICAgICAgICBuZXdPcHRpb25zLnJldmVyc2UgPSBvcHRpb25zLnJldmVyc2UgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgbmV3T3B0aW9ucy5kYXRhRm9ybWF0ID0gb3B0aW9ucy5kYXRhRm9ybWF0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc3RlcFZhbGlkYXRpb24ob3B0aW9ucy5taW5WYWwgYXMgbnVtYmVyLCBvcHRpb25zLm1heFZhbCBhcyBudW1iZXIsIG5ld09wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC80LjQvSDQuCDQvNCw0LrRgSDQv9C10YDQtdC/0YPRgtCw0L3RiyDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvCwg0LzQtdC90Y/QtdC8INC/0L7RgNGP0LTQvtC6XHJcbiAgICAgICAgLy8g0L/QvtC00YDQsNC30YPQvNC10LLQsNC10YLRgdGPLCDRh9GC0L4gbWluIC0g0Y3RgtC+INGC0L4g0YfRgtC+INGB0LvQtdCy0LAg0L3QsCDRgdC70LDQudC00LXRgNC1LCBtYXggLSDRgdC/0YDQsNCy0LBcclxuICAgICAgICBpZiAoIHRoaXMubWluTWF4VmFsaWRhdGlvbihvcHRpb25zLm1pblZhbCBhcyBudW1iZXIsIG9wdGlvbnMubWF4VmFsIGFzIG51bWJlciwgbmV3T3B0aW9ucy5yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5taW5WYWwgPSBvcHRpb25zLm1pblZhbCBhcyBudW1iZXI7XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMubWF4VmFsID0gb3B0aW9ucy5tYXhWYWwgYXMgbnVtYmVyOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMubWluVmFsID0gb3B0aW9ucy5tYXhWYWwgYXMgbnVtYmVyO1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLm1heFZhbCA9IG9wdGlvbnMubWluVmFsIGFzIG51bWJlcjsgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnJhbmdlICkge1xyXG4gICAgICAgICAgICB0aGlzLnJhbmdlVmFsaWRhdGlvbihuZXdPcHRpb25zLm1pblZhbCwgbmV3T3B0aW9ucy5tYXhWYWwsIG9wdGlvbnMucmFuZ2UgYXMgW251bWJlciwgbnVtYmVyXSwgbmV3T3B0aW9ucy5zdGVwKTtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LzQuNC9INC4INC80LDQutGBINCyINC00LjQsNC/0LDQt9C+0L3QtSByYW5nZSDQv9C10YDQtdC/0YPRgtCw0L3RiyDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvCwg0LzQtdC90Y/QtdC8INC/0L7RgNGP0LTQvtC6XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5taW5NYXhWYWxpZGF0aW9uKG9wdGlvbnMucmFuZ2VbMF0gYXMgbnVtYmVyLCBvcHRpb25zLnJhbmdlWzFdIGFzIG51bWJlciwgbmV3T3B0aW9ucy5yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgICAgIG5ld09wdGlvbnMucmFuZ2UgPSBvcHRpb25zLnJhbmdlIGFzIFtudW1iZXIsIG51bWJlcl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdPcHRpb25zLnJhbmdlID0gW29wdGlvbnMucmFuZ2VbMV0gYXMgbnVtYmVyLCBvcHRpb25zLnJhbmdlWzBdIGFzIG51bWJlcl07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vINC+0YLQvNC10L3Rj9C10Lwg0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUsINC00LDQttC1INC10YHQu9C4INC+0L3QviDQstCy0LXQtNC10L3QviDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvFxyXG4gICAgICAgICAgICBuZXdPcHRpb25zLnZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0LfQsNC/0YPRgdC60LDQtdC8INC/0YDQvtCy0LXRgNC60Lgg0LTQu9GPINC90LDRh9Cw0LvRjNC90L7Qs9C+INC30L3QsNGH0LXQvdC40Y8sINGC0L7Qu9GM0LrQviDQtdGB0LvQuCDQvdC1INGD0LrQsNC30LDQvSDQtNC40LDQv9Cw0LfQvtC9IHJhbmdlXHJcbiAgICAgICAgICAgIHRoaXMuYXJlTnVtZXJpYyhvcHRpb25zLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5vbmVWYWx1ZVZhbGlkYXRpb24obmV3T3B0aW9ucy5taW5WYWwsIG5ld09wdGlvbnMubWF4VmFsLCBvcHRpb25zLnZhbHVlIGFzIG51bWJlciwgbmV3T3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMudmFsdWUgPSBvcHRpb25zLnZhbHVlIGFzIG51bWJlcjtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5yYW5nZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXdPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGRhdGVGb3JtYXRWYWxpZGF0aW9uKGFsbE9wdGlvbnM6IElPcHRpb25zLCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMpOiBJTW9kZWxPcHRpb25zIHtcclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnMgPSBhbGxPcHRpb25zO1xyXG5cclxuICAgICAgICB0aGlzLmN1c3RvbURhdGVWYWxpZGF0aW9uKG9wdGlvbnMubWluVmFsLCBvcHRpb25zLm1heFZhbCk7XHJcbiAgICAgICAgb3B0aW9ucy5taW5WYWwgPSB0aGlzLnRyYW5zbGF0ZURhdGVUb051bWJlcihvcHRpb25zLm1pblZhbCBhcyBzdHJpbmcpO1xyXG4gICAgICAgIG9wdGlvbnMubWF4VmFsID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5tYXhWYWwgYXMgc3RyaW5nKTtcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSB0aGlzLnRyYW5sYXRlU3RlcFRvRGF0ZUZvcm1hdChvcHRpb25zLnN0ZXApO1xyXG5cclxuICAgICAgICBpZiAoIEFycmF5LmlzQXJyYXkob3B0aW9ucy5yYW5nZSkgJiYgb3B0aW9ucy5yYW5nZS5sZW5ndGggPT0gMiApIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINCy0LLQtdC7INGH0YLQviDRgtC+INC00YDRg9Cz0L7QtSwg0LAg0L3QtSByYW5nZSwg0L3QsCDRjdGC0L7QvFxyXG4gICAgICAgICAgICAvLyDRjdGC0LDQv9C1INC+0YjQuNCx0LrQuCDQvdC1INCx0YPQtNC10YIuINCe0L3QsCDQv9C+0Y/QstC40YLRgdGPINC/0YDQuCDQv9GA0L7QstC10YDQutC1INC90LAgbnVtZXJpY0Zvcm1hdFZhbGlkYXRpb25cclxuICAgICAgICAgICAgLy8gKNC/0L7RgtC+0LzRgyDRh9GC0L4gcmFuZ2Ug0YLQsNC6INC4INC+0YHRgtCw0LXRgtGB0Y8gdHJ1ZSlcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRlVmFsaWRhdGlvbihvcHRpb25zLnJhbmdlWzBdLCBvcHRpb25zLnJhbmdlWzFdKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVswXSA9IHRoaXMudHJhbnNsYXRlRGF0ZVRvTnVtYmVyKG9wdGlvbnMucmFuZ2VbMF0gYXMgc3RyaW5nKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVsxXSA9IHRoaXMudHJhbnNsYXRlRGF0ZVRvTnVtYmVyKG9wdGlvbnMucmFuZ2VbMV0gYXMgc3RyaW5nKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRlVmFsaWRhdGlvbihvcHRpb25zLnZhbHVlKTtcclxuICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMudHJhbnNsYXRlRGF0ZVRvTnVtYmVyKG9wdGlvbnMudmFsdWUgYXMgc3RyaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGN1c3RvbUZvcm1hdFZhbGlkYXRpb24oYWxsT3B0aW9uczogSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyk6IElNb2RlbE9wdGlvbnMge1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBJT3B0aW9ucyA9IGFsbE9wdGlvbnM7XHJcblxyXG4gICAgICAgIGlmICggIW9wdGlvbnMuY3VzdG9tVmFsdWVzICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2N1c3RvbVZhbHVlcyBpcyByZXF1aXJlZCBvcHRpb24gZm9yIGN1c3RvbSBmb3JtYXQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCAhQXJyYXkuaXNBcnJheShvcHRpb25zLmN1c3RvbVZhbHVlcykgfHwgb3B0aW9ucy5jdXN0b21WYWx1ZXMubGVuZ3RoIDwgMiApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjdXN0b21WYWx1ZXMgc2hvdWxkIGJlIGEgcmFuZ2Ugd2l0aCB0d28gb3IgbW9yZSBpdGVtcywgbGlrZSBbMSwgMiwgXCJhXCJdJyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgb3B0aW9ucy5taW5WYWwgPSAwO1xyXG4gICAgICAgIG9wdGlvbnMubWF4VmFsID0gb3B0aW9ucy5jdXN0b21WYWx1ZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSAxO1xyXG5cclxuICAgICAgICAvLyDQv9GA0LjQvtGA0LjRgtC10YLRiyDQvtC/0YbQuNC5OlxyXG4gICAgICAgIC8vIDEuIHJhbmdlINCyINGH0LjRgdC70LDRhVxyXG4gICAgICAgIC8vIDIuIHJhbmdlINCyINC30L3QsNGH0LXQvdC40Y/RhVxyXG4gICAgICAgIC8vIDMuIHZhbHVlINC60LDQuiDRh9C40YHQu9C+XHJcbiAgICAgICAgLy8gNC4gdmFsdWUg0LrQsNC6INC30L3QsNGH0LXQvdC40LUgXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnJhbmdlIHx8IG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlcyApIHtcclxuXHJcbiAgICAgICAgICAgIGlmICggIW9wdGlvbnMucmFuZ2UgJiYgQXJyYXkuaXNBcnJheShvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXMpICYmIG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlcy5sZW5ndGggPT0gMiApIHtcclxuICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQstCy0LXQuyDRh9GC0L4g0YLQviDQtNGA0YPQs9C+0LUsINCwINC90LUgcmFuZ2UsINC90LAg0Y3RgtC+0LxcclxuICAgICAgICAgICAgICAgIC8vINGN0YLQsNC/0LUg0L7RiNC40LHQutC4INC90LUg0LHRg9C00LXRgi4g0J7QvdCwINC/0L7Rj9Cy0LjRgtGB0Y8g0L/RgNC4INC/0YDQvtCy0LXRgNC60LUg0L3QsCBudW1lcmljRm9ybWF0VmFsaWRhdGlvblxyXG4gICAgICAgICAgICAgICAgLy8gKNC/0L7RgtC+0LzRgyDRh9GC0L4gcmFuZ2Ug0YLQsNC6INC4INC+0YHRgtCw0LXRgtGB0Y8gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2UgPSBbMCwgMF07XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJhbmdlWzBdID0gdGhpcy5maW5kUG9zaXRpb25JbkFycihvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXNbMF0sIG9wdGlvbnMuY3VzdG9tVmFsdWVzKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMV0gPSB0aGlzLmZpbmRQb3NpdGlvbkluQXJyKG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlc1sxXSwgb3B0aW9ucy5jdXN0b21WYWx1ZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC90LUg0LLQstC10LTQtdC90YsgdmFsINC40LvQuCByYW5nZSDQsiBjdXN0b20gdmFsdWVzXHJcbiAgICAgICAgICAgIC8vINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0L/RgNC+0YHRgtGL0LUgdmFsdWUg0LjQu9C4IHJhbmdlLCDQtdGB0LvQuCDQvtC90Lgg0LXRgdGC0YwgXHJcbiAgICAgICAgICAgIGlmICggIW9wdGlvbnMudmFsdWUgJiYgb3B0aW9ucy52YWx1ZUluQ3VzdG9tVmFsdWVzICkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMuZmluZFBvc2l0aW9uSW5BcnIob3B0aW9ucy52YWx1ZUluQ3VzdG9tVmFsdWVzLCBvcHRpb25zLmN1c3RvbVZhbHVlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFyZU51bWVyaWMoLi4udmFsczogYW55KSB7XHJcbiAgICAgICAgZm9yIChsZXQgdmFsIG9mIHZhbHMpIHtcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5pc051bWVyaWModmFsKSApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIHZhbHVlcyBpbiBudW1lcmljIGZvcm1hdCBzaG91bGQgYmUgbnVtYmVycycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWluTWF4VmFsaWRhdGlvbihtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIsIHJldmVyc2U6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoICFyZXZlcnNlICYmIChtaW5WYWwgPj0gbWF4VmFsKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHJldmVyc2UgJiYgKG1pblZhbCA8PSBtYXhWYWwpICkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RlcFZhbGlkYXRpb24obWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyhzdGVwKSApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGVwIHNob3VsZCBiZSBhIG51bWJlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHN0ZXAgPT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGVwIGNhbnQgYmUgZXF1YWwgdG8gMCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcbiAgICAgICAgbGV0IHRlc3Q6IG51bWJlciA9ICsobWF4VmFsIC0gbWluVmFsKS50b0ZpeGVkKG4pXHJcbiAgICAgICAgdGVzdCA9ICggdGVzdCAqIE1hdGgucG93KDEwLCBuKSApIC8gKCBzdGVwICogTWF0aC5wb3coMTAsIG4pICk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBpZiAoIHRlc3QgJSAxICE9IDAgKSB7XHJcbiAgICAgICAgICAgIC8vINCyINGC0L7QvCDRh9C40YHQu9C1INGN0YLQviDQv9GA0L7QstC10YDQutCwINGH0YLQvtCx0Ysg0YjQsNCzINCx0YvQuyDQvdC1INCx0L7Qu9GM0YjQtSDQstGB0LXQs9C+INC/0YDQvtC80LXQttGD0YLQutCwXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignKE1heCB2YWx1ZSAtIG1pbiB2YWx1ZSkgZGl2aWRlZCBieSBzdGVwIHNob3VsZCByZXR1cm4gaW50ZWdlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uZVZhbHVlVmFsaWRhdGlvbihtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIsIHZhbDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXMoc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyhtaW5WYWwpICk7XHJcblxyXG4gICAgICAgIGxldCB0ZXN0OiBudW1iZXIgPSArKHZhbCAtIG1pblZhbCkudG9GaXhlZChuKVxyXG4gICAgICAgIHRlc3QgPSAoIHRlc3QgKiBNYXRoLnBvdygxMCwgbikgKSAvICggc3RlcCAqIE1hdGgucG93KDEwLCBuKSApO1xyXG4gICAgICAgIHRlc3QgPSBNYXRoLmFicyh0ZXN0KTtcclxuXHJcbiAgICAgICAgaWYgKCBNYXRoLm1heChtaW5WYWwsIG1heFZhbCkgPCB2YWwgIHx8ICBNYXRoLm1pbihtaW5WYWwsIG1heFZhbCkgPiB2YWwgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGluaXRpYWwgdmFsdWUgc2hvdWxkIGJlIHdpdGhpbiBtaW4gYW5kIG1heCB2YWx1ZXMnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHRlc3QgJSAxICE9IDAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWUgc2hvdWxkIGJlIHNldCBvbiBzdGVwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZ2VWYWxpZGF0aW9uKG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlciwgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0sIHN0ZXA6IG51bWJlcikge1xyXG5cclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuXHJcbiAgICAgICAgbGV0IHRlc3RMZWZ0OiBudW1iZXIgPSAocmFuZ2VbMF0gLSBtaW5WYWwpIC8gc3RlcDtcclxuICAgICAgICB0ZXN0TGVmdCA9ICt0ZXN0TGVmdC50b0ZpeGVkKG4pO1xyXG4gICAgICAgIHRlc3RMZWZ0ID0gTWF0aC5hYnModGVzdExlZnQpO1xyXG5cclxuICAgICAgICBsZXQgdGVzdFJpZ2h0OiBudW1iZXIgPSAocmFuZ2VbMV0gLSBtaW5WYWwpIC8gc3RlcDtcclxuICAgICAgICB0ZXN0UmlnaHQgPSArdGVzdFJpZ2h0LnRvRml4ZWQobik7XHJcbiAgICAgICAgdGVzdFJpZ2h0ID0gTWF0aC5hYnModGVzdFJpZ2h0KTtcclxuXHJcbiAgICAgICAgaWYgKCByYW5nZS5sZW5ndGggIT0gMiApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSYW5nZSBzaG91bGQgY29udGFpbiB0d28gdmFsdWVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggIXRoaXMuaXNOdW1lcmljKHJhbmdlWzBdKSB8fCAhdGhpcy5pc051bWVyaWMocmFuZ2VbMV0pICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlcyBpbiByYW5nZSBzaG91bGQgYmUgbnVtYmVycycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIE1hdGgubWF4KG1pblZhbCwgbWF4VmFsKSA8IE1hdGgubWF4KHJhbmdlWzBdLCByYW5nZVsxXSkgIHx8ICBNYXRoLm1pbihtaW5WYWwsIG1heFZhbCkgPiBNYXRoLm1pbihyYW5nZVswXSwgcmFuZ2VbMV0pICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSByYW5nZSBzaG91bGQgYmUgd2l0aGluIG1pbiBhbmQgbWF4IHZhbHVlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHRlc3RMZWZ0ICUgMSAhPSAwIHx8IHRlc3RSaWdodCAlIDEgIT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcmFuZ2Ugc2hvdWxkIGJlIHNldCBvbiBzdGVwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3VzdG9tRGF0ZVZhbGlkYXRpb24oLi4udmFsczogYW55W10pIHtcclxuICAgICAgICBmb3IgKCBsZXQgdmFsIG9mIHZhbHMgKSB7XHJcbiAgICAgICAgICAgIGlmICggISgnJyArIHZhbCkubWF0Y2goL15cXGR7Mn1bLlxcLy1dXFxkezJ9Wy5cXC8tXVxcZHs0fSQvKSApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIHZhbHVlcyBpbiBkYXRlIGZvcm1hdCBzaG91bGQgYmUgZGF0ZXMsIGxpa2UgZGQubW0ueXl5eSBvciBkZC9tbS95eXl5IG9yIGRkLW1tLXl5eXknKTsgXHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVEYXRlVG9OdW1iZXIoc3RyOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBhcnIgPSBzdHIuc3BsaXQoc3RyWzJdKTtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCthcnJbMl0sICthcnJbMV0gLSAxLCArYXJyWzBdKTtcclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LLQstC+0LTQuNGCINGB0YLRgNCw0L3QvdGL0LUg0LTQsNC90L3Ri9C1LCDQvtC9INCy0YHQtSDRgNCw0LLQvdC+INC/0L7Qu9GD0YfQuNGCINGA0LXQt9GD0LvRjNGC0LDRgi5cclxuICAgICAgICAvLyDQodC60L7RgNC10LUg0LLRgdC10LPQviwg0Y3RgtC+INCz0L7QstC+0YDQuNGCINC+INGC0L7QvCwg0YfRgtC+INC+0L0g0L/QtdGA0LXQv9GD0YLQsNC7INC/0L7RgNGP0LTQvtC6LiDQn9C+0Y/QstC40YLRgdGPINC/0YDQtdC00YPQv9GA0LXQttC00LXQvdC40LVcclxuICAgICAgICBpZiAoK2FyclswXSA+IDMxIHx8ICthcnJbMV0gPiAxMikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VzZSBkZC5tbS55eXl5IG9yIGRkL21tL3l5eXkgb3IgZGQtbW0teXl5eSBmb3IgZGF0ZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IGRhdGUsIHRyeSBkZC5tbS55eXl5IG9yIGRkL21tL3l5eXkgb3IgZGQtbW0teXl5eScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gK2RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFubGF0ZVN0ZXBUb0RhdGVGb3JtYXQoc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyhzdGVwKSB8fCBzdGVwICUgMSAhPSAwICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0ZXAgaW4gZGF0ZSBmb3JtYXQgc2hvdWxkIGJlIGludGVnZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0ZXAgKiAyNCAqIDM2MDAgKiAxMDAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGlzTnVtZXJpYyhuOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmICFpc05hTihuIC0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNpbWFsUGxhY2VzKG51bTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDQt9C90LDQutC+0LIg0L/QvtGB0LvQtSDQt9Cw0L/Rj9GC0L7QuVxyXG4gICAgICAgIHJldHVybiB+KG51bSArICcnKS5pbmRleE9mKCcuJykgPyAobnVtICsgJycpLnNwbGl0KCcuJylbMV0ubGVuZ3RoIDogMDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiDQmNC90YLRhNC10YDRhNC10LnRgSDQuNC30LTQsNGC0LXQu9GPINC+0LHRitGP0LLQu9GP0LXRgiDQvdCw0LHQvtGAINC80LXRgtC+0LTQvtCyINC00LvRjyDRg9C/0YDQsNCy0LvQtdC90LjRj9C80Lgg0L/QvtC00L/QuNGB0LrQuNGH0LDQvNC4LlxyXG4gKi9cclxuaW50ZXJmYWNlIElTdWJqZWN0IHtcclxuXHJcbiAgICB2YWw6IGFueSB8IFthbnksIGFueV07IFxyXG5cclxuICAgIC8vINCf0YDQuNGB0L7QtdC00LjQvdGP0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPINC6INC40LfQtNCw0YLQtdC70Y4uXHJcbiAgICBhdHRhY2gob2JzZXJ2ZXI6IElPYnNlcnZlcik6IHZvaWQ7XHJcblxyXG4gICAgLy8g0J7RgtGB0L7QtdC00LjQvdGP0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPINC+0YIg0LjQt9C00LDRgtC10LvRjy5cclxuICAgIGRldGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZDtcclxuXHJcbiAgICAvLyDQo9Cy0LXQtNC+0LzQu9GP0LXRgiDQstGB0LXRhSDQvdCw0LHQu9GO0LTQsNGC0LXQu9C10Lkg0L4g0YHQvtCx0YvRgtC40LguXHJcbiAgICBub3RpZnkoKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqINCY0LfQtNCw0YLQtdC70Ywg0LLQu9Cw0LTQtdC10YIg0L3QtdC60L7RgtC+0YDRi9C8INCy0LDQttC90YvQvCDRgdC+0YHRgtC+0Y/QvdC40LXQvCDQuCDQvtC/0L7QstC10YnQsNC10YIg0L3QsNCx0LvRjtC00LDRgtC10LvQtdC5INC+INC10LPQvlxyXG4gKiDQuNC30LzQtdC90LXQvdC40Y/RhS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YmplY3QgaW1wbGVtZW50cyBJU3ViamVjdCB7XHJcblxyXG4gICAgdmFsOiBhbnkgfCBbYW55LCBhbnldOyBcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggdmFsOiBhbnkgfCBbYW55LCBhbnldICkge1xyXG4gICAgICAgIHRoaXMudmFsID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge09ic2VydmVyW119INCh0L/QuNGB0L7QuiDQv9C+0LTQv9C40YHRh9C40LrQvtCyLiDQkiDRgNC10LDQu9GM0L3QvtC5INC20LjQt9C90Lgg0YHQv9C40YHQvtC6XHJcbiAgICAgKiDQv9C+0LTQv9C40YHRh9C40LrQvtCyINC80L7QttC10YIg0YXRgNCw0L3QuNGC0YzRgdGPINCyINCx0L7Qu9C10LUg0L/QvtC00YDQvtCx0L3QvtC8INCy0LjQtNC1ICjQutC70LDRgdGB0LjRhNC40YbQuNGA0YPQtdGC0YHRjyDQv9C+XHJcbiAgICAgKiDRgtC40L/RgyDRgdC+0LHRi9GC0LjRjyDQuCDRgi7QtC4pXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZXJzOiBJT2JzZXJ2ZXJbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JzQtdGC0L7QtNGLINGD0L/RgNCw0LLQu9C10L3QuNGPINC/0L7QtNC/0LjRgdC60L7QuS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJJbmRleCA9IHRoaXMub2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLnNwbGljZShvYnNlcnZlckluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCX0LDQv9GD0YHQuiDQvtCx0L3QvtCy0LvQtdC90LjRjyDQsiDQutCw0LbQtNC+0Lwg0L/QvtC00L/QuNGB0YfQuNC60LUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBub3RpZnkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qgb2JzZXJ2ZXIgb2YgdGhpcy5vYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIudXBkYXRlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCY0L3RgtC10YDRhNC10LnRgSDQndCw0LHQu9GO0LTQsNGC0LXQu9GPINC+0LHRitGP0LLQu9GP0LXRgiDQvNC10YLQvtC0INGD0LLQtdC00L7QvNC70LXQvdC40Y8sINC60L7RgtC+0YDRi9C5INC40LfQtNCw0YLQtdC70LhcclxuICog0LjRgdC/0L7Qu9GM0LfRg9GO0YIg0LTQu9GPINC+0L/QvtCy0LXRidC10L3QuNGPINGB0LLQvtC40YUg0L/QvtC00L/QuNGB0YfQuNC60L7Qsi5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmVyIHtcclxuICAgIGZ1bmM6IGFueTtcclxuICAgIC8vINCf0L7Qu9GD0YfQuNGC0Ywg0L7QsdC90L7QstC70LXQvdC40LUg0L7RgiDRgdGD0LHRitC10LrRgtCwLlxyXG4gICAgdXBkYXRlKHN1YmplY3Q6IFN1YmplY3QpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICog0JrQvtC90LrRgNC10YLQvdGL0LUg0J3QsNCx0LvRjtC00LDRgtC10LvQuCDRgNC10LDQs9C40YDRg9GO0YIg0L3QsCDQvtCx0L3QvtCy0LvQtdC90LjRjywg0LLRi9C/0YPRidC10L3QvdGL0LUg0JjQt9C00LDRgtC10LvQtdC8LCDQulxyXG4gKiDQutC+0YLQvtGA0L7QvNGDINC+0L3QuCDQv9GA0LjQutGA0LXQv9C70LXQvdGLLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9ic2VydmVyIGltcGxlbWVudHMgSU9ic2VydmVyIHtcclxuXHJcbiAgICBmdW5jOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZnVuYzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmZ1bmMgPSBmdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoc3ViamVjdDogU3ViamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnVuYyggc3ViamVjdC52YWwgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtJU3ViamVjdH07IiwiaW1wb3J0IElPcHRpb25zLCB7IGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcbmltcG9ydCB7SU1vZGVsfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IHtJTW9kZWxPcHRpb25zfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IHtJVmlld30gZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IHtJU3ViamVjdH0gIGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlc2VudGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9tb2RlbDogSU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBfdmlldzogSVZpZXc7XHJcbiAgICBwcml2YXRlIF9zdWJqZWN0OiBJU3ViamVjdDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVUaHVtYjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IobW9kZWw6IElNb2RlbCwgdmlldzogSVZpZXcsIHN1YmplY3Q6IElTdWJqZWN0KSB7XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XHJcbiAgICAgICAgdGhpcy5fc3ViamVjdCA9IHN1YmplY3Q7XHJcblxyXG4gICAgICAgIHRoaXMudGh1bWJPbkRvd24gPSB0aGlzLnRodW1iT25Eb3duLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy50aHVtYk9uTW92ZSA9IHRoaXMudGh1bWJPbk1vdmUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnRodW1iT25VcCA9IHRoaXMudGh1bWJPblVwLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyT25DbGljayA9IHRoaXMuc2xpZGVyT25DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICBcclxuICAgICAgICBpZiAoICFtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKCkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Eb3duKTtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigpLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMSkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Eb3duKTtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigyKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG5cclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigxKS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRodW1iT25Eb3duKTtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigyKS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRodW1iT25Eb3duKTtcclxuICAgICAgICB9ICBcclxuXHJcbiAgICAgICAgdmlldy5nZXRTbGlkZXIoKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zbGlkZXJPbkNsaWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRodW1iT25Eb3duKGV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgLy8g0L/RgNC10LTQvtGC0LLRgNCw0YLQuNGC0Ywg0LfQsNC/0YPRgdC6INCy0YvQtNC10LvQtdC90LjRjyAo0LTQtdC50YHRgtCy0LjQtSDQsdGA0LDRg9C30LXRgNCwKVxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVRodW1iID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy50aHVtYk9uTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMudGh1bWJPblVwKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnRodW1iT25Nb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudGh1bWJPblVwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRodW1iT25Nb3ZlKGV2ZW50KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBtb2RlbDogSU1vZGVsID0gdGhpcy5fbW9kZWw7XHJcbiAgICAgICAgbGV0IHZpZXc6IElWaWV3ID0gdGhpcy5fdmlldztcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5fdmlldy5nZXRTbGlkZXIoKTtcclxuICAgICAgXHJcbiAgICAgICAgbGV0IG1pblZhbDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0TWluVmFsKCk7XHJcbiAgICAgICAgbGV0IG1heFZhbDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0TWF4VmFsKCk7XHJcbiAgICAgICAgbGV0IHN0ZXA6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICBsZXQgcmV2ZXJzZTogbnVtYmVyID0gIXRoaXMuX21vZGVsLmdldFJldmVyc2UoKSA/IDEgOiAtMTtcclxuICAgICAgICBsZXQgc2xpZGVyTGVuZ2h0OiBudW1iZXIgPSB0aGlzLl92aWV3LmdldExlbmdodCgpO1xyXG4gICAgICAgIGxldCBzdGVwTGVuZ2h0OiBudW1iZXIgPSB0aGlzLl92aWV3Lm9uZVN0ZXBMZW5naHQoKTtcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlckJvcmRlcjogbnVtYmVyO1xyXG4gICAgICAgIGxldCBldmVudFBvczogbnVtYmVyO1xyXG4gICAgICAgIGxldCB0aHVtYlBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGxlZnRQb2ludDogbnVtYmVyO1xyXG4gICAgICAgIGxldCByaWdodFBvaW50OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG5ld1ZhbDogbnVtYmVyO1xyXG5cclxuICAgICAgICAvLyDQn9C+0LfQuNGG0LjRjyDQsdC10LPRg9C90LrQsCDQsiBweCDQstGL0YfQuNGB0LvRj9C10YLRgdGPINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDQvdCw0YfQsNC70LAg0YHQu9Cw0LnQtNC10YDQsC5cclxuICAgICAgICAvLyDQktC90LDRh9Cw0LvQtSBuZXdWYWwg0LLRi9GH0LjRgdC70Y/QtdGC0YHRjyDQutCw0Log0LrQvtC70LjRh9C10YHRgtCy0L4g0YjQsNCz0L7QsiDQvtGCINC90LDRh9Cw0LvQsCAo0L7RgiAwKSxcclxuICAgICAgICAvLyAo0YLQviDQtdGB0YLRjCDQt9C90LDRh9C10L3QuNGPIG1pbiwgbWF4LCByZXZlcnNlINC90LUg0LjQvNC10Y7RgiDQt9C90LDRh9C10L3QuNGPKS5cclxuXHJcbiAgICAgICAgaWYgKCAhdmlldy5nZXRWZXJ0aWNhbCgpICkge1xyXG5cclxuICAgICAgICAgICAgc2xpZGVyQm9yZGVyID0gKHNsaWRlck5vZGUub2Zmc2V0V2lkdGggLSBzbGlkZXJMZW5naHQpIC8gMjtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSBldmVudC5jbGllbnRYIHx8IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WDsgICAgICAgICBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGV2ZW50UG9zIC0gc2xpZGVyTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gc2xpZGVyQm9yZGVyO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgc2xpZGVyQm9yZGVyID0gKHNsaWRlck5vZGUub2Zmc2V0SGVpZ2h0IC0gc2xpZGVyTGVuZ2h0KSAvIDI7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gZXZlbnQuY2xpZW50WSB8fCBldmVudC50b3VjaGVzWzBdLmNsaWVudFk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBldmVudFBvcyAtIHNsaWRlck5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gc2xpZGVyQm9yZGVyO1xyXG5cclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICBuZXdWYWwgPSBNYXRoLnJvdW5kKHRodW1iUG9zaXRpb24gLyBzdGVwTGVuZ2h0KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIG1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fYWN0aXZlVGh1bWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX3RodW1iX3JpZ2h0JykgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9GA0L7QvNC10LbRg9GC0L7Quiwg0YLQviDQu9C10LLQsNGPINCz0YDQsNC90LjRhtCwIC0g0Y3RgtC+INC70LXQstGL0Lkg0LHQtdCz0YPQvdC+0LpcclxuICAgICAgICAgICAgICAgIC8vINC30LTQtdGB0Ywg0YDQsNGB0YHRh9C40YLRi9Cy0LDQtdGC0YHRjyDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyINC+0YIg0L3QsNGH0LDQu9CwICjQvtGCIDApLCBcclxuICAgICAgICAgICAgICAgIC8vINC30LDRgtC10Lwg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0LIgcHgg0L7RgiDQvdCw0YfQsNC70LAg0YHQu9Cw0LnQtNC10YDQsC5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDQntGI0LjQsdC60Lgg0LIg0LLRi9GH0LjRgdC70LXQvdC40Y/RhSDRgSBmbG9hdCDQt9C00LXRgdGMINC80L7QttC90L4g0L/RgNC+0LjQs9C90L7RgNC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgICAgICAgICBsZWZ0UG9pbnQgPSAobW9kZWwuZ2V0UmFuZ2UoKVswXSAtIG1pblZhbCkgKiByZXZlcnNlIC8gc3RlcDtcclxuICAgICAgICAgICAgICAgIGxlZnRQb2ludCA9IGxlZnRQb2ludCAqIHN0ZXBMZW5naHQ7XHJcbiAgICAgICAgICAgICAgICByaWdodFBvaW50ID0gc2xpZGVyTGVuZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIG1pblZhbCA9IG1vZGVsLmdldFJhbmdlKClbMF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByaWdodFBvaW50ID0gKG1vZGVsLmdldFJhbmdlKClbMV0gLSBtaW5WYWwpICogcmV2ZXJzZSAvIHN0ZXA7XHJcbiAgICAgICAgICAgICAgICByaWdodFBvaW50ID0gcmlnaHRQb2ludCAqIHN0ZXBMZW5naHQ7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UG9pbnQgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIG1heFZhbCA9IG1vZGVsLmdldFJhbmdlKClbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZWZ0UG9pbnQgPSAwO1xyXG4gICAgICAgICAgICByaWdodFBvaW50ID0gc2xpZGVyTGVuZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICggdGh1bWJQb3NpdGlvbiA8PSBsZWZ0UG9pbnQpIHtcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGxlZnRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWluVmFsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHRodW1iUG9zaXRpb24gPj0gcmlnaHRQb2ludCkge1xyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gcmlnaHRQb2ludDtcclxuICAgICAgICAgICAgbmV3VmFsID0gbWF4VmFsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCx0LXQs9GD0L3QvtC6INC90LUg0LLRi9GI0LXQuyDQt9CwINCz0YDQsNC90LjRhtGLLCDRgdGC0LDQstC40Lwg0LXQs9C+INC90LAg0LHQu9C40LbQsNC50YjQtdC1INC30L3QsNGH0LXQvdC40LUsXHJcbiAgICAgICAgICAgIC8vINC60YDQsNGC0L3QvtC1INGI0LDQs9GDLlxyXG4gICAgICAgICAgICAvLyDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDRjdGC0L7Qs9C+INC/0YDQtdC+0LHRgNCw0LfRg9C10Lwg0LXQs9C+INC00LvRjyDQvNC+0LTQtdC70LguINCV0YHQu9C4IHJldmVyc2UgPT0gdHJ1ZSwg0YLQviA9PSAtMSBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IG5ld1ZhbCAqIHN0ZXBMZW5naHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmID0geCA9PiAoICh4LnRvU3RyaW5nKCkuaW5jbHVkZXMoJy4nKSkgPyAoeC50b1N0cmluZygpLnNwbGl0KCcuJykucG9wKCkubGVuZ3RoKSA6ICgwKSApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG4gPSBmKHN0ZXApICsgZihtaW5WYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSAoIG5ld1ZhbCAqIE1hdGgucG93KDEwLCBuKSAqIHN0ZXAgKiByZXZlcnNlICApIC8gTWF0aC5wb3coMTAsIG4pO1xyXG5cclxuICAgICAgICAgICAgbiA9IE1hdGgubWF4KCBmKHN0ZXApLCBmKG1pblZhbCkgKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKygoK25ld1ZhbCkudG9GaXhlZChuKSk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICgrbW9kZWwuZ2V0TWluVmFsKCkpICsgKCtuZXdWYWwpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSArKCgrbmV3VmFsKS50b0ZpeGVkKG4pKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIG1vZGVsLmdldFJhbmdlKCkgJiYgdGhpcy5fYWN0aXZlVGh1bWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX3RodW1iX2xlZnQnKSkge1xyXG4gICAgICAgICAgICBtb2RlbC5zZXRSYW5nZSggW25ld1ZhbCwgbW9kZWwuZ2V0UmFuZ2UoKVsxXV0gKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmICggbW9kZWwuZ2V0UmFuZ2UoKSAmJiB0aGlzLl9hY3RpdmVUaHVtYi5jbGFzc0xpc3QuY29udGFpbnMoJ3NsaWRlcl9fdGh1bWJfcmlnaHQnKSkge1xyXG4gICAgICAgICAgICBtb2RlbC5zZXRSYW5nZSggW21vZGVsLmdldFJhbmdlKClbMF0sIG5ld1ZhbF0gKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0VmFsKG5ld1ZhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24odGhpcy5fYWN0aXZlVGh1bWIsIHRodW1iUG9zaXRpb24pO1xyXG5cclxuICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgpIHx8IHZpZXcuZ2V0VG9vbHRpcCgxKSApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKG5ld1ZhbCk7XHJcblxyXG4gICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggdGhpcy5fYWN0aXZlVGh1bWIucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fdG9vbHRpcCcpLCB2YWwsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgdGh1bWJPblVwKGV2ZW50KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnRodW1iT25VcCk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy50aHVtYk9uTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRodW1iT25VcCk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy50aHVtYk9uTW92ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVRodW1iID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIC8vINC90LDQsdC70Y7QtNCw0YLQtdC70YxcclxuICAgICAgICBsZXQgbW9kZWw6IElNb2RlbCA9IHRoaXMuX21vZGVsO1xyXG5cclxuICAgICAgICBpZiAoIG1vZGVsLmdldFZhbCgpICE9IG51bGwgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSB2YWw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gW107XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMF0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMV0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzbGlkZXJPbkNsaWNrKGV2ZW50KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBtb2RlbDogSU1vZGVsID0gdGhpcy5fbW9kZWw7XHJcbiAgICAgICAgbGV0IHZpZXc6IElWaWV3ID0gdGhpcy5fdmlldztcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5fdmlldy5nZXRTbGlkZXIoKTtcclxuICAgICAgICBsZXQgY2hhbmdpbmdUaHVtYjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgIFxyXG4gICAgICAgIGxldCBtaW5WYWw6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldE1pblZhbCgpO1xyXG4gICAgICAgIGxldCBtYXhWYWw6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldE1heFZhbCgpO1xyXG4gICAgICAgIGxldCBzdGVwOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbGV0IHJldmVyc2U6IG51bWJlciA9ICF0aGlzLl9tb2RlbC5nZXRSZXZlcnNlKCkgPyAxIDogLTE7XHJcbiAgICAgICAgbGV0IHNsaWRlckxlbmdodDogbnVtYmVyID0gdGhpcy5fdmlldy5nZXRMZW5naHQoKTtcclxuICAgICAgICBsZXQgc3RlcExlbmdodDogbnVtYmVyID0gdGhpcy5fdmlldy5vbmVTdGVwTGVuZ2h0KCk7XHJcblxyXG4gICAgICAgIGxldCBzbGlkZXJCb3JkZXI6IG51bWJlcjtcclxuICAgICAgICBsZXQgZXZlbnRQb3M6IG51bWJlcjtcclxuICAgICAgICBsZXQgdGh1bWJQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZWZ0UG9pbnQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgcmlnaHRQb2ludDogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuZXdWYWw6IG51bWJlcjtcclxuXHJcbiAgICAgICAgLy8g0J/QvtC30LjRhtC40Y8g0LHQtdCz0YPQvdC60LAg0LIgcHgg0LLRi9GH0LjRgdC70Y/QtdGC0YHRjyDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L4g0L3QsNGH0LDQu9CwINGB0LvQsNC50LTQtdGA0LAuXHJcbiAgICAgICAgLy8g0JLQvdCw0YfQsNC70LUgbmV3VmFsINCy0YvRh9C40YHQu9GP0LXRgtGB0Y8g0LrQsNC6INC60L7Qu9C40YfQtdGB0YLQstC+INGI0LDQs9C+0LIg0L7RgiDQvdCw0YfQsNC70LAgKNC+0YIgMCksXHJcbiAgICAgICAgLy8gKNGC0L4g0LXRgdGC0Ywg0LfQvdCw0YfQtdC90LjRjyBtaW4sIG1heCwgcmV2ZXJzZSDQvdC1INC40LzQtdGO0YIg0LfQvdCw0YfQtdC90LjRjykuXHJcblxyXG4gICAgICAgIGlmICggIXRoaXMuX3ZpZXcuZ2V0VmVydGljYWwoKSApIHtcclxuXHJcbiAgICAgICAgICAgIHNsaWRlckJvcmRlciA9IChzbGlkZXJOb2RlLm9mZnNldFdpZHRoIC0gc2xpZGVyTGVuZ2h0KSAvIDI7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gZXZlbnQuY2xpZW50WCB8fCBldmVudC50b3VjaGVzWzBdLmNsaWVudFg7ICAgICAgICBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGV2ZW50UG9zIC0gc2xpZGVyTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gc2xpZGVyQm9yZGVyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJCb3JkZXIgPSAoc2xpZGVyTm9kZS5vZmZzZXRIZWlnaHQgLSBzbGlkZXJMZW5naHQpIC8gMjtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSBldmVudC5jbGllbnRZIHx8IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTsgICAgICAgICBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGV2ZW50UG9zIC0gc2xpZGVyTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSBzbGlkZXJCb3JkZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXdWYWwgPSBNYXRoLnJvdW5kKHRodW1iUG9zaXRpb24gLyBzdGVwTGVuZ2h0KTtcclxuICAgICAgICBcclxuICAgICAgICBsZWZ0UG9pbnQgPSAwO1xyXG4gICAgICAgIHJpZ2h0UG9pbnQgPSBzbGlkZXJMZW5naHQ7XHJcbiAgICBcclxuICAgICAgICBpZiAoIHRodW1iUG9zaXRpb24gPD0gbGVmdFBvaW50KSB7XHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBsZWZ0UG9pbnQ7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IG1pblZhbDtcclxuICAgICAgICB9IGVsc2UgaWYgKCB0aHVtYlBvc2l0aW9uID49IHJpZ2h0UG9pbnQpIHtcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IHJpZ2h0UG9pbnQ7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IG1heFZhbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQsdC10LPRg9C90L7QuiDQvdC1INCy0YvRiNC10Lsg0LfQsCDQs9GA0LDQvdC40YbRiywg0YHRgtCw0LLQuNC8INC10LPQviDQvdCwINCx0LvQuNC20LDQudGI0LXQtSDQt9C90LDRh9C10L3QuNC1LFxyXG4gICAgICAgICAgICAvLyDQutGA0LDRgtC90L7QtSDRiNCw0LPRgy5cclxuICAgICAgICAgICAgLy8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0Y3RgtC+0LPQviDQv9GA0LXQvtCx0YDQsNC30YPQtdC8INC10LPQviDQtNC70Y8g0LzQvtC00LXQu9C4LiDQldGB0LvQuCByZXZlcnNlID09IHRydWUsINGC0L4gPT0gLTEgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBuZXdWYWwgKiBzdGVwTGVuZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZiA9IHggPT4gKCAoeC50b1N0cmluZygpLmluY2x1ZGVzKCcuJykpID8gKHgudG9TdHJpbmcoKS5zcGxpdCgnLicpLnBvcCgpLmxlbmd0aCkgOiAoMCkgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBuID0gZihzdGVwKSArIGYobWluVmFsKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKCBuZXdWYWwgKiBNYXRoLnBvdygxMCwgbikgKiBzdGVwICogcmV2ZXJzZSAgKSAvIE1hdGgucG93KDEwLCBuKTtcclxuXHJcbiAgICAgICAgICAgIG4gPSBNYXRoLm1heCggZihzdGVwKSwgZihtaW5WYWwpICk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICsoKCtuZXdWYWwpLnRvRml4ZWQobikpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSAoK21vZGVsLmdldE1pblZhbCgpKSArICgrbmV3VmFsKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKygoK25ld1ZhbCkudG9GaXhlZChuKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICFtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICBtb2RlbC5zZXRWYWwobmV3VmFsKTtcclxuICAgICAgICAgICAgY2hhbmdpbmdUaHVtYiA9IHZpZXcuZ2V0VGh1bWIoKTtcclxuICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKGNoYW5naW5nVGh1bWIsIHRodW1iUG9zaXRpb24pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIE1hdGguYWJzKG5ld1ZhbCAtIG1vZGVsLmdldFJhbmdlKClbMF0pIDwgTWF0aC5hYnMobmV3VmFsIC0gbW9kZWwuZ2V0UmFuZ2UoKVsxXSkgKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RlbC5zZXRSYW5nZShbIG5ld1ZhbCwgbW9kZWwuZ2V0UmFuZ2UoKVsxXSBdKTtcclxuICAgICAgICAgICAgICAgIGNoYW5naW5nVGh1bWIgPSB2aWV3LmdldFRodW1iKDEpO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKGNoYW5naW5nVGh1bWIsIHRodW1iUG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbW9kZWwuc2V0UmFuZ2UoWyBtb2RlbC5nZXRSYW5nZSgpWzBdLCBuZXdWYWwgXSk7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2luZ1RodW1iID0gdmlldy5nZXRUaHVtYigyKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbihjaGFuZ2luZ1RodW1iLCB0aHVtYlBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICggdmlldy5nZXRUb29sdGlwKCkgfHwgdmlldy5nZXRUb29sdGlwKDEpICkge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUobmV3VmFsKTtcclxuXHJcbiAgICAgICAgICAgIHZpZXcuc2V0VmFsVG9Ub29sdGlwKCBjaGFuZ2luZ1RodW1iLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX3Rvb2x0aXAnKSwgdmFsLCB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQvdCw0LHQu9GO0LTQsNGC0LXQu9GMXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXRWYWwoKSAhPSBudWxsICkge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gdmFsO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzBdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzBdID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzFdID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZShvcHRpb25zOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcy5fbW9kZWw7XHJcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLl92aWV3O1xyXG5cclxuICAgICAgICBsZXQgY2hhbmdlVGh1bWJQb3NpdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjaGFuZ2VUb29sdGlwVmFsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNoYW5nZVNjYWxlRGl2aXNpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhbmdlVmFsVG9SYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjaGFuZ2VSYW5nZVRvVmFsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHJlYnVpbGRTY2FsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCByZWJ1aWxkVG9vbHRpcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyAxLiDQnNCe0JTQldCb0KxcclxuICAgICAgICAvLyDQtdGB0LvQuCDQvNC10L3Rj9C10YLRgdGPINC60LDQutC+0Lkg0LvQuNCx0L4g0L/QsNGA0LDQvNC10YLRgCDQsiDQvNC+0LTQtdC70LgsINC30LDQv9GD0YHQutCw0LXQvCDQv9GA0L7QstC10YDQutC4INC80L7QtNC10LvQuCxcclxuICAgICAgICAvLyDQv9GA0LjRgdCy0LDQuNCy0LDQtdC8INC90L7QstGL0LUg0LfQvdCw0YfQtdC90LjRjy5cclxuICAgICAgICAvLyDQt9Cw0L/QvtC80LjQvdCw0LXQvCwg0YfRgtC+INC90YPQttC90L4g0LjQt9C80LXQvdC40YLRjCDQv9C+0LvQvtC20LXQvdC40Y8g0L/QvtC70LfRg9C90LrQvtCyLCDQt9C90LDRh9C10L3QuNGPINCyINC/0L7QtNGB0LrQsNC30LrQsNGFLFxyXG4gICAgICAgIC8vINC00LXQu9C10L3QuNC5INGI0LrQsNC70YsgKNC30L3QsNGH0LXQvdC40Y8g0LggbGVmdCkuIFxyXG4gICAgICAgIC8vINCV0YHQu9C4INC40LfQvNC10L3QuNC70L7RgdGMINC60L7Qu9C40YfQtdGB0YLQstC+INGI0LDQs9C+0LIgLSB0cnVlINC90LAg0L/QtdGA0LXRgNC40YHQvtCy0LDRgtGMINGI0LrQsNC70YMuXHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0L/QvtC80LXQvdGP0LvQvtGB0YwgdmFsINC90LAgcmFuZ2UsINC40LvQuCDQvdCw0L7QsdC+0YDQvtGCIC0gdHJ1ZSDQvdCwINC/0L7RgdGC0YDQvtC40YLRjCEg0LHQtdCz0YPQvdC60LguXHJcblxyXG5cclxuICAgICAgICBsZXQgbW9kZWxPcHRpb25zID0gWydkYXRhRm9ybWF0JywgJ3ZhbHVlJywgJ21pblZhbCcsICdtYXhWYWwnLCAnc3RlcCcsICdyZXZlcnNlJywgJ3JhbmdlJywgJ2N1c3RvbVZhbHVlcycsICd2YWx1ZUluQ3VzdG9tVmFsdWVzJywgJ3JhbmdlSW5DdXN0b21WYWx1ZXMnXTtcclxuXHJcbiAgICAgICAgbGV0IHRlc3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBtb2RlbE9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShpdGVtKSApIHtcclxuICAgICAgICAgICAgICAgIHRlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCB0ZXN0ICkge1xyXG4gICAgICAgICAgICBsZXQgcHJldk51bU9mU3RlcHM6IG51bWJlciA9IG1vZGVsLm51bWJlck9mU3RlcHMoKTtcclxuICAgICAgICAgICAgbGV0IHByZXZPcHRpb25zOiBJTW9kZWxPcHRpb25zID0gbW9kZWwuZ2V0T3B0aW9ucygpO1xyXG4gICAgICAgICAgICBsZXQgbmV3T3B0aW9uczogSU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBwcmV2T3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICBtb2RlbC5jaGFuZ2UobmV3T3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICB2aWV3LnNldE51bWJlck9mU3RlcHMoIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICB2aWV3LnNldFNjYWxlU3RlcCggdmlldy5zY2FsZVN0ZXBWYWxpZGF0aW9uKCBtb2RlbCwgdmlldy5nZXRTY2FsZVN0ZXAoKSApICk7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VUaHVtYlBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2hhbmdlVG9vbHRpcFZhbCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBwcmV2TnVtT2ZTdGVwcyAhPSBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKSB7XHJcbiAgICAgICAgICAgICAgICByZWJ1aWxkU2NhbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggdmlldy5nZXRSYW5nZSgpICYmICFtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlUmFuZ2VUb1ZhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZWJ1aWxkVG9vbHRpcCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCAhdmlldy5nZXRSYW5nZSgpICYmIG1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VWYWxUb1JhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlYnVpbGRUb29sdGlwID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMi4g0JLQmNCUXHJcbiAgICAgICAgLy8g0J/QtdGA0LXRgNC40YHQvtCy0YvQstCw0LXQvCDQstC40LQg0L7RgiDRgdCw0LzRi9GFINCz0LvQvtCx0LDQu9GM0L3Ri9GFINC40LfQvNC10L3QtdC90LjQuSDQuiDRgdCw0LzRi9C8INC90LXQt9C90LDRh9C40YLQtdC70YzQvdGL0LwuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gMi4xINCh0LDQvNC+0LUg0LHQvtC70YzRiNC+0LUg0LjQt9C80LXQvdC10L3QuNC1IC0g0Y3RgtC+INCy0LjQtCDQvtGB0L3QvtCy0Ysg0YjQutCw0LvRiy5cclxuICAgICAgICAvLyDQldC1INC40LfQvNC10L3QtdC90LjQtSDQstGL0LfRi9Cy0LDQtdGCOiDQuNC30LzQtdC90LjRgtGMINC/0L7Qu9C+0LbQtdC90LjRjyDQsdC10LPRg9C90LrQvtCyLCDQtNC10LvQtdC90LjQuSDRiNC60LDQu9GLXHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgndmVydGljYWwnKSB8fCBvcHRpb25zLmhhc093blByb3BlcnR5KCdsZW5ndGgnKSApIHtcclxuICAgICAgICAgICAgdmlldy5jaGFuZ2VTbGlkZXJCYXNlKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjaGFuZ2VUaHVtYlBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAyLjIg0JzQtdC90Y/QtdC8INC60L7Qu9C40YfQtdGB0YLQstC+INCx0LXQs9GD0L3QutC+0LIsINC10YHQu9C4INC90YPQttC90L5cclxuICAgICAgICAvLyDQldGB0LvQuCDRgtCw0LrQvtC1INC40LfQvNC10L3QtdC90LjQtSDQsdGL0LvQviwg0LfQvdCw0YfQuNGCINCy0LXQt9C00LUsXHJcbiAgICAgICAgLy8g0LPQtNC1INC90LDQtNC+LCDRg9C20LUg0YHRgtC+0LjRgiB0cnVlXHJcblxyXG4gICAgICAgIGlmICggY2hhbmdlUmFuZ2VUb1ZhbCApIHtcclxuICAgICAgICAgICAgdmlldy5jaGFuZ2VSYW5nZVRvVmFsKG1vZGVsKTtcclxuXHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKCkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggY2hhbmdlVmFsVG9SYW5nZSApIHtcclxuICAgICAgICAgICAgdmlldy5jaGFuZ2VWYWxUb1JhbmdlKG1vZGVsKTtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigxKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDIpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMSkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMikuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgfSAgIFxyXG5cclxuICAgICAgICAvLyAyLjMg0KjQutCw0LvQsC4g0KPQtNCw0LvRj9C10LwsINGB0YLRgNC+0LjQvCDQuNC70Lgg0L/QtdGA0LXRgdGC0YDQsNC40LLQsNC10LwuINCY0LfQvNC10L3Rj9C10Lwg0LTQtdC70LXQvdC40Y8uXHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2NhbGVTdGVwJykgJiYgb3B0aW9ucy5zY2FsZVN0ZXAgIT0gdmlldy5nZXRTY2FsZVN0ZXAoKSApIHtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZVN0ZXAoIHZpZXcuc2NhbGVTdGVwVmFsaWRhdGlvbihtb2RlbCwgb3B0aW9ucy5zY2FsZVN0ZXApICk7XHJcbiAgICAgICAgICAgIHJlYnVpbGRTY2FsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NjYWxlTWFzaycpICYmIG9wdGlvbnMuc2NhbGVNYXNrICE9IHZpZXcuZ2V0U2NhbGVNYXNrKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGVNYXNrKCBvcHRpb25zLnNjYWxlTWFzayApO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0YPQtNCw0LvRj9C10LxcclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NjYWxlJykgJiYgb3B0aW9ucy5zY2FsZSA9PSBmYWxzZSAmJiB2aWV3LmdldFNjYWxlKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGUoIHZpZXcucmVtb3ZlTm9kZSggdmlldy5nZXRTY2FsZSgpICkgKTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZWJ1aWxkU2NhbGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0YHRgtGA0L7QuNC8XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCdzY2FsZScpICYmIG9wdGlvbnMuc2NhbGUgPT0gdHJ1ZSAmJiAhdmlldy5nZXRTY2FsZSgpICkge1xyXG4gICAgICAgICAgICBsZXQgc2NhbGU6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgICAgICBzY2FsZSA9IHZpZXcuYnVpbGRTY2FsZSh2aWV3LmdldFNsaWRlcigpLCB2aWV3LmdldFNjYWxlU3RlcCgpLCBtb2RlbCwgdmlldy5nZXRTY2FsZU1hc2soKSApO1xyXG4gICAgICAgICAgICB2aWV3LnNldFNjYWxlKHNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgIHJlYnVpbGRTY2FsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC/0LXRgNC10YHRgtGA0LDQuNCy0LDQtdC8XHJcbiAgICAgICAgaWYgKCByZWJ1aWxkU2NhbGUgJiYgdmlldy5nZXRTY2FsZSgpICkge1xyXG4gICAgICAgICAgICB2aWV3LnJlYnVpbGRTY2FsZShtb2RlbCk7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQuNC30LzQtdC90Y/QtdC8INC00LXQu9C10L3QuNGPLiDQt9C90LDRh9C10L3QuNC1INC4IGxlZnRcclxuICAgICAgICBpZiAoIGNoYW5nZVNjYWxlRGl2aXNpb24gJiYgdmlldy5nZXRTY2FsZSgpICkge1xyXG4gICAgICAgICAgICB2aWV3LmNoYW5nZVNjYWxlRGl2aXNpb24obW9kZWwpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIDIuNCDQn9C+0LTRgdC60LDQt9C60LguINCj0LTQsNC70Y/QtdC8LiDQodGC0YDQvtC40LwuINCc0LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPXHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgndG9vbHRpcE1hc2snKSAmJiBvcHRpb25zLnRvb2x0aXBNYXNrICE9IHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApIHtcclxuICAgICAgICAgICAgdmlldy5zZXRUb29sdGlwTWFzayggb3B0aW9ucy50b29sdGlwTWFzayApO1xyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCAhdmlldy5nZXRUb29sdGlwKCkgJiYgIXZpZXcuZ2V0VG9vbHRpcCgxKSAmJiAhb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgndG9vbHRpcCcpICkge1xyXG4gICAgICAgICAgICByZWJ1aWxkVG9vbHRpcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINGD0LTQsNC70Y/QtdC8XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnRvb2x0aXAgPT0gZmFsc2UgfHwgcmVidWlsZFRvb2x0aXAgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyDQv9C+0YfQtdC80YMg0LIg0LTRgNGD0LPQvtC8INC/0L7RgNGP0LTQutC1INC90LUg0YDQsNCx0L7RgtCw0LXRglxyXG4gICAgICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgyKSApIHZpZXcuc2V0VG9vbHRpcCggdmlldy5yZW1vdmVOb2RlKHZpZXcuZ2V0VG9vbHRpcCgyKSksIDIgKTtcclxuICAgICAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoMSkgKSB2aWV3LnNldFRvb2x0aXAoIHZpZXcucmVtb3ZlTm9kZSh2aWV3LmdldFRvb2x0aXAoMSkpLCAxICk7XHJcbiAgICAgICAgICAgIGlmICggdmlldy5nZXRUb29sdGlwKCkgKSB2aWV3LnNldFRvb2x0aXAoIHZpZXcucmVtb3ZlTm9kZSh2aWV3LmdldFRvb2x0aXAoMCkpLCAwICk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCA9PSBmYWxzZSApIHtcclxuICAgICAgICAgICAgICAgIHJlYnVpbGRUb29sdGlwID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2hhbmdlVG9vbHRpcFZhbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQv9C10YDQtdGB0YLRgNCw0LjQstCw0LXQvFxyXG4gICAgICAgIGlmICggb3B0aW9ucy50b29sdGlwIHx8IHJlYnVpbGRUb29sdGlwICkge1xyXG4gICAgICAgICAgICB2aWV3LmJ1aWxkVmFsaWRUb29sdGlwcyhtb2RlbCk7XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0LzQtdC90Y/QtdC8INC30L3QsNGH0LXQvdC40Y9cclxuICAgICAgICBpZiAoIGNoYW5nZVRvb2x0aXBWYWwgJiYgKHZpZXcuZ2V0VG9vbHRpcCgpIHx8IHZpZXcuZ2V0VG9vbHRpcCgxKSkgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW1vZGVsLmdldFJhbmdlKCkpIHsgXHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VmFsVG9Ub29sdGlwKCB2aWV3LmdldFRvb2x0aXAoKSwgdmFsIGFzIHN0cmluZywgdmlldy5nZXRUb29sdGlwTWFzaygpICk7ICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzBdICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggdmlldy5nZXRUb29sdGlwKDEpLCB2YWwgYXMgc3RyaW5nLCB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKTsgXHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVsxXSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIHZpZXcuZ2V0VG9vbHRpcCgyKSwgdmFsIGFzIHN0cmluZywgdmlldy5nZXRUb29sdGlwTWFzaygpICk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuXHJcblxyXG4gICAgICAgIC8vIDIuNSDQn9C+0LvQvtC20LXQvdC40Y8g0LHQtdCz0YPQvdC60L7QslxyXG5cclxuICAgICAgICBpZiAoIGNoYW5nZVRodW1iUG9zaXRpb24gKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3M6IG51bWJlcjtcclxuXHJcbiAgICAgICAgICAgIGlmICggIW1vZGVsLmdldFJhbmdlKCkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcG9zID0gdmlldy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRWYWwoKSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKCB2aWV3LmdldFRodW1iKCksIHBvcyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgeyAgICAgXHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHBvcyA9IHZpZXcuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVswXSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKCB2aWV3LmdldFRodW1iKDEpLCBwb3MpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBwb3MgPSB2aWV3LmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMV0pLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbiggdmlldy5nZXRUaHVtYigyKSwgcG9zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g0L3QsNCx0LvRjtC00LDRgtC10LvRjFxyXG4gICAgICAgICAgICAvLyDQstGL0LfRi9Cy0LDQtdC8INC10YHQu9C4INCx0YvQu9C4INC40LfQvNC10L3QtdC90LjRjyDRgdCy0Y/Qt9Cw0L3QvdGL0LUg0YEg0LHQtdCz0YPQvdC60LDQvNC4XHJcbiAgICAgICAgICAgIC8vINC90LUg0LfQsNGC0YDQvtC90LXRgiwg0L3QsNC/0YDQuNC80LXRgCwg0LTQvtCx0LDQstC70LXQvdC40LUg0YjQutCw0LvRi1xyXG4gICAgICAgICAgICBpZiAoIG1vZGVsLmdldFZhbCgpICE9IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRWYWwoKSApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSB2YWw7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzBdICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFswXSA9IHZhbDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzFdID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IElPcHRpb25zIGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5pbXBvcnQgTW9kZWwsIHtJTW9kZWx9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgeyBydW5Jbk5ld0NvbnRleHQgfSBmcm9tICd2bSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWaWV3IHtcclxuXHJcbiAgICAvLyDQs9C10YLRgtC10YDRiyDQuCDRgdC10YLRgtC10YDRi1xyXG4gICAgZ2V0TGVuZ2h0KCk6IG51bWJlcjtcclxuICAgIGdldFZlcnRpY2FsKCk6IGJvb2xlYW47XHJcbiAgICBnZXRSYW5nZSgpOiBib29sZWFuO1xyXG4gICAgZ2V0VG9vbHRpcE1hc2soKTogc3RyaW5nO1xyXG4gICAgc2V0VG9vbHRpcE1hc2sobWFzazogc3RyaW5nKTogdm9pZDtcclxuICAgIGdldFNjYWxlU3RlcCgpOiBudW1iZXI7XHJcbiAgICBzZXRTY2FsZVN0ZXAoc3RlcDogbnVtYmVyKTogdm9pZDtcclxuICAgIGdldFNjYWxlTWFzaygpOiBzdHJpbmc7XHJcbiAgICBzZXRTY2FsZU1hc2sobWFzazogc3RyaW5nKTogdm9pZDtcclxuICAgIGdldE51bWJlck9mU3RlcHMoKTogbnVtYmVyO1xyXG4gICAgc2V0TnVtYmVyT2ZTdGVwcyhudW06IG51bWJlcik6IHZvaWQ7XHJcblxyXG4gICAgZ2V0U2xpZGVyKCk6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VGh1bWIobnVtPzogbnVtYmVyKTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBnZXRUb29sdGlwKG51bT86IG51bWJlcik6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgc2V0VG9vbHRpcCh0b29sdGlwOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCwgbnVtPzogbnVtYmVyKTogdm9pZDtcclxuICAgIGdldFNjYWxlKCk6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgc2V0U2NhbGUoc2NhbGU6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkKTogdm9pZDtcclxuXHJcblxyXG4gICAgLy8g0LzQtdGC0L7QtNGLINC00LvRjyDRgdC+0LfQtNCw0L3QuNGPINC4INC40LfQvNC10L3QtdC90LjRjyB2aWV3XHJcbiAgICBjaGFuZ2VTbGlkZXJCYXNlIChvcHRpb25zOiBhbnkpOiB2b2lkO1xyXG4gICAgY2hhbmdlUmFuZ2VUb1ZhbCAobW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcbiAgICBjaGFuZ2VWYWxUb1JhbmdlIChtb2RlbDogSU1vZGVsKTogdm9pZDtcclxuICAgIGJ1aWxkVmFsaWRUb29sdGlwcyhtb2RlbDogSU1vZGVsKTogdm9pZDtcclxuICAgIGJ1aWxkU2NhbGUoc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQsIHN0ZXA6IG51bWJlciwgbW9kZWw6IElNb2RlbCwgbWFzazogc3RyaW5nKTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICByZWJ1aWxkU2NhbGUobW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcbiAgICBjaGFuZ2VTY2FsZURpdmlzaW9uKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgY2hhbmdlTGluZSgpOiB2b2lkO1xyXG5cclxuICAgIC8vINCy0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90YvQtSDQvNC10YLQvtC00YtcclxuICAgIHNldFRodW1iUG9zaXRpb24odGh1bWJOb2RlOiBIVE1MRGl2RWxlbWVudCwgdGh1bWJQb3NpdGlvbjogbnVtYmVyKTogdm9pZDtcclxuICAgIHNldFZhbFRvVG9vbHRpcCh0b29sdGlwTm9kZTogSFRNTERpdkVsZW1lbnQsIHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZSwgbWFzazogc3RyaW5nKTogdm9pZDtcclxuICAgIGZpbmRUaHVtYlBvc2l0aW9uKG5ld1N0ZXAsIG51bU9mU3RlcHMpOiBudW1iZXI7XHJcbiAgICBvbmVTdGVwTGVuZ2h0KCk6IG51bWJlcjtcclxuICAgIHJlbW92ZU5vZGUobm9kZTogSFRNTERpdkVsZW1lbnQpOiB1bmRlZmluZWQ7XHJcbiAgICBzY2FsZVN0ZXBWYWxpZGF0aW9uKG1vZGVsOiBJTW9kZWwsIHN0ZXA6IG51bWJlcik6IG51bWJlcjsgIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IGltcGxlbWVudHMgSVZpZXcge1xyXG5cclxuICAgIHByaXZhdGUgX2xlbmdodDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdmVydGljYWw6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9yYW5nZTogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBNYXNrOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9zY2FsZU1hc2s/OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9zY2FsZVN0ZXA/OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9udW1iZXJPZlN0ZXBzOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2xpZGVyOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHByaXZhdGUgX3RodW1iPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90aHVtYkxlZnQ/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3RodW1iUmlnaHQ/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2xpbmU6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcExlZnQ/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBSaWdodD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGU/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1vZGVsOiBJTW9kZWwsIG9wdGlvbnM6IElPcHRpb25zLCBzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCkge1xyXG5cclxuICAgICAgICB0aGlzLl9zbGlkZXIgPSBzbGlkZXJOb2RlO1xyXG4gICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXInKTtcclxuICAgICAgICB0aGlzLl9yYW5nZSA9IG1vZGVsLmdldFJhbmdlKCkgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbnVtYmVyT2ZTdGVwcyA9IG1vZGVsLm51bWJlck9mU3RlcHMoKTtcclxuICAgICAgICB0aGlzLl9sZW5naHQgPSB0aGlzLmxlbmd0aFZhbGlkYXRpb24ob3B0aW9ucy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLnZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSB0aGlzLl9sZW5naHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaG9yaXpvbnRhbCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLmhlaWdodCA9IHRoaXMuX2xlbmdodDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl92ZXJ0aWNhbCcpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbGluZSA9IHRoaXMuYnVpbGRMaW5lKHRoaXMuX3NsaWRlcik7XHJcblxyXG4gICAgICAgIGxldCBwb3M6IG51bWJlcjtcclxuICAgICAgICBpZiAoICF0aGlzLl9yYW5nZSApIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iID0gdGhpcy5idWlsZFRodW1iKHRoaXMuX3NsaWRlcik7XHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0VmFsKCkpLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYiwgcG9zKTtcclxuICAgICAgICB9IGVsc2UgeyAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLl90aHVtYkxlZnQgPSB0aGlzLmJ1aWxkVGh1bWIodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYl9sZWZ0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RodW1iUmlnaHQgPSB0aGlzLmJ1aWxkVGh1bWIodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYl9yaWdodCcpO1xyXG5cclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzBdKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy5fdGh1bWJMZWZ0LCBwb3MpO1xyXG5cclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzFdKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy5fdGh1bWJSaWdodCwgcG9zKTtcclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICAvLyDQvNCw0YHQutCwINC00LvRjyDQv9C+0LTRgdC60LDQt9C+0LpcclxuICAgICAgICAvLyDQtdGB0LvQuCDQtdC1INC90LXRgiwg0L/RgNC40LzQtdC90Y/QtdGC0YHRjyDQvtCx0YvRh9C90LDRjywg0LrQvtGC0L7RgNCw0Y8g0L/QviDQtNC10YTQvtC70YLRgyDQstC+0LfQstGA0LDRidCw0LXRgiDQv9GA0L7RgdGC0L4gdmFsXHJcbiAgICAgICAgLy8gKNCyINGE0L7RgNC80LDRgtC1INC00LDRgiDQstC10YDQvdC10YLRgdGPINC+0LHRitC10LrRgiDQtNCw0YLQsClcclxuICAgICAgICB0aGlzLl90b29sdGlwTWFzayA9IG9wdGlvbnMudG9vbHRpcE1hc2s7XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy50b29sdGlwICkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkVmFsaWRUb29sdGlwcyhtb2RlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3NjYWxlTWFzayA9IG9wdGlvbnMuc2NhbGVNYXNrO1xyXG5cclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyO1xyXG4gICAgICAgIGlmICggb3B0aW9ucy5zY2FsZVN0ZXAgKSB7XHJcbiAgICAgICAgICAgIHN0ZXAgPSB0aGlzLnNjYWxlU3RlcFZhbGlkYXRpb24obW9kZWwsIG9wdGlvbnMuc2NhbGVTdGVwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdGVwID0gbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zY2FsZVN0ZXAgPSBzdGVwO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnNjYWxlICkge1xyXG4gICAgICAgICAgICB0aGlzLl9zY2FsZSA9IHRoaXMuYnVpbGRTY2FsZSh0aGlzLl9zbGlkZXIsIHN0ZXAsIG1vZGVsLCB0aGlzLl9zY2FsZU1hc2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDQs9C10YLRgtC10YDRiyDQuCDRgdC10YLRgtC10YDRi1xyXG4gICAgZ2V0TGVuZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zbGlkZXIuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlci5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuICAgIGdldFZlcnRpY2FsKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbDtcclxuICAgIH1cclxuICAgIGdldFJhbmdlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYW5nZTtcclxuICAgIH1cclxuICAgIGdldFRvb2x0aXBNYXNrKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXBNYXNrO1xyXG4gICAgfVxyXG4gICAgc2V0VG9vbHRpcE1hc2sobWFzazogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdG9vbHRpcE1hc2sgPSBtYXNrO1xyXG4gICAgfVxyXG4gICAgZ2V0U2NhbGVTdGVwKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlU3RlcDtcclxuICAgIH1cclxuICAgIHNldFNjYWxlU3RlcChzdGVwOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zY2FsZVN0ZXAgPSBzdGVwO1xyXG4gICAgfVxyXG4gICAgZ2V0U2NhbGVNYXNrKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlTWFzaztcclxuICAgIH1cclxuICAgIHNldFNjYWxlTWFzayhtYXNrOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zY2FsZU1hc2sgPSBtYXNrO1xyXG4gICAgfVxyXG4gICAgZ2V0TnVtYmVyT2ZTdGVwcygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9udW1iZXJPZlN0ZXBzO1xyXG4gICAgfTtcclxuICAgIHNldE51bWJlck9mU3RlcHMobnVtOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9udW1iZXJPZlN0ZXBzID0gbnVtO1xyXG4gICAgfTtcclxuICAgIFxyXG5cclxuXHJcbiAgICBnZXRTbGlkZXIoKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zbGlkZXI7XHJcbiAgICB9XHJcbiAgICBnZXRUaHVtYihudW06IG51bWJlciA9IDApOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgaWYgKCBudW0gPT0gMCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RodW1iO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIG51bSA9PSAxICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGh1bWJMZWZ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIG51bSA9PSAyICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGh1bWJSaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RodW1iO1xyXG4gICAgfVxyXG4gICAgZ2V0VG9vbHRpcChudW06IG51bWJlciA9IDApOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwIHx8IHRoaXMuX3Rvb2x0aXBMZWZ0ICkge1xyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXAgJiYgbnVtID09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXBMZWZ0ICYmIG51bSA9PSAxICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXBMZWZ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcFJpZ2h0ICYmIG51bSA9PSAyICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXBSaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0VG9vbHRpcCh0b29sdGlwOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCwgbnVtOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgaWYgKCBudW0gPT0gMCApIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IHRvb2x0aXA7XHJcbiAgICAgICAgfSBlbHNlIGlmICggbnVtID09IDEgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBMZWZ0ID0gdG9vbHRpcDtcclxuICAgICAgICB9IGVsc2UgaWYgKCBudW0gPT0gMiApIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFJpZ2h0ID0gdG9vbHRpcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRTY2FsZSgpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xyXG4gICAgfVxyXG4gICAgc2V0U2NhbGUoc2NhbGU6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g0LzQtdGC0L7QtNGLINC00LvRjyDRgdC+0LfQtNCw0L3QuNGPINC4INC40LfQvNC10L3QtdC90LjRjyB2aWV3XHJcblxyXG4gICAgY2hhbmdlU2xpZGVyQmFzZSAob3B0aW9uczogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBsZW5naHRDaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vINGI0LjRgNC40L3QsCAvINC00LvQuNC90LBcclxuICAgICAgICBpZiAoIG9wdGlvbnMubGVuZ3RoICYmIHRoaXMuX2xlbmdodCAhPSBvcHRpb25zLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgdGhpcy5fbGVuZ2h0ID0gb3B0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxlbmdodENoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0L7RgNC40LXQvdGC0LDRhtC40Y9cclxuICAgICAgICBpZiAoIG9wdGlvbnMudmVydGljYWwgJiYgIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfaG9yaXpvbnRhbCcpXHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfdmVydGljYWwnKTtcclxuXHJcbiAgICAgICAgICAgIGxlbmdodENoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIG9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlICYmIHRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX3ZlcnRpY2FsJylcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XHJcblxyXG4gICAgICAgICAgICBsZW5naHRDaGFuZ2VkID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxlbmdodENoYW5nZWQgJiYgIXRoaXMuX3ZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS5oZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSB0aGlzLl9sZW5naHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsZW5naHRDaGFuZ2VkICYmIHRoaXMuX3ZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS53aWR0aCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS5oZWlnaHQgPSB0aGlzLl9sZW5naHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVJhbmdlVG9WYWwgKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fdGh1bWIgPSB0aGlzLmJ1aWxkVGh1bWIodGhpcy5fc2xpZGVyKTtcclxuICAgICAgICB0aGlzLl90aHVtYkxlZnQgPSB0aGlzLnJlbW92ZU5vZGUodGhpcy5fdGh1bWJMZWZ0KTtcclxuICAgICAgICB0aGlzLl90aHVtYlJpZ2h0ID0gdGhpcy5yZW1vdmVOb2RlKHRoaXMuX3RodW1iUmlnaHQpO1xyXG5cclxuICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFZhbCgpKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYiwgcG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VWYWxUb1JhbmdlIChtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHBvczogbnVtYmVyO1xyXG5cclxuICAgICAgICB0aGlzLl9yYW5nZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuX3RodW1iID0gdGhpcy5yZW1vdmVOb2RlKHRoaXMuX3RodW1iKTtcclxuICAgICAgICB0aGlzLl90aHVtYkxlZnQgPSB0aGlzLmJ1aWxkVGh1bWIodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYl9sZWZ0Jyk7IFxyXG4gICAgICAgIHRoaXMuX3RodW1iUmlnaHQgPSB0aGlzLmJ1aWxkVGh1bWIodGhpcy5fc2xpZGVyLCAnc2xpZGVyX190aHVtYl9yaWdodCcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVswXSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy5fdGh1bWJMZWZ0LCBwb3MpO1xyXG5cclxuICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMV0pLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iUmlnaHQsIHBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRWYWxpZFRvb2x0aXBzKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3JhbmdlKSB7IFxyXG5cclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwICkgdGhpcy5fdG9vbHRpcCA9IHRoaXMucmVtb3ZlTm9kZSggdGhpcy5fdG9vbHRpcCApO1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0aGlzLmJ1aWxkVG9vbHRpcCh0aGlzLl90aHVtYik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsVG9Ub29sdGlwKCB0aGlzLl90b29sdGlwLCB2YWwsIHRoaXMuX3Rvb2x0aXBNYXNrICk7ICAgXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcExlZnQgKSB0aGlzLl90b29sdGlwTGVmdCA9IHRoaXMucmVtb3ZlTm9kZSggdGhpcy5fdG9vbHRpcExlZnQgKTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzBdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBMZWZ0ID0gdGhpcy5idWlsZFRvb2x0aXAodGhpcy5fdGh1bWJMZWZ0LCAnc2xpZGVyX190b29sdGlwX2xlZnQnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWxUb1Rvb2x0aXAoIHRoaXMuX3Rvb2x0aXBMZWZ0LCB2YWwsIHRoaXMuX3Rvb2x0aXBNYXNrICk7ICBcclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcFJpZ2h0ICkgdGhpcy5fdG9vbHRpcFJpZ2h0ID0gdGhpcy5yZW1vdmVOb2RlKCB0aGlzLl90b29sdGlwUmlnaHQgKTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBSaWdodCA9IHRoaXMuYnVpbGRUb29sdGlwKHRoaXMuX3RodW1iUmlnaHQsICdzbGlkZXJfX3Rvb2x0aXBfcmlnaHQnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWxUb1Rvb2x0aXAoIHRoaXMuX3Rvb2x0aXBSaWdodCwgdmFsLCB0aGlzLl90b29sdGlwTWFzayApOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRTY2FsZShzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCwgc3RlcDogbnVtYmVyLCBtb2RlbDogSU1vZGVsLCBtYXNrOiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IHNjYWxlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxldCBkaXZpc2lvbjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuXHJcbiAgICAgICAgc2NhbGUuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZScpO1xyXG4gICAgICAgIHNsaWRlck5vZGUucHJlcGVuZChzY2FsZSk7XHJcblxyXG4gICAgICAgIC8vINC80L3QvtC20LjRgtC10LvRjC4g0LLQviDRgdC60L7Qu9GM0LrQviDRgNCw0Lcg0YjQsNCzINCyINC80L7QtNC10LvQtSDQvNC10L3RjNGI0LUg0YjQsNCz0LAg0YjQutCw0LvRi1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHN0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG4gICAgICAgIGxldCBtdWx0OiBudW1iZXIgPSBzdGVwIC8gbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIG11bHQgPSArKCttdWx0KS50b0ZpeGVkKG4pO1xyXG4gICAgICAgIG11bHQgPSBNYXRoLmFicyhtdWx0KTsgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPD0gbW9kZWwubnVtYmVyT2ZTdGVwcygpOyBpID0gaSArIG11bHQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGkgKyBtdWx0INCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC90LAg0LrQsNC60L7QuSDRiNCw0LMg0LzQvtC00LXQu9C4INC/0L7Qv9Cw0LTQsNC10YIg0YjQsNCzINGI0LrQsNC70YtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlQnlTdGVwKGkpO1xyXG5cclxuICAgICAgICAgICAgZGl2aXNpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2aXNpb24uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpO1xyXG4gICAgICAgICAgICBkaXZpc2lvbi5pbm5lckhUTUwgPSAnPHNwYW4+JyArICBldmFsKG1hc2spICsgJzwvc3Bhbj4nO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUubGVmdCA9IHRoaXMub25lU3RlcExlbmdodCgpICogaSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS50b3AgPSB0aGlzLm9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzY2FsZS5hcHBlbmQoZGl2aXNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVidWlsZFNjYWxlKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2NhbGU6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5nZXRTY2FsZSgpO1xyXG4gICAgICAgIGxldCBwcmV2TnVtT2ZTdGVwczogbnVtYmVyID0gc2NhbGUucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlcl9fc2NhbGUtZGl2aXNpb24nKS5sZW5ndGggLSAxO1xyXG4gICAgICAgIGxldCBuZXdOdW1PZlN0ZXBzOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGRpdmlzaW9uOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBcclxuICAgICAgICAvLyDQvNC90L7QttC40YLQtdC70YwuINCy0L4g0YHQutC+0LvRjNC60L4g0YDQsNC3INGI0LDQsyDQsiDQvNC+0LTQtdC70LUg0LzQtdC90YzRiNC1INGI0LDQs9CwINGI0LrQsNC70YtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9zY2FsZVN0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG4gICAgICAgIGxldCBtdWx0OiBudW1iZXIgPSB0aGlzLl9zY2FsZVN0ZXAgLyBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbXVsdCA9ICttdWx0LnRvRml4ZWQobik7XHJcbiAgICAgICAgbXVsdCA9IE1hdGguYWJzKG11bHQpO1xyXG5cclxuICAgICAgICBuZXdOdW1PZlN0ZXBzID0gbW9kZWwubnVtYmVyT2ZTdGVwcygpIC8gbXVsdDtcclxuXHJcbiAgICAgICAgaWYgKCBwcmV2TnVtT2ZTdGVwcyA+IG5ld051bU9mU3RlcHMgKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCAocHJldk51bU9mU3RlcHMgLSBuZXdOdW1PZlN0ZXBzKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZS5sYXN0Q2hpbGQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBwcmV2TnVtT2ZTdGVwcyA8IG5ld051bU9mU3RlcHMgKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCAobmV3TnVtT2ZTdGVwcyAtIHByZXZOdW1PZlN0ZXBzKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uaW5uZXJIVE1MID0gJzxzcGFuPjwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgc2NhbGUuYXBwZW5kKGRpdmlzaW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VTY2FsZURpdmlzaW9uKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZGl2aXNpb246IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgbGV0IG1hc2s6IHN0cmluZyA9IHRoaXMuX3NjYWxlTWFzaztcclxuXHJcbiAgICAgICAgLy8g0LzQvdC+0LbQuNGC0LXQu9GMLiDQstC+INGB0LrQvtC70YzQutC+INGA0LDQtyDRiNCw0LMg0LIg0LzQvtC00LXQu9C1INC80LXQvdGM0YjQtSDRiNCw0LPQsCDRiNC60LDQu9GLXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fc2NhbGVTdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKG1vZGVsLmdldFN0ZXAoKSkgKTtcclxuICAgICAgICBsZXQgbXVsdDogbnVtYmVyID0gdGhpcy5fc2NhbGVTdGVwIC8gbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIG11bHQgPSArbXVsdC50b0ZpeGVkKG4pO1xyXG4gICAgICAgIG11bHQgPSBNYXRoLmFicyhtdWx0KTsgICBcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDw9IG1vZGVsLm51bWJlck9mU3RlcHMoKTsgaSA9IGkgKyBtdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBpICsgbXVsdCDQstC+0LfQstGA0LDRidCw0LXRgiDQvdCwINC60LDQutC+0Lkg0YjQsNCzINC80L7QtNC10LvQuCDQv9C+0L/QsNC00LDQtdGCINGI0LDQsyDRiNC60LDQu9GLXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZUJ5U3RlcChpKTtcclxuXHJcbiAgICAgICAgICAgIGRpdmlzaW9uID0gdGhpcy5nZXRTY2FsZSgpLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXJfX3NjYWxlLWRpdmlzaW9uJylbaSAvIG11bHRdIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgICAgICBkaXZpc2lvbi5xdWVyeVNlbGVjdG9yKCdzcGFuJykudGV4dENvbnRlbnQgPSAnJyArIGV2YWwobWFzayk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3ZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS50b3AgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUubGVmdCA9IHRoaXMub25lU3RlcExlbmdodCgpICogaSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS5sZWZ0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLnRvcCA9IHRoaXMub25lU3RlcExlbmdodCgpICogaSArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlTGluZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmxlZnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xpbmUuc3R5bGUudG9wID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9saW5lLnN0eWxlLndpZHRoID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmhlaWdodCA9IG51bGw7ICBcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9yYW5nZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUudG9wID0gJzBweCdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUubGVmdCA9ICcwcHgnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS53aWR0aCA9IHBhcnNlSW50KHRoaXMuX3RodW1iLnN0eWxlLmxlZnQpICsgdGhpcy5fdGh1bWIuY2xpZW50V2lkdGgvMiArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLndpZHRoID0gJzEwMCUnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmxlZnQgPSAnMHB4J1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS50b3AgPSAnMHB4JztcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUuaGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5fdGh1bWIuc3R5bGUudG9wKSArIHRoaXMuX3RodW1iLmNsaWVudEhlaWdodC8yICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUudG9wID0gJzBweCdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUubGVmdCA9IHBhcnNlSW50KHRoaXMuX3RodW1iTGVmdC5zdHlsZS5sZWZ0KSArIHRoaXMuX3RodW1iTGVmdC5jbGllbnRXaWR0aC8yICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUud2lkdGggPSAoIHBhcnNlSW50KHRoaXMuX3RodW1iUmlnaHQuc3R5bGUubGVmdCkgLSBwYXJzZUludCh0aGlzLl90aHVtYkxlZnQuc3R5bGUubGVmdCkgKSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLndpZHRoID0gJzEwMCUnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmxlZnQgPSAnMHB4J1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS50b3AgPSBwYXJzZUludCh0aGlzLl90aHVtYkxlZnQuc3R5bGUudG9wKSAgKyB0aGlzLl90aHVtYkxlZnQuY2xpZW50SGVpZ2h0LzIgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5oZWlnaHQgPSAoIHBhcnNlSW50KHRoaXMuX3RodW1iUmlnaHQuc3R5bGUudG9wKSAtIHBhcnNlSW50KHRoaXMuX3RodW1iTGVmdC5zdHlsZS50b3ApICkgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcblxyXG4gICAgc2V0VGh1bWJQb3NpdGlvbih0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCB0aHVtYlBvc2l0aW9uOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLnRvcCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS5sZWZ0ID0gdGh1bWJQb3NpdGlvbiAtIHRodW1iTm9kZS5vZmZzZXRXaWR0aC8yICsgJ3B4JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUubGVmdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS50b3AgPSB0aHVtYlBvc2l0aW9uIC0gdGh1bWJOb2RlLm9mZnNldFdpZHRoLzIgKyAncHgnOyAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC+0LHQsCDQsdC10LPRg9C90LrQsCDRgdC/0YDQsNCy0LAsINC00L7QsdCw0LLQu9C10LwgeiBpbmRleCDQtNC70Y8g0L3QuNC20L3QtdCz0L5cclxuICAgICAgICBpZiAoIHRoaXMuZ2V0VGh1bWIoMSkgKSB7XHJcbiAgICAgICAgICAgIGlmICggIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAodGhpcy5nZXRUaHVtYigxKS5zdHlsZS5sZWZ0ID09ICh0aGlzLmdldExlbmdodCgpIC0gdGhpcy5nZXRUaHVtYigxKS5jbGllbnRXaWR0aC8yKSArICdweCcpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gJzEwMCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAodGhpcy5nZXRUaHVtYigxKS5zdHlsZS50b3AgPT0gKHRoaXMuZ2V0TGVuZ2h0KCkgLSB0aGlzLmdldFRodW1iKDEpLmNsaWVudEhlaWdodC8yKSArICdweCcpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gJzEwMCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VMaW5lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsVG9Ub29sdGlwKHRvb2x0aXBOb2RlOiBIVE1MRGl2RWxlbWVudCwgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlLCBtYXNrOiBzdHJpbmcgPSAndmFsJyk6IHZvaWQge1xyXG4gICAgICAgIHRvb2x0aXBOb2RlLnRleHRDb250ZW50ID0gZXZhbChtYXNrKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kVGh1bWJQb3NpdGlvbihuZXdTdGVwLCBudW1PZlN0ZXBzKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRMZW5naHQoKSAvIG51bU9mU3RlcHMgKiBuZXdTdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIG9uZVN0ZXBMZW5naHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGVuZ2h0KCkgLyB0aGlzLl9udW1iZXJPZlN0ZXBzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZU5vZGUobm9kZTogSFRNTERpdkVsZW1lbnQpOiB1bmRlZmluZWQge1xyXG4gICAgICAgIG5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBzY2FsZVN0ZXBWYWxpZGF0aW9uKG1vZGVsOiBJTW9kZWwsIHN0ZXA6IG51bWJlcik6IG51bWJlciB7XHJcblxyXG4gICAgICAgIGxldCBzdGVwSXNWYWxpZDogYm9vbGVhbjtcclxuICAgICAgICBsZXQgdGVzdDogbnVtYmVyXHJcblxyXG4gICAgICAgIC8vINC+0LrRgNGD0LPQu9GP0LXQvCwg0YfRgtC+0LHRiyDQuNC30LHQtdC20LDRgtGMINC/0YDQvtCx0LvQtdC8INC/0YDQuCDQstGL0YfQuNGB0LvQtdC90LjRj9GFINGBINC/0LvQsNCy0LDRjtGJ0LXQuSDRgtC+0YfQutC+0LlcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyhzdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKG1vZGVsLmdldFN0ZXAoKSkgKTtcclxuXHJcbiAgICAgICAgc3RlcElzVmFsaWQgPSB0aGlzLmlzTnVtZXJpYyhzdGVwKTtcclxuXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXREYXRhRm9ybWF0KCkgPT0gJ2RhdGUnICYmICggc3RlcCAlICgyNCAqIDM2MDAgKiAxMDAwKSAhPSAwICkpIHtcclxuICAgICAgICAgICAgc3RlcCA9IHN0ZXAgKiAyNCAqIDM2MDAgKiAxMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZXN0ID0gKHN0ZXAgKiBNYXRoLnBvdygxMCwgbikpIC8gKG1vZGVsLmdldFN0ZXAoKSAqIE1hdGgucG93KDEwLCBuKSk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBzdGVwSXNWYWxpZCA9IHN0ZXBJc1ZhbGlkICYmICggdGVzdCAlIDEgPT0gMCApO1xyXG5cclxuICAgICAgICB0ZXN0ID0gKyggbW9kZWwuZ2V0TWF4VmFsKCkgLSBtb2RlbC5nZXRNaW5WYWwoKSApLnRvRml4ZWQobik7XHJcbiAgICAgICAgdGVzdCA9ICggdGVzdCAqIE1hdGgucG93KDEwLCBuKSApIC8gKCBzdGVwICogTWF0aC5wb3coMTAsIG4pICk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBzdGVwSXNWYWxpZCA9IHN0ZXBJc1ZhbGlkICYmICggdGVzdCAlIDEgPT0gMCApO1xyXG5cclxuICAgICAgICBzdGVwID0gc3RlcElzVmFsaWQgPyBzdGVwIDogbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIHJldHVybiBzdGVwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDQv9GA0LjQstCw0YLQvdGL0LUg0YTRg9C90LrRhtC40LhcclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkVGh1bWIoc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQsIHRodW1iQ2xhc3M/OiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IHRodW1iOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAgICAgXHJcbiAgICAgICAgdGh1bWIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX190aHVtYicpO1xyXG4gICAgICAgIHRodW1iQ2xhc3MgPyB0aHVtYi5jbGFzc0xpc3QuYWRkKHRodW1iQ2xhc3MpIDogZmFsc2U7XHJcbiAgICAgICAgc2xpZGVyTm9kZS5hcHBlbmQodGh1bWIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGh1bWI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZExpbmUoc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQsIGxpbmVDbGFzcz86IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBsZXQgbGluZTogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgICAgIFxyXG4gICAgICAgIGxpbmUuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19saW5lJyk7XHJcbiAgICAgICAgbGluZUNsYXNzID8gbGluZS5jbGFzc0xpc3QuYWRkKGxpbmVDbGFzcykgOiBmYWxzZTtcclxuICAgICAgICBzbGlkZXJOb2RlLmFwcGVuZChsaW5lKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpbmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZFRvb2x0aXAodGh1bWJOb2RlOiBIVE1MRGl2RWxlbWVudCwgdG9vbHRpcENsYXNzPzogc3RyaW5nKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGxldCB0b29sdGlwOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRvb2x0aXAuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX190b29sdGlwJyk7XHJcbiAgICAgICAgdG9vbHRpcENsYXNzID8gdG9vbHRpcC5jbGFzc0xpc3QuYWRkKHRvb2x0aXBDbGFzcykgOiBmYWxzZTtcclxuICAgICAgICB0aHVtYk5vZGUuYXBwZW5kKHRvb2x0aXApO1xyXG5cclxuICAgICAgICByZXR1cm4gdG9vbHRpcDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBsZW5ndGhWYWxpZGF0aW9uKHN0cjogYW55KSB7XHJcbiAgICAgICAgaWYgKCB0eXBlb2YgKCcnICsgc3RyKSA9PSAnc3RyaW5nJyApIHtcclxuICAgICAgICAgICAgbGV0IHIgPSAoJycgKyBzdHIpLm1hdGNoKC9eXFxkezEsM31bLixdP1xcZCoocHh8ZW18cmVtfCUpPyQvaSk7XHJcbiAgICAgICAgICAgIGlmICggciAmJiB0aGlzLmlzTnVtZXJpYyhyWzBdKSApIHsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gclswXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJywnLCAnLicpICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggciApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnLCcsICcuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaWR0aCAob3IgaGVpZ2h0KSBzaG91bGQgYmUgdmFsaWQgdG8gY3NzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc051bWVyaWMobjogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiAhaXNOYU4obiAtIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVjaW1hbFBsYWNlcyhudW06IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgLy8g0LrQvtC70LjRh9C10YHRgtCy0L4g0LfQvdCw0LrQvtCyINC/0L7RgdC70LUg0LfQsNC/0Y/RgtC+0LlcclxuICAgICAgICByZXR1cm4gfihudW0gKyAnJykuaW5kZXhPZignLicpID8gKG51bSArICcnKS5zcGxpdCgnLicpWzFdLmxlbmd0aCA6IDA7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBpbnRlcmZhY2UgSU9wdGlvbnMge1xyXG4gICAgLy8gTW9kZWwgb3B0aW9uc1xyXG4gICAgZGF0YUZvcm1hdDogc3RyaW5nO1xyXG4gICAgdmFsdWU6IG51bWJlciB8IHN0cmluZyB8IG51bGw7XHJcbiAgICBtaW5WYWw6IG51bWJlciB8IHN0cmluZztcclxuICAgIG1heFZhbDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgc3RlcDogbnVtYmVyOyAgICBcclxuICAgIHJldmVyc2U6IGJvb2xlYW47XHJcbiAgICByYW5nZTogW251bWJlciwgbnVtYmVyXSB8IFtzdHJpbmcsIHN0cmluZ10gfCBudWxsOyBcclxuICAgIGN1c3RvbVZhbHVlcz86IHN0cmluZ1tdO1xyXG4gICAgdmFsdWVJbkN1c3RvbVZhbHVlcz86IHN0cmluZztcclxuICAgIHJhbmdlSW5DdXN0b21WYWx1ZXM/OiBzdHJpbmc7XHJcblxyXG5cclxuICAgIC8vIFZpZXcgb3B0aW9uc1xyXG4gICAgbGVuZ3RoOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICB2ZXJ0aWNhbDogYm9vbGVhbjtcclxuICAgIHRvb2x0aXA6IGJvb2xlYW47XHJcbiAgICB0b29sdGlwTWFzazogc3RyaW5nO1xyXG4gICAgc2NhbGU6IGJvb2xlYW47XHJcbiAgICBzY2FsZVN0ZXA6IG51bWJlcjtcclxuICAgIHNjYWxlTWFzazogc3RyaW5nO1xyXG59XHJcblxyXG52YXIgZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zID0ge1xyXG4gICAgLy8gTW9kZWwgb3B0aW9uc1xyXG4gICAgLy8g0LIgcmFuZ2Ug0Lgg0LIgbWluINC4IG1heCDRgdC70LXQstCwINGC0L4sINGH0YLQviDRgdC70LXQstCwINC90LAg0YHQu9Cw0LnQtNC10YDQtVxyXG4gICAgZGF0YUZvcm1hdDogJ251bWVyaWMnLFxyXG4gICAgdmFsdWU6IG51bGwsICAgICAgLy8g0LIg0L3QsNGH0LDQu9GM0L3Ri9GFINC90LDRgdGC0YDQvtC50LrQsNGFINC90LUg0L7Qv9GA0LXQtNC10LvQtdC90YtcclxuICAgIG1pblZhbDogMCwgICAgICAgIC8vINC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1INC40LvQuCDQv9GA0L7QvNC10LbRg9GC0L7Qui5cclxuICAgIG1heFZhbDogMTAsICAgICAgIC8vINC10YHQu9C4INC+0L3QuCDQvdC1INGD0LrQsNC30LDQvdGLINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8LCDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSBcclxuICAgIHN0ZXA6IDEsICAgICAgICAgIC8vICh2YWx1ZSkg0Lgg0L/QvtC30LjRhtC40Y8g0LHQtdCz0YPQvdC60LAg0YDQsNCy0L3RiyDQvNC40L3QuNC80LDQu9GM0L3QvtC80YMg0LfQvdCw0YfQtdC90LjRjlxyXG4gICAgcmV2ZXJzZTogZmFsc2UsXHJcbiAgICByYW5nZTogbnVsbCxcclxuICAgIFxyXG4gICAgbGVuZ3RoOiAnMzAwcHgnLFxyXG4gICAgdmVydGljYWw6IGZhbHNlLFxyXG4gICAgdG9vbHRpcDogZmFsc2UsXHJcbiAgICB0b29sdGlwTWFzazogXCJ2YWxcIixcclxuICAgIHNjYWxlOiBmYWxzZSxcclxuICAgIHNjYWxlU3RlcDogbnVsbCxcclxuICAgIHNjYWxlTWFzazogXCJ2YWxcIixcclxufVxyXG5cclxuZXhwb3J0IHsgZGVmYXVsdE9wdGlvbnMgfTtcclxuIiwiaW1wb3J0IE1vZGVsLCB7SU1vZGVsfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IFZpZXcsIHtJVmlld30gZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IFByZXNlbnRlciBmcm9tICcuL1ByZXNlbnRlcic7XHJcbmltcG9ydCB7ZGVmYXVsdE9wdGlvbnN9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5cclxuaW1wb3J0IHtPYnNlcnZlcn0gZnJvbSAnLi9PYnNlcnZlcic7XHJcbmltcG9ydCB7SU9ic2VydmVyfSBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IFN1YmplY3QgIGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5cclxuXHJcbihmdW5jdGlvbigkKXtcclxuXHJcbiAgdmFyIG1ldGhvZHM6IE9iamVjdCA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiggb3B0aW9ucz86IGFueSApIHtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgXHJcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgZGF0YSA9ICR0aGlzLmRhdGEoJ3NsaWRlckRhdGEnKTtcclxuICAgICAgICBsZXQgc2xpZGVyID0gJHRoaXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0L/Qu9Cw0LPQuNC9INC10YnRkSDQvdC1INC/0YDQvtC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDQvVxyXG4gICAgICAgIGlmICggISBkYXRhICkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgbGV0IG1vZGVsOiBJTW9kZWwgPSBuZXcgTW9kZWwob3B0aW9ucyk7XHJcbiAgICAgICAgICAvLyDQv9C10YDQtdC00LDQtdC8INC80L7QtNC10LvRjCDQsiDQv9GA0LXQtNGB0YLQsNCy0LvQtdC90LjQtSDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINC40Lcg0L3QtdC1IFxyXG4gICAgICAgICAgLy8g0LrQvtGA0YDQtdC60YLQvdGL0YUg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgICBsZXQgdmlldzogSVZpZXcgPSBuZXcgVmlldyhtb2RlbCwgb3B0aW9ucywgdGhpcyk7XHJcblxyXG4gICAgICAgICAgLy8g0YHRg9Cx0YrQtdC60YIgLSDRjdGC0L4g0L3QsNCx0LvRjtC00LXQvdC40LVcclxuICAgICAgICAgIC8vINC+0L0g0YXRgNCw0L3QuNGCINC30L3QsNGH0LXQvdC40LUgdmFsINC40LvQuCDQv9GA0L7QvNC10LbRg9GC0L7QulxyXG4gICAgICAgICAgbGV0IHZhbDogYW55IHwgW2FueSwgYW55XTtcclxuICAgICAgICAgIHZhbCA9IG1vZGVsLmdldFZhbCgpIHx8IG1vZGVsLmdldFJhbmdlKCk7IFxyXG4gICAgICAgICAgbGV0IHN1YmplY3QgPSBuZXcgU3ViamVjdCh2YWwpO1xyXG5cclxuICAgICAgICAgIGxldCBwcmVzZW50ZXIgPSBuZXcgUHJlc2VudGVyKG1vZGVsLCB2aWV3LCBzdWJqZWN0KTtcclxuXHJcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnLCB7XHJcbiAgICAgICAgICAgIHNsaWRlciA6IHNsaWRlcixcclxuICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxyXG4gICAgICAgICAgICB2aWV3OiB2aWV3LFxyXG4gICAgICAgICAgICBwcmVzZW50ZXI6IHByZXNlbnRlcixcclxuICAgICAgICAgICAgc3ViamVjdDogc3ViamVjdFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uKCBvcHRpb25zOiBhbnkgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgcHJlc2VudGVyID0gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykucHJlc2VudGVyO1xyXG4gICAgICAgIHByZXNlbnRlci5jaGFuZ2Uob3B0aW9ucyk7XHJcblxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBkYXRhID0gJHRoaXMuZGF0YSgnc2xpZGVyRGF0YScpO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykudW5iaW5kKCcuc2xpZGVyJyk7XHJcbiAgICAgICAgZGF0YS5zbGlkZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgJHRoaXMucmVtb3ZlRGF0YSgnc2xpZGVyRGF0YScpO1xyXG4gICAgICAgIFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgb2JzZXJ2ZTogZnVuY3Rpb24oIGZ1bmMgKSB7XHJcblxyXG4gICAgICAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0L3QsNCx0LvRjtC00LDRgtC10LvRj1xyXG4gICAgICAvLyDQsNGA0LPRg9C80LXQvdGCIC0g0Y3RgtCwINGE0YPQvdC60YbQuNGPINC60L7RgtC+0YDQsNGPINCx0YPQtNC10YIg0L7QsdGA0LDQsdCw0YLRi9Cy0LDRgtGMINC40LfQvNC10L3QtdC90LjRj1xyXG4gICAgICBsZXQgc3ViamVjdCA9ICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScpLnN1YmplY3Q7XHJcbiAgICAgIGxldCBvYnNlcnZlcjogSU9ic2VydmVyID0gbmV3IE9ic2VydmVyKCBmdW5jICk7XHJcblxyXG4gICAgICBzdWJqZWN0LmF0dGFjaChvYnNlcnZlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBcclxuICBqUXVlcnkuZm4uc2xpZGVyID0gZnVuY3Rpb24oIG1ldGhvZCApIHtcclxuXHJcbiAgICAvLyDQu9C+0LPQuNC60LAg0LLRi9C30L7QstCwINC80LXRgtC+0LTQsFxyXG4gICAgaWYgKCBtZXRob2RzW21ldGhvZCBhcyBzdHJpbmddICkge1xyXG4gICAgICByZXR1cm4gbWV0aG9kc1sgbWV0aG9kIGFzIHN0cmluZyBdLmFwcGx5KCB0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCggYXJndW1lbnRzLCAxICkpO1xyXG4gICAgfSBlbHNlIGlmICggdHlwZW9mIG1ldGhvZCA9PT0gJ29iamVjdCcgfHwgISBtZXRob2QgKSB7XHJcblxyXG4gICAgICAvLyA/Pz8/XHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgcmV0dXJuIG1ldGhvZHMuaW5pdC5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkLmVycm9yKCAnTWV0aG9kIGNhbGxlZCAnICsgIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3QgZm9yIEpRdWVyeS5zbGlkZXInICk7XHJcbiAgICB9IFxyXG5cclxuICB9O1xyXG5cclxufSkoalF1ZXJ5KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==