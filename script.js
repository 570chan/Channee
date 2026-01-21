document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-item").forEach((el, i) => {
    setTimeout(() => el.classList.add("show"), i * 120);
  });
});
