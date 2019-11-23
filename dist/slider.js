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
        console.log('mod ' + this._options.range);
        console.log('mod2 ' + newOptions.range);
        var prevOptions = this._options;
        var options = Object.assign({}, prevOptions, newOptions);
        console.log('mod3 ' + options.range);
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
        console.log('я тут' + allOptions.range);
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
        console.log('111111   ' + model.getOptions());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0T3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDhGQUE0RDtBQTRDNUQ7SUFZSSxlQUFZLFVBQW9CO1FBRTVCLElBQUksT0FBTyxHQUFhLFVBQVUsQ0FBQztRQUluQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FB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QztTQUM3RjthQUFNLElBQUssT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLENBQUUsTUFBTSxFQUFHO1lBSW5ELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBRSxDQUFDO1NBQzlDO2FBQU07WUFDTCxDQUFDLENBQUMsS0FBSyxDQUFFLGdCQUFnQixHQUFJLE1BQU0sR0FBRyxtQ0FBbUMsQ0FBRSxDQUFDO1NBQzdFO0lBRUgsQ0FBQyxDQUFDO0FBRUosQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMiLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgSU9wdGlvbnMsIHsgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1vZGVsIHtcclxuICAgIC8vIDFcclxuICAgIGdldFZhbCgpOiBudW1iZXI7XHJcbiAgICBzZXRWYWwobmV3VmFsOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgLy8gMlxyXG4gICAgZ2V0UmFuZ2UoKTogW251bWJlciwgbnVtYmVyXTtcclxuICAgIHNldFJhbmdlKG5ld1JhbmdlOiBbbnVtYmVyLCBudW1iZXJdKTogdm9pZDtcclxuICAgIC8vIDNcclxuICAgIGdldFN0ZXAoKTogbnVtYmVyO1xyXG4gICAgLy8gNFxyXG4gICAgZ2V0TWluVmFsKCk6IG51bWJlcjtcclxuICAgIC8vIDVcclxuICAgIGdldE1heFZhbCgpOiBudW1iZXI7XHJcbiAgICAvLyA2XHJcbiAgICBnZXRSZXZlcnNlKCk6IGJvb2xlYW47XHJcbiAgICAvLyA3XHJcbiAgICBnZXRDdXN0b21WYWx1ZXMoKTogc3RyaW5nW10gfCB1bmRlZmluZWQ7XHJcbiAgICAvLyA4XHJcbiAgICBnZXREYXRhRm9ybWF0KCk6IHN0cmluZztcclxuICAgIC8vIDlcclxuICAgIGdldE9wdGlvbnMoKTogSU1vZGVsT3B0aW9ucztcclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBmaW5kUG9zaXRpb25JbkFycih2YWw6IGFueSwgYXJyPzogYW55W10pOiBudW1iZXI7XHJcbiAgICBnZXRTdGVwTnVtYmVyKHZhbDogbnVtYmVyKTogbnVtYmVyO1xyXG4gICAgdHJhbnNsYXRlQnlTdGVwKHN0ZXA6IG51bWJlcik6IG51bWJlciB8IHN0cmluZyB8IERhdGU7IC8vINC/0L4g0YjQsNCz0YNcclxuICAgIHRyYW5zbGF0ZSh2YWwpOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlOyAvLyDQv9C+INCy0LDQu9C40LTQvdC+0LzRgyDQt9C90LDRh9C10L3QuNGOXHJcbiAgICBudW1iZXJPZlN0ZXBzKCk6IG51bWJlcjtcclxuICAgIGNoYW5nZShuZXdPcHRpb25zOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNb2RlbE9wdGlvbnMge1xyXG4gICAgZGF0YUZvcm1hdDogc3RyaW5nO1xyXG4gICAgdmFsdWU6IG51bWJlciB8IG51bGw7XHJcbiAgICBtaW5WYWw6IG51bWJlcjtcclxuICAgIG1heFZhbDogbnVtYmVyO1xyXG4gICAgc3RlcDogbnVtYmVyO1xyXG4gICAgcmV2ZXJzZTogYm9vbGVhbjtcclxuICAgIHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDsgXHJcbiAgICBjdXN0b21WYWx1ZXM/OiBzdHJpbmdbXTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWwgaW1wbGVtZW50cyBJTW9kZWwge1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGFGb3JtYXQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3ZhbDogbnVtYmVyIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX21pblZhbDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbWF4VmFsOm51bWJlcjsgICBcclxuICAgIHByaXZhdGUgX3N0ZXA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3JldmVyc2U6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9yYW5nZTogW251bWJlciwgbnVtYmVyXSB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9jdXN0b21WYWx1ZXM/OiBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX29wdGlvbnM6IElNb2RlbE9wdGlvbnMgfCBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWxsT3B0aW9uczogSU9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IElPcHRpb25zID0gYWxsT3B0aW9ucztcclxuICAgICAgICAvLyDQtdGB0LvQuCDQvdC1INGD0LrQsNC30LDQvdC+INC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1LCDRg9C60LDQt9GL0LLQsNC10Lwg0LzQuNC90LjQvNCw0LvRjNC90L7QtS5cclxuICAgICAgICAvLyDRjdGC0L4g0L3QtdC+0LHRhdC+0LTQuNC80L4g0YfRgtC+0LHRiyDQv9GA0L7QudGC0Lgg0LLQsNC70LjQtNCw0YbQuNGOINC4INC/0L7RgdGC0LDQstC40YLRjCDQsdC10LPRg9C90L7QuiDRgdC+0LPQu9Cw0YHQvdC+INGI0LDQs9GDLlxyXG4gICAgICAgIC8vINC10YHQu9C4INGD0LrQsNC30LDQvSByYW5nZSwg0LzQtdC90Y/QtdC8INC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1INC90LAgbnVsbFxyXG4gICAgICAgIG9wdGlvbnMudmFsdWUgPSBvcHRpb25zLnZhbHVlID8gb3B0aW9ucy52YWx1ZSA6IG9wdGlvbnMubWluVmFsO1xyXG4gICAgICAgIGxldCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnM7XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdudW1lcmljJyApIHtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy5udW1lcmljRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnZGF0ZScgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBhbGxPcHRpb25zKTtcclxuICAgICAgICAgICAgLy9pZiAoICF0aGlzLl9vcHRpb25zLnZhbHVlICkgdGhpcy5fb3B0aW9ucy52YWx1ZSA9IHRoaXMuX29wdGlvbnMuX21pblZhbDsgXHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMuZGF0ZUZvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ2N1c3RvbScgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMuY3VzdG9tRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXMgPSBvcHRpb25zLmN1c3RvbVZhbHVlcztcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGZvcm1hdCBvZiBkYXRhJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kYXRhRm9ybWF0ID0gdmFsaWRPcHRpb25zLmRhdGFGb3JtYXQ7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gdmFsaWRPcHRpb25zLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX21pblZhbCA9IHZhbGlkT3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgdGhpcy5fbWF4VmFsID0gdmFsaWRPcHRpb25zLm1heFZhbDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gdmFsaWRPcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZSA9IHZhbGlkT3B0aW9ucy5yZXZlcnNlO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gdmFsaWRPcHRpb25zLnJhbmdlO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVZhbHVlcyA9IHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXM7ICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgIT0gJ2RhdGUnKSB0aGlzLl9vcHRpb25zID0gdmFsaWRPcHRpb25zO1xyXG5cclxuICAgICAgICAvLyDQtNC70Y8g0LTQsNGCINGB0L7RhdGA0LDQvdGP0LXQvCDQv9C10YDQtdC00LDQvdC90YvQtSDQvtC/0YbQuNC4XHJcbiAgICAgICAgLy8g0L/QvtGC0L7QvNGDINGH0YLQviDQtNC70Y8g0LLQsNC70LjQtNCw0YbQuNC4INC90YPQttC90Ysg0LTQsNGC0Ysg0LLQuNC00LAgJ2RkL21tL3l5eXknXHJcblxyXG4gICAgICAgIC8qIGlmICh0aGlzLl9kYXRhRm9ybWF0ID09ICdkYXRlJykge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gYWxsT3B0aW9ucztcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fb3B0aW9ucyk7XHJcbiAgICAgICAgfSAqL1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDFcclxuICAgIGdldFZhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWw7XHJcbiAgICB9XHJcbiAgICBzZXRWYWwobmV3VmFsOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFyZU51bWVyaWMobmV3VmFsKTtcclxuICAgICAgICB0aGlzLm9uZVZhbHVlVmFsaWRhdGlvbih0aGlzLl9taW5WYWwsIHRoaXMuX21heFZhbCwgbmV3VmFsLCB0aGlzLl9zdGVwKTtcclxuICAgICAgICB0aGlzLl92YWwgPSBuZXdWYWw7XHJcbiAgICB9XHJcbiAgICAvLyAyXHJcbiAgICBnZXRSYW5nZSgpOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmFuZ2U7XHJcbiAgICB9XHJcbiAgICBzZXRSYW5nZShuZXdSYW5nZTogW251bWJlciwgbnVtYmVyXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXJlTnVtZXJpYyhuZXdSYW5nZVswXSwgbmV3UmFuZ2VbMV0pXHJcbiAgICAgICAgdGhpcy5yYW5nZVZhbGlkYXRpb24odGhpcy5fbWluVmFsLCB0aGlzLl9tYXhWYWwsIG5ld1JhbmdlLCB0aGlzLl9zdGVwKTtcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLm1pbk1heFZhbGlkYXRpb24obmV3UmFuZ2VbMF0sIG5ld1JhbmdlWzFdLCB0aGlzLl9yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgdGhpcy5fcmFuZ2UgPSBuZXdSYW5nZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9yYW5nZSA9IFtuZXdSYW5nZVsxXSwgbmV3UmFuZ2VbMF1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmFuZ2UgPSBuZXdSYW5nZTtcclxuICAgIH1cclxuICAgIC8vIDNcclxuICAgIGdldFN0ZXAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcDtcclxuICAgIH1cclxuICAgIC8vIDRcclxuICAgIGdldE1pblZhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5WYWw7XHJcbiAgICB9XHJcbiAgICAvLyA1XHJcbiAgICBnZXRNYXhWYWwoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4VmFsO1xyXG4gICAgfVxyXG4gICAgLy8gNlxyXG4gICAgZ2V0UmV2ZXJzZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmV2ZXJzZTtcclxuICAgIH1cclxuICAgIC8vIDdcclxuICAgIGdldEN1c3RvbVZhbHVlcygpOiBhbnlbXSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1c3RvbVZhbHVlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gOFxyXG4gICAgZ2V0RGF0YUZvcm1hdCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhRm9ybWF0O1xyXG4gICAgfVxyXG4gICAgZ2V0T3B0aW9ucygpOiBJTW9kZWxPcHRpb25zIHtcclxuLyogICAgICAgICBsZXQgb3B0czogSU1vZGVsT3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XHJcbiAgICAgICAgaWYgKCB0aGlzLl92YWwgKSB7XHJcbiAgICAgICAgICAgIC8vb3B0cy52YWx1ZSA9IHRoaXMuX3ZhbDtcclxuICAgICAgICAgICAgb3B0cy5yYW5nZSA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3B0cy52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vb3B0cy5yYW5nZSA9IHRoaXMuX3JhbmdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0czsgKi9cclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygndicgKyB0aGlzLl9vcHRpb25zLl92YWwpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3InICsgdGhpcy5fb3B0aW9ucy5fcmFuZ2UpO1xyXG5cclxuICAgICAgICBsZXQgb3B0czogSU1vZGVsT3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fcmFuZ2UgKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsOiBhbnk7XHJcbiAgICAgICAgICAgIC8vdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3ZhbCApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnRyYW5zbGF0ZSggdGhpcy5fdmFsICk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gKCcwJyArIHZhbC5nZXREYXRlKCkpLnNsaWNlKC0yKSArIFxyXG4gICAgICAgICAgICAgICAgJy8nICsgKCcwJyArICgxICsgdmFsLmdldE1vbnRoKCkpICkuc2xpY2UoLTIpICtcclxuICAgICAgICAgICAgICAgICcvJyArICggdmFsLmdldEZ1bGxZZWFyKCkgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuX3ZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0cy52YWx1ZSA9IHZhbDtcclxuICAgICAgICAgICAgb3B0cy5yYW5nZSA9IG51bGw7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsOiBhbnk7XHJcbiAgICAgICAgICAgIGxldCBhcnI6IFthbnksIGFueV0gPSBbbnVsbCwgbnVsbF07XHJcbiAgICAgICAgICAgIC8vdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3JhbmdlWzBdICk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCAhPSAnZGF0ZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2FyciA9IFt0aGlzLnRyYW5zbGF0ZSggdGhpcy5fcmFuZ2VbMF0gKSwgdGhpcy50cmFuc2xhdGUoIHRoaXMuX3JhbmdlWzFdICldO1xyXG4gICAgICAgICAgICAgICAgYXJyID0gdGhpcy5fcmFuZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy50cmFuc2xhdGUoIHRoaXMuX3JhbmdlWzBdICk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSAoJzAnICsgdmFsLmdldERhdGUoKSkuc2xpY2UoLTIpICsgXHJcbiAgICAgICAgICAgICAgICAnLycgKyAoJzAnICsgKDEgKyB2YWwuZ2V0TW9udGgoKSkgKS5zbGljZSgtMikgK1xyXG4gICAgICAgICAgICAgICAgJy8nICsgdmFsLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXJyWzBdID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudHJhbnNsYXRlKCB0aGlzLl9yYW5nZVsxXSApO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gKCcwJyArIHZhbC5nZXREYXRlKCkpLnNsaWNlKC0yKSArIFxyXG4gICAgICAgICAgICAgICAgJy8nICsgKCcwJyArICgxICsgdmFsLmdldE1vbnRoKCkpICkuc2xpY2UoLTIpICtcclxuICAgICAgICAgICAgICAgICcvJyArIHZhbC5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGFyclsxXSA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0cy52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIG9wdHMucmFuZ2UgPSBhcnI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0cztcclxuICAgIH1cclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBmaW5kUG9zaXRpb25JbkFycih2YWw6IGFueSwgYXJyPzogYW55W10pOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC40YnQtdGCINC/0L7Qt9C40YbQuNGOIHZhbCDQsiBjdXN0b20gdmFsdWVzXHJcbiAgICAgICAgLy8g0YLQsNC6INC20LUg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNGB0L/QvtC70YzQt9C+0LLQsNC9INGBINC70Y7QsdGL0Lwg0LTRgNGD0LPQuCDQvNCw0YHRgdC40LLQvtC8XHJcbiAgICAgICAgaWYgKCBhcnIgJiYgYXJyLmluZGV4T2YodmFsKSAhPSAtMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFyci5pbmRleE9mKHZhbCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICggYXJyICYmIGFyci5pbmRleE9mKHZhbCkgPT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudCBmaW5kIHZhbHVlIGluIGFycmF5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICF0aGlzLl9jdXN0b21WYWx1ZXMgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHRoaXMuX2N1c3RvbVZhbHVlcy5pbmRleE9mKHZhbCkgIT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21WYWx1ZXMuaW5kZXhPZih2YWwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHZhbGlkIHZhbHVlIGZvciBjdXN0b20gdmFsdWVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0ZXBOdW1iZXIodmFsOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIC8vINC90LDRhdC+0LTQuNGCLCDQvdCwINC60LDQutC+0Lwg0L/QviDRgdGH0LXRgtGDINGI0LDQs9C1INGB0YLQvtC40YIgdmFsXHJcbiAgICAgICAgLy8g0L/RgNC40LzQtdC90Y/RgtGMINGC0L7Qu9GM0LrQviDQtNC70Y8g0L3QtdGC0YDQsNC90YHRhNC+0YDQvNC40YDQvtCy0LDQvdC90YvRhSwg0L/RgNCw0LLQuNC70YzQvdGL0YUg0LfQvdCw0YfQtdC90LjQuSFcclxuICAgICAgICBsZXQgc3RlcE51bTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fbWluVmFsKSApO1xyXG5cclxuICAgICAgICBsZXQgYTogbnVtYmVyID0gKyh2YWwgLSB0aGlzLl9taW5WYWwpLnRvRml4ZWQobik7XHJcbiAgICAgICAgbGV0IGI6IG51bWJlciA9ICsodGhpcy5fbWF4VmFsIC0gdGhpcy5fbWluVmFsKS50b0ZpeGVkKG4pXHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RlcE51bSA9ICsoIGEgKiB0aGlzLm51bWJlck9mU3RlcHMoKSAvIGIgKS50b0ZpeGVkKCk7XHJcbiAgICAgICAgc3RlcE51bSA9IE1hdGguYWJzKHN0ZXBOdW0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc3RlcE51bTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2xhdGVCeVN0ZXAoc3RlcDogbnVtYmVyKTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2N1c3RvbScpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICggIXRoaXMuX3JldmVyc2UgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVmFsdWVzW3N0ZXBdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbVZhbHVlc1t0aGlzLl9jdXN0b21WYWx1ZXMubGVuZ3RoIC0gc3RlcCAtIDFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3N0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fbWluVmFsKSApO1xyXG4gICAgICAgICAgICBsZXQgcjogbnVtYmVyID0gIXRoaXMuX3JldmVyc2UgPyAxIDogLTE7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciA9ICsoICgrdGhpcy5fbWluVmFsKSArICgrdGhpcy5fc3RlcCkgKiAoK3N0ZXApICogKCtyKSApLnRvRml4ZWQobik7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YUZvcm1hdCA9PSAnZGF0ZScpIHsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodmFsKTsgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiB2YWw7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zbGF0ZSh2YWwpOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlIHtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2N1c3RvbScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbVZhbHVlc1t2YWxdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGFGb3JtYXQgPT0gJ2RhdGUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpOyBcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG51bWJlck9mU3RlcHMoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuICAgICAgICBuID0gTWF0aC5wb3coMTAsIG4pO1xyXG4gICAgICAgIHJldHVybiAoIE1hdGguYWJzKHRoaXMuX21heFZhbCAtIHRoaXMuX21pblZhbCkgKiBuICkgLyAoIHRoaXMuX3N0ZXAgKiBuICk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlKG5ld09wdGlvbnM6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnbW9kICcgKyB0aGlzLl9vcHRpb25zLnJhbmdlKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnbW9kMiAnICsgbmV3T3B0aW9ucy5yYW5nZSk7XHJcblxyXG4gICAgICAgIGxldCBwcmV2T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IGFueSA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBuZXdPcHRpb25zKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ21vZDMgJyArIG9wdGlvbnMucmFuZ2UpO1xyXG5cclxuICAgICAgICBvcHRpb25zLnZhbHVlID0gb3B0aW9ucy52YWx1ZSAhPSBudWxsID8gb3B0aW9ucy52YWx1ZSA6IG9wdGlvbnMubWluVmFsO1xyXG4gICAgICAgIGxldCB2YWxpZE9wdGlvbnM6IElNb2RlbE9wdGlvbnM7XHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5kYXRhRm9ybWF0ID09ICdudW1lcmljJyApIHtcclxuICAgICAgICAgICAgdmFsaWRPcHRpb25zID0gdGhpcy5udW1lcmljRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBwcmV2T3B0aW9ucyBhcyBJT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG9wdGlvbnMuZGF0YUZvcm1hdCA9PSAnZGF0ZScgKSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBuZXdPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMuZGF0ZUZvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgcHJldk9wdGlvbnMgYXMgSU9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHByZXZPcHRpb25zLCBuZXdPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGFsbE9wdGlvbnMpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLmRhdGFGb3JtYXQgPT0gJ2N1c3RvbScgKSB7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucyA9IHRoaXMuY3VzdG9tRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBwcmV2T3B0aW9ucyBhcyBJT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXMgPSBvcHRpb25zLmN1c3RvbVZhbHVlcztcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGZvcm1hdCBvZiBkYXRhJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kYXRhRm9ybWF0ID0gdmFsaWRPcHRpb25zLmRhdGFGb3JtYXQ7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gdmFsaWRPcHRpb25zLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX21pblZhbCA9IHZhbGlkT3B0aW9ucy5taW5WYWw7XHJcbiAgICAgICAgdGhpcy5fbWF4VmFsID0gdmFsaWRPcHRpb25zLm1heFZhbDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gdmFsaWRPcHRpb25zLnN0ZXA7XHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZSA9IHZhbGlkT3B0aW9ucy5yZXZlcnNlO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gdmFsaWRPcHRpb25zLnJhbmdlO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVZhbHVlcyA9IHZhbGlkT3B0aW9ucy5jdXN0b21WYWx1ZXM7ICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFGb3JtYXQgIT0gJ2RhdGUnKSB0aGlzLl9vcHRpb25zID0gdmFsaWRPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24oYWxsT3B0aW9uczogSU9wdGlvbnMsIGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyk6IElNb2RlbE9wdGlvbnMge1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBJT3B0aW9ucyA9IGFsbE9wdGlvbnM7XHJcbiAgICAgICAgLy8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQvdCw0YfQsNC70YzQvdGL0Lwg0L7Qv9GG0LjRj9C8INC00LXRhNC+0LvRgtC90YvQtSDQt9C90LDRh9C10L3QuNGPINC40LcgZGVmYXVsdE9wdGlvbnNcclxuICAgICAgICAvLyDQvdCw0YfQsNC70YzQvdC+0LzRgyDQt9C90LDRh9C10L3QuNGOINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0LzQuNC90LjQvNCw0LvRjNC90L7QtVxyXG4gICAgICAgIC8vINC/0L4g0LzQtdGA0LUg0L/RgNC+0YXQvtC20LTQtdC90LjRjyDQstCw0LvQuNC00LDRhtC40LgsINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPINC90LAg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC40LVcclxuICAgICAgICBsZXQgbmV3T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgZGF0YUZvcm1hdDogJ251bWVyaWMnLFxyXG4gICAgICAgICAgICB2YWx1ZTogZGVmYXVsdE9wdGlvbnMubWluVmFsLFxyXG4gICAgICAgICAgICBtaW5WYWw6IGRlZmF1bHRPcHRpb25zLm1pblZhbCxcclxuICAgICAgICAgICAgbWF4VmFsOiBkZWZhdWx0T3B0aW9ucy5tYXhWYWwsXHJcbiAgICAgICAgICAgIHN0ZXA6IGRlZmF1bHRPcHRpb25zLnN0ZXAsXHJcbiAgICAgICAgICAgIHJldmVyc2U6IGRlZmF1bHRPcHRpb25zLnJldmVyc2UsXHJcbiAgICAgICAgICAgIHJhbmdlOiBkZWZhdWx0T3B0aW9ucy5yYW5nZSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYXJlTnVtZXJpYyhvcHRpb25zLm1heFZhbCwgb3B0aW9ucy5taW5WYWwsIG9wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgIG5ld09wdGlvbnMuc3RlcCA9IE1hdGguYWJzKG9wdGlvbnMuc3RlcCk7XHJcbiAgICAgICAgbmV3T3B0aW9ucy5yZXZlcnNlID0gb3B0aW9ucy5yZXZlcnNlID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIG5ld09wdGlvbnMuZGF0YUZvcm1hdCA9IG9wdGlvbnMuZGF0YUZvcm1hdDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnN0ZXBWYWxpZGF0aW9uKG9wdGlvbnMubWluVmFsLCBvcHRpb25zLm1heFZhbCwgbmV3T3B0aW9ucy5zdGVwKTtcclxuXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0LzQuNC9INC4INC80LDQutGBINC/0LXRgNC10L/Rg9GC0LDQvdGLINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8LCDQvNC10L3Rj9C10Lwg0L/QvtGA0Y/QtNC+0LpcclxuICAgICAgICAvLyDQv9C+0LTRgNCw0LfRg9C80LXQstCw0LXRgtGB0Y8sINGH0YLQviBtaW4gLSDRjdGC0L4g0YLQviDRh9GC0L4g0YHQu9C10LLQsCDQvdCwINGB0LvQsNC50LTQtdGA0LUsIG1heCAtINGB0L/RgNCw0LLQsFxyXG4gICAgICAgIGlmICggdGhpcy5taW5NYXhWYWxpZGF0aW9uKG9wdGlvbnMubWluVmFsLCBvcHRpb25zLm1heFZhbCwgbmV3T3B0aW9ucy5yZXZlcnNlKSApIHtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5taW5WYWwgPSBvcHRpb25zLm1pblZhbDtcclxuICAgICAgICAgICAgbmV3T3B0aW9ucy5tYXhWYWwgPSBvcHRpb25zLm1heFZhbDsgICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLm1pblZhbCA9IG9wdGlvbnMubWF4VmFsO1xyXG4gICAgICAgICAgICBuZXdPcHRpb25zLm1heFZhbCA9IG9wdGlvbnMubWluVmFsOyAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMucmFuZ2UgKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFuZ2VWYWxpZGF0aW9uKG5ld09wdGlvbnMubWluVmFsLCBuZXdPcHRpb25zLm1heFZhbCwgb3B0aW9ucy5yYW5nZSwgbmV3T3B0aW9ucy5zdGVwKTtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LzQuNC9INC4INC80LDQutGBINCyINC00LjQsNC/0LDQt9C+0L3QtSByYW5nZSDQv9C10YDQtdC/0YPRgtCw0L3RiyDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvCwg0LzQtdC90Y/QtdC8INC/0L7RgNGP0LTQvtC6XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5taW5NYXhWYWxpZGF0aW9uKG9wdGlvbnMucmFuZ2VbMF0sIG9wdGlvbnMucmFuZ2VbMV0sIG5ld09wdGlvbnMucmV2ZXJzZSkgKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdPcHRpb25zLnJhbmdlID0gb3B0aW9ucy5yYW5nZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld09wdGlvbnMucmFuZ2UgPSBbb3B0aW9ucy5yYW5nZVsxXSwgb3B0aW9ucy5yYW5nZVswXV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vINC+0YLQvNC10L3Rj9C10Lwg0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUsINC00LDQttC1INC10YHQu9C4INC+0L3QviDQstCy0LXQtNC10L3QviDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvFxyXG4gICAgICAgICAgICBuZXdPcHRpb25zLnZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0LfQsNC/0YPRgdC60LDQtdC8INC/0YDQvtCy0LXRgNC60Lgg0LTQu9GPINC90LDRh9Cw0LvRjNC90L7Qs9C+INC30L3QsNGH0LXQvdC40Y8sINGC0L7Qu9GM0LrQviDQtdGB0LvQuCDQvdC1INGD0LrQsNC30LDQvSDQtNC40LDQv9Cw0LfQvtC9IHJhbmdlXHJcbiAgICAgICAgICAgIHRoaXMuYXJlTnVtZXJpYyhvcHRpb25zLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5vbmVWYWx1ZVZhbGlkYXRpb24obmV3T3B0aW9ucy5taW5WYWwsIG5ld09wdGlvbnMubWF4VmFsLCBvcHRpb25zLnZhbHVlLCBuZXdPcHRpb25zLnN0ZXApO1xyXG5cclxuICAgICAgICAgICAgbmV3T3B0aW9ucy52YWx1ZSA9IG9wdGlvbnMudmFsdWU7XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMucmFuZ2UgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbmV3T3B0aW9ucztcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBkYXRlRm9ybWF0VmFsaWRhdGlvbihhbGxPcHRpb25zOiBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zKTogSU1vZGVsT3B0aW9ucyB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IElPcHRpb25zID0gYWxsT3B0aW9ucztcclxuXHJcbiAgICAgICAgdGhpcy5jdXN0b21EYXRlVmFsaWRhdGlvbihvcHRpb25zLm1pblZhbCwgb3B0aW9ucy5tYXhWYWwpO1xyXG4gICAgICAgIG9wdGlvbnMubWluVmFsID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5taW5WYWwpO1xyXG4gICAgICAgIG9wdGlvbnMubWF4VmFsID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5tYXhWYWwpO1xyXG4gICAgICAgIG9wdGlvbnMuc3RlcCA9IHRoaXMudHJhbmxhdGVTdGVwVG9EYXRlRm9ybWF0KG9wdGlvbnMuc3RlcCk7XHJcblxyXG4gICAgICAgIGlmICggQXJyYXkuaXNBcnJheShvcHRpb25zLnJhbmdlKSAmJiBvcHRpb25zLnJhbmdlLmxlbmd0aCA9PSAyICkge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LLQstC10Lsg0YfRgtC+INGC0L4g0LTRgNGD0LPQvtC1LCDQsCDQvdC1IHJhbmdlLCDQvdCwINGN0YLQvtC8XHJcbiAgICAgICAgICAgIC8vINGN0YLQsNC/0LUg0L7RiNC40LHQutC4INC90LUg0LHRg9C00LXRgi4g0J7QvdCwINC/0L7Rj9Cy0LjRgtGB0Y8g0L/RgNC4INC/0YDQvtCy0LXRgNC60LUg0L3QsCBudW1lcmljRm9ybWF0VmFsaWRhdGlvblxyXG4gICAgICAgICAgICAvLyAo0L/QvtGC0L7QvNGDINGH0YLQviByYW5nZSDRgtCw0Log0Lgg0L7RgdGC0LDQtdGC0YHRjyB0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbURhdGVWYWxpZGF0aW9uKG9wdGlvbnMucmFuZ2VbMF0sIG9wdGlvbnMucmFuZ2VbMV0pO1xyXG4gICAgICAgICAgICBvcHRpb25zLnJhbmdlWzBdID0gdGhpcy50cmFuc2xhdGVEYXRlVG9OdW1iZXIob3B0aW9ucy5yYW5nZVswXSk7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMV0gPSB0aGlzLnRyYW5zbGF0ZURhdGVUb051bWJlcihvcHRpb25zLnJhbmdlWzFdKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRlVmFsaWRhdGlvbihvcHRpb25zLnZhbHVlKTtcclxuICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMudHJhbnNsYXRlRGF0ZVRvTnVtYmVyKG9wdGlvbnMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5udW1lcmljRm9ybWF0VmFsaWRhdGlvbihvcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgY3VzdG9tRm9ybWF0VmFsaWRhdGlvbihhbGxPcHRpb25zOiBJT3B0aW9ucywgZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zKTogSU1vZGVsT3B0aW9ucyB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ9GPINGC0YPRgicgKyBhbGxPcHRpb25zLnJhbmdlKTtcclxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnMgPSBhbGxPcHRpb25zO1xyXG5cclxuICAgICAgICBpZiAoICFvcHRpb25zLmN1c3RvbVZhbHVlcyApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjdXN0b21WYWx1ZXMgaXMgcmVxdWlyZWQgb3B0aW9uIGZvciBjdXN0b20gZm9ybWF0Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICggIUFycmF5LmlzQXJyYXkob3B0aW9ucy5jdXN0b21WYWx1ZXMpIHx8IG9wdGlvbnMuY3VzdG9tVmFsdWVzLmxlbmd0aCA8IDIgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY3VzdG9tVmFsdWVzIHNob3VsZCBiZSBhIHJhbmdlIHdpdGggdHdvIG9yIG1vcmUgaXRlbXMsIGxpa2UgWzEsIDIsIFwiYVwiXScpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIG9wdGlvbnMubWluVmFsID0gMDtcclxuICAgICAgICBvcHRpb25zLm1heFZhbCA9IG9wdGlvbnMuY3VzdG9tVmFsdWVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgb3B0aW9ucy5zdGVwID0gMTtcclxuXHJcbiAgICAgICAgLy8g0L/RgNC40L7RgNC40YLQtdGC0Ysg0L7Qv9GG0LjQuTpcclxuICAgICAgICAvLyAxLiByYW5nZSDQsiDRh9C40YHQu9Cw0YVcclxuICAgICAgICAvLyAyLiByYW5nZSDQsiDQt9C90LDRh9C10L3QuNGP0YVcclxuICAgICAgICAvLyAzLiB2YWx1ZSDQutCw0Log0YfQuNGB0LvQvlxyXG4gICAgICAgIC8vIDQuIHZhbHVlINC60LDQuiDQt9C90LDRh9C10L3QuNC1IFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5yYW5nZSB8fCBvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXMgKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFvcHRpb25zLnJhbmdlICYmIEFycmF5LmlzQXJyYXkob3B0aW9ucy5yYW5nZUluQ3VzdG9tVmFsdWVzKSAmJiBvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXMubGVuZ3RoID09IDIgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LLQstC10Lsg0YfRgtC+INGC0L4g0LTRgNGD0LPQvtC1LCDQsCDQvdC1IHJhbmdlLCDQvdCwINGN0YLQvtC8XHJcbiAgICAgICAgICAgICAgICAvLyDRjdGC0LDQv9C1INC+0YjQuNCx0LrQuCDQvdC1INCx0YPQtNC10YIuINCe0L3QsCDQv9C+0Y/QstC40YLRgdGPINC/0YDQuCDQv9GA0L7QstC10YDQutC1INC90LAgbnVtZXJpY0Zvcm1hdFZhbGlkYXRpb25cclxuICAgICAgICAgICAgICAgIC8vICjQv9C+0YLQvtC80YMg0YfRgtC+IHJhbmdlINGC0LDQuiDQuCDQvtGB0YLQsNC10YLRgdGPIHRydWUpXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJhbmdlID0gW107XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJhbmdlWzBdID0gdGhpcy5maW5kUG9zaXRpb25JbkFycihvcHRpb25zLnJhbmdlSW5DdXN0b21WYWx1ZXNbMF0sIG9wdGlvbnMuY3VzdG9tVmFsdWVzKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmFuZ2VbMV0gPSB0aGlzLmZpbmRQb3NpdGlvbkluQXJyKG9wdGlvbnMucmFuZ2VJbkN1c3RvbVZhbHVlc1sxXSwgb3B0aW9ucy5jdXN0b21WYWx1ZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC90LUg0LLQstC10LTQtdC90YsgdmFsINC40LvQuCByYW5nZSDQsiBjdXN0b20gdmFsdWVzXHJcbiAgICAgICAgICAgIC8vINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0L/RgNC+0YHRgtGL0LUgdmFsdWUg0LjQu9C4IHJhbmdlLCDQtdGB0LvQuCDQvtC90Lgg0LXRgdGC0YwgXHJcbiAgICAgICAgICAgIGlmICggIW9wdGlvbnMudmFsdWUgJiYgb3B0aW9ucy52YWx1ZUluQ3VzdG9tVmFsdWVzICkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMuZmluZFBvc2l0aW9uSW5BcnIob3B0aW9ucy52YWx1ZUluQ3VzdG9tVmFsdWVzLCBvcHRpb25zLmN1c3RvbVZhbHVlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtZXJpY0Zvcm1hdFZhbGlkYXRpb24ob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFyZU51bWVyaWMoLi4udmFsczogYW55KSB7XHJcbiAgICAgICAgZm9yIChsZXQgdmFsIG9mIHZhbHMpIHtcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5pc051bWVyaWModmFsKSApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIHZhbHVlcyBpbiBudW1lcmljIGZvcm1hdCBzaG91bGQgYmUgbnVtYmVycycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWluTWF4VmFsaWRhdGlvbihtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIsIHJldmVyc2U6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoICFyZXZlcnNlICYmIChtaW5WYWwgPj0gbWF4VmFsKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHJldmVyc2UgJiYgKG1pblZhbCA8PSBtYXhWYWwpICkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RlcFZhbGlkYXRpb24obWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyhzdGVwKSApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGVwIHNob3VsZCBiZSBhIG51bWJlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHN0ZXAgPT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGVwIGNhbnQgYmUgZXF1YWwgdG8gMCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXModGhpcy5fc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9taW5WYWwpICk7XHJcbiAgICAgICAgbGV0IHRlc3Q6IG51bWJlciA9ICsobWF4VmFsIC0gbWluVmFsKS50b0ZpeGVkKG4pXHJcbiAgICAgICAgdGVzdCA9ICggdGVzdCAqIE1hdGgucG93KDEwLCBuKSApIC8gKCBzdGVwICogTWF0aC5wb3coMTAsIG4pICk7XHJcbiAgICAgICAgdGVzdCA9IE1hdGguYWJzKHRlc3QpO1xyXG5cclxuICAgICAgICBpZiAoIHRlc3QgJSAxICE9IDAgKSB7XHJcbiAgICAgICAgICAgIC8vINCyINGC0L7QvCDRh9C40YHQu9C1INGN0YLQviDQv9GA0L7QstC10YDQutCwINGH0YLQvtCx0Ysg0YjQsNCzINCx0YvQuyDQvdC1INCx0L7Qu9GM0YjQtSDQstGB0LXQs9C+INC/0YDQvtC80LXQttGD0YLQutCwXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignKE1heCB2YWx1ZSAtIG1pbiB2YWx1ZSkgZGl2aWRlZCBieSBzdGVwIHNob3VsZCByZXR1cm4gaW50ZWdlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uZVZhbHVlVmFsaWRhdGlvbihtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIsIHZhbDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IE1hdGgubWF4KCB0aGlzLmRlY2ltYWxQbGFjZXMoc3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyhtaW5WYWwpICk7XHJcblxyXG4gICAgICAgIGxldCB0ZXN0OiBudW1iZXIgPSArKHZhbCAtIG1pblZhbCkudG9GaXhlZChuKVxyXG4gICAgICAgIHRlc3QgPSAoIHRlc3QgKiBNYXRoLnBvdygxMCwgbikgKSAvICggc3RlcCAqIE1hdGgucG93KDEwLCBuKSApO1xyXG4gICAgICAgIHRlc3QgPSBNYXRoLmFicyh0ZXN0KTtcclxuXHJcbiAgICAgICAgaWYgKCBNYXRoLm1heChtaW5WYWwsIG1heFZhbCkgPCB2YWwgIHx8ICBNYXRoLm1pbihtaW5WYWwsIG1heFZhbCkgPiB2YWwgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGluaXRpYWwgdmFsdWUgc2hvdWxkIGJlIHdpdGhpbiBtaW4gYW5kIG1heCB2YWx1ZXMnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHRlc3QgJSAxICE9IDAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWUgc2hvdWxkIGJlIHNldCBvbiBzdGVwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZ2VWYWxpZGF0aW9uKG1pblZhbDogbnVtYmVyLCBtYXhWYWw6IG51bWJlciwgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0sIHN0ZXA6IG51bWJlcikge1xyXG5cclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9zdGVwKSwgdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX21pblZhbCkgKTtcclxuXHJcbiAgICAgICAgbGV0IHRlc3RMZWZ0OiBudW1iZXIgPSAocmFuZ2VbMF0gLSBtaW5WYWwpIC8gc3RlcDtcclxuICAgICAgICB0ZXN0TGVmdCA9ICt0ZXN0TGVmdC50b0ZpeGVkKG4pO1xyXG4gICAgICAgIHRlc3RMZWZ0ID0gTWF0aC5hYnModGVzdExlZnQpO1xyXG5cclxuICAgICAgICBsZXQgdGVzdFJpZ2h0OiBudW1iZXIgPSAocmFuZ2VbMV0gLSBtaW5WYWwpIC8gc3RlcDtcclxuICAgICAgICB0ZXN0UmlnaHQgPSArdGVzdFJpZ2h0LnRvRml4ZWQobik7XHJcbiAgICAgICAgdGVzdFJpZ2h0ID0gTWF0aC5hYnModGVzdFJpZ2h0KTtcclxuXHJcbiAgICAgICAgaWYgKCByYW5nZS5sZW5ndGggIT0gMiApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSYW5nZSBzaG91bGQgY29udGFpbiB0d28gdmFsdWVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggIXRoaXMuaXNOdW1lcmljKHJhbmdlWzBdKSB8fCAhdGhpcy5pc051bWVyaWMocmFuZ2VbMV0pICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlcyBpbiByYW5nZSBzaG91bGQgYmUgbnVtYmVycycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIE1hdGgubWF4KG1pblZhbCwgbWF4VmFsKSA8IE1hdGgubWF4KHJhbmdlWzBdLCByYW5nZVsxXSkgIHx8ICBNYXRoLm1pbihtaW5WYWwsIG1heFZhbCkgPiBNYXRoLm1pbihyYW5nZVswXSwgcmFuZ2VbMV0pICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSByYW5nZSBzaG91bGQgYmUgd2l0aGluIG1pbiBhbmQgbWF4IHZhbHVlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHRlc3RMZWZ0ICUgMSAhPSAwIHx8IHRlc3RSaWdodCAlIDEgIT0gMCApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcmFuZ2Ugc2hvdWxkIGJlIHNldCBvbiBzdGVwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3VzdG9tRGF0ZVZhbGlkYXRpb24oLi4udmFsczogYW55W10pIHtcclxuICAgICAgICBmb3IgKCBsZXQgdmFsIG9mIHZhbHMgKSB7XHJcbiAgICAgICAgICAgIGlmICggISgnJyArIHZhbCkubWF0Y2goL15cXGR7Mn1bLlxcLy1dXFxkezJ9Wy5cXC8tXVxcZHs0fSQvKSApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIHZhbHVlcyBpbiBkYXRlIGZvcm1hdCBzaG91bGQgYmUgZGF0ZXMsIGxpa2UgZGQubW0ueXl5eSBvciBkZC9tbS95eXl5IG9yIGRkLW1tLXl5eXknKTsgXHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVEYXRlVG9OdW1iZXIoc3RyOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBhcnIgPSBzdHIuc3BsaXQoc3RyWzJdKTtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCthcnJbMl0sICthcnJbMV0gLSAxLCArYXJyWzBdKTtcclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LLQstC+0LTQuNGCINGB0YLRgNCw0L3QvdGL0LUg0LTQsNC90L3Ri9C1LCDQvtC9INCy0YHQtSDRgNCw0LLQvdC+INC/0L7Qu9GD0YfQuNGCINGA0LXQt9GD0LvRjNGC0LDRgi5cclxuICAgICAgICAvLyDQodC60L7RgNC10LUg0LLRgdC10LPQviwg0Y3RgtC+INCz0L7QstC+0YDQuNGCINC+INGC0L7QvCwg0YfRgtC+INC+0L0g0L/QtdGA0LXQv9GD0YLQsNC7INC/0L7RgNGP0LTQvtC6LiDQn9C+0Y/QstC40YLRgdGPINC/0YDQtdC00YPQv9GA0LXQttC00LXQvdC40LVcclxuICAgICAgICBpZiAoK2FyclswXSA+IDMxIHx8ICthcnJbMV0gPiAxMikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VzZSBkZC5tbS55eXl5IG9yIGRkL21tL3l5eXkgb3IgZGQtbW0teXl5eSBmb3IgZGF0ZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IGRhdGUsIHRyeSBkZC5tbS55eXl5IG9yIGRkL21tL3l5eXkgb3IgZGQtbW0teXl5eScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gK2RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFubGF0ZVN0ZXBUb0RhdGVGb3JtYXQoc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoICF0aGlzLmlzTnVtZXJpYyhzdGVwKSB8fCBzdGVwICUgMSAhPSAwICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0ZXAgaW4gZGF0ZSBmb3JtYXQgc2hvdWxkIGJlIGludGVnZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0ZXAgKiAyNCAqIDM2MDAgKiAxMDAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGlzTnVtZXJpYyhuOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmICFpc05hTihuIC0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNpbWFsUGxhY2VzKG51bTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDQt9C90LDQutC+0LIg0L/QvtGB0LvQtSDQt9Cw0L/Rj9GC0L7QuVxyXG4gICAgICAgIHJldHVybiB+KG51bSArICcnKS5pbmRleE9mKCcuJykgPyAobnVtICsgJycpLnNwbGl0KCcuJylbMV0ubGVuZ3RoIDogMDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiDQmNC90YLRhNC10YDRhNC10LnRgSDQuNC30LTQsNGC0LXQu9GPINC+0LHRitGP0LLQu9GP0LXRgiDQvdCw0LHQvtGAINC80LXRgtC+0LTQvtCyINC00LvRjyDRg9C/0YDQsNCy0LvQtdC90LjRj9C80Lgg0L/QvtC00L/QuNGB0LrQuNGH0LDQvNC4LlxyXG4gKi9cclxuaW50ZXJmYWNlIElTdWJqZWN0IHtcclxuXHJcbiAgICB2YWw6IGFueSB8IFthbnksIGFueV07IFxyXG5cclxuICAgIC8vINCf0YDQuNGB0L7QtdC00LjQvdGP0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPINC6INC40LfQtNCw0YLQtdC70Y4uXHJcbiAgICBhdHRhY2gob2JzZXJ2ZXI6IElPYnNlcnZlcik6IHZvaWQ7XHJcblxyXG4gICAgLy8g0J7RgtGB0L7QtdC00LjQvdGP0LXRgiDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPINC+0YIg0LjQt9C00LDRgtC10LvRjy5cclxuICAgIGRldGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZDtcclxuXHJcbiAgICAvLyDQo9Cy0LXQtNC+0LzQu9GP0LXRgiDQstGB0LXRhSDQvdCw0LHQu9GO0LTQsNGC0LXQu9C10Lkg0L4g0YHQvtCx0YvRgtC40LguXHJcbiAgICBub3RpZnkoKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqINCY0LfQtNCw0YLQtdC70Ywg0LLQu9Cw0LTQtdC10YIg0L3QtdC60L7RgtC+0YDRi9C8INCy0LDQttC90YvQvCDRgdC+0YHRgtC+0Y/QvdC40LXQvCDQuCDQvtC/0L7QstC10YnQsNC10YIg0L3QsNCx0LvRjtC00LDRgtC10LvQtdC5INC+INC10LPQvlxyXG4gKiDQuNC30LzQtdC90LXQvdC40Y/RhS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YmplY3QgaW1wbGVtZW50cyBJU3ViamVjdCB7XHJcblxyXG4gICAgdmFsOiBhbnkgfCBbYW55LCBhbnldOyBcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggdmFsOiBhbnkgfCBbYW55LCBhbnldICkge1xyXG4gICAgICAgIHRoaXMudmFsID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge09ic2VydmVyW119INCh0L/QuNGB0L7QuiDQv9C+0LTQv9C40YHRh9C40LrQvtCyLiDQkiDRgNC10LDQu9GM0L3QvtC5INC20LjQt9C90Lgg0YHQv9C40YHQvtC6XHJcbiAgICAgKiDQv9C+0LTQv9C40YHRh9C40LrQvtCyINC80L7QttC10YIg0YXRgNCw0L3QuNGC0YzRgdGPINCyINCx0L7Qu9C10LUg0L/QvtC00YDQvtCx0L3QvtC8INCy0LjQtNC1ICjQutC70LDRgdGB0LjRhNC40YbQuNGA0YPQtdGC0YHRjyDQv9C+XHJcbiAgICAgKiDRgtC40L/RgyDRgdC+0LHRi9GC0LjRjyDQuCDRgi7QtC4pXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZXJzOiBJT2JzZXJ2ZXJbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JzQtdGC0L7QtNGLINGD0L/RgNCw0LLQu9C10L3QuNGPINC/0L7QtNC/0LjRgdC60L7QuS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaChvYnNlcnZlcjogSU9ic2VydmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJJbmRleCA9IHRoaXMub2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLnNwbGljZShvYnNlcnZlckluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCX0LDQv9GD0YHQuiDQvtCx0L3QvtCy0LvQtdC90LjRjyDQsiDQutCw0LbQtNC+0Lwg0L/QvtC00L/QuNGB0YfQuNC60LUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBub3RpZnkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qgb2JzZXJ2ZXIgb2YgdGhpcy5vYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIudXBkYXRlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCY0L3RgtC10YDRhNC10LnRgSDQndCw0LHQu9GO0LTQsNGC0LXQu9GPINC+0LHRitGP0LLQu9GP0LXRgiDQvNC10YLQvtC0INGD0LLQtdC00L7QvNC70LXQvdC40Y8sINC60L7RgtC+0YDRi9C5INC40LfQtNCw0YLQtdC70LhcclxuICog0LjRgdC/0L7Qu9GM0LfRg9GO0YIg0LTQu9GPINC+0L/QvtCy0LXRidC10L3QuNGPINGB0LLQvtC40YUg0L/QvtC00L/QuNGB0YfQuNC60L7Qsi5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmVyIHtcclxuICAgIGZ1bmM6IGFueTtcclxuICAgIC8vINCf0L7Qu9GD0YfQuNGC0Ywg0L7QsdC90L7QstC70LXQvdC40LUg0L7RgiDRgdGD0LHRitC10LrRgtCwLlxyXG4gICAgdXBkYXRlKHN1YmplY3Q6IFN1YmplY3QpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICog0JrQvtC90LrRgNC10YLQvdGL0LUg0J3QsNCx0LvRjtC00LDRgtC10LvQuCDRgNC10LDQs9C40YDRg9GO0YIg0L3QsCDQvtCx0L3QvtCy0LvQtdC90LjRjywg0LLRi9C/0YPRidC10L3QvdGL0LUg0JjQt9C00LDRgtC10LvQtdC8LCDQulxyXG4gKiDQutC+0YLQvtGA0L7QvNGDINC+0L3QuCDQv9GA0LjQutGA0LXQv9C70LXQvdGLLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9ic2VydmVyIGltcGxlbWVudHMgSU9ic2VydmVyIHtcclxuXHJcbiAgICBmdW5jOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZnVuYykge1xyXG4gICAgICAgIHRoaXMuZnVuYyA9IGZ1bmM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShzdWJqZWN0OiBTdWJqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mdW5jKCBzdWJqZWN0LnZhbCApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0lTdWJqZWN0fTsiLCJpbXBvcnQgSU9wdGlvbnMsIHsgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IE1vZGVsLCB7SU1vZGVsfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0ICB7SU1vZGVsT3B0aW9uc30gZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCBWaWV3LCB7SVZpZXd9IGZyb20gJy4vVmlldyc7XHJcbmltcG9ydCBTdWJqZWN0LCB7SVN1YmplY3R9ICBmcm9tICcuL09ic2VydmVyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXNlbnRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW9kZWw6IElNb2RlbDtcclxuICAgIHByaXZhdGUgX3ZpZXc6IElWaWV3O1xyXG4gICAgcHJpdmF0ZSBfc3ViamVjdDogSVN1YmplY3Q7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0aXZlVGh1bWI6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1vZGVsOiBJTW9kZWwsIHZpZXc6IElWaWV3LCBzdWJqZWN0OiBJU3ViamVjdCkge1xyXG5cclxuICAgICAgICB0aGlzLl9tb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xyXG4gICAgICAgIHRoaXMuX3N1YmplY3QgPSBzdWJqZWN0O1xyXG5cclxuICAgICAgICB0aGlzLnRodW1iT25Nb3VzZURvd24gPSB0aGlzLnRodW1iT25Nb3VzZURvd24uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnRodW1iT25Nb3VzZU1vdmUgPSB0aGlzLnRodW1iT25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnRodW1iT25Nb3VzZVVwID0gdGhpcy50aHVtYk9uTW91c2VVcC5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlck9uTW91c2VDbGljayA9IHRoaXMuc2xpZGVyT25Nb3VzZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCAhbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmlldy5nZXRUaHVtYigpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy50aHVtYk9uTW91c2VEb3duKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2aWV3LmdldFRodW1iKDEpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy50aHVtYk9uTW91c2VEb3duKTtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigyKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbk1vdXNlRG93bik7XHJcbiAgICAgICAgfSAgICAgICAgXHJcblxyXG4gICAgICAgIHZpZXcuZ2V0U2xpZGVyKCkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc2xpZGVyT25Nb3VzZUNsaWNrKTtcclxuICAgIH1cclxuXHJcbiAgICB0aHVtYk9uTW91c2VEb3duKGV2ZW50KSB7XHJcbiAgICAgICAgLy8g0L/RgNC10LTQvtGC0LLRgNCw0YLQuNGC0Ywg0LfQsNC/0YPRgdC6INCy0YvQtNC10LvQtdC90LjRjyAo0LTQtdC50YHRgtCy0LjQtSDQsdGA0LDRg9C30LXRgNCwKVxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVRodW1iID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy50aHVtYk9uTW91c2VNb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy50aHVtYk9uTW91c2VVcCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB0aHVtYk9uTW91c2VNb3ZlKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGxldCBtb2RlbDogSU1vZGVsID0gdGhpcy5fbW9kZWw7XHJcbiAgICAgICAgbGV0IHZpZXc6IElWaWV3ID0gdGhpcy5fdmlldztcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5fdmlldy5nZXRTbGlkZXIoKTtcclxuICAgICAgXHJcbiAgICAgICAgbGV0IG1pblZhbDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0TWluVmFsKCk7XHJcbiAgICAgICAgbGV0IG1heFZhbDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0TWF4VmFsKCk7XHJcbiAgICAgICAgbGV0IHN0ZXA6IG51bWJlciA9IHRoaXMuX21vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICBsZXQgcmV2ZXJzZTogbnVtYmVyID0gIXRoaXMuX21vZGVsLmdldFJldmVyc2UoKSA/IDEgOiAtMTtcclxuICAgICAgICBsZXQgc2xpZGVyTGVuZ2h0OiBudW1iZXIgPSB0aGlzLl92aWV3LmdldExlbmdodCgpO1xyXG4gICAgICAgIGxldCBzdGVwTGVuZ2h0OiBudW1iZXIgPSB0aGlzLl92aWV3Lm9uZVN0ZXBMZW5naHQoKTtcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlckJvcmRlcjogbnVtYmVyO1xyXG4gICAgICAgIGxldCBldmVudFBvczogbnVtYmVyO1xyXG4gICAgICAgIGxldCB0aHVtYlBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGxlZnRQb2ludDogbnVtYmVyO1xyXG4gICAgICAgIGxldCByaWdodFBvaW50OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG5ld1ZhbDogbnVtYmVyO1xyXG5cclxuICAgICAgICAvLyDQn9C+0LfQuNGG0LjRjyDQsdC10LPRg9C90LrQsCDQsiBweCDQstGL0YfQuNGB0LvRj9C10YLRgdGPINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDQvdCw0YfQsNC70LAg0YHQu9Cw0LnQtNC10YDQsC5cclxuICAgICAgICAvLyDQktC90LDRh9Cw0LvQtSBuZXdWYWwg0LLRi9GH0LjRgdC70Y/QtdGC0YHRjyDQutCw0Log0LrQvtC70LjRh9C10YHRgtCy0L4g0YjQsNCz0L7QsiDQvtGCINC90LDRh9Cw0LvQsCAo0L7RgiAwKSxcclxuICAgICAgICAvLyAo0YLQviDQtdGB0YLRjCDQt9C90LDRh9C10L3QuNGPIG1pbiwgbWF4LCByZXZlcnNlINC90LUg0LjQvNC10Y7RgiDQt9C90LDRh9C10L3QuNGPKS5cclxuXHJcbiAgICAgICAgaWYgKCAhdmlldy5nZXRWZXJ0aWNhbCgpICkge1xyXG5cclxuICAgICAgICAgICAgc2xpZGVyQm9yZGVyID0gKHNsaWRlck5vZGUub2Zmc2V0V2lkdGggLSBzbGlkZXJMZW5naHQpIC8gMjtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSBldmVudC5jbGllbnRYOyAgICAgICAgIFxyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gZXZlbnRQb3MgLSBzbGlkZXJOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSBzbGlkZXJCb3JkZXI7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJCb3JkZXIgPSAoc2xpZGVyTm9kZS5vZmZzZXRIZWlnaHQgLSBzbGlkZXJMZW5naHQpIC8gMjtcclxuICAgICAgICAgICAgZXZlbnRQb3MgPSBldmVudC5jbGllbnRZOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aHVtYlBvc2l0aW9uID0gZXZlbnRQb3MgLSBzbGlkZXJOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHNsaWRlckJvcmRlcjtcclxuXHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgbmV3VmFsID0gTWF0aC5yb3VuZCh0aHVtYlBvc2l0aW9uIC8gc3RlcExlbmdodCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX2FjdGl2ZVRodW1iLmNsYXNzTGlzdC5jb250YWlucygnc2xpZGVyX190aHVtYl9yaWdodCcpICkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/RgNC+0LzQtdC20YPRgtC+0LosINGC0L4g0LvQtdCy0LDRjyDQs9GA0LDQvdC40YbQsCAtINGN0YLQviDQu9C10LLRi9C5INCx0LXQs9GD0L3QvtC6XHJcbiAgICAgICAgICAgICAgICAvLyDQt9C00LXRgdGMINGA0LDRgdGB0YfQuNGC0YvQstCw0LXRgtGB0Y8g0LrQvtC70LjRh9C10YHRgtCy0L4g0YjQsNCz0L7QsiDQvtGCINC90LDRh9Cw0LvQsCAo0L7RgiAwKSwgXHJcbiAgICAgICAgICAgICAgICAvLyDQt9Cw0YLQtdC8INGA0LDRgdGB0YLQvtGP0L3QuNC1INCyIHB4INC+0YIg0L3QsNGH0LDQu9CwINGB0LvQsNC50LTQtdGA0LAuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8g0J7RiNC40LHQutC4INCyINCy0YvRh9C40YHQu9C10L3QuNGP0YUg0YEgZmxvYXQg0LfQtNC10YHRjCDQvNC+0LbQvdC+INC/0YDQvtC40LPQvdC+0YDQuNGA0L7QstCw0YLRjFxyXG4gICAgICAgICAgICAgICAgbGVmdFBvaW50ID0gKG1vZGVsLmdldFJhbmdlKClbMF0gLSBtaW5WYWwpICogcmV2ZXJzZSAvIHN0ZXA7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UG9pbnQgPSBsZWZ0UG9pbnQgKiBzdGVwTGVuZ2h0O1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQb2ludCA9IHNsaWRlckxlbmdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5WYWwgPSBtb2RlbC5nZXRSYW5nZSgpWzBdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQb2ludCA9IChtb2RlbC5nZXRSYW5nZSgpWzFdIC0gbWluVmFsKSAqIHJldmVyc2UgLyBzdGVwO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQb2ludCA9IHJpZ2h0UG9pbnQgKiBzdGVwTGVuZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGVmdFBvaW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXhWYWwgPSBtb2RlbC5nZXRSYW5nZSgpWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGVmdFBvaW50ID0gMDtcclxuICAgICAgICAgICAgcmlnaHRQb2ludCA9IHNsaWRlckxlbmdodDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIHRodW1iUG9zaXRpb24gPD0gbGVmdFBvaW50KSB7XHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBsZWZ0UG9pbnQ7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IG1pblZhbDtcclxuICAgICAgICB9IGVsc2UgaWYgKCB0aHVtYlBvc2l0aW9uID49IHJpZ2h0UG9pbnQpIHtcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IHJpZ2h0UG9pbnQ7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IG1heFZhbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQsdC10LPRg9C90L7QuiDQvdC1INCy0YvRiNC10Lsg0LfQsCDQs9GA0LDQvdC40YbRiywg0YHRgtCw0LLQuNC8INC10LPQviDQvdCwINCx0LvQuNC20LDQudGI0LXQtSDQt9C90LDRh9C10L3QuNC1LFxyXG4gICAgICAgICAgICAvLyDQutGA0LDRgtC90L7QtSDRiNCw0LPRgy5cclxuICAgICAgICAgICAgLy8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0Y3RgtC+0LPQviDQv9GA0LXQvtCx0YDQsNC30YPQtdC8INC10LPQviDQtNC70Y8g0LzQvtC00LXQu9C4LiDQldGB0LvQuCByZXZlcnNlID09IHRydWUsINGC0L4gPT0gLTEgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBuZXdWYWwgKiBzdGVwTGVuZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZiA9IHggPT4gKCAoeC50b1N0cmluZygpLmluY2x1ZGVzKCcuJykpID8gKHgudG9TdHJpbmcoKS5zcGxpdCgnLicpLnBvcCgpLmxlbmd0aCkgOiAoMCkgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBuID0gZihzdGVwKSArIGYobWluVmFsKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKCBuZXdWYWwgKiBNYXRoLnBvdygxMCwgbikgKiBzdGVwICogcmV2ZXJzZSAgKSAvIE1hdGgucG93KDEwLCBuKTtcclxuXHJcbiAgICAgICAgICAgIG4gPSBNYXRoLm1heCggZihzdGVwKSwgZihtaW5WYWwpICk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICsoKCtuZXdWYWwpLnRvRml4ZWQobikpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSAoK21vZGVsLmdldE1pblZhbCgpKSArICgrbmV3VmFsKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKygoK25ld1ZhbCkudG9GaXhlZChuKSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXRSYW5nZSgpICYmIHRoaXMuX2FjdGl2ZVRodW1iLmNsYXNzTGlzdC5jb250YWlucygnc2xpZGVyX190aHVtYl9sZWZ0JykpIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0UmFuZ2UoIFtuZXdWYWwsIG1vZGVsLmdldFJhbmdlKClbMV1dICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAoIG1vZGVsLmdldFJhbmdlKCkgJiYgdGhpcy5fYWN0aXZlVGh1bWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX3RodW1iX3JpZ2h0JykpIHtcclxuICAgICAgICAgICAgbW9kZWwuc2V0UmFuZ2UoIFttb2RlbC5nZXRSYW5nZSgpWzBdLCBuZXdWYWxdICk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1vZGVsLnNldFZhbChuZXdWYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKHRoaXMuX2FjdGl2ZVRodW1iLCB0aHVtYlBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoKSB8fCB2aWV3LmdldFRvb2x0aXAoMSkgKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZShuZXdWYWwpO1xyXG5cclxuICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIHRoaXMuX2FjdGl2ZVRodW1iLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX3Rvb2x0aXAnKSwgdmFsLCB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aHVtYk9uTW91c2VVcChldmVudCkge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnRodW1iT25Nb3VzZVVwKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnRodW1iT25Nb3VzZU1vdmUpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVUaHVtYiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAvLyDQvdCw0LHQu9GO0LTQsNGC0LXQu9GMXHJcbiAgICAgICAgbGV0IG1vZGVsOiBJTW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXRWYWwoKSAhPSBudWxsICkge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gdmFsO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzBdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzBdID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzFdID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlck9uTW91c2VDbGljayhldmVudCkge1xyXG5cclxuICAgICAgICBsZXQgbW9kZWw6IElNb2RlbCA9IHRoaXMuX21vZGVsO1xyXG4gICAgICAgIGxldCB2aWV3OiBJVmlldyA9IHRoaXMuX3ZpZXc7XHJcblxyXG4gICAgICAgIGxldCBzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuX3ZpZXcuZ2V0U2xpZGVyKCk7XHJcbiAgICAgICAgbGV0IGNoYW5naW5nVGh1bWI6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICBcclxuICAgICAgICBsZXQgbWluVmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNaW5WYWwoKTtcclxuICAgICAgICBsZXQgbWF4VmFsOiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXRNYXhWYWwoKTtcclxuICAgICAgICBsZXQgc3RlcDogbnVtYmVyID0gdGhpcy5fbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIGxldCByZXZlcnNlOiBudW1iZXIgPSAhdGhpcy5fbW9kZWwuZ2V0UmV2ZXJzZSgpID8gMSA6IC0xO1xyXG4gICAgICAgIGxldCBzbGlkZXJMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcuZ2V0TGVuZ2h0KCk7XHJcbiAgICAgICAgbGV0IHN0ZXBMZW5naHQ6IG51bWJlciA9IHRoaXMuX3ZpZXcub25lU3RlcExlbmdodCgpO1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyQm9yZGVyOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGV2ZW50UG9zOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHRodW1iUG9zaXRpb246IG51bWJlcjtcclxuICAgICAgICBsZXQgbGVmdFBvaW50OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHJpZ2h0UG9pbnQ6IG51bWJlcjtcclxuICAgICAgICBsZXQgbmV3VmFsOiBudW1iZXI7XHJcblxyXG4gICAgICAgIC8vINCf0L7Qt9C40YbQuNGPINCx0LXQs9GD0L3QutCwINCyIHB4INCy0YvRh9C40YHQu9GP0LXRgtGB0Y8g0L7RgtC90L7RgdC40YLQtdC70YzQvdC+INC90LDRh9Cw0LvQsCDRgdC70LDQudC00LXRgNCwLlxyXG4gICAgICAgIC8vINCS0L3QsNGH0LDQu9C1IG5ld1ZhbCDQstGL0YfQuNGB0LvRj9C10YLRgdGPINC60LDQuiDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyINC+0YIg0L3QsNGH0LDQu9CwICjQvtGCIDApLFxyXG4gICAgICAgIC8vICjRgtC+INC10YHRgtGMINC30L3QsNGH0LXQvdC40Y8gbWluLCBtYXgsIHJldmVyc2Ug0L3QtSDQuNC80LXRjtGCINC30L3QsNGH0LXQvdC40Y8pLlxyXG5cclxuICAgICAgICBpZiAoICF0aGlzLl92aWV3LmdldFZlcnRpY2FsKCkgKSB7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJCb3JkZXIgPSAoc2xpZGVyTm9kZS5vZmZzZXRXaWR0aCAtIHNsaWRlckxlbmdodCkgLyAyO1xyXG4gICAgICAgICAgICBldmVudFBvcyA9IGV2ZW50LmNsaWVudFg7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBldmVudFBvcyAtIHNsaWRlck5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHNsaWRlckJvcmRlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgc2xpZGVyQm9yZGVyID0gKHNsaWRlck5vZGUub2Zmc2V0SGVpZ2h0IC0gc2xpZGVyTGVuZ2h0KSAvIDI7XHJcbiAgICAgICAgICAgIGV2ZW50UG9zID0gZXZlbnQuY2xpZW50WTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IGV2ZW50UG9zIC0gc2xpZGVyTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSBzbGlkZXJCb3JkZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXdWYWwgPSBNYXRoLnJvdW5kKHRodW1iUG9zaXRpb24gLyBzdGVwTGVuZ2h0KTtcclxuICAgICAgICBcclxuICAgICAgICBsZWZ0UG9pbnQgPSAwO1xyXG4gICAgICAgIHJpZ2h0UG9pbnQgPSBzbGlkZXJMZW5naHQ7XHJcbiAgICBcclxuICAgICAgICBpZiAoIHRodW1iUG9zaXRpb24gPD0gbGVmdFBvaW50KSB7XHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBsZWZ0UG9pbnQ7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IG1pblZhbDtcclxuICAgICAgICB9IGVsc2UgaWYgKCB0aHVtYlBvc2l0aW9uID49IHJpZ2h0UG9pbnQpIHtcclxuICAgICAgICAgICAgdGh1bWJQb3NpdGlvbiA9IHJpZ2h0UG9pbnQ7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9IG1heFZhbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQsdC10LPRg9C90L7QuiDQvdC1INCy0YvRiNC10Lsg0LfQsCDQs9GA0LDQvdC40YbRiywg0YHRgtCw0LLQuNC8INC10LPQviDQvdCwINCx0LvQuNC20LDQudGI0LXQtSDQt9C90LDRh9C10L3QuNC1LFxyXG4gICAgICAgICAgICAvLyDQutGA0LDRgtC90L7QtSDRiNCw0LPRgy5cclxuICAgICAgICAgICAgLy8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0Y3RgtC+0LPQviDQv9GA0LXQvtCx0YDQsNC30YPQtdC8INC10LPQviDQtNC70Y8g0LzQvtC00LXQu9C4LiDQldGB0LvQuCByZXZlcnNlID09IHRydWUsINGC0L4gPT0gLTEgXHJcbiAgICAgICAgICAgIHRodW1iUG9zaXRpb24gPSBuZXdWYWwgKiBzdGVwTGVuZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZiA9IHggPT4gKCAoeC50b1N0cmluZygpLmluY2x1ZGVzKCcuJykpID8gKHgudG9TdHJpbmcoKS5zcGxpdCgnLicpLnBvcCgpLmxlbmd0aCkgOiAoMCkgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBuID0gZihzdGVwKSArIGYobWluVmFsKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKCBuZXdWYWwgKiBNYXRoLnBvdygxMCwgbikgKiBzdGVwICogcmV2ZXJzZSAgKSAvIE1hdGgucG93KDEwLCBuKTtcclxuXHJcbiAgICAgICAgICAgIG4gPSBNYXRoLm1heCggZihzdGVwKSwgZihtaW5WYWwpICk7XHJcbiAgICAgICAgICAgIG5ld1ZhbCA9ICsoKCtuZXdWYWwpLnRvRml4ZWQobikpO1xyXG4gICAgICAgICAgICBuZXdWYWwgPSAoK21vZGVsLmdldE1pblZhbCgpKSArICgrbmV3VmFsKTtcclxuICAgICAgICAgICAgbmV3VmFsID0gKygoK25ld1ZhbCkudG9GaXhlZChuKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICFtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICBtb2RlbC5zZXRWYWwobmV3VmFsKTtcclxuICAgICAgICAgICAgY2hhbmdpbmdUaHVtYiA9IHZpZXcuZ2V0VGh1bWIoKTtcclxuICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKGNoYW5naW5nVGh1bWIsIHRodW1iUG9zaXRpb24pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIE1hdGguYWJzKG5ld1ZhbCAtIG1vZGVsLmdldFJhbmdlKClbMF0pIDwgTWF0aC5hYnMobmV3VmFsIC0gbW9kZWwuZ2V0UmFuZ2UoKVsxXSkgKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RlbC5zZXRSYW5nZShbIG5ld1ZhbCwgbW9kZWwuZ2V0UmFuZ2UoKVsxXSBdKTtcclxuICAgICAgICAgICAgICAgIGNoYW5naW5nVGh1bWIgPSB2aWV3LmdldFRodW1iKDEpO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRUaHVtYlBvc2l0aW9uKGNoYW5naW5nVGh1bWIsIHRodW1iUG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbW9kZWwuc2V0UmFuZ2UoWyBtb2RlbC5nZXRSYW5nZSgpWzBdLCBuZXdWYWwgXSk7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2luZ1RodW1iID0gdmlldy5nZXRUaHVtYigyKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbihjaGFuZ2luZ1RodW1iLCB0aHVtYlBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICggdmlldy5nZXRUb29sdGlwKCkgfHwgdmlldy5nZXRUb29sdGlwKDEpICkge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUobmV3VmFsKTtcclxuXHJcbiAgICAgICAgICAgIHZpZXcuc2V0VmFsVG9Ub29sdGlwKCBjaGFuZ2luZ1RodW1iLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX3Rvb2x0aXAnKSwgdmFsLCB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQvdCw0LHQu9GO0LTQsNGC0LXQu9GMXHJcbiAgICAgICAgaWYgKCBtb2RlbC5nZXRWYWwoKSAhPSBudWxsICkge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gdmFsO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzBdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzBdID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsWzFdID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZShvcHRpb25zOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcy5fbW9kZWw7XHJcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLl92aWV3O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcxMTExMTEgICAnICsgbW9kZWwuZ2V0T3B0aW9ucygpKTtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZVRodW1iUG9zaXRpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhbmdlVG9vbHRpcFZhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjaGFuZ2VTY2FsZURpdmlzaW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNoYW5nZVZhbFRvUmFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhbmdlUmFuZ2VUb1ZhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCByZWJ1aWxkU2NhbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgcmVidWlsZFRvb2x0aXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gMS4g0JzQntCU0JXQm9CsXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0LzQtdC90Y/QtdGC0YHRjyDQutCw0LrQvtC5INC70LjQsdC+INC/0LDRgNCw0LzQtdGC0YAg0LIg0LzQvtC00LXQu9C4LCDQt9Cw0L/Rg9GB0LrQsNC10Lwg0L/RgNC+0LLQtdGA0LrQuCDQvNC+0LTQtdC70LgsXHJcbiAgICAgICAgLy8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDQvdC+0LLRi9C1INC30L3QsNGH0LXQvdC40Y8uXHJcbiAgICAgICAgLy8g0LfQsNC/0L7QvNC40L3QsNC10LwsINGH0YLQviDQvdGD0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0L/QvtC70L7QttC10L3QuNGPINC/0L7Qu9C30YPQvdC60L7Qsiwg0LfQvdCw0YfQtdC90LjRjyDQsiDQv9C+0LTRgdC60LDQt9C60LDRhSxcclxuICAgICAgICAvLyDQtNC10LvQtdC90LjQuSDRiNC60LDQu9GLICjQt9C90LDRh9C10L3QuNGPINC4IGxlZnQpLiBcclxuICAgICAgICAvLyDQldGB0LvQuCDQuNC30LzQtdC90LjQu9C+0YHRjCDQutC+0LvQuNGH0LXRgdGC0LLQviDRiNCw0LPQvtCyIC0gdHJ1ZSDQvdCwINC/0LXRgNC10YDQuNGB0L7QstCw0YLRjCDRiNC60LDQu9GDLlxyXG4gICAgICAgIC8vINCV0YHQu9C4INC/0L7QvNC10L3Rj9C70L7RgdGMIHZhbCDQvdCwIHJhbmdlLCDQuNC70Lgg0L3QsNC+0LHQvtGA0L7RgiAtIHRydWUg0L3QsCDQv9C+0YHRgtGA0L7QuNGC0YwhINCx0LXQs9GD0L3QutC4LlxyXG5cclxuXHJcbiAgICAgICAgbGV0IG1vZGVsT3B0aW9ucyA9IFsnZGF0YUZvcm1hdCcsICd2YWx1ZScsICdtaW5WYWwnLCAnbWF4VmFsJywgJ3N0ZXAnLCAncmV2ZXJzZScsICdyYW5nZScsICdjdXN0b21WYWx1ZXMnLCAndmFsdWVJbkN1c3RvbVZhbHVlcycsICdyYW5nZUluQ3VzdG9tVmFsdWVzJ107XHJcblxyXG4gICAgICAgIGxldCB0ZXN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbW9kZWxPcHRpb25zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoaXRlbSkgKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICggdGVzdCApIHtcclxuICAgICAgICAgICAgbGV0IHByZXZOdW1PZlN0ZXBzOiBudW1iZXIgPSBtb2RlbC5udW1iZXJPZlN0ZXBzKCk7XHJcbiAgICAgICAgICAgIGxldCBwcmV2T3B0aW9uczogSU1vZGVsT3B0aW9ucyA9IG1vZGVsLmdldE9wdGlvbnMoKTtcclxuICAgICAgICAgICAgbGV0IG5ld09wdGlvbnM6IElPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJldk9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgbW9kZWwuY2hhbmdlKG5ld09wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgdmlldy5zZXROdW1iZXJPZlN0ZXBzKCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZVN0ZXAoIHZpZXcuc2NhbGVTdGVwVmFsaWRhdGlvbiggbW9kZWwsIHZpZXcuZ2V0U2NhbGVTdGVwKCkgKSApO1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlVGh1bWJQb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICggcHJldk51bU9mU3RlcHMgIT0gbW9kZWwubnVtYmVyT2ZTdGVwcygpICkge1xyXG4gICAgICAgICAgICAgICAgcmVidWlsZFNjYWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIHZpZXcuZ2V0UmFuZ2UoKSAmJiAhbW9kZWwuZ2V0UmFuZ2UoKSApIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZVJhbmdlVG9WYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVidWlsZFRvb2x0aXAgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggIXZpZXcuZ2V0UmFuZ2UoKSAmJiBtb2RlbC5nZXRSYW5nZSgpICkge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlVmFsVG9SYW5nZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZWJ1aWxkVG9vbHRpcCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDIuINCS0JjQlFxyXG4gICAgICAgIC8vINCf0LXRgNC10YDQuNGB0L7QstGL0LLQsNC10Lwg0LLQuNC0INC+0YIg0YHQsNC80YvRhSDQs9C70L7QsdCw0LvRjNC90YvRhSDQuNC30LzQtdC90LXQvdC40Lkg0Log0YHQsNC80YvQvCDQvdC10LfQvdCw0YfQuNGC0LXQu9GM0L3Ri9C8LlxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIDIuMSDQodCw0LzQvtC1INCx0L7Qu9GM0YjQvtC1INC40LfQvNC10L3QtdC90LjQtSAtINGN0YLQviDQstC40LQg0L7RgdC90L7QstGLINGI0LrQsNC70YsuXHJcbiAgICAgICAgLy8g0JXQtSDQuNC30LzQtdC90LXQvdC40LUg0LLRi9C30YvQstCw0LXRgjog0LjQt9C80LXQvdC40YLRjCDQv9C+0LvQvtC20LXQvdC40Y8g0LHQtdCz0YPQvdC60L7Qsiwg0LTQtdC70LXQvdC40Lkg0YjQutCw0LvRi1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3ZlcnRpY2FsJykgfHwgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnbGVuZ3RoJykgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlU2xpZGVyQmFzZShvcHRpb25zKTtcclxuICAgICAgICAgICAgY2hhbmdlVGh1bWJQb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMi4yINCc0LXQvdGP0LXQvCDQutC+0LvQuNGH0LXRgdGC0LLQviDQsdC10LPRg9C90LrQvtCyLCDQtdGB0LvQuCDQvdGD0LbQvdC+XHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0YLQsNC60L7QtSDQuNC30LzQtdC90LXQvdC40LUg0LHRi9C70L4sINC30L3QsNGH0LjRgiDQstC10LfQtNC1LFxyXG4gICAgICAgIC8vINCz0LTQtSDQvdCw0LTQviwg0YPQttC1INGB0YLQvtC40YIgdHJ1ZVxyXG5cclxuICAgICAgICBpZiAoIGNoYW5nZVJhbmdlVG9WYWwgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuY2hhbmdlUmFuZ2VUb1ZhbChtb2RlbCk7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbk1vdXNlRG93bik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggY2hhbmdlVmFsVG9SYW5nZSApIHtcclxuICAgICAgICAgICAgdmlldy5jaGFuZ2VWYWxUb1JhbmdlKG1vZGVsKTtcclxuICAgICAgICAgICAgdmlldy5nZXRUaHVtYigxKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMudGh1bWJPbk1vdXNlRG93bik7XHJcbiAgICAgICAgICAgIHZpZXcuZ2V0VGh1bWIoMikuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRodW1iT25Nb3VzZURvd24pO1xyXG4gICAgICAgIH0gICBcclxuXHJcbiAgICAgICAgLy8gMi4zINCo0LrQsNC70LAuINCj0LTQsNC70Y/QtdC8LCDRgdGC0YDQvtC40Lwg0LjQu9C4INC/0LXRgNC10YHRgtGA0LDQuNCy0LDQtdC8LiDQmNC30LzQtdC90Y/QtdC8INC00LXQu9C10L3QuNGPLlxyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NjYWxlU3RlcCcpICYmIG9wdGlvbnMuc2NhbGVTdGVwICE9IHZpZXcuZ2V0U2NhbGVTdGVwKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0U2NhbGVTdGVwKCB2aWV3LnNjYWxlU3RlcFZhbGlkYXRpb24obW9kZWwsIG9wdGlvbnMuc2NhbGVTdGVwKSApO1xyXG4gICAgICAgICAgICByZWJ1aWxkU2NhbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCdzY2FsZU1hc2snKSAmJiBvcHRpb25zLnNjYWxlTWFzayAhPSB2aWV3LmdldFNjYWxlTWFzaygpICkge1xyXG4gICAgICAgICAgICB2aWV3LnNldFNjYWxlTWFzayggb3B0aW9ucy5zY2FsZU1hc2sgKTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINGD0LTQsNC70Y/QtdC8XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCdzY2FsZScpICYmIG9wdGlvbnMuc2NhbGUgPT0gZmFsc2UgJiYgdmlldy5nZXRTY2FsZSgpICkge1xyXG4gICAgICAgICAgICB2aWV3LnNldFNjYWxlKCB2aWV3LnJlbW92ZU5vZGUoIHZpZXcuZ2V0U2NhbGUoKSApICk7XHJcbiAgICAgICAgICAgIGNoYW5nZVNjYWxlRGl2aXNpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgcmVidWlsZFNjYWxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINGB0YLRgNC+0LjQvFxyXG4gICAgICAgIGlmICggb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2NhbGUnKSAmJiBvcHRpb25zLnNjYWxlID09IHRydWUgJiYgIXZpZXcuZ2V0U2NhbGUoKSApIHtcclxuICAgICAgICAgICAgbGV0IHNjYWxlOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICAgICAgc2NhbGUgPSB2aWV3LmJ1aWxkU2NhbGUodmlldy5nZXRTbGlkZXIoKSwgdmlldy5nZXRTY2FsZVN0ZXAoKSwgbW9kZWwsIHZpZXcuZ2V0U2NhbGVNYXNrKCkgKTtcclxuICAgICAgICAgICAgdmlldy5zZXRTY2FsZShzY2FsZSk7XHJcblxyXG4gICAgICAgICAgICByZWJ1aWxkU2NhbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2hhbmdlU2NhbGVEaXZpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQv9C10YDQtdGB0YLRgNCw0LjQstCw0LXQvFxyXG4gICAgICAgIGlmICggcmVidWlsZFNjYWxlICYmIHZpZXcuZ2V0U2NhbGUoKSApIHtcclxuICAgICAgICAgICAgdmlldy5yZWJ1aWxkU2NhbGUobW9kZWwpO1xyXG4gICAgICAgICAgICBjaGFuZ2VTY2FsZURpdmlzaW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdGP0LXQvCDQtNC10LvQtdC90LjRjy4g0LfQvdCw0YfQtdC90LjQtSDQuCBsZWZ0XHJcbiAgICAgICAgaWYgKCBjaGFuZ2VTY2FsZURpdmlzaW9uICYmIHZpZXcuZ2V0U2NhbGUoKSApIHtcclxuICAgICAgICAgICAgdmlldy5jaGFuZ2VTY2FsZURpdmlzaW9uKG1vZGVsKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyAyLjQg0J/QvtC00YHQutCw0LfQutC4LiDQo9C00LDQu9GP0LXQvC4g0KHRgtGA0L7QuNC8LiDQnNC10L3Rj9C10Lwg0LfQvdCw0YfQtdC90LjRj1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3Rvb2x0aXBNYXNrJykgJiYgb3B0aW9ucy50b29sdGlwTWFzayAhPSB2aWV3LmdldFRvb2x0aXBNYXNrKCkgKSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2V0VG9vbHRpcE1hc2soIG9wdGlvbnMudG9vbHRpcE1hc2sgKTtcclxuICAgICAgICAgICAgY2hhbmdlVG9vbHRpcFZhbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggIXZpZXcuZ2V0VG9vbHRpcCgpICYmICF2aWV3LmdldFRvb2x0aXAoMSkgJiYgIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3Rvb2x0aXAnKSApIHtcclxuICAgICAgICAgICAgcmVidWlsZFRvb2x0aXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2hhbmdlVG9vbHRpcFZhbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDRg9C00LDQu9GP0LXQvFxyXG4gICAgICAgIGlmICggb3B0aW9ucy50b29sdGlwID09IGZhbHNlIHx8IHJlYnVpbGRUb29sdGlwICkge1xyXG5cclxuICAgICAgICAgICAgLy8g0L/QvtGH0LXQvNGDINCyINC00YDRg9Cz0L7QvCDQv9C+0YDRj9C00LrQtSDQvdC1INGA0LDQsdC+0YLQsNC10YJcclxuICAgICAgICAgICAgaWYgKCB2aWV3LmdldFRvb2x0aXAoMikgKSB2aWV3LnNldFRvb2x0aXAoIHZpZXcucmVtb3ZlTm9kZSh2aWV3LmdldFRvb2x0aXAoMikpLCAyICk7XHJcbiAgICAgICAgICAgIGlmICggdmlldy5nZXRUb29sdGlwKDEpICkgdmlldy5zZXRUb29sdGlwKCB2aWV3LnJlbW92ZU5vZGUodmlldy5nZXRUb29sdGlwKDEpKSwgMSApO1xyXG4gICAgICAgICAgICBpZiAoIHZpZXcuZ2V0VG9vbHRpcCgpICkgdmlldy5zZXRUb29sdGlwKCB2aWV3LnJlbW92ZU5vZGUodmlldy5nZXRUb29sdGlwKDApKSwgMCApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLnRvb2x0aXAgPT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgICAgICByZWJ1aWxkVG9vbHRpcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2x0aXBWYWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgdGC0YDQsNC40LLQsNC10LxcclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCB8fCByZWJ1aWxkVG9vbHRpcCApIHtcclxuICAgICAgICAgICAgdmlldy5idWlsZFZhbGlkVG9vbHRpcHMobW9kZWwpO1xyXG4gICAgICAgICAgICBjaGFuZ2VUb29sdGlwVmFsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgICAgaWYgKCBjaGFuZ2VUb29sdGlwVmFsICYmICh2aWV3LmdldFRvb2x0aXAoKSB8fCB2aWV3LmdldFRvb2x0aXAoMSkpICkge1xyXG4gICAgICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFtb2RlbC5nZXRSYW5nZSgpKSB7IFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFZhbFRvVG9vbHRpcCggdmlldy5nZXRUb29sdGlwKCksIHZhbCBhcyBzdHJpbmcsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyAgIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRWYWxUb1Rvb2x0aXAoIHZpZXcuZ2V0VG9vbHRpcCgxKSwgdmFsIGFzIHN0cmluZywgdmlldy5nZXRUb29sdGlwTWFzaygpICk7IFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFJhbmdlKClbMV0gKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VmFsVG9Ub29sdGlwKCB2aWV3LmdldFRvb2x0aXAoMiksIHZhbCBhcyBzdHJpbmcsIHZpZXcuZ2V0VG9vbHRpcE1hc2soKSApOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcblxyXG5cclxuICAgICAgICAvLyAyLjUg0J/QvtC70L7QttC10L3QuNGPINCx0LXQs9GD0L3QutC+0LJcclxuXHJcbiAgICAgICAgaWYgKCBjaGFuZ2VUaHVtYlBvc2l0aW9uICkge1xyXG4gICAgICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFtb2RlbC5nZXRSYW5nZSgpICkge1xyXG5cclxuICAgICAgICAgICAgICAgIHBvcyA9IHZpZXcuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0VmFsKCkpLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbiggdmlldy5nZXRUaHVtYigpLCBwb3MpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHsgICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBwb3MgPSB2aWV3LmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMF0pLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VGh1bWJQb3NpdGlvbiggdmlldy5nZXRUaHVtYigxKSwgcG9zKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgcG9zID0gdmlldy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzFdKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldFRodW1iUG9zaXRpb24oIHZpZXcuZ2V0VGh1bWIoMiksIHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vINC90LDQsdC70Y7QtNCw0YLQtdC70YxcclxuICAgICAgICAgICAgLy8g0LLRi9C30YvQstCw0LXQvCDQtdGB0LvQuCDQsdGL0LvQuCDQuNC30LzQtdC90LXQvdC40Y8g0YHQstGP0LfQsNC90L3Ri9C1INGBINCx0LXQs9GD0L3QutCw0LzQuFxyXG4gICAgICAgICAgICAvLyDQvdC1INC30LDRgtGA0L7QvdC10YIsINC90LDQv9GA0LjQvNC10YAsINC00L7QsdCw0LLQu9C10L3QuNC1INGI0LrQsNC70YtcclxuICAgICAgICAgICAgaWYgKCBtb2RlbC5nZXRWYWwoKSAhPSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0VmFsKCkgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1YmplY3QudmFsID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbCA9IG1vZGVsLnRyYW5zbGF0ZSggbW9kZWwuZ2V0UmFuZ2UoKVswXSApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViamVjdC52YWxbMF0gPSB2YWw7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJqZWN0LnZhbFsxXSA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBJT3B0aW9ucyBmcm9tICcuL2RlZmF1bHRPcHRpb25zJztcclxuaW1wb3J0IE1vZGVsLCB7SU1vZGVsfSBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IHsgcnVuSW5OZXdDb250ZXh0IH0gZnJvbSAndm0nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmlldyB7XHJcblxyXG4gICAgLy8g0LPQtdGC0YLQtdGA0Ysg0Lgg0YHQtdGC0YLQtdGA0YtcclxuICAgIGdldExlbmdodCgpOiBudW1iZXI7XHJcbiAgICBnZXRWZXJ0aWNhbCgpOiBib29sZWFuO1xyXG4gICAgZ2V0UmFuZ2UoKTogYm9vbGVhbjtcclxuICAgIGdldFRvb2x0aXBNYXNrKCk6IHN0cmluZztcclxuICAgIHNldFRvb2x0aXBNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZVN0ZXAoKTogbnVtYmVyO1xyXG4gICAgc2V0U2NhbGVTdGVwKHN0ZXA6IG51bWJlcik6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZU1hc2soKTogc3RyaW5nO1xyXG4gICAgc2V0U2NhbGVNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBnZXROdW1iZXJPZlN0ZXBzKCk6IG51bWJlcjtcclxuICAgIHNldE51bWJlck9mU3RlcHMobnVtOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIGdldFNsaWRlcigpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGdldFRodW1iKG51bT86IG51bWJlcik6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgZ2V0VG9vbHRpcChudW0/OiBudW1iZXIpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHNldFRvb2x0aXAodG9vbHRpcDogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQsIG51bT86IG51bWJlcik6IHZvaWQ7XHJcbiAgICBnZXRTY2FsZSgpOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHNldFNjYWxlKHNjYWxlOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCk6IHZvaWQ7XHJcblxyXG5cclxuICAgIC8vINC80LXRgtC+0LTRiyDQtNC70Y8g0YHQvtC30LTQsNC90LjRjyDQuCDQuNC30LzQtdC90LXQvdC40Y8gdmlld1xyXG4gICAgY2hhbmdlU2xpZGVyQmFzZSAob3B0aW9uczogYW55KTogdm9pZDtcclxuICAgIGNoYW5nZVJhbmdlVG9WYWwgKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgY2hhbmdlVmFsVG9SYW5nZSAobW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcbiAgICBidWlsZFZhbGlkVG9vbHRpcHMobW9kZWw6IElNb2RlbCk6IHZvaWQ7XHJcbiAgICBidWlsZFNjYWxlKHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50LCBzdGVwOiBudW1iZXIsIG1vZGVsOiBJTW9kZWwsIG1hc2s6IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcmVidWlsZFNjYWxlKG1vZGVsOiBJTW9kZWwpOiB2b2lkO1xyXG4gICAgY2hhbmdlU2NhbGVEaXZpc2lvbihtb2RlbDogSU1vZGVsKTogdm9pZDtcclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcbiAgICBzZXRUaHVtYlBvc2l0aW9uKHRodW1iTm9kZTogSFRNTERpdkVsZW1lbnQsIHRodW1iUG9zaXRpb246IG51bWJlcik6IHZvaWQ7XHJcbiAgICBzZXRWYWxUb1Rvb2x0aXAodG9vbHRpcE5vZGU6IEhUTUxEaXZFbGVtZW50LCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGUsIG1hc2s6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBmaW5kVGh1bWJQb3NpdGlvbihuZXdTdGVwLCBudW1PZlN0ZXBzKTogbnVtYmVyO1xyXG4gICAgb25lU3RlcExlbmdodCgpOiBudW1iZXI7XHJcbiAgICByZW1vdmVOb2RlKG5vZGU6IEhUTUxEaXZFbGVtZW50KTogdW5kZWZpbmVkO1xyXG4gICAgc2NhbGVTdGVwVmFsaWRhdGlvbihtb2RlbDogSU1vZGVsLCBzdGVwOiBudW1iZXIpOiBudW1iZXI7ICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyBpbXBsZW1lbnRzIElWaWV3IHtcclxuXHJcbiAgICBwcml2YXRlIF9sZW5naHQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3ZlcnRpY2FsOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfcmFuZ2U6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF90b29sdGlwTWFzazogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGVNYXNrPzogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGVTdGVwPzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbnVtYmVyT2ZTdGVwczogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX3NsaWRlcjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF90aHVtYj86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdGh1bWJMZWZ0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90aHVtYlJpZ2h0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwPzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sdGlwTGVmdD86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcFJpZ2h0PzogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9zY2FsZT86IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgXHJcblxyXG4gICAgY29uc3RydWN0b3IobW9kZWw6IElNb2RlbCwgb3B0aW9uczogSU9wdGlvbnMsIHNsaWRlck5vZGU6IEhUTUxEaXZFbGVtZW50KSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3NsaWRlciA9IHNsaWRlck5vZGU7XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcicpO1xyXG4gICAgICAgIHRoaXMuX3JhbmdlID0gbW9kZWwuZ2V0UmFuZ2UoKSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICB0aGlzLl9udW1iZXJPZlN0ZXBzID0gbW9kZWwubnVtYmVyT2ZTdGVwcygpO1xyXG4gICAgICAgIHRoaXMuX2xlbmdodCA9IHRoaXMubGVuZ3RoVmFsaWRhdGlvbihvcHRpb25zLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGlmICggIW9wdGlvbnMudmVydGljYWwgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5zdHlsZS53aWR0aCA9IHRoaXMuX2xlbmdodDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9ob3Jpem9udGFsJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fbGVuZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX3ZlcnRpY2FsJyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5fcmFuZ2UgKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl90aHVtYiA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIpO1xyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFZhbCgpKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy5fdGh1bWIsIHBvcyk7XHJcbiAgICAgICAgfSBlbHNlIHsgICAgIFxyXG5cclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJMZWZ0ID0gdGhpcy5idWlsZFRodW1iKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWJfbGVmdCcpOyBcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzBdKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJQb3NpdGlvbiggdGhpcy5fdGh1bWJMZWZ0LCBwb3MpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdGh1bWJSaWdodCA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iX3JpZ2h0Jyk7XHJcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0UmFuZ2UoKVsxXSksIG1vZGVsLm51bWJlck9mU3RlcHMoKSApO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iUmlnaHQsIHBvcyk7XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgLy8g0LzQsNGB0LrQsCDQtNC70Y8g0L/QvtC00YHQutCw0LfQvtC6XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0LXQtSDQvdC10YIsINC/0YDQuNC80LXQvdGP0LXRgtGB0Y8g0L7QsdGL0YfQvdCw0Y8sINC60L7RgtC+0YDQsNGPINC/0L4g0LTQtdGE0L7Qu9GC0YMg0LLQvtC30LLRgNCw0YnQsNC10YIg0L/RgNC+0YHRgtC+IHZhbFxyXG4gICAgICAgIC8vICjQsiDRhNC+0YDQvNCw0YLQtSDQtNCw0YIg0LLQtdGA0L3QtdGC0YHRjyDQvtCx0YrQtdC60YIg0LTQsNGC0LApXHJcbiAgICAgICAgdGhpcy5fdG9vbHRpcE1hc2sgPSBvcHRpb25zLnRvb2x0aXBNYXNrO1xyXG5cclxuICAgICAgICBpZiAoIG9wdGlvbnMudG9vbHRpcCApIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFZhbGlkVG9vbHRpcHMobW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zY2FsZU1hc2sgPSBvcHRpb25zLnNjYWxlTWFzaztcclxuXHJcbiAgICAgICAgbGV0IHN0ZXA6IG51bWJlcjtcclxuICAgICAgICBpZiAoIG9wdGlvbnMuc2NhbGVTdGVwICkge1xyXG4gICAgICAgICAgICBzdGVwID0gdGhpcy5zY2FsZVN0ZXBWYWxpZGF0aW9uKG1vZGVsLCBvcHRpb25zLnNjYWxlU3RlcCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RlcCA9IG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2NhbGVTdGVwID0gc3RlcDtcclxuXHJcblxyXG4gICAgICAgIGlmICggb3B0aW9ucy5zY2FsZSApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2NhbGUgPSB0aGlzLmJ1aWxkU2NhbGUodGhpcy5fc2xpZGVyLCBzdGVwLCBtb2RlbCwgdGhpcy5fc2NhbGVNYXNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0LPQtdGC0YLQtdGA0Ysg0Lgg0YHQtdGC0YLQtdGA0YtcclxuICAgIGdldExlbmdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICggIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVyLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zbGlkZXIuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIH0gICAgXHJcbiAgICB9XHJcbiAgICBnZXRWZXJ0aWNhbCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmVydGljYWw7XHJcbiAgICB9XHJcbiAgICBnZXRSYW5nZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmFuZ2U7XHJcbiAgICB9XHJcbiAgICBnZXRUb29sdGlwTWFzaygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwTWFzaztcclxuICAgIH1cclxuICAgIHNldFRvb2x0aXBNYXNrKG1hc2s6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXBNYXNrID0gbWFzaztcclxuICAgIH1cclxuICAgIGdldFNjYWxlU3RlcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZVN0ZXA7XHJcbiAgICB9XHJcbiAgICBzZXRTY2FsZVN0ZXAoc3RlcDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2NhbGVTdGVwID0gc3RlcDtcclxuICAgIH1cclxuICAgIGdldFNjYWxlTWFzaygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZU1hc2s7XHJcbiAgICB9XHJcbiAgICBzZXRTY2FsZU1hc2sobWFzazogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2NhbGVNYXNrID0gbWFzaztcclxuICAgIH1cclxuICAgIGdldE51bWJlck9mU3RlcHMoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZTdGVwcztcclxuICAgIH07XHJcbiAgICBzZXROdW1iZXJPZlN0ZXBzKG51bTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbnVtYmVyT2ZTdGVwcyA9IG51bTtcclxuICAgIH07XHJcbiAgICBcclxuXHJcblxyXG4gICAgZ2V0U2xpZGVyKCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVyO1xyXG4gICAgfVxyXG4gICAgZ2V0VGh1bWIobnVtOiBudW1iZXIgPSAwKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGlmICggbnVtID09IDAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aHVtYjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBudW0gPT0gMSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RodW1iTGVmdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBudW0gPT0gMiApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RodW1iUmlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90aHVtYjtcclxuICAgIH1cclxuICAgIGdldFRvb2x0aXAobnVtOiBudW1iZXIgPSAwKTogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICggdGhpcy5fdG9vbHRpcCB8fCB0aGlzLl90b29sdGlwTGVmdCApIHtcclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwICYmIG51bSA9PSAwICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwTGVmdCAmJiBudW0gPT0gMSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwTGVmdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuX3Rvb2x0aXBSaWdodCAmJiBudW0gPT0gMiApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwUmlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldFRvb2x0aXAodG9vbHRpcDogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQsIG51bTogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIGlmICggbnVtID09IDAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0b29sdGlwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIG51bSA9PSAxICkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwTGVmdCA9IHRvb2x0aXA7XHJcbiAgICAgICAgfSBlbHNlIGlmICggbnVtID09IDIgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBSaWdodCA9IHRvb2x0aXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0U2NhbGUoKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZTtcclxuICAgIH1cclxuICAgIHNldFNjYWxlKHNjYWxlOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vINC80LXRgtC+0LTRiyDQtNC70Y8g0YHQvtC30LTQsNC90LjRjyDQuCDQuNC30LzQtdC90LXQvdC40Y8gdmlld1xyXG5cclxuICAgIGNoYW5nZVNsaWRlckJhc2UgKG9wdGlvbnM6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgbGVuZ2h0Q2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyDRiNC40YDQuNC90LAgLyDQtNC70LjQvdCwXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLmxlbmd0aCAmJiB0aGlzLl9sZW5naHQgIT0gb3B0aW9ucy5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xlbmdodCA9IG9wdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZW5naHRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC+0YDQuNC10L3RgtCw0YbQuNGPXHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnZlcnRpY2FsICYmICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX2hvcml6b250YWwnKVxyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX3ZlcnRpY2FsJyk7XHJcblxyXG4gICAgICAgICAgICBsZW5naHRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBvcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSAmJiB0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmVydGljYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl92ZXJ0aWNhbCcpXHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaG9yaXpvbnRhbCcpO1xyXG5cclxuICAgICAgICAgICAgbGVuZ2h0Q2hhbmdlZCA9IHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsZW5naHRDaGFuZ2VkICYmICF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyLnN0eWxlLndpZHRoID0gdGhpcy5fbGVuZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGVuZ2h0Q2hhbmdlZCAmJiB0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUud2lkdGggPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fbGVuZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VSYW5nZVRvVmFsIChtb2RlbDogSU1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHBvczogbnVtYmVyO1xyXG5cclxuICAgICAgICB0aGlzLl90aHVtYkxlZnQgPSB0aGlzLnJlbW92ZU5vZGUodGhpcy5fdGh1bWJMZWZ0KTtcclxuICAgICAgICB0aGlzLl90aHVtYlJpZ2h0ID0gdGhpcy5yZW1vdmVOb2RlKHRoaXMuX3RodW1iUmlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLl90aHVtYiA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIpO1xyXG4gICAgICAgIHBvcyA9IHRoaXMuZmluZFRodW1iUG9zaXRpb24oIG1vZGVsLmdldFN0ZXBOdW1iZXIobW9kZWwuZ2V0VmFsKCkpLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iLCBwb3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9yYW5nZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVZhbFRvUmFuZ2UgKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcG9zOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHRoaXMuX3RodW1iID0gdGhpcy5yZW1vdmVOb2RlKHRoaXMuX3RodW1iKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGh1bWJMZWZ0ID0gdGhpcy5idWlsZFRodW1iKHRoaXMuX3NsaWRlciwgJ3NsaWRlcl9fdGh1bWJfbGVmdCcpOyBcclxuICAgICAgICBwb3MgPSB0aGlzLmZpbmRUaHVtYlBvc2l0aW9uKCBtb2RlbC5nZXRTdGVwTnVtYmVyKG1vZGVsLmdldFJhbmdlKClbMF0pLCBtb2RlbC5udW1iZXJPZlN0ZXBzKCkgKTtcclxuICAgICAgICB0aGlzLnNldFRodW1iUG9zaXRpb24oIHRoaXMuX3RodW1iTGVmdCwgcG9zKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGh1bWJSaWdodCA9IHRoaXMuYnVpbGRUaHVtYih0aGlzLl9zbGlkZXIsICdzbGlkZXJfX3RodW1iX3JpZ2h0Jyk7XHJcbiAgICAgICAgcG9zID0gdGhpcy5maW5kVGh1bWJQb3NpdGlvbiggbW9kZWwuZ2V0U3RlcE51bWJlcihtb2RlbC5nZXRSYW5nZSgpWzFdKSwgbW9kZWwubnVtYmVyT2ZTdGVwcygpICk7XHJcbiAgICAgICAgdGhpcy5zZXRUaHVtYlBvc2l0aW9uKCB0aGlzLl90aHVtYlJpZ2h0LCBwb3MpO1xyXG5cclxuICAgICAgICB0aGlzLl9yYW5nZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRWYWxpZFRvb2x0aXBzKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdmFsOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3JhbmdlKSB7IFxyXG5cclxuICAgICAgICAgICAgaWYgKCB0aGlzLl90b29sdGlwICkgdGhpcy5fdG9vbHRpcCA9IHRoaXMucmVtb3ZlTm9kZSggdGhpcy5fdG9vbHRpcCApO1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGUoIG1vZGVsLmdldFZhbCgpICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0aGlzLmJ1aWxkVG9vbHRpcCh0aGlzLl90aHVtYik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsVG9Ub29sdGlwKCB0aGlzLl90b29sdGlwLCB2YWwsIHRoaXMuX3Rvb2x0aXBNYXNrICk7ICAgXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcExlZnQgKSB0aGlzLl90b29sdGlwTGVmdCA9IHRoaXMucmVtb3ZlTm9kZSggdGhpcy5fdG9vbHRpcExlZnQgKTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzBdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBMZWZ0ID0gdGhpcy5idWlsZFRvb2x0aXAodGhpcy5fdGh1bWJMZWZ0LCAnc2xpZGVyX190b29sdGlwX2xlZnQnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWxUb1Rvb2x0aXAoIHRoaXMuX3Rvb2x0aXBMZWZ0LCB2YWwsIHRoaXMuX3Rvb2x0aXBNYXNrICk7ICBcclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5fdG9vbHRpcFJpZ2h0ICkgdGhpcy5fdG9vbHRpcFJpZ2h0ID0gdGhpcy5yZW1vdmVOb2RlKCB0aGlzLl90b29sdGlwUmlnaHQgKTtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlKCBtb2RlbC5nZXRSYW5nZSgpWzFdICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBSaWdodCA9IHRoaXMuYnVpbGRUb29sdGlwKHRoaXMuX3RodW1iUmlnaHQsICdzbGlkZXJfX3Rvb2x0aXBfcmlnaHQnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWxUb1Rvb2x0aXAoIHRoaXMuX3Rvb2x0aXBSaWdodCwgdmFsLCB0aGlzLl90b29sdGlwTWFzayApOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRTY2FsZShzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCwgc3RlcDogbnVtYmVyLCBtb2RlbDogSU1vZGVsLCBtYXNrOiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IHNjYWxlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxldCBkaXZpc2lvbjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZTtcclxuXHJcbiAgICAgICAgc2NhbGUuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZScpO1xyXG4gICAgICAgIHNsaWRlck5vZGUucHJlcGVuZChzY2FsZSk7XHJcblxyXG4gICAgICAgIC8vINC80L3QvtC20LjRgtC10LvRjC4g0LLQviDRgdC60L7Qu9GM0LrQviDRgNCw0Lcg0YjQsNCzINCyINC80L7QtNC10LvQtSDQvNC10L3RjNGI0LUg0YjQsNCz0LAg0YjQutCw0LvRi1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHN0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG4gICAgICAgIGxldCBtdWx0OiBudW1iZXIgPSBzdGVwIC8gbW9kZWwuZ2V0U3RlcCgpO1xyXG4gICAgICAgIG11bHQgPSArKCttdWx0KS50b0ZpeGVkKG4pO1xyXG4gICAgICAgIG11bHQgPSBNYXRoLmFicyhtdWx0KTsgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPD0gbW9kZWwubnVtYmVyT2ZTdGVwcygpOyBpID0gaSArIG11bHQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGkgKyBtdWx0INCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINC90LAg0LrQsNC60L7QuSDRiNCw0LMg0LzQvtC00LXQu9C4INC/0L7Qv9Cw0LTQsNC10YIg0YjQsNCzINGI0LrQsNC70YtcclxuICAgICAgICAgICAgdmFsID0gbW9kZWwudHJhbnNsYXRlQnlTdGVwKGkpO1xyXG5cclxuICAgICAgICAgICAgZGl2aXNpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2aXNpb24uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpO1xyXG4gICAgICAgICAgICBkaXZpc2lvbi5pbm5lckhUTUwgPSAnPHNwYW4+JyArICBldmFsKG1hc2spICsgJzwvc3Bhbj4nO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUubGVmdCA9IHRoaXMub25lU3RlcExlbmdodCgpICogaSArICdweCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS50b3AgPSB0aGlzLm9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzY2FsZS5hcHBlbmQoZGl2aXNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVidWlsZFNjYWxlKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2NhbGU6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5nZXRTY2FsZSgpO1xyXG4gICAgICAgIGxldCBwcmV2TnVtT2ZTdGVwczogbnVtYmVyID0gc2NhbGUucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlcl9fc2NhbGUtZGl2aXNpb24nKS5sZW5ndGggLSAxO1xyXG4gICAgICAgIGxldCBuZXdOdW1PZlN0ZXBzOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGRpdmlzaW9uOiBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBcclxuICAgICAgICAvLyDQvNC90L7QttC40YLQtdC70YwuINCy0L4g0YHQutC+0LvRjNC60L4g0YDQsNC3INGI0LDQsyDQsiDQvNC+0LTQtdC70LUg0LzQtdC90YzRiNC1INGI0LDQs9CwINGI0LrQsNC70YtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gTWF0aC5tYXgoIHRoaXMuZGVjaW1hbFBsYWNlcyh0aGlzLl9zY2FsZVN0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG4gICAgICAgIGxldCBtdWx0OiBudW1iZXIgPSB0aGlzLl9zY2FsZVN0ZXAgLyBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgbXVsdCA9ICttdWx0LnRvRml4ZWQobik7XHJcbiAgICAgICAgbXVsdCA9IE1hdGguYWJzKG11bHQpO1xyXG5cclxuICAgICAgICBuZXdOdW1PZlN0ZXBzID0gbW9kZWwubnVtYmVyT2ZTdGVwcygpIC8gbXVsdDtcclxuXHJcbiAgICAgICAgaWYgKCBwcmV2TnVtT2ZTdGVwcyA+IG5ld051bU9mU3RlcHMgKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCAocHJldk51bU9mU3RlcHMgLSBuZXdOdW1PZlN0ZXBzKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZS5sYXN0Q2hpbGQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBwcmV2TnVtT2ZTdGVwcyA8IG5ld051bU9mU3RlcHMgKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCAobmV3TnVtT2ZTdGVwcyAtIHByZXZOdW1PZlN0ZXBzKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uaW5uZXJIVE1MID0gJzxzcGFuPjwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgc2NhbGUuYXBwZW5kKGRpdmlzaW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VTY2FsZURpdmlzaW9uKG1vZGVsOiBJTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZGl2aXNpb246IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGxldCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgbGV0IG1hc2s6IHN0cmluZyA9IHRoaXMuX3NjYWxlTWFzaztcclxuXHJcbiAgICAgICAgLy9sZXQgbW9kZWxTdGVwOiBudW1iZXIgPSBtb2RlbC5nZXRTdGVwKCk7XHJcblxyXG4gICAgICAgIC8vINC80L3QvtC20LjRgtC10LvRjC4g0LLQviDRgdC60L7Qu9GM0LrQviDRgNCw0Lcg0YjQsNCzINCyINC80L7QtNC10LvQtSDQvNC10L3RjNGI0LUg0YjQsNCz0LAg0YjQutCw0LvRi1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHRoaXMuX3NjYWxlU3RlcCksIHRoaXMuZGVjaW1hbFBsYWNlcyhtb2RlbC5nZXRTdGVwKCkpICk7XHJcbiAgICAgICAgbGV0IG11bHQ6IG51bWJlciA9IHRoaXMuX3NjYWxlU3RlcCAvIG1vZGVsLmdldFN0ZXAoKTtcclxuICAgICAgICBtdWx0ID0gK211bHQudG9GaXhlZChuKTtcclxuICAgICAgICBtdWx0ID0gTWF0aC5hYnMobXVsdCk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8PSBtb2RlbC5udW1iZXJPZlN0ZXBzKCk7IGkgPSBpICsgbXVsdCkge1xyXG5cclxuICAgICAgICAgICAgLy8gaSArIG11bHQg0LLQvtC30LLRgNCw0YnQsNC10YIg0L3QsCDQutCw0LrQvtC5INGI0LDQsyDQvNC+0LTQtdC70Lgg0L/QvtC/0LDQtNCw0LXRgiDRiNCw0LMg0YjQutCw0LvRi1xyXG4gICAgICAgICAgICB2YWwgPSBtb2RlbC50cmFuc2xhdGVCeVN0ZXAoaSk7XHJcblxyXG4gICAgICAgICAgICBkaXZpc2lvbiA9IHRoaXMuZ2V0U2NhbGUoKS5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyX19zY2FsZS1kaXZpc2lvbicpW2kgLyBtdWx0XSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICAgICAgZGl2aXNpb24ucXVlcnlTZWxlY3Rvcignc3BhbicpLnRleHRDb250ZW50ID0gJycgKyBldmFsKG1hc2spO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl92ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUudG9wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uLnN0eWxlLmxlZnQgPSB0aGlzLm9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb24uc3R5bGUubGVmdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbi5zdHlsZS50b3AgPSB0aGlzLm9uZVN0ZXBMZW5naHQoKSAqIGkgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0LzQtdGC0L7QtNGLXHJcblxyXG4gICAgc2V0VGh1bWJQb3NpdGlvbih0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCB0aHVtYlBvc2l0aW9uOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoICF0aGlzLl92ZXJ0aWNhbCApIHtcclxuICAgICAgICAgICAgdGh1bWJOb2RlLnN0eWxlLnRvcCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS5sZWZ0ID0gdGh1bWJQb3NpdGlvbiAtIHRodW1iTm9kZS5vZmZzZXRXaWR0aC8yICsgJ3B4JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHVtYk5vZGUuc3R5bGUubGVmdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRodW1iTm9kZS5zdHlsZS50b3AgPSB0aHVtYlBvc2l0aW9uIC0gdGh1bWJOb2RlLm9mZnNldFdpZHRoLzIgKyAncHgnOyAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC+0LHQsCDQsdC10LPRg9C90LrQsCDRgdC/0YDQsNCy0LAsINC00L7QsdCw0LLQu9C10LwgeiBpbmRleCDQtNC70Y8g0L3QuNC20L3QtdCz0L5cclxuICAgICAgICBpZiAoIHRoaXMuZ2V0VGh1bWIoMSkgKSB7XHJcbiAgICAgICAgICAgIGlmICggIXRoaXMuX3ZlcnRpY2FsICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAodGhpcy5nZXRUaHVtYigxKS5zdHlsZS5sZWZ0ID09ICh0aGlzLmdldExlbmdodCgpIC0gdGhpcy5nZXRUaHVtYigxKS5jbGllbnRXaWR0aC8yKSArICdweCcpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gJzEwMCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAodGhpcy5nZXRUaHVtYigxKS5zdHlsZS50b3AgPT0gKHRoaXMuZ2V0TGVuZ2h0KCkgLSB0aGlzLmdldFRodW1iKDEpLmNsaWVudEhlaWdodC8yKSArICdweCcpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gJzEwMCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWIoMSkuc3R5bGUuekluZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWxUb1Rvb2x0aXAodG9vbHRpcE5vZGU6IEhUTUxEaXZFbGVtZW50LCB2YWw6IG51bWJlciB8IHN0cmluZyB8IERhdGUsIG1hc2s6IHN0cmluZyA9ICd2YWwnKTogdm9pZCB7XHJcbiAgICAgICAgdG9vbHRpcE5vZGUudGV4dENvbnRlbnQgPSBldmFsKG1hc2spO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRUaHVtYlBvc2l0aW9uKG5ld1N0ZXAsIG51bU9mU3RlcHMpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldExlbmdodCgpIC8gbnVtT2ZTdGVwcyAqIG5ld1N0ZXA7XHJcbiAgICB9XHJcblxyXG4gICAgb25lU3RlcExlbmdodCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRMZW5naHQoKSAvIHRoaXMuX251bWJlck9mU3RlcHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlTm9kZShub2RlOiBIVE1MRGl2RWxlbWVudCk6IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbm9kZS5yZW1vdmUoKTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNjYWxlU3RlcFZhbGlkYXRpb24obW9kZWw6IElNb2RlbCwgc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgbGV0IHN0ZXBJc1ZhbGlkOiBib29sZWFuO1xyXG4gICAgICAgIGxldCB0ZXN0OiBudW1iZXJcclxuXHJcbiAgICAgICAgLy8g0L7QutGA0YPQs9C70Y/QtdC8LCDRh9GC0L7QsdGLINC40LfQsdC10LbQsNGC0Ywg0L/RgNC+0LHQu9C10Lwg0L/RgNC4INCy0YvRh9C40YHQu9C10L3QuNGP0YUg0YEg0L/Qu9Cw0LLQsNGO0YnQtdC5INGC0L7Rh9C60L7QuVxyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBNYXRoLm1heCggdGhpcy5kZWNpbWFsUGxhY2VzKHN0ZXApLCB0aGlzLmRlY2ltYWxQbGFjZXMobW9kZWwuZ2V0U3RlcCgpKSApO1xyXG5cclxuICAgICAgICBzdGVwSXNWYWxpZCA9IHRoaXMuaXNOdW1lcmljKHN0ZXApO1xyXG5cclxuICAgICAgICBpZiAoIG1vZGVsLmdldERhdGFGb3JtYXQoKSA9PSAnZGF0ZScgJiYgKCBzdGVwICUgKDI0ICogMzYwMCAqIDEwMDApICE9IDAgKSkge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcCAqIDI0ICogMzYwMCAqIDEwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlc3QgPSAoc3RlcCAqIE1hdGgucG93KDEwLCBuKSkgLyAobW9kZWwuZ2V0U3RlcCgpICogTWF0aC5wb3coMTAsIG4pKTtcclxuICAgICAgICB0ZXN0ID0gTWF0aC5hYnModGVzdCk7XHJcblxyXG4gICAgICAgIHN0ZXBJc1ZhbGlkID0gc3RlcElzVmFsaWQgJiYgKCB0ZXN0ICUgMSA9PSAwICk7XHJcblxyXG4gICAgICAgIHRlc3QgPSArKCBtb2RlbC5nZXRNYXhWYWwoKSAtIG1vZGVsLmdldE1pblZhbCgpICkudG9GaXhlZChuKTtcclxuICAgICAgICB0ZXN0ID0gKCB0ZXN0ICogTWF0aC5wb3coMTAsIG4pICkgLyAoIHN0ZXAgKiBNYXRoLnBvdygxMCwgbikgKTtcclxuICAgICAgICB0ZXN0ID0gTWF0aC5hYnModGVzdCk7XHJcblxyXG4gICAgICAgIHN0ZXBJc1ZhbGlkID0gc3RlcElzVmFsaWQgJiYgKCB0ZXN0ICUgMSA9PSAwICk7XHJcblxyXG4gICAgICAgIHN0ZXAgPSBzdGVwSXNWYWxpZCA/IHN0ZXAgOiBtb2RlbC5nZXRTdGVwKCk7XHJcbiAgICAgICAgcmV0dXJuIHN0ZXA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vINC/0YDQuNCy0LDRgtC90YvQtSDRhNGD0L3QutGG0LjQuFxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRUaHVtYihzbGlkZXJOb2RlOiBIVE1MRGl2RWxlbWVudCwgdGh1bWJDbGFzcz86IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBsZXQgdGh1bWI6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7ICAgICBcclxuICAgICAgICB0aHVtYi5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3RodW1iJyk7XHJcbiAgICAgICAgdGh1bWJDbGFzcyA/IHRodW1iLmNsYXNzTGlzdC5hZGQodGh1bWJDbGFzcykgOiBmYWxzZTtcclxuICAgICAgICBzbGlkZXJOb2RlLmFwcGVuZCh0aHVtYik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aHVtYjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkVG9vbHRpcCh0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCB0b29sdGlwQ2xhc3M/OiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IHRvb2x0aXA6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3Rvb2x0aXAnKTtcclxuICAgICAgICB0b29sdGlwQ2xhc3MgPyB0b29sdGlwLmNsYXNzTGlzdC5hZGQodG9vbHRpcENsYXNzKSA6IGZhbHNlO1xyXG4gICAgICAgIHRodW1iTm9kZS5hcHBlbmQodG9vbHRpcCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0b29sdGlwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGxlbmd0aFZhbGlkYXRpb24oc3RyOiBhbnkpIHtcclxuICAgICAgICBpZiAoIHR5cGVvZiAoJycgKyBzdHIpID09ICdzdHJpbmcnICkge1xyXG4gICAgICAgICAgICBsZXQgciA9ICgnJyArIHN0cikubWF0Y2goL15cXGR7MSwzfVsuLF0/XFxkKihweHxlbXxyZW18JSk/JC9pKTtcclxuICAgICAgICAgICAgaWYgKCByICYmIHRoaXMuaXNOdW1lcmljKHJbMF0pICkgeyBcclxuICAgICAgICAgICAgICAgIHJldHVybiByWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnLCcsICcuJykgKyAncHgnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCByICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcsJywgJy4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dpZHRoIChvciBoZWlnaHQpIHNob3VsZCBiZSB2YWxpZCB0byBjc3MnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTnVtZXJpYyhuOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmICFpc05hTihuIC0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNpbWFsUGxhY2VzKG51bTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDQt9C90LDQutC+0LIg0L/QvtGB0LvQtSDQt9Cw0L/Rj9GC0L7QuVxyXG4gICAgICAgIHJldHVybiB+KG51bSArICcnKS5pbmRleE9mKCcuJykgPyAobnVtICsgJycpLnNwbGl0KCcuJylbMV0ubGVuZ3RoIDogMDtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBJT3B0aW9ucyB7XHJcbiAgICAvLyBNb2RlbCBvcHRpb25zXHJcbiAgICBkYXRhRm9ybWF0OiBhbnk7XHJcbiAgICB2YWx1ZTogYW55O1xyXG4gICAgbWluVmFsOiBhbnk7XHJcbiAgICBtYXhWYWw6IGFueTtcclxuICAgIHN0ZXA6IGFueTsgICAgXHJcbiAgICByZXZlcnNlOiBhbnk7XHJcbiAgICByYW5nZTogYW55OyBcclxuICAgIGN1c3RvbVZhbHVlcz86IGFueTtcclxuICAgIHZhbHVlSW5DdXN0b21WYWx1ZXM/OiBhbnk7XHJcbiAgICByYW5nZUluQ3VzdG9tVmFsdWVzPzogYW55O1xyXG5cclxuXHJcbiAgICAvLyBWaWV3IG9wdGlvbnNcclxuICAgIGxlbmd0aDogYW55O1xyXG4gICAgdmVydGljYWw6IGFueTtcclxuICAgIHRvb2x0aXA6IGFueTtcclxuICAgIHRvb2x0aXBNYXNrOiBhbnk7XHJcbiAgICBzY2FsZTogYW55O1xyXG4gICAgc2NhbGVTdGVwOiBhbnk7XHJcbiAgICBzY2FsZU1hc2s6IGFueTtcclxufVxyXG5cclxudmFyIGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyA9IHtcclxuICAgIC8vIE1vZGVsIG9wdGlvbnNcclxuICAgIC8vINCyIHJhbmdlINC4INCyIG1pbiDQuCBtYXgg0YHQu9C10LLQsCDRgtC+LCDRh9GC0L4g0YHQu9C10LLQsCDQvdCwINGB0LvQsNC50LTQtdGA0LVcclxuICAgIGRhdGFGb3JtYXQ6ICdudW1lcmljJyxcclxuICAgIHZhbHVlOiBudWxsLCAvLyDQstC90LjQvNCw0L3QuNC1ISDQsiDQvdCw0YfQsNC70YzQvdGL0YUg0L3QsNGB0YLRgNC+0LnQutCw0YUg0L3QtSDQvtC/0YDQtdC00LXQu9C10L3Ri1xyXG4gICAgbWluVmFsOiAwLCAgICAgICAgLy8g0L3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0LjQu9C4INC/0YDQvtC80LXQttGD0YLQvtC6LlxyXG4gICAgbWF4VmFsOiAxMCwgICAgICAgLy8g0LXRgdC70Lgg0L7QvdC4INC90LUg0YPQutCw0LfQsNC90Ysg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10LwsINC90LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1IFxyXG4gICAgc3RlcDogMSwgICAgICAgICAgLy8gKHZhbHVlKSDQuCDQv9C+0LfQuNGG0LjRjyDQsdC10LPRg9C90LrQsCDRgNCw0LLQvdGLINC80LjQvdC40LzQsNC70YzQvdC+0LzRgyDQt9C90LDRh9C10L3QuNGOXHJcbiAgICByZXZlcnNlOiBmYWxzZSxcclxuICAgIHJhbmdlOiBudWxsLFxyXG4gICAgXHJcbiAgICBsZW5ndGg6ICczMDBweCcsXHJcbiAgICB2ZXJ0aWNhbDogZmFsc2UsXHJcbiAgICB0b29sdGlwOiBmYWxzZSxcclxuICAgIHRvb2x0aXBNYXNrOiBcInZhbFwiLFxyXG4gICAgc2NhbGU6IGZhbHNlLFxyXG4gICAgc2NhbGVTdGVwOiBudWxsLFxyXG4gICAgc2NhbGVNYXNrOiBcInZhbFwiLFxyXG59XHJcblxyXG5leHBvcnQgeyBkZWZhdWx0T3B0aW9ucyB9O1xyXG4iLCJpbXBvcnQgTW9kZWwsIHtJTW9kZWx9IGZyb20gJy4vTW9kZWwnO1xyXG5pbXBvcnQgVmlldywge0lWaWV3fSBmcm9tICcuL1ZpZXcnO1xyXG5pbXBvcnQgUHJlc2VudGVyIGZyb20gJy4vUHJlc2VudGVyJztcclxuaW1wb3J0IHtkZWZhdWx0T3B0aW9uc30gZnJvbSAnLi9kZWZhdWx0T3B0aW9ucyc7XHJcblxyXG5pbXBvcnQge09ic2VydmVyfSBmcm9tICcuL09ic2VydmVyJztcclxuaW1wb3J0IHtJT2JzZXJ2ZXJ9IGZyb20gJy4vT2JzZXJ2ZXInO1xyXG5pbXBvcnQgU3ViamVjdCAgZnJvbSAnLi9PYnNlcnZlcic7XHJcblxyXG5cclxuKGZ1bmN0aW9uKCQpe1xyXG5cclxuICB2YXIgbWV0aG9kczogT2JqZWN0ID0ge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zPzogYW55ICkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICBcclxuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBkYXRhID0gJHRoaXMuZGF0YSgnc2xpZGVyRGF0YScpO1xyXG4gICAgICAgIGxldCBzbGlkZXIgPSAkdGhpcztcclxuICAgICAgICBcclxuICAgICAgICAvLyDQldGB0LvQuCDQv9C70LDQs9C40L0g0LXRidGRINC90LUg0L/RgNC+0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNC9XHJcbiAgICAgICAgaWYgKCAhIGRhdGEgKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICBsZXQgbW9kZWw6IElNb2RlbCA9IG5ldyBNb2RlbChvcHRpb25zKTtcclxuICAgICAgICAgIC8vINC/0LXRgNC10LTQsNC10Lwg0LzQvtC00LXQu9GMINCyINC/0YDQtdC00YHRgtCw0LLQu9C10L3QuNC1INC00LvRjyDQv9C+0LvRg9GH0LXQvdC40Y8g0LjQtyDQvdC10LUgXHJcbiAgICAgICAgICAvLyDQutC+0YDRgNC10LrRgtC90YvRhSDQtNCw0L3QvdGL0YVcclxuICAgICAgICAgIGxldCB2aWV3OiBJVmlldyA9IG5ldyBWaWV3KG1vZGVsLCBvcHRpb25zLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAvLyDRgdGD0LHRitC10LrRgiAtINGN0YLQviDQvdCw0LHQu9GO0LTQtdC90LjQtVxyXG4gICAgICAgICAgLy8g0L7QvSDRhdGA0LDQvdC40YIg0LfQvdCw0YfQtdC90LjQtSB2YWwg0LjQu9C4INC/0YDQvtC80LXQttGD0YLQvtC6XHJcbiAgICAgICAgICBsZXQgdmFsOiBhbnkgfCBbYW55LCBhbnldO1xyXG4gICAgICAgICAgdmFsID0gbW9kZWwuZ2V0VmFsKCkgfHwgbW9kZWwuZ2V0UmFuZ2UoKTsgXHJcbiAgICAgICAgICBsZXQgc3ViamVjdCA9IG5ldyBTdWJqZWN0KHZhbCk7XHJcblxyXG4gICAgICAgICAgbGV0IHByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIobW9kZWwsIHZpZXcsIHN1YmplY3QpO1xyXG5cclxuICAgICAgICAgICQodGhpcykuZGF0YSgnc2xpZGVyRGF0YScsIHtcclxuICAgICAgICAgICAgc2xpZGVyIDogc2xpZGVyLFxyXG4gICAgICAgICAgICBtb2RlbDogbW9kZWwsXHJcbiAgICAgICAgICAgIHZpZXc6IHZpZXcsXHJcbiAgICAgICAgICAgIHByZXNlbnRlcjogcHJlc2VudGVyLFxyXG4gICAgICAgICAgICBzdWJqZWN0OiBzdWJqZWN0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRlc3Q6IGZ1bmN0aW9uKCBjb250ZW50ICkge1xyXG4gICAgICBjb25zb2xlLmxvZygnaXRzIHRlc3Q6ICAnICsgY29udGVudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZTogZnVuY3Rpb24oIG9wdGlvbnM6IGFueSApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBwcmVzZW50ZXIgPSAkKHRoaXMpLmRhdGEoJ3NsaWRlckRhdGEnKS5wcmVzZW50ZXI7XHJcbiAgICAgICAgcHJlc2VudGVyLmNoYW5nZShvcHRpb25zKTtcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSAkdGhpcy5kYXRhKCdzbGlkZXJEYXRhJyk7XHJcblxyXG4gICAgICAgICQod2luZG93KS51bmJpbmQoJy5zbGlkZXInKTtcclxuICAgICAgICBkYXRhLnNsaWRlci5yZW1vdmUoKTtcclxuICAgICAgICAkdGhpcy5yZW1vdmVEYXRhKCdzbGlkZXJEYXRhJyk7XHJcbiAgICAgICAgXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBvYnNlcnZlOiBmdW5jdGlvbiggZnVuYyApIHtcclxuXHJcbiAgICAgIC8vINC00L7QsdCw0LLQu9GP0LXQvCDQvdCw0LHQu9GO0LTQsNGC0LXQu9GPXHJcbiAgICAgIC8vINCw0YDQs9GD0LzQtdC90YIgLSDRjdGC0LAg0YTRg9C90LrRhtC40Y8g0LrQvtGC0L7RgNCw0Y8g0LHRg9C00LXRgiDQvtCx0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0LjQt9C80LXQvdC10L3QuNGPXHJcbiAgICAgIGxldCBzdWJqZWN0ID0gJCh0aGlzKS5kYXRhKCdzbGlkZXJEYXRhJykuc3ViamVjdDtcclxuICAgICAgbGV0IG9ic2VydmVyOiBJT2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXIoIGZ1bmMgKTtcclxuXHJcbiAgICAgIHN1YmplY3QuYXR0YWNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFxyXG4gIGpRdWVyeS5mbi5zbGlkZXIgPSBmdW5jdGlvbiggbWV0aG9kICkge1xyXG5cclxuICAgIC8vINC70L7Qs9C40LrQsCDQstGL0LfQvtCy0LAg0LzQtdGC0L7QtNCwXHJcbiAgICBpZiAoIG1ldGhvZHNbbWV0aG9kIGFzIHN0cmluZ10gKSB7XHJcbiAgICAgIHJldHVybiBtZXRob2RzWyBtZXRob2QgYXMgc3RyaW5nIF0uYXBwbHkoIHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCBhcmd1bWVudHMsIDEgKSk7XHJcbiAgICB9IGVsc2UgaWYgKCB0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhIG1ldGhvZCApIHtcclxuXHJcbiAgICAgIC8vID8/Pz9cclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQuZXJyb3IoICdNZXRob2QgY2FsbGVkICcgKyAgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBmb3IgSlF1ZXJ5LnNsaWRlcicgKTtcclxuICAgIH0gXHJcblxyXG4gIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG5cclxuXHJcblxyXG4vKiAkKCcudGVzdCcpLnNsaWRlcih7XHJcbiAgZGF0YUZvcm1hdDogJ2RhdGUnLFxyXG4gIG1pblZhbDogJzExLzExLzIwMTknLFxyXG4gIG1heFZhbDogJzIzLzEyLzIwMTknLFxyXG4gIHZhbHVlOiAnMTgvMTEvMjAxOScsXHJcbiAgc3RlcDogMSxcclxuICBzY2FsZVN0ZXA6IDcsXHJcbiAgLy9zY2FsZU1hc2s6ICd2YWwnLFxyXG4gIHNjYWxlTWFzazogXCIoJzAnK3ZhbC5nZXREYXRlKCkpLnNsaWNlKC0yKSArICcuJyArICgnMCcrKDErdmFsLmdldE1vbnRoKCkpKS5zbGljZSgtMilcIixcclxuICBzY2FsZTogdHJ1ZSxcclxuICB2ZXJ0aWNhbDogdHJ1ZSxcclxuICB0b29sdGlwOiB0cnVlLFxyXG4gIHRvb2x0aXBNYXNrOiBcIignMCcrdmFsLmdldERhdGUoKSkuc2xpY2UoLTIpICsgJy4nICsgKCcwJysoMSt2YWwuZ2V0TW9udGgoKSkpLnNsaWNlKC0yKVwiLFxyXG4gIC8vdG9vbHRpcE1hc2s6ICd2YWwnLFxyXG59KTsgKi9cclxuXHJcbi8qICAkKCcudGVzdCcpLnNsaWRlcignY2hhbmdlJywge1xyXG4gIHJhbmdlOiBbJzE4LzExLzIwMTknLCAnMjUvMTEvMjAxOSddLFxyXG59KTtcclxuXHJcbiQoJy50ZXN0Jykuc2xpZGVyKCdjaGFuZ2UnLCB7XHJcbiAgc3RlcDogNyxcclxufSk7XHJcblxyXG4kKCcudGVzdCcpLnNsaWRlcignY2hhbmdlJywge1xyXG4gIG1pblZhbDogJzE4LzExLzIwMTknLFxyXG59KTtcclxuXHJcbiQoJy50ZXN0Jykuc2xpZGVyKCdjaGFuZ2UnLCB7XHJcbiAgc3RlcDogMSxcclxufSk7XHJcblxyXG4kKCcudGVzdCcpLnNsaWRlcignY2hhbmdlJywge1xyXG4gIHJhbmdlOiBudWxsLFxyXG4gIHZhbHVlOiAnMTgvMTEvMjAxOSdcclxufSk7ICAqL1xyXG5cclxuXHJcblxyXG4vKiAkKCcudGVzdCcpLnNsaWRlcih7XHJcbiAgZGF0YUZvcm1hdDogJ2N1c3RvbScsXHJcbiAgY3VzdG9tVmFsdWVzOiBbJ2EnLCdiJywnYycsJ2QnXSxcclxuICB2YWx1ZTogMSxcclxuICB0b29sdGlwOiB0cnVlLFxyXG59KVxyXG5cclxuJCgnLnRlc3QnKS5zbGlkZXIoJ2NoYW5nZScsIHtcclxuICB2YWx1ZUluQ3VzdG9tVmFsdWVzOiAnYycsXHJcbn0pICovXHJcblxyXG4vKiAkKCcudGVzdCcpLnNsaWRlcignY2hhbmdlJywge1xyXG4gIGN1c3RvbVZhbHVlczogWydhJywnYicsJ2MnLCdkJywgJ3InXSxcclxuICByYW5nZTogWzEsMl0sXHJcbn0pXHJcbiQoJy50ZXN0Jykuc2xpZGVyKCdjaGFuZ2UnLCB7XHJcbiAgcmV2ZXJzZTogdHJ1ZSxcclxuICBzY2FsZTp0cnVlLFxyXG59KVxyXG4kKCcudGVzdCcpLnNsaWRlcignY2hhbmdlJywge1xyXG4gIHZhbHVlOiAyLFxyXG4gIHJhbmdlOiBmYWxzZSxcclxufSk7ICovIl0sInNvdXJjZVJvb3QiOiIifQ==