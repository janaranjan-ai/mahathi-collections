/* ============================================================
   MAHATHI COLLECTIONS — JavaScript
   GSAP + ScrollTrigger + Custom Interactions
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     1. PRELOADER
     ============================================================ */
  const preloader = document.getElementById('preloader');

  window.addEventListener('load', () => {
    gsap.to(preloader, {
      opacity: 0,
      duration: 0.8,
      delay: 2.2,
      ease: 'power2.inOut',
      onComplete: () => {
        preloader.style.display = 'none';
        initHeroAnimations();
        initScrollAnimations();
        initCounters();
      }
    });
  });

  /* ============================================================
     2. HERO ENTRANCE ANIMATIONS
     ============================================================ */
  function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('#heroEyebrow', { opacity: 1, y: 0, duration: 0.8, delay: 0.1 })
      .to('#heroTitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.3')
      .to('#heroTagline', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to('#heroSub',     { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
      .to('#heroActions', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3');

    /* Subtle CTA pulse on primary button */
    gsap.to('#exploreCTA', {
      boxShadow: '0 0 40px rgba(230,63,114,0.7)',
      repeat: -1,
      yoyo: true,
      duration: 1.8,
      ease: 'sine.inOut',
      delay: 3.5
    });
  }

  /* ============================================================
     3. SCROLL ANIMATIONS (ScrollTrigger)
     ============================================================ */
  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    /* Generic reveal-up */
    gsap.utils.toArray('.reveal-up').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });

    /* Reveal from left */
    gsap.utils.toArray('.reveal-left').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });

    /* Reveal from right */
    gsap.utils.toArray('.reveal-right').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });

    /* Staggered product cards */
    gsap.utils.toArray('.collection-category').forEach((category) => {
      const cards = category.querySelectorAll('.product-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: category,
            start: 'top 80%',
            once: true
          }
        }
      );
    });

    /* Stagger testimonial cards */
    gsap.fromTo(
      '.testimonial-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-carousel',
          start: 'top 80%',
          once: true
        }
      }
    );

    /* Info cards stagger */
    gsap.fromTo(
      '.info-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
          once: true
        }
      }
    );

    /* Counter items stagger */
    gsap.fromTo(
      '.counter-item',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.counters-grid',
          start: 'top 85%',
          once: true
        }
      }
    );
  }

  /* ============================================================
     4. ANIMATED COUNTERS
     ============================================================ */
  function initCounters() {
    const counterEls = document.querySelectorAll('.counter-number');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          animateCounter(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach((el) => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
      el.textContent = Math.round(eased * target).toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* ============================================================
     5. STICKY NAVBAR
     ============================================================ */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ============================================================
     6. ACTIVE NAV LINK ON SCROLL (Intersection Observer)
     ============================================================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => sectionObserver.observe(s));

  /* ============================================================
     7. MOBILE NAV TOGGLE
     ============================================================ */
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  /* Close mobile nav on link click */
  navLinksEl.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ============================================================
     8. TESTIMONIALS CAROUSEL
     ============================================================ */
  const track = document.getElementById('testimonialsTrack');
  const cards = track ? Array.from(track.children) : [];
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;
  let cardsVisible = getCardsVisible();
  let autoSlideTimer = null;
  const totalSlides = cards.length;

  function getCardsVisible() {
    if (window.innerWidth >= 900) return 3;
    if (window.innerWidth >= 600) return 2;
    return 1;
  }

  function getMaxIndex() {
    return Math.max(0, totalSlides - cardsVisible);
  }

  /* Build dots */
  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const dotCount = getMaxIndex() + 1;
    for (let i = 0; i < dotCount; i++) {
      const btn = document.createElement('button');
      btn.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
      btn.setAttribute('aria-selected', i === currentIndex);
      btn.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(btn);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
      d.setAttribute('aria-selected', i === currentIndex);
    });
  }

  function goTo(index) {
    const max = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, max));
    const cardWidth = cards[0].offsetWidth + 24; // gap = 24px
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateDots();
  }

  function goNext() { goTo(currentIndex >= getMaxIndex() ? 0 : currentIndex + 1); }
  function goPrev() { goTo(currentIndex <= 0 ? getMaxIndex() : currentIndex - 1); }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(goNext, 4500);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { goNext(); startAutoSlide(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { goPrev(); startAutoSlide(); });

  /* Touch/swipe support */
  let touchStartX = 0;
  if (track) {
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { diff > 0 ? goNext() : goPrev(); startAutoSlide(); }
    }, { passive: true });
  }

  /* Pause on hover */
  const carousel = document.getElementById('testimonialsCarousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
  }

  /* Recalculate on resize */
  window.addEventListener('resize', () => {
    cardsVisible = getCardsVisible();
    buildDots();
    goTo(currentIndex);
  });

  buildDots();
  startAutoSlide();

  /* ============================================================
     9. BACK TO TOP BUTTON
     ============================================================ */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     10. CONTACT FORM — Sends real email via EmailJS
     Owner receives messages at: mahathicollectionofficial@gmail.com
     Setup: https://www.emailjs.com (free, 200 emails/month)
     ============================================================ */

  // ── EmailJS Configuration ─────────────────────────────────────
  // STEP 1: Sign up free at https://www.emailjs.com
  // STEP 2: Add Gmail service → copy Service ID below
  // STEP 3: Create email template → copy Template ID below
  // STEP 4: Go to Account → copy Public Key below
  const EMAILJS_SERVICE_ID  = 'service_cbvitk4';   // ✅ Service ID set
  const EMAILJS_TEMPLATE_ID = 'template_0d9iarp';  // ✅ Template ID set
  // Public Key 'JJN-NcWWZsyPxJHMG' is already set in the <head> script block
  // ─────────────────────────────────────────────────────────────

  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name     = document.getElementById('fullName').value.trim();
      const phone    = document.getElementById('phone').value.trim();
      const email    = document.getElementById('email').value.trim();
      const interest = document.getElementById('interest').value;
      const message  = document.getElementById('message').value.trim();

      if (!name)  { shakeField('fullName'); return; }
      if (!phone) { shakeField('phone');    return; }

      const submitBtn = document.getElementById('submitForm');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending…</span>';

      /* Build EmailJS template parameters */
      const templateParams = {
        from_name    : name,
        from_phone   : phone,
        from_email   : email || 'Not provided',
        interest     : interest || 'Not specified',
        message      : message || 'No message provided',
        to_email     : 'mahathicollectionofficial@gmail.com',
        reply_to     : email || 'mahathicollectionofficial@gmail.com'
      };

      /* Check if EmailJS keys are configured */
      const keysConfigured =
        EMAILJS_SERVICE_ID  !== 'YOUR_SERVICE_ID' &&
        EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID';

      if (keysConfigured && typeof emailjs !== 'undefined') {
        /* ── Send via EmailJS ── */
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
          .then(() => {
            showSuccess(submitBtn);
            contactForm.reset();
          })
          .catch((err) => {
            console.error('EmailJS error:', err);
            /* Fallback: open mailto if EmailJS fails */
            openMailtoFallback(name, phone, email, interest, message);
            showSuccess(submitBtn);
            contactForm.reset();
          });
      } else {
        /* ── Fallback: open user's email client (works without EmailJS setup) ── */
        openMailtoFallback(name, phone, email, interest, message);
        showSuccess(submitBtn);
        contactForm.reset();
      }
    });
  }

  function showSuccess(submitBtn) {
    formSuccess.hidden = false;
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Send Message</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
    gsap.from(formSuccess, { opacity: 0, y: 10, duration: 0.4 });
    setTimeout(() => { formSuccess.hidden = true; }, 6000);
  }

  function openMailtoFallback(name, phone, email, interest, message) {
    const subject = encodeURIComponent('New Enquiry from Mahathi Collections Website');
    const body = encodeURIComponent(
      `New Customer Enquiry\n` +
      `─────────────────────\n` +
      `Name    : ${name}\n` +
      `Phone   : ${phone}\n` +
      `Email   : ${email || 'Not provided'}\n` +
      `Interest: ${interest || 'Not specified'}\n` +
      `─────────────────────\n` +
      `Message :\n${message || 'No message provided'}\n\n` +
      `Sent from: mahathicollections.com`
    );
    window.open(
      `mailto:mahathicollectionofficial@gmail.com?subject=${subject}&body=${body}`,
      '_blank'
    );
  }

  function shakeField(id) {
    const field = document.getElementById(id);
    if (!field) return;
    field.focus();
    gsap.fromTo(field,
      { x: -8 },
      { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
    );
    field.style.borderColor = '#e63f72';
    field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
  }

  /* ============================================================
     11. SMOOTH PARALLAX ON HERO IMAGE
     ============================================================ */
  const heroImg = document.querySelector('.hero-img');

  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.25}px)`;
      }
    }, { passive: true });
  }

  /* ============================================================
     12. CARD TILT EFFECT (subtle 3D on hover)
     ============================================================ */
  document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `
        translateY(-10px)
        rotateX(${-y * 6}deg)
        rotateY(${x * 6}deg)
        scale(1.01)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ============================================================
     13. FLOATING DECORATION MICRO-ANIMATION
     ============================================================ */
  gsap.to('.about-badge-float', {
    y: -12,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  /* ============================================================
     14. MARQUEE PAUSE ON HOVER
     ============================================================ */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const strip = document.querySelector('.marquee-strip');
    strip.addEventListener('mouseenter', () => { marqueeTrack.style.animationPlayState = 'paused'; });
    strip.addEventListener('mouseleave', () => { marqueeTrack.style.animationPlayState = 'running'; });
  }

  /* ============================================================
     15. SOCIAL ICON RIPPLE
     ============================================================ */
  document.querySelectorAll('.social-icon, .footer-social-icon').forEach((icon) => {
    icon.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect = icon.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.35);
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        animation: ripple-effect 0.6s linear;
        pointer-events: none;
      `;
      icon.style.position = 'relative';
      icon.style.overflow = 'hidden';
      icon.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* Add ripple keyframe dynamically */
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple-effect {
      0%   { transform: scale(0); opacity: 1; }
      100% { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(rippleStyle);

})();
