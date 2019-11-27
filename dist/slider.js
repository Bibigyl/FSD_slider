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
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            if (!model.getRange()) {
                view.getThumb().addEventListener("touchstart", this.thumbOnDown);
            }
            else {
                view.getThumb(1).addEventListener("touchstart", this.thumbOnDown);
                view.getThumb(2).addEventListener("touchstart", this.thumbOnDown);
            }
        }
        else {
            if (!model.getRange()) {
                view.getThumb().addEventListener("mousedown", this.thumbOnDown);
            }
            else {
                view.getThumb(1).addEventListener("mousedown", this.thumbOnDown);
                view.getThumb(2).addEventListener("mousedown", this.thumbOnDown);
            }
        }
        view.getSlider().addEventListener("click", this.sliderOnClick);
    }
    Presenter.prototype.thumbOnDown = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this._activeThumb = event.currentTarget;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.addEventListener('touchmove', this.thumbOnMove);
            document.addEventListener('touchend', this.thumbOnUp);
        }
        else {
            document.addEventListener('mousemove', this.thumbOnMove);
            document.addEventListener('mouseup', this.thumbOnUp);
        }
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
            eventPos = event.clientX || event.touches[0].pageX;
            thumbPosition = eventPos - sliderNode.getBoundingClientRect().left - sliderBorder;
        }
        else {
            sliderBorder = (sliderNode.offsetHeight - sliderLenght) / 2;
            eventPos = event.clientY || event.touches[0].pageY;
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
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.removeEventListener('touchend', this.thumbOnUp);
            document.removeEventListener('touchmove', this.thumbOnMove);
        }
        else {
            document.removeEventListener('mouseup', this.thumbOnUp);
            document.removeEventListener('mousemove', this.thumbOnMove);
        }
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
            view.getThumb().addEventListener("mousedown", this.thumbOnDown);
        }
        if (changeValToRange) {
            view.changeValToRange(model);
            view.getThumb(1).addEventListener("mousedown", this.thumbOnDown);
            view.getThumb(2).addEventListener("mousedown", this.thumbOnDown);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0T3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDhGQUE0RDtBQTRDNUQ7SUFZSSxlQUFZLFVBQW9CO1FBRTVCLElBQUksT0FBTyxHQUFhLFVBQVUsQ0FBQztRQUluQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FB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LENBQUUsTUFBZ0IsQ0FBRSxDQUFDLEtBQUssQ0FBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFFLFNBQVMsRUFBRSxDQUFDLENBQUUsQ0FBQyxDQUFDO1NBQzdGO2FBQU0sSUFBSyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBRSxNQUFNLEVBQUc7WUFJbkQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRSxJQUFJLEVBQUUsU0FBUyxDQUFFLENBQUM7U0FDOUM7YUFBTTtZQUNMLENBQUMsQ0FBQyxLQUFLLENBQUUsZ0JBQWdCLEdBQUksTUFBTSxHQUFHLG1DQUFtQyxDQUFFLENBQUM7U0FDN0U7SUFFSCxDQUFDLENBQUM7QUFFSixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyIsImZpbGUiOiJzbGlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCBJT3B0aW9ucywgeyBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdE9wdGlvbnMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTW9kZWwge1xyXG4gICAgLy8gMVxyXG4gICAgZ2V0VmFsKCk6IG51bWJlcjtcclxuICAgIHNldFZhbChuZXdWYWw6IG51bWJlcik6IHZvaWQ7XHJcbiAgICAvLyAyXHJcbiAgICBnZXRSYW5nZSgpOiBbbnVtYmVyLCBudW1iZXJdO1xyXG4gICAgc2V0UmFuZ2UobmV3UmFuZ2U6IFtudW1iZXIsIG51bWJlcl0pOiB2b2lkO1xyXG4gICAgLy8gM1xyXG4gICAgZ2V0U3RlcCgpOiBudW1iZXI7XHJcbiAgICAvLyA0XHJcbiAgICBnZXRNaW5WYWwoKTogbnVtYmVyO1xyXG4gICAgLy8gNVxyXG4gICAgZ2V0TWF4VmFsKCk6IG51bWJlcjtcclxuICAgIC8vIDZcclxuICAgIGdldFJldmVyc2UoKTogYm9vbGVhbjtcclxuICAgIC8vIDdcclxuICAgIGdldEN1c3RvbVZhbHVlcygpOiBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcclxuICAgIC8vIDhcclxuICAgIGdldERhdGFGb3JtYXQoKTogc3RyaW5nO1xyXG4gICAgLy8gOVxyXG4gICAgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zO1xyXG5cclxuICAgIC8vINCy0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90YvQtSDQvNC10YLQvtC00YtcclxuICAgIGZpbmRQb3NpdGlvbkluQXJyKHZhbDogYW55LCBhcnI/OiBhbnlbXSk6IG51bWJlcjtcclxuICAgIGdldFN0ZXBOdW1iZXIodmFsOiBudW1iZXIpOiBudW1iZXI7XHJcbiAgICB0cmFuc2xhdGVCeVN0ZXAoc3RlcDogbnVtYmVyKTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTsgLy8g0L/QviDRiNCw0LPRg1xyXG4gICAgdHJhbnNsYXRlKHZhbDogbnVtYmVyKTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTsgLy8g0L/QviDQstCw0LvQuNC00L3QvtC80YMg0LfQvdCw0YfQtdC90LjRjlxyXG4gICAgbnVtYmVyT2ZTdGVwcygpOiBudW1iZXI7XHJcbiAgICBjaGFuZ2UobmV3T3B0aW9uczogYW55KTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTW9kZWxPcHRpb25zIHtcclxuICAgIGRhdGFGb3JtYXQ6IHN0cmluZztcclxuICAgIHZhbHVlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgbWluVmFsOiBudW1iZXI7XHJcbiAgICBtYXhWYWw6IG51bWJlcjtcclxuICAgIHN0ZXA6IG51bWJlcjtcclxuICAgIHJldmVyc2U6IGJvb2xlYW47XHJcbiAgICByYW5nZTogW251bWJlciwgbnVtYmVyXSB8IG51bGw7IFxyXG4gICAgY3VzdG9tVmFsdWVzPzogc3RyaW5nW107XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGVsIGltcGxlbWVudHMgSU1vZGVsIHtcclxuXHJcbiAgICBwcml2YXRlIF9kYXRhRm9ybWF0OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF92YWw6IG51bWJlciB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9taW5WYWw6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX21heFZhbDpudW1iZXI7ICAgXHJcbiAgICBwcml2YXRlIF9zdGVwOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9yZXZlcnNlOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBfY3VzdG9tVmFsdWVzPzogc3RyaW5nW10gfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9vcHRpb25zOiBJTW9kZWxPcHRpb25zIHwgYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFsbE9wdGlvbnM6IElPcHRpb25zKSB7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zOiBJT3B0aW9ucyA9IGFsbE9wdGlvbnM7XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0L3QtSDRg9C60LDQt9Cw0L3QviDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwg0YPQutCw0LfRi9Cy0LDQtdC8INC80LjQvdC40LzQsNC70YzQvdC+0LUuXHJcbiAgICAgICAgLy8g0Y3RgtC+INC90LXQvtCx0YXQvtC00LjQvNC+INGH0YLQvtCx0Ysg0L/RgNC+0LnRgtC4INCy0LDQu9C40LTQsNGG0LjRjiDQuCDQv9C+0YHRgtCw0LLQuNGC0Ywg0LHQtdCz0YPQvdC+0Log0YHQvtCz0LvQsNGB0L3QviDRiNCw0LPRgy5cclxuICAgICAgICAvLyDQtdGB0LvQuCDRg9C60LDQt9Cw0L0gcmFuZ2UsINC80LXQvdGP0LXQvCDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQvdCwIG51bGxcclxuICAgICAgICBvcHRpb25zLnZhbHVlID0gb3B0aW9ucy52YWx1ZSA/IG9wdGlvbnMudmFsdWUgOiBvcHRpb25zLm1pblZhbDtcclxuICAgICAgICBsZXQgdmFsaWRPcHRpb25zOiBJTW9kZWxPcHRpb25zO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnbnVtZXJpYycgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMubnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ2RhdGUnICkge1xyXG4gICAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LTQsNGC0Ysg0LIg0L3QsNGH0LDQu9GM0L3QvtC8INGE0L7RgtGA0LzQsNGC0LUsINC90LDQv9GAIGRkL21tL3l5eXlcclxuICAgICAgICAgICAgLy8g0YfRgtC+0LHRiyDQvNC+0LbQvdC+INCx0YvQu9C+INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCDQuNGFINC00LvRjyDQuNC30LzQtdC90LXQvdC40Y8g0LzQvtC00LXQu9C4XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBhbGxPcHRpb25zKTtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy5kYXRlRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnY3VzdG9tJyApIHtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy5jdXN0b21Gb3JtYXRWYWxpZGF0aW9uKG9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlcyA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9mIGRhdGEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RhdGFGb3JtYXQgPSB2YWxpZE9wdGlvbnMuZGF0YUZvcm1hdDtcclxuICAgICAgICB0aGlzLl92YWwgPSB2YWxpZE9wdGlvbnMudmFsdWU7XHJcbiAgICAgICAgdGhpcy5fbWluVmFsID0gdmFsaWRPcHRpb25zLm1pblZhbDtcclxuICAgICAgICB0aGlzLl9tYXhWYWwgPSB2YWxpZE9wdGlvbnMubWF4VmFsO1xyXG4gICAgICAgIHRoaXMuX3N0ZXAgPSB2YWxpZE9wdGlvbnMuc3RlcDtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlID0gdmFsaWRPcHRpb25zLnJldmVyc2U7XHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSB2YWxpZE9wdGlvbnMucmFuZ2U7XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tVmFsdWVzID0gdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlczsgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCAhPSAnZGF0ZScpIHRoaXMuX29wdGlvbnMgPSB2YWxpZE9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMVxyXG4gICAgZ2V0VmFsKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbDtcclxuICAgIH1cclxuICAgIHNldFZhbChuZXdWYWw6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXJlTnVtZXJpYyhuZXdWYWwpO1xyXG4gICAgICAgIHRoaXMub25lVmFsdWVWYWxpZGF0aW9uKHRoaXMuX21pblZhbCwgdGhpcy5fbWF4VmFsLCBuZXdWYWwsIHRoaXMuX3N0ZXApO1xyXG4gICAgICAgIHRoaXMuX3ZhbCA9IG5ld1ZhbDtcclxuICAgIH1cclxuICAgIC8vIDJcclxuICAgIGdldFJhbmdlKCk6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYW5nZTtcclxuICAgIH1cclxuICAgIHNldFJhbmdlKG5ld1JhbmdlOiBbbnVtYmVyLCBudW1iZXJdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcmVOdW1lcmljKG5ld1JhbmdlWzBdLCBuZXdSYW5nZVsxXSlcclxuICAgICAgICB0aGlzLnJhbmdlVmFsaWRhdGlvbih0aGlzLl9taW5WYWwsIHRoaXMuX21heFZhbCwgbmV3UmFuZ2UsIHRoaXMuX3N0ZXApO1xyXG5cclxuICAgICAgICBpZiAoIHRoaXMubWluTWF4VmFsaWRhdGlvbihuZXdSYW5nZVswXSwgbmV3UmFuZ2VbMV0sIHRoaXMuX3JldmVyc2UpICkge1xyXG4gICAgICAgICAgICB0aGlzLl9yYW5nZSA9IG5ld1JhbmdlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhbmdlID0gW25ld1JhbmdlWzFdLCBuZXdSYW5nZVswXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yYW5nZSA9IG5ld1JhbmdlO1xyXG4gICAgfVxyXG4gICAgLy8gM1xyXG4gICAgZ2V0U3RlcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwO1xyXG4gICAgfVxyXG4gICAgLy8gNFxyXG4gICAgZ2V0TWluVmFsKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pblZhbDtcclxuICAgIH1cclxuICAgIC8vIDVcclxuICAgIGdldE1heFZhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhWYWw7XHJcbiAgICB9XHJcbiAgICAvLyA2XHJcbiAgICBnZXRSZXZlcnNlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXZlcnNlO1xyXG4gICAgfVxyXG4gICAgLy8gN1xyXG4gICAgZ2V0Q3VzdG9tVmFsdWVzKCk6IGFueVtdIHtcclxuICAgICAgICBpZiAodGhpcy5fY3VzdG9tVmFsdWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyA4XHJcbiAgICBnZXREYXRhRm9ybWF0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFGb3JtYXQ7XHJcbiAgICB9XHJcbiAgICBnZXRPcHRpb25zKCk6IElNb2RlbE9wdGlvbnMge1xyXG5cclxuICAgICAgICBsZXQgb3B0czogSU1vZGVsT3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fcmFuZ2UgKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsOiBhbnk7XHJcbiAgICAgICAgICAgIC8vdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3ZhbCApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnRyYW5zbGF0ZSggdGhpcy5fdmFsICk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gKCcwJyArIHZhbC5nZXREYXRlKCkpLnNsaWNlKC0yKSArIFxyXG4gICAgICAgICAgICAgICAgJy8nICsgKCcwJyArICgxICsgdmFsLmdldE1vbnRoKCkpICkuc2xpY2UoLTIpICtcclxuICAgICAgICAgICAgICAgICcvJyArICggdmFsLmdldEZ1bGxZZWFyKCkgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuX3ZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0cy52YWx1ZSA9IHZhbDtcclxuICAgICAgICAgICAgb3B0cy5yYW5nZSA9IG51bGw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsOiBhbnk7XHJcbiAgICAgICAgICAgIGxldCBhcnI6IFthbnksIGFueV0gPSBbbnVsbCwgbnVsbF07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCAhPSAnZGF0ZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhcnIgPSB0aGlzLl9yYW5nZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnZGF0ZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnRyYW5zbGF0ZSggdGhpcy5fcmFuZ2VbMF0gKTtcclxuICAgICAgICAgICAgICAgIHZhbCA9ICgnMCcgKyB2YWwuZ2V0RGF0ZSgpKS5zbGljZSgtMikgKyBcclxuICAgICAgICAgICAgICAgICcvJyArICgnMCcgKyAoMSArIHZhbC5nZXRNb250aCgpKSApLnNsaWNlKC0yKSArXHJcbiAgICAgICAgICAgICAgICAnLycgKyB2YWwuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhcnJbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3JhbmdlWzFdICk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSAoJzAnICsgdmFsLmdldERhdGUoKSkuc2xpY2UoLTIpICsgXHJcbiAgICAgICAgICAgICAgICAnLycgKyAoJzAnICsgKDEgKyB2YWwuZ2V0TW9udGgoKSkgKS5zbGljZSgtMikgK1xyXG4gICAgICAgICAgICAgICAgJy8nICsgdmFsLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvcHRzLnZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgb3B0cy5yYW5nZSA9IGFycjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINCy0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90YvQtSDQvNC10YLQvtC00YtcclxuICAgIGZpbmRQb3NpdGlvbkluQXJyKHZhbDogYW55LCBhcnI/OiBhbnlbXSk6IG51bWJlciB7XHJcbiAgICAgICAgLy8g0LjRidC10YIg0L/QvtC30LjRhtC40Y4gdmFsINCyIGN1c3RvbSB2YWx1ZXNcclxuICAgICAgICAvLyDRgtCw0Log0LbQtSDQvNC+0LbQtdGCINCx0YvRgtGMINC40YHQv9C+0LvRjNC30L7QstCw0L0g0YEg0LvRjtCx0YvQvCDQtNGA0YPQs9C4INC80LDRgdGB0LjQstC+0LxcclxuICAgICAgICBpZiAoIGFyciAmJiBhcnIuaW5kZXhPZih2YWwpICE9IC0xICkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyLmluZGV4T2YodmFsKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCBhcnIgJiYgYXJyLmluZGV4T2YodmFsKSA9PSAtMSApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW50IGZpbmQgdmFsdWUgaW4gYXJyYXknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggIXRoaXMuX2N1c3RvbVZhbHVlcyApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5fY3VzdG9tVmFsdWVzLmluZGV4T2YodmFsKSAhPSAtMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbVZhbHVlcy5pbmRleE9mKHZhbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgdmFsaWQgdmFsdWUgZm9yIGN1c3RvbSB2YWx1ZXMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RlcE51bWJlcih2YWw6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgLy8g0L3QsNGF0L7QtNC40YIsINC90LAg0LrQsNC60L7QvCDQv9C+INGB0YfQtdGC0YMg0YjQsNCz0LUg0YHRgtC+0LjRgiB2YWxcclxuICAgICAgICAvLyDQv9GA0LjQvNC10L3Rj9GC0Ywg0YLQvtC70YzQutC+INC00LvRjyDQvdC10YLRgNCw0L3RgdGE0L7RgNC80LjRgNC+0LLQsNC90L3Ri9GFLCDQv9GA0LDQstC40LvRjNC90YvRhSDQt9C90LDRh9C10L3QuNC5IVxyXG4gICAgICAgIGxldCBzdGVwTnVtOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcblxyXG4gICAgICAgIGxldCBhOiBudW1iZXIgPSArKHZhbCAtIHRoaXMuX21pblZhbCkudG9GaXhlZChuKTtcclxuICAgICAgICBsZXQgYjogbnVtYmVyID0gKyh0aGlzLl9tYXhWYWwgLSB0aGlzLl9taW5WYWwpLnRvRml4ZWQobilcclxuICAgICAgICBcclxuICAgICAgICBzdGVwTnVtID0gKyggYSAqIHRoaXMubnVtYmVyT2ZTdGVwcygpIC8gYiApLnRvRml4ZWQoKTtcclxuICAgICAgICBzdGVwTnVtID0gTWF0aC5hYnMoc3RlcE51bSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGVwTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zbGF0ZUJ5U3RlcChzdGVwOiBudW1iZXIpOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnY3VzdG9tJykge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5fcmV2ZXJzZSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXNbc3RlcF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzW3RoaXMuX2N1c3RvbVZhbHVlcy5sZW5ndGggLSBzdGVwIC0gMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcbiAgICAgICAgICAgIGxldCByOiBudW1iZXIgPSAhdGhpcy5fcmV2ZXJzZSA/IDEgOiAtMTtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyID0gKyggKCt0aGlzLl9taW5WYWwpICsgKCt0aGlzLl9zdGVwKSAqICgrc3RlcCkgKiAoK3IpICkudG9GaXhlZChuKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdkYXRlJykgeyBcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpOyBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgcmV0dXJuIHZhbDsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNsYXRlKHZhbCk6IG51bWJlciB8IHN0cmluZyB8IERhdGUge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnY3VzdG9tJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzW3ZhbF07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnZGF0ZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbCk7IFxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbnVtYmVyT2ZTdGVwcygpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fbWluVmFsKSApO1xyXG4gICAgICAgIG4gPSBNYXRoLnBvdygxMCwgbik7XHJcbiAgICAgICAgcmV0dXJuICggTWF0aC5hYnModGhpcy5fbWF4VmFsIC0gdGhpcy5fbWluVmFsKSAqIG4gKSAvICggdGhpcy5fc3RlcCAqIG4gKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2UobmV3T3B0aW9uczogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBwcmV2T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IGFueSA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBuZXdPcHRpb25zKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgIT0gbnVsbCA/IG9wdGlvbnMudmFsdWUgOiBvcHRpb25zLm1pblZhbDtcclxuICAgICAgICBsZXQgdmFsaWRPcHRpb25zOiBJTW9kZWxPcHRpb25zO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnbnVtZXJpYycgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMubnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgcHJldk9wdGlvbnMgYXMgSU9wdGlvbnMpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ2RhdGUnICkge1xyXG4gICAgICAgICAgICB2YWxpZE9wdGlvbnMgPSB0aGlzLmRhdGVGb3JtYXRWYWxpZGF0aW9uKG9wdGlvbnMsIHByZXZPcHRpb25zIGFzIElPcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBuZXdPcHRpb25zKTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnY3VzdG9tJyApIHtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy5jdXN0b21Gb3JtYXRWYWxpZGF0aW9uKG9wdGlvbnMsIHByZXZPcHRpb25zIGFzIElPcHRpb25zKTtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlcyA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9mIGRhdGEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RhdGFGb3JtYXQgPSB2YWxpZE9wdGlvbnMuZGF0YUZvcm1hdDtcclxuICAgICAgICB0aGlzLl92YWwgPSB2YWxpZE9wdGlvbnMudmFsdWU7XHJcbiAgICAgICAgdGhpcy5fbWluVmFsID0gdmFsaWRPcHRpb25zLm1pblZhbDtcclxuICAgICAgICB0aGlzLl9tYXhWYWwgPSB2YWxpZE9wdGlvbnMubWF4VmFsO1xyXG4gICAgICAgIHRoaXMuX3N0ZXAgPSB2YWxpZE9wdGlvbnMuc3RlcDtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlID0gdmFsaWRPcHRpb25zLnJldmVyc2U7XHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSB2YWxpZE9wdGlvbnMucmFuZ2U7XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tVmFsdWVzID0gdmFsaWRPcHRpb25zLmN1c3RvbVZhbHVlczsgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCAhPSAnZGF0ZScpIHRoaXMuX29wdGlvbnMgPSB2YWxpZE9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBudW1lcmljRm9ybWF0VmFsaWRhdGlvbihhbGxPcHRpb25zOiBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zKTogSU1vZGVsT3B0aW9ucyB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IElPcHRpb25zID0gYWxsT3B0aW9ucztcclxuICAgICAgICAvLyDQv9GA0LjRgdCy0LDQuNCy0LDQtdC8INC90LDRh9Cw0LvRjNC90YvQvCDQvtC/0YbQuNGP0Lwg0LTQtdGE0L7Qu9GC0L3Ri9C1INC30L3QsNGH0LXQvdC40Y8g0LjQtyBkZWZhdWx0T3B0aW9uc1xyXG4gICAgICAgIC8vINC90LDRh9Cw0LvRjNC90L7QvNGDINC30L3QsNGH0LXQvdC40Y4g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQvNC40L3QuNC80LDQu9GM0L3QvtC1XHJcbiAgICAgICAgLy8g0L/QviDQvNC10YDQtSDQv9GA0L7RhdC+0LbQtNC10L3QuNGPINCy0LDQu9C40LTQsNGG0LjQuCwg0LzQtdC90Y/QtdC8INC30L3QsNGH0LXQvdC40Y8g0L3QsCDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60LjQtVxyXG4gICAgICAgIGxldCBuZXdPcHRpb25zOiBJTW9kZWxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBkYXRhRm9ybWF0OiAnbnVtZXJpYycsXHJcbiAgICAgICAgICAgIHZhbHVlOiBkZWZhdWx0T3B0aW9ucy5taW5WYWwgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICBtaW5WYWw6IGRlZmF1bHRPcHRpb25zLm1pblZhbCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgIG1heFZhbDogZGVmYXVsdE9wdGlvbnMubWF4VmFsIGFzIG51bWJlcixcclxuICAgICAgICAgICAgc3RlcDogZGVmYXVsdE9wdGlvbnMuc3RlcCxcclxuICAgICAgICAgICAgcmV2ZXJzZTogZGVmYXVsdE9wdGlvbnMucmV2ZXJzZSxcclxuICAgICAgICAgICAgcmFuZ2U6IGRlZmF1bHRPcHRpb25zLnJhbmdlIGFzIFtudW1iZXIsIG51bWJlcl0sXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFyZU51bWVyaWMob3B0aW9ucy5tYXhWYWwsIG9wdGlvbnMubWluVmFsLCBvcHRpb25zLnN0ZXApO1xyXG5cclxuICAgICAgICBuZXdPcHRpb25zLnN0ZXAgPSBNYXRoLmFicyhvcHRpb25zLnN0ZXApO1xyXG4gICAgICAgIG5ld09wdGlvbnMucmV2ZXJzZSA9IG9wdGlvbnMucmV2ZXJzZSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICBuZXdPcHRpb25zLmRhdGFGb3JtYXQgPSBvcHRpb25zLmRhdGFGb3JtYXQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zdGVwVmFsaWRhdGlvbihvcHRpb25zLm1pblZhbCBhcyBudW1iZXIsIG9wdGlvbnMubWF4VmFsIGFzIG51bWJlciwgbmV3T3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0LzQuNC9INC4INC80LDQutGBINC/0LXRgNC10L/Rg9GC0LDQvdGLINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8LCDQvNC10L3Rj9C10Lwg0L/QvtGA0Y/QtNC+0LpcclxuICAgICAgICAvLyDQv9C+0LTRgNCw0LfRg9C80LXQstCw0LXRgtGB0Y8sINGH0YLQviBtaW4gLSDRjdGC0L4g0YLQviDRh9GC0L4g0YHQu9C10LLQsCDQvdCwINGB0LvQsNC50LTQtdGA0LUsIG1heCAtINGB0L/RgNCw0LLQsFxyXG4gICAgICAgIGlmICggdGhpcy5taW5NYXhWYWxpZGF0aW9uKG9wdGlvbnMubWluVmFsIGFzIG51bWJlciwgb3B0aW9ucy5tYXhWYWwgYXMgbnVtYmVyLCBuZXdPcHRpb25zLnJldmVyc2UpICkge1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLm1pblZhbCA9IG9wdGlvbnMubWluVmFsIGFzIG51bWJlcjtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5tYXhWYWwgPSBvcHRpb25zLm1heFZhbCBhcyBudW1iZXI7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5taW5WYWwgPSBvcHRpb25zLm1heFZhbCBhcyBudW1iZXI7XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMubWF4VmFsID0gb3B0aW9ucy5taW5WYWwgYXMgbnVtYmVyOyAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMucmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFuZ2VWYWxpZGF0aW9uKG5ld09wdGlvbnMubWluVmFsLCBuZXdPcHRpb25zLm1heFZhbCwgb3B0aW9ucy5yYW5nZSBhcyBbbnVtYmVyLCBudW1iZXJdLCBuZXdPcHRpb25zLnN0ZXApO1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQvNC40L0g0Lgg0LzQsNC60YEg0LIg0LTQuNCw0L/QsNC30L7QvdC1IHJhbmdlINC/0LXRgNC10L/Rg9GC0LDQvdGLINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8LCDQvNC10L3Rj9C10Lwg0L/QvtGA0Y/QtNC+0LpcclxuICAgICAgICAgICAgaWYgKCB0aGlzLm1pbk1heFZhbGlkYXRpb24ob3B0aW9ucy5yYW5nZVswXSBhcyBudW1iZXIsIG9wdGlvbnMucmFuZ2VbMV0gYXMgbnVtYmVyLCBuZXdPcHRpb25zLnJldmVyc2UpICkge1xyXG4gICAgICAgICAgICAgICAgbmV3T3B0aW9ucy5yYW5nZSA9IG9wdGlvbnMucmFuZ2UgYXMgW251bWJlciwgbnVtYmVyXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld09wdGlvbnMucmFuZ2UgPSBbb3B0aW9ucy5yYW5nZVsxXSBhcyBudW1iZXIsIG9wdGlvbnMucmFuZ2VbMF0gYXMgbnVtYmVyXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g0L7RgtC80LXQvdGP0LXQvCDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwg0LTQsNC20LUg0LXRgdC70Lgg0L7QvdC+INCy0LLQtdC00LXQvdC+INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMudmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDQt9Cw0L/Rg9GB0LrQsNC10Lwg0L/RgNC+0LLQtdGA0LrQuCDQtNC70Y8g0L3QsNGH0LDQu9GM0L3QvtCz0L4g0LfQvdCw0YfQtdC90LjRjywg0YLQvtC70YzQutC+INC10YHQu9C4INC90LUg0YPQutCw0LfQsNC9INC00LjQsNC/0LDQt9C+0L0gcmFuZ2VcclxuICAgICAgICAgICAgdGhpcy5hcmVOdW1lcmljKG9wdGlvbnMudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLm9uZVZhbHVlVmFsaWRhdGlvbihuZXdPcHRpb25zLm1pblZhbCwgbmV3T3B0aW9ucy5tYXhWYWwsIG9wdGlvbnMudmFsdWUgYXMgbnVtYmVyLCBuZXdPcHRpb25zLnN0ZXApO1xyXG5cclxuICAgICAgICAgICAgbmV3T3B0aW9ucy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgYXMgbnVtYmVyO1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLnJhbmdlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG5ld09wdGlvbnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgZGF0ZUZvcm1hdFZhbGlkYXRpb24oYWxsT3B0aW9uczogSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyk6IElNb2RlbE9wdGlvbnMge1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBJT3B0aW9ucyA9IGFsbE9wdGlvbnM7XHJcblxyXG4gICAgICAgIHRoaXMuY3VzdG9tRGF0ZVZhbGlkYXRpb24ob3B0aW9ucy5taW5WYWwsIG9wdGlvbnMubWF4VmFsKTtcclxuICAgICAgICBvcHRpb25zLm1pblZhbCA9IHRoaXMudHJhbnNsYXRlRGF0ZVRvTnVtYmVyKG9wdGlvbnMubWluVmFsIGFzIHN0cmluZyk7XHJcbiAgICAgICAgb3B0aW9ucy5tYXhWYWwgPSB0aGlzLnRyYW5zbGF0ZURhdGVUb051bWJlcihvcHRpb25zLm1heFZhbCBhcyBzdHJpbmcpO1xyXG4gICAgICAgIG9wdGlvbnMuc3RlcCA9IHRoaXMudHJhbmxhdGVTdGVwVG9EYXRlRm9ybWF0KG9wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgIGlmICggQXJyYXkuaXNBcnJheShvcHRpb25zLnJhbmdlKSAmJiBvcHRpb25zLnJhbmdlLmxlbmd0aCA9PSAyICkge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LLQstC10Lsg0YfRgtC+INGC0L4g0LTRgNGD0LPQvtC1LCDQsCDQvdC1IHJhbmdlLCDQvdCwINGN0YLQvtC8XHJcbiAgICAgICAgICAgIC8vINGN0YLQsNC/0LUg0L7RiNC40LHQutC4INC90LUg0LHRg9C00LXRgi4g0J7QvdCwINC/0L7Rj9Cy0LjRgtGB0Y8g0L/RgNC4INC/0YDQvtCy0LXRgNC60LUg0L3QsCBudW1lcmljRm9ybWF0VmFsaWRhdGlvblxyXG4gICAgICAgICAgICAvLyAo0L/QvtGC0L7QvNGDINGH0YLQviByYW5nZSDRgtCw0Log0Lgg0L7RgdGC0LDQtdGC0YHRjyB0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbURhdGVWYWxpZGF0aW9uKG9wdGlvbnMucmFuZ2VbMF0sIG9wdGlvbnMucmFuZ2VbMV0pO1xyXG4gICAgICAgICAgICBvcHRpb25zLnJhbmdlWzBdID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5yYW5nZVswXSBhcyBzdHJpbmcpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnJhbmdlWzFdID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5yYW5nZVsxXSBhcyBzdHJpbmcpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbURhdGVWYWxpZGF0aW9uKG9wdGlvbnMudmFsdWUpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy52YWx1ZSBhcyBzdHJpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5udW1lcmljRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgY3VzdG9tRm9ybWF0VmFsaWRhdGlvbihhbGxPcHRpb25zOiBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zKTogSU1vZGVsT3B0aW9ucyB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IElPcHRpb25zID0gYWxsT3B0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy5jdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY3VzdG9tVmFsdWVzIGlzIHJlcXVpcmVkIG9wdGlvbiBmb3IgY3VzdG9tIGZvcm1hdCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoICFBcnJheS5pc0FycmF5KG9wdGlvbnMuY3VzdG9tVmFsdWVzKSB8fCBvcHRpb25zLmN1c3RvbVZhbHVlcy5sZW5ndGggPCAyICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2N1c3RvbVZhbHVlcyBzaG91bGQgYmUgYSByYW5nZSB3aXRoIHR3byBvciBtb3JlIGl0ZW1zLCBsaWtlIFsxLCAyLCBcImFcIl0nKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBvcHRpb25zLm1pblZhbCA9IDA7XHJcbiAgICAgICAgb3B0aW9ucy5tYXhWYWwgPSBvcHRpb25zLmN1c3RvbVZhbHVlcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIG9wdGlvbnMuc3RlcCA9IDE7XHJcblxyXG4gICAgICAgIC8vINC/0YDQuNC+0YDQuNGC0LXRgtGLINC+0L/RhtC40Lk6XHJcbiAgICAgICAgLy8gMS4gcmFuZ2Ug0LIg0YfQuNGB0LvQsNGFXHJcbiAgICAgICAgLy8gMi4gcmFuZ2Ug0LIg0LfQvdCw0YfQtdC90LjRj9GFXHJcbiAgICAgICAgLy8gMy4gdmFsdWUg0LrQsNC6INGH0LjRgdC70L5cclxuICAgICAgICAvLyA0LiB2YWx1ZSDQutCw0Log0LfQvdCw0YfQtdC90LjQtSBcclxuICAgICAgICBpZiAoIG9wdGlvbnMucmFuZ2UgfHwgb3B0aW9ucy5yYW5nZUluQ3VzdG9tVmFsdWVzICkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhb3B0aW9ucy5yYW5nZSAmJiBBcnJheS5pc0FycmF5KG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlcykgJiYgb3B0aW9ucy5yYW5nZUluQ3VzdG9tVmFsdWVzLmxlbmd0aCA9PSAyICkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINCy0LLQtdC7INGH0YLQviDRgtC+INC00YDRg9Cz0L7QtSwg0LAg0L3QtSByYW5nZSwg0L3QsCDRjdGC0L7QvFxyXG4gICAgICAgICAgICAgICAgLy8g0Y3RgtCw0L/QtSDQvtGI0LjQsdC60Lgg0L3QtSDQsdGD0LTQtdGCLiDQntC90LAg0L/QvtGP0LLQuNGC0YHRjyDQv9GA0Lgg0L/RgNC+0LLQtdGA0LrQtSDQvdCwIG51bWVyaWNGb3JtYXRWYWxpZGF0aW9uXHJcbiAgICAgICAgICAgICAgICAvLyAo0L/QvtGC0L7QvNGDINGH0YLQviByYW5nZSDRgtCw0Log0Lgg0L7RgdGC0LDQtdGC0YHRjyB0cnVlKVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IFswLCAwXTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMF0gPSB0aGlzLmZpbmRQb3NpdGlvbkluQXJyKG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlc1swXSwgb3B0aW9ucy5jdXN0b21WYWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5yYW5nZVsxXSA9IHRoaXMuZmluZFBvc2l0aW9uSW5BcnIob3B0aW9ucy5yYW5nZUluQ3VzdG9tVmFsdWVzWzFdLCBvcHRpb25zLmN1c3RvbVZhbHVlcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L3QtSDQstCy0LXQtNC10L3RiyB2YWwg0LjQu9C4IHJhbmdlINCyIGN1c3RvbSB2YWx1ZXNcclxuICAgICAgICAgICAgLy8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQv9GA0L7RgdGC0YvQtSB2YWx1ZSDQuNC70LggcmFuZ2UsINC10YHQu9C4INC+0L3QuCDQtdGB0YLRjCBcclxuICAgICAgICAgICAgaWYgKCAhb3B0aW9ucy52YWx1ZSAmJiBvcHRpb25zLnZhbHVlSW5DdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnZhbHVlID0gdGhpcy5maW5kUG9zaXRpb25JbkFycihvcHRpb25zLnZhbHVlSW5DdXN0b21WYWx1ZXMsIG9wdGlvbnMuY3VzdG9tVmFsdWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5udW1lcmljRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgYXJlTnVtZXJpYyguLi52YWxzOiBhbnkpIHtcclxuICAgICAgICBmb3IgKGxldCB2YWwgb2YgdmFscykge1xyXG4gICAgICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyh2YWwpICkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgdmFsdWVzIGluIG51bWVyaWMgZm9ybWF0IHNob3VsZCBiZSBudW1iZXJzJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtaW5NYXhWYWxpZGF0aW9uKG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlciwgcmV2ZXJzZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICggIXJldmVyc2UgJiYgKG1pblZhbCA+PSBtYXhWYWwpICkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICggcmV2ZXJzZSAmJiAobWluVmFsIDw9IG1heFZhbCkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGVwVmFsaWRhdGlvbihtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIsIHN0ZXA6IG51bWJlcikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICggIXRoaXMuaXNOdW1lcmljKHN0ZXApICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0ZXAgc2hvdWxkIGJlIGEgbnVtYmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggc3RlcCA9PSAwICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0ZXAgY2FudCBiZSBlcXVhbCB0byAwJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuICAgICAgICBsZXQgdGVzdDogbnVtYmVyID0gKyhtYXhWYWwgLSBtaW5WYWwpLnRvRml4ZWQobilcclxuICAgICAgICB0ZXN0ID0gKCB0ZXN0ICogTWF0aC5wb3coMTAsIG4pICkgLyAoIHN0ZXAgKiBNYXRoLnBvdygxMCwgbikgKTtcclxuICAgICAgICB0ZXN0ID0gTWF0aC5hYnModGVzdCk7XHJcblxyXG4gICAgICAgIGlmICggdGVzdCAlIDEgIT0gMCApIHtcclxuICAgICAgICAgICAgLy8g0LIg0YLQvtC8INGH0LjRgdC70LUg0Y3RgtC+INC/0YDQvtCy0LXRgNC60LAg0YfRgtC+0LHRiyDRiNCw0LMg0LHRi9C7INC90LUg0LHQvtC70YzRiNC1INCy0YHQtdCz0L4g0L/RgNC+0LzQtdC20YPRgtC60LBcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCcoTWF4IHZhbHVlIC0gbWluIHZhbHVlKSBkaXZpZGVkIGJ5IHN0ZXAgc2hvdWxkIHJldHVybiBpbnRlZ2VyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25lVmFsdWVWYWxpZGF0aW9uKG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlciwgdmFsOiBudW1iZXIsIHN0ZXA6IG51bWJlcikge1xyXG5cclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyhzdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKG1pblZhbCkgKTtcclxuXHJcbiAgICAgICAgbGV0IHRlc3Q6IG51bWJlciA9ICsodmFsIC0gbWluVmFsKS50b0ZpeGVkKG4pXHJcbiAgICAgICAgdGVzdCA9ICggdGVzdCAqIE1hdGgucG93KDEwLCBuKSApIC8gKCBzdGVwICogTWF0aC5wb3coMTAsIG4pICk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBpZiAoIE1hdGgubWF4KG1pblZhbCwgbWF4VmFsKSA8IHZhbCAgfHwgIE1hdGgubWluKG1pblZhbCwgbWF4VmFsKSA+IHZhbCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgaW5pdGlhbCB2YWx1ZSBzaG91bGQgYmUgd2l0aGluIG1pbiBhbmQgbWF4IHZhbHVlcycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGVzdCAlIDEgIT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBzaG91bGQgYmUgc2V0IG9uIHN0ZXAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByYW5nZVZhbGlkYXRpb24obWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyLCByYW5nZTogW251bWJlciwgbnVtYmVyXSwgc3RlcDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fbWluVmFsKSApO1xyXG5cclxuICAgICAgICBsZXQgdGVzdExlZnQ6IG51bWJlciA9IChyYW5nZVswXSAtIG1pblZhbCkgLyBzdGVwO1xyXG4gICAgICAgIHRlc3RMZWZ0ID0gK3Rlc3RMZWZ0LnRvRml4ZWQobik7XHJcbiAgICAgICAgdGVzdExlZnQgPSBNYXRoLmFicyh0ZXN0TGVmdCk7XHJcblxyXG4gICAgICAgIGxldCB0ZXN0UmlnaHQ6IG51bWJlciA9IChyYW5nZVsxXSAtIG1pblZhbCkgLyBzdGVwO1xyXG4gICAgICAgIHRlc3RSaWdodCA9ICt0ZXN0UmlnaHQudG9GaXhlZChuKTtcclxuICAgICAgICB0ZXN0UmlnaHQgPSBNYXRoLmFicyh0ZXN0UmlnaHQpO1xyXG5cclxuICAgICAgICBpZiAoIHJhbmdlLmxlbmd0aCAhPSAyICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JhbmdlIHNob3VsZCBjb250YWluIHR3byB2YWx1ZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCAhdGhpcy5pc051bWVyaWMocmFuZ2VbMF0pIHx8ICF0aGlzLmlzTnVtZXJpYyhyYW5nZVsxXSkgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWVzIGluIHJhbmdlIHNob3VsZCBiZSBudW1iZXJzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggTWF0aC5tYXgobWluVmFsLCBtYXhWYWwpIDwgTWF0aC5tYXgocmFuZ2VbMF0sIHJhbmdlWzFdKSAgfHwgIE1hdGgubWluKG1pblZhbCwgbWF4VmFsKSA+IE1hdGgubWluKHJhbmdlWzBdLCByYW5nZVsxXSkgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHJhbmdlIHNob3VsZCBiZSB3aXRoaW4gbWluIGFuZCBtYXggdmFsdWVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGVzdExlZnQgJSAxICE9IDAgfHwgdGVzdFJpZ2h0ICUgMSAhPSAwICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSByYW5nZSBzaG91bGQgYmUgc2V0IG9uIHN0ZXAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjdXN0b21EYXRlVmFsaWRhdGlvbiguLi52YWxzOiBhbnlbXSkge1xyXG4gICAgICAgIGZvciAoIGxldCB2YWwgb2YgdmFscyApIHtcclxuICAgICAgICAgICAgaWYgKCAhKCcnICsgdmFsKS5tYXRjaCgvXlxcZHsyfVsuXFwvLV1cXGR7Mn1bLlxcLy1dXFxkezR9JC8pICkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgdmFsdWVzIGluIGRhdGUgZm9ybWF0IHNob3VsZCBiZSBkYXRlcywgbGlrZSBkZC5tbS55eXl5IG9yIGRkL21tL3l5eXkgb3IgZGQtbW0teXl5eScpOyBcclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZURhdGVUb051bWJlcihzdHI6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGFyciA9IHN0ci5zcGxpdChzdHJbMl0pO1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoK2FyclsyXSwgK2FyclsxXSAtIDEsICthcnJbMF0pO1xyXG4gICAgICAgIC8vINCV0YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQstCy0L7QtNC40YIg0YHRgtGA0LDQvdC90YvQtSDQtNCw0L3QvdGL0LUsINC+0L0g0LLRgdC1INGA0LDQstC90L4g0L/QvtC70YPRh9C40YIg0YDQtdC30YPQu9GM0YLQsNGCLlxyXG4gICAgICAgIC8vINCh0LrQvtGA0LXQtSDQstGB0LXQs9C+LCDRjdGC0L4g0LPQvtCy0L7RgNC40YIg0L4g0YLQvtC8LCDRh9GC0L4g0L7QvSDQv9C10YDQtdC/0YPRgtCw0Lsg0L/QvtGA0Y/QtNC+0LouINCf0L7Rj9Cy0LjRgtGB0Y8g0L/RgNC10LTRg9C/0YDQtdC20LTQtdC90LjQtVxyXG4gICAgICAgIGlmICgrYXJyWzBdID4gMzEgfHwgK2FyclsxXSA+IDEyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVXNlIGRkLm1tLnl5eXkgb3IgZGQvbW0veXl5eSBvciBkZC1tbS15eXl5IGZvciBkYXRlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRhdGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgZGF0ZSwgdHJ5IGRkLm1tLnl5eXkgb3IgZGQvbW0veXl5eSBvciBkZC1tbS15eXl5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiArZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyYW5sYXRlU3RlcFRvRGF0ZUZvcm1hdChzdGVwOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICggIXRoaXMuaXNOdW1lcmljKHN0ZXApIHx8IHN0ZXAgJSAxICE9IDAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RlcCBpbiBkYXRlIGZvcm1hdCBzaG91bGQgYmUgaW50ZWdlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RlcCAqIDI0ICogMzYwMCAqIDEwMDA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgaXNOdW1lcmljKG46IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgIWlzTmFOKG4gLSAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlY2ltYWxQbGFjZXMobnVtOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC60L7Qu9C40YfQtdGB0YLQstC+INC30L3QsNC60L7QsiDQv9C+0YHQu9C1INC30LDQv9GP0YLQvtC5XHJcbiAgICAgICAgcmV0dXJuIH4obnVtICsgJycpLmluZGV4T2YoJy4nKSA/IChudW0gKyAnJykuc3BsaXQoJy4nKVsxXS5sZW5ndGggOiAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqINCY0L3RgtGE0LXRgNGE0LXQudGBINC40LfQtNCw0YLQtdC70Y8g0L7QsdGK0Y/QstC70Y/QtdGCINC90LDQsdC+0YAg0LzQtdGC0L7QtNC+0LIg0LTQu9GPINGD0L/RgNCw0LLQu9C10L3QuNGP0LzQuCDQv9C+0LTQv9C40YHQutC40YfQsNC80LguXHJcbiAqL1xyXG5pbnRlcmZhY2UgSVN1YmplY3Qge1xyXG5cclxuICAgIHZhbDogYW55IHwgW2FueSwgYW55XTsgXHJcblxyXG4gICAgLy8g0J/RgNC40YHQvtC10LTQuNC90Y/QtdGCINC90LDQsdC70Y7QtNCw0YLQtdC70Y8g0Log0LjQt9C00LDRgtC10LvRji5cclxuICAgIGF0dGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZDtcclxuXHJcbiAgICAvLyDQntGC0YHQvtC10LTQuNC90Y/QtdGCINC90LDQsdC70Y7QtNCw0YLQtdC70Y8g0L7RgiDQuNC30LTQsNGC0LXQu9GPLlxyXG4gICAgZGV0YWNoKG9ic2VydmVyOiBJT2JzZXJ2ZXIpOiB2b2lkO1xyXG5cclxuICAgIC8vINCj0LLQtdC00L7QvNC70Y/QtdGCINCy0YHQtdGFINC90LDQsdC70Y7QtNCw0YLQtdC70LXQuSDQviDRgdC+0LHRi9GC0LjQuC5cclxuICAgIG5vdGlmeSgpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICog0JjQt9C00LDRgtC10LvRjCDQstC70LDQtNC10LXRgiDQvdC10LrQvtGC0L7RgNGL0Lwg0LLQsNC20L3Ri9C8INGB0L7RgdGC0L7Rj9C90LjQtdC8INC4INC+0L/QvtCy0LXRidCw0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9C10Lkg0L4g0LXQs9C+XHJcbiAqINC40LfQvNC10L3QtdC90LjRj9GFLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ViamVjdCBpbXBsZW1lbnRzIElTdWJqZWN0IHtcclxuXHJcbiAgICB2YWw6IGFueSB8IFthbnksIGFueV07IFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCB2YWw6IGFueSB8IFthbnksIGFueV0gKSB7XHJcbiAgICAgICAgdGhpcy52YWwgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7T2JzZXJ2ZXJbXX0g0KHQv9C40YHQvtC6INC/0L7QtNC/0LjRgdGH0LjQutC+0LIuINCSINGA0LXQsNC70YzQvdC+0Lkg0LbQuNC30L3QuCDRgdC/0LjRgdC+0LpcclxuICAgICAqINC/0L7QtNC/0LjRgdGH0LjQutC+0LIg0LzQvtC20LXRgiDRhdGA0LDQvdC40YLRjNGB0Y8g0LIg0LHQvtC70LXQtSDQv9C+0LTRgNC+0LHQvdC+0Lwg0LLQuNC00LUgKNC60LvQsNGB0YHQuNGE0LjRhtC40YDRg9C10YLRgdGPINC/0L5cclxuICAgICAqINGC0LjQv9GDINGB0L7QsdGL0YLQuNGPINC4INGCLtC0LilcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvYnNlcnZlcnM6IElPYnNlcnZlcltdID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQnNC10YLQvtC00Ysg0YPQv9GA0LDQstC70LXQvdC40Y8g0L/QvtC00L/QuNGB0LrQvtC5LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNoKG9ic2VydmVyOiBJT2JzZXJ2ZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGV0YWNoKG9ic2VydmVyOiBJT2JzZXJ2ZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvYnNlcnZlckluZGV4ID0gdGhpcy5vYnNlcnZlcnMuaW5kZXhPZihvYnNlcnZlcik7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMuc3BsaWNlKG9ic2VydmVySW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JfQsNC/0YPRgdC6INC+0LHQvdC+0LLQu9C10L3QuNGPINCyINC60LDQttC00L7QvCDQv9C+0LTQv9C40YHRh9C40LrQtS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG5vdGlmeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBvYnNlcnZlciBvZiB0aGlzLm9ic2VydmVycykge1xyXG4gICAgICAgICAgICBvYnNlcnZlci51cGRhdGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog0JjQvdGC0LXRgNGE0LXQudGBINCd0LDQsdC70Y7QtNCw0YLQtdC70Y8g0L7QsdGK0Y/QstC70Y/QtdGCINC80LXRgtC+0LQg0YPQstC10LTQvtC80LvQtdC90LjRjywg0LrQvtGC0L7RgNGL0Lkg0LjQt9C00LDRgtC10LvQuFxyXG4gKiDQuNGB0L/QvtC70YzQt9GD0Y7RgiDQtNC70Y8g0L7Qv9C+0LLQtdGJ0LXQvdC40Y8g0YHQstC+0LjRhSDQv9C+0LTQv9C40YHRh9C40LrQvtCyLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2ZXIge1xyXG4gICAgZnVuYzogYW55O1xyXG4gICAgLy8g0J/QvtC70YPRh9C40YLRjCDQvtCx0L3QvtCy0LvQtdC90LjQtSDQvtGCINGB0YPQsdGK0LXQutGC0LAuXHJcbiAgICB1cGRhdGUoc3ViamVjdDogU3ViamVjdCk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQmtC+0L3QutGA0LXRgtC90YvQtSDQndCw0LHQu9GO0LTQsNGC0LXQu9C4INGA0LXQsNCz0LjRgNGD0Y7RgiDQvdCwINC+0LHQvdC+0LLQu9C10L3QuNGPLCDQstGL0L/Rg9GJ0LXQvdC90YvQtSDQmNC30LTQsNGC0LXQu9C10LwsINC6XHJcbiAqINC60L7RgtC+0YDQvtC80YMg0L7QvdC4INC/0YDQuNC60YDQtdC/0LvQtdC90YsuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT2JzZXJ2ZXIgaW1wbGVtZW50cyBJT2JzZXJ2ZXIge1xyXG5cclxuICAgIGZ1bmM6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihmdW5jOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuZnVuYyA9IGZ1bmM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShzdWJqZWN0OiBTdWJqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mdW5jKCBzdWJqZWN0LnZhbCApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0lTdWJqZWN0fTsiLCJpbXBvcnQgSU9wdGlvbnMsIHsgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IHtJTW9kZWx9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQge0lNb2RlbE9wdGlvbnN9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQge0lWaWV3fSBmcm9tICcuL1ZpZXcnO1xyXG5pbXBvcnQge0lTdWJqZWN0fSAgZnJvbSAnLi9PYnNlcnZlcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVzZW50ZXIge1xyXG5cclxuICAgIHByaXZhdGUgX21vZGVsOiBJTW9kZWw7XHJcbiAgICBwcml2YXRlIF92aWV3OiBJVmlldztcclxuICAgIHByaXZhdGUgX3N1YmplY3Q6IElTdWJqZWN0O1xyXG5cclxuICAgIHByaXZhdGUgX2FjdGl2ZVRodW1iOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbDogSU1vZGVsLCB2aWV3OiBJVmlldywgc3ViamVjdDogSVN1YmplY3QpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fbW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB0aGlzLl92aWV3ID0gdmlldztcclxuICAgICAgICB0aGlzLl9zdWJqZWN0ID0gc3ViamVjdDtcclxuXHJcbiAgICAgICAgdGhpcy50aHVtYk9uRG93biA9IHRoaXMudGh1bWJPbkRvd24uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnRodW1iT25Nb3ZlID0gdGhpcy50aHVtYk9uTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudGh1bWJPblVwID0gdGhpcy50aHVtYk9uVXAuYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zbGlkZXJPbkNsaWNrID0gdGhpcy5zbGlkZXJPbkNsaWNrLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIGlmICgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcclxuICAgICAgICAgICAgLy8g0JzQvtCx0LjQu9GM0L3Ri9C5XHJcbiAgICAgICAgICAgIGlmICggIW1vZGVsLmdldFJhbmdlKCkgKSB7XHJcbiAgICAgICAgICAgICAgICB2aWV3LmdldFRodW1iKCkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50aHVtYk9uRG93bik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2aWV3LmdldFRodW1iKDEpLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICAgICAgdmlldy5nZXRUaHVtYigyKS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRodW1iT25Eb3duKTtcclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCAhbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuICAgICAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmlldy5nZXRUaHVtYigxKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgICAgICAgICAgdmlldy5nZXRUaHVtYigyKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG5cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9ICAgIFxyXG5cclxuICAgICAgICB2aWV3LmdldFNsaWRlcigpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnNsaWRlck9uQ2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGh1bWJPbkRvd24oZXZlbnQpOiB2b2lkIHtcclxuICAgICAgICAvLyDQv9GA0LXQtNC+0YLQstGA0LDRgtC40YLRjCDQt9Cw0L/Rg9GB0Log0LLRi9C00LXQu9C10L3QuNGPICjQtNC10LnRgdGC0LLQuNC1INCx0YDQsNGD0LfQtdGA0LApXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGh1bWIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICBpZiAoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnRodW1iT25Nb3ZlKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRodW1iT25VcCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy50aHVtYk9uTW92ZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnRodW1iT25VcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGh1bWJPbk1vdmUoZXZlbnQpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IG1vZGVsOiBJTW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuICAgICAgICBsZXQgdmlldzogSVZpZXcgPSB0aGlzLl92aWV3O1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQgPSB0aGlzLl92aWV3LmdldFNsaWRlcigpO1xyXG4gICAgICBcclxuICAgICAgICBsZXQgbWluVmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNaW5WYWwoKTtcclxuICAgICAgICBsZXQgbWF4VmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNYXhWYWwoKTtcclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIGxldCByZXZlcnNlOiBudW1iZXIgPSAhdGhpcy5fbW9kZWwuZ2V0UmV2ZXJzZSgpID8gMSA6IC0xO1xyXG4gICAgICAgIGxldCBzbGlkZXJMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcuZ2V0TGVuZ2h0KCk7XHJcbiAgICAgICAgbGV0IHN0ZXBMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcub25lU3RlcExlbmdodCgpO1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyQm9yZGVyOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGV2ZW50UG9zOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHRodW1iUG9zaXRpb246IG51bWJlcjtcclxuICAgICAgICBsZXQgbGVmdFBvaW50OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHJpZ2h0UG9pbnQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgbmV3VmFsOiBudW1iZXI7XHJcblxyXG4gICAgICAgIC8vINCf0L7Qt9C40YbQuNGPINCx0LXQs9GD0L3QutCwINCyIHB4INCy0YvRh9C40YHQu9GP0LXRgtGB0Y8g0L7RgtC90L7RgdC40YLQtdC70YzQvdC+INC90LDRh9Cw0LvQsCDRgdC70LDQudC00LXRgNCwLlxyXG4gICAgICAgIC8vINCS0L3QsNGH0LDQu9C1IG5ld1ZhbCDQstGL0YfQuNGB0LvRj9C10YLRgdGPINC60LDQuiDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyINC+0YIg0L3QsNGH0LDQu9CwICjQvtGCIDApLFxyXG4gICAgICAgIC8vICjRgtC+INC10YHRgtGMINC30L3QsNGH0LXQvdC40Y8gbWluLCBtYXgsIHJldmVyc2Ug0L3QtSDQuNC80LXRjtGCINC30L3QsNGH0LXQvdC40Y8pLlxyXG5cclxuICAgICAgICBpZiAoICF2aWV3LmdldFZlcnRpY2FsKCkgKSB7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJCb3JkZXIgPSAoc2xpZGVyTm9kZS5vZmZzZXRXaWR0aCAtIHNsaWRlckxlbmdodCkgLyAyO1xyXG4gICAgICAgICAgICBldmVudFBvcyA9IGV2ZW50LmNsaWVudFggfHwgZXZlbnQudG91Y2hlc1swXS5wYWdlWDsgICAgICAgICBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGV2ZW50UG9zIC0gc2xpZGVyTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gc2xpZGVyQm9yZGVyO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgc2xpZGVyQm9yZGVyID0gKHNsaWRlck5vZGUub2Zmc2V0SGVpZ2h0IC0gc2xpZGVyTGVuZ2h0KSAvIDI7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gZXZlbnQuY2xpZW50WSB8fCBldmVudC50b3VjaGVzWzBdLnBhZ2VZOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gZXZlbnRQb3MgLSBzbGlkZXJOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHNsaWRlckJvcmRlcjtcclxuXHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgbmV3VmFsID0gTWF0aC5yb3VuZCh0aHVtYlBvc2l0aW9uIC8gc3RlcExlbmdodCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX2FjdGl2ZVRodW1iLmNsYXNzTGlzdC5jb250YWlucygnc2xpZGVyX190aHVtYl9yaWdodCcpICkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/RgNC+0LzQtdC20YPRgtC+0LosINGC0L4g0LvQtdCy0LDRjyDQs9GA0LDQvdC40YbQsCAtINGN0YLQviDQu9C10LLRi9C5INCx0LXQs9GD0L3QvtC6XHJcbiAgICAgICAgICAgICAgICAvLyDQt9C00LXRgdGMINGA0LDRgdGB0YfQuNGC0YvQstCw0LXRgtGB0Y8g0LrQvtC70LjRh9C10YHRgtCy0L4g0YjQsNCz0L7QsiDQvtGCINC90LDRh9Cw0LvQsCAo0L7RgiAwKSwgXHJcbiAgICAgICAgICAgICAgICAvLyDQt9Cw0YLQtdC8INGA0LDRgdGB0YLQvtGP0L3QuNC1INCyIHB4INC+0YIg0L3QsNGH0LDQu9CwINGB0LvQsNC50LTQtdGA0LAuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8g0J7RiNC40LHQutC4INCyINCy0YvRh9C40YHQu9C10L3QuNGP0YUg0YEgZmxvYXQg0LfQtNC10YHRjCDQvNC+0LbQvdC+INC/0YDQvtC40LPQvdC+0YDQuNGA0L7QstCw0YLRjFxyXG4gICAgICAgICAgICAgICAgbGVmdFBvaW50ID0gKG1vZGVsLmdldFJhbmdlKClbMF0gLSBtaW5WYWwpICogcmV2ZXJzZSAvIHN0ZXA7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UG9pbnQgPSBsZWZ0UG9pbnQgKiBzdGVwTGVuZ2h0O1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQb2ludCA9IHNsaWRlckxlbmdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5WYWwgPSBtb2RlbC5nZXRSYW5nZSgpWzBdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQb2ludCA9IChtb2RlbC5nZXRSYW5nZSgpWzFdIC0gbWluVmFsKSAqIHJldmVyc2UgLyBzdGVwO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQb2ludCA9IHJpZ2h0UG9pbnQgKiBzdGVwTGVuZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGVmdFBvaW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXhWYWwgPSBtb2RlbC5nZXRSYW5nZSgpWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGVmdFBvaW50ID0gMDtcclxuICAgICAgICAgICAgcmlnaHRQb2ludCA9IHNsaWRlckxlbmdodDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIHRodW1iUG9zaXRpb24gPD0gbGVmdFBvaW50KSB7XHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBsZWZ0UG9pbnQ7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IG1pblZhbDtcclxuICAgICAgICB9IGVsc2UgaWYgKCB0aHVtYlBvc2l0aW9uID49IHJpZ2h0UG9pbnQpIHtcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IHJpZ2h0UG9pbnQ7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IG1heFZhbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQsdC10LPRg9C90L7QuiDQvdC1INCy0YvRiNC10Lsg0LfQsCDQs9GA0LDQvdC40YbRiywg0YHRgtCw0LLQuNC8INC10LPQviDQvdCwINCx0LvQuNC20LDQudGI0LXQtSDQt9C90LDRh9C10L3QuNC1LFxyXG4gICAgICAgICAgICAvLyDQutGA0LDRgtC90L7QtSDRiNCw0LPRgy5cclxuICAgICAgICAgICAgLy8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0Y3RgtC+0LPQviDQv9GA0LXQvtCx0YDQsNC30YPQtdC8INC10LPQviDQtNC70Y8g0LzQvtC00LXQu9C4LiDQldGB0LvQuCByZXZlcnNlID09IHRydWUsINGC0L4gPT0gLTEgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBuZXdWYWwgKiBzdGVwTGVuZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZiA9IHggPT4gKCAoeC50b1N0cmluZygpLmluY2x1ZGVzKCcuJykpID8gKHgudG9TdHJpbmcoKS5zcGxpdCgnLicpLnBvcCgpLmxlbmd0aCkgOiAoMCkgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBuID0gZihzdGVwKSArIGYobWluVmFsKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKCBuZXdWYWwgKiBNYXRoLnBvdygxMCwgbikgKiBzdGVwICogcmV2ZXJzZSAgKSAvIE1hdGgucG93KDEwLCBuKTtcclxuXHJcbiAgICAgICAgICAgIG4gPSBNYXRoLm1heCggZihzdGVwKSwgZihtaW5WYWwpICk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICsoKCtuZXdWYWwpLnRvRml4ZWQobikpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSAoK21vZGVsLmdldE1pblZhbCgpKSArICgrbmV3VmFsKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKygoK25ld1ZhbCkudG9GaXhlZChuKSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXRSYW5nZSgpICYmIHRoaXMuX2FjdGl2ZVRodW1iLmNsYXNzTGlzdC5jb250YWlucygnc2xpZGVyX190aHVtYl9sZWZ0JykpIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0UmFuZ2UoIFtuZXdWYWwsIG1vZGVsLmdldFJhbmdlKClbMV1dICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG1vZGVsLmdldFJhbmdlKCkgJiYgdGhpcy5fYWN0aXZlVGh1bWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX3RodW1iX3JpZ2h0JykpIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0UmFuZ2UoIFttb2RlbC5nZXRSYW5nZSgpWzBdLCBuZXdWYWxdICk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1vZGVsLnNldFZhbChuZXdWYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMuX2FjdGl2ZVRodW1iLCB0aHVtYlBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoKSB8fCB2aWV3LmdldFRvb2x0aXAoMSkgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZShuZXdWYWwpO1xyXG5cclxuICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIHRoaXMuX2FjdGl2ZVRodW1iLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX3Rvb2x0aXAnKSwgdmFsLCB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHRodW1iT25VcChldmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudGh1bWJPblVwKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy50aHVtYk9uTW92ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnRodW1iT25VcCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMudGh1bWJPbk1vdmUpO1xyXG4gICAgICAgIH1cclxuLyogICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy50aHVtYk9uVXApO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMudGh1bWJPbk1vdmUpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudGh1bWJPblVwKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnRodW1iT25Nb3ZlKTsgKi9cclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGh1bWIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgLy8g0L3QsNCx0LvRjtC00LDRgtC10LvRjFxyXG4gICAgICAgIGxldCBtb2RlbDogSU1vZGVsID0gdGhpcy5fbW9kZWw7XHJcblxyXG4gICAgICAgIGlmICggbW9kZWwuZ2V0VmFsKCkgIT0gbnVsbCApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRWYWwoKSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IHZhbDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFswXSA9IHZhbDtcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVsxXSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFsxXSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3ViamVjdC5ub3RpZnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNsaWRlck9uQ2xpY2soZXZlbnQpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IG1vZGVsOiBJTW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuICAgICAgICBsZXQgdmlldzogSVZpZXcgPSB0aGlzLl92aWV3O1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQgPSB0aGlzLl92aWV3LmdldFNsaWRlcigpO1xyXG4gICAgICAgIGxldCBjaGFuZ2luZ1RodW1iOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgXHJcbiAgICAgICAgbGV0IG1pblZhbDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0TWluVmFsKCk7XHJcbiAgICAgICAgbGV0IG1heFZhbDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0TWF4VmFsKCk7XHJcbiAgICAgICAgbGV0IHN0ZXA6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICBsZXQgcmV2ZXJzZTogbnVtYmVyID0gIXRoaXMuX21vZGVsLmdldFJldmVyc2UoKSA/IDEgOiAtMTtcclxuICAgICAgICBsZXQgc2xpZGVyTGVuZ2h0OiBudW1iZXIgPSB0aGlzLl92aWV3LmdldExlbmdodCgpO1xyXG4gICAgICAgIGxldCBzdGVwTGVuZ2h0OiBudW1iZXIgPSB0aGlzLl92aWV3Lm9uZVN0ZXBMZW5naHQoKTtcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlckJvcmRlcjogbnVtYmVyO1xyXG4gICAgICAgIGxldCBldmVudFBvczogbnVtYmVyO1xyXG4gICAgICAgIGxldCB0aHVtYlBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGxlZnRQb2ludDogbnVtYmVyO1xyXG4gICAgICAgIGxldCByaWdodFBvaW50OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG5ld1ZhbDogbnVtYmVyO1xyXG5cclxuICAgICAgICAvLyDQn9C+0LfQuNGG0LjRjyDQsdC10LPRg9C90LrQsCDQsiBweCDQstGL0YfQuNGB0LvRj9C10YLRgdGPINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDQvdCw0YfQsNC70LAg0YHQu9Cw0LnQtNC10YDQsC5cclxuICAgICAgICAvLyDQktC90LDRh9Cw0LvQtSBuZXdWYWwg0LLRi9GH0LjRgdC70Y/QtdGC0YHRjyDQutCw0Log0LrQvtC70LjRh9C10YHRgtCy0L4g0YjQsNCz0L7QsiDQvtGCINC90LDRh9Cw0LvQsCAo0L7RgiAwKSxcclxuICAgICAgICAvLyAo0YLQviDQtdGB0YLRjCDQt9C90LDRh9C10L3QuNGPIG1pbiwgbWF4LCByZXZlcnNlINC90LUg0LjQvNC10Y7RgiDQt9C90LDRh9C10L3QuNGPKS5cclxuXHJcbiAgICAgICAgaWYgKCAhdGhpcy5fdmlldy5nZXRWZXJ0aWNhbCgpICkge1xyXG5cclxuICAgICAgICAgICAgc2xpZGVyQm9yZGVyID0gKHNsaWRlck5vZGUub2Zmc2V0V2lkdGggLSBzbGlkZXJMZW5naHQpIC8gMjtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSBldmVudC5jbGllbnRYOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gZXZlbnRQb3MgLSBzbGlkZXJOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSBzbGlkZXJCb3JkZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHNsaWRlckJvcmRlciA9IChzbGlkZXJOb2RlLm9mZnNldEhlaWdodCAtIHNsaWRlckxlbmdodCkgLyAyO1xyXG4gICAgICAgICAgICBldmVudFBvcyA9IGV2ZW50LmNsaWVudFk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBldmVudFBvcyAtIHNsaWRlck5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gc2xpZGVyQm9yZGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV3VmFsID0gTWF0aC5yb3VuZCh0aHVtYlBvc2l0aW9uIC8gc3RlcExlbmdodCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGVmdFBvaW50ID0gMDtcclxuICAgICAgICByaWdodFBvaW50ID0gc2xpZGVyTGVuZ2h0O1xyXG4gICAgXHJcbiAgICAgICAgaWYgKCB0aHVtYlBvc2l0aW9uIDw9IGxlZnRQb2ludCkge1xyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gbGVmdFBvaW50O1xyXG4gICAgICAgICAgICBuZXdWYWwgPSBtaW5WYWw7XHJcbiAgICAgICAgfSBlbHNlIGlmICggdGh1bWJQb3NpdGlvbiA+PSByaWdodFBvaW50KSB7XHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSByaWdodFBvaW50O1xyXG4gICAgICAgICAgICBuZXdWYWwgPSBtYXhWYWw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LHQtdCz0YPQvdC+0Log0L3QtSDQstGL0YjQtdC7INC30LAg0LPRgNCw0L3QuNGG0YssINGB0YLQsNCy0LjQvCDQtdCz0L4g0L3QsCDQsdC70LjQttCw0LnRiNC10LUg0LfQvdCw0YfQtdC90LjQtSxcclxuICAgICAgICAgICAgLy8g0LrRgNCw0YLQvdC+0LUg0YjQsNCz0YMuXHJcbiAgICAgICAgICAgIC8vINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INGN0YLQvtCz0L4g0L/RgNC10L7QsdGA0LDQt9GD0LXQvCDQtdCz0L4g0LTQu9GPINC80L7QtNC10LvQuC4g0JXRgdC70LggcmV2ZXJzZSA9PSB0cnVlLCDRgtC+ID09IC0xIFxyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gbmV3VmFsICogc3RlcExlbmdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGYgPSB4ID0+ICggKHgudG9TdHJpbmcoKS5pbmNsdWRlcygnLicpKSA/ICh4LnRvU3RyaW5nKCkuc3BsaXQoJy4nKS5wb3AoKS5sZW5ndGgpIDogKDApICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbiA9IGYoc3RlcCkgKyBmKG1pblZhbCk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICggbmV3VmFsICogTWF0aC5wb3coMTAsIG4pICogc3RlcCAqIHJldmVyc2UgICkgLyBNYXRoLnBvdygxMCwgbik7XHJcblxyXG4gICAgICAgICAgICBuID0gTWF0aC5tYXgoIGYoc3RlcCksIGYobWluVmFsKSApO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSArKCgrbmV3VmFsKS50b0ZpeGVkKG4pKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKCttb2RlbC5nZXRNaW5WYWwoKSkgKyAoK25ld1ZhbCk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICsoKCtuZXdWYWwpLnRvRml4ZWQobikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0VmFsKG5ld1ZhbCk7XHJcbiAgICAgICAgICAgIGNoYW5naW5nVGh1bWIgPSB2aWV3LmdldFRodW1iKCk7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbihjaGFuZ2luZ1RodW1iLCB0aHVtYlBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCBNYXRoLmFicyhuZXdWYWwgLSBtb2RlbC5nZXRSYW5nZSgpWzBdKSA8IE1hdGguYWJzKG5ld1ZhbCAtIG1vZGVsLmdldFJhbmdlKClbMV0pICkge1xyXG4gICAgICAgICAgICAgICAgbW9kZWwuc2V0UmFuZ2UoWyBuZXdWYWwsIG1vZGVsLmdldFJhbmdlKClbMV0gXSk7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2luZ1RodW1iID0gdmlldy5nZXRUaHVtYigxKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbihjaGFuZ2luZ1RodW1iLCB0aHVtYlBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsLnNldFJhbmdlKFsgbW9kZWwuZ2V0UmFuZ2UoKVswXSwgbmV3VmFsIF0pO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdpbmdUaHVtYiA9IHZpZXcuZ2V0VGh1bWIoMik7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oY2hhbmdpbmdUaHVtYiwgdGh1bWJQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgpIHx8IHZpZXcuZ2V0VG9vbHRpcCgxKSApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKG5ld1ZhbCk7XHJcblxyXG4gICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggY2hhbmdpbmdUaHVtYi5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX190b29sdGlwJyksIHZhbCwgdmlldy5nZXRUb29sdGlwTWFzaygpICk7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0L3QsNCx0LvRjtC00LDRgtC10LvRjFxyXG4gICAgICAgIGlmICggbW9kZWwuZ2V0VmFsKCkgIT0gbnVsbCApIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRWYWwoKSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IHZhbDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWwgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFswXSA9IHZhbDtcclxuXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVsxXSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFsxXSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3ViamVjdC5ub3RpZnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2Uob3B0aW9uczogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXMuX21vZGVsO1xyXG4gICAgICAgIGxldCB2aWV3ID0gdGhpcy5fdmlldztcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZVRodW1iUG9zaXRpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhbmdlVG9vbHRpcFZhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjaGFuZ2VTY2FsZURpdmlzaW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNoYW5nZVZhbFRvUmFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhbmdlUmFuZ2VUb1ZhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCByZWJ1aWxkU2NhbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgcmVidWlsZFRvb2x0aXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gMS4g0JzQntCU0JXQm9CsXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0LzQtdC90Y/QtdGC0YHRjyDQutCw0LrQvtC5INC70LjQsdC+INC/0LDRgNCw0LzQtdGC0YAg0LIg0LzQvtC00LXQu9C4LCDQt9Cw0L/Rg9GB0LrQsNC10Lwg0L/RgNC+0LLQtdGA0LrQuCDQvNC+0LTQtdC70LgsXHJcbiAgICAgICAgLy8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQvdC+0LLRi9C1INC30L3QsNGH0LXQvdC40Y8uXHJcbiAgICAgICAgLy8g0LfQsNC/0L7QvNC40L3QsNC10LwsINGH0YLQviDQvdGD0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0L/QvtC70L7QttC10L3QuNGPINC/0L7Qu9C30YPQvdC60L7Qsiwg0LfQvdCw0YfQtdC90LjRjyDQsiDQv9C+0LTRgdC60LDQt9C60LDRhSxcclxuICAgICAgICAvLyDQtNC10LvQtdC90LjQuSDRiNC60LDQu9GLICjQt9C90LDRh9C10L3QuNGPINC4IGxlZnQpLiBcclxuICAgICAgICAvLyDQldGB0LvQuCDQuNC30LzQtdC90LjQu9C+0YHRjCDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyIC0gdHJ1ZSDQvdCwINC/0LXRgNC10YDQuNGB0L7QstCw0YLRjCDRiNC60LDQu9GDLlxyXG4gICAgICAgIC8vINCV0YHQu9C4INC/0L7QvNC10L3Rj9C70L7RgdGMIHZhbCDQvdCwIHJhbmdlLCDQuNC70Lgg0L3QsNC+0LHQvtGA0L7RgiAtIHRydWUg0L3QsCDQv9C+0YHRgtGA0L7QuNGC0YwhINCx0LXQs9GD0L3QutC4LlxyXG5cclxuXHJcbiAgICAgICAgbGV0IG1vZGVsT3B0aW9ucyA9IFsnZGF0YUZvcm1hdCcsICd2YWx1ZScsICdtaW5WYWwnLCAnbWF4VmFsJywgJ3N0ZXAnLCAncmV2ZXJzZScsICdyYW5nZScsICdjdXN0b21WYWx1ZXMnLCAndmFsdWVJbkN1c3RvbVZhbHVlcycsICdyYW5nZUluQ3VzdG9tVmFsdWVzJ107XHJcblxyXG4gICAgICAgIGxldCB0ZXN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbW9kZWxPcHRpb25zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoaXRlbSkgKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICggdGVzdCApIHtcclxuICAgICAgICAgICAgbGV0IHByZXZOdW1PZlN0ZXBzOiBudW1iZXIgPSBtb2RlbC5udW1iZXJPZlN0ZXBzKCk7XHJcbiAgICAgICAgICAgIGxldCBwcmV2T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IG1vZGVsLmdldE9wdGlvbnMoKTtcclxuICAgICAgICAgICAgbGV0IG5ld09wdGlvbnM6IElPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJldk9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgbW9kZWwuY2hhbmdlKG5ld09wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgdmlldy5zZXROdW1iZXJPZlN0ZXBzKCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZVN0ZXAoIHZpZXcuc2NhbGVTdGVwVmFsaWRhdGlvbiggbW9kZWwsIHZpZXcuZ2V0U2NhbGVTdGVwKCkgKSApO1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlVGh1bWJQb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICggcHJldk51bU9mU3RlcHMgIT0gbW9kZWwubnVtYmVyT2ZTdGVwcygpICkge1xyXG4gICAgICAgICAgICAgICAgcmVidWlsZFNjYWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIHZpZXcuZ2V0UmFuZ2UoKSAmJiAhbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZVJhbmdlVG9WYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVidWlsZFRvb2x0aXAgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggIXZpZXcuZ2V0UmFuZ2UoKSAmJiBtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlVmFsVG9SYW5nZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZWJ1aWxkVG9vbHRpcCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDIuINCS0JjQlFxyXG4gICAgICAgIC8vINCf0LXRgNC10YDQuNGB0L7QstGL0LLQsNC10Lwg0LLQuNC0INC+0YIg0YHQsNC80YvRhSDQs9C70L7QsdCw0LvRjNC90YvRhSDQuNC30LzQtdC90LXQvdC40Lkg0Log0YHQsNC80YvQvCDQvdC10LfQvdCw0YfQuNGC0LXQu9GM0L3Ri9C8LlxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIDIuMSDQodCw0LzQvtC1INCx0L7Qu9GM0YjQvtC1INC40LfQvNC10L3QtdC90LjQtSAtINGN0YLQviDQstC40LQg0L7RgdC90L7QstGLINGI0LrQsNC70YsuXHJcbiAgICAgICAgLy8g0JXQtSDQuNC30LzQtdC90LXQvdC40LUg0LLRi9C30YvQstCw0LXRgjog0LjQt9C80LXQvdC40YLRjCDQv9C+0LvQvtC20LXQvdC40Y8g0LHQtdCz0YPQvdC60L7Qsiwg0LTQtdC70LXQvdC40Lkg0YjQutCw0LvRi1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3ZlcnRpY2FsJykgfHwgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnbGVuZ3RoJykgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlU2xpZGVyQmFzZShvcHRpb25zKTtcclxuICAgICAgICAgICAgY2hhbmdlVGh1bWJQb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMi4yINCc0LXQvdGP0LXQvCDQutC+0LvQuNGH0LXRgdGC0LLQviDQsdC10LPRg9C90LrQvtCyLCDQtdGB0LvQuCDQvdGD0LbQvdC+XHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0YLQsNC60L7QtSDQuNC30LzQtdC90LXQvdC40LUg0LHRi9C70L4sINC30L3QsNGH0LjRgiDQstC10LfQtNC1LFxyXG4gICAgICAgIC8vINCz0LTQtSDQvdCw0LTQviwg0YPQttC1INGB0YLQvtC40YIgdHJ1ZVxyXG5cclxuICAgICAgICBpZiAoIGNoYW5nZVJhbmdlVG9WYWwgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlUmFuZ2VUb1ZhbChtb2RlbCk7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIGNoYW5nZVZhbFRvUmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlVmFsVG9SYW5nZShtb2RlbCk7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMSkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Eb3duKTtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigyKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbkRvd24pO1xyXG4gICAgICAgIH0gICBcclxuXHJcbiAgICAgICAgLy8gMi4zINCo0LrQsNC70LAuINCj0LTQsNC70Y/QtdC8LCDRgdGC0YDQvtC40Lwg0LjQu9C4INC/0LXRgNC10YHRgtGA0LDQuNCy0LDQtdC8LiDQmNC30LzQtdC90Y/QtdC8INC00LXQu9C10L3QuNGPLlxyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NjYWxlU3RlcCcpICYmIG9wdGlvbnMuc2NhbGVTdGVwICE9IHZpZXcuZ2V0U2NhbGVTdGVwKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGVTdGVwKCB2aWV3LnNjYWxlU3RlcFZhbGlkYXRpb24obW9kZWwsIG9wdGlvbnMuc2NhbGVTdGVwKSApO1xyXG4gICAgICAgICAgICByZWJ1aWxkU2NhbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCdzY2FsZU1hc2snKSAmJiBvcHRpb25zLnNjYWxlTWFzayAhPSB2aWV3LmdldFNjYWxlTWFzaygpICkge1xyXG4gICAgICAgICAgICB2aWV3LnNldFNjYWxlTWFzayggb3B0aW9ucy5zY2FsZU1hc2sgKTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINGD0LTQsNC70Y/QtdC8XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCdzY2FsZScpICYmIG9wdGlvbnMuc2NhbGUgPT0gZmFsc2UgJiYgdmlldy5nZXRTY2FsZSgpICkge1xyXG4gICAgICAgICAgICB2aWV3LnNldFNjYWxlKCB2aWV3LnJlbW92ZU5vZGUoIHZpZXcuZ2V0U2NhbGUoKSApICk7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgcmVidWlsZFNjYWxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINGB0YLRgNC+0LjQvFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2NhbGUnKSAmJiBvcHRpb25zLnNjYWxlID09IHRydWUgJiYgIXZpZXcuZ2V0U2NhbGUoKSApIHtcclxuICAgICAgICAgICAgbGV0IHNjYWxlOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICAgICAgc2NhbGUgPSB2aWV3LmJ1aWxkU2NhbGUodmlldy5nZXRTbGlkZXIoKSwgdmlldy5nZXRTY2FsZVN0ZXAoKSwgbW9kZWwsIHZpZXcuZ2V0U2NhbGVNYXNrKCkgKTtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZShzY2FsZSk7XHJcblxyXG4gICAgICAgICAgICByZWJ1aWxkU2NhbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQv9C10YDQtdGB0YLRgNCw0LjQstCw0LXQvFxyXG4gICAgICAgIGlmICggcmVidWlsZFNjYWxlICYmIHZpZXcuZ2V0U2NhbGUoKSApIHtcclxuICAgICAgICAgICAgdmlldy5yZWJ1aWxkU2NhbGUobW9kZWwpO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdGP0LXQvCDQtNC10LvQtdC90LjRjy4g0LfQvdCw0YfQtdC90LjQtSDQuCBsZWZ0XHJcbiAgICAgICAgaWYgKCBjaGFuZ2VTY2FsZURpdmlzaW9uICYmIHZpZXcuZ2V0U2NhbGUoKSApIHtcclxuICAgICAgICAgICAgdmlldy5jaGFuZ2VTY2FsZURpdmlzaW9uKG1vZGVsKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyAyLjQg0J/QvtC00YHQutCw0LfQutC4LiDQo9C00LDQu9GP0LXQvC4g0KHRgtGA0L7QuNC8LiDQnNC10L3Rj9C10Lwg0LfQvdCw0YfQtdC90LjRj1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3Rvb2x0aXBNYXNrJykgJiYgb3B0aW9ucy50b29sdGlwTWFzayAhPSB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0VG9vbHRpcE1hc2soIG9wdGlvbnMudG9vbHRpcE1hc2sgKTtcclxuICAgICAgICAgICAgY2hhbmdlVG9vbHRpcFZhbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggIXZpZXcuZ2V0VG9vbHRpcCgpICYmICF2aWV3LmdldFRvb2x0aXAoMSkgJiYgIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3Rvb2x0aXAnKSApIHtcclxuICAgICAgICAgICAgcmVidWlsZFRvb2x0aXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2hhbmdlVG9vbHRpcFZhbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDRg9C00LDQu9GP0LXQvFxyXG4gICAgICAgIGlmICggb3B0aW9ucy50b29sdGlwID09IGZhbHNlIHx8IHJlYnVpbGRUb29sdGlwICkge1xyXG5cclxuICAgICAgICAgICAgLy8g0L/QvtGH0LXQvNGDINCyINC00YDRg9Cz0L7QvCDQv9C+0YDRj9C00LrQtSDQvdC1INGA0LDQsdC+0YLQsNC10YJcclxuICAgICAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoMikgKSB2aWV3LnNldFRvb2x0aXAoIHZpZXcucmVtb3ZlTm9kZSh2aWV3LmdldFRvb2x0aXAoMikpLCAyICk7XHJcbiAgICAgICAgICAgIGlmICggdmlldy5nZXRUb29sdGlwKDEpICkgdmlldy5zZXRUb29sdGlwKCB2aWV3LnJlbW92ZU5vZGUodmlldy5nZXRUb29sdGlwKDEpKSwgMSApO1xyXG4gICAgICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgpICkgdmlldy5zZXRUb29sdGlwKCB2aWV3LnJlbW92ZU5vZGUodmlldy5nZXRUb29sdGlwKDApKSwgMCApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLnRvb2x0aXAgPT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgICAgICByZWJ1aWxkVG9vbHRpcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgdGC0YDQsNC40LLQsNC10LxcclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCB8fCByZWJ1aWxkVG9vbHRpcCApIHtcclxuICAgICAgICAgICAgdmlldy5idWlsZFZhbGlkVG9vbHRpcHMobW9kZWwpO1xyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgICAgaWYgKCBjaGFuZ2VUb29sdGlwVmFsICYmICh2aWV3LmdldFRvb2x0aXAoKSB8fCB2aWV3LmdldFRvb2x0aXAoMSkpICkge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFtb2RlbC5nZXRSYW5nZSgpKSB7IFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggdmlldy5nZXRUb29sdGlwKCksIHZhbCBhcyBzdHJpbmcsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyAgIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIHZpZXcuZ2V0VG9vbHRpcCgxKSwgdmFsIGFzIHN0cmluZywgdmlldy5nZXRUb29sdGlwTWFzaygpICk7IFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VmFsVG9Ub29sdGlwKCB2aWV3LmdldFRvb2x0aXAoMiksIHZhbCBhcyBzdHJpbmcsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcblxyXG5cclxuICAgICAgICAvLyAyLjUg0J/QvtC70L7QttC10L3QuNGPINCx0LXQs9GD0L3QutC+0LJcclxuXHJcbiAgICAgICAgaWYgKCBjaGFuZ2VUaHVtYlBvc2l0aW9uICkge1xyXG4gICAgICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFtb2RlbC5nZXRSYW5nZSgpICkge1xyXG5cclxuICAgICAgICAgICAgICAgIHBvcyA9IHZpZXcuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0VmFsKCkpLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbiggdmlldy5nZXRUaHVtYigpLCBwb3MpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHsgICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBwb3MgPSB2aWV3LmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMF0pLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbiggdmlldy5nZXRUaHVtYigxKSwgcG9zKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgcG9zID0gdmlldy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzFdKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oIHZpZXcuZ2V0VGh1bWIoMiksIHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vINC90LDQsdC70Y7QtNCw0YLQtdC70YxcclxuICAgICAgICAgICAgLy8g0LLRi9C30YvQstCw0LXQvCDQtdGB0LvQuCDQsdGL0LvQuCDQuNC30LzQtdC90LXQvdC40Y8g0YHQstGP0LfQsNC90L3Ri9C1INGBINCx0LXQs9GD0L3QutCw0LzQuFxyXG4gICAgICAgICAgICAvLyDQvdC1INC30LDRgtGA0L7QvdC10YIsINC90LDQv9GA0LjQvNC10YAsINC00L7QsdCw0LLQu9C10L3QuNC1INGI0LrQsNC70YtcclxuICAgICAgICAgICAgaWYgKCBtb2RlbC5nZXRWYWwoKSAhPSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFsxXSA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBJT3B0aW9ucyBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IE1vZGVsLCB7SU1vZGVsfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IHsgcnVuSW5OZXdDb250ZXh0IH0gZnJvbSAndm0nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmlldyB7XHJcblxyXG4gICAgLy8g0LPQtdGC0YLQtdGA0Ysg0Lgg0YHQtdGC0YLQtdGA0YtcclxuICAgIGdldExlbmdodCgpOiBudW1iZXI7XHJcbiAgICBnZXRWZXJ0aWNhbCgpOiBib29sZWFuO1xyXG4gICAgZ2V0UmFuZ2UoKTogYm9vbGVhbjtcclxuICAgIGdldFRvb2x0aXBNYXNrKCk6IHN0cmluZztcclxuICAgIHNldFRvb2x0aXBNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZVN0ZXAoKTogbnVtYmVyO1xyXG4gICAgc2V0U2NhbGVTdGVwKHN0ZXA6IG51bWJlcik6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZU1hc2soKTogc3RyaW5nO1xyXG4gICAgc2V0U2NhbGVNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBnZXROdW1iZXJPZlN0ZXBzKCk6IG51bWJlcjtcclxuICAgIHNldE51bWJlck9mU3RlcHMobnVtOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIGdldFNsaWRlcigpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFRodW1iKG51bT86IG51bWJlcik6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VG9vbHRpcChudW0/OiBudW1iZXIpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHNldFRvb2x0aXAodG9vbHRpcDogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQsIG51bT86IG51bWJlcik6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZSgpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHNldFNjYWxlKHNjYWxlOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCk6IHZvaWQ7XHJcblxyXG5cclxuICAgIC8vINC80LXRgtC+0LTRiyDQtNC70Y8g0YHQvtC30LTQsNC90LjRjyDQuCDQuNC30LzQtdC90LXQvdC40Y8gdmlld1xyXG4gICAgY2hhbmdlU2xpZGVyQmFzZSAob3B0aW9uczogYW55KTogdm9pZDtcclxuICAgIGNoYW5nZVJhbmdlVG9WYWwgKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgY2hhbmdlVmFsVG9SYW5nZSAobW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcbiAgICBidWlsZFZhbGlkVG9vbHRpcHMobW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcbiAgICBidWlsZFNjYWxlKHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50LCBzdGVwOiBudW1iZXIsIG1vZGVsOiBJTW9kZWwsIG1hc2s6IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcmVidWlsZFNjYWxlKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgY2hhbmdlU2NhbGVEaXZpc2lvbihtb2RlbDogSU1vZGVsKTogdm9pZDtcclxuICAgIGNoYW5nZUxpbmUoKTogdm9pZDtcclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBzZXRUaHVtYlBvc2l0aW9uKHRodW1iTm9kZTogSFRNTERpdkVsZW1lbnQsIHRodW1iUG9zaXRpb246IG51bWJlcik6IHZvaWQ7XHJcbiAgICBzZXRWYWxUb1Rvb2x0aXAodG9vbHRpcE5vZGU6IEhUTUxEaXZFbGVtZW50LCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGUsIG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBmaW5kVGh1bWJQb3NpdGlvbihuZXdTdGVwLCBudW1PZlN0ZXBzKTogbnVtYmVyO1xyXG4gICAgb25lU3RlcExlbmdodCgpOiBudW1iZXI7XHJcbiAgICByZW1vdmVOb2RlKG5vZGU6IEhUTUxEaXZFbGVtZW50KTogdW5kZWZpbmVkO1xyXG4gICAgc2NhbGVTdGVwVmFsaWRhdGlvbihtb2RlbDogSU1vZGVsLCBzdGVwOiBudW1iZXIpOiBudW1iZXI7ICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyBpbXBsZW1lbnRzIElWaWV3IHtcclxuXHJcbiAgICBwcml2YXRlIF9sZW5naHQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3ZlcnRpY2FsOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfcmFuZ2U6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF90b29sdGlwTWFzazogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGVNYXNrPzogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGVTdGVwPzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbnVtYmVyT2ZTdGVwczogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX3NsaWRlcjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF90aHVtYj86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdGh1bWJMZWZ0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90aHVtYlJpZ2h0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9saW5lOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXA/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXBMZWZ0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwUmlnaHQ/OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3NjYWxlPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbDogSU1vZGVsLCBvcHRpb25zOiBJT3B0aW9ucywgc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fc2xpZGVyID0gc2xpZGVyTm9kZTtcclxuICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyJyk7XHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBtb2RlbC5nZXRSYW5nZSgpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX251bWJlck9mU3RlcHMgPSBtb2RlbC5udW1iZXJPZlN0ZXBzKCk7XHJcbiAgICAgICAgdGhpcy5fbGVuZ2h0ID0gdGhpcy5sZW5ndGhWYWxpZGF0aW9uKG9wdGlvbnMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgaWYgKCAhb3B0aW9ucy52ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLndpZHRoID0gdGhpcy5fbGVuZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2hvcml6b250YWwnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS5oZWlnaHQgPSB0aGlzLl9sZW5naHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfdmVydGljYWwnKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xpbmUgPSB0aGlzLmJ1aWxkTGluZSh0aGlzLl9zbGlkZXIpO1xyXG5cclxuICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fcmFuZ2UgKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl90aHVtYiA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIpO1xyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFZhbCgpKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy5fdGh1bWIsIHBvcyk7XHJcbiAgICAgICAgfSBlbHNlIHsgICAgIFxyXG5cclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJMZWZ0ID0gdGhpcy5idWlsZFRodW1iKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWJfbGVmdCcpO1xyXG4gICAgICAgICAgICB0aGlzLl90aHVtYlJpZ2h0ID0gdGhpcy5idWlsZFRodW1iKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWJfcmlnaHQnKTtcclxuXHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVswXSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iTGVmdCwgcG9zKTtcclxuXHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVsxXSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iUmlnaHQsIHBvcyk7XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgLy8g0LzQsNGB0LrQsCDQtNC70Y8g0L/QvtC00YHQutCw0LfQvtC6XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0LXQtSDQvdC10YIsINC/0YDQuNC80LXQvdGP0LXRgtGB0Y8g0L7QsdGL0YfQvdCw0Y8sINC60L7RgtC+0YDQsNGPINC/0L4g0LTQtdGE0L7Qu9GC0YMg0LLQvtC30LLRgNCw0YnQsNC10YIg0L/RgNC+0YHRgtC+IHZhbFxyXG4gICAgICAgIC8vICjQsiDRhNC+0YDQvNCw0YLQtSDQtNCw0YIg0LLQtdGA0L3QtdGC0YHRjyDQvtCx0YrQtdC60YIg0LTQsNGC0LApXHJcbiAgICAgICAgdGhpcy5fdG9vbHRpcE1hc2sgPSBvcHRpb25zLnRvb2x0aXBNYXNrO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCApIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFZhbGlkVG9vbHRpcHMobW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zY2FsZU1hc2sgPSBvcHRpb25zLnNjYWxlTWFzaztcclxuXHJcbiAgICAgICAgbGV0IHN0ZXA6IG51bWJlcjtcclxuICAgICAgICBpZiAoIG9wdGlvbnMuc2NhbGVTdGVwICkge1xyXG4gICAgICAgICAgICBzdGVwID0gdGhpcy5zY2FsZVN0ZXBWYWxpZGF0aW9uKG1vZGVsLCBvcHRpb25zLnNjYWxlU3RlcCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RlcCA9IG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2NhbGVTdGVwID0gc3RlcDtcclxuXHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5zY2FsZSApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2NhbGUgPSB0aGlzLmJ1aWxkU2NhbGUodGhpcy5fc2xpZGVyLCBzdGVwLCBtb2RlbCwgdGhpcy5fc2NhbGVNYXNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0LPQtdGC0YLQtdGA0Ysg0Lgg0YHQtdGC0YLQtdGA0YtcclxuICAgIGdldExlbmdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICggIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVyLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zbGlkZXIuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIH0gICAgXHJcbiAgICB9XHJcbiAgICBnZXRWZXJ0aWNhbCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmVydGljYWw7XHJcbiAgICB9XHJcbiAgICBnZXRSYW5nZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmFuZ2U7XHJcbiAgICB9XHJcbiAgICBnZXRUb29sdGlwTWFzaygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwTWFzaztcclxuICAgIH1cclxuICAgIHNldFRvb2x0aXBNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXBNYXNrID0gbWFzaztcclxuICAgIH1cclxuICAgIGdldFNjYWxlU3RlcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVN0ZXA7XHJcbiAgICB9XHJcbiAgICBzZXRTY2FsZVN0ZXAoc3RlcDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2NhbGVTdGVwID0gc3RlcDtcclxuICAgIH1cclxuICAgIGdldFNjYWxlTWFzaygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZU1hc2s7XHJcbiAgICB9XHJcbiAgICBzZXRTY2FsZU1hc2sobWFzazogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2NhbGVNYXNrID0gbWFzaztcclxuICAgIH1cclxuICAgIGdldE51bWJlck9mU3RlcHMoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZTdGVwcztcclxuICAgIH07XHJcbiAgICBzZXROdW1iZXJPZlN0ZXBzKG51bTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbnVtYmVyT2ZTdGVwcyA9IG51bTtcclxuICAgIH07XHJcbiAgICBcclxuXHJcblxyXG4gICAgZ2V0U2xpZGVyKCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVyO1xyXG4gICAgfVxyXG4gICAgZ2V0VGh1bWIobnVtOiBudW1iZXIgPSAwKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGlmICggbnVtID09IDAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aHVtYjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBudW0gPT0gMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RodW1iTGVmdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBudW0gPT0gMiApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RodW1iUmlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90aHVtYjtcclxuICAgIH1cclxuICAgIGdldFRvb2x0aXAobnVtOiBudW1iZXIgPSAwKTogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICggdGhpcy5fdG9vbHRpcCB8fCB0aGlzLl90b29sdGlwTGVmdCApIHtcclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwICYmIG51bSA9PSAwICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwTGVmdCAmJiBudW0gPT0gMSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwTGVmdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXBSaWdodCAmJiBudW0gPT0gMiApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwUmlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldFRvb2x0aXAodG9vbHRpcDogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQsIG51bTogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIGlmICggbnVtID09IDAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0b29sdGlwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIG51bSA9PSAxICkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwTGVmdCA9IHRvb2x0aXA7XHJcbiAgICAgICAgfSBlbHNlIGlmICggbnVtID09IDIgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBSaWdodCA9IHRvb2x0aXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0U2NhbGUoKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZTtcclxuICAgIH1cclxuICAgIHNldFNjYWxlKHNjYWxlOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vINC80LXRgtC+0LTRiyDQtNC70Y8g0YHQvtC30LTQsNC90LjRjyDQuCDQuNC30LzQtdC90LXQvdC40Y8gdmlld1xyXG5cclxuICAgIGNoYW5nZVNsaWRlckJhc2UgKG9wdGlvbnM6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbGVuZ2h0Q2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyDRiNC40YDQuNC90LAgLyDQtNC70LjQvdCwXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmxlbmd0aCAmJiB0aGlzLl9sZW5naHQgIT0gb3B0aW9ucy5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xlbmdodCA9IG9wdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZW5naHRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC+0YDQuNC10L3RgtCw0YbQuNGPXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnZlcnRpY2FsICYmICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKVxyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX3ZlcnRpY2FsJyk7XHJcblxyXG4gICAgICAgICAgICBsZW5naHRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSAmJiB0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl92ZXJ0aWNhbCcpXHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaG9yaXpvbnRhbCcpO1xyXG5cclxuICAgICAgICAgICAgbGVuZ2h0Q2hhbmdlZCA9IHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsZW5naHRDaGFuZ2VkICYmICF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLndpZHRoID0gdGhpcy5fbGVuZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGVuZ2h0Q2hhbmdlZCAmJiB0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fbGVuZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VSYW5nZVRvVmFsIChtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHBvczogbnVtYmVyO1xyXG5cclxuICAgICAgICB0aGlzLl9yYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3RodW1iID0gdGhpcy5idWlsZFRodW1iKHRoaXMuX3NsaWRlcik7XHJcbiAgICAgICAgdGhpcy5fdGh1bWJMZWZ0ID0gdGhpcy5yZW1vdmVOb2RlKHRoaXMuX3RodW1iTGVmdCk7XHJcbiAgICAgICAgdGhpcy5fdGh1bWJSaWdodCA9IHRoaXMucmVtb3ZlTm9kZSh0aGlzLl90aHVtYlJpZ2h0KTtcclxuXHJcbiAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRWYWwoKSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy5fdGh1bWIsIHBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlVmFsVG9SYW5nZSAobW9kZWw6IElNb2RlbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwb3M6IG51bWJlcjtcclxuXHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLl90aHVtYiA9IHRoaXMucmVtb3ZlTm9kZSh0aGlzLl90aHVtYik7XHJcbiAgICAgICAgdGhpcy5fdGh1bWJMZWZ0ID0gdGhpcy5idWlsZFRodW1iKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWJfbGVmdCcpOyBcclxuICAgICAgICB0aGlzLl90aHVtYlJpZ2h0ID0gdGhpcy5idWlsZFRodW1iKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWJfcmlnaHQnKTtcclxuICAgICAgICBcclxuICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMF0pLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iTGVmdCwgcG9zKTtcclxuXHJcbiAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzFdKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYlJpZ2h0LCBwb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkVmFsaWRUb29sdGlwcyhtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9yYW5nZSkgeyBcclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcCApIHRoaXMuX3Rvb2x0aXAgPSB0aGlzLnJlbW92ZU5vZGUoIHRoaXMuX3Rvb2x0aXAgKTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRWYWwoKSApO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwID0gdGhpcy5idWlsZFRvb2x0aXAodGhpcy5fdGh1bWIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbFRvVG9vbHRpcCggdGhpcy5fdG9vbHRpcCwgdmFsLCB0aGlzLl90b29sdGlwTWFzayApOyAgIFxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXBMZWZ0ICkgdGhpcy5fdG9vbHRpcExlZnQgPSB0aGlzLnJlbW92ZU5vZGUoIHRoaXMuX3Rvb2x0aXBMZWZ0ICk7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwTGVmdCA9IHRoaXMuYnVpbGRUb29sdGlwKHRoaXMuX3RodW1iTGVmdCwgJ3NsaWRlcl9fdG9vbHRpcF9sZWZ0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsVG9Ub29sdGlwKCB0aGlzLl90b29sdGlwTGVmdCwgdmFsLCB0aGlzLl90b29sdGlwTWFzayApOyAgXHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXBSaWdodCApIHRoaXMuX3Rvb2x0aXBSaWdodCA9IHRoaXMucmVtb3ZlTm9kZSggdGhpcy5fdG9vbHRpcFJpZ2h0ICk7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVsxXSApO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwUmlnaHQgPSB0aGlzLmJ1aWxkVG9vbHRpcCh0aGlzLl90aHVtYlJpZ2h0LCAnc2xpZGVyX190b29sdGlwX3JpZ2h0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsVG9Ub29sdGlwKCB0aGlzLl90b29sdGlwUmlnaHQsIHZhbCwgdGhpcy5fdG9vbHRpcE1hc2sgKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkU2NhbGUoc2xpZGVyTm9kZTogSFRNTERpdkVsZW1lbnQsIHN0ZXA6IG51bWJlciwgbW9kZWw6IElNb2RlbCwgbWFzazogc3RyaW5nKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGxldCBzY2FsZTogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBsZXQgZGl2aXNpb246IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcblxyXG4gICAgICAgIHNjYWxlLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUnKTtcclxuICAgICAgICBzbGlkZXJOb2RlLnByZXBlbmQoc2NhbGUpO1xyXG5cclxuICAgICAgICAvLyDQvNC90L7QttC40YLQtdC70YwuINCy0L4g0YHQutC+0LvRjNC60L4g0YDQsNC3INGI0LDQsyDQsiDQvNC+0LTQtdC70LUg0LzQtdC90YzRiNC1INGI0LDQs9CwINGI0LrQsNC70YtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyhzdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKG1vZGVsLmdldFN0ZXAoKSkgKTtcclxuICAgICAgICBsZXQgbXVsdDogbnVtYmVyID0gc3RlcCAvIG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICBtdWx0ID0gKygrbXVsdCkudG9GaXhlZChuKTtcclxuICAgICAgICBtdWx0ID0gTWF0aC5hYnMobXVsdCk7ICAgICBcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDw9IG1vZGVsLm51bWJlck9mU3RlcHMoKTsgaSA9IGkgKyBtdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBpICsgbXVsdCDQstC+0LfQstGA0LDRidCw0LXRgiDQvdCwINC60LDQutC+0Lkg0YjQsNCzINC80L7QtNC10LvQuCDQv9C+0L/QsNC00LDQtdGCINGI0LDQsyDRiNC60LDQu9GLXHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZUJ5U3RlcChpKTtcclxuXHJcbiAgICAgICAgICAgIGRpdmlzaW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdmlzaW9uLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUtZGl2aXNpb24nKTtcclxuICAgICAgICAgICAgZGl2aXNpb24uaW5uZXJIVE1MID0gJzxzcGFuPicgKyAgZXZhbChtYXNrKSArICc8L3NwYW4+JztcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLmxlZnQgPSB0aGlzLm9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUudG9wID0gdGhpcy5vbmVTdGVwTGVuZ2h0KCkgKiBpICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2NhbGUuYXBwZW5kKGRpdmlzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlYnVpbGRTY2FsZShtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNjYWxlOiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuZ2V0U2NhbGUoKTtcclxuICAgICAgICBsZXQgcHJldk51bU9mU3RlcHM6IG51bWJlciA9IHNjYWxlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXJfX3NjYWxlLWRpdmlzaW9uJykubGVuZ3RoIC0gMTtcclxuICAgICAgICBsZXQgbmV3TnVtT2ZTdGVwczogbnVtYmVyO1xyXG4gICAgICAgIGxldCBkaXZpc2lvbjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g0LzQvdC+0LbQuNGC0LXQu9GMLiDQstC+INGB0LrQvtC70YzQutC+INGA0LDQtyDRiNCw0LMg0LIg0LzQvtC00LXQu9C1INC80LXQvdGM0YjQtSDRiNCw0LPQsCDRiNC60LDQu9GLXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fc2NhbGVTdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKG1vZGVsLmdldFN0ZXAoKSkgKTtcclxuICAgICAgICBsZXQgbXVsdDogbnVtYmVyID0gdGhpcy5fc2NhbGVTdGVwIC8gbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIG11bHQgPSArbXVsdC50b0ZpeGVkKG4pO1xyXG4gICAgICAgIG11bHQgPSBNYXRoLmFicyhtdWx0KTtcclxuXHJcbiAgICAgICAgbmV3TnVtT2ZTdGVwcyA9IG1vZGVsLm51bWJlck9mU3RlcHMoKSAvIG11bHQ7XHJcblxyXG4gICAgICAgIGlmICggcHJldk51bU9mU3RlcHMgPiBuZXdOdW1PZlN0ZXBzICkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgKHByZXZOdW1PZlN0ZXBzIC0gbmV3TnVtT2ZTdGVwcyk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUubGFzdENoaWxkLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggcHJldk51bU9mU3RlcHMgPCBuZXdOdW1PZlN0ZXBzICkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgKG5ld051bU9mU3RlcHMgLSBwcmV2TnVtT2ZTdGVwcyk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fc2NhbGUtZGl2aXNpb24nKTtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLmlubmVySFRNTCA9ICc8c3Bhbj48L3NwYW4+JztcclxuICAgICAgICAgICAgICAgIHNjYWxlLmFwcGVuZChkaXZpc2lvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlU2NhbGVEaXZpc2lvbihtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGRpdmlzaW9uOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgIGxldCBtYXNrOiBzdHJpbmcgPSB0aGlzLl9zY2FsZU1hc2s7XHJcblxyXG4gICAgICAgIC8vINC80L3QvtC20LjRgtC10LvRjC4g0LLQviDRgdC60L7Qu9GM0LrQviDRgNCw0Lcg0YjQsNCzINCyINC80L7QtNC10LvQtSDQvNC10L3RjNGI0LUg0YjQsNCz0LAg0YjQutCw0LvRi1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3NjYWxlU3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyhtb2RlbC5nZXRTdGVwKCkpICk7XHJcbiAgICAgICAgbGV0IG11bHQ6IG51bWJlciA9IHRoaXMuX3NjYWxlU3RlcCAvIG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICBtdWx0ID0gK211bHQudG9GaXhlZChuKTtcclxuICAgICAgICBtdWx0ID0gTWF0aC5hYnMobXVsdCk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8PSBtb2RlbC5udW1iZXJPZlN0ZXBzKCk7IGkgPSBpICsgbXVsdCkge1xyXG5cclxuICAgICAgICAgICAgLy8gaSArIG11bHQg0LLQvtC30LLRgNCw0YnQsNC10YIg0L3QsCDQutCw0LrQvtC5INGI0LDQsyDQvNC+0LTQtdC70Lgg0L/QvtC/0LDQtNCw0LXRgiDRiNCw0LMg0YjQutCw0LvRi1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGVCeVN0ZXAoaSk7XHJcblxyXG4gICAgICAgICAgICBkaXZpc2lvbiA9IHRoaXMuZ2V0U2NhbGUoKS5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpW2kgLyBtdWx0XSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICAgICAgZGl2aXNpb24ucXVlcnlTZWxlY3Rvcignc3BhbicpLnRleHRDb250ZW50ID0gJycgKyBldmFsKG1hc2spO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUudG9wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLmxlZnQgPSB0aGlzLm9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUubGVmdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS50b3AgPSB0aGlzLm9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUxpbmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5sZWZ0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9saW5lLnN0eWxlLnRvcCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGluZS5zdHlsZS53aWR0aCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5oZWlnaHQgPSBudWxsOyAgXHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fcmFuZ2UpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLnRvcCA9ICcwcHgnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmxlZnQgPSAnMHB4JztcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUud2lkdGggPSBwYXJzZUludCh0aGlzLl90aHVtYi5zdHlsZS5sZWZ0KSArIHRoaXMuX3RodW1iLmNsaWVudFdpZHRoLzIgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS53aWR0aCA9ICcxMDAlJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5sZWZ0ID0gJzBweCdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUudG9wID0gJzBweCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmhlaWdodCA9IHBhcnNlSW50KHRoaXMuX3RodW1iLnN0eWxlLnRvcCkgKyB0aGlzLl90aHVtYi5jbGllbnRIZWlnaHQvMiArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLnRvcCA9ICcwcHgnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLmxlZnQgPSBwYXJzZUludCh0aGlzLl90aHVtYkxlZnQuc3R5bGUubGVmdCkgKyB0aGlzLl90aHVtYkxlZnQuY2xpZW50V2lkdGgvMiArICdweCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lLnN0eWxlLndpZHRoID0gKCBwYXJzZUludCh0aGlzLl90aHVtYlJpZ2h0LnN0eWxlLmxlZnQpIC0gcGFyc2VJbnQodGhpcy5fdGh1bWJMZWZ0LnN0eWxlLmxlZnQpICkgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS53aWR0aCA9ICcxMDAlJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZS5zdHlsZS5sZWZ0ID0gJzBweCdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUudG9wID0gcGFyc2VJbnQodGhpcy5fdGh1bWJMZWZ0LnN0eWxlLnRvcCkgICsgdGhpcy5fdGh1bWJMZWZ0LmNsaWVudEhlaWdodC8yICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUuc3R5bGUuaGVpZ2h0ID0gKCBwYXJzZUludCh0aGlzLl90aHVtYlJpZ2h0LnN0eWxlLnRvcCkgLSBwYXJzZUludCh0aGlzLl90aHVtYkxlZnQuc3R5bGUudG9wKSApICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g0LLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3Ri9C1INC80LXRgtC+0LTRi1xyXG5cclxuICAgIHNldFRodW1iUG9zaXRpb24odGh1bWJOb2RlOiBIVE1MRGl2RWxlbWVudCwgdGh1bWJQb3NpdGlvbjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fdmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS50b3AgPSBudWxsO1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUubGVmdCA9IHRodW1iUG9zaXRpb24gLSB0aHVtYk5vZGUub2Zmc2V0V2lkdGgvMiArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLmxlZnQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUudG9wID0gdGh1bWJQb3NpdGlvbiAtIHRodW1iTm9kZS5vZmZzZXRXaWR0aC8yICsgJ3B4JzsgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQtdGB0LvQuCDQvtCx0LAg0LHQtdCz0YPQvdC60LAg0YHQv9GA0LDQstCwLCDQtNC+0LHQsNCy0LvQtdC8IHogaW5kZXgg0LTQu9GPINC90LjQttC90LXQs9C+XHJcbiAgICAgICAgaWYgKCB0aGlzLmdldFRodW1iKDEpICkge1xyXG4gICAgICAgICAgICBpZiAoICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgICAgIGlmICggKHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUubGVmdCA9PSAodGhpcy5nZXRMZW5naHQoKSAtIHRoaXMuZ2V0VGh1bWIoMSkuY2xpZW50V2lkdGgvMikgKyAncHgnKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRodW1iKDEpLnN0eWxlLnpJbmRleCA9ICcxMDAnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRodW1iKDEpLnN0eWxlLnpJbmRleCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICggKHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUudG9wID09ICh0aGlzLmdldExlbmdodCgpIC0gdGhpcy5nZXRUaHVtYigxKS5jbGllbnRIZWlnaHQvMikgKyAncHgnKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRodW1iKDEpLnN0eWxlLnpJbmRleCA9ICcxMDAnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRodW1iKDEpLnN0eWxlLnpJbmRleCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlTGluZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZhbFRvVG9vbHRpcCh0b29sdGlwTm9kZTogSFRNTERpdkVsZW1lbnQsIHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZSwgbWFzazogc3RyaW5nID0gJ3ZhbCcpOiB2b2lkIHtcclxuICAgICAgICB0b29sdGlwTm9kZS50ZXh0Q29udGVudCA9IGV2YWwobWFzayk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZFRodW1iUG9zaXRpb24obmV3U3RlcCwgbnVtT2ZTdGVwcyk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGVuZ2h0KCkgLyBudW1PZlN0ZXBzICogbmV3U3RlcDtcclxuICAgIH1cclxuXHJcbiAgICBvbmVTdGVwTGVuZ2h0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldExlbmdodCgpIC8gdGhpcy5fbnVtYmVyT2ZTdGVwcztcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVOb2RlKG5vZGU6IEhUTUxEaXZFbGVtZW50KTogdW5kZWZpbmVkIHtcclxuICAgICAgICBub2RlLnJlbW92ZSgpO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2NhbGVTdGVwVmFsaWRhdGlvbihtb2RlbDogSU1vZGVsLCBzdGVwOiBudW1iZXIpOiBudW1iZXIge1xyXG5cclxuICAgICAgICBsZXQgc3RlcElzVmFsaWQ6IGJvb2xlYW47XHJcbiAgICAgICAgbGV0IHRlc3Q6IG51bWJlclxyXG5cclxuICAgICAgICAvLyDQvtC60YDRg9Cz0LvRj9C10LwsINGH0YLQvtCx0Ysg0LjQt9Cx0LXQttCw0YLRjCDQv9GA0L7QsdC70LXQvCDQv9GA0Lgg0LLRi9GH0LjRgdC70LXQvdC40Y/RhSDRgSDQv9C70LDQstCw0Y7RidC10Lkg0YLQvtGH0LrQvtC5XHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXMoc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyhtb2RlbC5nZXRTdGVwKCkpICk7XHJcblxyXG4gICAgICAgIHN0ZXBJc1ZhbGlkID0gdGhpcy5pc051bWVyaWMoc3RlcCk7XHJcblxyXG4gICAgICAgIGlmICggbW9kZWwuZ2V0RGF0YUZvcm1hdCgpID09ICdkYXRlJyAmJiAoIHN0ZXAgJSAoMjQgKiAzNjAwICogMTAwMCkgIT0gMCApKSB7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBzdGVwICogMjQgKiAzNjAwICogMTAwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGVzdCA9IChzdGVwICogTWF0aC5wb3coMTAsIG4pKSAvIChtb2RlbC5nZXRTdGVwKCkgKiBNYXRoLnBvdygxMCwgbikpO1xyXG4gICAgICAgIHRlc3QgPSBNYXRoLmFicyh0ZXN0KTtcclxuXHJcbiAgICAgICAgc3RlcElzVmFsaWQgPSBzdGVwSXNWYWxpZCAmJiAoIHRlc3QgJSAxID09IDAgKTtcclxuXHJcbiAgICAgICAgdGVzdCA9ICsoIG1vZGVsLmdldE1heFZhbCgpIC0gbW9kZWwuZ2V0TWluVmFsKCkgKS50b0ZpeGVkKG4pO1xyXG4gICAgICAgIHRlc3QgPSAoIHRlc3QgKiBNYXRoLnBvdygxMCwgbikgKSAvICggc3RlcCAqIE1hdGgucG93KDEwLCBuKSApO1xyXG4gICAgICAgIHRlc3QgPSBNYXRoLmFicyh0ZXN0KTtcclxuXHJcbiAgICAgICAgc3RlcElzVmFsaWQgPSBzdGVwSXNWYWxpZCAmJiAoIHRlc3QgJSAxID09IDAgKTtcclxuXHJcbiAgICAgICAgc3RlcCA9IHN0ZXBJc1ZhbGlkID8gc3RlcCA6IG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICByZXR1cm4gc3RlcDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g0L/RgNC40LLQsNGC0L3Ri9C1INGE0YPQvdC60YbQuNC4XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZFRodW1iKHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50LCB0aHVtYkNsYXNzPzogc3RyaW5nKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGxldCB0aHVtYjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgICAgIFxyXG4gICAgICAgIHRodW1iLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fdGh1bWInKTtcclxuICAgICAgICB0aHVtYkNsYXNzID8gdGh1bWIuY2xhc3NMaXN0LmFkZCh0aHVtYkNsYXNzKSA6IGZhbHNlO1xyXG4gICAgICAgIHNsaWRlck5vZGUuYXBwZW5kKHRodW1iKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRodW1iO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRMaW5lKHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50LCBsaW5lQ2xhc3M/OiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IGxpbmU6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7ICAgICBcclxuICAgICAgICBsaW5lLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbGluZScpO1xyXG4gICAgICAgIGxpbmVDbGFzcyA/IGxpbmUuY2xhc3NMaXN0LmFkZChsaW5lQ2xhc3MpIDogZmFsc2U7XHJcbiAgICAgICAgc2xpZGVyTm9kZS5hcHBlbmQobGluZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBsaW5lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRUb29sdGlwKHRodW1iTm9kZTogSFRNTERpdkVsZW1lbnQsIHRvb2x0aXBDbGFzcz86IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBsZXQgdG9vbHRpcDogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0b29sdGlwLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fdG9vbHRpcCcpO1xyXG4gICAgICAgIHRvb2x0aXBDbGFzcyA/IHRvb2x0aXAuY2xhc3NMaXN0LmFkZCh0b29sdGlwQ2xhc3MpIDogZmFsc2U7XHJcbiAgICAgICAgdGh1bWJOb2RlLmFwcGVuZCh0b29sdGlwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRvb2x0aXA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgbGVuZ3RoVmFsaWRhdGlvbihzdHI6IGFueSkge1xyXG4gICAgICAgIGlmICggdHlwZW9mICgnJyArIHN0cikgPT0gJ3N0cmluZycgKSB7XHJcbiAgICAgICAgICAgIGxldCByID0gKCcnICsgc3RyKS5tYXRjaCgvXlxcZHsxLDN9Wy4sXT9cXGQqKHB4fGVtfHJlbXwlKT8kL2kpO1xyXG4gICAgICAgICAgICBpZiAoIHIgJiYgdGhpcy5pc051bWVyaWMoclswXSkgKSB7IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcsJywgJy4nKSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gclswXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJywnLCAnLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignV2lkdGggKG9yIGhlaWdodCkgc2hvdWxkIGJlIHZhbGlkIHRvIGNzcycpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNOdW1lcmljKG46IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgIWlzTmFOKG4gLSAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlY2ltYWxQbGFjZXMobnVtOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC60L7Qu9C40YfQtdGB0YLQstC+INC30L3QsNC60L7QsiDQv9C+0YHQu9C1INC30LDQv9GP0YLQvtC5XHJcbiAgICAgICAgcmV0dXJuIH4obnVtICsgJycpLmluZGV4T2YoJy4nKSA/IChudW0gKyAnJykuc3BsaXQoJy4nKVsxXS5sZW5ndGggOiAwO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgaW50ZXJmYWNlIElPcHRpb25zIHtcclxuICAgIC8vIE1vZGVsIG9wdGlvbnNcclxuICAgIGRhdGFGb3JtYXQ6IHN0cmluZztcclxuICAgIHZhbHVlOiBudW1iZXIgfCBzdHJpbmcgfCBudWxsO1xyXG4gICAgbWluVmFsOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICBtYXhWYWw6IG51bWJlciB8IHN0cmluZztcclxuICAgIHN0ZXA6IG51bWJlcjsgICAgXHJcbiAgICByZXZlcnNlOiBib29sZWFuO1xyXG4gICAgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gfCBbc3RyaW5nLCBzdHJpbmddIHwgbnVsbDsgXHJcbiAgICBjdXN0b21WYWx1ZXM/OiBzdHJpbmdbXTtcclxuICAgIHZhbHVlSW5DdXN0b21WYWx1ZXM/OiBzdHJpbmc7XHJcbiAgICByYW5nZUluQ3VzdG9tVmFsdWVzPzogc3RyaW5nO1xyXG5cclxuXHJcbiAgICAvLyBWaWV3IG9wdGlvbnNcclxuICAgIGxlbmd0aDogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgdmVydGljYWw6IGJvb2xlYW47XHJcbiAgICB0b29sdGlwOiBib29sZWFuO1xyXG4gICAgdG9vbHRpcE1hc2s6IHN0cmluZztcclxuICAgIHNjYWxlOiBib29sZWFuO1xyXG4gICAgc2NhbGVTdGVwOiBudW1iZXI7XHJcbiAgICBzY2FsZU1hc2s6IHN0cmluZztcclxufVxyXG5cclxudmFyIGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyA9IHtcclxuICAgIC8vIE1vZGVsIG9wdGlvbnNcclxuICAgIC8vINCyIHJhbmdlINC4INCyIG1pbiDQuCBtYXgg0YHQu9C10LLQsCDRgtC+LCDRh9GC0L4g0YHQu9C10LLQsCDQvdCwINGB0LvQsNC50LTQtdGA0LVcclxuICAgIGRhdGFGb3JtYXQ6ICdudW1lcmljJyxcclxuICAgIHZhbHVlOiBudWxsLCAgICAgIC8vINCyINC90LDRh9Cw0LvRjNC90YvRhSDQvdCw0YHRgtGA0L7QudC60LDRhSDQvdC1INC+0L/RgNC10LTQtdC70LXQvdGLXHJcbiAgICBtaW5WYWw6IDAsICAgICAgICAvLyDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQuNC70Lgg0L/RgNC+0LzQtdC20YPRgtC+0LouXHJcbiAgICBtYXhWYWw6IDEwLCAgICAgICAvLyDQtdGB0LvQuCDQvtC90Lgg0L3QtSDRg9C60LDQt9Cw0L3RiyDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvCwg0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUgXHJcbiAgICBzdGVwOiAxLCAgICAgICAgICAvLyAodmFsdWUpINC4INC/0L7Qt9C40YbQuNGPINCx0LXQs9GD0L3QutCwINGA0LDQstC90Ysg0LzQuNC90LjQvNCw0LvRjNC90L7QvNGDINC30L3QsNGH0LXQvdC40Y5cclxuICAgIHJldmVyc2U6IGZhbHNlLFxyXG4gICAgcmFuZ2U6IG51bGwsXHJcbiAgICBcclxuICAgIGxlbmd0aDogJzMwMHB4JyxcclxuICAgIHZlcnRpY2FsOiBmYWxzZSxcclxuICAgIHRvb2x0aXA6IGZhbHNlLFxyXG4gICAgdG9vbHRpcE1hc2s6IFwidmFsXCIsXHJcbiAgICBzY2FsZTogZmFsc2UsXHJcbiAgICBzY2FsZVN0ZXA6IG51bGwsXHJcbiAgICBzY2FsZU1hc2s6IFwidmFsXCIsXHJcbn1cclxuXHJcbmV4cG9ydCB7IGRlZmF1bHRPcHRpb25zIH07XHJcbiIsImltcG9ydCBNb2RlbCwge0lNb2RlbH0gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCBWaWV3LCB7SVZpZXd9IGZyb20gJy4vVmlldyc7XHJcbmltcG9ydCBQcmVzZW50ZXIgZnJvbSAnLi9QcmVzZW50ZXInO1xyXG5pbXBvcnQge2RlZmF1bHRPcHRpb25zfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuXHJcbmltcG9ydCB7T2JzZXJ2ZXJ9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5pbXBvcnQge0lPYnNlcnZlcn0gZnJvbSAnLi9PYnNlcnZlcic7XHJcbmltcG9ydCBTdWJqZWN0ICBmcm9tICcuL09ic2VydmVyJztcclxuXHJcblxyXG4oZnVuY3Rpb24oJCl7XHJcblxyXG4gIHZhciBtZXRob2RzOiBPYmplY3QgPSB7XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnM/OiBhbnkgKSB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgIFxyXG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSAkdGhpcy5kYXRhKCdzbGlkZXJEYXRhJyk7XHJcbiAgICAgICAgbGV0IHNsaWRlciA9ICR0aGlzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vINCV0YHQu9C4INC/0LvQsNCz0LjQvSDQtdGJ0ZEg0L3QtSDQv9GA0L7QuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0L1cclxuICAgICAgICBpZiAoICEgZGF0YSApIHtcclxuICAgICAgICBcclxuICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgIGxldCBtb2RlbDogSU1vZGVsID0gbmV3IE1vZGVsKG9wdGlvbnMpO1xyXG4gICAgICAgICAgLy8g0L/QtdGA0LXQtNCw0LXQvCDQvNC+0LTQtdC70Ywg0LIg0L/RgNC10LTRgdGC0LDQstC70LXQvdC40LUg0LTQu9GPINC/0L7Qu9GD0YfQtdC90LjRjyDQuNC3INC90LXQtSBcclxuICAgICAgICAgIC8vINC60L7RgNGA0LXQutGC0L3Ri9GFINC00LDQvdC90YvRhVxyXG4gICAgICAgICAgbGV0IHZpZXc6IElWaWV3ID0gbmV3IFZpZXcobW9kZWwsIG9wdGlvbnMsIHRoaXMpO1xyXG5cclxuICAgICAgICAgIC8vINGB0YPQsdGK0LXQutGCIC0g0Y3RgtC+INC90LDQsdC70Y7QtNC10L3QuNC1XHJcbiAgICAgICAgICAvLyDQvtC9INGF0YDQsNC90LjRgiDQt9C90LDRh9C10L3QuNC1IHZhbCDQuNC70Lgg0L/RgNC+0LzQtdC20YPRgtC+0LpcclxuICAgICAgICAgIGxldCB2YWw6IGFueSB8IFthbnksIGFueV07XHJcbiAgICAgICAgICB2YWwgPSBtb2RlbC5nZXRWYWwoKSB8fCBtb2RlbC5nZXRSYW5nZSgpOyBcclxuICAgICAgICAgIGxldCBzdWJqZWN0ID0gbmV3IFN1YmplY3QodmFsKTtcclxuXHJcbiAgICAgICAgICBsZXQgcHJlc2VudGVyID0gbmV3IFByZXNlbnRlcihtb2RlbCwgdmlldywgc3ViamVjdCk7XHJcblxyXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJywge1xyXG4gICAgICAgICAgICBzbGlkZXIgOiBzbGlkZXIsXHJcbiAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcclxuICAgICAgICAgICAgdmlldzogdmlldyxcclxuICAgICAgICAgICAgcHJlc2VudGVyOiBwcmVzZW50ZXIsXHJcbiAgICAgICAgICAgIHN1YmplY3Q6IHN1YmplY3RcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hhbmdlOiBmdW5jdGlvbiggb3B0aW9uczogYW55ICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IHByZXNlbnRlciA9ICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScpLnByZXNlbnRlcjtcclxuICAgICAgICBwcmVzZW50ZXIuY2hhbmdlKG9wdGlvbnMpO1xyXG5cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgZGF0YSA9ICR0aGlzLmRhdGEoJ3NsaWRlckRhdGEnKTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnVuYmluZCgnLnNsaWRlcicpO1xyXG4gICAgICAgIGRhdGEuc2xpZGVyLnJlbW92ZSgpO1xyXG4gICAgICAgICR0aGlzLnJlbW92ZURhdGEoJ3NsaWRlckRhdGEnKTtcclxuICAgICAgICBcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9ic2VydmU6IGZ1bmN0aW9uKCBmdW5jICkge1xyXG5cclxuICAgICAgLy8g0LTQvtCx0LDQstC70Y/QtdC8INC90LDQsdC70Y7QtNCw0YLQtdC70Y9cclxuICAgICAgLy8g0LDRgNCz0YPQvNC10L3RgiAtINGN0YLQsCDRhNGD0L3QutGG0LjRjyDQutC+0YLQvtGA0LDRjyDQsdGD0LTQtdGCINC+0LHRgNCw0LHQsNGC0YvQstCw0YLRjCDQuNC30LzQtdC90LXQvdC40Y9cclxuICAgICAgbGV0IHN1YmplY3QgPSAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnKS5zdWJqZWN0O1xyXG4gICAgICBsZXQgb2JzZXJ2ZXI6IElPYnNlcnZlciA9IG5ldyBPYnNlcnZlciggZnVuYyApO1xyXG5cclxuICAgICAgc3ViamVjdC5hdHRhY2gob2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgXHJcbiAgalF1ZXJ5LmZuLnNsaWRlciA9IGZ1bmN0aW9uKCBtZXRob2QgKSB7XHJcblxyXG4gICAgLy8g0LvQvtCz0LjQutCwINCy0YvQt9C+0LLQsCDQvNC10YLQvtC00LBcclxuICAgIGlmICggbWV0aG9kc1ttZXRob2QgYXMgc3RyaW5nXSApIHtcclxuICAgICAgcmV0dXJuIG1ldGhvZHNbIG1ldGhvZCBhcyBzdHJpbmcgXS5hcHBseSggdGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMSApKTtcclxuICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICEgbWV0aG9kICkge1xyXG5cclxuICAgICAgLy8gPz8/P1xyXG4gICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgIHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJC5lcnJvciggJ01ldGhvZCBjYWxsZWQgJyArICBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IGZvciBKUXVlcnkuc2xpZGVyJyApO1xyXG4gICAgfSBcclxuXHJcbiAgfTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=