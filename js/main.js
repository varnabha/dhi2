// DHI India - Main JavaScript

(function() {
  'use strict';

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('svg');
      if (mobileMenu.classList.contains('open')) {
        icon.innerHTML = '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      } else {
        icon.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      }
    });
  }

  // Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initial check
  handleScroll();

  // Scroll Animation Observer
  const scrollElements = document.querySelectorAll('.scroll-animate');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  scrollElements.forEach(function(el) {
    observer.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Active Navigation Link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link, .mobile-nav-link, .mobile-submenu-link');

  navLinks.forEach(function(link) {
    const linkPath = link.getAttribute('href');
    if (linkPath) {
      // Remove leading slash for comparison
      const normalizedLinkPath = linkPath.replace(/^\//, '');
      const normalizedCurrentPath = currentPath.replace(/^\//, '');
      
      if (normalizedCurrentPath === normalizedLinkPath || 
          (normalizedCurrentPath.startsWith(normalizedLinkPath) && normalizedLinkPath !== '')) {
        link.classList.add('active');
      }
    }
  });

  // Dropdown hover delay for better UX
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(function(item) {
    let timeout;
    
    item.addEventListener('mouseenter', function() {
      clearTimeout(timeout);
    });
    
    item.addEventListener('mouseleave', function() {
      timeout = setTimeout(function() {
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
          dropdown.style.opacity = '0';
          dropdown.style.visibility = 'hidden';
        }
      }, 100);
    });
  });

  // Form validation (if forms exist)
  const forms = document.querySelectorAll('form');
  
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  // Lazy loading for images
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(function(img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  // Print functionality
  const printButtons = document.querySelectorAll('[data-print]');
  
  printButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      window.print();
    });
  });

  // Back to top button
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // External links - open in new tab
  document.querySelectorAll('a[href^="http"]').forEach(function(link) {
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

})();
