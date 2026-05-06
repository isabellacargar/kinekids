// Añadir un efecto de aparición al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.glass-card, .game-card, .eval-box, .content-image');

    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Initialize the styles for the animation
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});
