/* ============================================================
   script.js — Apex Asset Management
   Modules: initNav | initSmoothScroll | initScrollAnimations
            initCounters | initTestimonialCarousel | initContactForm
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initSmoothScroll();
  initScrollAnimations();
  initCounters();
  initTestimonialCarousel();
  initContactForm();

  // Keep copyright year current
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ============================================================
   NAV — solid background on scroll + hamburger toggle
   ============================================================ */
function initNav() {
  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const menu      = document.getElementById('nav-menu');

  if (!nav || !hamburger || !menu) return;

  // Add/remove .scrolled class to trigger background transition
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Hamburger: toggle .open on menu + aria-expanded
  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu when any nav link is tapped
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu if user clicks outside of it
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') &&
        !menu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      menu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ============================================================
   SMOOTH SCROLL — offset for sticky nav height
   ============================================================ */
function initSmoothScroll() {
  const NAV_HEIGHT = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
  ) || 72;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id     = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   SCROLL ANIMATIONS — fade-in elements with .animate class
   Uses IntersectionObserver; stagger sibling cards by 80 ms
   ============================================================ */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el       = entry.target;
      const siblings = Array.from(el.parentElement.querySelectorAll('.animate:not(.visible)'));
      const delay    = siblings.indexOf(el) * 80;

      setTimeout(() => el.classList.add('visible'), Math.max(0, delay));
      observer.unobserve(el);
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   COUNTER ANIMATION — count up from 0 to data-target
   Triggers once per element via IntersectionObserver
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target    = parseFloat(el.dataset.target);
  const prefix    = el.dataset.prefix || '';
  const suffix    = el.dataset.suffix || '';
  const isDecimal = !Number.isInteger(target);
  const duration  = 1500; // ms
  const startTime = performance.now();

  function tick(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic for natural deceleration
    const eased    = 1 - Math.pow(1 - progress, 3);
    const value    = target * eased;

    el.textContent = prefix + (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/* ============================================================
   TESTIMONIAL CAROUSEL
   — show one card at a time with CSS fade-in
   — auto-rotates every 5 s; manual prev/next/dots reset the timer
   ============================================================ */
function initTestimonialCarousel() {
  const track   = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsEl  = document.getElementById('carousel-dots');

  if (!track || !prevBtn || !nextBtn || !dotsEl) return;

  const cards = Array.from(track.querySelectorAll('.testimonial-card'));
  const dots  = Array.from(dotsEl.querySelectorAll('.dot'));

  if (!cards.length) return;

  const TOTAL      = cards.length;
  const AUTO_DELAY = 5000;
  let   current    = 0;
  let   autoTimer  = null;

  function activate(index) {
    // Wrap index
    const next = ((index % TOTAL) + TOTAL) % TOTAL;

    // Deactivate old
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    // Activate new
    current = next;
    cards[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function startAuto() {
    autoTimer = setInterval(() => activate(current + 1), AUTO_DELAY);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  prevBtn.addEventListener('click', () => { activate(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { activate(current + 1); resetAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      activate(parseInt(dot.dataset.index, 10));
      resetAuto();
    });
  });

  // Pause auto-rotation while user hovers over carousel
  track.closest('.carousel').addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.closest('.carousel').addEventListener('mouseleave', startAuto);

  startAuto();
}

/* ============================================================
   CONTACT FORM
   — client-side validation
   — async fetch POST to FormSubmit.co (no page reload)
   — inline success / error feedback
   ============================================================ */
function initContactForm() {
  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const feedback  = document.getElementById('form-feedback');

  if (!form || !submitBtn || !feedback) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Run validation; abort if it fails
    if (!validateForm()) return;

    setLoading(true);
    clearFeedback();

    try {
      const data     = new FormData(form);
      const response = await fetch(form.action, {
        method:  'POST',
        body:    data,
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        showFeedback('success', 'Thank you! Your message has been sent. We\'ll be in touch shortly.');
        form.reset();
        clearAllErrors();
      } else {
        // FormSubmit returns non-2xx on activation issues or server errors
        showFeedback('error', 'Your message could not be sent. Please try again, or email us directly.');
      }
    } catch {
      // Network failure
      showFeedback('error', 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  });

  /* --- Helpers --- */

  function setLoading(on) {
    submitBtn.classList.toggle('loading', on);
    submitBtn.disabled = on;
  }

  function showFeedback(type, message) {
    feedback.className   = `form-feedback ${type}`;
    feedback.textContent = message;
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function clearFeedback() {
    feedback.className = 'form-feedback';
    feedback.textContent = '';
  }

  /* ---- Client-side validation ---- */

  function validateForm() {
    clearAllErrors();
    let valid = true;

    const nameEl  = form.querySelector('#name');
    const emailEl = form.querySelector('#email');
    const phoneEl = form.querySelector('#phone');
    const rangeEl = form.querySelector('#investment-range');
    const msgEl   = form.querySelector('#message');

    // Full Name — required
    if (!nameEl.value.trim()) {
      setError(nameEl, 'name-error', 'Please enter your full name.');
      valid = false;
    }

    // Email — required + format
    if (!emailEl.value.trim()) {
      setError(emailEl, 'email-error', 'Please enter your email address.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailEl.value.trim())) {
      setError(emailEl, 'email-error', 'Please enter a valid email address.');
      valid = false;
    }

    // Phone — optional but must match pattern if provided
    if (phoneEl.value.trim() &&
        !/^[\d\s+\-().]{7,20}$/.test(phoneEl.value.trim())) {
      setError(phoneEl, 'phone-error', 'Please enter a valid phone number.');
      valid = false;
    }

    // Investment Range — required
    if (!rangeEl.value) {
      setError(rangeEl, 'range-error', 'Please select an investment range.');
      valid = false;
    }

    // Message — required + minimum length
    if (!msgEl.value.trim()) {
      setError(msgEl, 'message-error', 'Please enter a message.');
      valid = false;
    } else if (msgEl.value.trim().length < 10) {
      setError(msgEl, 'message-error', 'Please enter at least 10 characters.');
      valid = false;
    }

    // Scroll to first error
    if (!valid) {
      const firstError = form.querySelector('.error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return valid;
  }

  function setError(field, errorId, message) {
    field.classList.add('error');
    const errEl = document.getElementById(errorId);
    if (errEl) errEl.textContent = message;

    // Clear error once user starts correcting the field
    field.addEventListener('input', () => clearError(field, errorId), { once: true });
  }

  function clearError(field, errorId) {
    field.classList.remove('error');
    const errEl = document.getElementById(errorId);
    if (errEl) errEl.textContent = '';
  }

  function clearAllErrors() {
    form.querySelectorAll('.field-error').forEach(el => { el.textContent = ''; });
    form.querySelectorAll('.error').forEach(el => { el.classList.remove('error'); });
  }
}
