 function sendMail() {

    // Get the form data
    const name = document.getElementById('fName').value;
    const email = document.getElementById('fMail').value;
    const message = document.getElementById('fMsg').value;

    // Create a JSON object with the form data
    const data = {
        name: name,
        email: email,
        'form-message': message
    };

    // Get the button element and "Thank you" message element

    const submitButton = document.getElementById('submit-btn');
    const thankYouMessage = document.getElementById('thank-you-message');

    // Disable the button and show the spinner

    submitButton.setAttribute('disabled', 'disabled');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span role="status" aria-hidden="true" class="spinner-border spinner-border-sm align-self-center me-2"></span>Sending...';

    // Send a POST request to the Flask route

    fetch('https://flask-backend-portfolio-abdi-e0d314dab24d.herokuapp.com/contact-daud', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
    })

    .then(response => {
        if (response.ok) {
            // Handle a successful response here
            console.log('Email sent successfully');

            // Show the "Thank you" message
            thankYouMessage.style.display = 'block';

            // Hide the message after 2 seconds
            setTimeout(() => {

                // Fade out and remove the "Thank you" message after 3 seconds
                $(thankYouMessage).fadeOut('slow', function() {
                    thankYouMessage.style.display = 'none';
                    // $(this).remove();
                });
            }, 3000);
        } else {
            // Handle an error response here
            console.error('Error sending email');
        }
    })

    .catch(error => {
        // Handle any network or fetch API errors here
        console.error('Fetch error:', error);
    })

    .finally(() => {
        // Re-enable the button and restore the original text

        submitButton.removeAttribute('disabled');
        submitButton.innerHTML = originalText;

        // Clear the form data
        document.getElementById('fName').value = '';
        document.getElementById('fMail').value = '';
        document.getElementById('fMsg').value = '';

    });
}

document.getElementById('contact-form').addEventListener('submit', function (e) {

    e.preventDefault();
    sendMail(); // Call the sendMail function

});
