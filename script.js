document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("overlay");
  const openBtn = document.getElementById("open-btn");
  const invitation = document.getElementById("invitation-details");
  const music = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");
  const icon = document.getElementById("music-icon");

  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: true,     // Whether animation should happen only once - while scrolling down
  });
  
  // --- Open Invitation Logic ---
  openBtn.addEventListener("click", function () {
    overlay.classList.add("hidden");

    setTimeout(() => {
      overlay.style.display = "none";
      invitation.classList.add("show");

      // Scroll to the top of the invitation content smoothly
      document.getElementById('section-1').scrollIntoView({ behavior: 'smooth' });

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });

      music.play().catch(() => {});
    }, 1000); // Match this timeout with the transition duration in CSS
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