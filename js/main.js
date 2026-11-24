/* ==========================================================================
   Times Café Bar & Grill — JavaScript principal
   ========================================================================== */

(function () {
  'use strict';

  // ── Config ──────────────────────────────────────────────────────────────
  var WHATSAPP_NUMBER = '2290169698686';

  function waLink(text) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
  }

  // ── WhatsApp links ──────────────────────────────────────────────────────
  function wireWhatsApp() {
    document.querySelectorAll('[data-wa]').forEach(function (el) {
      el.href = waLink(el.dataset.wa);
      el.target = '_blank';
      el.rel = 'noopener';
    });
  }

  // ── Menu "Commander" buttons ────────────────────────────────────────────
  function addOrderButtons() {
    document.querySelectorAll('figure[data-n]').forEach(function (fig) {
      var link = document.createElement('a');
      link.className = 'cmd';
      link.textContent = 'Commander sur WhatsApp →';
      link.href = '#';
      link.dataset.wa = 'Bonjour Times, je voudrais commander : ' + fig.dataset.n;
      link.setAttribute('aria-label', 'Commander ' + fig.dataset.n + ' sur WhatsApp');
      fig.querySelector('figcaption').appendChild(link);
    });
  }

  // ── Menu filter tabs ────────────────────────────────────────────────────
  function initTabs() {
    var categories = [
      ['all', 'Tout'],
      ['p',   'Poissons'],
      ['d',   'Plats du pays'],
      ['g',   'Grillades'],
      ['z',   'Pizzas'],
      ['r',   'Pâtes & riz'],
      ['s',   'Desserts']
    ];

    var tabsContainer = document.getElementById('tabs');
    if (!tabsContainer) return;

    tabsContainer.setAttribute('role', 'tablist');
    tabsContainer.setAttribute('aria-label', 'Filtrer par catégorie');

    categories.forEach(function (cat, i) {
      var btn = document.createElement('button');
      btn.textContent = cat[1];
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      btn.setAttribute('aria-label', 'Afficher ' + cat[1]);

      btn.addEventListener('click', function () {
        // Update pressed state
        tabsContainer.querySelectorAll('button').forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });

        // Filter figures
        document.querySelectorAll('figure[data-c]').forEach(function (fig) {
          fig.hidden = cat[0] !== 'all' && fig.dataset.c !== cat[0];
        });

        // Hide empty categories
        document.querySelectorAll('.cat').forEach(function (c) {
          c.hidden = !c.querySelector('figure:not([hidden])');
        });
      });

      tabsContainer.appendChild(btn);
    });
  }

  // ── Reservation form ────────────────────────────────────────────────────
  function initReservation() {
    var btn = document.getElementById('rb');
    if (!btn) return;

    var errorEl = document.getElementById('form-error');
    var name    = document.getElementById('r-name');
    var date    = document.getElementById('r-date');
    var time    = document.getElementById('r-time');
    var guests  = document.getElementById('r-guests');

    // Set minimum date to today
    if (date) {
      var today = new Date().toISOString().split('T')[0];
      date.min = today;
      if (!date.value) date.value = today;
    }

    // Set default evening time if empty
    if (time && !time.value) {
      time.value = '19:30';
    }

    // Live error clearing
    [name, date, time, guests].forEach(function (inp) {
      if (!inp) return;
      inp.addEventListener('input', function () {
        if (inp.value.trim()) {
          inp.classList.remove('error');
          if (errorEl && !document.querySelector('.fields input.error')) {
            errorEl.textContent = '';
          }
        }
      });
    });

    btn.addEventListener('click', function (e) {
      // Reset errors
      [name, date, time, guests].forEach(function (inp) {
        if (inp) inp.classList.remove('error');
      });

      // Validate
      var errors = [];
      if (!name.value.trim()) {
        errors.push('votre nom');
        name.classList.add('error');
      }
      if (!date.value) {
        errors.push('la date');
        date.classList.add('error');
      }
      if (!time.value) {
        errors.push("l'heure");
        time.classList.add('error');
      }
      if (!guests.value || parseInt(guests.value, 10) < 1) {
        errors.push('le nombre de personnes');
        guests.classList.add('error');
      }

      if (errors.length > 0) {
        e.preventDefault();
        if (errorEl) {
          errorEl.textContent = 'Veuillez renseigner : ' + errors.join(', ') + '.';
        }
        var firstError = document.querySelector('.fields input.error');
        if (firstError) firstError.focus();
        return;
      }

      // Clear error message
      if (errorEl) errorEl.textContent = '';

      // Build WhatsApp link
      var message = 'Bonjour Times, je voudrais réserver une table.\n\n'
        + '• Nom : ' + name.value.trim() + '\n'
        + '• Date : ' + date.value + '\n'
        + '• Heure : ' + time.value + '\n'
        + '• Personnes : ' + guests.value;

      btn.href = waLink(message);
      btn.target = '_blank';
    });
  }

  // ── Open/Closed status (Heure de Cotonou : UTC+1) ───────────────────────
  function updateStatus() {
    var dotEl = document.getElementById('dot');
    var openEl = document.getElementById('open');
    var statusEl = document.getElementById('status');

    // Calcul de l'heure locale à Cotonou (UTC+1)
    var now = new Date();
    var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    var cotonou = new Date(utc + 3600000);
    var minutes = cotonou.getHours() * 60 + cotonou.getMinutes();

    // Ouvert de 9h30 (570 min) à 2h00 du matin (120 min)
    var isOpen = minutes >= 570 || minutes < 120;

    if (dotEl) {
      dotEl.className = 'dot' + (isOpen ? ' on' : '');
    }

    if (openEl) {
      openEl.textContent = isOpen
        ? "Ouvert maintenant · jusqu'à 2h"
        : 'Actuellement fermé · Réouverture à 9h30';
    }

    if (statusEl) {
      statusEl.innerHTML = isOpen
        ? '<span class="status-dot open" aria-hidden="true"></span> Ouvert maintenant, jusqu\'à 2h'
        : '<span class="status-dot closed" aria-hidden="true"></span> Fermé, ouverture à 9h30';
    }
  }

  // ── Scroll-reveal ───────────────────────────────────────────────────────
  function initReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  // ── Mobile nav ──────────────────────────────────────────────────────────
  function initMobileNav() {
    var hamburger = document.getElementById('hamburger');
    var navLinks  = document.getElementById('nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll Behavior (Navbar blur & Back to top) ──────────────────────────
  function initScrollBehavior() {
    var navbar = document.querySelector('.navbar');
    var backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', function () {
      var y = window.scrollY;

      // Navbar state
      if (navbar) {
        if (y > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      // Back to top visibility
      if (backToTop) {
        if (y > 400) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    }, { passive: true });

    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // ── Lightbox for Images ─────────────────────────────────────────────────
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxClose = document.getElementById('lightbox-close');

    if (!lightbox || !lightboxImg) return;

    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Attach click to gallery & menu images
    document.querySelectorAll('.gal img, .pano, figure img, .section-img, .facade-img').forEach(function (img) {
      img.addEventListener('click', function () {
        openLightbox(img.src, img.alt);
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // ── Init ────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    addOrderButtons();
    initTabs();
    wireWhatsApp();
    initReservation();
    updateStatus();
    initReveal();
    initMobileNav();
    initScrollBehavior();
    initLightbox();
  });

})();
