// Waitlist functionality
const API_URL = '/api/waitlist';

// Configuration - Set to false to hide exact count
const SHOW_EXACT_COUNT = false; // Change to true when you have 25+ signups
const MIN_COUNT_TO_SHOW = 25; // Only show count if above this number

// Initialize waitlist counter on page load
document.addEventListener('DOMContentLoaded', async () => {
  if (SHOW_EXACT_COUNT) {
    await updateWaitlistCounter();
  } else {
    hideCounter();
  }
  setupFormHandlers();
  setupScrollAnimations();
});

// Hide counter if not showing exact count
function hideCounter() {
  const counters = document.querySelectorAll('.waitlist-counter');
  counters.forEach((counter) => {
    counter.style.display = 'none';
  });
}

// Update waitlist counter
async function updateWaitlistCounter() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // If count is below threshold, hide it
    if (data.count < MIN_COUNT_TO_SHOW) {
      hideCounter();
      return;
    }

    const counterElements = document.querySelectorAll(
      '.waitlist-counter-number'
    );
    const counterTextElements = document.querySelectorAll(
      '.waitlist-counter-text'
    );

    counterElements.forEach((el) => {
      el.textContent = data.count || 0;
    });

    counterTextElements.forEach((el) => {
      if (data.count >= 100) {
        el.textContent = "🎉 We've reached 100 beta users!";
      } else {
        el.textContent = `${data.count} of 100 beta users joined`;
      }
    });

    // Show counter if it was hidden
    const counters = document.querySelectorAll('.waitlist-counter');
    counters.forEach((counter) => {
      counter.style.display = 'block';
    });
  } catch (error) {
    console.error('Failed to fetch waitlist count:', error);
    hideCounter();
  }
}

// Setup form handlers
function setupFormHandlers() {
  const forms = document.querySelectorAll('#signup-form, #signup-form-bottom');

  forms.forEach((form) => {
    form.addEventListener('submit', handleSubmit);
  });
}

// Handle form submission
async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const button = form.querySelector('button[type="submit"]');
  const emailInput = form.querySelector('input[type="email"]');
  const email = emailInput.value.trim();

  // Remove any existing messages
  const existingSuccess = form.querySelector('.success-message');
  const existingError = form.querySelector('.error-message');
  if (existingSuccess) existingSuccess.remove();
  if (existingError) existingError.remove();

  // Validate email
  if (!email || !isValidEmail(email)) {
    showError(form, 'Please enter a valid email address.');
    return;
  }

  // Disable button and show loading state
  button.disabled = true;
  const originalText = button.textContent;
  button.textContent = 'Joining...';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong. Please try again.');
    }

    // Show success message
    showSuccess(
      form,
      `🎉 You're in! We'll email you when Novba launches in February.`
    );

    // Reset form
    form.reset();

    // Update counter (only if enabled)
    if (SHOW_EXACT_COUNT) {
      await updateWaitlistCounter();
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    showError(form, error.message || 'Something went wrong. Please try again.');
  } finally {
    // Re-enable button
    button.disabled = false;
    button.textContent = originalText;
  }
}

// Show success message
function showSuccess(form, message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message show';
  successDiv.textContent = message;
  form.appendChild(successDiv);

  // Scroll to message
  successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Remove after 5 seconds
  setTimeout(() => {
    successDiv.classList.remove('show');
    setTimeout(() => successDiv.remove(), 300);
  }, 5000);
}

// Show error message
function showError(form, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message show';
  errorDiv.textContent = message;
  form.appendChild(errorDiv);

  // Scroll to message
  errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Remove after 5 seconds
  setTimeout(() => {
    errorDiv.classList.remove('show');
    setTimeout(() => errorDiv.remove(), 300);
  }, 5000);
}

// Validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Setup scroll animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.problem-card, .feature-card').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
