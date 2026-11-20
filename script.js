
document.addEventListener("DOMContentLoaded", () => {
  // Navigasi dengan scroll halus
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Animasi saat bagian halaman muncul
  const style = document.createElement("style");
  style.textContent = `
    .maya-reveal {
      opacity: 0;
      transform: translateY(25px);
      transition: all 0.7s ease;
    }

    .maya-reveal.maya-visible {
      opacity: 1;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .maya-reveal {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }
  `;
  document.head.appendChild(style);

  const elements = document.querySelectorAll(
    "section, .card, .skill, .work, .gallery-item"
  );

  elements.forEach(element => {
    element.classList.add("maya-reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("maya-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach(element => observer.observe(element));
  } else {
    elements.forEach(element => {
      element.classList.add("maya-visible");
    });
  }

  // Efek tombol saat ditekan
  document.querySelectorAll("button").forEach(button => {
    button.addEventListener("pointerdown", () => {
      button.style.transform = "scale(0.97)";
    });

    ["pointerup", "pointerleave", "blur"].forEach(eventName => {
      button.addEventListener(eventName, () => {
        button.style.transform = "";
      });
    });
  });

  // Tahun otomatis pada footer jika tersedia
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
