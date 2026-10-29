// Customize this address to receive contact-form messages.
const CONTACT_EMAIL = "your-email@example.com";

const rotatingWord = document.getElementById("rotatingWord");
const words = ["experiences", "connections", "campaigns", "impact"];
let wordIndex = 0;

if (rotatingWord && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setInterval(() => {
    rotatingWord.animate(
      [{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(-7px)" }],
      { duration: 180, fill: "forwards" }
    ).onfinish = () => {
      wordIndex = (wordIndex + 1) % words.length;
      rotatingWord.textContent = words[wordIndex];
      rotatingWord.animate(
        [{ opacity: 0, transform: "translateY(7px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 220, fill: "forwards" }
      );
    };
  }, 2300);
}

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Reveal sections as they enter the viewport
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Reading progress indicator
const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progress) progress.style.width = `${amount}%`;
}, { passive: true });

// Update footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form prepares a message in the visitor's email app.
// It does not send email or store form data on a server.
document.getElementById("contactForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById("formStatus");
  if (CONTACT_EMAIL === "your-email@example.com") {
    status.textContent = "Setup needed: open script.js and replace CONTACT_EMAIL with your real email address, then try again.";
    return;
  }
  const data = new FormData(form);
  const subject = `Portfolio enquiry — ${data.get("interest")}`;
  const body = [
    `Hi Harsh,`,
    ``,
    `My name is ${data.get("name")}.`,
    `Email: ${data.get("email")}`,
    `Interested in: ${data.get("interest")}`,
    ``,
    `${data.get("message")}`
  ].join("\n");
  status.textContent = "Opening your email app with the message prepared…";
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
