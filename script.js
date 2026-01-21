document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".fade-item");

  items.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("show");
    }, index * 150);
  });
});
