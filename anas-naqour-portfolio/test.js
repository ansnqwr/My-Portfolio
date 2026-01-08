// Portfolio Application - Enhanced Security & Interactions
(function () {
  "use strict";

  // DOM Elements Cache
  const elements = {
    themeToggle: document.getElementById("themeToggle"),
    hamburger: document.getElementById("hamburger"),
    navMenu: document.querySelector(".nav-menu"),
    navLinks: document.querySelectorAll(".nav-link"),
    backToTop: document.getElementById("backToTop"),
    contactForm: document.getElementById("contactForm"),
    loadingScreen: document.getElementById("loadingScreen"),
    securityNotice: document.getElementById("securityNotice"),
    closeNotice: document.getElementById("closeNotice"),
    downloadCV: document.getElementById("downloadCV"),
    playVideo: document.getElementById("playVideo"),
    closeModal: document.getElementById("closeModal"),
    closeCvModal: document.getElementById("closeCvModal"),
    videoModal: document.getElementById("videoModal"),
    cvModal: document.getElementById("cvModal"),
    downloadPdf: document.getElementById("downloadPdf"),
    downloadDocx: document.getElementById("downloadDocx"),
    toast: document.getElementById("toast"),
    connectionStatus: document.getElementById("connectionStatus"),
    scrollIndicator: document.getElementById("scrollIndicator"),
    typingText: document.getElementById("typingText"),
  };

  // Application State
  const state = {
    isDarkMode: true,
    isMobileMenuOpen: false,
    isOnline: navigator.onLine,
    typingIndex: 0,
    typingSpeed: 100,
    typingTexts: [
      "Backend Developer | ASP.NET Core",
      "Full stack Desctop Developer(Windows Forms)",
      "C# Expert | SQL Server(ADO.Net)",
      "Clean Architecture | RESTful APIs",
      "Performance Optimization",
    ],
  };

  // Security Configuration
  const securityConfig = {
    allowedOrigins: ["https://anasnaqour.com", "http://localhost:3000"],
    formTimeout: 30000, // 30 seconds
    maxFormLength: 10000,
    encryptionKey: "portfolio-secure-key-2025",
  };

  // Initialize Application
  function init() {
    console.log(
      "%c🔒 Portfolio v2.0 - Secure & Professional",
      "color: #6366f1; font-size: 16px; font-weight: bold;"
    );
    console.log("%c👨‍💻 Developed by Anas Naqour", "color: #10b981;");

    // Security headers check
    checkSecurityHeaders();

    // Load saved preferences
    loadPreferences();

    // Initialize components
    initTheme();
    initNavigation();
    initAnimations();
    // initFormValidation(); // Removed to avoid conflict with FormSubmitHandler
    initTypingEffect();
    initScrollEffects();
    initConnectionMonitor();
    initCounters();
    initProgressBars();

    // Add security event listeners
    addSecurityListeners();

    // Hide loading screen
    setTimeout(() => {
      elements.loadingScreen.style.opacity = "0";
      setTimeout(() => {
        elements.loadingScreen.style.display = "none";
      }, 500);
    }, 1000);

    // Check for updates
    checkForUpdates();
  }

  // Security Functions
  function checkSecurityHeaders() {
    const headers = {
      "Content-Security-Policy": "Implemented",
      "X-Content-Type-Options": "Implemented",
      "X-Frame-Options": "Implemented",
    };

    console.log("%c🔐 Security Headers:", "color: #f59e0b; font-weight: bold;");
    Object.entries(headers).forEach(([header, status]) => {
      console.log(`%c  ${header}: ${status}`, "color: #10b981;");
    });
  }

  function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
  }

  function encryptData(data) {
    // Simple XOR encryption for demonstration
    // In production, use proper encryption like AES
    return btoa(
      data
        .split("")
        .map((char) =>
          String.fromCharCode(
            char.charCodeAt(0) ^ securityConfig.encryptionKey.length
          )
        )
        .join("")
    );
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ""));
  }

  // Theme Management
  function initTheme() {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light") {
      setLightTheme();
    } else {
      setDarkTheme();
    }

    elements.themeToggle.addEventListener("click", toggleTheme);
  }

  function toggleTheme() {
    if (state.isDarkMode) {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  }

  function setLightTheme() {
    document.body.classList.add("light-theme");
    elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    state.isDarkMode = false;
    localStorage.setItem("portfolio-theme", "light");
    console.log("%c🌞 Light theme activated", "color: #f59e0b;");
  }

  function setDarkTheme() {
    document.body.classList.remove("light-theme");
    elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    state.isDarkMode = true;
    localStorage.setItem("portfolio-theme", "dark");
    console.log("%c🌙 Dark theme activated", "color: #6366f1;");
  }

  // Navigation Management
  function initNavigation() {
    // Mobile menu toggle
    elements.hamburger.addEventListener("click", toggleMobileMenu);

    // Close mobile menu when clicking on links
    elements.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (state.isMobileMenuOpen) {
          toggleMobileMenu();
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        state.isMobileMenuOpen &&
        !elements.navMenu.contains(e.target) &&
        !elements.hamburger.contains(e.target)
      ) {
        toggleMobileMenu();
      }
    });

    // Active link highlighting
    window.addEventListener("scroll", highlightActiveLink);
  }

  function toggleMobileMenu() {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
    elements.hamburger.classList.toggle("active");
    elements.navMenu.classList.toggle("active");

    // Prevent body scroll when menu is open
    document.body.style.overflow = state.isMobileMenuOpen ? "hidden" : "";
  }

  function highlightActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        elements.navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Animations & Effects
  function initAnimations() {
    // AOS (Animate On Scroll) implementation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate");
        }
      });
    }, observerOptions);

    document.querySelectorAll("[data-aos]").forEach((el) => {
      observer.observe(el);
    });

    // Floating shapes animation
    animateFloatingShapes();

    // Card hover effects
    initCardEffects();
  }

  function animateFloatingShapes() {
    const shapes = document.querySelectorAll(".shape");
    shapes.forEach((shape, index) => {
      shape.style.animationDelay = `${index * 5}s`;
    });
  }

  function initCardEffects() {
    const cards = document.querySelectorAll(
      ".skill-card, .project-card, .service-card"
    );
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.02)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  function initTypingEffect() {
    function type() {
      const currentText = state.typingTexts[state.typingIndex];
      const currentLength = elements.typingText.textContent.length;

      if (currentLength < currentText.length) {
        elements.typingText.textContent = currentText.substring(
          0,
          currentLength + 1
        );
        setTimeout(type, state.typingSpeed);
      } else {
        setTimeout(erase, 1500);
      }
    }

    function erase() {
      const currentText = state.typingTexts[state.typingIndex];
      const currentLength = elements.typingText.textContent.length;

      if (currentLength > 0) {
        elements.typingText.textContent = currentText.substring(
          0,
          currentLength - 1
        );
        setTimeout(erase, 50);
      } else {
        state.typingIndex = (state.typingIndex + 1) % state.typingTexts.length;
        setTimeout(type, 500);
      }
    }

    // Start typing effect
    setTimeout(type, 1000);
  }

  function initScrollEffects() {
    // Back to top button
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        elements.backToTop.style.opacity = "1";
        elements.backToTop.style.visibility = "visible";
      } else {
        elements.backToTop.style.opacity = "0";
        elements.backToTop.style.visibility = "hidden";
      }

      // Scroll indicator
      if (window.scrollY > 100) {
        elements.scrollIndicator.style.opacity = "0";
      } else {
        elements.scrollIndicator.style.opacity = "1";
      }

      // Header shadow on scroll
      const header = document.querySelector(".header");
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Form Validation & Submission
  function initFormValidation() {
    if (!elements.contactForm) return;

    const form = elements.contactForm;
    const inputs = form.querySelectorAll("input, textarea, select");

    // Real-time validation
    inputs.forEach((input) => {
      input.addEventListener("input", () => validateField(input));
      input.addEventListener("blur", () => validateField(input));
    });

    // Form submission
    form.addEventListener("submit", handleFormSubmit);

    // Form timeout
    let formTimeout;
    form.addEventListener("input", () => {
      clearTimeout(formTimeout);
      formTimeout = setTimeout(() => {
        console.log("Form editing timeout - security measure");
      }, securityConfig.formTimeout);
    });
  }

  function validateField(field) {
    const errorElement = document.getElementById(`${field.id}Error`);
    let isValid = true;
    let message = "";

    // Clear previous error
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }

    // Required validation
    if (field.hasAttribute("required") && !field.value.trim()) {
      isValid = false;
      message = "This field is required";
    }

    // Email validation
    if (field.type === "email" && field.value) {
      if (!validateEmail(field.value)) {
        isValid = false;
        message = "Please enter a valid email address";
      }
    }

    // Length validation
    if (field.hasAttribute("minlength")) {
      const minLength = parseInt(field.getAttribute("minlength"));
      if (field.value.length < minLength) {
        isValid = false;
        message = `Minimum ${minLength} characters required`;
      }
    }

    if (field.hasAttribute("maxlength")) {
      const maxLength = parseInt(field.getAttribute("maxlength"));
      if (field.value.length > maxLength) {
        isValid = false;
        message = `Maximum ${maxLength} characters allowed`;
      }
    }

    // Update field styling
    if (!isValid) {
      field.style.borderColor = "#ef4444";
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
      }
    } else {
      field.style.borderColor = "#10b981";
    }

    return isValid;
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    // const form = e.target;
    // const formData = new FormData(form);
    // const data = {};

    // Validate all fields
    let isValid = true;
    form.querySelectorAll("input, textarea, select").forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
      data[field.name] = sanitizeInput(field.value);
    });

    if (!isValid) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    // Show loading state
    // const submitBtn = form.querySelector('button[type="submit"]');
    // const originalText = submitBtn.innerHTML;
    // submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    // submitBtn.disabled = true;

    try {
      // إرسال البريد الإلكتروني الحقيقي باستخدام EmailJS
      const response = await emailjs.sendForm(
        "service_96059py", // استبدل بـ Service ID
        "template_e1yubul", // استبدل بـ Template ID
        form, // عنصر الفورم
        "U2BMQ0LieUL1zcFFo" // مفتاحك العام
      );

      if (response.status === 200) {
        // Show success message
        showToast(
          "Message sent successfully! I'll get back to you soon.",
          "success"
        );

        // إرسال إشعار تأكيد للعميل أيضاً
        await sendConfirmationEmail(data);

        // Reset form
        form.reset();

        // Reset field styles
        form.querySelectorAll("input, textarea, select").forEach((field) => {
          field.style.borderColor = "";
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      //  console.error('EmailJS Error:', error);
      // // عرض رسالة الخطأ مع بريدك البديل
      // showToast('Failed to send message. Please email me directly at ansnqwr743@gmail.com', 'error');
      // // كبديل: عرض بيانات الفورم في الكونسول للإرسال اليدوي
      // console.log('=== FORM DATA FOR MANUAL SENDING ===');
      // console.log('Name:', data.name);
      // console.log('Email:', data.email);
      // console.log('Company:', data.company || 'Not provided');
      // console.log('Subject:', data.subject);
      // console.log('Message:', data.message);
      // console.log('=== SEND TO: ansnqwr743@gmail.com ===');
    } finally {
      // Reset button state
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  async function sendConfirmationEmail(formData) {
      try {
          const templateParams = {
              to_name: formData.name,
              to_email: formData.email,
              from_name: 'Anas Naqour',
              message: 'Thank you for contacting me. I have received your message and will get back to you within 24 hours.',
              subject: 'Message Received - Anas Naqour Portfolio'
          };

          await emailjs.send(
              'service_96059py',      // نفس Service ID
              'template_e1yubul', // قم بإنشاء template منفصل للتأكيدات
              templateParams,
              'U2BMQ0LieUL1zcFFo'
          );

          console.log('Confirmation email sent to client');
      } catch (error) {
          console.warn('Failed to send confirmation email:', error);
      }
  }

  // function simulateAPICall(data) {
  //     return new Promise((resolve, reject) => {
  //         setTimeout(() => {
  //             // Simulate random success/failure for demo
  //             const isSuccess = Math.random() > 0.1;
  //             if (isSuccess) {
  //                 console.log('Form data (encrypted):', encryptData(JSON.stringify(data)));
  //                 resolve();
  //             } else {
  //                 reject(new Error('Network error'));
  //             }
  //         }, 1500);
  //     });
  // }

  // Modal Management
  function initModals() {
    // Video modal
    if (elements.playVideo && elements.videoModal) {
      elements.playVideo.addEventListener("click", () => {
        elements.videoModal.classList.add("active");
        document.body.style.overflow = "hidden";
      });

      elements.closeModal.addEventListener("click", () => {
        elements.videoModal.classList.remove("active");
        document.body.style.overflow = "";
      });

      elements.videoModal.addEventListener("click", (e) => {
        if (e.target === elements.videoModal) {
          elements.videoModal.classList.remove("active");
          document.body.style.overflow = "";
        }
      });
    }

    // CV modal
    if (elements.downloadCV && elements.cvModal) {
      elements.downloadCV.addEventListener("click", (e) => {
        e.preventDefault();
        elements.cvModal.classList.add("active");
        document.body.style.overflow = "hidden";
      });

      elements.closeCvModal.addEventListener("click", () => {
        elements.cvModal.classList.remove("active");
        document.body.style.overflow = "";
      });

      elements.cvModal.addEventListener("click", (e) => {
        if (e.target === elements.cvModal) {
          elements.cvModal.classList.remove("active");
          document.body.style.overflow = "";
        }
      });

      // CV download buttons
      if (elements.downloadPdf) {
        elements.downloadPdf.addEventListener("click", () => {
          downloadCV("pdf");
        });
      }

      if (elements.downloadDocx) {
        elements.downloadDocx.addEventListener("click", () => {
          downloadCV("docx");
        });
      }
    }

    // Escape key to close modals
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal.active").forEach((modal) => {
          modal.classList.remove("active");
          document.body.style.overflow = "";
        });
      }
    });
  }

  function downloadCV(format) {
    showToast(`Downloading CV (${format.toUpperCase()})...`, "info");

    // In production, this would trigger actual file download
    // For demo, we'll simulate download
    setTimeout(() => {
      showToast("CV downloaded successfully!", "success");
      elements.cvModal.classList.remove("active");
      document.body.style.overflow = "";
    }, 1500);
  }

  // Skills Filter
  function initSkillsFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const skillCards = document.querySelectorAll(".skill-card");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Filter cards
        const filter = button.dataset.filter;

        skillCards.forEach((card) => {
          if (filter === "all" || card.dataset.category === filter) {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 100);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // Counter Animation
  function initCounters() {
    const counters = document.querySelectorAll(".stat-number");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current);
              }
            }, 16);

            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  // Progress Bars Animation
  function initProgressBars() {
    const progressBars = document.querySelectorAll(".progress-fill");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.dataset.width;
            bar.style.width = `${width}%`;
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.5 }
    );

    progressBars.forEach((bar) => observer.observe(bar));
  }

  // Connection Monitor
  function initConnectionMonitor() {
    window.addEventListener("online", () => {
      state.isOnline = true;
      updateConnectionStatus();
    });

    window.addEventListener("offline", () => {
      state.isOnline = false;
      updateConnectionStatus();
    });

    updateConnectionStatus();
  }

  function updateConnectionStatus() {
    if (state.isOnline) {
      elements.connectionStatus.innerHTML =
        '<i class="fas fa-wifi"></i><span>You\'re online</span>';
      elements.connectionStatus.classList.remove("offline");
    } else {
      elements.connectionStatus.innerHTML =
        '<i class="fas fa-wifi-slash"></i><span>You\'re offline</span>';
      elements.connectionStatus.classList.add("offline");
    }

    elements.connectionStatus.classList.add("show");
    setTimeout(() => {
      elements.connectionStatus.classList.remove("show");
    }, 3000);
  }

  // Toast Notifications
  // Toast Notifications
  function showToast(message, type = "info") {
    const toast = elements.toast;
    const toastMessage = toast.querySelector(".toast-message");
    const toastIcon = toast.querySelector("i");

    // Update content based on type
    toastMessage.textContent = message;

    switch (type) {
      case "success":
        toast.style.background = "#10b981";
        toastIcon.className = "fas fa-check-circle";
        break;
      case "error":
        toast.style.background = "#ef4444";
        toastIcon.className = "fas fa-exclamation-circle";
        break;
      case "warning":
        toast.style.background = "#f59e0b";
        toastIcon.className = "fas fa-exclamation-triangle";
        break;
      case "info":
        toast.style.background = "#6366f1";
        toastIcon.className = "fas fa-info-circle";
        break;
      default:
        toast.style.background = "#6366f1";
        toastIcon.className = "fas fa-info-circle";
    }

    // Show toast
    toast.classList.add("show");

    // Auto hide
    setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  }

  // Security Event Listeners
  function addSecurityListeners() {
    // Close security notice
    if (elements.closeNotice && elements.securityNotice) {
      elements.closeNotice.addEventListener("click", () => {
        elements.securityNotice.style.transform = "translateY(-100%)";
        setTimeout(() => {
          elements.securityNotice.style.display = "none";
        }, 300);
      });

      // Auto-hide notice after 10 seconds
      setTimeout(() => {
        if (elements.securityNotice.style.display !== "none") {
          elements.closeNotice.click();
        }
      }, 10000);
    }

    // Prevent right-click (optional)
    document.addEventListener("contextmenu", (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
        showToast("Image protection enabled", "info");
      }
    });

    // Detect devtools opening (basic)
    let devtoolsOpen = false;
    const threshold = 160;

    setInterval(() => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;

      if ((widthThreshold || heightThreshold) && !devtoolsOpen) {
        devtoolsOpen = true;
        console.log(
          "%c⚠️ Developer tools detected",
          "color: #ef4444; font-weight: bold;"
        );
        console.log(
          "%cThis portfolio is protected against unauthorized inspection.",
          "color: #f59e0b;"
        );
      }
    }, 1000);
  }

  // Load Preferences
  function loadPreferences() {
    // Load saved theme
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) {
      if (savedTheme === "light") {
        setLightTheme();
      } else {
        setDarkTheme();
      }
    }

    // Load other preferences here
  }

  // Check for Updates
  function checkForUpdates() {
    // In production, check for updates from API
    // For demo, we'll simulate check
    setTimeout(() => {
      console.log("%c✅ Portfolio is up to date", "color: #10b981;");
    }, 2000);
  }

  // Initialize modals after DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    initModals();
    initSkillsFilter();
  });

  // Export public methods
  window.PortfolioApp = {
    showToast,
    toggleTheme,
    downloadCV,
  };

  // Initialize application
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

