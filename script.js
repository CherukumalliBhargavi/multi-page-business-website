
document.addEventListener("DOMContentLoaded", () => {
    // Automatically update the copyright year
    document.querySelectorAll(".year").forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // Responsive mobile navigation
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav");

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });

        // Close the menu when switching to desktop width
        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            }
        });
    }

    // Portfolio category filters
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach(item => {
                const isActive = item === button;

                item.classList.toggle("active", isActive);
                item.setAttribute("aria-pressed", String(isActive));
            });

            projectCards.forEach(card => {
                const matches =
                    selectedFilter === "all" ||
                    card.dataset.category === selectedFilter;

                card.hidden = !matches;
            });
        });

        button.setAttribute(
            "aria-pressed",
            String(button.classList.contains("active"))
        );
    });

    // Contact form: front-end validation and demonstration response
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm && formMessage) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            formMessage.className = "form-message";
            formMessage.textContent = "";

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                formMessage.classList.add("error");
                formMessage.textContent =
                    "Please complete all required fields.";
                return;
            }

            formMessage.classList.add("success");
            formMessage.textContent =
                "Thank you, " + name +
                "! Your form has been validated successfully. " +
                "To deliver your message, connect this form to an email service or backend.";

            // No information is transmitted or stored.
            contactForm.reset();
        });
    }

    // Smooth scrolling for same-page anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });
            }
        });
    });

    // Provide a fallback if a remote project image fails to load
    document.querySelectorAll(".project-card img, .split-image img").forEach(img => {
        img.addEventListener("error", () => {
            img.style.background = "#e7eaf1";
            img.alt = "Project image unavailable";
        }, { once: true });
    });
});
