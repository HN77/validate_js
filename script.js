document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const inputs = form.querySelectorAll('input, textarea, select');
  const successMessage = form.querySelector('.success-message');

  inputs.forEach((input) =>
    input.addEventListener('input', () => validateField(input))
  );

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const isValid = Array.from(inputs).every((input) => validateField(input));

    if (isValid) showSuccessMessage();
  });

  function validateField(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (!errorElement) return true;

    if (input.checkValidity()) {
      clearError(input, errorElement);
      return true;
    } else {
      showError(input, errorElement);
      return false;
    }
  }

  function showError(input, errorElement) {
    const message = input.validity.valueMissing
      ? 'Ce champ est requis.'
      : input.validity.typeMismatch && input.type === 'email'
      ? 'Veuillez entrer une adresse email valide.'
      : input.validity.tooShort
      ? `Ce champ doit contenir au moins ${input.minLength} caractères.`
      : '';
    errorElement.textContent = message;
    input.classList.add('error');
  }

  function clearError(input, errorElement) {
    errorElement.textContent = '';
    input.classList.remove('error');
  }

  function showSuccessMessage() {
    if (!successMessage) return;
    successMessage.style.display = 'block';
    setTimeout(() => {
      successMessage.style.display = 'none';
      form.reset();
      resetErrors();
    }, 3000);
  }

  function resetErrors() {
    form
      .querySelectorAll('.error-message')
      .forEach((msg) => (msg.textContent = ''));
    form
      .querySelectorAll('.error')
      .forEach((input) => input.classList.remove('error'));
  }
});
