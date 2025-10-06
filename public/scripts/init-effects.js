window.addEventListener("load", () => {
  // ✨ Initialize AOS
  if (window.AOS) {
    window.AOS.init({
      duration: 1200,
      easing: "ease-out-cubic",
      offset: 60,
      once: true,
      mirror: false,
    });
  }

  // 🐦 Initialize Vanta.js Background (responsive motion)
  const initVanta = () => {
    if (!window.VANTA) return;

    const width = window.innerWidth;

    // Normalize speed: smaller screens → slower, larger → faster
    const speedBase = 1.0;
    const speedFactor = Math.min(Math.max(width / 1600, 0.6), 1.3);
    const normalizedSpeed = speedBase * speedFactor;

    // Adjust quantity so mobile doesn't overload
    const quantity = width < 600 ? 1.0 : width < 1200 ? 2.0 : 3.0;
    const separation = 50 + (width / 2000) * 40; // responsive spread

    // Destroy previous instance if resizing
    if (window.vantaEffect) window.vantaEffect.destroy();

    window.vantaEffect = window.VANTA.BIRDS({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color1: 0x000000,
      color2: 0xff00e0,
      backgroundAlpha: 0.0,
      quantity,
      birdSize: 1.1,
      cohesion: 20.0,
      separation,
      speedLimit: normalizedSpeed,
    });
  };

  // Run Vanta on load
  initVanta();

  // Recalculate on resize for responsive behavior
  window.addEventListener("resize", () => {
    clearTimeout(window._vantaResizeTimer);
    window._vantaResizeTimer = setTimeout(initVanta, 400);
  });

  // 🫧 Subtle fade-in for hero content when loaded
  document.documentElement.style.scrollBehavior = "smooth";
  const hero = document.querySelector("#hero");
  if (hero) {
    hero.style.opacity = "0";
    hero.style.transform = "translateY(20px)";
    setTimeout(() => {
      hero.style.transition = "opacity 1s ease-out, transform 1.2s ease-out";
      hero.style.opacity = "1";
      hero.style.transform = "translateY(0)";
    }, 300);
  }

  // 🌈 Dynamic gradient overlay based on scroll
  const gradient = document.getElementById("gradient-overlay");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    if (!gradient) return;

    const scrollY = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollY / docHeight, 1);

    // Subtle hue rotation and opacity adjustment
    const hue = 280 + progress * 80; // magenta → cyan
    const opacity = 0.15 + progress * 0.15;

    gradient.style.background = `radial-gradient(
      circle at 50% 50%,
      hsla(${hue}, 100%, 65%, ${opacity}),
      hsla(${(hue + 60) % 360}, 100%, 55%, ${opacity / 2}) 40%,
      transparent 80%
    )`;

    // Smooth parallax shimmer
    gradient.style.opacity = scrollY > lastScroll ? "0.5" : "0.8";
    lastScroll = scrollY;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  const header = document.getElementById("top-bar");

  toggleBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("open");
    header.classList.toggle("nav-open");
  });

  document.addEventListener("click", (e) => {
    const isInside = nav.contains(e.target) || toggleBtn.contains(e.target);
    if (!isInside) {
      nav.classList.remove("open");
      header.classList.remove("nav-open");
    }
  });
});



