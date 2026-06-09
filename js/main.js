// Reveal animation
const revealTargets = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.16 }
    );

    revealTargets.forEach(item => {
        item.classList.add("reveal");
        observer.observe(item);
    });
}
else {
    revealTargets.forEach(item => item.classList.add("active"));
}

// Navbar state
const navbar = document.querySelector(".navbar");

const updateNavbar = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
};

updateNavbar();
window.addEventListener("scroll", updateNavbar, { passive: true });

// Active navigation
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const updateActiveLink = () => {
    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 140;
        const bottom = top + section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "current",
            link.getAttribute("href") === `#${current}`
        );
    });
};

updateActiveLink();
window.addEventListener("scroll", updateActiveLink, { passive: true });

// Gallery modal
const galleryCards = document.querySelectorAll(".gallery-card");
const modal = document.createElement("div");

modal.className = "modal";
modal.setAttribute("role", "dialog");
modal.setAttribute("aria-modal", "true");
modal.setAttribute("aria-hidden", "true");

modal.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h2 class="modal-title"></h2>
            <button class="modal-close" type="button" aria-label="Close gallery preview">&times;</button>
        </div>
        <div class="modal-body">
            <img alt="">
            <p></p>
        </div>
    </div>
`;

document.body.appendChild(modal);

const modalTitle = modal.querySelector(".modal-title");
const modalImage = modal.querySelector(".modal-body img");
const modalText = modal.querySelector(".modal-body p");
const modalClose = modal.querySelector(".modal-close");

const openModal = card => {
    const title = card.dataset.title || "";
    const description = card.dataset.description || "";
    const image = card.dataset.image || "";

    modalTitle.textContent = title;
    modalText.textContent = description;
    modalImage.src = image;
    modalImage.alt = `${title} preview`;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalClose.focus();
};

const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
};

galleryCards.forEach(card => {
    card.addEventListener("click", () => openModal(card));
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

window.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
    }
});
