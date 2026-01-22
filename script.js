document.addEventListener("DOMContentLoaded", () => {

  /* Fade in toàn trang */
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 1s ease";
  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });

  /* Fade in up theo thứ tự */
  const items = document.querySelectorAll(".fade-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.12}s`; 
    observer.observe(item);
  });

  /* Back to top */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
