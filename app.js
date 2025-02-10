document.addEventListener('DOMContentLoaded', function () {
    console.log("Le script du carrousel est bien chargé !");

    /** ========== GESTION DU FILTRE PAR CATÉGORIE ========== **/
    const filterButtons = document.querySelectorAll('.filter-option');
    let activeCategory = "all";

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            activeCategory = this.getAttribute("data-category");

            // Changer la classe active
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            // Mettre à jour les images affichées
            updateCarousel();
        });
    });

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
    dotsContainer.innerHTML = ""; // Réinitialiser les dots
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
            const imgCategory = img.getAttribute("data-category");

            // Vérifier si l'image correspond à la catégorie active
            if (activeCategory === "all" || imgCategory === activeCategory) {
                img.style.display = "block";
            } else {
                img.style.display = "none";
            }

            // Afficher seulement l'image active
            img.classList.remove('active');
            if (i === index && img.style.display === "block") {
                img.classList.add('active');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Navigation avec les boutons "next" et "prev"
    nextButton.addEventListener('click', function () {
        do {
            index = (index + 1) % images.length;
        } while (images[index].style.display === "none"); // Ignorer les images cachées
        updateCarousel();
    });

    prevButton.addEventListener('click', function () {
        do {
            index = (index - 1 + images.length) % images.length;
        } while (images[index].style.display === "none"); // Ignorer les images cachées
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

    console.log("Mise à jour du script terminée !");
});
