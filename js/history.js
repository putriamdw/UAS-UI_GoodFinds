const container = document.getElementById('ordersList');
const emptyState = document.getElementById('historyEmpty');

const statusLabel = {
  pending:   { text: '⏳ Menunggu Konfirmasi', badge: 'badge-gold' },
  paid:      { text: '✅ Dibayar', badge: 'badge-green' },
  shipping:  { text: '🚚 Dikirim', badge: 'badge-pink' },
  done:      { text: '✓ Selesai', badge: 'badge-green' },
  cancelled: { text: '✕ Dibatalkan', badge: 'badge-gray' },
};

// Data pesanan — merge dari localStorage + dummy
let savedOrders = [];
try {
  savedOrders = JSON.parse(localStorage.getItem('gf_orders') || '[]');
  console.log('✅ Saved Orders dari localStorage:', savedOrders);
  console.log('✅ Jumlah savedOrders:', savedOrders.length);
} catch (e) {
  console.error('❌ Gagal membaca orders dari localStorage:', e);
}

const dummyOrders = [
  {
    id: '#GF-2026-04821',
    date: '21 Mei 2026',
    payment: 'Transfer BCA',
    status: 'done',
    tracking: ['done', 'done', 'done', 'done'],
    items: [
      { emoji: '🧥', name: 'Cream Blazer Oversize', img: 'https://i.pinimg.com/736x/92/56/90/92569033684352512f1551d915fa6724.jpg', meta: 'Zara · Size M · 1 item' },
      { emoji: '👗', name: 'Floral Midi Dress', img: 'https://i.pinimg.com/736x/c3/03/b5/c303b5ebe83835ef253b8acf76261c6b.jpg', meta: 'H&M · Size S · 1 item' },
      { emoji: '👜', name: 'Mini Shoulder Bag', img: 'https://i.pinimg.com/736x/ab/d5/85/abd5853b05d4fb35293e72d868cc863c.jpg', meta: 'Gucci Archive · 1 item' },
    ],
    total: 'Rp 485.000',
  },
  {
    id: '#GF-2026-04580',
    date: '18 Mei 2026',
    payment: 'GoPay',
    status: 'shipping',
    tracking: ['done', 'done', 'active', ''],
    items: [
      { emoji: '👟', name: 'Air Max 90 Retro', img: 'https://i.pinimg.com/736x/73/b6/db/73b6db2ff99bca9f800d106ced337f3b.jpg', meta: 'Nike Vintage · Size 39 · 1 item' },
    ],
    total: 'Rp 210.000',
  },
  {
    id: '#GF-2026-04312',
    date: '15 Mei 2026',
    payment: 'Transfer BNI',
    status: 'pending',
    tracking: ['done', '', '', ''],
    items: [
      { emoji: '👔', name: 'Flannel Shirt Oversized Grey', img: 'https://i.pinimg.com/1200x/4f/a9/53/4fa953837f57484700f43c53fec82ff3.jpg', meta: 'Uniqlo · Size M · 1 item' },
      { emoji: '🩱', name: 'Knit Crop Top Sage Green', img: 'https://i.pinimg.com/1200x/8b/f3/25/8bf325444a9fd9d8a2d99dc2c38cd95d.jpg', meta: 'Stradivarius · Size S · 1 item' },
    ],
    total: 'Rp 150.000',
  },
  {
    id: '#GF-2026-03841',
    date: '3 Mei 2026',
    payment: 'OVO',
    status: 'done',
    tracking: ['done', 'done', 'done', 'done'],
    items: [
      { emoji: '🎀', name: 'Satin Hair Bow Set', img: 'https://i.pinimg.com/736x/99/ad/cf/99adcf7e24925ca822dfc977f7f1fa2a.jpg', meta: 'Vintage Acc · 2 item' },
      { emoji: '💍', name: 'Gold Chain Necklace Set', img: 'https://i.pinimg.com/1200x/10/2c/4d/102c4d60854b0604923c0d44f30413a4.jpg', meta: 'Vintage Acc · 1 item' },
    ],
    total: 'Rp 2.550.000',
  },
];

