// COUNTDOWN TIMER
function getNextFridayDrop() {
  const now = new Date();
  const target = new Date(now);
  target.setHours(19, 0, 0, 0);
  const day = now.getDay();
  const daysUntilFriday = (5 - day + 7) % 7 || 7;
  target.setDate(now.getDate() + daysUntilFriday);
  if (target <= now) target.setDate(target.getDate() + 7);
  return target;
}

let dropTarget = getNextFridayDrop();
let dropLive = false;

function updateCountdown() {
  const now = new Date();
  let diff = dropTarget - now;

  if (diff <= 0 && !dropLive) {
    dropLive = true;
    triggerLiveDrop();
    dropTarget = getNextFridayDrop();
    return;
  }

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const pad = n => String(n).padStart(2, '0');
  const hoursEl = document.getElementById('dropHours');
  const minsEl = document.getElementById('dropMins');
  const secsEl = document.getElementById('dropSecs');
  if (hoursEl) hoursEl.textContent = pad(h);
  if (minsEl) minsEl.textContent = pad(m);
  if (secsEl) {
    const old = secsEl.textContent;
    if (old !== pad(s)) {
      secsEl.style.transform = 'scale(1.12)';
      secsEl.style.transition = 'transform 0.12s';
      setTimeout(() => { secsEl.style.transform = 'scale(1)'; }, 120);
    }
    secsEl.textContent = pad(s);
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// NOTIFY BUTTON
const notifyBtn = document.getElementById('notifyBtn');
if (notifyBtn) {
  notifyBtn.addEventListener('click', () => {
    if (notifyBtn.classList.contains('notified')) return;
    notifyBtn.classList.add('notified');
    notifyBtn.textContent = '✓ Notifikasi Aktif!';
    showToast('🔔 Kamu akan diingatkan sebelum drop dimulai!');
  });
}

// LIVE DROP TRIGGER
function triggerLiveDrop() {
  const toast = document.getElementById('liveDropToast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
  }
  launchConfetti();
}

// CONFETTI
function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;
  const colors = ['#F2A7BB', '#E8849A', '#D4AF37', '#C9A84C', '#FFF5F7', '#FFE0E8', '#fff'];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = (6 + Math.random() * 8) + 'px';
      piece.style.height = (6 + Math.random() * 8) + 'px';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.animationDuration = (2 + Math.random() * 2.5) + 's';
      piece.style.animationDelay = Math.random() * 1.2 + 's';
      container.appendChild(piece);
      setTimeout(() => piece.remove(), 5000);
    }, i * 20);
  }
}

setTimeout(() => {
  const toast = document.getElementById('liveDropToast');
  if (!sessionStorage.getItem('gf_drop_shown')) {
    sessionStorage.setItem('gf_drop_shown', '1');
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }
    launchConfetti();
  }
}, 3000);

// ADD TO CART (landing page)
document.addEventListener('DOMContentLoaded', () => {
  // Data produk — price WAJIB string "Rp xxx" agar cart.js bisa parsePrice()
  const productData = [
    { id: 'cream-blazer', name: 'Cream Blazer Oversize', brand: 'Zara', price: 'Rp 120.000', img: 'https://i.pinimg.com/736x/92/56/90/92569033684352512f1551d915fa6724.jpg' },
    { id: 'floral-dress', name: 'Floral Midi Dress', brand: 'H&M', price: 'Rp 85.000', img: 'https://i.pinimg.com/736x/c3/03/b5/c303b5ebe83835ef253b8acf76261c6b.jpg' },
    { id: 'mini-bag', name: 'Mini Shoulder Bag', brand: 'Gucci Archive', price: 'Rp 280.000', img: 'https://i.pinimg.com/736x/ab/d5/85/abd5853b05d4fb35293e72d868cc863c.jpg' },
    { id: 'air-max', name: 'Air Max 90 Retro', brand: 'Nike Vintage', price: 'Rp 195.000', img: 'https://i.pinimg.com/736x/73/b6/db/73b6db2ff99bca9f800d106ced337f3b.jpg' },
  ];

  document.querySelectorAll('.product-card-add').forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const product = productData[i];
      if (!product) return;
      // Pakai addToCart dari main.js
      if (typeof addToCart === 'function') addToCart(product);

      btn.textContent = '✓ Ditambahkan!';
      btn.style.background = 'var(--pink-mid)';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = '+ Keranjang';
        btn.style.background = '';
        btn.style.color = '';
      }, 1500);
    });
  });

  document.querySelectorAll('.product-card-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isWished = btn.textContent === '🩷';
      btn.textContent = isWished ? '🤍' : '🩷';
    });
  });
});