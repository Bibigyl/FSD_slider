$(document).ready( function() {

    $('#slider1').slider({
        minVal: 0,
        maxVal: 30,
        step: 0.5,
        tooltipMask: "'$' + (+val).toFixed(2)",
        scaleStep: 5,
        scaleMask: "'$' + val",
    });

    $('#slider2').slider({
        dataFormat: 'date',
        minVal: '11/11/2019',
        maxVal: '23/12/2019',
        initialVal: '18/11/2019',
        step: 1,
        scaleStep: 7,
        //scaleMask: 'val',
        scaleMask: "val",
        scale: true,
        vertical: true,
        tooltip: false,
        tooltipMask: "('0'+val.getDate()).slice(-2) + '.' + ('0'+(1+val.getMonth())).slice(-2)",
        //tooltipMask: 'val',
    });

    $('#slider3').slider({
        dataFormat: 'custom',
        customValues: ['yellow', 'orange', 'red', 'purple', 'blue', 'green'],
        initialValNumInCustomValues: 4,
        scale: true,
        tooltipMask: "'color: ' + val",
    })

    $('.demo').each(function() {
        let demo = $(this);
        let slider = demo.find('.slider');
        let options = {};
        let instantChange = true;
        let timeout;
        

        demo.find('.radio-thumbs').change(function() {
            demo.find('input[name="initialVal"]').toggleAttr('disabled');
            demo.find('input[name="initialValInCustomValues"]').toggleAttr('disabled');
            demo.find('input[name="initialValNumInCustomValues"]').toggleAttr('disabled');
            
            demo.find('input[name="range"]').toggleAttr('disabled');
            demo.find('input[name="rangeInCustomValues"]').toggleAttr('disabled');
            demo.find('input[name="rangeNumInCustomValues"]').toggleAttr('disabled');

            let val;
            if ( $(this).attr('value') == 'one' ) {
                val = demo.find('input[name="initialVal"]').val() || demo.find('input[name="initialValNumInCustomValues"]').val();
                options.initialVal = val;
                //options.initialValNumInCustomValues = val;
                options.range = null;
                options.rangeInCustomValues = null;
                options.rangeNumInCustomValues = null;

            } else {
                val = demo.find('input[name="range"]').val() || demo.find('input[name="rangeNumInCustomValues"]').val();
                val = val.split('-', 2);
                options.range = val;
                //options.initialValInCustomValues = null;
                //options.initialValNumInCustomValues = null;
            }

            if (instantChange) {
                timeout = tryToChange(demo, options, timeout);
                options = {};
            }

        });

        demo.find('input[name="tooltip"]').change(function() {
            demo.find('input[name="tooltipMask"]').toggleAttr('disabled');
        });

        demo.find('input[name="scale"]').change(function() {
            demo.find('input[name="scaleStep"]').toggleAttr('disabled');
            demo.find('input[name="scaleMask"]').toggleAttr('disabled');
        });

        demo.find('input[name="manyOptions"]').change(function() {
            demo.find('button').toggleAttr('disabled');
            instantChange = instantChange ? false : true;
        });

        demo.find('button').on('click', function() {
            timeout = tryToChange(demo, options, timeout);
        });

        demo.find('.option').each(function() {

            let temp;

            $(this).on('click', function() {
                temp = $(this).val()
            })

            
            $(this).change(function() {

                let opt = $(this);

                if ( opt.attr('type') == 'checkbox') {

                    opt.toggleAttr('checked');
                    let bool = opt.hasAttr('checked');
                    options[opt.attr('name')] = bool; 

                } else if ( opt.attr('name').match(/[Rr]ange/) ) {

                    console.log('pop')
                    let val;
                    val = opt.val().split('-', 2);
                    options[opt.attr('name')] = val;

                    console.log(options);

                } else if ( opt.attr('name') == 'initialValInCustomValues' ) {
                    options.initialValInCustomValues = opt.val();
                } else {

                    options[opt.attr('name')] = opt.val();
                    console.log(opt.val());
    
                }

                if ( opt.attr('name') == 'reverse' && !options.hasOwnProperty('minVal') && !options.hasOwnProperty('maxVal') ) {
                    let min, max;
                    min = demo.find('input[name="minVal"]').val();
                    max = demo.find('input[name="maxVal"]').val();

                    demo.find('input[name="minVal"]').val(max);
                    demo.find('input[name="maxVal"]').val(min);
                }

                if (instantChange) {
                    timeout = tryToChange(demo, options, timeout);
                    if (timeout) {
                        opt.val(temp);
                    } 
                    options = {};
                }
            });
        });

        slider.slider('observe', function(val) {
            if ( !Array.isArray(val) ) {

                if (demo.attr('id') == 'demo2') {

                    val = ('0' + val.getDate()).slice(-2) + 
                    '/' + ('0' + (1 + val.getMonth()) ).slice(-2) +
                    '/' + ( val.getFullYear() );
                }
                demo.find('input[name="initialVal"]').val(val);
                demo.find('input[name="initialValInCustomValues"]').val(val);

            } else {

                if (demo.attr('id') == 'demo2') {

                    val[0] = ('0' + val[0].getDate()).slice(-2) + 
                    '/' + ('0' + (1 + val[0].getMonth()) ).slice(-2) +
                    '/' + val[0].getFullYear();

                    val[1] = ('0' + val[1].getDate()).slice(-2) + 
                    '/' + ('0' + (1 + val[1].getMonth()) ).slice(-2) +
                    '/' + val[1].getFullYear();
                }
                demo.find('input[name="range"]').val(val.join('-'));
                demo.find('input[name="rangeInCustomValues"]').val(val.join('-'));
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
};

$.fn.hasAttr = function(name) {  
    return this.attr(name) !== undefined;
};

function tryToChange(block, options, timeout) {
    let slider = block.find('.slider');

    try {
        slider.slider('change', options);

        if ( !block.find('.mistake').hasAttr('hidden') ) {

            block.find('.mistake').attr('hidden', '');
            clearTimeout(timeout);
        }

    } catch(e) {
        clearTimeout(timeout);

        block.find('.mistake span').text(e);
        block.find('.mistake').removeAttr('hidden');

        timeout = setTimeout(function() {
            block.find('.mistake').attr('hidden', '');
        }, 4000);

        return timeout;
    }
}

/* function numericChange(opt, demo, options, timeout, instantChange) {

    if ( opt.attr('type') == 'checkbox') {

        //opt.toggleAttr('checked');
        let bool = opt.hasAttr('checked');
        options[opt.attr('name')] = bool; 

    } else if ( opt.attr('name') == 'range' ) {

        let val;
        val = opt.val().split('-', 2);
        opt.attr('value', opt.val());
        options.range = val;

    } else {

        //opt.attr('value', opt.val());
        options[opt.attr('name')] = opt.val();
    }

    if (instantChange) {
        timeout = tryToChange(demo, options, timeout);
        options = {};
    }
}

function dateChange(opt, demo, options, timeout, instantChange) {

    if ( opt.attr('type') == 'checkbox') {

        //opt.toggleAttr('checked');
        let bool = opt.hasAttr('checked');
        options[opt.attr('name')] = bool; 

    } else if ( opt.attr('name') == 'range' ) {

        let val;
        val = opt.val().split('-', 2);
        //opt.attr('value', opt.val());
        options.range = val;

    } else {

        opt.attr('value', opt.val());
        options[opt.attr('name')] = opt.val();
    }

    if (instantChange) {
        timeout = tryToChange(demo, options, timeout);
        options = {};
    }   
} */