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

  /* ================= BLUR EFFECT - UPDATED ================= */

  function triggerBlurSequence() {
    if (!blurOverlay) return;

    // Random xem đây là "Blur đơn" (true) hay "Blur chuỗi" (false)
    const isSingleBlur = Math.random() < 0.5; 
    let totalSequenceDuration = 0;

    if (isSingleBlur) {
      // --- BLUR ĐƠN ---
      // Thời gian kéo dài từ 1s đến 1.5s
      const blurDuration = Math.random() * 0.5 + 1.0; 
      
      // Chỉnh transition mượt phù hợp với blur đơn
      blurOverlay.style.transition = "all 0.4s ease-in-out";
      blurOverlay.classList.add("active");

      setTimeout(() => {
        blurOverlay.classList.remove("active");
      }, blurDuration * 1000);

      totalSequenceDuration = blurDuration * 1000;
    } else {
      // --- BLUR CHUỖI (CẶP) ---
      // Tỉ lệ: 80% ra 2 cái (cặp), 20% ra 3 cái liên tiếp
      const blurCount = Math.random() < 0.8 ? 2 : 3;
      const gap = 600; // Khoảng cách giữa các đợt phát blur: 600ms

      // Blur chuỗi cần nhấp nháy nhanh hơn nên giảm transition xuống 0.2s
      blurOverlay.style.transition = "all 0.2s ease-in-out";

      for (let i = 0; i < blurCount; i++) {
        setTimeout(() => {
          // Mỗi đợt nháy đơn ngắn từ 0.5s đến 1s
          const blurDuration = Math.random() * 0.5 + 0.5;
          
          blurOverlay.classList.add("active");
          
          setTimeout(() => {
            blurOverlay.classList.remove("active");
          }, blurDuration * 1000);
          
        }, i * gap);
      }

      totalSequenceDuration = (blurCount - 1) * gap + 1000;
    }

    // --- RANDOM THỜI GIAN CHỜ LƯỢT TIẾP THEO ---
    // Ngẫu nhiên từ 10s (10000ms) đến 20s (20000ms)
    const nextTriggerDelay = Math.random() * 10000 + 10000; 
    
    setTimeout(triggerBlurSequence, totalSequenceDuration + nextTriggerDelay);
  }

  // Bắt đầu kích hoạt hiệu ứng Blur đầu tiên sau khi load trang 2s
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
