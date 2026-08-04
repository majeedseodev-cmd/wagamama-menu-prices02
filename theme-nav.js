(function () {
  // Theme Switching Logic
  const savedTheme = localStorage.getItem("wagamama-theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", initialTheme);

  function updateToggleButtons(theme) {
    const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
    toggleBtns.forEach((btn) => {
      if (theme === "dark") {
        btn.setAttribute("aria-label", "Switch to light mode");
        btn.innerHTML = `
          <svg class="theme-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <span class="theme-toggle-text">Light Mode</span>
        `;
      } else {
        btn.setAttribute("aria-label", "Switch to dark mode");
        btn.innerHTML = `
          <svg class="theme-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          <span class="theme-toggle-text">Dark Mode</span>
        `;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    updateToggleButtons(currentTheme);

    // Add click listeners to theme toggle buttons
    document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = activeTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("wagamama-theme", nextTheme);
        updateToggleButtons(nextTheme);
      });
    });

    // Mobile Navigation Drawer Toggle
    const navToggles = document.querySelectorAll(".nav-toggle-btn");
    navToggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const header = toggle.closest("header");
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", !isExpanded);
        if (header) {
          header.classList.toggle("nav-open", !isExpanded);
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      const headers = document.querySelectorAll("header.nav-open");
      headers.forEach((header) => {
        if (!header.contains(e.target)) {
          header.classList.remove("nav-open");
          const toggle = header.querySelector(".nav-toggle-btn");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Close menu when clicking any nav link
    document.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", () => {
        const header = link.closest("header");
        if (header && header.classList.contains("nav-open")) {
          header.classList.remove("nav-open");
          const toggle = header.querySelector(".nav-toggle-btn");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  });
})();
