document.getElementById('contactForm').addEventListener('submit', function(e) { 
    e.preventDefault(); 
    validate(); 
});

function validate() {
    // 1. Grab Form and Input elements
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // 2. Grab Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // 3. Clear all old error messages at the start of each validation run
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    // Track if form contains any issues
    let isValid = true;

    // 4. Validate Name
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
        isValid = false;
    }

    // 5. Validate Email (checking if it includes "@")
    if (!emailInput.value.includes('@')) {
        emailError.textContent = 'Invalid email address';
        isValid = false;
    }

    // 6. Validate Message
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message cannot be blank';
        isValid = false;
    }

    // 7. If all validations pass, show success message
    if (isValid) {
        form.innerHTML = '<p class="success-msg">Thanks! Your message was sent.</p>';
    }
}
