async function fetchData(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`)
    }
    const data = await response.json();
    return data;
  } catch {
    console.error('Cannot fetch json file: ', error);
    throw error;
  }
}

const dialog = document.querySelectorAll('dialog');
const showModal = document.querySelectorAll('.showModal');
const closeModal = document.querySelectorAll('.closeModal');

dialog.forEach(dialog => {
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();

    const isInDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!isInDialog) {
      dialog.classList.add('closing');
      setTimeout(() => {
        dialog.close();
        dialog.classList.remove('closing');
      }, 200)
    }
  })
})

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

// Todo: Accessibility (none here for now)
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
const oledDarkBtn = document.getElementById('oled-dark-btn');
const systemBtn = document.getElementById('system-theme-btn');

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  document.body.classList.remove('dark-mode');
  document.body.classList.remove('oled-dark');

  if (theme ==='dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('oled-dark');
  } else if (theme === 'oled-dark') {
    document.body.classList.add('oled-dark');
    document.body.classList.remove('dark-mode');
  }
  else if (theme === 'system') {
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

oledDarkBtn.addEventListener('click', () => {
  localStorage.setItem('theme', 'oled-dark');
  applyTheme('oled-dark');
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
  oledDarkBtn.classList.toggle('active', theme === 'oled-dark');
  systemBtn.classList.toggle('active', theme === 'system');
}

const savedTheme = localStorage.getItem('theme') || 'system';
applyTheme(savedTheme);
updateActive();

// Splash text thingy
const splashTextSpan = document.getElementById('splash-text');
async function loadSplash() {
  const splashTexts = await fetchData('/json/splash-texts.json');
  splashTextSpan.textContent = splashTexts[Math.floor(Math.random() * splashTexts.length)];
}
loadSplash();