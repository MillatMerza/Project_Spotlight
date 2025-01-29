document.addEventListener("DOMContentLoaded", function () {
  // Delayed Spline Scene Loader (executed after 500ms)
  setTimeout(() => {
    const canvas = document.getElementById("canvas3d");
    if (canvas) {
      import("https://unpkg.com/@splinetool/runtime").then(
        ({ Application }) => {
          const app = new Application(canvas);
          const breakpoints = {
            mobile: window.matchMedia("(max-width: 767px)"),
            desktop: window.matchMedia("(min-width: 768px)"),
          };
          let currentDevice = breakpoints.mobile.matches ? "mobile" : "desktop";

          function loadScene() {
            const sceneFile =
              currentDevice === "mobile"
                ? "assets/scene (23).splinecode"
                : "assets/scene (33).splinecode";
            app
              .load(sceneFile)
              .catch((error) => console.error("Error loading scene:", error));
          }

          loadScene();
          window.addEventListener("resize", () => {
            const newDevice = breakpoints.mobile.matches ? "mobile" : "desktop";
            if (newDevice !== currentDevice) {
              currentDevice = newDevice;
              loadScene();
            }
          });
        }
      );
    }
  }, 100); // 500ms delay for Spline loading

  // Dark Mode Toggle (immediately executed)
  // const darkModeToggle = document.querySelector(".theme-checkbox");
  // if (darkModeToggle) {
  //   if (localStorage.getItem("darkMode") === "enabled") {
  //     document.documentElement.classList.add("dark-mode");
  //     darkModeToggle.checked = true;
  //   }
  //   darkModeToggle.addEventListener("change", function () {
  //     document.documentElement.classList.toggle("dark-mode");
  //     localStorage.setItem(
  //       "darkMode",
  //       document.documentElement.classList.contains("dark-mode")
  //         ? "enabled"
  //         : "disabled"
  //     );
  //   });
  // }
  // Dark Mode Toggle
  const darkModeCheckboxes = document.querySelectorAll(".theme-checkbox");
  const htmlElement = document.documentElement;

  // Initialize dark mode from localStorage
  const darkModeState = localStorage.getItem("darkMode");
  if (darkModeState === "enabled") {
    htmlElement.classList.add("dark-mode");
  }

  // Set initial checkbox state and add event listeners
  darkModeCheckboxes.forEach((checkbox) => {
    checkbox.checked = darkModeState === "enabled";
    checkbox.addEventListener("change", handleDarkModeToggle);
  });

  function handleDarkModeToggle() {
    const isDarkMode = this.checked;

    // Toggle class on HTML element
    htmlElement.classList.toggle("dark-mode", isDarkMode);

    // Update all checkboxes
    darkModeCheckboxes.forEach((checkbox) => {
      checkbox.checked = isDarkMode;
    });

    // Save state to localStorage
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
  }

  // Loading Screen (immediately executed)
  const loadingScreen = document.querySelector(".loading");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 4000);
  }

  // Navbar Toggle (immediately executed)
  const hamburger = document.querySelector(".hamburger");
  const menubar = document.querySelector(".menubar");
  if (hamburger && menubar) {
    const menuLinks = menubar.querySelectorAll("a");
    const toggleNav = () => {
      menubar.classList.toggle("active");
      hamburger.classList.toggle("hamburger-active");
    };
    hamburger.addEventListener("click", toggleNav);
    menuLinks.forEach((link) => link.addEventListener("click", toggleNav));
    document.addEventListener("click", (event) => {
      if (
        !menubar.contains(event.target) &&
        !hamburger.contains(event.target)
      ) {
        menubar.classList.remove("active");
        hamburger.classList.remove("hamburger-active");
      }
    });
  }
});

// ==============================================
// Spotlight FAQ Interaction
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", function () {
    const isActive = this.classList.contains("active");

    // Close all items
    document.querySelectorAll(".faq-item").forEach((el) => {
      el.classList.remove("active");
      el.querySelector(".answer").style.maxHeight = null;
    });

    // Toggle current if not active
    if (!isActive) {
      this.classList.add("active");
      const answer = this.querySelector(".answer");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// // Footer Reveal Animation
// const footer = document.querySelector('.footer');
// const footerObserver = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       footer.classList.add('reveal');
//     }
//   });
// }, { threshold: 0.1 });

// if (footer) {
//   footerObserver.observe(footer);
// }
