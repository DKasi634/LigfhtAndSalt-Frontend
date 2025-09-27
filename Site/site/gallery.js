// ============================================================
// GALLERY PAGE INTERACTIVE FUNCTIONALITY
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Force all gallery items to be visible
    setTimeout(() => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const images = document.querySelectorAll('.gallery-image img');
        
        galleryItems.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.visibility = 'visible';
            item.classList.remove('hidden');
        });
        
        images.forEach(img => {
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            img.style.display = 'block';
        });
    }, 100);
    
    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });
            
            // Add visual feedback to button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Smooth scrolling for anchor links
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

    // Animate gallery items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    galleryItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.transition = 'transform 0.6s ease';
        // Don't observe for animation - keep items visible
    });
    
    // Animate stats on scroll
    const statCards = document.querySelectorAll('.stat-card');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statCards.forEach(card => {
        statsObserver.observe(card);
    });
    
    // Gallery item hover effects
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('hidden')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
});

// ============================================================
// MODAL FUNCTIONALITY
// ============================================================

function openModal(button) {
    const galleryItem = button.closest('.gallery-item');
    const image = galleryItem.querySelector('img');
    const title = galleryItem.querySelector('.gallery-info h3').textContent;
    const description = galleryItem.querySelector('.gallery-info p').textContent;
    const tags = galleryItem.querySelectorAll('.gallery-tags .tag');
    
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    
    // Set modal content
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Clear and add tags
    modalTags.innerHTML = '';
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag.textContent;
        modalTags.appendChild(tagElement);
    });
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animate modal in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Close modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.opacity = '0';
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// ============================================================
// ANIMATION FUNCTIONS
// ============================================================

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (isNaN(target)) return; // Skip if no valid target
        
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
}

// ============================================================
// PARALLAX EFFECT FOR HERO SECTION
// ============================================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        const rate = scrolled * -0.3;
        heroImage.style.transform = `perspective(1000px) rotateY(-5deg) translateY(${rate}px)`;
    }
});

// ============================================================
// LAZY LOADING FOR IMAGES
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-image img');
    
    // Force load first few images immediately
    images.forEach((img, index) => {
        if (index < 6) { // Load first 6 images immediately
            img.loading = 'eager';
        }
        
        // Add error handling
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            this.style.background = 'var(--bg-tertiary)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = 'var(--text-muted)';
            this.style.fontSize = '0.875rem';
            this.alt = 'Image non disponible';
        });
        
        // Add load success handler
        img.addEventListener('load', function() {
            console.log('Image loaded successfully:', this.src);
            this.style.opacity = '1';
        });
    });
    
    // Disable lazy loading observer - images should be visible immediately
    images.forEach(img => {
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.classList.add('loaded');
    });
});

// ============================================================
// KEYBOARD NAVIGATION FOR GALLERY
// ============================================================

document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('imageModal');
    if (modal.style.display !== 'block') return;
    
    const galleryItems = document.querySelectorAll('.gallery-item:not(.hidden)');
    const currentImage = document.getElementById('modalImage');
    let currentIndex = -1;
    
    // Find current image index
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img.src === currentImage.src) {
            currentIndex = index;
        }
    });
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        // Previous image
        const prevItem = galleryItems[currentIndex - 1];
        const prevButton = prevItem.querySelector('.gallery-btn');
        openModal(prevButton);
    } else if (e.key === 'ArrowRight' && currentIndex < galleryItems.length - 1) {
        // Next image
        const nextItem = galleryItems[currentIndex + 1];
        const nextButton = nextItem.querySelector('.gallery-btn');
        openModal(nextButton);
    }
});

// ============================================================
// TOUCH GESTURES FOR MOBILE
// ============================================================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const modal = document.getElementById('imageModal');
    if (modal.style.display !== 'block') return;
    
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next image
            const galleryItems = document.querySelectorAll('.gallery-item:not(.hidden)');
            const currentImage = document.getElementById('modalImage');
            let currentIndex = -1;
            
            galleryItems.forEach((item, index) => {
                const img = item.querySelector('img');
                if (img.src === currentImage.src) {
                    currentIndex = index;
                }
            });
            
            if (currentIndex < galleryItems.length - 1) {
                const nextItem = galleryItems[currentIndex + 1];
                const nextButton = nextItem.querySelector('.gallery-btn');
                openModal(nextButton);
            }
        } else {
            // Swipe right - previous image
            const galleryItems = document.querySelectorAll('.gallery-item:not(.hidden)');
            const currentImage = document.getElementById('modalImage');
            let currentIndex = -1;
            
            galleryItems.forEach((item, index) => {
                const img = item.querySelector('img');
                if (img.src === currentImage.src) {
                    currentIndex = index;
                }
            });
            
            if (currentIndex > 0) {
                const prevItem = galleryItems[currentIndex - 1];
                const prevButton = prevItem.querySelector('.gallery-btn');
                openModal(prevButton);
            }
        }
    }
}