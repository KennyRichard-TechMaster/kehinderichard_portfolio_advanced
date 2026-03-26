const body = document.body;
const pageLoader = document.getElementById("pageLoader");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");
const progressBar = document.getElementById("scrollProgress");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const faqButtons = document.querySelectorAll(".faq-question");
const counters = document.querySelectorAll("[data-counter]");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const typedEyebrow = document.getElementById("typedEyebrow");
const tiltCards = document.querySelectorAll(".tilt-card");
const heroOrbs = document.querySelectorAll(".hero__orb");

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;
let countersStarted = false;

window.addEventListener("load", () => {
  if (pageLoader) {
    setTimeout(() => {
      pageLoader.classList.add("is-hidden");
    }, 500);
  }

  revealOnScroll();
  updateScrollProgress();
  runTypedEyebrow();
});

function toggleNavigation() {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.classList.toggle("is-active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  body.classList.toggle("nav-open", isOpen);
}

if (navToggle) {
  navToggle.addEventListener("click", toggleNavigation);
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("is-open")) {
      toggleNavigation();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
    toggleNavigation();
  }
});

function revealOnScroll() {
  const triggerPoint = window.innerHeight * 0.86;

  revealItems.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < triggerPoint) {
      item.classList.add("is-visible");
    }
  });

  const proofSection = document.getElementById("proof");
  if (proofSection && !countersStarted) {
    const rect = proofSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      countersStarted = true;
      startCounters();
    }
  }
}

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

window.addEventListener("scroll", () => {
  revealOnScroll();
  updateScrollProgress();
});

window.addEventListener("resize", updateScrollProgress);

function handleCursorMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }

  animateOrbs(event);
}

function animateCursorRing() {
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;

  if (cursorRing) {
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
  }

  requestAnimationFrame(animateCursorRing);
}

if (window.matchMedia("(min-width: 901px)").matches) {
  window.addEventListener("mousemove", handleCursorMove);
  animateCursorRing();
}

function enhanceCursorOnHover() {
  const hoverTargets = document.querySelectorAll(
    "a, button, .project, .proof-card, .service-card, .mini-panel, .glass-card, .timeline__card, .contact-panel, .contact-form",
  );

  hoverTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      if (cursorRing) {
        cursorRing.style.width = "56px";
        cursorRing.style.height = "56px";
        cursorRing.style.borderColor = "rgba(198,162,87,0.65)";
      }
    });

    target.addEventListener("mouseleave", () => {
      if (cursorRing) {
        cursorRing.style.width = "34px";
        cursorRing.style.height = "34px";
        cursorRing.style.borderColor = "rgba(255,255,255,0.5)";
      }
    });
  });
}
enhanceCursorOnHover();

function startCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter);
    let current = 0;
    const duration = 1300;
    const increment = Math.max(1, Math.floor(target / (duration / 16)));

    const updateCount = () => {
      current += increment;
      if (current >= target) {
        current = target;
        counter.textContent = `${current}+`;
        return;
      }
      counter.textContent = `${current}+`;
      requestAnimationFrame(updateCount);
    };

    updateCount();
  });
}

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.contains("is-open");

    faqButtons.forEach((otherButton) => {
      otherButton.closest(".faq-item").classList.remove("is-open");
    });

    if (!isOpen) {
      item.classList.add("is-open");
    }
  });
});

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const emailAddress = document.getElementById("emailAddress").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!fullName || !emailAddress || !message) {
      formMessage.textContent =
        "Please fill in your name, email, and project details.";
      return;
    }

    formMessage.textContent =
      "Thanks. Your message has been captured successfully.";
    form.reset();

    setTimeout(() => {
      formMessage.textContent = "";
    }, 5000);
  });
}

function runTypedEyebrow() {
  if (!typedEyebrow) return;

  const finalText = "Frontend Developer • Accounting Precision • Clean UI";
  typedEyebrow.textContent = "";
  let index = 0;

  function typeNext() {
    if (index < finalText.length) {
      typedEyebrow.textContent += finalText.charAt(index);
      index += 1;
      setTimeout(typeNext, 38);
    }
  }

  typeNext();
}

function applyTiltEffect() {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      if (window.innerWidth <= 900) return;

      const rect = card.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const rotateY = (offsetX / rect.width - 0.5) * 10;
      const rotateX = (offsetY / rect.height - 0.5) * -10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}
applyTiltEffect();

function animateOrbs(event) {
  if (!heroOrbs.length) return;

  const xRatio = event.clientX / window.innerWidth;
  const yRatio = event.clientY / window.innerHeight;

  heroOrbs.forEach((orb, index) => {
    const xOffset = (xRatio - 0.5) * (index % 2 === 0 ? 35 : -28);
    const yOffset = (yRatio - 0.5) * (index % 2 === 0 ? 24 : -20);
    orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
  });
}

function activeSectionOnScroll() {
  const sections = document.querySelectorAll("main section[id]");
  const scrollPosition = window.scrollY + 140;

  sections.forEach((section) => {
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPosition >= top && scrollPosition < bottom) {
      navLinks.forEach((navLink) => navLink.classList.remove("is-active"));
      link.classList.add("is-active");
    }
  });
}

window.addEventListener("scroll", activeSectionOnScroll);
window.addEventListener("load", activeSectionOnScroll);

function smallEnhancements() {
  const yearSpans = document.querySelectorAll("[data-current-year]");
  yearSpans.forEach((span) => {
    span.textContent = new Date().getFullYear();
  });
}
smallEnhancements();

function smoothHashScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const offsetTop =
        target.getBoundingClientRect().top + window.pageYOffset - 90;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  });
}
smoothHashScroll();

function setInitialStates() {
  faqButtons.forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}
setInitialStates();

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    faqButtons.forEach((otherButton) => {
      otherButton.setAttribute("aria-expanded", "false");
    });

    const item = button.closest(".faq-item");
    if (item.classList.contains("is-open")) {
      button.setAttribute("aria-expanded", "true");
    }
  });
});

function noop() {
  return null;
}

const state = {
  navigationReady: true,
  revealReady: true,
  cursorReady: true,
  faqReady: true,
  formReady: true,
};

function debugState() {
  return state;
}

window.__kennyPortfolio = {
  toggleNavigation,
  revealOnScroll,
  updateScrollProgress,
  startCounters,
  debugState,
  noop,
};
