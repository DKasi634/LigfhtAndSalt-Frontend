const navRight = document.querySelector('.nav__right ul');
const showNavBtn = document.querySelector('#show__navbar-btn');
const hideNavBtn = document.querySelector('#hide__navbar-btn');

const showNav  = () => {
    navRight.style.display = "inline-block";
    showNavBtn.style.display = "none";
    hideNavBtn.style.display = "inline-block";
}
const hideNav  = () => {
    navRight.style.display = "none";
    showNavBtn.style.display = "inline-block";
    hideNavBtn.style.display = "none";
}

showNavBtn.addEventListener('click', showNav);
hideNavBtn.addEventListener('click', hideNav);

// Hero Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startCarousel() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopCarousel() {
        clearInterval(slideInterval);
    }

    // Add click event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopCarousel();
            startCarousel(); // Restart the auto-slide
        });
    });

    // Start the carousel
    startCarousel();

    // Pause carousel on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopCarousel);
        carousel.addEventListener('mouseleave', startCarousel);
    }
});

// Statistics Animation
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 100; // Animation duration
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 20);
        });
    };
    
    // Start animation when stats are visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe the stats section
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    } else {
        // If no stats section found, animate immediately
        animateStats();
    }
});