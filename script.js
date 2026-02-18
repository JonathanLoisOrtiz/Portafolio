/* ===========================
   PORTFOLIO — script.js
   =========================== */

/* ---------- Year stamp ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Mobile nav hamburger ---------- */
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('nav');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a nav link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Scroll progress bar ---------- */
const bar = document.getElementById('scroll-progress');
function updateProgress() {
  const scrolled = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = max > 0 ? (scrolled / max * 100) + '%' : '0%';
}
window.addEventListener('scroll', updateProgress, { passive: true });

/* ---------- Reveal-up animations (IntersectionObserver) ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

/* ---------- Animated counters ---------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const statCards = document.querySelector('.stat-cards');
if (statCards) counterObserver.observe(statCards);

/* ---------- Typewriter effect ---------- */
const words = ['matters.', 'scales.', 'makes an impact.', 'lasts.'];
const typedEl = document.getElementById('typed-text');
let wordIndex = 0, charIndex = 0, deleting = false;

function type() {
  if (!typedEl) return;
  const word = words[wordIndex];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++charIndex);
    if (charIndex === word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
    setTimeout(type, 75);
  } else {
    typedEl.textContent = word.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 350);
      return;
    }
    setTimeout(type, 45);
  }
}

setTimeout(type, 900);

/* ---------- Role card accordion ---------- */
document.querySelectorAll('.role-header').forEach(header => {
  function toggle() {
    const card   = header.closest('.role-card');
    const body   = card.querySelector('.role-body');
    const isOpen = header.getAttribute('aria-expanded') === 'true';

    // Close all others
    document.querySelectorAll('.role-header').forEach(h => {
      if (h !== header) {
        h.setAttribute('aria-expanded', 'false');
        h.closest('.role-card').querySelector('.role-body').classList.remove('open');
      }
    });

    // Toggle this one
    if (isOpen) {
      header.setAttribute('aria-expanded', 'false');
      body.classList.remove('open');
    } else {
      header.setAttribute('aria-expanded', 'true');
      body.classList.add('open');
    }
  }

  header.addEventListener('click', toggle);
  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
});

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
