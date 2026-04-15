document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll(".fade-item");
  const overlay = document.getElementById("loadingOverlay");
  const bgMusic = document.getElementById("bgMusic");

  let started = false;

  // CLICK MỚI CHẠY
  overlay.addEventListener("click", () => {
    if (started) return;
    started = true;

    // Ẩn overlay
    overlay.classList.add("hide");

    // Fade từng item kiểu anime intro
    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.12}s`;
      item.classList.add("show");
    });

    // Nhạc
    bgMusic?.play().catch(() => {});
  });

  // CLOCK VN
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

});
