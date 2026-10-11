const themeBtn = document.getElementById("themeBtn");

function applyTheme(theme) {
    const dark = theme === "dark";
    document.body.classList.toggle("dark", dark);
    themeBtn.textContent = dark ? "☀️" : "🌙";
    localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
    applyTheme("dark");
}

themeBtn.addEventListener("click", function () {
    const isDark = document.body.classList.contains("dark");
    applyTheme(isDark ? "light" : "dark");
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        formStatus.textContent = "Thank you, " + name + "! Your form was submitted.";
        contactForm.reset();
    });
}

const typingElement = document.getElementById("typing");
const roles = ["Web Developer", "Java Programmer", "Software Developer"];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {
        charIndex++;
        typingElement.textContent = currentRole.substring(0, charIndex);

        if (charIndex === currentRole.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        charIndex--;
        typingElement.textContent = currentRole.substring(0, charIndex);

        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();

const skillSection = document.getElementById("skills");

if (skillSection) {
    const skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                document.querySelectorAll(".skill-progress").forEach(function (bar) {
                    bar.style.width = bar.dataset.width;
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillObserver.observe(skillSection);
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach(function (card) {
            const category = card.dataset.category;
            card.style.display = (selectedFilter === "all" || category === selectedFilter) ? "block" : "none";
        });
    });
});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});