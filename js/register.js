/* jshint esversion: 6 */
/* global U */
/* global removeErrorMessage, addErrorMessage */

// Function updateLabelStatus:
// Updates the color of the label associated with a form field,
// adding the 'error' class to show the label in red when the field has an error,
// or adding the 'valid' class to show the label in green when the field is valid,
// helping users visually identify whether the field is correctly filled out as they complete the form.
function updateLabelStatus(fieldId, hasError) {
    const field = U.$(fieldId);
    if (!field) return;

    const label = field.previousElementSibling;
    if (!label) return;

    if (hasError) {
        label.classList.add('error');
        label.classList.remove('valid');
    } else {
        label.classList.remove('error');
        label.classList.add('valid');
    }
}

// Function addSuccessMessage:
// Adds a success checkmark (✔) after a form input to indicate valid input.
// Before adding, it removes any existing error message next to the input.
// If the success checkmark is already present, it does nothing to avoid duplicates.
function addSuccessMessage(id) {
    const input = U.$(id);
    if (!input) return;

    let next = input.nextElementSibling;
    if (next && next.classList.contains('error')) {
        next.remove();
    }

    if (next && next.classList.contains('valid')) return;

    const span = document.createElement('span');
    span.className = 'valid';
    span.textContent = '✔';
    input.insertAdjacentElement('afterend', span);
}

// Function validateForm:
// Validates the form fields and prevents form submission if there are errors.
// If all fields are valid, it redirects the user to the landing page.
function validateForm(e) {
    'use strict';

    if (typeof e == 'undefined') e = window.event;

    var firstName = U.$('firstName');
    var lastName = U.$('lastName');
    var email = U.$('email');
    var phone = U.$('phone');
    var city = U.$('city');
    var state = U.$('state');
    var zip = U.$('zip');
    var terms = U.$('terms');

    var error = false;

    // Validate the first name:
    if (/^[A-Z \.\-']{2,20}$/i.test(firstName.value)) {
        removeErrorMessage('firstName');
        updateLabelStatus('firstName', false);
        addSuccessMessage('firstName');
    } else {
        addErrorMessage('firstName', 'Please enter your first name.');
        updateLabelStatus('firstName', true);
        error = true;
    }

    // Validate the last name:
    if (/^[A-Z \.\-']{2,20}$/i.test(lastName.value)) {
        removeErrorMessage('lastName');
        updateLabelStatus('lastName', false);
        addSuccessMessage('lastName');
    } else {
        addErrorMessage('lastName', 'Please enter your last name.');
        updateLabelStatus('lastName', true);
        error = true;
    }

    // Validate the email address:
    if (/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/.test(email.value)) {
        removeErrorMessage('email');
        updateLabelStatus('email', false);
        addSuccessMessage('email');
    } else {
        addErrorMessage('email', 'Please enter your email address.');
        updateLabelStatus('email', true);
        error = true;
    }

    // Validate the phone number:
    if (/\d{3}[ \-\.]?\d{3}[ \-\.]?\d{4}/.test(phone.value)) {
        removeErrorMessage('phone');
        updateLabelStatus('phone', false);
        addSuccessMessage('phone');
    } else {
        addErrorMessage('phone', 'Please enter your phone number.');
        updateLabelStatus('phone', true);
        error = true;
    }

    // Validate the city:
    if (city.value.trim() !== '') {
        removeErrorMessage('city');
        updateLabelStatus('city', false);
        addSuccessMessage('city');
    } else {
        addErrorMessage('city', 'Please enter your city.');
        updateLabelStatus('city', true);
        error = true;
    }

    // Validate the state:
    if (state.selectedIndex != 0) {
        removeErrorMessage('state');
        updateLabelStatus('state', false);
        addSuccessMessage('state');
    } else {
        addErrorMessage('state', 'Please select your state.');
        updateLabelStatus('state', true);
        error = true;
    }

    // Validate the zip code (Australian format: exactly 4 digits):
    if (/^\d{4}$/.test(zip.value.trim())) {
        removeErrorMessage('zip');
        updateLabelStatus('zip', false);
        addSuccessMessage('zip');
    } else {
        addErrorMessage('zip', 'Please enter your zip code.');
        updateLabelStatus('zip', true);
        error = true;
    }

    // If there are errors, prevent form submission:
    if (error) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        return false;
    }

    // Prevent the default form submission even if no errors,
    // so we can handle the redirect ourselves and avoid 405 error
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }

    // Redirect to the landing page
    window.location.href = 'sites/index.html';

    return false; // prevent any further default action
}

// Function toggleSubmit:
// Enables or disables the submit button based on the terms checkbox.
function toggleSubmit() {
    'use strict';

    var submit = U.$('submit');
    if (U.$('terms').checked) {
        submit.disabled = false;
    } else {
        submit.disabled = true;
    }
}

// Establish functionality on window load:
window.onload = function() {
    'use strict';

    // The validateForm() function handles the form submission event:
    U.addEvent(U.$('theForm'), 'submit', validateForm);

    // Disable the submit button initially:
    U.$('submit').disabled = true;

    // Listen for changes on the terms checkbox to toggle submit button:
    U.addEvent(U.$('terms'), 'change', toggleSubmit);

    // Enable tooltips on the phone number and zip code fields:
    U.enableTooltips('phone');
    U.enableTooltips('zip');
};
