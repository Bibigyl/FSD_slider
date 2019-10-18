/* let date = new Date(2019, 10, 10);
console.log(+date);
let d = new Date(-2209084217000);
console.log(date);

$(document).ready( function() {
    let t = $('.test');
    console.log(t);
}); */

/* let str = "10";

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

function widthValidation(str) {
    if ( typeof ('' + str) == 'string' ) {
        let r = ('' + str).match(/^\d{1,3}[.,]?\d*(px|em|rem|%)?$/i);

        if ( r && this.isNumeric(+r[0]) ) { 
            return r[0].toLowerCase() + 'px';
        } else if ( r ) {
            return r[0].toLowerCase();
        }
    }
    throw new Error('width should be valid to css');
}
console.log(widthValidation(str)); */

function setWidthToSlider(w, node) {
    node.style.width = w;
    /* return node; */
}

let node = document.createElement('div');
/* node.style.width = '100px'; */
document.body.append(node);
setWidthToSlider('20px', node);
node.innerHTML = "das";
console.log(node.constructor.name);
console.log(node.nodeType);
