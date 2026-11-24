/* ==========================================================================
   Times Café Bar & Grill — JavaScript principal
   Fonctionnalités complètes : Panier, Réservation, Événements, Menu, Feedback
   ========================================================================== */

(function () {
  'use strict';

  var data = window.TIMES_DATA || {};
  var settings = data.settings || {
    phoneRaw: '2290169698686',
    phone: '+229 01 69 69 86 86'
  };

  // ── Utilitaires ──────────────────────────────────────────────────────────
  function waLink(text) {
    return 'https://wa.me/' + settings.phoneRaw + '?text=' + encodeURIComponent(text);
  }

  function formatCFA(amount) {
    return (amount || 0).toLocaleString('fr-FR') + ' F CFA';
  }

  // ── Liens WhatsApp automatiques ──────────────────────────────────────────
  function wireWhatsApp() {
    document.querySelectorAll('[data-wa]').forEach(function (el) {
      el.href = waLink(el.dataset.wa);
      el.target = '_blank';
      el.rel = 'noopener';
    });
  }

  // ── Statut d'ouverture en direct (UTC+1 Cotonou) ──────────────────────────
  function updateStatus() {
    var dotEl = document.getElementById('dot');
    var openEl = document.getElementById('open');
    var statusEl = document.getElementById('status');
    if (!dotEl && !openEl && !statusEl) return;

    var now = new Date();
    var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    var cotonou = new Date(utc + 3600000); // Cotonou est à UTC+1
    var minutes = cotonou.getHours() * 60 + cotonou.getMinutes();

    // Ouvert de 9h30 (570 min) à 2h00 du matin (120 min le lendemain)
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

  // ── Gestion du Panier (Cart / Delivery) ────────────────────────────────────
  var CART_KEY = 'times_cart_items';

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {}
    updateCartUI();
  }

  function addToCart(productId) {
    var cart = getCart();
    var product = (data.products || []).find(function (p) { return p.id === productId; });
    if (!product) return;

    var existing = cart.find(function (item) { return item.id === productId; });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1
      });
    }
    saveCart(cart);

    // Notification visuelle
    showToast('Ajouté au panier : ' + product.name);
  }

  function updateItemQty(productId, delta) {
    var cart = getCart();
    var idx = cart.findIndex(function (item) { return item.id === productId; });
    if (idx > -1) {
      cart[idx].qty += delta;
      if (cart[idx].qty <= 0) {
        cart.splice(idx, 1);
      }
      saveCart(cart);
    }
  }

  function clearCart() {
    saveCart([]);
  }

  function updateCartUI() {
    var cart = getCart();
    var count = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    var total = cart.reduce(function (sum, item) { return sum + (item.price * item.qty); }, 0);

    // Badges header
    document.querySelectorAll('.cart-badge').forEach(function (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-block' : 'none';
    });

    // Panel dans /commander.html
    var cartListEl = document.getElementById('cart-items-list');
    var cartTotalEl = document.getElementById('cart-total-amount');
    var cartEmptyEl = document.getElementById('cart-empty-msg');
    var orderBtn = document.getElementById('btn-confirm-order');

    if (cartListEl && cartTotalEl) {
      cartListEl.innerHTML = '';
      if (cart.length === 0) {
        if (cartEmptyEl) cartEmptyEl.style.display = 'block';
        cartTotalEl.textContent = '0 F CFA';
        if (orderBtn) orderBtn.setAttribute('disabled', 'true');
      } else {
        if (cartEmptyEl) cartEmptyEl.style.display = 'none';
        if (orderBtn) orderBtn.removeAttribute('disabled');

        cart.forEach(function (item) {
          var row = document.createElement('div');
          row.className = 'cart-item';
          row.innerHTML = 
            '<div class="cart-item-info">' +
              '<div class="cart-item-name">' + item.name + '</div>' +
              '<div class="cart-item-price">' + formatCFA(item.price) + ' × ' + item.qty + '</div>' +
            '</div>' +
            '<div class="cart-item-qty">' +
              '<button type="button" class="cart-qty-btn btn-minus" data-id="' + item.id + '" aria-label="Diminuer">-</button>' +
              '<span class="cart-item-count">' + item.qty + '</span>' +
              '<button type="button" class="cart-qty-btn btn-plus" data-id="' + item.id + '" aria-label="Augmenter">+</button>' +
            '</div>';
          cartListEl.appendChild(row);
        });

        cartTotalEl.textContent = formatCFA(total);

        // Events boutons + / -
        cartListEl.querySelectorAll('.btn-minus').forEach(function (btn) {
          btn.addEventListener('click', function () {
            updateItemQty(btn.dataset.id, -1);
          });
        });
        cartListEl.querySelectorAll('.btn-plus').forEach(function (btn) {
          btn.addEventListener('click', function () {
            updateItemQty(btn.dataset.id, 1);
          });
        });
      }
    }
  }

  // ── Toast Notifications ──────────────────────────────────────────────────
  function showToast(msg) {
    var toast = document.getElementById('site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'site-toast';
      toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#162a4a;color:#fff;border:1px solid #f4b04a;padding:10px 20px;border-radius:999px;font-size:0.9rem;font-weight:600;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.5);opacity:0;transition:opacity 0.3s;pointer-events:none;';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(window.__toastTimeout);
    window.__toastTimeout = setTimeout(function () {
      toast.style.opacity = '0';
    }, 2500);
  }

  // ── Recherche Instantanée de plats ───────────────────────────────────────
  function initSearch() {
    var searchInput = document.getElementById('menu-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
      var query = searchInput.value.toLowerCase().trim();
      var cards = document.querySelectorAll('.product-card, figure[data-n]');
      var visibleCount = 0;

      cards.forEach(function (card) {
        var text = (card.textContent || '').toLowerCase();
        var match = text.indexOf(query) > -1;
        card.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });

      var noResultEl = document.getElementById('search-no-result');
      if (noResultEl) {
        noResultEl.style.display = (visibleCount === 0 && query.length > 0) ? 'block' : 'none';
      }
    });
  }

  // ── Validation de Commande (/commander.html) ─────────────────────────────
  function initOrderForm() {
    var btn = document.getElementById('btn-confirm-order');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      var cart = getCart();
      if (cart.length === 0) {
        alert('Votre panier est vide. Veuillez ajouter des plats.');
        return;
      }

      var nameInput = document.getElementById('order-name');
      var phoneInput = document.getElementById('order-phone');
      var addressInput = document.getElementById('order-address');
      var landmarkInput = document.getElementById('order-landmark');
      var payInput = document.querySelector('input[name="payment_mode"]:checked');
      var notesInput = document.getElementById('order-notes');

      if (!nameInput || !nameInput.value.trim()) {
        alert('Veuillez renseigner votre nom.');
        if (nameInput) nameInput.focus();
        return;
      }
      if (!phoneInput || !phoneInput.value.trim()) {
        alert('Veuillez renseigner votre numéro de téléphone.');
        if (phoneInput) phoneInput.focus();
        return;
      }
      if (!addressInput || !addressInput.value.trim()) {
        alert('Veuillez renseigner votre quartier ou adresse de livraison.');
        if (addressInput) addressInput.focus();
        return;
      }

      var total = cart.reduce(function (sum, item) { return sum + (item.price * item.qty); }, 0);
      var payMode = payInput ? payInput.value : 'Paiement à la livraison';

      var lines = [
        '🍽️ *NOUVELLE COMMANDE TIMES CAFÉ BAR & GRILL*',
        '━━━━━━━━━━━━━━━━━━━━',
        '👤 *Client :* ' + nameInput.value.trim(),
        '📞 *Téléphone :* ' + phoneInput.value.trim(),
        '📍 *Livraison :* ' + addressInput.value.trim(),
        landmarkInput && landmarkInput.value.trim() ? ('📌 *Repère :* ' + landmarkInput.value.trim()) : '',
        '💳 *Paiement :* ' + payMode,
        '',
        '🛒 *ARTICLES COMMANDÉS :*'
      ];

      cart.forEach(function (it) {
        lines.push('• ' + it.qty + 'x ' + it.name + ' (' + formatCFA(it.price * it.qty) + ')');
      });

      lines.push('');
      lines.push('💰 *TOTAL : ' + formatCFA(total) + '*');
      if (notesInput && notesInput.value.trim()) {
        lines.push('📝 *Remarques :* ' + notesInput.value.trim());
      }
      lines.push('━━━━━━━━━━━━━━━━━━━━');
      lines.push('Merci de me confirmer la prise en charge et le délai de livraison.');

      var message = lines.filter(Boolean).join('\n');
      window.open(waLink(message), '_blank');
      clearCart();
    });
  }

  // ── Formulaire Réservation (/reservation.html) ───────────────────────────
  function initReservation() {
    var btn = document.getElementById('rb') || document.getElementById('btn-submit-res');
    if (!btn) return;

    var nameInput = document.getElementById('r-name');
    var phoneInput = document.getElementById('r-phone');
    var dateInput = document.getElementById('r-date');
    var timeInput = document.getElementById('r-time');
    var occasionInput = document.getElementById('r-occasion');
    var notesInput = document.getElementById('r-notes');
    var guestPills = document.querySelectorAll('.guest-pill');
    var selectedGuests = 2;

    // Définir la date min à aujourd'hui
    if (dateInput) {
      var today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      if (!dateInput.value) dateInput.value = today;
    }

    if (timeInput && !timeInput.value) {
      timeInput.value = '20:00';
    }

    guestPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        guestPills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        selectedGuests = parseInt(pill.dataset.value, 10) || 2;
      });
    });

    btn.addEventListener('click', function (e) {
      if (!nameInput || !nameInput.value.trim()) {
        alert('Veuillez renseigner votre nom.');
        if (nameInput) nameInput.focus();
        return;
      }
      if (!dateInput || !dateInput.value) {
        alert('Veuillez sélectionner la date de votre visite.');
        return;
      }
      if (!timeInput || !timeInput.value) {
        alert("Veuillez sélectionner l'heure.");
        return;
      }

      var lines = [
        '📅 *RÉSERVATION DE TABLE — TIMES CAFÉ BAR & GRILL*',
        '━━━━━━━━━━━━━━━━━━━━',
        '👤 *Nom :* ' + nameInput.value.trim(),
        phoneInput && phoneInput.value.trim() ? ('📞 *Téléphone :* ' + phoneInput.value.trim()) : '',
        '👥 *Nombre de personnes :* ' + selectedGuests + ' personne(s)',
        '📆 *Date :* ' + dateInput.value,
        '⏰ *Heure :* ' + timeInput.value,
        occasionInput && occasionInput.value ? ('🎉 *Occasion :* ' + occasionInput.value) : '',
        notesInput && notesInput.value.trim() ? ('📝 *Message :* ' + notesInput.value.trim()) : '',
        '━━━━━━━━━━━━━━━━━━━━',
        'Merci de me confirmer la disponibilité d\'une table.'
      ];

      var message = lines.filter(Boolean).join('\n');
      window.open(waLink(message), '_blank');
    });
  }

  // ── Formulaire Suggestions & Critiques (Privé) ───────────────────────────
  function initFeedbackForm() {
    var form = document.getElementById('feedback-form');
    if (!form) return;

    var selectedType = 'Suggestion';
    var typeBtns = document.querySelectorAll('.feedback-type-btn');
    typeBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        typeBtns.forEach(function (btn) { btn.classList.remove('active'); });
        b.classList.add('active');
        selectedType = b.dataset.type || b.textContent.trim();
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('fb-name').value.trim();
      var contact = document.getElementById('fb-contact').value.trim();
      var msg = document.getElementById('fb-message').value.trim();

      if (!name || !msg) {
        alert('Veuillez remplir votre nom et votre message.');
        return;
      }

      var text = '📬 *RETOUR CLIENT PRIVÉ (' + selectedType + ')*\n' +
        '• Nom : ' + name + '\n' +
        (contact ? ('• Contact : ' + contact + '\n') : '') +
        '• Message : ' + msg;

      window.open(waLink(text), '_blank');
      alert('Merci pour votre message ! Notre direction y portera toute son attention.');
      form.reset();
    });
  }

  // ── Formulaire Avis Client (/avis.html) ──────────────────────────────────
  function initReviewsForm() {
    var form = document.getElementById('review-form');
    if (!form) return;

    var selectedRating = 5;
    var stars = document.querySelectorAll('#star-selector span');
    stars.forEach(function (s) {
      s.addEventListener('click', function () {
        selectedRating = parseInt(s.dataset.star, 10) || 5;
        stars.forEach(function (st, idx) {
          st.textContent = (idx < selectedRating) ? '★' : '☆';
        });
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('rev-name').value.trim();
      var comment = document.getElementById('rev-comment').value.trim();
      if (!name || !comment) {
        alert('Veuillez renseigner votre nom et votre avis.');
        return;
      }

      var text = '⭐ *NOUVEL AVIS CLIENT (' + selectedRating + '/5)*\n' +
        '• Auteur : ' + name + '\n' +
        '• Note : ' + selectedRating + ' / 5 étoiles\n' +
        '• Avis : ' + comment;

      window.open(waLink(text), '_blank');
      alert('Merci pour votre avis ! Il sera vérifié et affiché très prochainement.');
      form.reset();
    });
  }

  // ── Navigation Mobile & Scroll ───────────────────────────────────────────
  function initNavigation() {
    var hamburger = document.getElementById('hamburger');
    var navLinks  = document.getElementById('nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('open');
          hamburger.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }

    var navbar = document.querySelector('.navbar');
    var backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (navbar) {
        if (y > 20) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
      }
      if (backToTop) {
        backToTop.classList.toggle('visible', y > 400);
      }
    });

    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // ── Scroll Reveal ────────────────────────────────────────────────────────
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
    }, { threshold: 0.1 });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  // ── Exposer globalement pour boutons inline ───────────────────────────────
  window.timesApp = {
    addToCart: addToCart,
    clearCart: clearCart,
    updateItemQty: updateItemQty,
    getCart: getCart
  };

  // ── Initialisation globale ────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    wireWhatsApp();
    updateStatus();
    updateCartUI();
    initNavigation();
    initSearch();
    initOrderForm();
    initReservation();
    initFeedbackForm();
    initReviewsForm();
    initReveal();

    // Rendre les boutons "Ajouter" cliquables
    document.addEventListener('click', function (e) {
      var target = e.target.closest('[data-add-cart]');
      if (target) {
        e.preventDefault();
        addToCart(target.dataset.addCart);
      }
    });
  });

})();
