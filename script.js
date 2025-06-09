
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Counter animation
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Start counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('#stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Particle effect
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random properties
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * window.innerWidth;
    const animationDuration = Math.random() * 3 + 4;

    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = startX + 'px';
    particle.style.animationDuration = animationDuration + 's';

    // Random color
    const colors = ['#00d4ff', '#39ff14', '#9d4edd', '#ff6b35'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        particlesContainer.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, animationDuration * 1000);
    }
}

// Create particles periodically
setInterval(createParticle, 300);

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Show success message (you can integrate with your backend here)
    alert('Message sent successfully! We\'ll get back to you soon.');
    this.reset();
});

// Newsletter subscription
document.querySelector('.newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Show success message (you can integrate with your backend here)
    alert('Successfully subscribed to our newsletter!');
    this.reset();
});
