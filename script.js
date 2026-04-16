document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll(".fade-item");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const bgMusic = document.getElementById("bgMusic");

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

    // Nhạc nền
    if (bgMusic) {
      bgMusic.play().catch(err => {
        console.log("Music autoplay blocked:", err);
      });
    }
  }

  /* CLICK bất kỳ để bắt đầu */
  document.addEventListener("click", () => {
    startFade();
  }, { once: true });

  /* Overlay click */
  if (loadingOverlay) {
    loadingOverlay.addEventListener("click", () => {
      loadingOverlay.classList.add("hide");
      startFade();
    });
  }

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
const audio = document.getElementById("bgMusic");

if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: "303 PM",
    artist: "しゃろう (Sharou)",
    album: "30分耐久フリーBGM",
    artwork: [
      { src: "assets/avatar.jpg", sizes: "512x512", type: "image/png" }
    ]
  });

  navigator.mediaSession.setActionHandler('play', () => {
    audio.play();
  });

  navigator.mediaSession.setActionHandler('pause', () => {
    audio.pause();
  });
}
});
