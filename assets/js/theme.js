// theme.js — theme toggle with persistence

(function () {
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  function setTheme(theme) {
    if (theme === 'space') {
      root.classList.add('space-theme');
      localStorage.setItem('theme', 'space');
    } else {
      root.classList.remove('space-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  function toggleTheme() {
    if (root.classList.contains('space-theme')) {
      setTheme('light');
    } else {
      setTheme('space');
    }
  }

  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'space') {
      root.classList.add('space-theme');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    if (btn) btn.addEventListener('click', toggleTheme);
  });

})();