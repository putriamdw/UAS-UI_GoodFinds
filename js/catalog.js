// LIVE DROP TOAST
const liveDropToast = document.getElementById('liveDropToast');
if (liveDropToast) {
  setTimeout(() => {
    liveDropToast.style.opacity = '0';
    liveDropToast.style.transform = 'translateX(-50%) translateY(-20px)';
    setTimeout(() => {
      liveDropToast.style.display = 'none';
    }, 600);
  }, 5000);
}

// REALTIME FILTER ENGINE
function applyFilters() {
  const cards = document.querySelectorAll('.product-card');

  const checkedCheckboxes = document.querySelectorAll('.filter-checkbox:checked');
  let selectedCategories = [];
  checkedCheckboxes.forEach(cb => {
    const val = cb.value ? cb.value.trim().toLowerCase() : '';
    if (val && val !== 'all') selectedCategories.push(val);
  });

  const minInput = document.querySelector('.price-range-inputs .price-input[placeholder="Min"]');
  const maxInput = document.querySelector('.price-range-inputs .price-input[placeholder="Max"]');
  const minPrice = minInput && minInput.value !== '' ? parseInt(minInput.value) : 0;
  const maxPrice = maxInput && maxInput.value !== '' ? parseInt(maxInput.value) : Infinity;

  const activeSizeBtn = document.querySelector('.size-btn.active');
  const selectedSize = activeSizeBtn ? activeSizeBtn.textContent.trim().toUpperCase() : null;

  let visibleCount = 0;

  cards.forEach(card => {
    const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();
    const cardPrice = parseInt(card.getAttribute('data-price') || '0');
    const cardSize = (card.getAttribute('data-size') || '').toUpperCase();

    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
    const matchPrice = cardPrice >= minPrice && cardPrice <= maxPrice;
    const matchSize = !selectedSize || cardSize === selectedSize;

    if (matchCategory && matchPrice && matchSize) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const countElement = document.querySelector('.catalog-count strong');
  if (countElement) countElement.textContent = visibleCount;
}

// EVENT LISTENERS

// Checkbox Kategori
document.addEventListener('change', (e) => {
  if (e.target.classList.contains('filter-checkbox')) {
    const value = e.target.value ? e.target.value.trim().toLowerCase() : '';
    const allCheckbox = document.querySelector('.filter-checkbox[value="all"]');
    const checkboxes = document.querySelectorAll('.filter-checkbox');

    if (value === 'all' && e.target.checked) {
      checkboxes.forEach(cb => { if (cb !== e.target) cb.checked = false; });
    } else if (value !== 'all' && e.target.checked) {
      if (allCheckbox) allCheckbox.checked = false;
    }

    const totalChecked = document.querySelectorAll('.filter-checkbox:checked').length;
    if (totalChecked === 0 && allCheckbox) allCheckbox.checked = true;

    applyFilters();
    showToast('🔍 Filter kategori diperbarui');
  }
});

// Tombol Ukuran
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('size-btn')) {
    e.preventDefault();
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      showToast('📏 Filter ukuran dihapus');
    } else {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      showToast(`📏 Ukuran: ${e.target.textContent}`);
    }
    applyFilters();
  }
});

// Terapkan Harga
const applyPriceBtn = document.querySelector('.price-range button');
if (applyPriceBtn) {
  applyPriceBtn.addEventListener('click', (e) => {
    e.preventDefault();
    applyFilters();
    showToast('💰 Filter harga diterapkan');
  });
}

// Reset Filter
const resetFilterBtn = document.querySelector('.catalog-sidebar > .btn-ghost');
if (resetFilterBtn) {
  resetFilterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.filter-checkbox').forEach(cb => {
      cb.checked = (cb.value === 'all');
    });
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    const minInput = document.querySelector('.price-range-inputs .price-input[placeholder="Min"]');
    const maxInput = document.querySelector('.price-range-inputs .price-input[placeholder="Max"]');
    if (minInput) minInput.value = '0';
    if (maxInput) maxInput.value = '3000000';
    applyFilters();
    showToast('🔄 Semua filter direset');
  });
}

// Sorting
const sortSelect = document.querySelector('.sort-select');
if (sortSelect) {
  sortSelect.addEventListener('change', () => {
    const grid = document.querySelector('.catalog-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    const value = sortSelect.value.trim();

    if (value === 'Harga Terendah') {
      cards.sort((a, b) => parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price')));
    } else if (value === 'Harga Tertinggi') {
      cards.sort((a, b) => parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price')));
    }

    cards.forEach(card => grid.appendChild(card));
    showToast(`🔃 Urutan: ${value}`);
  });
}

// ADD TO CART
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

  if (typeof addToCart === 'function') {
    addToCart({ id, name, brand, price, img, size });
  }

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

// WISHLIST TOGGLE
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

// PRODUCT CARD CLICK
document.addEventListener('click', (e) => {
  const card = e.target.closest('.product-card');
  if (!card) return;
  if (e.target.closest('.product-card-add') || e.target.closest('.product-card-wishlist')) return;
  window.location.href = 'product-detail.html';
});