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

  /* ================= BLUR EFFECT ================= */

  function triggerBlurSequence() {
    if (!blurOverlay) return;

    // Random xem đây là "Blur đơn" (50%) hay "Blur chuỗi" (50%)
    const isSingleBlur = Math.random() < 0.5; 
    let totalSequenceDuration = 0;

    if (isSingleBlur) {
      // --- BLUR ĐƠN ---
      // Thời gian kéo dài từ 1.2s đến 1.8s
      const blurDuration = Math.random() * 0.6 + 1.2; 
      
      // Truyền thời gian vào CSS
      blurOverlay.style.setProperty('--blur-duration', `${blurDuration}s`);
      
      // Reset và kích hoạt lại animation
      blurOverlay.classList.remove("animate-blur");
      void blurOverlay.offsetWidth; 
      blurOverlay.classList.add("animate-blur");

      totalSequenceDuration = blurDuration * 1000;
    } else {
      // --- BLUR CHUỖI (CẶP) ---
      // 80% ra 2 lần, 20% ra 3 lần
      const blurCount = Math.random() < 0.8 ? 2 : 3;
      let currentCount = 0;

      // Hàm chạy nối tiếp các lần blur
      function runMultiBlur() {
        if (currentCount >= blurCount) return;
        
        // Thời gian blur chuỗi nhanh hơn: từ 0.6s đến 0.9s mỗi lần
        const blurDuration = Math.random() * 0.3 + 0.6;
        blurOverlay.style.setProperty('--blur-duration', `${blurDuration}s`);
        
        blurOverlay.classList.remove("animate-blur");
        void blurOverlay.offsetWidth;
        blurOverlay.classList.add("animate-blur");
        
        currentCount++;
        
        // Cài đặt chờ để chạy lần nháy tiếp theo (thêm 100ms khoảng nghỉ giữa các lần nháy)
        if (currentCount < blurCount) {
          setTimeout(runMultiBlur, blurDuration * 1000 + 100);
        }
      }
      
      runMultiBlur();

      // Ước tính tổng thời gian chạy hết chuỗi 
      totalSequenceDuration = blurCount * 1000; 
    }

    // --- RANDOM THỜI GIAN CHỜ LƯỢT TIẾP THEO ---
    // Ngẫu nhiên từ 10s (10000ms) đến 20s (20000ms)
    const nextTriggerDelay = Math.random() * 10000 + 10000; 
    
    setTimeout(triggerBlurSequence, totalSequenceDuration + nextTriggerDelay);
  }

  // Bắt đầu lượt đầu tiên sau 2s
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
