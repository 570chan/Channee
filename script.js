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

  /* ================= RAIN EFFECT - REALISTIC ================= */

  // Hạt mưa rơi xuống thẳng (from top)
  function createVerticalRaindrop() {
    const drop = document.createElement("div");
    drop.className = "raindrop vertical";
    
    // Variation kích cỡ: 60% nhỏ, 30% vừa, 10% lớn
    const sizeRand = Math.random();
    let size, opacity;
    if (sizeRand < 0.6) {
      size = Math.random() * 2 + 1; // 1-3px
      opacity = 0.5 + Math.random() * 0.3; // 0.5-0.8
    } else if (sizeRand < 0.9) {
      size = Math.random() * 3 + 3; // 3-6px
      opacity = 0.6 + Math.random() * 0.3; // 0.6-0.9
    } else {
      size = Math.random() * 2 + 6; // 6-8px
      opacity = 0.7 + Math.random() * 0.2; // 0.7-0.9
    }

    const x = Math.random() * window.innerWidth;
    const duration = Math.random() * 0.8 + 1.2; // 1.2-2s

    drop.style.left = x + "px";
    drop.style.top = "-10px";
    drop.style.width = size + "px";
    drop.style.height = size * 4 + "px";
    drop.style.opacity = opacity;
    drop.style.animation = `fallVertical ${duration}s linear forwards`;

    rainContainer.appendChild(drop);

    setTimeout(() => drop.remove(), duration * 1000);
  }

  // Hạt mưa bay vào từ cạnh & chạy xuống (hitting glass effect)
  function createHitGlassRaindrop() {
    const drop = document.createElement("div");
    drop.className = "raindrop glass-hit";
    
    // Variation
    const sizeRand = Math.random();
    let size, opacity;
    if (sizeRand < 0.6) {
      size = Math.random() * 2 + 1.5; // 1.5-3.5px
      opacity = 0.6 + Math.random() * 0.2;
    } else if (sizeRand < 0.9) {
      size = Math.random() * 3 + 3.5; // 3.5-6.5px
      opacity = 0.7 + Math.random() * 0.2;
    } else {
      size = Math.random() * 2 + 6.5; // 6.5-8.5px
      opacity = 0.8 + Math.random() * 0.15;
    }

    // Random cạnh (left, right, hoặc top-left/top-right)
    const side = Math.random();
    let startX, startY, endX, streakLength;

    if (side < 0.4) {
      // From left
      startX = -20;
      startY = Math.random() * window.innerHeight * 0.3;
      endX = Math.random() * (window.innerWidth * 0.15);
    } else if (side < 0.8) {
      // From right
      startX = window.innerWidth + 20;
      startY = Math.random() * window.innerHeight * 0.3;
      endX = window.innerWidth - Math.random() * (window.innerWidth * 0.15);
    } else {
      // From top corners
      startX = Math.random() < 0.5 ? -20 : window.innerWidth + 20;
      startY = -20;
      endX = startX + (Math.random() * 100 - 50);
    }

    streakLength = Math.random() * 40 + 30; // 30-70px streak

    drop.style.left = startX + "px";
    drop.style.top = startY + "px";
    drop.style.width = size + "px";
    drop.style.height = size + "px";
    drop.style.opacity = opacity;

    rainContainer.appendChild(drop);

    // Animation: Bay vào + chạy xuống
    const hitDuration = Math.random() * 0.3 + 0.4; // 0.4-0.7s bay vào
    const streakDuration = Math.random() * 0.8 + 1.2; // 1.2-2s chạy xuống

    // Bay vào
    drop.style.animation = `hitGlass ${hitDuration}s ease-out forwards`;
    drop.style.setProperty('--endX', endX + "px");
    drop.style.setProperty('--endY', startY + Math.random() * 100 + 50 + "px");

    // Sau khi bay vào, chạy xuống
    setTimeout(() => {
      drop.style.animation = `streakDown ${streakDuration}s linear forwards`;
      drop.style.setProperty('--streakLength', streakLength + "px");
    }, hitDuration * 1000);

    setTimeout(() => drop.remove(), (hitDuration + streakDuration) * 1000);
  }

  // Thêm keyframes vào style
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fallVertical {
      to {
        transform: translateY(${window.innerHeight + 20}px);
      }
    }

    @keyframes hitGlass {
      0% {
        opacity: 0;
        transform: translate(0, 0);
        filter: blur(2px);
      }
      100% {
        opacity: var(--opacity, 0.7);
        transform: translate(calc(var(--endX) - var(--startX, 0px)), calc(var(--endY) - var(--startY, 0px)));
        filter: blur(0);
      }
    }

    @keyframes streakDown {
      0% {
        transform: translateY(0);
        opacity: var(--opacity, 0.7);
      }
      50% {
        opacity: var(--opacity, 0.7);
      }
      100% {
        transform: translateY(var(--streakLength));
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Tạo mưa
  setInterval(() => {
    // Mưa rơi thẳng
    const verticalCount = Math.floor(Math.random() * 2) + 2; // 2-3
    for (let i = 0; i < verticalCount; i++) {
      setTimeout(() => createVerticalRaindrop(), i * 40);
    }

    // Mưa bay vào & chạy xuống
    const hitCount = Math.floor(Math.random() * 2) + 1; // 1-2
    for (let i = 0; i < hitCount; i++) {
      setTimeout(() => createHitGlassRaindrop(), i * 100);
    }
  }, 400);

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
