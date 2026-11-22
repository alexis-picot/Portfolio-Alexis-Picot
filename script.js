const curseur = document.querySelector(".curseur");

if (curseur) {
    let sourisX = 0;
    let sourisY = 0;

    let cercleX = 0;
    let cercleY = 0;

    document.addEventListener("mousemove", (event) => {
        sourisX = event.clientX;
        sourisY = event.clientY;

        if (!curseur.classList.contains("visible")) {
            cercleX = sourisX;
            cercleY = sourisY;

            curseur.style.left = cercleX + "px";
            curseur.style.top = cercleY + "px";

            curseur.classList.add("visible");
        }
    });

    function animerCurseur() {
        cercleX += (sourisX - cercleX) * 0.12;
        cercleY += (sourisY - cercleY) * 0.12;

        curseur.style.left = cercleX + "px";
        curseur.style.top = cercleY + "px";

        requestAnimationFrame(animerCurseur);
    }

    animerCurseur();
}


/* CARROUSEL */

const carrousel = document.querySelector(".carrousel");

if (carrousel) {
    const piste = carrousel.querySelector(".carrousel-piste");
    const slides = piste.querySelectorAll(".carrousel-slide");

    const boutonGauche = carrousel.querySelector(".gauche");
    const boutonDroite = carrousel.querySelector(".droite");

    let position = 0;

    function actualiserCarrousel() {
        const largeurSlide = slides[0].getBoundingClientRect().width;
        const espace = parseFloat(getComputedStyle(piste).gap);

        piste.style.transform =
            `translateX(-${position * (largeurSlide + espace)}px)`;

        boutonGauche.disabled = position === 0;
        boutonDroite.disabled = position === slides.length - 3;
    }

    boutonDroite.addEventListener("click", () => {
        if (position < slides.length - 3) {
            position++;
            actualiserCarrousel();
        }
    });

    boutonGauche.addEventListener("click", () => {
        if (position > 0) {
            position--;
            actualiserCarrousel();
        }
    });

    window.addEventListener("resize", actualiserCarrousel);

    actualiserCarrousel();
}


/* VISIONNEUSE */

const visionneuse = document.querySelector(".visionneuse");

if (visionneuse) {
    const imageAgrandie = visionneuse.querySelector("img");
    const boutonFermer = visionneuse.querySelector(".fermer-visionneuse");

    const imagesCarrousel = document.querySelectorAll(".carrousel-slide img");

    imagesCarrousel.forEach((image) => {
        image.addEventListener("click", () => {
            imageAgrandie.src = image.src;
            imageAgrandie.alt = image.alt;
            visionneuse.classList.add("active");
        });
    });

    boutonFermer.addEventListener("click", () => {
        visionneuse.classList.remove("active");
    });

    visionneuse.addEventListener("click", (event) => {
        if (event.target === visionneuse) {
            visionneuse.classList.remove("active");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            visionneuse.classList.remove("active");
        }
    });
}
