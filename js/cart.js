// CART STORAGE (pakai getCart/setCart dari main.js)
function formatPrice(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

function parsePrice(val) {
  if (typeof val === 'number') return val;
  return parseInt((val || 'Rp 0').replace(/[^0-9]/g, '')) || 0;
}

function saveCart(cart) {
  setCart(cart); // pakai setCart() dari main.js, bukan localStorage langsung
  renderCart();
  document.querySelectorAll('.navbar-cart-count').forEach(el => {
    el.textContent = cart.reduce((a, b) => a + (b.qty || 1), 0);
  });
}

function renderCart() {
  const cart = getCart(); // pakai getCart() dari main.js
  const container = document.getElementById('cartItems');
  const cartLayout = document.getElementById('cartLayout');
  const emptyState = document.getElementById('cartEmpty');
  const summaryBlock = document.getElementById('cartSummary');

  if (!container) return;

  if (cart.length === 0) {
    if (cartLayout) cartLayout.style.display = 'none';
    if (emptyState) emptyState.style.display = 'flex';
    if (summaryBlock) summaryBlock.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (cartLayout) cartLayout.style.display = 'grid';
  if (summaryBlock) summaryBlock.style.display = 'block';

  container.innerHTML = cart.map((item, i) => {
    const imgHTML = (item.img && item.img.length > 0)
      ? `<img src="${item.img}" alt="${item.name}" class="cart-item-img-tag">`
      : (item.emoji || '🛍');

    return `
    <div class="cart-item" id="item${i}">
      <div class="cart-item-img">${imgHTML}</div>
      <div class="cart-item-info">
        <div class="cart-item-brand">${item.brand || 'GoodFinds'}</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.size ? 'Ukuran: ' + item.size + (item.condition ? ' &nbsp;·&nbsp; Kondisi: ' + item.condition : '') : (item.condition ? 'Kondisi: ' + item.condition : '')}</div>
        <div class="cart-item-bottom">
          <div class="cart-qty">
            <button class="cart-qty-btn cart-qty-minus" data-i="${i}">−</button>
            <span class="cart-qty-num" id="qty${i}">${item.qty || 1}</span>
            <button class="cart-qty-btn cart-qty-plus" data-i="${i}">+</button>
          </div>
          <div class="cart-item-right">
            <span class="cart-item-price" id="price${i}">${formatPrice(parsePrice(item.price) * (item.qty || 1))}</span>
            <button class="cart-item-remove" data-i="${i}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  }).join('');

  updateCartTotal(cart);

  document.querySelectorAll('.cart-qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const cart = getCart();
      const i = +btn.dataset.i;
      if (cart[i].qty > 1) { cart[i].qty--; saveCart(cart); }
    });
  });
  document.querySelectorAll('.cart-qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const cart = getCart();
      const i = +btn.dataset.i;
      if ((cart[i].qty || 1) < 10) { cart[i].qty = (cart[i].qty || 1) + 1; saveCart(cart); }
    });
  });
  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const cart = getCart();
      const i = +btn.dataset.i;
      cart.splice(i, 1);
      saveCart(cart);
    });
  });
}

function updateCartTotal(cart) {
  const subtotal = cart.reduce((sum, item) => sum + parsePrice(item.price) * (item.qty || 1), 0);
  const shipping = cart.length > 0 ? 15000 : 0;
  const total = subtotal + shipping;
  const el = (id) => document.getElementById(id);
  if (el('cartSubtotal')) el('cartSubtotal').textContent = formatPrice(subtotal);
  if (el('cartShipping')) el('cartShipping').textContent = shipping === 0 ? 'Gratis' : formatPrice(shipping);
  if (el('cartTotal')) el('cartTotal').textContent = formatPrice(total);
  if (el('cartItemCount')) el('cartItemCount').textContent = cart.reduce((a, b) => a + (b.qty || 1), 0) + ' item';
}

// Demo cart - seed hanya kalau URL ada ?demo=true
function seedDemoCart() {
  const urlParams = new URLSearchParams(window.location.search);
  const shouldSeed = urlParams.get('demo') === 'true' || localStorage.getItem('gf_demo_mode') === 'true';
  if (!shouldSeed) return;

  const existing = getCart();
  if (existing.length === 0) {
    const demo = [
      { id: 'demo_blazer', name: 'Cream Blazer Oversize', brand: 'Zara', emoji: '🧥', img: 'https://i.pinimg.com/736x/92/56/90/92569033684352512f1551d915fa6724.jpg', size: 'M', condition: 'Seperti Baru', price: 'Rp 120.000', qty: 1 },
      { id: 'demo_dress', name: 'Floral Midi Dress', brand: 'H&M', emoji: '👗', img: 'https://i.pinimg.com/736x/c3/03/b5/c303b5ebe83835ef253b8acf76261c6b.jpg', size: 'S', condition: 'Sangat Baik', price: 'Rp 85.000', qty: 1 },
      { id: 'demo_bag', name: 'Mini Shoulder Bag', brand: 'Gucci Archive', emoji: '👜', img: 'https://i.pinimg.com/736x/ab/d5/85/abd5853b05d4fb35293e72d868cc863c.jpg', condition: 'Sangat Baik', price: 'Rp 280.000', qty: 1 }
    ];
    setCart(demo);
  }
}

seedDemoCart();
renderCart();

// Checkout button
const checkoutBtn = document.querySelector('.cart-summary-actions a.btn-primary');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', (e) => {
    const cart = getCart();
    if (cart.length === 0) {
      e.preventDefault();
      showToast('⚠️ Keranjang belanja kosong!');
      return;
    }
    if (typeof gfGetSession === 'function' && !gfGetSession()) {
      e.preventDefault();
      showToast('⚠️ Silakan login terlebih dahulu!');
      setTimeout(() => window.location.href = 'login.html', 1500);
    }
  });
}

// Promo code
const promoForm = document.getElementById('promoForm');
if (promoForm) {
  promoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = document.getElementById('promoInput').value.toUpperCase();
    const valid = { 'GOODFINDS10': 10, 'THRIFT20': 20, 'ECO15': 15 };
    if (valid[code]) {
      showToast(`🎉 Kode promo ${code} aktif! Diskon ${valid[code]}%`);
    } else {
      showToast('❌ Kode promo tidak valid atau sudah kadaluarsa');
    }
  });
}