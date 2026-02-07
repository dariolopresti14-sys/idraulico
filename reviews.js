

const reviewsData = [
            {
                id: 1,
                name: "Maria S.",
                rating: 5,
                text: "Gaetano è un vero professionista! Ha ristrutturato completamente il mio bagno e il risultato è semplicemente fantastico. Lavoro preciso, pulito e nei tempi concordati. Consiglio vivamente!",
                date: "18 Gennaio 2026",
                isNew: true
            },
            {
                id: 2,
                name: "Giuseppe R.",
                rating: 5,
                text: "Chiamato per un'emergenza durante il weekend. È arrivato in mezz'ora e ha risolto il problema della perdita rapidamente. Prezzi onesti e grande disponibilità. Grazie mille!",
                date: "10 Gennaio 2026"
            },
            {
                id: 3,
                name: "Antonella M.",
                rating: 5,
                text: "Installato due climatizzatori in casa. Gaetano mi ha consigliato i modelli migliori per le mie esigenze. Installazione perfetta, funzionano benissimo. Persona seria e competente.",
                date: "5 Gennaio 2026"
            },
            {
                id: 4,
                name: "Francesco L.",
                rating: 5,
                text: "Ottimo servizio! Ha sostituito la caldaia e revisionato tutto l'impianto di riscaldamento. Lavoro impeccabile e grande professionalità. Lo chiamerò sicuramente per futuri lavori.",
                date: "28 Dicembre 2025"
            },
            {
                id: 5,
                name: "Carmela B.",
                rating: 5,
                text: "Persona seria, puntuale e molto competente. Ha risolto un problema che altri idraulici non erano riusciti a sistemare. Prezzi giusti e lavoro di qualità. Consigliatissimo!",
                date: "20 Dicembre 2025"
            },
            {
                id: 6,
                name: "Salvatore T.",
                rating: 4,
                text: "Buon lavoro nel complesso. Ha rifatto l'impianto idraulico del bagno. Veloce e preciso. Unico appunto: avrei gradito più comunicazione durante i lavori.",
                date: "15 Dicembre 2025"
            },
            {
                id: 7,
                name: "Rosaria P.",
                rating: 5,
                text: "Eccellente! Ha sistemato una perdita molto difficile da individuare. Paziente, professionale e con ottime competenze tecniche. Prezzi nella media. Molto soddisfatta!",
                date: "8 Dicembre 2025"
            },
            {
                id: 8,
                name: "Marco V.",
                rating: 5,
                text: "Installazione caldaia a condensazione impeccabile. Ha spiegato tutto in modo chiaro, lavoro pulito e certificato. Dopo 3 mesi funziona perfettamente. Top!",
                date: "1 Dicembre 2025"
            }

    ];

const reviewsWrapper= document.getElementById('reviewsWrapper');
const scrollLeftBtn= document.getElementById('scrollLeft');
const scrollRightBtn= document.getElementById('scrollRight');
const scrollIndicator= document.getElementById('scrollIndicator');
const scrollDots= document.getElementById('scrollDots');
const reviewCount= document.getElementById('reviewCount');


function renderReviews(reviews) {
    reviewsWrapper.innerHTML= '';
    reviews.forEach((reviews, index) => {
        const stars= '★'.repeat(reviews.rating) + '☆'.repeat(5 - reviews.rating);
        const newBadge= reviews.isNew ? '<span class="new-badge">NUOVO</span>' : '';
        const reviewCard= document.createElement('div');
        reviewCard.className= 'review-card';
        reviewCard.setAttribute('data-review-index', index);
        reviewCard.innerHTML= `
        <div class="review-header">
            <span class="reviewer-name">${reviews.name}${newBadge}</span>
            <span class="review-stars">${stars}</span>
        </div>
        <div class="review-date">${reviews.date}</div>
        <div class="review-text">${reviews.text}</div>
        `;

        reviewCard.addEventListener('click', () => openReviewModal(reviews));
        reviewsWrapper.appendChild(reviewCard);

    });

    reviewCount.textContent= reviews.length;
    createScrollDots(reviews.length);

}

function createScrollDots(totalReviews) {
    scrollDots.innerHTML= '';
    const visibleCards= Math.ceil(reviewsWrapper.offsetWidth / 370);
    const totalDots= Math.max(1, totalReviews - visibleCards + 1);

    for (let i= 0; i < totalDots; i++) {
        const dot= document.createElement('div');
        dot.className= 'scroll-dot';
        if (i == 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToPosition(i));
        scrollDots.appendChild(dot);

    }

}

//funzioni per il rendering delle recensioni

const modalOverlay= document.getElementById('modalOverlay');
const modalClose= document.getElementById('modalClose');
const modalReviewer= document.getElementById('modalReviewer');
const modalStars= document.getElementById('modalStars');
const modalDate= document.getElementById('modalDate');
const modalReviewText= document.getElementById('modalReviewText');

let currentReview= null;

function openReviewModal(reviews) {
    currentReview= reviews;

    const stars= '★'.repeat(reviews.rating) + '☆'.repeat(5 - reviews.rating);

    modalReviewer.textContent= reviews.name;
    modalStars.textContent= stars;
    modalDate.textContent= reviews.date;
    modalReviewText.textContent= reviews.text;

    modalOverlay.classList.add('active');
    document.body.style.overflow= 'hidden';

}//apri popup recensione completa

function closeReviewModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow= 'auto';

}//chiudi popup

modalClose.addEventListener('click', closeReviewModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeReviewModal();

    }

});

modalClose.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeReviewModal();

    }

});


scrollLeftBtn.addEventListener('click', () => {
    reviewsWrapper.scrollBy({
        left: -370,
        behavior: "smooth"
    });

});

scrollRightBtn.addEventListener('click', () => {
    reviewsWrapper.scrollBy({
        left: 370,
        behavior: "smooth"
    });

});

function scrollToPosition(index) {
    reviewsWrapper.scrollTo({
        left: index * 370,
        behavior: "smooth"

    });

}

reviewsWrapper.addEventListener('scroll', () => {
    updateScrollIndicators();

});

function updateScrollIndicators() {
    const scrollLeft= reviewsWrapper.scrollLeft;
    const scrollWidth= reviewsWrapper.scrollWidth;
    const clientWidth= reviewsWrapper.clientWidth;
    const currentIndex= Math.round(scrollLeft / 370);
    const dots= scrollDots.querySelectorAll('.scroll-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);

    });

    scrollLeftBtn.disabled= scrollLeft <= 0;
    scrollRightBtn.disabled= scrollLeft >= scrollWidth - clientWidth - 10;

    if (scrollLeft <= 0) {
        scrollIndicator.textContent= 'Scorri a destra per vedere altre recensioni →';

    }else if (scrollLeft >= scrollWidth - clientWidth -10) {
        scrollIndicator.textContent= '← Sei alla fine delle recensioni';

    }else {
        scrollIndicator.textContent= `Recensione ${currentIndex + 1} di ${reviewsData.length}`;

    }

}

function addNewReview(reviewData) {
    reviewData.unshift({
        id: Date.now(),
        name: reviewData.name,
        rating: reviewData.rating,
        text: reviewsData.text,
        date: new Date().toLocaleDateString('it-IT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'

        }),
        
        isNew: true

    });

    renderReviews(reviewData);

    reviewsWrapper.scrollTo({
        left: 0,
        behavior: "smooth"

    });

    setTimeout(() => {
        reviewData[0].isNew= false;
        renderReviews(reviewData);
    }, 5000);


}

renderReviews(reviewsData);
updateScrollIndicators();

