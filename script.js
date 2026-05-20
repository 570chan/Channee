document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll(".fade-item");
  const rainContainer = document.getElementById("rainContainer");
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

  /* ================= RAIN EFFECT ================= */

  function createRaindrop() {
    const drop = document.createElement("div");
    drop.className = "raindrop";
    
    // 20% chance để tạo giọt mưa nặng
    if (Math.random() < 0.2) {
      drop.classList.add("heavy");
    }

    const x = Math.random() * window.innerWidth;
    const y = -10;
    const height = Math.random() * 20 + 10; // 10-30px
    const duration = Math.random() * 0.5 + 0.8; // 0.8-1.3s

    drop.style.left = x + "px";
    drop.style.top = y + "px";
    drop.style.height = height + "px";
    drop.style.animation = `fall ${duration}s linear forwards`;

    rainContainer.appendChild(drop);

    // Xóa drop sau khi animation kết thúc
    setTimeout(() => {
      drop.remove();
    }, duration * 1000);
  }

  // Tạo mưa liên tục
  setInterval(() => {
    // Tạo 3-5 giọt mưa mỗi lần
    const count = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        createRaindrop();
      }, i * 50);
    }
  }, 300);

  // Thêm animation vào style
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fall {
      to {
        transform: translateY(${window.innerHeight + 20}px);
      }
    }
  `;
  document.head.appendChild(style);

  /* ================= BLUR EFFECT ================= */

  function triggerBlur() {
    const duration = Math.random() * 2000 + 2000; // 2-4 giây
    
    blurOverlay.classList.add("active");
    
    setTimeout(() => {
      blurOverlay.classList.remove("active");
    }, duration);

    // Trigger lại sau 5-12 giây
    const nextTrigger = Math.random() * 7000 + 5000;
    setTimeout(triggerBlur, nextTrigger);
  }

  // Bắt đầu blur effect
  setTimeout(triggerBlur, 3000);

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
