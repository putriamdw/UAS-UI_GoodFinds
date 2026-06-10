// CART STORAGE (memory fallback)
const _memCart = { data: [] };

function getCart() {
  try {
    const raw = localStorage.getItem('gf_cart');
    if (raw) {
      const parsed = JSON.parse(raw);
      _memCart.data = parsed;
      return parsed;
    }
  } catch(e) {}
  return _memCart.data;
}

function setCart(cart) {
  _memCart.data = cart;
  try { localStorage.setItem('gf_cart', JSON.stringify(cart)); } catch(e) {}
}

// NAVBAR HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');

if (hamburger && mobileDrawer) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileDrawer.classList.toggle('open');
  });
  mobileDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileDrawer.classList.remove('open');
    });
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileDrawer.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileDrawer.classList.remove('open');
    }
  });
}

// CART COUNT
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((a, b) => a + (b.qty || 1), 0);
  document.querySelectorAll('.navbar-cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}
updateCartCount();

if (typeof gfUpdateNavbar === 'function') gfUpdateNavbar();

// ADD TO CART
function addToCart(product) {
  if (!product.id) { showToast('⚠️ Error: Produk tidak valid'); return; }
  if (!product.name) { showToast('⚠️ Error: Nama produk kosong'); return; }

  const cart = getCart(); // getCart(), bukan localStorage langsung

  const idx = cart.findIndex(p => p.id === product.id);
  if (idx > -1) {
    const newQty = (cart[idx].qty || 1) + (parseInt(product.qty) || 1);
    if (newQty > 10) { showToast('⚠️ Maksimum 10 item per produk!'); return; }
    cart[idx].qty = newQty;
    setCart(cart); // setCart(), bukan localStorage langsung
    updateCartCount();
    showToast(`✅ ${product.name} qty naik jadi ${newQty}!`);
    return;
  }

  const qty = parseInt(product.qty) || 1;

  // Normalisasi price — tahan integer maupun string
  let price = product.price;
  if (typeof price === 'number') {
    price = 'Rp ' + price.toLocaleString('id-ID');
  } else if (!price) {
    price = 'Rp 0';
  }

  const newProduct = {
    id: product.id,
    name: product.name,
    brand: product.brand || '',
    price: price,
    img: product.img || '',
    emoji: product.emoji || '🛍',
    size: product.size || null,
    condition: product.condition || null,
    qty: qty
  };

  cart.push(newProduct);
  setCart(cart); // setCart(), bukan localStorage langsung
  updateCartCount();
  showToast(`✅ ${product.name} ditambahkan ke keranjang!`);
}

// TOAST
function showToast(msg, duration = 3000) {
  let toast = document.getElementById('gf-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'gf-toast';
    toast.style.cssText = `
      position:fixed; bottom:28px; right:28px; z-index:9999;
      background:#2D2D2D; color:#fff; padding:14px 22px;
      border-radius:999px; font-size:14px; font-weight:500;
      box-shadow:0 8px 32px rgba(0,0,0,0.2);
      transform:translateY(80px); opacity:0;
      transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  clearTimeout(toast._t1);
  clearTimeout(toast._t2);
  setTimeout(() => { toast.style.transform = 'translateY(0)'; toast.style.opacity = '1'; }, 10);
  toast._t2 = setTimeout(() => { toast.style.transform = 'translateY(80px)'; toast.style.opacity = '0'; }, duration);
}

// WISHLIST
document.querySelectorAll('.product-card-wishlist').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '❤️' : '🤍';
  });
});