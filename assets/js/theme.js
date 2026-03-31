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

    // Dispatch theme change event
    const event = new CustomEvent('themechange', {
      detail: { theme: theme }
    });
    root.dispatchEvent(event);
  }

  function toggleTheme() {
    if (root.classList.contains('space-theme')) {
      setTheme('light');
    } else {
      setTheme('space');
    }
  }

  if (btn) {
    btn.addEventListener('click', toggleTheme);
  }

  // Load saved theme
  const saved = localStorage.getItem('theme');
  if (saved) setTheme(saved);
})();