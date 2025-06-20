// DOM Content Loaded Event
// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  navToggle.addEventListener("click", function () {
    mainNav.classList.toggle("nav-open");
    navToggle.classList.toggle("nav-toggle-open");
  });

  // Close mobile menu when clicking on nav links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mainNav.classList.remove("nav-open");
      navToggle.classList.remove("nav-toggle-open");
    });
  });

  // Active link highlighting
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initScrollEffects();
  initSkillBars();
  initFormValidation();
  initModal();
  initSmoothScrolling();
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe elements when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const heroText = document.querySelector(".hero-text");
  const heroStats = document.querySelector(".hero-stats");

  observer.observe(heroText);
  observer.observe(heroStats);
});

// Navigation Toggle Functionality
function initNavigation() {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile navigation
  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    mainNav.classList.toggle("active");
  });

  // Close navigation when clicking on links (mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      mainNav.classList.remove("active");
    });
  });

  // Close navigation when clicking outside (mobile)
  document.addEventListener("click", function (e) {
    if (!navToggle.contains(e.target) && !mainNav.contains(e.target)) {
      navToggle.classList.remove("active");
      mainNav.classList.remove("active");
    }
  });

  // Update active navigation link based on scroll position
  window.addEventListener("scroll", updateActiveNavLink);
}

// Update active navigation link
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Scroll Effects (Fade in animations)
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll(
    ".profile-card, .skill-category, .timeline-item, .education-card, .contact-method"
  );

  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });
}

// Skill Bars Animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const skillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const width = skillBar.getAttribute("data-width");

          // Animate skill bar with delay
          setTimeout(() => {
            skillBar.style.width = width;
          }, 200);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => {
    skillObserver.observe(bar);
  });
}

// Form Validation and Submission
function initFormValidation() {
  const contactForm = document.getElementById("contactForm");
  const formInputs = contactForm.querySelectorAll("input, textarea");

  // Real-time validation
  formInputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearError(input));
  });

  // Form submission
  contactForm.addEventListener("submit", handleFormSubmit);
}

// Validate individual field
function validateField(field) {
  const fieldName = field.name;
  const value = field.value.trim();
  const errorElement = document.getElementById(`${fieldName}Error`);

  let isValid = true;
  let errorMessage = "";

  // Clear previous error styling
  field.classList.remove("error");

  switch (fieldName) {
    case "name":
      if (value.length < 2) {
        errorMessage = "Name must be at least 2 characters long";
        isValid = false;
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        errorMessage = "Name can only contain letters and spaces";
        isValid = false;
      }
      break;

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = "Please enter a valid email address";
        isValid = false;
      }
      break;

    case "subject":
      if (value.length < 5) {
        errorMessage = "Subject must be at least 5 characters long";
        isValid = false;
      }
      break;

    case "message":
      if (value.length < 10) {
        errorMessage = "Message must be at least 10 characters long";
        isValid = false;
      }
      break;
  }

  // Display error message and styling
  if (!isValid) {
    field.classList.add("error");
    errorElement.textContent = errorMessage;
  } else {
    errorElement.textContent = "";
  }

  return isValid;
}

// Clear error styling and message
function clearError(field) {
  field.classList.remove("error");
  const errorElement = document.getElementById(`${field.name}Error`);
  if (errorElement) {
    errorElement.textContent = "";
  }
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formInputs = e.target.querySelectorAll("input, textarea");

  let isFormValid = true;

  // Validate all fields
  formInputs.forEach((input) => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
      // Show success modal
      showModal();

      // Reset form
      e.target.reset();

      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 1500);
  } else {
    // Scroll to first error
    const firstError = e.target.querySelector(".error");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      firstError.focus();
    }
  }
}

// Modal Functionality
function initModal() {
  const modal = document.getElementById("successModal");
  const modalClose = document.getElementById("modalClose");
  const modalOk = document.getElementById("modalOk");

  // Close modal events
  modalClose.addEventListener("click", hideModal);
  modalOk.addEventListener("click", hideModal);

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      hideModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      hideModal();
    }
  });
}

// Show success modal
function showModal() {
  const modal = document.getElementById("successModal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Hide modal
function hideModal() {
  const modal = document.getElementById("successModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Restore scrolling
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Header Background on Scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");

  if (window.pageYOffset > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.backdropFilter = "blur(15px)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  }
});

// Keyboard Navigation Support
document.addEventListener("keydown", function (e) {
  // Tab navigation enhancement
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", function () {
  document.body.classList.remove("keyboard-navigation");
});

// Add focus styles for keyboard navigation
const style = document.createElement("style");
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--secondary-color) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);

// Typing Effect for Hero Title (Optional Enhancement)
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-title");
  const text = heroTitle.textContent;
  heroTitle.textContent = "";

  let i = 0;
  const typingSpeed = 100;

  function typeWriter() {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, typingSpeed);
    }
  }

  // Start typing effect after a short delay
  setTimeout(typeWriter, 500);
}

// Initialize typing effect (uncomment to enable)
// setTimeout(initTypingEffect, 1000);

// Performance Optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll-heavy functions
window.addEventListener("scroll", debounce(updateActiveNavLink, 100));

// Preload critical images (if any were added)
function preloadImages() {
  const imageUrls = [
    // Add any image URLs here if you decide to include actual images
  ];

  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

// Error Handling for JavaScript
window.addEventListener("error", function (e) {
  console.error("JavaScript Error:", e.error);
  // Could add user-friendly error handling here
});

// Add loading animation (optional)
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // Remove any loading overlays
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 300);
  }
});

// Console welcome message
console.log(`
🎉 Welcome to Gloria Muhorakeye's Resume Website!
📧 Contact: g.muhorakey@alustudent.com
💻 Built with HTML, CSS, and JavaScript
🚀 Fully responsive and interactive
`);

// Export functions for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validateField,
    showModal,
    hideModal,
    debounce,
  };
}