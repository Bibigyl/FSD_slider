$(document).ready( function() {

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
        customValues: ['a', 'b', 'c', '0.5', true],
        length: '200px'
    });


    $('.demo').each(function() {
        let $demo = $(this);
        let $slider = $demo.find('.slider');
        let options = {};
        let instantChange = true;
        let timeout;

        $demo.find('input[name="range"]').change(function() {

            if ( $(this).attr('value') === 'true' ) {
                options.range = true;
                options.begin = $demo.find('input[name="begin"]').val();

            } else {
                options.range = false;
                options.begin = null;
                options.end = $demo.find('input[name="end"]').val();
            }

            $demo.find('input[name="begin"]').toggleAttr('disabled');

            if (!$demo.find('input[name="customValues"]').hasAttr('disabled')) {
                $demo.find('input[name="customBegin"]').toggleAttr('disabled');
            }

            if (instantChange) {
                $slider.slider('update', options);
                options = {};
            }
        });

        $demo.find('input[name="hasCustomValues"]').change(function() {

            $demo.find('input[name="customValues"]').toggleAttr('disabled');
            $demo.find('input[name="min"]').toggleAttr('disabled');
            $demo.find('input[name="max"]').toggleAttr('disabled');

            $demo.find('input[name="customEnd"]').toggleAttr('disabled');
            let isRange = $demo.find('input[name="range"][value=true]').prop('checked');
            if ( isRange ) {
                $demo.find('input[name="customBegin"]').toggleAttr('disabled');
            }

            if ( $(this).prop('checked') ) {
                $demo.find('input[name="customValues"]').trigger('change');

            } else {
                options.customValues = undefined;

                if (instantChange) {
                    $slider.slider('update', options);
                    options = {};
                }
            }
        });

        $demo.find('input[name="manyOptions"]').change(function() {
            $demo.find('button').toggleAttr('disabled');
            instantChange = !instantChange;
        });

        $demo.find('button').on('click', function() {
            $slider.slider('update', options);
            options = {};
        });

        $demo.find('input[name="vertical"]').change(function() {
            $demo.find('.slider-wrap').toggleClass('slider-wrap_vertical');
        })

        $demo.find('.option').each(function() {

            $(this).change(function() {

                let $option = $(this);

                if ( $option.attr('type') == 'checkbox') {

                    let bool = $option.prop('checked');
                    options[$option.attr('name')] = bool;

                } else if ( $option.attr('name') == 'customValues' ) {

                    let arr;
                    arr = $option.val().split(',');
                    arr.forEach( function(elem, i, arr) {
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
                }
            });
        });

        $slider.slider('observe', function(options, warnings) {

            let $error = $demo.find('.error');
            $error.text('');
            $error.attr('hidden', '');
            clearTimeout(timeout);

            let name;
            let $option;

            $demo.find('.option').each(function() {

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

            if ( options.customValues ) {
                
                $demo.find('input[name="customValues"]').prop('checked', true);

                let end = options.customValues[options.end];
                $demo.find('input[name="customEnd"]').val(end);

                if ( options.range ) {
                    let begin = options.customValues[options.begin];
                    $demo.find('input[name="customBegin"]').val(begin);
                }
            }


            if ( warnings && Object.keys(warnings).length != 0 ) {

                for ( let key in warnings ) {
                    $error.append('<p>' + warnings[key] + '</p>')
                }
                $error.removeAttr('hidden');
        
                timeout = setTimeout(function() {
                    $error.attr('hidden', '');
                }, 5000);
        
                return timeout;
            }
        });
    });
});


$.fn.toggleAttr = function(a, b) {
    var c = (b === undefined);
    return this.each(function() {
        if((c && !$(this).is("["+a+"]")) || (!c && b)) $(this).attr(a,a);
        else $(this).removeAttr(a);
    });
}

$.fn.hasAttr = function(name) {  
    return this.attr(name) !== undefined;
}