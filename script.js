const body = document.body;
const pageLoader = document.getElementById("pageLoader");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");
const progressBar = document.getElementById("scrollProgress");
const faqButtons = document.querySelectorAll(".faq-question");
const counters = document.querySelectorAll("[data-counter]");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const typedEyebrow = document.getElementById("typedEyebrow");
const tiltCards = document.querySelectorAll(".tilt-card");
const heroOrbs = document.querySelectorAll(".hero__orb");

/* ================= LOADER ================= */
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

/* ================= NAV ================= */
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
    if (navMenu.classList.contains("is-open")) toggleNavigation();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
    toggleNavigation();
  }
});

/* ================= SCROLL REVEAL ================= */
function revealOnScroll() {
  const triggerPoint = window.innerHeight * 0.86;

  revealItems.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < triggerPoint) item.classList.add("is-visible");
  });

  const proofSection = document.getElementById("proof");
  if (proofSection && !proofSection.classList.contains("counted")) {
    const rect = proofSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      proofSection.classList.add("counted");
      startCounters();
    }
  }
}

/* ================= SCROLL PROGRESS ================= */
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

/* ================= COUNTER ================= */
function startCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter);
    let current = 0;

    const update = () => {
      current += Math.ceil(target / 60);

      if (current >= target) {
        counter.textContent = target + "+";
        return;
      }

      counter.textContent = current + "+";
      requestAnimationFrame(update);
    };

    update();
  });
}

/* ================= FAQ ================= */
faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.contains("is-open");

    faqButtons.forEach((b) =>
      b.closest(".faq-item").classList.remove("is-open"),
    );

    if (!isOpen) item.classList.add("is-open");
  });
});

/* ================= FORM ================= */
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("emailAddress").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!fullName || !email || !message) {
      formMessage.textContent = "Please fill all fields.";
      return;
    }

    formMessage.textContent = "Message sent successfully!";
    form.reset();

    setTimeout(() => (formMessage.textContent = ""), 4000);
  });
}

/* ================= TYPING ================= */
function runTypedEyebrow() {
  if (!typedEyebrow) return;

  const text = "Frontend Developer • Clean UI • Premium Design";
  let i = 0;

  function type() {
    if (i < text.length) {
      typedEyebrow.textContent += text[i];
      i++;
      setTimeout(type, 35);
    }
  }

  type();
}

/* ================= TILT ================= */
tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 900) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 10;
    const rotateX = (y / rect.height - 0.5) * -10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ================= ORBS ================= */
function animateOrbs(e) {
  heroOrbs.forEach((orb, i) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
}

window.addEventListener("mousemove", animateOrbs);

/* ================= ACTIVE NAV ================= */
function activeSectionOnScroll() {
  const sections = document.querySelectorAll("main section[id]");
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    const id = section.id;
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (!link) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((l) => l.classList.remove("is-active"));
      link.classList.add("is-active");
    }
  });
}

window.addEventListener("scroll", activeSectionOnScroll);

/* ================= SMOOTH SCROLL ================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    e.preventDefault();

    window.scrollTo({
      top: target.offsetTop - 90,
      behavior: "smooth",
    });
  });
});

/* ================= MODAL (PREMIUM) ================= */
const items = document.querySelectorAll(".showcase-item, .glass-card");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

items.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");

    modal.style.display = "flex";
    modal.style.opacity = "0";
    modal.style.transform = "scale(0.9)";
    modalImg.src = img.src;

    document.body.style.overflow = "hidden";

    setTimeout(() => {
      modal.style.opacity = "1";
      modal.style.transform = "scale(1)";
    }, 10);
  });
});

/* CLOSE BUTTON */
closeBtn.onclick = () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
};

/* CLICK OUTSIDE */
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

/* ESC KEY */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
