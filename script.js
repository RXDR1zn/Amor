// Blog interactions
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.opacity = '1';
    });
});

// Subscribe button animation
const btn = document.querySelector('.btn-sub');
btn.addEventListener('click', function() {
    this.textContent = "Subscribed!";
    this.style.backgroundColor = "#27ae60";
    setTimeout(() => {
        this.textContent = "Subscribe";
        this.style.backgroundColor = "#2c3e50";
    }, 2000);
});

// --- Interactive Heart Explosion Animation ---

/**
 * Creates a burst of heart particles at the specified coordinates.
 * @param {number} x - The x-coordinate for the explosion.
 * @param {number} y - The y-coordinate for the explosion.
 */
function createHeartBurst(x, y) {
    const particleCount = 12;
    const heartIcons = ['❤️', '💖', '💗', '💓', '✨'];

    for (let i = 0; i < particleCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        
        // Randomly select a heart variant
        heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];

        // Calculate random trajectory using CSS variables
        // Angle in radians (0 to 360 degrees)
        const angle = Math.random() * Math.PI * 2;
        // Random distance between 50px and 150px
        const velocity = 50 + Math.random() * 100;
        
        const tx = Math.cos(angle) * velocity + 'px';
        const ty = Math.sin(angle) * velocity + 'px';
        const randomRotate = (Math.random() * 360 - 180) + 'deg';

        // Apply initial position and dynamic trajectory variables
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.setProperty('--tx', tx);
        heart.style.setProperty('--ty', ty);
        heart.style.setProperty('--random-rotate', randomRotate);

        document.body.appendChild(heart);

        // Cleanup: Remove element after animation finishes (800ms defined in CSS)
        heart.addEventListener('animationend', () => {
            heart.remove();
        });

        // Fallback cleanup if animationend fails to fire
        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, 1000);
    }
}

// Handle Mouse Clicks
window.addEventListener('mousedown', (e) => {
    // Check if click was on a button or link to avoid visual clutter on primary actions
    // (Optional: remove check if you want it everywhere)
    createHeartBurst(e.clientX, e.clientY);
});

// Handle Touch Events for Mobile
window.addEventListener('touchstart', (e) => {
    // Prevents double triggers on some mobile browsers
    const touch = e.touches[0];
    createHeartBurst(touch.clientX, touch.clientY);
}, { passive: true });

console.log("Interactive particles initialized");