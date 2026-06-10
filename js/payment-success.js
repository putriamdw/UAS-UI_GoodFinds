// BACA ORDER DARI LOCALSTORAGE
const params = new URLSearchParams(window.location.search);
const orderId = params.get('order');
const savedOrders = JSON.parse(localStorage.getItem('gf_orders') || '[]');
const order = orderId ? savedOrders.find(o => o.id === orderId) : savedOrders[0];

// Helper
function parsePrice(str) {
  return parseInt((str || 'Rp 0').replace(/[^0-9]/g, '')) || 0;
}

// Hitung estimasi tiba (+2 dan +4 hari dari tanggal order)
function getETA(dateStr) {
  try {
    const parts = dateStr.split(' ');
    const bulanMap = {
      'Januari':0,'Februari':1,'Maret':2,'April':3,'Mei':4,'Juni':5,
      'Juli':6,'Agustus':7,'September':8,'Oktober':9,'November':10,'Desember':11
    };
    const d = new Date(parseInt(parts[2]), bulanMap[parts[1]], parseInt(parts[0]));
    const d1 = new Date(d); d1.setDate(d.getDate() + 2);
    const d2 = new Date(d); d2.setDate(d.getDate() + 4);
    const day1 = d1.getDate();
    const day2 = d2.getDate();
    const month = d2.toLocaleDateString('id-ID', { month: 'long' });
    const year = d2.getFullYear();
    return `${day1}–${day2} ${month} ${year}`;
  } catch(e) {
    return '2–4 hari kerja';
  }
}

// ISI DATA ORDER
if (order) {
  const orderIdEl = document.getElementById('successOrderId');
  if (orderIdEl) orderIdEl.textContent = order.id;

  const dateEl = document.getElementById('successDate');
  if (dateEl) dateEl.textContent = order.date;

  const totalEl = document.getElementById('successTotal');
  if (totalEl) totalEl.textContent = order.total;

  const etaEl = document.getElementById('successETA');
  if (etaEl) etaEl.textContent = getETA(order.date);

  // Hitung eco stats dari jumlah item
  const items = Array.isArray(order.items) ? order.items : [];
  const totalQty = items.reduce((sum, item) => sum + (item.qty || 1), 0);
  const waterSaved = Math.round(totalQty * 833);
  const co2Saved = Math.round(totalQty * 3.33);

  const statItems = document.getElementById('statItems');
  const statWater = document.getElementById('statWater');
  const statCo2   = document.getElementById('statCo2');
  if (statItems) statItems.dataset.target = totalQty;
  if (statWater) statWater.dataset.target = waterSaved;
  if (statCo2)   statCo2.dataset.target   = co2Saved;

} else {
  console.warn('⚠️ Order tidak ditemukan, tampil data default');
  const orderIdEl = document.getElementById('successOrderId');
  if (orderIdEl && orderId) orderIdEl.textContent = orderId;
}

// ECO CARD
const ecoCard = document.getElementById('ecoCard');
const messages = [
  { icon: '🌱', text: 'Your thrift choice made a small difference ♡', sub: '1 item rescued, less fashion waste' },
  { icon: '🌿', text: 'A kinder choice for the planet', sub: 'Estimated water saved: 2,500L' },
  { icon: '🍃', text: 'Thanks for thrifting, not buying new', sub: 'CO₂ saved: ~3.6 kg this purchase' },
];
const msg = messages[Math.floor(Math.random() * messages.length)];

if (ecoCard) {
  const iconEl = ecoCard.querySelector('.eco-icon');
  const textEl = ecoCard.querySelector('.eco-text');
  const subEl  = ecoCard.querySelector('.eco-sub');
  if (iconEl) iconEl.textContent = msg.icon;
  if (textEl) textEl.textContent = msg.text;
  if (subEl)  subEl.textContent  = msg.sub;

  setTimeout(() => {
    ecoCard.style.opacity = '0';
    ecoCard.style.transform = 'translateY(20px) scale(0.95)';
    ecoCard.style.transition = 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)';
    ecoCard.style.display = 'flex';
    setTimeout(() => {
      ecoCard.style.opacity = '1';
      ecoCard.style.transform = 'translateY(0) scale(1)';
    }, 50);
  }, 800);

  function spawnLeaf() {
    const container = document.getElementById('leafContainer');
    if (!container) return;
    const leaf = document.createElement('div');
    leaf.className = 'leaf-particle';
    leaf.textContent = ['🍃', '🌿', '🌱', '✨'][Math.floor(Math.random() * 4)];
    leaf.style.cssText = `
      position:absolute; font-size:${14 + Math.random() * 12}px;
      left:${Math.random() * 100}%; bottom:0;
      animation: leafFloat ${2 + Math.random() * 2}s ease-out forwards;
      pointer-events:none;
    `;
    container.appendChild(leaf);
    setTimeout(() => leaf.remove(), 4000);
  }
  for (let i = 0; i < 12; i++) {
    setTimeout(spawnLeaf, 900 + i * 180);
  }
}

// COUNTER ANIMASI
// Dijalankan SETELAH data-target diupdate dari order
document.querySelectorAll('.stat-counter').forEach(el => {
  const target = parseInt(el.dataset.target || '0');
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 60));
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString('id-ID');
    if (current >= target) clearInterval(interval);
  }, 25);
});

// CLEAR CART COUNT
document.querySelectorAll('.navbar-cart-count').forEach(el => {
  el.textContent = '0';
  el.style.display = 'none';
});