/**
 * SHREEJI INFRA - Professional Civil & Industrial Construction
 * Founder: Vishal R. Barchha | Jam Khambhaliya, Gujarat
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle & Backdrop
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMenu);
  }
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenu);
  }
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // 2. Sticky Navbar Blur & Padding on Scroll
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('shadow-xl', 'bg-slate-950/95');
      header.classList.remove('bg-slate-950/85');
    } else {
      header.classList.remove('shadow-xl', 'bg-slate-950/95');
      header.classList.add('bg-slate-950/85');
    }
  });

  // 3. Stats Counter Animation using IntersectionObserver
  const statElements = document.querySelectorAll('.counter-val');
  let animated = false;

  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString('en-IN') + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString('en-IN') + suffix;
      }
    }, stepTime);
  };

  const statsSection = document.getElementById('stats-bar');
  if (statsSection && statElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statElements.forEach(countUp);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(statsSection);
  }

  // 4. Project Gallery Filtering
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-amber-400', 'text-slate-950', 'active');
        b.classList.add('bg-slate-800', 'text-slate-300');
      });
      btn.classList.add('bg-amber-400', 'text-slate-950', 'active');
      btn.classList.remove('bg-slate-800', 'text-slate-300');

      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          item.classList.add('animate-fade-in');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 5. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-toggle');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', !isExpanded);
      if (answer) {
        answer.classList.toggle('hidden');
      }
      if (icon) {
        icon.classList.toggle('rotate-180');
      }
    });
  });

  // 6. Direct Contact Form (Dispatches to WhatsApp)
  const contactForm = document.getElementById('civil-inquiry-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const service = document.getElementById('form-service').value;
      const location = document.getElementById('form-location').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !phone) {
        alert('Please provide your name and contact phone number.');
        return;
      }

      const formattedMsg = `*Civil Construction Inquiry - Shreeji Infra*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service:* ${encodeURIComponent(service)}%0A*Location:* ${encodeURIComponent(location || 'Jam Khambhaliya')}%0A*Scope / Details:* ${encodeURIComponent(message || 'Requesting consultation & site inspection.')}`;
      
      const formSuccessModal = document.getElementById('form-success-banner');
      if (formSuccessModal) {
        formSuccessModal.classList.remove('hidden');
      }

      const targetUrl = `https://wa.me/919426606905?text=${formattedMsg}`;
      window.open(targetUrl, '_blank');
      contactForm.reset();
    });
  }

  // 7. Auto update current year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 8. Custom Construction Gold Interactive Cursor
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorFollower = document.querySelector('.custom-cursor-follower');

  if (cursorDot && cursorFollower && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const updateFollower = () => {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
      requestAnimationFrame(updateFollower);
    };
    requestAnimationFrame(updateFollower);

    // Interactive Hover States on all clickable & card elements
    const hoverElements = document.querySelectorAll('a, button, input, select, textarea, .card-hover-effect, .industrial-card-hover, .faq-toggle');
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorFollower.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursorFollower.classList.remove('cursor-hover'));
    });

    window.addEventListener('mousedown', () => cursorFollower.classList.add('cursor-click'));
    window.addEventListener('mouseup', () => cursorFollower.classList.remove('cursor-click'));
  }
});
