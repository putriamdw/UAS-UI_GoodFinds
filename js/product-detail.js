// Image gallery thumbnails
document.querySelectorAll('.product-gallery-thumb').forEach((thumb, i) => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.product-gallery-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    const main = document.querySelector('.product-gallery-main');
    const mainImg = document.querySelector('.product-gallery-main-img');
    const thumbImg = thumb.querySelector('img');
    if (main && thumbImg) {
      main.style.opacity = '0';
      setTimeout(() => {
        if (mainImg) { mainImg.src = thumbImg.src; mainImg.alt = thumbImg.alt; }
        main.style.opacity = '1';
      }, 150);
      main.style.transition = 'opacity 0.15s';
    }
  });
});

// Tabs
document.querySelectorAll('.product-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.product-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.product-tab-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// Qty control
const qtyVal = document.getElementById('qtyValue');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
if (qtyVal && qtyMinus && qtyPlus) {
  qtyMinus.addEventListener('click', () => {
    const v = parseInt(qtyVal.value);
    if (v > 1) qtyVal.value = v - 1;
  });
  qtyPlus.addEventListener('click', () => {
    const v = parseInt(qtyVal.value);
    if (v < 10) qtyVal.value = v + 1;
  });
}

// Size selector
document.querySelectorAll('.size-option').forEach(opt => {
  if (opt.classList.contains('sold-out')) return;
  opt.addEventListener('click', () => {
    document.querySelectorAll('.size-option').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
  });
});

// Add to cart (main product)
const addCartBtn = document.getElementById('addToCartBtn');
if (addCartBtn) {
  addCartBtn.addEventListener('click', () => {
    const size = document.querySelector('.size-option.active')?.textContent?.trim();
    if (!size) { showToast('⚠️ Pilih ukuran terlebih dahulu!'); return; }

    const qty = parseInt(qtyVal?.value || '1');
    const brand = document.querySelector('.product-brand')?.textContent?.trim() || '';
    const name = document.querySelector('.product-name')?.textContent?.trim() || 'Produk';
    const price = document.querySelector('.product-price')?.textContent?.trim() || 'Rp 0';
    const img = document.querySelector('.product-gallery-main-img')?.src || '';
    const id = 'prod_' + (brand + '_' + name + (size ? '_' + size : '')).toLowerCase().replace(/[^a-z0-9]/g, '_');

    addToCart({ id, name, brand, price, img, size, qty });

    addCartBtn.textContent = '✓ Ditambahkan!';
    addCartBtn.style.background = 'linear-gradient(135deg, #6BCB77, #4CAF50)';
    setTimeout(() => {
      addCartBtn.textContent = '+ Masukkan Keranjang';
      addCartBtn.style.background = '';
    }, 2500);
  });
}

// Wishlist toggle (main product)
const wishlistBtn = document.getElementById('wishlistBtn');
if (wishlistBtn) {
  wishlistBtn.addEventListener('click', () => {
    wishlistBtn.classList.toggle('active');
    wishlistBtn.textContent = wishlistBtn.classList.contains('active') ? '❤️' : '🤍';
    showToast(wishlistBtn.classList.contains('active') ? '❤️ Disimpan ke wishlist!' : '🤍 Dihapus dari wishlist');
  });
}

// RELATED PRODUCTS
// Add to cart untuk item terkait
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.product-card-add');
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  const card = btn.closest('.product-card');
  if (!card) return;

  const brand = card.querySelector('.product-card-brand')?.textContent?.trim() || '';
  const name = card.querySelector('.product-card-name')?.textContent?.trim() || 'Produk';
  const img = card.querySelector('.product-card-img-tag')?.src || '';
  const size = card.getAttribute('data-size') || '';
  const priceRaw = parseInt(card.getAttribute('data-price') || '0');
  const price = 'Rp ' + priceRaw.toLocaleString('id-ID');
  const id = 'prod_' + (brand + '_' + name + (size ? '_' + size : '')).toLowerCase().replace(/[^a-z0-9]/g, '_');

  addToCart({ id, name, brand, price, img, size });

  const originalText = btn.textContent;
  btn.textContent = '✓ Ditambahkan';
  btn.style.background = 'var(--pink-mid)';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.style.color = '';
  }, 2000);
});

// Wishlist toggle untuk related cards
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.product-card-wishlist');
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  const isWished = btn.textContent === '🩷';
  btn.textContent = isWished ? '🤍' : '🩷';
  showToast(isWished ? '🤍 Dihapus dari Wishlist' : '🩷 Ditambahkan ke Wishlist');
});

// Klik card related ke product detail
document.addEventListener('click', (e) => {
  const card = e.target.closest('.product-card');
  if (!card) return;
  if (e.target.closest('.product-card-add') || e.target.closest('.product-card-wishlist')) return;
  window.location.href = 'product-detail.html';
});