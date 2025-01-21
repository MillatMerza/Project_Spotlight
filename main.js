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

