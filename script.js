// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("show");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
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

// Mouse-follow colored glare
const glow = document.querySelector(".mouse-glow");
let rafId = null;
let lastX = 50, lastY = 50;

window.addEventListener("mousemove", (e) => {
  lastX = (e.clientX / window.innerWidth) * 100;
  lastY = (e.clientY / window.innerHeight) * 100;

  if (!glow.classList.contains("on")) glow.classList.add("on");

  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    document.documentElement.style.setProperty("--mx", `${lastX}%`);
    document.documentElement.style.setProperty("--my", `${lastY}%`);
    rafId = null;
  });

  // Optional: stronger effect on faster movements
  const speed = Math.abs(e.movementX) + Math.abs(e.movementY);
  glow.style.opacity = String(Math.min(0.35, 0.12 + speed / 250));
});