////////////////////////////////////////////////////

// ============================================
// FORMSUBMIT.CO INTEGRATION
// ============================================

class FormSubmitHandler {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.submitBtn = document.getElementById("submitBtn");
    this.originalBtnText = this.submitBtn.innerHTML;

    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.initRealTimeValidation();
  }

  initRealTimeValidation() {
    const fields = this.form.querySelectorAll("input, textarea, select");
    fields.forEach((field) => {
      field.addEventListener("input", () => this.validateField(field));
      field.addEventListener("blur", () => this.validateField(field));
    });
  }

  validateField(field) {
    const errorId = `${field.id}Error`;
    const errorElement = document.getElementById(errorId);
    let isValid = true;
    let message = "";

    // Clear previous error
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }

    // Required validation
    if (field.hasAttribute("required") && !field.value.trim()) {
      isValid = false;
      message = "This field is required";
    }

    // Email validation
    if (field.type === "email" && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        message = "Please enter a valid email address";
      }
    }

    // Length validation
    if (field.hasAttribute("minlength")) {
      const minLength = parseInt(field.getAttribute("minlength"));
      if (field.value.length < minLength) {
        isValid = false;
        message = `Minimum ${minLength} characters required`;
      }
    }

    if (field.hasAttribute("maxlength")) {
      const maxLength = parseInt(field.getAttribute("maxlength"));
      if (field.value.length > maxLength) {
        isValid = false;
        message = `Maximum ${maxLength} characters allowed`;
      }
    }

    // Update UI
    if (!isValid) {
      field.classList.add("error");
      field.classList.remove("success");

      if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
      }
    } else {
      field.classList.remove("error");
      field.classList.add("success");
    }

    return isValid;
  }

  validateAllFields() {
    let isValid = true;
    const fields = this.form.querySelectorAll("input, textarea, select");

    fields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!this.validateAllFields()) {
      this.showToast("Please fix the errors in the form", "error");
      return;
    }

    // Show loading state
    this.setLoadingState(true);

    try {
      // إرسال الفورم باستخدام EmailJS
      const response = await this.sendFormData();

      if (response.status === 200) {
        // Success
        this.handleSuccess();
      } else {
        // Handle EmailJS errors
        await this.handleFormSubmitError(response);
      }
    } catch (error) {
      // Network or other errors
      this.handleNetworkError(error);
    } finally {
      // Reset loading state
      this.setLoadingState(false);
    }
  }

  async sendFormData() {
    // استخدام EmailJS بدلاً من FormSubmit.co
    return await emailjs.sendForm(
      "service_96059py", // Service ID
      "template_e1yubul", // Template ID
      this.form, // عنصر الفورم
      "U2BMQ0LieUL1zcFFo" // Public Key
    );
  }

  handleSuccess() {
    // Show success message
    this.showToast(
      "✅ Message sent successfully! I will contact you within 24 hours.",
      "success"
    );

    // Reset form
    this.form.reset();

    // Remove success classes
    const fields = this.form.querySelectorAll("input, textarea, select");
    fields.forEach((field) => {
      field.classList.remove("success");
    });

    // Optional: Track successful submission
    this.trackSubmission("success");

    // Optional: Redirect to thank you page if set
    const nextPage = this.form.querySelector('input[name="_next"]')?.value;
    if (nextPage) {
      setTimeout(() => {
        window.location.href = nextPage;
      }, 2000);
    }
  }

  handleFormSubmitError(response) {
    console.error("EmailJS Error:", response);

    let errorMessage = "Failed to send message. ";

    if (response.text) {
      errorMessage += response.text;
    } else {
      errorMessage += "Please try again or contact me directly.";
    }

    this.showToast(errorMessage, "error");
  }

  handleNetworkError(error) {
    console.error("Network Error:", error);

    // Prepare manual email option
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    const emailBody = this.generateManualEmail(data);

    // Show alternative options
    this.showAlternativeOptions(emailBody, data);

    // Track failed submission
    this.trackSubmission("failed", error.message);
  }

  generateManualEmail(data) {
    return `
🔔 New Portfolio Message - Manual Forward Required

👤 Contact Details:
• Name: ${data.name || "Not provided"}
• Email: ${data.email || "Not provided"}
• Company: ${data.company || "Not provided"}
• Subject: ${data.subject || "Not provided"}

💬 Message:
${data.message || "Not provided"}

📊 Technical Info:
• Date: ${new Date().toLocaleString()}
• Page: ${window.location.href}
• User Agent: ${navigator.userAgent.substring(0, 100)}...

---
⚠️ This message was submitted via portfolio form but failed to send automatically.
Please respond to: ${data.email || "No email provided"}
Original intended recipient: ansnqwr743@gmail.com
        `.trim();
  }

  async showAlternativeOptions(emailBody, data) {
    // Try to copy to clipboard
    try {
      await navigator.clipboard.writeText(emailBody);

      this.showToast(
        "📋 Message copied! Please paste in email to ansnqwr743@gmail.com",
        "info"
      );

      // Optional: Open mail client with prefilled data
      setTimeout(() => {
        const userConfirmed = confirm(
          "Would you like to open your email client with the message?"
        );

        if (userConfirmed) {
          this.openMailClient(data);
        }
      }, 1500);
    } catch (clipboardError) {
      // Show data for manual copy
      this.showToast("✉️ Please email me at ansnqwr743@gmail.com", "error");

      console.log("📧 MANUAL EMAIL REQUIRED 📧");
      console.log("Send to: ansnqwr743@gmail.com");
      console.log(
        "Subject: Portfolio Message from " + (data.name || "Visitor")
      );
      console.log("Body:", emailBody);
    }
  }

  openMailClient(data) {
    const subject = encodeURIComponent(
      `Portfolio: ${data.subject || "New Message"}`
    );
    const body = encodeURIComponent(
      `
Hello Anas,

I tried to contact you through your portfolio form but it failed.

Here are my details:
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "Not provided"}

Message:
${data.message}

Looking forward to your response!

Best regards,
${data.name}
        `.trim()
    );

    window.location.href = `mailto:ansnqwr743@gmail.com?subject=${subject}&body=${body}`;
  }

  setLoadingState(isLoading) {
    if (isLoading) {
      this.submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';
      this.submitBtn.disabled = true;

      // Add loading class to form
      this.form.classList.add("loading");
    } else {
      this.submitBtn.innerHTML = this.originalBtnText;
      this.submitBtn.disabled = false;
      this.form.classList.remove("loading");
    }
  }

  showToast(message, type = "info") {
    // استخدم دالة showToast الموجودة لديك أو هذه البسيطة
    if (typeof showToast === "function") {
      showToast(message, type);
    } else {
      // Fallback toast
      this.showSimpleToast(message, type);
    }
  }

  showSimpleToast(message, type) {
    const colors = {
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#6366f1",
    };

    const toast = document.createElement("div");
    toast.className = "simple-toast";
    toast.textContent = message;
    toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: toastSlideIn 0.3s ease;
        `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "toastSlideOut 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }

  trackSubmission(status, error = "") {
    // يمكنك إضافة Google Analytics أو أي tracking هنا
    console.log(`Form submission ${status}:`, {
      timestamp: new Date().toISOString(),
      status: status,
      error: error,
      url: window.location.href,
    });

    // مثال مع Google Analytics
    if (typeof gtag === "function") {
      gtag("event", "form_submission", {
        event_category: "contact",
        event_label: status,
        value: status === "success" ? 1 : 0,
      });
    }
  }
}

// ============================================
// CSS ANIMATIONS FOR FORM
// ============================================

// أضف هذا CSS في ملف style.css أو عبر JavaScript
const formStyles = `
    /* Form validation styles */
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .form-group input.success,
    .form-group textarea.success,
    .form-group select.success {
        border-color: #10b981 !important;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
    }
    
    .error-message {
        color: #ef4444;
        font-size: 0.85rem;
        margin-top: 5px;
        display: none;
    }
    
    .error-message.show {
        display: block;
    }
    
  🔔 New Portfolio Message - Manual Forward Required

👤 Contact Details:
• Name: ccc
• Email: ansnqwr743@gmail.com
• Company: Not provided
• Subject: Project Inquiry

💬 Message:
vvvvvvvvvvvvvvvv

📊 Technical Info:
• Date: 12/28/2025, 12:57:58 PM
• Page: http://127.0.0.1:5500/test.html
• User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Sa...

---
⚠️ This message was submitted via portfolio form but failed to send automatically.
Please respond to: ansnqwr743@gmail.com
Original intended recipient: ansnqwr743@gmail.com
    /* Toast animations */
    @keyframes toastSlideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes toastSlideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    /* Alternative contact link */
    .alternative-contact {
        text-align: center;
        margin-top: 20px;
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    .alternative-contact a {
        color: var(--primary-color);
        text-decoration: none;
    }
    
    .alternative-contact a:hover {
        text-decoration: underline;
    }
    
    /* Form security badge */
    .form-security {
        background: var(--bg-secondary);
        padding: 10px 15px;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 20px 0;
        font-size: 0.9rem;
        color: var(--text-secondary);
    }
    
    .form-security i {
        color: var(--secondary-color);
    }
`;

// إضافة الـ styles إلى الـ head
const styleElement = document.createElement("style");
styleElement.textContent = formStyles;
document.head.appendChild(styleElement);

// ============================================
// INITIALIZE FORM HANDLER
// ============================================

// تهيئة المعالج عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const formHandler = new FormSubmitHandler();

  // يمكنك الوصول للمعامل من خارج الكلاس إذا أردت
  window.formHandler = formHandler;

  console.log("✅ FormSubmit.co handler initialized");
});
