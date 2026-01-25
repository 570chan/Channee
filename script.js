document.addEventListener("DOMContentLoaded", () => {

  /* Fade in theo thứ tự */
  const items = document.querySelectorAll(".fade-item");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.12}s`;
    observer.observe(item);
  });

  /* Clock Việt Nam */
  const clock = document.getElementById("vnClock");

  function updateClock() {
    const now = new Date();
    const vn = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    );
    const h = String(vn.getHours()).padStart(2, "0");
    const m = String(vn.getMinutes()).padStart(2, "0");
    clock.textContent = `${h}:${m}`;
  }

  updateClock();
  setInterval(updateClock, 1000);

  /* Back to top */
  document.getElementById("backToTop")?.addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
