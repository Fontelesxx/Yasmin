// ========================================
// WEDDING WEBSITE - YASMIN & JOANDERSON
// JavaScript Functions
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Initialize all components
  initNavigation();
  initCountdown();
  initScrollEffects();
  initRSVPForm();
});

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const menuIcon = document.getElementById('menu-icon');
  const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');

  let isMenuOpen = false;

  // Toggle mobile menu
  navToggle.addEventListener('click', function () {
    isMenuOpen = !isMenuOpen;
    navMobile.classList.toggle('active', isMenuOpen);

    // Update icon
    if (isMenuOpen) {
      menuIcon.setAttribute('data-lucide', 'x');
    } else {
      menuIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
  });

  // Close mobile menu on link click
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      isMenuOpen = false;
      navMobile.classList.remove('active');
      menuIcon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });

  // Scroll effect for navbar
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// COUNTDOWN TIMER
// ========================================

function initCountdown() {
  const weddingDate = new Date('2026-10-11T16:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = String(days).padStart(3, '0');
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
      document.getElementById('days').textContent = '000';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
    }
  }

  // Update immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ========================================
// SCROLL EFFECTS
// ========================================

function initScrollEffects() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with animation classes
  const animatedElements = document.querySelectorAll('.message-card, .gift-card, .venue-card, .countdown-box, .presentes-section');
  animatedElements.forEach(function (element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    observer.observe(element);
  });

  // Add visible class styles
  const style = document.createElement('style');
  style.textContent = `
    .message-card.visible,
    .gift-card.visible,
    .venue-card.visible,
    .countdown-box.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

// ========================================
// RSVP FORM
// ========================================

function initRSVPForm() {
  const form = document.getElementById('rsvp-form');
  const successMessage = document.getElementById('rsvp-success');
  const confirmedName = document.getElementById('confirmed-name');

  //define contato
  const whatsappNumber = "5511966599673"; 

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Pegar dados do formulário
    const formData = new FormData(form);
    const name = formData.get('name');
    const guests = formData.get('guests');
    const phone = formData.get('phone');
    const message = formData.get('message');

    // Montar mensagem para o WhatsApp
    const whatsappMessage = `
📩 *Confirmação de Presença*

👤 Nome: ${name}
👥 Convidados: ${guests}
📞 Telefone: ${phone}
💬 Mensagem: ${message || 'Não informada'}
    `;

    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Abrir WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    // Feedback visual (opcional)
    confirmedName.textContent = name;
    form.style.display = 'none';
    successMessage.style.display = 'block';

    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// ========================================
// TOAST NOTIFICATION
// ========================================

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  toastMessage.textContent = message;
  toast.classList.add('show');

  // Hide after 3 seconds
  setTimeout(function () {
    toast.classList.remove('show');
  }, 3000);
}

// ========================================
// PHONE INPUT MASK
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  const phoneInput = document.getElementById('phone');

  phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');

    // LIMITA A 11 DÍGITOS
    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    // FORMATAÇÃO
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d+)/, '($1) $2');
    } else if (value.length > 0) {
      value = value.replace(/^(\d*)/, '($1');
    }

    e.target.value = value;
  });
});

// ========================================
// GALLERY HORIZONTAL SCROLL WITH MOUSE
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  const galleryScroll = document.querySelector('.gallery-scroll');

  if (galleryScroll) {
    let isDown = false;
    let startX;
    let scrollLeft;

    galleryScroll.addEventListener('mousedown', function (e) {
      isDown = true;
      galleryScroll.style.cursor = 'grabbing';
      startX = e.pageX - galleryScroll.offsetLeft;
      scrollLeft = galleryScroll.scrollLeft;
    });

    galleryScroll.addEventListener('mouseleave', function () {
      isDown = false;
      galleryScroll.style.cursor = 'grab';
    });

    galleryScroll.addEventListener('mouseup', function () {
      isDown = false;
      galleryScroll.style.cursor = 'grab';
    });

    galleryScroll.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - galleryScroll.offsetLeft;
      const walk = (x - startX) * 2;
      galleryScroll.scrollLeft = scrollLeft - walk;
    });

    // Set initial cursor
    galleryScroll.style.cursor = 'grab';
  }
});
