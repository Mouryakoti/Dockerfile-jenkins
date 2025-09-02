// Utility: safe content map
const pages = {
  home: {
    title: "Welcome",
    html: `
      <p>This is a clean starting point. Edit content in index.html, styles in style.css, and interactions in script.js.</p>
      <button id="actionBtn" type="button" class="btn">Click me</button>
    `
  },
  about: {
    title: "About",
    html: `
      <p>This mini project shows how to link files and add interactivity using plain HTML, CSS, and JavaScript.</p>
      <p>It keeps structure, style, and behavior separated for clarity and scalability.</p>
    `
  },
  contact: {
    title: "Contact",
    html: `
      <form id="contactForm" novalidate>
        <label>
          Name
          <input name="name" type="text" required minlength="2" placeholder="Jane Doe">
        </label>
        <label>
          Email
          <input name="email" type="email" required placeholder="jane@example.com">
        </label>
        <label>
          Message
          <textarea name="message" rows="4" required placeholder="Write your message..."></textarea>
        </label>
        <button class="btn" type="submit">Send</button>
      </form>
    `
  }
};

function render(pageKey) {
  const section = document.getElementById("content");
  const data = pages[pageKey] || pages.home;
  section.innerHTML = `<h2>${data.title}</h2>${data.html}`;
  section.focus();

  // Re-bind dynamic elements
  const actionBtn = document.getElementById("actionBtn");
  if (actionBtn) {
    actionBtn.addEventListener("click", () => {
      actionBtn.textContent = "Clicked!";
      actionBtn.disabled = true;
      setTimeout(() => {
        actionBtn.textContent = "Click me";
        actionBtn.disabled = false;
      }, 1200);
    });
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("name")?.toString().trim();
      const email = data.get("email")?.toString().trim();
      const message = data.get("message")?.toString().trim();

      if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
      }
      form.reset();
      alert(`Thanks, ${name}! Your message was submitted.`);
    });
  }

  // Update active nav state
  document.querySelectorAll('.site-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageKey);
  });
}

function initNav() {
  document.querySelectorAll('.site-nav a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const page = a.dataset.page;
      render(page);
      history.replaceState(null, "", `#${page}`);
    });
  });
}

function initYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

function initFromHash() {
  const hash = (location.hash || "#home").replace("#", "");
  render(hash in pages ? hash : "home");
}

window.addEventListener("DOMContentLoaded", () => {
  initYear();
  initNav();
  initFromHash();
});

