document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll(".fade-item");
  const blurOverlay = document.getElementById("blurOverlay");

  let started = false;

  /* ================= FADE SYSTEM ================= */

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  function startFade() {
    if (started) return;
    started = true;

    // Fade các item
    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.12}s`;
      observer.observe(item);
    });
  }

  // Tự động chạy fade khi trang load
  startFade();

  /* ================= BLUR EFFECT - CONTINUOUS ================= */

  function triggerBlurSequence() {
    // Random 2 hoặc 3 blur (80% = 2, 20% = 3)
    const blurCount = Math.random() < 0.8 ? 2 : 3;
    
    // Chạy blur sequence
    for (let i = 0; i < blurCount; i++) {
      setTimeout(() => {
        // Blur time: 0.5-1s
        const blurDuration = Math.random() * 0.5 + 0.5;
        
        blurOverlay.classList.add("active");
        
        setTimeout(() => {
          blurOverlay.classList.remove("active");
        }, blurDuration * 1000);
      }, i * 600); // Gap giữa các blur: 600ms
    }

    // Trigger sequence tiếp theo sau khi sequence kết thúc
    const totalDuration = blurCount * 600 + 500;
    const nextTriggerDelay = Math.random() * 3000 + 2000; // 2-5s sau sequence kết thúc
    
    setTimeout(triggerBlurSequence, totalDuration + nextTriggerDelay);
  }

  // Bắt đầu blur effect sau 2s
  setTimeout(triggerBlurSequence, 2000);

  /* ================= CLOCK VN ================= */

  const clock = document.getElementById("vnClock");

  function updateClock() {
    if (!clock) return;

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

  /* ================= BACK TO TOP ================= */

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ================= VIDEO BG ================= */

  const videoElement = document.querySelector(".background");
  if (videoElement) {
    videoElement.play().catch(err => {
      console.log("Autoplay blocked:", err);
    });
  }

  /* ================= SOCIAL LINKS ================= */

  const socialLinks = document.querySelectorAll(".socials a");

  socialLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      link.classList.add("active");
    });

    link.addEventListener("mouseleave", () => {
      link.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".socials a")) {
      socialLinks.forEach(link => {
        link.classList.remove("active");
      });
    }
  });
});
