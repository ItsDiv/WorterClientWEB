const toast = document.getElementById("toast");
const downloadButton = document.querySelector(".download-btn");
const revealItems = document.querySelectorAll(".reveal");
const heroLinks = document.querySelectorAll('.hero-cta a[href^="#"]');

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

if (downloadButton) {
  downloadButton.addEventListener("click", () => {
    showToast("WorterClientSetup.exe 다운로드를 시작합니다.");
  });
}

if (heroLinks.length > 0) {
  heroLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      const targetSection = document.querySelector(targetId);
      if (!targetSection) {
        return;
      }

      event.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      targetSection.classList.remove("section-highlight");
      void targetSection.offsetWidth;
      targetSection.classList.add("section-highlight");
      setTimeout(() => {
        targetSection.classList.remove("section-highlight");
      }, 900);
    });
  });
}

if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
