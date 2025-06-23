// Script - errorMessages.js
// This script defines functions for adding and removing error messages.

// This function adds the error message.
// It takes two arguments: the form element ID and the message.
function addErrorMessage(id, msg) {
   	'use strict';
    
    // Get the form element reference:
    var elem = document.getElementById(id);
    
    // Define the new span's ID value:
    var newId = id + 'Error';
    
    // Check for the existence of the span:
    var span = document.getElementById(newId);
if (span) {
    // In addErrorMessage:
// Use firstChild.nodeValue to update the error text safely.
    if (span.firstChild) {// precise colocar node
        span.firstChild.nodeValue = msg;
    }
} else {
     // Create the span:
        span = document.createElement('span');
        span.id = newId;
		span.className = 'error';
        span.appendChild(document.createTextNode(msg));
        
        // Add the span to the parent:
        elem.parentNode.appendChild(span);
        elem.previousElementSibling.className = 'error';

    } // End of main IF-ELSE.

} // End of addErrorMessage() function.

// This function removes the error message.
// It takes one argument: the form element ID.
function removeErrorMessage(id) {
    'use strict';
    var span = document.getElementById(id + 'Error');
    if (span) {
        // Ajustado para alcançar o label corretamente
        var label = span.previousElementSibling.previousElementSibling;
        if (label) {
            label.classList.remove('error');
            label.classList.add('valid');  // Adiciona verde ao label
        }
        span.parentNode.removeChild(span);
    }
};