const cart = JSON.parse(localStorage.getItem('gf_cart') || '[]');

// Guard: redirect jika cart kosong atau belum login
if (cart.length === 0) {
  window.location.href = 'cart.html';
}
const _paySession = gfGetSession();
if (!_paySession) {
  window.location.href = 'login.html';
}

function parsePrice(str) {
  return parseInt((str || 'Rp 0').replace(/[^0-9]/g, '')) || 0;
}
function fmt(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

const subtotal = cart.reduce((sum, item) => sum + parsePrice(item.price) * (item.qty || 1), 0);
let shippingCost = 15000;
let total = subtotal + shippingCost;

// Render order items dari localStorage jika ada
const orderItemList = document.getElementById('orderItemList');
if (orderItemList && cart.length > 0) {
  orderItemList.innerHTML = cart.map(item => `
    <div class="order-item">
      <div class="order-item-img">${item.img ? `<img src="${item.img}" alt="${item.name}" class="order-item-img-tag">` : (item.emoji || '🛍')}</div>
      <div style="flex:1;min-width:0">
        <div class="order-item-name">${item.name}</div>
        <div class="order-item-meta">${item.brand || ''}${item.size ? ' · Size ' + item.size : ''}</div>
      </div>
      <div class="order-item-price">${fmt(parsePrice(item.price) * (item.qty || 1))}</div>
    </div>
  `).join('');
}

// Update totals
function updateTotals() {
  total = subtotal + shippingCost;
  const el = id => document.getElementById(id);
  if (el('paySub'))   el('paySub').textContent   = fmt(subtotal);
  if (el('payShip'))  el('payShip').textContent  = shippingCost === 0 ? 'Gratis' : fmt(shippingCost);
  if (el('payTotal')) el('payTotal').textContent = fmt(total);
  if (el('payTotal2')) el('payTotal2').textContent = fmt(total);
}
updateTotals();

// SHIPPING SELECTION
document.querySelectorAll('.shipping-option').forEach(label => {
  label.addEventListener('click', () => {
    document.querySelectorAll('.shipping-option').forEach(l => l.classList.remove('selected'));
    label.classList.add('selected');

    const val = label.querySelector('input').value;
    if (val === 'express') shippingCost = 25000;
    else if (val === 'pickup') shippingCost = 0;
    else shippingCost = 15000;

    updateTotals();
  });
});

// variabel bantuan untuk melacak e-wallet pilihan user
let selectedEWallet = "";

// PAYMENT METHOD SELECTION
document.querySelectorAll('.pay-method-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.pay-method-card').forEach(c => {
      c.classList.remove('selected');
      const r = c.querySelector('input[type="radio"]');
      if (r) r.checked = false;
    });
    card.classList.add('selected');
    const radio = card.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;

    const method = card.dataset.method;
    const detail = document.getElementById('payMethodDetail');
    if (!detail) return;

    if (method === 'transfer') {
      detail.style.display = 'block';
      detail.innerHTML = `
        <div class="pay-bank-info">
          <div class="pay-bank-row">
            <span>Bank BCA</span>
            <strong>1234567890</strong>
            <button type="button" onclick="navigator.clipboard?.writeText('1234567890');showToast('✓ Nomor rekening disalin!')">Salin</button>
          </div>
          <div class="pay-bank-row">
            <span>a/n</span>
            <strong>PT GoodFinds Indonesia</strong>
          </div>
          <div class="pay-bank-row">
            <span>Jumlah Transfer</span>
            <strong>${fmt(total)}</strong>
          </div>
        </div>`;
    } else if (method === 'ewallet') {
      detail.style.display = 'block';
      detail.innerHTML = `
        <p style="color:var(--text-muted);font-size:14px;margin-bottom:12px;">
          Pilih e-wallet untuk melanjutkan. Kamu akan diarahkan ke halaman e-wallet setelah klik konfirmasi.
        </p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;" id="ewalletBtnContainer">
          <button type="button" class="btn btn-outline btn-sm wallet-opt-btn" data-wallet="GoPay">GoPay</button>
          <button type="button" class="btn btn-outline btn-sm wallet-opt-btn" data-wallet="OVO">OVO</button>
          <button type="button" class="btn btn-outline btn-sm wallet-opt-btn" data-wallet="Dana">Dana</button>
          <button type="button" class="btn btn-outline btn-sm wallet-opt-btn" data-wallet="ShopeePay">ShopeePay</button>
        </div>`;
        
      // Ambil tombol yang baru di-render dan pasang logika klik khusus
      document.querySelectorAll('.wallet-opt-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
          // KUNCI 1: Hentikan event pembubblan ke kontainer card induk
          event.stopPropagation();
          
          // Bersihkan style aktif dari tombol e-wallet lain
          document.querySelectorAll('.wallet-opt-btn').forEach(b => {
            b.style.backgroundColor = '';
            b.style.color = '';
            b.style.borderColor = '';
          });
          
          // Tandai tombol e-wallet yang dipilih aktif
          btn.style.backgroundColor = 'var(--pink-light, #FFE8EE)';
          btn.style.color = 'var(--pink-mid, #E8849A)';
          btn.style.borderColor = 'var(--pink-mid, #E8849A)';
          
          selectedEWallet = btn.dataset.wallet;
          showToast(`✓ Pilih ${selectedEWallet}`);
        });
      });
    } else {
      detail.style.display = 'block';
      detail.innerHTML = `
        <p style="color:var(--text-muted);font-size:14px;">
          Bayar langsung saat paket tiba di tanganmu. Pastikan kamu ada di tempat saat pengiriman.
        </p>`;
    }
  });
});

