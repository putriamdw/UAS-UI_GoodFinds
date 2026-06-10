// Modal helpers
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  });
});
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

// Active nav link highlight (otomatis berdasarkan URL)
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.admin-nav-link').forEach(link => {
  // Hapus active lama yang mungkin tertinggal, lalu set ulang dari URL
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  } else if (currentPage === '' && link.getAttribute('href') === 'dashboard.html') {
    link.classList.add('active');
  }
});

// Table search filter
const searchInput = document.getElementById('tableSearch');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    document.querySelectorAll('.data-table tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// Delete confirmation
document.querySelectorAll('.table-btn-delete').forEach(btn => {
  btn.addEventListener('click', () => {
    if (confirm('Yakin ingin menghapus item ini?')) {
      const row = btn.closest('tr');
      if (row) {
        row.style.transition = 'all 0.3s';
        row.style.opacity = '0';
        row.style.transform = 'translateX(20px)';
        setTimeout(() => row.remove(), 300);
        showToast('🗑 Item berhasil dihapus');
      }
    }
  });
});

// Stats counter animation (satu tempat, tidak perlu diulang di dashboard.html)
document.querySelectorAll('.stat-counter').forEach(el => {
  const target = parseInt(el.dataset.target || '0');
  if (!target) return;
  let current = 0;
  const step = Math.ceil(target / 60);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString('id-ID');
    if (current >= target) clearInterval(interval);
  }, 16);
});