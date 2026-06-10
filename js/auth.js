const GF_AUTH_KEY = 'gf_auth';

// Demo accounts
const DEMO_USERS = [
  { email: 'user1@goodfinds.id',  password: 'user123',  name: 'Chloe Michelle', role: 'user'  },
  { email: 'user2@goodfinds.id',password: 'user123',  name: 'Selene Amara',   role: 'user'  },
  { email: 'admin@goodfinds.id', password: 'admin123', name: 'Admin GoodFinds',role: 'admin' },
];

function gfLogin(email, password) {
  const user = DEMO_USERS.find(u => u.email === email && u.password === password);
  if (!user) return null;
  const session = { email: user.email, name: user.name, role: user.role };
  localStorage.setItem(GF_AUTH_KEY, JSON.stringify(session));
  return session;
}

function gfRegister(firstName, lastName, email, password) {
  // Check if email already in demo users
  const exists = DEMO_USERS.find(u => u.email === email);
  if (exists) return { error: 'Email ini sudah digunakan.' };
  const session = { email, name: firstName + ' ' + lastName, role: 'user' };
  // In a real app would save to DB; here we just save session
  localStorage.setItem(GF_AUTH_KEY, JSON.stringify(session));
  return { session };
}

function gfLogout() {
  localStorage.removeItem(GF_AUTH_KEY);
  window.location.href = 'login.html';
}

function gfGetSession() {
  try {
    return JSON.parse(localStorage.getItem(GF_AUTH_KEY));
  } catch { return null; }
}

function gfRequireLogin() {
  const s = gfGetSession();
  if (!s) { window.location.href = 'login.html'; return null; }
  return s;
}

function gfRequireAdmin() {
  const s = gfGetSession();
  if (!s || s.role !== 'admin') { window.location.href = 'login.html'; return null; }
  return s;
}

// Update navbar based on login state — call on every page
function gfUpdateNavbar() {
  const s = gfGetSession();
  const loginBtns = document.querySelectorAll('.navbar-login-btn');
  const userMenus  = document.querySelectorAll('.navbar-user-menu');
  const userNames  = document.querySelectorAll('.navbar-user-name');

  if (s) {
    loginBtns.forEach(el => el.style.display = 'none');
    userMenus.forEach(el => el.style.display = 'flex');
    userNames.forEach(el => el.textContent = s.name.split(' ')[0]);
  } else {
    loginBtns.forEach(el => el.style.display = '');
    userMenus.forEach(el => el.style.display = 'none');
  }
}