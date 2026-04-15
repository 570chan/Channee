document.addEventListener("DOMContentLoaded", () => {

  /* Loading Overlay */
  const loadingOverlay = document.getElementById("loadingOverlay");
  const bgMusic = document.getElementById("bgMusic");
  const items = document.querySelectorAll(".fade-item");

  if (loadingOverlay) {
    loadingOverlay.addEventListener("click", () => {
      // Hide overlay
      loadingOverlay.classList.add("hide");
      
      /* Trigger fade animations */
      items.forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.12}s`;
        item.classList.add("show");
      });
      
      /* Play background music */
      if (bgMusic) {
        bgMusic.play().catch(error => {
          console.log("Music autoplay blocked:", error);
        });
      }
    });
  }

  /* Fade in theo thứ tự */
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

  /* Video background autoplay fix */
  const videoElement = document.querySelector(".background");
  if (videoElement) {
    videoElement.play().catch(error => {
      console.log("Autoplay blocked:", error);
    });
  }

  /* Social links active state */
  const socialLinks = document.querySelectorAll(".socials a");
  
  socialLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      link.classList.add("active");
    });
    
    link.addEventListener("mouseleave", () => {
      link.classList.remove("active");
    });
  });

  /* Remove active class when clicking outside */
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".socials a")) {
      socialLinks.forEach(link => {
        link.classList.remove("active");
      });
    }
  });

});