// Buat allOrders sebagai array yang bisa di-update
let allOrders = [];

// Fungsi untuk me-refresh allOrders dari savedOrders
function refreshAllOrders() {
  // Re-read savedOrders dari localStorage untuk memastikan data terbaru
  try {
    savedOrders = JSON.parse(localStorage.getItem('gf_orders') || '[]');
    allOrders = [...savedOrders, ...dummyOrders];
    console.log('🔄 AllOrders refreshed, total:', allOrders.length);
    console.log('🔄 savedOrders:', savedOrders.length, 'dummyOrders:', dummyOrders.length);
  } catch (e) {
    console.error('❌ Gagal me-refresh orders:', e);
  }
}

// Initial load
refreshAllOrders();

// Render tracking bar (untuk status shipping dan done)
function renderTracking(steps) {
  if (!steps) return '';
  const labels = ['Pesanan', 'Dikemas', 'Dikirim', 'Tiba'];
  const icons  = ['✓', '📦', '🚚', '🏠'];
  return `
    <div class="history-tracking">
      ${steps.map((st, i) => `
        <div class="tracking-step${st ? ' ' + st : ''}">
          <div class="tracking-dot${st ? ' ' + st : ''}">${icons[i]}</div>
          <div class="tracking-label">${labels[i]}</div>
        </div>
      `).join('')}
    </div>`;
}

// Render action buttons per status
function renderActions(order, index) {
  if (order.status === 'done') {
    return `
      <button class="btn btn-outline btn-sm" onclick="buyAgain('${order.id}')">Beli Lagi</button>
      <button class="btn btn-primary btn-sm" onclick="openReview('${order.id}')">Beri Ulasan</button>`;
  }
  if (order.status === 'shipping') {
    return `<button class="btn btn-outline btn-sm" onclick="trackOrder('${order.id}')">Lacak Paket</button>`;
  }
  if (order.status === 'pending') {
    return `<button class="btn btn-ghost btn-sm" onclick="cancelOrder('${order.id}')">Batalkan</button>`;
  }
  return '';
}

