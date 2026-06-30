// Local Storage Shopping Cart Controller
(function() {
  const CART_KEY = 'eternal_home_cart';

  function getCart() {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadges();
  }

  function addToCart(productId, quantity = 1, color = null) {
    const product = window.productsDatabase ? window.productsDatabase.find(p => p.id === productId) : null;
    if (!product) return;

    let cart = getCart();
    
    // Default to the first color if none is chosen
    const selectedColor = color || (product.colors && product.colors[0]) || 'Standard';

    const existingIndex = cart.findIndex(item => item.id === productId && item.color === selectedColor);
    
    if (existingIndex > -1) {
      cart[existingIndex].quantity += Number(quantity);
    } else {
      cart.push({
        id: productId,
        name: product.name,
        brand: product.brand,
        price: product.price,
        priceUnit: product.priceUnit,
        image: product.image,
        color: selectedColor,
        quantity: Number(quantity)
      });
    }

    saveCart(cart);
    
    if (window.showToastNotification) {
      window.showToastNotification(
        'Added to Cart',
        `${product.name} (${selectedColor}) x ${quantity} added.`,
        'success'
      );
    }
  }

  function removeFromCart(productId, color) {
    let cart = getCart();
    const updated = cart.filter(item => !(item.id === productId && item.color === color));
    saveCart(updated);
    
    if (window.showToastNotification) {
      window.showToastNotification(
        'Removed from Cart',
        'Item removed successfully.',
        'info'
      );
    }
    
    // Re-render cart if on the cart page
    if (typeof renderCartPage === 'function') {
      renderCartPage();
    }
  }

  function updateQuantity(productId, color, change) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId && item.color === color);
    
    if (itemIndex > -1) {
      cart[itemIndex].quantity += change;
      if (cart[itemIndex].quantity <= 0) {
        cart = cart.filter(item => !(item.id === productId && item.color === color));
      }
      saveCart(cart);
    }

    // Re-render cart if on the cart page
    if (typeof renderCartPage === 'function') {
      renderCartPage();
    }
  }

  function clearCart() {
    saveCart([]);
    if (typeof renderCartPage === 'function') {
      renderCartPage();
    }
  }

  function updateCartBadges() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    
    badges.forEach(badge => {
      badge.textContent = totalCount;
      if (totalCount > 0) {
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    });
  }

  // Render logic for cart.html
  function renderCartPage() {
    const cartContainer = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');
    
    if (!cartContainer) return;

    const cart = getCart();

    if (cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="empty-state text-center py-5">
          <i class="fa-solid fa-cart-shopping fa-3x mb-3 text-muted"></i>
          <h3 class="font-heading mb-2">Your Shopping Cart is Empty</h3>
          <p class="text-secondary mb-4">Explore our collections and add products to your cart.</p>
          <a href="products.html" class="btn btn-primary">Go to Catalog</a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = 'N/D';
      if (taxEl) taxEl.textContent = 'N/D';
      if (totalEl) totalEl.textContent = 'N/D';
      return;
    }

    let subtotal = 0;
    
    let html = `
      <table class="cart-table w-100">
        <thead>
          <tr>
            <th>Product</th>
            <th>Color</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
    `;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      html += `
        <tr data-id="${item.id}" data-color="${item.color}">
          <td>
            <div class="cart-product-info d-flex align-items-center gap-3">
              <img src="${item.image}" alt="${item.name}" class="cart-item-img rounded" style="width: 70px; height: 70px; object-fit: cover;">
              <div>
                <h4 class="font-subheading font-weight-600 mb-1" style="font-size: 0.95rem;">${item.name}</h4>
                <p class="text-muted" style="font-size: 0.8rem;">Brand: ${item.brand}</p>
              </div>
            </div>
          </td>
          <td>
            <span class="color-badge">${item.color}</span>
          </td>
          <td>N/D</td>
          <td>
            <div class="quantity-controller d-inline-flex align-items-center border rounded">
              <button class="qty-btn dec-qty px-2 py-1"><i class="fa-solid fa-minus"></i></button>
              <span class="qty-val px-3">${item.quantity}</span>
              <button class="qty-btn inc-qty px-2 py-1"><i class="fa-solid fa-plus"></i></button>
            </div>
          </td>
          <td>N/D</td>
          <td>
            <button class="delete-item-btn text-muted hover-glow" style="padding: 8px; border-radius: 50%;"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;

    cartContainer.innerHTML = html;

    // Attach cart actions event listeners
    cartContainer.querySelectorAll('.dec-qty').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const item = cart[idx];
        updateQuantity(item.id, item.color, -1);
      });
    });

    cartContainer.querySelectorAll('.inc-qty').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const item = cart[idx];
        updateQuantity(item.id, item.color, 1);
      });
    });

    cartContainer.querySelectorAll('.delete-item-btn').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const item = cart[idx];
        removeFromCart(item.id, item.color);
      });
    });

    // Summary calculations (CGST/SGST = 18%)
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    if (subtotalEl) subtotalEl.textContent = 'N/D';
    if (taxEl) taxEl.textContent = 'N/D';
    if (totalEl) totalEl.textContent = 'N/D';
  }

  // Register listeners on load
  document.addEventListener('DOMContentLoaded', () => {
    updateCartBadges();
    renderCartPage();
    
    // If there is a clear-cart button, connect it
    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        clearCart();
        window.showToastNotification('Cart Cleared', 'All items removed from cart.', 'info');
      });
    }
  });

  // Export globally
  window.cartController = {
    add: addToCart,
    remove: removeFromCart,
    updateQty: updateQuantity,
    clear: clearCart,
    get: getCart,
    updateBadges: updateCartBadges,
    render: renderCartPage
  };
})();
