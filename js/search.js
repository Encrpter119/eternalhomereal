// Live Search and Product Filters Controller
(function() {
  let activeFilters = {
    category: 'all',
    brand: [],
    priceMin: 0,
    priceMax: 100000,
    availability: [],
    searchQuery: '',
    sortBy: 'popular'
  };

  // Render a list of products onto the catalog grid
  function renderProductsList(productsList) {
    const container = document.getElementById('products-grid');
    if (!container) return;

    if (productsList.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="fa-solid fa-magnifying-glass fa-3x mb-3 text-muted"></i>
          <h3 class="font-heading mb-2">No Products Found</h3>
          <p class="text-secondary">Try adjusting your filters or search terms.</p>
        </div>
      `;
      return;
    }

    let html = '';
    productsList.forEach(product => {
      const isFav = window.wishlistController ? window.wishlistController.check(product.id) : false;
      const heartIconClass = isFav ? 'fa-solid fa-heart text-gold' : 'fa-regular fa-heart';
      
      html += `
        <div class="col-xl-4 col-md-6 reveal reveal-up active">
          <div class="product-card glass-panel h-100 d-flex flex-column" style="position:relative;">
            <!-- Wishlist Toggle -->
            <button class="wishlist-toggle border-0 shadow-sm rounded-circle d-flex align-items-center justify-content-center" 
                    data-id="${product.id}" 
                    style="position:absolute; top:15px; right:15px; width:40px; height:40px; background:var(--glass-bg); z-index:10; border:1px solid var(--glass-border) !important;">
              <i class="${heartIconClass}" style="font-size: 1.15rem;"></i>
            </button>
            
            <!-- Product Thumbnail -->
            <div class="product-img-wrapper img-zoom-container rounded-top" style="height:250px; position:relative; overflow:hidden;">
              <img src="${product.image}" alt="${product.name}" class="w-100 h-100" style="object-fit: cover;">
              ${product.isNew ? '<span class="badge-new" style="position:absolute; bottom:15px; left:15px; background:var(--accent-gold); color:#000; font-family:var(--font-subheading); font-size:0.65rem; font-weight:700; text-transform:uppercase; padding:4px 10px; border-radius:3px; letter-spacing:1px;">New</span>' : ''}
            </div>

            <!-- Product Body -->
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

              <!-- Action CTAs -->
              <div class="mt-auto d-grid gap-2">
                <button class="btn btn-primary btn-sm add-cart-quick" data-id="${product.id}">Add To Cart</button>
                <button class="btn btn-outline btn-sm quick-view-btn" data-id="${product.id}">Quick View</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Hook up dynamic click events for the newly rendered cards
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

  // Trigger filtering and sorting
  function applyActiveFilters() {
    if (typeof window.getFilteredProducts !== 'function') return;

    const filtered = window.getFilteredProducts(activeFilters);
    renderProductsList(filtered);

    // Update Result count label if it exists
    const resultCountEl = document.getElementById('results-count');
    if (resultCountEl) {
      resultCountEl.textContent = `${filtered.length} products found`;
    }
  }

  // Setup UI event listeners
  function initFilterUI() {
    // 1. Text Search Input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        activeFilters.searchQuery = e.target.value;
        applyActiveFilters();
      });
    }

    // 2. Sort Dropdown
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        activeFilters.sortBy = e.target.value;
        applyActiveFilters();
      });
    }

    // 3. Category selector tags or items
    const categoryFilters = document.querySelectorAll('.category-filter-item');
    categoryFilters.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        categoryFilters.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        activeFilters.category = item.getAttribute('data-category');
        applyActiveFilters();
      });
    });

    // 4. Brand Checkboxes
    const brandCheckboxes = document.querySelectorAll('.brand-checkbox');
    brandCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const checkedBrands = [];
        brandCheckboxes.forEach(c => {
          if (c.checked) checkedBrands.push(c.value);
        });
        activeFilters.brand = checkedBrands;
        applyActiveFilters();
      });
    });

    // 5. Price Range Inputs
    const minPriceInput = document.getElementById('price-min');
    const maxPriceInput = document.getElementById('price-max');
    const priceDisplay = document.getElementById('price-range-val');
    
    if (maxPriceInput) {
      maxPriceInput.addEventListener('input', (e) => {
        const val = Number(e.target.value);
        activeFilters.priceMax = val;
        if (priceDisplay) {
          priceDisplay.textContent = `₹0 - ₹${val.toLocaleString('en-IN')}`;
        }
        applyActiveFilters();
      });
    }

    // 6. Availability Checkboxes
    const availCheckboxes = document.querySelectorAll('.avail-checkbox');
    availCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const checkedAvails = [];
        availCheckboxes.forEach(c => {
          if (c.checked) checkedAvails.push(c.value);
        });
        activeFilters.availability = checkedAvails;
        applyActiveFilters();
      });
    });

    // Reset filters button
    const resetBtn = document.getElementById('reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeFilters = {
          category: 'all',
          brand: [],
          priceMin: 0,
          priceMax: 100000,
          availability: [],
          searchQuery: '',
          sortBy: 'popular'
        };

        // Reset text search
        if (searchInput) searchInput.value = '';
        
        // Reset sorting select
        if (sortSelect) sortSelect.value = 'popular';

        // Reset category tags
        categoryFilters.forEach(i => {
          if (i.getAttribute('data-category') === 'all') {
            i.classList.add('active');
          } else {
            i.classList.remove('active');
          }
        });

        // Reset checkboxes
        brandCheckboxes.forEach(c => c.checked = false);
        availCheckboxes.forEach(c => c.checked = false);

        // Reset slider
        if (maxPriceInput) {
          maxPriceInput.value = 100000;
          if (priceDisplay) priceDisplay.textContent = `₹0 - ₹100,000`;
        }

        applyActiveFilters();
        if (window.showToastNotification) {
          window.showToastNotification('Filters Reset', 'Displaying all products.', 'info');
        }
      });
    }
  }

  // Hook up on DOM Content Loaded
  document.addEventListener('DOMContentLoaded', () => {
    initFilterUI();
    
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if category is passed via URL query param
    const catParam = urlParams.get('category');
    if (catParam) {
      activeFilters.category = catParam;
      const categoryFilters = document.querySelectorAll('.category-filter-item');
      categoryFilters.forEach(item => {
        if (item.getAttribute('data-category') === catParam) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    // Check if search query is passed via URL query param
    const searchParam = urlParams.get('search');
    if (searchParam) {
      activeFilters.searchQuery = searchParam;
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.value = searchParam;
      }
    }

    applyActiveFilters();
  });

  window.searchAndFilters = {
    filters: activeFilters,
    apply: applyActiveFilters,
    render: renderProductsList
  };
})();
