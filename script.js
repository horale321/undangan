// Overlay transition
document.getElementById("open-btn").addEventListener("click", function () {
  const overlay = document.getElementById("overlay");
  const invitation = document.getElementById("invitation-details");

  overlay.classList.add("fadeOut");

  setTimeout(() => {
    overlay.style.display = "none";
    invitation.classList.remove("hidden");
    AOS.init({ duration: 1000 });
    confetti(); // optional confetti animation on reveal
  }, 800);
});

// Countdown timer
const eventDate = new Date("2025-07-13T12:00:00+07:00").getTime();
const countdown = document.getElementById("countdown");

const x = setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance <= 0) {
    clearInterval(x);
    countdown.innerHTML = "Acara telah dimulai 🎉";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);
