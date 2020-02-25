$(document).ready( function() {

    $('#slider1').slider({
        min: 0,
        max: 15,
        value: 5,
        step: 1,
        length: '100%',
        scale: true,
        tooltip: true,
    });

/*     $('#slider1').slider('update', {
        value: 6
    })
    $('#slider1').slider('update', {
        value: 11
    }) */


    $('.demo').each(function() {
        let demo = $(this);
        let slider = demo.find('.slider');
        let options = {};
        let instantChange = true;
        let timeout;
        let prevOptions;

        demo.find('.radio-thumbs').change(function() {


            let value;
            if ( $(this).attr('value') == 'one' ) {
                value = demo.find('input[name="value"]').val();
                options.value = value;
                options.range = null;

            } else {
                value = demo.find('input[name="range"]').val();
                value = value.split(',', 2);
                options.range = value;
                options.value = null;
            }

            demo.find('input[name="value"]').toggleAttr('disabled');
            demo.find('input[name="range"]').toggleAttr('disabled');


            if (!demo.find('input[name="customValues"]').hasAttr('disabled')) {
                demo.find('input[name="customValue"]').toggleAttr('disabled');                
                demo.find('input[name="customRange"]').toggleAttr('disabled');
            }

            if (instantChange) {
                //timeout = tryToChange(demo, options, timeout);
                slider.slider('update', options);
                options = {};
            }
        });

        demo.find('input[name="hasCustomValues"]').change(function() {
            demo.find('input[name="customValues"]').toggleAttr('disabled');
            demo.find('input[name="min"]').toggleAttr('disabled');
            demo.find('input[name="max"]').toggleAttr('disabled');

            let range = !demo.find('input[name="range"]').hasAttr('disabled');
            if (!range) {
                demo.find('input[name="customValue"]').toggleAttr('disabled');
            } else {
                demo.find('input[name="customRange"]').toggleAttr('disabled');                
            }

            if ($(this).prop('checked')) {
                demo.find('input[name="customValues"]').trigger('change');

            } else {
                options.customValues = undefined;

                if (instantChange) {
                    //timeout = tryToChange(demo, options, timeout);
                    slider.slider('update', options);
                    options = {};
                }
            }
        });

        demo.find('input[name="manyOptions"]').change(function() {
            demo.find('button').toggleAttr('disabled');
            instantChange = !instantChange;
        });

        demo.find('button').on('click', function() {
            //timeout = tryToChange(demo, options, timeout);
            slider.slider('update', options);
            options = {};
        });

        demo.find('.option').each(function() {

            $(this).change(function() {

                let opt = $(this);

                if ( opt.attr('type') == 'checkbox') {

                    let bool = opt.prop('checked');
                    options[opt.attr('name')] = bool;


                } else if ( opt.attr('name') == 'range' ) {

                    let val;
                    val = opt.val().split(',', 2);
                    options.range = val;

                } else if ( opt.attr('name') == 'customValues' ) {

                    let arr;
                    arr = opt.val().split(',');
                    arr.forEach( function(elem, i, arr) {
                        arr[i] = elem.trim();
                    })
                    options.customValues = arr;

                } else {

                    if (opt.hasAttr('disabled')) {
                        options[opt.attr('name')] = null;
                    };
                    options[opt.attr('name')] = opt.val();
                }


                if (instantChange) {
                    //timeout = tryToChange(demo, options, timeout);

                    slider.slider('update', options);
                    options = {};
                }
            });
        });

        slider.slider('observe', function(config) {

            let name;
            let opt;
            let val;

            if ( config.type == 'NEW_VALUE' || config.type == 'NEW_DATA' ) {
                let options = config.options;

                demo.find('.option').each(function() {

                    opt = $(this);
                    name = opt.attr('name');
    
                    if (opt.hasAttr('disabled')) { return };

                    if (!options.hasOwnProperty(name)) { return };
    
                    if (opt.attr('type') == 'checkbox') {
    
                        if ( options[name] ) {
                            opt.prop('checked', true)
                        } else {
                            opt.prop('checked', false)
                        }
    
                    } else {
    
                        opt.val(options[name]);
                    }
                });


                if ( options.customValues ) {

                    if ( !demo.find('input[name="customValue"]').hasAttr('disabled') ) {
                        val = options.customValues[options.value];
                        demo.find('input[name="customValue"]').val(val);     
                    }
        
                    if ( !demo.find('input[name="customRange"]').hasAttr('disabled') ) {
                        val = [];
                        val[0] = options.customValues[options.range[0]];
                        val[1] = options.customValues[options.range[1]];
                        demo.find('input[name="customRange"]').val(val);                
                    }
                }

            }


            if ( config.type == 'WARNINGS' ) {

                let error = demo.find('.error');
                error.text('');

                clearTimeout(timeout);

                for ( let key in config.warnings ) {
                    error.append('<p>' + config.warnings[key] + '</p>')
                }
                //block.find('.error span').text(e);
                error.removeAttr('hidden');
        
                timeout = setTimeout(function() {
                    //error.text('');
                    error.attr('hidden', '');
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

// поменять название, если функция  остается 
/* function tryToChange(block, options, timeout) {
    let slider = block.find('.slider');
    let prevOptions;
    prevOptions = slider.slider('getData');

    try {

        slider.slider('update', options);

        if ( !block.find('.mistake').hasAttr('hidden') ) {

            block.find('.mistake').attr('hidden', '');
            clearTimeout(timeout);
        }

    } catch(e) {

        slider.slider('update', prevOptions);

        clearTimeout(timeout);

        block.find('.mistake span').text(e);
        block.find('.mistake').removeAttr('hidden');

        timeout = setTimeout(function() {
            block.find('.mistake').attr('hidden', '');
        }, 4000);

        return timeout;
    } 
} */