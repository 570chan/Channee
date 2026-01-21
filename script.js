// Fade-in effect
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 1.2s ease";

  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });
});
