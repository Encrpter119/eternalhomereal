// Local Storage Wishlist Controller
(function() {
  const WISHLIST_KEY = 'eternal_home_wishlist';

  function getWishlist() {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
  }

  function saveWishlist(wishlist) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    updateWishlistBadges();
  }

  function toggleWishlist(productId) {
    const product = window.productsDatabase ? window.productsDatabase.find(p => p.id === productId) : null;
    if (!product) return;

    let wishlist = getWishlist();
    const index = wishlist.indexOf(productId);
    let added = false;

    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(productId);
      added = true;
    }

    saveWishlist(wishlist);

    // Update hearts on page
    updateHeartIcons(productId, added);

    if (window.showToastNotification) {
      if (added) {
        window.showToastNotification('Added to Wishlist', `${product.name} saved.`, 'success');
      } else {
        window.showToastNotification('Removed from Wishlist', `${product.name} removed.`, 'info');
      }
    }

    // If on wishlist page, re-render
    if (typeof renderWishlistPage === 'function') {
      renderWishlistPage();
    }
  }

  function isInWishlist(productId) {
    return getWishlist().includes(productId);
  }

  function updateWishlistBadges() {
    const wishlist = getWishlist();
    const badges = document.querySelectorAll('.wishlist-badge');
    badges.forEach(badge => {
      badge.textContent = wishlist.length;
      if (wishlist.length > 0) {
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    });
  }

  function updateHeartIcons(productId, added) {
    const heartBtns = document.querySelectorAll(`.wishlist-toggle[data-id="${productId}"]`);
    heartBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (added) {
          icon.classList.remove('fa-regular');
          icon.classList.add('fa-solid', 'text-gold');
        } else {
          icon.classList.remove('fa-solid', 'text-gold');
          icon.classList.add('fa-regular');
        }
      }
    });
  }

  // Render logic for wishlist.html
  function renderWishlistPage() {
    const container = document.getElementById('wishlist-items-container');
    if (!container) return;

    const wishlistIds = getWishlist();
    const allProducts = window.productsDatabase || [];
    const wishlistProducts = allProducts.filter(p => wishlistIds.includes(p.id));

    if (wishlistProducts.length === 0) {
      container.innerHTML = `
        <div class="empty-state text-center py-5">
          <i class="fa-regular fa-heart fa-3x mb-3 text-muted"></i>
          <h3 class="font-heading mb-2">Your Wishlist is Empty</h3>
          <p class="text-secondary mb-4">Save products you love to view them here later.</p>
          <a href="products.html" class="btn btn-primary">Browse Collections</a>
        </div>
      `;
      return;
    }

    let html = '<div class="row g-4">';
    wishlistProducts.forEach(product => {
      html += `
        <div class="col-lg-4 col-md-6 reveal reveal-up active">
          <div class="product-card glass-panel h-100 d-flex flex-column" style="position:relative;">
            <button class="wishlist-toggle border-0 shadow-sm rounded-circle d-flex align-items-center justify-content-center" data-id="${product.id}" style="position:absolute; top:15px; right:15px; width:40px; height:40px; background:var(--glass-bg); z-index:10; border:1px solid var(--glass-border) !important;">
              <i class="fa-solid fa-heart text-gold" style="font-size: 1.15rem;"></i>
            </button>
            <div class="product-img-wrapper img-zoom-container rounded-top" style="height:250px; position:relative; overflow:hidden;">
              <img src="${product.image}" alt="${product.name}" class="w-100 h-100" style="object-fit: cover;">
            </div>
            <div class="product-details-body p-4 d-flex flex-column flex-grow-1">
              <span class="product-brand text-gold font-subheading mb-1" style="font-size:0.75rem; font-weight:600; letter-spacing:2px; text-transform:uppercase;">${product.brand}</span>
              <h3 class="product-title font-heading mb-2" style="font-size:1.2rem; font-weight:600; line-height:1.4;">${product.name}</h3>
              <div class="product-meta d-flex justify-content-between align-items-center mb-3">
                <span class="product-price font-subheading font-weight-700" style="font-size:1.1rem; color:var(--text-primary);">N/D</span>
                <div class="product-rating text-gold" style="font-size:0.8rem;">
                  <i class="fa-solid fa-star"></i>
                  <span class="text-primary font-weight-500" style="margin-left: 2px;">${product.rating}</span>
                </div>
              </div>
              <div class="mt-auto d-grid gap-2">
                <button class="btn btn-primary btn-sm add-cart-quick" data-id="${product.id}">Add To Cart</button>
                <button class="btn btn-outline btn-sm quick-view-btn" data-id="${product.id}">Quick View</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';

    container.innerHTML = html;

    // Attach listeners
    container.querySelectorAll('.wishlist-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(btn.getAttribute('data-id'));
      });
    });

    container.querySelectorAll('.add-cart-quick').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.cartController) {
          window.cartController.add(btn.getAttribute('data-id'), 1);
        }
      });
    });

    container.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.openProductQuickView) {
          window.openProductQuickView(btn.getAttribute('data-id'));
        }
      });
    });
  }

  // Register listeners on load
  document.addEventListener('DOMContentLoaded', () => {
    updateWishlistBadges();
    renderWishlistPage();

    // Setup delegations for heart buttons clicks globally
    document.addEventListener('click', (e) => {
      const heartBtn = e.target.closest('.wishlist-toggle');
      if (heartBtn) {
        const id = heartBtn.getAttribute('data-id');
        // Check if page handles it internally or we toggle here
        toggleWishlist(id);
      }
    });
  });

  // Export globally
  window.wishlistController = {
    toggle: toggleWishlist,
    check: isInWishlist,
    get: getWishlist,
    updateBadges: updateWishlistBadges,
    updateHearts: updateHeartIcons,
    render: renderWishlistPage
  };
})();
