// Script - errorMessages.js
// This script defines functions for adding and removing error messages.

/* exported addErrorMessage, removeErrorMessage */ // <- avisa o JSHint que serão usadas em outro lugar

function addErrorMessage(id, msg) {
    'use strict';

    var elem = document.getElementById(id);
    if (!elem) return; // segurança adicional

    var newId = id + 'Error';
    var span = document.getElementById(newId);

    if (span) {
        if (span.firstChild) {
            span.firstChild.nodeValue = msg;
        }
    } else {
        span = document.createElement('span');
        span.id = newId;
        span.className = 'error';
        span.appendChild(document.createTextNode(msg));
        elem.parentNode.appendChild(span);

        if (elem.previousElementSibling) {
            elem.previousElementSibling.className = 'error';
        }
    }
}

function removeErrorMessage(id) {
    'use strict';

    var span = document.getElementById(id + 'Error');
    if (span) {
        var label = span.previousElementSibling && span.previousElementSibling.previousElementSibling;
        if (label) {
            label.classList.remove('error');
            label.classList.add('valid');
        }
        span.parentNode.removeChild(span);
    }
}
