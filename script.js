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

  /* ================= AUTO ZOOM + FULLSCREEN WHEN LANDSCAPE ================= */
  function handleOrientationChange() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscape = width > height;

    if (isLandscape) {
      // Ngang: zoom out để fit 1024×1024 + fullscreen
      const zoomWidth = width / 1024;
      const zoomHeight = height / 1024;
      const zoomFactor = Math.min(zoomWidth, zoomHeight);
      document.documentElement.style.zoom = zoomFactor;

      // Yêu cầu fullscreen nếu có thể
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(err => console.log("Fullscreen request denied"));
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      // Dọc: reset zoom + thoát fullscreen
      document.documentElement.style.zoom = 1;

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log("Fullscreen exit denied"));
      } else if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
      } else if (document.mozFullScreenElement) {
        document.mozCancelFullScreen();
      } else if (document.msFullscreenElement) {
        document.msExitFullscreen();
      }
    }
  }

  // Kiểm tra lần đầu
  handleOrientationChange();

  // Lắng nghe sự kiện xoay màn hình
  window.addEventListener("orientationchange", handleOrientationChange);
  window.addEventListener("resize", handleOrientationChange);
});
