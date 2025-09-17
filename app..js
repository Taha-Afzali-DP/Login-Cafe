document.addEventListener("DOMContentLoaded", function () {
  // Tab switching functionality
  const tabBtns = document.querySelectorAll(".tab-btn");
  const authForms = document.querySelectorAll(".auth-form");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and forms
      tabBtns.forEach((b) => b.classList.remove("active"));
      authForms.forEach((f) => f.classList.remove("active"));

      // Add active class to clicked button and corresponding form
      btn.classList.add("active");
      document.getElementById(`${btn.dataset.tab}Form`).classList.add("active");
    });
  });

  // Password visibility toggle
  const togglePasswordBtns = document.querySelectorAll(".toggle-password");

  togglePasswordBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const passwordInput = this.previousElementSibling;
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      this.classList.toggle("fa-eye");
      this.classList.toggle("fa-eye-slash");
    });
  });

  // Form validation and submission
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Login form submission
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    // Basic validation
    if (!email || !password) {
      showError("Please fill in all fields");
      return;
    }

    // Email validation
    if (!isValidEmail(email)) {
      showError("Please enter a valid email address");
      return;
    }

    // Simulate login process
    const loginBtn = this.querySelector(".auth-btn");
    loginBtn.innerHTML = "Logging in...";
    loginBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      showSuccess("Login successful!");
      loginBtn.innerHTML = "Login";
      loginBtn.disabled = false;
      // Redirect to home page or dashboard
      // window.location.href = 'home.html';
    }, 1500);
  });

  // Signup form submission
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1]
      .value;
    const terms = this.querySelector('input[type="checkbox"]').checked;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      showError("Please fill in all fields");
      return;
    }

    // Email validation
    if (!isValidEmail(email)) {
      showError("Please enter a valid email address");
      return;
    }

    // Password validation
    if (password.length < 6) {
      showError("Password must be at least 6 characters long");
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    // Terms validation
    if (!terms) {
      showError("Please agree to the Terms & Conditions");
      return;
    }

    // Simulate signup process
    const signupBtn = this.querySelector(".auth-btn");
    signupBtn.innerHTML = "Creating Account...";
    signupBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      showSuccess("Account created successfully!");
      signupBtn.innerHTML = "Create Account";
      signupBtn.disabled = false;
      // Switch to login tab
      document.querySelector('[data-tab="login"]').click();
    }, 1500);
  });

  // Social login buttons
  const socialBtns = document.querySelectorAll(".social-btn");

  socialBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const platform = this.classList.contains("google")
        ? "Google"
        : "Facebook";
      showMessage(`Connecting to ${platform}...`);

      // Simulate social login
      setTimeout(() => {
        showSuccess(`Connected to ${platform} successfully!`);
      }, 1500);
    });
  });

  // Helper functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;

    const activeForm = document.querySelector(".auth-form.active");
    activeForm.insertBefore(errorDiv, activeForm.firstChild);

    setTimeout(() => {
      errorDiv.remove();
    }, 3000);
  }

  function showSuccess(message) {
    const successDiv = document.createElement("div");
    successDiv.className = "success-message";
    successDiv.textContent = message;

    const activeForm = document.querySelector(".auth-form.active");
    activeForm.insertBefore(successDiv, activeForm.firstChild);

    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  }

  function showMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "info-message";
    messageDiv.textContent = message;

    const activeForm = document.querySelector(".auth-form.active");
    activeForm.insertBefore(messageDiv, activeForm.firstChild);

    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }

  // Add styles for messages
  const style = document.createElement("style");
  style.textContent = `
    .error-message, .success-message, .info-message {
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 15px;
      text-align: center;
      animation: slideIn 0.3s ease;
    }

    .error-message {
      background-color: #ffebee;
      color: #c62828;
      border: 1px solid #ffcdd2;
    }

    .success-message {
      background-color: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #c8e6c9;
    }

    .info-message {
      background-color: #e3f2fd;
      color: #1565c0;
      border: 1px solid #bbdefb;
    }

    @keyframes slideIn {
      from {
        transform: translateY(-10px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
});