// FORM SUBMIT
const payForm = document.getElementById('paymentForm');
if (payForm) {
  payForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Pastikan keranjang tidak kosong
    const currentCart = JSON.parse(localStorage.getItem('gf_cart') || '[]');
    if (currentCart.length === 0) {
      showToast('⚠️ Keranjang belanja kosong!');
      setTimeout(() => window.location.href = 'cart.html', 1500);
      return;
    }

    // Validate required fields
    const required = payForm.querySelectorAll('[required]');
    let valid = true;
    required.forEach(el => {
      if (!el.value.trim()) {
        el.style.borderColor = '#E8849A';
        el.style.boxShadow = '0 0 0 3px rgba(232,132,154,.15)';
        valid = false;
      } else {
        el.style.borderColor = '';
        el.style.boxShadow = '';
      }
    });

    const paymentMethodCard = document.querySelector('.pay-method-card.selected');
    if (!paymentMethodCard) {
      showToast('⚠️ Pilih metode pembayaran terlebih dahulu');
      return;
    }
    
    if (!valid) {
      showToast('⚠️ Lengkapi semua data pengiriman');
      return;
    }

    // Validasi khusus E-Wallet wajib memilih jenis penyedia (GoPay, OVO, dll)
    const methodType = paymentMethodCard.dataset.method;
    if (methodType === 'ewallet' && !selectedEWallet) {
      showToast('⚠️ Pilih salah satu opsi E-Wallet terlebih dahulu');
      return;
    }

    // Tentukan nama metode yang tertulis di histori pesanan
    let paymentMethodName = paymentMethodCard.querySelector('.payment-method-name')?.textContent || 'Transfer';
    if (methodType === 'ewallet') {
      paymentMethodName = `E-Wallet (${selectedEWallet})`;
    }

    // 🛡️ Pastikan cart valid dan items terbentuk dengan benar
    console.log('🛒 Current cart:', cart);
    console.log('🛒 Cart length:', cart.length);
    console.log('🛒 Cart items detail:', cart.map(item => ({ name: item.name, brand: item.brand, size: item.size, qty: item.qty })));

    const orderItems = cart.map(item => {
      const brand = item.brand || '';
      const size = item.size ? ' · Size ' + item.size : '';
      const qty = item.qty || 1;
      return {
        emoji: item.emoji || '🛍',
        img: item.img || '',
        name: item.name,
        meta: brand + size + ' · ' + qty + ' item'
      };
    });

    console.log('✅ Mapped orderItems:', orderItems);
    console.log('✅ orderItems type:', typeof orderItems);
    console.log('✅ orderItems isArray:', Array.isArray(orderItems));

    const order = {
      id: '#GF-' + String(Date.now()).slice(-8),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      payment: paymentMethodName,
      total: fmt(total),
      status: 'pending',
      tracking: ['done', '', '', ''], // Pesanan dibuat, belum dikemas, belum dikirim, belum tiba
      items: orderItems  // Pastikan items adalah array yang sudah di-map
    };

    console.log('📦 Order object before save:', order);
    console.log('📦 order.items:', order.items);
    console.log('📦 order.items type:', typeof order.items);
    console.log('📦 order.items isArray:', Array.isArray(order.items));

    // Simpan ke localStorage
    try {
      const history = JSON.parse(localStorage.getItem('gf_orders') || '[]');
      console.log('📚 Existing orders before save:', history.length);
      history.unshift(order);

      // Debug sebelum stringify
      console.log('📚 History setelah unshift:', history);
      console.log('📚 First order items:', history[0].items);
      console.log('📚 First order items type:', typeof history[0].items);

      const historyString = JSON.stringify(history);
      console.log('📚 Stringified length:', historyString.length);
      console.log('📚 Stringified preview:', historyString.substring(0, 500));

      localStorage.setItem('gf_orders', historyString);

      // Debug: simpan ke console untuk verifikasi
      console.log('✅ Order disimpan:', order);
      console.log('✅ Total orders di localStorage:', history.length);

      // Verify: baca kembali untuk memastikan
      const verify = JSON.parse(localStorage.getItem('gf_orders') || '[]');
      console.log('🔍 Verified orders:', verify.length);
      console.log('🔍 First order after save:', verify[0]);
      console.log('🔍 First order items after save:', verify[0]?.items);

      // Bersihkan keranjang setelah order tersimpan
      localStorage.removeItem('gf_cart');

      // Redirect ke halaman sukses
      window.location.href = 'payment-success.html?order=' + order.id;
    } catch (e) {
      console.error('❌ Gagal menyimpan order:', e);
      showToast('❌ Gagal menyimpan pesanan. Silakan coba lagi.');
    }
  });
}