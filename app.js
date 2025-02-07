document.addEventListener('DOMContentLoaded', function () {
    console.log("Le script du carrousel est bien chargé !");

    /** ========== GESTION DU CARROUSEL ========== **/
    let index = 0;
    const images = document.querySelectorAll('.carousel-image');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!images.length || !nextButton || !prevButton || !dotsContainer) {
        console.error("Problème : Les éléments du carrousel ne sont pas trouvés.");
        return;
    }

    // Création des dots dynamiquement
    images.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active'); // Premier dot actif
        dot.addEventListener('click', () => {
            index = i;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateCarousel() {
        images.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                img.classList.add('active');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Navigation avec les boutons "next" et "prev"
    nextButton.addEventListener('click', function () {
        index = (index + 1) % images.length;
        updateCarousel();
    });

    prevButton.addEventListener('click', function () {
        index = (index - 1 + images.length) % images.length;
        updateCarousel();
    });

    updateCarousel(); // Initialisation

    /** ========== GESTION DU BOUTON "HAUT DE PAGE" ========== **/
    const myButton = document.getElementById("topBtn");

    if (!myButton) {
        console.error("Problème : Le bouton 'Haut de page' n'est pas trouvé.");
        return;
    }

    // Afficher ou cacher le bouton en fonction du scroll
    window.addEventListener("scroll", () => {
        myButton.style.display = (window.scrollY > 20) ? "block" : "none";
    });

    // Remonter en haut de la page au clic
    myButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    console.log("Tout fonctionne bien !");
});
