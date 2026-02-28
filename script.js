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

  /* ================= AUTO ZOOM + FADE + LIVE WALLPAPER ================= */
  let isLandscape = false;
  let fadeTimeout;

  function handleOrientationChange() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const newIsLandscape = width > height;

    if (newIsLandscape && !isLandscape) {
      // Từ dọc sang ngang
      applyLandscapeZoom();
      startFadeTransition();
    } else if (!newIsLandscape && isLandscape) {
      // Từ ngang sang dọc
      resetToPortrait();
    }

    isLandscape = newIsLandscape;
  }

  function applyLandscapeZoom() {
    // Zoom out để fit 1024×1024
    const width = window.innerWidth;
    const height = window.innerHeight;
    const zoomWidth = width / 1024;
    const zoomHeight = height / 1024;
    const zoomFactor = Math.min(zoomWidth, zoomHeight);
    document.documentElement.style.zoom = zoomFactor;
  }

  function startFadeTransition() {
    const staticBg = document.getElementById("staticBg");
    const liveBg = document.getElementById("liveBg");
    const page = document.querySelector(".page");
    
    // Fade to black nhanh (0.2s)
    staticBg.style.opacity = "0";
    page.style.opacity = "0";

    // Sau 0.2s, hiển thị live wallpaper
    fadeTimeout = setTimeout(() => {
      // Ẩn ảnh tĩnh, hiển thị live wallpaper
      staticBg.style.display = "none";
      liveBg.style.opacity = "1";
      
      // Fade in lại nhanh (0.2s)
      page.style.opacity = "1";
    }, 200);
  }

  function resetToPortrait() {
    clearTimeout(fadeTimeout);
    
    // Reset zoom
    document.documentElement.style.zoom = 1;
    
    const staticBg = document.getElementById("staticBg");
    const liveBg = document.getElementById("liveBg");
    const page = document.querySelector(".page");
    
    // Fade to black
    page.style.opacity = "0";
    liveBg.style.opacity = "0";

    // Sau 0.2s, quay lại ảnh tĩnh
    fadeTimeout = setTimeout(() => {
      staticBg.style.display = "block";
      staticBg.style.opacity = "1";
      
      // Fade in lại
      page.style.opacity = "1";
    }, 200);
  }

  // Kiểm tra lần đầu
  handleOrientationChange();

  // Lắng nghe sự kiện xoay màn hình
  window.addEventListener("orientationchange", handleOrientationChange);
  window.addEventListener("resize", handleOrientationChange);
});
