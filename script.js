const dialog = document.querySelectorAll('dialog');
const showModal = document.querySelectorAll('.showModal');
const closeModal = document.querySelectorAll('.closeModal');

showModal.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.dialog;
    const dialog = document.getElementById(id);
    if (dialog) {dialog.showModal()}
  })
})

closeModal.forEach(btn => {
  btn.addEventListener('click', () => {
    const dialog = btn.closest('dialog');
    if (dialog) {
      dialog.classList.add('closing');
      setTimeout(() => {
        dialog.close();
        dialog.classList.remove('closing');
      }, 200)
    }
  })
})

const buttons = document.querySelectorAll('.dropdown-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', function () {
    const menu = this.nextElementSibling;
    const isOpen = menu.classList.contains('show');
    document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('show'));
    if (!isOpen) {
      menu.classList.add('show')
    }
  });
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown-container')) {
    document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('show'));
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('show'));
  }
});

const lightBtn = document.getElementById('light-mode-btn');
const darkBtn = document.getElementById('dark-mode-btn');
const systemBtn = document.getElementById('system-theme-btn');

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  document.body.classList.remove('dark-mode');

  if (theme ==='dark') {
    document.body.classList.add('dark-mode');
  } else if (theme === 'system') {
    if (mediaQuery.matches) {
      document.body.classList.add('dark-mode')
    }
  }
}

lightBtn.addEventListener('click', () => {
  localStorage.setItem('theme', 'light');
  applyTheme('light');
  updateActive();
});

darkBtn.addEventListener('click', () => {
  localStorage.setItem('theme', 'dark');
  applyTheme('dark');
  updateActive();
});

systemBtn.addEventListener('click', () => {
  localStorage.setItem('theme', 'system');
  applyTheme('system');
  updateActive();
});

mediaQuery.addEventListener('change', () => {
  if (localStorage.getItem('theme') === 'system') {
    applyTheme('system');
  }
});

function updateActive() {
  const theme = localStorage.getItem('theme') || 'system';

  lightBtn.classList.toggle('active', theme === 'light');
  darkBtn.classList.toggle('active', theme === 'dark');
  systemBtn.classList.toggle('active', theme === 'system');
}

const savedTheme = localStorage.getItem('theme') || 'system';
applyTheme(savedTheme);
updateActive();