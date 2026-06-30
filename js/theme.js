// Theme handling (Light / Dark Mode)
(function () {
  const THEME_KEY = 'eternal_home_theme';
  const themeToggleSelector = '.theme-toggle-btn';

  // Apply appropriate theme based on local storage
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    
    // Default to dark unless explicit light theme is selected in local storage
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  // Toggle theme callback
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem(THEME_KEY, 'dark');
      showToastNotification('Theme Changed', 'Dark Mode enabled.', 'info');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem(THEME_KEY, 'light');
      showToastNotification('Theme Changed', 'Light Mode enabled.', 'info');
    }
  }

  // Listen for clicks on the toggle button
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    document.addEventListener('click', (e) => {
      const btn = e.target.closest(themeToggleSelector);
      if (btn) {
        toggleTheme();
      }
    });
  });

  // Export globally
  window.initTheme = initTheme;
  window.toggleTheme = toggleTheme;
})();
