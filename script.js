document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("overlay");
  const openBtn = document.getElementById("open-btn");
  const invitation = document.getElementById("invitation-details");
  const music = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");
  const icon = document.getElementById("music-icon");
  
  const sections = document.querySelectorAll(".full-page-section");
  let currentSectionIndex = 0;
  let isScrolling = false;

  // --- Open Invitation Logic ---
  openBtn.addEventListener("click", function () {
    overlay.classList.add("hidden");

    setTimeout(() => {
      overlay.style.display = "none";
      invitation.classList.add("show");
      // Show the first section
      sections[0].classList.add("active");

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });

      music.play().catch(() => {});
    }, 1000); // Match this timeout with the transition duration in CSS
  });

  // --- Section Scrolling Logic ---
  function changeSection(direction) {
    // Remove active class from current section
    sections[currentSectionIndex].classList.remove("active");

    // Update index based on direction
    if (direction === 'down' && currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
    } else if (direction === 'up' && currentSectionIndex > 0) {
      currentSectionIndex--;
    }

    // Add active class to new section
    sections[currentSectionIndex].classList.add("active");
  }
  
  // Listen for mouse wheel scroll
  window.addEventListener("wheel", (event) => {
    if (isScrolling || !invitation.classList.contains('show')) return;

    isScrolling = true;

    const scrollDirection = event.deltaY > 0 ? 'down' : 'up';
    changeSection(scrollDirection);

    // Throttle scrolling to prevent rapid section changes
    setTimeout(() => {
      isScrolling = false;
    }, 1000); // Timeout should be longer than the CSS transition
  });

  // --- Countdown Timer Logic ---
  const eventDate = new Date("2025-07-13T12:00:00+07:00").getTime();

  const x = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "<div class='text-center fs-5'>Acara telah dimulai 🎉</div>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }, 1000);

  // --- Music Toggle Logic ---
  toggleBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      icon.classList.remove("fa-volume-mute");
      icon.classList.add("fa-volume-up");
    } else {
      music.pause();
      icon.classList.remove("fa-volume-up");
      icon.classList.add("fa-volume-mute");
    }
  });
});