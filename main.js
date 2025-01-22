// navbar code
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const menubar = document.querySelector(".menubar");
  const menuLinks = menubar.querySelectorAll("a");

  const toggleNav = () => {
    menubar.classList.toggle("active");
    hamburger.classList.toggle("hamburger-active");
  };

  // Toggle menu when clicking the hamburger
  hamburger.addEventListener("click", toggleNav);

  // Close menu when clicking a link
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menubar.classList.remove("active");
      hamburger.classList.remove("hamburger-active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!menubar.contains(event.target) && !hamburger.contains(event.target)) {
      menubar.classList.remove("active");
      hamburger.classList.remove("hamburger-active");
    }
  });
});
// ---------------------------------------------
// loadin js
window.addEventListener("load", function () {
  setTimeout(() => {
    // Wait 1 second before starting the fade-out
    document.querySelector(".loading").style.opacity = "0";
    setTimeout(() => {
      document.querySelector(".loading").style.display = "none";
    }, 500); // Fade-out duration (0.5s)
  }, 9000); // 1-second delay before fading out
});
// -------------------------------
//  cardscrolling
const carouselContainer = document.querySelector(".carousel-container");
const carouselCards = document.querySelectorAll(".carousel-card");

let prevActiveCard = carouselCards[1];
let nextActiveCard = carouselCards[2];

function scrollCarousel() {
  carouselContainer.classList.remove("carousel-next", "carousel-reset");
  carouselContainer.classList.add("carousel-next");

  prevActiveCard.classList.remove("active");
  nextActiveCard.classList.add("active");

  setTimeout(resetCarousel, 600);
}

function resetCarousel() {
  carouselContainer.classList.remove("carousel-next");
  carouselContainer.classList.add("carousel-reset");

  prevActiveCard.classList.add("active");
  nextActiveCard.classList.remove("active");
}

setInterval(scrollCarousel, 1500);
