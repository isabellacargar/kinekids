// Añadir un efecto de aparición al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.glass-card, .game-card, .eval-box, .content-image, .interactive-game-card');

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

    // Modal Lightbox para los códigos QR
    const qrContainers = document.querySelectorAll('.qr-container');
    const qrModal = document.getElementById('qrModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalLink = document.getElementById('modalLink');
    const closeModal = document.getElementById('closeModal');

    qrContainers.forEach(container => {
        container.addEventListener('click', (e) => {
            e.stopPropagation();
            const author = container.getAttribute('data-author');
            const url = container.getAttribute('data-url');
            // Usamos un tamaño mayor para el QR modal para que se vea perfectamente nítido
            const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(url)}`;
            
            modalTitle.textContent = `Juego de ${author}`;
            modalImage.src = qrSrc;
            modalLink.href = url;
            
            qrModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Previene el scroll de fondo
        });
    });

    const hideModal = () => {
        qrModal.classList.remove('active');
        document.body.style.overflow = ''; // Restaura el scroll
    };

    closeModal.addEventListener('click', hideModal);
    qrModal.addEventListener('click', (e) => {
        if (e.target === qrModal) {
            hideModal();
        }
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && qrModal.classList.contains('active')) {
            hideModal();
        }
    });
});
