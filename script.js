// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  const expanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!expanded));
  mobileMenu.classList.toggle("show");
  mobileMenu.setAttribute("aria-hidden", String(expanded));
});

// Close menu when clicking a link
mobileMenu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Typing role
const roleEl = document.getElementById("typingRole");
if (roleEl) {
  const roles = (roleEl.dataset.roles || "").split(",").map(s => s.trim()).filter(Boolean);
  let i = 0, j = 0, deleting = false;

  const tick = () => {
    const text = roles[i] || "Java Backend Engineer";
    if (!deleting) {
      j++;
      roleEl.textContent = text.slice(0, j);
      if (j >= text.length) {
        deleting = true;
        setTimeout(tick, 1100);
        return;
      }
    } else {
      j--;
      roleEl.textContent = text.slice(0, j);
      if (j <= 0) {
        deleting = false;
        i = (i + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 70);
  };

  tick();
}

// Contact form -> mailto
const form = document.getElementById("miniForm");
const note = document.getElementById("formNote");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const msg = document.getElementById("message").value.trim();

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);

    window.location.href = `mailto:Utkarshp10@outlook.com?subject=${subject}&body=${body}`;
    note.textContent = "Opening your email client…";
  });
}
