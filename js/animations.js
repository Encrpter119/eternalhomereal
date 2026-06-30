// Eternal Home Custom Animations, Cursor and Loading Screens
(function() {
  
  // 1. Loader screen removal on window load
  window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('fade-out');
        // Enable scroll animations
        triggerScrollAnimations();
      }, 500);
    }
  });

  // 2. Custom cursor tracing
  function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    if (!dot || !outline) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    // Follow mouse coordinates immediately for the dot
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    // Create a smooth trailing delay for the outer circle
    requestAnimationFrame(function animateOutline() {
      posX += (mouseX - posX) * 0.15;
      posY += (mouseY - posY) * 0.15;

      outline.style.left = posX + 'px';
      outline.style.top = posY + 'px';

      requestAnimationFrame(animateOutline);
    });

    // Expand cursor on hovering clickable items
    const clickables = 'a, button, select, input, textarea, .wishlist-toggle, .clickable';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(clickables)) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(clickables)) {
        document.body.classList.remove('cursor-hover');
      }
    });
  }

  // 3. Scroll Reveal intersection observer
  function triggerScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // If it's a counter element, trigger counter animation
            if (entry.target.classList.contains('counter-trigger')) {
              animateCounters(entry.target);
            }
            
            // Once elements have animated, we can unobserve them
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      // Fallback if IntersectionObserver is not supported
      revealElements.forEach(el => el.classList.add('active'));
    }
  }

  // 4. Statistics Counters increment loop
  function animateCounters(container) {
    const counters = container.querySelectorAll('.counter-val');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      const duration = 2000; // ms
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing out quadratic
        const easeProgress = progress * (2 - progress);
        const currentValue = Math.floor(easeProgress * target);
        
        counter.textContent = currentValue.toLocaleString('en-IN');
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          // Ensure exact final number
          counter.textContent = target.toLocaleString('en-IN') + (counter.getAttribute('data-suffix') || '');
        }
      }
      
      requestAnimationFrame(updateCounter);
    });
  }

  // 5. Back to top button toggle
  function handleBackToTop() {
    const btn = document.getElementById('back-to-top');
    const scrollBar = document.getElementById('scroll-progress');

    if (!btn && !scrollBar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // Scroll progress
      if (scrollBar) {
        scrollBar.style.width = scrolled + '%';
      }

      // Back to top opacity toggle
      if (btn) {
        if (scrollTop > 400) {
          btn.classList.add('show');
        } else {
          btn.classList.remove('show');
        }
      }
    });

    if (btn) {
      btn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // 6. Parallax effect for inner heroes & landing heroes
  function handleHeroParallax() {
    const heroImage = document.querySelector('.hero-parallax-bg');
    if (!heroImage) return;

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      heroImage.style.transform = `translateY(${scrollPos * 0.4}px)`;
    });
  }

  // 7. Ripple hover effects on luxury buttons
  function initRippleEffect() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn, .social-link');
      if (!btn) return;

      const circle = document.createElement('span');
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius = diameter / 2;

      const rect = btn.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple');

      // Clear any older ripples
      const ripple = btn.querySelector('.ripple');
      if (ripple) ripple.remove();

      btn.appendChild(circle);
    });
  }

  // Initialize animations components on load
  document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    handleBackToTop();
    handleHeroParallax();
    initRippleEffect();
  });

})();
