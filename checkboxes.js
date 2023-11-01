document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("checkbox-form");
    const checkboxes = form.querySelectorAll("input[type=checkbox]");

    // Initialize the URL parameters object
    const urlParams = new URLSearchParams();

    // Function to update the URL
    function updateURL() {
        urlParams.delete("selectedCheckboxes"); // Clear the previous selection
        const selectedCheckboxes = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        if (selectedCheckboxes.length > 0) {
            urlParams.set("selectedCheckboxes", selectedCheckboxes.join(","));
        }

        const newURL = window.location.href.split('?')[0] + '?' + urlParams.toString();
        window.history.replaceState({}, '', newURL);
    }

    // Attach a click event listener to each checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("click", updateURL);
    });

    // Initialize the checkboxes based on the URL parameters
    const selectedCheckboxes = urlParams.get("selectedCheckboxes");
    if (selectedCheckboxes) {
        selectedCheckboxes.split(",").forEach(value => {
            const checkbox = form.querySelector(`input[value="${value}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }

    // Update the URL on page load to reflect the initial checkbox state
    updateURL();
});
