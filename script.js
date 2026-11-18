    document.addEventListener("DOMContentLoaded", () => {

      const intro = document.getElementById("intro");
      const website = document.getElementById("website");

      // Keep website hidden while intro is running
      if (website) {
        website.classList.remove("ready");
      }

      // INTRO FINISH — preserved at 5.7 seconds
      function enterWebsite() {

        if (!intro || intro.classList.contains("finished")) {
          return;
        }

        intro.classList.add("finished");

        if (website) {
          website.classList.add("ready");
        }

        // Remove intro after fade-out
        setTimeout(() => {
          intro.remove();
        }, 850);
      }

      setTimeout(enterWebsite, 5700);

      // MOBILE NAVIGATION
      const menuButton = document.getElementById("menuButton");
      const navLinks = document.getElementById("navLinks");

      function closeMenu() {
        if (!menuButton || !navLinks) return;

        navLinks.classList.remove("open");
        menuButton.classList.remove("active");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      }

      if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

          const open = navLinks.classList.toggle("open");

          menuButton.classList.toggle("active", open);
          menuButton.setAttribute("aria-expanded", String(open));

          menuButton.setAttribute(
            "aria-label",
            open ? "Close navigation" : "Open navigation"
          );

        });

        // Close menu after choosing a link
        navLinks.querySelectorAll("a").forEach(link => {

          link.addEventListener("click", closeMenu);

        });

        // Close menu with Escape key
        document.addEventListener("keydown", event => {

          if (event.key === "Escape") {
            closeMenu();
          }

        });

        // Close menu when clicking outside it
        document.addEventListener("click", event => {

          const clickedInsideMenu =
            navLinks.contains(event.target) ||
            menuButton.contains(event.target);

          if (!clickedInsideMenu) {
            closeMenu();
          }

        });

      }

      // SCROLL REVEAL
      const revealItems = document.querySelectorAll(".reveal");

      if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, observer) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              observer.unobserve(entry.target);

            }

          });

        }, {
          threshold: 0.12,
          rootMargin: "0px 0px -35px 0px"
        });

        revealItems.forEach(item => {
          observer.observe(item);
        });

      } else {

        // Fallback for older browsers
        revealItems.forEach(item => {
          item.classList.add("visible");
        });

      }

      // FOOTER YEAR
      const yearElement = document.getElementById("year");

      if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
      }

    });
