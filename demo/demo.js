$(document).ready(function () {

   $('#slider1').slider({
        end: 7,
        length: '100%'
    });

    $('#slider2').slider({
        begin: 2,
        end: 8,
        step: 2,
        range: true,
        reverse: true,
        length: '100%',
        vertical: true,
    });

    $('#slider3').slider({
        end: 2,
        length: '200px',
        customValues: ['1.5', '2', '2.5', '3', '3.5']
    });

    $('#slider4').slider({
        end: 2,
        length: '20em',
        customValues: ['январь', 'февраль', 'март', 'апрель', 'май']
    });


    $('.demo').each(function () {
        let $demo = $(this);
        let $slider = $demo.find('.slider');
        let $sliderWrap = $demo.find('.slider-wrap');
        let $begin = $demo.find('input[name="begin"]')
        let $max = $demo.find('input[name="max"]')
        let $min = $demo.find('input[name="min"]')
        let $customValues = $demo.find('input[name="customValues"]')
        let $hasCustomValues = $demo.find('input[name="hasCustomValues"]')
        let $customBegin = $demo.find('input[name="customBegin"]')
        let $customEnd = $demo.find('input[name="customEnd"]')
        let $button = $demo.find('button')
        let $manyOptions = $demo.find('input[name="manyOptions"]')

        let options = {};
        let instantChange = true;
        let timeout;


        $hasCustomValues.change(function () {

            $customValues.toggleAttr('disabled');
            $min.toggleAttr('disabled');
            $max.toggleAttr('disabled');

            $customEnd.toggleAttr('disabled');

            if ($demo.find('input[name="range"]').prop('checked')) {
                $customBegin.toggleAttr('disabled');
            }

            if ($(this).prop('checked')) {
                $customValues.trigger('change');

            } else {
                options.customValues = undefined;

                if (instantChange) {

                    $slider.slider('update', options);
                    options = {};

                    checkSliderWrap();
                }
            }
        });

        $manyOptions.change(function () {
            $button.toggleAttr('disabled');
            instantChange = !instantChange;
        });

        $button.on('click', function () {
            $slider.slider('update', options);
            options = {};
        });

        $demo.find('.option').each(function () {

            $(this).change(function () {

                let $option = $(this);

                if ($option.attr('type') == 'checkbox') {

                    let bool = $option.prop('checked');
                    options[$option.attr('name')] = bool;

                    if ($option.attr('name') == 'range') {

                        options.begin = $begin.val();
                        $begin.toggleAttr('disabled');
                        if (!$customValues.hasAttr('disabled')) {
                            $customBegin.toggleAttr('disabled');
                        }
                    }

                } else if ($option.attr('name') == 'customValues') {

                    let arr;
                    arr = $option.val().split(',');
                    arr.forEach(function (elem, i, arr) {
                        arr[i] = elem.trim();
                    })
                    options.customValues = arr;

                } else {

                    if ($option.hasAttr('disabled')) {
                        options[$option.attr('name')] = null;
                    };
                    options[$option.attr('name')] = $option.val();
                }


                if (instantChange) {
                    $slider.slider('update', options);
                    options = {};

                    checkSliderWrap();
                }
            });
        });

        $slider.slider('observe', function (data) {

            let $error = $demo.find('.error');
            $error.text('');
            $error.attr('hidden', '');
            clearTimeout(timeout);

            let name;
            let $option;
            let {options, warnings} = data;

            $demo.find('.option').each(function () {

                $option = $(this);
                name = $option.attr('name');

                if ($option.hasAttr('disabled')) { return };
                if (!options.hasOwnProperty(name)) { return };

                if ($option.attr('type') == 'checkbox') {

                    $option.prop('checked', options[name]);

                } else {

                    $option.val(options[name]);
                }
            });

            if (options.customValues) {

                $customValues.prop('checked', true);

                let end = options.customValues[options.end];
                $customEnd.val(end);

                if (options.range) {
                    let begin = options.customValues[options.begin];
                    $customBegin.val(begin);
                }
            }


            if (warnings && Object.keys(warnings).length != 0) {

                for (let key in warnings) {
                    $error.append('<p>' + warnings[key] + '</p>')
                }
                $error.removeAttr('hidden');

                timeout = setTimeout(function () {
                    $error.attr('hidden', '');
                }, 5000);

                return timeout;
            }
        });



        function checkSliderWrap() {
            
            if ($slider.hasClass('slider_vertical')) {
                $sliderWrap.addClass('slider-wrap_vertical');
            } else {
                $sliderWrap.removeClass('slider-wrap_vertical');
            }
        }

    });
});


$.fn.toggleAttr = function (a, b) {
    var c = (b === undefined);
    return this.each(function () {
        if ((c && !$(this).is("[" + a + "]")) || (!c && b)) $(this).attr(a, a);
        else $(this).removeAttr(a);
    });
}

$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
}