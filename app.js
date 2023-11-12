// JavaScript Functions for the Pasta Tracker Web App

// Function to encode a new pasta to the list
function encodeToString() {
    // Get all checkboxes
    var checkboxes = document.querySelectorAll('input[type=checkbox]');

    // Initialize an empty array to store the selected options
    var selectedOptions = [];

    // Loop through all checkboxes
    for (var i = 0; i < checkboxes.length; i++) {
        // If the checkbox is checked, add its value to the array
        if (checkboxes[i].checked) {
            selectedOptions.push(checkboxes[i].value);
        }
    }

    // Join the array into a string with no spaces
    var urlString = selectedOptions.join('');

    // Encode the string as part of a URL
    var encodedUrlString = encodeURIComponent(urlString);
    console.log(encodedUrlString);

    // Get the text box by its ID
    var textBox = document.getElementById('output');

    // Set the value of the text box to the encoded URL string
    textBox.value = encodedUrlString;

    // Create a new Blob object from the encoded URL string
    var blob = new Blob([encodedUrlString], {type: 'text/plain;charset=utf-8'});

    let button = document.getElementById('blob-file-download');

    // Set the href of the link to a URL created from the Blob
    button.href = URL.createObjectURL(blob);

    // Set the download attribute of the link to the desired file name
    button.download = 'PastaTrackerData.txt';

    // Set the link to look like a button
    button.style.display = 'inline-block';
};

// Function to decode a pasta from the list
function decodeFromString() {
    // Get the text box by its ID
    var textBox = document.getElementById('output');

    // Get all checkboxes
    var checkboxes = document.querySelectorAll('input[type=checkbox]');
    // Get the pasted string from the text box
    var pastedString = textBox.value;

    // Decode the URL string
    var decodedString = decodeURIComponent(pastedString);

    // Loop through all checkboxes
    for (var i = 0; i < checkboxes.length; i++) {
        // If the decoded string contains the value of the checkbox, check it
        if (decodedString.includes(checkboxes[i].value)) {
            checkboxes[i].checked = true;
        } else {
            // Otherwise, uncheck it
            checkboxes[i].checked = false;
        }
    }
}

// When the page is loaded, restore the checkbox values from localStorage
window.addEventListener('load', function() {
    // Get the text box by its ID
    var textBox = document.getElementById('output');

    // Get all checkboxes
    var checkboxes = document.querySelectorAll('input[type=checkbox]');

    // Loop through all checkboxes
    for (var i = 0; i < checkboxes.length; i++) {
        // Get the saved value from localStorage (it will be 'true' if the checkbox was checked, and 'false' otherwise)
        var savedValue = localStorage.getItem(checkboxes[i].value);

        // If there was a saved value, restore it
        if (savedValue !== null) {
            checkboxes[i].checked = (savedValue === 'true');
        }
    }
});

// When a checkbox is changed, save its value to localStorage
// Get the text box by its ID
var textBox = document.getElementById('output');

// Get all checkboxes
var checkboxes = document.querySelectorAll('input[type=checkbox]');

// Loop through all checkboxes
for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', function() {
        // Save the checked state of the checkbox to localStorage
        localStorage.setItem(this.value, this.checked.toString());
    });
}
