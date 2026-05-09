/* ============================================
   Liu Peiyu | Personal Homepage - App Logic
   ============================================ */

/* --- State --- */
let currentLang = "zh";

/* --- DOM refs --- */
const langToggle = document.getElementById("langToggle");
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const i18nElements = document.querySelectorAll("[data-i18n]");

/* --- Language Toggle --- */
function setLang(lang) {
  currentLang = lang;
  const dict = i18n[lang];

  i18nElements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update toggle button text
  const zhSpan = langToggle.querySelector(".lang-toggle__zh");
  const enSpan = langToggle.querySelector(".lang-toggle__en");
  if (lang === "zh") {
    zhSpan.textContent = "EN";
    enSpan.textContent = "中文";
  } else {
    zhSpan.textContent = "中文";
    enSpan.textContent = "EN";
  }

  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
}

langToggle.addEventListener("click", () => {
  const next = currentLang === "zh" ? "en" : "zh";
  setLang(next);
});

/* --- Mobile Hamburger --- */
hamburger.addEventListener("click", () => {
  nav.classList.toggle("nav--open");
  const isOpen = nav.classList.contains("nav--open");
  hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Menu");
});

// Close mobile nav on link click
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("nav--open");
  });
});

/* --- Intersection Observer for Card Reveal --- */
const observerOptions = {
  threshold: 0.08,
  rootMargin: "0px 0px -40px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".card").forEach((card) => {
  observer.observe(card);
});

/* --- Navbar hide/show on scroll --- */
let lastScrollY = 0;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY < 80) {
    nav.style.transform = "translateY(0)";
  } else if (currentScrollY > lastScrollY) {
    nav.style.transform = "translateY(-100%)";
  } else {
    nav.style.transform = "translateY(0)";
  }
  lastScrollY = currentScrollY;
});

/* --- Init --- */
setLang("zh");
