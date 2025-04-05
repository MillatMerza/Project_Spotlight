document.getElementById("canvas3d")?.removeAttribute("style");

document.addEventListener("DOMContentLoaded", function () {
  // Load 3D scene with responsive behavior
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
            const sceneFile = currentDevice === "mobile" 
              ? "assets/scene (23).splinecode" 
              : "assets/scene (33).splinecode";
              
            app.load(sceneFile)
              .catch((error) => console.error("Error loading scene:", error));
          }

          loadScene();
          
          const handleResize = () => {
            const newDevice = breakpoints.mobile.matches ? "mobile" : "desktop";
            if (newDevice !== currentDevice) {
              currentDevice = newDevice;
              loadScene();
            }
          };
          
          window.addEventListener("resize", handleResize);
        }
      );
    }
  }, 100);

  // Dark Mode Toggle implementation
  const darkModeCheckboxes = document.querySelectorAll(".theme-checkbox");
  const htmlElement = document.documentElement;

  // Initialize dark mode from localStorage
  const isDarkMode = localStorage.getItem("darkMode") === "enabled";
  htmlElement.classList.toggle("dark-mode", isDarkMode);

  // Set initial checkbox state and add event listeners
  darkModeCheckboxes.forEach((checkbox) => {
    checkbox.checked = isDarkMode;
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

  // Loading Screen animation
  const loadingScreen = document.querySelector(".loading");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 4000);
  }

  // Navbar Toggle functionality
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
      if (!menubar.contains(event.target) && !hamburger.contains(event.target)) {
        menubar.classList.remove("active");
        hamburger.classList.remove("hamburger-active");
      }
    });
  }

  // Contact form handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validate form
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields");
        return;
      }

      // Form submission logic (currently just shows success message)
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }
});

// FAQ accordion functionality
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

