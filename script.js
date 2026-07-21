"use strict";

/* ========================================
   NOVA WEB
   Website Interactions
======================================== */


document.body.classList.add("loading");


/* ---------- Loading Screen ---------- */

const loader = document.getElementById("loader");

window.addEventListener("load", () => {
    window.setTimeout(() => {
        if (loader) {
            loader.classList.add("hidden");
        }

        document.body.classList.remove("loading");
    }, 2500);
});


/* ---------- Header Scroll Effect ---------- */

const siteHeader = document.getElementById("siteHeader");

function updateHeader() {
    if (!siteHeader) {
        return;
    }

    if (window.scrollY > 40) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* ---------- Mobile Navigation ---------- */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
    if (!menuButton || !navLinks) {
        return;
    }

    menuButton.classList.remove("active");
    navLinks.classList.remove("active");

    menuButton.setAttribute("aria-expanded", "false");

    document.body.classList.remove("menu-open");
}

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        const menuIsOpen = navLinks.classList.toggle("active");

        menuButton.classList.toggle("active", menuIsOpen);

        menuButton.setAttribute(
            "aria-expanded",
            String(menuIsOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            menuIsOpen
        );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        const clickedInsideNavigation =
            navLinks.contains(event.target) ||
            menuButton.contains(event.target);

        if (!clickedInsideNavigation) {
            closeMenu();
        }
    });
}


/* ---------- Scroll Reveal ---------- */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("active");

            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* ---------- Mouse Glow ---------- */

const mouseGlow = document.getElementById("mouseGlow");

const userAllowsMotion =
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

const desktopPointer =
    window.matchMedia("(pointer: fine)").matches;

if (mouseGlow && userAllowsMotion && desktopPointer) {
    window.addEventListener("mousemove", (event) => {
        mouseGlow.style.left = `${event.clientX}px`;
        mouseGlow.style.top = `${event.clientY}px`;
        mouseGlow.style.opacity = "1";
    });

    document.addEventListener("mouseleave", () => {
        mouseGlow.style.opacity = "0";
    });
}


/* ---------- Current Year ---------- */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear().toString();
}
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && typeof emailjs !== "undefined") {
    emailjs.init({
        publicKey: "UIZQTs_INJVNqPoCC"
    });

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonHTML = submitButton.innerHTML;
        const formData = new FormData(contactForm);

        const name = formData.get("name");
        const email = formData.get("email");
        const business = formData.get("business");
        const website = formData.get("website") || "No website provided";
        const service = formData.get("service") || "Not selected";
        const project = formData.get("project");
        const budget = formData.get("budget") || "Not selected";

        const templateParams = {
            name: name,
            email: email,

            title: `${business} — ${service}`,

            message: `
Business Name: ${business}
Email: ${email}
Current Website: ${website}
Requested Service: ${service}
Estimated Budget: ${budget}

Project Details:
${project}
            `.trim()
        };

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        if (formMessage) {
            formMessage.textContent = "Sending your project details...";
            formMessage.className = "form-message";
        }

        try {
            await emailjs.send(
                "service_3b3jy9c",
                "template_4u7muax",
                templateParams
            );

            if (formMessage) {
                formMessage.textContent =
                    "Your project details were sent successfully!";
                formMessage.className = "form-message success";
            }

            contactForm.reset();
        } catch (error) {
            console.error("EmailJS error:", error);

            if (formMessage) {
                formMessage.textContent =
                    "The message could not be sent. Please try again.";
                formMessage.className = "form-message error";
            }
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHTML;
        }
    });
}