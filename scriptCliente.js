document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const spinner = submitBtn.querySelector('.spinner-border');
    const alertMessage = document.getElementById('alertMessage');

    const API_URL = 'http://localhost:5000/cliente';

    function showLoading(loading) {
        submitBtn.disabled = loading;
        spinner.classList.toggle('d-none', !loading);
        submitBtn.innerHTML = loading ? 
            '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...' : 
            'Register';
    }

    function showAlert(message, type) {
        alertMessage.textContent = message;
        alertMessage.className = `alert alert-${type} mt-3`;
        alertMessage.classList.remove('d-none');

        if (type === 'success') {
            setTimeout(() => {
                alertMessage.classList.add('d-none');
            }, 5000);
        }
    }

    function validateField(input) {
        const value = input.value.trim();
        
        if (!value) {
            input.classList.add('is-invalid');
            return false;
        }

        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                input.classList.add('is-invalid');
                return false;
            }
        }

        input.classList.remove('is-invalid');
        return true;
    }

    async function submitForm(formData) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error submitting form: ' + error.message);
        }
    }

    // Real-time validation
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Reset previous validation state
        alertMessage.classList.add('d-none');
        
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');

        const isFirstNameValid = validateField(firstName);
        const isLastNameValid = validateField(lastName);
        const isEmailValid = validateField(email);

        if (!isFirstNameValid || !isLastNameValid || !isEmailValid) {
            showAlert('Please fill in all required fields correctly.', 'danger');
            return;
        }

        const formData = {
            nombre: firstName.value.trim(),
            apellido: lastName.value.trim(),
            email: email.value.trim()
        };

        showLoading(true);

        try {
            const response = await submitForm(formData);
            showAlert('Registration successful! Welcome aboard!', 'success');
            form.reset();
        } catch (error) {
            showAlert(error.message, 'danger');
        } finally {
            showLoading(false);
        }
    });
});