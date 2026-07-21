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


/* ---------- Contact Form Demo ---------- */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);

        const name =
            String(formData.get("name") || "").trim();

        const email =
            String(formData.get("email") || "").trim();

        const business =
            String(formData.get("business") || "").trim();

        const project =
            String(formData.get("project") || "").trim();

        if (!name || !email || !business || !project) {
            formMessage.textContent =
                "Please complete the required fields before submitting.";

            formMessage.classList.add("visible");

            return;
        }

        formMessage.textContent =
            `Thanks, ${name}. Your form design is working. ` +
            "A real email service will be connected before the website launches.";

        formMessage.classList.add("visible");

        contactForm.reset();
    });
}