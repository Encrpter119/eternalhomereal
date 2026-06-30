// Eternal Home Main JS Controller
(function() {
  
  // 1. Toast Notification system
  function showToastNotification(title, message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'fa-circle-info';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'error') icon = 'fa-circle-exclamation';

    toast.innerHTML = `
      <i class="fa-solid ${icon} d-flex align-items-center" style="font-size:1.25rem;"></i>
      <div class="toast-content">
        <h4 class="toast-title">${title}</h4>
        <p class="toast-message">${message}</p>
      </div>
      <i class="fa-solid fa-xmark toast-close"></i>
    `;

    container.appendChild(toast);

    // Fade and slide-in
    setTimeout(() => toast.classList.add('show'), 50);

    // Auto-remove after 4 seconds
    const autoRemove = setTimeout(() => {
      removeToast(toast);
    }, 4000);

    // Manual close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(autoRemove);
      removeToast(toast);
    });
  }

  function removeToast(toast) {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }

  // Helper to dynamically build mobile drawers and backdrop
  function setupResponsiveHeader() {
    // Setup Mobile Navigation Menu (Search, Wishlist & Theme Toggle links)
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && !navMenu.querySelector('.mobile-search-item')) {
      // Create Search Item at top of sidebar
      const searchLi = document.createElement('li');
      searchLi.className = 'mobile-search-item';
      searchLi.innerHTML = `
        <div class="mobile-search-box">
          <input type="text" placeholder="Search products..." id="mobile-search-input">
          <button id="mobile-search-btn" title="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
      `;
      navMenu.insertBefore(searchLi, navMenu.firstChild);

      // Create Wishlist Item at bottom of sidebar
      const wishlistLi = document.createElement('li');
      wishlistLi.className = 'mobile-only-link';
      wishlistLi.innerHTML = `
        <a href="wishlist.html" class="nav-link" id="nav-wishlist-mobile">
          <span><i class="fa-regular fa-heart text-gold"></i> Wishlist</span>
          <span class="badge-count wishlist-badge" style="display: none;">0</span>
        </a>
      `;
      navMenu.appendChild(wishlistLi);

      // Create Theme Toggle Switch Item at bottom of sidebar
      const themeLi = document.createElement('li');
      themeLi.className = 'mobile-only-link mobile-theme-toggle-item';
      themeLi.innerHTML = `
        <div class="mobile-theme-toggle-wrapper">
          <span>Appearance</span>
          <label class="theme-switch">
            <input type="checkbox" id="mobile-theme-checkbox">
            <span class="theme-slider">
              <i class="fa-solid fa-moon moon-icon"></i>
              <i class="fa-solid fa-sun sun-icon"></i>
            </span>
          </label>
        </div>
      `;
      navMenu.appendChild(themeLi);

      const themeCheckbox = themeLi.querySelector('#mobile-theme-checkbox');
      if (themeCheckbox) {
        // Set initial state: checkbox is checked if theme is light, unchecked if dark (default)
        const currentTheme = document.documentElement.getAttribute('data-theme');
        themeCheckbox.checked = (currentTheme === 'light');

        // Toggle theme on checkbox state change
        themeCheckbox.addEventListener('change', () => {
          if (window.toggleTheme) {
            window.toggleTheme();
          }
        });
      }

      // Create User Login/Register Item at bottom of sidebar
      const userLi = document.createElement('li');
      userLi.className = 'mobile-only-link';
      userLi.innerHTML = `
        <a href="#" class="nav-link" id="nav-user-mobile">
          <span><i class="fa-regular fa-user text-gold"></i> Login / Register</span>
        </a>
      `;
      navMenu.appendChild(userLi);

      // Create Founder/MD Button Item at bottom of sidebar
      const founderLi = document.createElement('li');
      founderLi.className = 'mobile-only-link mobile-founder-btn-item';
      founderLi.style.width = '100%';
      founderLi.innerHTML = `
        <a href="aboutmemd.html" class="nav-founder-btn" style="width: 100%; text-align: center; background: linear-gradient(135deg, var(--accent-gold) 0%, #b89028 100%) !important; color: #000 !important; border: none !important; box-shadow: var(--gold-glow) !important; font-family: var(--font-subheading) !important; font-size: 0.8rem !important; font-weight: 700 !important; text-transform: uppercase !important; letter-spacing: 1px !important; padding: 12px 15px !important; border-radius: 4px !important; display: flex !important; align-items: center !important; justify-content: center !important; gap: 8px !important; margin-top: 15px !important; transition: all 0.3s ease !important;">
          <i class="fa-solid fa-user-tie"></i> Founder & MD Profile
        </a>
      `;
      navMenu.appendChild(founderLi);


      // Mobile search action handlers
      const performMobileSearch = () => {
        const query = searchLi.querySelector('#mobile-search-input').value.trim();
        if (query) {
          window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
      };

      searchLi.querySelector('#mobile-search-btn').addEventListener('click', performMobileSearch);
      searchLi.querySelector('#mobile-search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performMobileSearch();
      });

      // Initially sync badge count
      syncDrawerBadges();
    }
  }

  // Sync cart and wishlist count badges dynamically
  function syncDrawerBadges() {
    const mainWishlistBadge = document.querySelector('.nav-icons .wishlist-badge');
    const mobileWishlistBadge = document.querySelector('.nav-menu .wishlist-badge');

    if (mainWishlistBadge && mobileWishlistBadge) {
      mobileWishlistBadge.textContent = mainWishlistBadge.textContent;
      mobileWishlistBadge.style.display = mainWishlistBadge.style.display;
    }
  }

  // 2. Sticky Navbar and Mobile Navigation drawer toggle
  function initHeaderControls() {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }

    // Setup mobile items dynamically on mobile
    setupResponsiveHeader();

    const closeAllDrawers = () => {
      if (hamburger) hamburger.classList.remove('active');
      if (navMenu) navMenu.classList.remove('active');
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
      
      const backdrop = document.querySelector('.drawer-backdrop');
      if (backdrop) {
        backdrop.classList.remove('show');
        setTimeout(() => backdrop.remove(), 400);
      }
    };

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        const isLeftDrawerOpen = navMenu.classList.contains('active');
        let backdrop = document.querySelector('.drawer-backdrop');

        if (isLeftDrawerOpen) {
          document.documentElement.classList.add('no-scroll');
          document.body.classList.add('no-scroll');
          
          if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'drawer-backdrop';
            document.body.appendChild(backdrop);
            setTimeout(() => backdrop.classList.add('show'), 10);
            
            backdrop.addEventListener('click', closeAllDrawers);
          }
        } else {
          document.documentElement.classList.remove('no-scroll');
          document.body.classList.remove('no-scroll');
          
          if (backdrop) {
            backdrop.classList.remove('show');
            setTimeout(() => backdrop.remove(), 400);
          }
        }
      });

      navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeAllDrawers);
      });
    }
  }

  // 3. Product Quick View Popup Modal
  function initQuickViewModal() {
    const modal = document.getElementById('product-modal');
    if (!modal) return;

    const closeModalBtns = modal.querySelectorAll('.close-modal');
    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.remove('show');
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
      });
    });

    // Close on clicking overlay
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  function openProductQuickView(productId) {
    const modal = document.getElementById('product-modal');
    const productsList = window.productsDatabase || [];
    const product = productsList.find(p => p.id === productId);

    if (!modal || !product) return;

    // Set text fields
    modal.querySelector('.modal-title').textContent = product.name;
    modal.querySelector('.modal-brand').textContent = product.brand;
    modal.querySelector('.modal-price').textContent = 'N/D';
    modal.querySelector('.modal-price-unit').textContent = '';
    modal.querySelector('.modal-rating-val').textContent = product.rating;
    modal.querySelector('.modal-reviews').textContent = `(${product.reviews} reviews)`;
    modal.querySelector('.modal-desc').textContent = product.description;
    
    // Set Main Image
    const modalImg = modal.querySelector('.modal-main-img');
    if (modalImg) modalImg.src = product.image;

    // Load Specifications table
    const specsContainer = modal.querySelector('.modal-specs-table');
    if (specsContainer) {
      let specsHtml = '';
      for (const [key, value] of Object.entries(product.specifications)) {
        specsHtml += `
          <tr>
            <td class="font-weight-600 text-gold py-2" style="font-size:0.85rem; width:40%;">${key}</td>
            <td class="text-secondary py-2" style="font-size:0.85rem;">${value}</td>
          </tr>
        `;
      }
      specsContainer.innerHTML = specsHtml;
    }

    // Load Features Bullet points
    const featuresContainer = modal.querySelector('.modal-features-list');
    if (featuresContainer) {
      let featuresHtml = '';
      product.features.forEach(feat => {
        featuresHtml += `
          <li class="text-secondary" style="font-size: 0.85rem; margin-bottom: 8px;">
            <i class="fa-solid fa-check text-gold mr-2" style="margin-right: 8px;"></i>${feat}
          </li>
        `;
      });
      featuresContainer.innerHTML = featuresHtml;
    }

    // Load color swatches
    const colorSwatches = modal.querySelector('.modal-colors-swatch');
    if (colorSwatches) {
      let swatchesHtml = '';
      product.colors.forEach((color, index) => {
        swatchesHtml += `
          <label class="color-swatch-item" style="cursor:pointer; display:inline-flex; align-items:center; gap:5px; margin-right: 15px; border: 1px solid var(--glass-border); padding: 5px 12px; border-radius: 4px;">
            <input type="radio" name="modal-selected-color" value="${color}" ${index === 0 ? 'checked' : ''} style="accent-color: var(--accent-gold);">
            <span style="font-size: 0.8rem; font-family: var(--font-subheading); color: var(--text-primary);">${color}</span>
          </label>
        `;
      });
      colorSwatches.innerHTML = swatchesHtml;
    }

    // Set Stock Badge status
    const stockBadge = modal.querySelector('.modal-stock-badge');
    if (stockBadge) {
      if (product.availability === 'in-stock') {
        stockBadge.textContent = 'In Stock';
        stockBadge.style.background = 'rgba(34, 197, 94, 0.15)';
        stockBadge.style.color = '#22c55e';
      } else if (product.availability === 'made-to-order') {
        stockBadge.textContent = 'Made to Order';
        stockBadge.style.background = 'rgba(212, 175, 55, 0.15)';
        stockBadge.style.color = 'var(--accent-gold)';
      } else {
        stockBadge.textContent = 'Out of Stock';
        stockBadge.style.background = 'rgba(239, 68, 68, 0.15)';
        stockBadge.style.color = '#ef4444';
      }
    }

    // Reset Quantity count
    const qtyVal = modal.querySelector('.modal-qty-val');
    if (qtyVal) qtyVal.textContent = '1';

    // Set Modal Trigger Buttons actions
    const modalAddToCartBtn = modal.querySelector('.modal-add-to-cart');
    if (modalAddToCartBtn) {
      // Remove any prior listeners
      const newBtn = modalAddToCartBtn.cloneNode(true);
      modalAddToCartBtn.parentNode.replaceChild(newBtn, modalAddToCartBtn);

      newBtn.addEventListener('click', () => {
        const qty = Number(qtyVal.textContent);
        const colorRadio = modal.querySelector('input[name="modal-selected-color"]:checked');
        const color = colorRadio ? colorRadio.value : product.colors[0];

        if (window.cartController) {
          window.cartController.add(product.id, qty, color);
          modal.classList.remove('show');
          document.documentElement.classList.remove('no-scroll');
          document.body.classList.remove('no-scroll');
        }
      });
    }

    // Wishlist selector on modal
    const modalWishlistBtn = modal.querySelector('.modal-add-wishlist');
    if (modalWishlistBtn) {
      const isFav = window.wishlistController ? window.wishlistController.check(product.id) : false;
      const heartIcon = modalWishlistBtn.querySelector('i');
      if (heartIcon) {
        heartIcon.className = isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      }

      const newWishBtn = modalWishlistBtn.cloneNode(true);
      modalWishlistBtn.parentNode.replaceChild(newWishBtn, modalWishlistBtn);

      newWishBtn.addEventListener('click', () => {
        if (window.wishlistController) {
          window.wishlistController.toggle(product.id);
          const isNowFav = window.wishlistController.check(product.id);
          newWishBtn.querySelector('i').className = isNowFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
        }
      });
    }

    // Quantity selectors controls in modal
    const decBtn = modal.querySelector('.modal-qty-dec');
    const incBtn = modal.querySelector('.modal-qty-inc');

    if (decBtn && incBtn && qtyVal) {
      decBtn.onclick = () => {
        let currentQty = Number(qtyVal.textContent);
        if (currentQty > 1) {
          qtyVal.textContent = currentQty - 1;
        }
      };

      incBtn.onclick = () => {
        let currentQty = Number(qtyVal.textContent);
        qtyVal.textContent = currentQty + 1;
      };
    }

    // Open Modal
    modal.classList.add('show');
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  }

  // 4. FAQ Accordion handler
  function initFAQAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        const isActive = item.classList.contains('active');

        // Close all items
        document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // 5. Testimonials slider handler
  function initTestimonialsSlider() {
    const track = document.querySelector('.testimonials-track');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!track || dots.length === 0) return;

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        
        // Translate testimonial cards grid by index offset
        const translatePct = -index * 100;
        track.style.transform = `translateX(${translatePct}%)`;
      });
    });
  }

  // 6. Contact Form Validation
  function initContactFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = form.querySelector('#form-name').value.trim();
      const phone = form.querySelector('#form-phone').value.trim();
      const email = form.querySelector('#form-email').value.trim();
      const message = form.querySelector('#form-message').value.trim();

      // Check fields
      if (!name || !phone || !email || !message) {
        showToastNotification('Validation Error', 'Please fill out all form fields.', 'error');
        return;
      }

      // Check phone
      const phonePattern = /^[6-9]\d{9}$/;
      if (!phonePattern.test(phone)) {
        showToastNotification('Validation Error', 'Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      // Check email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToastNotification('Validation Error', 'Please enter a valid email address.', 'error');
        return;
      }

      // Successful submit callback simulation
      showToastNotification(
        'Inquiry Submitted',
        'Thank you! Your inquiry has been sent to Eternal Home. We will get back to you shortly.',
        'success'
      );

      form.reset();
    });
  }

  // 7. Combined Welcome & Founder Popup Sequence
  function initPopupSequence() {
    // Disable sequence if on the founder profile page
    if (window.location.pathname.includes('aboutmemd.html')) return;

    const SEQ_SESSION_KEY = 'eternal_home_popup_seq_seen';
    if (sessionStorage.getItem(SEQ_SESSION_KEY)) return;

    // Phase 1: Show Mr. Shabir Parah Founder Popup
    const showFounderPopup = () => {
      const inviteOverlay = document.createElement('div');
      inviteOverlay.className = 'modal-overlay';
      inviteOverlay.id = 'founder-invite-popup';
      inviteOverlay.innerHTML = `
        <div class="modal-container glass-panel reveal-up" style="max-width: 420px; padding: 35px 25px; text-align: center; border-color: var(--accent-gold); box-shadow: var(--gold-glow); transform: scale(0.95); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
          <button class="close-invite modal-close-btn clickable"><i class="fa-solid fa-xmark"></i></button>
          
          <div style="width: 100px; height: 100px; border-radius: 50%; overflow: hidden; margin: 0 auto 20px; border: 2px solid var(--accent-gold); box-shadow: var(--gold-glow);">
            <img src="images/parahitself/parahimg.png" alt="Mr. Shabir Parah" style="width: 100%; height: 100%; object-fit: cover; object-position: center top;">
          </div>
          
          <span class="text-gold font-subheading" style="font-size: 0.75rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">Meet the Founder</span>
          <h3 class="font-heading mb-3" style="font-size: 1.4rem; font-weight: 700; color: var(--text-primary); margin-top: 5px;">The Vision Behind Our Success</h3>
          <p class="text-secondary" style="font-size: 0.85rem; line-height: 1.6; margin-bottom: 20px;">
            Discover the legacy, values, and commitments of Mr. Shabir Parah, Founder & Managing Director of Eternal Home.
          </p>
          
          <div class="d-flex flex-column gap-2">
            <a href="aboutmemd.html" class="btn btn-primary clickable w-100" id="read-founder-btn" style="text-align:center; display:block;">Read Profile</a>
            <button class="btn btn-secondary close-invite clickable" style="width: 100%;">Maybe Later</button>
          </div>
        </div>
      `;

      document.body.appendChild(inviteOverlay);

      let closed = false;
      const dismissFounder = () => {
        if (closed) return;
        closed = true;
        clearTimeout(autoDismissFounder);
        
        inviteOverlay.classList.remove('show');
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
        
        setTimeout(() => {
          inviteOverlay.remove();
          // Trigger Phase 2: Showroom notice welcome popup
          showWelcomePopup();
        }, 500);
      };

      // Auto dismiss after 2.5 seconds (2500ms)
      const autoDismissFounder = setTimeout(dismissFounder, 2500);

      inviteOverlay.querySelectorAll('.close-invite').forEach(btn => {
        btn.addEventListener('click', dismissFounder);
      });
      inviteOverlay.addEventListener('click', (e) => {
        if (e.target === inviteOverlay) dismissFounder();
      });
      inviteOverlay.querySelector('#read-founder-btn').addEventListener('click', dismissFounder);

      // Show popup shortly after page load
      setTimeout(() => {
        inviteOverlay.classList.add('show');
        document.documentElement.classList.add('no-scroll');
        document.body.classList.add('no-scroll');
      }, 1200);
    };

    // Phase 2: Showroom Notice Welcome Popup (under dev notice)
    const showWelcomePopup = () => {
      const popupOverlay = document.createElement('div');
      popupOverlay.className = 'modal-overlay'; // Reused overlay
      popupOverlay.id = 'welcome-popup';
      popupOverlay.innerHTML = `
        <div class="modal-container glass-panel reveal-up" style="max-width: 500px; padding: 35px 25px; text-align: center; border-color: var(--accent-gold); box-shadow: var(--gold-glow); transform: scale(0.95); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
          <button class="close-welcome modal-close-btn clickable"><i class="fa-solid fa-xmark"></i></button>
          <i class="fa-solid fa-bell text-gold fa-2x mb-3 welcome-popup-bell"></i>
          <h3 class="font-heading mb-2 welcome-popup-title" style="font-size: 1.4rem; font-weight: 700; color: var(--text-primary);">Showroom Notice</h3>
          
          <p class="text-secondary mb-3" style="font-size: 0.9rem; line-height: 1.6;">
            Welcome to <strong>Eternal Home Tiles & Bathware</strong>, Ganderbal.
          </p>
          <p class="text-secondary mb-4" style="font-size: 0.85rem; line-height: 1.6;">
            Our full available showroom collection is currently being updated and is not fully listed online yet. All items can be browsed online, and <strong>purchases and payments are processed offline</strong> at our showroom.
          </p>
          
          <div class="d-flex flex-column gap-2">
            <a href="https://wa.me/917780877456?text=Hi%20Eternal%20Home%20Manager%2C%20I%20have%20an%20inquiry%20regarding%20the%20showroom%20collections." 
               target="_blank" class="btn btn-primary w-100 welcome-whatsapp-btn clickable" style="display:flex; align-items:center; justify-content:center; gap:8px;">
              <i class="fa-brands fa-whatsapp"></i> Contact Manager on WhatsApp
            </a>
            <button class="btn btn-secondary w-100 dismiss-welcome-btn clickable" id="proceed-website-btn">Proceed to Website</button>
          </div>
        </div>
      `;

      document.body.appendChild(popupOverlay);

      let closed = false;
      const dismissWelcome = () => {
        if (closed) return;
        closed = true;
        clearTimeout(autoDismissWelcome);
        
        popupOverlay.classList.remove('show');
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
        
        sessionStorage.setItem(SEQ_SESSION_KEY, 'true');
        setTimeout(() => popupOverlay.remove(), 500);
      };

      // Auto dismiss after 1 second (1000ms)
      const autoDismissWelcome = setTimeout(dismissWelcome, 1000);

      popupOverlay.querySelector('.close-welcome').addEventListener('click', dismissWelcome);
      popupOverlay.querySelector('.dismiss-welcome-btn').addEventListener('click', dismissWelcome);
      popupOverlay.querySelector('.welcome-whatsapp-btn').addEventListener('click', () => {
        setTimeout(dismissWelcome, 1000);
      });
      popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) dismissWelcome();
      });

      // Show popup
      setTimeout(() => {
        popupOverlay.classList.add('show');
        document.documentElement.classList.add('no-scroll');
        document.body.classList.add('no-scroll');
      }, 100);
    };

    // Start Phase 1
    showFounderPopup();
  }

  // Reusable custom popup modal for unavailable/development features
  function showFeaturePopup(title, message, iconClass = 'fa-solid fa-gears') {
    const modalId = 'dynamic-feature-modal';
    let modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement('div');
      modal.id = modalId;
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-container glass-panel reveal-up" style="max-width: 420px; padding: 40px 30px; text-align: center; border-color: var(--accent-gold); box-shadow: var(--gold-glow); transform: scale(0.95); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
          <button class="close-modal modal-close-btn clickable"><i class="fa-solid fa-xmark"></i></button>
          <div class="modal-icon-wrapper" style="font-size: 3.5rem; color: var(--accent-gold); margin-bottom: 20px;">
            <i class="${iconClass}"></i>
          </div>
          <h3 class="modal-title font-heading mb-3" style="font-size: 1.6rem; font-weight: 700; color: var(--text-primary);"></h3>
          <p class="modal-message text-secondary" style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 25px;"></p>
          <button class="btn btn-primary close-modal clickable" style="width: 100%;">Understood</button>
        </div>
      `;
      document.body.appendChild(modal);

      // Handle close actions
      const closeModal = () => {
        modal.classList.remove('show');
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
      };

      modal.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModal);
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    // Set dynamic content
    modal.querySelector('.modal-icon-wrapper i').className = iconClass;
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-message').textContent = message;

    // Show modal
    modal.classList.add('show');
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  }

  // Inject User/Login & HomeAI controls
  function initUnavailableFeatures() {
    // 1. Inject User / Register Icon in top navbar
    const navIcons = document.querySelector('.nav-icons');
    if (navIcons && !navIcons.querySelector('#header-user-btn')) {
      const userBtn = document.createElement('button');
      userBtn.id = 'header-user-btn';
      userBtn.className = 'icon-btn clickable';
      userBtn.title = 'Login / Register';
      userBtn.innerHTML = '<i class="fa-regular fa-user"></i>';
      
      const themeToggle = navIcons.querySelector('.theme-toggle-btn');
      const hamburger = navIcons.querySelector('.hamburger');
      if (themeToggle) {
        navIcons.insertBefore(userBtn, themeToggle);
      } else if (hamburger) {
        navIcons.insertBefore(userBtn, hamburger);
      } else {
        navIcons.appendChild(userBtn);
      }
    }

    // 2. Inject HomeAI floating button
    const floatActions = document.querySelector('.floating-actions');
    if (floatActions && !floatActions.querySelector('#homeai-float')) {
      const homeaiBtn = document.createElement('button');
      homeaiBtn.id = 'homeai-float';
      homeaiBtn.className = 'float-btn homeai-float clickable';
      homeaiBtn.title = 'Ask HomeAI';
      homeaiBtn.innerHTML = '<i class="fa-solid fa-robot"></i>';
      
      floatActions.insertBefore(homeaiBtn, floatActions.firstChild);
    }

    // 3. Delegate click events to show custom premium popup modals
    document.addEventListener('click', (e) => {
      const userBtn = e.target.closest('#header-user-btn');
      const userMobileBtn = e.target.closest('#nav-user-mobile');
      if (userBtn || userMobileBtn) {
        e.preventDefault();
        showFeaturePopup(
          'Login / Register',
          'Login and Registration facility is not available right now. We are working on it.',
          'fa-solid fa-user-gear'
        );
      }

      const homeaiBtn = e.target.closest('#homeai-float');
      if (homeaiBtn) {
        e.preventDefault();
        showFeaturePopup(
          'HomeAI Assistant',
          'HomeAI assistant is under development and will be available soon.',
          'fa-solid fa-robot'
        );
      }
    });
  }

  // Initialize scripts
  document.addEventListener('DOMContentLoaded', () => {
    initHeaderControls();
    initQuickViewModal();
    initFAQAccordion();
    initTestimonialsSlider();
    initContactFormValidation();
    initUnavailableFeatures();
    initPopupSequence();
  });

  // Export functions to global scope
  window.showToastNotification = showToastNotification;
  window.openProductQuickView = openProductQuickView;
  window.showFeaturePopup = showFeaturePopup;

})();