// Render semua kartu order
function renderOrders(list) {
  if (!container) {
    console.error('❌ Container ordersList tidak ditemukan!');
    return;
  }

  console.log('🔄 Rendering orders, list length:', list.length);

  if (list.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'flex';
    console.log('⚠️ Tidak ada orders, menampilkan empty state');
    return;
  }
  if (emptyState) emptyState.style.display = 'none';

  console.log('✅ Menampilkan', list.length, 'orders');

  container.innerHTML = list.map((order, index) => {
    const st = statusLabel[order.status] || statusLabel.pending;

    // 🛡️ SAFETY: Pastikan items selalu array
    let items = order.items || [];
    // Jika items adalah string, coba parse
    if (typeof items === 'string') {
      try {
        items = JSON.parse(items);
      } catch (e) {
        console.warn('⚠️ Gagal parse items sebagai JSON:', items);
        items = [];
      }
    }
    // Jika masih bukan array, buat array kosong
    if (!Array.isArray(items)) {
      console.warn('⚠️ items bukan array:', items, 'orderId:', order.id);
      items = [];
    }

    // Debug: log each item to see if img exists
    items.forEach(item => console.log('🖼️ Item:', item.name, 'has img:', !!item.img, 'img value:', item.img?.substring(0, 50)));

    const itemsHTML = items.map(item => {
      // Debug log
      console.log('Rendering item:', item.name, 'img exists:', !!item.img, 'img:', item.img);

      return `
      <div class="history-item-row-group">
        <div class="history-item-thumb">${item.img && item.img.length > 0 ? `<img src="${item.img}" alt="${item.name}" class="history-item-thumb-tag">` : (item.emoji || '🛍')}</div>
        <div class="history-item-info">
          <div class="history-item-name">${item.name}</div>
          <div class="history-item-meta">${item.meta || ''}</div>
        </div>
      </div>`;
    }).join('');

    return `
    <div class="history-card" data-status="${order.status}">
      <div class="history-card-header">
        <div>
          <div class="history-order-id">${order.id}</div>
          <div class="history-order-date">${order.date}${order.payment ? ' &nbsp;·&nbsp; ' + order.payment : ''}</div>
        </div>
        <span class="badge ${st.badge}">${st.text}</span>
      </div>
      <div class="history-card-body">
        ${renderTracking(order.tracking)}
        <div class="history-items-row">${itemsHTML}</div>
        <div class="history-card-footer">
          <div>
            <div class="history-total-label">Total Pembayaran</div>
            <div class="history-total-value">${order.total}</div>
          </div>
          <div class="history-actions">${renderActions(order, index)}</div>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ACTIONS
// Beli Lagi - tambahkan item kembali ke keranjang
function buyAgain(orderId) {
  const order = allOrders.find(o => o.id === orderId);
  if (!order || !order.items) {
    showToast('⚠️ Data pesanan tidak ditemukan');
    return;
  }

  // Ambil keranjang saat ini
  const cart = JSON.parse(localStorage.getItem('gf_cart') || '[]');

  // Tambahkan setiap item ke keranjang
  order.items.forEach(item => {
    const existingIndex = cart.findIndex(c => c.name === item.name);
    if (existingIndex >= 0) {
      cart[existingIndex].qty = (cart[existingIndex].qty || 1) + 1;
    } else {
      cart.push({
        name: item.name,
        brand: item.meta?.split('·')[0]?.trim() || '',
        size: item.meta?.match(/Size (\w+)/)?.[1] || '',
        price: 'Rp 0', // Harga tidak tersimpan di riwayat
        emoji: item.emoji || '🛍',
        qty: 1
      });
    }
  });

  // Simpan ke localStorage
  localStorage.setItem('gf_cart', JSON.stringify(cart));

  // Update cart count di navbar
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    cartCount.textContent = total;
    cartCount.style.display = total > 0 ? 'flex' : 'none';
  }

  showToast('♻️ ' + order.items.length + ' item ditambahkan ke keranjang!');

  // Redirect ke keranjang setelah delay
  setTimeout(() => {
    if (confirm('Item ditambahkan ke keranjang. Lanjut ke keranjang belanja?')) {
      window.location.href = 'cart.html';
    }
  }, 500);
}

// Beri Ulasan - buka modal/form ulasan
function openReview(orderId) {
  showToast('⭐ Fitur ulasan akan segera tersedia!');

  // TODO: Implement review modal
  // Bisa dikembangkan dengan modal form ulasan
}

// Lacak Pesanan - tampilkan informasi pelacakan
function trackOrder(orderId) {
  const order = allOrders.find(o => o.id === orderId);
  if (!order) {
    showToast('⚠️ Pesanan tidak ditemukan');
    return;
  }

  // Tampilkan modal tracking
  const trackingInfo = `
    <div style="background:var(--bg-soft);border-radius:var(--radius-md);padding:20px;margin-top:12px;">
      <div style="font-weight:600;margin-bottom:12px;color:var(--text-main);">📦 Informasi Pengiriman</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:14px;">
        <div><span style="color:var(--text-muted);">Nomor Resi:</span><br><strong>JNE-${orderId.slice(1)}</strong></div>
        <div><span style="color:var(--text-muted);">Kurir:</span><br><strong>JNE Express</strong></div>
        <div><span style="color:var(--text-muted);">Estimasi:</span><br><strong>2-3 hari kerja</strong></div>
        <div><span style="color:var(--text-muted);">Status:</span><br><strong style="color:#2E7D32;">Sedang dikirim</strong></div>
      </div>
      <div style="margin-top:16px;text-align:center;">
        <a href="https://www.jne.co.id/id/track/tracking" target="_blank" class="btn btn-outline btn-sm">Lacak di JNE →</a>
      </div>
    </div>
  `;

  // Buat modal tracking
  showTrackingModal(trackingInfo);
}

function showTrackingModal(content) {
  // Buat modal jika belum ada
  let modal = document.getElementById('trackingModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'trackingModal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(45,45,45,0.5);z-index:9999;display:none;align-items:center;justify-content:center;padding:24px;';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div style="background:var(--white);border-radius:20px;padding:32px;max-width:480px;width:100%;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <h3 style="font-family:var(--font-display);font-size:22px;font-weight:600;color:var(--text-main);margin:0;">Lacak Pesanan</h3>
        <button onclick="closeTrackingModal()" style="width:36px;height:36px;border-radius:50%;background:var(--bg-soft);font-size:18px;cursor:pointer;border:none;">✕</button>
      </div>
      ${content}
    </div>
  `;

  modal.style.display = 'flex';
}

function closeTrackingModal() {
  const modal = document.getElementById('trackingModal');
  if (modal) modal.style.display = 'none';
}

// Batalkan Pesanan
function cancelOrder(orderId) {
  // Cari di savedOrders
  const savedIndex = savedOrders.findIndex(o => o.id === orderId);
  const order = savedOrders[savedIndex];

  if (!order) {
    showToast('⚠️ Pesanan tidak ditemukan');
    return;
  }

  if (!confirm(`Apakah Anda yakin ingin membatalkan pesanan ${orderId}?`)) {
    return;
  }

  // Update status order
  order.status = 'cancelled';
  order.tracking = ['cancelled', '', '', ''];

  // Update di savedOrders dan simpan ke localStorage
  if (savedIndex >= 0) {
    savedOrders[savedIndex] = order;
    localStorage.setItem('gf_orders', JSON.stringify(savedOrders));
    // Refresh allOrders untuk sinkronisasi
    refreshAllOrders();
  }

  showToast('✅ Pesanan berhasil dibatalkan');

  // Render ulang dengan filter aktif
  const activeTab = document.querySelector('.history-tab.active');
  if (activeTab) {
    const filter = activeTab.dataset.status;
    const filtered = filter === 'all' ? allOrders : allOrders.filter(o => o.status === filter);
    renderOrders(filtered);
  } else {
    renderOrders(allOrders);
  }
}

// Render awal
console.log('=== HISTORY.JS DEBUG ===');
console.log('Total allOrders (saved + dummy):', allOrders.length);
console.log('savedOrders:', savedOrders.length);
console.log('dummyOrders:', dummyOrders.length);

// Debug: tampilkan detail savedOrders
if (savedOrders.length > 0) {
  console.log('Detail savedOrders:', savedOrders);
  // Cek struktur items
  savedOrders.forEach((o, i) => {
    console.log(`Order ${i} (${o.id}): items type =`, typeof o.items, 'isArray =', Array.isArray(o.items));
    if (typeof o.items === 'string') {
      console.warn(`⚠️ Order ${o.id} items adalah STRING:`, o.items);
    }
  });
} else {
  console.warn('⚠️ Tidak ada savedOrders di localStorage!');
  console.log('LocalStorage content:', localStorage.getItem('gf_orders'));
}

// Debug function - bisa dipanggil dari browser console
window.debugOrderSystem = function() {
  console.log('=== ORDER SYSTEM DEBUG ===');
  const ls = localStorage.getItem('gf_orders');
  console.log('Raw localStorage:', ls);
  const parsed = JSON.parse(ls || '[]');
  console.log('Parsed orders:', parsed);
  console.log('Length:', parsed.length);
  console.log('First order:', parsed[0]);

  // Cek struktur items untuk setiap order
  parsed.forEach((o, i) => {
    console.log(`Order ${i} (${o.id}):`);
    console.log(`  - items type: ${typeof o.items}`);
    console.log(`  - items isArray: ${Array.isArray(o.items)}`);
    console.log(`  - items value:`, o.items);
    if (typeof o.items === 'string') {
      console.error(`❌ Order ${o.id} memiliki items sebagai STRING!`);
    }
  });

  refreshAllOrders();
  renderOrders(allOrders);
  console.log('After refresh - allOrders:', allOrders.length);
  console.log('========================');
};
console.log('💡 Debug function tersedia: ketik debugOrderSystem() di console');

renderOrders(allOrders);

// Filter tabs
document.querySelectorAll('.history-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.history-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.status;
    const filtered = filter === 'all' ? allOrders : allOrders.filter(o => o.status === filter);
    renderOrders(filtered);
  });
});
